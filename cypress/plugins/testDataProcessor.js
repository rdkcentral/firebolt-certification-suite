const fs = require('fs');
const jsonMerger = require('json-merger');
const { result } = require('lodash');
const CONSTANTS = require('../support/constants/constants');

function testDataProcessor() {
    console.log('Inside testDataProcessor function')
    const fcsFireboltCalls = './cypress/fixtures/fireboltCalls/';
    const configModuleFireboltCalls = './node_modules/configModule/testData/fireboltCalls/';
    // add fcsFireboltCalls in below line 
    let fcsMergedJson = fetchMergedJsonFromDirectory(configModuleFireboltCalls)
    let configModuleMergedJson = fetchMergedJsonFromDirectory(configModuleFireboltCalls)
    let combinedJson = Object.assign(fcsMergedJson, configModuleMergedJson);
    let resolvedJson = processfireboltJson(combinedJson)

    // testing purpose
    fs.writeFile('resolvedJson.json', JSON.stringify(resolvedJson))
}

function processfireboltJson(jsonData) {
  // const updatedJson = {};
  for(const key in jsonData){
     
    if(Object.hasOwnProperty.call(jsonData, key)){
      const object = jsonData[key];
    for(const prop in object){
          if (['params', 'context', 'expected'].includes(prop)) {
              const value =  testDataHandler(prop, object[prop], object); 
              jsonData[key][prop] = value;
          }
      }
    }
  }
  return jsonData
}

function testDataHandler(requestType, dataIdentifier, fireboltObject){

  switch (requestType) {
    case 'params':
      // TODO: Need to discuss where we can handle this env, In before operation updating this env's.
      // Fetching the value of environment variable based on dataIdentifier
      // if (/CYPRESSENV/.test(dataIdentifier)) {
      //   const envParam = dataIdentifier.split('-')[1];
      //   return UTILS.getEnvVariable(envParam);
      // }
      let defaultRetVal = { value: dataIdentifier };
      return testDataParser(dataIdentifier, requestType);
      
    case 'context': 
      const contextImportFile = CONSTANTS.CONTEXT_FILE_PATH;
      const contextValue = fetchAndParseDataFromJSON(contextImportFile, dataIdentifier)
      if (contextValue === CONSTANTS.NO_DATA) {
        // TODO: Make sure this loh show's in report
        console.log(
          `Expected context not found for ${dataIdentifier}. Returning ${dataIdentifier} as is.`
        );
        return dataIdentifier;
      } else {
        return contextValue;
      }
     
    case 'expected':
      if (fireboltObject.hasOwnProperty('expectingError')) {
        const errorSchemaFilePath = CONSTANTS.ERROR_SCHEMA_OBJECTS_PATH;
        const errorContentFilePath = CONSTANTS.ERROR_CONTENT_OBJECTS_PATH;
        const errorSchemaObject = fetchAndParseDataFromJSON(errorSchemaFilePath, dataIdentifier)

        if (
          typeof errorSchemaObject == CONSTANTS.TYPE_OBJECT &&
          errorSchemaObject.type == CONSTANTS.VALIDATION_FUNCTION
        ) {
          errorSchemaObject.validations.forEach((validationObject) => { 
            
            let errorContentObject = fetchAndParseDataFromJSON(errorContentFilePath, validationObject.type)
            // if (errorContentObject == CONSTANTS.NO_DATA) {
            //   assert(false, `Expected error content not found in ${errorContentFilePath}`);
            // }
            console.log('errorContentObject', errorContentObject)
            return validationObject.type = errorContentObject;

          })
          console.log('errorSchemaObject', errorSchemaObject)
          return errorSchemaObject

        }
        else {
          // cy.log('Unable to find data for Error validation').then(() => {
          //   assert(false, 'Unable to find data for Error validation');
          // });
        }

      } else {
        let validationObjects = combineValidationObjectsJson();
        console.log('dataIdentifier', dataIdentifier)
        console.log('fCSValidationjson[dataIdentifier]', validationObjects[dataIdentifier])
        if(validationObjects[dataIdentifier] && validationObjects[dataIdentifier].data) {
          return validationObjects[dataIdentifier]; 
        }
        else {
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
  console.log('defaultData', typeof defaultData);

  let paramData = parseDataFromJson(defaultData, dataIdentifier, requestType);
  console.log('paramData', paramData);
  if (dataIdentifier.includes('_')) {
    moduleName = extractModuleName(dataIdentifier);
    dataIdentifier = dataIdentifier.slice(dataIdentifier.indexOf('_') + 1);
    const moduleImportPath = `${CONSTANTS.MODULES_PATH}${moduleName}.json`;
    const externalModulePath = `${CONSTANTS.EXTERNAL_PATH}${moduleName}.json`;

    const moduleData = fetchDataFromFile(moduleImportPath);

    const parsedModuleData = parseDataFromJson(moduleData, dataIdentifier, requestType);
    console.log('parsedModuleData', parsedModuleData);
    paramData = parsedModuleData != CONSTANTS.NO_DATA ? parsedModuleData : paramData;

    // Checking the external module json file is present.
    console.log('@@@', externalModulePath);
    console.log('@@@', fs.existsSync(externalModulePath));
    if (fs.existsSync(externalModulePath)) {
      const externalModuleData = fetchDataFromFile(externalModulePath);

      const parsedExternalModuleData = parseDataFromJson(
        externalModuleData,
        dataIdentifier,
        requestType
      );
      console.log('!!!!!!!!!!!!!!!!');
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
  return parseDataFromJson(data, dataIdentifier)
}

function combineValidationObjectsJson() {
  let fcsValidationObjectsJson = fetchMergedJsonFromDirectory(CONSTANTS.VALIDATION_OBJECTS_PATH);
  let configModuleValidationObjectsJson = fetchMergedJsonFromDirectory(
    CONSTANTS.CONFIG_VALIDATION_OBJECTS_PATH
  );
  let combinedValidationObjects = fcsValidationObjectsJson;
  console.log('configModuleValidationObjectsJson', typeof configModuleValidationObjectsJson);
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
    console.log(eval(CONSTANTS.EXPECTED_DATA_NOT_FOUND_IN_MODULE_JSONS)).then(() => {
      return defaultRetVal;
    });
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
        if (requestType == CONSTANTS.PARAMS) {
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


function fetchMergedJsonFromDirectory(directoryPath){
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