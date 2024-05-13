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
const CONSTANTS = require('../constants/constants');
const { _ } = Cypress;
import UTILS from '../cypress-support/src/utils';
const logger = require('../Logger')('command.js');

/**
 * @module commands
 * @function mergeJsonfiles
 * @description Merging json files from the provided path.
 * @param {*} path - Folder path of the json files.
 * @example
 * cy.mergeJsonfiles('tmp/');
 */
Cypress.Commands.add('mergeJsonfiles', (path) => {
  cy.task('readFilesFromDir', path).then((files) => {
    // Appending file path to the list of file names
    if (files != null) {
      files.forEach((element, index) => (files[index] = path + element));

      // Merging all json files
      cy.task('mergeMultipleJson', files).then((result) => {
        return result;
      });
    }
  });
});

/**
 * @module commands
 * @function getFireboltData
 * @description Fetching the firebolt data contains method/params/context based on the key value.
 * @param {String} key - key name of the firebolt data.
 * @example
 * cy.getFireboltData('GET_DEVICE_ID');
 */
Cypress.Commands.add(
  'getFireboltData',
  (key, callType = CONSTANTS.SUPPORTED_CALLTYPES.FIREBOLTCALLS) => {
    // Reading the data from combinedJson based on key.
    let fireboltData;
    if (callType == CONSTANTS.SUPPORTED_CALLTYPES.FIREBOLTMOCKS) {
      fireboltData = UTILS.getEnvVariable(CONSTANTS.COMBINEDFIREBOLTMOCKS)[key];
    } else {
      fireboltData = UTILS.getEnvVariable(CONSTANTS.COMBINEDFIREBOLTCALLS)[key];
    }
    if (!fireboltData) {
      cy.log(CONSTANTS.NO_DATA_FOR_THE_KEY + key).then(() => {
        assert(false, CONSTANTS.NO_DATA_FOR_THE_KEY + key);
      });
    }
    return fireboltData;
  }
);

/**
 * @module commands
 * @function fetchParamBasedOnType
 * @description Fetching the params from testDataHandler or returning as it is if params is object.
 * @param {*} params - key name of the firebolt data.
 * @example
 * cy.fetchParamBasedOnType('GET_DEVICE_ID');
 * cy.fetchParamBasedOnType({});
 */
Cypress.Commands.add('fetchParamBasedOnType', (params) => {
  if (typeof params === CONSTANTS.TYPE_STRING) {
    cy.testDataHandler(CONSTANTS.PARAMS, params).then((parsedTestData) => {
      return parsedTestData;
    });
  } else if (typeof params === CONSTANTS.TYPE_OBJECT) {
    return params;
  }
});

/**
 * @module commands
 * @function fireboltDataParser
 * @description Reading the firebolt data based on key and parsing the method, params and context etc.
 * @param {String} key - key name of the firebolt data contains method/param/context.
 * @param {String} sdk - sdk name Ex: Firebolt.
 * @example
 * cy.fireboltDataParser('get device id', 'Firebolt');
 * @Result
 * { method: 'device.id', param: {}, context: {}, action: 'core', expected: 'result'}
 */
Cypress.Commands.add('fireboltDataParser', (key, sdk = CONSTANTS.SUPPORTED_SDK[0]) => {
  const results = [];
  Cypress.env(CONSTANTS.IS_SCENARIO_EXEMPTED, false);
  if (CONSTANTS.SUPPORTED_SDK.includes(sdk)) {
    key = key.replaceAll(' ', '_').toUpperCase();

    // Fetching the firebolt Data based on key value.
    return cy.getFireboltData(key).then((fireboltData) => {
      // Check if fireboltData is an array or an object
      const fireboltItems = Array.isArray(fireboltData) ? fireboltData : [fireboltData];

      // Process each firebolt call item
      const promises = fireboltItems.map((item) => {
        let method = item.method;
        const params = item.params ? item.params : CONSTANTS.NO_PARAMS;
        const context = item.context ? item.context : CONSTANTS.NO_CONTEXT;
        const expected = item.expected ? item.expected : CONSTANTS.RESULT;
        let action = CONSTANTS.ACTION_CORE.toLowerCase();

        // If method contains sdk name splitting it and updating action and method value. Ex: manage_device.name
        if (method && method.includes('_')) {
          action = method.split('_')[0];
          method = method.split('_')[1];
        }

        // Reading the context value based on the context key name.
        return cy.testDataHandler(CONSTANTS.CONTEXT, context).then((parsedContext) => {
          // Fetching the Params based on type, If param is object using as-is else fetching it by using testDataHandler.
          return cy.fetchParamBasedOnType(params).then((parsedTestData) => {
            results.push({
              method: method,
              params: parsedTestData,
              context: parsedContext,
              action: action,
              expected: expected,
            });
          });
        });
      });

      return Cypress.Promise.all(promises).then(() => {
        return results;
      });
    });
  } else {
    assert(false, `${sdk} SDK not Supported`);
  }
});

/**
 * @module commands
 * @function getSdkVersion
 * @description Making device.version API call to platform to get SDK version. If not found, get from Firebolt-specification URL, or get from fixtures.
 * @example
 * cy.getSdkVersion()
 */
// TODO: Planning to move it out of FCS and keep it in configModule
// Reason: If refui is not there and certification=false then sendMessageToPlatofrms will not have device.version.sdk value.
Cypress.Commands.add('getSdkVersion', () => {
  let latestSDKversion;
  const platformSDKVersion = UTILS.getEnvVariable(CONSTANTS.ENV_PLATFORM_SDK_VERSION, false);
  if (platformSDKVersion) {
    return platformSDKVersion;
  } else {
    // fetching latestSDKversion from Firebolt-specificaiton URL
    cy.request({
      url: UTILS.getEnvVariable(CONSTANTS.FIREBOLT_SPECIFICATION_URL),
      failOnStatusCode: false,
    })
      .then((fireboltSpecJson) => {
        // If there is a version in fireboltSpecJson response, using it, otherwise taking the latest version from the fixtures.
        if (
          fireboltSpecJson.status == 200 &&
          fireboltSpecJson?.body?.apis &&
          Object.values(fireboltSpecJson.body.apis)[0]?.info?.version
        ) {
          latestSDKversion = Object.values(fireboltSpecJson.body.apis)[0].info.version;
          return latestSDKversion;
        } else {
          cy.getLatestFireboltJsonFromFixtures().then((latestSDKversion) => {
            return latestSDKversion;
          });
        }
      })
      .then((latestSDKversion) => {
        // Calling device.version API
        cy.getDeviceVersion().then((response) => {
          // If the response is invalid, assign the latest SDK version to the environment variable.
          if (response?.api?.readable && response.sdk?.readable) {
            // Obtaining the api version from the response when certification is true, otherwise taking the sdk version.
            // When certification is true, certifying the platform. Hence the platform version is used which is returned by device.version.api
            // When certification is false, trying to test the platform. Hence the SDK Version is used which is returned by device.version.sdk
            const deviceSDKversionJson =
              UTILS.getEnvVariable(CONSTANTS.CERTIFICATION, false) == true
                ? response.api
                : response.sdk;
            const readableSDKVersion = deviceSDKversionJson.readable;

            // If the readable SDK version contains a next|proposed, assigning the readable version to the environment variable, otherwise taking the device SDK version.
            Cypress.env(
              CONSTANTS.ENV_PLATFORM_SDK_VERSION,
              readableSDKVersion.includes(CONSTANTS.NEXT) ||
                readableSDKVersion.includes(CONSTANTS.PROPOSED)
                ? readableSDKVersion
                : `${deviceSDKversionJson.major}.${deviceSDKversionJson.minor}.${deviceSDKversionJson.patch}`
            );
            return;
          }
          Cypress.env(CONSTANTS.ENV_PLATFORM_SDK_VERSION, latestSDKversion);
        });
      });
  }
});

/**
 * @module commands
 * @function getDeviceVersion
 * @description Making device.version API call to get SDK version.
 * @example
 * cy.getDeviceVersion()
 */
Cypress.Commands.add('getDeviceVersion', () => {
  const requestMap = {
    method: CONSTANTS.DEVICE_VERSION,
    param: {},
    action: CONSTANTS.ACTION_CORE.toLowerCase(),
  };

  cy.sendMessagetoPlatforms(requestMap).then((response) => {
    try {
      if (response && response.result) {
        return response.result;
      } else {
        throw 'Obtained response is null|undefined';
      }
    } catch (error) {
      cy.log('Failed to fetch device.version', error);
    }
  });
});

/**
 * @module commands
 * @function getLatestFireboltJsonFromFixtures
 * @description Get the firebolt.json folder names from fixtures/versions and return the latest file
 * @example
 * cy.getLatestFireboltJsonFromFixtures()
 */
Cypress.Commands.add('getLatestFireboltJsonFromFixtures', () => {
  cy.task('readFilesFromDir', 'cypress/fixtures/versions/').then((filesData) => {
    try {
      // Reading a greater version value from the versions folder.
      const version = filesData
        .map((file) =>
          file
            .split('.')
            .map((n) => +n + 100000)
            .join('.')
        )
        .sort()
        .map((file) =>
          file
            .split('.')
            .map((n) => +n - 100000)
            .join('.')
        )
        .pop();

      return version;
    } catch (err) {
      assert.equal(true, err, 'Error while fetching latest version from the fixtures');
    }
  });
});

/**
 * @module commands
 * @function getFireboltJsonData
 * @description Get the firebolt.json based on the url
 * @example
 * cy.getFireboltJsonData()
 */
Cypress.Commands.add('getFireboltJsonData', () => {
  let FIREBOLT_SPECIFICATION_URL;
  const envPlatformSdkVersion = UTILS.getEnvVariable(CONSTANTS.ENV_PLATFORM_SDK_VERSION);

  // Reading the path of the firebolt.json file from the environment variable based on the SDK version.
  if (envPlatformSdkVersion.includes(CONSTANTS.NEXT)) {
    FIREBOLT_SPECIFICATION_URL = UTILS.getEnvVariable(CONSTANTS.FIREBOLT_SPECIFICATION_NEXT_URL);
    cy.log(`Using the next version of firebolt.json`);
  } else if (envPlatformSdkVersion.includes(CONSTANTS.PROPOSED)) {
    FIREBOLT_SPECIFICATION_URL = UTILS.getEnvVariable(
      CONSTANTS.FIREBOLT_SPECIFICATION_PROPOSED_URL
    );
    cy.log(`Using the proposed version of firebolt.json`);
  } else {
    FIREBOLT_SPECIFICATION_URL = UTILS.getEnvVariable(CONSTANTS.FIREBOLT_SPECIFICATION_URL).replace(
      CONSTANTS.LATEST,
      envPlatformSdkVersion
    );
    cy.log(`Using the ${envPlatformSdkVersion} version of firebolt.json`);
  }

  cy.request({ url: FIREBOLT_SPECIFICATION_URL, failOnStatusCode: false }).then((data) => {
    // Get firebolt.json content from the FIREBOLT_SPECIFICATION_URL if the cy.request is success
    data = null;
    if (data && data.status == 200) {
      data = data.body;
      return data;
    }

    //  If cy.request fails, get specific firebolt.json from -cypress/fixtures/versions/${Cypress.env(CONSTANTS.ENV_PLATFORM_SDK_VERSION)}/firebolt.json
    else {
      const configImportPath = `cypress/fixtures/versions/${UTILS.getEnvVariable(
        CONSTANTS.ENV_PLATFORM_SDK_VERSION
      )}/firebolt.json`;

      cy.task('readFileIfExists', configImportPath).then((data) => {
        if (data) {
          return JSON.parse(data);
        } else {
          // Get the latest firebolt.json from fixtures if all other options fail
          cy.getLatestFireboltJsonFromFixtures().then((latestSDKversion) => {
            cy.fixture(`versions/${latestSDKversion}/firebolt.json`).then((data) => {
              return data;
            });
          });
        }
      });
    }
  });
});

/**
 * @module commands
 * @function getCapabilities
 * @description Creating capabilities list from the firebolt config json.
 * @example
 * cy.getCapabilities()
 */
Cypress.Commands.add('getCapabilities', () => {
  Cypress.env('capabilitiesList', null);
  try {
    const fireboltConfig = UTILS.getEnvVariable(CONSTANTS.FIREBOLTCONFIG);
    const capabilitiesList = [];

    // looping through firebolt Config capabilities and extracting capability names and storing it in a list.
    if (fireboltConfig && fireboltConfig.capabilities) {
      for (const key in fireboltConfig.capabilities) {
        capabilitiesList.push(key);
      }
      const capabilityObject = new Object();
      capabilityObject.capabilities = capabilitiesList;
      Cypress.env('capabilitiesList', capabilityObject);
    }
  } catch (error) {
    cy.log('Error while getting capabilities from firebolt config: ', error);
  }
});

/**
 * @module commands
 * @function thirdPartyAppHealthcheck
 * @description Checking third party App connection status
 * @param {string} requestTopic - Topic used to publish message
 * @param {string} responseTopic - Topic used to subscribe message
 * @example
 * cy.thirdPartyAppHealthcheck(mac_appId_FCS, mac_appId_FCA)
 */
Cypress.Commands.add('thirdPartyAppHealthcheck', (requestTopic, responseTopic) => {
  // Creating intent message with healthCheck task
  const intentMessage = UTILS.createIntentMessage(CONSTANTS.TASK.HEALTHCHECK);
  sendMessageToAppWithRetry(
    requestTopic,
    responseTopic,
    intentMessage,
    UTILS.getEnvVariable(CONSTANTS.HEALTH_CHECK_RETRIES)
  );
});

// Sending message to third party app to check the connection status with retry logic
function sendMessageToAppWithRetry(requestTopic, responseTopic, intentMessage, retryCount) {
  cy.sendMessagetoApp(requestTopic, responseTopic, intentMessage).then((response) => {
    if (response == CONSTANTS.NO_RESPONSE && retryCount > 0) {
      retryCount = retryCount - 1;
      return sendMessageToAppWithRetry(requestTopic, responseTopic, intentMessage, retryCount);
    } else {
      return response;
    }
  });
}

/**
 * @module commands
 * @function getBeforeOperationObject
 * @description Fetching beforeOperation object from moduleReqId json
 * @example
 * cy.getBeforeOperationObject()
 */
Cypress.Commands.add('getBeforeOperationObject', () => {
  let beforeOperation;
  // Fetching current scenario name. Get the cypress context
  const featureFileName = cy.state().test.parent.title;
  let scenarioName = cy.state().test.title;
  if (scenarioName.includes('(example')) {
    scenarioName = scenarioName.split('(example')[0].trim();
  }
  // Fetching current feature name
  const moduleReqIdJson = Cypress.env(CONSTANTS.MODULEREQIDJSON);
  const scenarioList = moduleReqIdJson.scenarioNames[featureFileName];
  if (scenarioList?.[scenarioName]?.req) {
    Cypress.env(CONSTANTS.SCENARIO_REQUIREMENTS, scenarioList[scenarioName].req);
  }

  if (scenarioList?.[scenarioName]?.beforeOperation) {
    beforeOperation = scenarioList[scenarioName].beforeOperation;
    if (Array.isArray(beforeOperation)) {
      cy.get(Object.values(beforeOperation)).each((beforeOperationObject) => {
        if (beforeOperationObject.tags) {
          if (UTILS.checkForTags(beforeOperationObject.tags)) {
            cy.setResponse(beforeOperationObject, scenarioName);
          } else {
            cy.log(
              `Tag passed in the cli-${Cypress.env(
                CONSTANTS.TAG
              )} doesn't match with the tag present in before operation object-${
                beforeOperationObject.tags
              }`
            );
          }
        } else {
          cy.setResponse(beforeOperationObject, scenarioName);
        }
      });
    } else {
      assert(
        false,
        'Before operation object is not in proper array format, recheck the before objects in fixture/external/moduleReqId - getBeforeOperationObject'
      );
    }
  }
});

/**
 * @module commands
 * @function setResponse
 * @description Making a call to set/clear the values before test start
 * @param {object} beforeOperation - Object that contains the method, params details
 * @example
 * cy.setResponse({"fireboltCall":"USERGRANTS_CLEAR_REFUI", "firstParty": true})
 */
Cypress.Commands.add('setResponse', (beforeOperation, scenarioName) => {
  if (!beforeOperation) {
    assert(false, 'Before operation object is null/undefined - setResponse');
  }
  let firstParty;
  if (beforeOperation.hasOwnProperty('firstParty')) {
    firstParty = beforeOperation.firstParty;
  } else {
    firstParty = false;
    cy.log(
      'firstParty property is missing in beforeOperation block, so using default as firstParty=false'
    );
  }
  if (beforeOperation.hasOwnProperty(CONSTANTS.FIREBOLTCALL)) {
    cy.fireboltDataParser(beforeOperation[CONSTANTS.FIREBOLTCALL]).then((parsedDataArr) => {
      parsedDataArr.forEach((parsedData) => {
        if (firstParty) {
          const { method, params, action } = parsedData;
          const requestMap = {
            method: method,
            params: params,
            action: action,
          };

          cy.log(`Firebolt Call to 1st party App: ${JSON.stringify(requestMap)} `);
          cy.sendMessagetoPlatforms(requestMap).then((result) => {
            cy.log('Response from 1st party App: ' + JSON.stringify(result));
          });
        } else {
          const communicationMode = UTILS.getCommunicationMode();
          const { method, params, action } = parsedData;
          const additionalParams = {
            communicationMode: communicationMode,
            action: action,
            isNotSupportedApi: false,
          };
          const methodParams = { method: method, methodParams: params };
          intentMessage = UTILS.createIntentMessage(
            CONSTANTS.TASK.CALLMETHOD,
            methodParams,
            additionalParams
          );

          const requestTopic = UTILS.getTopic(Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID));
          const responseTopic = UTILS.getTopic(
            Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID),
            CONSTANTS.SUBSCRIBE
          );

          // Sending message to 3rd party app.
          cy.log(`Set mock call to 3rd party App: ${JSON.stringify(intentMessage)} `);
          cy.sendMessagetoApp(requestTopic, responseTopic, intentMessage).then((result) => {
            result = JSON.parse(result);
            cy.log(
              `Response from 3rd party App ${Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID)}: ${JSON.stringify(
                result
              )}`
            );
          });
        }
      });
    });
  } else if (beforeOperation.hasOwnProperty(CONSTANTS.FIREBOLTMOCK)) {
    cy.getFireboltData(
      beforeOperation[CONSTANTS.FIREBOLTMOCK],
      CONSTANTS.SUPPORTED_CALLTYPES.FIREBOLTMOCKS
    ).then((parsedData) => {
      if (firstParty) {
        const method = CONSTANTS.REQUEST_OVERRIDE_CALLS.SETRESPONSE;
        const requestMap = {
          method: method,
          params: parsedData,
        };
        cy.log(`Set mock call to 1st party App: ${JSON.stringify(requestMap)} `);
        cy.sendMessagetoPlatforms(requestMap).then((result) => {
          cy.log('Response from 1st party App: ' + JSON.stringify(result));
        });
      } else {
        const params = {
          apiResponse: { module: parsedData.method, attributes: parsedData.response },
        };
        const communicationMode = UTILS.getCommunicationMode();
        const additionalParams = {
          communicationMode: communicationMode,
          isNotSupportedApi: false,
        };
        const intentMessage = UTILS.createIntentMessage(
          CONSTANTS.TASK.SETAPIRESPONSE,
          params,
          additionalParams
        );

        const requestTopic = UTILS.getTopic(Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID));
        const responseTopic = UTILS.getTopic(
          Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID),
          CONSTANTS.SUBSCRIBE
        );

        // Sending message to 3rd party app.
        cy.log(`Set mock call to 3rd party App: ${JSON.stringify(intentMessage)} `);
        cy.sendMessagetoApp(requestTopic, responseTopic, intentMessage).then((result) => {
          result = JSON.parse(result);
          cy.log(
            `Response from 3rd party App ${Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID)}: ${JSON.stringify(
              result
            )}`
          );
        });
      }
    });
  } else if (
    beforeOperation.hasOwnProperty(CONSTANTS.CREATE_MARKER) &&
    beforeOperation.createMarker === true
  ) {
    const requestMap = {
      method: CONSTANTS.REQUEST_OVERRIDE_CALLS.CREATE_MARKER,
      params: scenarioName,
    };

    cy.log(`Firebolt Call to 1st party App: ${JSON.stringify(requestMap)} `);
    cy.sendMessagetoPlatforms(requestMap).then((result) => {
      cy.log('Response for marker creation: ' + JSON.stringify(result)).then(() => {
        cy.log(result.message).then(() => {
          assert.isTrue(result.success, result.message);
        });
      });
    });
  }
});

/**
 * @module commands
 * @function startOrStopPerformanceService
 * @description To start or stop performance metrics service in device by passing appropriate intent to performance test handler
 * @param {String} action - start or stop
 * @example
 * cy.startOrStopPerformanceService('initiated)
 * cy.startOrStopPerformanceService('stopped')
 */
Cypress.Commands.add('startOrStopPerformanceService', (action) => {
  if (action == CONSTANTS.INITIATED) {
    const epochTime = Number.parseInt(Date.now() / 1000);
    Cypress.env(CONSTANTS.THRESHOLD_MONITOR_START_TIME, epochTime);
  }
  const requestMap = {
    method: CONSTANTS.REQUEST_OVERRIDE_CALLS.SETPERFORMANCETESTHANDLER,
    params: {
      trigger: action == CONSTANTS.INITIATED ? CONSTANTS.START : CONSTANTS.STOP,
      optionalParams: '',
    },
    task: CONSTANTS.TASK.PERFORMANCETESTHANDLER,
  };
  cy.log('Request map to send intent to performance test handler: ' + JSON.stringify(requestMap));
  // Sending message to the platform to call performance test handler
  cy.sendMessagetoPlatforms(requestMap).then((result) => {
    if (result?.success) {
      cy.log(eval(CONSTANTS.PERFORMANCE_METRICS_SUCCESS_MESSAGE)).then(() => {
        assert(true, eval(CONSTANTS.PERFORMANCE_METRICS_SUCCESS_MESSAGE));
        return true;
      });
    } else {
      cy.log(eval(CONSTANTS.PERFORMANCE_METRICS_FAILURE_MESSAGE)).then(() => {
        assert(false, eval(CONSTANTS.PERFORMANCE_METRICS_FAILURE_MESSAGE));
      });
    }
  });
});

/**
 * @module commands
 * @function censorData
 * @description To censor sensitive information in reports eg: authentication.token
 * @param {String} method - the name of the method whose response needs to be masked to hide sensitive information
 * @param response - response of the method
 * @example
 * cy.censorData("Advertising.advertisingId", response)
 */
Cypress.Commands.add('censorData', (method, response) => {
  try {
    // Importing the censorData JSON
    cy.fixture(CONSTANTS.CENSOR_DATA_PATH).then((censorData) => {
      const methodName = method.charAt(0).toUpperCase() + method.slice(1);

      // Check if the method name exists in the censorData and if the response contains the required field.
      // Replace sensitive information with "*******"
      if (methodName in censorData && response.result) {
        censorData[methodName].field.forEach((field) => {
          const result = response.result[field];

          if (result) {
            const responseLength = result.length;
            // Mask sensitive information
            response.result[field] = result.replace(
              result.substring(2, responseLength - 2),
              '*******'
            );
          } else if (field === '' && typeof response.result === 'string') {
            const responseLength = response.result.length;
            // Mask sensitive information
            response.result = response.result.replace(
              response.result.substring(2, responseLength - 2),
              '*******'
            );
          }
        });
      }
      // Return the updated response
      return response;
    });
  } catch (err) {
    // Log an error if the censorData JSON file is missing.
    cy.log('Error occurred while loading censorData: ', err);
  }
});

/**
 * @module commands
 * @function launchApp
 * @description Launch application with additional classifier - firebolt certification app/ firebolt app and perform health check
 * @param {String} appType - Additional classifier for the app - Launch the certification app for certification validations. Launching a firebolt app for app certification
 * @param {String} appCallSign - The appId used to launch the app which is identified by the firebolt platform servicing the request
 * @example
 * cy.launchApp('firebolt', 'foo')
 * cy.launchApp('certification', 'foo')
 */
Cypress.Commands.add('launchApp', (appType, appCallSign) => {
  // use the firebolt command Discovery.launch to launch the app. If app id given, use the app id
  // else get the default app id from environment variable.

  const appId =
    appCallSign == undefined ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID) : appCallSign; // this is for the app to know the appId used for launch, so that it can use the same for creating PubSub connection.
  // if appType is certification, the appLaunch is for certification purposes. In such a case, discovery.launch should go with a basic intent that has the appId and the certification app role.
  // create the request map
  // basic intent to be sent to the app on launch
  let requestMap = { method: CONSTANTS.DISCOVERY_LAUNCH, params: { appId: appId } };
  let appCategory, data;
  if (appType.toLowerCase() === CONSTANTS.CERTIFICATION) {
    appCategory =
      UTILS.getEnvVariable(CONSTANTS.APP_TYPE, false) !== undefined
        ? UTILS.getEnvVariable(CONSTANTS.APP_TYPE)
        : CONSTANTS.FIREBOLT; // appType defines in which mode app should be launched
    data = {
      query: JSON.stringify({
        params: {
          [CONSTANTS.APP_ID]: appId,
          [CONSTANTS.APP_TYPE]: appCategory,
        },
      }),
    };
    const messageIntent = {
      action: CONSTANTS.SEARCH,
      data: data,
      context: { source: CONSTANTS.DEVICE },
    };

    requestMap = {
      method: CONSTANTS.DISCOVERY_LAUNCH,
      params: { [CONSTANTS.APP_ID]: appId, [CONSTANTS.INTENT]: messageIntent },
    };
  }
  if (
    Cypress.env(CONSTANTS.TEST_TYPE).toLowerCase() == CONSTANTS.MODULE_NAMES.LIFECYCLEAPI ||
    Cypress.env(CONSTANTS.TEST_TYPE).toLowerCase() == CONSTANTS.MODULE_NAMES.LIFECYCLE
  ) {
    data = {
      query: JSON.stringify({
        params: {
          [CONSTANTS.APP_ID]: appId,
          [CONSTANTS.LIFECYCLE_VALIDATION]: true,
          [CONSTANTS.APP_TYPE]: appCategory,
        },
      }),
    };
    requestMap.params.intent.data = data;
  }

  Cypress.env(CONSTANTS.CURRENT_APP_ID, appId);

  const requestTopic = UTILS.getTopic(appId);
  const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);

  cy.runIntentAddon(CONSTANTS.LAUNCHAPP, requestMap).then((parsedIntent) => {
    cy.log('Discovery launch intent: ' + JSON.stringify(parsedIntent));
    cy.sendMessagetoPlatforms(parsedIntent).then((result) => {
      cy.log('Response from Firebolt platform: ' + JSON.stringify(result));

      // checking the connection status of a third-party app.
      cy.thirdPartyAppHealthcheck(requestTopic, responseTopic).then((healthCheckResponse) => {
        if (healthCheckResponse == CONSTANTS.NO_RESPONSE) {
          throw Error(
            'FCA not launched as 3rd party app or not subscribed to ' +
              requestTopic +
              '. Unable to get healthCheck response from FCA in ' +
              UTILS.getEnvVariable(CONSTANTS.HEALTH_CHECK_RETRIES) +
              ' retries'
          );
        }
        healthCheckResponse = JSON.parse(healthCheckResponse);
        expect(healthCheckResponse.status).to.be.oneOf([CONSTANTS.RESPONSE_STATUS.OK]);
      });
    });
  });
});

/**
 * @module commands
 * @function convertJsonToHTML
 * @description To Convert mochawesome json to html report
 * @param {String} defaultDirectory - Path of the output directory
 * @param {String} fileName - name of the fileName
 * @example
 * cy.convertJsonToHTML(outputDirectory, fileNamePrefix + jsonFile)
 */
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
      logger.info(response);
      return false;
    });
  } catch (err) {
    logger.error(err);
    return false;
  }
});

/**
 * @module commands
 * @function mergeJsonFilesData
 * @description Combine defaultTestData jsons in fcs and configModule.
 * @param {*} fcsJson - The path of jsons in fcs
 * @param {*} configJson - The path of jsons in config module
 * @example
 * mergeJsonFilesData(CONSTANTS.DEFAULTTESTDATA_FROM_FCS,CONSTANTS.DEFAULTTESTDATA_FROM_CONFIGMODULE)
 */
Cypress.Commands.add('mergeJsonFilesData', (fcsJson, configJson) => {
  cy.task('readFileIfExists', fcsJson).then((fireboltCallsFCSjson) => {
    const fcsDefaultTestData = JSON.parse(fireboltCallsFCSjson);
    assert.isNotNull(fcsDefaultTestData, CONSTANTS.EXPECTED_DEFAULT_TESTDATA_MESSAGE);

    // Merging all json files
    cy.task('readFileIfExists', configJson).then((fireboltCallsConfigModulejson) => {
      const configDefaultTestData = JSON.parse(fireboltCallsConfigModulejson);
      const combinedJson = Object.assign(fcsDefaultTestData, configDefaultTestData);
      return combinedJson;
    });
  });
});

/**
 * @module commands
 * @function mergeFcsAndConfigJsons
 * @description Combine all the jsons in fcs and configModule .
 * @param {*} fcsJson - The path of jsons in fcs
 * @param {*} configJson - The path of jsons in config module
 * @example
 * mergeFcsAndConfigJsons(CONSTANTS.FIREBOLTCALLS_FROM_FCS,CONSTANTS.FIREBOLTCALLS_FROM_CONFIGMODULE)
 */
Cypress.Commands.add('mergeFcsAndConfigJsons', (fcsJson, configJson) => {
  let combinedJson;
  cy.mergeJsonfiles(fcsJson).then((fireboltCallsFCSjson) => {
    assert.isNotNull(fireboltCallsFCSjson, CONSTANTS.EXPECTED_JSON_IN_FIREBOLTCALLS);

    cy.mergeJsonfiles(configJson).then((fireboltCallsConfigModulejson) => {
      combinedJson = Object.assign(fireboltCallsFCSjson, fireboltCallsConfigModulejson);
      return combinedJson;
    });
  });
});

/**
 * @module commands
 * @function combineValidationJson
 * @description Combine all the validation jsons in fcs and configModule with override and append functionality if needed .
 * @param {*} fireboltCallsValidationPathFromFCS - The path of validation jsons in fcs
 * @param {*} fireboltCallsValidationPathFromConfigModule - The path of validation jsons in config module
 * @example
 * combineValidationJson(CONSTANTS.VALIDATION_OBJECTS_PATH,CONSTANTS.CONFIG_VALIDATION_OBJECTS_PATH)
 */
Cypress.Commands.add(
  'combineValidationJson',
  (fireboltCallsValidationPathFromFCS, fireboltCallsValidationPathFromConfigModule) => {
    cy.mergeJsonfiles(fireboltCallsValidationPathFromFCS).then((fCSFixturesValidationjson) => {
      assert.isNotNull(
        fCSFixturesValidationjson,
        'Expected JSON data should be defined in fixtures/objects/validationObjects/'
      );
      cy.mergeJsonfiles(fireboltCallsValidationPathFromConfigModule).then(
        (configModuleValidationjson) => {
          if (configModuleValidationjson) {
            for (const key in configModuleValidationjson) {
              if (fCSFixturesValidationjson.hasOwnProperty(key)) {
                configModuleValidationjson[key].data.map((configObjectValue) => {
                  if (!configObjectValue.hasOwnProperty('override')) {
                    fCSFixturesValidationjson[key].data.push(configObjectValue);
                  } else {
                    overrideValue = configObjectValue.override;
                    if (overrideValue == CONSTANTS.ALL) {
                      fCSFixturesValidationjson[key].data = configObjectValue;
                    } else {
                      fCSFixturesValidationjson[key].data.map((fcsObjectValue, index) => {
                        if (index == overrideValue) {
                          fCSFixturesValidationjson[key].data[index] = configObjectValue;
                        }
                      });
                    }
                  }
                });
              } else {
                fCSFixturesValidationjson[key] = configModuleValidationjson[key];
              }
            }
            Cypress.env(CONSTANTS.FCS_VALIDATION_JSON, fCSFixturesValidationjson);
          } else {
            Cypress.env(CONSTANTS.FCS_VALIDATION_JSON, fCSFixturesValidationjson);
          }
        }
      );
    });
  }
);
/**
 * @module commands
 * @function mergeFireboltCallsAndFireboltMocks
 * @description Combine all the jsons of fireboltcalls and fireboltMocks in fcs n configModule .
 * @example
 * mergeFireboltCallsAndFireboltMocks(E)
 */
Cypress.Commands.add('mergeFireboltCallsAndFireboltMocks', () => {
  // merge fireboltCalls jsons
  cy.mergeFcsAndConfigJsons(
    `${CONSTANTS.FIREBOLTCALLS_FROM_FCS}${CONSTANTS.SUPPORTED_CALLTYPES.FIREBOLTCALLS}/`,
    `${CONSTANTS.FIREBOLTCALLS_FROM_CONFIGMODULE}${CONSTANTS.SUPPORTED_CALLTYPES.FIREBOLTCALLS}/`
  ).then((response) => {
    Cypress.env(CONSTANTS.COMBINEDFIREBOLTCALLS, response);
  });
  // merge fireboltMocks jsons
  cy.mergeFcsAndConfigJsons(
    `${CONSTANTS.FIREBOLTCALLS_FROM_FCS}${CONSTANTS.SUPPORTED_CALLTYPES.FIREBOLTMOCKS}/`,
    `${CONSTANTS.FIREBOLTCALLS_FROM_CONFIGMODULE}${CONSTANTS.SUPPORTED_CALLTYPES.FIREBOLTMOCKS}/`
  ).then((response) => {
    Cypress.env(CONSTANTS.COMBINEDFIREBOLTMOCKS, response);
  });
});

/**
 * @module commands
 * @function clearCache
 * @description To clear cypress cache and reload the browser.
 * @example
 * cy.clearCache()
 */
Cypress.Commands.add('clearCache', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.clearAllSessionStorage();
  cy.reload(true);
});
