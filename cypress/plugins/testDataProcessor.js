const fs = require('fs');
const jsonMerger = require('json-merger');
const CONSTANTS = require('../support/constants/constants');
const REGEXFORMATS = require('../support/constants/regexformats');
let envVariables; 

function testDataProcessor(configEnv) {
  // TODO: verify below ways is ok
  envVariables = configEnv;
  console.log('Inside testDataProcessor function');
  // TODO: Fetch and merge only json files
  const fcsFireboltCalls = './cypress/fixtures/fireboltCalls/';
  const configModuleFireboltCalls = './node_modules/configModule/testData/fireboltCalls/';
  // add fcsFireboltCalls in below line
  let fcsMergedJson = fetchMergedJsonFromDirectory(fcsFireboltCalls);
  let configModuleMergedJson = fetchMergedJsonFromDirectory(configModuleFireboltCalls);
  let combinedJson = Object.assign(fcsMergedJson, configModuleMergedJson);
  let resolvedJson = processfireboltJson(combinedJson);
  return {'resolvedFireboltJson': resolvedJson};
  
  // testing purpose
  // fs.writeFile('resolvedJson.json', JSON.stringify(resolvedJson));
}
 
function processfireboltJson(jsonData) {
  // const updatedJson = {};
  for (const key in jsonData) {
    if (Object.hasOwnProperty.call(jsonData, key)) {
      const object = jsonData[key];
      if(!object.hasOwnProperty('validationJsonPath')){
        object.params = object.params ? object.params : CONSTANTS.NO_PARAMS;
        object.expected = object.expected ? object.expected : CONSTANTS.RESULT;
        object.action = CONSTANTS.ACTION_CORE.toLowerCase();
      }
      object.context = object.context ? object.context : CONSTANTS.NO_CONTEXT;

      if (object.method && object.method.includes('_')) {
        object.action = object.method.split('_')[0];
        object.method = object.method.split('_')[1];
      }

      for (const prop in object) {
        if (['params', 'context', 'content'].includes(prop)) {
          const value = testDataHandler(prop, object[prop], object);
          jsonData[key][prop] = value;
        }
      }
    }
  }
  return jsonData;
}

function testDataHandler(requestType, dataIdentifier, fireboltObject) {
  switch (requestType) {
    case 'params':
      // TODO: Need to discuss where we can handle this env, In before operation updating this env's.
      // Fetching the value of environment variable based on dataIdentifier
      // if (/CYPRESSENV/.test(dataIdentifier)) {
      //   const envParam = dataIdentifier.split('-')[1];
      //   return UTILS.getEnvVariable(envParam);
      // }
      
      return typeof dataIdentifier === 'string' ? testDataParser(dataIdentifier, requestType) : dataIdentifier;

    case 'context':
      const contextImportFile = CONSTANTS.CONTEXT_FILE_PATH;
      const contextValue = fetchAndParseDataFromJSON(contextImportFile, dataIdentifier);
      if (contextValue === CONSTANTS.NO_DATA) {
        // TODO: Make sure this loh show's in report
        // console.log(
        //   `Expected context not found for ${dataIdentifier}. Returning ${dataIdentifier} as is.`
        // );
        return dataIdentifier;
      } else {
        return contextValue;
      }

    case 'content':
      if (
        fireboltObject.hasOwnProperty('expectingError') &&
        fireboltObject.expectingError == true
      ) {
        const errorSchemaFilePath = CONSTANTS.ERROR_SCHEMA_OBJECTS_PATH;
        const errorContentFilePath = CONSTANTS.ERROR_CONTENT_OBJECTS_PATH;
        const errorSchemaObject = fetchAndParseDataFromJSON(errorSchemaFilePath, dataIdentifier);

        if (
          typeof errorSchemaObject == CONSTANTS.TYPE_OBJECT &&
          errorSchemaObject.type == CONSTANTS.VALIDATION_FUNCTION
        ) {
          errorSchemaObject.validations.forEach((validationObject) => {
            let errorContentObject = fetchAndParseDataFromJSON(
              errorContentFilePath,
              validationObject.type
            );
            // if (errorContentObject == CONSTANTS.NO_DATA) {
            //   assert(false, `Expected error content not found in ${errorContentFilePath}`);
            // }
            return (validationObject.type = errorContentObject);
          });
          return errorSchemaObject;
        } else {
          // cy.log('Unable to find data for Error validation').then(() => {
          //   assert(false, 'Unable to find data for Error validation');
          // });
        }
      } else {
        let validationObjects = combineValidationObjectsJson();
        let validationObject = validationObjects[dataIdentifier];

        if (validationObject && validationObject.data) {
          let validationObjectData = validationObject.data;
          validationObjectData.forEach((object, index) => {
            if (object.validations && object.validations.length > 0) {
              object.validations.forEach((data) => {
                switch (data.mode) {
                  case 'regex':
                    let regexType = data.type.includes('_REGEXP')
                      ? data.type
                      : data.type + '_REGEXP';
                    let parsedRegexExp;
                    if (REGEXFORMATS[regexType]) {
                      parsedRegexExp = REGEXFORMATS[regexType];
                    } else {
                      const regExp = new RegExp(regexType);
                      parsedRegexExp = regExp;
                    }
                    const config = {
                      regex: parsedRegexExp,
                    };
                    // TODO: correct the parsing 
                    return (data.type = JSON.stringify(config));
                  case 'deviceContentValidation':
                    let deviceMac = envVariables['deviceMac'];
                    deviceMac = deviceMac.replaceAll(':', '');
                    // return data.type = testDataParser(data.type);

                    const deviceDataPath = deviceMac
                      ? CONSTANTS.EXTERNAL_DEVICES_PATH + deviceMac + '.json'
                      : CONSTANTS.DEFAULT_DEVICE_DATA_PATH;

                    // if (!deviceMAC) {
                    //   console.log('Falling back to default device data path');
                    // }

                    return (data.type = fetchAndParseDataFromJSON(deviceDataPath, data.type));

                  default:
                    return (data.type = testDataParser(data.type));
                }
              });
            }
            return object;
          });

          return validationObjectData;
        } else {
          return testDataParser(dataIdentifier, requestType);
        }
      }
    // if (
    //   typeof dataIdentifier == CONSTANTS.STRING ||
    //   (dataIdentifier &&
    //     dataIdentifier.validations &&
    //     dataIdentifier.validations[0].mode &&
    //     dataIdentifier.validations[0].mode == CONSTANTS.STATIC_CONTENT_VALIDATION)
    // ) {
    //   dataIdentifier =
    //       typeof dataIdentifier == CONSTANTS.OBJECT
    //         ? dataIdentifier.validations[0].type
    //         : dataIdentifier;
    //   console.log('Expec dataIdentifier', dataIdentifier)
    //   const moduleName = extractModuleName(dataIdentifier);
    //   console.log('Expec moduleName', moduleName)
    // }

    default:
      break;
  }
}

function testDataParser(dataIdentifier, requestType) {
  let defaultRetVal = dataIdentifier;
  if (requestType == 'params') {
    defaultRetVal = { value: dataIdentifier };
  }
  let defaultData = mergeJsonFilesData([
    `${CONSTANTS.FCS_DEFAULTTESTDATA_PATH}`,
    `${CONSTANTS.CONFIG_DEFAULTTESTDATA_PATH}`,
  ]);

  let paramData = parseDataFromJson(defaultData, dataIdentifier, requestType);

  if (dataIdentifier.includes('_')) {
    moduleName = extractModuleName(dataIdentifier);
    dataIdentifier = dataIdentifier.slice(dataIdentifier.indexOf('_') + 1);
    const moduleImportPath = `${CONSTANTS.MODULES_PATH}${moduleName}.json`;
    const externalModulePath = `${CONSTANTS.EXTERNAL_PATH}${moduleName}.json`;

    const moduleData = fetchDataFromFile(moduleImportPath);

    const parsedModuleData = parseDataFromJson(moduleData, dataIdentifier, requestType);

    paramData = parsedModuleData != CONSTANTS.NO_DATA ? parsedModuleData : paramData;

    // Checking the external module json file is present.
    if (fs.existsSync(externalModulePath)) {
      const externalModuleData = fetchDataFromFile(externalModulePath);

      const parsedExternalModuleData = parseDataFromJson(
        externalModuleData,
        dataIdentifier,
        requestType
      );
      paramData =
        parsedExternalModuleData != CONSTANTS.NO_DATA ? parsedExternalModuleData : paramData;
      response = paramDatalogs(paramData, dataIdentifier, defaultRetVal);
      return response;
    } else {
      response = paramDatalogs(paramData, dataIdentifier, defaultRetVal);
      return response;
    }
  } else {
    response = paramDatalogs(paramData, dataIdentifier, defaultRetVal);
    return response;
  }
}

function fetchAndParseDataFromJSON(filePath, dataIdentifier) {
  const data = fetchDataFromFile(filePath);
  return parseDataFromJson(data, dataIdentifier);
}

function combineValidationObjectsJson() {
  let fcsValidationObjectsJson = fetchMergedJsonFromDirectory(CONSTANTS.VALIDATION_OBJECTS_PATH);
  let configModuleValidationObjectsJson = fetchMergedJsonFromDirectory(
    CONSTANTS.CONFIG_VALIDATION_OBJECTS_PATH
  );
  let combinedValidationObjects = fcsValidationObjectsJson;
  if (configModuleValidationObjectsJson) {
    for (const key in configModuleValidationObjectsJson) {
      if (fcsValidationObjectsJson.hasOwnProperty(key)) {
        configModuleValidationObjectsJson[key].data.map((configObjectValue) => {
          if (!configObjectValue.hasOwnProperty('override')) {
            fcsValidationObjectsJson[key].data.push(configObjectValue);
          } else {
            overrideValue = configObjectValue.override;
            if (overrideValue == CONSTANTS.ALL) {
              fcsValidationObjectsJson[key].data = configObjectValue;
            } else {
              fcsValidationObjectsJson[key].data.map((fcsObjectValue, index) => {
                if (index == overrideValue) {
                  fcsValidationObjectsJson[key].data[index] = configObjectValue;
                }
              });
            }
          }
        });
      } else {
        fcsValidationObjectsJson[key] = configModuleValidationObjectsJson[key];
      }
    }
    combinedValidationObjects = fcsValidationObjectsJson;
  }
  return combinedValidationObjects;
}

function paramDatalogs(paramData, dataIdentifier, defaultRetVal) {
  if (paramData == CONSTANTS.NO_DATA) {
    // console.log(eval(CONSTANTS.EXPECTED_DATA_NOT_FOUND_IN_MODULE_JSONS))
    return defaultRetVal;
  } else {
    return paramData;
  }
}

function extractModuleName(dataIdentifier) {
  let moduleName = dataIdentifier;

  // Extracting module name from object/string
  if (dataIdentifier.method != undefined) {
    moduleName = dataIdentifier.method.split('.')[0];
  } else if (moduleName.includes('_')) {
    moduleName = dataIdentifier.split('_')[0];
  } else if (moduleName.includes('.')) {
    moduleName = dataIdentifier.split('.')[0];
  } else {
    return moduleName;
  }

  moduleName = moduleName.toLowerCase();
  return moduleName;
}

// Function to fecth the value from the JSON
function parseDataFromJson(data, dataIdentifier, requestType) {
  try {
    if (data[dataIdentifier] !== undefined) {
      if (
        typeof data[dataIdentifier] == CONSTANTS.STRING ||
        typeof data[dataIdentifier] == CONSTANTS.BOOLEAN ||
        typeof data[dataIdentifier] == CONSTANTS.NUMBER ||
        data[dataIdentifier] === null
      ) {
        if (requestType == 'params') {
          return { value: data[dataIdentifier] };
        } else {
          return data[dataIdentifier];
        }
      } else {
        return data[dataIdentifier];
      }
    } else {
      return CONSTANTS.NO_DATA;
    }
  } catch (error) {
    return error;
  }
}

// Function to fetch data from file
function fetchDataFromFile(filePath) {
  if (fs.existsSync(filePath)) {
    data = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(data);
    return data;
  } else {
    return null;
  }
}

function mergeJsonFilesData(paths) {
  const files = [];
  paths.forEach((file) => {
    if (fs.existsSync(file)) {
      files.push(file);
    }
  });
  return jsonMerger.mergeFiles(files);
}

function fetchMergedJsonFromDirectory(directoryPath) {
  try {
    let jsonFiles = fs.readdirSync(directoryPath);
    jsonFiles.forEach((element, index) => (jsonFiles[index] = directoryPath + element));
    return jsonMerger.mergeFiles(jsonFiles);
  } catch (error) {
    return null;
  }
}

module.exports = {
  testDataProcessor,
};
