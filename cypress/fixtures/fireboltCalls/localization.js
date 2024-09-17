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

exports.LOCALIZATION_SDK_BEHAVIOUR = {
  setMethod: resolveAtRuntime('manage_localization.set{{attribute.uppercaseFirstChar}}'),
  setValidationJsonPath: 'result',
  setContent: {
    data: [
      {
        type: 'regEx',
        validations: [
          {
            mode: 'regex',
            type: resolveAtRuntime('DYNAMIC_FB_CALL_VARIABLES.DEFAULTS.{{attribute}}'),
            description: 'Validation of the Localization {{attribute}} Format',
          },
        ],
      },
    ],
  },
};

exports.LOCALIZATION_PREFERREDAUDIO_LANGUAGES = {
  setMethod: resolveAtRuntime('manage_localization.set{{attribute.uppercaseFirstChar}}'),
  setValidationJsonPath: 'result',
  setContent: resolveAtRuntime('DYNAMIC_FB_CALL_VARIABLES.DEFAULTS.CONTENT.{{attribute}}'),
};

exports.LOCALIZATION_VARIABLES = {
  DEFAULTS: {
    CONTENT: {
      preferredAudioLanguages: {
        data: [
          {
            type: 'fixture',
            validations: [
              {
                mode: 'staticContentValidation',
                type: resolveAtRuntime('DYNAMIC_FB_CALL_VARIABLES.DEFAULTS.{{attribute}}'),
                description: 'Validation of the Localization {{attribute}} Format',
              },
            ],
          },
        ],
      },
    },
    preferredAudioLanguages: ['eng', 'spa'],
    locality: '^[A-Za-z]*$',
    postalCode: '^[0-9]+$',
    countryCode: '^.{2,3}$',
    language: '^[a-z]{2}(-[A-Z]{2})?$',
    locale: '^[a-z]{2}(-[A-Z]{2})?$',
    timeZone: '[a-zA-Z&_.-]',
  },
};
