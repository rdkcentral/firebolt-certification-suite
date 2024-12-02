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
const errorContent = require('../objects/errorContentObjects.js');
exports.ACCOUNT_VARIABLES = {
  ACCOUNT: {
    id: {
      data: [
        {
          type: 'fixture',
          validations: [
            {
              mode: 'deviceContentValidation',
              type: extractEnvValue('ACCOUNTID'),
              description: 'Validation of the Account Id',
            },
          ],
        },
      ],
    },
    uid: {
      data: [
        {
          type: 'regEx',
          validations: [
            {
              mode: 'regex',
              type: '/^(?:.*d)(?:.*[a-zA-Z]).{2,}$/',
              description: 'Validation of the Account uid',
            },
          ],
        },
      ],
    },
  },
};

exports.ACCOUNT_ID = {
  method: 'account.id',
  validationJsonPath: 'result',
  content: this.ACCOUNT_VARIABLES.ACCOUNT.id,
};

exports.ACCOUNT_UID = {
  method: 'account.uid',
  validationJsonPath: 'result',
  content: this.ACCOUNT_VARIABLES.ACCOUNT.uid,
};

exports.FETCH_ACCOUNT_ID = {
  method: 'account.id',
  params: {},
};

exports.FETCH_ACCOUNT_UID = {
  method: 'account.uid',
  params: {},
};

exports.FETCH_ACCOUNT_ID_WHEN_DEVICE_IS_NOT_PROVISIONED = {
  method: 'account.id',
  params: {},
  expected: 'error',
};

exports.FETCH_ACCOUNT_UID_WHEN_DEVICE_IS_NOT_PROVISIONED = {
  method: 'account.uid',
  params: {},
  expected: 'error',
};

exports.INVALID_PARAMETER_ERROR_FOR_ACCOUNT_ID = {
  method: 'account.id',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};

exports.INVALID_PARAMETER_ERROR_FOR_ACCOUNT_UID = {
  method: 'account.uid',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};

// Dummy session token data
exports.PUSH_SESSION_TOKEN = {
  method: 'manage_account.session',
  params: { token: 'SW52Y==', expiresIn: 84000 },
};

exports.GET_ADVERTISINGID_WITH_CUSTOM_ERROR = {
  method: 'advertising.advertisingId',
  params: { value: true },
  expected: 'error',
};

exports.SET_ACCOUNT_SESSION_WITH_INVALID_TOKEN = {
  method: 'manage_account.session',
  params: { token: 12345, expiresIn: 84000 },
  expected: 'error',
};

// Dummy session token data
exports.SET_ACCOUNT_SESSION_WITH_INVALID_EXPIRESIN = {
  method: 'manage_account.session',
  params: { token: 'SW52Y==', expiresIn: 'BJGHhjbdcJKSW' },
  expected: 'error',
};

// Dummy session token data
exports.SET_ACCOUNT_SESSION_WITH_INVALID_EXPIRESIN_VALUE = {
  method: 'manage_account.session',
  params: { token: 'SW52Y==', expiresIn: 0 },
  expected: 'error',
};

exports.SET_ACCOUNT_SESSION_WITHOUT_PARAMETERS = {
  method: 'manage_account.session',
  params: {},
  expected: 'error',
};

exports.INVALID_PARAMETERS_FOR_ACCOUNT_SESSION = {
  method: 'manage_account.session',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};
