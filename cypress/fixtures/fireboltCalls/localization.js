exports.DYNAMIC_FB_CALL_VARIABLES = {
  DEFAULTS: {
    LOCALIZATION: {
      locality: {
        data: [
          {
            type: 'fixture',
            validations: [
              {
                mode: 'staticContentValidation',
                type: "washington",
                description: resolveAtRuntime(
                  'Validating that manage_closedcaptions {{attribute}} is default'
                ),
              },
            ],
          },
        ],
      },
      countryCode: {
        data: [
          {
            type: 'regEx',
            validations: [
              {
                mode: 'regEx',
                type: 'COUNTRYCODE',
                description: resolveAtRuntime(
                  'Validating that manage_closedcaptions {{attribute}} is default'
                ),
              },
            ],
          },
        ],
      },
      postalCode: {
        data: [
          {
            type: 'regEx',
            validations: [
              {
                mode: 'regEx',
                type: 'NUMERIC',
                description: resolveAtRuntime(
                  'Validating that manage_closedcaptions {{attribute}} is default'
                ),
              },
            ],
          },
        ],
      },
      locale: {
        data: [
          {
            type: 'fixture',
            validations: [
              {
                mode: 'staticContentValidation',
                type: resolveAtRuntime('value'),
                description: resolveAtRuntime(
                  'Validating that manage_closedcaptions {{attribute}} is default'
                ),
              },
            ],
          },
        ],
      },
    },
  },
};

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
  content: resolveAtRuntime('DYNAMIC_FB_CALL_VARIABLES.DEFAULTS.LOCALIZATION.{{attribute}}'),
};
