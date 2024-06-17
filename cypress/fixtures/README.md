# fixtures

Fixtures are designed to load a fixed set of data located in a file.

## Override concepts:
-  If a key is present in FCS but not in the ConfigModule, the FCS key will be used without any overrides.
-  If a key is present in the ConfigModule but not in FCS, The key from the ConfigModule is copied over and used.
-  If a key is present in both FCS and the ConfigModule, the ConfigModule's key will override or merge with precedence given to the ConfigModule.

## Directory strucute:
Within the `cypress/fixtures` folder we have the following sub-folders:
- fireboltCalls: Contains FireboltCall keys which is used to make firebolt calls to the 1st party app or 3rd party app.
- fireboltMocks: Contains FireboltMock keys which is used to override the default response or set the responses.
- modules: Contains json files in the format of <moduleName.json> where required content/parameters are present.
- objects: 
  **validationObjects**: Contains json files where required validation json objects are present. 
  **errorObjects**: Contains error objects for validating negative scenario parameters.
It contains two json files as : errorContent.json and errorSchemaObject.json. Error response is validated against the schema present in errorSchemaObject.json. errorContent.json contains error Messages and error Codes for different error types.
  **moduleReqId**: Contains scenario name and requirement ID for test cases.
- apiObjectContext.json: Contains the context value.
- censorData.json: Contains methods and fields that need to be censored..
- decodeValue.json: Contains methods and fields that need to be decoded.
- defaultTestData.json: Contains data of all common params.
- PreRequisiteData.json: Contains defaultValues array which includes keys to set API values to the specific default value mentioned in the key. PreRequisiteData.json is used for running SetDefaultValues feature.
- regexformats.json: Contains constants used for regex validation.
- schemas: 
  **errorSchema.json**: Contains error schemas for SDK and Transport mode which include fields for error codes, messages and additional data.
  **lifecycleHistorySchema.json**: Contains lifecycle schema for appID and lifecycle history.
- versions: Contains different versions of firebolt.json includes versioning, capabilities and openrpc.

### fireboltCalls
fireboltCalls object has two types as shown below.

1. For making API Calls
   - method - Name of the API to make a API call
   - params - Represent the parameters to be sent for a firebolt call.
   - context - Represent the data that needs to be stored in api/event object that helps to search specific object in a global list.
   - expected - Determines whether we expect a "result" or an "error."

   Ex:
   ``` 
   "KEY_NAME":{
      "method": "manage_audiodescriptions.setEnabled",
		  "params": "INTEGER123",
      "context": "noContext",
      "expected": "error"
    }
   ```

2. For content validation
   - method or event - Name of the API or Event, which is used to extract the response object from global list for content validation.
   - validationJsonPath - Represent the JSON path used to obtain a specific value.
   - context - Represent the data that needs to be stored in api/event object that helps to search specific object in a global list.
   - content - Represent the expected value used for validating against a firebolt api response.
   - expectingError - Determines whether we are performing result or error content validation.
   Ex:
   ``` 
   "ENABLE_AUDIODESCRIPTION_WITH_INTEGER_PARAMETER":{
      "method": "accessibility.closedCaptionsSettings",
      "context": "noContext",
      "validationJsonPath": "result.enabled",
      "content": "TRUE"
    }

    "ONCLOSEDCAPTIONSSETTINGSCHANGED_WITH_DISABLED": {
      "event": "accessibility.onClosedCaptionsSettingsChanged",
      "context": "noContext",
      "validationJsonPath": "eventResponse.enabled",
      "content": "FALSE"
    }

    "ONCLOSEDCAPTIONSSETTINGSCHANGED": {
      "event": "accessibility.onClosedCaptionsSettingsChanged",
      "validationJsonPath": "eventResponse",
      "content": "NULL",
      "expectingError": false
    }
   ```

  Note: 
    - The fields listed below are optional; if any of them are missing, default values listed below will be added during runtime.
      - context  - {}
      - params - {}
      - validationJsonPath - "result"
      - content - null
    - If the firebolt validation object has a'method' field, it validates the method; otherwise, it validates the event.