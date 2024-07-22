exports.AUDIODESCRIPTIONS = {
    method: 'manage_audiodescriptions.enabled',
    params: null,
    validationJsonPath: 'result',
    setMethod: resolveAtRuntime('manage_audiodescriptions.set{{attribute.uppercaseFirstChar}}'),
    setParams: resolveAtRuntime('value'),
    setValidationJsonPath: 'result',
    setContent: null,
    event: 'manage_audiodescriptions.onEnabledChanged',
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
                'Validating that manage_audiodescriptions.on{{event.uppercaseFirstChar}} {{attribute}} is {{value}}'
              ),
            },
          ],
        },
      ],
    },
  };
  