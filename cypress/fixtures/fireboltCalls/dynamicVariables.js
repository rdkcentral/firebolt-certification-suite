const accountVariables = require('./account');
const deviceVariables = require('./device');

exports.DYNAMIC_FB_CALL_VARIABLES = {
  DEFAULTS: {
    ...accountVariables.ACCOUNT_VARIABLES,
    ...deviceVariables.DEVICE_VARIABLES,
  },
};
