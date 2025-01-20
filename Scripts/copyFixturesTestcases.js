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

const sdkVersion = process.env.sdkVersion || 'latest';

const fcsTestCasesDir = path.join(__dirname, '..', 'cypress', 'TestCases');
const sdkTestCasesDir = path.join(__dirname, '..', 'sdkResources', sdkVersion, 'TestCases');
const configTestCasesDir = path.join(
  __dirname,
  '..',
  'sdkResources',
  'external',
  sdkVersion,
  'TestCases'
);

const fcsFixturesDir = path.join(__dirname, '..', 'cypress', 'fixtures');
const sdkFixturesDir = path.join(__dirname, '..', 'sdkResources', sdkVersion, 'fixtures');
const configFixturesDir = path.join(
  __dirname,
  '..',
  'sdkResources',
  'external',
  sdkVersion,
  'fixtures'
);

copyFiles(sdkTestCasesDir, fcsTestCasesDir);
const distributorDir = path.join(fcsTestCasesDir, 'Distributor');
copyFiles(configTestCasesDir, distributorDir);

copyFiles(sdkFixturesDir, fcsFixturesDir);
const distributorFixturesDir = path.join(fcsFixturesDir, 'external');
copyFiles(configFixturesDir, distributorFixturesDir);

// Function to copy files and directories
function copyFiles(configDir, externalDir) {
  // Ensure the directory is fresh
  deleteDirectory(externalDir);
  fs.mkdirSync(externalDir, { recursive: true });

  const entries = fs.readdirSync(configDir, { withFileTypes: true });

  // Copy files from sdkDir to fcsDir
  for (const entry of entries) {
    const srcPath = path.join(configDir, entry.name);
    const destPath = path.join(externalDir, entry.name);

    entry.isDirectory() ? copyFiles(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
  }
  console.log(`Copied contents from ${configDir} to ${externalDir}`);
}

function deleteDirectory(directory) {
  if (fs.existsSync(directory)) {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}
