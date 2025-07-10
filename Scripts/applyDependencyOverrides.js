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
// Paths to the relevant package.json files and original package versions file
const fcsPackagePath = path.join(__dirname, '..', 'package.json');
const configModulePath = path.join(__dirname, '..', 'node_modules', 'configModule', 'package.json');
const originalVersionsFile = path.join(__dirname, '..', 'originalPkgVersion.json');
const originalVersions = {};
function readOrInitializeOriginalVersionsFile() {
  if (!fs.existsSync(originalVersionsFile)) {
    fs.writeFileSync(originalVersionsFile, JSON.stringify(originalVersions, null, 2));
    console.debug('Original package versions file created.');
  }
  try {
    const data = fs.readFileSync(originalVersionsFile, 'utf8');
    Object.assign(originalVersions, JSON.parse(data));
  } catch (error) {
    console.error('Error reading original versions file: ' + error.message);
  }
  return originalVersions;
}

function applyDependencyOverrides() {
  if (fs.existsSync(configModulePath)) {
    const configModulePackage = require(configModulePath);

    if (configModulePackage.dependencyOverrides) {
      console.log('Applying dependency overrides...');

      const originalVersions = readOrInitializeOriginalVersionsFile();
      const fcsPackage = JSON.parse(fs.readFileSync(fcsPackagePath, 'utf8'));
      let hasOverrides = false;

      for (const [pkg, version] of Object.entries(configModulePackage.dependencyOverrides)) {
        if (fcsPackage.dependencies && fcsPackage.dependencies[pkg]) {
          console.log(`Overriding ${pkg} to version ${version}...`);
          if (!originalVersions[pkg] && !(pkg in originalVersions)) {
            originalVersions[pkg] = fcsPackage.dependencies[pkg];
            fs.writeFileSync(originalVersionsFile, JSON.stringify(originalVersions, null, 2));
          }
          fcsPackage.dependencies[pkg] = version;
          hasOverrides = true;
        }
      }

      if (hasOverrides) {
        fs.writeFileSync(fcsPackagePath, JSON.stringify(fcsPackage, null, 2));
        console.log('Updated package.json with dependency overrides.');
        // Run yarn install with the updated package.json
        execSync(`yarn install --ignore-scripts`, { stdio: 'inherit' });
        console.debug('Dependency overrides applied.');
      } else {
        console.log('No relevant dependency overrides found.');
      }
    } else {
      console.log('No dependency overrides found.');
    }
  } else {
    console.warn(
      '\x1b[32m%s\x1b[0m',
      'configModule is set to default module. Please add it to your dependencies in package.json if required.'
    );
  }
}

applyDependencyOverrides();
