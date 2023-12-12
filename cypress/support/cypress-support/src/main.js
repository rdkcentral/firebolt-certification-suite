import Config from './config';
import Validation from './validation';
import TransportLayer from './transport';
import Queue from './queue';
const { v4: uuidv4 } = require('uuid');
const CONSTANTS = require('./constants.js');
const defaultDirectory = CONSTANTS.DEFAULT_DIRECTORY;
const jsonFile = CONSTANTS.JSON_FILE_EXTENSION;
const UTILS = require('./utils');
let appTransport;
const path = require('path');

export default function (module) {
  const config = new Config(module);
  const validationModule = new Validation(module);
  const transport = new TransportLayer();
  let clientCreated = false;
  // Fetch the required appTransport from config module
  appTransport = module.appTransport;

  // before All
  before(() => {
    cy.wrap(pubSubClientCreation(), { timeout: CONSTANTS.LINCHPIN_TIMEOUT }).then((result) => {
      if (result) {
        cy.log('Successfully established a pub/sub connection.');
      } else {
        cy.log('Unable to establish a pub/sub connection.');
      }
    });

    // Create an instance of global queue
    const messageQueue = new Queue();
    Cypress.env(CONSTANTS.MESSAGE_QUEUE, messageQueue);
    UTILS.parseExceptionList();
  });

  /**
   * @module main
   * @function pubSubClientCreation
   * @description Establishing the linchpin connection and subscribing the response topic.
   * @example
   * pubSubClientCreation()
   */
  function pubSubClientCreation() {
    return new Promise(async (resolve) => {
      const responseTopicsList = [];

      if (!clientCreated && appTransport.init) {
        try {
          const responseTopic = UTILS.getTopic(null, CONSTANTS.SUBSCRIBE);

          // Initialize required client
          await appTransport.init();

          if (responseTopic != undefined && !responseTopicsList.includes(responseTopic)) {
            // Subscribe to topic and pass the results to the callback function
            appTransport.subscribe(responseTopic, subscribeResults);
            responseTopicsList.push(responseTopic);
          }
          clientCreated = true;
          resolve(true);
        } catch (error) {
          // If an error occurs, reject the promise with the error
          reject(error);
        }
      } else {
        resolve(false);
      }
    });
  }

  // after All
  after(() => {
    (async () => {
      try {
        const responseTopic = UTILS.getTopic(null, CONSTANTS.SUBSCRIBE);
        appTransport.unsubscribe(responseTopic);
        // Unsubscribe from WebSocket if the client is available   
        const webSocketClient = Cypress.env("webSocketClient");
        if (webSocketClient) {
          UTILS.unsubscribe(webSocketClient);
          Cypress.env("webSocketClient", null); // Clear the WebSocket client from Cypress environment
        }
      } catch (err) {
        cy.log(`Something went wrong when attempting to unsubscribe: ${err}`);
      }
    })();
  });

  /**
   * @module main
   * @function sendMessagetoPlatforms
   * @description send message based on platform which will be pulled from config manager.
   * @param {*} requestMap - requestMap should contain method and param
   * @example
   * cy.sendMessagetoPlatforms({"method": "closedCaptioning", "param": {}})
   */
  Cypress.Commands.add('sendMessagetoPlatforms', (requestMap) => {
    cy.wrap(requestMap).then(async (requestMap) => {
      return new Promise(async (resolve) => {
        let message = await config.getRequestOverride(requestMap);
        // perform MTC call/FB call only if the message is not null
        if(message != null){
          let response = await transport.sendMessage(message);
          const result = config.getResponseOverride(response);
          resolve(result);
        }
        else {
          resolve(null);
        }
      });
    });
  });

  /**
   * @module main
   * @function validateCustom
   * @description validate custom string from getting openrpc custom validator function response.
   * @param {*} jsonString - pass in json string to customValidator method
   * @param {*} moduleMethod - get module and method from validation module
   * @param {*} customValidatorName - pass in custom validator name inside validation module object
   * @example
   * cy.validateCustom("<JSON>", "accessibility.closedCaptionsSettings", "validationOne")
   */
  Cypress.Commands.add('validateCustom', (jsonString, moduleMethod, customValidatorName) => {
    return validationModule.validateCustom(jsonString, moduleMethod, customValidatorName);
  });

  /**
   * @module main
   * @function validateJSON
   * @description validate given jsonpath from the string.
   * @param {*} jsonString - json string
   * @param {*} jsonPath - json query path to get validate data from json string
   * @example
   * cy.validateJSON('[{"name": "London", "population": 8615246 }, { "name": "Berlin", "population": 3517424 }]', "$..name")
   */
  Cypress.Commands.add('validateJSON', (jsonString, jsonPath) => {
    return validationModule.validateJSON(jsonString, jsonPath);
  });

  /**
   * @module main
   * @function validateSchema
   * @description validate json response string received when invoking <Module.Method>, against corresponding schema
   * @param {string} validationSchemaJSONString - JSON response string
   * @param {string} sdkVersion - SDK version
   * @param {string} openRPCModuleMethod - String containing the Module and Method called as "<Module.Method>" (Ex: accessibility.closedCaptionsSettings)
   * @example
   * validateSchema('{"enabled":true,"styles":{"fontFamily":"Monospace sans-serif","fontSize":1,"fontColor":"#ffffff","fontEdge":"none","fontEdgeColor":"#7F7F7F","fontOpacity":100,"backgroundColor":"#000000","backgroundOpacity":100,"textAlign":"center","textAlignVertical":"middle"}}'
  , "core", "accessibility.closedCaptionsSettings")
   */
  Cypress.Commands.add(
    'validateSchema',
    (validationSchemaJSONString, sdkVersion, openRPCModuleMethod) => {
      return validationModule.validateSchema(
        validationSchemaJSONString,
        sdkVersion,
        openRPCModuleMethod
      );
    }
  );

  /**
   * @module main
   * @function startTest
   * @description Start the sanity test using datable.
   * @param {Object} datatables - Contains the input variable to override default value to run suite files (Ex: appId, SDK mode)
   * @example
   * startTest({"rawTable": [ ["paramType","variableName","value"], ["INPUT","asynchronous","false"]]})
   */
  Cypress.Commands.add('startTest', (datatables) => {
    let additionalParams = {};
    let overrideParams = {};
    let appId;

    Cypress.env(CONSTANTS.SANITY_REPORT_POLLING_TIMEOUT, CONSTANTS.SANITY_REPORT_LONGPOLL_TIMEOUT);

    // Iterating through the datatables and updating the values to additionalParams object.
    if (datatables) {
      datatables.hashes().forEach((datatable) => {
        if (datatable.paramType == CONSTANTS.INPUT) {
          if (datatable.variableName && datatable.value) {
            additionalParams[datatable.variableName] = datatable.value;
          }
        }
        if (datatable.paramType == CONSTANTS.CONFIG) {
          if (datatable.variableName == CONSTANTS.APPID) {
            appId = datatable.value;
          }
        } else {
          appId = Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID);
        }
      });
    }

    // Overriding default value for mode, if input is not there from feature file or cli.
    let mode = CONSTANTS.MODE_SDK; // default to SDK
    if (
      !additionalParams[CONSTANTS.COMMUNICATION_MODE] &&
      !Cypress.env(CONSTANTS.COMMUNICATION_MODE)
    ) {
      additionalParams[CONSTANTS.COMMUNICATION_MODE] = mode;
    } else if (
      (!additionalParams[CONSTANTS.COMMUNICATION_MODE] ||
        additionalParams[CONSTANTS.COMMUNICATION_MODE]) &&
      Cypress.env(CONSTANTS.COMMUNICATION_MODE)
    ) {
      additionalParams[CONSTANTS.COMMUNICATION_MODE] = Cypress.env(CONSTANTS.COMMUNICATION_MODE);
    }

    // Overriding default value for action, if input is not there from feature file or cli.
    let action = CONSTANTS.ACTION_CORE; // default to CORE
    if (!additionalParams[CONSTANTS.ACTION] && !Cypress.env(CONSTANTS.ACTION)) {
      additionalParams[CONSTANTS.ACTION] = action;
    } else if (
      (!additionalParams[CONSTANTS.ACTION] || additionalParams[CONSTANTS.ACTION]) &&
      Cypress.env(CONSTANTS.ACTION)
    ) {
      additionalParams[CONSTANTS.ACTION] = Cypress.env(CONSTANTS.ACTION);
    }

    overrideParams.certification = Cypress.env(CONSTANTS.CERTIFICATION);
    overrideParams.exceptionMethods = UTILS.generateExceptionListForSanity();

    // If certification is true override excluded methods and modules from config module if it is present else use the default lists in constants.
    if (overrideParams.certification == true) {
      overrideParams = UTILS.overideParamsFromConfigModule(overrideParams);
    }

    cy.runIntentAddon(CONSTANTS.TASK.RUNTEST, additionalParams).then((parsedIntent) => {
      let intent = UTILS.createIntentMessage(CONSTANTS.TASK.RUNTEST, overrideParams, parsedIntent);
      const requestTopic = UTILS.getTopic(appId);
      const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);

      if (!Cypress.env(CONSTANTS.DEVICE_MAC)) {
        cy.log(CONSTANTS.DEVICE_MAC_UNAVAILABLE).then(() => {
          assert(false, CONSTANTS.DEVICE_MAC_UNAVAILABLE);
        });
      }

      cy.wait(30000); // TO DO: Static wait to be removed once healthcheck is available
      cy.sendMessagetoApp(requestTopic, responseTopic, intent).then((response) => {
        cy.log('Response from Firebolt Implementation: ' + response);

        if (response === CONSTANTS.RESPONSE_NOT_FOUND) {
          assert(false, CONSTANTS.NO_MATCHED_RESPONSE);
        } else {
          try {
            response = JSON.parse(response);
          } catch (error) {
            assert(false, error);
          }
          assert.exists(response.report, CONSTANTS.INVALID_RESPONSE);

          // Writing sanity mochawesome json to file when jobId is present.
          if (Cypress.env(CONSTANTS.JOBID)) {
            const reportPath = CONSTANTS.SANITY_REPORT_FILE_PATH;
            cy.task(CONSTANTS.WRITE_TO_FILE, {
              fileName: reportPath,
              data: JSON.stringify(response.report),
            });
          }

          cy.generateAndPushReports(response.report);
          Cypress.env(CONSTANTS.SANITY_REPORT_POLLING_TIMEOUT, null);
        }
      });
    });
  });

  /**
   * @module main
   * @function runIntentAddon
   * @description  If there was an add-on function in our config module it will be invoked and added additional fields else it will return the passed intent back.
   * @param {string} command - Add-on function name present in config module.
   * @param {Object} intent - Basic intent message that will applicable to ALL platforms to start the test on FCA.
   * @example
   * runIntentAddon("runTest", {"asynchronous": "false","communicationMode": "SDK","isAsync": false,"action": "CORE"})
   */
  Cypress.Commands.add('runIntentAddon', (command, message) => {
    if (module && module.intentAddons && typeof module.intentAddons[command] === 'function') {
      message = module.intentAddons[command](message);
    }
    // Add-ons not there, returning intent without changes
    return message;
  });

  /**
   * @module main
   * @function sendMessagetoApp
   * @description Publish a message and fetch response from app based on arguments
   * @param {string} requestTopic - Topic used to publish message
   * @param {string} responseTopic - Topic used to subscribe message
   * @param {Object} intent - Basic intent message that will applicable to ALL platforms to start the test on FCA.
   * @example
   * cy.sendMessagetoApp('900218FFD490_appId_FCS',900218FFD490_appId_FCA,{"asynchronous": "false","communicationMode": "SDK","isAsync": false,"action": "search"}, 1000)
   */
  Cypress.Commands.add('sendMessagetoApp', async (requestTopic, responseTopic, intent) => {
    let headers = { id: uuidv4() };

    // If 'sanityReportPollingTimeout' is undefined taking default timeout as 15 seconds.
    let longPollTimeout = Cypress.env(CONSTANTS.SANITY_REPORT_POLLING_TIMEOUT)
      ? Cypress.env(CONSTANTS.SANITY_REPORT_POLLING_TIMEOUT)
      : CONSTANTS.LONGPOLL_TIMEOUT;

    if (appTransport) {
      // Publish the message on topic
      appTransport.publish(requestTopic, JSON.stringify(intent), headers);

      // Returns the response after polling when data is available in queue
      return Cypress.env(CONSTANTS.MESSAGE_QUEUE)
        .LongPollQueue(headers.id, longPollTimeout)
        .then((results) => {
          if (results) {
            // Response recieved from queue
            return results;
          }
        });
    } else {
      cy.log(CONSTANTS.APP_TRANSPORT_UNAVAILABLE).then(() => {
        assert(false, CONSTANTS.APP_TRANSPORT_UNAVAILABLE);
      });
    }
  });

  /**
   * @module main
   * @function subscribeResults
   * @description Callback function to fetch the required response from subscribe and push it to a global queue
   * @param {object} data - Response payload from subscribe call
   * @param {object} metaData - Response headers from subscribe call
   * @example
   * subscribeResults('{ "result": { "type": "device", "value": "PD54331.." } }', headers:{id:1232435, client:fca})
   **/
  function subscribeResults(data, metaData) {
    let queueInput = {};
    queueInput.data = data;
    queueInput.metaData = metaData;
    // Push the data and metadata as an object to queue
    Cypress.env(CONSTANTS.MESSAGE_QUEUE).enqueue(queueInput);
  }

  /**
   * @module main
   * @function generateAndPushReports
   * @description Generate required reports once test is executed
   * @param {object} jsonObj - JSON response from third party app
   * @example
   * cy.generateAndPushReports(reportJson)
   */
  Cypress.Commands.add('generateAndPushReports', (jsonObj) => {
    if (CONSTANTS.GENERATE_HTML_REPORT) {
      const fileNamePrefix = uuidv4();
      const outputDirectory = defaultDirectory + fileNamePrefix + path.sep;
      const isWritten = writeJsonToFileForReporting(jsonObj, outputDirectory, fileNamePrefix);
      if (isWritten) {
        cy.convertJsonToHTML(outputDirectory, fileNamePrefix + jsonFile).then((isConverted) => {
          if (isConverted) {
            cy.task('log', 'HTML report generated in: ' + defaultDirectory + fileNamePrefix);
          }
        });
      } else {
        cy.log(CONSTANTS.WRITE_FAILED).then(() => {
          assert(false, 'Unable to write report json to file');
        });
      }
    } else {
      console.log(
        'CONSTANTS.GENERATE_HTML_REPORT should be set to true in order to generate html report'
      );
    }
  });

  async function writeJsonToFileForReporting(jsonData, defaultDirectory, fileNamePrefix) {
    const jsonObj = jsonData;
    const jsonContent = JSON.stringify(jsonObj, null, 4);
    const fileName = fileNamePrefix + jsonFile;

    cy.task(CONSTANTS.WRITE_TO_FILE, {
      fileName: defaultDirectory + fileName,
      data: jsonContent,
    }).then((isWritten) => {
      return isWritten;
    });
  }

  // Convert mochawesome json to html report
  Cypress.Commands.add('convertJsonToHTML', (defaultDirectory, fileName) => {
    const command =
      'npx marge ' +
      defaultDirectory +
      fileName +
      ' -f report -t "' +
      'TestSuiteReport' +
      '" -p "' +
      'TestSuiteReport' +
      '" -o ' +
      defaultDirectory;
    try {
      // run command to generate html report
      cy.task(CONSTANTS.EXECUTE_SHELL, command).then((response) => {
        if (response.stdout.includes('Reports saved')) {
          return true;
        }
        console.log(response);
        return false;
      });
    } catch (err) {
      console.log(err);
      return false;
    }
  });

  /**
   * @module main
   * @function testDataHandler
   * @description Fetching and parsing params/content from fixtures
   * @param {*} requestType - Type of request. param or content
   * @param {*} dataIdentifier - Key to be used to fetch param or content data from the fixtures
   * @example
   * cy.testDataHandler("Params","Account_Id");
   * cy.testDataHandler("Content","Device_Id");
   */
  Cypress.Commands.add('testDataHandler', (requestType, dataIdentifier) => {
    switch (requestType) {
      case CONSTANTS.PARAMS:
        const moduleName = UTILS.extractModuleName(dataIdentifier);

        // Fetching the params from json files based on dataIdentifier.
        cy.testDataParser(requestType, dataIdentifier, moduleName);
        break;
      case CONSTANTS.CONTEXT:
        const contextImportFile = CONSTANTS.CONTEXT_FILE_PATH;

        // Fetching the context value from apiObjectContext json based on dataIdentifier.
        cy.getDataFromTestDataJson(contextImportFile, dataIdentifier, requestType).then(
          (context) => {
            assert.notEqual(CONSTANTS.NO_DATA, context, CONSTANTS.TEST_HANDLER_DATA_UNDEFINED);
            return context;
          }
        );
        break;
      case CONSTANTS.CONTENT:
        if (
          typeof dataIdentifier == CONSTANTS.STRING ||
          (dataIdentifier &&
            dataIdentifier.validations &&
            dataIdentifier.validations[0].mode &&
            dataIdentifier.validations[0].mode == CONSTANTS.STATIC_CONTENT_VALIDATION)
        ) {

          // If dataIdentifier is object reading validations[0].type else using dataIdentifier as-is.
          dataIdentifier =
            typeof dataIdentifier == CONSTANTS.OBJECT
              ? dataIdentifier.validations[0].type
              : dataIdentifier;

          const moduleName = UTILS.extractModuleName(dataIdentifier);

          // Fetching the content value from JSON files based on dataIdentifier.
          cy.testDataParser(requestType, dataIdentifier, moduleName);
        } else if (
          dataIdentifier &&
          dataIdentifier.validations &&
          dataIdentifier.validations[0].mode &&
          dataIdentifier.validations[0].mode == CONSTANTS.DEVICE_CONTENT_VALIDATION
        ) {
          const deviceMAC = Cypress.env(CONSTANTS.DEVICE_MAC);

          // deviceMAC is present reading the data from the deviceMAC.json file else reading it from defaultDeviceData.json.
          const deviceDataPath = deviceMAC
            ? CONSTANTS.EXTERNAL_DEVICES_PATH + deviceMAC + '.json'
            : CONSTANTS.DEFAULT_DEVICE_DATA_PATH;

          if (!deviceMAC) {
            cy.log('Falling back to default device data path');
          }

          cy.getDataFromTestDataJson(
            deviceDataPath,
            dataIdentifier.validations[0].type,
            requestType
          ).then((data) => {
            assert.notEqual(CONSTANTS.NO_DATA, data, CONSTANTS.TEST_HANDLER_DATA_UNDEFINED);
            return data;
          });
        } else {
          assert(false, 'Invalid dataIdentifier for Content');
        }
        break;
      default:
        expect(requestType).to.be.oneOf([CONSTANTS.PARAMS, CONSTANTS.CONTEXT, CONSTANTS.CONTENT]);
    }
  });

  /**
   * @module main
   * @function testDataParser
   * @description Fetching the data from json files based on the priority as shown below
   *   External <module>.json from configModule (If applicable)
   *   Internal <module>.json from fixtures (If applicable)
   *   default.json
   * @param {*} requestType - Type of request. param or content
   * @param {*} dataIdentifier - Key to be used to fetch param or content data from the fixtures
   * @param {String} moduleName - Module file name where data is present.
   * @example
   * cy.testDataParser("Params","Account_Id", "account");
   */
  Cypress.Commands.add('testDataParser', (requestType, dataIdentifier, moduleName) => {
    const defaultImportFile = CONSTANTS.DEFAULT_PATH;

    // Check for the data in defaultTestData.json
    cy.getDataFromTestDataJson(defaultImportFile, dataIdentifier, requestType).then(
      (defaultImportData) => {
        let paramData = defaultImportData;
        if(defaultImportData == CONSTANTS.NO_DATA){
          cy.log(`Expected data ${dataIdentifier} Not Found in default file`)
        }

        // Variables that come from a module will be formatted as '<Module>_<Variable>'
        // Ex: "Device_Model" should go to "Device.json" and look up variable "Model"
        if (dataIdentifier.includes('_')) {
          moduleName = !moduleName ? UTILS.extractModuleName(dataIdentifier) : moduleName;
          dataIdentifier = dataIdentifier.slice(dataIdentifier.indexOf('_') + 1);
          const moduleImportPath = `${CONSTANTS.MODULES_PATH}${moduleName}.json`;
          const externalModulePath = `${CONSTANTS.EXTERNAL_PATH}${moduleName}.json`;

          // Data in modules directory has high priority than defaultTestData, if data is found it will be replaced with data found in defaultTestData.json
          cy.getDataFromTestDataJson(moduleImportPath, dataIdentifier, requestType).then(
            (moduleData) => {
              paramData = (moduleData != CONSTANTS.NO_DATA) ? moduleData : paramData;

              // Checking the data from the external json file only if it is present.
              cy.task(CONSTANTS.READ_FILES_FROM_DIRECTORY, CONSTANTS.CYPRESS_MODULES_PATH).then(
                (data) => {
                  if (data && data.includes(`${moduleName}.json`)) {
                    // Data in external/modules directory has high priority than defaultTestData and modules, if data is found it will be replaced with data found in modules directry/defaultTestData.json
                    cy.getDataFromTestDataJson(
                      externalModulePath,
                      dataIdentifier,
                      requestType
                    ).then((externalModuleData) => {
                      paramData = (externalModuleData != CONSTANTS.NO_DATA) ? externalModuleData : paramData;
                      if(paramData == CONSTANTS.NO_DATA){
                        assert(false, `Expected data ${dataIdentifier} was not found in the default file, FCS module JSON file, or external module JSON file.`);
                      }
                      return paramData;
                    });
                  } else {
                    if(paramData == CONSTANTS.NO_DATA){
                      assert(false, `Expected data ${dataIdentifier} was not found in default file or module JSON file.`);
                    }
                    return paramData;
                  }
                }
              );
            }
          );
        } else {
          if(paramData == CONSTANTS.NO_DATA){
            assert(false, `Expected data ${dataIdentifier} was not found in default file.`);
          }
          return paramData;
        }
      }
    );
  });

  /**
   * @module main
   * @function parseDataFromTestDataJson
   * @description Function to format the data fetched from fixtures
   * @param {*} paramData - JSON data needed to parse based on key.
   * @param {*} dataIdentifier - Key to be used to find value from paramData.
   * @example
   * cy.parseDataFromTestDataJson({"ACCESSIBILITY_CLOSEDCAPTIONS_TRUE":"true"},"ACCESSIBILITY_CLOSEDCAPTIONS_TRUE", "Params")
   */
  function parseDataFromTestDataJson(paramData, dataIdentifier, requestType) {
    let returnData;
    if (requestType == CONSTANTS.PARAMS) {
      if (paramData[dataIdentifier] !== undefined) {
        if (
          typeof paramData[dataIdentifier] == CONSTANTS.STRING ||
          typeof paramData[dataIdentifier] == CONSTANTS.BOOLEAN ||
          typeof paramData[dataIdentifier] == CONSTANTS.NUMBER ||
          paramData[dataIdentifier] === null
        ) {
          returnData = { value: paramData[dataIdentifier] };
        } else {
          returnData = paramData[dataIdentifier];
        }
      }
    } else {
      returnData = paramData[dataIdentifier];
    }

    return returnData;
  }

  /**
   * @module main
   * @function getDataFromTestDataJson
   * @description Command to fetch the data from fixtures and format the fetched data
   * @param {*} modulePath - Path of the json file.
   * @param {*} dataIdentifier - Key to be used to fetch value from the json.
   * @example
   * cy.getDataFromTestDataJson("modules/accessibility.json","ACCESSIBILITY_CLOSEDCAPTIONS_TRUE", "Params")
   */
  Cypress.Commands.add('getDataFromTestDataJson', (modulePath, dataIdentifier, requestType) => {
    cy.task("readFileIfExists",modulePath).then((data) => {
      if(data){
        data = JSON.parse(data)
        let response = parseDataFromTestDataJson(data, dataIdentifier, requestType);

        if (response !== undefined) {
          return response;
        } else {
          return CONSTANTS.NO_DATA;
        }
      }
      return CONSTANTS.NO_DATA;
    });
  });
}
