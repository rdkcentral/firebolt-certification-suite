const accessibilityVariables = require('./accessibility');
const localizationVariables = require('./localization');

exports.DYNAMIC_FB_CALL_VARIABLES = {
  DEFAULTS: {
    ...localizationVariables.LOCALIZATION_VARIABLES,
  },
  ...accessibilityVariables.ACCESSIBILITY_VARIABLES,
};
