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
const winston = require('winston');

const logConfiguration = {
  transports: [
    new winston.transports.Console({
      level: 'debug',
      stderrLevels: [], // Send all levels to stdout
      consoleWarnLevels: [], // Avoid sending warn to stderr too
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss',
    }),
    winston.format.printf((options) => {
      const args = options[Symbol.for('splat')];
      const argsString = args ? ` [${args}]` : '';
      const moduleNameString = options.moduleName ? ` [${options.moduleName}]` : '';
      return `[${options.timestamp}] [${options.level}]${moduleNameString}${argsString}: [${JSON.stringify(options.message) || ''}]`;
    })
  ),
};
const logger = winston.createLogger(logConfiguration);

// Export the logger function
module.exports = function (name) {
  return logger.child({ moduleName: name });
};

// Export the function to update the logger level
module.exports.updateLoggerLevel = function (level) {
  logConfiguration.transports[0].level = level;
  logger.configure(logConfiguration);
};
