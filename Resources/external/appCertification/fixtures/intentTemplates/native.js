const native = {
  Spotify: {
    song: {
      args: {
        key: resolveAtRuntime('intent->key'),
        uri: resolveAtRuntime('intent->entityId'),
      },
      origin: 'WEB',
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
  },
  NetflixApp: {
    movie: {
      origin: 'WEB',
      args: {
        iid: resolveAtRuntime('intent->iid'),
      },
    },
  },
};

module.exports = { native };
