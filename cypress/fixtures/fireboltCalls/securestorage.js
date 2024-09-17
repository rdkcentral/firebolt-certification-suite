const errorContent = require('../objects/errorContentObjects.js');
exports.STATIC_VARIABLES = {
  SECURESTORAGE_VARIABLES: {
    GET_DEVICE: {
      scope: 'device',
      key: 'authTestTokenDevice',
    },
    GET_ACCOUNT: {
      scope: 'account',
      key: 'authTestTokenAccount',
    },
    GET_DEVICE_KEY1: {
      scope: 'device',
      key: 'authTestTokenDevice1',
    },
    GET_ACCOUNT_KEY2: {
      scope: 'account',
      key: 'authTestTokenAccount2',
    },
    GET_DEVICE_KEY2: {
      scope: 'device',
      key: 'authTestTokenDevice2',
    },
    GET_ACCOUNT_KEY1: {
      scope: 'account',
      key: 'authTestTokenAccount1',
    },
  },
  SECURESTORAGE_CONTENT: {
    DEFAULT_VALUE: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
    VALUE1: 'authTestTokenValue1',
    GET_DEVICE2: 'authTestTokenDevice2',
    GET_ACCOUNT2: 'authTestTokenValue2',
    GET_DEVICE1: 'authTestTokenDevice1',
    GET_ACCOUNT1: 'authTestTokenAccount1',
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
exports.NULL_FOR_CLEARING_STORED_VALUE_FOR_AN_APP = {
  method: 'securestorage.clearForApp',
  validationJsonPath: 'result',
  content: null,
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
exports.GET_STORED_VALUE_WITH_SCOPE_AS_DEVICE_AND_KEY_AS_AUTHTESTTOKENDEVICE = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.GET_DEVICE,
};
exports.GET_STORED_VALUE_WITH_SCOPE_AS_ACCOUNT_AND_KEY_AS_AUTHTESTTOKENACCOUNT = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.GET_ACCOUNT,
};
exports.GET_STORED_VALUE_WITH_SCOPE_AS_DEVICE_AND_KEY_AS_AUTHTESTTOKENDEVICE1 = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.GET_DEVICE_KEY1,
};
exports.GET_STORED_VALUE_WITH_SCOPE_AS_ACCOUNT_AND_KEY_AS_AUTHTESTTOKENACCOUNT1 = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.GET_ACCOUNT_KEY1,
};
exports.NULL_FOR_GETTING_STORED_VALUE = {
  method: 'securestorage.get',
  validationJsonPath: 'result',
  content: null,
};
exports.EXPECTED_VALUE_FOR_AUTHTESTTOKENDEVICE_STORED_DATA_IN_SECURESTORAGE = {
  method: 'securestorage.get',
  validationJsonPath: 'result',
  content: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.DEFAULT_VALUE,
};
exports.EXPECTED_VALUE_FOR_AUTHTESTTOKENACCOUNT_STORED_DATA_IN_SECURESTORAGE = {
  method: 'securestorage.get',
  validationJsonPath: 'result',
  content: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.DEFAULT_VALUE,
};
exports.AUTHTESTTOKENVALUE1_FOR_STORED_DATA_IN_SECURESTORAGE = {
  method: 'securestorage.get',
  validationJsonPath: 'result',
  content: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.VALUE1,
};

exports.GET_STORED_VALUE_FOR_AN_APP_FOR_AUTHTESTTOKENDEVICE1_WITH_SCOPE_DEVICE = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.GET_DEVICE_KEY1,
};
exports.GET_STORED_VALUE_FOR_AN_APP_FOR_AUTHTESTTOKENDEVICE2_WITH_SCOPE_DEVICE = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.GET_DEVICE_KEY2,
};
exports.GET_STORED_VALUE_FOR_AN_APP_FOR_AUTHTESTTOKENACCOUNT1_WITH_SCOPE_ACCOUNT = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.GET_ACCOUNT_KEY1,
};
exports.GET_STORED_VALUE_FOR_AN_APP_FOR_AUTHTESTTOKENACCOUNT2_WITH_SCOPE_ACCOUNT = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.GET_ACCOUNT_KEY2,
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
exports.NULL_FOR_UPDATING_A_SECURE_DATA_VALUE_FOR_AN_APP = {
  method: 'securestorage.setForApp',
  validationJsonPath: 'result',
  content: null,
};
exports.EXPECTED_VALUE_FOR_AUTHTESTTOKENDEVICE2_STORED_DATA_IN_SECURESTORAGE = {
  method: 'securestorage.get',
  validationJsonPath: 'result',
  content: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.GET_DEVICE2,
};
exports.EXPECTED_VALUE_FOR_AUTHTESTTOKENACCOUNT2_STORED_DATA_IN_SECURESTORAGE = {
  method: 'securestorage.get',
  validationJsonPath: 'result',
  content: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.GET_ACCOUNT2,
};
exports.EXPECTED_VALUE_FOR_AUTHTESTTOKENACCOUNT1_STORED_DATA_IN_SECURESTORAGE = {
  method: 'securestorage.get',
  validationJsonPath: 'result',
  content: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.GET_ACCOUNT1,
};
exports.EXPECTED_VALUE_FOR_AUTHTESTTOKENDEVICE1_STORED_DATA_IN_SECURESTORAGE = {
  method: 'securestorage.get',
  validationJsonPath: 'result',
  content: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.GET_DEVICE1,
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
exports.INVALID_PARAMS_FOR_SETTING_A_DATA_VALUE_IN_SECURESTORAGE = {
  method: 'securestorage.setForApp',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMETERS_FOR_SECURESTORAGE_REMOVEFORAPP = {
  method: 'securestorage.removeForApp',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
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
exports.INVALID_PARAMS_FOR_CLEARING_ALL_DATA_FOR_AN_APP_IN_SECURESTORAGE = {
  method: 'securestorage.clearForApp',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.SET_SECURE_DATA_VALUE1_FOR_SECOND_APP_WITH_SCOPE_DEVICE = {
  method: 'manage_securestorage.setForApp',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SETFORAPP_DEVICE_KEY1_APP1,
};
