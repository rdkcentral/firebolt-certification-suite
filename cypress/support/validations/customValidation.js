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

/**
 * @module customValidation
 * @function customValidation
 * @description Command to execute the custom validations in configModule
 * @param {*} functionName - The name of custom validation function
 * @param {*} apiOrEventObject - The response of the method or event
 * @example
 * cy.customValidation("customMethod1","apiResponseObject")
 */

Cypress.Commands.add('customValidation', (fcsValidationObjectData, apiOrEventObject) => {
  // to check whether validationObject has assertionDef as the field
  if (fcsValidationObjectData && fcsValidationObjectData.assertionDef) {
    const functionName = fcsValidationObjectData.assertionDef;
    // to check whether config module has customValidations function
    if (module && module.customValidations) {
      // to check whether customValidations has a function as the functionName passed
      if (
        module.customValidations[functionName] &&
        typeof module.customValidations[functionName] === 'function'
      ) {
        message = module.customValidations[functionName](fcsValidationObjectData, apiOrEventObject);
      } else if (
        // if customValidations doesn't have a function as the functionName passed
        !module.customValidations[functionName] ||
        typeof module.customValidations[functionName] != 'function'
      ) {
        assert(
          false,
          `Expected customValidationMethod ${functionName} was not found in the validationFunctions file.`
        );
      }
    } else {
      // if config module doesn't have customValidations function
      assert(
        false,
        `Expected customValidationMethod ${functionName} was not found in the validationFunctions file.`
      );
    }
  } else {
    // if config module doesn't have customValidations function
    assert(false, `Expected customValidationMethod was not found in the validationObject.`);
  }
});
