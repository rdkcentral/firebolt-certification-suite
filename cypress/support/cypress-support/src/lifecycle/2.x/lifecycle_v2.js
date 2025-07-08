const lifecycleConfig = require('./lifecycleConfig.json');
const { LifeCycleAppConfigBase } = require('../LifeCycleAppConfigBase');
const logger = require('../../../../Logger')('lifecycle_v2.js');
const CONSTANTS = require('../../../../constants/constants');

class notificationConfig {
  constructor(message) {
    this.message = message;
  }
}

class stateConfig {
  constructor(state) {
    this.state = state;
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

export default class lifecycle_v2 extends LifeCycleAppConfigBase {
  constructor() {
    super();
    this.visibilityStates = {
      initializing: 'hidden',
      paused: 'hidden',
      active: 'visible',
    };
  }
  setAppState() {
    // TODO: Implement V2 specific flow for setting app state
  }

  setAppObjectState(newState) {
    const currentState = this.state;
    this.state = new stateConfig(newState);
    this.visibilityState = this.visibilityStates[newState];
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

  validateState(appId) {
    // Note: The requirement ID is currently unused, but may be utilized in future updates.
    // Get validation requirements for the current scenario from the moduleReqId JSON
    const scenarioRequirement = UTILS.getEnvVariable(CONSTANTS.SCENARIO_REQUIREMENTS);
    // Fetching the requirement IDs for the "state" from the scenarioRequirement.
    const lifecycleStateRequirementId = scenarioRequirement.find((req) =>
      req.hasOwnProperty('state')
    );

    const currentState = this.getCurrentState().state;
    const requestMap = {
      method: CONSTANTS.REQUEST_OVERRIDE_CALLS.SETLIFECYCLESTATE,
      params: { appId: appId },
    };
    cy.sendMessagetoPlatforms(requestMap).then((response) => {
      try {
        const result = response?.state;
        fireLog.equal(result, currentState, 'Lifecycle state validation');

        this.validateVisibilityState(currentState);
      } catch (error) {
        cy.log(CONSTANTS.ERROR_LIFECYCLE_STATE_VALIDATION + error).then(() => {
          assert(false, CONSTANTS.ERROR_LIFECYCLE_STATE_VALIDATION + error);
        });
      }
    });
  }

  validateHistory(appId) {
    // Note: The requirement ID is currently unused, but may be utilized in future updates.
    // Get validation requirements for the current scenario from the moduleReqId JSON
    const scenarioRequirement = UTILS.getEnvVariable(CONSTANTS.SCENARIO_REQUIREMENTS);

    // Fetching the requirement IDs for the "history" from the scenarioRequirement.
    const lifecycleHistoryRequirementId = scenarioRequirement.find((req) =>
      req.hasOwnProperty('history')
    );

    // Send message to 3rd party app to invoke lifecycle history API to get history response
    cy.invokeLifecycleApi(appId, CONSTANTS.LIFECYCLE_APIS.HISTORY, '{}').then((response) => {
      // this.invokeLifecycleApi(appId, CONSTANTS.LIFECYCLE_STATE, '{}').then((response) => {
      // Perform a null check on history response and check if response has nested properties result, _history, _value
      response = JSON.parse(response ?? '{}');
      if (
        response &&
        response.result &&
        response.result._history &&
        response.result._history._value
      ) {
        const pretext = CONSTANTS.HISTORY_VALIDATION_REQ;
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
          fireLog.deepEqual(appHistoryList, appObjectHistory, pretext);
        } else {
          // If app history value is empty, validate the empty history lists
          const appObjectHistory = this.getHistory();
          fireLog.deepEqual(appHistory, appObjectHistory, pretext);
        }
      } else {
        // Fail test if no valid history response received from 3rd party application
        fireLog.fail(CONSTANTS.INVALID_HISTORY_RESPONSE);
      }
    });
  }
}
