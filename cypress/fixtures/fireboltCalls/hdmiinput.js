const errorContent = require('../objects/errorContentObjects.js');
exports.STATIC_VARIABLES = {
  HDMIINPUT_VARIABLES: {
    PORT_HDMI1: {
      portId: 'HDMI1',
    },
    PORT_HDMI2: {
      portId: 'HDMI2',
    },
    SETAUTOLOWLATENCYMODECAPABLE_TRUE: {
      port: 'HDMI1',
      value: true,
    },
    SETAUTOLOWLATENCYMODECAPABLE_FALSE: {
      port: 'HDMI1',
      value: false,
    },
    EDIDVERSION_1_4_HDMI1: {
      port: 'HDMI1',
      value: '1.4',
    },
    EDIDVERSION_2_0_HDMI1: {
      port: 'HDMI1',
      value: '2.0',
    },
    EDIDVERSION_UNKNOWN_HDMI1: {
      port: 'HDMI1',
      value: 'unknown',
    },
    AUTOLOWLATENCYMODECAPABLE_TRUE_HDMI1: {
      port: 'HDMI1',
      value: true,
    },
    AUTOLOWLATENCYMODECAPABLE_FALSE_HDMI1: {
      port: 'HDMI1',
      value: false,
    },
    PORTVALUE_HDMI1: {
      port: 'HDMI1',
    },
    AUTOLOWLATENCYMODECAPABLE_INTEGER_HDMI1: {
      port: 'HDMI1',
      enabled: 123,
    },
    AUTOLOWLATENCYMODECAPABLE_STRING_HDMI1: {
      port: 'HDMI1',
      enabled: 'test',
    },
    AUTOLOWLATENCYMODECAPABLE_TRUE_WITHOUT_PORT: {
      enabled: 'true',
    },
    EDIDVERSION_INTEGER: {
      port: 'HDMI1',
      edidVersion: 123,
    },
    EDIDVERSION_BOOLEAN: {
      port: 'HDMI1',
      edidVersion: true,
    },
    EDIDVERSION_1_4_WITHOUT_PORT: {
      edidVersion: '1.4',
    },
    PORT_INTEGER: {
      portId: 123,
    },
    PORT_BOOLEAN: {
      portId: true,
    },
    PORT_INVALID_STRING: {
      portId: 'test',
    },
    CONNECTED_TRUE: {
      port: 'HDMI1',
      connected: true,
      signal: 'stable',
      arcCapable: true,
      arcConnected: true,
      edidVersion: '2.0',
      autoLowLatencyModeCapable: true,
      autoLowLatencyModeSignalled: true,
    },
    CONNECTED_FALSE: {
      port: 'HDMI1',
      connected: false,
      signal: 'stable',
      arcCapable: true,
      arcConnected: true,
      edidVersion: '2.0',
      autoLowLatencyModeCapable: true,
      autoLowLatencyModeSignalled: true,
    },
    SIGNAL_UNKNOWN: {
      port: 'HDMI1',
      connected: false,
      signal: 'unknown',
      arcCapable: true,
      arcConnected: true,
      edidVersion: '2.0',
      autoLowLatencyModeCapable: true,
      autoLowLatencyModeSignalled: true,
    },
    SIGNAL_NONE: {
      port: 'HDMI1',
      connected: false,
      signal: 'none',
      arcCapable: true,
      arcConnected: true,
      edidVersion: '2.0',
      autoLowLatencyModeCapable: true,
      autoLowLatencyModeSignalled: true,
    },
    SIGNAL_STABLE: {
      port: 'HDMI1',
      connected: false,
      signal: 'stable',
      arcCapable: true,
      arcConnected: true,
      edidVersion: '2.0',
      autoLowLatencyModeCapable: true,
      autoLowLatencyModeSignalled: true,
    },
    SIGNAL_UNSTABLE: {
      port: 'HDMI1',
      connected: false,
      signal: 'unstable',
      arcCapable: true,
      arcConnected: true,
      edidVersion: '2.0',
      autoLowLatencyModeCapable: true,
      autoLowLatencyModeSignalled: true,
    },
    SIGNAL_UNSUPPORTED: {
      port: 'HDMI1',
      connected: false,
      signal: 'unsupported',
      arcCapable: true,
      arcConnected: true,
      edidVersion: '2.0',
      autoLowLatencyModeCapable: true,
      autoLowLatencyModeSignalled: true,
    },
    AUTOLOWLATENCYMODESIGNALLED_TRUE: {
      port: 'HDMI1',
      connected: false,
      signal: 'unsupported',
      arcCapable: true,
      arcConnected: true,
      edidVersion: '2.0',
      autoLowLatencyModeCapable: true,
      autoLowLatencyModeSignalled: true,
    },
    AUTOLOWLATENCYMODESIGNALLED_FALSE: {
      port: 'HDMI1',
      connected: false,
      signal: 'unsupported',
      arcCapable: true,
      arcConnected: true,
      edidVersion: '2.0',
      autoLowLatencyModeCapable: true,
      autoLowLatencyModeSignalled: false,
    },
    SETLOWLATENCYMODE_TRUE: {
      value: true,
    },
    SETLOWLATENCYMODE_FALSE: {
      value: false,
    },
    EDIDVERSION_INVALID_STRING: { port: 'HDMI1', edidVersion: 'test' },
  },
  HDMIINPUT_CONTENT: {
    PORTS: {
      data: [
        {
          type: 'regEx',
          validations: [
            {
              type: 'object',
              description: 'Validation of the HdmiInput ports format',
            },
          ],
        },
      ],
    },
    PORT: {
      data: [
        {
          type: 'regEx',
          validations: [
            {
              type: 'object',
              description: 'Validation of the HdmiInput ports format',
            },
          ],
        },
      ],
    },
    EDIDVERSION_1_4: '1.4',
    EDIDVERSION_2_0: '2.0',
    HDMIINPUT_ONCONNECTIONCHANGED_TRUE: { port: 'HDMI1', connected: true },
    HDMIINPUT_ONCONNECTIONCHANGED_FALSE: { port: 'HDMI1', connected: false },
    HDMIINPUT_ONSIGNALCHANGED_UNKNOWN: { port: 'HDMI1', signal: 'unknown' },
    HDMIINPUT_ONSIGNALCHANGED_NONE: { port: 'HDMI1', signal: 'none' },
    HDMIINPUT_ONSIGNALCHANGED_STABLE: { port: 'HDMI1', signal: 'stable' },
    HDMIINPUT_ONSIGNALCHANGED_UNSTABLE: { port: 'HDMI1', signal: 'unstable' },
    HDMIINPUT_ONSIGNALCHANGED_UNSUPPORTED: { port: 'HDMI1', signal: 'unsupported' },
    HDMIINPUT_ONAUTOLOWLATENCYMODESIGNALCHANGED_TRUE: {
      port: 'HDMI1',
      autoLowLatencyModeSignalled: true,
    },
    HDMIINPUT_ONAUTOLOWLATENCYMODESIGNALCHANGED_FALSE: {
      port: 'HDMI1',
      autoLowLatencyModeSignalled: false,
    },
  },
};

exports.SET_AUTOLOWLATENCYMODECAPABLE_WITH_TRUE = {
  method: 'manage_hdmiinput.setAutoLowLatencyModeCapable',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.SETAUTOLOWLATENCYMODECAPABLE_TRUE,
};
exports.TRUE_FOR_AUTOLOWLATENCYMODECAPABLE_PORT = {
  method: 'hdmiinput.port',
  validationJsonPath: 'result.autoLowLatencyModeCapable',
  content: true,
};
exports.SET_AUTOLOWLATENCYMODECAPABLE_WITH_FALSE = {
  method: 'manage_hdmiinput.setAutoLowLatencyModeCapable',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.SETAUTOLOWLATENCYMODECAPABLE_FALSE,
};
exports.FALSE_FOR_AUTOLOWLATENCYMODECAPABLE_PORT = {
  method: 'hdmiinput.port',
  validationJsonPath: 'result.autoLowLatencyModeCapable',
  content: false,
};
exports.SET_EDIDVERSION_TO_1_4 = {
  method: 'manage_hdmiinput.setEdidVersion',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.EDIDVERSION_1_4_HDMI1,
};
exports.EDIDVERSION_PORT_1_4 = {
  method: 'hdmiinput.port',
  validationJsonPath: 'result.edidVersion',
  content: this.STATIC_VARIABLES.HDMIINPUT_CONTENT.EDIDVERSION_1_4,
};
exports.SET_EDIDVERSION_TO_2_0 = {
  method: 'manage_hdmiinput.setEdidVersion',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.EDIDVERSION_2_0_HDMI1,
};
exports.EDIDVERSION_PORT_2_0 = {
  method: 'hdmiinput.port',
  validationJsonPath: 'result.edidVersion',
  content: this.STATIC_VARIABLES.HDMIINPUT_CONTENT.EDIDVERSION_2_0,
};
exports.SET_EDIDVERSION_TO_UNKNOWN = {
  method: 'manage_hdmiinput.setEdidVersion',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.EDIDVERSION_UNKNOWN_HDMI1,
};
exports.GET_HDMIINPUT_PORT_WITH_PORTID_HDMI1 = {
  method: 'manage_hdmiinput.port',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.PORT_HDMI1,
};
exports.GET_HDMIINPUT_PORTS_LIST = {
  method: 'manage_hdmiinput.ports',
  params: {},
};
exports.EXPECTED_HDMIINPUT_PORTS = {
  method: 'hdmiinput.ports',
  validationJsonPath: 'result',
  content: this.STATIC_VARIABLES.HDMIINPUT_CONTENT.PORTS,
};
exports.TRUE_FOR_AUTOLOWLATENCYMODECAPABLE_PORTS = {
  method: 'hdmiinput.ports',
  validationJsonPath: 'result[0].autoLowLatencyModeCapable',
  content: true,
};
exports.FALSE_FOR_AUTOLOWLATENCYMODECAPABLE_PORTS = {
  method: 'hdmiinput.ports',
  validationJsonPath: 'result[0].autoLowLatencyModeCapable',
  content: false,
};
exports.EDIDVERSION_PORTS_1_4 = {
  method: 'hdmiinput.ports',
  validationJsonPath: 'result[0].edidVersion',
  content: this.STATIC_VARIABLES.HDMIINPUT_CONTENT.EDIDVERSION_1_4,
};
exports.EDIDVERSION_PORTS_2_0 = {
  method: 'hdmiinput.ports',
  validationJsonPath: 'result[0].edidVersion',
  content: this.STATIC_VARIABLES.HDMIINPUT_CONTENT.EDIDVERSION_2_0,
};
exports.FALSE_FOR_AUTOLOWLATENCYMODESIGNALLED_PORTS = {
  method: 'hdmiinput.ports',
  validationJsonPath: 'result[0].autoLowLatencyModeSignalled',
  content: false,
};
exports.OPEN_HDMI1_PORT = {
  method: 'manage_hdmiinput.open',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.PORT_HDMI1,
};
exports.NULL_FOR_HDMIINPUT_OPEN = {
  method: 'hdmiinput.open',
  validationJsonPath: 'result',
  content: null,
};
exports.CLOSE_HDMI_PORT = {
  method: 'manage_hdmiinput.close',
  params: {},
};
exports.NULL_FOR_HDMIINPUT_CLOSE = {
  method: 'hdmiinput.close',
  validationJsonPath: 'result',
  content: null,
};
exports.SET_AUTOLOWLATENCYMODECAPABLE_TRUE_WITH_HDMI1 = {
  method: 'manage_hdmiinput.setAutoLowLatencyModeCapable',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.AUTOLOWLATENCYMODECAPABLE_TRUE_HDMI1,
};
exports.SET_AUTOLOWLATENCYMODECAPABLE_FALSE_WITH_HDMI1 = {
  method: 'manage_hdmiinput.setAutoLowLatencyModeCapable',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.AUTOLOWLATENCYMODECAPABLE_FALSE_HDMI1,
};
exports.SET_LOWLATENCYMODE_WITH_TRUE = {
  method: 'manage_hdmiinput.setLowLatencyMode',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.SETLOWLATENCYMODE_TRUE,
};
exports.SET_LOWLATENCYMODE_WITH_FALSE = {
  method: 'manage_hdmiinput.setLowLatencyMode',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.SETLOWLATENCYMODE_FALSE,
};
exports.HDMIINPUT_ONAUTOLOWLATENCYMODECAPABLECHANGED = {
  method: 'manage_hdmiinput.onAutoLowLatencyModeCapableChanged',
  params: {},
};
exports.HDMIINPUT_ONEDIDVERSIONCHANGED = {
  method: 'manage_hdmiinput.onEdidVersionChanged',
  params: {},
};
exports.HDMIINPUT_ONLOWLATENCYMODECHANGED = {
  method: 'manage_hdmiinput.onLowLatencyModeChanged',
  params: {},
};
exports.GET_AUTOLOWLATENCYMODECAPABLE = {
  method: 'manage_hdmiinput.autoLowLatencyModeCapable',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.PORTVALUE_HDMI1,
};
exports.GET_EDIDVERSION = {
  method: 'manage_hdmiinput.edidVersion',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.PORTVALUE_HDMI1,
};
exports.GET_LOWLATENCYMODE = {
  method: 'manage_hdmiinput.lowLatencyMode',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.PORTVALUE_HDMI1,
};
exports.TRUE_FOR_AUTOLOWLATENCYMODECAPABLE_HDMI1_PORT = {
  method: 'hdmiinput.autoLowLatencyModeCapable',
  validationJsonPath: 'result',
  content: true,
};
exports.FALSE_FOR_AUTOLOWLATENCYMODECAPABLE_HDMI1_PORT = {
  method: 'hdmiinput.autoLowLatencyModeCapable',
  validationJsonPath: 'result',
  content: false,
};
exports.EDIDVERSION_HDMI1_PORT_1_4 = {
  method: 'hdmiinput.edidVersion',
  validationJsonPath: 'result',
  content: this.STATIC_VARIABLES.HDMIINPUT_CONTENT.EDIDVERSION_1_4,
};
exports.EDIDVERSION_HDMI1_PORT_2_0 = {
  method: 'hdmiinput.edidVersion',
  validationJsonPath: 'result',
  content: this.STATIC_VARIABLES.HDMIINPUT_CONTENT.EDIDVERSION_2_0,
};
exports.TRUE_FOR_LOWLATENCYMODE = {
  method: 'hdmiinput.lowLatencyMode',
  validationJsonPath: 'result',
  content: true,
};
exports.FALSE_FOR_LOWLATENCYMODE = {
  method: 'hdmiinput.lowLatencyMode',
  validationJsonPath: 'result',
  content: false,
};
exports.TRUE_FOR_ONAUTOLOWLATENCYMODECAPABLECHANGED = {
  event: 'hdmiinput.onAutoLowLatencyModeCapableChanged',
  validationJsonPath: 'eventResponse',
  content: true,
};
exports.FALSE_FOR_ONAUTOLOWLATENCYMODECAPABLECHANGED = {
  event: 'hdmiinput.onAutoLowLatencyModeCapableChanged',
  validationJsonPath: 'eventResponse',
  content: false,
};
exports.ONEDIDVERSIONCHANGED_1_4 = {
  event: 'hdmiinput.onEdidVersionChanged',
  validationJsonPath: 'eventResponse',
  content: this.STATIC_VARIABLES.HDMIINPUT_CONTENT.EDIDVERSION_1_4,
};
exports.ONEDIDVERSIONCHANGED_2_0 = {
  event: 'hdmiinput.onEdidVersionChanged',
  validationJsonPath: 'eventResponse',
  content: this.STATIC_VARIABLES.HDMIINPUT_CONTENT.EDIDVERSION_2_0,
};
exports.TRUE_FOR_ONLOWLATENCYMODECHANGED = {
  event: 'hdmiinput.onLowLatencyModeChanged',
  validationJsonPath: 'eventResponse',
  content: true,
};
exports.FALSE_FOR_ONLOWLATENCYMODECHANGED = {
  event: 'hdmiinput.onLowLatencyModeChanged',
  validationJsonPath: 'eventResponse',
  content: false,
};
exports.SET_HDMIINPUT_WITH_INTEGER = {
  method: 'manage_hdmiinput.port',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.PORT_INTEGER,
  content: 'error',
};
exports.SET_HDMIINPUT_WITH_BOOLEAN = {
  method: 'manage_hdmiinput.port',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.PORT_BOOLEAN,
  content: 'error',
};
exports.SET_HDMIINPUT_WITH_INVALID_STRING = {
  method: 'manage_hdmiinput.port',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.PORT_INVALID_STRING,
  content: 'error',
};
exports.SET_HDMIINPUT_PORT_WITH_INTEGER_EDIDVERSION = {
  method: 'manage_hdmiinput.setEdidVersion',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.EDIDVERSION_INTEGER,
  content: 'error',
};
exports.SET_HDMIINPUT_PORT_WITH_BOOLEAN_EDIDVERSION = {
  method: 'manage_hdmiinput.setEdidVersion',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.PORT_BOOLEAN,
  content: 'error',
};
exports.SET_HDMIINPUT_PORT_WITH_INVALID_STRING_EDIDVERSION = {
  method: 'manage_hdmiinput.setEdidVersion',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.EDIDVERSION_INVALID_STRING,
  content: 'error',
};
exports.INVALID_PARAMETERS_FOR_HDMIINPUT_PORT = {
  method: 'hdmiinput.port',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMETERS_FOR_HDMIINPUT_EDIDVERSION = {
  method: 'hdmiinput.setEdidVersion',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.SET_AUTOLOWLATENCYMODECAPABLE_WITH_INTEGER = {
  method: 'manage_hdmiinput.setAutoLowLatencyModeCapable',
  params:
    this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.AUTOLOWLATENCYMODECAPABLE_INTEGER_HDMI1,
  content: 'error',
};
exports.SET_AUTOLOWLATENCYMODECAPABLE_WITH_INVALID_STRING = {
  method: 'manage_hdmiinput.setAutoLowLatencyModeCapable',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.AUTOLOWLATENCYMODECAPABLE_STRING_HDMI1,
  content: 'error',
};
exports.SET_EDIDVERSION_WITH_INTEGER = {
  method: 'manage_hdmiinput.setEdidVersion',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.EDIDVERSION_INTEGER,
  content: 'error',
};
exports.SET_EDIDVERSION_WITH_BOOLEAN = {
  method: 'manage_hdmiinput.setEdidVersion',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.EDIDVERSION_BOOLEAN,
  content: 'error',
};
exports.SET_LOWLATENCYMODE_WITH_INTEGER = {
  method: 'manage_hdmiinput.setLowLatencyMode',
  params: 123,
  content: 'error',
};
exports.SET_LOWLATENCYMODE_WITH_STRING = {
  method: 'manage_hdmiinput.setLowLatencyMode',
  params: { value: 'test' },
  content: 'error',
};
exports.SET_AUTOLOWLATENCYMODECAPABLE_WITHOUT_PORT = {
  method: 'manage_hdmiinput.setAutoLowLatencyModeCapable',
  params:
    this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.AUTOLOWLATENCYMODECAPABLE_TRUE_WITHOUT_PORT,
  content: 'error',
};
exports.SET_EDIDVERSION_WITHOUT_PORT = {
  method: 'manage_hdmiinput.setEdidVersion',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.EDIDVERSION_1_4_WITHOUT_PORT,
  content: 'error',
};
exports.SET_AUTOLOWLATENCYMODECAPABLE_WITH_EMPTY_PARAM = {
  method: 'manage_hdmiinput.setAutoLowLatencyModeCapable',
  params: {},
  content: 'error',
};
exports.SET_EDIDVERSION_WITH_EMPTY_PARAM = {
  method: 'manage_hdmiinput.setEdidVersion',
  params: {},
  content: 'error',
};
exports.SET_LOWLATENCYMODE_WITH_EMPTY_PARAM = {
  method: 'manage_hdmiinput.setLowLatencyMode',
  params: {},
  content: 'error',
};
exports.INVALID_PARAMETERS_FOR_AUTOLOWLATENCYMODECAPABLE = {
  method: 'hdmiinput.setAutoLowLatencyModeCapable',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMETERS_FOR_EDIDVERSION = {
  method: 'hdmiinput.setEdidVersion',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMETERS_FOR_LOWLATENCYMODE = {
  method: 'hdmiinput.setLowLatencyMode',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMETERS_FOR_HDMIINPUT_OPEN = {
  method: 'hdmiinput.open',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.SET_HDMIINPUT_OPEN_WITH_EMPTY_PARAM = {
  method: 'manage_hdmiinput.open',
  params: {},
  content: 'error',
};
exports.SET_HDMIINPUT_OPEN_WITH_INTEGER = {
  method: 'manage_hdmiinput.open',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.PORT_INTEGER,
  content: 'error',
};
exports.SET_HDMIINPUT_OPEN_WITH_BOOLEAN = {
  method: 'manage_hdmiinput.open',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.PORT_BOOLEAN,
  content: 'error',
};
exports.GET_HDMIINPUT_PORTS_LIST_WITH_ERROR = {
  method: 'manage_hdmiinput.ports',
  params: {},
  content: 'error',
};
exports.INVALID_PARAMETERS_FOR_HDMIINPUT_PORTS = {
  method: 'hdmiinput.ports',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.GET_HDMIINPUT_PORT_WITH_ERROR = {
  method: 'manage_hdmiinput.port',
  params: {},
  content: 'error',
};

exports.HDMIINPUT_ONCONNECTIONCHANGED = {
  method: 'manage_hdmiinput.onConnectionChanged',
  params: {},
};
exports.HDMIINPUT_ONSIGNALCHANGED = {
  method: 'manage_hdmiinput.onSignalChanged',
  params: {},
};
exports.HDMIINPUT_ONAUTOLOWLATENCYMODESIGNALCHANGED = {
  method: 'manage_hdmiinput.onAutoLowLatencyModeSignalChanged',
  params: {},
};
exports.TRUE_FOR_HDMIINPUT_PORT_CONNECTED = {
  method: 'manage_hdmiinput.port',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.CONNECTED_TRUE,
};
exports.FALSE_FOR_HDMIINPUT_PORT_CONNECTED = {
  method: 'manage_hdmiinput.port',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.CONNECTED_TRUE,
};
exports.UNKNOWN_FOR_HDMIINPUT_PORT_SIGNAL = {
  method: 'manage_hdmiinput.port',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.SIGNAL_UNKNOWN,
};
exports.NONE_FOR_HDMIINPUT_PORT_SIGNAL = {
  method: 'manage_hdmiinput.port',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.SIGNAL_NONE,
};
exports.STABLE_FOR_HDMIINPUT_PORT_SIGNAL = {
  method: 'manage_hdmiinput.port',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.SIGNAL_STABLE,
};
exports.UNSTABLE_FOR_HDMIINPUT_PORT_SIGNAL = {
  method: 'manage_hdmiinput.port',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.SIGNAL_UNSTABLE,
};
exports.UNSUPPORTED_FOR_HDMIINPUT_PORT_SIGNAL = {
  method: 'manage_hdmiinput.port',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.SIGNAL_UNSUPPORTED,
};
exports.TRUE_FOR_HDMIINPUT_PORT_AUTOLOWLATENCYMODESIGNALLED = {
  method: 'manage_hdmiinput.port',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.AUTOLOWLATENCYMODESIGNALLED_TRUE,
};
exports.FALSE_FOR_HDMIINPUT_PORT_AUTOLOWLATENCYMODESIGNALLED = {
  method: 'manage_hdmiinput.port',
  params: this.STATIC_VARIABLES.HDMIINPUT_VARIABLES.AUTOLOWLATENCYMODESIGNALLED_FALSE,
};
exports.TRUE_FOR_HDMIINPUT_ONCONNECTIONCHANGED_EVENT = {
  event: 'manage_hdmiinput.onConnectionChanged',
  validationJsonPath: 'eventResponse',
  content: this.STATIC_VARIABLES.HDMIINPUT_CONTENT.HDMIINPUT_ONCONNECTIONCHANGED_TRUE,
};
exports.FALSE_FOR_HDMIINPUT_ONCONNECTIONCHANGED_EVENT = {
  event: 'manage_hdmiinput.onConnectionChanged',
  validationJsonPath: 'eventResponse',
  content: this.STATIC_VARIABLES.HDMIINPUT_CONTENT.HDMIINPUT_ONCONNECTIONCHANGED_FALSE,
};
exports.UNKNOWN_FOR_HDMIINPUT_ONSIGNALCHANGED_EVENT = {
  event: 'manage_hdmiinput.onSignalChanged',
  validationJsonPath: 'eventResponse',
  content: this.STATIC_VARIABLES.HDMIINPUT_CONTENT.HDMIINPUT_ONSIGNALCHANGED_UNKNOWN,
};
exports.NONE_FOR_HDMIINPUT_ONSIGNALCHANGED_EVENT = {
  event: 'manage_hdmiinput.onSignalChanged',
  validationJsonPath: 'eventResponse',
  content: this.STATIC_VARIABLES.HDMIINPUT_CONTENT.HDMIINPUT_ONSIGNALCHANGED_NONE,
};
exports.STABLE_FOR_HDMIINPUT_ONSIGNALCHANGED_EVENT = {
  event: 'manage_hdmiinput.onSignalChanged',
  validationJsonPath: 'eventResponse',
  content: this.STATIC_VARIABLES.HDMIINPUT_CONTENT.HDMIINPUT_ONSIGNALCHANGED_STABLE,
};
exports.UNSTABLE_FOR_HDMIINPUT_ONSIGNALCHANGED_EVENT = {
  event: 'manage_hdmiinput.onSignalChanged',
  validationJsonPath: 'eventResponse',
  content: this.STATIC_VARIABLES.HDMIINPUT_CONTENT.HDMIINPUT_ONSIGNALCHANGED_UNSTABLE,
};
exports.UNSUPPORTED_FOR_HDMIINPUT_ONCONNECTIONCHANGED_EVENT = {
  event: 'manage_hdmiinput.onSignalChanged',
  validationJsonPath: 'eventResponse',
  content: this.STATIC_VARIABLES.HDMIINPUT_CONTENT.HDMIINPUT_ONSIGNALCHANGED_UNSUPPORTED,
};
exports.TRUE_FOR_HDMIINPUT_ONAUTOLOWLATENCYMODESIGNALCHANGED_EVENT = {
  event: 'manage_hdmiinput.onAutoLowLatencyModeSignalChanged',
  validationJsonPath: 'eventResponse',
  content:
    this.STATIC_VARIABLES.HDMIINPUT_CONTENT
      .HDMIINPUT_ONAUTOLOWLATENCYMODESIGNALCHANGED_TRUE,
};
exports.FALSE_FOR_HDMIINPUT_ONAUTOLOWLATENCYMODESIGNALCHANGED_EVENT = {
  event: 'manage_hdmiinput.onAutoLowLatencyModeSignalChanged',
  validationJsonPath: 'eventResponse',
  content:
    this.STATIC_VARIABLES.HDMIINPUT_CONTENT
      .HDMIINPUT_ONAUTOLOWLATENCYMODESIGNALCHANGED_FALSE,
};
