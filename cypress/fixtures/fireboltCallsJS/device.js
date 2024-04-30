exports.EXPECTED_DEVICE_ID = {
  method: 'device.id',
  validationJsonPath: 'result',
  expected: `${Cypress.env('deviceId')}`,
};
