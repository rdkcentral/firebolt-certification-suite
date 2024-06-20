const fs = require('fs');
const jsonMerger = require('json-merger');
const CONSTANTS = require('../support/constants/constants');
const REGEXFORMATS = require('../fixtures/regexformats');
let envVariables;
const path = require('path');
const _ = require('lodash');
const logger = require('../support/Logger')('testDataProcessor.js');

// Combining validation objects from FCS and config module into single JSON
const validationObjects = combineValidationObjectsJson();
let resolvedFireboltCallsJson;
let combinedFireboltMocksJson;

/**
 *  @function testDataProcessor
 *  The Test Data Processor performs the following operations:
 *  - Merges all JSON files located within a specified directory.
 *  - Resolves the value for a specified key in each JSON object.
 *
 *  @example
 *  testDataProcessor()
 */
function testDataProcessor(configEnv) {
  envVariables = configEnv;
  const fcsFireboltCalls = CONSTANTS.FIREBOLTCALLS_FROM_FCS;
  const configModuleFireboltCalls = CONSTANTS.FIREBOLTCALLS_FROM_CONFIGMODULE;
  const fcsFireboltMocks = CONSTANTS.FIREBOLTMOCK_FROM_FCS;
  const configModuleFireboltMocks = CONSTANTS.FIREBOLTMOCK_FROM_CONFIGMODULE;
  const fcsSetResponseJson = CONSTANTS.FCS_SETRESPONSE_PATH;
  const configModuleSetResponseJson = CONSTANTS.CONFIG_MODULE_SETRESPONSE_PATH;

  // Merging all JSON files from the directory.
  const fcsFireboltCallsMergedJson = fetchMergedJsonFromDirectory(fcsFireboltCalls);
  const configFireboltCallsModuleMergedJson =
    fetchMergedJsonFromDirectory(configModuleFireboltCalls);

  const fcsFireboltMocksMergedJson = fetchMergedJsonFromDirectory(fcsFireboltMocks);
  const configModuleFireboltMocksMergedJson =
    fetchMergedJsonFromDirectory(configModuleFireboltMocks);

  // Combining the FCS and config module JSON Data
  const combinedFireboltCallsJson = Object.assign(
    fcsFireboltCallsMergedJson,
    configFireboltCallsModuleMergedJson
  );
  combinedFireboltMocksJson = Object.assign(
    fcsFireboltMocksMergedJson,
    configModuleFireboltMocksMergedJson
  );

  const mergedSetResponseJson = mergeJsonFilesData([
    fcsSetResponseJson,
    configModuleSetResponseJson,
  ]);

  // Resolving the variables in the JSON
  resolvedFireboltCallsJson = processFireboltJson(combinedFireboltCallsJson);

  // Resolving the variables in the SetResponse JSON
  const resolvedSetResponseJson = processSetResponseJson(mergedSetResponseJson);

  // Below key names are converted into environment variables.
  return {
    fireboltCallsJson: resolvedFireboltCallsJson,
    fireboltMocksJson: combinedFireboltMocksJson,
    setResponseJson: resolvedSetResponseJson,
    combineValidationObjectsJson: validationObjects,
  };
}

/**
 *  @function processSetResponseJson
 *  processSetResponseJson function will perform following operations
 *  - Iterate over each key in the provided JSON
 *  - Resolve the values of setResponse params
 *  - Return the JSON with the updated value.
 *
 *  @example
 *  processSetResponseJson({'abc': {'fireboltMock': 'ACKNOWLEDGE_CHALLENGE_GRANTED', 'firstParty': 'true'}})
 *  @returns
 *  {'abc': {fireboltMock: {'method': 'method_name', 'response': [{"isCancelled": false, "withUi": true, "result":{}}]}}, 'firstParty': 'true'}
 */
function processSetResponseJson(setResponseJsonData) {
  // Looping through json data
  for (const key in setResponseJsonData) {
    const object = setResponseJsonData[key];
    if (object.hasOwnProperty('fireboltMock') && combinedFireboltMocksJson[object.fireboltMock]) {
      object.fireboltMock = combinedFireboltMocksJson[object.fireboltMock];
    } else if (
      object.hasOwnProperty('fireboltCall') &&
      resolvedFireboltCallsJson[object.fireboltCall]
    ) {
      object.fireboltCall = resolvedFireboltCallsJson[object.fireboltCall];
    }
  }
  return setResponseJsonData;
}

/**
 *  @function processFireboltJson
 *  processFireboltJson function will perform following operations
 *  - Iterate over each key in the provided JSON
 *  - Resolve the values of params, context, or content if present
 *  - Return the JSON with the updated value.
 *
 *  @example
 *  processFireboltJson({'abc': {'method': 'method_name', 'params': 'TRUE'}})
 *  processFireboltJson({'abc': {'method': 'method_name', 'params': 'TRUE', 'context': 'no_context'}})
 *  processFireboltJson({'abc': {'method': 'method_name', 'validationJsonPath': 'result', 'content': 'TRUE'}})
 *
 *  @returns
 *  {'abc': {'method': 'method_name', 'params': true}}
 *  {'abc': {'method': 'method_name', 'params': true, 'context': {}}}
 *  {'abc': {'method': 'method_name', 'validationJsonPath': 'result', 'content': true}}
 */
function processFireboltJson(jsonData) {
  // Looping through json data
  for (const key in jsonData) {
    if (Object.hasOwnProperty.call(jsonData, key)) {
      const object = jsonData[key];
      // Updating the default value for params and context, when the firebolt object does not have.
      object.params = object.params ? object.params : CONSTANTS.NO_PARAMS;
      object.context = object.context ? object.context : CONSTANTS.NO_CONTEXT;

      // Iterating over the object, resolve the values of params, context or content fields if present.
      for (const prop in object) {
        if (
          [
            CONSTANTS.PARAMS.toLowerCase(),
            CONSTANTS.CONTEXT.toLowerCase(),
            CONSTANTS.CONTENT.toLowerCase(),
          ].includes(prop)
        ) {
          const value = testDataHandler(prop, object[prop], object);
          jsonData[key][prop] = value;
        }
      }
    }
  }
  return jsonData;
}

/**
 *  @function testDataHandler
 *  This command is used mainly for parsing and fetching test data from various fixture files depending on the requestType passed to the command.
 *  RequestType can have different values based on what type of data need to be parsed and fetched from test data file
 *
 *  @param {*} requestType - Type of request. param or content
 *  @param {*} dataIdentifier - Key to be used to fetch param, context or content data from the fixtures.
 *  @param {*} fireboltObject - firebolt object passed as parameters
 *
 *  @example
 *  processFireboltJson({'abc': {'method': 'method_name', 'params': 'TRUE'}})
 *  processFireboltJson({'abc': {'method': 'method_name', 'params': 'TRUE', 'context': 'no_context'}})
 *  processFireboltJson({'abc': {'method': 'method_name', 'validationJsonPath': 'result', 'content': 'TRUE'}})
 *
 */
function testDataHandler(requestType, dataIdentifier, fireboltObject) {
  switch (requestType) {
    case CONSTANTS.PARAMS.toLowerCase():
      // If parameter contains CYPRESSENV returning the dataIdentifier as is.
      if (/CYPRESSENV/.test(dataIdentifier)) {
        return dataIdentifier;
      }

      // If parameter is type object returning the dataIdentifier as is else calling the testDataParser to fetch the actual param.
      return typeof dataIdentifier === CONSTANTS.TYPE_STRING
        ? testDataParser(dataIdentifier, requestType)
        : dataIdentifier;

    case CONSTANTS.CONTEXT.toLowerCase():
      const contextImportFile = CONSTANTS.CONTEXT_FILE_PATH;
      const contextValue = fetchAndParseDataFromJson(contextImportFile, dataIdentifier);
      if (contextValue === CONSTANTS.NO_DATA) {
        logger.info(
          `Expected context not found for ${dataIdentifier}. Returning ${dataIdentifier} as is.`
        );
        return dataIdentifier;
      } else {
        return contextValue;
      }

    case CONSTANTS.CONTENT.toLowerCase():
      // Checking if an error is expected; if so, retrieving the error content objects.
      if (
        fireboltObject.hasOwnProperty(CONSTANTS.EXPECTING_ERROR) &&
        fireboltObject.expectingError == true
      ) {
        const errorSchemaFilePath = CONSTANTS.ERROR_SCHEMA_OBJECTS_PATH;
        const errorContentFilePath = CONSTANTS.ERROR_CONTENT_OBJECTS_PATH;
        const errorSchemaObject = fetchAndParseDataFromJson(errorSchemaFilePath, dataIdentifier);

        // If error schema object having the type as validationFunction and validations field
        if (
          typeof errorSchemaObject == CONSTANTS.TYPE_OBJECT &&
          errorSchemaObject.type == CONSTANTS.VALIDATION_FUNCTION &&
          errorSchemaObject.hasOwnProperty('validations') &&
          Array.isArray(errorSchemaObject.validations)
        ) {
          // Looping through the validations array, obtaining and updating the field type with error content data.
          errorSchemaObject.validations.forEach((validationObject) => {
            const errorContentObject = fetchAndParseDataFromJson(
              errorContentFilePath,
              validationObject.type
            );
            if (errorContentObject == CONSTANTS.NO_DATA) {
              logger.info(
                `Expected error content object not found in ${errorContentFilePath} for ${validationObject.type}`
              );
            }
            return (validationObject.type = errorContentObject);
          });
          return errorSchemaObject;
        } else {
          logger.info(`Unable to find data for Error validation for ${dataIdentifier}`);
          return dataIdentifier;
        }
      } else {
        const validationObject = validationObjects[dataIdentifier];

        if (validationObject && validationObject.data) {
          validationObject.data.forEach((object, index) => {
            if (object.validations && object.validations.length > 0) {
              // Iterating through the validations array, retrieving and updating the value of the type field based on mode.
              object.validations.forEach((data) => {
                // When the data.type is not string, returning the data as is
                if (typeof data.type !== CONSTANTS.STRING) {
                  return data.type;
                }

                // Resolve any cypress env variables
                if (typeof data.type === 'string' && data.type.includes('CYPRESSENV')) {
                  // Split into an array and remove CYPRESSENV
                  const envSegments = data.type.split('-').slice(1);
                  // Handle the case where the env variable is an object
                  if (envSegments.length > 1) {
                    const objectName = envSegments[0];
                    const propertyName = envSegments[1];

                    // Get object from envVariables
                    const envValue = _.get(envVariables, [objectName, propertyName]);

                    // Check if object exists and contains the specified property
                    if (envValue !== undefined) {
                      return (data.type = envValue);
                    } else {
                      logger.info(`Cypress env variable '${envKey}' does not exist`);
                      return data.type;
                    }
                  } else {
                    const envKey = envSegments[0];
                    const envValue = _.get(envVariables, envKey);
                    if (envValue !== undefined) {
                      return (data.type = envValue);
                    } else {
                      logger.info(`Cypress env variable '${envKey}' does not exist`);
                      return data.type;
                    }
                  }
                }
                switch (data.mode) {
                  case CONSTANTS.REGEX.toLowerCase():
                    const regexType = data.type.includes('_REGEXP')
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

                  case CONSTANTS.DEVICE_CONTENT_VALIDATION:
                    // Extracting the device mac from the environment JSON.
                    let deviceMac = envVariables[CONSTANTS.DEVICE_MAC];
                    deviceMac = deviceMac.replaceAll(':', '');

                    const deviceDataPath = deviceMac
                      ? CONSTANTS.EXTERNAL_DEVICES_PATH + deviceMac + '.json'
                      : CONSTANTS.DEFAULT_DEVICE_DATA_PATH;

                    if (!deviceMac) {
                      logger.info('Falling back to default device data path');
                    }
                    let deviceData = fetchAndParseDataFromJson(deviceDataPath, data.type);
                    if (deviceData === CONSTANTS.NO_DATA) {
                      logger.info(
                        `Expected deviceData not found for ${data.type}. Returning ${data.type} as is.`
                      );
                      deviceData = data.type;
                    }
                    return (data.type = deviceData);

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
 * @function testDataParser
 *  testDataParser will fetch data from json files based on priority as shown below
 *    - External <module>.json from configModule (If applicable)
 *    - Internal <module>.json from fixtures (If applicable)
 *    - default.json
 *
 *  @param {*} requestType - Type of request. param or content
 *  @param {*} dataIdentifier - Key to be used to fetch param or content data from the fixtures
 *
 *  @example
 *    @request testDataParser('TRUE', 'params');
 *    @returns true
 *
 *    @request testDataParser('ACCESSIBILITY_FONTFAMILY_MONOSPACE', 'params');
 *    @returns {"value": "monospaced_sanserif"}
 */
function testDataParser(dataIdentifier, requestType) {
  let defaultRetVal = dataIdentifier;
  if (requestType == CONSTANTS.PARAMS.toLowerCase()) {
    defaultRetVal = { value: dataIdentifier };
  }

  // Mering the fcs and config module default test data.
  const defaultData = mergeJsonFilesData([
    `${CONSTANTS.FCS_DEFAULTTESTDATA_PATH}`,
    `${CONSTANTS.CONFIG_DEFAULTTESTDATA_PATH}`,
  ]);

  // Extracting the data from the merged default test data json, if not found returning as 'no data'.
  let paramData = parseDataFromJson(defaultData, dataIdentifier, requestType);

  // Checking passed dataIdentifier as underscore, if present spliting it and taking first part as a module name and second part keeping it as key to find the data.
  if (dataIdentifier.includes('_')) {
    moduleName = extractModuleName(dataIdentifier);
    dataIdentifier = dataIdentifier.slice(dataIdentifier.indexOf('_') + 1);
    // Creating a file paths using the module name for both fcs and config module.
    const moduleImportPath = `${CONSTANTS.MODULES_PATH}${moduleName}.json`;
    const externalModulePath = `${CONSTANTS.EXTERNAL_PATH}${moduleName}.json`;

    const parsedModuleData = fetchAndParseDataFromJson(
      moduleImportPath,
      dataIdentifier,
      requestType
    );

    // If data found in fcs module, taking the data as is else assigning the data from the default test data.
    paramData = parsedModuleData != CONSTANTS.NO_DATA ? parsedModuleData : paramData;

    // Checking the external module json file is present.
    if (fs.existsSync(externalModulePath)) {
      const parsedExternalModuleData = fetchAndParseDataFromJson(
        externalModulePath,
        dataIdentifier,
        requestType
      );
      // If data not found in config module, taking the previously fetched data.
      paramData =
        parsedExternalModuleData != CONSTANTS.NO_DATA ? parsedExternalModuleData : paramData;
      response = paramDataLogs(paramData, dataIdentifier, defaultRetVal, requestType);
      return response;
    } else {
      response = paramDataLogs(paramData, dataIdentifier, defaultRetVal, requestType);
      return response;
    }
  } else {
    response = paramDataLogs(paramData, dataIdentifier, defaultRetVal, requestType);
    return response;
  }
}

/**
 *  @function fetchAndParseDataFromJson
 *  fetchAndParseDataFromJson will read the data and parse the data based on the passed key.
 *
 *  @param {string} filePath - file path
 *  @param {*} dataIdentifier - Key to be used to fetch data from the file.
 *  @param {*} requestType - request type contains params, context or content.
 *
 *  @example
 *  fetchAndParseDataFromJson('./example.json', 'abc' , 'params')
 */
function fetchAndParseDataFromJson(filePath, dataIdentifier, requestType) {
  const data = fetchDataFromFile(filePath);
  return parseDataFromJson(data, dataIdentifier, requestType);
}

/**
 *  @function combineValidationObjectsJson
 *  combineValidationObjectsJson will combine all validation objects JSON files from the FCS and config module.
 *
 *  @example
 *  combineValidationObjectsJson()
 */
function combineValidationObjectsJson() {
  const fcsValidationObjectsJson = fetchMergedJsonFromDirectory(CONSTANTS.VALIDATION_OBJECTS_PATH);
  const configModuleValidationObjectsJson = fetchMergedJsonFromDirectory(
    CONSTANTS.CONFIG_VALIDATION_OBJECTS_PATH
  );
  let combinedValidationObjects = fcsValidationObjectsJson;
  if (configModuleValidationObjectsJson) {
    for (const key in configModuleValidationObjectsJson) {
      if (fcsValidationObjectsJson.hasOwnProperty(key)) {
        configModuleValidationObjectsJson[key].data.map((configObjectValue) => {
          if (!configObjectValue.hasOwnProperty(CONSTANTS.OVERRIDE)) {
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

// Function to print logs when data is having "no data" else returning as is.
function paramDataLogs(paramData, dataIdentifier, defaultRetVal, requestType) {
  if (paramData == CONSTANTS.NO_DATA) {
    logger.info(
      `Expected ${requestType || 'data'} ${dataIdentifier} was not found in fixtures. Returning ${dataIdentifier} as is.`
    );
    return defaultRetVal;
  } else {
    return paramData;
  }
}

/**
 *  @function extractModuleName
 *  extractModuleName will extract the module name from the passed key.
 *
 *  @param {string} dataIdentifier - Key to be used to extranct the module name.
 *
 *  @example
 *  cy.extractModuleName("ACCESSIBILITY_CLOSEDCAPTIONS_TRUE")
 *
 *  @result
 *  accessibility
 */
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

/**
 *  @function parseDataFromJson
 *  parseDataFromJson will fetch the data from the passed JSON data based on key.
 *
 *  @param {object} data - JSON data needed to parse based on key.
 *  @param {string} dataIdentifier - Key to be used to find value from JSON.
 *  @param {string} requestType - request type contains params, context or content.
 *
 *  @example
 *  parseDataFromJson({"ACCESSIBILITY_CLOSEDCAPTIONS_TRUE":"true"},"ACCESSIBILITY_CLOSEDCAPTIONS_TRUE", "Params")
 *
 *  @result
 *  true
 */
function parseDataFromJson(data, dataIdentifier, requestType) {
  try {
    if (data && data[dataIdentifier] !== undefined) {
      if (
        typeof data[dataIdentifier] == CONSTANTS.STRING ||
        typeof data[dataIdentifier] == CONSTANTS.BOOLEAN ||
        typeof data[dataIdentifier] == CONSTANTS.NUMBER ||
        data[dataIdentifier] === null
      ) {
        if (requestType == CONSTANTS.PARAMS.toLowerCase()) {
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

/**
 *  @function fetchDataFromFile
 *  fetchDataFromFile will read the data from the file.
 *
 *  @param {string} filePath - file path.
 *
 *  @example
 *  fetchDataFromFile('./filepath.json')
 */
function fetchDataFromFile(filePath) {
  if (fs.existsSync(filePath)) {
    data = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(data);
    return data;
  } else {
    return null;
  }
}

/**
 *  @function mergeJsonFilesData
 *  mergeJsonFilesData will read and merge the data from the passed array of file paths.
 *
 *  @param {array} filePath - array of files path.
 *
 *  @example
 *  mergeJsonFilesData(['./filepath.json'])
 */
function mergeJsonFilesData(paths) {
  const files = [];
  paths.forEach((file) => {
    if (fs.existsSync(file)) {
      files.push(file);
    }
  });
  return jsonMerger.mergeFiles(files);
}

/**
 *  @function fetchMergedJsonFromDirectory
 *  fetchMergedJsonFromDirectory will merge all JSON files from the given directory.
 *
 *  @param {string} directoryPath - direcotory path
 *
 *  @example
 *  fetchMergedJsonFromDirectory('./cypress/fixtures/fireboltCalls')
 */
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
