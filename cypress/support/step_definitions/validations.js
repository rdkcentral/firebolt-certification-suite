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
const { _ } = Cypress;
import UTILS from '../cypress-support/src/utils';

/**
 * @module validations
 * @function And '(.+)' platform responds(:? to '(.+)')? with '(.+)'
 * @description Performing a validation against the source of truth for the given API or Event response
 * @param {String} sdk - name of the sdk.
 * @param {String} appId - The object was retrieved by using the appId.
 * @param {String} key - The key name of the Firebolt data contains method, context, or expected value, etc.
 * @example
 * Given 'Firebolt' platform responds with 'Validate device id'
 * Given 'Firebolt' platform responds to '1st party app' with 'Validate device id'
 * Given 'Firebolt' platform responds to 'test.test.test' with 'Validate device id'
 * Given 'Firebolt' platform triggers event 'Validate device id'
 * Given 'Firebolt' platform triggers to '1st party app' event 'Validate device id'
 * Given 'Firebolt' platform triggers to 'test.test.test' event 'Validate device id'
 */

Given(
  /'(.+)' platform (responds|triggers)(?: to '(.+)')? (with|event) '(.+)'$/,
  async (sdk, eventcall, appId, event, key) => {
    if (CONSTANTS.SUPPORTED_SDK.includes(sdk)) {
      key = key.replaceAll(' ', '_').toUpperCase();

      // Fetching the required data for validation.
      cy.getFireboltData(key).then((fireboltData) => {
        const validationType = fireboltData.event ? CONSTANTS.EVENT : CONSTANTS.METHOD;

        const methodOrEvent = fireboltData[validationType];
        const context = fireboltData.context ? fireboltData.context : CONSTANTS.NO_CONTEXT;
        const validationJsonPath = fireboltData.validationJsonPath;
        const expected = fireboltData.expected;
        const expectingError = fireboltData.expectingError;

        const fireboltCallsValidationPathFromConfigModule =
          CONSTANTS.CONFIG_VALIDATION_OBJECTS_PATH;
        const fixtureFile = CONSTANTS.VALIDATION_OBJECTS_PATH;
        let overrideValue;
        // merging json files in fcs validation objects and configModule
        cy.mergeJsonfiles(fixtureFile).then((fCSValidationjson) => {
          cy.mergeJsonfiles(fireboltCallsValidationPathFromConfigModule).then(
            (configModuleValidationjson) => {
              // checking whether configModule is having the validationObject
              // if present either replace the fcsValidationObject corresponding to the override value or push to fcsValidationObject
              if (
                configModuleValidationjson &&
                configModuleValidationjson[expected] &&
                configModuleValidationjson[expected] !== undefined
              ) {
                if (fCSValidationjson[expected] && fCSValidationjson[expected] !== undefined) {
                  configModuleValidationjson[expected].data.map((configObjectValue) => {
                    if (!configObjectValue.hasOwnProperty('override')) {
                      fCSValidationjson[expected].data.push(configObjectValue);
                    } else {
                      overrideValue = configObjectValue.override;
                      fCSValidationjson[expected].data.map((fcsObjectValue, index) => {
                        if (index == overrideValue) {
                          fCSValidationjson[expected].data[index] = configObjectValue;
                        }
                      });
                    }
                  });
                } else {
                  fCSValidationjson[expected] = configModuleValidationjson[expected];
                }
              }

              // If the app ID is not passed from the feature, the default app ID will be retrieved.
              appId = !appId
                ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
                : appId === CONSTANTS.FIRST_PARTY_APP
                  ? UTILS.getEnvVariable(CONSTANTS.FIRST_PARTY_APPID)
                  : appId;
              // Reading the context value based on the context key name
              cy.testDataHandler(CONSTANTS.CONTEXT, context).then((parsedContext) => {
                // Fetching the object from the global list.
                const methodOrEventObject = UTILS.getApiOrEventObjectFromGlobalList(
                  methodOrEvent,
                  parsedContext,
                  appId,
                  validationType
                );
                const param = methodOrEventObject.params;

                // Function to do error null check, schema validation check and event listerner response checks
                cy.validateResponseErrorAndSchemaResult(methodOrEventObject, validationType).then(
                  () => {
                    // If response of the method is not supported, checks in the not supported list for that method name, if it is present then pass else mark it as fail
                    if (
                      !Cypress.env(CONSTANTS.SKIPCONTENTVALIDATION) &&
                      (UTILS.isScenarioExempted(methodOrEvent, param) || expectingError)
                    ) {
                      let errorExpected;

                      expectingError === true
                        ? (errorExpected = expected)
                        : (errorExpected = CONSTANTS.NOT_SUPPORTED);

                      cy.validateErrorObject(
                        methodOrEvent,
                        errorExpected,
                        validationType,
                        parsedContext,
                        appId
                      ).then(() => {
                        return true;
                      });
                    } else if (!Cypress.env(CONSTANTS.SKIPCONTENTVALIDATION)) {
                      const moduleName = UTILS.extractModuleName(expected);
                      // If validationType is an event then send a message to the app to retrieve an event response based on the app ID.
                      if (validationType == CONSTANTS.EVENT) {
                        const eventName = methodOrEventObject.eventObjectId;
                        if (appId === UTILS.getEnvVariable(CONSTANTS.FIRST_PARTY_APPID)) {
                          const requestMap = {
                            method: eventName,
                            params: param,
                            task: CONSTANTS.TASK.GETEVENTRESPONSE,
                          };

                          cy.sendMessagetoPlatforms(requestMap).then((originalResult) => {
                            let result;
                            // To handle trigger event raw response
                            if (
                              typeof originalResult === 'string' &&
                              !originalResult.includes(CONSTANTS.EVENT_SCHEMA_RESULT)
                            ) {
                              // Update trigger event raw response received from platform(specifically those not coming from FCA) with schema validation and other fields, in the format FCS expects

                              cy.updateResponseForFCS(
                                originalResult,
                                null,
                                methodOrEventObject.eventName,
                                null,
                                null
                              ).then((updatedResult) => {
                                result = updatedResult;
                                cy.saveEventResponse(
                                  result.report,
                                  methodOrEventObject,
                                  methodOrEvent,
                                  expected
                                );
                              });
                            } else {
                              result = JSON.parse(JSON.parse(originalResult));
                              cy.saveEventResponse(
                                result.report,
                                methodOrEventObject,
                                methodOrEvent,
                                expected
                              );
                            }
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
                              cy.saveEventResponse(
                                response,
                                methodOrEventObject,
                                eventName,
                                expected
                              );
                            }
                          );
                        }
                      }
                      // checking whether fcsvalidationObject is having the required validation key and data
                      try {
                        if (fCSValidationjson[expected] && fCSValidationjson[expected].data) {
                          for (let i = 0; i < fCSValidationjson[expected].data.length; i++) {
                            if (fCSValidationjson[expected].data[i].validations) {
                              const scenario = fCSValidationjson[expected].data[i].type;
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
                                    fCSValidationjson[expected].data[i].validations[0].type,
                                    validationJsonPath,
                                    methodOrEventResponse
                                  );
                                  break;
                                case CONSTANTS.MISC:
                                  cy.miscellaneousValidation(
                                    methodOrEvent,
                                    fCSValidationjson[expected].data[i].validations[0],
                                    methodOrEventObject
                                  );
                                  break;
                                case CONSTANTS.DECODE:
                                  const decodeType =
                                    fCSValidationjson[expected].data[i].specialCase;
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
                                    fCSValidationjson[expected].data[i].validations[0],
                                    null
                                  );
                                  break;
                                case CONSTANTS.FIXTURE:
                                  cy.testDataHandler(
                                    CONSTANTS.CONTENT,
                                    fCSValidationjson[expected].data[i]
                                  ).then((content) => {
                                    cy.validateContent(
                                      methodOrEvent,
                                      parsedContext,
                                      validationJsonPath,
                                      content,
                                      validationType,
                                      appId
                                    );
                                  });
                                  break;
                                case CONSTANTS.CUSTOM:
                                  cy.customValidation(
                                    fCSValidationjson[expected].data[i],
                                    methodOrEventObject
                                  );
                                  break;
                                default:
                                  assert(false, 'Unsupported validation type');
                                  break;
                              }
                            }
                          }
                        } else {
                          // TODO: default content validation
                          cy.testDataHandler(CONSTANTS.CONTENT, expected).then((content) => {
                            cy.validateContent(
                              methodOrEvent,
                              parsedContext,
                              validationJsonPath,
                              content,
                              validationType,
                              appId
                            );
                          });
                        }
                      } catch (error) {
                        assert(false, `Unable to validate the response: ${error}`);
                      }
                    } else {
                      cy.log('Content validation is skipped');
                    }
                  }
                );
              });
            }
          );
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
      assert.deepEqual(
        JSON.stringify(recordedHistoryFlattened),
        JSON.stringify(historyValidationList),
        'Lifecycle history validation '
      );
    } else {
      assert(false, validationLog);
    }
  }
);

/**
 * @module validations
 * @function I '(start|stop)' performance metrics collection
 * @description To start or stop performance metrics service in device by passing appropriate intent to performance test handler
 * @param {String} action - start or stop
 * @example
 * I 'start' performance metrics collection
 * I 'stop' performance metrics collection
 */
Given(/I '(start|stop)' performance metrics collection/, (action) => {
  if (
    (action == CONSTANTS.START &&
      UTILS.getEnvVariable(CONSTANTS.IS_PERFORMANCE_METRICS_ENABLED, false) != true) ||
    (action == CONSTANTS.STOP &&
      UTILS.getEnvVariable(CONSTANTS.IS_PERFORMANCE_METRICS_ENABLED) == true)
  ) {
    cy.startOrStopPerformanceService(action).then((response) => {
      if (response) {
        Cypress.env(
          CONSTANTS.IS_PERFORMANCE_METRICS_ENABLED,
          action == CONSTANTS.START ? true : false
        );
      } else {
        cy.log(`Failed to ${action} performance metrics service`).then(() => {
          assert(false, `Failed to ${action} performance metrics service`);
        });
      }
    });
  } else {
    cy.log('Performance metrics service is already enabled in before hook');
  }
});
