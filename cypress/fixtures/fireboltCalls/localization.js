exports.LOCALIZATION_MANAGE = {
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
  setMethod: resolveAtRuntime('manage_localization.{{attribute}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
};

exports.LOCALIZATION = {
  method: resolveAtRuntime('localization.{{attribute}}'),
  params: {},
  validationJsonPath: 'result',
  setMethod: resolveAtRuntime('manage_localization.set{{attribute.uppercaseFirstChar}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
  event: resolveAtRuntime('localization.on{{attribute.uppercaseFirstChar}}Changed'),
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
