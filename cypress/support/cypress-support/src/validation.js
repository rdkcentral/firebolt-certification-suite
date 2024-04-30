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
const JSON_PATH_VALIDATOR = require('jsonpath');
const logger = require('../../logger')("validation.js");

class Validation {
  constructor(validationModule) {
    this.validationModule = validationModule;
  }

  /*
   * @module validation
   * @function validateJSON
   * @description validate given jsonpath from the string.
   * @param {*} jsonString - json string
   * @param {*} jsonPath - json query path to get validate data from json string
   * @example
   * cy.validateJSON('[{"name": "London", "population": 8615246 }, { "name": "Berlin", "population": 3517424 }]', "$..name")
   */
  validateJSON(jsonString, jsonPath) {
    // setting default response to response, it may change in case of failure
    const response = { status: true, message: '' };
    if (!jsonString || !jsonPath) {
      response.status = false;
      response.message = 'Either json string or json path cannot be empty';
      return response;
    }
    const queryResponseArray = JSON_PATH_VALIDATOR.query(jsonString, jsonPath);
    logger.debug('jsonpath response: ', queryResponseArray,'validateJSON');
    if (queryResponseArray.length === 0) {
      response.status = false;
      response.message = 'Invalid JSON Path: ' + jsonPath;
    }
    return response;
  }

  /**
   * @module validation
   * @function validateCustom
   * @description validate custom method inside module and return the response
   * @param {*} jsonString - should contain json string
   * @param {*} openRPCModuleMethod - should be Firebolt Module and Method as "<Module.Method>"
   * @param {*} customValidatorName - name of a custom validator.
   * @example
   * validateCustom("<JSON>", "Module.Method", "validationOne")
   */
  validateCustom(jsonString, openRPCModuleMethod, customValidatorName) {
    const response = { status: false, message: '' };
    // If validation module is invalid or absent
    if (
      this.validationModule === null ||
      this.validationModule === undefined ||
      !this.validationModule
    ) {
      response.message = 'Invalid validation module. Pass an appropriate validation module';
      return response;
    }
    // openRPC method format <module>.<method>
    const openRPCModuleMethodArray = openRPCModuleMethod.split('.');
    if (openRPCModuleMethodArray.length !== 2) {
      response.message = "Invalid module/method. Expected format '<Module.Method>'";
      return response;
    }
    const moduleName = openRPCModuleMethodArray[0];
    const methodName = openRPCModuleMethodArray[1];
    const getModule = this.validationModule[moduleName];
    if (getModule) {
      // check if method name exists and get custom functions inside given method
      const getValidatorFunction = getModule[methodName];
      if (getValidatorFunction) {
        // check if validator name exists and is a function.
        const getMethodFn = getValidatorFunction[customValidatorName];
        if (getMethodFn) {
          response.status = getMethodFn(jsonString);
          if (response.status === false) {
            response.message = 'Validation Failed';
          }
          // return false with messge if response is false, else return true
          return response;
        }
        response.message = `Validator ${customValidatorName} not found`;
        return response;
      }
      response.message = `Method ${methodName} not found`;
    } else {
      response.message = `Module ${moduleName} not found`;
    }
    return response;
  }
}
module.exports = Validation;
