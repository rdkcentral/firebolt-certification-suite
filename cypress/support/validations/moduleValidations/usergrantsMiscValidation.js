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
const CONSTANTS = require('../../constants/constants');
import UTILS from '../../cypress-support/src/utils';

/**
 * @module usergrantsMiscValidation
 * @function usergrantsMiscValidation
 * @description To validate response of usergrants methods.
 * @param {String} method - Name of api to be validated
 * @param {Object} validationTypeObject - The object consists of required fields for validation.
 * @param {Object} apiOrEventObject - Extracted API or Event object from global list.
 */
export function usergrantsMiscValidation(method, validationTypeObject, apiOrEventObject) {
  if (validationTypeObject && validationTypeObject.specialValidationObject) {
    cy.get(Object.values(validationTypeObject.specialValidationObject)).each((validationObject) => {
      cy.specialValidation(validationObject);
    });
  } else {
    try {
      const appId = apiOrEventObject.app;
      const context = apiOrEventObject.context;
      const methodOrEventObject = UTILS.getApiOrEventObjectFromGlobalList(method, context, appId);
      const userGrantsList = methodOrEventObject.apiResponse.result;
      const pretext = CONSTANTS.METHOD_CONTENT;
      if (validationTypeObject.content) {
        cy.log(
          pretext +
            ` : Usergrants.request expected ${JSON.stringify(userGrantsList)} to equal ${JSON.stringify(validationTypeObject.content)} since no capability is granted or denied and expected empty list`
        ).then(() => {
          assert.equal(
            JSON.stringify(validationTypeObject.content),
            JSON.stringify(userGrantsList),
            `Equal to be`
          );
        });
      } else {
        let capability = methodOrEventObject.params.capability;

        // If capability is not present in methodOrEventObject it's fetching the capability from the Validation object from external repo.
        // Ex: usergrants app and device doesn't contain capability params and usergrants.capability have this param.
        if (!capability) {
          capability = validationTypeObject.capability;
        }
        const role = validationTypeObject.role;
        // Filtering the response based on the capability name
        const filteredList = userGrantsList.filter(
          (capabilityName) => capabilityName.capability == capability
        );
        // Finding object from the filteredlist using role
        if (role) {
          const responseObject = filteredList.find((obj) => obj.role === role);
          assert.exists(responseObject, `No response found for the specified role`);
          if (responseObject) {
            cy.log(
              `UserGrants validation for ${capability}: expected ${responseObject.state} to be ${validationTypeObject.state}`
            ).then(() => {
              assert.equal(validationTypeObject.state, responseObject.state, `Equal to be`);
            });
          }
        }
      }
    } catch (error) {
      assert(false, `Failed to Validate with error : ${error}`);
    }
  }
}
