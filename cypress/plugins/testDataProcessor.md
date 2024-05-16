# Test Data Processor Documentation
 
## Overview
This Markdown document provides documentation for the Test Data Processor. The Test Data Processor is designed to merge multiple test data JSON files located within a specified directory and resolve the value for a specified key in each object.
 
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
Iterating over the provided JSON and each object, resolve the values of params, context, or content if present, then returning the JSON with the updated value.

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
      - `module.json` files reside in `fixtures/modules/` or `nodemodules/configModule/testData/modules/`

    - Device Content Validation
      - Content will be fetched from `devicMac.json` file when devicMac is present. 
      - `deviceMac.json` present in `nodemodules/configModule/testData/devices/`.
      - deviceMac is not present content will be taken from `defaultDeviceData` json file.

Note:
 - When data is not present in the fixtures, returning the passed the key as is.
 - `Mock Firebolt` is the default device and mac addressed is not required.
   
   

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


+++++++++++++++++++++++++

### > testDataParser
Fetching the data from json files based on the priority as shown below
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

### > fetchAndParseDataFromJSON
Function used to fetch the data from the file and parse the data based on passed key.
   
##### Params:
| Param | Definition|
| --- | --- |
| filePath | Type of request. param or content |
| dataIdentifier | Key to be used to fetch data from the file. |
| requestType | request type contains params, context or content. |

Ex:

```
fetchAndParseDataFromJSON('./example.json', 'abc' , 'params')
```
### > combineValidationObjectsJson
Function to combine all validation JSON files from FCS and config module.

Ex:

```
combineValidationObjectsJson()
```

### > extractModuleName

Parsing the module name from the dataIdentifier passed.

##### Params:
| Param | Definition|
| --- | --- |
| dataIdentifier | Key to be used to extranct the module name. |

Ex:

```
request: extractModuleName("ACCESSIBILITY_CLOSEDCAPTIONS_TRUE")
```
```
response: accessibility
```

### > parseDataFromJson

Function to fetch the data from the passed JSON.

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

Function to fetch the data from the passed JSON.

##### Params:
| Param | Definition|
| --- | --- |
| filePath | filePath |

Ex:

```
fetchDataFromFile('./filepath.json')
```

### > mergeJsonFilesData

Function to fetch the data from the passed JSON.

##### Params:
| Param | Definition|
| --- | --- |
| paths | array of files path. |

Ex:

```
mergeJsonFilesData(['./filepath.json'])
```

### > fetchMergedJsonFromDirectory

Function to merge JSON files ferom the given directory.

##### Params:
| Param | Definition|
| --- | --- |
| directoryPath | direcotory path |

Ex:

```
fetchMergedJsonFromDirectory('./cypress/fixtures/fireboltCalls')
```
