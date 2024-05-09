const fs = require('fs');
const jsonMerger = require('json-merger');
const CONSTANTS = require('../support/constants/constants');
const REGEXFORMATS = require('../support/constants/regexformats');
let envVariables;
const path = require('path');

function testDataProcessor(configEnv) {
  envVariables = configEnv;
  console.log('Inside testDataProcessor function');

  const fcsFireboltCalls = './cypress/fixtures/fireboltCalls/';
  const configModuleFireboltCalls = './node_modules/configModule/testData/fireboltCalls/';
  const fcsFireboltMocks = './cypress/fixtures/fireboltMocks/';
  const configModuleFireboltMocks = './node_modules/configModule/testData/fireboltMocks/';

  // Merging all JSON files from the directory.
  let fcsFireboltCallsMergedJson = fetchMergedJsonFromDirectory(fcsFireboltCalls);
  let configFireboltCallsModuleMergedJson = fetchMergedJsonFromDirectory(configModuleFireboltCalls);

  let fcsFireboltMocksMergedJson = fetchMergedJsonFromDirectory(fcsFireboltMocks);
  let configModuleFireboltMocksMergedJson = fetchMergedJsonFromDirectory(configModuleFireboltMocks);

  // Combining the FCS and config module JSON Data
  const combinedFireboltCallsJson = Object.assign(fcsFireboltCallsMergedJson, configFireboltCallsModuleMergedJson);
  const combinedFireboltMocksJson = Object.assign(fcsFireboltMocksMergedJson, configModuleFireboltMocksMergedJson);

  // Resolving the variables in the JSON
  const resolvedFireboltCallsJson = processfireboltJson(combinedFireboltCallsJson);
  const resolvedFireboltMocksJson = processfireboltJson(combinedFireboltMocksJson);
  return {
    'resolvedFireboltCallsJson': resolvedFireboltCallsJson,
    'resolvedFireboltMocksJson': resolvedFireboltMocksJson
  };
}
 
// Function to resolve the data in the JSON.
function processfireboltJson(jsonData) {
  // Looping through each file
  for (const key in jsonData) {
    if (Object.hasOwnProperty.call(jsonData, key)) {
      const object = jsonData[key];
      // Distinguishing between the firebolt object utilized for making a API calls or for validation purpose.
      if(!object.hasOwnProperty('validationJsonPath')){
        // Updating the default value when the firebolt object does not have.
        object.params = object.params ? object.params : CONSTANTS.NO_PARAMS;
        object.expected = object.expected ? object.expected : CONSTANTS.RESULT;
        object.action = CONSTANTS.ACTION_CORE.toLowerCase();
      }
      object.context = object.context ? object.context : CONSTANTS.NO_CONTEXT;

      // If a method has prefix with an underscore, the value is taken as the action.
      if (object.method && object.method.includes('_')) {
        object.action = object.method.split('_')[0];
        object.method = object.method.split('_')[1];
      }

      // Iterating over the object, resolving the data when the params, context and content fields are found.
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
      // TODO: Moving this inside cypress code
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
        console.log(
          `Expected context not found for ${dataIdentifier}. Returning ${dataIdentifier} as is.`
        );
        return dataIdentifier;
      } else {
        return contextValue;
      }

    case 'content':
      // Checking if an error is expected; if so, retrieving the error content objects.
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
            if (errorContentObject == CONSTANTS.NO_DATA) {
              console.log(`Expected error content not found in ${errorContentFilePath}`);
            }
            return (validationObject.type = errorContentObject);
          });
          return errorSchemaObject;
        } else {
          console.log(`Unable to find data for Error validation for ${dataIdentifier}`)
        }
      } else {
        // Combining validation objects from FCS and config module into single JSON
        let validationObjects = combineValidationObjectsJson();
        let validationObject = validationObjects[dataIdentifier];

        if (validationObject && validationObject.data) {
          validationObject.data.forEach((object, index) => {
            if (object.validations && object.validations.length > 0) {
              // Iterating through the validations array and resolving the value of type.
              object.validations.forEach((data) => {
                if(typeof data.type !== CONSTANTS.STRING){
                  return data.type;
                }
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
                    return (data.type = parsedRegexExp.toString());

                  case 'deviceContentValidation':
                    let deviceMac = envVariables['deviceMac'];
                    deviceMac = deviceMac.replaceAll(':', '');

                    const deviceDataPath = deviceMac
                      ? CONSTANTS.EXTERNAL_DEVICES_PATH + deviceMac + '.json'
                      : CONSTANTS.DEFAULT_DEVICE_DATA_PATH;

                    if (!deviceMac) {
                      console.log('Falling back to default device data path');
                    }
                    return (data.type = fetchAndParseDataFromJSON(deviceDataPath, data.type));

                  default:
                    return (data.type = testDataParser(data.type));
                }
              });
            }
            return object;
          });

          return validationObject;
        } else {
          return testDataParser(dataIdentifier, requestType);
        }
      }
  }
}

/** 
  *  @function testDataParser
  *  @description Fetching the data from json files based on the priority as shown below
  *    - External <module>.json from configModule (If applicable)
  *    - Internal <module>.json from fixtures (If applicable)
  *    - default.json
  *  @param {*} requestType - Type of request. param or content
  *  @param {*} dataIdentifier - Key to be used to fetch param or content data from the fixtures
  *  @example
  *    cy.testDataParser("Params","Account_Id");
  */
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

    const parsedModuleData = fetchAndParseDataFromJSON(
      moduleImportPath,
      dataIdentifier,
      requestType
    );

    paramData = parsedModuleData != CONSTANTS.NO_DATA ? parsedModuleData : paramData;

    // Checking the external module json file is present.
    if (fs.existsSync(externalModulePath)) {

      const parsedExternalModuleData = fetchAndParseDataFromJSON(externalModulePath, dataIdentifier, requestType);
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

function fetchAndParseDataFromJSON(filePath, dataIdentifier, requestType) {
  const data = fetchDataFromFile(filePath);
  return parseDataFromJson(data, dataIdentifier, requestType);
}

// Function to combine all validation JSON files from FCS and config module.
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

// Function to merge JSON files ferom the give directory
function fetchMergedJsonFromDirectory(directoryPath) {
  try {
    // Get list of files in the directory
    const files = fs.readdirSync(directoryPath);

    // Initializing an empty object to store merged JSON data
    let mergedData = {};
    files.forEach((file) => {
      // Check if the file is a JSON file
      if (path.extname(file) === '.json') {
        // Read the JSON file
        const jsonData = JSON.parse(fs.readFileSync(path.join(directoryPath, file), 'utf-8'));

        // Merge the data into the mergedData object
        mergedData = { ...mergedData, ...jsonData };
      }
    });
    return mergedData;
  } catch (error) {
    return null;
  }
}

module.exports = {
  testDataProcessor,
};
