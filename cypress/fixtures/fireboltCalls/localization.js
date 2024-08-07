exports.LOCALIZATION = {
  method: resolveAtRuntime('manage_localization.{{attribute}}'),
  params: null,
  validationJsonPath: 'result',
  setMethod: resolveAtRuntime('manage_localization.set{{attribute.uppercaseFirstChar}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
  event: resolveAtRuntime('manage_localization.on{{attribute.uppercaseFirstChar}}Changed'),
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
              'Validating that manage_localization.set{{attribute.uppercaseFirstChar}} {{attribute}} is {{value}}'
            ),
          },
        ],
      },
    ],
  },
};

exports.LOCALIZATION_ADDITIONAL_INFO = {
  method: resolveAtRuntime('manage_localization.{{attribute}}'),
  params: null,
  validationJsonPath: 'result',
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: resolveAtRuntime('value'),
            description: resolveAtRuntime(
              'Validating that manage_localization.{{attribute}} {{attribute}} is {{value}}'
            ),
          },
        ],
      },
    ],
  },
};
