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
import UTILS, { getEnvVariable } from '../cypress-support/src/utils';
const logger = require('../Logger')('command.js');
import { apiObject, eventObject } from '../appObjectConfigs';

/**
 * @module commands
 * @function getFireboltData
 * @description Fetching the firebolt data contains method/params/context based on the key value.
 * @param {String} key - key name of the firebolt data.
 * @example
 * cy.getFireboltData('GET_DEVICE_ID');
 * cy.getFireboltData('GET_DEVICE_ID', fireboltMocks);
 * cy.getFireboltData('GET_DEVICE_ID', fireboltCalls);
 */
Cypress.Commands.add(
  'getFireboltData',
  (key, callType = CONSTANTS.SUPPORTED_CALLTYPES.FIREBOLTCALLS) => {
    // Reading the data from combinedJson based on key.
    let fireboltData;
    if (callType == CONSTANTS.SUPPORTED_CALLTYPES.FIREBOLTMOCKS) {
      fireboltData = UTILS.getEnvVariable(CONSTANTS.COMBINEDFIREBOLTMOCKS)[key];
    } else if (callType == CONSTANTS.SUPPORTED_CALLTYPES.SET_RESPONSE_JSON) {
      fireboltData = UTILS.getEnvVariable('setResponseJson')[key];
    } else {
      fireboltData = UTILS.getEnvVariable(CONSTANTS.COMBINEDFIREBOLTCALLS)[key];
    }
    if (!fireboltData) {
      fireLog.assert(false, CONSTANTS.NO_DATA_FOR_THE_KEY + key);
    }
    return fireboltData;
  }
);

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
        let params = item.params;
        let method, action;
        // Fetching the value of environment variable based on dataIdentifier
        if (/CYPRESSENV/.test(params)) {
          const envParam = params.split('-')[1];
          params = UTILS.getEnvVariable(envParam, false);
        }
        // If params contain CYPRESSENV in any parameter assigning corresponding env value
        const containEnv = Object.keys(params).find((key) => key.includes('CYPRESSENV'));
        if (containEnv) {
          const envParam = containEnv.split('-')[1];
          params[envParam] = Cypress.env(envParam);
          delete params[containEnv];
        }

        method = item.method;
        const expected = item.expected ? item.expected : CONSTANTS.RESULT;
        action = CONSTANTS.ACTION_CORE.toLowerCase();

        // If a method has prefix with an underscore, the value is taken as the action.
        if (method && method.includes('_')) {
          action = method.split('_')[0];
          method = method.split('_')[1];
        }

        return results.push({
          method: method,
          params: params,
          context: item.context,
          action: action,
          expected: expected,
        });
      });

      return Cypress.Promise.all(promises).then(() => {
        return results;
      });
    });
  } else {
    fireLog.assert(false, `${sdk} SDK not Supported`);
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
  cy.log(
    'Call from 1st party App, method: ' +
      requestMap.method +
      ' params: ' +
      JSON.stringify(requestMap.param)
  );
  cy.sendMessagetoPlatforms(requestMap).then((response) => {
    try {
      if (response && response.result) {
        return response.result;
      } else {
        throw 'Obtained response is null|undefined';
      }
    } catch (error) {
      fireLog.info('Failed to fetch device.version', error);
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
      fireLog.equal(true, err, 'Error while fetching latest version from the fixtures');
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
  } else if (envPlatformSdkVersion.includes(CONSTANTS.PROPOSED)) {
    FIREBOLT_SPECIFICATION_URL = UTILS.getEnvVariable(
      CONSTANTS.FIREBOLT_SPECIFICATION_PROPOSED_URL
    );
  } else {
    FIREBOLT_SPECIFICATION_URL = UTILS.getEnvVariable(CONSTANTS.FIREBOLT_SPECIFICATION_URL).replace(
      CONSTANTS.LATEST,
      envPlatformSdkVersion
    );
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
    fireLog.info('Error while getting capabilities from firebolt config: ', error);
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
      fireLog.assert(false, CONSTANTS.BEFORE_OPERATION_FORMAT);
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
    fireLog.assert(false, 'Before operation object is null/undefined - setResponse');
  }
  let firstParty;
  if (beforeOperation.hasOwnProperty('firstParty')) {
    firstParty = beforeOperation.firstParty;
  } else {
    firstParty = false;
    fireLog.info(
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

          fireLog.info(`Firebolt Call to 1st party App: ${JSON.stringify(requestMap)} `);
          cy.sendMessagetoPlatforms(requestMap).then((result) => {
            fireLog.info('Response from 1st party App: ' + JSON.stringify(result));
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
          fireLog.info(`Set mock call to 3rd party App: ${JSON.stringify(intentMessage)} `);
          cy.sendMessagetoApp(requestTopic, responseTopic, intentMessage).then((result) => {
            result = JSON.parse(result);
            fireLog.info(
              `Response from 3rd party App ${Cypress.env(
                CONSTANTS.THIRD_PARTY_APP_ID
              )}: ${JSON.stringify(result)}`
            );
          });
        }
      });
    });
  } else if (beforeOperation.hasOwnProperty(CONSTANTS.FIREBOLTMOCK)) {
    cy.parsedMockData(beforeOperation).then((parsedData) => {
      if (firstParty) {
        parsedData.firstParty = firstParty;
        const method = CONSTANTS.REQUEST_OVERRIDE_CALLS.SETRESPONSE;
        const requestMap = {
          method: method,
          params: parsedData,
        };
        fireLog.info(`Set mock call to 1st party App: ${JSON.stringify(requestMap)} `);
        cy.sendMessagetoPlatforms(requestMap).then((result) => {
          fireLog.info('Response from 1st party App: ' + JSON.stringify(result));
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
          fireLog.info(
            `Response from 3rd party App ${Cypress.env(
              CONSTANTS.THIRD_PARTY_APP_ID
            )}: ${JSON.stringify(result)}`
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

    fireLog.info(`Firebolt Call to 1st party App: ${JSON.stringify(requestMap)} `);
    cy.sendMessagetoPlatforms(requestMap).then((result) => {
      fireLog.isTrue(result.success, 'Response for marker creation: ' + JSON.stringify(result));
    });
  }
});

Cypress.Commands.add('parsedMockData', (beforeOperation) => {
  if (beforeOperation.hasOwnProperty('fireboltMock')) {
    if (typeof beforeOperation.fireboltMock === 'string') {
      cy.getFireboltData(
        beforeOperation[CONSTANTS.FIREBOLTMOCK],
        CONSTANTS.SUPPORTED_CALLTYPES.FIREBOLTMOCKS
      ).then((response) => {
        return response;
      });
    } else {
      return beforeOperation.fireboltMock;
    }
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
  fireLog.info(
    'Request map to send intent to performance test handler: ' + JSON.stringify(requestMap)
  );
  // Sending message to the platform to call performance test handler
  cy.sendMessagetoPlatforms(requestMap).then((result) => {
    if (result?.success) {
      fireLog(true, eval(CONSTANTS.PERFORMANCE_METRICS_SUCCESS_MESSAGE));
      return true;
    } else {
      fireLog.assert(false, eval(CONSTANTS.PERFORMANCE_METRICS_FAILURE_MESSAGE));
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
    fireLog.info('Error occurred while loading censorData: ', err);
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
    appCallSign == undefined
      ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
      : UTILS.checkForSecondaryAppId(appCallSign); // this is for the app to know the appId used for launch, so that it can use the same for creating PubSub connection.
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
      query: {
        params: {
          [CONSTANTS.APP_ID]: appId,
          [CONSTANTS.APP_TYPE]: appCategory,
        },
      },
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
      query: {
        params: {
          [CONSTANTS.APP_ID]: appId,
          [CONSTANTS.LIFECYCLE_VALIDATION]: true,
          [CONSTANTS.APP_TYPE]: appCategory,
        },
      },
    };
    requestMap.params.intent.data = data;
  }

  // Add the PubSub URL if required
  if (getEnvVariable(CONSTANTS.PUB_SUB_URL, false)) {
    data.query.params[CONSTANTS.PUB_SUB_URL] = getEnvVariable(CONSTANTS.PUB_SUB_URL);
    if (getEnvVariable(CONSTANTS.DEVICE_MAC, false)) {
      data.query.params[CONSTANTS.MACADDRESS_PARAM] = getEnvVariable(CONSTANTS.DEVICE_MAC);
    }
  }
  // If the testType is userInterestProvider, send the discovery.launch params with registerProvider = false, then certification app will not register for userInterest provider.
  if (Cypress.env(CONSTANTS.TEST_TYPE).toLowerCase() == CONSTANTS.USERINTERESTPROVIDER) {
    data = {
      query: JSON.stringify({
        params: {
          [CONSTANTS.REGISTERPROVIDER]: false,
        },
      }),
    };
    requestMap.params.intent.data = data;
  }

  // Stringify the query (The intent requires it be a string)
  data.query = JSON.stringify(data.query);
  Cypress.env(CONSTANTS.CURRENT_APP_ID, appId);

  const requestTopic = UTILS.getTopic(appId);
  const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);

  cy.runIntentAddon(CONSTANTS.LAUNCHAPP, requestMap).then((parsedIntent) => {
    fireLog.info('Discovery launch intent: ' + JSON.stringify(parsedIntent));
    cy.sendMessagetoPlatforms(parsedIntent).then((result) => {
      fireLog.info('Response from Firebolt platform: ' + JSON.stringify(result));

      if (
        UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID) === appId ||
        UTILS.getEnvVariable(CONSTANTS.FCA_APP_LIST).find(
          (ele) => UTILS.getEnvVariable(ele, false) === appId
        )
      ) {
        // checking the connection status of a third-party app.
        cy.thirdPartyAppHealthcheck(requestTopic, responseTopic).then((healthCheckResponse) => {
          // checking whether valid healthCheck response is received
          // if not received, throwing error with corresponding topic and retry count.
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
      }
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
 * @function mergeFireboltCallJsons
 * @description Merges properties of two JSON objects into one, prioritizing the values from the second JSON object.
 * @param {*} v1DataJson - JSON object
 * @param {*} v2DataJson - The JSON object to merge with the first JSON object and that takes precedence.
 * @returns {Object} The merged JSON object.
 * @example
 * mergeFireboltCallJsons(v1JSON, v2DataJSON);
 */

Cypress.Commands.add('mergeFireboltCallJsons', (v1DataJson, v2DataJson) => {
  const combinedJsonData = { ...v1DataJson };
  for (const [key, value] of Object.entries(v2DataJson)) {
    // If the key exists in combinedJsonData, merge the objects
    if (combinedJsonData.hasOwnProperty(key)) {
      combinedJsonData[key] = { ...combinedJsonData[key], ...value };
    } else {
      // Otherwise, simply assign the value
      combinedJsonData[key] = value;
    }
  }
  return combinedJsonData;
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

/**
 * @module commands
 * @function sendMessageToPlatformOrApp
 * @description Function to send message to Platform or App to make an Api call.
 * @param {String} target - 'App' or 'Platform'
 * @param {String} requestData - Contains the data which required to create request message to make a call.
 * @param {String} task - Task/Handler name that decides whether make a api call or event call.
 * @example
 * cy.sendMessageToPlatformOrApp('App', {method: 'account.id', params: {}, context: {}, action: 'core', expected: 'result', appId: 'test.test'}
 * cy.sendMessageToPlatformOrApp('Platform', {method: 'account.id', params: {}, context: {}, action: 'core', expected: 'result'}
 * cy.sendMessageToPlatformOrApp('App', {method: 'accessibility.onClosedCaptionsSettingsChanged', params: {}, context: {}, action: 'core', expected: 'result', appId: 'test.test', 'registerEvent'}
 */
Cypress.Commands.add('sendMessageToPlatformOrApp', (target, requestData, task) => {
  const { method, params, context, action, expected, appId } = requestData;
  task = task ? task : CONSTANTS.TASK.CALLMETHOD;
  let isNotSupportedApi = false;

  if (UTILS.isScenarioExempted(method, params)) {
    isNotSupportedApi = true;
    Cypress.env(CONSTANTS.IS_SCENARIO_EXEMPTED, true);
  }

  cy.then(() => {
    if (target === CONSTANTS.APP) {
      const additionalParams = {
        communicationMode: UTILS.getCommunicationMode(),
        action: action,
        isNotSupportedApi: isNotSupportedApi,
      };
      const methodKey = task == CONSTANTS.TASK.REGISTEREVENT ? CONSTANTS.EVENT : CONSTANTS.METHOD;
      const paramKey = task == CONSTANTS.TASK.REGISTEREVENT ? 'params' : 'methodParams';

      const requestParams = { [methodKey]: method, [paramKey]: params };

      // Creating intent message using above details to send it to 3rd party app.
      const intentMessage = UTILS.createIntentMessage(task, requestParams, additionalParams);

      // Adding additional details to created intent if any platform specific data is present in configModule.
      cy.runIntentAddon(task, intentMessage).then((parsedIntent) => {
        const requestTopic = UTILS.getTopic(appId);
        const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);
        cy.sendMessagetoApp(requestTopic, responseTopic, parsedIntent);
      });
    } else if (target === CONSTANTS.PLATFORM) {
      const requestMap = {
        method: method,
        params: params,
        action: action,
        task: task,
      };
      // Assigning event_param env if param has empty object
      if (task == CONSTANTS.TASK.REGISTEREVENT && Object.keys(requestMap.params).length === 0) {
        // To Do :debug event_param issue by passing isrequired as false for getEnvVariable,need to debug further
        requestMap.params = UTILS.getEnvVariable(CONSTANTS.EVENT_PARAM, false);
      }

      cy.sendMessagetoPlatforms(requestMap);
    } else {
      fireLog.assert(false, `Invalid ${target} target, it should be either app or platfrom`);
    }
  }).then((response) => {
    if (response === CONSTANTS.NO_RESPONSE) {
      assert(false, CONSTANTS.NO_MATCHED_RESPONSE);
    }

    if (Cypress.env(CONSTANTS.IS_RPC_ONLY)) {
      fireLog.info(
        `${method} response will be retrieved in subsequent steps and validated when the rpc-only methods are invoked. Proceeding to the next step.`
      );
      return;
    }
    if (
      (response && typeof response == CONSTANTS.TYPE_OBJECT) ||
      (typeof response == CONSTANTS.TYPE_STRING &&
        (JSON.parse(response).hasOwnProperty(CONSTANTS.RESULT) ||
          JSON.parse(response).hasOwnProperty(CONSTANTS.ERROR)))
    ) {
      response = typeof response === CONSTANTS.TYPE_STRING ? JSON.parse(response) : response;

      if (
        response &&
        response.error &&
        response.error.message &&
        CONSTANTS.ERROR_LIST.includes(response.error.message)
      ) {
        if (UTILS.getEnvVariable(CONSTANTS.CERTIFICATION) == true) {
          fireLog.assert(false, `${target} does not support method: ${method}`);
        } else {
          fireLog.info(`NotSupported: ${target} does not support method: ${method}`).then(() => {
            throw new Error(CONSTANTS.STEP_IMPLEMENTATION_MISSING);
          });
        }
      }

      if (task == CONSTANTS.TASK.REGISTEREVENT) {
        if (response && response.result && response.result.hasOwnProperty(CONSTANTS.LISTENING)) {
          const eventResponse = {
            eventListenerId: response.result.event + '-' + response.id,
            eventListenerResponse: response.result,
          };
          response.result = eventResponse;
        }
        if (response && response.error && response.error.message) {
          fireLog.assert(
            false,
            `Event registration failed for event ${method} with error message: ${response.error.message} `
          );
        }
      }

      cy.updateResponseForFCS(method, params, response).then((updatedResponse) => {
        // Create a deep copy to avoid reference mutation
        const dataToBeCensored = _.cloneDeep(response);

        // Call the 'censorData' command to hide sensitive data
        cy.censorData(method, dataToBeCensored).then((maskedResult) => {
          const appLog = target === CONSTANTS.PLATFORM ? 'Firebolt platform' : `app: ${appId}`;
          fireLog.info(`Response from ${appLog}: ${JSON.stringify(maskedResult)}`);
        });
        // Creating object with event name, params, and response etc and storing it in a global list for further validation.
        const apiOrEventAppObject =
          task === CONSTANTS.TASK.REGISTEREVENT
            ? new eventObject(method, params, context, updatedResponse, appId, expected)
            : new apiObject(method, params, context, updatedResponse, expected, appId);

        const globalList =
          task === CONSTANTS.TASK.REGISTEREVENT
            ? CONSTANTS.GLOBAL_EVENT_OBJECT_LIST
            : CONSTANTS.GLOBAL_API_OBJECT_LIST;
        UTILS.getEnvVariable(globalList).push(apiOrEventAppObject);
      });
    } else {
      fireLog.info(
        `${target} returned response in invalid format, which could lead to failures in validations. Response must be in JSON RPC format - ${response}`
      );
    }
  });
});

/**
 * @module commands
 * @function sendMessageToPlatformOrApp
 * @description Function to send message to Platform or App to make an Api call.
 * @param {String} validationType - Determines whether method or event validation is being performed. Ex: 'method' or 'event'
 * @param {String} requestData - Contains the data which required to do content validation for the specified method.
 * @example
 * cy.sendMessageToPlatformOrApp('method', {method: 'account.id', context: {}, contentObject: {}, expectingError: false, appId: 'test.test'}
 * cy.sendMessageToPlatformOrApp('event', {method: 'accessibility.onClosedCaptionsSettingsChanged', context: {}, contentObject: {}, expectingError: false, appId: 'test.test', eventExpected: 'triggers'}
 */
Cypress.Commands.add('methodOrEventResponseValidation', (validationType, requestData) => {
  const { method, context, contentObject, expectingError, appId, eventExpected } = requestData;
  let validationJsonPath = requestData.validationJsonPath;

  // Extracting the api or event object from the global list.
  const methodOrEventObject = UTILS.getApiOrEventObjectFromGlobalList(
    method,
    context,
    appId,
    validationType
  );
  const param = methodOrEventObject.params;

  cy.validateResponseErrorAndSchemaResult(methodOrEventObject, validationType).then(() => {
    // If passed method is exception method or expecting a error in response, doing error content validation.
    if (UTILS.isScenarioExempted(method, param) || expectingError) {
      // If not expecting for an error and it's a exception method, storing "exceptionErrorObject" to errorContent variable to fetch the error content object based on the exception type.
      const errorContent =
        expectingError === true ? contentObject : CONSTANTS.EXCEPTION_ERROR_OBJECT;
      cy.validateErrorObject(method, errorContent, validationType, context, appId, param);
    } else {
      if (validationType == CONSTANTS.EVENT) {
        const eventName = methodOrEventObject.eventObjectId;
        if (appId === UTILS.getEnvVariable(CONSTANTS.FIRST_PARTY_APPID)) {
          const requestMap = {
            method: CONSTANTS.REQUEST_OVERRIDE_CALLS.FETCH_EVENT_RESPONSE,
            params: eventName,
          };

          cy.sendMessagetoPlatforms(requestMap).then((result) => {
            cy.updateResponseForFCS(method, null, result, true).then((updatedResponse) => {
              cy.saveEventResponse(
                updatedResponse,
                methodOrEventObject,
                eventName,
                eventExpected === 'triggers' ? true : false
              );
            });
          });
        } else {
          const params = { event: eventName };
          // Generating an intent message using the provided information to send it to a third-party app
          const intentMessage = UTILS.createIntentMessage(CONSTANTS.TASK.GETEVENTRESPONSE, params);
          const requestTopic = UTILS.getTopic(appId);
          const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);
          cy.sendMessagetoApp(requestTopic, responseTopic, intentMessage).then((response) => {
            response = JSON.parse(response);
            if (
              response &&
              response.result &&
              response.result.hasOwnProperty(CONSTANTS.EVENT_RESPONSE)
            ) {
              response.result = response.result.eventResponse;
            }
            cy.updateResponseForFCS(method, null, response, true).then((updatedResponse) => {
              cy.saveEventResponse(
                updatedResponse,
                methodOrEventObject,
                eventName,
                eventExpected === 'triggers' ? true : false
              );
            });
          });
        }
      }

      cy.then(() => {
        if (validationType == CONSTANTS.EVENT) {
          const eventName = methodOrEventObject.eventObjectId;
          let eventResponse;
          if (appId === UTILS.getEnvVariable(CONSTANTS.FIRST_PARTY_APPID)) {
            const requestMap = {
              method: CONSTANTS.REQUEST_OVERRIDE_CALLS.FETCH_EVENT_RESPONSE,
              params: eventName,
            };
            eventResponse = cy.sendMessagetoPlatforms(requestMap);
          } else {
            const params = { event: eventName };
            // Generating an intent message using the provided information to send it to a third-party app
            const intentMessage = UTILS.createIntentMessage(
              CONSTANTS.TASK.GETEVENTRESPONSE,
              params
            );
            const requestTopic = UTILS.getTopic(appId);
            const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);
            eventResponse = cy.sendMessagetoApp(requestTopic, responseTopic, intentMessage);
          }
          eventResponse.then((response) => {
            response = typeof response === CONSTANTS.TYPE_STRING ? JSON.parse(response) : response;
            if (
              response &&
              response.result &&
              response.result.hasOwnProperty(CONSTANTS.EVENT_RESPONSE)
            ) {
              response.result = response.result.eventResponse;
            }
            cy.updateResponseForFCS(method, null, response, true).then((updatedResponse) => {
              cy.saveEventResponse(
                updatedResponse,
                methodOrEventObject,
                eventName,
                eventExpected === 'triggers' ? true : false
              );
            });
          });
        }
      }).then(() => {
        try {
          if (contentObject && contentObject.data) {
            contentObject.data.forEach((object) => {
              if (object.validations) {
                const scenario = object.type;
                const methodOrEventResponse =
                  validationType == CONSTANTS.EVENT
                    ? methodOrEventObject
                    : validationType == CONSTANTS.METHOD
                      ? methodOrEventObject.apiResponse
                      : null;

                // Looping through validationJsonPath to find the valid path for validation.
                if (validationJsonPath && Array.isArray(validationJsonPath)) {
                  const validationPath = validationJsonPath.find((path) => {
                    if (
                      path
                        .split('.')
                        .reduce((acc, part) => acc && acc[part], methodOrEventResponse) !==
                      undefined
                    ) {
                      return path;
                    }
                  });
                  validationPath
                    ? (validationJsonPath = validationPath)
                    : fireLog.assert(
                        false,
                        'Could not find the valid validation path from the validationJsonPath list'
                      );
                }
                switch (scenario) {
                  case CONSTANTS.REGEX:
                    cy.regExValidation(
                      method,
                      object.validations[0].type,
                      validationJsonPath,
                      methodOrEventResponse
                    );
                    break;
                  case CONSTANTS.MISC:
                    cy.miscellaneousValidation(method, object.validations[0], methodOrEventObject);
                    break;
                  case CONSTANTS.DECODE:
                    const decodeType = object.specialCase;
                    const responseForDecodeValidation =
                      validationType == CONSTANTS.EVENT
                        ? methodOrEventResponse.eventResponse
                        : validationType == CONSTANTS.METHOD
                          ? methodOrEventResponse.result
                          : null;

                    cy.decodeValidation(
                      method,
                      decodeType,
                      responseForDecodeValidation,
                      object.validations[0],
                      null
                    );
                    break;
                  case CONSTANTS.FIXTURE:
                    cy.validateContent(
                      method,
                      context,
                      validationJsonPath,
                      object.validations[0].type,
                      validationType,
                      appId
                    );
                    break;
                  case CONSTANTS.CUSTOM:
                    cy.customValidation(object, methodOrEventObject);
                    break;
                  case CONSTANTS.UNDEFINED:
                    cy.undefinedValidation(object, methodOrEventObject, validationType);
                    break;
                  default:
                    assert(false, 'Unsupported validation type');
                    break;
                }
              }
            });
          } else {
            cy.validateContent(
              method,
              context,
              validationJsonPath,
              contentObject,
              validationType,
              appId
            );
          }
        } catch (error) {
          assert(false, `Unable to validate the response: ${error}`);
        }
      });
    }
  });
});
