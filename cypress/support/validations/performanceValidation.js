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
const UTILS = require('../cypress-support/src/utils');

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

    UTILS.fireLog.info('Performance validation has started');
    cy.sendMessagetoPlatforms(requestMap).then((result) => {
      UTILS.fireLog('Performance validation has completed');
      result.map((response) => {
        UTILS.fireLog(JSON.stringify(response));
      })
      if (result.error) {
        cy.log('Failed to fetch and validate the performance metrics').then(() => {
          assert(false, result.error);
        });
      } else {
        result.map((response) => {
          cy.log(response.message).then(() => {
            assert.equal(true, response?.success, response?.message);
          });
        });
      }
    });
  } else {
    fireLog.info('PerformanceMetrics are disabled.');
  }
});
