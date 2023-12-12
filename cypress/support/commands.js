const CONSTANTS = require('./constants/constants');
const { _ } = Cypress
import UTILS from './cypress-support/src/utils';

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
Cypress.Commands.add('getFireboltData', (key) => {
  const fireboltCallsPathFromFCS = CONSTANTS.FIREBOLTCALLS_FROM_FCS;
  const fireboltCallsPathFromConfigModule = CONSTANTS.FIREBOLTCALLS_FROM_CONFIGMODULE;

  // Merging all the json files present in FCS and configModule fireboltCalls folder. 
  cy.mergeJsonfiles(fireboltCallsPathFromFCS).then((fireboltCallsFCSjson) => {
    assert.isNotNull(fireboltCallsFCSjson, 'Expected json data to be defined in fixtures/fireboltCalls/');

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
});

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
Cypress.Commands.add('fireboltDataParser', (key, sdk) => {
  Cypress.env(CONSTANTS.IS_SCENARIO_EXEMPTED, false);
  if (CONSTANTS.SUPPORTED_SDK.includes(sdk)) {
    key = key.replaceAll(' ', '_').toUpperCase();

    // Fetching the firebolt Data contains event name, params and context etc. based on key value.
    cy.getFireboltData(key).then((fireboltData) => {
      let method = fireboltData.method;
      const param = fireboltData.params ? fireboltData.params : CONSTANTS.NO_PARAMS;
      const context = fireboltData.context ? fireboltData.context : CONSTANTS.NO_CONTEXT;
      const expected = fireboltData.expected ? fireboltData.expected : CONSTANTS.RESULT;
      let action = CONSTANTS.ACTION_CORE.toLowerCase();

      // If event contains sdk name splitting it and updating action and event value. Ex: manage_device.name
      if (method && method.includes('_')) {
        action = method.split('_')[0];
        method = method.split('_')[1];
      }

      // Reading the context value based on the context key name.
      cy.testDataHandler(CONSTANTS.CONTEXT, context).then((parsedContext) => {

        // Fetching the Params based on type, If param is object using as-is else fetching it by using testDataHandler.
        cy.fetchParamBasedOnType(param).then((parsedTestData) => {
          return {
            method: method,
            param: parsedTestData,
            context: parsedContext,
            action: action,
            expected: expected
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
                let apiOrEventObject = UTILS.getApiOrEventObjectFromGlobalList(
                  method,
                  context,
                  appId,
                  validationType
                );
                let apiErrorResponse =
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
                let checkErrorMessage = errorContentObject.errorMessage.some((errorMessage) =>
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
            if (!Cypress.env(CONSTANTS.IS_SCENARIO_EXEMPTED)) {
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
Cypress.Commands.add('validateEvent',(extractEventObject, parsedContext, verifyPath, content, appIdentifier) => {
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
        cy.assertValidationsForEvent('Schema Validation Failed', 'FAIL', 'PASS', 'Event Schema Validation');

      } else if (eventSchemaStatus && eventSchemaStatus.status === 'PASS') {

        // Doing event content validation
        if (_.isEqual(eval('extractEventObject.' + verifyPath), content)) {
          cy.logValidationResult(
            JSON.stringify(extractEventObject),
            CONSTANTS.PASS,
            CONSTANTS.PASS,
            CONSTANTS.PASS
          );
          cy.assertValidationsForEvent(extractEventObject, verifyPath, content, 'Event Content validation');

        } else {

          cy.logValidationResult(
            JSON.stringify(extractEventObject),
            CONSTANTS.PASS,
            CONSTANTS.PASS,
            CONSTANTS.FAIL + '. Content validation Failed,' + ' Actual: ' + eventResponse
          );
          cy.assertValidationsForEvent(extractEventObject, verifyPath, content, 'Event Content validation');

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
Cypress.Commands.add('assertValidationsForEvent', (extractEventObject, verifyPath, actual, pretext) => {
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

  cy.log(pretext + 'expected ' + expected + ' to be ' + actual);
  assert.deepEqual(expected, actual, pretext);
});

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
Cypress.Commands.add('logValidationResult',(eventReceived, eventReceivedCheck, schemaCheck, contentCheck) => {

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

      if (response[eventName] === null && expected == 'null') {
        cy.log(
          'Expected event response to be null, since event listener is cleared and no event will be triggered'
        );
      } else if (response.error) {
        assert.isTrue(JSON.stringify(response.error), 'Received error');
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
Cypress.Commands.add('validateResponseErrorAndSchemaResult', (methodOrEventObject, validationType) => {

  if (validationType == CONSTANTS.METHOD) {
    const { response, expected, apiSchemaResult } = methodOrEventObject;

    cy.validationChecksForResponseAndSchemaResult(
      response,
      expected,
      apiSchemaResult,
      (skipSchema = false)
    );

  } else {
    const {expected, eventListenerResponse, eventListenerSchemaResponse} = methodOrEventObject;

    if (expected == CONSTANTS.ERROR) {

      cy.log(
        CONSTANTS.EVENT_ERROR_MSG +
          ': expected ' +
          eventListenerResponse.error +
          ' to be not null'
      ).then(() => {
        cy.log(
          CONSTANTS.EVENT_SCHEMA_MSG +
            ': expected ' +
            eventListenerSchemaResponse.status +
            ' to be ' +
            CONSTANTS.FAIL
        ).then(() => {
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
        CONSTANTS.EVENT_ERROR_MSG +
          ': expected ' +
          eventListenerResponse.error +
          ' to be null'
      ).then(() => {
        cy.log(
          CONSTANTS.EVENT_SCHEMA_MSG +
            ': expected ' +
            eventListenerSchemaResponse.status +
            ' to be ' +
            CONSTANTS.PASS
        ).then(() => {
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
});
