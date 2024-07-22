exports.ADVERTISING_RESET_IDENTIFIER = {
  method: 'manage_advertising.resetIdentifier',
  params: null,
  validationJsonPath: 'result',
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: null,
            description: resolveAtRuntime('Validating that manage_advertising.resetIdentifier'),
          },
        ],
      },
    ],
  },
};

exports.ADVERTISING_SKIP_RESTRICTION = {
  method: 'manage_advertising.skipRestriction',
  params: null,
  validationJsonPath: 'result',
  setMethod: resolveAtRuntime('manage_advertising.set{{attribute.uppercaseFirstChar}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
  event: 'manage_advertising.onSkipRestrictionChanged',
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
              'Validating that manage_advertising.set{{attribute.uppercaseFirstChar}} {{attribute}} is {{value}}'
            ),
          },
        ],
      },
    ],
  },
};
