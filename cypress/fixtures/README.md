# fixtures

Fixtures are designed to load a fixed set of data located in a file.

## Required data need to be updated before running the feature files
### Advertising: 
 - APPBUNDLEID - It contains the corresponding app ID and should be updated in `configModule/testData/modules/advertising.json` for content validation.

## Override concepts:
-  If a key is present in FCS but not in the ConfigModule, the FCS key will be used without any overrides.
-  If a key is present in the ConfigModule but not in FCS, The key from the ConfigModule is copied over and used.
-  If a key is present in both FCS and the ConfigModule, the ConfigModule's key will override or merge with precedence given to the ConfigModule.

## Directory strucute:
Within the `cypress/fixtures` folder we have the following sub-folders:
- appIdBundlesObject: Contains appId objects with their corresponding permitted and excluded capabilities.
- customValidations: Contains the functions used for custom validations.
- devices: Contains device specific json files in the format of <deviceMacAddress.json>, which contains device-specific data like device ID, device type and so on.
- defaultManifest.json: Contains the supported capabilities list.
- fireboltCalls: Contains FireboltCall keys which is used to make firebolt calls to the 1st party app or 3rd party app.
- fireboltMocks: Contains FireboltMock keys which is used to override the default response or set the responses.
- moduleReqId: Contains scenario name, requirement ID, beforeOperation for specific testcases where before operation has to be executed.
- modules: Contains json files in the format of <moduleName.json> where required content/parameters specific to the ConfigModule are present.
- objects: ValidationObjects contains json files in the format of <moduleName.json> where required validation objects specific to this ConfigModule are present. ErrorObjects validate on negative scenarios params.
- apiObjectContext.json: Contains the context value.
- censorData.json: Contains methods and fields that need to be censored..
- decodeValue.json: Contains methods and fields that need to be decoded.
- defaultTestData.json: Contains data of all common params.
- PreRequisiteData.json: Sets default values specified in json to platform API's.
- regexformats.json: Contains regEx constants.