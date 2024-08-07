exports.ACCOUNT_SESSION = {
  method: 'advertising.advertisingId',
  params: true,
  validationJsonPath: 'result',
  setMethod: resolveAtRuntime('manage_account.{{attribute}}'),
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
              'Validating that manage_account.{{attribute}} {{attribute}} is {{value}}'
            ),
          },
        ],
      },
    ],
  },
};
