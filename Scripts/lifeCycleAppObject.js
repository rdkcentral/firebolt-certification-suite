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
const CONSTANTS = require('../cypress/support/constants/constants');
const logger = require('../cypress/support/Logger')('lifeCycleAppObject.js');
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

  // Function to generate lifecycle events for state transitions
  // Only generate an event if the current state and new state satisfies the allowedStateTransitions look up table
  // TODO Optimization: Use allowedStateTransitions check from history logic to determine if events should be generated. Currently allowedStateTransitions is used in both places.
  setNotification(currentState, previousState) {
    cy.fixture(CONSTANTS.STATE_TRANSITION_AND_VALIDATION_CONFIG_LOCATION).then(
      (appObjectConfigData) => {
        const stateTransition = appObjectConfigData.allowedStateTransitions[previousState];

        // If currentState and previousState are not equal and allowed state transition supports currentState, generate an event and push to notification list
        if (stateTransition.includes(currentState) && currentState != previousState) {
          const message = { state: currentState, previous: previousState };
          logger.info('Lifecycle appObject transition: ' + JSON.stringify(message));
          const tempNotification = new notificationConfig(message);
          this.notification.push(tempNotification);
        }
      }
    );
  }
}

class appConfig {
  constructor(appId) {
    this.appId = appId;
    this.state = {};
    this.history = [];
    this.additionalParams = undefined;
  }

  // Function to set a new state for the appObject following below rules:
  // Rule 1: Only allow a state transition if the new requested state is not the same as current state.
  // Rule 2: If the setAppObjectState is for initializing state and if history list is empty, initializing state will not be pushed to history
  // Rule 3: Check the look up table in appObjectConfigData for allowed state transitions before pushing to history
  // Rule 4: If setAppObjectState is called after initializing, push initializing state to history before the new requested state
  setAppObjectState(newState) {
    const currentState = this.state;
    this.state = new stateConfig(newState);
    Cypress.env(CONSTANTS.IS_SAME_APP_TRANSITION, false);

    // lifecycleAppObjectConfigData contains the look up table describing a list of possible states that the appObject can transition to from the current state
    cy.fixture(CONSTANTS.STATE_TRANSITION_AND_VALIDATION_CONFIG_LOCATION).then(
      (appObjectConfigData) => {
        const stateTransition = appObjectConfigData.allowedStateTransitions[currentState.state];

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
          if (currentState.state == newState) {
            Cypress.env(CONSTANTS.IS_SAME_APP_TRANSITION, true);
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
    );
  }

  getAppObjectState() {
    return this.state;
  }

  getAppId() {
    return this.appId;
  }

  getPrevAppObjectState() {
    const historyList = this.history;
    return historyList.length > 0
      ? historyList[historyList.length - 1].state
      : 'history list is empty';
  }

  getHistory() {
    return this.history;
  }

  setListeners() {
    // To be implemented. Dependent on LifecycleManagement APIs which show the current status of app states in device.
  }
}

export default appConfig;
