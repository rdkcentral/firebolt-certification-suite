exports.GET_PROFILE_VIEWINGRESTRICTIONS = {
  method: 'profile.viewingRestrictions',
  validationJsonPath: 'result',
  content: 'TRUE',
};

exports.PROFILE_ONVIEWINGRESTRICTIONSCHANGED = {
  method: 'Profile.onViewingRestrictionsChanged',
  params: {},
};

exports.VIEWINGRESTRICTIONS_IS_ENABLED = {
  method: 'Profile.onViewingRestrictionsChanged',
  validationJsonPath: 'result.enabled',
  content: 'TRUE',
};

exports.VIEWINGRESTRICTIONS_IS_DISABLED = {
  method: 'Profile.onViewingRestrictionsChanged',
  validationJsonPath: 'result.enabled',
  content: 'FALSE',
};
// enable viewingRestrictions
exports.ENABLING_VIEWINGRESTRICTIONS = {
  method: 'Profile.onViewingRestrictionsChanged',
  params: {
    method: 'Profile.onViewingRestrictionsChanged',
    result: true,
  },
};

exports.DISABLING_VIEWINGRESTRICTIONS = {
  method: 'Profile.onViewingRestrictionsChanged',
  params: {
    method: 'Profile.onViewingRestrictionsChanged',
    result: false,
  },
};
