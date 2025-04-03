exports.VOICE_GUIDANCE_PARAMS = { keys: ['VOICE_GUIDANCE_STATE'] };
exports.TEXTTOSPEECHENABLED2_PARAMS = { keys: ['TextToSpeechEnabled2'] };

exports.BADGER_SUBSCRIBETOSETTINGS_VOICEGUIDANCE = {
  method: 'badger.subscribeToSettings',
  params: this.VOICE_GUIDANCE_PARAMS,
};

exports.BADGER_SUBSCRIBETOSETTINGS_TEXTTOSPEECHENABLED2 = {
  method: 'badger.subscribeToSettings',
  params: this.TEXTTOSPEECHENABLED2_PARAMS,
};

exports.GET_BADGER_SETTINGS = {
  method: 'badger.settings',
  params: {
    keys: [
      'CC_STATE',
      'VOICE_GUIDANCE_STATE',
      'DisplayPersonalizedRecommendations',
      'RememberWatchedPrograms',
      'friendly_name',
      'legacyMiniGuide',
      'power_save_status',
      'ShareWatchHistoryStatus',
      'ShowClosedCapture',
      'TextToSpeechEnabled2',
    ],
  },
};

exports.GET_VOICEGUIDANCE_STATE = {
  method: 'badger.settings',
  params: this.VOICE_GUIDANCE_PARAMS,
};

exports.GET_TEXTTOSPEECHENABLED2_STATE = {
  method: 'badger.settings',
  params: this.TEXTTOSPEECHENABLED2_PARAMS,
};

exports.FALSE_FOR_BADGER_VOICEGUIDANCE_SETTINGS = {
  method: 'badger.settings',
  validationJsonPath: 'result.VOICE_GUIDANCE_STATE.enabled',
  content: false,
};

exports.TRUE_FOR_BADGER_VOICEGUIDANCE_SETTINGS = {
  method: 'badger.settings',
  validationJsonPath: 'result.VOICE_GUIDANCE_STATE.enabled',
  content: true,
};

exports.FALSE_FOR_BADGER_TEXTTOSPEECHENABLED2_SETTINGS = {
  method: 'badger.settings',
  validationJsonPath: 'result.TextToSpeechEnabled2.enabled',
  content: false,
};

exports.TRUE_FOR_BADGER_TEXTTOSPEECHENABLED2_SETTINGS = {
  method: 'badger.settings',
  validationJsonPath: 'result.TextToSpeechEnabled2.enabled',
  content: true,
};

exports.SUBSCRIBETOSETTINGS_FOR_VOICEGUIDANCE_WITH_FALSE = {
  event: 'badger.subscribeToSettings',
  validationJsonPath: 'eventResponse.VOICE_GUIDANCE_STATE.enabled',
  content: false,
};

exports.SUBSCRIBETOSETTINGS_FOR_VOICEGUIDANCE_WITH_TRUE = {
  event: 'badger.subscribeToSettings',
  validationJsonPath: 'eventResponse.VOICE_GUIDANCE_STATE.enabled',
  content: true,
};

exports.SUBSCRIBETOSETTINGS_FOR_TEXTTOSPEECHENABLED2_WITH_FALSE = {
  event: 'badger.subscribeToSettings',
  validationJsonPath: 'eventResponse.TextToSpeechEnabled2.enabled',
  content: false,
};

exports.SUBSCRIBETOSETTINGS_FOR_TEXTTOSPEECHENABLED2_WITH_TRUE = {
  event: 'badger.subscribeToSettings',
  validationJsonPath: 'eventResponse.TextToSpeechEnabled2.enabled',
  content: true,
};
