exports.EXPECTED_LOCALIZATION_ADDITIONALINFO = {
  method: 'localization.additionalInfo',
  validationJsonPath: 'result',
  content: { subBouquet: '0' },
};

exports.STRING_FOR_LOCALIZATION_ADDITIONALINFO = {
  method: 'localization.additionalInfo',
  validationJsonPath: 'result',
  content: { subBouquet: '0', defaultKey: 'defaultValue=' },
};

exports.EMPTY_STRING_FOR_LOCALIZATION_ADDITIONALINFO = {
  method: 'localization.additionalInfo',
  validationJsonPath: 'result',
  content: { '': '', defaultKey: 'defaultValue=', subBouquet: '0' },
};

exports.EMPTY_KEY_VALUE_FOR_LOCALIZATION_ADDITIONALINFO = {
  method: 'localization.additionalInfo',
  validationJsonPath: 'result',
  content: { subBouquet: '0', '': '' },
};

exports.EMPTY_RESPONSE_FOR_LOCALIZATION_ADDITIONALINFO = {
  method: 'localization.additionalInfo',
  validationJsonPath: 'result',
  content: { subBouquet: '0' },
};
exports.INTEGER_FOR_LOCALIZATION_ADDITIONALINFO = {
  method: 'localization.additionalInfo',
  validationJsonPath: 'result',
  content: { subBouquet: '0', defaultKey: 123 },
};
exports.BOOLEAN_FOR_LOCALIZATION_ADDITIONALINFO = {
  method: 'localization.additionalInfo',
  validationJsonPath: 'result',
  content: { subBouquet: '0', defaultKey: true },
};
