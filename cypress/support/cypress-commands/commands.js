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
import UTILS, { fireLog, getEnvVariable } from '../cypress-support/src/utils';
const logger = require('../Logger')('command.js');
import { apiObject, eventObject } from '../appObjectConfigs';
const path = require('path');
const jsonAssertion = require('soft-assert');

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
  (key, callType = CONSTANTS.SUPPORTED_CALLTYPES.FIREBOLTCALLS, failOnError = true) => {
    // Reading the data from combinedJson based on key.
    let fireboltData;
    if (callType == CONSTANTS.SUPPORTED_CALLTYPES.FIREBOLTMOCKS) {
      fireboltData = UTILS.getEnvVariable(CONSTANTS.COMBINEDFIREBOLTMOCKS)[key];
    } else if (callType == CONSTANTS.SUPPORTED_CALLTYPES.SET_RESPONSE_JSON) {
      fireboltData = UTILS.getEnvVariable('setResponseJson')[key];
    } else {
      fireboltData = UTILS.getEnvVariable(CONSTANTS.COMBINEDFIREBOLTCALLS)[key];
    }
    // FailOnError was set to false,for environment setup for background scenarios.
    if (!fireboltData && failOnError) {
      fireLog.fail(CONSTANTS.NO_DATA_FOR_THE_KEY + key);
    }
    // To check for Override data,if exist append overrida data to the fireboltData,Otherwise return fireboltData as is.
    if (fireboltData) {
      const fireboltCallObject = UTILS.applyOverrides(fireboltData);
      return fireboltCallObject;
    }
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
Cypress.Commands.add(
  'fireboltDataParser',
  (key, sdk = UTILS.getEnvVariable(CONSTANTS.SUPPORTED_SDK)[0]) => {
    const results = [];
    const supportedSDK = UTILS.getEnvVariable(CONSTANTS.SUPPORTED_SDK);
    Cypress.env(CONSTANTS.IS_SCENARIO_EXEMPTED, false);
    if (Array.isArray(supportedSDK) && supportedSDK.includes(sdk)) {
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
          if (Array.isArray(params)) {
            params.forEach((item) => {
              const containEnv = Object.keys(item).find((key) => key.includes('CYPRESSENV'));

              if (containEnv) {
                const envParam = containEnv.split('-')[1];
                item[envParam] = Cypress.env(envParam);
                delete item[containEnv];
              }
            });
          } else {
            const containEnv = Object.keys(params).find((key) => key.includes('CYPRESSENV'));
            if (containEnv) {
              const envParam = containEnv.split('-')[1];
              params[envParam] = Cypress.env(envParam);
              delete params[containEnv];
            }
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
      fireLog.fail(`${sdk} SDK not Supported`);
    }
  }
);

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
  const appId = UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID);
  const sdkVersion = UTILS.getEnvVariable(CONSTANTS.SDK_VERSION, false);
  if (sdkVersion) {
    return sdkVersion;
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
        cy.log(`Call from app: ${appId} - method: ${CONSTANTS.DEVICE_VERSION} params: {}`);
        cy.getDeviceDataFromThirdPartyApp(
          CONSTANTS.DEVICE_VERSION,
          {},
          CONSTANTS.ACTION_CORE.toLowerCase()
        ).then((response) => {
          cy.log(`Response from app: ${appId} - ${JSON.stringify(response)}`);
          // If the response is invalid, assign the latest SDK version to the environment variable.
          if (response?.result?.api?.readable && response?.result.sdk?.readable) {
            // Obtaining the api version from the response when certification is true, otherwise taking the sdk version.
            // When certification is true, certifying the platform. Hence the platform version is used which is returned by device.version.api
            // When certification is false, trying to test the platform. Hence the SDK Version is used which is returned by device.version.sdk
            const deviceSDKversionJson =
              UTILS.getEnvVariable(CONSTANTS.CERTIFICATION, false) == true
                ? response.result.api
                : response.result.sdk;
            const readableSDKVersion = deviceSDKversionJson.readable;

            // If the readable SDK version contains a next|proposed, assigning the readable version to the environment variable, otherwise taking the device SDK version.
            Cypress.env(
              CONSTANTS.SDK_VERSION,
              readableSDKVersion.includes(CONSTANTS.NEXT) ||
                readableSDKVersion.includes(CONSTANTS.PROPOSED)
                ? readableSDKVersion
                : `${deviceSDKversionJson.major}.${deviceSDKversionJson.minor}.${deviceSDKversionJson.patch}`
            );
          } else {
            Cypress.env(CONSTANTS.SDK_VERSION, latestSDKversion);
          }
          if (response?.result?.firmware?.readable) {
            let deviceFirmware = JSON.stringify(response.result.firmware.readable);
            deviceFirmware = deviceFirmware.replace(/"/g, '');
            Cypress.env(CONSTANTS.ENV_DEVICE_FIRMWARE, deviceFirmware);
          }
          if (response?.result?.api?.readable) {
            const fireboltVersion =
              `${response?.result?.api?.major}.${response?.result?.api?.minor}.${response?.result?.api?.patch}`.replace(
                /"/g,
                ''
              );
            Cypress.env(CONSTANTS.ENV_FIREBOLT_VERSION, fireboltVersion);
          }
          if (response?.result?.debug) {
            const release = response.result.debug;
            Cypress.env(CONSTANTS.ENV_RELEASE, release);
          }
          if (response?.result?.sdk?.readable) {
            const responseResultSDK =
              `${response?.result?.sdk?.major}.${response?.result?.sdk?.minor}.${response?.result?.sdk?.patch}`.replace(
                /"/g,
                ''
              );
            Cypress.env(CONSTANTS.ENV_SDK_VERSION, responseResultSDK);
          }
        });
      });
  }
});
/**
 * @module commands
 * @function updateRunInfo
 * @description update Run Info in cucumber report dynamically
 * @example
 * updateRunInfo()
 */
Cypress.Commands.add('updateRunInfo', () => {
  const reportEnvFile = './reportEnv.json';
  const tempReportEnvFile = './tempReportEnv.json';
  let deviceModel = '';
  let deviceDistributor = '';
  let devicePlatform = '';
  const fireboltVersion = '';

  // function to set env variable for run info data
  const setEnvRunInfo = (deviceData, deviceType, action, envVarName) => {
    if (deviceData === '') {
      // Fetch data from the first-party app
      if (Cypress.env(CONSTANTS.SUPPORTS_PLATFORM_COMMUNICATION)) {
        cy.getDeviceDataFromFirstPartyApp(deviceType, {}, action.toLowerCase()).then((response) => {
          if (deviceType.includes(CONSTANTS.DEVICE_VERSION)) {
            if (!Cypress.env(CONSTANTS.ENV_DEVICE_FIRMWARE) && response?.firmware?.readable) {
              let deviceFirmware = JSON.stringify(response.firmware.readable);
              deviceFirmware = deviceFirmware.replace(/"/g, '');
              Cypress.env(CONSTANTS.ENV_DEVICE_FIRMWARE, deviceFirmware);
            }
            if (!Cypress.env(CONSTANTS.ENV_FIREBOLT_VERSION) && response?.api?.readable) {
              const fireboltVersion =
                `${response?.api?.major}.${response?.api?.minor}.${response?.api?.patch}`.replace(
                  /"/g,
                  ''
                );
              Cypress.env(CONSTANTS.ENV_FIREBOLT_VERSION, fireboltVersion);
            }
            if (!Cypress.env(CONSTANTS.ENV_RELEASE) && response?.debug) {
              const release = response.debug;
              Cypress.env(CONSTANTS.ENV_RELEASE, release);
            }
          } else {
            // Set environment variable with the response
            Cypress.env(envVarName, JSON.stringify(response).replace(/"/g, ''));
          }
        });
      }
    } else {
      // Set environment variable with the value from json file
      Cypress.env(envVarName, JSON.stringify(deviceData).replace(/"/g, ''));
    }
  };
  cy.task('checkFileExists', reportEnvFile).then((exists) => {
    if (exists) {
      cy.task('checkFileExists', tempReportEnvFile).then((tempFileExists) => {
        if (!tempFileExists) {
          try {
            let configModuleConst;
            try {
              configModuleConst = require('../../../node_modules/configModule/constants/constants');
            } catch (error) {
              logger.info('Unable to read from configModule constants');
              return false;
            }
            const deviceMac = UTILS.getEnvVariable(CONSTANTS.DEVICE_MAC).replace(/:/g, '');
            const deviceMacJson = `./cypress/fixtures/devices/${deviceMac}.json`;
            const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
            // Check if mac json file exists
            cy.task('checkFileExists', deviceMacJson)
              .then((exists) => {
                if (exists) {
                  // File exists, read the file
                  return cy.readFile(deviceMacJson).then((macJson) => {
                    deviceModel = macJson?.DEVICE_MODEL ?? '';
                    deviceDistributor = macJson?.DEVICE_DISTRIBUTOR ?? '';
                    devicePlatform = macJson?.DEVICE_PLATFORM ?? '';
                  });
                }
                return cy.wrap(null); // Ensure the chain continues
              })
              .then(() => {
                // Sequentially set environment variables
                return setEnvRunInfo(
                  deviceModel,
                  CONSTANTS.DEVICE_MODEL,
                  CONSTANTS.ACTION_CORE,
                  CONSTANTS.ENV_DEVICE_MODEL
                );
              })
              .then(() => delay(2000))
              .then(() => {
                return setEnvRunInfo(
                  deviceDistributor,
                  CONSTANTS.DEVICE_DISTRIBUTOR,
                  CONSTANTS.ACTION_CORE,
                  CONSTANTS.ENV_DEVICE_DISTRIBUTOR
                );
              })
              .then(() => delay(2000))
              .then(() => {
                if (Cypress.env(CONSTANTS.ENV_FIREBOLT_VERSION)) return;
                else
                  return setEnvRunInfo(
                    fireboltVersion,
                    CONSTANTS.DEVICE_VERSION,
                    CONSTANTS.ACTION_CORE,
                    {}
                  );
              })
              .then(() => delay(2000))
              .then(() => {
                return setEnvRunInfo(
                  devicePlatform,
                  CONSTANTS.DEVICE_PLATFORM,
                  CONSTANTS.ACTION_CORE,
                  CONSTANTS.ENV_PLATFORM
                );
              })
              .then(() => {
                cy.readFile(reportEnvFile).then((reportEnv) => {
                  if (reportEnv) {
                    if (
                      reportEnv.customData &&
                      reportEnv.customData.data &&
                      reportEnv.customData.data.length > 0
                    ) {
                      const labelToEnvMap = {
                        [CONSTANTS.PRODUCT]: CONSTANTS.ENV_PRODUCT,
                        [CONSTANTS.FIREBOLT_VERSION]: CONSTANTS.ENV_FIREBOLT_VERSION,
                        [CONSTANTS.SDK_REPORT_VERSION]: CONSTANTS.ENV_SDK_VERSION,
                        [CONSTANTS.PLATFORM]: CONSTANTS.ENV_PLATFORM,
                        [CONSTANTS.RELEASE]: CONSTANTS.ENV_RELEASE,
                        [CONSTANTS.DEVICE_ENV]: CONSTANTS.ENV_DEVICE_MODEL,
                        [CONSTANTS.DEVICE_FIRMWARE]: CONSTANTS.ENV_DEVICE_FIRMWARE,
                        [CONSTANTS.PARTNER]: CONSTANTS.ENV_DEVICE_DISTRIBUTOR,
                      };
                      reportEnv.customData.data.forEach((item) => {
                        if (item.label === CONSTANTS.PRODUCT) {
                          item.value = configModuleConst.PRODUCT
                            ? configModuleConst.PRODUCT
                            : 'N/A';
                        } else if (labelToEnvMap[item.label]) {
                          item.value = Cypress.env(labelToEnvMap[item.label]) || 'N/A';
                        }
                      });
                    }
                    // write the merged object
                    cy.writeFile(tempReportEnvFile, reportEnv);
                  } else {
                    logger.info('Unable to read from reportEnv json file');
                    return false;
                  }
                });
              });
          } catch (err) {
            logger.info('Error in updating Run Info in cucumber report', err);
            return false;
          }
        } else if (tempFileExists && Cypress.env(CONSTANTS.ENV_SDK_VERSION)) {
          cy.readFile(tempReportEnvFile).then((reportEnv) => {
            if (reportEnv) {
              if (
                reportEnv.customData &&
                reportEnv.customData.data &&
                reportEnv.customData.data.length > 0 &&
                reportEnv.customData.data.some(
                  (item) => item.label === CONSTANTS.SDK_REPORT_VERSION && item.value === 'N/A'
                )
              ) {
                reportEnv.customData.data.forEach((item) => {
                  if (item.label === CONSTANTS.SDK_REPORT_VERSION) {
                    item.value = Cypress.env(CONSTANTS.ENV_SDK_VERSION);
                  }
                });
              }
              // write the merged object
              cy.writeFile(tempReportEnvFile, reportEnv);
            }
          });
        } else {
          logger.info(
            'Unable to update Run Info in cucumber report, tempReportEnv file already exists'
          );
          return false;
        }
      });
    } else {
      logger.info('Unable to update Run Info in cucumber report, reportEnv file doesnt exist');
      return false;
    }
  });
});

/**
 * @module commands
 * @function getDeviceDataFromFirstPartyApp
 * @description Making API call.
 * @example
 * cy.getDeviceData(method, param, action)
 */
Cypress.Commands.add('getDeviceDataFromFirstPartyApp', (method, param, action) => {
  const requestMap = {
    method: method,
    param: param,
    action: action,
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
 * @function getDeviceDataFromThirdPartyApp
 * @description Making API call from third party app.
 * @example
 * cy.getDeviceDataFromThirdPartyApp(method, param, action)
 */

Cypress.Commands.add('getDeviceDataFromThirdPartyApp', (method, params, action) => {
  const appId = UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID);
  const deviceIdentifier = null;
  const task = CONSTANTS.TASK.CALLMETHOD;
  const additionalParams = {
    communicationMode: UTILS.getCommunicationMode(),
    action: action,
    isNotSupportedApi: false,
  };
  const methodKey = CONSTANTS.METHOD;
  const paramKey = 'methodParams';

  const requestParams = { [methodKey]: method, [paramKey]: params };
  const intentMessage = UTILS.createIntentMessage(task, requestParams, additionalParams);

  cy.runIntentAddon(task, intentMessage).then((parsedIntent) => {
    const requestTopic = UTILS.getTopic(appId, null, deviceIdentifier);
    const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE, deviceIdentifier);
    cy.sendMessagetoApp(requestTopic, responseTopic, parsedIntent).then((response) => {
      if (typeof response === 'string' && response === CONSTANTS.NO_RESPONSE) {
        return 'N/A';
      }
      const responseObject = JSON.parse(response);
      try {
        if (responseObject && responseObject.result) {
          return responseObject;
        } else {
          throw 'Obtained response is null|undefined';
        }
      } catch (error) {
        fireLog.info('Failed to obtain a response', error);
      }
    });
  });
});

/**
 * @module commands
 * @function getLatestFireboltJsonFromFixtures
 * @description Get the firebolt.json folder names from fixtures/fireboltJsonVersion and return the latest file
 * @example
 * cy.getLatestFireboltJsonFromFixtures()
 */
Cypress.Commands.add('getLatestFireboltJsonFromFixtures', () => {
  cy.task('readFilesFromDir', 'cypress/fixtures/fireboltJsonVersion/').then((filesData) => {
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
  const sdkVersion = UTILS.getEnvVariable(CONSTANTS.SDK_VERSION);

  // Reading the path of the firebolt.json file from the environment variable based on the SDK version.
  if (sdkVersion.includes(CONSTANTS.NEXT)) {
    FIREBOLT_SPECIFICATION_URL = UTILS.getEnvVariable(CONSTANTS.FIREBOLT_SPECIFICATION_NEXT_URL);
  } else if (sdkVersion.includes(CONSTANTS.PROPOSED)) {
    FIREBOLT_SPECIFICATION_URL = UTILS.getEnvVariable(
      CONSTANTS.FIREBOLT_SPECIFICATION_PROPOSED_URL
    );
  } else {
    FIREBOLT_SPECIFICATION_URL = UTILS.getEnvVariable(CONSTANTS.FIREBOLT_SPECIFICATION_URL).replace(
      CONSTANTS.LATEST,
      sdkVersion
    );
  }

  cy.request({ url: FIREBOLT_SPECIFICATION_URL, failOnStatusCode: false }).then((data) => {
    // Get firebolt.json content from the FIREBOLT_SPECIFICATION_URL if the cy.request is success
    data = null;
    if (data && data.status == 200) {
      data = data.body;
      return data;
    }

    //  If cy.request fails, get specific firebolt.json from -cypress/fixtures/fireboltJsonVersion/${Cypress.env(CONSTANTS.SDK_VERSION)}/firebolt.json
    else {
      const configImportPath = `cypress/fixtures/fireboltJsonVersion/${UTILS.getEnvVariable(
        CONSTANTS.SDK_VERSION
      )}/firebolt.json`;

      cy.task('readFileIfExists', configImportPath).then((data) => {
        if (data) {
          return JSON.parse(data);
        } else {
          // Get the latest firebolt.json from fixtures if all other options fail
          cy.getLatestFireboltJsonFromFixtures().then((latestSDKversion) => {
            cy.fixture(`fireboltJsonVersion/${latestSDKversion}/firebolt.json`).then((data) => {
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
  Cypress.env(CONSTANTS.SCENARIO_NAME, scenarioName);
  Cypress.env(CONSTANTS.FEATURE_NAME, featureFileName);
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
        if (beforeOperationObject.skipTest) {
          UTILS.skipCurrentTest();
        }
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
      fireLog.fail(CONSTANTS.BEFORE_OPERATION_FORMAT);
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
    fireLog.fail('Before operation object is null/undefined - setResponse');
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
  // Initiating the Interaction service to listening for interaction logs when interactionsMetrics is set to true in beforeOperation object.
  else if (
    beforeOperation.hasOwnProperty(CONSTANTS.INTERACTIONS_METRICS) &&
    beforeOperation.interactionsMetrics === true
  ) {
    cy.startOrStopInteractionsService(CONSTANTS.INITIATED).then((response) => {
      if (response) {
        Cypress.env(CONSTANTS.IS_INTERACTIONS_SERVICE_ENABLED, true);
      }
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
    } else {
      fireLog.fail(eval(CONSTANTS.PERFORMANCE_METRICS_FAILURE_MESSAGE));
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
Cypress.Commands.add('launchApp', (appType, appCallSign, deviceIdentifier, intent) => {
  // use the firebolt command Discovery.launch to launch the app. If app id given, use the app id
  // else get the default app id from environment variable.

  const appId =
    appCallSign == undefined
      ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
      : UTILS.checkForSecondaryAppId(appCallSign); // this is for the app to know the appId used for launch, so that it can use the same for creating PubSub connection.
  // if appType is certification, the appLaunch is for certification purposes. In such a case, discovery.launch should go with a basic intent that has the appId and the certification app role.
  // Creating data for basic intent to be sent to the app on launch
  let appCategory;

  if (
    Cypress.env(CONSTANTS.APP_METADATA) &&
    Cypress.env(CONSTANTS.APP_METADATA)[appId]?.metadata?.type
  ) {
    Cypress.env(CONSTANTS.APP_TYPE, Cypress.env(CONSTANTS.APP_METADATA)[appId].metadata.type);
    appType = Cypress.env(CONSTANTS.APP_TYPE);
  }
  // Storing the appId in runtime environment variable
  if (Cypress.env(CONSTANTS.RUNTIME)) {
    Cypress.env(CONSTANTS.RUNTIME).appId = appId;
  } else {
    Cypress.env(CONSTANTS.RUNTIME, { appId });
  }
  // Creating intent and request map to be sent to the app on launch
  let messageIntent;

  if (intent) {
    // Clearing the intent from the runtime environment variable
    Cypress.env(CONSTANTS.RUNTIME).intent = {};
    const appMetadata = UTILS.getEnvVariable(CONSTANTS.APP_METADATA, false);

    // If the intent is present in the appMetadata, set the intent in the runtime environment variable
    if (appMetadata && appMetadata[appId] && appMetadata[appId][intent]) {
      Cypress.env(CONSTANTS.RUNTIME).intent = appMetadata[appId][intent];
    }

    // Check if intentTemplates are defined for the given appType
    let intentTemplate;
    const intentTemplates = UTILS.getEnvVariable(CONSTANTS.INTENT_TEMPLATES, false);
    if (intentTemplates && intentTemplates[appType]) {
      if (intentTemplates[appType][appId] && intentTemplates[appType][appId][intent]) {
        intentTemplate = intentTemplates[appType][appId][intent];
      } else if (intentTemplates[appType][intent]) {
        intentTemplate = intentTemplates[appType][intent];
      }
      // Log failure if intentTemplate is not found
      else {
        fireLog.fail(
          `Intent template for the ${intent} intent not found in ${appType} intentTemplates`
        );
      }
    }
    // Log failure if intentTemplates are not defined for the given appType
    else {
      fireLog.fail(
        `No intentTemplates found for ${appType}, make sure the intentTemplates are defined as per the appType`
      );
    }

    // Attempt to resolve the intentTemplate and create messageIntent
    try {
      messageIntent = {
        [CONSTANTS.APP_ID]: appId,
        [CONSTANTS.INTENT]: UTILS.resolveRecursiveValues(intentTemplate),
      };
    } catch (error) {
      fireLog.fail('Could not resolve intentTemplate: ' + error.message);
    }
  } else {
    const data = {
      query: {
        params: {},
      },
    };
    if (appType.toLowerCase() === CONSTANTS.CERTIFICATION) {
      appCategory =
        UTILS.getEnvVariable(CONSTANTS.APP_TYPE, false) !== undefined
          ? UTILS.getEnvVariable(CONSTANTS.APP_TYPE)
          : CONSTANTS.FIREBOLT; // appType defines in which mode app should be launched
      const params = {
        [CONSTANTS.APP_ID]: appId,
        [CONSTANTS.APP_TYPE]: appCategory,
        [CONSTANTS.MACADDRESS_PARAM]: getEnvVariable(CONSTANTS.DEVICE_MAC),
      };
      data.query.params = params;
    }
    // If testType == lifecycle, modifying data to include lifecycle_validation = true in the intent to be sent to the app
    if (
      Cypress.env(CONSTANTS.TEST_TYPE).toLowerCase() == CONSTANTS.MODULE_NAMES.LIFECYCLEAPI ||
      Cypress.env(CONSTANTS.TEST_TYPE).toLowerCase() == CONSTANTS.MODULE_NAMES.LIFECYCLE
    ) {
      const params = {
        [CONSTANTS.APP_ID]: appId,
        [CONSTANTS.LIFECYCLE_VALIDATION]: true,
        [CONSTANTS.APP_TYPE]: appCategory,
        [CONSTANTS.MACADDRESS_PARAM]: getEnvVariable(CONSTANTS.DEVICE_MAC),
      };
      data.query.params = params;
    }

    // Add the PubSub URL if required
    if (getEnvVariable(CONSTANTS.PUB_SUB_URL, false)) {
      data.query.params[CONSTANTS.PUB_SUB_URL] = getEnvVariable(CONSTANTS.PUB_SUB_URL);
    }
    // Add the PubSub UUID if the env variable is set
    if (getEnvVariable(CONSTANTS.PUB_SUB_UUID, false)) {
      data.query.params[CONSTANTS.PUB_SUB_UUID] = getEnvVariable(CONSTANTS.PUB_SUB_UUID);
    }
    // Add the PubSub publish suffix from env variable
    if (getEnvVariable(CONSTANTS.PUB_SUB_SUBSCRIBE_SUFFIX, false)) {
      data.query.params[CONSTANTS.PUB_SUB_PUBLISH_SUFFIX] = getEnvVariable(
        CONSTANTS.PUB_SUB_SUBSCRIBE_SUFFIX
      );
    }
    // Add the PubSub subscribe suffix from env variable
    if (getEnvVariable(CONSTANTS.PUB_SUB_PUBLISH_SUFFIX, false)) {
      data.query.params[CONSTANTS.PUB_SUB_SUBSCRIBE_SUFFIX] = getEnvVariable(
        CONSTANTS.PUB_SUB_PUBLISH_SUFFIX
      );
    }
    // Check for additional launch parameters
    // If a key exists in both the default parameters and the additional parameters, the value from the additional parameters will override the default value.
    if (Cypress.env('additionalLaunchParams')) {
      const additionalParams = Cypress.env('additionalLaunchParams');
      for (const key in additionalParams) {
        let value = additionalParams[key];
        // If the value starts with 'CYPRESSENV-', extract the variable name.
        if (value.startsWith('CYPRESSENV-')) {
          const envParam = value.split('-')[1];
          // Fetch the corresponding value from the env.
          value = getEnvVariable(envParam, false);
        }
        // Add to data.query.params only if the value is defined
        if (value) {
          data.query.params[key] = value;
        }
      }
    }

    // If the testType is userInterestProvider, send the discovery.launch params with registerProvider = false, then certification app will not register for userInterest provider.
    if (Cypress.env(CONSTANTS.TEST_TYPE).toLowerCase() == CONSTANTS.USERINTERESTPROVIDER) {
      data.query.params[CONSTANTS.REGISTERPROVIDER] = false;
    }

    // Stringify the query (The intent requires it be a string)
    data.query = JSON.stringify(data.query);
    messageIntent = {
      [CONSTANTS.APP_ID]: appId,
      [CONSTANTS.INTENT]: {
        action: CONSTANTS.SEARCH,
        data: data,
        context: { source: CONSTANTS.DEVICE },
      },
    };
  }

  const requestMap = {
    method: CONSTANTS.DISCOVERY_LAUNCH,
    params: messageIntent,
  };
  requestMap.deviceIdentifier = deviceIdentifier;

  Cypress.env(CONSTANTS.CURRENT_APP_ID, appId);

  const requestTopic = UTILS.getTopic(appId, null, deviceIdentifier);
  const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE, deviceIdentifier);

  cy.runIntentAddon(CONSTANTS.LAUNCHAPP, requestMap).then((parsedIntent) => {
    fireLog.info(
      'Discovery launch intent: ' + UTILS.censorPubSubToken(JSON.stringify(parsedIntent))
    );
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
              `Unable to get healthCheck response from App in ${getEnvVariable(CONSTANTS.HEALTH_CHECK_RETRIES)} retries. Failed to launch the 3rd party app on ${deviceIdentifier || getEnvVariable(CONSTANTS.DEVICE_MAC)} or not subscribed to
            ${requestTopic} topic.`
            );
          }
          healthCheckResponse = JSON.parse(healthCheckResponse);
          expect(healthCheckResponse.status).to.be.oneOf([CONSTANTS.RESPONSE_STATUS.OK]);
        });
        cy.getSdkVersion().then(() => {
          cy.getFireboltJsonData().then((data) => {
            Cypress.env(CONSTANTS.FIREBOLTCONFIG, data);
          });
        });
        cy.getCapabilities();
        cy.updateRunInfo();
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
  const { method, params, action, expected, appId } = requestData;
  const context = requestData?.context ? requestData.context : {};
  const deviceIdentifier = requestData.deviceIdentifier;
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
        const requestTopic = UTILS.getTopic(appId, null, deviceIdentifier);
        const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE, deviceIdentifier);
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
    if (method.startsWith(CONSTANTS.FCS_SETTER)) {
      console.log(
        `Schema validation skipped for the ${method} method as it is already handled by fcsSetters.`
      );
      return;
    }
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
 * @function methodOrEventResponseValidation
 * @description Function to validate the response
 * @param {String} validationType - Determines whether method or event validation is being performed. Ex: 'method' or 'event'
 * @param {String} requestData - Contains the data which required to do content validation for the specified method.
 * @example
 * cy.methodOrEventResponseValidation('method', {method: 'account.id', context: {}, contentObject: {}, expectingError: false, appId: 'test.test'})
 * cy.methodOrEventResponseValidation('event', {method: 'accessibility.onClosedCaptionsSettingsChanged', context: {}, contentObject: {}, expectingError: false, appId: 'test.test', eventExpected: 'triggers'})
 */
Cypress.Commands.add('methodOrEventResponseValidation', (validationType, requestData) => {
  // To check whether the method/event validation should be performed or not based on the include/exclude valiodation object
  if (!shouldPerformValidation('transactionTypes', validationType)) return;
  const { context, expectingError, appId, eventExpected, isNullCase } = requestData;
  const method = requestData?.event ? requestData.event : requestData.method;
  const contentObject = requestData.content ? requestData.content : requestData.contentObject;
  let validationJsonPath = requestData.validationJsonPath;

  // Helper function to handle switch case validation
  const handleValidation = (object, methodOrEventObject, methodOrEventResponse = null) => {
    const scenario = object.type;
    const tags = object.tags;
    // To check whether the validation should be performed or not based on the include/exclude valiodation object
    if (!shouldPerformValidation('validationTypes', scenario)) return;
    if (!shouldPerformValidation('validationTags', tags)) return;
    if (scenario === CONSTANTS.SCHEMA_ONLY || !object.validations) return;

    // cy.then() to ensure each Cypress command is properly awaited before return
    cy.then(() => {
      fireLog.info(`======Beginning of the ${scenario} validation======`);
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
        case CONSTANTS.PERFORMANCE_VALIDATION:
          cy.performanceValidation(object);
          break;
        default:
          assert(false, 'Unsupported validation type');
          break;
      }
    }).then(() => {
      fireLog.info(`=====Ending of the ${scenario} validation=====`);
    });
  };

  // Check if method or event field is present in requestData
  if (!requestData.method && !requestData.event) {
    if (contentObject && contentObject.data) {
      contentObject.data.forEach((object) => handleValidation(object));
    } else {
      cy.validateContent(method, context, validationJsonPath, contentObject, validationType, appId);
    }
    return;
  }

  // Extracting the api or event object from the global list.
  const methodOrEventObject = UTILS.getApiOrEventObjectFromGlobalList(
    method,
    context,
    appId,
    validationType
  );

  cy.validateResponseErrorAndSchemaResult(methodOrEventObject, validationType).then(() => {
    const param = methodOrEventObject.params;
    // If passed method is exception method or expecting a error in response, doing error content validation.
    if (UTILS.isScenarioExempted(method, param) || expectingError) {
      const errorResponse =
        validationType == CONSTANTS.EVENT
          ? methodOrEventObject.eventListenerResponse.error
          : methodOrEventObject.apiResponse.error;

      cy.validateErrorObject(
        errorResponse,
        contentObject,
        methodOrEventObject,
        UTILS.isScenarioExempted(method, param)
      );
    } else {
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
            cy.updateResponseForFCS(method, null, response, true, isNullCase).then(
              (updatedResponse) => {
                cy.saveEventResponse(
                  updatedResponse,
                  methodOrEventObject,
                  eventName,
                  eventExpected === 'triggers' ? true : false,
                  isNullCase
                );
              }
            );
          });
        }
      }).then(() => {
        try {
          if (contentObject && contentObject.data) {
            contentObject.data.forEach((object) => {
              const scenario = object.type;

              if (scenario != CONSTANTS.SCHEMA_ONLY) {
                if (object.validations) {
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
                          `Could not find the valid validation path from the validationJsonPath list - ${JSON.stringify(validationJsonPath)}`
                        );
                  }
                  handleValidation(object, methodOrEventObject, methodOrEventResponse);
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

/**
 * @module commands
 * @function validateMethodOrEventResponseForDynamicConfig
 * @description Validating the event or method response
 * @param {String} validationType - Determines event or method validation
 * @param {String} method - API name
 * @param {*} validationJsonPath - Contains an array or string with the path of the response value that needs to be validated.
 * @param {String} contentObject - Contains source of truth for content validation.
 * @param {String} appId - app identified name.
 * @param {String} errorContent - Holds the error content validation object when error is expected.
 * @param {String} eventExpected - Determines whether expecting for a event or not.
 * @example
 * cy.validateMethodOrEventResponseForDynamicConfig('method', 'account.id', 'result', {}, 'test.test', 'errorContent', 'eventExpected');
 */
Cypress.Commands.add(
  'validateMethodOrEventResponseForDynamicConfig',
  (
    validationType,
    method,
    validationJsonPath,
    contentObject,
    appId,
    errorContent,
    eventExpected,
    isNullCase
  ) => {
    // Reading the appId from the environment variable
    appId = UTILS.fetchAppIdentifierFromEnv(appId);
    const context = {};
    const expectingError = errorContent ? true : false;
    method = method.includes('_') ? method.split('_')[1] : method;
    if (expectingError) {
      // Retriving the error content from the environment variable if it exists; otherwise, using the key as-is
      if (
        UTILS.getEnvVariable(CONSTANTS.ERROR_CONTENT_VALIDATIONJSON, false) &&
        UTILS.getEnvVariable(CONSTANTS.ERROR_CONTENT_VALIDATIONJSON)[errorContent]
      ) {
        contentObject = UTILS.getEnvVariable(CONSTANTS.ERROR_CONTENT_VALIDATIONJSON)[errorContent];
      } else {
        contentObject = errorContent;
      }
    }

    const additionalParams = {
      method: method,
      context: context,
      validationJsonPath: validationJsonPath,
      contentObject: contentObject,
      expectingError: expectingError,
      appId: appId,
      eventExpected: eventExpected,
      isNullCase: isNullCase,
    };

    if (!Cypress.env(CONSTANTS.SKIPCONTENTVALIDATION)) {
      cy.methodOrEventResponseValidation(validationType, additionalParams);
    } else {
      cy.log(`${CONSTANTS.SKIPCONTENTVALIDATION} flag is enabled, Skipping the Content validation`);
    }
  }
);

/**
 * @module commands
 * @function getRuntimeFireboltCallObject
 * @description Fetching the firebolt call object from the environment variable if present, otherwise failing the test.
 * @param {String} sdk - sdk name .
 * @example
 * cy.getRuntimeFireboltCallObject(sdk);
 */
Cypress.Commands.add('getRuntimeFireboltCallObject', () => {
  // Checking the `runtime` env variable created and it has 'fireboltCall' field, else failing the test.
  if (
    UTILS.getEnvVariable(CONSTANTS.RUNTIME, false) &&
    UTILS.getEnvVariable(CONSTANTS.RUNTIME, false).hasOwnProperty(CONSTANTS.FIREBOLTCALL) &&
    UTILS.getEnvVariable(CONSTANTS.RUNTIME, false).fireboltCall
  ) {
    return UTILS.getEnvVariable(CONSTANTS.RUNTIME).fireboltCall;
  } else {
    fireLog.fail(
      `The firebolt call object was not found in the runtime environment variable. Please ensure it is initialized in the step "the environment has been set up" with the appropriate firebolt object key. Refer here - ${CONSTANTS.FIREBOLT_OBJECT_DOC_PATH}`
    );
  }
});

/**
 * @module commands
 * @function startOrStopInteractionsService
 * @description To start or stop firebolt interactions collection service in device by passing appropriate intent to designated handler
 * @param {String} action - initiated or stopped
 * @example
 * cy.startOrStopInteractionsService('initiated)
 * cy.startOrStopInteractionsService('stopped')
 */
Cypress.Commands.add('startOrStopInteractionsService', (action) => {
  const requestMap = {
    method: CONSTANTS.REQUEST_OVERRIDE_CALLS.SETFIREBOLTINTERACTIONSHANDLER,
    params: {
      trigger: action == CONSTANTS.INITIATED ? CONSTANTS.START : CONSTANTS.STOP,
      optionalParams: '',
    },
    task: CONSTANTS.TASK.FIREBOLTINTERACTIONSHANDLER,
  };
  fireLog.info(CONSTANTS.REQUEST_MAP_INTERACTIONS_SERVICE + JSON.stringify(requestMap));
  // Sending message to the platform to call designated handler
  cy.sendMessagetoPlatforms(requestMap).then((result) => {
    if (result?.success) {
      fireLog
        .assert(true, `Firebolt interactions collection service ${action} successfully`)
        .then(() => {
          return true;
        });
    } else {
      fireLog
        .info(
          `Firebolt interactions collection service with action as ${action} has failed with error ${JSON.stringify(result.message)}`
        )
        .then(() => {
          return false;
        });
    }
  });
});

/**
 * @module commands
 * @function envConfigSetup
 * @description Gives additional functionality to add necessary setup from the config module.
 * @example
 * cy.envConfigSetup()
 * @Note Add or overwrite envConfigSetup cypress command in the config module to add necessary setup.
 */
Cypress.Commands.add('envConfigSetup', () => {
  fireLog.info('No additional config module environment setup');
});

/**
 * @module commands
 * @function exitAppSession
 * @description Function to provide the test runner with various methods to end the current app session
 * @param {String} exitType - Type of close operation to be performed.
 * @param {String} params - The parameters required to perform the close operation.
 * @example
 * cy.exitAppSession('closeApp',{appId: '')
 * cy.exitAppSession('dismissApp',{keyPressSequence: []})
 * cy.exitAppSession('unloadApp',{appId: ''})
 */
Cypress.Commands.add('exitAppSession', (exitType, params) => {
  let exitMethod;
  let requestMap;
  const appIdForLog = params.appId ? params.appId : Cypress.env(CONSTANTS.RUNTIME).appId;
  fireLog.info(`Invoking platform implementation to end session for appId: ${appIdForLog}`);

  switch (exitType) {
    case 'closeApp':
      exitMethod = CONSTANTS.REQUEST_OVERRIDE_CALLS.CLOSEAPP;
      requestMap = {
        method: exitMethod,
        params: params.appId,
      };
      Cypress.env(CONSTANTS.APP_LAUNCH_STATUS, false);
      Cypress.env(CONSTANTS.APP_LAUNCH_COUNT, 0);
      break;
    case 'unloadApp':
      exitMethod = CONSTANTS.REQUEST_OVERRIDE_CALLS.UNLOADAPP;
      requestMap = {
        method: exitMethod,
        params: params.appId,
      };
      Cypress.env(CONSTANTS.APP_LAUNCH_STATUS, false);
      Cypress.env(CONSTANTS.APP_LAUNCH_COUNT, 0);
      break;
    case 'dismissApp':
      exitMethod = CONSTANTS.REQUEST_OVERRIDE_CALLS.DISMISSAPP;
      requestMap = {
        method: exitMethod,
        params: params.keyPressSequence,
      };

      break;
    default:
      fireLog.info(
        `Session for appId: ${appIdForLog} will not be ended due to invalid exitType ${exitType}`
      );
      fireLog.error(CONSTANTS.CONFIG_IMPLEMENTATION_MISSING);
  }
  cy.log(`Session for appId: ${appIdForLog} will be ended with type: ${exitType}`);
  cy.sendMessagetoPlatforms(requestMap).then((response) => {
    cy.log(`Platform has successfully ended app Session for appId: ${appIdForLog}`);
  });
});

/**
 * @module commands
 * @function initiatePerformanceMetrics
 * @description Creates a marker and saves the start time in THRESHOLD_MONITOR_START_TIME env, if performance metrics is enabled.
 * @example
 * cy.initiatePerformanceMetrics()
 */
Cypress.Commands.add('initiatePerformanceMetrics', () => {
  // Check if performance metrics is enabled
  if (UTILS.getEnvVariable(CONSTANTS.PERFORMANCE_METRICS) === true) {
    // Retrieve the scenario name from the env.
    const scenarioName = Cypress.env(CONSTANTS.SCENARIO_NAME);

    // Request to create a marker
    const requestMap = {
      method: CONSTANTS.REQUEST_OVERRIDE_CALLS.CREATE_MARKER,
      params: scenarioName,
    };
    cy.sendMessagetoPlatforms(requestMap).then((result) => {
      const markerCreated = result.success;
      Cypress.env(CONSTANTS.MARKER_CREATION_STATUS, markerCreated);
    });

    // Save the start time in the environment variable
    const epochTime = Number.parseInt(Date.now() / 1000);
    Cypress.env(CONSTANTS.THRESHOLD_MONITOR_START_TIME, epochTime);
  }
});

/**
 * @module commands
 * @function fetchAppMetaData
 * @descriptionReads app metadata from the appData directories of both fcs and configModule, then combines them, prioritizing the configModule metadata.
 * @example
 * cy.fetchAppMetaData()
 */
Cypress.Commands.add('fetchAppMetaData', () => {
  if (Cypress.env(CONSTANTS.APP_ASSURANCE_ID)) {
    const requestParams = {
      method: CONSTANTS.REQUEST_OVERRIDE_CALLS.GETAPPDATA,
      params: {
        deviceMac: Cypress.env(CONSTANTS.DEVICE_MAC),
        appAssuranceId: Cypress.env(CONSTANTS.APP_ASSURANCE_ID),
      },
    };
    // Send the request to fetch app data from platforms
    cy.sendMessagetoPlatforms(requestParams).then((result) => {
      if (result && result.data) {
        return result.data;
      } else {
        throw new Error('Unable to get valid response for fetching app metadata');
      }
    });
  } else {
    // If app assurance id is not available, extract app metadata from local directories

    const internalAppMetaDataPath = CONSTANTS.INTERNAL_APPMETADATA_PATH;
    const internalAppMetaDataDir = CONSTANTS.INTERNAL_APPMETADATA_DIRECTORY;

    const externalAppMetaDataPath = CONSTANTS.EXTERNAL_APPMETADATA_PATH;
    const externalAppMetaDataDir = CONSTANTS.EXTERNAL_APPMETADATA_DIRECTORY;

    // Extract internal app metadata
    cy.extractAppMetadata(internalAppMetaDataDir, internalAppMetaDataPath).then(
      (fcsAppMetaData) => {
        // Check if internal app metadata extraction was successful
        if (!fcsAppMetaData) {
          throw new Error('Failed to extract internal app metadata.');
        }

        // Extract external app metadata
        cy.extractAppMetadata(externalAppMetaDataDir, externalAppMetaDataPath).then(
          (configModuleAppMetaData) => {
            // Check if external app metadata extraction was successful
            if (!configModuleAppMetaData) {
              throw new Error('Failed to extract external app metadata.');
            }

            // Merge internal and external app metadata
            try {
              _.merge(fcsAppMetaData, configModuleAppMetaData);
            } catch (mergeError) {
              throw new Error(`Error merging app metadata: ${mergeError.message}`);
            }
          }
        );
      }
    );
  }
});

/**
 * @module commands
 * @function extractAppMetadata
 * @description Extracts app metadata from the appData directory and merges it with the app_metadata.json file.
 * @example
 * cy.extractAppMetadata('cypress/fixtures/objects/appData/', 'cypress/fixtures/objects/appData/app_metadata.json')
 */
Cypress.Commands.add('extractAppMetadata', (appDataDir, appMetaDataFile) => {
  cy.task(CONSTANTS.READFILEIFEXISTS, appMetaDataFile).then((appMetaData) => {
    let mergedData = appMetaData ? _.cloneDeep(appMetaData) : {};
    mergedData = typeof mergedData === CONSTANTS.TYPE_STRING ? JSON.parse(mergedData) : mergedData;
    cy.task(CONSTANTS.READ_FILES_FROM_DIRECTORY, appDataDir).then((files) => {
      files = files ? files : [];
      files = files.filter((file) => file !== 'app_metadata.json' && file.endsWith('.json'));
      const filePromises = files.map((file) => {
        const filePath = path.join(appDataDir, file);
        const appId = file.split('.')[0];
        return cy.task(CONSTANTS.READFILEIFEXISTS, filePath).then((fileData) => {
          fileData = JSON.parse(fileData);
          if (fileData) {
            if (mergedData[appId]) {
              mergedData[appId] = _.merge(mergedData[appId], fileData);
            } else {
              mergedData[appId] = fileData;
            }
          }
        });
      });
      return cy.wrap(Promise.all(filePromises)).then(() => {
        return mergedData;
      });
    });
  });
});

/**
 * @module commands
 * @function softAssert
 * @description soft assertion to compare actual and expected values
 * @example
 * cy.softAssert(actual, expected, message)
 */
Cypress.Commands.add('softAssert', (actual, expected, message) => {
  jsonAssertion.softAssert(actual, expected, message);

  if (jsonAssertion && jsonAssertion.jsonDiffArray && jsonAssertion.jsonDiffArray.length) {
    jsonAssertion.jsonDiffArray.forEach((diff) => {
      Cypress.log({
        name: 'Soft assertion error',
        displayName: 'softAssert',
        message: diff.error.message,
      });
    });
  } else {
    cy.log(`Soft assertion passed : ${message}`);
  }
});

/**
 * @module commands
 * @function softAssertAll
 * @description soft assertion to check all the assertions
 * @example
 * cy.softAssertAll()
 */
Cypress.Commands.add('softAssertAll', () => jsonAssertion.softAssertAll());

/**
 * @module commands
 * @function clearSoftAssertArray
 * @description To clear all the soft assertions
 * @example
 * cy.clearSoftAssertArray()
 */
Cypress.Commands.add('clearSoftAssertArray', () => {
  cy.log(`Clearing soft assertion array`);

  // Reset relevant properties
  jsonAssertion.softAssertJson = null;
  jsonAssertion.softAssertCount = 0;
});

/**
 * @module commands
 * @function shouldPerformValidation
 * @description Determines whether validation should be performed for a given key-value pair based on include and exclude validation.
 * - If 'value' is 'undefined' or 'null', validation is performed ('true').
 * - If 'excludeValidations[key]' contains 'value', validation is skipped ('false').
 * - If 'includeValidations[key]' is an empty array ('[]'), validation is skipped ('false').
 * - If 'includeValidations[key]' exists and does not contain 'value', validation is skipped ('false').
 * - Otherwise, validation is performed ('true').
 * @param {string} key - The key representing the type of validation.
 * @param {any} value - The value to validate.
 * @returns {boolean} 'true' if validation should proceed, 'false' for validation to skip.
 */

const shouldPerformValidation = (key, value) => {
  const parseJSON = (data) => {
    if (typeof data === 'string') {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.log(`Failed to parse JSON: ${error.message}`);
        return {}; // Return an empty object if parsing fails
      }
    }
    return data || {}; // Ensure it's an object or fallback to empty
  };
  // excludeValidations or includeValidations is not defined in the environment, assign {} to continue normal validations.
  const excludeValidations = parseJSON(UTILS.getEnvVariable(CONSTANTS.EXCLUDE_VALIDATIONS, false));
  const includeValidations = parseJSON(UTILS.getEnvVariable(CONSTANTS.INCLUDE_VALIDATIONS, false));

  // Allow normal validation if value is null, undefined, or an empty string
  if (value == null || value === '') {
    return true;
  }

  // If excludeValidations contains key and value, skip validation
  if (Array.isArray(excludeValidations[key]) && excludeValidations[key].includes(value)) {
    fireLog.info(`Skipping validation: ${value} as it is in excludeValidations under ${key}`);
    return false;
  }

  // If includeValidations exists for the key but does NOT include the value, skip validation
  if (Array.isArray(includeValidations[key]) && !includeValidations[key].includes(value)) {
    fireLog.info(`Skipping validation: ${value} as it is NOT in includeValidations under ${key}`);
    return false;
  }

  return true;
};

/**
 * @module commands
 * @function findLogPattern
 * @description Sends a request to search for specific log patterns
 * @example
 * cy.findLogPattern({ logPattern: "SignIn", fileName: "/logs/app.log" })
 */
Cypress.Commands.add('findLogPattern', (param) => {
  const requestMap = {
    method: CONSTANTS.REQUEST_OVERRIDE_CALLS.FINDLOGPATTERN,
    params: param,
  };
  cy.sendMessagetoPlatforms(requestMap).then((result) => {
    return result;
  });
});
