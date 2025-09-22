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
import UTILS from '../cypress-support/src/utils';
const { fireLog } = require('../cypress-support/src/fireLog');
const { createValidationSkipResponse } = require('../cypress-support/src/validationSkipUtils');

/**
 * @module performanceValidation
 * @function performanceValidation
 * @description Validates performance metrics based on provided validation parameters.
 * @param {Object} object - The object to validate
 * @example
 * cy.performanceValidation({})
 */
Cypress.Commands.add('performanceValidation', (object) => {
  // Check if performance metrics are enabled
  if (UTILS.getEnvVariable(CONSTANTS.PERFORMANCE_METRICS)) {
    // Extract validation params or set defaults
    const type = object.validations?.[0]?.type || 'all';
    const process = object.validations?.[0]?.process || 'required';
    const percentile = object.validations?.[0]?.percentile;
    const threshold = object.validations?.[0]?.threshold;
    // Call fetchPerformanceThreshold to validate performance metrics
    const requestMap = {
      method: CONSTANTS.REQUEST_OVERRIDE_CALLS.PERFORMANCE_THRESHOLD_VALIDATOR,
      params: { type, process, percentile, threshold },
    };

    fireLog.info('Performance validation has started', 'report');
    cy.sendMessagetoPlatforms(requestMap).then((result) => {
      cy.wrap(result)
        .then((response) => {
          if (response && Array.isArray(response)) {
            response.map((res) => {
              fireLog.info(JSON.stringify(res), 'report');
            });
          }
        })
        .then(() => {
          if (result.error) {
            fireLog
              .info('Failed to fetch and validate the performance metrics', 'report')
              .then(() => {
                fireLog.assert(false, result.error);
              });
          } else {
            result.map((response) => {
              fireLog.equal(true, response?.success, response?.message);
            });
          }
        });
      fireLog.info('Performance validation has stopped');
    });
  } else {
    // Performance metrics are disabled
    return createValidationSkipResponse(
      CONSTANTS.VALIDATION_SKIP_CODES.PERFORMANCE_METRICS_DISABLED
    );
  }
});
