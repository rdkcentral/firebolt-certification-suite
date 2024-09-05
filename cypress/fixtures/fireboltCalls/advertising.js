exports.ADVERTISING_RESET_IDENTIFIER = {
  method: 'manage_advertising.resetIdentifier',
  params: {},
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
  params: {},
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

exports.ADVERTISING_SKIPRESTRICTION = {
  method: 'advertising.policy',
  params: {},
  validationJsonPath: 'result.skipRestriction',
  setMethod: resolveAtRuntime('manage_advertising.setSkipRestriction'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
  event: 'advertising.onPolicyChanged',
  eventValidationJsonPath: 'eventResponse.skipRestriction',
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: resolveAtRuntime('value'),
            description: resolveAtRuntime(
              'Validating that manage_advertising.setskipRestriction skipRestriction is {{value}}'
            ),
          },
        ],
      },
    ],
  },
};

exports.ADVERTISING_DEVICEATTRIBUTES = {
  method: 'advertising.deviceAttributes',
  params: {},
  validationJsonPath: 'result',
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: {},
            description: 'Validating advertising.deviceAttributes',
          },
        ],
      },
    ],
  },
};

exports.GET_NO_COPPA = {
  method: 'advertising.config',
  params: { options: { environment: 'prod', authenticationEntity: 'MVPD' } },
};

exports.GET_ADVERTISINGID = {
  method: 'advertising.advertisingId',
  params: {},
};

exports.RESET_IDENTIFIER_FOR_ADVERTISING = {
  method: 'manage_advertising.resetIdentifier',
};
