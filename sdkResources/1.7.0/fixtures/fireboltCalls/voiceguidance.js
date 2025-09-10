exports.VOICEGUIDANCE = {
  method: resolveAtRuntime('manage_voiceguidance.{{attribute}}'),
  params: null,
  validationJsonPath: 'result',
  setMethod: resolveAtRuntime('manage_voiceguidance.set{{attribute.uppercaseFirstChar}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
  event: resolveAtRuntime('manage_voiceguidance.on{{attribute.uppercaseFirstChar}}Changed'),
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
              'Validating that manage_voiceguidance.on{{event.uppercaseFirstChar}} {{attribute}} is {{value}}'
            ),
          },
        ],
      },
    ],
  },
};
