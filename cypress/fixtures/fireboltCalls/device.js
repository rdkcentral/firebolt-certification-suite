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
  DEFAULTS: {
    DEVICE: {
      id: {
        data: [
          {
            type: 'fixture',
            validations: [
              {
                mode: 'deviceContentValidation',
                type: 'DEVICEID',
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
                mode: 'staticContentValidation',
                type: resolveAtRuntime('DYNAMIC_COMMON_VARIABLES.DEFAULTS.DEVICE.{{attribute}}'),
                description: 'Validation of the Device Distributor Format',
              },
            ],
          },
        ],
      },
      platform: {
        data: [
          {
            type: 'fixture',
            validations: [
              {
                mode: 'staticContentValidation',
                type: resolveAtRuntime('DYNAMIC_COMMON_VARIABLES.DEFAULTS.DEVICE.{{attribute}}'),
                description: 'Validation of the Device Platform Format',
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
                type: 'UID',
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
                type: 'DEVICE_TYPE',
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
                type: 'DEVICE_MODEL',
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
                type: 'DEVICE_SKU',
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
                type: 'DEVICE_MAKE',
                description: 'Validation of the Device Make Format',
              },
            ],
          },
        ],
      },
    },
  },
};

exports.DYNAMIC_COMMON_VARIABLES = {
  DEVICE: {
    distributor: 'xglobal',
  },
};

exports.DEVICE = {
  method: resolveAtRuntime('device.{{attribute}}'),
  params: {},
  validationJsonPath: 'result',
  content: resolveAtRuntime('DYNAMIC_FB_CALL_VARIABLES.DEFAULTS.DEVICE.{{attribute}}'),
};

exports.DEVICE_NETWORk = {
  method: 'device.network',
  params: {},
  validationJsonPath: 'result',
  event: 'device.onNetworkChanged',
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
              'Validating that device.{{event}} {{attribute}} is {{value}}'
            ),
          },
        ],
      },
    ],
  },
}