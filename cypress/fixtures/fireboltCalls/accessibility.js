exports.CLOSEDCAPTIONS_SETTINGS = {
  method: 'accessibility.closedCaptionsSettings',
  params: null,
  validationJsonPath: resolveAtRuntime(['result.{{attribute}}', 'result.styles.{{attribute}}']),
  setMethod: resolveAtRuntime('manage_closedcaptions.set{{attribute.uppercaseFirstChar}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
  event: 'accessibility.onClosedCaptionsSettingsChanged',
  eventValidationJsonPath: resolveAtRuntime([
    'eventResponse.{{attribute}}',
    'eventResponse.styles.{{attribute}}',
  ]),
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: resolveAtRuntime('value'),
            description: resolveAtRuntime(
              'Validating that accessibility.closedCaptionSettings {{attribute}} is {{value}}'
            ),
          },
        ],
      },
    ],
  },
};

exports.VOICEGUIDANCE_SETTINGS = {
  method: 'accessibility.voiceGuidanceSettings',
  params: null,
  validationJsonPath: resolveAtRuntime(['result.{{attribute}}']),
  setMethod: resolveAtRuntime('manage_voiceguidance.set{{attribute.uppercaseFirstChar}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
  event: 'accessibility.onVoiceGuidanceSettingsChanged',
  eventValidationJsonPath: resolveAtRuntime(['eventResponse.{{attribute}}']),
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: resolveAtRuntime('value'),
            description: resolveAtRuntime(
              'Validating that accessibility.voiceGuidanceSettings {{attribute}} is {{value}}'
            ),
          },
        ],
      },
    ],
  },
};

exports.AUDIODESCRIPTIONS_SETTINGS = {
  method: 'accessibility.audioDescriptionSettings',
  params: null,
  validationJsonPath: resolveAtRuntime(['result.{{attribute}}']),
  setMethod: resolveAtRuntime('manage_audiodescriptions.set{{attribute.uppercaseFirstChar}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
  event: 'accessibility.onAudioDescriptionSettingsChanged',
  eventValidationJsonPath: resolveAtRuntime(['eventResponse.{{attribute}}']),
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: resolveAtRuntime('value'),
            description: resolveAtRuntime(
              'Validating that accessibility.audioDescriptionSettings {{attribute}} is {{value}}'
            ),
          },
        ],
      },
    ],
  },
};

exports.CLOSEDCAPTIONS = {
  method: 'accessibility.closedCaptions',
  params: null,
  validationJsonPath: resolveAtRuntime(['result.{{attribute}}', 'result.styles.{{attribute}}']),
  setMethod: resolveAtRuntime('manage_closedcaptions.set{{attribute.uppercaseFirstChar}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
  event: 'accessibility.onClosedCaptionsSettingsChanged',
  eventValidationJsonPath: resolveAtRuntime([
    'eventResponse.{{attribute}}',
    'eventResponse.styles.{{attribute}}',
  ]),
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: resolveAtRuntime('value'),
            description: resolveAtRuntime(
              'Validating that accessibility.closedCaptions {{attribute}} is {{value}}'
            ),
          },
        ],
      },
    ],
  },
};

exports.VOICEGUIDANCE = {
  method: 'accessibility.voiceGuidance',
  params: null,
  validationJsonPath: resolveAtRuntime(['result.{{attribute}}']),
  setMethod: resolveAtRuntime('manage_voiceguidance.set{{attribute.uppercaseFirstChar}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
  event: 'accessibility.onVoiceGuidanceSettingsChanged',
  eventValidationJsonPath: resolveAtRuntime(['eventResponse.{{attribute}}']),
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: resolveAtRuntime('value'),
            description: resolveAtRuntime(
              'Validating that accessibility.voiceGuidance {{attribute}} is {{value}}'
            ),
          },
        ],
      },
    ],
  },
};
