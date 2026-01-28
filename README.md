# firebolt-certification-suite

## Dependencies

Firebolt certification suite has the following dependencies.

### Required

**cypress-support (merged into FCS)**: The Cypress support module comprises a collection of Cypress commands and functions that were specifically created for the following purposes:

- Facilitating communication with the Firebolt implementation on a device.
- Facilitating communication with the Firebolt certification app during testing.
- Conducting validation on the responses received from the Firebolt platform being tested.
- Retrieving the configurations necessary for the aforementioned communication and validation processes.

**modularTransportClient**: The objective of this module is to consolidate multiple message transport systems under a unified interface, with minimal code modifications necessary when transitioning between different transport methods.

### Optional

**Configuration module**: This module serves to supply configuration overrides for certification tests when they are run on a specific platform under test. For instance, to enable CI/CD executions for some platforms, it is necessary to convert Firebolt commands to be sent via pubsub communication, rather than establishing a direct WebSocket connection to the platform. In the absence of a configuration module, the default communication and configuration will be utilized (i.e., connecting directly to platform on a device via WebSocket).

**Validation module**: This module is designed to offer validation overrides or extensions for certification tests when they are executed on a firebolt platform under test. For example, additional distributor-level assertions on the Firebolt response obtained from the platform may be included.

## Setup

To execute the certification suite against any platform, the following setup must be completed:

- Configure optional dependencies
  - [ ] Configuration module relevant to the platform under test. Refer to the  [Config Module Setup](#config-module-setup) section for more information.

  - [ ] Validation module relevant to the platform under test
- Install the dependencies

  `yarn install`

  Note: 
  - If any dependency overrides exist in the remote config module, they will be applied during the post-install phase.
  - The original versions of overridden dependencies will be stored in `originalPkgVersion.json` to avoid package.json and yarn.lock getting out of sync.
  - To restore the `package.json` to its original state, run `yarn restoreDependencyOverrides`. This will restore the original `package.json` and delete `originalPkgVersion.json`.
  
- Pull the configurations (if applicable)

  `yarn run setup`

- Provide the device configuration details.
  Update the cypress.config.js with the following details

| Field                               | Type    | Sample Value                      | Description                                                                                                                           |
|-------------------------------------|---------|-----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| action                              | string  | core                              | Action to be executed during the test run. Derived from the feature file if not explicitly set.                             |
| additionalContext                   | object  | {}                                | Provides extra context parameters for overriding default execution settings in a test run.                                  |
| apiObjectList                       | array   | []                                | Stores a global list of API objects created during test execution. Each captured API call (e.g., screenshot requests) is appended here for later validation, reporting, or debugging. |
| apiVersion                          | string  | ['1.0.0']                         | Sets the api version                                                                                                        |
| app_metadata                        | object  | {}                                | Provides application-specific metadata, including app type, intents, and configuration details. Used during app launch to resolve intents and set runtime environment variables. |
| appLifeCycleHistory                 | array   | []                                | Stores the previously recorded lifecycle history of the app (array of state transition objects) for comparison against the latest history and events. |
| appType                             | string  | 'firebolt', 'certification',      | Specifies the type of application (e.g., firebolt, certification). Determines the mode in which the app should be launched if not explicitly provided. |
| certification                       | boolean | true                              | Flag to indicate whether certification mode is enabled. Determines whether the SDK version should be taken from `device.version.api` (certification) or `device.version.sdk` (non-certification). |
| closeAppTestTypes                   | array   | ["Profile","Keyboard","Parameters"] | List of test types that require lifecycle close validation.                                                                 |
| combinedFireboltCalls               | array   | []                                | Contains a merged set of Firebolt call definitions and related data structures. Used to resolve prefixed values dynamically by mapping them to the appropriate Firebolt call object and extracting values. |
| combinedFireboltMocks               | array   | []                                | Contains merged mock definitions of Firebolt calls. Used to return predefined mock responses.                               |
| communicationMode                   | string  | 'SDK' or 'Transport'              | Determines the communication channel.                                                                                       |
| customValidationTimeout             | number  | 60000                             | Defines the maximum wait time (in ms) for custom validation to complete when `waitForCompletion` is true. If not set, the SDK uses a default timeout. |
| decodeValue                         | string  | Base64 or JWT                     | Provides field mappings for decoding API responses. Used to determine which fields in a response should undergo decoding and validation checks. |
| default3rdPartyAppId                | string  | comcast.test.firecert             | Default third-party application ID.                                                                                         |
| {$default3rdPartyAppId}URL          | string  | firebolt_certification_appURL     | The 3rd party app url to be used whenever the default 3rd Party App Id is used to launch in the certification suite test cases |
| deleteReport                        | boolean | true                              | If the value is true, all the report files will be deleted in the provided report direcotory                                |
| dereferenceOpenRPC                  | array   | []                                | Holds the list of dereferenced OpenRPC documents used to fetch method or event schemas for validation.                      |
| deviceCommPort                      | number  | 3474                              | Defaulted to 3474 in the config file                                                                                        |
| deviceIp                            | string  | 10.0.0.2                          | Required when running via local WS connection. LAN IP address of the target device.                                         |
| deviceMac                           | string  | F0:AA:BB:EF:D1:C1                 | Represents the MAC address of the device under test. Used for identifying and validating the device during test execution.  |
| deviceVersionCallEnable             | boolean | true                              | Flag that determines whether the `device.version` API should be invoked to fetch SDK version details.                       |
| dynamicDeviceDetailsModules         | array   | ['Device']                        | List of test types for which device details should be fetched dynamically. `default: ["Device"]`                            |
| enableScreenshots                   | boolean | true                              | Flag to enable or disable screenshot capturing during test execution. `default: false`                                      |
| envParam                            | string  | 'CYPRESSENV-test'                 | Dynamic environment variable key extracted from parameters (with `CYPRESSENV` prefix).                                      |
| errorContentValidationJson          | object  | {}                                | Provides predefined error validation schemas mapped by error keys; falls back to raw error string if not found.             |
| event_param                         | object  | {}                                | To inject default event registration parameters when none are provided. `default: {"listen": true}`                         |
| eventObjectList                     | array   | []                                | Stores the captured event objects (e.g., accessibility.closedCaptionsSettings) along with app and context for validation.   |
| exceptionMethods                    | array   | []                                | Provides methods exempted from validation. `Ex: {"NOT_SUPPORTED_METHODS":[{"method":"Authentication.token","param":{"type":"distributor","options":{"clientId":"OAT"}}}],"NOT_AVAILABLE_METHODS":[],"NOT_PERMITTED_METHODS":[]}` |
| excludedMethods                     | array   | []                                | List of methods excluded from execution. `Ex: ["Accessory.pair","Device.provision","Power.sleep"]`                          |
| excludeValidations                  | object  | {}                                | Defines keys and values to skip during validation (JSON object with arrays of excluded values).                             |
| externalModuleTestTypes             | array   | ["Dismiss","Deeplink","lifecycle foreground"] | List of external module test types.                                                                                         |
| failOnPubSubConnectionError         | boolean | false                             | Determines whether the SDK should throw an error if pub/sub connection fails. `default: true`                               |
| fcaAppList                          | array   | ['default3rdPartyAppId']          | Holds the list of fca app identifiers                                                                                       |
| fetch_device_details_dynamically    | boolean | true                              | Whether to fetch device details dynamically. `default: true`                                                                |
| firebolt_specification_next_url     | string  | ''                                | URL endpoint pointing to the next version of the Firebolt specification JSON.                                               |
| firebolt_specification_proposed_url | string  | ''                                | URL endpoint pointing to the proposed version of the Firebolt specification JSON.                                           |
| firebolt_specification_url          | string  | ''                                | URL endpoint pointing to the Firebolt specification JSON.                                                                   |
| fireboltCallsJson                   | object  | {}                                | JSON file containing v1 Firebolt calls, merged with internal and external v2 calls to create a combined call set.           |
| fireboltConfig                      | object  | {}                                | Firebolt configuration JSON object containing platform-specific settings and capabilities.                                  |
| fireboltMocksJson                   | object  | {}                                | JSON file containing v1 Firebolt mocks, merged with internal and external v2 mocks to create a combined mock set.           |
| firstPartyAppId                     | string  | 'firstPartyAppId'                 | Used to identify the first-party app (platform). `default: "fireboltCertificationSystemUI"`                                 |
| giveDynamicAssetsPrecedence         | boolean | true                              | Flag to give precedence to dynamic assets. `default: false`                                                                 |
| healthCheckRetries                  | number  | 8                                 | Number of retry attempts for performing a third-party app health check.                                                     |
| httpTransportTimeout                | number  | 5000                              | The timeout length for http calls in ms                                                                                     |
| includeValidations                  | object  | {}                                | Defines an allow-list for validation (JSON object with arrays of values to validate; others will be skipped).               |
| intentTemplates                     | object  | {}                                | Defines predefined intent structures per appType and appId.                                                                 |
| isPerformanceMetricsEnabled         | boolean | true                              | Tracks whether performance metrics service is currently active.                                                             |
| isScenarioExempted                  | boolean | true                              | Flag to determine whether the current scenario is exempted from standard error null-check validation.                       |
| jobId                               | string  | '12345'                           | Identifier for the running job.                                                                                             |
| loggerLevel                         | 'debug', 'info', 'warn', 'error' | ['debug']| Holds the list of fca app identifiers                                                                                       |
| messageQueue                        | object  | {}                                | Global queue instance used for storing and retrieving responses.                                                            |
| mock                                | boolean | false                             | Whether to use mock firebolt for testing. Default value is false.                                                           |
| mockUser                            | string  | 456~A                             | The user id to be used while connecting to mock Firebolt                                                                    |
| NOT_AVAILABLE_METHODS               | array   | []                                | Methods temporarily not available.                                                                                          |
| NOT_PERMITTED_METHODS               | array   | []                                | Methods explicitly not permitted.                                                                                           |
| NOT_SUPPORTED_METHODS               | array   | [{"method":"Authentication.session"},{"method":"Authentication.token","param":{"type":"distributor"}}] | Methods not supported in current environment.                                                                               |
| notSupportedCapabilitiesList        | array   | []                                | List of capabilities explicitly marked as not supported.                                                                    |
| pendingFeatures                     | array   | []                                | List of features marked as pending. `default: []`                                                                           |
| performanceMetrics                  | boolean | true                              | Enables performance metrics collection and marker validation during test setup.                                             |
| pubsub_uuid                         | string  | ''                                | PubSub UUID.                                                                                                                |
| pubSubPublishSuffix                 | string  | '_FCS'                            | Suffix appended to topic names when publishing (e.g., _FCS).                                                                |
| pubSubSubscribeSuffix               | string  | '_FCA'                            | Suffix appended to topic names when subscribing (e.g., _FCA).                                                               |
| pubSubUrl                           | string  | 'ws://127.0.0.1:8081'             | Defines the Pub/Sub service endpoint URL.                                                                                   |
| regexEventValidation                | string  | '/(\\.on\\\.subscribeTo)\\S*/'    | Regex pattern for event detection.                                                                  |
| reportType                          | string  | 'mochawesome' or 'cucumber' or '' | If this value exists and is equal to one of the values, ONLY that report's event should be sent to report processor. In the case of empty value both reports should be sent to report processor |
| responseTopicList                   | array   | []                                | List of subscribed response topics.                                                                                         |
| runtime                             | object  | {}                                | Holds dynamic runtime environment data used for pattern replacement.                                                        |
| sanityReportPollingTimeout          | number  | 15000                             | Timeout value (in ms) for polling sanity test reports.                                                                      |
| scenarioRequirements                | object  | {}                                | Defines validation requirements for the scenario.                                                                           |
| sdkVersion                          | string  | '1.5.0'                           | Stores the current SDK version value if already available.                                                                  |
| secondary3rdPartyAppId              | string  | 'sampleAppId'                     | Secondary third-party application ID. `default: "comcast.test.firecert"`                                                    |
| setResponseJson                     | object  | {}                                | Holds mock response data for Firebolt methods/events.                                                                       |
| suiteCommunicationMode              | string  | 'SDK' or 'Transport'              | Defines the communication mode for running the test suite.                                                                  |
| supportedSDK                        | array   | ["Firebolt"]                      | List of supported SDKs.                                                                                                     |
| supportsPlatformCommunication       | boolean | true                              | Indicates whether platform communication is supported. `default: true`                                                      |
| TAGS                                | string  | ''                                | additional tags which can be added                                                                                          |
| testType                            | string  | 'lifecycle'                       | Identifier for the currently running test type.                                                                             |
| thirdPartyMockUser                  | string  | 'thirdPartyMockUser'              | The userId for mock firebolt                                                                                                |
| unloadingAppTestTypes               | array   | ["Firebolt Sanity","lifecycle","Discovery.Launch"] | List of test types that involve unloading apps.                                                                             |
| visibilityState                     | object  | {"foreground":"visible","background":"visible","inactive":"hidden"} | Visibility state configuration. `default: {"foreground":"visible","background":"visible","inactive":"hidden"}`              || websocketTransportTimeout           | number  | 15000                             | The timeout length for websocket calls in ms                                                                                |
| wsPort                              | string  | '3474'                            | Port number for the WebSocket connection. `default: '3474'`                                                                 |
| wsUrlPath                           | string  | '?appId=testApp'                  | Path for the WebSocket connection appended to the URL. `default: '?appId=testApp'`                                          |
| wsUrlProtocol                       | string  | 'ws' or 'wss'                     | Protocol for the WebSocket connection.                                                                                      |
| internalWaitTimeTestTypes           | []  | ['testType']                     | Test will wait for app to lunch, if current test type is present in this list                         |

- Provide the specPattern mapping details. 
Update the specHelperConfig.js with the specPattern mapping details.


#### Config Module Setup

By default, the project uses a predefined configuration module referred to as the `defaultModule`. To utilize a custom config module, you will need to update the project's dependency settings within the `package.json` file.

```
"dependencies": {
  "configModule": "git+ssh://<URL of Config Module>",
}
```

Once complete, continue following the rest of the [Setup Instructions](#setup).

#### Config Variables

The Firebolt Certification Suite (FCS) uses configuration variables to manage the behavior of the suite during runtime. These variables are defined in the `package.json`.

##### SDK Version
- **Variable Name**: `supportedSDKVersion `
- **Purpose**: Specifies the SDK version that FCS should use during tests.
- **Default Value**: A specific version, such as `1.3.0`, `1.4.1`, etc.
- **Location**: Defined in `package.json` under the `config` section.

#### Example:

In the `package.json` file, you will find the following entry:

```json
"config": {
  "supportedSDKVersion ": "1.4.1"
}
```
**Note:** It is recommended that this value **not** be modified unless necessary for a specific SDK version. This value will change whenever a newer SDK version becomes available (e.g., 1.2.0, 1.4.1, 1.3.0, etc.).

The `supportedSDKVersion` in the `package.json` is different from other environment variables in `cypress.config.js` because it only exists in the package.json under the config section. While other Cypress-related configurations to manage test environments, reporters, or test-specific settings in `cypress.config.js`. It controls the SDK version used during testing and determines which test cases and fixtures to apply, making it the only configuration variable in `package.json`.

## Execution

Following are the supported runtime environments -

- module
  - [ ] environment to support module feature runs
- certification
  - [ ] environment to support certification/sanity feature runs
- sample
  - [ ] environment to support sample feature runs
- all
  - [ ] environment to support all the feature runs

### Run the certification suite with the browser

`npm run cy:open -- --env testSuite = <runtime-environment>

### Run the certification suite in cli

`npm run cy:run -- --env testSuite = <runtime-environment>

### Run the certification suite in cli with overriding reporter-options

`npm run cy:run -- --spec "" --env <key>=<value>`

### NOTE:

To override config based on the runtime environment, modify the `cypress.config.js` in root folder

### Options

The above commands can be appended with other runtime arguments such as
Other cypress command line can also be passed

| Option       | Description                                                                                    |
| ------------ | ---------------------------------------------------------------------------------------------- |
| --config, -c | Specify the configuration to be used                                                           |
| --env, -e    | Specify additional run time environment variables or override configured environment variables |
| --spec, -s   | Specify the spec files to run                                                                  |
| --tag, -t    | Specify the tags to be considered in the run                                                   |

### Helpful Information

- setup is used to load all sdk resources folders from node-modules/configModule to sdkResources/external/. This setup is done automatically in postInstall.

  `npm run setup`

## Launch Parameters
When launching third party app, a couple of parameters can be passed in the intent. Launch parameters can be passed in cli or updated in config file. 


### Default Launch Parameters
Here are the default parameters that can be utilized during the app launch:

- **appId**: The appId used to launch the app.
- **deviceMac**: The MAC address of the device running the tests.
- **pubSubUrl**: This URL will be included if defined in the Cypress env.
- **pubsub_uuid**: This UUID will be included if defined in the Cypress env.
- **appType**: Used to launch the certification app or by default `Firebolt` for certification.
- **pubSubSubscribeSuffix**: PubSub topic to subscribe to. 
- **pubSubPublishSuffix**: PubSub topic to publish to.
  
Some of these parameters, such as `pubSubUrl` and `pubsub_uuid`, will only be included when they are defined in the env variables.

### Additional Launch Parameters from ConfigModule
The `additionalLaunchParams` allows you to customize the test environment by including specific parameters that can override default parameters or add new launch parameters from config module.

- **Setting Up Additional Launch Parameters:**
  - Define a new variable `additionalLaunchParams` in `config.json` file in the configModule. Add additional launch variables as a key-value pair as shown below.
  
  Example: 
```
{
additionalLaunchParams = { 
    "pubSubUrl": `ws://<YOUR_IP>:8080`,  // Example of a hardcoded value
    "appType": "CYPRESSENV-appType" // Example referencing another Cypress env variable
    };
} 
```
- **Usage of Keys and Values:**
  - The key `pubSubUrl` contains a hardcoded URL that will be included in the intent directly.
  - The key `appType` is prefixed with `CYPRESSENV-`, indicating that it should search for an env variable named `appType`. If `Cypress.env("appType")` exists, its value will be passed in the intent.
- **Parameter Precedence:** Any keys defined in additionalLaunchParams will take precedence over default parameters with matching names.

## Before operation

### Background -

- Before operations are a set of operations which are performed before a test case is executed. This is achieved using the cypress **beforeEach** hook.

- Before Operations are mainly used in below use cases:<br/>

1.  Make a firebolt call to the platform/3rd party app - This would send firebolt calls to the platform/3rd party app before a test case is executed.

2.  Used to set a mock response value for an api call -
    To override the default response for a firebolt call.
    Set pre-requisite values for UI operations like automating the UI actions.

3. Retrieves currently running feature file name and its corresponding scenario name and stored them in the environment variables 'featureName' and 'scenarioName'. These values can later be used in the glue code.

4. To manually specify that a test should be skipped during execution. Useful in the case where a specific test case may be supported by both the framework and the platform but running the test causes undesired behavior which impacts the ability of the device to function as intended.

- Before operation also works based on tags provided in cli. This tags can be send as env values from cli command using the key **beforeOperationTags**. Based on the tags specified in cli and the beforeOperation, corresponding configModule would perform necessary action steps. We can send the tags in below format.<br/>
  **--env beforeOperationTags='tag'**

### Setup -

- Since beforeOperations for each scenario varies according to the test case, we need to add beforeOperation support against each test case. To add the before operation support for any scenario , we need to add json objects in two places. Details given below -<br/>

  1.  In FCS **cypress/fixtures/objects/moduleReqId/moduleReqId.json**<br/>
      Stucture to be followed :

      ```json
      "scenarioNames":{
         "<Feature file name>": {
            "<Name of the scenario how it is added in feature file>": {
               "req": [
                  {
                     "method": {
                        "id": "<Feature file name> 1.1",
                        "description": "<Brief of what that scenario does in a single line>"
                     }
                  }
               ]
            },
         }
      }
      ```

  2.  In config module **cypress/fixtures/objects/moduleReqId/moduleReqId.json**<br/>
      Stucture to be followed :

      ```json
      "scenarioNames":{
         "<Feature file name>": {
            "<Name of the scenario how it is added in feature file>": {
               "beforeOperation": [
                  {
                     "fireboltMock/fireboltCall": "<Key of params that to be send>",
                     "firstParty": "<true/false>",
                     "tags": ["if any tags are necessary for that before operation, else no need to add tags property"],
                     "skipTest": "<true/false>",
                  }
               ]
            },
         }
      }
      ```

      Before Operation for each test case is an array of objects. This would enable us to make multiple before operations for each test case.<br/>
      Properties in before Operation :<br/> 1) "fireboltMock/fireboltCall" : FireboltCall as a key will be used to make firebolt calls to the platform/3rd party app. FireboltMock as a key will be used to override the default response or set the responses.<br/>
      Data of fireboltMock/fireboltCall keys should be added in config module **fixtures/fireboltMocks/FeatureFileName.json** or **fixtures/fireboltCalls/FeatureFileName.json**

          1) "firstParty" : Set value as **true** if the call is to firstParty, set it as **false** if the value is to 3rd party. If no firstparty property is added, it will take **false** as default value.

          2) "tags" : Based on the tags specified here and the cli , corresponding configModule would perform necessary action steps.

          3) "skipTest" : Set value as **true** if the test is to be skipped. If the falue is **false** or not specified then the test will be executed as normal.

### Usage -

- Before operation is mainly used in automation to perform various actions before a test case is executed. Some of the basic use cases are given below -<br/>

  1. To make firebolt calls to the 3rd party app or the platform.<br/>
  2. Set pre-requisite values for UI operations like automating the UI actions.<br/>
  3. Override the default response for a firebolt call.<br/>
  4. Skip a specific test

### Example -

Firebolt call to the platform:<br/>

```json
{
  "fireboltCall": "USERGRANT_CLEAR_ACCOUNT_ID_ROLE_USE",
  "firstParty": true
}
```

Firebolt call to the 3rd party:<br/>

```json
{
  "fireboltCall": "FEDERATED_DATA_ENTITYINFO",
  "firstParty": false
}
```

Firebolt call to the platform:<br/>

```json
{
  "fireboltMock": "KEYBOARD_EMAIL_WITH_UI",
  "firstParty": true
}
```

HTTP call to the platform:<br/>

```json
{
  "fireboltMock": "ACCOUNT_UID_ERROR",
  "firstParty": true
}
```

Skip a specific test:<br/>

```json
{
  "skipTest": true
}
```
## Request overrides

Documentation added in [Request_Overrides.md](/Docs/Request_Overrides.md)

## Data in fixture folder is segregated as per below configurations

![FCS-Test-Data-Hierarchy](https://github.com/rdkcentral/firebolt-certification-suite)

Variables that is common across platforms and common across modules, add the test data in cypress/fixtures/defaultTestData.json in FCS.

- eg:<br/>
  "FALSE": false,<br/>
  "TRUE": true,<br/>
  "NULL": null,

Variables that is common across platforms but is used only in specific modules, add the test data in "/cypress/fixtures/modules/module.json" file in FCS.
Module represents feature file.<br/>
Below data apply to Accessibility module, so data will go into cypress/fixtures/modules/Accessibility.json<br/>

- eg 1:<br/>
  "FONTFAMILY_SANS_SERIF": "sans-serif",<br/>
  "FONTEDGE_UNIFORM": "uniform",<br/>

Below data apply to Device module, so data will go into cypress/fixtures/modules/Device.json<br/>

- eg 2: <br/>
  "NAME": "living room"

Variables that is specific to a platform add the test data in "fixtures/<module>.json" file in configmodule.
Module represents feature file.<br/>
Below data apply to Account module, so data will go into cypress/fixtures/modules/Account.json<br/>

- eg:<br/>
  "Id": "123456",<br/>
  "Uid": "98654",

## Manual Cache Deletion for Cypress

If you encounter any caching issues while executing testcases, please refer to this document [Cache_Deletion.md](Docs/Cache_Deletion.md)

## Using Simple PubSub

If you want to use simplePubSub server as the means of communication for 3rd party app calls follow these steps:

1. Clone SimplePubSub server.
2. Setup SimplePubSub server (i.e. `npm install`) and start (i.e. `npm start`).
3. Clone [firebolt-certification-app](https://github.com/rdkcentral/firebolt-certification-app). 
4. In FCA hange the `host` in /webpack.dev.js to <YOUR_IP>.
5. Setup firebolt-certification-app (FCA) (i.e. `npm install`) and start (i.e. `npm start`).
6. Point your device to use your local instance of FCA (i.e. `http://<YOUR_IP>:8081`).
7. When running FCS include env variables:
    - deviceMac: `<DEVICE_UNDER_TEST>`
    - pubSubUrl: `ws://<YOUR_IP>:8080`
