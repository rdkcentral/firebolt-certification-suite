const lifecycleConfig = require('./lifecycleConfig.json');
const { LifeCycleAppConfigBase } = require('../LifeCycleAppConfigBase');
const logger = require('../../../../Logger')('lifecycle_v1.js');
const CONSTANTS = require('../../../../constants/constants');

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
      logger.info('Lifecycle appObject transition: ' + JSON.stringify(message));
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
    const stateTransition = lifecycleConfig.allowedStateTransitions[currentState.state];

    // If newState is initializing and app object history is empty, the state is not pushed to history
    if (newState == CONSTANTS.LIFECYCLE_STATES.INITIALIZING && this.history.length === 0) {
      logger.info(
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
          logger.info('Current appState ' + currentState.state + ' pushed to history');
          this.history.push(currentState);
        }
        // Next push the new state object to app object history
        this.history.push(this.state);
        logger.info('New appState pushed to history: ' + newState);
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
}

export default lifecycle_v1;
