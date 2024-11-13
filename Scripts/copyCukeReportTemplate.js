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
 * @description This script is resposible for copying specific report template files
 * from a custom template directory to the `multiple-cucumber-html-reporter` node module.
 * This ensures that the custom report templates are used when generating cucumber reports.
 */
const fs = require('fs');
const path = require('path');
const logger = require('../cypress/support/Logger')('copyCukeReportTemplate.js');

// Define the array of template files to be copied with source and destination paths
const FILES_TO_COPY = [
  {
    source: path.join(__dirname, '..', 'reportTemplates', 'scenarios.tmpl'),
    destination: path.join(
      __dirname,
      '..',
      'node_modules',
      'multiple-cucumber-html-reporter',
      'templates',
      'components',
      'scenarios.tmpl'
    ),
  },
  {
    source: path.join(__dirname, '..', 'reportTemplates', 'generic.js'),
    destination: path.join(
      __dirname,
      '..',
      'node_modules',
      'multiple-cucumber-html-reporter',
      'templates',
      'generic.js'
    ),
  },
];

/**
 * @function copyFileIfExist
 * @description Copies a file from the source path to the destination path if both paths exist.
 * Logs an informational message on success or an error message if the file is missing or
 * if the operation fails.
 *
 * @param {string} source - The file path to copy from.
 * @param {string} destination - The file path to copy to.
 */
function copyFileIfExist(source, destination) {
  try {
    // Check if the source file exists
    if (!fs.existsSync(source)) {
      throw new Error(`Report template in FCS: "${source}" does not exist.`);
    }
    // Check if the destination file exists
    if (!fs.existsSync(destination)) {
      throw new Error(`Report template in nodeModules: "${destination}" does not exist.`);
    }
    // Copy the source file to the destination
    fs.copyFileSync(source, destination);
    logger.info(`Copied  Report template from "${source}" to "${destination}"`);
  } catch (error) {
    logger.info('Error:', error.message);
  }
}

// Iterate through each file in FILES_TO_COPY and perform the copy operation
FILES_TO_COPY.forEach((file) => {
  copyFileIfExist(file.source, file.destination);
});
