/**
 * Copyright 2024 Comcast Cable Communications Management, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import Config from './config';
import Validation from './validation';
import TransportLayer from './transport';
import Queue from './queue';
const { v4: uuidv4 } = require('uuid');
const CONSTANTS = require('../../constants/constants');
const defaultDirectory = CONSTANTS.DEFAULT_DIRECTORY;
const jsonFile = CONSTANTS.JSON_FILE_EXTENSION;
const UTILS = require('./utils');
const path = require('path');
const logger = require('../../Logger')('main.js');
const setimmediate = require('setimmediate');
let appTransport;
const flatted = require('flatted');
const _ = require('lodash');
const fcsSetterStack = require('./fcsSetterStack');
const internalV2FireboltCallsData = require('../../../fixtures/fireboltCalls/index');
const externalV2FireboltCallsData = require('../../../fixtures/external/fireboltCalls/index');
const internalV2FireboltMockData = require('../../../fixtures/fireboltCalls/index');
const externalV2FireboltMockData = require('../../../fixtures/external/fireboltCalls/index');

export default function (module) {
  const config = new Config(module);
  const validationModule = new Validation(module);
  const transport = new TransportLayer();
  Cypress.env(CONSTANTS.RESPONSE_TOPIC_LIST, []);

  // Fetch the required appTransport from config module
  appTransport = module.appTransport;

  // before All
  before(() => {
    logger.debug('Entering before() - cypress-support/src/main.js');

    // Added below custom commands to clear cache and to reload browser
    cy.clearCache();
    cy.wrap(UTILS.pubSubClientCreation(appTransport), {
      timeout: CONSTANTS.COMMUNICATION_INIT_TIMEOUT,
    }).then((result) => {
      if (result) {
        cy.log('Successfully established a pub/sub connection.');
      } else {
        cy.log('Unable to establish a pub/sub connection.');
      }
      Cypress.env('pubSubClient', appTransport);
      cy.startAdditionalServices();
    });

    // Create an instance of global queue
    const messageQueue = new Queue();
    Cypress.env(CONSTANTS.MESSAGE_QUEUE, messageQueue);
    UTILS.parseExceptionList();
    cy.getModuleReqIdJson();
    if (UTILS.getEnvVariable(CONSTANTS.PERFORMANCE_METRICS) == true) {
      cy.startOrStopPerformanceService(CONSTANTS.INITIATED).then((response) => {
        if (response) {
          Cypress.env(CONSTANTS.IS_PERFORMANCE_METRICS_ENABLED, true);
        }
      });
    } else {
      cy.log(CONSTANTS.PERFORMANCE_METRICS_NOT_ACTIVE);
    }
    // Merge fireboltCalls - Commented temporarily. Moved to beforeEach
    // const v1FireboltCallsData = UTILS.getEnvVariable('fireboltCallsJson');
    // const v2FireboltCallsData = _.merge(
    //   {},
    //   internalV2FireboltCallsData,
    //   externalV2FireboltCallsData
    // );

    // cy.mergeFireboltCallJsons(v1FireboltCallsData, v2FireboltCallsData).then(
    //   (mergedFireboltCalls) => {
    //     Cypress.env(CONSTANTS.COMBINEDFIREBOLTCALLS, mergedFireboltCalls);
    //   }
    // );

    // Merge fireboltMocks
    const v1FireboltMockData = UTILS.getEnvVariable('fireboltMocksJson');
    const combinedFireboltMockData = {
      ...v1FireboltMockData,
      ...internalV2FireboltMockData,
      ...externalV2FireboltMockData,
    };

    Cypress.env(CONSTANTS.COMBINEDFIREBOLTMOCKS, combinedFireboltMockData);

    // Unflatten the openRPC data
    const flattedOpenRpc = UTILS.getEnvVariable(CONSTANTS.DEREFERENCE_OPENRPC);
    const unflattedOpenRpc = flatted.parse(flattedOpenRpc);
    Cypress.env(CONSTANTS.DEREFERENCE_OPENRPC, unflattedOpenRpc);

    const pattern = /(2|\d{2,})\.\d+\.\d+/;
    const sdkVersion = UTILS.getEnvVariable(CONSTANTS.SDK_VERSION, false);
    Cypress.env(CONSTANTS.IS_BIDIRECTIONAL_SDK, pattern.test(sdkVersion));
    // test code, this will be removed once testing is done.
    // ----------------------------------------
    if (sdkVersion == '2.0.0') {
      Cypress.env(CONSTANTS.SDK_VERSION, '1.3.0');
    }
    // ----------------------------------------
    // const requestMap = {
    //   method: CONSTANTS.REQUEST_OVERRIDE_CALLS.NOTIFY_FIREBOLT_VERSION,
    //   params: { version: sdkVersion },
    // };
    // cy.sendMessagetoPlatforms(requestMap).then((response) => {
    //   fireLog.info(JSON.stringify(response));
    //   cy.wait(5000);
    // });
  });

  // beforeEach
  beforeEach(() => {
    cy.getBeforeOperationObject();
    cy.initiatePerformanceMetrics();
    UTILS.destroyGlobalObjects([CONSTANTS.LIFECYCLE_APP_OBJECT_LIST]);

    // Merge fireboltCalls - Temporary fix to populate env variable between steps
    const v1FireboltCallsData = UTILS.getEnvVariable('fireboltCallsJson');
    const v2FireboltCallsData = _.merge(
      {},
      internalV2FireboltCallsData,
      externalV2FireboltCallsData
    );

    cy.mergeFireboltCallJsons(v1FireboltCallsData, v2FireboltCallsData).then(
      (mergedFireboltCalls) => {
        Cypress.env(CONSTANTS.COMBINEDFIREBOLTCALLS, mergedFireboltCalls);
      }
    );
  });

  /**
   * @module main
   * @function getModuleReqIdJson
   * @description Combine the moduleReqId json present in FCS and configmodules.
   * @example
   * getModuleReqIdJson()
   */
  Cypress.Commands.add('getModuleReqIdJson', () => {
    cy.task(CONSTANTS.READFILEIFEXISTS, CONSTANTS.FCS_MODULEREQID_PATH).then((fcsData) => {
      cy.task(CONSTANTS.READFILEIFEXISTS, CONSTANTS.EXTERNAL_MODULEREQID_PATH).then(
        (externalData) => {
          if (fcsData && externalData) {
            fcsData = JSON.parse(fcsData);
            externalData = JSON.parse(externalData);
            if (fcsData.scenarioNames && externalData.scenarioNames) {
              const FCS = Object.keys(fcsData.scenarioNames);
              const config = Object.keys(externalData.scenarioNames);
              let fcsModulesData, configModulesData;

              // Loop through all the modules from moduleReqId json
              FCS.map((module) => {
                // Check whether the module present in FCS moduleReqId present in external moduleReqId
                if (config?.includes(module)) {
                  fcsModulesData = Object.keys(fcsData.scenarioNames[module]);
                  configModulesData = Object.keys(externalData.scenarioNames[module]);
                  fcsModulesData.map((scenario) => {
                    // Check whether the scenario present in FCS moduleReqId present in external moduleReqId
                    if (configModulesData?.includes(scenario)) {
                      const scenarioValueKeys = Object.keys(
                        externalData.scenarioNames[module][scenario]
                      );
                      // Combine both the scenario objects
                      scenarioValueKeys.map((key) => {
                        fcsData.scenarioNames[module][scenario][key] =
                          externalData.scenarioNames[module][scenario][key];
                      });
                    }
                  });
                  // Add scenario from external moduleReqId to FCS moduleReqId if they are missing in FCS
                  configModulesData.map((scenario) => {
                    if (!fcsModulesData.includes(scenario)) {
                      fcsData.scenarioNames[module][scenario] =
                        externalData.scenarioNames[module][scenario];
                    }
                  });
                }
              });
              // Add modules from external moduleReqId to FCS moduleReqId if they are missing in FCS
              config.map((module) => {
                if (!FCS.includes(module)) {
                  fcsData.scenarioNames[module] = externalData.scenarioNames[module];
                }
              });
              Cypress.env(CONSTANTS.MODULEREQIDJSON, fcsData);
            } else {
              assert(
                false,
                'scenarioNames is missing in module requirementId json in FCS/ external module'
              );
            }
          } else {
            if (!fcsData) {
              assert(false, 'Module requirementId json file is missing in fixtures');
            }
            fcsData = JSON.parse(fcsData);
            Cypress.env(CONSTANTS.MODULEREQIDJSON, fcsData);
          }
        }
      );
    });
  });

  afterEach(() => {
    // Make a clear all event listeners call and clear the deregister the events
    // Need to see what method name can be passed here, instead of device.name.
    const requestMap = {
      method: CONSTANTS.REQUEST_OVERRIDE_CALLS.CLEAR_ALL_LISTENERS,
      params: null,
    };
    cy.sendMessagetoPlatforms(requestMap).then((response) => {
      fireLog.info(
        `Response from firstParty app for clearAllListeners: ${JSON.stringify(response)}`
      );
    });

    // Check the appLaunch count, if count is greater than 0, then 3rd party app is launched and clear all listeners
    if (UTILS.getEnvVariable(CONSTANTS.APP_LAUNCH_COUNT, false) > 0) {
      const appId = UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID);
      const requestTopic = UTILS.getTopic(appId);
      const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);
      const intent = UTILS.createIntentMessage(CONSTANTS.TASK.CLEAR_ALL_LISTENERS, {});
      cy.sendMessagetoApp(requestTopic, responseTopic, intent).then((response) => {
        fireLog.info(
          `Response from ${Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID)} for clearAllListeners: ${JSON.stringify(response)}`
        );
      });
    }
    Cypress.env(CONSTANTS.GLOBAL_EVENT_OBJECT_LIST, []);
  });

  // after All
  after(() => {
    (async () => {
      try {
        if (UTILS.getEnvVariable(CONSTANTS.IS_PERFORMANCE_METRICS_ENABLED, false) == true) {
          cy.startOrStopPerformanceService(CONSTANTS.STOPPED).then((response) => {
            if (response) {
              Cypress.env(CONSTANTS.IS_PERFORMANCE_METRICS_ENABLED, false);
            }
          });
        }
        // unsubscribing the list of topics
        appTransport.unsubscribe(UTILS.getEnvVariable(CONSTANTS.RESPONSE_TOPIC_LIST));
        await transport.unsubscribe();

        // Unsubscribe from WebSocket if the client is available
        const webSocketClient = UTILS.getEnvVariable('webSocketClient', false);
        if (webSocketClient) {
          UTILS.unsubscribe(webSocketClient);
          Cypress.env('webSocketClient', null); // Clear the WebSocket client from Cypress environment
        }
      } catch (err) {
        logger.error(`Something went wrong when attempting to unsubscribe: ${err}`);
        cy.log(`Something went wrong when attempting to unsubscribe: ${err}`);
      }
    })();
  });

  /**
   * @module main
   * @function sendMessagetoPlatforms
   * @description send message based on platform which will be pulled from config manager.
   * @param {*} requestMap - requestMap should contain method and param etc.
   * @param {Number} responseWaitTime - responseWaitTime is the time to wait for the response from the platform.
   * @example
   * cy.sendMessagetoPlatforms({"method": "closedCaptioning", "param": {}})
   * cy.sendMessagetoPlatforms({"method": "closedCaptioning", "param": {}}, 20000)
   */

  Cypress.Commands.add('sendMessagetoPlatforms', (requestMap, responseWaitTime) => {
    // The requestTimeout is calculated to ensure a valid timeout value is passed to the wrap function.
    // However, if the responseWaitTime is undefined, it is handled by the transport layer.
    const requestTimeout =
      typeof responseWaitTime === 'number' && responseWaitTime > 0
        ? responseWaitTime
        : CONSTANTS.LONGPOLL_TIMEOUT;
    return cy.wrap(requestMap).then({ timeout: requestTimeout + 10000 }, () => {
      return new Promise((resolve, reject) => {
        let responsePromise;
        const [moduleName, methodName] = requestMap.method.split('.');
        // Push method onto the stack
        fcsSetterStack.pushMethod(requestMap.method);
        // Check if request is for FCS setters
        if (moduleName === CONSTANTS.FCS_SETTER) {
          const method = config.getRequestOverride(moduleName, methodName);
          if (typeof method === 'function') {
            const params = requestMap.params || {};
            const argCount = method.length;
            const paramsCount = Object.keys(params).length;
            // Validate number of request parameters matches the fcsSetter argument count
            if (paramsCount > argCount || (argCount > 0 && paramsCount === 0)) {
              reject(
                new Error(
                  `${requestMap.method} expects ${argCount} arguments, but got ${paramsCount} params`
                )
              );
            }
            // Based on the fcsSetter method params,resolve the arguments
            const argResolvers = {
              0: () => [], // No arguments expected
              1: () => [params.value], // Single argument: use params.value
              2: () => [params.attribute ?? null, params.value], // Two arguments: use params.attribute and params.value
            };
            // Dynamically resolve arguments using the resolver
            const args = argResolvers[argCount]?.() || [];
            // Dynamically call the method with the params to store the promise and to ensure waiting
            responsePromise = Promise.resolve(method(...args));
          } else {
            reject(setterNotImplemented('not implemented'));
          }
        } else {
          // Default logic for other methods and wrap `invokeRequestOverride` to ensure it's always a Promise
          responsePromise = Promise.resolve(config.invokeRequestOverride(requestMap)).then(
            (message) => {
              // Perform MTC/FB call only if the message is not null
              if (message != null) {
                return transport
                  .sendMessage(message, responseWaitTime)
                  .then((res) => config.invokeResponseOverride(res));
              } else {
                return null;
              }
            }
          );
        }
        // Ensure Cypress waits for responsePromise before resolving and remove method from stack
        responsePromise
          .then((response) => {
            resolve(response);
          })
          .catch(reject)
          .finally(() => {
            fcsSetterStack.popMethod(); // Pop method from the stack
          });
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
   * @function startTest
   * @description Start the sanity test using datable.
   * @param {Object} datatables - Contains the input variable to override default value to run suite files (Ex: appId, SDK mode)
   * @example
   * startTest({"rawTable": [ ["paramType","variableName","value"]]})
   */
  Cypress.Commands.add('startTest', (datatables) => {
    logger.debug('Entering startTest() - cypress-support/src/main.js');

    const additionalParams = {};
    let overrideParams = {};
    let appId;

    const sanityTimeout = UTILS.getEnvVariable(CONSTANTS.SANITY_REPORT_POLLING_TIMEOUT, false)
      ? UTILS.getEnvVariable(CONSTANTS.SANITY_REPORT_POLLING_TIMEOUT)
      : CONSTANTS.SANITY_REPORT_LONGPOLL_TIMEOUT;

    // Iterating through the datatables and updating the values to additionalParams object.
    if (datatables) {
      datatables.hashes().forEach((datatable) => {
        if (datatable.paramType == CONSTANTS.INPUT) {
          if (datatable.variableName && datatable.value) {
            additionalParams[datatable.variableName] = datatable.value;
          }
        }
        if (datatable.paramType == CONSTANTS.CONFIG) {
          if (datatable.variableName == CONSTANTS.APP_ID) {
            appId = UTILS.getEnvVariable(datatable.value);
          }
        } else {
          appId = UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID);
        }
      });
    }

    // Overriding default value for mode, if input is not there from feature file or cli.
    const mode = CONSTANTS.MODE_TRANSPORT; // default to Transport
    if (UTILS.getEnvVariable(CONSTANTS.SUITE_COMMUNICATION_MODE, false)) {
      additionalParams[CONSTANTS.COMMUNICATION_MODE] = UTILS.getEnvVariable(
        CONSTANTS.SUITE_COMMUNICATION_MODE
      );
    } else {
      additionalParams[CONSTANTS.COMMUNICATION_MODE] = mode;
    }

    // Overriding default value for action, if input is not there from feature file or cli.
    const testRunnable = cy.state('runnable');
    const action = UTILS.determineActionFromFeatureFile(testRunnable);

    if (!additionalParams[CONSTANTS.ACTION] && !UTILS.getEnvVariable(CONSTANTS.ACTION, false)) {
      additionalParams[CONSTANTS.ACTION] = action;
    } else if (
      (!additionalParams[CONSTANTS.ACTION] || additionalParams[CONSTANTS.ACTION]) &&
      UTILS.getEnvVariable(CONSTANTS.ACTION, false)
    ) {
      additionalParams[CONSTANTS.ACTION] = UTILS.getEnvVariable(CONSTANTS.ACTION);
    }

    overrideParams.certification = UTILS.getEnvVariable(CONSTANTS.CERTIFICATION, false);
    overrideParams.exceptionMethods = UTILS.generateCombinedExceptionList();
    overrideParams.additionalContext = UTILS.getEnvVariable(CONSTANTS.ADDITIONAL_CONTEXT, false);
    // If certification is true override excluded methods and modules from config module if it is present else use the default lists in constants.
    if (overrideParams.certification == true) {
      overrideParams = UTILS.overideParamsFromConfigModule(overrideParams);
    }

    // Pass overrideParams along with additionalParams to intent addon
    additionalParams.overrideData = overrideParams;
    cy.runIntentAddon(CONSTANTS.TASK.RUNTEST, additionalParams).then((parsedIntent) => {
      // Extract and store overrideParams from parsed intent and delete once done
      overrideParams = parsedIntent.overrideData;
      delete parsedIntent.overrideData;
      // Create intent message using the parsed intent and override params
      const intent = UTILS.createIntentMessage(
        CONSTANTS.TASK.RUNTEST,
        overrideParams,
        parsedIntent
      );
      const requestTopic = UTILS.getTopic(appId);
      const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);

      if (!UTILS.getEnvVariable(CONSTANTS.DEVICE_MAC)) {
        cy.log(CONSTANTS.DEVICE_MAC_UNAVAILABLE).then(() => {
          assert(
            false,
            `Device MAC address is not available. Make sure this value is added in cypress.config.js or passed as an environment variable with the cli.`
          );
        });
      }

      cy.sendMessagetoApp(requestTopic, responseTopic, intent, sanityTimeout).then((response) => {
        cy.log('Response from Firebolt Implementation: ' + response);

        if (response === CONSTANTS.RESPONSE_NOT_FOUND) {
          fireLog.fail(`Did not receive response in ${sanityTimeout}ms. at topic ${responseTopic}`);
        } else {
          try {
            response = JSON.parse(response);
          } catch (error) {
            logger.error('Failed to parse JSON response. Response: ', JSON.stringify(response));
            assert(
              false,
              'Failed to parse JSON response from Firebolt implementation. Please check the response format.'
            );
          }

          assert.exists(
            response.report,
            'The response does not contain the expected "report" object. Ensure the Firebolt implementation returns a valid response with a "report" field.'
          );

          // Writing sanity mochawesome json to file when jobId is present.
          if (UTILS.getEnvVariable(CONSTANTS.JOBID, false)) {
            const reportPath = CONSTANTS.SANITY_REPORT_FILE_PATH;
            cy.task(CONSTANTS.WRITE_TO_FILE, {
              fileName: reportPath,
              data: JSON.stringify(response.report),
            });
          }

          cy.generateAndPushReports(response.report);
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
   * runIntentAddon("runTest", {"communicationMode": "SDK","action": "CORE"})
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
   * @function startAdditionalServices
   * @description Executes external services defined in the config module, if available.
   *  - This command will look for the `startAdditionalServices` function present in the `additionalServices/index.js` file. If present, it will be invoked; otherwise, nothing will happen.
   *  - By default, this will look for the `startAdditionalServices` function in the config module. If we want to execute another function instead of `startAdditionalServices`, we can override the default function by passing the function name from the command line for the parameter `externalService`.
   * @param {string} input - parameters passing to external function
   * @example
   * startAdditionalServices({})
   */
  Cypress.Commands.add('startAdditionalServices', (input) => {
    // This defaults to checking for the startAdditionalServices function in the config module, but it can be overridden via the command.
    const serviceName = Cypress.env(CONSTANTS.EXTERNAL_SERVICE_FUNCTION)
      ? Cypress.env(CONSTANTS.EXTERNAL_SERVICE_FUNCTION)
      : 'startAdditionalServices';
    if (
      module &&
      module.additionalServices &&
      typeof module.additionalServices[serviceName] === 'function'
    ) {
      module.additionalServices[serviceName](input);
    }
  });

  /**
   * @module main
   * @function sendMessagetoApp
   * @description Publish a message and fetch response from app based on arguments
   * @param {string} requestTopic - Topic used to publish message
   * @param {string} responseTopic - Topic used to subscribe message
   * @param {Object} intent - Basic intent message that will applicable to ALL platforms to start the test on FCA.
   * @param {Number} longPollTimeout -  longPollTimeout is the time to wait for the response from the app.
   * @example
   * cy.sendMessagetoApp('mac_appId_FCS',mac_appId_FCA,{"communicationMode": "SDK","action": "search"}, 1000)
   */
  Cypress.Commands.add(
    'sendMessagetoApp',
    async (requestTopic, responseTopic, intent, longPollTimeout) => {
      logger.debug(
        `Entering sendMessagetoApp() - cypress-support/src/main.js with params: requestTopic=${requestTopic}, responseTopic=${responseTopic}, intent=${JSON.stringify(intent)}`
      );

      const headers = { id: uuidv4() };

      // If 'sanityReportPollingTimeout' is undefined taking default timeout as 15 seconds.
      longPollTimeout = longPollTimeout ? longPollTimeout : CONSTANTS.LONGPOLL_TIMEOUT;
      // Subscribing to the topic when the topic is not subscribed.
      if (
        responseTopic != undefined &&
        !UTILS.getEnvVariable(CONSTANTS.RESPONSE_TOPIC_LIST).includes(responseTopic)
      ) {
        // Subscribe to topic and pass the results to the callback function
        appTransport.subscribe(responseTopic, UTILS.subscribeResults);
        UTILS.getEnvVariable(CONSTANTS.RESPONSE_TOPIC_LIST).push(responseTopic);
      }

      if (appTransport) {
        // Publish the message on topic
        appTransport.publish(requestTopic, JSON.stringify(intent), headers);

        // Returns the response after polling when data is available in queue
        return UTILS.getEnvVariable(CONSTANTS.MESSAGE_QUEUE)
          .LongPollQueue(headers.id, longPollTimeout)
          .then((results) => {
            if (results) {
              // Response recieved from queue
              logger.debug(`Response received from queue: ${JSON.stringify(results)}`);
              return results;
            } else if (Cypress.env(CONSTANTS.IS_RPC_ONLY)) {
              return true;
            }
          });
      } else {
        cy.log(CONSTANTS.APP_TRANSPORT_UNAVAILABLE).then(() => {
          fireLog.fail(CONSTANTS.APP_TRANSPORT_UNAVAILABLE);
        });
      }
    }
  );

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
      const isWritten = UTILS.writeJsonToFileForReporting(jsonObj, outputDirectory, fileNamePrefix);
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
      logger.info(
        'CONSTANTS.GENERATE_HTML_REPORT should be set to true in order to generate html report',
        'generateAndPushReports'
      );
    }
  });

  /**
   * @module commands
   * @function callConfigModule
   * @description Check the configModule for the function and call it with the params.
   * @param {String} methodName - Name of the function to be called from the config module.
   * @param {Array} params=[] - Optional array of parameters to pass to the method.
   * @param {string} moduleName - Name of the module from which method has to be retrieved,by default additionalServices.
   * @example
   * cy.callConfigModule('methodName', ['arg1', 'arg2'], 'moduleName');
   */

  Cypress.Commands.add(
    'callConfigModule',
    (methodName, params = [], moduleName = 'additionalServices') => {
      console.log(`Calling "${methodName}" from configModule.${moduleName} with params:`, params);

      return cy.then(() => {
        const configFunction = module?.[moduleName]?.[methodName];
        if (typeof configFunction !== 'function') {
          console.log(`${moduleName}.${methodName} not found in the config module.`);
          return null;
        }
        return configFunction(...params);
      });
    }
  );

  /**
   * @module customValidation
   * @function customValidation
   * @description Command to execute the custom validations in configModule
   * @param {*} functionName - The name of custom validation function
   * @param {*} apiOrEventObject - The response of the method or event
   * @example
   * cy.customValidation("customMethod1","apiResponseObject")
   */

  Cypress.Commands.add('customValidation', (fcsValidationObjectData, apiOrEventObject) => {
    // to check whether validationObject has assertionDef as the field
    if (fcsValidationObjectData && fcsValidationObjectData.assertionDef) {
      const functionName = fcsValidationObjectData.assertionDef;
      // to check whether config module has customValidations function
      if (module && module.customValidations) {
        const configCustomValidation = module.customValidations[functionName];
        // to check whether customValidations has a function as the functionName passed
        if (configCustomValidation && typeof configCustomValidation === 'function') {
          // when the validation states FCS needs to wait before proceeding with the test
          const waitForCustom = fcsValidationObjectData.waitForCompletion;
          if (waitForCustom && waitForCustom === true) {
            const customTimeout = fcsValidationObjectData.waitLimit
              ? fcsValidationObjectData.waitLimit
              : UTILS.getEnvVariable(CONSTANTS.CUSTOM_VALIDATION_TIMEOUT);
            cy.then({ timeout: customTimeout }, async () => {
              message = await configCustomValidation(apiOrEventObject, fcsValidationObjectData);
            });
          } else {
            message = configCustomValidation(apiOrEventObject, fcsValidationObjectData);
          }
        } else if (
          // if customValidations doesn't have a function as the functionName passed
          !module.customValidations[functionName] ||
          typeof module.customValidations[functionName] != 'function'
        ) {
          assert(
            false,
            `Expected customValidationMethod ${functionName} was not found in the validationFunctions file. More info - ${CONSTANTS.CUSTOM_METHOD_PATH}`
          );
        }
      } else {
        // if config module doesn't have customValidations function
        assert(
          false,
          `Expected customValidationMethod ${functionName} was not found in the validationFunctions file. More info - ${CONSTANTS.CUSTOM_METHOD_PATH}`
        );
      }
    } else {
      // if config module doesn't have customValidations function
      assert(
        false,
        `Expected customValidationMethod was not found in the validationObject. More info - ${CONSTANTS.CUSTOM_METHOD_PATH}`
      );
    }
  });
}
