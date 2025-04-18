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
import lifeCycleAppConfig from '../../../Scripts/lifeCycleAppObject.js';
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
    appCallSign == undefined ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID) : appCallSign;

  if (Cypress.env(CONSTANTS.TEST_TYPE) == CONSTANTS.MODULE_NAMES.LIFECYCLE) {
    // create lifecycleAppObject to mimic all the state transition for an app and also go through the same state histories
    if (!Cypress.env(CONSTANTS.LIFECYCLE_APP_OBJECT_LIST).includes(appId)) {
      const lifeCycleAppObject = new lifeCycleAppConfig(appId);
      // set the state to initialising
      lifeCycleAppObject.setAppObjectState(CONSTANTS.LIFECYCLE_STATES.INITIALIZING);
      // store the lifecycleAppObject in global object and push it to a global list
      Cypress.env(appId, lifeCycleAppObject);
      Cypress.env(CONSTANTS.LIFECYCLE_APP_OBJECT_LIST).push(appId);
    }

    if (state == CONSTANTS.LIFECYCLE_STATES.INITIALIZING) {
      Cypress.env(CONSTANTS.APP_LIFECYCLE_HISTORY, []);
    } else {
      if (
        state != CONSTANTS.LIFECYCLE_STATES.UNLOADED &&
        state != CONSTANTS.LIFECYCLE_STATES.FOREGROUND &&
        state != CONSTANTS.LIFECYCLE_STATES.UNLOADING
      ) {
        cy.setAppState(CONSTANTS.LIFECYCLE_STATES.FOREGROUND, appId);
      }
      return cy.setAppState(state, appId);
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
          appObject.getAppObjectState().state
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
  const requestMap = {
    method: CONSTANTS.REQUEST_OVERRIDE_CALLS.SETLIFECYCLESTATE,
    params: { state: state, appId: appId },
  };
  cy.log(CONSTANTS.SET_LIFECYCLE_STATE_REQUEST + JSON.stringify(requestMap)).then(() => {
    cy.sendMessagetoPlatforms(requestMap).then((result) => {
      if (result) {
        logger.info(CONSTANTS.SET_APP_STATE + state);
      }
    });
  });
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
  // Extract appObject based on appId
  const appObject = UTILS.getEnvVariable(appId);
  // Get validation requirements for the current scenario from the moduleReqId JSON
  const scenarioRequirement = UTILS.getEnvVariable(CONSTANTS.SCENARIO_REQUIREMENTS);

  // Fetching the requirement IDs for the "history" from the scenarioRequirement.
  const lifecycleHistoryRequirementId = scenarioRequirement.find((req) =>
    req.hasOwnProperty('history')
  );

  // Send message to 3rd party app to invoke lifecycle history API to get history response
  cy.invokeLifecycleApi(appId, CONSTANTS.LIFECYCLE_APIS.HISTORY, '{}').then((response) => {
    // Perform a null check on history response and check if response has nested properties result, _history, _value
    response = JSON.parse(response ?? '{}');
    if (
      response &&
      response.result &&
      response.result._history &&
      response.result._history._value
    ) {
      const pretext = CONSTANTS.HISTORY_VALIDATION_REQ + lifecycleHistoryRequirementId.history.id;
      cy.log(
        CONSTANTS.LIFECYCLE_HISTORY_RESPONSE + JSON.stringify(response.result._history._value)
      );
      // Extract app history value
      const appHistory = response.result._history._value;
      // Lifecycle history validation
      if (appHistory.length > 0) {
        // Construct an appHistoryList from app history data
        const appHistoryList = appHistory.map((historyItem) => historyItem.event.state);
        appHistoryList.splice(0, 0, appHistory[0].event.previous);
        // Construct an appObjectHistory list from app object history data
        let appObjectHistory = appObject.getHistory();
        appObjectHistory = appObjectHistory.map((historyItem) => historyItem.state);
        // Validate both history data with logs
        UTILS.assertWithRequirementLogs(pretext, appHistoryList, appObjectHistory, true);
      } else {
        // If app history value is empty, validate the empty history lists
        const appObjectHistory = appObject.getHistory();
        UTILS.assertWithRequirementLogs(pretext, appHistory, appObjectHistory, true);
      }

      // Fetching the requirement IDs for the "event" from the scenarioRequirement.
      const lifecycleEventRequirementId = scenarioRequirement.find((req) =>
        req.hasOwnProperty('event')
      );

      // Lifecycle event validation
      if (lifecycleEventRequirementId && lifecycleEventRequirementId.event) {
        const appHistoryPrevious = UTILS.getEnvVariable(CONSTANTS.APP_LIFECYCLE_HISTORY);
        const appHistoryCount = appHistory.length - appHistoryPrevious.length;
        let pretext;
        // If events are not expected and not received
        if (
          (isEventsExpected == false && appHistoryCount == 0) ||
          state == CONSTANTS.LIFECYCLE_STATES.INITIALIZING
        ) {
          cy.log(CONSTANTS.PLATFORM_NOT_TRIGGER_EVENT + ' : ' + CONSTANTS.PASS);

          // If events are not expected but received
        } else if (isEventsExpected == false && appHistoryCount > 0) {
          fireLog.assert(false, CONSTANTS.PLATFORM_NOT_TRIGGER_EVENT + ' : ' + CONSTANTS.FAIL);
        } else {
          // If events are expected and received
          if (isEventsExpected == true && appHistoryCount > 0) {
            cy.log(CONSTANTS.PLATFORM_TRIGGER_EVENT + ' : ' + CONSTANTS.PASS);

            // If events are expected and not received
          } else if (isEventsExpected == true && appHistoryCount == 0) {
            fireLog.assert(false, CONSTANTS.PLATFORM_TRIGGER_EVENT + ' : ' + CONSTANTS.FAIL);
          }
          const eventId = lifecycleEventRequirementId?.event?.id;
          for (let eventIndex = 1; eventIndex <= appHistoryCount; eventIndex++) {
            const newAppEvent = appHistory[appHistory.length - eventIndex];
            let appObjectEvent;
            if (eventIndex == 1) {
              appObjectEvent = appObject.state.notification[0];
            } else {
              const appObjectStateItem = appObject.history[appObject.history.length - eventIndex];
              appObjectEvent = appObjectStateItem.notification[0];
            }
            // Perform schema and content validation of app event data against app object event data
            const id = Array.isArray(eventId) ? eventId[eventIndex - 1] : eventId;
            let pretext = id === undefined ? ' : Schema ' : id + ' : Schema ';

            if (newAppEvent.schemaValidationStatus == CONSTANTS.PASS) {
              cy.log(pretext + ' : ' + CONSTANTS.PASS);
            } else {
              fireLog.assert(false, pretext + ' : ' + CONSTANTS.FAIL);
            }

            pretext = id === undefined ? ' : Content ' : id + ' : Content ';
            UTILS.assertWithRequirementLogs(
              pretext,
              JSON.stringify(newAppEvent.event),
              JSON.stringify(appObjectEvent.message)
            );
          }
        }
      } else {
        cy.log('Skipping lifecycle event validation');
      }
    } else {
      // Fail test if no valid history response received from 3rd party application
      assert(false, CONSTANTS.INVALID_HISTORY_RESPONSE);
    }
  });
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
  const requestTopic = UTILS.getTopic(appId);
  const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);
  params = {
    [CONSTANTS.METHOD_NAME]: method,
    [CONSTANTS.APP_TYPE]: [CONSTANTS.FIREBOLT],
  };
  if (methodParams) {
    params.methodParams = methodParams;
  }
  additionalParams = { [CONSTANTS.COMMUNICATION_MODE]: UTILS.getCommunicationMode() };
  publishMessage = UTILS.createIntentMessage(
    CONSTANTS.TASK.CALLLIFECYCLE,
    params,
    additionalParams
  );

  let publishMessageForLog;
  if (publishMessage && publishMessage.data && publishMessage.data.query) {
    publishMessageForLog = publishMessage.data.query;
    if (typeof publishMessageForLog == 'string') {
      publishMessageForLog = JSON.parse(publishMessageForLog);
    }
    if (publishMessageForLog.params.methodName == CONSTANTS.LIFECYCLE_APIS.HISTORY) {
      cy.log(CONSTANTS.LIFECYCLE_HISTORY_INTENT + JSON.stringify(publishMessage));
    } else {
      cy.log(CONSTANTS.LIFECYCLE_INTENT + JSON.stringify(publishMessage));
    }
  }
  cy.sendMessagetoApp(requestTopic, responseTopic, publishMessage).then((response) => {
    try {
      errorObject = JSON.parse(response).error;
    } catch (error) {
      cy.log(CONSTANTS.FAILED_TO_PARSE_LIEFECYCLE_ERROR + response).then(() => {
        assert(false, CONSTANTS.FAILED_TO_PARSE_LIEFECYCLE_ERROR + response);
      });
      return false;
    }
    if (errorObject) {
      UTILS.assertWithRequirementLogs(
        CONSTANTS.FAILED_TO_SET_LIFECYCLE_STATE,
        null,
        null,
        null,
        errorObject
      );
      return false;
    }
    if (CONSTANTS.LIFECYCLE_METHOD_LIST.includes(method)) {
      cy.updateResponseForFCS(method, '', JSON.parse(response)).then((updatedResponse) => {
        return updatedResponse;
      });
    }
  });
});

/**
 * @module lifecycle
 * @function setAppState
 * @description Set state of 3rd party app as well as state inside appObject to use as source of truth
 * @param {String} state - State to be set
 * @param {Object} appId - The appId used to launch the app which is identified by the firebolt platform servicing the request
 * @example
 * cy.setAppState('foreground', 'foo')
 */
Cypress.Commands.add('setAppState', (state, appId) => {
  // Get the app object corresponding to the appID
  const appObject = Cypress.env(appId);

  // Fetch app history and store in environment variable
  cy.fetchLifecycleHistory(appId);

  // Get current application state
  const currentAppState = appObject.getAppObjectState() || {};
  if (currentAppState == {}) {
    currentAppState.state = null;
  }

  // Set app and app object state
  switch (state) {
    // Set state to foreground
    case CONSTANTS.LIFECYCLE_STATES.FOREGROUND:
      // TODO: Checks for platform support
      // If current app state is initialising, send lifecycle.ready API call to 3rd party app to bring app to foreground
      if (currentAppState.state == CONSTANTS.LIFECYCLE_STATES.INITIALIZING) {
        appObject.setAppObjectState(CONSTANTS.LIFECYCLE_STATES.INACTIVE);
        cy.invokeLifecycleApi(appId, CONSTANTS.LIFECYCLE_APIS.READY, '{}').then((response) => {
          if (response) {
            cy.log(CONSTANTS.APP_RESPONSE + JSON.stringify(response));
          }
          appObject.setAppObjectState(state);
          cy.lifecycleSchemaChecks(response, state);
          // TODO: Checks for platform support
        });
      } else if (
        // Else, send a discovery.launch call to platform to bring app to foreground
        currentAppState.state != CONSTANTS.LIFECYCLE_STATES.INITIALIZING &&
        currentAppState.state != CONSTANTS.LIFECYCLE_STATES.FOREGROUND
      ) {
        cy.launchApp((appType = CONSTANTS.CERTIFICATION), appId);
        appObject.setAppObjectState(state);
      } else {
        appObject.setAppObjectState(state);
      }
      break;

    // Set state to background
    case CONSTANTS.LIFECYCLE_STATES.BACKGROUND:
      // TODO: Checks for platform support
      if (
        currentAppState.state != CONSTANTS.LIFECYCLE_STATES.BACKGROUND &&
        currentAppState.state != CONSTANTS.LIFECYCLE_STATES.INITIALIZING
      ) {
        // If current app state is not background, send message to platform to set app state to background
        cy.setLifecycleState(state, appId).then(() => {
          appObject.setAppObjectState(state);
        });
      }
      break;

    // Set state to inactive
    case CONSTANTS.LIFECYCLE_STATES.INACTIVE:
      // If current app state is suspended, send lifecycle.unsuspend API call to 3rd party app
      if (currentAppState.state == CONSTANTS.LIFECYCLE_STATES.SUSPENDED) {
        // TODO: Checks for platform support
        cy.invokeLifecycleApi(appId, CONSTANTS.LIFECYCLE_APIS.UNSUSPEND, '{}').then((response) => {
          if (response) {
            cy.log(CONSTANTS.APP_RESPONSE + JSON.stringify(response));
          }
          appObject.setAppObjectState(state);
          cy.lifecycleSchemaChecks(response, state);
          // TODO: Checks for platform support
        });
      } else {
        // Else if current app state is not foreground/background, set app state to foreground first to comply with allowed transitions
        if (
          currentAppState.state != CONSTANTS.LIFECYCLE_STATES.FOREGROUND &&
          currentAppState.state != CONSTANTS.LIFECYCLE_STATES.BACKGROUND
        ) {
          cy.setAppState(CONSTANTS.LIFECYCLE_STATES.FOREGROUND, appId);
        }
        // Finally, send message to platform to set app state to inactive
        cy.setLifecycleState(state, appId).then(() => {
          appObject.setAppObjectState(state);
        });
      }
      break;

    // Set state to suspended
    case CONSTANTS.LIFECYCLE_STATES.SUSPENDED:
      // If current app state is not suspended or inactive,  set app state to inactive first to comply with allowed transitions
      if (currentAppState.state != CONSTANTS.LIFECYCLE_STATES.SUSPENDED) {
        if (currentAppState.state != CONSTANTS.LIFECYCLE_STATES.INACTIVE) {
          cy.setAppState(CONSTANTS.LIFECYCLE_STATES.INACTIVE, appId);
        }
        // Send lifecycle.suspend API call to 3rd party app
        cy.invokeLifecycleApi(appId, CONSTANTS.LIFECYCLE_APIS.SUSPEND, {}).then((response) => {
          if (response) {
            cy.log(CONSTANTS.APP_RESPONSE + JSON.stringify(response));
          }
          appObject.setAppObjectState(state);
          cy.lifecycleSchemaChecks(response, state);
          // TODO: Checks for platform support
        });
      }
      break;

    // Set state to unloading
    case CONSTANTS.LIFECYCLE_STATES.UNLOADING:
      // If current app state is initializing or null,  set app state to inactive first
      if (currentAppState.state !== CONSTANTS.LIFECYCLE_STATES.INACTIVE) {
        cy.setAppState(CONSTANTS.LIFECYCLE_STATES.INACTIVE, appId);
      }
      // Send lifecycle.close API call to 3rd party app
      cy.invokeLifecycleApi(appId, CONSTANTS.LIFECYCLE_APIS.CLOSE, {
        reason: CONSTANTS.ERROR,
      }).then((response) => {
        if (response) {
          cy.log(CONSTANTS.APP_RESPONSE + JSON.stringify(response));
        }
        appObject.setAppObjectState(state);
        cy.lifecycleSchemaChecks(response, state);
        // TODO: Checks for platform support
        // cy.fireBoltApi(LifecycleManagement.unload())
      });
      break;

    // Set state to unloaded/terminated
    case CONSTANTS.LIFECYCLE_STATES.UNLOADED:
    case CONSTANTS.LIFECYCLE_STATES.TERMINATED:
      // If current app state is initializing or null,  set app state to unloading first
      if (
        currentAppState.state == CONSTANTS.LIFECYCLE_STATES.INITIALIZING ||
        currentAppState.state == CONSTANTS.NULL
      ) {
        cy.setAppState(CONSTANTS.LIFECYCLE_STATES.UNLOADING, appId);
        // Send lifecycle.finished API call to 3rd party app
        cy.invokeLifecycleApi(appId, CONSTANTS.LIFECYCLE_APIS.FINISHED, {}).then((response) => {
          if (response) {
            cy.log(CONSTANTS.APP_RESPONSE + JSON.stringify(response));
          }
          appObject.setAppObjectState(state);
        });
      }
      break;

    default:
      break;
  }
});

/**
 * @module  lifecycle
 * @function fetchLifecycleHistory
 * @description Fetch lifecycle history on demand for 3rd party app and store in environment variable if present, for lifecycle history validation
 * @param {String} appObject - appObject in environment
 * @example
 * cy.fetchLifecycleHistory('foo')
 */
Cypress.Commands.add('fetchLifecycleHistory', (appId) => {
  try {
    cy.invokeLifecycleApi(appId, CONSTANTS.LIFECYCLE_APIS.HISTORY, '{}').then((response) => {
      const historyValue = _.get(JSON.parse(response), 'result._history._value', null);
      _.isEmpty(historyValue)
        ? logger.info(CONSTANTS.APP_HISTORY_EMPTY)
        : Cypress.env(CONSTANTS.APP_LIFECYCLE_HISTORY, historyValue);
      cy.log(CONSTANTS.LIFECYCLE_HISTORY_RESPONSE + JSON.stringify(historyValue));
    });
  } catch (error) {
    assert(false, CONSTANTS.LIFECYCLE_HISTORY_FAILED + error);
  }
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
        appObject.getAppObjectState().state !== CONSTANTS.LIFECYCLE_STATES.UNLOADING &&
        appObject.getAppObjectState().state !== CONSTANTS.LIFECYCLE_STATES.SUSPENDED &&
        appObject.getAppObjectState().state !== CONSTANTS.LIFECYCLE_STATES.INITIALIZING
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
 * @description To Validate the status of response and schema
 * @param {String} response - ApiResponse
 * @param {String} state - State to be set
 * @example
 * cy.lifecycleSchemaChecks({"result":null,"error":null,"schemaResult":{"status":"PASS","schemaValidationResult":{"instance":null,"schema":{"const":null}}, 'foreground');
 */
Cypress.Commands.add('lifecycleSchemaChecks', (response, state) => {
  typeof response == 'object' ? response : (response = JSON.parse(response));
  apiSchemaResult = {
    validationStatus: response[CONSTANTS.SCHEMA_VALIDATION_STATUS],
    validationResponse: response[CONSTANTS.SCHEMA_VALIDATION_RESPONSE],
  };
  cy.validationChecksForResponseAndSchemaResult(response, false, apiSchemaResult, false);
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
