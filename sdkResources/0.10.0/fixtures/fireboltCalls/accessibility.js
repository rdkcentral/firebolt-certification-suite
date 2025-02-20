exports.ACCESSIBILITY_CLOSEDCAPTIONSSETTINGS = {
  method: 'accessibility.closedCaptionsSettings',
  params: {},
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

exports.ACCESSIBILITY_VOICEGUIDANCESETTINGS = {
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

exports.ACCESSIBILITY_AUDIODESCRIPTIONSETTINGS = {
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

exports.ACCESSIBILITY_CLOSEDCAPTIONS = {
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

exports.ACCESSIBILITY_VOICEGUIDANCE = {
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

exports.ACCESSIBILITY_CLOSEDCAPTIONS_SETTINGS_SET_TO_NULL = {
  method: 'accessibility.closedCaptionsSettings',
  validationJsonPath: resolveAtRuntime('result.styles.{{attribute}}'),
  setMethod: resolveAtRuntime('manage_closedcaptions.set{{attribute.uppercaseFirstChar}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
  event: 'accessibility.onClosedCaptionsSettingsChanged',
  eventValidationJsonPath: resolveAtRuntime('eventResponse.styles.{{attribute}}'),
  content: resolveAtRuntime('DYNAMIC_FB_CALL_VARIABLES.CLOSEDCAPTIONS.NULL_CONTENT'),
};

exports.ACCESSIBILITY_VARIABLES = {
  CLOSEDCAPTIONS: {
    NULL_CONTENT: {
      data: [
        {
          type: 'undefined',
          validations: [
            {
              field: resolveAtRuntime('result.styles.{{attribute}}'),
              description: resolveAtRuntime(
                'Validating that accessibility.closedCaptionSettings {{attribute}} is default'
              ),
            },
          ],
        },
      ],
    },
  },
};

exports.ACCESSIBILITY_HIGHCONTRASTUI = {
  method: 'accessibility.highContrastUI',
  params: {},
  validationJsonPath: 'result',
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: true,
            description: resolveAtRuntime('Validating that accessibility.highContrastUI is true'),
          },
        ],
      },
    ],
  },
};
