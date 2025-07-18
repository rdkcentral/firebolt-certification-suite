const lifecycleConfig = require('./lifecycleConfig.json');
const { LifeCycleAppConfigBase } = require('../LifeCycleAppConfigBase');
const logger = require('../../../../Logger')('lifecycle_v2.js');
const CONSTANTS = require('../../../../constants/constants');

class notificationConfig {
  constructor(message) {
    this.time = Date.now();
    this.message = message;
    this.fbEvents = [];
    this.thunderEvents = [];
  }
}

class stateConfig {
  static visibilityState = {
    initializing: 'hidden',
    paused: 'hidden',
    active: 'visible',
  };

  constructor(state) {
    this.state = state;
    this.tStartTime = Date.now();
    this.notification = [];
    this.visibilityState = stateConfig.visibilityState[state] || '';
  }

  setNotification(currentState, previousState, fbEvents, thunderEvents) {
    const allowedStateTransitions = lifecycleConfig.allowedStateTransitions;
    console.log('Allowed State Transitions:', allowedStateTransitions);
    const stateTransition = allowedStateTransitions[previousState];

    // If currentState and previousState are not equal and allowed state transition supports currentState, generate an event and push to notification list
    if (stateTransition.includes(currentState) && currentState != previousState) {
      const message = { previous: previousState, state: currentState };
      logger.info('Lifecycle appObject transition: ' + JSON.stringify(message));
      const tempNotification = new notificationConfig(message);
      if (Array.isArray(fbEvents) && fbEvents.length > 0) {
        tempNotification.fbEvents.push(...fbEvents);
      }

      if (Array.isArray(thunderEvents) && thunderEvents.length > 0) {
        tempNotification.thunderEvents.push(...thunderEvents);
      }
      this.notification.push(tempNotification);
    }
  }
}

export default class lifecycle_v2 extends LifeCycleAppConfigBase {
  constructor() {
    super();
  }
  /**
   * Sets the app and app object lifecycle state and handles all necessary transitions and validations.
   */
  setAppState(state, appId) {
    this.fetchLifecycleHistory(appId);
    const currentAppState = this.getCurrentState() || { state: null };
    const stateTransition = lifecycleConfig.allowedStateTransitions[currentAppState.state] || [];

    try {
      switch (state) {
        case CONSTANTS.LIFECYCLE_STATES.PAUSED:
        case CONSTANTS.LIFECYCLE_STATES.ACTIVE:
        case CONSTANTS.LIFECYCLE_STATES.SUSPENDED:
        case CONSTANTS.LIFECYCLE_STATES.INITIALIZING: {
          if (stateTransition.includes(state) && currentAppState.state !== state) {
            const fireboltEventMap =
              lifecycleConfig.expectedFireboltEvents?.[state.toLowerCase()] || {};
            const thunderEventMap =
              lifecycleConfig.expectedThunderEvents?.[state.toLowerCase()] || {};
            const fbEvents = fireboltEventMap?.[currentAppState.state] || [];
            const thunderEvents = thunderEventMap?.[currentAppState.state] || [];
            this.setLifecycleState(state, appId).then(() =>
              this.setAppObjectState(state, fbEvents, thunderEvents)
            );
          } else {
            cy.log(
              `Requested state transition from ${currentAppState.state} to ${state} is not supported`
            );
          }
          break;
        }

        case CONSTANTS.LIFECYCLE_STATES.HIBERNATED: {
          if (currentAppState.state === CONSTANTS.LIFECYCLE_STATES.PAUSED) {
            const fireboltEventMap =
              lifecycleConfig.expectedFireboltEvents?.[
                CONSTANTS.LIFECYCLE_STATES.SUSPENDED.toLowerCase()
              ] || {};
            const thunderEventMap =
              lifecycleConfig.expectedThunderEvents?.[
                CONSTANTS.LIFECYCLE_STATES.SUSPENDED.toLowerCase()
              ] || {};
            const fbEvents = fireboltEventMap?.[currentAppState.state] || [];
            const thunderEvents = thunderEventMap?.[currentAppState.state] || [];
            this.setLifecycleState(CONSTANTS.LIFECYCLE_STATES.SUSPENDED, appId)
              .then(() =>
                this.setAppObjectState(
                  CONSTANTS.LIFECYCLE_STATES.SUSPENDED,
                  fbEvents,
                  thunderEvents
                )
              )
              .then(() => this.setAppState(CONSTANTS.LIFECYCLE_STATES.HIBERNATED, appId));
          } else if (stateTransition.includes(state) && currentAppState.state !== state) {
            const fireboltEventMap =
              lifecycleConfig.expectedFireboltEvents?.[state.toLowerCase()] || {};
            const thunderEventMap =
              lifecycleConfig.expectedThunderEvents?.[state.toLowerCase()] || {};
            const fbEvents = fireboltEventMap?.[currentAppState.state] || [];
            const thunderEvents = thunderEventMap?.[currentAppState.state] || [];
            this.setLifecycleState(state, appId).then(() =>
              this.setAppObjectState(state, fbEvents, thunderEvents)
            );
          } else {
            cy.log(
              `Requested state transition from ${currentAppState.state} to ${state} is not supported`
            );
          }
          break;
        }
        case CONSTANTS.LIFECYCLE_STATES.UNLOADED:
          // TBD
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

  setAppObjectState(newState, fbEvents, thunderEvents) {
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
      this.state.setNotification(newState, currentState.state, fbEvents, thunderEvents);
    }
  }
  // Initializes the app object state
  setupInitialState() {
    this.setAppObjectState(CONSTANTS.LIFECYCLE_STATES.INITIALIZING);
    this.setAppObjectState(CONSTANTS.LIFECYCLE_STATES.PAUSED);
  }
  // performs required intermediate transitions (e.g. to ACTIVE) before setting the app to the target state.
  lifecycleSetup(state, appId) {
    if (state !== CONSTANTS.LIFECYCLE_STATES.ACTIVE) {
      this.setAppState(CONSTANTS.LIFECYCLE_STATES.ACTIVE, appId);
    }
    return this.setAppState(state, appId);
  }

 // Validate lifecycle firebolt and thunder events
validateEvents(isEventsExpected) {
  Cypress.env(CONSTANTS.IS_EVENTS_EXPECTED, isEventsExpected);
      cy.getFireboltData(CONSTANTS.LIFECYCLE_EVENT_VALIDATION).then((fireboltData) => {
        const type = fireboltData?.event ? CONSTANTS.EVENT : CONSTANTS.METHOD;
        const validationObject = UTILS.resolveRecursiveValues(fireboltData);
        cy.methodOrEventResponseValidation(type, validationObject).then((response) => {
          cy.softAssertAll();
        });
      });
}
}

