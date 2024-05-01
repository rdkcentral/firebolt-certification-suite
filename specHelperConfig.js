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

const logger = require('./cypress/support/logger')('specHelperConfig.js');

/**
@function getSpecPattern
@description Retrieves the appropriate spec pattern based on the provided testSuite.
@param {String} testSuite - Name of the API to be validated.
@returns {Array} Array containing the spec pattern(s) based on the provided testSuite.
*/

function getSpecPattern(testSuite) {
  const patterns = {
    module: [
      '**/FireboltCertification/*.feature',
      '**/FireboltCertification/*/*.feature',
      '**/Distributor/*.feature',
      '**/Distributor/*/*.feature',
    ],
    certification: '**/Sanity/*.feature',
    sample: '**/Sample/*.feature',
    all: '**/*.feature',
  };
  // Convert testSuite to lowercase and trim whitespace
  const trimmedTestSuite = testSuite ? testSuite.trim().toLowerCase() : null;

  // If testSuite is null or empty, do nothing, return undefined
  if (!trimmedTestSuite || !patterns[trimmedTestSuite]) {
    logger.error(`Test suite '${testSuite}' not found in patterns. Defaulting to '**/*.feature'.`);
    return undefined;
  }

  // Otherwise, return the corresponding pattern
  return patterns[trimmedTestSuite];
}

module.exports = getSpecPattern;
