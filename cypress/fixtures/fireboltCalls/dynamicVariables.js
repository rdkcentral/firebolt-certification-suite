const accountVariables = require('./account.js');
import { DEVICE_VARIABLES } from "./device";
exports.DYNAMIC_FB_CALL_VARIABLES = {
  DEFAULTS: {
    ...accountVariables.ACCOUNT_VARIABLES,
    ...DEVICE_VARIABLES
  },
};
