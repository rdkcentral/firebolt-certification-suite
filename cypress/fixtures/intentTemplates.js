const movie = {
  appId: resolveAtRuntime('appId'),
  intent: {
    action: 'playback',
    data: {
      entityType: 'program',
      assetId: resolveAtRuntime('intent->assetId'),
      programType: 'Movie',
      entityId: resolveAtRuntime('intent->entityId'),
    },
    durableAppId: resolveAtRuntime('appId'),
    origin: "WEB"
  },
};

const series = {
  appId: resolveAtRuntime('appId'),
  intent: {
    action: 'playback',
    context: {
      source: 'voice',
    },
    data: {
      entityType: 'program',
      programType: 'episode',
      entityId: resolveAtRuntime('intent->entityId'),
    },
    origin: "WEB"
  },
};

const music_song = {
  appId: resolveAtRuntime('appId'),
  intent: {
    action: 'playback',
    context: {
      source: 'voice',
    },
    data: {
      entityType: 'program',
      entityId: resolveAtRuntime('intent->entityId'),
      musicType: 'song',
    },
    origin: "WEB"
  },
};

const music_album = {
  appId: resolveAtRuntime('appId'),
  intent: {
    action: 'playback',
    context: {
      source: 'voice',
    },
    data: {
      entityType: 'program',
      entityId: resolveAtRuntime('intent->entityId'),
      musicType: 'album',
    },
    origin: "WEB"
  },
};

module.exports = { movie, series, music_song, music_album };
