const errorContent = require('../objects/errorContentObjects.js');

exports.DEFINE_SESSION_PARAMS = (appId, type) => {
  const SESSION_PARAMS = {
    session: {
      app: {
        id: appId,
        url: 'https://some-app.firebolt.rdkcentral.com',
      },
      runtime: {
        id: 'WebBrowser-1',
      },
      launch: {
        inactive: type === 'inactive' ? true : false,
        intent: {
          action: 'search',
          data: { query: 'Dog videos' },
          context: { source: 'voice' },
        },
      },
    },
  };
  return SESSION_PARAMS;
};

exports.DEFINE_APP_STATE = (appId, state) => {
  const APP_STATE = {
    appId: appId,
    state: state,
  };
  return APP_STATE;
};

exports.LIFECYCLE_MANAGEMENT_VARIABLES = {
  SESSION: {
    NO_INTENT_PARAMS: {
      session: {
        app: {
          id: 'someApp',
          url: 'https://some-app.firebolt.rdkcentral.com',
        },
        runtime: {
          id: 'WebBrowser-1',
        },
        launch: {},
      },
    },
  },
  VALIDATION_OBJECTS: {
    RESPONSE_INCLUDING_2_SESSION_IDS: {
      data: [
        {
          type: 'custom',
          override: 0,
          assertionDef: 'validateInactiveSession',
          validations: [
            {
              type: 'inactiveSession',
              description:
                'Validate if the response has 2 Session Ids (sessionId and loadedSessionId) in UUID format',
            },
          ],
        },
      ],
    },
    RESPONSE_INCLUDING_3_SESSION_IDS: {
      data: [
        {
          type: 'custom',
          override: 0,
          assertionDef: 'validateActiveSession',
          validations: [
            {
              type: 'activeSession',
              description:
                'Validate if the response has 3 Session Ids (sessionId, loadedSessionId and activeSessionId) in UUID format',
            },
          ],
        },
      ],
    },
    RESPONSE_INCLUDING_A_NEW_ACTIVESESSIONID: {
      data: [
        {
          type: 'custom',
          override: 0,
          assertionDef: 'validateNewActiveSession',
          validations: [
            {
              type: 'newActiveSession',
              description:
                'Validate if the response has a new activeSessionId but sessionId & loadedSessionId are the same in UUID format',
            },
          ],
        },
      ],
    },
  },
};

exports.CREATE_AN_INACTIVE_SESSION = {
  method: 'lifecyclemanagement.session',
  params: this.DEFINE_SESSION_PARAMS('comcast.test.firecert', 'inactive'),
};

exports.CREATE_AN_ACTIVE_SESSION = {
  method: 'lifecyclemanagement.session',
  params: this.DEFINE_SESSION_PARAMS('comcast.test.firecert', 'active'),
};

exports.RESPONSE_INCLUDING_2_SESSION_IDS = {
  method: 'lifecyclemanagement.session',
  validationJsonPath: 'result',
  content: this.LIFECYCLE_MANAGEMENT_VARIABLES.VALIDATION_OBJECTS.RESPONSE_INCLUDING_2_SESSION_IDS,
};

exports.RESPONSE_INCLUDING_3_SESSION_IDS = {
  method: 'lifecyclemanagement.session',
  validationJsonPath: 'result',
  content: this.LIFECYCLE_MANAGEMENT_VARIABLES.VALIDATION_OBJECTS.RESPONSE_INCLUDING_3_SESSION_IDS,
};

exports.CREATE_AN_ACTIVE_SESSION_FOR_TESTAPPID = {
  method: 'lifecyclemanagement.session',
  params: this.DEFINE_SESSION_PARAMS('testAppId', 'active'),
};

exports.SET_THE_STATE_OF_TESTAPPID_TO_INACTIVE = {
  method: 'lifecyclemanagement.setState',
  params: this.DEFINE_APP_STATE('testAppId', 'inactive'),
};

exports.SET_THE_STATE_OF_TESTAPPID_TO_FOREGROUND = {
  method: 'lifecyclemanagement.setState',
  params: this.DEFINE_APP_STATE('testAppId', 'foreground'),
};

exports.CREATE_A_NEW_ACTIVE_SESSION_FOR_TESTAPPID = this.CREATE_AN_ACTIVE_SESSION_FOR_TESTAPPID;

exports.RESPONSE_INCLUDING_A_NEW_ACTIVESESSIONID = {
  method: 'lifecyclemanagement.session',
  validationJsonPath: 'result',
  content:
    this.LIFECYCLE_MANAGEMENT_VARIABLES.VALIDATION_OBJECTS.RESPONSE_INCLUDING_A_NEW_ACTIVESESSIONID,
};

exports.CREATE_A_SESSION_WITH_NO_INTENT = {
  method: 'lifecyclemanagement.session',
  params: this.LIFECYCLE_MANAGEMENT_VARIABLES.SESSION.NO_INTENT_PARAMS,
  expected: 'error',
};

exports.AN_ERROR_FOR_LIFECYCLEMANAGEMENT_SESSION = {
  method: 'lifecyclemanagement.session',
  validationJsonPath: 'result',
  content: errorContent.NO_INTENT_ERROR,
  expectingError: true,
};
