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

const logger = require('../../../cypress/support/Logger')('index.js');
/**
 * Helper function to process a report
 * @param {string} reportType - Type of the report
 * @param {object} report - Report data
 * @param {string} jobId - Job ID
 **/
async function processReport(report, jobId, eventEmitter) {
  logger.info(`Event received! Processing report for job ${jobId}.`);
  // Add custom reporting logic here

  eventEmitter.emit('reportProcessed');
}

/**
 * @module reportProcessor
 * @function defaultMethod
 * @description This function process the reports
 * @param eventEmitter - Event instance
 * @example
 * defaultMethod('Event_Instance')
 **/
function defaultMethod(eventEmitter) {
  eventEmitter.on('reports', async (reportObj, jobId) => {
    await processReport(reportObj, jobId, eventEmitter);
  });

  return true;
}

module.exports = { defaultMethod };
