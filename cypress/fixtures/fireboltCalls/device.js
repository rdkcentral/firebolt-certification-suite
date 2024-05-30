exports.EXPECTED_DEVICE_ID = {
  method: 'device.id',
  validationJsonPath: 'result',
  expected: `${resolveDeviceVariable('DEVICE_ID')}`,
};
