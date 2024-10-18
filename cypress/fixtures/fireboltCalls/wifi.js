const errorContent = require('../objects/errorContentObjects.js');

exports.WIFI = {
  setMethod: resolveAtRuntime('manage_wifi.{{attribute}}'),
  setParams: resolveAtRuntime('DYNAMIC_FB_CALL_VARIABLES.DEFAULTS.{{value}}'),
  setValidationJsonPath: 'result',
  setContent: null,
};

exports.WIFI_VARIABLES = {
  scan_timeout: {
    timeout: 20,
  },
  emptyObject: {},
  scan_with_boolean: {
    timeout: true,
  },
  connect_with_integer: {
    ssid: 123456,
    passphrase: '',
    security: 'none',
  },
  connect_with_boolean: {
    security: true,
  },
};

exports.SCAN_WIFI_WITH_EMPTY_PARAMS = {
  method: 'manage_wifi.scan',
  params: {},
};

exports.SCAN_WIFI_WITH_20_SECONDS_TIMEOUT = {
  method: 'manage_wifi.scan',
  params: {
    timeout: 20,
  },
};

exports.SCAN_WIFI_WITH_BOOLEAN = {
  method: 'manage_wifi.scan',
  params: {
    timeout: true,
  },
  expected: 'error',
};

exports.CONNECT_WIFI_WITH_INTEGER = {
  method: 'manage_wifi.connect',
  params: {
    ssid: 123456,
    passphrase: '',
    security: 'none',
  },
  expected: 'error',
};

exports.CONNECT_WPS_WITH_BOOLEAN = {
  method: 'manage_wifi.wps',
  params: {
    security: true,
  },
  expected: 'error',
};

exports.INVALID_BOOLEAN_PARAMS_FOR_WIFI_SCAN = {
  method: 'wifi.scan',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};

exports.INVALID_INTEGER_PARAMS_FOR_WIFI_CONNECT = {
  method: 'wifi.connect',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};

exports.INVALID_VALUE_PARAMS_FOR_WIFI_WPS = {
  method: 'wifi.wps',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};
