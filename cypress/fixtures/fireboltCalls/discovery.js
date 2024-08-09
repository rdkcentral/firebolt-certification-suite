exports.DISCOVERY_RECOMMENDATIONS = {
  method: 'discovery.policy',
  params: {},
  validationJsonPath: 'result.enableRecommendations',
  setMethod: resolveAtRuntime('manage_privacy.set{{attribute.uppercaseFirstChar}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
  event: 'discovery.onPolicyChanged',
  eventValidationJsonPath: 'eventResponse.enableRecommendations',
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: resolveAtRuntime('value'),
            description: resolveAtRuntime(
              'Validating that manage_privacy.set{{attribute.uppercaseFirstChar}} {{attribute}} is {{value}}'
            ),
          },
        ],
      },
    ],
  },
};
exports.DISCOVERY_REMEMBER_WATCHED_PROGRAMS = {
  method: 'discovery.policy',
  params: {},
  validationJsonPath: 'result.rememberWatchedPrograms',
  setMethod: resolveAtRuntime('manage_privacy.set{{attribute.uppercaseFirstChar}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
  event: 'discovery.onPolicyChanged',
  eventValidationJsonPath: 'eventResponse.rememberWatchedPrograms',
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: resolveAtRuntime('value'),
            description: resolveAtRuntime(
              'Validating that manage_privacy.set{{attribute.uppercaseFirstChar}} {{attribute}} is {{value}}'
            ),
          },
        ],
      },
    ],
  },
};

exports.DISCOVERY_CLEAR_CONTENTACCESS = {
  method: 'discovery.clearContentAccess',
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
            description: resolveAtRuntime('Validating that discovery.clearContentAccess'),
          },
        ],
      },
    ],
  },
};
