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
