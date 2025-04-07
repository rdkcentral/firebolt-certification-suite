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
import { Given, When } from '@badeball/cypress-cucumber-preprocessor';
const CONSTANTS = require('../constants/constants');
import UTILS from '../cypress-support/src/utils';

/**
 * @function 3rd party {string} is launched with {string} appId and {string} state
 * @description Launch 3rd party app with additional classifier - firebolt certification app/ firebolt app and with optional parameters appId, application state
 * @param {String} appType - additional classifier for the app - Launch the certification app for certification validations. Launching a firebolt app for app certification
 * @param {String} appCallSign - The appId used to launch the app which is identified by the firebolt platform servicing the request
 * @param {String} state - lifecycle state of the application
 *  @example
 * And 3rd party 'certification' app is launched
 * And 3rd party 'firebolt' app is launched with 'foo' appId
 * And 3rd party 'certification' app is launched with 'foo' appId with 'foreground' state
 * And 3rd party 'certification' app is launched with 'foreground' state
 * And 3rd party 'certification' app is launched with 'NullIntent' intent
 * And 3rd party 'certification' app is launched with 'foo' appId with 'foreground' state with 'NullIntent' intent
 */
Given(
  /3rd party '(.+)' app is launched(?: with '(.+)' appId)?(?: with '(.+)' state)?(?: with '(.+)' intent)?$/,
  (appType, appCallSign, state, intent) => {
    Cypress.env(CONSTANTS.APP_TYPE, appType);
    Cypress.env(CONSTANTS.APP_LAUNCH_COUNT, Cypress.env(CONSTANTS.APP_LAUNCH_COUNT) || 0);
    if (
      Cypress.env(CONSTANTS.APP_LAUNCH_COUNT) == 0 &&
      (!UTILS.getEnvVariable(CONSTANTS.APP_LAUNCH_STATUS, false) ||
        UTILS.getEnvVariable(CONSTANTS.LIFECYCLE_CLOSE_TEST_TYPES).includes(
          UTILS.getEnvVariable(CONSTANTS.TEST_TYPE)
        ) ||
        UTILS.getEnvVariable(CONSTANTS.UNLOADING_APP_TEST_TYPES).includes(
          UTILS.getEnvVariable(CONSTANTS.TEST_TYPE)
        ))
    ) {
      if (!state) {
        state = CONSTANTS.LIFECYCLE_STATES.FOREGROUND;
      }
      cy.launchApp(appType, appCallSign, null, intent);
      cy.lifecycleSetup(appCallSign, state);
      Cypress.env(CONSTANTS.APP_LAUNCH_STATUS, true);
      // Incremental launch count for cold launch
      Cypress.env(CONSTANTS.APP_LAUNCH_COUNT, Cypress.env(CONSTANTS.APP_LAUNCH_COUNT) + 1);
    } else if (
      UTILS.getEnvVariable(CONSTANTS.APP_LAUNCH_STATUS, false) ||
      Cypress.env(CONSTANTS.APP_LAUNCH_COUNT) >= 1
    ) {
      if (!state) {
        state = CONSTANTS.LIFECYCLE_STATES.FOREGROUND;
      }
      Cypress.env(CONSTANTS.FB_INTERACTIONLOGS)?.logs.clear();
      cy.launchApp(appType, appCallSign, null, intent);
      cy.lifecycleSetup(appCallSign, state);
      // Incremental launch count for hot launch
      Cypress.env(CONSTANTS.APP_LAUNCH_COUNT, Cypress.env(CONSTANTS.APP_LAUNCH_COUNT) + 1);
    }
  }
);

/**
 * @function {string} transitions to state {string}
 * @description Set state of 3rd party app as well as state inside appObject to use as source of truth
 * @param {String} app - app type
 * @param {String} state - State to be set
 * @example
 *  When '3rd party app' transitions to state 'foreground'
 */
When('{string} transitions to state {string}', (app, state) => {
  cy.setAppIdFromAppType(app).then((appId) => {
    if (
      UTILS.getEnvVariable(CONSTANTS.TEST_TYPE).toLowerCase() == CONSTANTS.MODULE_NAMES.LIFECYCLE
    ) {
      cy.setAppState(state, appId).then(() => {
        // TODO: Checks for platform support
      });
    } else {
      cy.setLifecycleState(state, appId);
    }
  });
});

/**
 * @module launchapp
 * @function AppObject state is set for {string} to {string}
 * @description Set appObject state of 3rd party app explicitly for validating as source of truth
 * @param {String} app - App type
 * @param {String} state - State to be set in appObject
 * When AppObject state for '3rd party App' is set to 'foreground'
 */
When('AppObject state for {string} is set to {string}', (app, state) => {
  cy.setAppIdFromAppType(app).then((appId) => {
    const appObject = Cypress.env(appId);
    appObject.setAppObjectState(state);
    cy.log('Setting ' + appId + ' appObject state to ' + state);
  });
});

/**
 * @module launchapp
 * @function I send '([^']+)' voice command
 * @description Sends a voice command to the platform and validates the response.
 * @param {String} command - The voice command to be sent (e.g., "open settings").
 * When I send 'open settings' voice command
 */
Given(/I send '([^']+)' voice command/, (command) => {
  cy.sendVoiceCommand(command).then((result) => {
    if (result && result.success === true) {
      fireLog.assert(
        true,
        `Platform has successfully sent and processed the voice command: '${command}'`
      );
    } else {
      fireLog.assert(false, `Failed to send or process the voice command: '${command}'`);
    }
  });
});
