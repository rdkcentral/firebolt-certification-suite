exports.DYNAMIC_FB_CALL_VARIABLES = {
  DEFAULTS: {
    ACCOUNT: {
      ID: {
        data: [
          {
            type: 'fixture',
            validations: [
              {
                mode: 'deviceContentValidation',
                type: 'ACCOUNTID',
                description: 'Validation of the Account Id',
              },
            ],
          },
        ],
      },
      UID: {
        data: [
          {
            type: 'regEx',
            validations: [
              {
                mode: 'regex',
                type: 'UID',
                description: 'Validation of the Account uid',
              },
            ],
          },
        ],
      },
    },
  },
};

exports.FETCH_ACCOUNT_ID = {
  method: 'account.id',
  params: {},
};

exports.ACCOUNT_ID = {
  method: 'account.id',
  validationJsonPath: 'result',
  content: this.DYNAMIC_FB_CALL_VARIABLES.DEFAULTS.ACCOUNT.ID,
};

exports.FETCH_ACCOUNT_UID = {
  method: 'account.uid',
  params: {},
};

exports.ACCOUNT_UID = {
  method: 'account.uid',
  validationJsonPath: 'result',
  content: this.DYNAMIC_FB_CALL_VARIABLES.DEFAULTS.ACCOUNT.UID,
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