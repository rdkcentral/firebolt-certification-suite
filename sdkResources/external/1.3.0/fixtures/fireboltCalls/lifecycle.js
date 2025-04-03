exports.THIRD_PARTY_APP_IS_LAUNCHED = {
  event: 'lifecycleManagement.onRequestReady',
  validationJsonPath: 'eventResponse.parameters.appId',
  expectingError: false,
  appId: Cypress.env('firstPartyAppId'),
  eventExpected: 'triggers',
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: resolveAtRuntime('appId'),
          },
        ],
      },
      {
        type: 'custom',
        assertionDef: 'screenshotValidation',
        validations: [
          {
            type: 'image',
            label: resolveAtRuntime('page'),
            confidence: 50,
          },
        ],
      },
      {
        type: 'performanceValidation',
        validations: [],
      },
    ],
  },
};

exports.COLD_LAUNCH = {
  content: {
    data: [
      {
        type: 'custom',
        assertionDef: 'validateInteractionLogs',
        validations: [
          {
            firebolt: {
              assertionType: 'soft',
              type: {
                methods: {
                  'lifecycle.ready': [],
                  'parameters.initialization': [],
                  'metrics.ready': [],
                  'lifecycle.onForeground': [],
                  'discovery.onNavigateTo': [],
                },
              },
              description: '',
            },
            badger: {
              assertionType: 'soft',
              type: {
                methods: {
                  'badger.dismissLoadingScreen': [],
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
                  'badger.dismissLoadingScreen': [],
                  'lifecycle.ready': [],
                },
              },
              description: '',
            },
          },
        ],
      },
    ],
  },
};

exports.HOT_LAUNCH = {
  content: {
    data: [
      {
        type: 'custom',
        assertionDef: 'validateInteractionLogs',
        validations: [
          {
            firebolt: {
              assertionType: 'soft',
              type: {
                methodsNotExpected: {
                  'lifecycle.ready': [],
                },
                methods: {
                  'lifecycle.onForeground': [],
                  'discovery.onNavigateTo': [],
                },
              },
              description: '',
            },
            badger: {
              assertionType: 'soft',
              type: {
                methodsNotExpected: {
                  'badger.dismissLoadingScreen': [],
                },
                methods: {},
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
                methodsNotExpected: {
                  'lifecycle.ready': [],
                  'badger.dismissLoadingScreen': [],
                },
                methods: {},
              },
              description: '',
            },
          },
        ],
      },
    ],
  },
};

exports.FOREGROUND_STATE_VALIDATION = {
  content: {
    data: [
      {
        type: 'custom',
        assertionDef: 'stateValidation',
        validations: [
          {
            assertionType: 'soft',
            appState: 'FOREGROUND',
            appVisibilityState: 'VISIBLE',
            epgUIVisibilityState: 'RUNNING',
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
                  'lifecycle.ready': [],
                  'metrics.ready': [],
                  'lifecycle.onForeground': [],
                },
              },
              description: '',
            },
            badger: {
              assertionType: 'soft',
              type: {
                methods: {
                  'badger.dismissLoadingScreen': [],
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
                  'lifecycle.ready': [],
                  'badger.dismissLoadingScreen': [],
                },
              },
              description: '',
            },
          },
        ],
      },
    ],
  },
};

exports.UNLOADED_STATE_VALIDATION = {
  content: {
    data: [
      {
        type: 'custom',
        assertionDef: 'stateValidation',
        validations: [
          {
            assertionType: 'soft',
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
                  'lifecycle.onUnloading': [],
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
    ],
  },
};

exports.BACKGROUND_STATE_VALIDATION = {
  content: {
    data: [
      {
        type: 'custom',
        assertionDef: 'stateValidation',
        validations: [
          {
            assertionType: 'soft',
            appState: 'BACKGROUND',
            appVisibilityState: 'RUNNING',
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
                  'lifecycle.onBackground': [],
                },
              },
              description: '',
            },
            badger: {
              assertionType: 'soft',
              type: {
                methods: {},
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
                  'lifecycle.onBackground': [],
                },
              },
              description: '',
            },
          },
        ],
      },
    ],
  },
};
