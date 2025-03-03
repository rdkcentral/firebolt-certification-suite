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
import { Given } from '@badeball/cypress-cucumber-preprocessor';
const CONSTANTS = require('../constants/constants');
const _ = require('lodash');
import { apiObject } from '../appObjectConfigs';
import UTILS, { fireLog } from '../cypress-support/src/utils';

/**
 * @module fireboltCalls
 * @function And 1st party app invokes the (?:'(.+)' )?API to '(.+)'
 * @description send message to platform to make api call.
 * @param {String} sdk - sdk name.
 * @param {String} key - key name of the request data.
 * @example
 * Given 1st party app invokes the 'Firebolt' API to 'get device id'
 * Given 1st party app invokes the API to 'get device id
 */
Given(/1st party app invokes the (?:'(.+)' )?API to '(.+)'$/, async (sdk, key) => {
  // Fetching the data like method, param, context and action etc.
  cy.fireboltDataParser(key, sdk).then((parsedDataArr) => {
    parsedDataArr.forEach((parsedData) => {
      parsedData.appId = Cypress.env(CONSTANTS.FIRST_PARTY_APPID);

      fireLog.info(
        'Call from 1st party App, method: ' +
          parsedData.method +
          ' params: ' +
          JSON.stringify(parsedData.params)
      );
      cy.sendMessageToPlatformOrApp(CONSTANTS.PLATFORM, parsedData);
    });
  });
});

/**
 * @module fireboltCalls
 * @function And '(.+)' invokes the '(.+)' API to '(.+)'(?: on '(.+)' device)?
 * @description send message to 3rd party app to make api call.
 * @param {String} appId - 3rd party app id.
 * @param {String} sdk - sdk name.
 * @param {String} key - key name of the firebolt data contains method/param/context.
 * @param {String} deviceIdentifier - Contains environment variable name which is having device mac.
 * @example
 * Given '3rd party app' invokes the 'Firebolt' API to 'get device id'
 * Given 'test.test.test' invokes the 'Firebolt' API to 'get device id'
 * Given 'secondary 3rd party app' invokes the 'Firebolt' API to 'get device id'
 * And '3rd party app' invokes the 'Firebolt' API to 'get device id' on 'device1' device
 */
Given(
  /'(.+)' invokes the '(.+)' API to '(.+)'(?: on '(.+)' device)?$/,
  async (appId, sdk, key, deviceIdentifier) => {
    // If appId is having '3rd party app' taking default appId else using the value as-is.
    appId = !appId
      ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
      : appId === CONSTANTS.THIRD_PARTY_APP
        ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
        : UTILS.checkForSecondaryAppId(appId);

    cy.then(() => {
      if (
        deviceIdentifier &&
        !UTILS.getEnvVariable(deviceIdentifier, false) &&
        deviceIdentifier != CONSTANTS.DEVICE1
      ) {
        fireLog.assert(
          false,
          `Unable to find the ${deviceIdentifier} environment value, Check whether environment variable value added for ${deviceIdentifier}`
        );
      }
      // Launching the App, when device identifier is passed and corresponding environment value present.
      else if (deviceIdentifier && UTILS.getEnvVariable(deviceIdentifier, false)) {
        deviceIdentifier = UTILS.getEnvVariable(deviceIdentifier, false);
        cy.launchApp(CONSTANTS.CERTIFICATION, appId, deviceIdentifier);
      }
      // Launching the default 3rd party app when device identifier has 'device1'
      else if (deviceIdentifier === CONSTANTS.DEVICE1) {
        deviceIdentifier = UTILS.getEnvVariable(CONSTANTS.DEVICE_MAC);
        cy.launchApp(CONSTANTS.CERTIFICATION, appId, deviceIdentifier);
      }
    }).then(() => {
      // Fetching the data like method, param, context and action etc.
      cy.fireboltDataParser(key, sdk).then((parsedDataArr) => {
        parsedDataArr.forEach((parsedData) => {
          if (
            Cypress.env(CONSTANTS.TEST_TYPE) &&
            Cypress.env(CONSTANTS.TEST_TYPE).toLowerCase() == CONSTANTS.MODULE_NAMES.LIFECYCLE
          ) {
            cy.fetchLifecycleHistory(appId);
          }
          parsedData.appId = appId;
          parsedData.deviceIdentifier = deviceIdentifier;

          fireLog.info(
            `Call from app: ${appId}, device: ${deviceIdentifier || UTILS.getEnvVariable(CONSTANTS.DEVICE_MAC)} - method: ${parsedData.method} params: ${JSON.stringify(parsedData.params)}`
          );

          cy.sendMessageToPlatformOrApp(CONSTANTS.APP, parsedData);
        });
      });
    });
  }
);

/**
 * @module fireboltCalls
 * @function And '(.+)' registers for the '(.+)' event using the '(.+)' API
 * @description send message to 3rd party app to register the events.
 * @param {String} appId - 3rd party app id.
 * @param {String} sdk - sdk name.
 * @param {String} key - key name of the firebolt data contains method/param/context.
 * @example
 * Given '3rd party app' registers for the 'Closed Captions Settings' event using the 'Firebolt' API
 * Given 'test.test.test' registers for the 'Closed Captions Settings' event using the 'Firebolt' API
 * Given 'secondary 3rd party app' registers for the 'Closed Captions Settings' event using the 'Firebolt' API
 */
Given(/'(.+)' registers for the '(.+)' event using the '(.+)' API$/, async (appId, key, sdk) => {
  // Fetching the data like method, param, context and action etc.
  cy.fireboltDataParser(key, sdk).then((parsedDataArr) => {
    parsedDataArr.forEach((parsedData) => {
      // If appId is having '3rd party app' taking default appId else using the value as-is.
      appId = appId = !appId
        ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
        : appId === CONSTANTS.THIRD_PARTY_APP
          ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
          : UTILS.checkForSecondaryAppId(appId);

      parsedData.appId = appId;
      fireLog.info(
        `Registering for the ${parsedData.method} event using ${appId} with params : ${JSON.stringify(parsedData.params)}`
      );
      cy.sendMessageToPlatformOrApp(CONSTANTS.APP, parsedData, CONSTANTS.TASK.REGISTEREVENT);
    });
  });
});

/**
 * @module fireboltCalls
 * @function And 1st party app registers for the '(.+)' event using the '(.+)' API
 * @description send message to platform to register the events.
 * @param {String} sdk - sdk name.
 * @param {String} key - key name of the firebolt data contains method/param/context.
 * @example
 * Given 1st party app registers for the 'Closed Captioning Changed' event using the 'Firebolt' API
 */
Given(/1st party app registers for the '(.+)' event using the '(.+)' API$/, async (key, sdk) => {
  // Fetching the data like method, param, context and action etc.
  cy.fireboltDataParser(key, sdk).then((parsedDataArr) => {
    parsedDataArr.forEach((parsedData) => {
      parsedData.appId = UTILS.getEnvVariable(CONSTANTS.FIRST_PARTY_APPID);
      fireLog.info(
        `Registering for the ${parsedData.method} event using 1st party App with params : ${JSON.stringify(
          parsedData.params
        )}`
      );
      cy.sendMessageToPlatformOrApp(CONSTANTS.PLATFORM, parsedData, CONSTANTS.TASK.REGISTEREVENT);
    });
  });
});

/**
 * @module fireboltCalls
 * @function And (3rd party|1st party) stops listening to the event '(.+)'
 * @description sending message to platform/third party App to clear event listener.
 * @param {String} app - value to determine 1st party or 3rd party.
 * @param {String} key - key name of the data contains event name and parameter.
 * @example
 * And '1st party' stops listening to the event 'accessibility.onClosedCaptionsSettingsChanged'
 * And '3rd party' stops listening to the event 'accessibility.onClosedCaptionsSettingsChanged'
 */
Given(/(3rd party|1st party) stops listening to the event '(.+)'$/, async (app, key) => {
  key = key.replaceAll(' ', '_').toUpperCase();
  cy.getFireboltData(key, CONSTANTS.SUPPORTED_CALLTYPES.FIREBOLTMOCKS).then((parsedData) => {
    // Check if parsedData is an array or an object
    const fireboltItems = Array.isArray(parsedData) ? parsedData : [parsedData];

    fireboltItems.forEach((item) => {
      const firstParty = item.firstParty;
      const fireboltItem = { ...item };
      let action = CONSTANTS.ACTION_CORE.toLowerCase();

      if (fireboltItem?.event?.includes('_')) {
        [action, fireboltItem.event] = fireboltItem.event.split('_');
      }

      if (firstParty) {
        let params;
        const method = CONSTANTS.REQUEST_OVERRIDE_CALLS.CLEARLISTENER;
        const requestMap = {
          method: method,
          params: fireboltItem,
          action: action,
        };

        fireLog.info(
          'Call from 1st party App, method: ' + method + ' params: ' + JSON.stringify(params)
        );
        cy.sendMessagetoPlatforms(requestMap).then((result) => {
          fireLog.info('Response from Firebolt platform: ' + JSON.stringify(result));
        });
      } else {
        const appId = fireboltItem.appId
          ? fireboltItem.appId
          : Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID);
        const requestTopic = UTILS.getTopic(appId);
        const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);
        const params = { event: fireboltItem.event };
        const additionalParams = {
          communicationMode: UTILS.getCommunicationMode(),
          action: action,
        };
        const intentMessage = UTILS.createIntentMessage(
          CONSTANTS.TASK.CLEAREVENTHANDLER,
          params,
          additionalParams
        );

        // Sending message to 3rd party app.
        cy.sendMessagetoApp(requestTopic, responseTopic, intentMessage).then((result) => {
          fireLog.info(
            `Response from ${Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID)}: ${JSON.stringify(result)}`
          );
        });
      }
    });
  });
});

/**
 * @module fireboltCalls
 * @function And Fetch response for '(.+)' (method|event) from (3rd party app|1st party app)
 * @description Fetch the Method or Event response from the App
 * @param {String} key - key name of the data contains event/method name and parameter.
 * @param {String} methodOrEvent - Flag to differentiate between method or event
 * @param {String} app - Flag to differentiate between 3rd party/ 1st party app
 * @example
 * And Fetch response for 'pinChallenge onRequestChallenge' event from '1st party app'
 * And Fetch response for 'profile approvePurchase' method from '3rd party app'
 */

Given(
  /Fetch response for '(.+)' (method|event) from (3rd party app|1st party app)$/,
  async (key, methodOrEvent, app) => {
    cy.fireboltDataParser(key).then((parsedDataArr) => {
      parsedDataArr.forEach((parsedData) => {
        const method = parsedData.method;
        const param = parsedData.params;
        const context = parsedData.context;
        const action = parsedData.action;
        const expected = parsedData.expected;

        const appId = UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID);

        let params;
        if (app == CONSTANTS.FIRST_PARTY_APP) {
          const extractedEvent = UTILS.getEnvVariable(CONSTANTS.GLOBAL_EVENT_OBJECT_LIST).filter(
            (element) => element.eventName == method
          );
          eventName = extractedEvent[extractedEvent.length - 1].eventObjectId;
          const requestMap = {
            method: CONSTANTS.REQUEST_OVERRIDE_CALLS.FETCH_EVENT_RESPONSE,
            params: eventName,
          };
          cy.log(
            'Call from 1st party App, method: ' + method + ' params: ' + JSON.stringify(params)
          );
          // Sending message to first party app.
          cy.sendMessagetoPlatforms(requestMap).then((response) => {
            cy.log('Response from Firebolt platform: ' + JSON.stringify(response));
            if (response === CONSTANTS.RESPONSE_NOT_FOUND) {
              cy.log(CONSTANTS.NO_MATCHED_RESPONSE).then(() => {
                assert(false, CONSTANTS.NO_MATCHED_RESPONSE);
              });
            }
            // saving the correlationId of rpc-only methods
            if (Cypress.env(CONSTANTS.IS_RPC_ONLY)) {
              cy.log(`correlationId - ${response.result.correlationId}`);
              Cypress.env(CONSTANTS.CORRELATIONID, response.result.correlationId);
            }
          });
        } else if (app == CONSTANTS.THIRD_PARTY_APP) {
          params = { method: method };

          // Creating intent message using above details to send it to 3rd party app.
          const parsedIntent = UTILS.createIntentMessage(CONSTANTS.TASK.GETMETHODRESPONSE, params);
          // Fetching method response from third party app
          const requestTopic = UTILS.getTopic(appId);
          const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);

          // Sending message to 3rd party app.
          cy.sendMessagetoApp(requestTopic, responseTopic, parsedIntent).then((response) => {
            if (response === CONSTANTS.RESPONSE_NOT_FOUND) {
              cy.log(CONSTANTS.NO_MATCHED_RESPONSE).then(() => {
                assert(false, CONSTANTS.NO_MATCHED_RESPONSE);
              });
            }
            cy.log(`${method} response from ${appId}: ${JSON.stringify(response)}`);
            if (typeof response == 'string') {
              response = JSON.parse(response);
            }
            // create new api object to push to global list
            const apiAppObject = new apiObject(
              method,
              param,
              context,
              response.report,
              expected,
              appId
            );
            UTILS.getEnvVariable(CONSTANTS.GLOBAL_API_OBJECT_LIST).push(apiAppObject);
          });
        }
      });
    });
  }
);

/**
 * @function User triggers event with value as '(.+)'
 * @description sending message to platform to make post call to set event values.
 * @param {String} key - key name of the event data
 * @example
 * And User triggers event with value as 'onNetworkChanged events with wifi connected'
 */
Given(/User triggers event with value as '(.+)'/, (key) => {
  cy.fireboltDataParser(key).then((parsedData) => {
    const value = parsedData[0].params;
    const requestMap = {
      method: CONSTANTS.REQUEST_OVERRIDE_CALLS.TRIGGEREVENT,
      params: { value: value },
    };
    cy.log(CONSTANTS.SET_EVENT_REQUEST + JSON.stringify(requestMap)).then(() => {
      cy.sendMessagetoPlatforms(requestMap).then((result) => {
        if (result) {
          console.log(CONSTANTS.SET_EVENT_SUCCESS);
        }
      });
    });
  });
});

/**
 * @function device is rebooted
 * @description Reboot a device during test execution
 * @example
 * When device is rebooted
 */
Given('device is rebooted', () => {
  fireLog.info(CONSTANTS.STEP_DEFINITION_NEEDS_TO_IMPLEMENT).then(() => {
    throw new Error(CONSTANTS.STEP_IMPLEMENTATION_MISSING);
  });
});

/**
 * @module fireboltCalls
 * @function And 3rd party '(.+)' app is dismissed
 * @description To dismiss the launched app
 * @param {String} app - app name.
 * @example
 * And 3rd party 'firebolt' app is dismissed
 */
Given(
  /3rd party '(.+)' app(?: '(.+)')? is (dismissed|closed|unloaded)$/,
  async (appType, appId, action) => {
    appId = appId ? appId : Cypress.env(CONSTANTS.RUNTIME).appId;
    let KeyPressSequence;
    let loggedType;

    const test = Cypress.env(CONSTANTS.TEST_TYPE);
    const testLowerCase = test.toLowerCase();
    const scenarioType = Cypress.env(CONSTANTS.SCENARIO_TYPE);
    let scenarioTypeLowerCase;
    const externalModuleTestTypes = Cypress.env(CONSTANTS.EXTERNAL_MODULE_TESTTYPES);
    if (scenarioType != null) {
      scenarioTypeLowerCase = scenarioType.toLowerCase();
    }

    if (externalModuleTestTypes.includes(test)) {
      if (Cypress.env(CONSTANTS.SCENARIO_TYPE)) {
        // playback dismiss
        if (testLowerCase.includes(CONSTANTS.PLAYBACK)) {
          if (
            Cypress.env(CONSTANTS.APP_METADATA) &&
            Cypress.env(CONSTANTS.APP_METADATA).defaultKeyPressSequence &&
            Cypress.env(CONSTANTS.APP_METADATA).defaultKeyPressSequence.playbackDismiss
          ) {
            playbackDismiss = Cypress.env(CONSTANTS.APP_METADATA).defaultKeyPressSequence
              .playbackDismiss;
            if (playbackDismiss.loggedIn) {
              KeyPressSequence = playbackDismiss.loggedIn;
            } else if (playbackDismiss.loggedOut) {
              KeyPressSequence = playbackDismiss.loggedOut;
            }
          }
        } else {
          // other dismiss cases

          // check whether app is loggedIn or loggedOut
          if (scenarioTypeLowerCase.includes(CONSTANTS.LOGGEDIN.toLowerCase())) {
            loggedType = CONSTANTS.LOGGEDIN;
          } else if (scenarioTypeLowerCase.includes(CONSTANTS.LOGGEDOUT.toLowerCase())) {
            loggedType = CONSTANTS.LOGGEDOUT;
          }

          if (
            // Check if keyPressSequence is defined in the runtime environment variables for the specific intent
            !KeyPressSequence &&
            Cypress.env(CONSTANTS.RUNTIME) &&
            Cypress.env(CONSTANTS.RUNTIME).intent &&
            Cypress.env(CONSTANTS.RUNTIME).intent.keyPressSequence &&
            Cypress.env(CONSTANTS.RUNTIME).intent.keyPressSequence[loggedType]
          ) {
            KeyPressSequence = Cypress.env(CONSTANTS.RUNTIME).intent.keyPressSequence[loggedType];
          } else if (
            // Check if defaultKeyPressSequence is defined for the specific appId in app_metadata
            !KeyPressSequence &&
            Cypress.env(CONSTANTS.APP_METADATA) &&
            Cypress.env(CONSTANTS.APP_METADATA)[appId] &&
            Cypress.env(CONSTANTS.APP_METADATA)[appId].defaultKeyPressSequence &&
            Cypress.env(CONSTANTS.APP_METADATA)[appId].defaultKeyPressSequence[loggedType]
          ) {
            KeyPressSequence = Cypress.env(CONSTANTS.APP_METADATA)[appId].defaultKeyPressSequence[
              loggedType
            ];
          } else if (
            // Check if defaultKeyPressSequence is defined in the app_metadata globally
            !KeyPressSequence &&
            Cypress.env(CONSTANTS.APP_METADATA) &&
            Cypress.env(CONSTANTS.APP_METADATA).defaultKeyPressSequence &&
            Cypress.env(CONSTANTS.APP_METADATA).defaultKeyPressSequence.dismiss &&
            Cypress.env(CONSTANTS.APP_METADATA).defaultKeyPressSequence.dismiss[loggedType]
          ) {
            KeyPressSequence = Cypress.env(CONSTANTS.APP_METADATA).defaultKeyPressSequence.dismiss[
              loggedType
            ];
          } else {
            // If no keyPressSequence is found, throw an error with details from the app_metadata file
            const appMetadataJSON = require('../../fixtures/docs/app_metadata.json');
            throw new Error(
              `Expected KeyPressSequence was not found for ${appId} in app_metadata.json. More details on app_metadata present in: ${JSON.stringify(appMetadataJSON)}`
            );
          }
        }
      } else {
        // when test is Dimiss and scenarioType is not present
        fireLog.fail('Scenario type is not defined in the runtime environment variables');
      }
    }

    const params = {};
    let actionType;
    switch (action) {
      case 'dismissed':
        fireLog.info(`Dismissing the app using the keyPressSequence: ${KeyPressSequence.dismiss}`);
        params.keyPressSequence = KeyPressSequence.dismiss;
        actionType = 'dismissApp';
        break;
      case 'closed':
        params.appId = appId;
        actionType = 'closeApp';
        break;
      case 'unloaded':
        params.appId = appId;
        actionType = 'unloadApp';
        break;
      default:
        fireLog.error('Invalid action type');
        break;
    }
    cy.exitAppSession(actionType, params).then((response) => {
      fireLog.info(`Response from platform: ${JSON.stringify(response)}`);
    });
  }
);

/**
 * @module fireboltCalls
 * @function And 3rd party '(.+)' app should be exited
 * @description To validate that the app is dismissed
 * @param {String} app - app name.
 * @example
 * Then 3rd party 'firebolt' app should be exited
 */
Given(/3rd party '(.+)' app should be exited$/, async (app) => {
  // getAppState validation
  let validationObjectKey = Cypress.env(CONSTANTS.TEST_TYPE);
  validationObjectKey = validationObjectKey.replaceAll(' ', '_').toUpperCase();
  let validationObject;
  cy.getFireboltData(validationObjectKey).then((fireboltData) => {
    const type = fireboltData?.event ? CONSTANTS.EVENT : CONSTANTS.METHOD;
    validationObject = UTILS.resolveRecursiveValues(fireboltData);
    cy.methodOrEventResponseValidation(type, validationObject)
      .then((response) => {
        fireLog.info('State validation of app is completed');
      })
      .then(() => {
        // screenShot validation
        fireLog.info('Started Screenshot validation');
        const requestMapForScreenShotValidation = {
          method: CONSTANTS.REQUEST_OVERRIDE_CALLS.SCREENSHOT,
          params: {
            validations: validationObject.screenshot.validations,
          },
        };
        fireLog.info(
          `Sending request to get screenshot : ${JSON.stringify(requestMapForScreenShotValidation)}`
        );
        cy.sendMessagetoPlatforms(requestMapForScreenShotValidation).then((response) => {
          if (response && response != 'undefined') {
            fireLog.info('Screenshot Validation Response: ' + JSON.stringify(response));
            if (response.status != 'pass') {
              fireLog.info(`Screenshot validation failed ${JSON.stringify(response.validations)}`);
            }
          }
        });
      })
      .then(() => {
        cy.softAssertAll();
      });
  });
});
