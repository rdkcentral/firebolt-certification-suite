exports.DISCOVERY_LAUNCH_WITH_HOME_INTENT = {
  method: 'discovery.launch',
  params: {
    appId: 'comcast.test.firecert',
    intent: {
      action: 'home',
      context: {
        source: 'voice',
      },
    },
  },
};
exports.HOME_INTENT_FOR_PARAMETERS_INITIALIZATION = {
  method: 'parameters.initialization',
  validationJsonPath: 'result',
  content: {
    us_privacy: '1-Y-',
    lmt: 1,
    discovery: {
      navigateTo: {
        action: 'home',
        context: {
          source: 'voice',
        },
      },
    },
  },
};
