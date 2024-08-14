# fixtures

Fixtures are designed to load a fixed set of data located in a file.

## Override concepts:
-  If a key is present in FCS but not in the ConfigModule, the FCS key will be used without any overrides.
-  If a key is present in the ConfigModule but not in FCS, The key from the ConfigModule is copied over and used.
-  If a key is present in both FCS and the ConfigModule, the ConfigModule's key will override or merge with precedence given to the ConfigModule.

## Directory structure:
Within the `cypress/fixtures` folder, we have the following sub-folders:
- fireboltCalls: Contains fireboltCall objects which are used to make an API call and to validate the response .
- fireboltMocks: Contains FireboltMock keys which are used to override the default response or set the responses.
- modules: Contains JSON files in the format of <moduleName.json> where required content/parameters are present.
- objects: 
  **validationObjects**: Contains JSON files where required validation JSON objects are present. 
  **errorObjects**: Contains error objects for validating negative scenario parameters.
It contains two JSON files as : errorContent.json and errorSchemaObject.json. Error response is validated against the schema present in errorSchemaObject.json. errorContent.json contains error Messages and error Codes for different error types.
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

#### To make API Call

##### Format

```
"KEY_NAME":{
  "method": "",
	"params": "",
  "context": "",
  "expected": ""
}
```

| **Param** | **Definition**                                                                                                        | **Example**                          |
| --------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| method    | Name of the API to make an API call                                                                                    | accessibility.closedCaptionsSettings |
| params    | Represent the parameters to be sent for a firebolt call.                                                              | {}                                   |
| context   | Represent the data that needs to be stored in api/event object that helps to search specific object in a global list. | {}                                   |
| expected  | Determine whether expecting for an error or result                                                                    | `result` or `error`                  |

##### Examples:

**Example 1:**

```
"FETCH_ACCOUNT_ID":{
  "method": "account.id"
}
```

**Example 2:**
`ADVERTISING_INTEGER_PARAM` is a key name and this value is present in `modules/advertising.json` file

- `ADVERTISING_INTEGER_PARAM` is split into two parts `ADVERTISING` and `INTEGER_PARAM`.
- `ADVERTISING` refers to file name and `INTEGER_PARAM` is a object key name present inside advertising file.

```
"GET_CONFIG_WITH_INTEGER_PARAMETER":{
  "method": "advertising.config",
  "params": "ADVERTISING_INTEGER_PARAM",
  "expected": "error"
}
```

#### For content validation

##### Format

```
"KEY_NAME":{
  "method": "",
	"validationJsonPath": "",
  "context": "",
  "content": ""
}

 or

"KEY_NAME":{
  "event": "",
	"validationJsonPath": "",
  "context": "",
  "content": ""
}
```

| **Param**          | **Definition**                                                                                                        | **Example**                          |
| ------------------ | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| method or event    | Name of the API or Event, which is used to extract the response object from global list for content validation.       | accessibility.closedCaptionsSettings |
| validationJsonPath | Path of the response value that needs to be validated                                                                 | result.enabled                       |
| context            | Represent the data that needs to be stored in api/event object that helps to search specific object in a global list. | {}                                   |
| content            | Represent the expected value used for validating against a firebolt api respo                                         | true                                 |
| expectingError     | Determines whether we are performing result or error content validation.                                              | true                                 |

##### Examples:

**Example 1:**

- FCS has default data file, which contains the data that can be used across feature files. Ex: `TRUE` value is present in [defaultData.json](./defaultTestData.json)

```
"ENABLE_AUDIODESCRIPTION_WITH_INTEGER_PARAMETER":{
  "method": "accessibility.closedCaptionsSettings",
  "context": "noContext",
  "validationJsonPath": "result.enabled",
  "content": "TRUE"
}
```

**Example 2:**

- FCS has default data file, which contains the data that can be used across feature files. Ex: `FALSE` value is present in [defaultData.json](./defaultTestData.json)

```
"ONCLOSEDCAPTIONSSETTINGSCHANGED_WITH_DISABLED": {
  "event": "accessibility.onClosedCaptionsSettingsChanged",
  "context": "noContext",
  "validationJsonPath": "eventResponse.enabled",
  "content": "FALSE"
}
```

**Example 3:**

- `ACCOUNT_ID` content object is present inside the `fixtures/objects/validationObjects/account.json` file.
- `ACCOUNT_ID` is split into two parts: `ACCOUNT` and `ID`.
- `ACCOUNT` refers to a file name, and `ID` is an object key name present inside the `account.json` file.

```
"ACCOUNT_ID": {
  "method": "account.id",
  "validationJsonPath": "result",
  "content": "ACCOUNT_ID"
}

```

**Note:** 
The fields listed below are optional; if any of them are missing, default values listed below will be added during runtime. 
```
- context - {} 
- params - {} 
- validationJsonPath - "result" 
- content - null 
```
If the firebolt validation object has a'method' field, it validates the method; otherwise, it validates the event.

