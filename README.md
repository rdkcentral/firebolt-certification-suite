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

| Field                               | Type    | Sample Value                      | Description                                                                                                                                                                                                         |
| ----------------------------------- | ------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| deviceIp                            | string  | 10.0.0.2                          | IP of the device under test (should be in the same network as the runner)                                                                                                                                           |
| deviceMac                           | string  | F0:AA:BB:EF:D1:C1                 | Mac address of the device under test                                                                                                                                                                                |
| deviceCommPort                      | number  | 3474                              | Defaulted to 3474 in the config file                                                                                                                                                                                |
| default3rdPartyAppId                | string  | firebolt_certification_app        | The 3rd party app id to be used for ests. This app already be onboarded on to the platform being certified                                                                                                          |
| {$default3rdPartyAppId}URL          | string  | firebolt_certification_appURL     | The 3rd party app url to be used whenever the default 3rd Party App Id is used to launch in the certification suite test cases                                                                                      |
| mock                                | boolean | false                             | Whether to use mock firebolt for testing. Default value is false.                                                                                                                                                   |
| mockUser                            | string  | 456~A                             | The user id to be used while connecting to mock Firebolt                                                                                                                                                            |
| firstPartyAppId                     | string  | firstPartyAppId                   | The app id to be used to make manage and discovery firebolt api calls. Default value is firstPartyAppId. This app id should have full permissions and configured as an allowed provider on the platform under test. |
| certification                       | boolean | true                              | Overriding excluded methods and modules from config module when certification is true                                                                                                                               |
| reportType                          | string  | 'mochawesome' or 'cucumber' or '' | If this value exists and is equal to one of the values, ONLY that report's event should be sent to report processor. In the case of empty value both reports should be sent to report processor                     |
| deleteReport                        | boolean | true                              | If the value is true, all the report files will be deleted in the provided report direcotory                                                                                                                        |
| apiObjectList                       | array   | []                                | It stores list of api ojects created after api call                                                                                                                                                                 |
| event_param                         | object  | {}                                | It stores the event params that has to be passed in the request                                                                                                                                                     |
| deviceIp                            | string  | 'localhost'                       | Hostname of the WebSocket server                                                                                                                                                                                    |
| wsUrlProtocol                       | string  | 'ws' or 'wss'                     | Protocol to use for the WebSocket connection                                                                                                                                                                        |
| wsPort                              | number  | 9998                              | Port number for the WebSocket connection                                                                                                                                                                            |
| wsUrlPath                           | string  | 'jsonrpc'                         | Path for the WebSocket connection                                                                                                                                                                                   |
| firebolt_specification_url          | string  | ''                                | Path for the latest firebolt specification url                                                                                                                                                                      |
| firebolt_specification_next_url     | string  | ''                                | Path for the next firebolt specification url                                                                                                                                                                        |
| firebolt_specification_proposed_url | string  | ''                                | Path for the proposed firebolt specification url                                                                                                                                                                    |
| healthCheckRetries                  | number  | 8                                 | Health check retry count                                                                                                                                                                                            |
| communicationMode                   | string  | 'SDK' or 'Transport'              | Set communicationMode as SDK/transport. Default mode is SDK                                                                                                                                                         |
| performanceMetrics                  | boolean | true                              | Makes a call to platform to start/stop the recording of performance metrics based on action passed   |
|interactionsMetrics                      | boolean | true                           | Makes a call to platform to start/stop listening to firebolt interactions based on action passed |
| pubSubUrl                           | string  | ws://127.0.0.1:8081               | Sets the the url to use for a PubSub server which will be used for 3rd party app communication.                                                                                                                     |
| fcaAppList                  | array | ['default3rdPartyAppId']     | Holds the list of fca app identifiers |
|suiteCommunicationMode       | string | 'SDK' or 'Transport'                        | Set communicationMode as SDK/Transport for suite feature files. Default mode is Transport                                                                                                                                                         |
| pubSubSubscribeSuffix                  | string | '_FCA'     | Name of the PubSub topic to subscribe to |
| pubSubPublishSuffix                  | string | '_FCS'       | Name of the PubSub topic to publish to    |
| externalModuleTestTypes              | array | []       |  It contains the config module testType names    |

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


## Interaction Log service

See [Interaction_Logs,md](/Docs//Interaction_Logs.md)

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

## Using Winston Logger for Better Debugging

We have added Winston logger to FCS to make debugging easier. Instead of using console logs, use different types of loggers (info, debug, error) based on the nature of the message.  Optionally, appending the module name to the logger message would furnish more precise information for debugging purposes. To know more about winston implementation refer [logger.md](cypress/support/logger.md)

Example Usage:
  ```
  logger.info('This is an informational message', 'moduleName');
  logger.debug('This is a debugging message');
  logger.error('This is an error message');
```

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
