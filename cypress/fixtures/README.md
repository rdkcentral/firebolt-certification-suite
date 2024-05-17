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