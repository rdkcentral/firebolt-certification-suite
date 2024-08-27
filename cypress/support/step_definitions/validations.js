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
import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';
const CONSTANTS = require('../constants/constants');
const { _ } = Cypress;
import UTILS from '../cypress-support/src/utils';

/**
 * @module validations
 * @function And '(.+)' platform responds(:? to '(.+)')? with '(.+)'
 * @description Performing a validation against the source of truth for the given API or Event response
 * @param {String} sdk - name of the sdk.
 * @param {String} appId - The object was retrieved by using the appId.
 * @param {String} key - The key name of the Firebolt data contains method, context, or content value, etc.
 * @example
 * Given 'Firebolt' platform responds with 'Validate device id'
 * Given 'Firebolt' platform responds to '1st party app' for 'Validate device id'
 * Given 'Firebolt' platform responds to 'test.test.test' for 'Validate device id'
 * Given 'Firebolt' platform triggers event 'Validate device id'
 * Given 'Firebolt' platform triggers to '1st party app' event 'Validate device id'
 * Given 'Firebolt' platform triggers to 'test.test.test' event 'Validate device id'
 * Given 'Firebolt' platform triggers to 'secondary 3rd party app' event 'Validate device id'
 * Given 'Firebolt' platform does not trigger event for 'onclosedCaptionsSettingsChanged'
 * Given 'Firebolt' platform does not trigger to 'secondary 3rd party app' event for 'onclosedCaptionsSettingsChanged'
 */

Given(
  /'(.+)' platform (responds|triggers|does not trigger)(?: to '(.+)')? (with|for|event)(?: for)? '(.+)'$/,
  async (sdk, eventExpected, appId, event, key) => {
    if (CONSTANTS.SUPPORTED_SDK.includes(sdk)) {
      key = key.replaceAll(' ', '_').toUpperCase();

      // Fetching the required data for validation.
      cy.getFireboltData(key).then((fireboltData) => {
        const fireboltItems = Array.isArray(fireboltData) ? fireboltData : [fireboltData];
        fireboltItems.forEach((item) => {
          const validationType = item.event ? CONSTANTS.EVENT : CONSTANTS.METHOD;

          const methodOrEvent = item[validationType].includes('_')
            ? item[validationType].split('_')[1]
            : item[validationType];
          const context = item.context;
          const validationJsonPath = item.validationJsonPath
            ? item.validationJsonPath
            : CONSTANTS.RESULT;
          const contentObject = item.hasOwnProperty(CONSTANTS.CONTENT.toLowerCase())
            ? item.content
            : CONSTANTS.NULL_RESPONSE;
          const expectingError = item.expectingError;
          const isNullCase = item.isNullCase || false;

          // If the app ID is not passed from the feature, the default app ID will be retrieved.
          appId = !appId
            ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
            : appId === CONSTANTS.FIRST_PARTY_APP
              ? UTILS.getEnvVariable(CONSTANTS.FIRST_PARTY_APPID)
              : UTILS.checkForSecondaryAppId(appId);

          const additionalParams = {
            method: methodOrEvent,
            context: context,
            validationJsonPath: validationJsonPath,
            contentObject: contentObject,
            expectingError: expectingError,
            appId: appId,
            eventExpected: eventExpected,
            isNullCase: isNullCase,
          };
          if (!Cypress.env(CONSTANTS.SKIPCONTENTVALIDATION)) {
            cy.methodOrEventResponseValidation(validationType, additionalParams);
          } else {
            cy.log(
              `${CONSTANTS.SKIPCONTENTVALIDATION} flag is enabled, Skipping the Content validation`
            );
          }
        });
      });
    } else {
      assert(false, `${sdk} SDK not Supported`);
    }
  }
);

/**
 * @module validations
 * @function User validates lifecycle history for '(.+)' with '(.+)'
 * @description To validate explicitly recorded lifecycle history against source of truth from feature
 * @param {String} appCallSign - callSign of launched app
 * @param {String} historyValidationList - Source of truth for lifecycle history validation
 * @example
 * User validates lifecycle history for '1st party app' with 'background:foreground:background'
 * User validates lifecycle history for '3rd party app' with 'background:foreground'
 */
Given(
  /User validates lifecycle history for '(.+)' with '(.+)'$/,
  async (appCallSign, historyValidationList) => {
    // Split the history validation list
    historyValidationList =
      historyValidationList !== 'EMPTY_HISTORY' ? historyValidationList.split(':') : [];

    // Get the env variable based on the appId
    const appId =
      appCallSign === CONSTANTS.THIRD_PARTY_APP
        ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
        : appCallSign === CONSTANTS.FIRST_PARTY_APP
          ? UTILS.getEnvVariable(CONSTANTS.FIRST_PARTY_APPID)
          : appCallSign;

    // Get the recorded history from the env variable
    const envKey = appId + CONSTANTS.APP_LIFECYCLE_HISTORY;
    const recordedHistory = UTILS.getEnvVariable(envKey);

    // Extract the event state from the recorded history
    const recordedHistoryFlattened = [];
    for (let i = 0; i < recordedHistory.length; i++) {
      recordedHistoryFlattened.push(recordedHistory[i].event.state);
    }

    const validationLog =
      'Lifecycle history validation ' +
      ': Expected ' +
      JSON.stringify(historyValidationList) +
      ' to be ' +
      JSON.stringify(recordedHistoryFlattened);

    // Condition to check recorded and expected history are same
    if (JSON.stringify(recordedHistoryFlattened) === JSON.stringify(historyValidationList)) {
      cy.log(validationLog).then(() => {
        assert.deepEqual(
          JSON.stringify(recordedHistoryFlattened),
          JSON.stringify(historyValidationList),
          'Lifecycle history validation '
        );
      });
    } else {
      cy.log(validationLog).then(() => {
        assert(false, validationLog);
      });
    }
  }
);

/**
 * @module ValidationGlue
 * @function '(.+)' will (be|stay) in '(.+)' state
 * @description To validate 3rd party app transitionss wrt state, event and history against appObject as the source of truth
 * @param {String} app - App type
 * @param {String} state - Expected state to be used for validation
 * @example
 * Then '3rd party app' will stay in 'foreground' state
 * Then '3rd party app' will be in 'background' state
 */
Then(/'(.+)' will (be|stay) in '(.+)' state/, (app, condition, state) => {
  const appId =
    app === CONSTANTS.THIRD_PARTY_APP
      ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
      : app === CONSTANTS.FIRST_PARTY_APP
        ? UTILS.getEnvVariable(CONSTANTS.FIRST_PARTY_APPID)
        : app;
  const isEventsExpected = condition == CONSTANTS.STAY ? false : true;
  const appObject = UTILS.getEnvVariable(appId);
  const scenarioName = cy.state().test.title;
  const moduleReqIdJson = Cypress.env(CONSTANTS.MODULEREQIDJSON);
  const featureFileName = cy.state().test.parent.title;
  const scenarioList = moduleReqIdJson?.scenarioNames[featureFileName];
  const validationObject = scenarioList[scenarioName]?.validationObject;
  // custom validation in case of lifecycle test cases where app is not reachable
  // if validationObject is present in the modReqId for the specific TC, we have to validate based on that value
  try {
    if (validationObject) {
      if (Cypress.env(CONSTANTS.COMBINEVALIDATIONOBJECTSJSON).hasOwnProperty(validationObject)) {
        // the validation type is expected to be "custom"
        if (
          Cypress.env(CONSTANTS.COMBINEVALIDATIONOBJECTSJSON)[validationObject]?.data[0]?.type ==
          'custom'
        ) {
          const validationObjectData = Cypress.env(CONSTANTS.COMBINEVALIDATIONOBJECTSJSON)[
            validationObject
          ].data[0];
          // passing the validationObject to perform customValidation
          cy.customValidation(validationObjectData);
        } else {
          assert(
            false,
            `Expected validationObject to be of "custom" type. Current value : ${Cypress.env(CONSTANTS.COMBINEVALIDATIONOBJECTSJSON)[validationObject].data[0].type}`
          );
        }
      }
    } else {
      cy.validateLifecycleState(appObject.getAppObjectState().state, appId);
      cy.validateLifecycleHistoryAndEvents(
        appObject.getAppObjectState().state,
        appId,
        isEventsExpected
      );
    }
  } catch (error) {
    throw new Error(`Error occurred during validation: ${JSON.stringify(error)}`);
  }
});

/**
 * @module validations
 * @function Metrics collection process is '(initiated|stopped)'
 * @description To start or stop performance metrics service in device by passing appropriate intent to performance test handler
 * @param {String} action - start or stop
 * @example
 * Given metrics collection is inititated
 * Given metric collection is stopped
 */
Given(/Metrics collection process is '(initiated|stopped)'/, (action) => {
  if (
    (action == CONSTANTS.INITIATED &&
      UTILS.getEnvVariable(CONSTANTS.IS_PERFORMANCE_METRICS_ENABLED, false) != true) ||
    (action == CONSTANTS.STOPPED &&
      UTILS.getEnvVariable(CONSTANTS.IS_PERFORMANCE_METRICS_ENABLED) == true)
  ) {
    cy.startOrStopPerformanceService(action).then((response) => {
      if (response) {
        Cypress.env(
          CONSTANTS.IS_PERFORMANCE_METRICS_ENABLED,
          action == CONSTANTS.INITIATED ? true : false
        );
      } else {
        cy.log(eval(CONSTANTS.PERFORMANCE_SERVICE_CALL_FAILED_MESSAGE)).then(() => {
          assert(false, eval(CONSTANTS.PERFORMANCE_SERVICE_CALL_FAILED_MESSAGE));
        });
      }
    });
  } else {
    cy.log('Performance metrics service is already enabled in before hook');
  }
});

/**
 * @module validations
 * @function Validate (device|process|all) (memory|load|set size|required) consumption is within the limit of the threshold(?: of '(.+)' (cpu|bytes) with '(.+)' percentile
 * @descriptionvalidate Validates whether or not the cpu threshold of 'process' exceeds the 'percentile' of 'cpuThreshold'
 * @param {String} type - (cpu | memory)
 * @param {String} process - (ResidentApp | SearchAndDiscov)
 * @param {String} percentile - percentile
 * @param {String} threshold - the maximum cpu/bytes threshold
 * @example
 * Then Validate device load consumption is within the limit of the threshold
 * Then Validate process set size consumption is within the limit of the threshold of '1073741824' bytes with '70' percentile
 * Then Validate all required consumption is within the limit of the threshold
 */
Given(
  /Validate (device|process|all) (memory|load|set size|required) consumption is within the limit of the threshold(?: of '(.+)' (cpu|bytes) with '(.+)' percentile)?$/,
  (type, process, threshold, bytes, percentile) => {
    const requestMap = {
      method: CONSTANTS.REQUEST_OVERRIDE_CALLS.PERFORMANCE_THRESHOLD_VALIDATOR,
      params: { type, process, percentile, threshold },
    };

    cy.sendMessagetoPlatforms(requestMap).then((result) => {
      if (result.error) {
        cy.log('Failed to fetch and validate the performance metrics').then(() => {
          assert(false, result.error);
        });
      } else {
        result.map((response) => {
          cy.log(response.message).then(() => {
            assert.equal(true, response?.success, response?.message);
          });
        });
      }
    });
  }
);

/**
 * @module validations
 * @function Given Interactions collection process is (initiated|stopped)
 * @description To start or stop listening to firebolt interactions in device by passing appropriate intent to designated handler
 * @param {String} action - initiated or stopped
 * @example
 * Given Interactions collection process is initiated
 * Given Interactions collection process is stopped
 */
Given(/Interactions collection process is (initiated|stopped)/, (action) => {
  if (
    (action == CONSTANTS.INITIATED &&
      UTILS.getEnvVariable(CONSTANTS.IS_INTERACTIONS_SERVICE_ENABLED, false) != true) ||
    (action == CONSTANTS.STOPPED &&
      UTILS.getEnvVariable(CONSTANTS.IS_INTERACTIONS_SERVICE_ENABLED) == true)
  ) {
    // clearing the logs before starting the service
    if (action === CONSTANTS.INITIATED) {
      UTILS.getEnvVariable(CONSTANTS.FB_INTERACTIONLOGS).clearLogs();
    }
    cy.startOrStopInteractionsService(action).then((response) => {
      if (response) {
        Cypress.env(
          CONSTANTS.IS_INTERACTIONS_SERVICE_ENABLED,
          action == CONSTANTS.INITIATED ? true : false
        );
      } else {
        const message =
          action == CONSTANTS.INITIATED
            ? CONSTANTS.FAILED_TO_INITIATE_INTERACTIONS_SERVICE
            : CONSTANTS.FAILED_TO_STOP_INTERACTIONS_SERVICE;
        UTILS.fireLog.assert(false, message);
      }
    });
  } else {
    cy.log(CONSTANTS.INTERACTIONS_SERVICE_ENABLED);
  }
});

/**
 * @module validations
 * @function Given Validate Firebolt Interactions logs
 * @description Validating the firebolt interaction logs in configModule

 * @example
 * Given Validate Firebolt Interactions logs
 */
Given(/Validate Firebolt Interactions logs with '(.+)'/, (key) => {
  if (UTILS.getEnvVariable(CONSTANTS.INTERACTIONS_METRICS, false) !== true) {
    cy.log(`Interactions log service is not enabled`).then(() => {
      return;
    });
  }
  key = key.replaceAll(' ', '_').toUpperCase();
  cy.getFireboltData(key).then((fireboltData) => {
    console.log('fireboltData------:', fireboltData);
    const logs = UTILS.getEnvVariable(CONSTANTS.FB_INTERACTIONLOGS).getLogs(
      Cypress.env('scenarioName')
    );
    if (!logs) {
      UTILS.fireLog.assert(
        false,
        `No interaction logs found for the scenario ${Cypress.env('scenarioName')}`
      );
    }
    const contentObject = { logs: logs, content: fireboltData.content.data[0].validations };
    cy.customValidation(fireboltData.content.data[0], contentObject);
  });
});
