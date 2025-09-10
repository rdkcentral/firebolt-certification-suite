exports.THIRD_PARTY_APP_IS_LAUNCHED = {
  content: {
    data: [
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

exports.RUNNING_STATE_VALIDATION = {
  content: {
    data: [
      {
        type: 'custom',
        assertionDef: 'stateValidation',
        validations: [
          {
            assertionType: 'soft',
            appState: 'RUNNING',
            epgUIVisibilityState: 'VISIBLE',
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

exports.INACTIVE_STATE_VALIDATION = {
  content: {
    data: [
      {
        type: 'custom',
        assertionDef: 'stateValidation',
        validations: [
          {
            assertionType: 'soft',
            appState: 'INACTIVE',
            appVisibilityState: 'SUSPENDED',
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
                  'lifecycle.onInactive': [],
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

exports.ONFOREGROUND = {
  event: 'lifecycle.onForeground',
  validationJsonPath: 'result.state',
  expectingError: false,
  eventExpected: 'triggers',
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: 'foreground',
          },
        ],
      },
    ],
  },
};

exports.ONBACKGROUND = {
  event: 'lifecycle.onBackground',
  validationJsonPath: 'result.state',
  expectingError: false,
  eventExpected: 'triggers',
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: 'background',
          },
        ],
      },
    ],
  },
};

exports.ONUNLOADING = {
  event: 'lifecycle.onUnloading',
  validationJsonPath: 'result.state',
  expectingError: false,
  eventExpected: 'triggers',
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: 'unloading',
          },
        ],
      },
    ],
  },
};

exports.ONNAVIGATETO = {
  event: 'discovery.onNavigateTo',
  validationJsonPath: 'result',
  expectingError: false,
  eventExpected: 'triggers',
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: {
              action: resolveAtRuntime('intentTemplate->action'),
              context: {
                source: 'device',
              },
              data: {
                entityId: resolveAtRuntime('intent->entityId'),
                entityType: 'program',
                programType: 'movie',
              },
            },
          },
        ],
      },
    ],
  },
};

exports.ONINACTIVE = {
  event: 'lifecycle.onInactive',
  validationJsonPath: 'result.state',
  expectingError: false,
  eventExpected: 'triggers',
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: 'inactive',
          },
        ],
      },
    ],
  },
};
