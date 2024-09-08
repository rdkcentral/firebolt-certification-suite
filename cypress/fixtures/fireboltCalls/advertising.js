const errorContent = require('../objects/errorContentObjects.js');
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
  validationJsonPath: resolveAtRuntime('result.{{attribute}}'),
  setMethod: resolveAtRuntime('manage_advertising.set{{attribute.uppercaseFirstChar}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
  event: 'advertising.onPolicyChanged',
  eventValidationJsonPath: resolveAtRuntime('eventResponse.{{attribute}}'),
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

exports.ADVERTISING_VARIABLES = {
  ADVERTISING: {
    ADVERTISINGID_ADOFF: {
      data: [
        {
          type: 'miscellaneous',
          validations: [
            {
              type: 'limitAdTrackingOFF',
              description:
                'Validation of the Advertising AdvertisingId When LimitAdTracking OFF Format',
            },
          ],
        },
      ],
    },
    ADVERTISINGID_ADON: {
      data: [
        {
          type: 'miscellaneous',
          validations: [
            {
              type: 'limitAdTrackingON',
              description:
                'Validation of the Advertising AdvertisingId When LimitAdTracking ON Format',
            },
          ],
        },
      ],
    },
    ADVERTISING_CONFIGURATION: {
      data: [
        {
          type: 'decode',
          specialCase: 'base64',
          validations: [
            {
              format: 'TOKEN_REGEXP',
              field: 'lmt',
              mode: 'regex',
              type: 'NUMERIC_REGEXP',
              description: 'Validation of the advertising.config privacyData Format',
            },
          ],
        },
      ],
    },
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
  params: {},
};

exports.GET_APPBUNDLEID = {
  method: 'advertising.appBundleId',
  params: {},
};

exports.ADVERTISING_APPBUNDLEID = {
  method: 'advertising.appBundleId',
  validationJsonPath: 'result',
  content: '',
};

exports.GET_INITIALIZATION_PARAMETERS = {
  method: 'parameters.initialization',
  params: {},
};

exports.ENABLE_LIMITADTRACKING = {
  method: 'manage_privacy.setAllowAppContentAdTargeting',
  params: { value: true },
};

exports.DISABLE_LIMITADTRACKING = {
  method: 'manage_privacy.setAllowAppContentAdTargeting',
  params: { value: false },
};

exports.LIMITADTRACKING_OFF_FOR_ADVERTISINGID = {
  method: 'advertising.advertisingId',
  validationJsonPath: 'result',
  content: this.ADVERTISING_VARIABLES.ADVERTISING.ADVERTISINGID_ADOFF,
};

exports.LIMITADTRACKING_ON_FOR_ADVERTISINGID = {
  method: 'advertising.advertisingId',
  validationJsonPath: 'result',
  content: this.ADVERTISING_VARIABLES.ADVERTISING.ADVERTISINGID_ADON,
};

exports.PARAMETERS_INITIALIZATION_ADVERTISINGID_AD_OFF = {
  method: 'parameters.initialization',
  validationJsonPath: 'result',
  content: this.ADVERTISING_VARIABLES.ADVERTISING.ADVERTISINGID_ADOFF,
};

exports.PARAMETERS_INITIALIZATION_ADVERTISINGID_AD_ON = {
  method: 'parameters.initialization',
  validationJsonPath: 'result',
  content: this.ADVERTISING_VARIABLES.ADVERTISING.ADVERTISINGID_ADON,
};

exports.GET_COPPA_AS_TRUE = {
  method: 'advertising.config',
  params: { options: { coppa: true, environment: 'prod', authenticationEntity: 'MVPD' } },
};
exports.GET_COPPA_AS_FALSE = {
  method: 'advertising.config',
  params: { options: { coppa: false, environment: 'prod', authenticationEntity: 'MVPD' } },
};
exports.GET_NO_COPPA_WITH_ENVIRONMENT_VALUE_TEST = {
  method: 'advertising.config',
  params: { options: { environment: 'test', authenticationEntity: 'MVPD' } },
};
exports.GET_COPPA_AS_TRUE_WITH_ENVIRONMENT_VALUE_TEST = {
  method: 'advertising.config',
  params: { options: { coppa: true, environment: 'test', authenticationEntity: 'MVPD' } },
};
exports.GET_COPPA_AS_FALSE_WITH_ENVIRONMENT_VALUE_TEST = {
  method: 'advertising.config',
  params: { options: { coppa: false, environment: 'test', authenticationEntity: 'MVPD' } },
};
exports.ADVERTISING_CONFIG_COPPA_AS_ZERO = {
  method: 'advertising.config',
  validationJsonPath: 'result.coppa',
  content: 0,
};
exports.ADVERTISING_CONFIG_COPPA_AS_ONE = {
  method: 'advertising.config',
  validationJsonPath: 'result.coppa',
  content: 1,
};

exports.GET_ONLY_COPPA = {
  method: 'advertising.config',
  params: { options: { coppa: true } },
};
exports.GET_EMPTY_PARAMETER = {
  method: 'advertising.config',
  params: { options: {} },
};

exports.ADVERTISING_CONFIG = {
  method: 'advertising.config',
  validationJsonPath: 'result',
  content: this.ADVERTISING_VARIABLES.ADVERTISING.ADVERTISING_CONFIGURATION,
};
exports.GET_CONFIG_WITH_EMPTY_PARAMETER = {
  method: 'advertising.config',
  params: {},
  expected: 'error',
};
exports.GET_CONFIG_WITH_INVALID_COPPA = {
  method: 'advertising.config',
  params: { options: { coppa: 'true', environment: 'test', authenticationEntity: 'MVPD' } },
  expected: 'error',
};
exports.GET_CONFIG_WITH_INVALID_AUTHENTICATIONENTITY = {
  method: 'advertising.config',
  params: { options: { environment: 'prod', authenticationEntity: 10 } },
  expected: 'error',
};
exports.GET_CONFIG_WITH_INVALID_ENVIRONMENT_DATATYPE = {
  method: 'advertising.config',
  params: { options: { environment: true, authenticationEntity: 'MVPD' } },
  expected: 'error',
};
exports.GET_CONFIG_WITH_INVALID_ENVIRONMENT = {
  method: 'advertising.config',
  params: { options: { environment: 'work', authenticationEntity: 'MVPD' } },
  expected: 'error',
};
exports.GET_CONFIG_WITH_INTEGER_PARAMETER = {
  method: 'advertising.config',
  params: { options: { coppa: 123, environment: 123, authenticationEntity: 123 } },
  expected: 'error',
};
exports.GET_ADVERTISINGID_WITHOUT_SCOPE = {
  method: 'advertising.advertisingId',
  params: { options: {} },
};
exports.GET_ADVERTISINGID_WITH_SCOPE_ID_AS_RANDOM_STRING = {
  method: 'advertising.advertisingId',
  params: { options: { scope: { type: 'browse', id: 'test' } } },
};
exports.GET_ADVERTISINGID_WITH_SCOPE_ID_AS_EMPTY_STRING = {
  method: 'advertising.advertisingId',
  params: { options: { scope: { type: 'browse', id: '' } } },
};
exports.GET_ADVERTISINGID_FOR_SCOPE_BROWSER = {
  method: 'advertising.advertisingId',
  params: { options: { scope: { type: 'browse', id: 'paidPlacement' } } },
};
exports.GET_ADVERTISINGID_FOR_SCOPE_CONTENT = {
  method: 'advertising.advertisingId',
  params: { options: { scope: { type: 'content', id: 'merlin:linear:station:123' } } },
};
exports.GET_ADVERTISINGID_WITH_INVALID_SCOPE_TYPE = {
  method: 'advertising.advertisingId',
  params: { options: { scope: { type: 'test', id: 'paidPlacement' } } },
  expected: 'error',
};
exports.GET_ADVERTISINGID_WITHOUT_SCOPE_TYPE_AND_ID = {
  method: 'advertising.advertisingId',
  params: { options: { scope: {} } },
  expected: 'error',
};
exports.GET_ADVERTISINGID_WITHOUT_SCOPE_ID = {
  method: 'advertising.advertisingId',
  params: { options: { scope: { type: 'test' } } },
  expected: 'error',
};
exports.GET_ADVERTISINGID_WITHOUT_SCOPE_TYPE = {
  method: 'advertising.advertisingId',
  params: { options: { scope: { id: 'paidPlacement' } } },
  expected: 'error',
};
exports.GET_ADVERTISINGID_WITH_INVALID_SCOPE = {
  method: 'advertising.advertisingId',
  params: { options: { scope: { id: 'paidPlacement' } } },
  expected: 'error',
};
exports.GET_ADVERTISINGID_WITH_INVALID_TYPE = {
  method: 'advertising.advertisingId',
  params: { options: { scope: { type: 1234, id: 'paidPlacement' } } },
  expected: 'error',
};
exports.GET_ADVERTISINGID_WITH_INVALID_ID = {
  method: 'advertising.advertisingId',
  params: { options: { scope: { type: 'browse', id: true } } },
  expected: 'error',
};

exports.INVALID_PARAMETER_FOR_ADVERTISING_ADVERTISINGID = {
  method: 'advertising.advertisingId',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};

exports.INVALID_PARAMETER_ERROR_ADVERTISING_CONFIG = {
  method: 'advertising.config',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};

exports.ADVERTISING_ONPOLICYCHANGED_EVENT = {
  event: 'advertising.onPolicyChanged',
  firstParty: false,
};

exports.SET_TRUE_FOR_ALLOWAPPCONTENTADTARGETING = {
  method: 'manage_privacy.setAllowAppContentAdTargeting',
  params: { value: true },
};
exports.ONADVERTISINGPOLICYCHANGED = {
  event: 'advertising.onPolicyChanged',
  validationJsonPath: 'eventResponse',
  content: null,
};
exports.ADVERTISING_ONPOLICYCHANGED = {
  method: 'advertising.onPolicyChanged',
  params: {},
};
exports.GET_ADVERTISING_POLICY = {
  method: 'advertising.policy',
  params: {},
};
exports.ADVERTISING_POLICY_LIMITADTRACKING_AS_TRUE = {
  method: 'advertising.policy',
  validationJsonPath: 'result.limitAdTracking',
  content: true,
};
exports.ADVERTISING_POLICY_LIMITADTRACKING_AS_FALSE = {
  method: 'advertising.policy',
  validationJsonPath: 'result.limitAdTracking',
  content: false,
};
exports.ONPOLICYCHANGED_FOR_ADVERTISING_LIMITADTRACKING_WITH_TRUE = {
  event: 'advertising.onPolicyChanged',
  validationJsonPath: 'eventResponse.limitAdTracking',
  content: true,
};
exports.ONPOLICYCHANGED_FOR_ADVERTISING_LIMITADTRACKING_WITH_FALSE = {
  event: 'advertising.onPolicyChanged',
  validationJsonPath: 'eventResponse.limitAdTracking',
  content: false,
};
