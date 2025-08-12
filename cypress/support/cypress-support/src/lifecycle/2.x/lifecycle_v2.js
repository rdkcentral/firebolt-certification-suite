const lifecycleConfig = require('./lifecycleConfig.json');
const { LifeCycleAppConfigBase } = require('../LifeCycleAppConfigBase');
const CONSTANTS = require('../../../../constants/constants');
const UTILS = require('../../../src/utils');

class notificationConfig {
  constructor(message) {
    this.time = Date.now();
    this.message = message;
    this.fbEvents = [];
    this.thunderEvents = [];
  }
}

class stateConfig {
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
      console.log('Lifecycle appObject transition: ' + JSON.stringify(message));
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
    this.visibilityStates = {
      initializing: 'hidden',
      paused: 'hidden',
      active: 'visible',
    };
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
    this.visibilityState = this.visibilityStates[newState];
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

  // Validate lifecycle state
  validateState(appId) {
    const scenarioRequirement = UTILS.getEnvVariable(CONSTANTS.SCENARIO_REQUIREMENTS);
    const lifecycleStateRequirementId = scenarioRequirement.find((req) =>
      req.hasOwnProperty('state')
    );

    const currentState = this.getCurrentState().state;

    const requestMaps = [
      {
        method: CONSTANTS.REQUEST_OVERRIDE_CALLS.GET_LIFECYCLEV2_STATE,
        params: { appId: appId },
      },
    ];

    if (UTILS.shouldPerformValidation('validationTypes', 'lifecyelThunderStateValidation')) {
      requestMaps.push({
        method: CONSTANTS.REQUEST_OVERRIDE_CALLS.THUNDEREVENTHANDLER,
        params: {},
        task: CONSTANTS.TASK.THUNDEREVENTHANDLER,
      });
    }

    const responses = [];

    let chain = Promise.resolve();

    requestMaps.forEach((requestMap) => {
      chain = chain
        .then(() => cy.sendMessagetoPlatforms(requestMap))
        .then((response) => {
          responses.push({ method: requestMap.method, response });
        });
    });

    return chain.then(() => {
      try {
        responses.forEach(({ method, response }) => {
          if (method === CONSTANTS.REQUEST_OVERRIDE_CALLS.GET_LIFECYCLEV2_STATE) {
            const result = response?.state;
            fireLog.equal(result, currentState, 'Lifecycle state validation');
            this.validateVisibilityState(currentState);
          } else if (method === CONSTANTS.REQUEST_OVERRIDE_CALLS.THUNDEREVENTHANDLER) {
            const events = response || {};

            // Collect all event logs from all top-level keys that have a "result" array after parsing
            const allEventLogs = Object.values(events)
              .map((jsonStr) => {
                try {
                  const parsed = JSON.parse(jsonStr);

                  if ('error' in parsed) {
                    throw new Error(
                      `Received error inside trigger event response for thunder state validation: ${JSON.stringify(parsed.error)}`
                    );
                  }

                  return Array.isArray(parsed.result) ? parsed.result : [];
                } catch (error) {
                  throw new Error(
                    `Received following error while parsing triggered event response  for thunder state validation - ${error.message}`
                  );
                }
              })
              .flat();

            // Find the last occurrence of the onAppLifecycleStateChanged event
            const latestThunderEvent = [...allEventLogs].reverse().find((log) => {
              return log.eventResponse?.method === 'onAppLifecycleStateChanged';
            });
            // Get the latest triggered event resposne of onAppLifecycleStateChanged event

            const triggerEventResponse = latestThunderEvent?.eventResponse?.params;

            if (triggerEventResponse) {
              const thunderState = triggerEventResponse.newLifecycleState;

              fireLog.equal(thunderState, currentState, `Thunder state validation`);

              this.validateVisibilityState(currentState);
            } else {
              fireLog.fail(
                `No valid onAppLifecycleStateChanged event response found in ThunderEventHandler response`
              );
            }
          }
        });
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
    this.invokeLifecycleApi(appId, CONSTANTS.LIFECYCLE_STATE, '{}').then((response) => {
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