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
const CONSTANTS = require('./constants/constants');
const { _ } = Cypress;
import UTILS from './cypress-support/src/utils';
import lifeCycleAppConfig from '../../Scripts/lifeCycleAppObject.js';
/**
 * @module commands
 * @function mergeJsonfiles
 * @description Merging json files from the provided path.
 * @param {*} path - Folder path of the json files.
 * @example
 * cy.mergeJsonfiles('tmp/');
 */
Cypress.Commands.add('mergeJsonfiles', (path) => {
  cy.task('readFilesFromDir', path).then((files) => {
    // Appending file path to the list of file names
    if (files != null) {
      files.forEach((element, index) => (files[index] = path + element));

      // Merging all json files
      cy.task('mergeMultipleJson', files).then((result) => {
        return result;
      });
    }
  });
});

/**
 * @module commands
 * @function getFireboltData
 * @description Fetching the firebolt data contains method/params/context based on the key value.
 * @param {String} key - key name of the firebolt data.
 * @example
 * cy.getFireboltData('GET_DEVICE_ID');
 */
Cypress.Commands.add(
  'getFireboltData',
  (key, callType = CONSTANTS.SUPPORTED_CALLTYPES.FIREBOLTCALLS) => {
    const fireboltCallsPathFromFCS = `${CONSTANTS.FIREBOLTCALLS_FROM_FCS}${callType}/`;
    const fireboltCallsPathFromConfigModule = `${CONSTANTS.FIREBOLTCALLS_FROM_CONFIGMODULE}${callType}/`;

    // Merging all the json files present in FCS and configModule fireboltCalls folder.
    cy.mergeJsonfiles(fireboltCallsPathFromFCS).then((fireboltCallsFCSjson) => {
      assert.isNotNull(
        fireboltCallsFCSjson,
        'Expected json data to be defined in fixtures/fireboltCalls/'
      );

      // fireboltCalls json data presence not mandatory, if it is there merge it and will take as priority.
      cy.mergeJsonfiles(fireboltCallsPathFromConfigModule).then((fireboltCallsConfigModulejson) => {
        const combinedJson = Object.assign(fireboltCallsFCSjson, fireboltCallsConfigModulejson);

        // Reading the data from combinedJson based on key.
        const fireboltData = combinedJson[key];
        if (!fireboltData) {
          cy.log(`Could not find the data for the passed key - ${key}`).then(() => {
            assert(false, `Could not find the data for the passed key - ${key}`);
          });
        }
        return fireboltData;
      });
    });
  }
);

/**
 * @module commands
 * @function fetchParamBasedOnType
 * @description Fetching the params from testDataHandler or returning as it is if params is object.
 * @param {*} params - key name of the firebolt data.
 * @example
 * cy.fetchParamBasedOnType('GET_DEVICE_ID');
 * cy.fetchParamBasedOnType({});
 */
Cypress.Commands.add('fetchParamBasedOnType', (params) => {
  if (typeof params === CONSTANTS.TYPE_STRING) {
    cy.testDataHandler(CONSTANTS.PARAMS, params).then((parsedTestData) => {
      return parsedTestData;
    });
  } else if (typeof params === CONSTANTS.TYPE_OBJECT) {
    return params;
  }
});

/**
 * @module commands
 * @function fireboltDataParser
 * @description Reading the firebolt data based on key and parsing the method, params and context etc.
 * @param {String} key - key name of the firebolt data contains method/param/context.
 * @param {String} sdk - sdk name Ex: Firebolt.
 * @example
 * cy.fireboltDataParser('get device id', 'Firebolt');
 * @Result
 * { method: 'device.id', param: {}, context: {}, action: 'core', expected: 'result'}
 */
Cypress.Commands.add('fireboltDataParser', (key, sdk = CONSTANTS.SUPPORTED_SDK[0]) => {
  Cypress.env(CONSTANTS.IS_SCENARIO_EXEMPTED, false);
  if (CONSTANTS.SUPPORTED_SDK.includes(sdk)) {
    key = key.replaceAll(' ', '_').toUpperCase();

    // Fetching the firebolt Data contains event name, params and context etc. based on key value.
    cy.getFireboltData(key).then((fireboltData) => {
      let method = fireboltData.method;
      const params = fireboltData.params ? fireboltData.params : CONSTANTS.NO_PARAMS;
      const context = fireboltData.context ? fireboltData.context : CONSTANTS.NO_CONTEXT;
      const expected = fireboltData.expected ? fireboltData.expected : CONSTANTS.RESULT;
      let action = CONSTANTS.ACTION_CORE.toLowerCase();

      // If method contains sdk name splitting it and updating action and method value. Ex: manage_device.name
      if (method && method.includes('_')) {
        action = method.split('_')[0];
        method = method.split('_')[1];
      }

      // Reading the context value based on the context key name.
      cy.testDataHandler(CONSTANTS.CONTEXT, context).then((parsedContext) => {
        // Fetching the Params based on type, If param is object using as-is else fetching it by using testDataHandler.
        cy.fetchParamBasedOnType(params).then((parsedTestData) => {
          return {
            method: method,
            params: parsedTestData,
            context: parsedContext,
            action: action,
            expected: expected,
          };
        });
      });
    });
  } else {
    assert(false, `${sdk} SDK not Supported`);
  }
});

/**
 * @module commands
 * @function validateErrorObject
 * @description Validating the error message and code against the source of truth
 * @param {String} method - Name of the API to be validated
 * @param {String} expectedContent - Source of truth for validation.
 * @param {String} validationType - validationType contains a method or event.
 * @param {Object} context - Context value used to fetch the specific object.
 * @param {String} appId - appId to fetch the method/event
 * @example
 * cy.validateErrorObject('authentication.token', 'NOT_SUPPORTED', 'method', {}, 'test.test')
 */
Cypress.Commands.add(
  'validateErrorObject',
  (method, expectedContent, validationType, context = CONSTANTS.NO_CONTEXT, appId) => {
    const errorSchemaFilePath = CONSTANTS.ERROR_SCHEMA_OBJECTS_PATH;
    const errorContentFilePath = CONSTANTS.ERROR_CONTENT_OBJECTS_PATH;
    try {
      cy.getDataFromTestDataJson(errorSchemaFilePath, expectedContent).then((errorSchemaObject) => {
        if (
          typeof errorSchemaObject == CONSTANTS.TYPE_OBJECT &&
          errorSchemaObject.type == CONSTANTS.VALIDATION_FUNCTION
        ) {
          errorSchemaObject.validations.forEach((validationObject) => {
            cy.getDataFromTestDataJson(errorContentFilePath, validationObject.type).then(
              (errorContentObject) => {
                const apiOrEventObject = UTILS.getApiOrEventObjectFromGlobalList(
                  method,
                  context,
                  appId,
                  validationType
                );
                const apiErrorResponse =
                  validationType == CONSTANTS.EVENT
                    ? apiOrEventObject.eventListenerResponse.error
                    : apiOrEventObject.response.error;

                cy.log(
                  `Expected Errorcode: ${apiErrorResponse.code} to be oneof [${errorContentObject.errorCode}]`
                ).then(() => {
                  assert.include(
                    errorContentObject.errorCode,
                    apiErrorResponse.code,
                    CONSTANTS.ERROR_CODE
                  );
                });
                const checkErrorMessage = errorContentObject.errorMessage.some((errorMessage) =>
                  apiErrorResponse.message.includes(errorMessage)
                );
                cy.log(
                  `Expected Error Message ${apiErrorResponse.message} to be oneof [${errorContentObject.errorMessage}] `
                ).then(() => {
                  assert.equal(checkErrorMessage, true, 'Error Message Validation: ');
                });
              }
            );
          });
        } else {
          cy.log('Unable to find data for Error validation').then(() => {
            assert(false, 'Unable to find data for Error validation');
          });
        }
      });
    } catch (error) {
      cy.log('Failed to validate error: ', error).then(() => {
        assert(false, 'Failed to validate error: ' + error);
      });
    }
  }
);

/**
 * @module commands
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
      const pretext = CONSTANTS.METHOD_CONTENT;
      cy.log(
        pretext +
          ' expected ' +
          JSON.stringify(apiResponseContent) +
          ' to be ' +
          JSON.stringify(expected)
      ).then(() => {
        assert.deepEqual(apiResponseContent, expected, pretext);
      });
    }
  }
);

/**
 * @module commands
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
 * @module commands
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
 * @module commands
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
 * @module commands
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
 * @module commands
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
 * @module commands
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
 * @module commands
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
 * @module commands
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

        cy.log(pretext + ': expected ' + eventResponse + ' to be ' + content).then(() => {
          assert.strictEqual(eventResponse, content, pretext);
        });
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
            CONSTANTS.FAIL + '. Content validation Failed,' + ' Actual: ' + eventResponse
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

          cy.log(pretext + ': expected ' + eventResponse + ' to be ' + content);
          assert.equal(eventResponse, content, pretext);
        });
      } else if (content === null) {
        cy.logValidationResult(
          'Expected eventResponse is null,' + ' Actual: ' + eventResponse,
          CONSTANTS.PASS,
          CONSTANTS.SKIPPED,
          CONSTANTS.SKIPPED
        ).then(() => {
          const pretext = 'Event Not Received : ';

          cy.log(pretext + ': expected ' + eventResponse + ' to be ' + content);
          assert.strictEqual(eventResponse, content, pretext);
        });
      }
    }
  }
);

/**
 * @module commands
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

    cy.log(pretext + ' : expected ' + expected + ' to be ' + actual);
    assert.deepEqual(expected, actual, pretext);
  }
);

/**
 * @module commands
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
        cy.log('Event Response: ' + JSON.stringify(eventReceived.eventResponse));
      } catch (e) {
        cy.log('Event Response: ' + eventReceived);
      }
    }

    cy.log('Event Received Check : ' + eventReceivedCheck);
    cy.log('Event Schema Check : ' + schemaCheck);
    cy.log('Event Content Check : ' + contentCheck);
  }
);

/**
 * @module commands
 * @function saveEventResponse
 * @description Save the event response into the global object
 * @param {String} response - Response of the current request
 * @param {String} methodOrEventObject - the "validationType" param for event validation
 * @param {String} eventName - name of the event
 * @param {String} expected - expected response to validate
 * @example
 * cy.saveEventResponse({"result": "Kitched","error": null},{"eventListenerId":"deice.name-8","eventListenerSchemeResult": "pass"},"device.name", "null")
 */
Cypress.Commands.add('saveEventResponse', (response, methodOrEventObject, eventName, expected) => {
  if (response) {
    if (typeof response != 'object') {
      response = JSON.parse(response);
      response = response.report;
    }

    if (response.eventResponse != null) {
      methodOrEventObject.setEventResponseData(response);
    } else {
      if (response[eventName] === null && expected == 'NULL') {
        cy.log(
          'Expected event response to be null, since event listener is cleared and no event will be triggered'
        );
      } else if (response.error) {
        assert.isTrue(JSON.stringify(response.error).includes('Received error'), true);
      } else {
        assert.equal(false, true, 'No eventObject is found');
      }
    }
  } else {
    assert.isOk(false, 'Event response not received');
  }
});

/**
 * @module commands
 * @function validateResponseErrorAndSchemaResult
 * @description Validate the error null check, schema validation result check, eventListenerSchemaResponse.
 * @param {String} methodOrEventObject - the "response" param received from validation step
 * @param {String} validationType - the "validationType" param for event validation
 * @example
 * cy.validateResponseErrorAndSchemaResult({"response": {"result":"kitchen", "error": null}, "expected": "method", "apiSchemaResult":{"validationStatus": "PASS","validationResponse":{}}}, "method")
 */
Cypress.Commands.add(
  'validateResponseErrorAndSchemaResult',
  (methodOrEventObject, validationType) => {
    if (validationType == CONSTANTS.METHOD) {
      const { response, expected, apiSchemaResult } = methodOrEventObject;

      cy.validationChecksForResponseAndSchemaResult(
        response,
        expected,
        apiSchemaResult,
        (skipSchema = false)
      );
    } else {
      const { expected, eventListenerResponse, eventListenerSchemaResponse } = methodOrEventObject;

      if (expected == CONSTANTS.ERROR) {
        cy.log(
          CONSTANTS.EVENT_ERROR_MSG +
            ': expected ' +
            eventListenerResponse.error +
            ' to be not null'
        ).then(() => {
          cy.log(CONSTANTS.EVENT_SCHEMA_MSG + ' : ' + CONSTANTS.FAIL).then(() => {
            assert.isNotNull(eventListenerResponse.error, CONSTANTS.EVENT_ERROR_MSG);
            assert.equal(
              eventListenerSchemaResponse.status,
              CONSTANTS.FAIL,
              CONSTANTS.EVENT_SCHEMA_MSG
            );
          });
        });
      } else {
        cy.log(
          CONSTANTS.EVENT_ERROR_MSG + ': expected ' + eventListenerResponse.error + ' to be null'
        ).then(() => {
          cy.log(CONSTANTS.EVENT_SCHEMA_MSG + ' : ' + CONSTANTS.PASS).then(() => {
            assert.isNull(eventListenerResponse.error, CONSTANTS.EVENT_ERROR_MSG);
            assert.equal(
              eventListenerSchemaResponse.status,
              CONSTANTS.PASS,
              CONSTANTS.EVENT_SCHEMA_MSG
            );
          });
        });
      }
    }
  }
);

/**
 * @module commands
 * @function getSdkVersion
 * @description Making device.version API call to platform to get SDK version. If not found, get from Firebolt-specification URL, or get from fixtures.
 * @example
 * cy.getSdkVersion()
 */
// TODO: Planning to move it out of FCS and keep it in configModule
// Reason: If refui is not there and certification=false then sendMessageToPlatofrms will not have device.version.sdk value.
Cypress.Commands.add('getSdkVersion', () => {
  let latestSDKversion;
  const platformSDKVersion = UTILS.getEnvVariable(CONSTANTS.ENV_PLATFORM_SDK_VERSION, false);
  if (platformSDKVersion) {
    return platformSDKVersion;
  } else {
    // fetching latestSDKversion from Firebolt-specificaiton URL
    cy.request({
      url: UTILS.getEnvVariable(CONSTANTS.FIREBOLT_SPECIFICATION_URL),
      failOnStatusCode: false,
    })
      .then((fireboltSpecJson) => {
        // If there is a version in fireboltSpecJson response, using it, otherwise taking the latest version from the fixtures.
        if (
          fireboltSpecJson.status == 200 &&
          fireboltSpecJson?.body?.apis &&
          Object.values(fireboltSpecJson.body.apis)[0]?.info?.version
        ) {
          latestSDKversion = Object.values(fireboltSpecJson.body.apis)[0].info.version;
          return latestSDKversion;
        } else {
          cy.getLatestFireboltJsonFromFixtures().then((latestSDKversion) => {
            return latestSDKversion;
          });
        }
      })
      .then((latestSDKversion) => {
        // Calling device.version API
        cy.getDeviceVersion(latestSDKversion).then((response) => {
          // If the response is invalid, assign the latest SDK version to the environment variable.
          if (response?.api?.readable && response.sdk?.readable) {
            // Obtaining the api version from the response when certification is true, otherwise taking the sdk version.
            // When certification is true, certifying the platform. Hence the platform version is used which is returned by device.version.api
            // When certification is false, trying to test the platform. Hence the SDK Version is used which is returned by device.version.sdk
            const deviceSDKversionJson =
              UTILS.getEnvVariable(CONSTANTS.CERTIFICATION, false) == true
                ? response.api
                : response.sdk;
            const readableSDKVersion = deviceSDKversionJson.readable;

            // If the readable SDK version contains a next|proposed, assigning the readable version to the environment variable, otherwise taking the device SDK version.
            Cypress.env(
              CONSTANTS.ENV_PLATFORM_SDK_VERSION,
              readableSDKVersion.includes(CONSTANTS.NEXT) ||
                readableSDKVersion.includes(CONSTANTS.PROPOSED)
                ? readableSDKVersion
                : `${deviceSDKversionJson.major}.${deviceSDKversionJson.minor}.${deviceSDKversionJson.patch}`
            );
            return;
          }
          Cypress.env(CONSTANTS.ENV_PLATFORM_SDK_VERSION, latestSDKversion);
        });
      });
  }
});

/**
 * @module commands
 * @function getDeviceVersion
 * @description Making device.version API call to get SDK version.
 * @example
 * cy.getDeviceVersion()
 */
Cypress.Commands.add('getDeviceVersion', (latestSDKversion) => {
  const requestMap = {
    method: CONSTANTS.DEVICE_VERSION,
    param: {},
    action: CONSTANTS.ACTION_CORE.toLowerCase(),
  };

  cy.sendMessagetoPlatforms(requestMap).then((response) => {
    try {
      if (response) {
        // Parsing and returning the response
        response = JSON.parse(JSON.parse(response)).report;

        if (response?.apiResponse?.result) {
          return response.apiResponse.result;
        } else {
          throw 'Invalid response';
        }
      } else {
        throw 'Obtained response is null|undefined';
      }
    } catch (error) {
      cy.log('Failed to fetch device.version', error);
    }
  });
});

/**
 * @module commands
 * @function getLatestFireboltJsonFromFixtures
 * @description Get the firebolt.json folder names from fixtures/versions and return the latest file
 * @example
 * cy.getLatestFireboltJsonFromFixtures()
 */
Cypress.Commands.add('getLatestFireboltJsonFromFixtures', () => {
  cy.task('readFilesFromDir', 'cypress/fixtures/versions/').then((filesData) => {
    try {
      // Reading a greater version value from the versions folder.
      const version = filesData
        .map((file) =>
          file
            .split('.')
            .map((n) => +n + 100000)
            .join('.')
        )
        .sort()
        .map((file) =>
          file
            .split('.')
            .map((n) => +n - 100000)
            .join('.')
        )
        .pop();

      return version;
    } catch (err) {
      assert.equal(true, err, 'Error while fetching latest version from the fixtures');
    }
  });
});

/**
 * @module commands
 * @function getFireboltJsonData
 * @description Get the firebolt.json based on the url
 * @example
 * cy.getFireboltJsonData()
 */
Cypress.Commands.add('getFireboltJsonData', () => {
  let FIREBOLT_SPECIFICATION_URL;
  const envPlatformSdkVersion = UTILS.getEnvVariable(CONSTANTS.ENV_PLATFORM_SDK_VERSION);

  // Reading the path of the firebolt.json file from the environment variable based on the SDK version.
  if (envPlatformSdkVersion.includes(CONSTANTS.NEXT)) {
    FIREBOLT_SPECIFICATION_URL = UTILS.getEnvVariable(CONSTANTS.FIREBOLT_SPECIFICATION_NEXT_URL);
    cy.log(`Using the next version of firebolt.json`);
  } else if (envPlatformSdkVersion.includes(CONSTANTS.PROPOSED)) {
    FIREBOLT_SPECIFICATION_URL = UTILS.getEnvVariable(
      CONSTANTS.FIREBOLT_SPECIFICATION_PROPOSED_URL
    );
    cy.log(`Using the proposed version of firebolt.json`);
  } else {
    FIREBOLT_SPECIFICATION_URL = UTILS.getEnvVariable(CONSTANTS.FIREBOLT_SPECIFICATION_URL).replace(
      CONSTANTS.LATEST,
      envPlatformSdkVersion
    );
    cy.log(`Using the ${envPlatformSdkVersion} version of firebolt.json`);
  }

  cy.request({ url: FIREBOLT_SPECIFICATION_URL, failOnStatusCode: false }).then((data) => {
    // Get firebolt.json content from the FIREBOLT_SPECIFICATION_URL if the cy.request is success
    data = null;
    if (data && data.status == 200) {
      data = data.body;
      return data;
    }

    //  If cy.request fails, get specific firebolt.json from -cypress/fixtures/versions/${Cypress.env(CONSTANTS.ENV_PLATFORM_SDK_VERSION)}/firebolt.json
    else {
      const configImportPath = `cypress/fixtures/versions/${UTILS.getEnvVariable(
        CONSTANTS.ENV_PLATFORM_SDK_VERSION
      )}/firebolt.json`;

      cy.task('readFileIfExists', configImportPath).then((data) => {
        if (data) {
          return JSON.parse(data);
        } else {
          // Get the latest firebolt.json from fixtures if all other options fail
          cy.getLatestFireboltJsonFromFixtures().then((latestSDKversion) => {
            cy.fixture(`versions/${latestSDKversion}/firebolt.json`).then((data) => {
              return data;
            });
          });
        }
      });
    }
  });
});

/**
 * @module commands
 * @function getCapabilities
 * @description Creating capabilities list from the firebolt config json.
 * @example
 * cy.getCapabilities()
 */
Cypress.Commands.add('getCapabilities', () => {
  Cypress.env('capabilitiesList', null);
  try {
    const fireboltConfig = UTILS.getEnvVariable(CONSTANTS.FIREBOLTCONFIG);
    const capabilitiesList = [];

    // looping through firebolt Config capabilities and extracting capability names and storing it in a list.
    if (fireboltConfig && fireboltConfig.capabilities) {
      for (const key in fireboltConfig.capabilities) {
        capabilitiesList.push(key);
      }
      const capabilityObject = new Object();
      capabilityObject.capabilities = capabilitiesList;
      Cypress.env('capabilitiesList', capabilityObject);
    }
  } catch (error) {
    cy.log('Error while getting capabilities from firebolt config: ', error);
  }
});

/**
 * @module commands
 * @function thirdPartyAppHealthcheck
 * @description Checking third party App connection status
 * @param {string} requestTopic - Topic used to publish message
 * @param {string} responseTopic - Topic used to subscribe message
 * @example
 * cy.thirdPartyAppHealthcheck(mac_appId_FCS, mac_appId_FCA)
 */
Cypress.Commands.add('thirdPartyAppHealthcheck', (requestTopic, responseTopic) => {
  // Creating intent message with healthCheck task
  const intentMessage = UTILS.createIntentMessage(CONSTANTS.TASK.HEALTHCHECK);
  sendMessageToAppWithRetry(
    requestTopic,
    responseTopic,
    intentMessage,
    UTILS.getEnvVariable(CONSTANTS.HEALTH_CHECK_RETRIES)
  );
});

// Sending message to third party app to check the connection status with retry logic
function sendMessageToAppWithRetry(requestTopic, responseTopic, intentMessage, retryCount) {
  cy.sendMessagetoApp(requestTopic, responseTopic, intentMessage).then((response) => {
    if (response == CONSTANTS.NO_RESPONSE && retryCount > 0) {
      retryCount = retryCount - 1;
      return sendMessageToAppWithRetry(requestTopic, responseTopic, intentMessage, retryCount);
    } else {
      return response;
    }
  });
}

/**
 * @module commands
 * @function getBeforeOperationObject
 * @description Fetching beforeOperation object from moduleReqId json
 * @example
 * cy.getBeforeOperationObject()
 */
Cypress.Commands.add('getBeforeOperationObject', () => {
  let beforeOperation;
  // Fetching current scenario name. Get the cypress context
  const featureFileName = cy.state().test.parent.title;
  let scenarioName = cy.state().test.title;
  if (scenarioName.includes('(example')) {
    scenarioName = scenarioName.split('(example')[0].trim();
  }
  // Fetching current feature name
  const moduleReqIdJson = Cypress.env(CONSTANTS.MODULEREQIDJSON);
  const scenarioList = moduleReqIdJson.scenarioNames[featureFileName];

  if (scenarioList?.[scenarioName]?.beforeOperation) {
    beforeOperation = scenarioList[scenarioName].beforeOperation;
    if (Array.isArray(beforeOperation)) {
      for (let i = 0; i < beforeOperation.length; i++) {
        if (beforeOperation[i].tags) {
          if (checkForTags(beforeOperation[i].tags)) {
            cy.setResponse(beforeOperation[i]);
          } else {
            cy.log(
              `Tag passed in the cli-${Cypress.env(
                CONSTANTS.TAG
              )} doesn't match with the tag present in before operation object-${
                beforeOperation[i].tags
              }`
            );
          }
        } else {
          cy.setResponse(beforeOperation[i]);
        }
      }
    } else {
      assert(
        false,
        'Before operation object is not in proper array format, recheck the before objects in fixture/external/moduleReqId - getBeforeOperationObject'
      );
    }
  }
});

/**
 * @module commands
 * @function checkForTags
 * @description Check whether the tags in beforeOperation object and tag passed in cli has anything common
 * @example
 * checkForTags(["TAG1","TAG2"])
 */
function checkForTags(tags) {
  if (Cypress.env(CONSTANTS.BEFORE_OPERATION_TAGS)) {
    const beforeOperationTags = Cypress.env(CONSTANTS.BEFORE_OPERATION_TAGS).split(',');
    return tags.some((tag) => beforeOperationTags.includes(tag));
  } else {
    return false;
  }
}

/**
 * @module commands
 * @function setResponse
 * @description Making a call to set/clear the values before test start
 * @param {object} beforeOperation - Object that contains the method, params details
 * @example
 * cy.setResponse({"fireboltCall":"USERGRANTS_CLEAR_REFUI", "firstParty": true})
 */
Cypress.Commands.add('setResponse', (beforeOperation) => {
  if (!beforeOperation) {
    assert(false, 'Before operation object is null/undefined - setResponse');
  }
  const callType = beforeOperation.fireboltCall ? CONSTANTS.FIREBOLTCALL : CONSTANTS.FIREBOLTMOCK;
  const fireboltParam = beforeOperation[callType];
  let firstParty;
  if (beforeOperation.hasOwnProperty('firstParty')) {
    firstParty = beforeOperation.firstParty;
  } else {
    firstParty = false;
    cy.log(
      'firstParty property is missing in beforeOperation block, so using default as firstParty=false'
    );
  }

  if (callType == CONSTANTS.FIREBOLTCALL) {
    cy.fireboltDataParser(fireboltParam).then((parsedData) => {
      if (firstParty) {
        const { method, params, action } = parsedData;
        const requestMap = {
          method: method,
          params: params,
          action: action,
        };

        cy.log(`Firebolt Call to 1st party App: ${JSON.stringify(requestMap)} `);
        cy.sendMessagetoPlatforms(requestMap).then((result) => {
          cy.log('Response from 1st party App: ' + result);
        });
      } else {
        const communicationMode = UTILS.getCommunicationMode();
        const { method, params, action } = parsedData;
        const additionalParams = {
          communicationMode: communicationMode,
          action: action,
          isNotSupportedApi: false,
        };
        const methodParams = { method: method, methodParams: params };
        intentMessage = UTILS.createIntentMessage(
          CONSTANTS.TASK.CALLMETHOD,
          methodParams,
          additionalParams
        );

        const requestTopic = UTILS.getTopic(Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID));
        const responseTopic = UTILS.getTopic(
          Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID),
          CONSTANTS.SUBSCRIBE
        );

        // Sending message to 3rd party app.
        cy.log(`Set mock call to 3rd party App: ${JSON.stringify(intentMessage)} `);
        cy.sendMessagetoApp(requestTopic, responseTopic, intentMessage).then((result) => {
          result = JSON.parse(result);
          cy.log(
            `Response from 3rd party App ${Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID)}: ${JSON.stringify(
              result
            )}`
          );
        });
      }
    });
  } else if (callType == CONSTANTS.FIREBOLTMOCK) {
    cy.getFireboltData(fireboltParam, CONSTANTS.SUPPORTED_CALLTYPES.FIREBOLTMOCKS).then(
      (parsedData) => {
        if (firstParty) {
          const method = CONSTANTS.REQUEST_OVERRIDE_CALLS.SETRESPONSE;
          const requestMap = {
            method: method,
            params: parsedData,
          };
          cy.log(`Set mock call to 1st party App: ${JSON.stringify(requestMap)} `);
          cy.sendMessagetoPlatforms(requestMap).then((result) => {
            cy.log('Response from 1st party App: ' + JSON.stringify(result));
          });
        } else {
          const params = {
            apiResponse: { module: parsedData.method, attributes: parsedData.response },
          };
          const communicationMode = UTILS.getCommunicationMode();
          const additionalParams = {
            communicationMode: communicationMode,
            isNotSupportedApi: false,
          };
          const intentMessage = UTILS.createIntentMessage(
            CONSTANTS.TASK.SETAPIRESPONSE,
            params,
            additionalParams
          );

          const requestTopic = UTILS.getTopic(Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID));
          const responseTopic = UTILS.getTopic(
            Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID),
            CONSTANTS.SUBSCRIBE
          );

          // Sending message to 3rd party app.
          cy.log(`Set mock call to 3rd party App: ${JSON.stringify(intentMessage)} `);
          cy.sendMessagetoApp(requestTopic, responseTopic, intentMessage).then((result) => {
            result = JSON.parse(result);
            cy.log(
              `Response from 3rd party App ${Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID)}: ${JSON.stringify(
                result
              )}`
            );
          });
        }
      }
    );
  }
});

/**
 * @module commands
 * @function startOrStopPerformanceService
 * @description To start or stop performance metrics service in device by passing appropriate intent to performance test handler
 * @param {String} action - start or stop
 * @example
 * cy.startOrStopPerformanceService('start)
 * cy.startOrStopPerformanceService('stop')
 */
Cypress.Commands.add('startOrStopPerformanceService', (action) => {
  const requestMap = {
    method: CONSTANTS.REQUEST_OVERRIDE_CALLS.SETPERFORMANCETESTHANDLER,
    params: { trigger: action, optionalParams: '' },
    task: CONSTANTS.TASK.PERFORMANCETESTHANDLER,
  };
  cy.log('Request map to send intent to performance test handler: ' + JSON.stringify(requestMap));
  // Sending message to the platform to call performance test handler
  cy.sendMessagetoPlatforms(requestMap).then((result) => {
    if (result?.success) {
      assert(true, `Performance metrics with action ${action} is successfull`);
      return true;
    } else {
      assert(
        false,
        `Performance metrics with action ${action} is failed with error ${JSON.stringify(result.message)}`
      );
    }
  });
});

/**
 * @module commands
 * @function censorData
 * @description To censor sensitive information in reports eg: authentication.token
 * @param {String} method - the name of the method whose response needs to be masked to hide sensitive information
 * @param response - response of the method
 * @example
 * cy.censorData("Advertising.advertisingId", response)
 */
Cypress.Commands.add('censorData', (method, response) => {
  try {
    // Importing the censorData JSON
    cy.fixture(CONSTANTS.CENSOR_DATA_PATH).then((censorData) => {
      const methodName = method.charAt(0).toUpperCase() + method.slice(1);

      // Check if the method name exists in the censorData and if the response contains the required field.
      // Replace sensitive information with "*******"
      if (methodName in censorData && response.result) {
        censorData[methodName].field.forEach((field) => {
          const result = response.result[field];

          if (result) {
            const responseLength = result.length;
            // Mask sensitive information
            response.result[field] = result.replace(
              result.substring(2, responseLength - 2),
              '*******'
            );
          } else if (field === '' && typeof response.result === 'string') {
            const responseLength = response.result.length;
            // Mask sensitive information
            response.result = response.result.replace(
              response.result.substring(2, responseLength - 2),
              '*******'
            );
          }
        });
      }
      // Return the updated response
      return response;
    });
  } catch (err) {
    // Log an error if the censorData JSON file is missing.
    cy.log('Error occurred while loading censorData: ', err);
  }
});

/**
 * @module commands
 * @function launchApp
 * @description Launch application with additional classifier - firebolt certification app/ firebolt app and perform health check
 * @param {String} appType - Additional classifier for the app - Launch the certification app for certification validations. Launching a firebolt app for app certification
 * @param {String} appCallSign - The appId used to launch the app which is identified by the firebolt platform servicing the request
 * @example
 * cy.launchApp('firebolt', 'foo')
 * cy.launchApp('certification', 'foo')
 */
Cypress.Commands.add('launchApp', (appType, appCallSign) => {
  // use the firebolt command Discovery.launch to launch the app. If app id given, use the app id
  // else get the default app id from environment variable.

  const appId =
    appCallSign == undefined ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID) : appCallSign; // this is for the app to know the appId used for launch, so that it can use the same for creating PubSub connection.
  // if appType is certification, the appLaunch is for certification purposes. In such a case, discovery.launch should go with a basic intent that has the appId and the certification app role.
  // create the request map
  // basic intent to be sent to the app on launch
  let requestMap = { method: CONSTANTS.DISCOVERY_LAUNCH, params: { appId: appId } };
  let appCategory, data;
  if (appType.toLowerCase() === CONSTANTS.CERTIFICATION) {
    appCategory =
      UTILS.getEnvVariable(CONSTANTS.APP_TYPE, false) !== undefined
        ? UTILS.getEnvVariable(CONSTANTS.APP_TYPE)
        : CONSTANTS.FIREBOLT; // appType defines in which mode app should be launched
    data = {
      query: JSON.stringify({
        params: {
          [CONSTANTS.APP_ID]: appId,
          [CONSTANTS.APP_TYPE]: appCategory,
        },
      }),
    };
    const messageIntent = {
      action: CONSTANTS.SEARCH,
      data: data,
      context: { source: CONSTANTS.DEVICE },
    };

    requestMap = {
      method: CONSTANTS.DISCOVERY_LAUNCH,
      params: { [CONSTANTS.APP_ID]: appId, [CONSTANTS.INTENT]: messageIntent },
    };
  }
  if (
    Cypress.env(CONSTANTS.TEST_TYPE).toLowerCase() == CONSTANTS.MODULE_NAMES.LIFECYCLEAPI ||
    Cypress.env(CONSTANTS.TEST_TYPE).toLowerCase() == CONSTANTS.MODULE_NAMES.LIFECYCLE
  ) {
    data = {
      query: JSON.stringify({
        params: {
          [CONSTANTS.APP_ID]: appId,
          [CONSTANTS.LIFECYCLE_VALIDATION]: true,
          [CONSTANTS.APP_TYPE]: appCategory,
        },
      }),
    };
    requestMap.params.intent.data = data;
  }

  Cypress.env(CONSTANTS.CURRENT_APP_ID, appId);

  const requestTopic = UTILS.getTopic(appId);
  const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);

  cy.runIntentAddon(CONSTANTS.LAUNCHAPP, requestMap).then((parsedIntent) => {
    cy.log('Discovery launch intent: ' + JSON.stringify(parsedIntent));
    cy.sendMessagetoPlatforms(parsedIntent).then((result) => {
      cy.log('Response from Firebolt platform: ' + JSON.stringify(result));

      // checking the connection status of a third-party app.
      cy.thirdPartyAppHealthcheck(requestTopic, responseTopic).then((healthCheckResponse) => {
        if (healthCheckResponse == CONSTANTS.NO_RESPONSE) {
          throw Error(
            'FCA not launched as 3rd party app or not subscribed to ' +
              requestTopic +
              '. Unable to get healthCheck response from FCA in ' +
              UTILS.getEnvVariable(CONSTANTS.HEALTH_CHECK_RETRIES) +
              ' retries'
          );
        }
        healthCheckResponse = JSON.parse(healthCheckResponse);
        expect(healthCheckResponse.status).to.be.oneOf([CONSTANTS.RESPONSE_STATUS.OK]);
      });
    });
  });
});

/**
 * @module commands
 * @function lifecycleSetup
 * @description Set up lifecycleAppObject to be used as source of truth and application state for lifecycle tests
 * @param {String} appCallSign - The appId used to launch the app which is identified by the firebolt platform servicing the request
 * @param {String} state - Lifecycle state of the application
 * @example
 * cy.lifecycleSetup('foo', 'foreground')
 */
Cypress.Commands.add('lifecycleSetup', (appCallSign, state) => {
  const appId =
    appCallSign == undefined ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID) : appCallSign;

  if (Cypress.env(CONSTANTS.TEST_TYPE) == CONSTANTS.MODULE_NAMES.LIFECYCLE) {
    // create lifecycleAppObject to mimic all the state transition for an app and also go through the same state histories
    const lifeCycleAppObject = new lifeCycleAppConfig(appId);
    // set the state to initialising
    lifeCycleAppObject.setAppObjectState(CONSTANTS.LIFECYCLE_STATES.INITIALIZING);
    // store the lifecycleAppObject in global object and push it to a global list
    Cypress.env(appId, lifeCycleAppObject);
    cy.log('Lifecycle appObject: ' + JSON.stringify(Cypress.env(appId)));
    Cypress.env(CONSTANTS.LIFECYCLE_APP_OBJECT_LIST).push(appId);
    cy.log(
      'Lifecycle appObject list: ' +
        JSON.stringify(Cypress.env(CONSTANTS.LIFECYCLE_APP_OBJECT_LIST))
    );

    if (state == CONSTANTS.LIFECYCLE_STATES.INITIALIZING) {
      Cypress.env(CONSTANTS.APP_LIFECYCLE_HISTORY, []);
    } else {
      if (
        state != CONSTANTS.LIFECYCLE_STATES.UNLOADED &&
        state != CONSTANTS.LIFECYCLE_STATES.FOREGROUND &&
        state != CONSTANTS.LIFECYCLE_STATES.UNLOADING
      ) {
        cy.setAppState(CONSTANTS.LIFECYCLE_STATES.FOREGROUND, appId);
      }
      return cy.log('Setting the app state to ' + state).then(() => {
        return cy.setAppState(state, appId);
      });
    }
  } else {
    // if not a lifecycle test, simply return
    return;
  }
});

/**
 * @module commands
 * @function setLifecycleState
 * @description Send message to platform to set 3rd party app to the specified lifecycle state
 * @param {String} state - State to be set in app
 * @param {String} appId - The appId used to launch the app which is identified by the firebolt platform servicing the request
 * @example
 * setLifecycleState('foreground', 'foo')
 */
Cypress.Commands.add('setLifecycleState', (state, appId) => {
  const requestMap = {
    method: CONSTANTS.REQUEST_OVERRIDE_CALLS.SETLIFECYCLESTATE,
    params: { state: state, appId: appId },
  };
  cy.log('Request map to set lifecycle state: ' + JSON.stringify(requestMap)).then(() => {
    cy.sendMessagetoPlatforms(requestMap).then((result) => {
      if (result !== false) {
        cy.log('Lifecycle state successfully set to ' + state);
      }
    });
  });
});

/**
 * @module commands
 * @function invokeLifecycleApi
 * @description Send message to 3rd party app to invoke lifecycle API
 * @param {String} appId - The appId used to launch the app which is identified by the firebolt platform servicing the request
 * @param {String} method - Method name
 * @param {String} methodParams - Method params if any
 * @example
 * invokeLifecycleApi('foo', 'lifecycle.ready','{}')
 * invokeLifecycleApi('foo', 'lifecycle.ready')
 */
Cypress.Commands.add('invokeLifecycleApi', (appId, method, methodParams = null) => {
  const params = {
    [CONSTANTS.MODE]: CONSTANTS.LIFECYCLE_VALIDATION_METHOD,
    [CONSTANTS.METHOD_NAME]: method,
  };
  if (methodParams) {
    params.methodParams = methodParams;
  }
  const additionalParams = {
    [CONSTANTS.COMMUNICATION_MODE]: UTILS.getCommunicationMode(),
    [CONSTANTS.ACTION]: CONSTANTS.LIFECYCLE_VALIDATION_METHOD,
  };
  const intentMessage = UTILS.createIntentMessage(CONSTANTS.TASK.RUNTEST, params, additionalParams);
  cy.runIntentAddon(CONSTANTS.TASK.RUNTEST, intentMessage).then((parsedIntent) => {
    const requestTopic = UTILS.getTopic(appId);
    const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);
    // Sending message to 3rd party app to invoke lifecycle API
    cy.sendMessagetoApp(requestTopic, responseTopic, parsedIntent).then((response) => {
      try {
        errorObject = JSON.parse(response).report.error;
      } catch (error) {
        cy.log(CONSTANTS.FAILED_TO_PARSE_LIEFECYCLE_ERROR).then(() => {
          assert(false, CONSTANTS.FAILED_TO_PARSE_LIEFECYCLE_ERROR);
        });
        return false;
      }
      if (errorObject) {
        cy.log(CONSTANTS.FAILED_TO_SET_LIFECYCLE_STATE + errorObject).then(() => {
          assert(false, CONSTANTS.FAILED_TO_SET_LIFECYCLE_STATE + errorObject);
        });
        return false;
      }
      return response;
    });
  });
});

/**
 * @module commands
 * @function setAppState
 * @description Set state of 3rd party app as well as state inside appObject to use as source of truth
 * @param {String} state - State to be set
 * @param {Object} appId - The appId used to launch the app which is identified by the firebolt platform servicing the request
 * @example
 * cy.setAppState('foreground', 'foo')
 */
Cypress.Commands.add('setAppState', (state, appId) => {
  // Get the app object corresponding to the appID
  const appObject = Cypress.env(appId);

  // Fetch app history and store in environment variable
  cy.invokeLifecycleApi(appId, CONSTANTS.LIFECYCLE_APIS.HISTORY).then((response) => {
    if (
      response &&
      response.result &&
      response.result._history &&
      response.result._history._value
    ) {
      Cypress.env(CONSTANTS.APP_LIFECYCLE_HISTORY, response.result._history._value);
    } else {
      console.log(CONSTANTS.APP_HISTORY_EMPTY);
    }
  });

  // Get current application state
  const currentAppState = appObject.getAppObjectState() || {};
  if (currentAppState == {}) {
    currentAppState.state = null;
  }

  // Set app and app object state
  switch (state) {
    // Set state to foreground
    case CONSTANTS.LIFECYCLE_STATES.FOREGROUND:
      // TODO: Checks for platform support
      // If current app state is initialising, send lifecycle.ready API call to 3rd party app to bring app to foreground
      if (currentAppState.state == CONSTANTS.LIFECYCLE_STATES.INITIALIZING) {
        appObject.setAppObjectState(CONSTANTS.LIFECYCLE_STATES.INACTIVE);
        cy.invokeLifecycleApi(appId, CONSTANTS.LIFECYCLE_APIS.READY).then((response) => {
          if (response) {
            cy.log(
              CONSTANTS.LIFECYCLE_STATE_SET_SUCCESS +
                state +
                ' ' +
                CONSTANTS.RESPONSE +
                JSON.stringify(response)
            );
          }
          // TODO: Checks for platform support
        });
      } else if (
        // Else, send a discovery.launch call to platform to bring app to foreground
        currentAppState.state != CONSTANTS.LIFECYCLE_STATES.INITIALIZING &&
        currentAppState.state != CONSTANTS.LIFECYCLE_STATES.FOREGROUND
      ) {
        cy.launchApp((appType = CONSTANTS.CERTIFICATION), appId);
      }
      break;

    // Set state to background
    case CONSTANTS.LIFECYCLE_STATES.BACKGROUND:
      // TODO: Checks for platform support
      if (currentAppState.state != CONSTANTS.LIFECYCLE_STATES.BACKGROUND) {
        // If current app state is not background, send message to platform to set app state to background
        cy.setLifecycleState(state, appId);
      }
      break;

    // Set state to inactive
    case CONSTANTS.LIFECYCLE_STATES.INACTIVE:
      // If current app state is suspended, send lifecycle.unsuspend API call to 3rd party app
      if (currentAppState.state == CONSTANTS.LIFECYCLE_STATES.SUSPENDED) {
        // TODO: Checks for platform support
        cy.invokeLifecycleApi(appId, CONSTANTS.LIFECYCLE_APIS.UNSUSPEND).then((response) => {
          if (response) {
            cy.log(
              CONSTANTS.LIFECYCLE_STATE_SET_SUCCESS +
                state +
                ' ' +
                CONSTANTS.RESPONSE +
                JSON.stringify(response)
            );
          }
          // TODO: Checks for platform support
        });
      } else {
        // Else if current app state is not foreground/background, set app state to foreground first to comply with allowed transitions
        if (
          currentAppState.state != CONSTANTS.LIFECYCLE_STATES.FOREGROUND &&
          currentAppState.state != CONSTANTS.LIFECYCLE_STATES.BACKGROUND
        ) {
          cy.setAppState(CONSTANTS.LIFECYCLE_STATES.FOREGROUND, appId);
        }
        // Finally, send message to platform to set app state to inactive
        cy.setLifecycleState(state, appId);
      }
      break;

    default:
      break;
  }
  if (state != CONSTANTS.LIFECYCLE_STATES.INITIALIZING) {
    // Set app object state to provided state
    appObject.setAppObjectState(state);
  }
});
