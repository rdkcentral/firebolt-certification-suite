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
 * @function Given we test the '(.+)' getters and setters(?: '(.*?)'(?: to '(.*?)')?)?
 * @description Extracting the fireboltCall object based on the key provided from the testcase. This object is saving in to the `runtime` environment variable along with `attribute` and `value`.
 * @param {String} key - key name of the fireboltCall setter/getter data.
 * @param {String} attribute - The attribute to which the value is going to be set (ex. fontFamily).
 * @param {String} value - The value used by the set method to set the value (ex. monospaced_sanserif).
 * @example
 * Given we test the 'CLOSED_CAPTIONS' getters and setters
 * Given we test the 'CLOSED_CAPTIONS' getters and setters 'enabled' to 'true'
 */
Given(
  /we test the '(.+)' getters and setters(?: '(.*?)'(?: to '(.*?)')?)?$/,
  async (key, attribute, value) => {
    // Clear any current env.runtime variables
    Cypress.env(CONSTANTS.RUNTIME, {});

    // Look for the firebolt call key in firebolt data
    cy.getFireboltData(key).then((parsedData) => {
      // getFireboltData handles the case where the key is not found
      // Save the object as env.runtime.fireboltCall
      const runtime = { fireboltCall: parsedData };
      value = UTILS.parseValue(value);
      runtime.attribute = attribute;
      runtime.value = value;
      Cypress.env(CONSTANTS.RUNTIME, runtime);
    });
  }
);

/**
 * @module getterSetterCalls
 * @function Given 1st party app invokes the '(.+)' API to set( invalid)? value
 * @description Sending a message to platform to set a value and `invalid` is a optional parameter that specify whether to expect for an error or a result.
 * @param {String} sdk - sdk name.
 * @param {String} invalidValue - Determines whether expecting for an error or result.
 * @example
 * Given 1st party app invokes the 'Firebolt' API to set
 * Given 1st party app invokes the 'Firebolt' API to set invalid value
 */
Given(
  /1st party app invokes the '(.+)' API to set( invalid)? value$/,
  async (sdk, invalidValue) => {
    cy.getRuntimeFireboltCallObject(sdk).then((fireboltCallObject) => {
      let setMethod;
      let setParams;
      const context = {};
      const expected = invalidValue ? CONSTANTS.ERROR : CONSTANTS.RESULT;
      let action = CONSTANTS.ACTION_CORE.toLowerCase();
      if (UTILS.fireboltCallObjectHasField(fireboltCallObject, CONSTANTS.SET_METHOD)) {
        setMethod = UTILS.resolveRecursiveValues(fireboltCallObject.setMethod);
      }

      // Extracting the parameter from the fireboltCall object
      if (fireboltCallObject?.setParams) {
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
      } else {
        setParams = {};
      }

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
        appId: UTILS.fetchAppIdentifierFromEnv(CONSTANTS.FIRST_PARTY_APP),
      };

      fireLog.info(
        'Call from 1st party App, method: ' + setMethod + ' params: ' + JSON.stringify(setParams)
      );
      cy.sendMessageToPlatformOrApp(CONSTANTS.PLATFORM, additionalParams);
    });
  }
);

/**
 * @module getterSetterCalls
 * @function Given '(.+)' invokes the '(.+)' get API
 * @description Sending a message to platform or 3rd party app to invoke an API and get the value.
 * @param {String} appId - app identifier.
 * @param {String} sdk - sdk name.
 * @example
 * Given '1st party app' invokes the 'Firebolt' get API
 * Given '3rd party app' invokes the 'Firebolt' get API
 * Given 'test_app' invokes the 'Firebolt' get API
 */
Given(/'(.+)' invokes the '(.+)' get API$/, async (appId, sdk) => {
  cy.getRuntimeFireboltCallObject(sdk).then((fireboltCallObject) => {
    const context = {};
    const expected = CONSTANTS.RESULT;
    appId = UTILS.fetchAppIdentifierFromEnv(appId);
    let action = CONSTANTS.ACTION_CORE.toLowerCase();
    let method;
    if (UTILS.fireboltCallObjectHasField(fireboltCallObject, CONSTANTS.METHOD)) {
      method = UTILS.resolveRecursiveValues(fireboltCallObject.method);
    }
    const param = fireboltCallObject.params
      ? UTILS.resolveRecursiveValues(fireboltCallObject.params)
      : {};

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
      fireLog.info(`Call from app: ${appId} - method: ${method} params: ${JSON.stringify(param)}`);
      cy.sendMessageToPlatformOrApp(CONSTANTS.APP, additionalParams);
    }
  });
});

/**
 * @module getterSetterCalls
 * @function Given '(.+)' registers for the '(.+)' event
 * @description Sending a message to platform or third party app to start listening for an event.
 * @param {String} appId - app identifier.
 * @param {String} sdk - sdk name.
 * @example
 * And '3rd party app' registers for the 'Firebolt' event
 * And '1st party app' registers for the 'Firebolt' event
 */
Given(/'(.+)' registers for the '(.+)' event$/, async (appId, sdk) => {
  cy.getRuntimeFireboltCallObject(sdk).then((fireboltCallObject) => {
    let event;
    if (UTILS.fireboltCallObjectHasField(fireboltCallObject, CONSTANTS.EVENT)) {
      event = UTILS.resolveRecursiveValues(fireboltCallObject.event);
    }
    const eventParams = {};
    const context = {};
    appId = UTILS.fetchAppIdentifierFromEnv(appId);
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
      cy.sendMessageToPlatformOrApp(CONSTANTS.APP, additionalParams, CONSTANTS.TASK.REGISTEREVENT);
    }
  });
});

/**
 * @module getterSetterCalls
 * @function Given '(.+)' platform responds to '(.+)' (get|set) API(?: with '(.+)')?
 * @description Performing a validation against the source of truth for the given API response
 * @param {String} sdk - name of the sdk.
 * @param {String} appId - app identifier.
 * @param {String} methodType - Determines the type of method being validated Ex: set or get
 * @param {String} errorContent - Doing error content validation when error content object key passed. Ex: 'INVALID_TYPE_PARAMS'
 * @example
 * And 'Firebolt' platform responds to '1st party app' get API
 * And 'Firebolt' platform responds to '1st party app' set API
 * And 'Firebolt' platform responds to '3rd party app' get API
 * And 'Firebolt' platform responds to '1st party app' set API with 'INVALID_TYPE_PARAMS'
 */
Given(
  /'(.+)' platform responds to '(.+)' (get|set) API(?: with '(.+)')?$/,
  async (sdk, appId, methodType, errorContent) => {
    // Retrieving the dynamic firebolt call object from the env variable
    cy.getRuntimeFireboltCallObject(sdk).then((fireboltCallObject) => {
      let method, validationJsonPath, contentObject;
      const setOrGetMethod = methodType === CONSTANTS.SET ? CONSTANTS.SET_METHOD : CONSTANTS.METHOD;

      // Verifying that the expected field exists in the fireboltCall object; if it does not, the step will fail.
      if (UTILS.fireboltCallObjectHasField(fireboltCallObject, setOrGetMethod)) {
        // Checking whether the value is a function and invoking if it is, otherwise using it as is.
        method = UTILS.resolveRecursiveValues(fireboltCallObject[setOrGetMethod]);
      }

      const setOrGetValidationJsonPath =
        methodType === CONSTANTS.SET ? CONSTANTS.SET_VALIDATIONPATH : CONSTANTS.VALIDATIONJSONPATH;
      if (
        UTILS.fireboltCallObjectHasField(
          fireboltCallObject,
          setOrGetValidationJsonPath,
          errorContent
        )
      ) {
        // Checking whether the value is a function and invoking if it is, otherwise using it as is.
        validationJsonPath = UTILS.resolveRecursiveValues(
          fireboltCallObject[setOrGetValidationJsonPath]
        );
      }

      const setOrGetContentObject =
        methodType === CONSTANTS.SET
          ? CONSTANTS.SET_CONTENT
          : CONSTANTS.CONTENT.toLocaleLowerCase();
      if (
        UTILS.fireboltCallObjectHasField(fireboltCallObject, setOrGetContentObject, errorContent)
      ) {
        // Checking whether the value is a function and invoking if it is, otherwise using it as is.
        contentObject = UTILS.resolveRecursiveValues(fireboltCallObject[setOrGetContentObject]);
      }

      validationJsonPath = validationJsonPath ? validationJsonPath : CONSTANTS.RESULT;

      // Doing content validation for method response
      cy.validateMethodOrEventResponseForDynamicConfig(
        CONSTANTS.METHOD,
        method,
        validationJsonPath,
        contentObject,
        appId,
        errorContent
      );
    });
  }
);

/**
 * @module getterSetterCalls
 * @function Given '(.+)' platform (triggers|does not trigger) '(.*?)' event(?: with '(.+)')?
 * @description Performing a event validation against the source of truth
 * @param {String} sdk - name of the sdk.
 * @param {String} eventExpected - Determines whether the event is expected or not.
 * @param {String} appId - app identifier.
 * @param {String} errorContent - Doing error content validation when error content object key passed. Ex: 'INVALID_TYPE_PARAMS'
 * @example
 * And 'Firebolt' platform triggers '1st party app' event
 * And 'Firebolt' platform triggers '3rd party app' event
 * And 'Firebolt' platform does not trigger '3rd party app' event
 * And 'Firebolt' platform triggers '1st party app' event with 'INVALID_TYPE_PARAMS'
 */
Given(
  /'(.+)' platform (triggers|does not trigger) '(.*?)' event(?: with '(.+)')?$/,
  async (sdk, eventExpected, appId, errorContent) => {
    // Retrieving the dynamic firebolt call object from the env variable
    cy.getRuntimeFireboltCallObject(sdk).then((fireboltCallObject) => {
      let event, eventValidationJsonPath, contentObject;
      if (UTILS.fireboltCallObjectHasField(fireboltCallObject, CONSTANTS.EVENT)) {
        event = UTILS.resolveRecursiveValues(fireboltCallObject.event);
      }

      // Verifying that the expected field exists in the fireboltCall object; if it does not, the step will fail.
      if (
        UTILS.fireboltCallObjectHasField(fireboltCallObject, CONSTANTS.EVENT_VALIDATIONJSONPATH)
      ) {
        // Checking whether the value is a function and invoking if it is, otherwise using it as is.
        eventValidationJsonPath = UTILS.resolveRecursiveValues(
          fireboltCallObject.eventValidationJsonPath
        );
      }

      // Verifying that the expected field exists in the fireboltCall object; if it does not, the step will fail.
      if (
        UTILS.fireboltCallObjectHasField(
          fireboltCallObject,
          CONSTANTS.CONTENT.toLocaleLowerCase(),
          errorContent
        )
      ) {
        // Checking whether the value is a function and invoking if it is, otherwise using it as is.
        contentObject = UTILS.resolveRecursiveValues(fireboltCallObject.content);
      }
      eventValidationJsonPath = eventValidationJsonPath
        ? eventValidationJsonPath
        : CONSTANTS.EVENT_RESPONSE;

      // Doing content validation for event response
      cy.validateMethodOrEventResponseForDynamicConfig(
        CONSTANTS.EVENT,
        event,
        eventValidationJsonPath,
        contentObject,
        appId,
        errorContent,
        eventExpected
      );
    });
  }
);