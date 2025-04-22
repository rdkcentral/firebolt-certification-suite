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
const internalIntentTemplates = require('../../fixtures/intentTemplates');
const externalIntentTemplates = require('../../fixtures/external/intentTemplates/index');
const { _ } = Cypress;

/**
 * @module TestSetupGlue
 * @function Given the environment has been set up for {string} tests
 * @description Sets up the environment for the specified test.
 * @param {String} test - The name of the test.
 * @param {String} scenarioType - The name of the scenario which is optional.
 * @example
 * Given the environment has been set up for 'Firebolt Sanity' tests
 * Given the environment has been set up for 'Firebolt Sanity' tests for 'sample scenario type'
 */
Given(
  /^the environment has been set up for '([^']+)' tests(?: (for|with) '([^']+)')?$/,

  async (test, type, scenarioType) => {
    const runtime = {};
    // Check if the test parameter is provided
    if (test) {
      let fireboltCallKey;
      // Check if the test parameter contains a colon to split into module and method
      if (test.includes(':')) {
        const [module, method] = test.split(':');
        fireboltCallKey = module.toUpperCase();
        Object.assign(runtime, { method, module });
      } else {
        // Replace spaces with underscores and convert to uppercase for the fireboltCallKey
        fireboltCallKey = test.replace(/\s+/g, '_').toUpperCase();
      }
      // Retrieve the firebolt object from the fireboltCalls fixture
      cy.getFireboltData(fireboltCallKey, CONSTANTS.SUPPORTED_CALLTYPES.FIREBOLTCALLS, false).then(
        (fireboltObject) => {
          if (fireboltObject) {
            // Save the object as env.runtime.fireboltCall
            const runtime = { fireboltCall: fireboltObject };
            Cypress.env(CONSTANTS.RUNTIME, runtime);
            fireLog.info(`Firebolt object successfully updated in runtime environment variable`);
          }
        }
      );
    }
    Cypress.env(CONSTANTS.PREVIOUS_TEST_TYPE, Cypress.env(CONSTANTS.TEST_TYPE));
    Cypress.env(CONSTANTS.TEST_TYPE, test);
    const externalModuleTestTypes = Cypress.env(CONSTANTS.EXTERNAL_MODULE_TESTTYPES);
    if (!scenarioType && externalModuleTestTypes && externalModuleTestTypes.includes(test)) {
      fireLog.info(`ScenarioType is not provided, defaulting to ${CONSTANTS.LOGGEDOUT}`);
      scenarioType = CONSTANTS.LOGGEDOUT;
    }
    Cypress.env(CONSTANTS.SCENARIO_TYPE, scenarioType);
    Cypress.env('detailed', false);

    if (
      UTILS.getEnvVariable(CONSTANTS.PENDING_FEATURES).includes(
        JSON.stringify(window.testState.gherkinDocument.feature.name)
      )
    ) {
      return 'pending';
    }

    // Calling the envConfigSetup command to setup the environment for the test from the config module.
    cy.envConfigSetup();

    if (
      !UTILS.getEnvVariable(CONSTANTS.ENV_SETUP_STATUS, false) ||
      UTILS.getEnvVariable(CONSTANTS.LIFECYCLE_CLOSE_TEST_TYPES).includes(test) ||
      UTILS.getEnvVariable(CONSTANTS.UNLOADING_APP_TEST_TYPES).includes(test)
    ) {
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
      // fetch device details dynamically and update run info
      try {
        if (Cypress.env(CONSTANTS.FETCH_DEVICE_DETAILS_DYNAMICALLY_FLAG)) {
          const dynamicModules = UTILS.getEnvVariable(CONSTANTS.DYNAMIC_DEVICE_DETAILS_MODULES);
          const testType = Cypress.env(CONSTANTS.TEST_TYPE);
          if (dynamicModules && dynamicModules.includes(testType)) {
            cy.getDeviceDataFromFirstPartyApp(
              CONSTANTS.DEVICE_ID,
              {},
              CONSTANTS.ACTION_CORE.toLowerCase()
            ).then((response) => {
              if (response) {
                const method = CONSTANTS.REQUEST_OVERRIDE_CALLS.FETCHDEVICEDETAILS;
                const requestMap = {
                  method: method,
                  params: response,
                };
                cy.sendMessagetoPlatforms(requestMap);
              }
            });
          }
        }
        cy.updateRunInfo();
      } catch (error) {
        cy.log(
          `Following error occurred while trying to fetch device details dynamically: ${error}`
        );
      }
    }
    // Check the marker creation status
    if (UTILS.getEnvVariable(CONSTANTS.PERFORMANCE_METRICS)) {
      const markerCreated = Cypress.env(CONSTANTS.MARKER_CREATION_STATUS);
      if (markerCreated) {
        fireLog.info('Marker has been created successfully');
      } else {
        fireLog.fail('Marker creation failed');
      }
    }

    const testLowerCase = test.toLowerCase();

    if (
      externalModuleTestTypes.some(
        (item) =>
          typeof item === 'string' && testLowerCase.toLowerCase().includes(item.toLowerCase())
      ) &&
      !Cypress.env(CONSTANTS.INTENT_TEMPLATES) &&
      !Cypress.env(CONSTANTS.APP_METADATA)
    ) {
      cy.fetchAppMetaData().then((appMetaData) => {
        Cypress.env(CONSTANTS.APP_METADATA, appMetaData);
        const combinedIntentTemplates = _.merge(internalIntentTemplates, externalIntentTemplates);
        Cypress.env(CONSTANTS.INTENT_TEMPLATES, combinedIntentTemplates);
      });
    }
    cy.softAssertAll();
  }
);

/**
 * @module TestSetupGlue
 * @function destroyAppInstance
 * @description Function to close app instance during the test initialization stage
 * @param {String} testType - test name given during the test initialization stage
 * @example
 * destroyAppInstance('Parameters')
 */
function destroyAppInstance(testType) {
  // Checking if the current test type is present in unloadAppTestTypes and/or closeAppTestTypes
  const isCloseTestType = UTILS.getEnvVariable(CONSTANTS.LIFECYCLE_CLOSE_TEST_TYPES).includes(
    testType
  );
  const isUnloadTestType = UTILS.getEnvVariable(CONSTANTS.UNLOADING_APP_TEST_TYPES).includes(
    testType
  );
  const appId = UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID);
  const params = {};
  params.appId = appId;

  // If the current test type is present inside the closeAppTestTypes array then close the app.
  if (isCloseTestType) {
    fireLog.info(
      'Closing app since either Test Type is specified in closeAppTestTypes or is different from previous Test Type.'
    );
    cy.exitAppSession('closeApp', params);
  }

  // If the current test type is present inside the unloadAppTestTypes array then unload the app.
  if (isUnloadTestType) {
    fireLog.info('Unloading app since Test Type is specified in unloadAppTestTypes.');
    cy.exitAppSession('unloadApp', params);
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
  const waitTime = Cypress.env('waitTime');
  if (waitTime) {
    time = parseInt(time) + waitTime;
  }
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
