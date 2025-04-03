exports.EXPECTED_VALUE_FOR_KEYBOARD_CAPABILITY_AVAILABILITY = {
  method: 'capabilities.available',
  validationJsonPath: 'result',
  content: false,
};
exports.EXPECTED_VALUE_FOR_PINCHALLENGE_CAPABILITY_AVAILABILITY = {
  method: 'capabilities.available',
  validationJsonPath: 'result',
  content: false,
};
exports.EXPECTED_VALUE_FOR_PERMITTED_API = {
  method: 'capabilities.permitted',
  validationJsonPath: 'result',
  content: {
    data: [
      {
        type: 'custom',
        assertionDef: 'validateCapabilitiesPermitted',
        validations: [
          {
            type: 'permitted',
            description:
              'Validation of capabilities.permitted to check if the capabilities are permitted',
          },
        ],
      },
    ],
  },
};
