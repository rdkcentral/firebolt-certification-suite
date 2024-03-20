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

// Paths to the relevant package.json files and temporary backup
const fcsPackagePath = path.join(__dirname, '..', 'package.json');
const configModulePath = path.join(__dirname, '..', 'node_modules', 'configModule', 'package.json');
const tmpPackagePath = path.join(__dirname, '..', 'tmp_package.json');

function applyDependencyOverrides() {
  if (fs.existsSync(configModulePath)) {
    const configModulePackage = require(configModulePath);

    if (configModulePackage.dependencyOverrides) {
      console.log('Applying dependency overrides...');

      // Backup the original package.json
      fs.copyFileSync(fcsPackagePath, tmpPackagePath);
      const fcsPackage = JSON.parse(fs.readFileSync(fcsPackagePath, 'utf8'));
      let hasOverrides = false;

      for (const [pkg, version] of Object.entries(configModulePackage.dependencyOverrides)) {
        if (fcsPackage.dependencies && fcsPackage.dependencies[pkg]) {
          console.log(`Overriding ${pkg} to version ${version}...`);
          fcsPackage.dependencies[pkg] = version;
          hasOverrides = true;
        }
      }

      if (hasOverrides) {
        fs.writeFileSync(fcsPackagePath, JSON.stringify(fcsPackage, null, 2));
        console.log('Updated package.json with dependency overrides.');

        // Run yarn install with the updated package.json
        execSync(`yarn install --ignore-scripts`, { stdio: 'inherit' });
        console.log('Dependency overrides applied.');
      } else {
        console.log('No relevant dependency overrides found.');
      }

      // Revert to the original package.json
      fs.copyFileSync(tmpPackagePath, fcsPackagePath);
      fs.unlinkSync(tmpPackagePath);
      console.log('Reverted to the original package.json.');
    } else {
      console.log('No dependency overrides found.');
    }
  } else {
    console.warn(
      '\x1b[32m%s\x1b[0m',
      'configModule is not found. Please add it to your dependencies in package.json if required.'
    );
  }
}

applyDependencyOverrides();
