const errorContent = require('../objects/errorContentObjects.js');
exports.LOCALIZATION_MANAGE = {
  method: resolveAtRuntime('manage_localization.{{attribute}}'),
  params: null,
  validationJsonPath: 'result',
  setMethod: resolveAtRuntime('manage_localization.set{{attribute.uppercaseFirstChar}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
  event: resolveAtRuntime('manage_localization.on{{attribute.uppercaseFirstChar}}Changed'),
  eventValidationJsonPath: 'eventResponse',
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: resolveAtRuntime('value'),
            description: resolveAtRuntime(
              'Validating that manage_localization.set{{attribute.uppercaseFirstChar}} {{attribute}} is {{value}}'
            ),
          },
        ],
      },
    ],
  },
};

exports.LOCALIZATION_ADDITIONAL_INFO = {
  setMethod: resolveAtRuntime('manage_localization.{{attribute}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
};

exports.LOCALIZATION = {
  method: resolveAtRuntime('localization.{{attribute}}'),
  params: {},
  validationJsonPath: 'result',
  setMethod: resolveAtRuntime('manage_localization.set{{attribute.uppercaseFirstChar}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
  event: resolveAtRuntime('localization.on{{attribute.uppercaseFirstChar}}Changed'),
  eventValidationJsonPath: 'eventResponse',
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: resolveAtRuntime('value'),
            description: resolveAtRuntime(
              'Validating that manage_localization.set{{attribute.uppercaseFirstChar}} {{attribute}} is {{value}}'
            ),
          },
        ],
      },
    ],
  },
};

exports.SET_LOCALIZATION_ADDADDITIONALINFO_WITH_KEY_AS_STRING_VALUE_AS_NULL = {
  method: 'manage_localization.addAdditionalInfo',
  params: { key: 'info', value: null },
  expected: 'error',
};

exports.SET_LOCALIZATION_ADDADDITIONALINFO_WITH_KEY_AS_NULL_VALUE_AS_STRING = {
  method: 'manage_localization.addAdditionalInfo',
  params: { key: null, value: 'value1' },
  expected: 'error',
};

exports.SET_LOCALIZATION_ADDADDITIONALINFO_WITH_KEY_AND_VALUE_AS_NULL = {
  method: 'manage_localization.addAdditionalInfo',
  params: { key: null, value: null },
  expected: 'error',
};

exports.SET_LOCALIZATION_ADDADDITIONALINFO_WITH_KEY_AND_VALUE_AS_INTEGER = {
  method: 'manage_localization.addAdditionalInfo',
  params: { key: 123, value: 123 },
  expected: 'error',
};

exports.SET_LOCALIZATION_ADDADDITIONALINFO_WITH_KEY_AND_VALUE_AS_OBJECT = {
  method: 'manage_localization.addAdditionalInfo',
  params: { key: {}, value: {} },
  expected: 'error',
};

exports.SET_LOCALIZATION_ADDADDITIONALINFO_WITH_EMPTY_OBJECT = {
  method: 'manage_localization.addAdditionalInfo',
  params: {},
  expected: 'error',
};

exports.INVALID_PARAMETERS_FOR_LOCALIZATION_ADDADDITIONALINFO = {
  method: 'localization.addAdditionalInfo',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};

exports.GET_LOCALIZATION_ADDITIONALINFO = {
  method: 'localization.additionalInfo',
  params: {},
};

exports.EXPECTED_LOCALIZATION_ADDITIONALINFO = {
  method: 'localization.additionalInfo',
  validationJsonPath: 'result',
  content: null,
};

exports.SET_LOCALIZATION_ADDADDITIONALINFO_WITH_STRING = {
  method: 'manage_localization.addAdditionalInfo',
  params: { key: 'defaultKey', value: 'defaultValue=' },
};

exports.SET_LOCALIZATION_ADDADDITIONALINFO_WITH_EMPTY_STRING = {
  method: 'manage_localization.addAdditionalInfo',
  params: { key: '', value: '' },
};

exports.SET_LOCALIZATION_REMOVEADDITIONALINFO_WITH_STRING = {
  method: 'manage_localization.removeAdditionalInfo',
  params: { key: 'defaultKey' },
};

exports.SET_LOCALIZATION_REMOVEADDITIONALINFO_WITH_EMPTY_STRING = {
  method: 'manage_localization.removeAdditionalInfo',
  params: { key: '' },
};

exports.STRING_FOR_LOCALIZATION_ADDITIONALINFO = {
  method: 'localization.additionalInfo',
  validationJsonPath: 'result',
  content: { defaultKey: 'defaultValue=' },
};

exports.EMPTY_STRING_FOR_LOCALIZATION_ADDITIONALINFO = {
  method: 'localization.additionalInfo',
  validationJsonPath: 'result',
  content: { '': '', defaultKey: 'defaultValue=' },
};

exports.EMPTY_KEY_VALUE_FOR_LOCALIZATION_ADDITIONALINFO = {
  method: 'localization.additionalInfo',
  validationJsonPath: 'result',
  content: { '': '' },
};

exports.EMPTY_RESPONSE_FOR_LOCALIZATION_ADDITIONALINFO = {
  method: 'localization.additionalInfo',
  validationJsonPath: 'result',
  content: {},
};

exports.GET_LOCALIZATION_LATLON = {
  method: 'localization.latlon',
  params: {},
};

exports.EXPECTED_LOCALIZATION_LATLON = {
  method: 'localization.latlon',
  validationJsonPath: 'result',
  content: '',
};

exports.LOCALIZATION_ONLOCALECHANGED = {
  method: 'localization.onLocaleChanged',
  params: {},
};

exports.LOCALIZATION_ONLANGUAGECHANGED = {
  method: 'localization.onLanguageChanged',
  params: {},
};

exports.LOCALIZATION_ONCOUNTRYCODECHANGED = {
  method: 'localization.onCountryCodeChanged',
  params: {},
};

exports.SET_LOCALE_TO_ENUK = {
  method: 'manage_localization.setLocale',
  params: { value: 'en-UK' },
};

exports.GET_LOCALIZATION_LOCALE = {
  method: 'localization.locale',
  params: {},
};
exports.GET_LOCALIZATION_LANGUAGE = {
  method: 'localization.language',
  params: {},
};
exports.GET_LOCALIZATION_COUNTRYCODE = {
  method: 'localization.countryCode',
  params: {},
};

exports.SET_LOCALE_TO_ESUK = {
  method: 'manage_localization.setLocale',
  params: { value: 'es-UK' },
};

exports.ENUK_FOR_LOCALIZATION_LOCALE = {
  method: 'localization.locale',
  validationJsonPath: 'result',
  content: 'en-UK',
};

exports.ESUK_FOR_LOCALIZATION_LOCALE = {
  method: 'localization.locale',
  validationJsonPath: 'result',
  content: 'es-UK',
};

exports.UK_FOR_LOCALIZATION_COUNTRYCODE = {
  method: 'localization.countryCode',
  validationJsonPath: 'result',
  content: 'UK',
};

exports.ES_FOR_LOCALIZATION_LANGUAGE = {
  method: 'localization.language',
  validationJsonPath: 'result',
  content: 'es',
};

exports.ONLOCALECHANGED_FOR_LOCALIZATION_WITH_ENUK = {
  event: 'localization.onLocaleChanged',
  validationJsonPath: 'eventResponse',
  content: 'en-UK',
};

exports.ONLOCALECHANGED_FOR_LOCALIZATION_WITH_ESUK = {
  event: 'localization.onLocaleChanged',
  validationJsonPath: 'eventResponse',
  content: 'es-UK',
};

exports.ONCOUNTRYCODECHANGED_FOR_LOCALIZATION_WITH_UK = {
  event: 'localization.onCountryCodeChanged',
  validationJsonPath: 'eventResponse',
  content: 'UK',
};

exports.ONLANGUAGECHANGED_FOR_LOCALIZATION_WITH_ES = {
  event: 'localization.onLanguageChanged',
  validationJsonPath: 'eventResponse',
  content: 'es',
};

exports.LOCALIZATION_ONLOCALITYCHANGED = {
  method: 'localization.onLocalityChanged',
  params: {},
};

exports.LOCALIZATION_ONLOCALITYCHANGED_EVENT = {
  event: 'localization.onLocalityChanged',
  firstParty: false,
};

exports.LOCALIZATION_ONCOUNTRYCODECHANGED_EVENT = {
  event: 'localization.onCountryCodeChanged',
  firstParty: false,
};

exports.LOCALIZATION_ONLOCALECHANGED_EVENT = {
  event: 'localization.onLocaleChanged',
  firstParty: false,
};

exports.LOCALIZATION_ONLANGUAGECHANGED_EVENT = {
  event: 'localization.onLanguageChanged',
  firstParty: false,
};

exports.SET_LOCALITY_TO_WASHINGTON = {
  method: 'manage_localization.setLocality',
  params: { value: 'Washington' },
};

exports.SET_COUNTRYCODE_TO_PH = {
  method: 'manage_localization.setCountryCode',
  params: { value: 'PH' },
};

exports.SET_LOCALE_TO_ENUS = {
  method: 'manage_localization.setLocale',
  params: { value: 'en-US' },
};

exports.SET_LANGUAGE_TO_EN = {
  method: 'manage_localization.setLanguage',
  params: { value: 'en' },
};

exports.ONLOCALITYCHANGED = {
  event: 'localization.onLocalityChanged',
  validationJsonPath: 'eventResponse',
  content: null,
};

exports.ONCOUNTRYCODECHANGED = {
  event: 'localization.onCountryCodeChanged',
  validationJsonPath: 'eventResponse',
  content: null,
};

exports.ONLOCALECHANGED = {
  event: 'localization.onLocaleChanged',
  validationJsonPath: 'eventResponse',
  content: null,
};

exports.ONLANGUAGECHANGED = {
  event: 'localization.onLanguageChanged',
  validationJsonPath: 'eventResponse',
  content: null,
};

exports.SET_LOCALIZATION_LOCALITY_TO_PHILADELPHIA = {
  method: 'manage_localization.setLocality',
  params: { value: 'Philadelphia' },
};

exports.SET_POSTALCODE_TO_19103 = {
  method: 'manage_localization.setPostalCode',
  params: { value: '19103' },
};

exports.SET_COUNTRYCODE_TO_US = {
  method: 'manage_localization.setCountryCode',
  params: { value: 'US' },
};

exports.SET_PREFERREDAUDIOLANGUAGES_TO_ENG_SPA = {
  method: 'manage_localization.setPreferredAudioLanguages',
  params: { value: ['eng', 'spa'] },
};

exports.SET_LOCALIZATION_TIMEZONE_WITH_AMERICA_LOSANGELES = {
  method: 'manage_localization.setTimeZone',
  params: { value: 'America/Los_Angeles' },
};
