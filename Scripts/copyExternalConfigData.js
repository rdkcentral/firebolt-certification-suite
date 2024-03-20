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
const { execSync } = require('child_process');

console.log('Copying Config TestData into fixtures and Testcases into TestCases/external');

// Config for testCase
const EXTERNAL_DIR_TESTCASE = path.join(__dirname, '..', 'cypress', 'TestCases', 'external');
const CONFIG_DIR_TESTCASE = path.join(__dirname, '..', 'node_modules', 'configModule', 'TestCases');

// Config for testData
const EXTERNAL_DIR_TESTDATA = path.join(__dirname, '..', 'cypress', 'fixtures', 'external');
const CONFIG_DIR_TESTDATA = path.join(__dirname, '..', 'node_modules', 'configModule', 'testData');

// config for config.json

const SOURCE_CONFIG_FILE = path.join(
  __dirname,
  '..',
  'node_modules',
  'configModule',
  'constants',
  'config.json'
);
const DEST_CONFIG_FILE = path.join(__dirname, '..', 'supportConfig.json');

// Function to copy files
function copyFiles(configDir, externalDir) {
  const entries = fs.readdirSync(configDir, { withFileTypes: true });

  // Create externalDir if it doesn't exist
  if (!fs.existsSync(externalDir)) {
    fs.mkdirSync(externalDir, { recursive: true });
  }
  // Copy files from configDir to externalDir
  for (const entry of entries) {
    const srcPath = path.join(configDir, entry.name);
    const destPath = path.join(externalDir, entry.name);

    entry.isDirectory() ? copyFiles(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
  }
}

// Copy testCase files
if (fs.existsSync(CONFIG_DIR_TESTCASE)) {
  copyFiles(CONFIG_DIR_TESTCASE, EXTERNAL_DIR_TESTCASE);
} else {
  console.log('TestCases data is not available in configModule');
}

// Copy testData files
if (fs.existsSync(CONFIG_DIR_TESTDATA)) {
  copyFiles(CONFIG_DIR_TESTDATA, EXTERNAL_DIR_TESTDATA);
} else {
  console.log('TestData is not available in configModule');
}

// Copy config.json file
if (fs.existsSync(SOURCE_CONFIG_FILE)) {
  fs.copyFileSync(SOURCE_CONFIG_FILE, DEST_CONFIG_FILE);
  console.log(`Copied config json from ${SOURCE_CONFIG_FILE} to ${DEST_CONFIG_FILE}`);
} else {
  // Source file does not exist, do nothing
  console.log(`${SOURCE_CONFIG_FILE} config file doesn't exist`);
}
