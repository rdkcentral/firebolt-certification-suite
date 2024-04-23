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

// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Importing generic module
import * as genericModule from './cypress-support/src/main';
import * as configModule from 'configModule';
import addContext from 'mochawesome/addContext';
import { attach } from '@badeball/cypress-cucumber-preprocessor';
import './cypress-commands/index';
import './validations/index';

configModule.cypressAddons.default();
genericModule.default(configModule); // Question: do i need this if i dont have a configModule? e.g. Mock firebolt? if not i should be allowed to just start genericModule.default()

// Alternatively you can use CommonJS syntax:
// require('./commands')

/**
 * @module index
 * @function addContext
 * @description Cypress command that adds context to the mochawesome report
 * @returns void
 * @example cy.addContext(text)
 */
Cypress.Commands.add('addContext', (context) => {
  cy.once('test:after:run', (test) => addContext({ test }, context));
});

/**
 * @module index
 * @function log
 * @description Cypress command to overwrite log, log and then add to mochawesome report
 * @returns void
 * @example cy.log(text, args)
 */
Cypress.Commands.overwrite('log', (orig, string, options) => {
  orig(string, options);
  const dateString = new Date().toLocaleString().replace(',', '');
  cy.addContext('[' + dateString + '][' + options + ']:[' + JSON.stringify(string) + ']');

  options
    ? attach('[' + dateString + '][' + options + '][' + JSON.stringify(string) + ']')
    : attach('[' + dateString + '][' + JSON.stringify(string) + ']');
});
