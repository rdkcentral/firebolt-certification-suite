exports.DEVICE_NAME = {
  method: 'manage_device.name',
  params: null,
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
