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
const fs = require('fs');
const path = require('path');
const logger = require('../cypress/support/Logger')('copyCukeReportTemplate.js');
const SOURCE_REPORT_TEMPLATE = path.join(__dirname, '..', 'reportTemplates', 'scenarios.tmpl');
const DEST_REPORT_TEMPLATE = path.join(
  __dirname,
  '..',
  'node_modules',
  'multiple-cucumber-html-reporter',
  'templates',
  'components',
  'scenarios.tmpl'
);

// Function to copy file with error handling
function copyFileIfExist(source, destination) {
  try {
    if (!fs.existsSync(source)) {
      throw new Error(`Report template in FCS: "${source}" does not exist.`);
    }
    if (!fs.existsSync(destination)) {
      throw new Error(`Report template in nodeModules: "${destination}" does not exist.`);
    }
    fs.copyFileSync(source, destination);
    logger.info(`Copied  Report template from "${source}" to "${destination}"`);
  } catch (error) {
    logger.info('Error:', error.message);
  }
}

// Copy report template file
copyFileIfExist(SOURCE_REPORT_TEMPLATE, DEST_REPORT_TEMPLATE);
