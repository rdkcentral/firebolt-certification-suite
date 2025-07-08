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
import { createLifeCycleAppConfig } from '../cypress-support/src/lifecycle/lifecycleAppConfig';
const logger = require('../Logger')('lifecycle.js');

/**
 * @module lifecycle
 * @function lifecycleSetup
 * @description Set up lifecycleAppObject to be used as source of truth and application state for lifecycle tests
 * @param {String} appCallSign - The appId used to launch the app which is identified by the firebolt platform servicing the request
 * @param {String} state - Lifecycle state of the application
 * @example
 * cy.lifecycleSetup('foo', 'foreground')
 */
Cypress.Commands.add('lifecycleSetup', (appCallSign, state) => {
  const appId =
    appCallSign === undefined ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID) : appCallSign;

  if (Cypress.env(CONSTANTS.TEST_TYPE) === CONSTANTS.MODULE_NAMES.LIFECYCLE) {
    // create lifecycleAppObject to mimic all the state transition for an app and also go through the same state histories
    if (!Cypress.env(CONSTANTS.LIFECYCLE_APP_OBJECT_LIST).includes(appId)) {
      const lifeCycleAppObject = createLifeCycleAppConfig();
      // Initial setup logic for setting initial state(s) of app object
      lifeCycleAppObject.setupInitialState();
      Cypress.env(appId, lifeCycleAppObject);
      Cypress.env(CONSTANTS.LIFECYCLE_APP_OBJECT_LIST).push(appId);
    }

    if (state === CONSTANTS.LIFECYCLE_STATES.INITIALIZING) {
      Cypress.env(CONSTANTS.APP_LIFECYCLE_HISTORY, []);
    } else {
      const appObject = Cypress.env(appId);
      return appObject.lifecycleSetup(state, appId);
    }
  } else {
    // if not a lifecycle test, simply return
    return;
  }
});

/**
 * @module lifecycle
 * @function validateLifecycleState
 * @description To validate state of application by using appObject associated with corresponding appId as the source of truth.
 * The app state obtained by sending message to 3rd party app is validated agianst state of the appObject
 * @param {String} state - State to be used for validation
 * @param {String} appObject - The appId used to launch the app which is identified by the firebolt platform servicing the request
 * @example
 * cy.validateLifecycleState('foreground', 'foo')
 */
Cypress.Commands.add('validateLifecycleState', (state, appId) => {
  // Extract appObject based on appId
  const appObject = UTILS.getEnvVariable(appId);

  // Get validation requirements for the current scenario from the moduleReqId JSON
  const scenarioRequirement = UTILS.getEnvVariable(CONSTANTS.SCENARIO_REQUIREMENTS);

  // Fetching the requirement IDs for the "state" from the scenarioRequirement.
  const lifecycleStateRequirementId = scenarioRequirement.find((req) =>
    req.hasOwnProperty('state')
  );

  if (lifecycleStateRequirementId && lifecycleStateRequirementId.state) {
    // Send message to 3rd party app to invoke lifecycle API to get state response
    cy.invokeLifecycleApi(appId, CONSTANTS.LIFECYCLE_STATE, '{}').then((response) => {
      try {
        const result = response[CONSTANTS.SCHEMA_VALIDATION_RESPONSE].instance ?? null;
        if (result == null) {
          cy.log(CONSTANTS.INVALID_LIFECYCLE_STATE_RESPONSE).then(() => {
            assert(false, CONSTANTS.INVALID_LIFECYCLE_STATE_RESPONSE);
          });
        }
        cy.log(CONSTANTS.APP_RESPONSE + JSON.stringify(response));
        // Perform schema and content validation of state response against appObject state
        let pretext = lifecycleStateRequirementId.state.id + CONSTANTS.STATE_SCHEMA_VALIDATION_REQ;
        if (response[CONSTANTS.SCHEMA_VALIDATION_STATUS] == CONSTANTS.PASS) {
          cy.log(pretext + ' : ' + CONSTANTS.PASS);
        } else {
          fireLog.assert(false, pretext + ' : ' + CONSTANTS.FAIL);
        }

        pretext = lifecycleStateRequirementId.state.id + CONSTANTS.STATE_CONTENT_VALIDATION_REQ;
        UTILS.assertWithRequirementLogs(
          pretext,
          response[CONSTANTS.SCHEMA_VALIDATION_RESPONSE].instance,
          appObject.getCurrentState().state
        );
        validateVisibilityState(state);
      } catch (error) {
        cy.log(CONSTANTS.ERROR_LIFECYCLE_STATE_VALIDATION + error).then(() => {
          assert(false, CONSTANTS.ERROR_LIFECYCLE_STATE_VALIDATION + error);
        });
      }
    });
  } else {
    cy.log('Skipping lifecycle state validation');
  }
});

/**
 * @module lifecycle
 * @function setLifecycleState
 * @description Send message to platform to set 3rd party app to the specified lifecycle state
 * @param {String} state - State to be set in app
 * @param {String} appId - The appId used to launch the app which is identified by the firebolt platform servicing the request
 * @example
 * setLifecycleState('foreground', 'foo')
 */
Cypress.Commands.add('setLifecycleState', (state, appId) => {
  const appObject = Cypress.env(appId);
  appObject.setLifecycleState(state, appId);
});

/**
 * @module lifecycle
 * @function validateLifecycleHistoryAndEvents
 * @description To validate application history and events by using appObject associated with corresponding appId as the source of truth.
 * The app history and events obtained by sending message to 3rd party app is validated against corresponding data extracted from the appObject
 * @param {String} state - State to be used for validation
 * @param {String} appId - The appId used to launch the app which is identified by the firebolt platform servicing the request
 * @param {String} isEventsExpected - The boolean value to check if event is expected or not
 * @example
 * cy.validateLifecycleHistoryAndEvents('foreground', 'foo', true)
 */

Cypress.Commands.add('validateLifecycleHistoryAndEvents', (state, appId, isEventsExpected) => {
   const appObject = Cypress.env(appId);
   appObject.validateHistory(state, appId, isEventsExpected);
   appObject.validateEvents(state, appId, isEventsExpected);
});

/**
 * @module lifecycle
 * @function invokeLifecycleApi
 * @description Send message to 3rd party app to invoke lifecycle API
 * @param {String} appId - The appId used to launch the app which is identified by the firebolt platform servicing the request
 * @param {String} method - Method name
 * @param {String} methodParams - Method params if any
 * @example
 * invokeLifecycleApi('foo', 'lifecycle.ready','{}')
 * invokeLifecycleApi('foo', 'lifecycle.ready')
 */
Cypress.Commands.add('invokeLifecycleApi', (appId, method, methodParams = null) => {
  const appObject = Cypress.env(appId);
  return appObject.invokeLifecycleApi(appId, method, methodParams);
});

/**
 * @module lifecycle
 * @function setAppState
 * @description Set state of 3rd party app as well as state inside appObject to use as source of truth
 * @param {String} state - State to be set
 * @param {String} appId - The appId used to launch the app which is identified by the firebolt platform servicing the request
 * @example
 * cy.setAppState('foreground', 'foo')
 */
Cypress.Commands.add('setAppState', (state, appId) => {
  const appObject = Cypress.env(appId);
  appObject.setAppState(state, appId);
});

/**
 * @module  lifecycle
 * @function fetchLifecycleHistory
 * @description Fetch lifecycle history on demand for 3rd party app and store in environment variable if present, for lifecycle history validation
 * @param {String} appId - The appId used to launch the app which is identified by the firebolt platform servicing the request
 * @example
 * cy.fetchLifecycleHistory('foo')
 */
Cypress.Commands.add('fetchLifecycleHistory', (appId) => {
  const appObject = Cypress.env(appId);
  appObject.fetchLifecycleHistory(appId);
});

/**
 * @module  lifecycle
 * @function setAppIdFromAppType
 * @description Return appId value based on the app type passed
 * @param {String} appType - Type of app. ex: 3rd party app, 1st party app
 * @example
 * cy.setAppIdFromAppType('3rd party app')
 * cy.setAppIdFromAppType('1st party app')
 * cy.setAppIdFromAppType('testApp')
 */
Cypress.Commands.add('setAppIdFromAppType', (appType) => {
  return new Cypress.Promise((resolve, reject) => {
    const appId =
      appType === CONSTANTS.THIRD_PARTY_APP
        ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
        : appType === CONSTANTS.FIRST_PARTY_APP
          ? UTILS.getEnvVariable(CONSTANTS.FIRST_PARTY_APPID)
          : UTILS.checkForSecondaryAppId(appType);
    resolve(appId);
  });
});

/**
 * @module lifecycle
 * @function setAppObjectStateFromMethod
 * @description Set appObject state based on method and appId provided
 * @param {String} method - Method name wrt which appObject state needs to be set
 * @param {String} appId - The appId used to launch the app which is identified by the firebolt platform servicing the request
 * @example
 * cy.setAppObjectStateFromMethod('lifecycle.close','foo')
 */
Cypress.Commands.add('setAppObjectStateFromMethod', (method, appId) => {
  switch (method) {
    case CONSTANTS.LIFECYCLE_APIS.CLOSE.toLowerCase():
      const appObject = Cypress.env(appId);
      if (
        appObject.getCurrentState().state !== CONSTANTS.LIFECYCLE_STATES.UNLOADING &&
        appObject.getCurrentState().state !== CONSTANTS.LIFECYCLE_STATES.SUSPENDED &&
        appObject.getCurrentState().state !== CONSTANTS.LIFECYCLE_STATES.INITIALIZING
      ) {
        appObject.setAppObjectState(CONSTANTS.LIFECYCLE_STATES.INACTIVE);
      }
      break;
    // Support for other methods can be added in future if needed
    default:
      break;
  }
});
/**
 * @module lifecycle
 * @function lifecycleSchemaChecks
 * @description To Validate the status of lifecycle response and schema
 * @param {String} response - ApiResponse
 * @param {String} appId - The appId used to launch the app which is identified by the firebolt platform servicing the request
 * @example
 * cy.lifecycleSchemaChecks({"result":null,"error":null,"schemaResult":{"status":"PASS","schemaValidationResult":{"instance":null,"schema":{"const":null}}, 'foo');
 */
Cypress.Commands.add('lifecycleSchemaChecks', (response, appId) => {
  const appObject = Cypress.env(appId);
  appObject.lifecycleSchemaChecks(response, appId);
});

/**
 * @module commands
 * @function validateVisibilityState
 * @description To validate app visibility for different lifecycle states
 * @param {String} state - To check visibilityState of state
 * @example
 * validateVisibilityState('foreground');
 */
function validateVisibilityState(state) {
  // Fetching the visibilityState for the states from env.
  const visibilityState = Cypress.env(CONSTANTS.VISIBILITYSTATE);

  if (visibilityState != null && visibilityState.hasOwnProperty(state)) {
    // Get validation requirements for the current scenario from the moduleReqId JSON
    const scenarioRequirement = UTILS.getEnvVariable(CONSTANTS.SCENARIO_REQUIREMENTS);

    // Fetching the requirement IDs for the "visiblilityState" from the scenarioRequirement.
    const lifecycleStateRequirementId = scenarioRequirement.find((req) =>
      req.hasOwnProperty(CONSTANTS.VISIBLE_CHECK)
    );

    // checking for visibilityState value from env not be undefined or null.
    if (
      Cypress.env(CONSTANTS.VISIBILITYSTATE) != undefined ||
      Cypress.env(CONSTANTS.VISIBILITYSTATE) != null
    ) {
      // Creating intent message with visibilityState task to send it to 3rd party app.
      const intentMessage = UTILS.createIntentMessage(CONSTANTS.TASK.VISIBILITYSTATE, {
        params: CONSTANTS.VISIBILITYSTATE,
      });
      // Topic to publish message
      const requestTopic = UTILS.getTopic(null);
      // Topic to subscribe message
      const responseTopic = UTILS.getTopic(null, CONSTANTS.SUBSCRIBE);
      // Sending message to third party app
      cy.sendMessagetoApp(requestTopic, responseTopic, intentMessage).then((result) => {
        result = JSON.parse(result);

        // checking for response, if no response, fail the test
        if (result.report === CONSTANTS.RESPONSE_NOT_FOUND) {
          cy.log(CONSTANTS.NO_MATCHED_RESPONSE).then(() => {
            assert(false, CONSTANTS.NO_MATCHED_RESPONSE);
          });
        }
        // checking for response, if error, fail the test with error message
        else if (result.error) {
          assert(false, result.error.message);
        }
        const pretext = lifecycleStateRequirementId?.visible_check?.id
          ? lifecycleStateRequirementId.visible_check.id + CONSTANTS.VISIBILITYSTATE_VALIDATION_REQ
          : CONSTANTS.VISIBILITYSTATE_VALIDATION_REQ;
        // checking if actual value is different from the default value
        if (visibilityState[state] != result.report) {
          // log to print a reason for failure and how to fix it
          cy.log(
            pretext +
              ': Expected : ' +
              visibilityState[state] +
              ' , Actual : ' +
              result.report +
              CONSTANTS.VISIBILITYSTATE_FAILURE_FIX_LOG
          ).then(() => {
            assert.equal(
              visibilityState[state],
              result.report + CONSTANTS.VISIBILITYSTATE_FAILURE_LOG
            );
          });
        }
        cy.log(
          pretext + ': Expected : ' + visibilityState[state] + ' , Actual : ' + result.report
        ).then(() => {
          assert.equal(visibilityState[state], result.report, pretext);
        });
      });
    }
  } else {
    cy.log(CONSTANTS.LIFECYCLE_VISIBILITYSTATE_SKIP_MESSAGE);
  }
}
