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

const sdkVersion = process.env.sdkVersion;

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

// Clear existing directories
deleteDirectory(fcsTestCasesDir);
deleteDirectory(fcsFixturesDir, 'fireboltJsonVersion');

// Copy TestCases
if (fs.existsSync(sdkTestCasesDir)) {
  copyFiles(sdkTestCasesDir, fcsTestCasesDir);
}
if (fs.existsSync(configTestCasesDir)) {
  const distributorTestCasesDir = path.join(fcsTestCasesDir, 'Distributor');
  copyFiles(configTestCasesDir, distributorTestCasesDir);
} else if (!fs.existsSync(sdkTestCasesDir)) {
  console.log(
    `No TestCases found for sdkVersion '${sdkVersion}' in either sdkResources or external directory`
  );
}

// Copy Fixtures
if (fs.existsSync(sdkFixturesDir)) {
  copyFiles(sdkFixturesDir, fcsFixturesDir);
}
if (fs.existsSync(configFixturesDir)) {
  const distributorFixturesDir = path.join(fcsFixturesDir, 'external');
  copyFiles(configFixturesDir, distributorFixturesDir);
} else if (!fs.existsSync(sdkFixturesDir)) {
  console.log(
    `No Fixtures found for sdkVersion '${sdkVersion}' in either sdkResources or external directory`
  );
}

// Function to copy files and directories
function copyFiles(configDir, externalDir) {
  // Ensure the directory is fresh
  fs.mkdirSync(externalDir, { recursive: true });

  const entries = fs.readdirSync(configDir, { withFileTypes: true });

  // Copy files from sdkDir to fcsDir
  for (const entry of entries) {
    const srcPath = path.join(configDir, entry.name);
    const destPath = path.join(externalDir, entry.name);

    // Skip copying README.md if it already exists in fcsTestCasesDir
    if (entry.name === 'README.md' && fs.existsSync(destPath)) {
      console.log(`Skipping copying README.md as it already exists in ${externalDir}`);
      continue;
    }
    entry.isDirectory() ? copyFiles(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
  }
  // console.log(`Copied contents from ${configDir} to ${externalDir}`);
}

function deleteDirectory(directory, skipfolder) {
  if (fs.existsSync(directory)) {
    const files = fs.readdirSync(directory);
    files.forEach((file) => {
      if (file !== 'README.md' && file !== skipfolder) {
        const filePath = path.join(directory, file);
        fs.rmSync(filePath, { recursive: true, force: true });
      }
    });
  }
}
