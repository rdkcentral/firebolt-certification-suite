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
| performanceMetrics                  | boolean | true                              | Makes a call to platform to start/stop the recording of performance metrics if value is true                                                                                                                        |


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

`npx cypress open --browser electron -- env testSuite = <runtime-environment>

### Run the certification suite in cli

`npx cypress run -- env testSuite = <runtime-environment>

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

- setup is used to load all the fixture files from node-modules/configModule to cypress/fixtures/external/. This setup is done automatically in postInstall.

  `npm run setup`

## Before operation

### Background -

- Before operations are a set of operations which are performed before a test case is executed. This is achieved using the cypress **beforeEach** hook.

- Before Operations are mainly used in below use cases:<br/>

1.  Make a firebolt call to the platform/3rd party app - This would send firebolt calls to the platform/3rd party app before a test case is executed.

2.  Used to set a mock response value for an api call -
    To override the default response for a firebolt call.
    Set pre-requisite values for UI operations like automating the UI actions.

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

  2.  In config module **testData/moduleReqId/moduleReqId.json**<br/>
      Stucture to be followed :

      ```json
      "scenarioNames":{
         "<Feature file name>": {
            "<Name of the scenario how it is added in feature file>": {
               "beforeOperation": [
                  {
                     "fireboltMock/fireboltCall": "<Key of params that to be send>",
                     "firstParty": "<true/false>",
                     "tags": ["if any tags are necessary for that before operation, else no need to add tags property"]
                  }
               ]
            },
         }
      }
      ```

      Before Operation for each test case is an array of objects. This would enable us to make multiple before operations for each test case.<br/>
      Properties in before Operation :<br/> 1) "fireboltMock/fireboltCall" : FireboltCall as a key will be used to make firebolt calls to the platform/3rd party app. FireboltMock as a key will be used to override the default response or set the responses.<br/>
      Data of fireboltMock/fireboltCall keys should be added in config module **testData/fireboltMocks/FeatureFileName.json** or **testData/fireboltCalls/FeatureFileName.json**

          2) "firstParty" : Set value as **true** if the call is to firstParty, set it as **false** if the value is to 3rd party. If no firstparty property is added, it will take **false** as default value.

          3) "tags" : Based on the tags specified here and the cli , corresponding configModule would perform necessary action steps.

### Usage -

- Before operation is mainly used in automation to perform various actions before a test case is executed. Some of the basic use cases are given below -<br/>

  1. To make firebolt calls to the 3rd party app or the platform.<br/>
  2. Set pre-requisite values for UI operations like automating the UI actions.<br/>
  3. Override the default response for a firebolt call.<br/>

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

## Request overrides

### fetchPerformanceThreshold:

- Request:<br>
  Makes an HTTP request to graphite with deviceMac, processType with how much percentile, and from what time to fetch the metrics.<br>
  Format:
  ```
   {
     method: 'performance.fetchPerformanceThreshold',
     params: {'type': '<(device|process|all)>', process: '<(memory|load|set size|required)>', percentile: 70, threshold: '<Threshold to use as source of truth>'}
   }
  ```
  Examples:
  ```
   {
     method: 'performance.fetchPerformanceThreshold',
     params: {'type': 'device', process: 'memory', percentile: 70, threshold: '35000000'}
   }
   {
     method: 'performance.fetchPerformanceThreshold',
     params: {'type': 'process', process: 'set size', percentile: 70, threshold: '75000000'}
   }
   {
     method: 'performance.fetchPerformanceThreshold',
     params: {'type': 'all', process: 'required', percentile: 70, threshold: '75000000'}
   }
  ```
- Response:<br>
  Receives an array of objects, which contains success and message properties, success defines the execution is a success or failure and message defines either response or any custom message that descibes the pass/fail.
  Example:
  ```
   [
      {
        "success": true,
        "message": "Expected received threshold for set sizeRSS is 37748736 to be less than the expected threshold of 1073741824"
      },
      {
        "success": true,
        "message": "Expected received threshold for set sizePSS is 41964544 to be less than the expected threshold of 1073741824"
      }
   ]
  ```
### createMarker:

- Request:<br>
  Making an HTTP call to grafana to create a marker on dashboard with given description.<br>
  Format:
  ```
   {
     method: 'performance.createMarker',
     params: <Scenario name>
   }
  ```
  Examples:
  ```
   {
     method: 'performance.createMarker',
     params: 'Account.id - Positive Scenario: Validate account ID'
   }
  ```
- Response:<br>
  Recieves an object with success and message properties.
  Example:
  ```
  {
    "success": true,
    "message": "Marker has been created successfully"
  }
  {
    "success": false,
    "message": `Unable to create marker, failed with status code- 200 and error- unable to find the dashboard`
  }
  ```


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

Variables that is specific to a platform add the test data in "testData/<module>.json" file in configmodule.
Module represents feature file.<br/>
Below data apply to Account module, so data will go into cypress/fixtures/modules/Account.json<br/>

- eg:<br/>
  "Id": "123456",<br/>
  "Uid": "98654",

## Manual Cache Deletion for Cypress

If you encounter any caching issues while executing testcases, please refer to this document [Cache_Deletion.md](Docs/Cache_Deletion.md)

## Using Winston Logger for Better Debugging

We have added Winston logger to FCS to make debugging easier. Instead of using console logs,use a different types of loggers (info, debug, error) based on the nature of the message.  Optionally, appending the module name to the logger message would furnish more precise information for debugging purposes.To know more about winston implementation refer [logger.md](cypress/support/logger.md)

Example Usage:
  ```
  logger.info('This is an informational message', 'moduleName');
  logger.debug('This is a debugging message');
  logger.error('This is an error message');

  ```
