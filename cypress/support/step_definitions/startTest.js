import { Given } from '@badeball/cypress-cucumber-preprocessor';
const CONSTANTS = require('../constants/constants');
const { _ } = Cypress;
import { apiObject, eventObject } from '../appObjectConfigs';
import UTILS from '../cypress-support/src/utils';

/**
 * @module StartTestGlue
 * @function And User starts '(.+)' test(?: using below datatable)
 * @description run test using variables used in env json or from datatable
 * @param {String} firecertName - name of the test.
 * @param {String} datatables - Optional. Pass input variable in below format to override default value
 * @example
 * Given User starts 'firebolt certification' test
 * Given User starts 'firebolt certification' test using below datatable
 * | paramType | variableName | value |
 * | INPUT | communicationMode | SDK |
 */
Given(/User starts (.+) test(?: using below datatable)?$/, async (firecertName, datatables) => {
  cy.log('start test code');
  cy.startTest(datatables);
});

/**
 * @module StartTestGlue
 * @function And 1st party app invokes the '(.+)' API to '(.+)'
 * @description send message to platform to make api call.
 * @param {String} sdk - sdk name.
 * @param {String} key - key name of the request data.
 * @example
 * Given 1st party app invokes the 'Firebolt' API to 'get device id'
 */
Given(/1st party app invokes the '(.+)' API to '(.+)'$/, async (sdk, key) => {

  // Fetching the data like method, param, context and action etc.
  cy.fireboltDataParser(key, sdk).then((parsedData) => {
    const method = parsedData.method;
    const param = parsedData.param;
    const context = parsedData.context;
    const action = parsedData.action;
    const expected = parsedData.expected;
    const appId = Cypress.env(CONSTANTS.FIRST_PARTY_APPID);
    const requestMap = {
      method: method,
      param: param,
      action: action,
    };

    cy.log('Call from 1st party App, method: ' + method + ' params: ' + JSON.stringify(param));
    cy.sendMessagetoPlatforms(requestMap).then((result) => {
      cy.log('Response from Firebolt platform: ' + JSON.stringify(result));
      result = JSON.parse(JSON.parse(result));

      // If event and params are not supported setting isScenarioExempted as true for further validation.
      if (isScenarioExempted(method, param)) {
        Cypress.env(CONSTANTS.IS_SCENARIO_EXEMPTED, true);
      }

      // Creating object with event name, params and response etc and storing it in a global list for further validation.
      const apiAppObject = new apiObject(method, param, context, result.report, expected, appId);
      Cypress.env(CONSTANTS.GLOBAL_API_OBJECT_LIST).push(apiAppObject);
    });
  });
});

// Function to check if method and param combination is part of exception list
function isScenarioExempted(method, param) {
  let isInList = false;
  const methodInExceptionList = Cypress.env(CONSTANTS.NOT_SUPPORTED_METHODS).find((object) => {
    if (
      object.hasOwnProperty('param') &&
      object.method.toLowerCase() === method.toLowerCase() &&
      _.isEqual(object.param, param)
    ) {
      return true;
    } else if (
      !object.hasOwnProperty('param') &&
      object.method &&
      object.method.toLowerCase() === method.toLowerCase()
    ) {
      return true;
    } else {
      return false;
    }
  });
  if (methodInExceptionList) {
    isInList = true;
  }
  return isInList;
}

/**
 * @module StartTestGlue
 * @function And '(.+)' invokes the '(.+)' APi to '(.+)'
 * @description send message to 3rd party app to make api call.
 * @param {String} appId - 3rd party app id.
 * @param {String} sdk - sdk name.
 * @param {String} key - key name of the firebolt data contains method/param/context.
 * @example
 * Given '3rd party app' invokes the 'Firebolt' API to 'get device id'
 * Given 'test.test.test' invokes the 'Firebolt' API to 'get device id'
 */
Given(/'(.+)' invokes the '(.+)' API to '(.+)'$/, async (appId, sdk, key) => {

  // Fetching the data like method, param, context and action etc.
  cy.fireboltDataParser(key, sdk).then((parsedData) => {

    // If appId is having '3rd party app' taking default appId else using the value as-is.
    appId = !appId
      ? Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID)
      : appId === CONSTANTS.THIRD_PARTY_APP
      ? Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID)
      : appId;
    const method = parsedData.method;
    const param = parsedData.param;
    const context = parsedData.context;
    const action = parsedData.action;
    const expected = parsedData.expected;
    let isNotSupportedApi = false;

    if (isScenarioExempted(method, param)) {
      isNotSupportedApi = true;
    }

    const communicationMode = UTILS.getCommunicationMode();
    const additionalParams = {
      communicationMode: communicationMode,
      action: action,
      isNotSupportedApi: isNotSupportedApi,
    };
    const params = { method: method, methodParams: param };

    // Creating intent message using above details to send it to 3rd party app.
    const intentMessage = UTILS.createIntentMessage(
      CONSTANTS.TASK.CALLMETHOD,
      params,
      additionalParams
    );

    cy.log(`Call from ${appId}, method: ${method} params: ${JSON.stringify(param)}`);

    // Adding additional details to created intent if any platform specific data is present in configModule.
    cy.runIntentAddon(CONSTANTS.TASK.CALLMETHOD, intentMessage).then((parsedIntent) => {
      const requestTopic = UTILS.getTopic(appId);
      const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);

      // Sending message to 3rd party app.
      cy.sendMessagetoApp(requestTopic, responseTopic, parsedIntent).then((result) => {
        result = JSON.parse(result);
        cy.log(`Response from ${appId}: ${JSON.stringify(result)}`);

        // If method and params are not supported setting isScenarioExempted as true for further validation.
        if (isScenarioExempted(method, param)) {
          Cypress.env(CONSTANTS.IS_SCENARIO_EXEMPTED, true);
        }

        // Creating object with method name, params and response etc and storing it in a global list for further validation.
        const apiAppObject = new apiObject(method, param, context, result.report, expected, appId);
        Cypress.env(CONSTANTS.GLOBAL_API_OBJECT_LIST).push(apiAppObject);
      });
    });
  });
});

/**
 * @module StartTestGlue
 * @function And '(.+)' registers for the '(.+)' event using the '(.+)' API
 * @description send message to 3rd party app to register the events.
 * @param {String} appId - 3rd party app id.
 * @param {String} sdk - sdk name.
 * @param {String} key - key name of the firebolt data contains method/param/context.
 * @example
 * Given '3rd party app' registers for the 'Closed Captions Settings' event using the 'Firebolt' API
 * Given 'test.test.test' registers for the 'Closed Captions Settings' event using the 'Firebolt' API
 */
Given(/'(.+)' registers for the '(.+)' event using the '(.+)' API$/, async (appId, key, sdk) => {

  // Fetching the data like method, param, context and action etc.
  cy.fireboltDataParser(key, sdk).then((parsedData) => {

    // If appId is having '3rd party app' taking default appId else using the value as-is.
    appId = appId = !appId
      ? Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID)
      : appId === CONSTANTS.THIRD_PARTY_APP
      ? Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID)
      : appId;
    const event = parsedData.method;
    const param = parsedData.param;
    const context = parsedData.context ? parsedData.context : CONSTANTS.NO_CONTEXT;
    const action = parsedData.action;
    const expected = parsedData.expected;
    let isNotSupportedApi = false;

    if (isScenarioExempted(event, param)) {
      isNotSupportedApi = true;
    }

    const communicationMode = UTILS.getCommunicationMode();
    const additionalParams = {
      communicationMode: communicationMode,
      action: action,
      isNotSupportedApi: isNotSupportedApi,
    };
    const params = { event: event, params: param };

    // Creating intent message using above details to send it to 3rd party app.
    const intentMessage = UTILS.createIntentMessage(
      CONSTANTS.TASK.REGISTEREVENT,
      params,
      additionalParams
    );

    cy.log(
      `Registering for the ${event} event using ${appId} with params : ${JSON.stringify(param)}`
    );

    cy.runIntentAddon(CONSTANTS.TASK.REGISTEREVENT, intentMessage).then((parsedIntent) => {
      const requestTopic = UTILS.getTopic(appId);
      const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);

      // Sending message to 3rd party app.
      cy.sendMessagetoApp(requestTopic, responseTopic, parsedIntent).then((result) => {
        result = JSON.parse(result);
        cy.log(`Response from ${appId}: ${JSON.stringify(result)}`);

        // If event and params are not supported setting isScenarioExempted as true for further validation.
        if (isScenarioExempted(event, param)) {
          Cypress.env(CONSTANTS.IS_SCENARIO_EXEMPTED, true);
        }

        // Creating object with event name, params and response etc and storing it in a global list for further validation.
        const eventAppObject = new eventObject(event, param, context, result.report, appId, expected);
        Cypress.env(CONSTANTS.GLOBAL_EVENT_OBJECT_LIST).push(eventAppObject);
      });
    });
  });
});


/**
 * @module StartTestGlue
 * @function And 1st party app registers for the '(.+)' event using the '(.+)' API
 * @description send message to platform to register the events.
 * @param {String} sdk - sdk name.
 * @param {String} key - key name of the firebolt data contains method/param/context.
 * @example
 * Given 1st party app registers for the 'Closed Captioning Changed' event using the 'Firebolt' API
 */
Given(/1st party app registers for the '(.+)' event using the '(.+)' API$/, async (key, sdk) => {

  // Fetching the data like method, param, context and action etc.
  cy.fireboltDataParser(key, sdk).then((parsedData) => {
    const event = parsedData.method;
    const param = parsedData.param;
    const context = parsedData.context;
    const action = parsedData.action;
    const expected = parsedData.expected;
    const requestMap = {
      method: event,
      param: param,
      action: action,
      task: CONSTANTS.TASK.REGISTEREVENT,
    };
    const appId = Cypress.env(CONSTANTS.FIRST_PARTY_APPID);
    // Assigning event_param env if param has empty object 
    if (Object.keys(requestMap.param).length === 0) {
      requestMap.param = Cypress.env(CONSTANTS.EVENT_PARAM)
    }
    cy.log(`Registering for the ${event} event using 1st party App with params : ${JSON.stringify(param)}`);

    // Sending the message to platform to register the event.
    cy.sendMessagetoPlatforms(requestMap).then((result) => {
      cy.log('Response from Firebolt platform: ' + JSON.stringify(result));
      if (!(typeof result === 'string')) {
      result = JSON.parse(JSON.parse(result));
      result = result.report
      }

      // If event and params are not supported setting isScenarioExempted as true for further validation.
      if (isScenarioExempted(event, param)) {
        Cypress.env(CONSTANTS.IS_SCENARIO_EXEMPTED, true);
      }

      // Creating object with event name, params and response etc and storing it in a global list for further validation.
      const eventAppObject = new eventObject(event, param, context, result, appId, expected);
      Cypress.env(CONSTANTS.GLOBAL_EVENT_OBJECT_LIST).push(eventAppObject);
    });
  });
});

/**
 * @module StartTestGlue
 * @function And '(.+)' platform responds(:? to '(.+)')? with '(.+)'
 * @description Performing a validation against the source of truth for the given API or Event response
 * @param {String} sdk - name of the sdk.
 * @param {String} appId - The object was retrieved by using the appId.
 * @param {String} key - The key name of the Firebolt data contains method, context, or expected value, etc.
 * @example
 * Given 'Firebolt' platform responds with 'Validate device id'
 * Given 'Firebolt' platform responds to '1st party app' with 'Validate device id'
 * Given 'Firebolt' platform responds to 'test.test.test' with 'Validate device id'
 */
Given(/'(.+)' platform responds(:? to '(.+)')? with '(.+)'$/, async (sdk, appId, key) => {
  if (CONSTANTS.SUPPORTED_SDK.includes(sdk)) {
    key = key.replaceAll(' ', '_').toUpperCase();

    // Fetching the required data for validation.
    cy.getFireboltData(key).then((fireboltData) => {
      const validationType = fireboltData.event ? CONSTANTS.EVENT : CONSTANTS.METHOD;

      const methodOrEvent = fireboltData[validationType];
      const context = fireboltData.context;
      const validationJsonPath = fireboltData.validationJsonPath;
      const expected = fireboltData.expected;
      let expectingError = fireboltData.expectingError;

      // If the app ID is not passed from the feature, the default app ID will be retrieved.
      appId = !appId
        ? Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID)
        : appId === CONSTANTS.FIRST_PARTY_APP
        ? Cypress.env(CONSTANTS.FIRST_PARTY_APPID)
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
        cy.validateResponseErrorAndSchemaResult(methodOrEventObject, validationType).then(() => {
          // If response of the method is not supported, checks in the not supported list for that method name, if it is present then pass else mark it as fail
          if (!Cypress.env("skipContentValidation") && (isScenarioExempted(methodOrEvent, param) || expectingError)) {
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
          } else if(!Cypress.env("skipContentValidation")) {
            const moduleName = UTILS.extractModuleName(expected);

            // If validationType is an event then send a message to the app to retrieve an event response based on the app ID.
            if (validationType == CONSTANTS.EVENT) {
              if (appId === Cypress.env(CONSTANTS.FIRST_PARTY_APPID)) {
                const requestMap = {
                  method: methodOrEventObject.eventObjectId,
                  param: param,
                  task: CONSTANTS.TASK.GETEVENTRESPONSE
                };
            
                cy.sendMessagetoPlatforms(requestMap).then((result) => {
                  result = JSON.parse(JSON.parse(result));
                  cy.saveEventResponse(result.report, methodOrEventObject, methodOrEvent, expected);
                })
              } else {
                const params = { event: methodOrEventObject.eventObjectId };

                // Generating an intent message using the provided information to send it to a third-party app
                const intentMessage = UTILS.createIntentMessage(
                  CONSTANTS.TASK.GETEVENTRESPONSE,
                  params
                );
                const requestTopic = UTILS.getTopic(appId);
                const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);

                cy.sendMessagetoApp(requestTopic, responseTopic, intentMessage).then((response) => {
                  cy.saveEventResponse(response, methodOrEventObject, methodOrEvent, expected);
                });
              }
            }
            try {
              const fixtureFile = CONSTANTS.VALIDATION_OBJECTS_PATH + moduleName + '.json';
              const parsedIdentifier = expected.slice(expected.indexOf('_') + 1);

              cy.getDataFromTestDataJson(fixtureFile, parsedIdentifier).then((contentObject) => {
                if (contentObject && contentObject.validations) {
                  const scenario = contentObject.type;

                  for (let i = 0; i < contentObject.validations.length; i++) {
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
                          contentObject.validations[i].type,
                          validationJsonPath,
                          methodOrEventResponse
                        );
                        break;
                      case CONSTANTS.MISC:
                        // TODO: cy.additionalValidation();
                        break;
                      case CONSTANTS.DECODE:
                        const decodeType = contentObject.specialCase;
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
                          contentObject.validations[i],
                          null
                        );
                        break;
                      case CONSTANTS.FIXTURE:
                        cy.testDataHandler(CONSTANTS.CONTENT, contentObject).then((content) => {
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
                      default:
                        assert(false, 'Unsupported validation type');
                        break;
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
              });
            } catch (error) {
              assert(false, `Unable to validate the response: ${error}`);
            }
          } else {
            cy.log("Content validation is skipped")
          }
        });
      });
    });
  } else {
    assert(false, `${sdk} SDK not Supported`);
  }
});
