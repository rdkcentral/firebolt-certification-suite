function getCurrentISODate() {
  return new Date().toISOString(); // Date format: 2021-04-23T18:25:43.511Z
}

exports.ONSIGNIN_FOR_DISCOVERY_WITH_APPID = {
  event: 'discovery.onSignIn',
  validationJsonPath: 'eventResponse',
  content: {
    appId: 'comcast.test.firecert',
  },
};

exports.ONSIGNOUT_FOR_DISCOVERY_WITH_APPID = {
  event: 'discovery.onSignOut',
  validationJsonPath: 'eventResponse',
  content: {
    appId: 'comcast.test.firecert',
  },
};

exports.NOTIFY_CONTENT_ACCESS_WITH_AVAILABILITIES_CHANNEL_TYPE = {
  method: 'discovery.contentAccess',
  params: {
    ids: {
      availabilities: [
        {
          type: 'channel-lineup',
          id: 'chmap-lineup-a-firecert',
          startTime: '2021-04-23T18:25:43.511Z',
          endTime: '2021-04-23T18:25:43.511Z',
          catalogId: 'comcast:merlin:ProductContext:4773206437396866174',
        },
      ],
    },
  },
};
exports.NOTIFY_CONTENT_ACCESS_WITH_AVAILABILITIES_PROGRAM_TYPE = {
  method: 'discovery.contentAccess',
  params: {
    ids: {
      availabilities: [
        {
          type: 'program-lineup',
          id: 'chmap-lineup-a-firecert',
          startTime: '2021-04-23T18:25:43.511Z',
          endTime: '2021-04-23T18:25:43.511Z',
          catalogId: 'comcast:merlin:ProductContext:5546018607842556174',
        },
      ],
    },
  },
};

exports.NOTIFY_CONTENT_ACCESS_WITH_AVAILABILITIES_TYPE_ID_AND_CATALOGID = {
  method: 'discovery.contentAccess',
  params: {
    ids: {
      availabilities: [
        {
          type: 'program-lineup',
          id: 'chmap-lineup-a-firecert',
          catalogId: 'comcast:merlin:ProductContext:5546018607842556174',
        },
      ],
    },
  },
};
exports.NOTIFY_CONTENT_ACCESS_WITH_AVAILABILITIES_TYPE_ID_CATALOGID_AND_STARTTIME = {
  method: 'discovery.contentAccess',
  params: {
    ids: {
      availabilities: [
        {
          type: 'program-lineup',
          id: 'chmap-lineup-a-firecert',
          catalogId: 'comcast:merlin:ProductContext:5546018607842556174',
          startTime: '2021-04-23T18:25:43.511Z',
        },
      ],
    },
  },
};
exports.NOTIFY_CONTENT_ACCESS_WITH_AVAILABILITIES_TYPE_ID_CATALOGID_STARTTIME_AND_ENDTIME = {
  method: 'discovery.contentAccess',
  params: {
    ids: {
      availabilities: [
        {
          type: 'program-lineup',
          id: 'chmap-lineup-a-firecert',
          catalogId: 'comcast:merlin:ProductContext:5546018607842556174',
          startTime: '2021-04-23T18:25:43.511Z',
          endTime: '2021-04-23T18:25:43.511Z',
        },
      ],
    },
  },
};

exports.DISCOVERY_WATCHED_PROGRESS_LT_1 = {
  method: 'Discovery.watched',
  params: {
    entityId: 'partner.com/entity/123',
    progress: 0.95,
    completed: true,
    watchedOn: getCurrentISODate(),
  },
};

exports.DISCOVERY_WATCHED_PROGRESS_GT_1 = {
  method: 'Discovery.watched',
  params: {
    entityId: 'partner.com/entity/123',
    progress: 5,
    completed: true,
    watchedOn: getCurrentISODate(),
  },
};

exports.DISCOVERY_WATCHED_WITH_80_PERCENT_PROGRESS = {
  method: 'Discovery.watched',
  params: {
    entityId: 'partner.com/entity/123',
    progress: 0.8,
    completed: true,
    watchedOn: getCurrentISODate(),
  },
};

exports.DISCOVERY_WATCHED_WITH_90_PERCENT_PROGRESS = {
  method: 'Discovery.watched',
  params: {
    entityId: 'partner.com/entity/123',
    progress: 0.9,
    completed: true,
    watchedOn: getCurrentISODate(),
  },
};

exports.DISCOVERY_SIGNOUT = {
  method: 'Discovery.signOut',
  params: {},
};

exports.DISCOVERY_SIGNIN = {
  method: 'Discovery.signIn',
  params: {
    entitlements: [
      {
        entitlementId: '123',
        startTime: getCurrentISODate(),
        endTime: getCurrentISODate(),
      },
    ],
  },
};

exports.DISCOVERY_WATCHNEXT_PROGRESS_OF_1SEC = {
  method: 'Discovery.watchNext',
  params: {
    title: 'A cool man',
    identifiers: {
      entityId: 'test21',
    },
  },
};

exports.DISCOVERY_LAUNCH_SOURCE_OVERRIDE = {
  method: 'Discovery.launch',
  params: {
    appId: 'foo',
    intent: {
      action: 'home',
      context: {
        source: 'voice',
      },
    },
  },
};

exports.DISCOVERY_LAUNCH_WITH_APPID_MAIN = {
  method: 'Discovery.launch',
  params: {
    appId: 'urn:firebolt:apps:main',
    intent: {
      action: 'home',
      context: {
        source: 'voice',
      },
    },
  },
};

exports.TRUE_FOR_DISCOVERY_WATCHED = {
  method: 'Discovery.watched',
  validationJsonPath: 'result',
  content: true,
};

exports.TRUE_FOR_DISCOVERY_SIGNOUT = {
  method: 'Discovery.signOut',
  validationJsonPath: 'result',
  content: true,
};

exports.TRUE_FOR_DISCOVERY_SIGNIN = {
  method: 'Discovery.signIn',
  validationJsonPath: 'result',
  content: true,
};

exports.TRUE_FOR_DISCOVERY_WATCHNEXT = {
  method: 'Discovery.signIn',
  validationJsonPath: 'result',
  content: true,
};

exports.TRUE_FOR_DISCOVERY_LAUNCH = {
  method: 'Discovery.launch',
  validationJsonPath: 'result',
  content: true,
};
