const errorContent = require('../objects/errorContentObjects.js');

exports.AUTHENTICATION_VARIABLES = {
  OVERRIDES: {
    AUTHENTICATION: {
      DECODE_JWT_AUTHENTICATION_TOKEN: {
        data: [
          {
            override: 0,
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
            override: 1,
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
          {
            type: 'decode',
            specialCase: 'jwt',
            validations: [
              {
                field: 'app',
                mode: 'regex',
                format: 'TOKEN_JWT_REGEXP',
                type: 'comcast.test.firecert',
                description: 'Validation of the Authentication Token app Format',
              },
            ],
          },
          {
            type: 'decode',
            specialCase: 'jwt',
            validations: [
              {
                field: 'accountId',
                mode: 'regex',
                format: 'TOKEN_JWT_REGEXP',
                type: '^[0-9]+$',
                description: 'Validation of the Authentication Token accountId Format',
              },
            ],
          },
          {
            type: 'decode',
            specialCase: 'jwt',
            validations: [
              {
                field: 'appSessionId',
                mode: 'regex',
                format: 'TOKEN_JWT_REGEXP',
                type: '^(?:.*\\d)(?:.*[a-zA-Z]).{2,}$',
                description: 'Validation of the Authentication Token appSessionId Format',
              },
            ],
          },
          {
            type: 'decode',
            specialCase: 'jwt',
            validations: [
              {
                field: 'contentProvider',
                mode: 'regex',
                format: 'TOKEN_JWT_REGEXP',
                type: 'comcast.test.firecert',
                description: 'Validation of the Authentication Token appSessionId Format',
              },
            ],
          },
          {
            type: 'decode',
            specialCase: 'jwt',
            validations: [
              {
                field: 'deviceId',
                mode: 'regex',
                format: 'TOKEN_JWT_REGEXP',
                type: '^[0-9]+$',
                description: 'Validation of the Authentication Token deviceId Format',
              },
            ],
          },
          {
            type: 'decode',
            specialCase: 'jwt',
            validations: [
              {
                field: 'deviceSessionId',
                mode: 'regex',
                format: 'TOKEN_JWT_REGEXP',
                type: '^(?:.*\\d)(?:.*[a-zA-Z]).{2,}$',
                description: 'Validation of the Authentication Token deviceSessionId Format',
              },
            ],
          },
          {
            type: 'decode',
            specialCase: 'jwt',
            validations: [
              {
                field: 'exp',
                mode: 'regex',
                format: 'TOKEN_JWT_REGEXP',
                type: '^[0-9]+$',
                description: 'Validation of the Authentication Token exp Format',
              },
            ],
          },
          {
            type: 'decode',
            specialCase: 'jwt',
            validations: [
              {
                field: 'iss',
                mode: 'regex',
                format: 'TOKEN_JWT_REGEXP',
                type: '^[A-Za-z]*$',
                description: 'Validation of the Authentication Token iss Format',
              },
            ],
          },
          {
            type: 'decode',
            specialCase: 'jwt',
            validations: [
              {
                field: 'sub',
                mode: 'regex',
                format: 'TOKEN_JWT_REGEXP',
                type: '^[A-Za-z]*$',
                description: 'Validation of the Authentication Token sub Format',
              },
            ],
          },
        ],
      },
      DECODE_BASE64_AUTHENTICATION_TOKEN: {
        data: [
          {
            override: 0,
            type: 'decode',
            specialCase: 'base64',
            validations: [
              {
                field: 'message:issueDate',
                mode: 'regex',
                format: 'TOKEN_REGEXP',
                type: '([0-9]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])Z)',
                description:
                  'Validation of the Authentication Token message:issueDate Format, Example: 2024-02-14T18:14:38Z',
              },
            ],
          },
          {
            override: 1,
            type: 'decode',
            specialCase: 'base64',
            validations: [
              {
                field: 'message:notOnOrAfter',
                mode: 'regex',
                format: 'TOKEN_REGEXP',
                type: '([0-9]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])Z)',
                description:
                  'Validation of the Authentication Token message:notOnOrAfter Format, Example: 2024-03-15T18:14:38Z',
              },
            ],
          },
          {
            type: 'decode',
            specialCase: 'base64',
            validations: [
              {
                field: 'device:locationIp',
                mode: 'regex',
                format: 'TOKEN_REGEXP',
                type: '([0-9a-fA-F\\.\\:])',
                description:
                  'Validation of the Authentication Token device:locationIp Format, Example: 24.0.88.116',
              },
            ],
          },
          {
            type: 'decode',
            specialCase: 'base64',
            validations: [
              {
                field: 'location:net-ip',
                mode: 'regex',
                format: 'TOKEN_REGEXP',
                type: '([0-9a-fA-F\\.\\:])',
                description:
                  'Validation of the Authentication Token location:net-ip Format, Example: 24.0.88.116',
              },
            ],
          },
          {
            type: 'decode',
            specialCase: 'base64',
            validations: [
              {
                field: 'device:ccpPki:model',
                mode: 'regex',
                format: 'TOKEN_REGEXP',
                type: '^(?=.*\\d)(?=.*[a-zA-Z]).{2,}$',
                description:
                  'Validation of the Authentication Token device:ccpPki:model Format, Example: SCXI11BEI',
              },
            ],
          },
          {
            type: 'decode',
            specialCase: 'base64',
            validations: [
              {
                field: 'device:ccpPki:serial',
                mode: 'regex',
                format: 'TOKEN_REGEXP',
                type: '^(?=.*\\d)(?=.*[a-zA-Z]).{2,}$',
                description:
                  'Validation of the Authentication Token device:ccpPki:serial Format, Example: XI11SC32203000EFBICO',
              },
            ],
          },
          {
            type: 'decode',
            specialCase: 'base64',
            validations: [
              {
                field: 'device:ccpPki:make',
                mode: 'regex',
                format: 'TOKEN_REGEXP',
                type: '^[A-Za-z]*$',
                description:
                  'Validation of the Authentication Token device:ccpPki:make Format, Example: Comcast',
              },
            ],
          },
          {
            type: 'decode',
            specialCase: 'base64',
            validations: [
              {
                field: 'device:ccpPki:profile',
                mode: 'regex',
                format: 'TOKEN_REGEXP',
                type: '^(?=.*\\d)(?=.*[a-zA-Z]).{2,}$',
                description:
                  'Validation of the Authentication Token device:ccpPki:profile Format, Example: xiOneSercommBcm72174',
              },
            ],
          },
          {
            type: 'decode',
            specialCase: 'base64',
            validations: [
              {
                field: 'device:ccpPki:chipPartId',
                mode: 'regex',
                format: 'TOKEN_REGEXP',
                type: '([0-9A-Fa-f]{8})',
                description:
                  'Validation of the Authentication Token device:ccpPki:chipPartId Format, Example: 0020010F',
              },
            ],
          },
          {
            type: 'decode',
            specialCase: 'base64',
            validations: [
              {
                field: 'device:ccpPki:chipModel',
                mode: 'regex',
                format: 'TOKEN_REGEXP',
                type: '^[0-9]+$',
                description:
                  'Validation of the Authentication Token device:ccpPki:chipModel Format, Example: 72174',
              },
            ],
          },
          {
            type: 'decode',
            specialCase: 'base64',
            validations: [
              {
                field: 'application:xcal:id',
                mode: 'regex',
                format: 'TOKEN_REGEXP',
                type: '^[A-Za-z.]*$',
                description:
                  'Validation of the Authentication Token application:xcal:id Format, Example: primary',
              },
            ],
          },
          {
            type: 'decode',
            specialCase: 'base64',
            validations: [
              {
                field: 'device:ccpPki:id',
                mode: 'regex',
                format: 'TOKEN_REGEXP',
                type: '([0-9A-Fa-f]{16})',
                description:
                  'Validation of the Authentication Token device:ccpPki:id Format, Example: 0020010F100B696E',
              },
            ],
          },
          {
            type: 'decode',
            specialCase: 'base64',
            validations: [
              {
                field: 'service:xcal:product',
                mode: 'regex',
                format: 'TOKEN_REGEXP',
                type: '^[A-Za-z]*$',
                description:
                  'Validation of the Authentication Token service:xcal:product Format, Example: cdvr',
              },
            ],
          },
          {
            type: 'decode',
            specialCase: 'base64',
            validations: [
              {
                field: 'session:macToken',
                mode: 'regex',
                format: 'TOKEN_REGEXP',
                type: '^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$',
                description:
                  'Validation of the Authentication Token session:macToken Format, Example: QjCCAUEMATIXDTI0MDIxNDE4MTQzOFoMATQEEKbTbW12UxdPTamtdxBTAloMATUEFHdh9k+kJU7RGr27jnwwlp0RTyAXDAE2BIG/MIG8DAExDBAxV1NLQkgzVkhCTjZZUUFKDAEyDBJNYW5hZ2VkU29jRGV2aWNlSWQMATMMEDAwMjAwMTBGMTAwQjY5NkUMATQMFHhpT25lU2VyY29tbUJjbTcyMTc0DAE1DAhobWFjU2hhMQwBNgQgCYVLDBIwOCzNSv5BKRaP6S4bHensg0cNjkf+8FlVyEYMATcMBmFlczEyOAwBOAQgVWxaSxhJrl3DA5nEInR6OuJZzWFj0IVywtFtLHgjN1UMATcMGWNvbWNhc3QtcDAyLXhhY3MtMDQ1LWFtdG0MATgMGWNvbWNhc3QtcDAyLXhhY3MtMDQ1LWFtdGU=',
              },
            ],
          },
          {
            type: 'decode',
            specialCase: 'base64',
            validations: [
              {
                field: 'service:provider',
                mode: 'regex',
                format: 'TOKEN_REGEXP',
                type: '^[A-Za-z]*$',
                description:
                  'Validation of the Authentication Token service:provider Format, Example: xcal',
              },
            ],
          },
          {
            type: 'decode',
            specialCase: 'base64',
            validations: [
              {
                field: 'device:category',
                mode: 'regex',
                format: 'TOKEN_REGEXP',
                type: '^[A-Za-z]*$',
                description:
                  'Validation of the Authentication Token device:category Format, Example: Linux',
              },
            ],
          },
          {
            type: 'decode',
            specialCase: 'base64',
            validations: [
              {
                field: 'device:provider',
                mode: 'regex',
                format: 'TOKEN_REGEXP',
                type: '^[A-Za-z]*$',
                description:
                  'Validation of the Authentication Token device:provider Format, Example: ccpPki',
              },
            ],
          },
        ],
      },
    },
  },
};

exports.DECODE_BASE64_AUTHENTICATION_TOKEN = {
  method: 'authentication.token',
  validationJsonPath: 'result',
  content:
    this.AUTHENTICATION_VARIABLES.OVERRIDES.AUTHENTICATION.DECODE_BASE64_AUTHENTICATION_TOKEN,
};

exports.PLATFORM_AUTHENTICATION_TOKEN = {
  method: 'authentication.token',
  validationJsonPath: 'result',
  content: this.AUTHENTICATION_VARIABLES.OVERRIDES.AUTHENTICATION.DECODE_JWT_AUTHENTICATION_TOKEN,
};

exports.AUTHENTICATION_DEVICE = {
  method: 'authentication.device',
  validationJsonPath: 'result',
  content:
    this.AUTHENTICATION_VARIABLES.OVERRIDES.AUTHENTICATION.DECODE_BASE64_AUTHENTICATION_TOKEN,
};

exports.AUTHENTICATION_ROOT = {
  method: 'authentication.root',
  validationJsonPath: 'result',
  content:
    this.AUTHENTICATION_VARIABLES.OVERRIDES.AUTHENTICATION.DECODE_BASE64_AUTHENTICATION_TOKEN,
};

exports.INVALID_PARAMETER_PLATFORM1_AUTH_TOKEN = {
  method: 'authentication.token',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAM_PLATFORM1_AUTH_TOKEN,
  expectingError: true,
};

exports.INVALID_PARAMETER_TYPE_BOOLEAN_AUTH_TOKEN = {
  method: 'authentication.token',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAM_TYPE_BOOLEAN_AUTH_TOKEN,
  expectingError: true,
};

exports.INVALID_PARAMETER_TYPE_INTEGER_AUTH_TOKEN = {
  method: 'authentication.token',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAM_TYPE_INTEGER_AUTH_TOKEN,
  expectingError: true,
};
