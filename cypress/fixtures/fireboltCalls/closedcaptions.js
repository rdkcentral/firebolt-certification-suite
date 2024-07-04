exports.CLOSEDCAPTIONS = {
  method: 'ClosedCaptions.{{attribute}}',
  params: null,
  validationJsonPath: resolveAtRuntime(['result']),
  setMethod: resolveAtRuntime('manage_closedcaptions.set{{attribute.uppercaseFirstChar}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
  event: resolveAtRuntime('manage_closedcaptions.on{{event.uppercaseFirstChar}}'),
  eventValidationJsonPath: resolveAtRuntime(['eventResponse']),
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
