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
import { Given } from '@badeball/cypress-cucumber-preprocessor';
const CONSTANTS = require('../constants/constants');
const _ = require('lodash');
import UTILS from '../cypress-support/src/utils';
/**
 * @module providerCalls
 * @function Framework registers '(.+)' test provider
 * @description Informs the platform to use the test provider for simulating user inputs. This would require platform specific implementation in each configModule
 * @param {String} param - Provider name that needs to register for
 * Framework registers 'pinChallenge' test provider
 * Framework registers 'keyboard' test provider
 */
Given(/Framework registers '(.+)' test provider$/, async (provider) => {
  const requestMap = {
    method: CONSTANTS.REQUEST_OVERRIDE_CALLS.SETTESTPROVIDER,
    params: provider,
  };
  // Sending message to the platform to register the provider.
  cy.sendMessagetoPlatforms(requestMap).then((result) => {
    cy.log('Provider registration response: ' + JSON.stringify(result));
  });
});

/**
 * @module providerCalls
 * @function Given User '(.+)' recording lifecycle history for '(.+)'
 * @description Sending a message to the platform/app to start/stop recording lifecycle histories.
 * @param {String} recordTaskType - A record type that contains either start or stop.
 * @param {String} appCallSign - appCallSign to determine on which app to start/stop recording.
 * And User 'starts' recording lifecycle history for '1st party app'
 * And User 'starts' recording lifecycle history for '3rd party app'
 */
Given(
  /User '(.+)' recording lifecycle history for '(.+)'$/,
  async (recordTaskType, appCallSign) => {
    const lifecycleHistoryRecordType =
      recordTaskType == CONSTANTS.RECORD_TASK_TYPE_START
        ? CONSTANTS.TASK.STARTLIFECYCLERECORDING
        : CONSTANTS.TASK.STOPLIFECYCLERECORDING;
    let envKey;
    cy.fixture(CONSTANTS.LIFECYCLE_HISTORY_SCHEMA_PATH).then((schema) => {
      if (appCallSign === CONSTANTS.FIRST_PARTY_APP) {
        // Constructing envirnoment variable name with appId
        envKey =
          UTILS.getEnvVariable(CONSTANTS.FIRST_PARTY_APPID) + CONSTANTS.APP_LIFECYCLE_HISTORY;
        const method = CONSTANTS.REQUEST_OVERRIDE_CALLS.RECORD_LIFECYCLE_HISTORY;
        const requestMap = {
          method: method,
          params: {
            task: lifecycleHistoryRecordType,
            appId: UTILS.getEnvVariable(CONSTANTS.FIRST_PARTY_APPID),
          },
        };

        cy.log(
          `Call to 1st party App to ${recordTaskType.slice(
            0,
            -1
          )} lifecycle recording, ${JSON.stringify(requestMap)}`
        );
        cy.sendMessagetoPlatforms(requestMap).then((result) => {
          cy.log('Response from 1st party App: ' + JSON.stringify(result));

          UTILS.lifecycleHistorySchemaValidation(
            result,
            schema,
            lifecycleHistoryRecordType,
            envKey
          );
        });
      } else {
        const appId =
          appCallSign === CONSTANTS.THIRD_PARTY_APP
            ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
            : appCallSign;
        const requestTopic = UTILS.getTopic(appId);
        const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);
        const params = { appId: appId, params: [] };

        // Creating intent message to send it to 3rd party app
        const intentMessage = UTILS.createIntentMessage(lifecycleHistoryRecordType, params);

        // Constructing envirnoment variable name with appId
        envKey = appId + CONSTANTS.APP_LIFECYCLE_HISTORY;

        cy.log(
          `Call to 3rd party App ${appId} to ${recordTaskType.slice(
            0,
            -1
          )} lifecycle recording, ${JSON.stringify(intentMessage)}`
        );
        // Sending message to 3rd party app to start/stop the lifecycle transtions recording.
        cy.sendMessagetoApp(requestTopic, responseTopic, intentMessage).then((result) => {
          cy.log(`Response from 3rd party App ${appId}: ${result}`);

          if (!result || result === CONSTANTS.NO_RESPONSE) {
            assert(
              false,
              'Response not received within the specified time for the current request.'
            );
          }
          result = JSON.parse(result).report;

          UTILS.lifecycleHistorySchemaValidation(
            result,
            schema,
            lifecycleHistoryRecordType,
            envKey
          );
        });
      }
    });
  }
);

/**
 * @module providerCalls
 * @function And User set response for '(.+)'
 * @description Making a call to set the value in 1st party app or 3rd party app.
 * @param {String} setResponseKey - key name of the object.
 * @example
 * And User set response for 'set closedcaptions as true'
 */
Given(/User set response for '(.+)'/, (setResponseKey) => {
  setResponseKey = setResponseKey.replaceAll(' ', '_').toUpperCase();
  cy.getFireboltData(setResponseKey, CONSTANTS.SUPPORTED_CALLTYPES.SET_RESPONSE_JSON).then(
    (parsedSetResponseObject) => {
      // Check if parsedSetResponseObject is an array or an object
      const fireboltItems = Array.isArray(parsedSetResponseObject)
        ? parsedSetResponseObject
        : [parsedSetResponseObject];

      fireboltItems.forEach((item) => {
        cy.setResponse(item);
      });
    }
  );
});

// Sample glue for testing
Given(/Capture screenshot response/, () => {
  const requestMap = {
    method: 'fcs.screenshot',
    params: {
      testToken: UTILS.getEnvVariable('testToken'),
    },
  };
  cy.sendMessagetoPlatforms(requestMap).then((response) => {
    cy.log('Screenshot response: ', response);
  });
});
