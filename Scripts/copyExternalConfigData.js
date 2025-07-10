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

fireLog.info('Copying Config fixtures and Testcases into sdkResources/external');

// Check which folder exists: 'resources' or 'Resources' in node_modules/configModule
const CONFIG_RESOURCES_DIR = fs.existsSync(
  path.join(__dirname, '..', 'node_modules', 'configModule', 'resources')
)
  ? path.join(__dirname, '..', 'node_modules', 'configModule', 'resources')
  : path.join(__dirname, '..', 'node_modules', 'configModule', 'Resources');

// Config for sdk resources folder
const EXTERNAL_DIR = path.join(__dirname, '..', 'sdkResources', 'external');
const CONFIG_DIR = path.join(__dirname, '..', 'node_modules', 'configModule', 'sdkResources');
const DEFAULT_DIR = CONFIG_RESOURCES_DIR;
const EXTERNAL_DEFAULT_DIR = path.join(__dirname, '..', 'resources', 'external');

// Config for config.json
const SOURCE_CONFIG_FILE = path.join(
  __dirname,
  '..',
  'node_modules',
  'configModule',
  'constants',
  'config.json'
);
const DEST_CONFIG_FILE = path.join(__dirname, '..', 'supportConfig.json');

// Function to delete directory
function deleteDirectory(directory) {
  if (fs.existsSync(directory)) {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

// Function to copy files
function copyFiles(configDir, externalDir) {
  // Ensure the externalDir is fresh
  deleteDirectory(externalDir);
  fs.mkdirSync(externalDir, { recursive: true });

  const entries = fs.readdirSync(configDir, { withFileTypes: true });

  // Copy files from configDir to externalDir
  for (const entry of entries) {
    const srcPath = path.join(configDir, entry.name);
    const destPath = path.join(externalDir, entry.name);

    entry.isDirectory() ? copyFiles(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
  }
}

// Copy common resources
if (fs.existsSync(DEFAULT_DIR)) {
  copyFiles(DEFAULT_DIR, EXTERNAL_DEFAULT_DIR);
} else {
  fireLog.info('common resources are not available in configModule');
}

// Copy sdk resources
if (fs.existsSync(CONFIG_DIR)) {
  copyFiles(CONFIG_DIR, EXTERNAL_DIR);
} else {
  fireLog.info('sdk resources is not available in configModule');
}

// Copy config.json file
if (fs.existsSync(SOURCE_CONFIG_FILE)) {
  fs.copyFileSync(SOURCE_CONFIG_FILE, DEST_CONFIG_FILE);
  fireLog.info(`Copied config json from ${SOURCE_CONFIG_FILE} to ${DEST_CONFIG_FILE}`);
} else {
  // Source file does not exist, do nothing
  fireLog.info(`${SOURCE_CONFIG_FILE} config file doesn't exist`);
}
