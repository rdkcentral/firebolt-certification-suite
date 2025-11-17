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

console.log('Copying external runtime scripts');

const CONFIG_SCRIPTS_DIR = path.resolve(
  __dirname,
  '../node_modules/configModule/Scripts/generateFeature.js'
);
const EXTERNAL_SCRIPTS_DIR = path.resolve(__dirname, 'external');
const EXTERNAL_SCRIPTS_FILE = path.join(EXTERNAL_SCRIPTS_DIR, 'generateFeature.mjs');

if (fs.existsSync(CONFIG_SCRIPTS_DIR)) {
  if (!fs.existsSync(EXTERNAL_SCRIPTS_DIR)) {
    fs.mkdirSync(EXTERNAL_SCRIPTS_DIR, { recursive: true });
    console.log(`Created directory: ${EXTERNAL_SCRIPTS_DIR}`);
  }

  fs.copyFileSync(CONFIG_SCRIPTS_DIR, EXTERNAL_SCRIPTS_FILE);
  console.log(`External script copied to ${EXTERNAL_SCRIPTS_FILE}`);

  import(EXTERNAL_SCRIPTS_FILE)
    .then((externalScript) => {
      if (externalScript && externalScript.dispatcher) {
        const flags = process.env.DYNAMIC_FEATURE_FILE_FLAGS || '';
        if (flags) {
          externalScript.dispatcher(flags);
        } else {
          console.log(
            'No FEATURE_FLAGS provided in environment variables. Skipping dynamic feature generation.'
          );
        }
      } else {
        console.log('No executable functions found in external runtime scripts.');
      }
    })
    .catch((err) => {
      console.error('Failed to import external runtime script:', err);
    });
} else {
  console.log('No external runtime scripts found.');
}
