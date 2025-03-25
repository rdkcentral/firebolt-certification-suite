exports.THIRD_PARTY_APP_IS_LAUNCHED = {
  event: 'lifecycleManagement.onRequestReady',
  validationJsonPath: 'eventResponse.parameters.appId',
  expectingError: false,
  appId: Cypress.env('firstPartyAppId'),
  eventExpected: 'triggers',
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: resolveAtRuntime('appId'),
          },
        ],
      },
      {
        type: 'screenshotValidation',
        validations: [
          {
            type: 'image',
            label: resolveAtRuntime('page'),
            confidence: 50,
          },
        ],
      },
      {
        type: 'performanceValidation',
        validations: [],
      },
    ],
  },
};
