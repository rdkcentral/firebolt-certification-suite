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
import UTILS, { fireLog } from '../cypress-support/src/utils';
const CONSTANTS = require('../constants/constants');

/**
 * @module getterSetterCalls
 * @function Given we test the '(.+)' getters and setters
 * @description Define and cache the fireboltCall object to use for getters and setters scenario by saving the object in env variable.
 * @param {String} key - key name of the fireboltCall setter/getter data.
 * @example
 * Given we test the 'CLOSED_CAPTIONS' getters and setters
 * Given we test the 'CLOSED_CAPTIONS' getters and setters 'enabled' to 'true'
 */
Given(
  /we test the '(.+)' getters and setters(?: '(.+)' to '(.+)')?$/,
  async (key, attribute, value) => {
    // Clear any current env.runtime variables
    Cypress.env(CONSTANTS.RUNTIME, {});

    // Look for the firebolt call key in firebolt data
    cy.getFireboltData(key).then((parsedData) => {
      // getFireboltData handles the case where the key is not found
      // Save the object as env.runtime.fireboltCall
      const runtime = { fireboltCall: parsedData };
      if (attribute && value) {
        value = UTILS.parseValue(value);
        runtime.attribute = attribute;
        runtime.value = value;
      }
      Cypress.env(CONSTANTS.RUNTIME, runtime);
    });
  }
);

/**
 * @module getterSetterCalls
 * @function 1st party app invokes the '(.+)' API (?:'(.+)' )?to set '(.+)' to( invalid)? '(.+)'
 * @description Sending a message to platform to set a value
 * @param {String} sdk - sdk name.
 * @param {String} fireboltCallKey - key name passed to look for firebolt call object in fireboltCallData.
 * @param {String} attribute - The attribute to which the value is going to be set (ex. fontFamily).
 * @param {String} invalidValue - Determines whether expecting for an error or result.
 * @param {String} value - The value used by the set method to set the value (ex. monospaced_sanserif)
 * @example
 * Given '1st party app' invokes the 'Firebolt' API 'CLOSEDCAPTION_SETTINGS' to set 'enable' to 'true'
 * Given '1st party app' invokes the 'Firebolt' API 'CLOSEDCAPTION_SETTINGS' to set 'enable' to invalid 'test'
 * Given '1st party app' invokes the 'Firebolt' API to set 'enable' to 'true'
 */
Given(
  /1st party app invokes the '(.+)' API (?:'(.+)' )?to set '(.+)' to( invalid)? '(.+)'$/,
  async (sdk, fireboltCallKey, attribute, invalidValue, value) => {
    if (CONSTANTS.SUPPORTED_SDK.includes(sdk)) {
      value = UTILS.parseValue(value);
      let fireboltCallObject;
      let fireboltCallObjectErrorMessage = CONSTANTS.NO_DATA_FOR_THE_KEY + fireboltCallKey;

      if (!UTILS.getEnvVariable(CONSTANTS.RUNTIME, false)) {
        Cypress.env(CONSTANTS.RUNTIME, {});
      }
      let object = UTILS.getEnvVariable(CONSTANTS.RUNTIME);
      object = Object.assign(object, {
        attribute: attribute,
        value: value,
      });

      // Store attribute and value in the runtime environment variable
      Cypress.env(CONSTANTS.RUNTIME, object);

      // When fireboltCall object key passed fetching the object from the fireboltCalls data else reading it from environment variable
      if (fireboltCallKey) {
        cy.getFireboltData(fireboltCallKey).then((fireboltData) => {
          fireboltCallObject = fireboltData;
          cy.wrap(UTILS.getEnvVariable(CONSTANTS.RUNTIME)).then((object) => {
            object.fireboltCall = fireboltData;
            Cypress.env(CONSTANTS.RUNTIME, object);
          });
        });
      } else {
        fireboltCallObject = UTILS.getEnvVariable(CONSTANTS.RUNTIME).fireboltCall;
        fireboltCallObjectErrorMessage =
          'Unable to find the firebolt object in the runtime environment variable';
      }

      cy.then(() => {
        // Failing the test when fireboltCall object not there
        if (!fireboltCallObject) {
          fireLog.assert(false, fireboltCallObjectErrorMessage);
        } else {
          let setMethod = UTILS.resolveRecursiveValues(fireboltCallObject.setMethod);
          let setParams;

          // Extracting the parameter from the fireboltCall object
          if (
            fireboltCallObject.setParams &&
            typeof fireboltCallObject.setParams === CONSTANTS.TYPE_OBJECT
          ) {
            setParams = fireboltCallObject.setParams;

            // Iterating through the object and invoke if it is a function
            for (const key in setParams) {
              if (typeof setParams[key] === CONSTANTS.TYPE_FUNCTION) {
                setParams[key] = setParams[key]();
              }
            }
          } else {
            setParams = { value: UTILS.resolveRecursiveValues(fireboltCallObject.setParams) };
          }

          const context = {};
          const expected = invalidValue ? CONSTANTS.ERROR : CONSTANTS.RESULT;
          let action = CONSTANTS.ACTION_CORE.toLowerCase();

          // Splitting the method name if it contains an underscore and using the first part to determine the action that decides sdk.
          if (setMethod && setMethod.includes('_')) {
            action = setMethod.split('_')[0];
            setMethod = setMethod.split('_')[1];
          }

          const additionalParams = {
            method: setMethod,
            params: setParams,
            context: context,
            action: action,
            expected: expected,
            appId: Cypress.env(CONSTANTS.FIRST_PARTY_APPID),
          };

          fireLog.info(
            'Call from 1st party App, method: ' +
              setMethod +
              ' params: ' +
              JSON.stringify(setParams)
          );
          cy.sendMessageToPlatformOrApp(CONSTANTS.PLATFORM, additionalParams);
        }
      });
    } else {
      fireLog.assert(false, `${sdk} SDK not Supported`);
    }
  }
);

/**
 * @module getterSetterCalls
 * @function '(.+)' invokes the '(.+)' get API(?: '(.+)')
 * @description Sending a message to platform or app to get a value
 * @param {String} appId - app identifier.
 * @param {String} sdk - sdk name.
 * @param {String} fireboltCallKey - key name passed to look for firebolt call object in fireboltCallData.
 * @example
 * Given '1st party app' invokes the 'Firebolt' get API 'CLOSEDCAPTION_SETTINGS'
 * Given '3rd party app' invokes the 'Firebolt' get API 'CLOSEDCAPTION_SETTINGS'
 * Given '3rd party app' invokes the 'Firebolt' get API
 * Given 'test_app' invokes the 'Firebolt' get API 'CLOSEDCAPTION_SETTINGS'
 */
Given(/'(.+)' invokes the '(.+)' get API(?: '(.+)')?$/, async (appId, sdk, fireboltCallKey) => {
  if (CONSTANTS.SUPPORTED_SDK.includes(sdk)) {
    let fireboltCallObject;
    let fireboltCallObjectErrorMessage = CONSTANTS.NO_DATA_FOR_THE_KEY + fireboltCallKey;

    // Creating runtime environment variable, if not present
    if (!UTILS.getEnvVariable(CONSTANTS.RUNTIME, false)) {
      Cypress.env(CONSTANTS.RUNTIME, {});
    }

    // When fireboltCall object key passed fetching the object from the fireboltCalls data else reading it from environment variable
    if (fireboltCallKey) {
      // Fetching fireboltCall object from fireboltCalls data
      cy.getFireboltData(fireboltCallKey).then((fireboltData) => {
        fireboltCallObject = fireboltData;
        cy.wrap(UTILS.getEnvVariable(CONSTANTS.RUNTIME)).then((object) => {
          object.fireboltCall = fireboltData;
          Cypress.env(CONSTANTS.RUNTIME, object);
        });
      });
    } else {
      // Reading fireboltCall object from the environment variable
      fireboltCallObject = UTILS.getEnvVariable(CONSTANTS.RUNTIME).fireboltCall;
      fireboltCallObjectErrorMessage =
        'Unable to find the firebolt object in the runtime environment variable';
    }

    cy.then(() => {
      // Failing the test when fireboltCall object not there
      if (!fireboltCallObject) {
        fireLog.assert(false, fireboltCallObjectErrorMessage);
      } else {
        let method = UTILS.resolveRecursiveValues(fireboltCallObject.method);
        const param = UTILS.resolveRecursiveValues(fireboltCallObject.params);
        console.log('method', method);
        console.log('param', param);

        const context = {};
        const expected = CONSTANTS.RESULT;
        appId =
          appId === CONSTANTS.THIRD_PARTY_APP
            ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
            : appId === CONSTANTS.FIRST_PARTY_APP
              ? UTILS.getEnvVariable(CONSTANTS.FIRST_PARTY_APPID)
              : appId;
        let action = CONSTANTS.ACTION_CORE.toLowerCase();

        // Splitting the method name if it contains an underscore and using the first part to determine the action that decides sdk.
        if (method && method.includes('_')) {
          action = method.split('_')[0];
          method = method.split('_')[1];
        }

        const additionalParams = {
          method: method,
          params: param,
          context: context,
          action: action,
          expected: expected,
          appId: appId,
        };

        if (appId == UTILS.getEnvVariable(CONSTANTS.FIRST_PARTY_APPID)) {
          fireLog.info(
            'Call from 1st party App, method: ' + method + ' params: ' + JSON.stringify(param)
          );
          cy.sendMessageToPlatformOrApp(CONSTANTS.PLATFORM, additionalParams);
        } else {
          if (
            Cypress.env(CONSTANTS.TEST_TYPE) &&
            Cypress.env(CONSTANTS.TEST_TYPE).toLowerCase() == CONSTANTS.MODULE_NAMES.LIFECYCLE
          ) {
            cy.fetchLifecycleHistory(appId);
          }
          fireLog.info(`Call from ${appId}, method: ${method} params: ${JSON.stringify(param)}`);
          cy.sendMessageToPlatformOrApp(CONSTANTS.APP, additionalParams);
        }
      }
    });
  } else {
    fireLog.assert(false, `${sdk} SDK not Supported`);
  }
});

/**
 * @module getterSetterCalls
 * @function '(.+)' registers for the '(.*?)'(?: '(.*?)')? event
 * @description Sending a message to platform or app to register an event
 * @param {String} appId - app identifier.
 * @param {String} sdk - sdk name.
 * @param {String} fireboltCallKey - key name passed to look for firebolt call object in fireboltCallData.
 * @example
 * And '1st party app' registers for the 'Firebolt' 'CLOSEDCAPTION_SETTINGS' event
 * And '3rd party app' registers for the 'Firebolt' 'CLOSEDCAPTION_SETTINGS' event
 * And '1st party app' registers for the 'Firebolt' event
 */
Given(
  /'(.+)' registers for the '(.*?)'(?: '(.*?)')? event$/,
  async (appId, sdk, fireboltCallKey) => {
    if (CONSTANTS.SUPPORTED_SDK.includes(sdk)) {
      let fireboltCallObject;
      let fireboltCallObjectErrorMessage = CONSTANTS.NO_DATA_FOR_THE_KEY + fireboltCallKey;

      // Creating runtime environment variable
      if (!UTILS.getEnvVariable(CONSTANTS.RUNTIME, false)) {
        Cypress.env(CONSTANTS.RUNTIME, {});
      }

      // When fireboltCall object key passed fetching the object from the fireboltCalls data else reading it from environment variable
      if (fireboltCallKey) {
        // Fetching fireboltCall object from fireboltCalls data
        cy.getFireboltData(fireboltCallKey).then((fireboltData) => {
          fireboltCallObject = fireboltData;
          cy.wrap(UTILS.getEnvVariable(CONSTANTS.RUNTIME)).then((object) => {
            object.fireboltCall = fireboltData;
            Cypress.env(CONSTANTS.RUNTIME, object);
          });
        });
      } else {
        // Reading fireboltCall object from the environment variable
        fireboltCallObject = UTILS.getEnvVariable(CONSTANTS.RUNTIME).fireboltCall;
        fireboltCallObjectErrorMessage =
          'Unable to find the firebolt object in the runtime environment variable';
      }

      cy.then(() => {
        // Failing the test when fireboltCall object not there
        if (!fireboltCallObject) {
          fireLog.assert(false, fireboltCallObjectErrorMessage);
        } else {
          let event = UTILS.resolveRecursiveValues(fireboltCallObject.event);
          const eventParams = {};
          const context = {};
          appId =
            appId === CONSTANTS.THIRD_PARTY_APP
              ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
              : appId === CONSTANTS.FIRST_PARTY_APP
                ? Cypress.env(CONSTANTS.FIRST_PARTY_APPID)
                : appId;
          let action = CONSTANTS.ACTION_CORE.toLowerCase();

          // Splitting the method name if it contains an underscore and using the first part to determine the action that decides sdk.
          if (event && event.includes('_')) {
            action = event.split('_')[0];
            event = event.split('_')[1];
          }

          const additionalParams = {
            method: event,
            params: eventParams,
            context: context,
            action: action,
            expected: CONSTANTS.RESULT,
            appId: appId,
          };
          if (appId == UTILS.getEnvVariable(CONSTANTS.FIRST_PARTY_APPID)) {
            fireLog.info(
              `Registering for the ${event} event using 1st party App with params : ${JSON.stringify(
                eventParams
              )}`
            );
            cy.sendMessageToPlatformOrApp(
              CONSTANTS.PLATFORM,
              additionalParams,
              CONSTANTS.TASK.REGISTEREVENT
            );
          } else {
            fireLog.info(
              `Registering for the ${event} event using ${appId} with params : ${JSON.stringify(eventParams)}`
            );
            cy.sendMessageToPlatformOrApp(
              CONSTANTS.APP,
              additionalParams,
              CONSTANTS.TASK.REGISTEREVENT
            );
          }
        }
      });
    } else {
      fireLog.assert(false, `${sdk} SDK not Supported`);
    }
  }
);

/**
 * @module getterSetterCalls
 * @function And '(.+)' platform responds to '([^']*)'(?: '([^']*)')? (get|set) API(?: with '(.+)')?
 * @description Performing a validation against the source of truth for the given API response
 * @param {String} sdk - name of the sdk.
 * @param {String} appId - app identifier.
 * @param {String} fireboltCallKey - key name passed to look for firebolt call object in fireboltCallData Json.
 * @param {String} methodType - Determines the type of method being validated Ex: set or get
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
        fireboltCallObject = UTILS.getEnvVariable(CONSTANTS.RUNTIME).fireboltCall;
      }

      cy.then(() => {
        let method =
          methodType === CONSTANTS.SET
            ? UTILS.resolveRecursiveValues(fireboltCallObject.setMethod)
            : UTILS.resolveRecursiveValues(fireboltCallObject.method);

        let validationJsonPath =
          methodType === CONSTANTS.SET
            ? UTILS.resolveRecursiveValues(fireboltCallObject.setValidationJsonPath)
            : UTILS.resolveRecursiveValues(fireboltCallObject.validationJsonPath);

        let contentObject =
          methodType === CONSTANTS.SET
            ? UTILS.resolveRecursiveValues(fireboltCallObject.setContent)
            : UTILS.resolveRecursiveValues(fireboltCallObject.content);

        method = method.includes('_') ? method.split('_')[1] : method;
        contentObject = contentObject ? contentObject : CONSTANTS.NULL_RESPONSE;
        validationJsonPath = validationJsonPath ? validationJsonPath : CONSTANTS.RESULT;

        if (expectingError) {
          contentObject = UTILS.getEnvVariable(CONSTANTS.ERROR_CONTENT_VALIDATIONJSON)[
            errorContent
          ];
        }
        const additionalParams = {
          method: method,
          context: context,
          validationJsonPath: validationJsonPath,
          contentObject: contentObject,
          expectingError: expectingError,
          appId: appId,
        };
        if (!Cypress.env(CONSTANTS.SKIPCONTENTVALIDATION)) {
          cy.methodorEventResponseValidation(CONSTANTS.METHOD, additionalParams);
        } else {
          cy.log(
            `${CONSTANTS.SKIPCONTENTVALIDATION} flag is enabled, Skipping the Content validation`
          );
        }
      });
    } else {
      assert(false, `${sdk} SDK not Supported`);
    }
  }
);

/**
 * @module getterSetterCalls
 * @function And '(.+)' platform (triggers|does not trigger) '(.*?)'(?: '(.*?)')? event(?: with '(.+)')?
 * @description Performing a event validation against the source of truth
 * @param {String} sdk - name of the sdk.
 * @param {String} eventExpected - Determines whether the event is expected or not.
 * @param {String} appId - app identifier.
 * @param {String} fireboltCallKey - key name passed to look for firebolt call object in fireboltCallData Json.
 * @param {String} errorContent - Doing error content validation when error content object key passed. Ex: 'INVALID_TYPE_PARAMS'
 * @example
 * And 'Firebolt' platform triggers '1st party app' 'CLOSEDCAPTION_SETTINGS' event
 * And 'Firebolt' platform triggers '1st party app' event
 * And 'Firebolt' platform triggers '3rd party app' 'CLOSEDCAPTION_SETTINGS' event
 * And 'Firebolt' platform does not trigger '3rd party app' 'CLOSEDCAPTION_SETTINGS' event
 * And 'Firebolt' platform triggers '1st party app' event
 * And 'Firebolt' platform triggers '1st party app' 'CLOSEDCAPTION_SETTINGS' event with 'INVALID_TYPE_PARAMS'
 */
Given(
  /'(.+)' platform (triggers|does not trigger) '(.*?)'(?: '(.*?)')? event(?: with '(.+)')?$/,
  async (sdk, eventExpected, appId, fireboltCallKey, errorContent) => {
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
        fireboltCallObject = UTILS.getEnvVariable(CONSTANTS.RUNTIME).fireboltCall;
      }

      cy.then(() => {
        let event = UTILS.resolveRecursiveValues(fireboltCallObject.event);
        let eventValidationJsonPath = UTILS.resolveRecursiveValues(
          fireboltCallObject.eventValidationJsonPath
        );
        let contentObject = UTILS.resolveRecursiveValues(fireboltCallObject.content);

        // Extract the event name
        event = event.includes('_') ? event.split('_')[1] : event;
        contentObject = contentObject ? contentObject : CONSTANTS.NULL_RESPONSE;
        eventValidationJsonPath = eventValidationJsonPath
          ? eventValidationJsonPath
          : CONSTANTS.EVENT_RESPONSE;

        if (expectingError) {
          contentObject = UTILS.getEnvVariable(CONSTANTS.ERROR_CONTENT_VALIDATIONJSON)[
            errorContent
          ];
        }
        const additionalParams = {
          method: event,
          context: context,
          validationJsonPath: eventValidationJsonPath,
          contentObject: contentObject,
          expectingError: expectingError,
          appId: appId,
          eventExpected: eventExpected,
        };
        if (!Cypress.env(CONSTANTS.SKIPCONTENTVALIDATION)) {
          cy.methodorEventResponseValidation(CONSTANTS.EVENT, additionalParams);
        } else {
          cy.log(
            `${CONSTANTS.SKIPCONTENTVALIDATION} flag is enabled, Skipping the Content validation`
          );
        }
      });
    } else {
      assert(false, `${sdk} SDK not Supported`);
    }
  }
);
