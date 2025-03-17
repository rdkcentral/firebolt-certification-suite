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

// commonResources directories
const commonResourcesDir = path.join(__dirname, '..', 'commonResources');
const externalFixturesTarget = path.join(fcsFixturesDir, 'external');
const distributorTestCasesTarget = path.join(fcsTestCasesDir, 'Distributor');

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

// Process commonResources
if (fs.existsSync(commonResourcesDir)) {
  processCommonResources(commonResourcesDir);
} else {
  console.log(`No commonResources directory found.`);
}

/**
 * Function to process commonResources and its subdirectories.
 */
function processCommonResources(baseDir) {
  const entries = fs.readdirSync(baseDir, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(baseDir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'external') {
        // handling for external directory
        processDirectory(entryPath, true);
      } else {
        // Recursively process other subdirectories
        processCommonResources(entryPath);
      }
    } else {
      // Handle file copying for fixtures and TestCases
      if (entryPath.includes('fixtures') || entryPath.includes('commonFixtures')) {
        copyFiles(entryPath, fcsFixturesDir);
      } else if (entryPath.includes('TestCases') || entryPath.includes('commonTestCases')) {
        copyFiles(entryPath, fcsTestCasesDir);
      }
    }
  }
}

/**
 * Recursively process the external directory.
 */
function processDirectory(sourceDir, isExternal = false) {
  if (!fs.existsSync(sourceDir)) return;

  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(sourceDir, entry.name);

    if (entry.isDirectory()) {
      processDirectory(entryPath, isExternal);
    } else {
      // Copy files to specific locations based on type
      if (entryPath.includes('fixtures') || entryPath.includes('commonFixtures')) {
        const targetDir = isExternal ? externalFixturesTarget : fcsFixturesDir;
        fs.mkdirSync(targetDir, { recursive: true });
        const targetPath = path.join(targetDir, entry.name);
        fs.copyFileSync(entryPath, targetPath);
        console.log(`Copied fixture file: ${entryPath} to ${targetPath}`);
      } else if (entryPath.includes('TestCases') || entryPath.includes('commonTestCases')) {
        const targetDir = isExternal ? distributorTestCasesTarget : fcsTestCasesDir;
        fs.mkdirSync(targetDir, { recursive: true });
        const targetPath = path.join(targetDir, entry.name);
        fs.copyFileSync(entryPath, targetPath);
        console.log(`Copied TestCase file: ${entryPath} to ${targetPath}`);
      }
    }
  }
}

/**
 * Function to copy files and directories.
 */
function copyFiles(configDir, externalDir) {
  // Ensure the directory is fresh
  fs.mkdirSync(externalDir, { recursive: true });

  const entries = fs.readdirSync(configDir, { withFileTypes: true });

  // Copy files from configDir to externalDir
  for (const entry of entries) {
    const srcPath = path.join(configDir, entry.name);
    const destPath = path.join(externalDir, entry.name);

    // Skip copying README.md if it already exists
    if (entry.name === 'README.md' && fs.existsSync(destPath)) {
      console.log(`Skipping copying README.md as it already exists in ${externalDir}`);
      continue;
    }
    entry.isDirectory() ? copyFiles(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
  }
  console.log(`Copied contents from ${configDir} to ${externalDir}`);
}

/**
 * Function to delete directories (with exclusions).
 */
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
