exports.DISMISS = {
  content: {
    data: [
      {
        type: 'custom',
        assertionDef: 'stateValidation',
        validations: [
          {
            assertionType: 'soft',
            appState: 'INACTIVE',
            epgUIVisibilityState: 'VISIBLE',
          },
        ],
      },
      {
        type: 'custom',
        assertionDef: 'validateInteractionLogs',
        validations: [
          {
            firebolt: {
              assertionType: 'soft',
              type: {
                methods: {
                  'lifecycle.close': [],
                },
              },
              description: '',
            },
            badger: {
              assertionType: 'soft',
              type: {
                methods: {
                  'badger.shutdown': [],
                },
              },
              description: '',
            },
            native: {
              assertionType: 'soft',
              type: {
                methods: {},
              },
              description: '',
            },
            hybrid: {
              assertionType: 'soft',
              type: {
                methods: {
                  'lifecycle.close': [],
                  'badger.shutdown': [],
                },
              },
              description: '',
            },
          },
        ],
      },
      {
        type: 'custom',
        assertionDef: 'screenshotValidation',
        validations: [
          {
            type: 'image',
            label: 'home',
            confidence: 50,
          },
        ],
      },
    ],
  },
};
