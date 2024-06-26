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
import { Given } from '@badeball/cypress-cucumber-preprocessor';
const CONSTANTS = require('../constants/constants');
const _ = require('lodash');
import { apiObject, eventObject } from '../appObjectConfigs';
import UTILS from '../cypress-support/src/utils';

/**
 * @module settersGetterCalls
 * @function Given we test the '(.+)' getters and setters
 * @description Define and cache the fireboltCall object to use for getters and setters scenario by saving the object in env variable.
 * @param {String} key - key name of the fireboltCall setter/getter data.
 * @example
 * Given we test the 'CLOSED_CAPTIONS' getters and setters
 */
Given(/we test the '(.+)' getters and setters$/, async (key) => {
  // Clear any current env.runtime variables
  Cypress.env(CONSTANTS.RUNTIME, {});

  // Look for the firebolt call key in firebolt data
  cy.getFireboltData(key).then((parsedData) => {
    // getFireboltData handles the case where the key is not found
    // Save the object as env.runtime.fireboltCall
    const runtime = { fireboltCall: parsedData };
    Cypress.env(CONSTANTS.RUNTIME, runtime);
  });

});
