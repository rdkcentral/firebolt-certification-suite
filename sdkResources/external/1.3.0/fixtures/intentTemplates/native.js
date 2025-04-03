const native = {
  Spotify: {
    song: {
      args: {
        key: resolveAtRuntime('intent->key'),
        uri: resolveAtRuntime('intent->entityId'),
      },
      origin: 'WEB',
    },
    appLaunch: {
      action: 'launch',
      context: {
        source: 'voice',
      },
    },
  },
  YouTube: {
    video: {
      origin: 'WEB',
      args: {
        query: {
          launch: 'guide',
          v: resolveAtRuntime('intent->videoId'),
        },
      },
    },
    appLaunch: {
      action: 'launch',
      context: {
        source: 'voice',
      },
    },
  },
  NetflixApp: {
    movie: {
      origin: 'WEB',
      args: {
        iid: resolveAtRuntime('intent->iid'),
      },
    },
    appLaunch: {
      action: 'launch',
      context: {
        source: 'voice',
      },
    },
  },
};

module.exports = { native };
