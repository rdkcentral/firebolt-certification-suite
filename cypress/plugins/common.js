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
const logger = require('../support/logger')('common.js');

// If "genericSupport" is set to a falsy value (false, null, etc), take no further action. Simply "return"
function genericSupport(config) {
  // Read additional config.
  try {
    const data = JSON.parse(fs.readFileSync('supportConfig.json'));

    // Get the arguments passed from command line during run time.
    const commandLineArgs = Object.entries(config.resolved.env)
      .filter(([key, value]) => value.from === 'cli')
      .reduce((acc, [key, value]) => {
        acc[key] = value.value;
        return acc;
      }, {});

    // The sequence of override - the default config in the config.js file, overriden by supportConfig.json and then by the command line arguments.
    config.env = {
      ...config.env,
      ...data,
      ...commandLineArgs,
    };

    return config;
  } catch (error) {
    logger.error('Received following error while trying to read supportConfig json', error);
    return config;
  }
}

module.exports = {
  genericSupport,
};
