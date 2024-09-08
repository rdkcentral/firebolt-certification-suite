const errorContent = require('../objects/errorContentObjects.js');
exports.AUTHENTICATION_VARIABLES = {
  DEFAULTS: {
    AUTHENTICATION: {
      DECODE_JWT_AUTHENTICATION_TOKEN: {
        data: [
          {
            type: 'decode',
            specialCase: 'jwt',
            validations: [
              {
                field: 'iat',
                mode: 'regex',
                format: 'TOKEN_JWT_REGEXP',
                type: '^[0-9]+$',
                description: 'Validation of the Authentication Token issueDate Format',
              },
            ],
          },
          {
            type: 'decode',
            specialCase: 'jwt',
            validations: [
              {
                field: 'partnerId',
                mode: 'regex',
                format: 'TOKEN_JWT_REGEXP',
                type: '^[A-Za-z]*$',
                description: 'Validation of the Authentication Token partner Format',
              },
            ],
          },
        ],
      },
      DECODE_BASE64_AUTHENTICATION_TOKEN: {
        data: [
          {
            type: 'decode',
            specialCase: 'base64',
            validations: [
              {
                field: 'issueDate',
                mode: 'regex',
                format: 'TOKEN_REGEXP',
                type: '[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])',
                description: 'Validation of the Authentication Token issueDate Format',
              },
            ],
          },
          {
            type: 'decode',
            specialCase: 'base64',
            validations: [
              {
                field: 'notOnOrAfter',
                mode: 'regex',
                format: 'TOKEN_REGEXP',
                type: '[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])',
                description: 'Validation of the Authentication Token notOnOrAfter Format',
              },
            ],
          },
        ],
      },
      DECODE_BASE64_AUTHENTICATION_DEVICE_TOKEN: {
        data: [
          {
            type: 'decode',
            specialCase: 'base64',
            validations: [
              {
                field: 'issueDate',
                mode: 'regex',
                format: 'TOKEN_REGEXP',
                type: '[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])',
                description: 'Validation of the Authentication Token issueDate Format',
              },
            ],
          },
        ],
      },
    },
  },
};

exports.GET_THE_AUTHENTICATION_TOKEN_FOR_PLATFORM = {
  method: 'authentication.token',
  params: { type: 'platform' },
};

exports.PLATFORM_AUTHENTICATION_TOKEN = {
  method: 'authentication.token',
  validationJsonPath: 'result',
  content: this.AUTHENTICATION_VARIABLES.DEFAULTS.AUTHENTICATION.DECODE_JWT_AUTHENTICATION_TOKEN,
};

exports.GET_THE_AUTHENTICATION_TOKEN_FOR_DEVICE = {
  method: 'authentication.token',
  params: { type: 'device' },
};

exports.DECODE_BASE64_AUTHENTICATION_TOKEN = {
  method: 'authentication.token',
  validationJsonPath: 'result',
  content:
    this.AUTHENTICATION_VARIABLES.DEFAULTS.AUTHENTICATION.DECODE_BASE64_AUTHENTICATION_TOKEN,
};

exports.GET_THE_AUTHENTICATION_TOKEN_FOR_DISTRIBUTOR = {
  method: 'authentication.token',
  params: { type: 'distributor' },
};

exports.GET_THE_AUTHENTICATION_TOKEN_FOR_DISTRIBUTOR_CIMA = {
  method: 'authentication.token',
  params: { type: 'distributor', options: { clientId: 'CIMA' } },
};

exports.GET_THE_AUTHENTICATION_TOKEN_FOR_DISTRIBUTOR_OAT = {
  method: 'authentication.token',
  params: { type: 'distributor', options: { clientId: 'OAT' } },
};

exports.FETCH_DEVICE_TOKEN = {
  method: 'authentication.device',
  params: {},
};

exports.AUTHENTICATION_DEVICE = {
  method: 'authentication.device',
  validationJsonPath: 'result',
  content:
    this.AUTHENTICATION_VARIABLES.DEFAULTS.AUTHENTICATION
      .DECODE_BASE64_AUTHENTICATION_DEVICE_TOKEN,
};

exports.FETCH_SESSION_TOKEN = {
  method: 'authentication.session',
  params: {},
};

exports.AUTHENTICATION_SESSION = {
  method: 'authentication.session',
  validationJsonPath: 'result',
  content:
    this.AUTHENTICATION_VARIABLES.DEFAULTS.AUTHENTICATION
      .DECODE_BASE64_AUTHENTICATION_DEVICE_TOKEN,
};

exports.FETCH_ROOT_TOKEN = {
  method: 'authentication.root',
  params: {},
};

exports.AUTHENTICATION_ROOT = {
  method: 'authentication.root',
  validationJsonPath: 'result',
  content:
    this.AUTHENTICATION_VARIABLES.DEFAULTS.AUTHENTICATION
      .DECODE_BASE64_AUTHENTICATION_DEVICE_TOKEN,
};

exports.GET_TOKEN_WITH_PLATFORM1_PARAMETER = {
  method: 'authentication.token',
  params: { type: 'platform1' },
  expected: 'error',
};

exports.GET_TOKEN_WITH_TRUE_PARAMETER = {
  method: 'authentication.token',
  params: true,
  expected: 'error',
};

exports.GET_TOKEN_WITH_INTEGER_PARAMETER = {
  method: 'authentication.token',
  params: 123,
  expected: 'error',
};

exports.INVALID_PARAMETER_ERROR_AUTHENTICATION_TOKEN = {
  method: 'authentication.token',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
