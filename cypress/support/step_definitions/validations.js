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
 * Given 'Firebolt' platform does not trigger event for 'onclosedCaptionsSettingsChanged'
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

          // If the app ID is not passed from the feature, the default app ID will be retrieved.
          appId = !appId
            ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
            : appId === CONSTANTS.FIRST_PARTY_APP
              ? UTILS.getEnvVariable(CONSTANTS.FIRST_PARTY_APPID)
              : appId;

          // Fetching the object from the global list.
          const methodOrEventObject = UTILS.getApiOrEventObjectFromGlobalList(
            methodOrEvent,
            context,
            appId,
            validationType
          );
          const param = methodOrEventObject.params;
          // Function to do error null check, schema validation check and event listerner response checks
          cy.validateResponseErrorAndSchemaResult(methodOrEventObject, validationType).then(() => {
            // If response of the method is not supported, checks in the not supported list for that method name, if it is present then pass else mark it as fail
            if (
              !Cypress.env(CONSTANTS.SKIPCONTENTVALIDATION) &&
              (UTILS.isScenarioExempted(methodOrEvent, param) || expectingError)
            ) {
              let errorExpected;

              // If the expected error is false, we set "exceptionErrorObject" to the errorExpected variable, which will be used to retrieve the error content object based on the exception method type.
              expectingError === true
                ? (errorExpected = contentObject)
                : (errorExpected = CONSTANTS.EXCEPTION_ERROR_OBJECT);

              cy.validateErrorObject(
                methodOrEvent,
                errorExpected,
                validationType,
                context,
                appId,
                param
              ).then(() => {
                return true;
              });
            } else if (!Cypress.env(CONSTANTS.SKIPCONTENTVALIDATION)) {
              // If validationType is an event then send a message to the app to retrieve an event response based on the app ID.
              if (validationType == CONSTANTS.EVENT) {
                const eventName = methodOrEventObject.eventObjectId;
                if (appId === UTILS.getEnvVariable(CONSTANTS.FIRST_PARTY_APPID)) {
                  const requestMap = {
                    method: CONSTANTS.REQUEST_OVERRIDE_CALLS.FETCH_EVENT_RESPONSE,
                    params: eventName,
                  };

                  cy.sendMessagetoPlatforms(requestMap).then((result) => {
                    cy.updateResponseForFCS(methodOrEvent, null, result).then((updatedResponse) => {
                      cy.saveEventResponse(
                        updatedResponse,
                        methodOrEventObject,
                        eventName,
                        eventExpected === 'triggers' ? true : false
                      );
                    });
                  });
                } else {
                  const params = { event: eventName };
                  // Generating an intent message using the provided information to send it to a third-party app
                  const intentMessage = UTILS.createIntentMessage(
                    CONSTANTS.TASK.GETEVENTRESPONSE,
                    params
                  );
                  const requestTopic = UTILS.getTopic(appId);
                  const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);
                  cy.sendMessagetoApp(requestTopic, responseTopic, intentMessage).then(
                    (response) => {
                      response = JSON.parse(response);
                      response = response.report;
                      cy.saveEventResponse(
                        response,
                        methodOrEventObject,
                        eventName,
                        eventExpected === 'triggers' ? true : false
                      );
                    }
                  );
                }
              }

              try {
                if (contentObject && contentObject.data) {
                  contentObject.data.forEach((object) => {
                    if (object.validations) {
                      const scenario = object.type;
                      const methodOrEventResponse =
                        validationType == CONSTANTS.EVENT
                          ? methodOrEventObject.eventResponse
                          : validationType == CONSTANTS.METHOD
                            ? methodOrEventObject.response
                            : null;
                      switch (scenario) {
                        case CONSTANTS.REGEX:
                          cy.regExValidation(
                            methodOrEvent,
                            object.validations[0].type,
                            validationJsonPath,
                            methodOrEventResponse
                          );
                          break;
                        case CONSTANTS.MISC:
                          cy.miscellaneousValidation(
                            methodOrEvent,
                            object.validations[0],
                            methodOrEventObject
                          );
                          break;
                        case CONSTANTS.DECODE:
                          const decodeType = object.specialCase;
                          const responseForDecodeValidation =
                            validationType == CONSTANTS.EVENT
                              ? methodOrEventResponse
                              : validationType == CONSTANTS.METHOD
                                ? methodOrEventResponse.result
                                : null;

                          cy.decodeValidation(
                            methodOrEvent,
                            decodeType,
                            responseForDecodeValidation,
                            object.validations[0],
                            null
                          );
                          break;
                        case CONSTANTS.FIXTURE:
                          cy.validateContent(
                            methodOrEvent,
                            context,
                            validationJsonPath,
                            object.validations[0].type,
                            validationType,
                            appId
                          );
                          break;
                        case CONSTANTS.CUSTOM:
                          cy.customValidation(object, methodOrEventObject);
                          break;
                        default:
                          assert(false, 'Unsupported validation type');
                          break;
                      }
                    }
                  });
                } else {
                  cy.validateContent(
                    methodOrEvent,
                    context,
                    validationJsonPath,
                    contentObject,
                    validationType,
                    appId
                  );
                }
              } catch (error) {
                assert(false, `Unable to validate the response: ${error}`);
              }
            } else {
              cy.log('Content validation is skipped');
            }
          });
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
 * @function {string} is in {string} state
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
  cy.validateLifecycleState(appObject.getAppObjectState().state, appId);
  cy.validateLifecycleHistoryAndEvents(
    appObject.getAppObjectState().state,
    appId,
    isEventsExpected
  );
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
