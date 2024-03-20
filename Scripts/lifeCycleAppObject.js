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
class notificationConfig {
  constructor(attempt, message) {
    this.attempt = attempt;
    this.time = Date.now();
    this.message = message;
  }
}

class stateConfig {
  constructor(state) {
    this.state = state;
    this.tStartTime = Date.now();
    this.attempt = 1;
    this.notification = [];
  }

  // Function to generate lifecycle events for state transitions
  // Only generate an event if the current state and new state satisfies the allowedStateTransitions look up table
  // TODO Optimization: Use allowedStateTransitions check from history logic to determine if events should be generated. Currently allowedStateTransitions is used in both places.
  setNotification(currentState, previousState) {
    cy.fixture(CONSTANTS.ALLOWED_STATE_TRANSITION_OBJECT_LOCATION).then((appObjectConfigData) => {
      const stateTransition = appObjectConfigData.allowedStateTransitions[previousState];
      if (stateTransition.includes(currentState) && currentState != previousState) {
        cy.log('New event pushed to notifications list', 'setNotification');
        const message = { state: currentState, previous: previousState };
        cy.log('Lifecycle appObject transition: ' + JSON.stringify(message), 'setNotification');
        const tempNotification = new notificationConfig(this.attempt, message);
        this.notification.push(tempNotification);
      } else {
        cy.log(
          !stateTransition.includes(currentState)
            ? 'No events pushed to notifications list. Requested state transition is not supported'
            : currentState === previousState
              ? 'No events pushed to notifications list as current and previous lifecycle states are same'
              : 'No events pushed to notifications list'
        );
      }
    });
  }
}

class appConfig {
  constructor(appId) {
    cy.log('constructor in appConfig class');
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

    // lifecycleAppObjectConfigData contains the look up table describing a list of possible states that the appObject can transition to from the current state
    cy.fixture(CONSTANTS.ALLOWED_STATE_TRANSITION_OBJECT_LOCATION).then((appObjectConfigData) => {
      const stateTransition = appObjectConfigData.allowedStateTransitions[currentState.state];
      if (newState == 'initializing' && this.history.length === 0) {
        cy.log(
          'New appState ' +
            newState +
            ' not pushed to history. If history list is empty and app tries to transition to initializing state, the state will not be pushed to history',
          'setAppObjectState'
        );
      } else {
        if (stateTransition.includes(newState) && currentState.state != newState) {
          if (currentState.state == 'initializing' && this.history.length === 0) {
            cy.log(
              'Current appState ' + currentState.state + ' pushed to history',
              'setAppObjectState'
            );
            this.history.push(currentState);
          }
          this.history.push(this.state);
          cy.log('New appState pushed to history: ' + newState, 'setAppObjectState');
        }
      }
      if (this.history.length > 1) {
        this.state.setNotification(newState, currentState.state);
      }
    });
  }

  getAppObjectState() {
    return this.state;
  }

  getAppId() {
    return this.appId;
  }

  getPrevAppObjectState() {
    const historyList = this.history;
    return historyList.length > 0 ? historyList[historyList.length - 1] : 'history list is empty';
  }

  getHistory() {
    return this.history;
  }

  setListeners() {
    cy.log('setListeners method in appConfig class', 'setListeners');
    // To be implemented. Dependent on LifecycleManagement APIs which show the current status of app states in device.
  }
  incrementAppStateAttempt() {
    return this.state.attempt++;
  }
}

export default appConfig;
