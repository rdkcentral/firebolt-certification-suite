const accountVariables = require('./account.js');
const authenticationVariables = require('./authentication.js')
exports.DYNAMIC_FB_CALL_VARIABLES = {
    DEFAULTS: {
    ...accountVariables.ACCOUNT_VARIABLES,
    ...authenticationVariables.AUTHENTICATION_VARIABLES
}
}
