exports.CLOSED_CAPTIONS_SETTINGS = {
  method: resolveAtRuntime('manage_closedcaptions.{{attribute}}'),
  params: {},
  validationJsonPath: 'result',
  setMethod: resolveAtRuntime('manage_closedcaptions.set{{attribute.uppercaseFirstChar}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
  event: resolveAtRuntime('manage_closedcaptions.on{{attribute.uppercaseFirstChar}}Changed'),
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
              'Validating that manage_closedcaptions.on{{event.uppercaseFirstChar}} {{attribute}} is {{value}}'
            ),
          },
        ],
      },
    ],
  },
};
