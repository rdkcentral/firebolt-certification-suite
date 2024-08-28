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

exports.STATIC_COMMON_VARIABLES = {
    DEFAULT: {
      TRUE: true,
      FALSE: false
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
