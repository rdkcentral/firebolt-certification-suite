exports.METRICS_METHOD = {
  method: resolveAtRuntime('metrics.{{attribute}}'),
  params: {},
  validationJsonPath: 'result',
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: true,
            description: resolveAtRuntime(
              'Validating that metrics.{{attribute}} {{attribute}} is true'
            ),
          },
        ],
      },
    ],
  },
};
