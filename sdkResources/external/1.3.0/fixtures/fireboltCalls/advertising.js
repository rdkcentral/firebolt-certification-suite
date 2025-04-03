exports.ADVERTISING_APPBUNDLEID = {
  method: 'advertising.appBundleId',
  validationJsonPath: 'result',
  content: 'comcast.test.firecert.Comcast',
};

exports.ADVERTISING_VARIABLES = {
  CONFIG: {
    ifaValue: {
      data: [
        {
          type: 'regEx',
          validations: [
            {
              mode: 'regex',
              type: '/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/',
              description: 'Validation of normal ifaValue',
            },
          ],
        },
      ],
    },
  },
};

exports.RESPONSE_INCLUDING_NORMAL_IFAVALUE = {
  method: 'advertising.config',
  validationJsonPath: 'result.ifaValue',
  content: this.ADVERTISING_VARIABLES.CONFIG.ifaValue,
};
