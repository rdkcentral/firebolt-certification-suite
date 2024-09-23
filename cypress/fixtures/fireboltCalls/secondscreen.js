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
exports.SECONDSCREEN_FRIENDLYNAME = {
  method: 'secondscreen.friendlyName',
  params: {},
  validationJsonPath: 'result',
  setMethod: resolveAtRuntime('manage_device.set{{attribute.uppercaseFirstChar}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
  event: 'secondscreen.onFriendlyNameChanged',
  eventValidationJsonPath: 'eventResponse',
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: resolveAtRuntime('value'),
            description: resolveAtRuntime(
              'Validating that manage_device.set{{attribute.uppercaseFirstChar}} {{attribute}} is {{value}}'
            ),
          },
        ],
      },
    ],
  },
};
exports.ONLAUNCHREQUEST_TYPE_DIAL_WITH_TEST_DATA = {
  type: 'dial',
  version: '1.7',
  data: 'test',
};
exports.ONCLOSEREQUEST_TYPE_DIAL = {
  type: 'dial',
  version: '1.7',
};
exports.SECONDSCREEN_VARIABLES = {
  SECONDSCREEN: {
    test: {
      type: 'test',
    },
    emptyArray: [],
    DIAL2: { dial2: true },
  },
  SECONDSCREEN_CONTENT: {
    device: {
      data: [
        {
          type: 'fixture',
          validations: [
            {
              mode: 'deviceContentValidation',
              type: extractEnvValue('DEVICEID'),
              description: 'Validation of the Secondscreen device Format',
            },
          ],
        },
      ],
    },
    protocols: {
      data: [
        {
          type: 'fixture',
          validations: [
            {
              mode: 'staticContentValidation',
              type: resolveAtRuntime('DYNAMIC_FB_CALL_VARIABLES.SECONDSCREEN.DIAL2'),
              description: 'Validation of the Secondscreen protocols Format',
            },
          ],
        },
      ],
    },
    SECONDSCREEN_ONLAUNCHREQUEST_TYPE_DIAL_WITH_TEST_DATA: {
      method: 'secondscreen.onCloseRequest',
      data: [
        {
          type: 'fixture',
          validations: [
            {
              mode: 'staticContentValidation',
              type: this.ONLAUNCHREQUEST_TYPE_DIAL_WITH_TEST_DATA,
              description: 'Validation of the Secondscreen onLaunchRequest event',
            },
          ],
        },
      ],
    },
    SECONDSCREEN_ONCLOSEREQUEST: {
      method: 'secondscreen.onCloseRequest',
      data: [
        {
          type: 'fixture',
          validations: [
            {
              mode: 'staticContentValidation',
              type: this.ONCLOSEREQUEST_TYPE_DIAL,
              description: 'Validation of the Secondscreen protocols Format',
            },
          ],
        },
      ],
    },
  },
};
exports.SECONDSCREEN = {
  method: resolveAtRuntime('secondscreen.{{attribute}}'),
  params: resolveAtRuntime('DYNAMIC_FB_CALL_VARIABLES.SECONDSCREEN.{{value}}'),
  validationJsonPath: 'result',
  content: resolveAtRuntime('DYNAMIC_FB_CALL_VARIABLES.SECONDSCREEN_CONTENT.{{attribute}}'),
};

exports.GET_SECONDSCREEN_DEVICE_WITH_EMPTY_ARRAY = {
  method: 'secondscreen.device',
  params: [],
};

exports.GET_SECONDSCREEN_DEVICE_WITH_STRING = {
  method: 'secondscreen.device',
  params: {value: "test"},
};

exports.GET_SECONDSCREEN_PROTOCOLS = {
  method: 'secondscreen.protocols',
  params: [],
};

exports.EXPECTED_SECONDSCREEN_DEVICE = {
  method: 'secondscreen.device',
  validationJsonPath: 'result',
  content: this.SECONDSCREEN_VARIABLES.SECONDSCREEN_CONTENT.device,
};

exports.EXPECTED_SECONDSCREEN_PROTOCOLS = {
  method: 'secondscreen.protocols',
  validationJsonPath: 'result',
  content: this.SECONDSCREEN_VARIABLES.SECONDSCREEN_CONTENT.protocols,
};


exports.GET_SECONDSCREEN_DEVICE_WITH_BOOLEAN = {
  method: 'secondscreen.device',
  params: { type: true },
  expected: 'error',
};
exports.GET_SECONDSCREEN_DEVICE_WITH_INTEGER = {
  method: 'secondscreen.device',
  params: { type: 123 },
  expected: 'error',
};
exports.INVALID_PARAMETERS_FOR_SECONDSCREEN_DEVICE = {
  method: 'secondscreen.device',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.SECONDSCREEN_ONFRIENDLYNAMECHANGED = {
  method: 'secondscreen.onFriendlyNameChanged',
  params: {},
};
exports.SECONDSCREEN_ONFRIENDLYNAMECHANGED_EVENT = {
  event: 'secondscreen.onFriendlyNameChanged',
  firstParty: false,
};
exports.SET_FRIENDLYNAME_TO_GUEST_ROOM = {
  method: 'manage_device.setName',
  params: { value: 'Guest Room' },
};
exports.GET_SECONDSCREEN_FRIENDLYNAME = {
  method: 'secondscreen.friendlyName',
  params: {},
};
exports.ONFRIENDLYNAMECHANGED = {
  event: 'secondscreen.onFriendlyNameChanged',
  validationJsonPath: 'eventResponse',
  content: null,
};

exports.SECONDSCREEN_ONLAUNCHREQUEST = {
  method: 'secondscreen.onLaunchRequest',
  params: {},
};
exports.SECONDSCREEN_ONCLOSEREQUEST = {
  method: 'secondscreen.onCloseRequest',
  params: {},
};
exports.NULL_FOR_SECONDSCREEN_ONLAUNCHREQUEST_EVENT = {
  event: 'secondscreen.onLaunchRequest',
  validationJsonPath: 'eventResponse',
  content: 'NULL',
};
exports.NULL_FOR_SECONDSCREEN_ONCLOSEREQUEST_EVENT = {
  event: 'secondscreen.onCloseRequest',
  validationJsonPath: 'eventResponse',
  content: null,
  expectingError: false,
};
exports.SECONDSCREEN_ONLAUNCHREQUEST_EVENT = {
  event: 'secondscreen.onLaunchRequest',
  validationJsonPath: 'eventResponse',
  content:
    this.SECONDSCREEN_VARIABLES.SECONDSCREEN_CONTENT
      .SECONDSCREEN_ONLAUNCHREQUEST_TYPE_DIAL_WITH_TEST_DATA,
};
exports.SECONDSCREEN_ONCLOSEREQUEST_EVENT = {
  event: 'secondscreen.onCloseRequest',
  validationJsonPath: 'eventResponse',
  content: this.SECONDSCREEN_VARIABLES.SECONDSCREEN_CONTENT.SECONDSCREEN_ONCLOSEREQUEST,
};
exports.ONLAUNCHREQUEST_EVENT = {
  method: 'secondscreen.onLaunchRequest',
  params: {
    method: 'secondscreen.onLaunchRequest',
    result: {
      type: 'dial',
      version: '1.7',
      data: 'test',
    },
  },
};
exports.ONCLOSEREQUEST_EVENT = {
  method: 'secondscreen.onCloseRequest',
  params: {
    method: 'secondscreen.onCloseRequest',
    result: {
      type: 'dial',
      version: '1.7',
    },
  },
};
exports.SECONDSCREEN_ONLAUNCHREQUEST_CLEAR_EVENT = {
  event: 'secondscreen.onLaunchRequest',
  firstParty: false,
};
exports.SECONDSCREEN_ONCLOSEREQUEST_CLEAR_EVENT = {
  event: 'secondscreen.onCloseRequest',
  firstParty: false,
};
