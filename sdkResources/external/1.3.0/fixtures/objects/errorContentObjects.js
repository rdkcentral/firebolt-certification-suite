exports.INVALID_PARAM_PLATFORM1_AUTH_TOKEN = {
  type: 'custom',
  assertionDef: 'commonErrorMessageValidation',
  validations: [
    {
      type: {
        errorCode: [-32602],
        errorMessage: ['\"platform1\" is not one of [\"platform\",\"device\",\"distributor\"] '],
      },
    },
  ],
};

exports.INVALID_PARAM_TYPE_BOOLEAN_AUTH_TOKEN = {
  type: 'custom',
  assertionDef: 'commonErrorMessageValidation',
  validations: [
    {
      type: {
        errorCode: [-32602],
        errorMessage: [
          'true is not one of [\"platform\",\"device\",\"distributor\"] true is not of type \"string\" ',
        ],
      },
    },
  ],
};

exports.INVALID_PARAM_TYPE_INTEGER_AUTH_TOKEN = {
  type: 'custom',
  assertionDef: 'commonErrorMessageValidation',
  validations: [
    {
      type: {
        errorCode: [-32602],
        errorMessage: [
          '123 is not one of [\"platform\",\"device\",\"distributor\"] 123 is not of type \"string\" ',
        ],
      },
    },
  ],
};

exports.NO_INTENT_ERROR = {
  type: 'custom',
  assertionDef: 'commonErrorMessageValidation',
  validations: [
    {
      type: {
        errorCode: [-40000],
        errorMessage: ['An intent must be provided for new app running sessions'],
      },
    },
  ],
};

exports.PLAYER_INVALID_URI = {
  type: 'custom',
  assertionDef: 'commonErrorMessageValidation',
  validations: [
    {
      type: {
        errorCode: [-60002],
        errorMessage: ['Invalid uri'],
      },
    },
  ],
};
