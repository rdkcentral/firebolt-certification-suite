const errorContent = require('../objects/errorContentObjects.js');
exports.ACCOUNT_VARIABLES = {
  ACCOUNT: {
    id: {
      data: [
        {
          type: 'fixture',
          validations: [
            {
              mode: 'deviceContentValidation',
              type: extractEnvValue('ACCOUNTID'),
              description: 'Validation of the Account Id',
            },
          ],
        },
      ],
    },
    uid: {
      data: [
        {
          type: 'regEx',
          validations: [
            {
              mode: 'regex',
              type: '/^(?:.*d)(?:.*[a-zA-Z]).{2,}$/',
              description: 'Validation of the Account uid',
            },
          ],
        },
      ],
    },
  },
};

exports.ACCOUNT_ID_UID = {
  method: resolveAtRuntime('account.{{attribute}}'),
  params: null,
  validationJsonPath: 'result',
  content: resolveAtRuntime('DYNAMIC_FB_CALL_VARIABLES.DEFAULTS.ACCOUNT.{{attribute}}'),
};

exports.FETCH_ACCOUNT_ID_WHEN_DEVICE_IS_NOT_PROVISIONED = {
  method: 'account.id',
  params: {},
  expected: 'error',
};

exports.FETCH_ACCOUNT_UID_WHEN_DEVICE_IS_NOT_PROVISIONED = {
  method: 'account.uid',
  params: {},
  expected: 'error',
};

exports.INVALID_PARAMETER_ERROR_FOR_ACCOUNT_ID = {
  method: 'account.id',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};

exports.INVALID_PARAMETER_ERROR_FOR_ACCOUNT_UID = {
  method: 'account.uid',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};

exports.PUSH_SESSION_TOKEN = {
  method: 'manage_account.session',
  params: { token: 'RmlyZWJvbHQgTWFuYWdlIFNESyBSb2NrcyEhIQ==', expiresIn: 84000 },
};

exports.GET_ADVERTISINGID_WITH_CUSTOM_ERROR = {
  method: 'advertising.advertisingId',
  params: { value: true },
  expected: 'error',
};

exports.SET_ACCOUNT_SESSION_WITH_INVALID_TOKEN = {
  method: 'manage_account.session',
  params: { token: 12345, expiresIn: 84000 },
  expected: 'error',
};

exports.SET_ACCOUNT_SESSION_WITH_INVALID_EXPIRESIN = {
  method: 'manage_account.session',
  params: { token: 'RmlyZWJvbHQgTWFuYWdlIFNESyBSb2NrcyEhIQ==', expiresIn: 'BJGHhjbdcJKSW' },
  expected: 'error',
};

exports.SET_ACCOUNT_SESSION_WITH_INVALID_EXPIRESIN_VALUE = {
  method: 'manage_account.session',
  params: { token: 'RmlyZWJvbHQgTWFuYWdlIFNESyBSb2NrcyEhIQ==', expiresIn: 0 },
  expected: 'error',
};

exports.SET_ACCOUNT_SESSION_WITHOUT_PARAMETERS = {
  method: 'manage_account.session',
  params: {},
  expected: 'error',
};

exports.INVALID_PARAMETERS_FOR_ACCOUNT_SESSION = {
  method: 'manage_account.session',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
