exports.PARAMETERS_CONTENT = {
  ADVERTISING_ADVERTISINGID_ADOFF: {
    data: [
      {
        type: 'miscellaneous',
        validations: [
          {
            type: 'limitAdTrackingOFF',
            description:
              'Validation of the Advertising AdvertisingId When LimitAdTracking OFF Format',
          },
        ],
      },
    ],
  },
  ADVERTISING_ADVERTISINGID_ADON: {
    data: [
      {
        type: 'miscellaneous',
        validations: [
          {
            type: 'limitAdTrackingON',
            description:
              'Validation of the Advertising AdvertisingId When LimitAdTracking ON Format',
          },
        ],
      },
    ],
  },
  PARAMETERS_INITIALIZATION: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: 'PARAMETERS_INITIALIZATION',
            description: 'Validation of the Parameters initialization for homeIntent Format',
          },
        ],
      },
    ],
  },
};
exports.GET_PARAMETERS_INITIALIZATION = {
  method: 'parameters.initialization',
  params: {},
};
exports.TRUE_FOR_PARAMETERS_INITIALIZATION = {
  method: 'parameters.initialization',
  validationJsonPath: 'result',
  content: this.PARAMETERS_CONTENT.ADVERTISING_ADVERTISINGID_ADOFF,
};
exports.FALSE_FOR_PARAMETERS_INITIALIZATION = {
  method: 'parameters.initialization',
  validationJsonPath: 'result',
  content: this.PARAMETERS_CONTENT.ADVERTISING_ADVERTISINGID_ADON,
};
exports.DISCOVERY_LAUNCH_WITH_HOME_INTENT = {
  method: 'discovery.launch',
  params: 'PARAMETERS_HOME_INTENT',
};
exports.HOME_INTENT_FOR_PARAMETERS_INITIALIZATION = {
  method: 'parameters.initialization',
  validationJsonPath: 'result',
  content: 'PARAMETERS_INITIALIZATION',
};
exports.TRUE_FOR_DISCOVERYLAUNCH = {
  method: 'discovery.launch',
  validationJsonPath: 'result',
  content: true,
};
