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

const { defineConfig } = require('cypress');
const setupNodeEvents = require('./cypress/plugins/index.js');
const reporter = 'mochawesome';

const reporterOptions = {
  reportTitle: 'TestSuiteReport',
  reportPageTitle: 'TestSuiteReport',
  charts: true,
  reportDir: 'cypress/reports',
  overwrite: false,
  html: false,
  json: true,
  timestamp: 'mmddyyyy_HHMMss',
};

const env = {
  deviceIp: '127.0.0.1',
  deviceMac: '',
  default3rdPartyAppId: '',
  deviceCommPort: '3474',
  mock: false,
  wsUrlPath: '456~A',
  firstPartyMockUser: '123~A',
  thirdPartyMockUser: '456~A',
  MFOS_base_url: 'http://localhost:3333/api/v1/',
  firstPartyAppId: 'firstPartyAppId',
  certification: false,
  reportType: 'cucumber',
  deleteReport: false,
  apiObjectList: [],
  eventObjectList: [],
  firebolt_specification_url:
    'https://rdkcentral.github.io/firebolt/requirements/latest/specifications/firebolt-specification.json',
  firebolt_specification_next_url:
    'https://rdkcentral.github.io/firebolt/requirements/next/specifications/firebolt-specification.json',
  firebolt_specification_proposed_url:
    'https://rdkcentral.github.io/firebolt/requirements/proposed/specifications/firebolt-specification.json',
  healthCheckRetries: 8,
  skipContentValidation: false,
  communicationMode: 'SDK',
  performanceMetrics: false,
  generateLocalReport: true,
  testSuite: '',
};

module.exports = {
  e2e: {
    setupNodeEvents,
    env,
    reporterOptions,
    reporter,
    specPattern: '**/Sanity/*.feature', // This will be overridden dynamically, Please refer specHelperConfig.js to update specPattern mapping
    testIsolation: false,
  },
  defaultCommandTimeout: 30000,
  chromeWebSecurity: false, // If intending to disable web security
  video: false,
  screenshotOnRunFailure: false,
};
