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

/*
    Helper script to change the configModule in ../package.json

    Ex Usage: 'node ./changeConfigModule.js "git+ssh://git@github.com:myOrg/myConfigModule'
*/

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const packagePath = path.join(__dirname, '..', 'package.json');

function addOrChangeConfigModule(configModuleUrl) {
  if (fs.existsSync(packagePath)) {
    // Get the existing package.json and its dependencies
    const packageDotJson = require(packagePath);
    const dependencies = packageDotJson?.dependencies;

    // We should have at least one... Fail if we don't find any
    if (!dependencies) {
      throw new Error('Dependencies not found in package.json');
    }

    // Add/override the configModule dependency
    dependencies.configModule = configModuleUrl;
    fs.writeFileSync(packagePath, JSON.stringify(packageDotJson, null, 2));
    console.log('Successfully updated the config module in package.json');
  } else {
    throw new Error('FCS package.json not found at path ' + packagePath);
  }
}

// argv[0] is "node". argv[1] is the path to this file
if (process.argv.length != 3) {
  console.error(
    'Invalid format. Required script format: "node ./changeConfigModule.js <configModuleUrl>"\n' +
      'Ex: "node ./changeConfigModule.js git//git@github.com/myOrg/myConfigModule.git"'
  );
  process.exit(1);
}

console.log('Updating config module to ' + process.argv[2]);
addOrChangeConfigModule(process.argv[2]);

console.log('Installing new configModule');
execSync('yarn install --ignore-scripts', { stdio: 'inherit' });
