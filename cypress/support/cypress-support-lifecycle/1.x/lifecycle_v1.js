const lifecycleConfig = require('./lifecycleConfig');
const { LifeCycleAppConfigBase } = require('../LifeCycleAppConfigBase');
const logger = require('../../Logger')('lifecycle_v1.js');
const CONSTANTS = require('../../constants/constants');

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
  setAppState() {
    // TODO: Implement V1 specific flow for setting app state
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
