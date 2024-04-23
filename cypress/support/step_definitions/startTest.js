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
const { _ } = Cypress;
import { apiObject, eventObject } from '../appObjectConfigs';
import UTILS from '../cypress-support/src/utils';

/**
 * @module StartTestGlue
 * @function And User starts '(.+)' test(?: using below datatable)
 * @description run test using variables used in env json or from datatable
 * @param {String} firecertName - name of the test.
 * @param {String} datatables - Optional. Pass input variable in below format to override default value
 * @example
 * Given User starts 'firebolt certification' test
 * Given User starts 'firebolt certification' test using below datatable
 * | paramType | variableName | value |
 * | INPUT | communicationMode | SDK |
 */
Given(/User starts (.+) test(?: using below datatable)?$/, async (firecertName, datatables) => {
  cy.log('start test code');
  cy.startTest(datatables);
});

/**
 * @module StartTestGlue
 * @function Set default values of platform
 * @description set the default values specified in PreRequisiteData.json to api's
 */
Given(/Set default values of platform/, () => {
  let combinedData;

  // Reading the preRequisite data from the external config module
  cy.task('readFileIfExists', CONSTANTS.EXTERNAL_PREREQUISITE_DATA).then(
    (externalPreRequisiteData) => {
      cy.fixture(CONSTANTS.PREREQUISITE_DATA).then((fcsPreRequisiteData) => {
        if (fcsPreRequisiteData && fcsPreRequisiteData.defaultValues) {
          combinedData = fcsPreRequisiteData.defaultValues;

          // If external preRequisite data is present, combining with the FCS preRequisite data.
          if (externalPreRequisiteData && JSON.parse(externalPreRequisiteData).defaultValues) {
            externalPreRequisiteData = JSON.parse(externalPreRequisiteData);
            combinedData = Array.from(
              new Set(
                externalPreRequisiteData.defaultValues.concat(fcsPreRequisiteData.defaultValues)
              )
            );
          }

          // Looping through each data and setting the default value in platform.
          combinedData.forEach((preRequisiteData) => {
            cy.fireboltDataParser(preRequisiteData).then((parsedDataArr) => {
              parsedDataArr.forEach((parsedData) => {
                const { method, params, action } = parsedData;
                const requestMap = {
                  method: method,
                  params: params,
                  action: action,
                };
                cy.log(
                  'Call from 1st party App, method: ' +
                    method +
                    ' params: ' +
                    JSON.stringify(params)
                );
                cy.sendMessagetoPlatforms(requestMap).then((result) => {
                  cy.log('Response from Firebolt platform: ' + JSON.stringify(result));
                });
              });
            });
          });
        } else {
          assert(false, `PreRequisite data not found in ${CONSTANTS.PREREQUISITE_DATA}`);
        }
      });
    }
  );
});
