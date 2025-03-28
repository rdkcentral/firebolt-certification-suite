exports.FCA_APP_USER_GRANTS_PARAMS = {
  role: 'use',
  capability: 'xrn:firebolt:capability:data:app-usage',
  options: {
    appId: 'comcast.test.firecert',
  },
};

exports.FCA_APP_USER_GRANTS_REQUEST_PARAMS = {
  appId: 'comcast.test.firecert',
  permissions: [
    {
      role: 'use',
      capability: 'xrn:firebolt:capability:data:app-usage',
    },
  ],
};

exports.APPROVE_AN_APP_USAGE_USER_GRANT = {
  method: 'usergrants.grant',
  params: this.FCA_APP_USER_GRANTS_PARAMS,
};

exports.DENY_AN_APP_USAGE_USER_GRANT = {
  method: 'usergrants.deny',
  params: this.FCA_APP_USER_GRANTS_PARAMS,
};

exports.REQUEST_AN_APP_USAGE_USER_GRANT = {
  method: 'usergrants.request',
  params: this.FCA_APP_USER_GRANTS_REQUEST_PARAMS,
};

exports.CLEAR_AN_APP_USAGE_USER_GRANT = {
  method: 'usergrants.clear',
  params: this.FCA_APP_USER_GRANTS_PARAMS,
};

exports.GRANTED_STATE_OF_THE_STORED_GRANT = {
  method: 'usergrants.request',
  validationJsonPath: 'result[0].state',
  content: 'granted',
};

exports.DENIED_STATE_OF_THE_STORED_GRANT = {
  method: 'usergrants.request',
  validationJsonPath: 'result[0].state',
  content: 'denied',
};

exports.NO_STORED_GRANT = {
  method: 'usergrants.request',
  validationJsonPath: 'result',
  content: [],
};
