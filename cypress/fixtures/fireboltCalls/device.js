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
exports.DEVICE_NAME = {
  method: 'manage_device.name',
  params: {},
  validationJsonPath: 'result',
  setMethod: resolveAtRuntime('manage_device.{{attribute}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
  event: 'device.onNameChanged',
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
              'Validating that manage_device.{{event}} {{attribute}} is {{value}}'
            ),
          },
        ],
      },
    ],
  },
};

exports.DEVICE_NAME_CORE = {
  method: 'device.name',
  params: {},
  validationJsonPath: 'result',
  setMethod: resolveAtRuntime('manage_device.{{attribute}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
  event: 'device.onNameChanged',
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
              'Validating that device.onNameChanged {{attribute}} is {{value}}'
            ),
          },
        ],
      },
    ],
  },
};

exports.DEVICE_VARIABLES = {
  DEVICE: {
    id: {
      data: [
        {
          type: 'fixture',
          validations: [
            {
              mode: 'deviceContentValidation',
              type: extractEnvValue('DEVICEID'),
              description: 'Validation of the Device Id Format',
            },
          ],
        },
      ],
    },
    distributor: {
      data: [
        {
          type: 'fixture',
          validations: [
            {
              mode: 'deviceContentValidation',
              type: extractEnvValue('DEVICE_DISTRIBUTOR'),
              description: 'Validation of the Device Distributor Format',
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
              description: 'Validation of the Device uid',
            },
          ],
        },
      ],
    },
    type: {
      data: [
        {
          type: 'fixture',
          validations: [
            {
              mode: 'deviceContentValidation',
              type: extractEnvValue('DEVICE_TYPE'),
              description: 'Validation of the Device Type Format',
            },
          ],
        },
      ],
    },
    model: {
      data: [
        {
          type: 'fixture',
          validations: [
            {
              mode: 'deviceContentValidation',
              type: extractEnvValue('DEVICE_MODEL'),
              description: 'Validation of the Device Model Format',
            },
          ],
        },
      ],
    },
    sku: {
      data: [
        {
          type: 'fixture',
          validations: [
            {
              mode: 'deviceContentValidation',
              type: extractEnvValue('DEVICE_SKU'),
              description: 'Validation of the Device SKU Format',
            },
          ],
        },
      ],
    },
    make: {
      data: [
        {
          type: 'fixture',
          validations: [
            {
              mode: 'deviceContentValidation',
              type: extractEnvValue('DEVICE_MAKE'),
              description: 'Validation of the Device Make Format',
            },
          ],
        },
      ],
    },
    hdcp: {
      data: [
        {
          type: 'miscellaneous',
          validations: [
            {
              mode: 'fixture',
              type: 'HDCP',
              description: 'Validation of the Device hdcp',
            },
          ],
        },
      ],
    },
    hdr: {
      data: [
        {
          type: 'miscellaneous',
          validations: [
            {
              mode: 'fixture',
              type: 'HDR',
              description: 'Validation of the Device hdr',
            },
          ],
        },
      ],
    },
    screenResolution: {
      data: [
        {
          type: 'miscellaneous',
          validations: [
            {
              mode: 'fixture',
              type: [
                [1280, 720],
                [1920, 1080],
                [3840, 2160],
              ],
              description: 'Validation of the Device screenResolution',
            },
          ],
        },
      ],
    },
    videoResolution: {
      data: [
        {
          type: 'miscellaneous',
          validations: [
            {
              mode: 'fixture',
              type: extractEnvValue('CYPRESSENV-defaultTestData-deviceResolution'),
              description: 'Validation of the Device videoResolution',
            },
          ],
        },
      ],
    },
    audio: {
      data: [
        {
          type: 'miscellaneous',
          validations: [
            {
              mode: 'fixture',
              type: 'AUDIO',
              description: 'Validation of the Device audio',
            },
          ],
        },
      ],
    },
    version: {
      data: [
        {
          type: 'schemaOnly',
        },
      ],
    },
  },
};

exports.DEVICE = {
  method: resolveAtRuntime('device.{{attribute}}'),
  params: {},
};

exports.FETCH_DEVICE_ID = {
  method: 'device.id',
  params: {},
};

exports.FETCH_DEVICE_UID = {
  method: 'device.uid',
  params: {},
};

exports.FETCH_DEVICE_TYPE = {
  method: 'device.type',
  params: {},
};

exports.FETCH_DEVICE_MODEL = {
  method: 'device.model',
  params: {},
};

exports.FETCH_DEVICE_SKU = {
  method: 'device.sku',
  params: {},
};

exports.FETCH_DEVICE_MAKE = {
  method: 'device.make',
  params: {},
};

exports.EXPECTED_DEVICE_ID = {
  method: 'device.id',
  validationJsonPath: 'result',
  content: this.DEVICE_VARIABLES.DEVICE.id,
};

exports.EXPECTED_DEVICE_DISTRIBUTOR = {
  method: 'device.distributor',
  validationJsonPath: 'result',
  content: this.DEVICE_VARIABLES.DEVICE.distributor,
};

exports.EXPECTED_DEVICE_UID = {
  method: 'device.uid',
  validationJsonPath: 'result',
  content: this.DEVICE_VARIABLES.DEVICE.uid,
};

exports.EXPECTED_DEVICE_TYPE = {
  method: 'device.type',
  validationJsonPath: 'result',
  content: this.DEVICE_VARIABLES.DEVICE.type,
};

exports.EXPECTED_DEVICE_MODEL = {
  method: 'device.model',
  validationJsonPath: 'result',
  content: this.DEVICE_VARIABLES.DEVICE.model,
};

exports.EXPECTED_DEVICE_SKU = {
  method: 'device.sku',
  validationJsonPath: 'result',
  content: this.DEVICE_VARIABLES.DEVICE.sku,
};

exports.EXPECTED_DEVICE_MAKE = {
  method: 'device.make',
  validationJsonPath: 'result',
  content: this.DEVICE_VARIABLES.DEVICE.make,
};

exports.EXPECTED_DEVICE_VERSION = {
  method: 'device.version',
  validationJsonPath: 'result',
  content: this.DEVICE_VARIABLES.DEVICE.version,
};

exports.EXPECTED_DEVICE_HDCP = {
  method: 'device.hdcp',
  validationJsonPath: 'result',
  content: this.DEVICE_VARIABLES.DEVICE.hdcp,
};

exports.EXPECTED_DEVICE_HDR = {
  method: 'device.hdr',
  validationJsonPath: 'result',
  content: this.DEVICE_VARIABLES.DEVICE.hdr,
};

exports.EXPECTED_DEVICE_SCREENRESOLUTION = {
  method: 'device.screenResolution',
  validationJsonPath: 'result',
  content: this.DEVICE_VARIABLES.DEVICE.screenResolution,
};

exports.EXPECTED_DEVICE_VIDEORESOLUTION = {
  method: 'device.videoResolution',
  validationJsonPath: 'result',
  content: this.DEVICE_VARIABLES.DEVICE.videoResolution,
};

exports.EXPECTED_DEVICE_AUDIO = {
  method: 'device.audio',
  validationJsonPath: 'result',
  content: this.DEVICE_VARIABLES.DEVICE.audio,
};

exports.STATIC_COMMON_VARIABLES = {
  DEFAULT: {
    NETWORK_WIFI_CONNECTED: {
      state: 'connected',
      type: 'wifi',
    },
    NETWORK_WIFI_DISCONNECTED: {
      state: 'connected',
      type: 'ethernet',
    },
    NETWORK_ETHERNET_CONNECTED: {
      state: 'connected',
      type: 'ethernet',
    },
    NETWORK_ETHERNET_DISCONNECTED: {
      state: 'connected',
      type: 'wifi',
    },
    NETWORK_HYBRID_CONNECTED: {
      state: 'connected',
      type: 'hybrid',
    },
    NETWORK_HYBRID_DISCONNECTED: {
      state: 'disconnected',
      type: 'hybrid',
    },
    NETWORK_WIFI_DISCONNECTED_EVENT: {
      state: 'disconnected',
      type: 'wifi',
    },
    NETWORK_ETHERNET_DISCONNECTED_EVENT: {
      state: 'disconnected',
      type: 'ethernet',
    },
  },
};

exports.FETCH_DEVICE_PLATFORM = {
  method: 'device.platform',
  params: {},
};

exports.EXPECTED_DEVICE_PLATFORM = {
  method: 'device.platform',
  validationJsonPath: 'result',
  content: '',
};

exports.DEVICE_ONNAMECHANGED = {
  method: 'device.onNameChanged',
  params: {},
};

exports.DEVICE_ONNAMECHANGED_EVENT = {
  event: 'device.onNameChanged',
  firstParty: false,
};

exports.SET_DEVICE_NAME_TO_KITCHEN = {
  method: 'manage_device.setName',
  params: { value: 'kitchen' },
};

exports.ONDEVICENAMECHANGED = {
  event: 'device.onNameChanged',
  validationJsonPath: 'eventResponse',
  content: null,
};

exports.DEVICE_ONNETWORKCHANGED = {
  method: 'device.onNetworkChanged',
  params: {},
};

exports.FETCH_DEVICE_NETWORK = {
  method: 'device.network',
  params: {},
};

exports.DEVICE_NETWORK_AS_WIFI_CONNECTED = {
  method: 'device.network',
  validationJsonPath: 'result',
  content: this.STATIC_COMMON_VARIABLES.DEFAULT.NETWORK_WIFI_CONNECTED,
};

exports.DEVICE_NETWORK_AS_WIFI_DISCONNECTED = {
  method: 'device.network',
  validationJsonPath: 'result',
  content: this.STATIC_COMMON_VARIABLES.DEFAULT.NETWORK_WIFI_DISCONNECTED,
};

exports.DEVICE_NETWORK_AS_ETHERNET_CONNECTED = {
  method: 'device.network',
  validationJsonPath: 'result',
  content: this.STATIC_COMMON_VARIABLES.DEFAULT.NETWORK_ETHERNET_CONNECTED,
};

exports.DEVICE_NETWORK_AS_ETHERNET_DISCONNECTED = {
  method: 'device.network',
  validationJsonPath: 'result',
  content: this.STATIC_COMMON_VARIABLES.DEFAULT.NETWORK_ETHERNET_DISCONNECTED,
};

exports.DEVICE_NETWORK_AS_HYBRID_CONNECTED = {
  method: 'device.network',
  validationJsonPath: 'result',
  content: this.STATIC_COMMON_VARIABLES.DEFAULT.NETWORK_HYBRID_CONNECTED,
};

exports.DEVICE_NETWORK_AS_HYBRID_DISCONNECTED = {
  method: 'device.network',
  validationJsonPath: 'result',
  content: this.STATIC_COMMON_VARIABLES.DEFAULT.NETWORK_HYBRID_DISCONNECTED,
};

exports.ONNETWORKCHANGED_WITH_WIFI_CONNECTED = {
  event: 'device.onNetworkChanged',
  validationJsonPath: 'result',
  content: this.STATIC_COMMON_VARIABLES.DEFAULT.NETWORK_WIFI_CONNECTED,
};

exports.ONNETWORKCHANGED_WITH_WIFI_DISCONNECTED = {
  event: 'device.onNetworkChanged',
  validationJsonPath: 'result',
  content: this.STATIC_COMMON_VARIABLES.DEFAULT.NETWORK_WIFI_DISCONNECTED,
};

exports.ONNETWORKCHANGED_WITH_ETHERNET_CONNECTED = {
  event: 'device.onNetworkChanged',
  validationJsonPath: 'result',
  content: this.STATIC_COMMON_VARIABLES.DEFAULT.NETWORK_ETHERNET_CONNECTED,
};

exports.ONNETWORKCHANGED_WITH_ETHERNET_DISCONNECTED = {
  event: 'device.onNetworkChanged',
  validationJsonPath: 'result',
  content: this.STATIC_COMMON_VARIABLES.DEFAULT.NETWORK_ETHERNET_DISCONNECTED,
};

exports.ONNETWORKCHANGED_WITH_HYBRID_CONNECTED = {
  event: 'device.onNetworkChanged',
  validationJsonPath: 'result',
  content: this.STATIC_COMMON_VARIABLES.DEFAULT.NETWORK_HYBRID_CONNECTED,
};

exports.ONNETWORKCHANGED_WITH_HYBRID_DISCONNECTED = {
  event: 'device.onNetworkChanged',
  validationJsonPath: 'result',
  content: this.STATIC_COMMON_VARIABLES.DEFAULT.NETWORK_HYBRID_DISCONNECTED,
};

exports.ONNETWORKCHANGED_EVENTS_WITH_WIFI_CONNECTED = {
  method: 'device.onNetworkChanged',
  params: {
    result: {
      state: 'connected',
      type: 'wifi',
    },
  },
};

exports.ONNETWORKCHANGED_EVENTS_WITH_WIFI_DISCONNECTED = {
  method: 'device.onNetworkChanged',
  params: {
    result: {
      state: 'disconnected',
      type: 'wifi',
    },
  },
};

exports.ONNETWORKCHANGED_EVENTS_WITH_ETHERNET_CONNECTED = {
  method: 'device.onNetworkChanged',
  params: {
    result: {
      state: 'connected',
      type: 'ethernet',
    },
  },
};

exports.ONNETWORKCHANGED_EVENTS_WITH_ETHERNET_DISCONNECTED = {
  method: 'device.onNetworkChanged',
  params: {
    result: {
      state: 'disconnected',
      type: 'ethernet',
    },
  },
};

exports.ONNETWORKCHANGED_EVENTS_WITH_HYBRID_CONNECTED = {
  method: 'device.onNetworkChanged',
  params: {},
  result: {
    state: 'connected',
    type: 'hybrid',
  },
};

exports.ONNETWORKCHANGED_EVENTS_WITH_HYBRID_DISCONNECTED = {
  method: 'device.onNetworkChanged',
  params: {},
  result: {
    state: 'disconnected',
    type: 'hybrid',
  },
};

exports.PROVISION_DEVICE_WITH_DEFAULT_VALUES = {
  method: 'manage_device.provision',
  params: {
    accountId: '1234',
    deviceId: '1234',
  },
};

exports.DEFAULT_VALUE_FOR_DEVICE_PROVISION = {
  method: 'device.provision',
  validationJsonPath: 'result',
  content: null,
};

exports.PROVISION_DEVICE_WITH_DISTRIBUTOR_ID = {
  method: 'manage_device.provision',
  params: {
    accountId: '1234',
    deviceId: '1234',
    distributorId: 'global_partner',
  },
};

exports.DISTRIBUTOR_ID_FOR_DEVICE_PROVISION = {
  method: 'device.provision',
  validationJsonPath: 'result',
  content: extractEnvValue('DEVICE_DISTRIBUTOR'),
};

exports.GET_DEVICE_ID = {
  method: 'device.id',
  params: {},
};

exports.GET_ACCOUNT_ID = {
  method: 'account.id',
  params: {},
};

exports.EXPECTED_PROVISION_DEVICE_ID = {
  method: 'device.id',
  validationJsonPath: 'result',
  content: '1234',
};

exports.EXPECTED_PROVISION_ACCOUNT_ID = {
  method: 'account.id',
  validationJsonPath: 'result',
  content: '1234',
};

exports.FETCH_DEVICE_DISTRIBUTOR = {
  method: 'device.distributor',
  params: {},
};

exports.INVALID_PARAMETERS_FOR_DEVICE_PROVISION = {
  method: 'device.provision',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};

exports.PROVISION_DEVICE_WITH_INTEGER = {
  method: 'manage_device.provision',
  params: { value: 123 },
  expected: 'error',
};

exports.PROVISION_DEVICE_WITH_BOOLEAN = {
  method: 'manage_device.provision',
  params: { value: true },
  expected: 'error',
};

exports.PROVISION_DEVICE_WITHOUT_DEVICEID = {
  method: 'manage_device.provision',
  params: {
    accountId: '12345678910',
  },
  expected: 'error',
};

exports.PROVISION_DEVICE_WITH_EMPTY_PARAMS = {
  method: 'manage_device.provision',
  params: {},
  expected: 'error',
};

exports.PROVISION_DEVICE_WITHOUT_ACCOUNTID = {
  method: 'manage_device.provision',
  params: {
    deviceId: '1234',
  },
  expected: 'error',
};

exports.SET_DEVICE_NAME_TO_LIVING_ROOM = {
  method: 'manage_device.setName',
  params: { value: 'Living Room' },
};
