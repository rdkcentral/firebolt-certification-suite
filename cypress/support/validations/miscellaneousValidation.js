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
import UTILS from '../cypress-support/src/utils';
import CONSTANTS from '../constants/constants';
import { deviceMiscValidation } from './moduleValidations/deviceMiscValidation';
import { advertisingMiscValidation } from './moduleValidations/advertisingMiscValidation';
import { parametersMiscValidation } from './moduleValidations/parametersMiscValidation';
import { lifecycleMiscValidation } from './moduleValidations/lifecycleMiscValidation';
import { capabilitiesMiscValidation } from './moduleValidations/capabilitiesMiscValidation';
import { usergrantsMiscValidation } from './moduleValidations/usergrantsMiscValidation';

/**
 * @module miscellaneousValidation
 * @function miscellaneousValidation
 * @description To validate content for specific APIs where the content is dynamic and depends on the platform.
 * @param {String} method - Name of api to be validated
 * @param {Object} validationTypeObject - The object consists of required fields for validation.
 * @param {Object} apiOrEventObject - Extracted API or Event object from global list.
 * @example
 * cy.miscellaneousValidation('device.verion',  {"mode": "fixture", "type": "APIVERSION", "description": "Validation of the Device version  API Format"},{response:{result: '', error: null, ...}});
 */
Cypress.Commands.add(
  'miscellaneousValidation',
  (method, validationTypeObject, apiOrEventObject) => {
    const moduleName = UTILS.extractModuleName(method);

    switch (moduleName) {
      case CONSTANTS.MODULE_NAMES.DEVICE:
        deviceMiscValidation(method, validationTypeObject, apiOrEventObject);
        break;
      case CONSTANTS.MODULE_NAMES.ADVERTISING:
        advertisingMiscValidation(method, validationTypeObject, apiOrEventObject);
        break;
      case CONSTANTS.MODULE_NAMES.PARAMETERS:
        parametersMiscValidation(method, validationTypeObject, apiOrEventObject);
        break;
      case CONSTANTS.MODULE_NAMES.LIFECYCLE:
        lifecycleMiscValidation(method, validationTypeObject, apiOrEventObject);
        break;
      case CONSTANTS.MODULE_NAMES.CAPABILITIES:
        capabilitiesMiscValidation(method, validationTypeObject, apiOrEventObject);
        break;
      case CONSTANTS.MODULE_NAMES.USERGRANTS:
        usergrantsMiscValidation(method, validationTypeObject, apiOrEventObject);
        break;
    }
  }
);
