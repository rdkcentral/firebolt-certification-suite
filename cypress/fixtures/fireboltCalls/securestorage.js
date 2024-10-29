/**
 * Copyright 2024 Comcast Cable Communications Management, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
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
    CLEAR_DEVICE: {
      scope: 'device',
    },
    CLEAR_ACCOUNT: {
      scope: 'account',
    },
    SET_DEVICE: {
      scope: 'device',
      key: 'authTestTokenDevice',
      value: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
    },
    SET_ACCOUNT: {
      scope: 'account',
      key: 'authTestTokenAccount',
      value: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
    },
    SET_DEVICE_OPTIONAL: {
      scope: 'device',
      key: 'authTestTokenDevice1',
      value: 'authTestTokenValue1',
      options: {
        ttl: 2000,
      },
    },
    SET_ACCOUNT_OPTIONAL: {
      scope: 'account',
      key: 'authTestTokenAccount1',
      value: 'authTestTokenValue1',
      options: {
        ttl: 2000,
      },
    },
    SET_DEVICE_VALUE2: {
      scope: 'device',
      key: 'authTestTokenDevice1',
      value: 'authTestTokenValue2',
    },
    SET_ACCOUNT_VALUE2: {
      scope: 'account',
      key: 'authTestTokenAccount1',
      value: 'authTestTokenValue2',
    },
    SET_DEVICE_TO_ACCOUNT: {
      scope: 'account',
      key: 'authTestTokenDevice',
      value: 'VGhpcyBpcyBub3QgYSByZWFsIHRva2VuLg==',
    },
    SET_ACCOUNT_TO_DEVICE: {
      scope: 'device',
      key: 'authTestTokenAccount',
      value: 'VGhpcyBpcyBub3QgYSByZWFsIHRva2VuLg==',
    },
    GET_ACCOUNT_DEVICE_KEY: {
      scope: 'account',
      key: 'authTestTokenDevice',
    },
    GET_DEVICE_ACCOUNT_KEY: {
      scope: 'device',
      key: 'authTestTokenAccount',
    },
    SET_DEVICE1: {
      scope: 'device',
      key: 'authTestTokenDevice1',
      value: 'authTestTokenDevice1',
    },
    SET_DEVICE2: {
      scope: 'device',
      key: 'authTestTokenDevice2',
      value: 'authTestTokenDevice2',
    },
    SET_ACCOUNT1: {
      scope: 'account',
      key: 'authTestTokenAccount1',
      value: 'authTestTokenAccount1',
    },
    SET_ACCOUNT2: {
      scope: 'account',
      key: 'authTestTokenAccount2',
      value: 'authTestTokenAccount2',
    },
    REMOVE_DEVICE1: {
      scope: 'device',
      key: 'authTestTokenDevice1',
    },
    REMOVE_ACCOUNT1: {
      scope: 'account',
      key: 'authTestTokenAccount1',
    },
    KEY_EMPTY: {
      scope: 'device',
      key: '',
    },
    INVALID_SCOPE: {
      scope: 'test',
      key: 'authTestTokenDevice',
    },
    SCOPE_EMPTY: {
      scope: '',
      key: 'authTestTokenDevice',
    },
    SCOPE_NUM: {
      scope: 1234,
      key: 'authTestTokenDevice',
    },
    SCOPE_NULL: {
      scope: null,
      key: 'authTestTokenDevice',
    },
    SCOPE_BOOL: {
      scope: false,
      key: 'authTestTokenDevice',
    },
    WITHOUT_SCOPE: {
      key: 'authTestTokenDevice',
    },
    KEY_NUM: {
      scope: 'device',
      key: 1234,
    },
    KEY_NULL: {
      scope: 'device',
      key: null,
    },
    KEY_BOOL: {
      scope: 'device',
      key: false,
    },
    WITHOUT_KEY: {
      scope: 'device',
    },
    SET_INVALID_SCOPE: {
      scope: 'test',
      key: 'authTestTokenDevice',
      value: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
    },
    SET_SCOPE_NUM: {
      scope: 1234,
      key: 'authTestTokenDevice',
      value: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
    },
    SET_SCOPE_NULL: {
      scope: null,
      key: 'authTestTokenDevice',
      value: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
    },
    SET_SCOPE_BOOL: {
      scope: false,
      key: 'authTestTokenDevice',
      value: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
    },
    SET_SCOPE_EMPTY: {
      scope: '',
      key: 'authTestTokenDevice',
      value: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
    },
    SET_WITHOUT_SCOPE: {
      key: 'authTestTokenDevice',
      value: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
    },
    SET_KEY_NUM: {
      scope: 'device',
      key: 1234,
      value: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
    },
    SET_KEY_NULL: {
      scope: 'device',
      key: null,
      value: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
    },
    SET_KEY_BOOL: {
      scope: 'device',
      key: false,
      value: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
    },
    SET_WITHOUT_KEY: {
      scope: 'device',
      value: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
    },
    SET_VALUE_NUM: {
      scope: 'device',
      key: 'authTestTokenDevice',
      value: 1234,
    },
    SET_VALUE_NULL: {
      scope: 'device',
      key: 'authTestTokenDevice',
      value: null,
    },
    SET_VALUE_BOOL: {
      scope: 'device',
      key: 'authTestTokenDevice',
      value: false,
    },
    SET_WITHOUT_VALUE: {
      scope: 'device',
      key: 'authTestTokenDevice',
    },
    SET_INVALID_OPTIONS: {
      scope: 'account',
      key: 'authTestTokenAccount',
      value: 'authTestTokenValue1',
      options: {
        test: 600,
      },
    },
    SET_OPTIONS_EMPTY_OBJ: {
      scope: 'account',
      key: 'authTestTokenAccount',
      value: 'authTestTokenValue1',
      options: {},
    },
    SET_OPTIONS_EMPTY_STRING: {
      scope: 'account',
      key: 'authTestTokenAccount',
      value: 'authTestTokenValue1',
      options: '',
    },
    DEVICE_TTL: {
      scope: 'device',
      key: 'authTestTokenDeviceTTL',
    },
    ACCOUNT_TTL: {
      scope: 'account',
      key: 'authTestTokenAccountTTL',
    },
    SET_DEVICE_TTL: {
      scope: 'device',
      key: 'authTestTokenDeviceTTL',
      value: 'authTestTokenValueTTL',
      options: {
        ttl: 50,
      },
    },
    SET_ACCOUNT_TTL: {
      scope: 'account',
      key: 'authTestTokenAccountTTL',
      value: 'authTestTokenValueTTL',
      options: {
        ttl: 50,
      },
    },
    CLEAR_INVALID_SCOPE: {
      scope: 'test',
    },
    CLEAR_SCOPE_EMPTY: {
      scope: '',
    },
    CLEAR_SCOPE_NUM: {
      scope: 1234,
    },
    CLEAR_SCOPE_NULL: {
      scope: null,
    },
    CLEAR_SCOPE_BOOLEAN: {
      scope: false,
    },
  },
  SECURESTORAGE_CONTENT: {
    DEFAULT_VALUE: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
    VALUE1: 'authTestTokenValue1',
    GET_DEVICE2: 'authTestTokenDevice2',
    GET_ACCOUNT2: 'authTestTokenValue2',
    GET_DEVICE1: 'authTestTokenDevice1',
    GET_ACCOUNT1: 'authTestTokenAccount1',
    VALUE2: 'authTestTokenValue2',
    VALUE_TTL: 'authTestTokenValueTTL',
    SCOPE_UPDATED_VALUE: 'VGhpcyBpcyBub3QgYSByZWFsIHRva2VuLg==',
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
  content: this.STATIC_VARIABLES.SECURESTORAGE_CONTENT.DEFAULT_VALUE,
};
exports.EXPECTED_VALUE_FOR_AUTHTESTTOKENACCOUNT_STORED_DATA_IN_SECURESTORAGE = {
  method: 'securestorage.get',
  validationJsonPath: 'result',
  content: this.STATIC_VARIABLES.SECURESTORAGE_CONTENT.DEFAULT_VALUE,
};
exports.AUTHTESTTOKENVALUE1_FOR_STORED_DATA_IN_SECURESTORAGE = {
  method: 'securestorage.get',
  validationJsonPath: 'result',
  content: this.STATIC_VARIABLES.SECURESTORAGE_CONTENT.VALUE1,
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
  content: this.STATIC_VARIABLES.SECURESTORAGE_CONTENT.GET_DEVICE2,
};
exports.EXPECTED_VALUE_FOR_AUTHTESTTOKENACCOUNT2_STORED_DATA_IN_SECURESTORAGE = {
  method: 'securestorage.get',
  validationJsonPath: 'result',
  content: this.STATIC_VARIABLES.SECURESTORAGE_CONTENT.GET_ACCOUNT2,
};
exports.EXPECTED_VALUE_FOR_AUTHTESTTOKENACCOUNT1_STORED_DATA_IN_SECURESTORAGE = {
  method: 'securestorage.get',
  validationJsonPath: 'result',
  content: this.STATIC_VARIABLES.SECURESTORAGE_CONTENT.GET_ACCOUNT1,
};
exports.EXPECTED_VALUE_FOR_AUTHTESTTOKENDEVICE1_STORED_DATA_IN_SECURESTORAGE = {
  method: 'securestorage.get',
  validationJsonPath: 'result',
  content: this.STATIC_VARIABLES.SECURESTORAGE_CONTENT.GET_DEVICE1,
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

exports.CLEAR_STORED_VALUE_WITH_SCOPE_AS_DEVICE = {
  method: 'securestorage.clear',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.CLEAR_DEVICE,
};
exports.CLEAR_STORED_VALUE_WITH_SCOPE_AS_ACCOUNT = {
  method: 'securestorage.clear',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.CLEAR_ACCOUNT,
};
exports.NULL_FOR_CLEARING_STORED_VALUE = {
  method: 'securestorage.clear',
  validationJsonPath: 'result',
  content: null,
};
exports.UPDATE_STORED_VALUE_FOR_KEY_AUTHTESTTOKENDEVICE = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_DEVICE,
};
exports.UPDATE_STORED_VALUE_FOR_KEY_AUTHTESTTOKENACCOUNT = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_ACCOUNT,
};
exports.UPDATE_STORED_VALUE_FOR_KEY_AUTHTESTTOKENDEVICE1_WITH_OPTIONS = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_DEVICE_OPTIONAL,
};
exports.UPDATE_STORED_VALUE_FOR_KEY_AUTHTESTTOKENACCOUNT1_WITH_OPTIONS = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_ACCOUNT_OPTIONAL,
};
exports.AUTHTESTTOKENVALUE1_FOR_STORED_VALUE_IN_SECURESTORAGE = {
  method: 'securestorage.get',
  validationJsonPath: 'result',
  content: this.STATIC_VARIABLES.SECURESTORAGE_CONTENT.VALUE1,
};
exports.AUTHTESTTOKENVALUE2_FOR_STORED_VALUE_IN_SECURESTORAGE = {
  method: 'securestorage.get',
  validationJsonPath: 'result',
  content: this.STATIC_VARIABLES.SECURESTORAGE_CONTENT.VALUE2,
};
exports.UPDATE_STORED_VALUE_FOR_KEY_AUTHTESTTOKENDEVICE1 = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_DEVICE_VALUE2,
};
exports.UPDATE_STORED_VALUE_FOR_KEY_AUTHTESTTOKENACCOUNT1 = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_ACCOUNT_VALUE2,
};
exports.UPDATE_STORED_VALUE_WITH_SCOPE_AS_ACCOUNT_AND_KEY_AS_AUTHTESTTOKENDEVICE = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_DEVICE_TO_ACCOUNT,
};
exports.UPDATE_STORED_VALUE_WITH_SCOPE_AS_DEVICE_AND_KEY_AS_AUTHTESTTOKENACCOUNT = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_ACCOUNT_TO_DEVICE,
};
exports.GET_STORED_VALUE_WITH_SCOPE_AS_ACCOUNT_AND_KEY_AS_AUTHTESTTOKENDEVICE = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.GET_ACCOUNT_DEVICE_KEY,
};
exports.GET_STORED_VALUE_WITH_SCOPE_AS_DEVICE_AND_KEY_AS_AUTHTESTTOKENACCOUNT = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.GET_DEVICE_ACCOUNT_KEY,
};
exports.EXPECTED_VALUE_FOR_ACCOUNT_SCOPED_AUTHTESTTOKENDEVICE_STORED_DATA_IN_SECURESTORAGE = {
  method: 'securestorage.get',
  validationJsonPath: 'result',
  content: this.STATIC_VARIABLES.SECURESTORAGE_CONTENT.SCOPE_UPDATED_VALUE,
};
exports.EXPECTED_VALUE_FOR_DEVICE_SCOPED_AUTHTESTTOKENACCOUNT_STORED_DATA_IN_SECURESTORAGE = {
  method: 'securestorage.get',
  validationJsonPath: 'result',
  content: this.STATIC_VARIABLES.SECURESTORAGE_CONTENT.SCOPE_UPDATED_VALUE,
};
exports.SET_SECURE_VALUE_FOR_KEY_AUTHTESTTOKENDEVICE1 = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_DEVICE1,
};
exports.SET_SECURE_VALUE_FOR_KEY_AUTHTESTTOKENDEVICE2 = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_DEVICE2,
};
exports.SET_SECURE_VALUE_FOR_KEY_AUTHTESTTOKENACCOUNT1 = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_ACCOUNT1,
};
exports.SET_SECURE_VALUE_FOR_KEY_AUTHTESTTOKENACCOUNT2 = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_ACCOUNT2,
};
exports.REMOVE_THE_STORED_VALUE_AUTHTESTTOKENDEVICE1_WITH_SCOPE_DEVICE = {
  method: 'securestorage.remove',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.REMOVE_DEVICE1,
};
exports.REMOVE_THE_STORED_VALUE_AUTHTESTTOKENACCOUNT1_WITH_SCOPE_ACCOUNT = {
  method: 'securestorage.remove',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.REMOVE_ACCOUNT1,
};
exports.GET_STORED_VALUE_FOR_AUTHTESTTOKENACCOUNT1_WITH_SCOPE_DEVICE = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.GET_ACCOUNT_KEY1,
};
exports.GET_STORED_VALUE_FOR_AUTHTESTTOKENACCOUNT2_WITH_SCOPE_DEVICE = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.GET_ACCOUNT_KEY2,
};
exports.GET_STORED_VALUE_FOR_AUTHTESTTOKENDEVICE1_WITH_SCOPE_DEVICE = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.GET_DEVICE_KEY1,
};
exports.GET_STORED_VALUE_FOR_AUTHTESTTOKENDEVICE2_WITH_SCOPE_DEVICE = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.GET_DEVICE_KEY2,
};
exports.EXPECTED_VALUE_FOR_AUTHTESTTOKENDEVICE2_STORED_DATA_IN_SECURESTORAGE = {
  method: 'securestorage.get',
  validationJsonPath: 'result',
  content: this.STATIC_VARIABLES.SECURESTORAGE_CONTENT.GET_DEVICE2,
};
exports.EXPECTED_VALUE_FOR_AUTHTESTTOKENACCOUNT2_STORED_DATA_IN_SECURESTORAGE = {
  method: 'securestorage.get',
  validationJsonPath: 'result',
  content: this.STATIC_VARIABLES.SECURESTORAGE_CONTENT.GET_ACCOUNT2,
};
exports.EXPECTED_VALUE_FOR_AUTHTESTTOKENACCOUNT1_STORED_DATA_IN_SECURESTORAGE = {
  method: 'securestorage.get',
  validationJsonPath: 'result',
  content: this.STATIC_VARIABLES.SECURESTORAGE_CONTENT.GET_ACCOUNT1,
};
exports.EXPECTED_VALUE_FOR_AUTHTESTTOKENDEVICE1_STORED_DATA_IN_SECURESTORAGE = {
  method: 'securestorage.get',
  validationJsonPath: 'result',
  content: this.STATIC_VARIABLES.SECURESTORAGE_CONTENT.GET_DEVICE1,
};
exports.GET_STORED_VALUE_WITH_KEY_AS_EMPTY = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.KEY_EMPTY,
  expected: 'error',
};
exports.GET_STORED_VALUE_WITH_INVALID_SCOPE = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.INVALID_SCOPE,
  expected: 'error',
};
exports.GET_STORED_VALUE_WITH_SCOPE_AS_EMPTY_STRING = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SCOPE_EMPTY,
  expected: 'error',
};
exports.GET_STORED_VALUE_WITH_SCOPE_AS_NUMBER = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SCOPE_NUM,
  expected: 'error',
};
exports.GET_STORED_VALUE_WITH_SCOPE_AS_NULL = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SCOPE_NULL,
  expected: 'error',
};
exports.GET_STORED_VALUE_WITH_SCOPE_AS_BOOLEAN = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SCOPE_BOOL,
  expected: 'error',
};
exports.GET_STORED_VALUE_WITHOUT_SCOPE = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.WITHOUT_SCOPE,
  expected: 'error',
};
exports.GET_STORED_VALUE_WITH_KEY_AS_NUMBER = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.KEY_NUM,
  expected: 'error',
};
exports.GET_STORED_VALUE_WITH_KEY_AS_NULL = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.KEY_NULL,
  expected: 'error',
};
exports.GET_STORED_VALUE_WITH_KEY_AS_BOOLEAN = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.KEY_BOOL,
  expected: 'error',
};
exports.GET_STORED_VALUE_WITHOUT_KEY = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.WITHOUT_KEY,
  expected: 'error',
};
exports.CUSTOM_ERROR_FOR_SECURESTORAGE_GET = {
  method: 'securestorage.get',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMETERS_FOR_SECURESTORAGE_GET = {
  method: 'securestorage.get',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.SET_SECURE_VALUE_WITH_INVALID_SCOPE = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_INVALID_SCOPE,
  expected: 'error',
};
exports.SET_SECURE_VALUE_WITH_SCOPE_AS_NUMBER = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_SCOPE_NUM,
  expected: 'error',
};
exports.SET_SECURE_VALUE_WITH_SCOPE_AS_NULL = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_SCOPE_NULL,
  expected: 'error',
};
exports.SET_SECURE_VALUE_WITH_SCOPE_AS_BOOLEAN = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_SCOPE_BOOL,
  expected: 'error',
};
exports.SET_SECURE_VALUE_WITH_SCOPE_AS_EMPTY_STRING = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_SCOPE_EMPTY,
  expected: 'error',
};
exports.SET_SECURE_VALUE_WITHOUT_SCOPE = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_WITHOUT_SCOPE,
  expected: 'error',
};
exports.SET_SECURE_VALUE_WITH_KEY_AS_NUMBER = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_KEY_NUM,
  expected: 'error',
};
exports.SET_SECURE_VALUE_WITH_KEY_AS_NULL = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_KEY_NULL,
  expected: 'error',
};
exports.SET_SECURE_VALUE_WITH_KEY_AS_BOOLEAN = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_KEY_BOOL,
  expected: 'error',
};
exports.SET_SECURE_VALUE_WITHOUT_KEY = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_WITHOUT_KEY,
  expected: 'error',
};
exports.SET_SECURE_VALUE_WITH_VALUE_AS_NUMBER = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_VALUE_NUM,
  expected: 'error',
};
exports.SET_SECURE_VALUE_WITH_VALUE_AS_NULL = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_VALUE_NULL,
  expected: 'error',
};
exports.SET_SECURE_VALUE_WITH_VALUE_AS_BOOLEAN = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_VALUE_BOOL,
  expected: 'error',
};
exports.SET_SECURE_VALUE_WITHOUT_VALUE = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_WITHOUT_VALUE,
  expected: 'error',
};
exports.SET_SECURE_VALUE_WITH_INVALID_OPTIONS = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_INVALID_OPTIONS,
  expected: 'error',
};
exports.SET_SECURE_VALUE_WITH_OPTIONS_AS_EMPTY_OBJECT = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_OPTIONS_EMPTY_OBJ,
  expected: 'error',
};
exports.SET_SECURE_VALUE_WITH_OPTIONS_AS_EMPTY_STRING = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_OPTIONS_EMPTY_STRING,
  expected: 'error',
};
exports.INVALID_PARAMETERS_FOR_SECURESTORAGE_SET = {
  method: 'securestorage.set',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.CUSTOM_ERROR_FOR_SECURESTORAGE_REMOVE = {
  method: 'securestorage.remove',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.CUSTOM_ERROR_FOR_SECURESTORAGE_SET = {
  method: 'securestorage.set',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.REMOVE_STORED_VALUE_WITH_INVALID_SCOPE = {
  method: 'securestorage.remove',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.INVALID_SCOPE,
  expected: 'error',
};
exports.REMOVE_STORED_VALUE_WITH_SCOPE_AS_EMPTY_STRING = {
  method: 'securestorage.remove',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SCOPE_EMPTY,
  expected: 'error',
};
exports.REMOVE_STORED_VALUE_WITH_SCOPE_AS_NUMBER = {
  method: 'securestorage.remove',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SCOPE_NUM,
  expected: 'error',
};
exports.REMOVE_STORED_VALUE_WITH_SCOPE_AS_NULL = {
  method: 'securestorage.remove',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SCOPE_NULL,
  expected: 'error',
};
exports.REMOVE_STORED_VALUE_WITH_SCOPE_AS_BOOLEAN = {
  method: 'securestorage.remove',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SCOPE_BOOL,
  expected: 'error',
};
exports.REMOVE_STORED_VALUE_WITHOUT_SCOPE = {
  method: 'securestorage.remove',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.WITHOUT_SCOPE,
  expected: 'error',
};
exports.REMOVE_STORED_VALUE_WITH_KEY_AS_NUMBER = {
  method: 'securestorage.remove',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.KEY_NUM,
  expected: 'error',
};
exports.REMOVE_STORED_VALUE_WITH_KEY_AS_NULL = {
  method: 'securestorage.remove',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.KEY_NULL,
  expected: 'error',
};
exports.REMOVE_STORED_VALUE_WITH_KEY_AS_BOOLEAN = {
  method: 'securestorage.remove',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.KEY_BOOL,
  expected: 'error',
};
exports.REMOVE_STORED_VALUE_WITHOUT_KEY = {
  method: 'securestorage.remove',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.WITHOUT_KEY,
  expected: 'error',
};
exports.GET_STORED_VALUE_WITH_SCOPE_AS_DEVICE_AND_KEY_AS_AUTHTESTTOKENDEVICETTL = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.DEVICE_TTL,
};
exports.GET_STORED_VALUE_WITH_SCOPE_AS_ACCOUNT_AND_KEY_AS_AUTHTESTTOKENACCOUNTTTL = {
  method: 'securestorage.get',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.ACCOUNT_TTL,
};
exports.SET_SECURE_VALUE_WITH_SCOPE_AS_DEVICE_AND_TTL_AS_50 = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_DEVICE_TTL,
};
exports.SET_SECURE_VALUE_WITH_SCOPE_AS_ACCOUNT_AND_TTL_AS_50 = {
  method: 'securestorage.set',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.SET_ACCOUNT_TTL,
};
exports.REMOVE_STORED_VALUE_WITH_SCOPE_AS_DEVICE_AND_TTL_AS_50 = {
  method: 'securestorage.remove',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.DEVICE_TTL,
};
exports.REMOVE_STORED_VALUE_WITH_SCOPE_AS_ACCOUNT_AND_TTL_AS_50 = {
  method: 'securestorage.remove',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.ACCOUNT_TTL,
};
exports.AUTHTESTTOKENVALUETTL_FOR_STORED_VALUE_IN_SECURESTORAGE = {
  method: 'securestorage.get',
  validationJsonPath: 'result',
  content: this.STATIC_VARIABLES.SECURESTORAGE_CONTENT.VALUE_TTL,
};
exports.CLEAR_STORED_VALUE_WITH_INVALID_SCOPE = {
  method: 'securestorage.clear',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.CLEAR_INVALID_SCOPE,
  expected: 'error',
};
exports.CLEAR_STORED_VALUE_WITH_SCOPE_AS_EMPTY_STRING = {
  method: 'securestorage.clear',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.CLEAR_SCOPE_EMPTY,
  expected: 'error',
};
exports.CLEAR_STORED_VALUE_WITH_SCOPE_AS_NUMBER = {
  method: 'securestorage.clear',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.CLEAR_SCOPE_NUM,
  expected: 'error',
};
exports.CLEAR_STORED_VALUE_WITH_SCOPE_AS_NULL = {
  method: 'securestorage.clear',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.CLEAR_SCOPE_NULL,
  expected: 'error',
};
exports.CLEAR_STORED_VALUE_WITH_SCOPE_AS_BOOLEAN = {
  method: 'securestorage.clear',
  params: this.STATIC_VARIABLES.SECURESTORAGE_VARIABLES.CLEAR_SCOPE_BOOLEAN,
  expected: 'error',
};
exports.CLEAR_STORED_VALUE_WITHOUT_SCOPE = {
  method: 'securestorage.clear',
  params: {},
  expected: 'error',
};
exports.INVALID_PARAMETERS_FOR_SECURESTORAGE_CLEAR = {
  method: 'securestorage.clear',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
