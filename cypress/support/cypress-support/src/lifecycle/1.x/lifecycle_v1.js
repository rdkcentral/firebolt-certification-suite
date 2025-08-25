const lifecycleConfig = require('./lifecycleConfig.json');
const { LifeCycleAppConfigBase } = require('../LifeCycleAppConfigBase');
const CONSTANTS = require('../../../../constants/constants');
const UTILS = require('../../utils');

class notificationConfig {
  constructor(message) {
    this.time = Date.now();
    this.message = message;
  }
}

class stateConfig {
  constructor(state) {
    this.state = state;
    this.tStartTime = Date.now();
    this.notification = [];
  }

  setNotification(currentState, previousState) {
    const allowedStateTransitions = lifecycleConfig.allowedStateTransitions;
    console.log('Allowed State Transitions:', allowedStateTransitions);
    const stateTransition = allowedStateTransitions[previousState];

    // If currentState and previousState are not equal and allowed state transition supports currentState, generate an event and push to notification list
    if (stateTransition.includes(currentState) && currentState != previousState) {
      const message = { previous: previousState, state: currentState };
      console.log('Lifecycle appObject transition: ' + JSON.stringify(message));
      const tempNotification = new notificationConfig(message);
      this.notification.push(tempNotification);
    }
  }
}

class lifecycle_v1 extends LifeCycleAppConfigBase {
  constructor() {
    super();
  }

  /**
   * Validates lifecycle response schema.
   */
  lifecycleSchemaChecks(response, appId) {
    try {
      if (typeof response !== CONSTANTS.OBJECT) {
        response = JSON.parse(response);
      }

      const apiSchemaResult = {
        validationStatus: response[CONSTANTS.SCHEMA_VALIDATION_STATUS],
        validationResponse: response[CONSTANTS.SCHEMA_VALIDATION_RESPONSE],
      };

      cy.validationChecksForResponseAndSchemaResult(response, false, apiSchemaResult, false);
    } catch (err) {
      cy.log(CONSTANTS.LIFECYCLE_SCHEMA_VALIDATION_FAILED + err.message);
      assert(false, CONSTANTS.LIFECYCLE_SCHEMA_VALIDATION_FAILED + err.message);
    }
  }

  /**
   * Sets the app and app object lifecycle state and handles all necessary transitions and validations.
   */
  setAppState(state, appId) {
    this.fetchLifecycleHistory(appId);

    const currentAppState = this.getCurrentState() || { state: null };
    const setAppObjectState = (newState) => this.setAppObjectState(newState);

    const invokeLifecycleAndUpdateStateWithValidation = (api, params = '{}') => {
      return this.invokeLifecycleApi(appId, api, params).then((response) => {
        if (response) cy.log(CONSTANTS.APP_RESPONSE + JSON.stringify(response));
        setAppObjectState(state);
        this.lifecycleSchemaChecks(response, appId);
      });
    };

    try {
      switch (state) {
        case CONSTANTS.LIFECYCLE_STATES.FOREGROUND:
          if (currentAppState.state === CONSTANTS.LIFECYCLE_STATES.INITIALIZING) {
            setAppObjectState(CONSTANTS.LIFECYCLE_STATES.INACTIVE);
            invokeLifecycleAndUpdateStateWithValidation(CONSTANTS.LIFECYCLE_APIS.READY);
          } else if (
            ![
              CONSTANTS.LIFECYCLE_STATES.INITIALIZING,
              CONSTANTS.LIFECYCLE_STATES.FOREGROUND,
            ].includes(currentAppState.state)
          ) {
            cy.launchApp((appType = CONSTANTS.CERTIFICATION), appId);
            setAppObjectState(state);
          } else {
            setAppObjectState(state);
          }
          break;

        case CONSTANTS.LIFECYCLE_STATES.BACKGROUND:
          if (
            ![
              CONSTANTS.LIFECYCLE_STATES.BACKGROUND,
              CONSTANTS.LIFECYCLE_STATES.INITIALIZING,
            ].includes(currentAppState.state)
          ) {
            this.setLifecycleState(state, appId).then(() => setAppObjectState(state));
          }
          break;

        case CONSTANTS.LIFECYCLE_STATES.INACTIVE:
          if (currentAppState.state === CONSTANTS.LIFECYCLE_STATES.SUSPENDED) {
            invokeLifecycleAndUpdateStateWithValidation(CONSTANTS.LIFECYCLE_APIS.UNSUSPEND);
          } else {
            if (
              ![
                CONSTANTS.LIFECYCLE_STATES.FOREGROUND,
                CONSTANTS.LIFECYCLE_STATES.BACKGROUND,
              ].includes(currentAppState.state)
            ) {
              cy.setAppState(CONSTANTS.LIFECYCLE_STATES.FOREGROUND, appId);
            }
            this.setLifecycleState(state, appId).then(() => setAppObjectState(state));
          }
          break;

        case CONSTANTS.LIFECYCLE_STATES.SUSPENDED:
          if (currentAppState.state !== CONSTANTS.LIFECYCLE_STATES.SUSPENDED) {
            if (currentAppState.state !== CONSTANTS.LIFECYCLE_STATES.INACTIVE) {
              cy.setAppState(CONSTANTS.LIFECYCLE_STATES.INACTIVE, appId);
            }
            invokeLifecycleAndUpdateStateWithValidation(CONSTANTS.LIFECYCLE_APIS.SUSPEND, {});
          }
          break;

        case CONSTANTS.LIFECYCLE_STATES.UNLOADING:
          if (currentAppState.state !== CONSTANTS.LIFECYCLE_STATES.INACTIVE) {
            cy.setAppState(CONSTANTS.LIFECYCLE_STATES.INACTIVE, appId);
          }
          invokeLifecycleAndUpdateStateWithValidation(CONSTANTS.LIFECYCLE_APIS.CLOSE, {
            reason: CONSTANTS.ERROR,
          });
          break;

        case CONSTANTS.LIFECYCLE_STATES.UNLOADED:
        case CONSTANTS.LIFECYCLE_STATES.TERMINATED:
          if (
            [CONSTANTS.LIFECYCLE_STATES.INITIALIZING, CONSTANTS.NULL].includes(
              currentAppState.state
            )
          ) {
            cy.setAppState(CONSTANTS.LIFECYCLE_STATES.UNLOADING, appId);
            this.invokeLifecycleApi(appId, CONSTANTS.LIFECYCLE_APIS.FINISHED, {}).then(
              (response) => {
                if (response) cy.log(CONSTANTS.APP_RESPONSE + JSON.stringify(response));
                setAppObjectState(state);
              }
            );
          }
          break;

        default:
          cy.log(CONSTANTS.INVALID_LIFECYCLE_STATE + state);
          break;
      }
    } catch (err) {
      cy.log(CONSTANTS.LIFECYCLE_SET_STATE_FAILED + err.message);
      assert(false, CONSTANTS.LIFECYCLE_SET_STATE_FAILED + err.message);
    }
  }

  // Function to set a new state for the appObject following below rules:
  // Rule 1: Only allow a state transition if the new requested state is not the same as current state.
  // Rule 2: If the setAppObjectState is for initializing state and if history list is empty, initializing state will not be pushed to history
  // Rule 3: Check the look up table in appObjectConfigData for allowed state transitions before pushing to history
  // Rule 4: If setAppObjectState is called after initializing, push initializing state to history before the new requested state
  setAppObjectState(newState) {
    const currentState = this.state;
    this.state = new stateConfig(newState);
    this.visibilityState = Cypress.env(CONSTANTS.VISIBILITYSTATE)[newState];
    const stateTransition = lifecycleConfig.allowedStateTransitions[currentState.state];

    // If newState is initializing and app object history is empty, the state is not pushed to history
    if (newState == CONSTANTS.LIFECYCLE_STATES.INITIALIZING && this.history.length === 0) {
      console.log(
        'New appState ' +
          newState +
          ' not pushed to history. If history list is empty and app tries to transition to initializing state, the state will not be pushed to history',
        'setAppObjectState'
      );
    } else {
      // If newState and currentState are not equal and allowed state transition supports newState, perform below logic
      if (stateTransition.includes(newState) && currentState.state != newState) {
        this.state = new stateConfig(newState);
        // If currentState is initializing and app object history is empty, the state is then pushed to history
        if (
          currentState.state == CONSTANTS.LIFECYCLE_STATES.INITIALIZING &&
          this.history.length === 0
        ) {
          console.log('Current appState ' + currentState.state + ' pushed to history');
          this.history.push(currentState);
        }
        // Next push the new state object to app object history
        this.history.push(this.state);
        console.log('New appState pushed to history: ' + newState);
      }
      if (!stateTransition.includes(newState)) {
        cy.log('Requested state transition for application is not supported');
        this.state = currentState;
      }
    }

    // If app object history is not empty, set notification object using current and new states
    if (this.history.length > 1) {
      this.state.setNotification(newState, currentState.state);
    }
  }

  validateState(appId) {
    const currentState = this.getCurrentState().state;
    // Get validation requirements for the current scenario from the moduleReqId JSON
    const scenarioRequirement = UTILS.getEnvVariable(CONSTANTS.SCENARIO_REQUIREMENTS);

    // Fetching the requirement IDs for the "state" from the scenarioRequirement.
    const lifecycleStateRequirementId = scenarioRequirement.find((req) =>
      req.hasOwnProperty('state')
    );

    if (lifecycleStateRequirementId && lifecycleStateRequirementId.state) {
      // Send message to 3rd party app to invoke lifecycle API to get state response
      this.invokeLifecycleApi(appId, CONSTANTS.LIFECYCLE_STATE, '{}').then((response) => {
        try {
          const result = response[CONSTANTS.SCHEMA_VALIDATION_RESPONSE].instance ?? null;
          if (result == null) {
            cy.log(CONSTANTS.INVALID_LIFECYCLE_STATE_RESPONSE).then(() => {
              assert(false, CONSTANTS.INVALID_LIFECYCLE_STATE_RESPONSE);
            });
          }
          cy.log(CONSTANTS.APP_RESPONSE + JSON.stringify(response));
          // Perform schema and content validation of state response against appObject state
          let pretext =
            lifecycleStateRequirementId.state.id + CONSTANTS.STATE_SCHEMA_VALIDATION_REQ;
          if (response[CONSTANTS.SCHEMA_VALIDATION_STATUS] == CONSTANTS.PASS) {
            cy.log(pretext + ' : ' + CONSTANTS.PASS);
          } else {
            fireLog.assert(false, pretext + ' : ' + CONSTANTS.FAIL);
          }

          pretext = lifecycleStateRequirementId.state.id + CONSTANTS.STATE_CONTENT_VALIDATION_REQ;
          UTILS.assertWithRequirementLogs(
            pretext,
            response[CONSTANTS.SCHEMA_VALIDATION_RESPONSE].instance,
            currentState
          );
          this.validateVisibilityState(currentState);
        } catch (error) {
          cy.log(CONSTANTS.ERROR_LIFECYCLE_STATE_VALIDATION + error).then(() => {
            assert(false, CONSTANTS.ERROR_LIFECYCLE_STATE_VALIDATION + error);
          });
        }
      });
    } else {
      cy.log('Skipping lifecycle state validation');
    }
  }

  validateHistory(appId) {
    // Get validation requirements for the current scenario from the moduleReqId JSON
    const scenarioRequirement = UTILS.getEnvVariable(CONSTANTS.SCENARIO_REQUIREMENTS);

    // Fetching the requirement IDs for the "history" from the scenarioRequirement.
    const lifecycleHistoryRequirementId = scenarioRequirement.find((req) =>
      req.hasOwnProperty('history')
    );

    // Send message to 3rd party app to invoke lifecycle history API to get history response
    this.invokeLifecycleApi(appId, CONSTANTS.LIFECYCLE_STATE, '{}').then((response) => {
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
          let appObjectHistory = this.getHistory();
          appObjectHistory = appObjectHistory.map((historyItem) => historyItem.state);
          // Validate both history data with logs
          UTILS.assertWithRequirementLogs(pretext, appHistoryList, appObjectHistory, true);
        } else {
          // If app history value is empty, validate the empty history lists
          const appObjectHistory = this.getHistory();
          UTILS.assertWithRequirementLogs(pretext, appHistory, appObjectHistory, true);
        }
      } else {
        // Fail test if no valid history response received from 3rd party application
        assert(false, CONSTANTS.INVALID_HISTORY_RESPONSE);
      }
    });
  }

  // Initializes the app object state
  setupInitialState() {
    this.setAppObjectState(CONSTANTS.LIFECYCLE_STATES.INITIALIZING);
  }
  // performs required intermediate transitions (e.g. to FOREGROUND) before setting the app to the target state.
  lifecycleSetup(state, appId) {
    if (
      state !== CONSTANTS.LIFECYCLE_STATES.UNLOADED &&
      state !== CONSTANTS.LIFECYCLE_STATES.FOREGROUND &&
      state !== CONSTANTS.LIFECYCLE_STATES.UNLOADING
    ) {
      this.setAppState(CONSTANTS.LIFECYCLE_STATES.FOREGROUND, appId);
    }
    return this.setAppState(state, appId);
  }

  /**
   * Validates lifecycle event data.
   */
  
  validateEvents(state, appId, isEventsExpected) {
    const scenarioRequirement = UTILS.getEnvVariable(CONSTANTS.SCENARIO_REQUIREMENTS);
    const appObject = UTILS.getEnvVariable(appId);

    const lifecycleEventRequirementId = scenarioRequirement.find((req) =>
      req.hasOwnProperty(CONSTANTS.EVENT)
    );

    if (lifecycleEventRequirementId && lifecycleEventRequirementId.event) {
      return this.invokeLifecycleApi(appId, CONSTANTS.LIFECYCLE_APIS.HISTORY, '{}').then(
        (response) => {
          response = JSON.parse(response ?? '{}');

          if (
            response &&
            response.result &&
            response.result._history &&
            response.result._history._value
          ) {
            const appHistory = response.result._history._value;
            cy.log(CONSTANTS.LIFECYCLE_HISTORY_RESPONSE + JSON.stringify(appHistory));

            const appHistoryPrevious = UTILS.getEnvVariable(CONSTANTS.APP_LIFECYCLE_HISTORY);
            const appHistoryCount = appHistory.length - appHistoryPrevious.length;
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
                  const appObjectStateItem =
                    appObject.history[appObject.history.length - eventIndex];
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
            assert(false, CONSTANTS.INVALID_HISTORY_RESPONSE);
          }
        }
      );
    } else {
      cy.log(CONSTANTS.SKIP_LIFECYCLE_EVENT_VALIDATION);
      return cy.wrap(null);
    }
  }
}

export default lifecycle_v1;
