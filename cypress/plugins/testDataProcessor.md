# Test Data Processor Documentation
 
## Overview
Test Data Processor contains all logic for processing the JSON test data before test execution starts. It is designed to merge multiple test data JSON files located within a specified directory and resolve all variables which is then pushed to Cypress Env variables used by the test cases.
 
 ## Functions
 
### > testDataProcessor
The Test Data Processor performs the following operations:
- Merges all JSON files located within a specified directory.
- Resolves the value for a specified key in each JSON object.

Ex:

```
testDataProcessor()
```

### > processFireboltJson
processFireboltJson function will perform following operations
- Iterate over each key in the provided JSON
- Resolve the values of params, context, or content if present
- Return the JSON with the updated value.

##### Params:
| Param | Definition|
| --- | --- |
| jsonData | json data for processing |

Ex:

```
Request
- processFireboltJson({'abc': {'method': 'method_name', 'params': 'TRUE'}})

- processFireboltJson({'abc': {'method': 'method_name', 'params': 'TRUE', 'context': 'no_context'}})

- processFireboltJson({'abc': {'method': 'method_name', 'validationJsonPath': 'result', 'content': 'TRUE'}})

Response
- {'abc': {'method': 'method_name', 'params': true}}

- {'abc': {'method': 'method_name', 'params': true, 'context': {}}}

- {'abc': {'method': 'method_name', 'validationJsonPath': 'result', 'content': true}}
```
getErrorContentObjectJson
### > 
getErrorContentObjectJson function will perform following operations
- Iterate over each key in the provided JSON
- Resolve the each type in the array of validations object.
- Return the JSON with the updated value.

Ex:

```
Request
- getErrorContentObjectJson()
```

### > testDataHandler
This command is used mainly for parsing and fetching test data from various fixture files depending on the requestType passed to the command. RequestType can have different values based on what type of data need to be parsed and fetched from test data file. DataIdentifier specifies the key of the test data which is used to identify and fetch the test data from different test data files.

Currently supported requestType is params, context and content.

- Params - Represent the parameters to be sent for a firebolt call.

  For the Params request type, the dataIdentifier can have two types.
   * Key - Returns the value associated with the key `param_key` from the test data.
   * Environment Variable Key - Returns the key as is, when it's having `CYPRESSENV`.

- Context - Represent the data that needs to be stored in api/event object that helps to search specific object in a global list.

- Content - Represent the expected value used for validating against a firebolt api response.

  Currently two types of validation are there
   * Error validation
   * Result validation
    - Static Content Validation - Required content will be fetched from combined(fcs and config module) `default json` or from the corresponding `module json` files based on the precedence.
      - `module.json` files reside in `fixtures/modules/` or `fixtures/external/modules/`

    - Device Content Validation
      - Content will be fetched from `devicMac.json` file when devicMac is present. 
      - `deviceMac.json` present in `fixtures/external/devices/`.
      - deviceMac is not present content will be taken from `defaultDeviceData` json file.

Note:
 - When data is not present in the fixtures, returning the passed the key as is.

Ex:

```
request: testDataHandler("params","Account_Id")
```
```
response: {value: 123456}
```
```
request: testDataHandler("content","Device_ID")
```
```
response: 1234
```
```
request: testDataHandler("params","CYPRESSENV-capabilitiesList")
```
```
response: "CYPRESSENV-capabilitiesList"
```


### > testDataParser
testDataParser will fetch data from json files based on priority as shown below
  - External <module>.json from configModule (If applicable)
  - Internal <module>.json from fixtures (If applicable)
  - default.json
   
##### Params:
| Param | Definition|
| --- | --- |
| requestType | Type of request. param or content |
| dataIdentifier | Key to be used to fetch param or content data from the fixtures |

Ex:

```
request: testDataParser('TRUE', 'params');
```
```
response: true
```
```
request: testDataParser('ACCESSIBILITY_FONTFAMILY_MONOSPACE', 'params');
```
```
response: {"value": "monospaced_sanserif"}
```

### > fetchAndParseDataFromJson
fetchAndParseDataFromJson will read the data and parse the data based on the passed key.
   
##### Params:
| Param | Definition|
| --- | --- |
| filePath | Type of request. param or content |
| dataIdentifier | Key to be used to fetch data from the file. |
| requestType | request type contains params, context or content. |

Ex:

```
fetchAndParseDataFromJson('./example.json', 'abc' , 'params')
```
### > combineValidationObjectsJson
combineValidationObjectsJson will combine all validation objects JSON files from the FCS and config module.

Ex:

```
combineValidationObjectsJson()
```

### > extractModuleName

extractModuleName will extract the module name from the passed key.

##### Params:
| Param | Definition|
| --- | --- |
| dataIdentifier | Key to be used to extract the module name. |

Ex:

```
request: extractModuleName("ACCESSIBILITY_CLOSEDCAPTIONS_TRUE")
```
```
response: accessibility
```

### > parseDataFromJson

parseDataFromJson will fetch the data from the passed JSON data based on key.

##### Params:
| Param | Definition|
| --- | --- |
| data | JSON data needed to parse based on key. |
| dataIdentifier | Key to be used to find value from JSON. |
| requestType | request type contains params, context or content. |

Ex:

```
request: parseDataFromJson({"ACCESSIBILITY_CLOSEDCAPTIONS_TRUE":"true"},"ACCESSIBILITY_CLOSEDCAPTIONS_TRUE", "Params")
```
```
response: true
```

### > fetchDataFromFile

fetchDataFromFile will read the data from the file.

##### Params:
| Param | Definition|
| --- | --- |
| filePath | filePath |

Ex:

```
fetchDataFromFile('./filepath.json')
```

### > mergeJsonFilesData

mergeJsonFilesData will read and merge the data from the passed array of file paths.

##### Params:
| Param | Definition|
| --- | --- |
| paths | array of files path. |

Ex:

```
mergeJsonFilesData(['./filepath.json'])
```

### > fetchMergedJsonFromDirectory

fetchMergedJsonFromDirectory will merge all JSON files from the given directory.

##### Params:
| Param | Definition|
| --- | --- |
| directoryPath | direcotory path |

Ex:

```
fetchMergedJsonFromDirectory('./cypress/fixtures/fireboltCalls')
```
