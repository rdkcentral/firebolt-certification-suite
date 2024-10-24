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
import UTILS, { fireLog } from '../cypress-support/src/utils';

/**
 * @module TestSetupGlue
 * @function the environment has been set up for {string} tests
 * @description Setup the environment for the test in question.
 * @param {String} test - log message
 * @example
 * Given the environment has been set up for 'Firebolt Sanity' tests
 */
Given('the environment has been set up for {string} tests', (test) => {
  if (
    UTILS.getEnvVariable(CONSTANTS.PENDING_FEATURES).includes(
      JSON.stringify(window.testState.gherkinDocument.feature.name)
    )
  ) {
    return 'pending';
  }
  if (
    !UTILS.getEnvVariable(CONSTANTS.ENV_SETUP_STATUS, false) ||
    UTILS.getEnvVariable(CONSTANTS.LIFECYCLE_CLOSE_TEST_TYPES).includes(test) ||
    UTILS.isTestTypeChanged(test)
  ) {
    Cypress.env(CONSTANTS.PREVIOUS_TEST_TYPE, Cypress.env(CONSTANTS.TEST_TYPE));
    Cypress.env(CONSTANTS.TEST_TYPE, test);
    if (test.toLowerCase() == CONSTANTS.MODULE_NAMES.LIFECYCLEAPI) {
      Cypress.env(CONSTANTS.LIFECYCLE_VALIDATION, true);
    }

    if (test == CONSTANTS.SETUPCHECK) {
      UTILS.getSetupDetails();
    }

    destroyAppInstance(test);
    Cypress.env(CONSTANTS.ENV_SETUP_STATUS, true);
    if (Cypress.env(CONSTANTS.TEST_TYPE).includes('rpc-Only')) {
      Cypress.env(CONSTANTS.IS_RPC_ONLY, true);
    }
    // fetch device details dynamically
    if (Cypress.env(CONSTANTS.FETCH_DEVICE_DETAILS_DYNAMICALLY_FLAG)) {
      if (CONSTANTS.DYNAMIC_DEVICE_DETAILS_MODULES.includes(Cypress.env(CONSTANTS.TEST_TYPE))) {
        cy.getDeviceData(CONSTANTS.DEVICE_ID, {}, CONSTANTS.ACTION_CORE.toLowerCase()).then(
          (response) => {
            if (response) {
              const method = CONSTANTS.REQUEST_OVERRIDE_CALLS.FETCHDEVICEDETAILS;
              const requestMap = {
                method: method,
                params: response,
              };
              cy.sendMessagetoPlatforms(requestMap);
            }
          }
        );
      }
    }
  }
  // Calling the envConfigSetup command to setup the environment for the test from the config module.
  cy.envConfigSetup();
});

/**
 * @module TestSetupGlue
 * @function destroyAppInstance
 * @description Function to close app instance during the test initialization stage
 * @param {String} testType - test name given during the test initialization stage
 * @example
 * destroyAppInstance('Parameters')
 */
function destroyAppInstance(testType) {
  const isAllowedTestType = UTILS.getEnvVariable(CONSTANTS.LIFECYCLE_CLOSE_TEST_TYPES).includes(
    testType
  );
  // Checking if the previous test type is different from the current test type.
  const isDifferentFromPrevious =
    UTILS.getEnvVariable(CONSTANTS.PREVIOUS_TEST_TYPE, false) != testType &&
    UTILS.getEnvVariable(CONSTANTS.PREVIOUS_TEST_TYPE, false) != undefined;

  if (isAllowedTestType || isDifferentFromPrevious) {
    const requestTopic = UTILS.getTopic();
    const responseTopic = UTILS.getTopic(null, CONSTANTS.SUBSCRIBE);

    // The test type is present in the unloading app test list, taking the reason as 'error'. This will unload the app.
    const closeReason = UTILS.getEnvVariable(CONSTANTS.UNLOADING_APP_TEST_TYPES).includes(testType)
      ? CONSTANTS.ERROR
      : CONSTANTS.USER_EXIT_REASON;

    const communicationMode = UTILS.getCommunicationMode();
    additionalParams = {
      communicationMode: communicationMode,
      action: 'Lifecycle.validation',
    };
    const params = {
      mode: 'Lifecycle.validation',
      methodName: 'Lifecycle.close',
      methodParams: { reason: closeReason },
    };
    const intentMessage = UTILS.createIntentMessage(
      CONSTANTS.TASK.RUNTEST,
      params,
      additionalParams
    );
    cy.log(
      'Sending lifecycle close intent to unload app, method: ' +
        params.methodName +
        ' params: ' +
        JSON.stringify(params.methodParams)
    );

    try {
      cy.sendMessagetoApp(requestTopic, responseTopic, intentMessage).then((response) => {
        let result;
        try {
          response = JSON.parse(response);
          result = response.report.result;
          fireLog.info(
            'Received response from app to acknowledge close request. Response: ' +
              JSON.stringify(response)
          );
        } catch {
          result = response;
        }
        if (result === CONSTANTS.NO_RESPONSE || result === null) {
          fireLog.info('App unloaded', 'destroyAppInstance');
        } else {
          fireLog.info(
            false,
            'App may have failed to unload. Response: ' + JSON.stringify(response)
          );
          fireLog.info('Falling back to platform implementation of force unload.');
          const requestMap = {
            method: CONSTANTS.REQUEST_OVERRIDE_CALLS.UNLOADAPP,
            params: UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID),
          };
          cy.sendMessagetoPlatforms(requestMap).then(() => {
            // Config modules needs override for validation of app unload
            fireLog.info('Platforms unload app execution complete');
          });
        }
        cy.wait(5000);
      });
    } catch (error) {
      fireLog.info('Failed to close the 3rd party app: ', error);
    }
  }
}

/**
 * @module TestSetupGlue
 * @function And Test runner waits for (.+) '(minutes|seconds)'
 * @description static wait time for given mins or secs
 * @param {String} time - time in ms or sec
 * @param {String} minuteOrSecond - specify minute or second
 * @example
 * Given Test runner waits for 5 'minutes'
 * Given Test runner waits for 2 'seconds'
 */
Given(/Test runner waits for (.+) '(minutes|seconds)'/, (time, minuteOrSecond) => {
  if (minuteOrSecond == 'minutes') {
    cy.wait(time * 60 * 1000);
  } else {
    cy.wait(time * 1000);
  }
});

/**
 * @module TestSetupGlue
 * @function Firebolt Certification Suite communicates successfully with the {String}
 * @description Setup the environment for the test in question.
 * @param {String} appType - The appType can be either 1st party app or 3rd party app
 * @example
 * And Firebolt Certification Suite communicates successfully with the '1st party app'
 * And Firebolt Certification Suite communicates successfully with the '3rd party app'
 */
Given(/Firebolt Certification Suite communicates successfully with the '(.+)'/, (appType) => {
  try {
    if (appType == CONSTANTS.FIRST_PARTY_APP) {
      const requestMap = {
        method: CONSTANTS.ACCOUNT_ID,
        params: {},
      };

      cy.log(
        `API call to ensure that the first party app connection is established successfully: ${JSON.stringify(requestMap)}`
      );
      cy.sendMessagetoPlatforms(requestMap).then((result) => {
        if (typeof result === 'string') {
          result = JSON.parse(result);
        }
        if (typeof result != CONSTANTS.TYPE_OBJECT) {
          result = JSON.parse(result);
          result = result.report;
        }
        if (result) {
          cy.log(`Firebolt Certification Suite successfully communicated with the ${appType}`);
        }
      });
    } else if (appType == CONSTANTS.THIRD_PARTY_APP) {
      const requestTopic = UTILS.getTopic();
      const responseTopic = UTILS.getTopic(null, CONSTANTS.SUBSCRIBE);

      // Launching third party app
      const requestMap = {
        method: CONSTANTS.DISCOVERY_LAUNCH,
        params: { appId: UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID) },
      };
      cy.log(`Launching ${appType}`);
      cy.sendMessagetoPlatforms(requestMap)
        .then(() => {
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
            expect(healthCheckResponse.status, '3rd party App Health check').to.be.oneOf([
              CONSTANTS.RESPONSE_STATUS.OK,
            ]);
            cy.log('3rd party App Launched Successfully');
          });
        })
        .then(() => {
          const communicationMode = UTILS.getCommunicationMode();
          const additionalParams = {
            communicationMode: communicationMode,
          };
          const params = { method: CONSTANTS.ACCOUNT_UID, methodParams: {} };

          // Creating intent message using above details to send it to 3rd party app.
          const intentMessage = UTILS.createIntentMessage(
            CONSTANTS.TASK.CALLMETHOD,
            params,
            additionalParams
          );

          cy.log(
            `API call to ensure that the 3rd party app connection is established successfully: ${JSON.stringify(params)}`
          );
          cy.sendMessagetoApp(requestTopic, responseTopic, intentMessage).then((result) => {
            if (result === CONSTANTS.NO_RESPONSE) {
              throw 'Response Not recieved';
            }
            result = JSON.parse(result);
            if (result && result.report) {
              cy.log(`Firebolt Certification Suite successfully communicated with the ${appType}`);
            }
          });
        });
    }
  } catch (error) {
    cy.log(`Firebolt Certification Suite failed to communicate with the ${appType}: ${error}`);
  }
});
