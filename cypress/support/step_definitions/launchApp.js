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
import UTILS from '../cypress-support/src/utils';
const CONSTANTS = require('../constants/constants');

/**
 * @function 3rd party {string} is launched with {string} appId and {string} state
 * @description Launch 3rd party app with additional classifier - firebolt certification app/ firebolt app and with optional parameters appId, application state
 * @param {String} appType - additional classifier for the app - Launch the certification app for certification validations. Launching a firebolt app for app certification
 * @param {String} appCallSign - The appId used to launch the app which is identified by the firebolt platform servicing the request
 * @param {String} state - lifecycle state of the application
 *  @example
 * Given 3rd party 'certification' app is launched
 * Given 3rd party 'firebolt' app is launched with 'foo' appId
 * Given 3rd party 'certification' app is launched with 'foo' appId and with 'foreground' state
 */
Given(
  /3rd party '(.+)' app is launched(?: with(?: '(.+)' appId)?(?: and with(?: '(.+)' state)?)?)?$/,
  (appType, appCallSign, state) => {
    if (!state) {
      state = CONSTANTS.LIFECYCLE_STATES.FOREGROUND;
    }
    cy.launchApp(appType, appCallSign);
    cy.lifecycleSetup(appCallSign, state);
  }
);

/**
 * @function 3rd party app|1st party app|differentAppId)' is in'(.+)' state
 * @description move app to specified state
 * @param {String} app - app type
 * @param {String} state - state to be set in app
 * @example
 * Given '3rd party app' is in 'inactive' state
 * Given '1st party app' is in 'background' state
 * Given 'test.test.test' is in 'background' state
 */
Given(/'(3rd party app|1st party app)' is in '(.+)' state$/, (app, state) => {
  const appId =
    app === CONSTANTS.THIRD_PARTY_APP
      ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
      : app === CONSTANTS.FIRST_PARTY_APP
        ? UTILS.getEnvVariable(CONSTANTS.FIRST_PARTY_APPID)
        : app;
  cy.setLifecycleState(state, appId);
});

/**
 * @function {string} attempts to transition to app state {string}
 * @description Set state of 3rd party app as well as state inside appObject to use as source of truth
 * @param {String} app - app type
 * @param {String} state - State to be set
 * @example
 *  When '3rd party app' attempts to transition to app state 'foreground'
 */
When('{string} attempts to transition to app state {string}', (app, state) => {
  const appId =
    app === CONSTANTS.THIRD_PARTY_APP
      ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
      : app === CONSTANTS.FIRST_PARTY_APP
        ? UTILS.getEnvVariable(CONSTANTS.FIRST_PARTY_APPID)
        : app;
  cy.setAppState(state, appId).then(() => {
    // TODO: Checks for platform support
  });
});
