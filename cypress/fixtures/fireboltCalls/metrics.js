exports.METRICS_EVENT = {
  setMethod: resolveAtRuntime('manage_metrics.{{attribute}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: resolveAtRuntime('value'),
            description: resolveAtRuntime(
              'Validating that manage_metrics.{{attribute}} {{attribute}} is {{value}}'
            ),
          },
        ],
      },
    ],
  },
};
