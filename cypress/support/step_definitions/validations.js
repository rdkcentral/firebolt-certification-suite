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

          // If the app ID is not passed from the feature, the default app ID will be retrieved.
          appId = !appId
            ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
            : appId === CONSTANTS.FIRST_PARTY_APP
              ? UTILS.getEnvVariable(CONSTANTS.FIRST_PARTY_APPID)
              : UTILS.checkForSecondaryAppId(appId);

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
                    cy.updateResponseForFCS(methodOrEvent, null, result, true).then(
                      (updatedResponse) => {
                        cy.saveEventResponse(
                          updatedResponse,
                          methodOrEventObject,
                          eventName,
                          eventExpected === 'triggers' ? true : false
                        );
                      }
                    );
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
                      if (
                        response &&
                        response.result &&
                        response.result.hasOwnProperty(CONSTANTS.EVENT_RESPONSE)
                      ) {
                        response.result = response.result.eventResponse;
                      }
                      cy.updateResponseForFCS(methodOrEvent, null, response, true).then(
                        (updatedResponse) => {
                          cy.saveEventResponse(
                            updatedResponse,
                            methodOrEventObject,
                            eventName,
                            eventExpected === 'triggers' ? true : false
                          );
                        }
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
                            ? methodOrEventObject.apiResponse
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
                        case CONSTANTS.UNDEFINED:
                          cy.undefinedValidation(object, methodOrEventObject, validationType);
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
  const scenarioList = moduleReqIdJson.scenarioNames[featureFileName];
  const validationObject = scenarioList[scenarioName].validationObject;
  // custom validation in case of lifecycle test cases where app is not reachable
  // if validationObject is present in the modReqId for the specific TC, we have to validate based on that value
  if (validationObject) {
    if (Cypress.env(CONSTANTS.COMBINEVALIDATIONOBJECTSJSON).hasOwnProperty(validationObject)) {
      // the validation type is expected to be "custom"
      if (
        Cypress.env(CONSTANTS.COMBINEVALIDATIONOBJECTSJSON)[validationObject].data[0].type ==
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
 * @function Interactions metrics collection process is '(initiated|stopped)'
 * @description To start or stop listening to firebolt interactions in device by passing appropriate intent to designated handler
 * @param {String} action - initiated or stopped
 * @example
 * Given Interactions metrics collection process is inititated
 * Given Interactions metrics collection process is stopped
 */
Given(/Interactions metrics collection process is '(initiated|stopped)'/, (action) => {
  if (
    (action == CONSTANTS.INITIATED &&
      UTILS.getEnvVariable(CONSTANTS.IS_INTERACTIONS_SERVICE_ENABLED, false) != true) ||
    (action == CONSTANTS.STOPPED &&
      UTILS.getEnvVariable(CONSTANTS.IS_INTERACTIONS_SERVICE_ENABLED) == true)
  ) {
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
        fireLog.assert(false, message);
      }
    });
  } else {
    cy.log(CONSTANTS.INTERACTIONS_SERVICE_ENABLED);
  }
});

/**
 * @module validations
 * @function And '(.+)' platform responds to '([^']*)'(?: '([^']*)')? (get|set) API(?: with '(.+)')?
 * @description Performing a validation against the source of truth for the given API response
 * @param {String} sdk - name of the sdk.
 * @param {String} appId - The object was retrieved by using the appId.
 * @param {String} fireboltCallKey - key name passed to look for firebolt call object in fireboltCallData Json.
 * @param {String} methodType - Determines which method doing content validation Ex: set or get
 * @param {String} errorContent - Doing error content validation when error content object key passed. Ex: 'INVALID_TYPE_PARAMS'
 * @example
 * And 'Firebolt' platform responds to '1st party app' 'CLOSEDCAPTION_SETTINGS' get API
 * And 'Firebolt' platform responds to '1st party app' 'CLOSEDCAPTION_SETTINGS' set API
 * And 'Firebolt' platform responds to '3rd party app' 'CLOSEDCAPTION_SETTINGS' get API
 * And 'Firebolt' platform responds to '1st party app' set API
 * And 'Firebolt' platform responds to '1st party app' 'CLOSEDCAPTION_SETTINGS' set API with 'INVALID_TYPE_PARAMS'
 */
Given(
  /'(.+)' platform responds to '([^']*)'(?: '([^']*)')? (get|set) API(?: with '(.+)')?$/,
  async (sdk, appId, fireboltCallKey, methodType, errorContent) => {
    if (CONSTANTS.SUPPORTED_SDK.includes(sdk)) {
      let fireboltCallObject;
      // Reading the appId from the environment variable
      appId = !appId
        ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
        : appId === CONSTANTS.THIRD_PARTY_APP
          ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
          : appId === CONSTANTS.FIRST_PARTY_APP
            ? UTILS.getEnvVariable(CONSTANTS.FIRST_PARTY_APPID)
            : appId;
      const context = {};
      const expectingError = errorContent ? true : false;

      // When fireboltCall object key passed fetching the object from the fireboltCalls data else reading it from environment variable
      if (fireboltCallKey) {
        cy.getFireboltData(fireboltCallKey).then((fireboltData) => {
          fireboltCallObject = fireboltData;
        });
      } else {
        fireboltCallObject = UTILS.getEnvVariable('runtime').fireboltCall;
      }

      cy.then(() => {
        let method =
          methodType === CONSTANTS.SET
            ? typeof fireboltCallObject.setMethod == CONSTANTS.TYPE_FUNCTION
              ? fireboltCallObject.setMethod()
              : fireboltCallObject.setMethod
            : typeof fireboltCallObject.method == CONSTANTS.TYPE_FUNCTION
              ? fireboltCallObject.method()
              : fireboltCallObject.method;
        let validationJsonPath =
          methodType === CONSTANTS.SET
            ? typeof fireboltCallObject.setValidationJsonPath == CONSTANTS.TYPE_FUNCTION
              ? fireboltCallObject.setValidationJsonPath()
              : fireboltCallObject.setValidationJsonPath
            : typeof fireboltCallObject.validationJsonPath == CONSTANTS.TYPE_FUNCTION
              ? fireboltCallObject.validationJsonPath()
              : fireboltCallObject.validationJsonPath;
        let contentObject =
          methodType === CONSTANTS.SET
            ? resolveContentObject(fireboltCallObject.setContent)
            : resolveContentObject(fireboltCallObject.content);

        method = method.includes('_') ? method.split('_')[1] : method;
        contentObject = contentObject ? contentObject : CONSTANTS.NULL_RESPONSE;
        validationJsonPath = validationJsonPath ? validationJsonPath : CONSTANTS.RESULT;

        // Fetching the object from the global list.
        const apiObject = UTILS.getApiOrEventObjectFromGlobalList(method, context, appId);
        const param = apiObject.params;

        // Function to do error null check, schema validation check and event listerner response checks
        cy.validateResponseErrorAndSchemaResult(apiObject, CONSTANTS.METHOD).then(() => {
          // If response of the method is not supported, checks in the not supported list for that method name, if it is present then pass else mark it as fail
          if (
            !Cypress.env(CONSTANTS.SKIPCONTENTVALIDATION) &&
            (UTILS.isScenarioExempted(method, param) || expectingError)
          ) {
            let errorExpected;

            // If the expected error is false, we set "exceptionErrorObject" to the errorExpected variable, which will be used to retrieve the error content object based on the exception method type.
            expectingError === true
              ? (errorExpected = UTILS.getEnvVariable('errorContentValidationJson')[errorContent])
              : (errorExpected = CONSTANTS.EXCEPTION_ERROR_OBJECT);

            cy.validateErrorObject(
              method,
              errorExpected,
              CONSTANTS.METHOD,
              context,
              appId,
              param
            ).then(() => {
              return true;
            });
          } else if (!Cypress.env(CONSTANTS.SKIPCONTENTVALIDATION)) {
            try {
              if (contentObject && contentObject.data) {
                contentObject.data.forEach((object) => {
                  if (object.validations) {
                    const scenario = object.type;
                    const methodResponse = apiObject?.response ? apiObject.response : null;

                    // Looping through validationJsonPath to find the valid path for validation.
                    if (validationJsonPath && Array.isArray(validationJsonPath)) {
                      const validationPath = validationJsonPath.find((path) => {
                        if (
                          path
                            .split('.')
                            .reduce((acc, part) => acc && acc[part], methodResponse) !== undefined
                        ) {
                          return path;
                        }
                      });
                      validationPath
                        ? (validationJsonPath = validationPath)
                        : fireLog.assert(
                            false,
                            'Could not find the valid validation path from the validationJsonPath list'
                          );
                    }

                    switch (scenario) {
                      case CONSTANTS.REGEX:
                        cy.regExValidation(
                          method,
                          object.validations[0].type,
                          validationJsonPath,
                          methodResponse
                        );
                        break;
                      case CONSTANTS.MISC:
                        cy.miscellaneousValidation(method, object.validations[0], apiObject);
                        break;
                      case CONSTANTS.DECODE:
                        const decodeType = object.specialCase;
                        const responseForDecodeValidation = methodResponse?.result
                          ? methodResponse.result
                          : null;

                        cy.decodeValidation(
                          method,
                          decodeType,
                          responseForDecodeValidation,
                          object.validations[0],
                          null
                        );
                        break;
                      case CONSTANTS.FIXTURE:
                        cy.validateContent(
                          method,
                          context,
                          validationJsonPath,
                          object.validations[0].type,
                          CONSTANTS.METHOD,
                          appId
                        );
                        break;
                      case CONSTANTS.CUSTOM:
                        cy.customValidation(object, apiObject);
                        break;
                      case CONSTANTS.UNDEFINED:
                        cy.undefinedValidation(object, apiObject, CONSTANTS.METHOD);
                        break;
                      default:
                        assert(false, 'Unsupported validation type');
                        break;
                    }
                  }
                });
              } else {
                cy.validateContent(
                  method,
                  context,
                  validationJsonPath,
                  contentObject,
                  CONSTANTS.METHOD,
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
    } else {
      assert(false, `${sdk} SDK not Supported`);
    }

    // A Function that recursively check each fields and invokes if it's a function within an array or object.
    function resolveContentObject(input) {
      if (Array.isArray(input)) {
        return input.map((item) => resolveContentObject(item));
      } else if (typeof input == CONSTANTS.TYPE_OBJECT && input !== null) {
        for (const key in input) {
          if (Object.hasOwnProperty.call(input, key)) {
            input[key] = resolveContentObject(input[key]);
          }
        }
        return input;
      } else if (input && typeof input === CONSTANTS.TYPE_FUNCTION) {
        return input();
      } else {
        return input;
      }
    }
  }
);
