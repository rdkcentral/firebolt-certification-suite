exports.STATIC_VARIABLES = {
  SECURESTORAGE_VARIABLES: {
    CLEARFORAPP_ACCOUNT: {
      appId: 'comcast.test.firecert',
      scope: 'account',
    },
    CLEARFORAPP_DEVICE: {
      appId: 'comcast.test.firecert',
      scope: 'device',
    },
    SETFORAPP_DEVICE: {
      appId: 'comcast.test.firecert',
      scope: 'device',
      key: 'authTestTokenDevice',
      value: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
    },
    SETFORAPP_ACCOUNT: {
      appId: 'comcast.test.firecert',
      scope: 'account',
      key: 'authTestTokenAccount',
      value: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
    },
    SETFORAPP_DEVICE_OPTIONAL: {
      appId: 'comcast.test.firecert',
      scope: 'device',
      key: 'authTestTokenDevice1',
      value: 'authTestTokenValue1',
      options: {
        ttl: 2000,
      },
    },
    SETFORAPP_ACCOUNT_OPTIONAL: {
      appId: 'comcast.test.firecert',
      scope: 'account',
      key: 'authTestTokenAccount1',
      value: 'authTestTokenValue1',
      options: {
        ttl: 2000,
      },
    },
    SETFORAPP_DEVICE_KEY1: {
      appId: 'comcast.test.firecert',
      scope: 'device',
      key: 'authTestTokenDevice1',
      value: 'authTestTokenDevice1',
    },
    SETFORAPP_DEVICE_KEY2: {
      appId: 'comcast.test.firecert',
      scope: 'device',
      key: 'authTestTokenDevice2',
      value: 'authTestTokenDevice2',
    },
    SETFORAPP_ACCOUNT_KEY1: {
      appId: 'comcast.test.firecert',
      scope: 'account',
      key: 'authTestTokenAccount1',
      value: 'authTestTokenValue1',
    },
    SETFORAPP_ACCOUNT_KEY2: {
      appId: 'comcast.test.firecert',
      scope: 'account',
      key: 'authTestTokenAccount2',
      value: 'authTestTokenValue2',
    },
    REMOVEFORAPP_DEVICE: {
      appId: 'comcast.test.firecert',
      scope: 'device',
      key: 'authTestTokenDevice1',
    },
    REMOVEFORAPP_ACCOUNT_KEY1: {
      appId: 'comcast.test.firecert',
      scope: 'account',
      key: 'authTestTokenAccount1',
    },
    SETFORAPP_INVALID_SCOPE: {
      appId: 'comcast.test.firecert',
      scope: 'test',
      key: 'authTestTokenDevice',
      value: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
    },
    SETFORAPP_INTEGER_SCOPE: {
      appId: 'comcast.test.firecert',
      scope: 123,
      key: 'authTestTokenDevice',
      value: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
    },
    SETFORAPP_NULL_SCOPE: {
      appId: 'comcast.test.firecert',
      scope: null,
      key: 'authTestTokenDevice',
      value: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
    },
    SETFORAPP_BOOLEAN_SCOPE: {
      appId: 'comcast.test.firecert',
      scope: true,
      key: 'authTestTokenDevice',
      value: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
    },
    SETFORAPP_EMPTY_SCOPE: {
      appId: 'comcast.test.firecert',
      scope: '',
      key: 'authTestTokenDevice',
      value: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
    },
    SETFORAPP_WITHOUT_SCOPE: {
      appId: 'comcast.test.firecert',
      key: 'authTestTokenDevice',
      value: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
    },
    SETFORAPP_WITH_INTEGER_KEY: {
      appId: 'comcast.test.firecert',
      scope: 'device',
      key: 123,
      value: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
    },
    SETFORAPP_WITH_NULL_KEY: {
      appId: 'comcast.test.firecert',
      scope: 'device',
      key: null,
      value: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
    },
    SETFORAPP_WITH_BOOLEAN_KEY: {
      appId: 'comcast.test.firecert',
      scope: 'device',
      key: true,
      value: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
    },
    SETFORAPP_WITHOUT_KEY: {
      appId: 'comcast.test.firecert',
      scope: 'device',
      value: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
    },
    SETFORAPP_WITH_INTEGER_VALUE: {
      appId: 'comcast.test.firecert',
      scope: 'device',
      key: 'authTestTokenDevice',
      value: 123,
    },
    SETFORAPP_WITH_NULL_VALUE: {
      appId: 'comcast.test.firecert',
      scope: 'device',
      key: 'authTestTokenDevice',
      value: null,
    },
    SETFORAPP_WITH_BOOLEAN_VALUE: {
      appId: 'comcast.test.firecert',
      scope: 'device',
      key: 'authTestTokenDevice',
      value: true,
    },
    SETFORAPP_WITHOUT_VALUE: {
      appId: 'comcast.test.firecert',
      scope: 'device',
      key: 'authTestTokenDevice',
    },
    REMOVEFORAPP_WITH_INVALID_SCOPE: {
      appId: 'comcast.test.firecert',
      scope: 'test',
      key: 'authTestTokenDevice',
    },
    REMOVEFORAPP_WITH_EMPTY_SCOPE: {
      appId: 'comcast.test.firecert',
      scope: '',
      key: 'authTestTokenDevice',
    },
    REMOVEFORAPP_WITH_INTEGER_SCOPE: {
      appId: 'comcast.test.firecert',
      scope: 123,
      key: 'authTestTokenDevice',
    },
    REMOVEFORAPP_WITH_NULL_SCOPE: {
      appId: 'comcast.test.firecert',
      scope: null,
      key: 'authTestTokenDevice',
    },
    REMOVEFORAPP_WITH_BOOLEAN_SCOPE: {
      appId: 'comcast.test.firecert',
      scope: true,
      key: 'authTestTokenDevice',
    },
    REMOVEFORAPP_WITH_INTEGER_KEY: {
      appId: 'comcast.test.firecert',
      scope: 'device',
      key: 123,
    },
    REMOVEFORAPP_WITH_NULL_KEY: {
      appId: 'comcast.test.firecert',
      scope: 'device',
      key: null,
    },
    REMOVEFORAPP_WITH_BOOLEAN_KEY: {
      appId: 'comcast.test.firecert',
      scope: 'device',
      key: true,
    },
    REMOVEFORAPP_WITHOUT_KEY: {
      appId: 'comcast.test.firecert',
      scope: 'device',
    },
    REMOVEFORAPP_WITHOUT_SCOPE: {
      appId: 'comcast.test.firecert',
      key: 'authTestTokenDevice',
    },
    CLEARFORAPP_WITH_INVALID_SCOPE: {
      appId: 'comcast.test.firecert',
      scope: 'test',
    },
    CLEARFORAPP_WITH_EMPTY_SCOPE: {
      appId: 'comcast.test.firecert',
      scope: '',
    },
    CLEARFORAPP_WITH_INTEGER_SCOPE: {
      appId: 'comcast.test.firecert',
      scope: 123,
    },
    CLEARFORAPP_WITH_NULL_SCOPE: {
      appId: 'comcast.test.firecert',
      scope: null,
    },
    CLEARFORAPP_WITH_BOOLEAN_SCOPE: {
      appId: 'comcast.test.firecert',
      scope: true,
    },
    CLEARFORAPP_WITHOUT_SCOPE: {
      appId: 'comcast.test.firecert',
    },
  },
};

exports.CLEAR_STORED_VALUE_WITH_SCOPE_AS_DEVICE_FOR_AN_APP = {
  method: 'manage_securestorage.clearForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.CLEARFORAPP_DEVICE,
};
exports.CLEAR_STORED_VALUE_WITH_SCOPE_AS_ACCOUNT_FOR_AN_APP = {
  method: 'securestorage.clearForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.CLEARFORAPP_ACCOUNT,
};
exports.SET_SECURE_DATA_VALUE_FOR_AN_APP_WITH_SCOPE_DEVICE = {
  method: 'manage_securestorage.setForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SETFORAPP_DEVICE,
};
exports.SET_SECURE_DATA_VALUE_FOR_AN_APP_WITH_SCOPE_ACCOUNT = {
  method: 'manage_securestorage.setForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SETFORAPP_ACCOUNT,
};
exports.SET_SECURE_DATA_VALUE_FOR_AN_APP_WITH_SCOPE_DEVICE_WITH_OPTIONAL_PARAMETER = {
  method: 'manage_securestorage.setForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SETFORAPP_DEVICE_OPTIONAL,
};
exports.SET_SECURE_DATA_VALUE_FOR_AN_APP_WITH_SCOPE_ACCOUNT_WITH_OPTIONAL_PARAMETER = {
  method: 'manage_securestorage.setForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SETFORAPP_ACCOUNT_OPTIONAL,
};
exports.SET_SECURE_DATA_VALUE1_FOR_AN_APP_WITH_SCOPE_DEVICE = {
  method: 'manage_securestorage.setForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SETFORAPP_DEVICE_KEY1,
};
exports.SET_SECURE_DATA_VALUE1_FOR_AN_APP_WITH_SCOPE_ACCOUNT = {
  method: 'manage_securestorage.setForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SETFORAPP_ACCOUNT_KEY1,
};
exports.SET_SECURE_DATA_VALUE2_FOR_AN_APP_WITH_SCOPE_DEVICE = {
  method: 'manage_securestorage.setForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SETFORAPP_DEVICE_KEY2,
};
exports.SET_SECURE_DATA_VALUE2_FOR_AN_APP_WITH_SCOPE_ACCOUNT = {
  method: 'manage_securestorage.setForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SETFORAPP_ACCOUNT_KEY2,
};
exports.REMOVE_SECURE_DATA_VALUE_FOR_AN_APP_WITH_SCOPE_DEVICE = {
  method: 'manage_securestorage.removeForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.REMOVEFORAPP_DEVICE,
};
exports.REMOVE_SECURE_DATA_VALUE1_FOR_AN_APP_WITH_SCOPE_ACCOUNT = {
  method: 'manage_securestorage.removeForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.REMOVEFORAPP_ACCOUNT_KEY1,
};
exports.CLEAR_SECURE_DATA_VALUES_FOR_AN_APP_WITH_SCOPE_DEVICE = {
  method: 'manage_securestorage.clearForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.CLEARFORAPP_DEVICE,
};
exports.CLEAR_SECURE_DATA_VALUES_FOR_AN_APP_WITH_SCOPE_ACCOUNT = {
  method: 'manage_securestorage.clearForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.CLEARFORAPP_ACCOUNT,
};
exports.SET_SECURE_DATA_VALUE_FOR_AN_APP_WITH_INVALID_SCOPE = {
  method: 'manage_securestorage.setForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SETFORAPP_INVALID_SCOPE,
  expected: 'error',
};
exports.SET_SECURE_DATA_VALUE_FOR_AN_APP_WITH_INTEGER_SCOPE = {
  method: 'manage_securestorage.setForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SETFORAPP_INTEGER_SCOPE,
  expected: 'error',
};
exports.SET_SECURE_DATA_VALUE_FOR_AN_APP_WITH_NULL_SCOPE = {
  method: 'manage_securestorage.setForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SETFORAPP_NULL_SCOPE,
  expected: 'error',
};
exports.SET_SECURE_DATA_VALUE_FOR_AN_APP_WITH_BOOLEAN_SCOPE = {
  method: 'manage_securestorage.setForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SETFORAPP_BOOLEAN_SCOPE,
  expected: 'error',
};
exports.SET_SECURE_DATA_VALUE_FOR_AN_APP_WITH_EMPTY_SCOPE = {
  method: 'manage_securestorage.setForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SETFORAPP_EMPTY_SCOPE,
  expected: 'error',
};
exports.SET_SECURE_DATA_VALUE_FOR_AN_APP_WITHOUT_SCOPE = {
  method: 'manage_securestorage.setForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SETFORAPP_WITHOUT_SCOPE,
  expected: 'error',
};
exports.SET_SECURE_DATA_VALUE_FOR_AN_APP_WITH_INTEGER_KEY = {
  method: 'manage_securestorage.setForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SETFORAPP_WITH_INTEGER_KEY,
  expected: 'error',
};
exports.SET_SECURE_DATA_VALUE_FOR_AN_APP_WITH_NULL_KEY = {
  method: 'manage_securestorage.setForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SETFORAPP_WITH_NULL_KEY,
  expected: 'error',
};
exports.SET_SECURE_DATA_VALUE_FOR_AN_APP_WITH_BOOLEAN_KEY = {
  method: 'manage_securestorage.setForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SETFORAPP_WITH_BOOLEAN_KEY,
  expected: 'error',
};
exports.SET_SECURE_DATA_VALUE_FOR_AN_APP_WITHOUT_KEY = {
  method: 'manage_securestorage.setForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SETFORAPP_WITHOUT_KEY,
  expected: 'error',
};
exports.SET_SECURE_DATA_VALUE_FOR_AN_APP_WITH_INTEGER_VALUE = {
  method: 'manage_securestorage.setForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SETFORAPP_WITH_INTEGER_VALUE,
  expected: 'error',
};
exports.SET_SECURE_DATA_VALUE_FOR_AN_APP_WITH_NULL_VALUE = {
  method: 'manage_securestorage.setForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SETFORAPP_WITH_NULL_VALUE,
  expected: 'error',
};
exports.SET_SECURE_DATA_VALUE_FOR_AN_APP_WITH_BOOLEAN_VALUE = {
  method: 'manage_securestorage.setForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SETFORAPP_WITH_BOOLEAN_VALUE,
  expected: 'error',
};
exports.SET_SECURE_DATA_VALUE_FOR_AN_APP_WITHOUT_VALUE = {
  method: 'manage_securestorage.setForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SETFORAPP_WITHOUT_VALUE,
  expected: 'error',
};
exports.REMOVE_SECURE_DATA_VALUE_FOR_AN_APP_WITH_INVALID_SCOPE = {
  method: 'manage_securestorage.removeForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.REMOVEFORAPP_WITH_INVALID_SCOPE,
  expected: 'error',
};
exports.REMOVE_SECURE_DATA_VALUE_FOR_AN_APP_WITH_EMPTY_SCOPE = {
  method: 'manage_securestorage.removeForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.REMOVEFORAPP_WITH_EMPTY_SCOPE,
  expected: 'error',
};
exports.REMOVE_SECURE_DATA_VALUE_FOR_AN_APP_WITHOUT_SCOPE = {
  method: 'manage_securestorage.removeForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.REMOVEFORAPP_WITHOUT_SCOPE,
  expected: 'error',
};
exports.REMOVE_SECURE_DATA_VALUE_FOR_AN_APP_WITH_INTEGER_SCOPE = {
  method: 'manage_securestorage.removeForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.REMOVEFORAPP_WITH_INTEGER_SCOPE,
  expected: 'error',
};
exports.REMOVE_SECURE_DATA_VALUE_FOR_AN_APP_WITH_NULL_SCOPE = {
  method: 'manage_securestorage.removeForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.REMOVEFORAPP_WITH_NULL_SCOPE,
  expected: 'error',
};
exports.REMOVE_SECURE_DATA_VALUE_FOR_AN_APP_WITH_BOOLEAN_SCOPE = {
  method: 'manage_securestorage.removeForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.REMOVEFORAPP_WITH_BOOLEAN_SCOPE,
  expected: 'error',
};
exports.REMOVE_SECURE_DATA_VALUE_FOR_AN_APP_WITH_INTEGER_KEY = {
  method: 'manage_securestorage.removeForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.REMOVEFORAPP_WITH_INTEGER_KEY,
  expected: 'error',
};
exports.REMOVE_SECURE_DATA_VALUE_FOR_AN_APP_WITH_NULL_KEY = {
  method: 'manage_securestorage.removeForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.REMOVEFORAPP_WITH_NULL_KEY,
  expected: 'error',
};
exports.REMOVE_SECURE_DATA_VALUE_FOR_AN_APP_WITH_BOOLEAN_KEY = {
  method: 'manage_securestorage.removeForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.REMOVEFORAPP_WITH_BOOLEAN_KEY,
  expected: 'error',
};
exports.REMOVE_SECURE_DATA_VALUE_FOR_AN_APP_WITHOUT_KEY = {
  method: 'manage_securestorage.removeForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.REMOVEFORAPP_WITHOUT_KEY,
  expected: 'error',
};
exports.CLEAR_SECURE_DATA_VALUES_FOR_AN_APP_WITH_INVALID_SCOPE = {
  method: 'manage_securestorage.clearForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.CLEARFORAPP_WITH_INVALID_SCOPE,
  expected: 'error',
};
exports.CLEAR_SECURE_DATA_VALUES_FOR_AN_APP_WITH_EMPTY_SCOPE = {
  method: 'manage_securestorage.clearForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.CLEARFORAPP_WITH_EMPTY_SCOPE,
  expected: 'error',
};
exports.CLEAR_SECURE_DATA_VALUES_FOR_AN_APP_WITH_INTEGER_SCOPE = {
  method: 'manage_securestorage.clearForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.CLEARFORAPP_WITH_INTEGER_SCOPE,
  expected: 'error',
};
exports.CLEAR_SECURE_DATA_VALUES_FOR_AN_APP_WITH_NULL_SCOPE = {
  method: 'manage_securestorage.clearForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.CLEARFORAPP_WITH_NULL_SCOPE,
  expected: 'error',
};
exports.CLEAR_SECURE_DATA_VALUES_FOR_AN_APP_WITH_BOOLEAN_SCOPE = {
  method: 'manage_securestorage.clearForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.CLEARFORAPP_WITH_BOOLEAN_SCOPE,
  expected: 'error',
};
exports.CLEAR_SECURE_DATA_VALUES_FOR_AN_APP_WITHOUT_SCOPE = {
  method: 'manage_securestorage.clearForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.CLEARFORAPP_WITHOUT_SCOPE,
  expected: 'error',
};
