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
const CONSTANTS = require('../constants/constants');
const { _ } = Cypress;
import UTILS, { fireLog } from '../cypress-support/src/utils';
/**
 * @module assertion
 * @function validateErrorObject
 * @description Validating the error message and code against the source of truth
 * @param {String} method - Name of the API to be validated
 * @param {String} expectedContent - Source of truth for validation.
 * @param {String} validationType - validationType contains a method or event.
 * @param {Object} context - Context value used to fetch the specific object.
 * @param {String} appId - appId to fetch the method/event
 * @example
 * cy.validateErrorObject('authentication.token', 'NOT_SUPPORTED', 'method', {}, 'test.test')
 * cy.validateErrorObject('authentication.token', 'exceptionErrorObject', 'method', {}, 'test.test', {'type': 'distributor})
 */
Cypress.Commands.add(
  'validateErrorObject',
  (method, expectedContent, validationType, context = CONSTANTS.NO_CONTEXT, appId, param) => {
    // Function to extract the error validation objects for the passed method and parameters from the exception list.
    const fetchErrorValidationObjectForExceptionmethod = (method, param) => {
      return new Promise((resolve, reject) => {
        const exceptionMethods = UTILS.getEnvVariable(CONSTANTS.EXCEPTION_METHODS);
        let exceptionType, methodInExceptionList, errorType;
        // Looping through the different types of exceptions lists.
        for (const [type, list] of Object.entries(exceptionMethods)) {
          // Looking for the method and params in each list, if matched returning that exception method.
          methodInExceptionList = list.find((obj) => {
            if (obj.method && obj.method.toLowerCase() === method.toLowerCase()) {
              if (obj.hasOwnProperty(CONSTANTS.PARAM)) {
                return _.isEqual(obj.param, param);
              } else {
                return true;
              }
            }
            return false;
          });

          // If method is prsent in the list, exiting the loop.
          if (methodInExceptionList) {
            exceptionType = type;
            break;
          }
        }

        if (methodInExceptionList) {
          switch (exceptionType) {
            case CONSTANTS.NOT_AVAILABLE_METHODS:
              errorType = CONSTANTS.NOT_AVAILABLE;
              break;
            case CONSTANTS.NOT_PERMITTED_METHODS:
              errorType = CONSTANTS.NOT_PERMITTED;
              break;
            default:
              errorType = CONSTANTS.NOT_SUPPORTED;
          }
        }

        // Extracting the error content validation object from the environment variable.
        if (
          UTILS.getEnvVariable(CONSTANTS.ERROR_CONTENT_VALIDATIONJSON, false) &&
          UTILS.getEnvVariable(CONSTANTS.ERROR_CONTENT_VALIDATIONJSON)[errorType]
        ) {
          const contentObject = UTILS.getEnvVariable(CONSTANTS.ERROR_CONTENT_VALIDATIONJSON)[
            errorType
          ];
          resolve(contentObject);
        } else {
          reject(`Unable to find Error content validation object for ${errorType}`);
        }
      });
    };

    if (expectedContent === CONSTANTS.EXCEPTION_ERROR_OBJECT) {
      cy.wrap(fetchErrorValidationObjectForExceptionmethod(method, param)).then((errorObject) => {
        validateErrorObjects(errorObject);
      });
    } else {
      validateErrorObjects(expectedContent);
    }

    // Function to do content validation for the error objects.
    function validateErrorObjects(errorSchemaObject) {
      console.log(`Debug : errorSchemaObject ` + JSON.stringify(errorSchemaObject));
      try {
        if (
          errorSchemaObject &&
          errorSchemaObject.hasOwnProperty('validations') &&
          Array.isArray(errorSchemaObject.validations)
        ) {
          errorSchemaObject.validations.forEach((errorContentObject) => {
            errorContentObject = errorContentObject.type;

            const apiOrEventObject = UTILS.getApiOrEventObjectFromGlobalList(
              method,
              context,
              appId,
              validationType
            );
            const apiErrorResponse =
              validationType == CONSTANTS.EVENT
                ? apiOrEventObject.eventListenerResponse.error
                : apiOrEventObject.apiResponse.error;

            fireLog.include(
              errorContentObject.errorCode,
              apiErrorResponse.code,
              CONSTANTS.ERROR_CODE
            );
          });
        } else {
          fireLog.fail(`Unable to find Error content validation object for ${errorSchemaObject}`);
        }
      } catch (error) {
        fireLog.fail(error.message);
      }
    }
  }
);

/**
 * @module assertion
 * @function validateContent
 * @description To validate app states, history and notifications using appObject as source of truth.
 * @param {String} method - Name of api to be validated.
 * @param {String} context - Test context from feature file.
 * @param {String} validationPath - Path of validation in actual response.
 * @param {String} expected - Source of truth for validation.
 * @param {String} validationType - Defines to validate event or method.
 * @param {String} appId - Defines which appId matching response should be fetched from global object list.
 * @example
 * cy.validateContent('device.name', '{}','result','living room');
 */
Cypress.Commands.add(
  'validateContent',
  (methodOrEvent, context, validationPath, expected, validationType, appId) => {
    // Fetch the response based on method and context passed.
    const extractedApiObject = UTILS.getApiOrEventObjectFromGlobalList(
      methodOrEvent,
      context,
      appId,
      validationType
    );
    if (validationType === CONSTANTS.EVENT) {
      cy.validateEvent(extractedApiObject, context, validationPath, expected, appId);
    } else {
      const apiResponseContent = eval(CONSTANTS.EXTRACTEDAPI_PATH + validationPath);
      fireLog.deepEqual(apiResponseContent, expected, CONSTANTS.METHOD_CONTENT);
    }
  }
);

/**
 * @module assertion
 * @function validationChecksForResponseAndSchemaResult
 * @description Validation check to verify the status of the response and schema
 * @param {Object} response - ApiResponse
 * @param {Boolean} errorExpected - The flag determines whether to check for errors or results in a response.
 * @param {Object} apiSchemaResult - Schema validation result
 * @param {Boolean} skipSchema - Flag that indicates whether to skip schema validation or not.
 * @example
 * cy.validationChecksForResponseAndSchemaResult({"result":"Living room","error": null}, false, "Device.name", {"validationStatus": "PASS", validationResponse: ""})
 */
Cypress.Commands.add(
  'validationChecksForResponseAndSchemaResult',
  (response, errorExpected, apiSchemaResult, skipSchema = false) => {
    const validationCheck = [];
    // Added to skip the schema if the apiSchemaResult is {} in the response
    if (
      apiSchemaResult === null ||
      apiSchemaResult.validationStatus === null ||
      apiSchemaResult.validationStatus === undefined
    ) {
      skipSchema = true;
    }
    // Verifying whether the error is undefined or not in the response received.
    cy.errorNotUndefinedCheck(response)
      .then((result) => {
        // Pushing the validation status object into an array.
        validationCheck.push(result);
      })
      .then(() => {
        if (apiSchemaResult && !skipSchema) {
          // Validating the schema validation result
          cy.schemaValidationCheck(apiSchemaResult).then((result) => {
            let isNullCheckSkipped = false;

            // Enable the isNullCheckSkipped flag when an error is not present in the response and the schema is passed without expecting an error.
            if (response.error == null || response.error == undefined) {
              result.validationStatus == CONSTANTS.PASS && errorExpected != CONSTANTS.ERROR
                ? (isNullCheckSkipped = true)
                : (isNullCheckSkipped = false);
            }

            // Checking if the error is null in the response and if the error is expected or not.
            if (!UTILS.getEnvVariable(CONSTANTS.IS_SCENARIO_EXEMPTED, false)) {
              cy.errorNullCheck(response, errorExpected, isNullCheckSkipped).then((result) => {
                validationCheck.push(result);
              });
            }
          });
        } else {
          // Checking if the error is null in the response and if the error is expected or not.
          cy.errorNullCheck(response, errorExpected).then((result) => {
            validationCheck.push(result);
          });
        }
      })
      .then(() => {
        if (apiSchemaResult) {
          // Validating the schema validation result
          cy.schemaValidationCheck(apiSchemaResult, skipSchema).then((result) => {
            validationCheck.push(result);
          });
        }
      })
      .then(() => {
        // Checking if the result has an error property or not.
        cy.errorInsideResultCheck(response).then((result) => {
          validationCheck.push(result);
        });
      })
      .then(() => {
        // Printing logs and performing assertions based on validation checks.
        loggingValidationCheckResult(validationCheck);
      });
  }
);

/**
 * @module assertion
 * @function createResultObject
 * @description Creating an object that stores validation status.
 * @param {String} validationPoint - Describe which validation check is being performed.
 * @param {String} validationStatus - Shows the status of the validation check, whether it passed or failed.
 * @param {String} message - A message can be displayed while asserting.
 * @param {Boolean} isForcedSkip - The flag indicates to force the checks to skip.
 * @example
 * createResultObject('Error not undefined Check', 'PASS', 'Error not undefined Check passed')
 */
function createResultObject(validationPoint, validationStatus, message, isForcedSkip = false) {
  const resultObject = {
    validationPoint: validationPoint,
    validationStatus: validationStatus,
    message: message,
    isForcedSkip: isForcedSkip,
  };

  return resultObject;
}

/**
 * @module assertion
 * @function errorNotUndefinedCheck
 * @description Check if the error is undefined in the received response.
 * @param {Object} response - received response
 * @example
 * cy.errorNotUndefinedCheck({"result":"Living room","error": null})
 */
Cypress.Commands.add('errorNotUndefinedCheck', (response) => {
  const validationPoint = CONSTANTS.ERROR_NOT_UNDEFINED_CHECK;
  let message = '';
  let validationStatus = CONSTANTS.PASS;

  // Checks whether the response has a error property and its value is undefined. If the value is undefined, the status is failed, as the error should always be null or another type.
  if (response.hasOwnProperty('error') && response.error === undefined) {
    message = CONSTANTS.ERROR_EXPECTED_DEFINED;
    validationStatus = CONSTANTS.FAIL;
  }

  return createResultObject(validationPoint, validationStatus, message);
});

/**
 * @module assertion
 * @function errorNullCheck
 * @description Check if the error is null in the response and if the error is expected or not.
 * @param {Object} response - API Response
 * @param {Object} errorExpected - Boolean value which indicates whether we are expecting an error or not.
 * @param {Boolean} isNullCheckSkipped - Flag that indicates whether to skip the null check for errors or not.
 * @example
 * cy.errorNullCheck({"result":"Living room","error": null}, true, true)
 */
Cypress.Commands.add('errorNullCheck', (response, errorExpected, isNullCheckSkipped) => {
  const validationPoint = CONSTANTS.ERROR_NULL_CHECK;
  let validationStatus = CONSTANTS.PASS;
  let message = '';
  const isForcedSkip = false;

  // If isNullCheckSkipped is true, skip the null check error since it passed the schema validation check.
  // If isNullCheckSkipped is false and the error expected is false, the error property in the response should be null. If it is other than null, the check should fail.
  // If isNullCheckSkipped is false and the error expected is true, the error property in the response should not be null. If it is null, the check should fail.
  if (isNullCheckSkipped) {
    message = CONSTANTS.NULL_CHECK;
    validationStatus = CONSTANTS.SKIPPED;
  } else if (response.error != null && errorExpected != CONSTANTS.ERROR) {
    let failureMessage = CONSTANTS.ERROR_EXPECTED_NULL;

    if (response.error.message) {
      failureMessage = response.error.message;
    }

    message = failureMessage;
    validationStatus = CONSTANTS.FAIL;
  } else if (errorExpected == CONSTANTS.ERROR) {
    if (response.error == null) {
      message = CONSTANTS.ERROR_EXPECTED;
      validationStatus = CONSTANTS.FAIL;
    } else if (response.error) {
      message = response.error.message
        ? `${CONSTANTS.EXPECTED_ERROR_RESPONSE} ${response.error.message}`
        : `${CONSTANTS.EXPECTED_ERROR_RESPONSE} ${response.error}`;
      validationStatus = CONSTANTS.PASS;
    }
  }

  return createResultObject(validationPoint, validationStatus, message, isForcedSkip);
});

/**
 * @module assertion
 * @function schemaValidationCheck
 * @description Verifying the schema validation
 * @param {Object} apiSchemaResult - schema validation result
 * @param {Boolean} skipSchema - A flag that determines whether schema validation should be skipped or not.
 * @example
 * cy.schemaValidationCheck({"validationStatus": "PASS", validationResponse: ""}, false)
 */
Cypress.Commands.add('schemaValidationCheck', (apiSchemaResult, skipSchema) => {
  const validationPoint = CONSTANTS.SCHEMA_VALIDATION_CHECK;
  let validationStatus = CONSTANTS.PASS;
  let message = '';

  // Verify the schema validation status and if it fails, mark it as failed and add an error message.
  if (apiSchemaResult.validationStatus != CONSTANTS.PASS) {
    message = apiSchemaResult.validationResponse
      ? JSON.stringify(apiSchemaResult.validationResponse.errors)
      : message;
    if (!skipSchema) {
      validationStatus = CONSTANTS.FAIL;
    } else {
      message = CONSTANTS.SCHEMA_CHECK_SKIPPED + '-' + message;
    }
  }

  return createResultObject(validationPoint, validationStatus, message);
});

/**
 * @module assertion
 * @function errorInsideResultCheck
 * @description Checks for any errors inside the response.result
 * @param {Object} response - API Response
 * @example
 * cy.errorInsideResultCheck({"result":"Living room","error": null})
 */
Cypress.Commands.add('errorInsideResultCheck', (response) => {
  const validationPoint = CONSTANTS.ERROR_INSIDE_RESULT_CHECK;
  let validationStatus = CONSTANTS.PASS;
  let message = '';

  // Checks for the result in response with an error property. If it is present, mark the check as failure.
  if (
    response &&
    response.result &&
    response.result != null &&
    response.result.hasOwnProperty('error')
  ) {
    message = JSON.stringify(response.result.error);
    validationStatus = CONSTANTS.FAIL;
  }

  return createResultObject(validationPoint, validationStatus, message);
});

/**
 * @module assertion
 * @function loggingValidationCheckResult
 * @description Function to print logs and perform assertions for the array validation results.
 * @param {array} validationCheck - Contains a list of validation checks.
 * @example
 * loggingValidationCheckResult([{"validationPoint": 'Error not undefined Check', "validationStatus": 'PASS', "message": ""}])
 */
function loggingValidationCheckResult(validationCheck) {
  // Check if the validation status is failed/skipped/forceskip, then mark the next checks as skipped since it failed during the starting checks.
  validationCheck.forEach((logging, index) => {
    if (
      logging.isForcedSkip ||
      logging.validationStatus == CONSTANTS.FAIL ||
      (logging.validationStatus == CONSTANTS.SKIPPED && logging.message != CONSTANTS.NULL_CHECK)
    ) {
      for (
        let validationCheckIndex = index + 1;
        validationCheckIndex < validationCheck.length;
        validationCheckIndex++
      ) {
        validationCheck[validationCheckIndex].validationStatus = CONSTANTS.SKIPPED;
        validationCheck[validationCheckIndex].message = '';
      }
    }
  });

  // Printing the status of all checks in the report.
  cy.get(validationCheck)
    .each((logging) => {
      cy.log(
        `${logging.validationPoint}: ${logging.validationStatus}. ${logging.message}`,
        'loggingValidationCheckResult'
      );
    })
    .then(() => {
      // Assume the checks. If anything is marked other than skipped or pass, then fail the testcase.
      validationCheck.forEach((assertion) => {
        if (assertion.validationStatus == CONSTANTS.SKIPPED) {
          assert.equal(assertion.validationStatus, CONSTANTS.SKIPPED, assertion.validationPoint);
        } else {
          assert.equal(assertion.validationStatus, CONSTANTS.PASS, assertion.validationPoint);
        }
      });
    });
}

/**
 * @module assertion
 * @function validateEvent
 * @description To validate the Events and log the results
 * @param {String} event - Name of event to be validated
 * @param {String} context - Context of that method call
 * @param {String} verifyPath - Path of validation in actual response
 * @param {String} content - Source of truth for validation
 * @param {String} appIdentifier - appId for which the event has to be validated
 * @example
 * cy.validateEvent("device.onNameChanges", {}, result, "Kitchen", "appId123")
 */
Cypress.Commands.add(
  'validateEvent',
  (extractEventObject, parsedContext, verifyPath, content, appIdentifier) => {
    const eventSchemaStatus = extractEventObject.eventSchemaResult;
    const eventResponse = extractEventObject.eventResponse;

    // checking for response not be undefined, if it is undefined, failing the test
    if (eventResponse === undefined) {
      cy.logValidationResult(
        'Event : Did not receive eventResponse,' + ' Actual: eventResponse ' + eventResponse,
        CONSTANTS.FAIL,
        CONSTANTS.SKIPPED,
        CONSTANTS.SKIPPED
      ).then(() => {
        const pretext = 'Event Not Received : ';

        fireLog.strictEqual(eventResponse, content, pretext);
      });
    } else if (eventResponse !== null) {
      // Checking for schema validation status, if schema status is pass, then check for content validation
      if (eventSchemaStatus && eventSchemaStatus.status === 'FAIL') {
        cy.logValidationResult(
          JSON.stringify(extractEventObject),
          CONSTANTS.PASS,
          CONSTANTS.FAIL +
            '. Schema validation failed,' +
            ' Actual: ' +
            JSON.stringify(extractEventObject),
          CONSTANTS.SKIPPED
        );
        cy.assertValidationsForEvent(
          'Schema Validation Failed',
          'FAIL',
          'PASS',
          'Event Schema Validation'
        );
      } else if (eventSchemaStatus && eventSchemaStatus.status === 'PASS') {
        // Doing event content validation
        if (_.isEqual(eval('extractEventObject.' + verifyPath), content)) {
          cy.logValidationResult(
            JSON.stringify(extractEventObject),
            CONSTANTS.PASS,
            CONSTANTS.PASS,
            CONSTANTS.PASS
          );
          cy.assertValidationsForEvent(
            extractEventObject,
            verifyPath,
            content,
            'Event Content validation'
          );
        } else {
          cy.logValidationResult(
            JSON.stringify(extractEventObject),
            CONSTANTS.PASS,
            CONSTANTS.PASS,
            CONSTANTS.FAIL +
              '. Content validation Failed,' +
              ' Actual: ' +
              JSON.stringify(eventResponse)
          );
          cy.assertValidationsForEvent(
            extractEventObject,
            verifyPath,
            content,
            'Event Content validation'
          );
        }
      } else {
        cy.logValidationResult(
          JSON.stringify(extractEventObject),
          CONSTANTS.PASS,
          CONSTANTS.FAIL + ' Event response is not in expected format, missing eventschema field',
          CONSTANTS.SKIPPED
        );
        cy.assertValidationsForEvent(extractEventObject, verifyPath, content, null);
      }
    } else {
      if (content != null) {
        cy.logValidationResult(
          ' Did not receive eventResponse,' + ' Actual: ' + eventResponse,
          CONSTANTS.FAIL,
          CONSTANTS.SKIPPED,
          CONSTANTS.SKIPPED
        ).then(() => {
          const pretext = 'Event Not Received : ';

          fireLog.equal(eventResponse, content, pretext);
        });
      } else if (content === null) {
        cy.logValidationResult(
          'Expected eventResponse is null,' + ' Actual: ' + eventResponse,
          CONSTANTS.PASS,
          CONSTANTS.SKIPPED,
          CONSTANTS.SKIPPED
        ).then(() => {
          const pretext = 'Event Not Received : ';

          fireLog.strictEqual(eventResponse, content, pretext);
        });
      }
    }
  }
);

/**
 * @module assertion
 * @function assertValidationsForEvent
 * @description To validate the Events
 * @param {Object} extractEventObject - Response of the event
 * @param {String} verifyPath - Path of validation in actual response
 * @param {Object} actual - Source of truth for validation
 * @param {String} pretext - Log that needs to be printed in report
 * @example
 * cy.assertValidationsForEvent(event, context, verifyPath, content, appIdentifier)
 */
Cypress.Commands.add(
  'assertValidationsForEvent',
  (extractEventObject, verifyPath, actual, pretext) => {
    let expected = undefined;
    const verifyEventResponse = verifyPath.split('.')[0];
    const verifyInnerObject = verifyPath.split('.')[1];
    const verifyOuterObject = verifyPath.split('.')[2];

    // Checks for multi level object structure and does the event content validation
    if (verifyOuterObject) {
      const eventResponseInnerObject = verifyEventResponse + '.' + verifyInnerObject;
      if (eval('extractEventObject.' + eventResponseInnerObject)) {
        expected = eval('extractEventObject.' + verifyPath);
      }
    } else {
      expected = eval('extractEventObject.' + verifyPath);
    }
    const expectedValue = expected;
    const actualValue = actual;
    typeof expected == 'object' ? (expected = JSON.stringify(expected)) : expected;
    typeof actual == 'object' ? (actual = JSON.stringify(actual)) : actual;
    fireLog.deepEqual(expectedValue, actualValue, pretext);
  }
);

/**
 * @module assertion
 * @function logValidationResult
 * @description To log the event validation results
 * @param {String} eventReceived - Event response
 * @param {String} eventReceivedCheck - Describes whether the event response is received or not
 * @param {String} schemaCheck - Describe whether the schema is passed or failed
 * @param {String} contentCheck - Describes whether content validation is passed or failed
 * @example
 * cy.logValidationResult(event, context, verifyPath, content, appIdentifier)
 */
Cypress.Commands.add(
  'logValidationResult',
  (eventReceived, eventReceivedCheck, schemaCheck, contentCheck) => {
    // Parse the response and log the response and other validation checks
    if (eventReceived) {
      try {
        eventReceived = JSON.parse(eventReceived);
        fireLog.info('Event Response: ' + JSON.stringify(eventReceived.eventResponse));
      } catch (e) {
        fireLog.info('Event Response: ' + eventReceived);
      }
    }

    fireLog.info('Event Received Check : ' + eventReceivedCheck);
    fireLog.info('Event Schema Check : ' + schemaCheck);
    fireLog.info('Event Content Check : ' + contentCheck);
  }
);

/**
 * @module assertion
 * @function saveEventResponse
 * @description Save the event response into the global object
 * @param {String} response - Response of the current request
 * @param {String} methodOrEventObject - the "validationType" param for event validation
 * @param {String} eventName - name of the event
 * @param {String} eventExpected - expected for event response
 * @example
 * cy.saveEventResponse({"result": "Kitched","error": null},{"eventListenerId":"deice.name-8","eventListenerSchemeResult": "pass"},"device.name", "null")
 * cy.saveEventResponse({"result": "Kitched","error": null}, {"eventListenerId":"deice.name-8", "eventListenerSchemeResult": "pass"}, "device.name", "null", true)
 */
Cypress.Commands.add(
  'saveEventResponse',
  (response, methodOrEventObject, eventName, eventExpected) => {
    const eventNameForLog = eventName.split('-')[0];
    if (!response) {
      fireLog.fail(`Event response not received for ${eventNameForLog}`);
    }
    if (response.error) {
      fireLog.isNull(response.error, 'Expected event response.error to be null');
    }

    if (eventExpected) {
      methodOrEventObject.setEventResponseData(response);
    } else {
      fireLog.isNull(response.eventResponse[eventName], CONSTANTS.NO_EVENT_TRIGGERED);
    }
  }
);

/**
 * @module assertion
 * @function validateResponseErrorAndSchemaResult
 * @description Validate the error null check, schema validation result check, eventListenerSchemaResponse.
 * @param {String} methodOrEventObject - the "response" param received from validation step
 * @param {String} validationType - the "validationType" param for event validation
 * @example
 * cy.validateResponseErrorAndSchemaResult({"response": {"result":"kitchen", "error": null}, "expected": "method", "apiSchemaResult":{"validationStatus": "PASS","validationResponse":{}}}, "method")
 */
Cypress.Commands.add(
  'validateResponseErrorAndSchemaResult',
  (methodOrEventObject, validationType, skipCheck = false) => {
    if (skipCheck == true) {
      return;
    }
    if (validationType == CONSTANTS.METHOD) {
      const { expected, apiSchemaResult } = methodOrEventObject;
      const response = methodOrEventObject.apiResponse;

      cy.validationChecksForResponseAndSchemaResult(
        response,
        expected,
        apiSchemaResult,
        (skipSchema = false)
      );
    }
  }
);
