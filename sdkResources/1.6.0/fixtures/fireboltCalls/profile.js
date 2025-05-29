const errorContent = require('../objects/errorContentObjects.js');
exports.PROFILE_CONTENT = {
  VIEWINGRESTRICTIONS_FOR_MPAA_WITH_PG_RATING: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: {
              enabled: true,
              restrictions: [
                {
                  scheme: 'MPAA',
                  ratings: [
                    {
                      rating: 'PG',
                    },
                  ],
                },
              ],
            },
            description: 'Validation of the profile.viewingRestrictions Format',
          },
        ],
      },
    ],
  },
  VIEWINGRESTRICTIONS_FOR_US_TV_WITH_TV_14_RATING_SUBRATING_V: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: {
              enabled: true,
              restrictions: [
                {
                  scheme: 'US-TV',
                  ratings: [
                    {
                      rating: 'TV-14',
                      subRatings: ['V'],
                    },
                  ],
                },
              ],
            },
            description: 'Validation of the profile.viewingRestrictions Format',
          },
        ],
      },
    ],
  },
};

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

exports.EXPECTED_RESTRICTION_WITH_PG_RATING_FOR_MPAA = {
  // TODO: need to add method name
  method: '',
  validationJsonPath: 'result',
  content: this.PROFILE_CONTENT.VIEWINGRESTRICTIONS_FOR_MPAA_WITH_PG_RATING,
};

exports.EXPECTED_RESTRICTION_WITH_PG_RATING_FOR_MPAA = {
  // TODO: need to add method name
  method: '',
  validationJsonPath: 'result',
  content: this.PROFILE_CONTENT.VIEWINGRESTRICTIONS_FOR_US_TV_WITH_TV_14_RATING_SUBRATING_V,
};

exports.INVALID_PARAMETERS_FOR_PROFILE_VIEWRESTRICTIONS = {
  // TODO: need to add method name
  method: '',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};