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

**Configuration module**: This module serves to supply configuration overrides for certification tests when they are run on a specific platform under test. For instance, to enable CI/CD executions for Ripple certification, it is necessary to convert Firebolt commands to be sent via linchpin communication, rather than establishing a direct WebSocket connection to Ripple. In the absence of a configuration module, the default communication and configuration will be utilized (i.e., connecting to Ripple on a device via WebSocket).

**Validation module**: This module is designed to offer validation overrides or extensions for certification tests when they are executed on a firebolt platform under test. For example, additional distributor-level assertions on the Firebolt response obtained from the platform may be included.

## Setup

To execute the certification suite against any platform, the following setup must be completed:

- Configure SSH by following steps given [here](https://etwiki.sys.comcast.net/pages/viewpage.action?pageId=1378692284)

- Configure optional dependencies
    - [ ] Configuration module relevant to the platform under test
    - [ ] Validation module relevant to the platform under test
- Install the dependencies

    ``` yarn install ```
- Pull the configurations (if applicable)

    ```yarn run setup```

- Provide the device configuration details. 
Update the cypress.config.js with the following details

| Field | Type | Sample Value | Description |
| ------------- | ----------- | -------- | ---------- |
| deviceIp  | string |10.0.0.2 | IP of the device under test (should be in the same network as the runner) |
| deviceMac | string | F0:AA:BB:EF:D1:C1 | Mac address of the device under test |
| deviceCommPort | number | 3474 | Ripple communication port. Defaulted to 3474 in the config file |
| default3rdPartyAppId | string |firebolt_certification_app | The 3rd party app id to be used for ests. This app already be onboarded on to the platform being certified |
| sec3rdPartyAppId | string | firebolt_certification_app2 | For certain certification scenarios we need to test with multiple 3rd party app launches. This appId should be the second app that has already been onboarded to the platform being certified and to be used during the tests|
|{$default3rdPartyAppId}URL | string |firebolt_certification_appURL | The 3rd party app url to be used whenever the default 3rd Party App Id is used to launch in the certification suite test cases |
|mock | boolean | false | Whether to use mock firebolt for testing. Default value is false. |
|mockUser | string | 456~A | The user id to be used while connecting to mock Firebolt |
|firstPartyAppId | string | firstPartyAppId | The app id to be used to make manage and discovery firebolt api calls. Default value is firstPartyAppId. This app id should have full permissions and configured as an allowed provider on the platform under test.| 
|certification | boolean | true | Overriding excluded methods and modules from config module when certification is true |
|reportType | string | 'mochawesome' or 'cucumber' or ''  | If this value exists and is equal to one of the values, ONLY that report's event should be sent to report processor. In the case of empty value both reports should be sent to report processor |
|deleteReport | boolean | true  | If the value is true, all the report files will be deleted in the provided report direcotory |
|apiObjectList | array | []  | It stores list of api ojects created after api call |
|event_param | object | {} | It stores the event params that has to be passed in the request |
|deviceHost | string | 'localhost' | Hostname of the WebSocket server |
|wsUrlProtocol | string |  'ws' or 'wss' | Protocol to use for the WebSocket connection |
|wsPort| number | 9998  | Port number for the WebSocket connection |
|wsUrlPath| string | 'jsonrpc'  | Path for the WebSocket connection |



## Execution

Following are the supported runtime environments - 
- module
   - [ ] environment to support module feature runs
- fireboltCertification
   - [ ] environment to support certification/sanity feature runs
- sample
   - [ ] environment to support sample feature runs

Note - 
 ### Run the certification suite with the browser 

 ``` npx cypress open --browser electron  --env satClientId=<client-id>,satClientSecret=<client-secret> --config-file cypress.module.js ``` (With runtime environment as module)

 ``` npx cypress open --browser electron --env satClientId=<client-id>,satClientSecret=<client-secret> --config-file cypress.fireboltCertification.js ``` (With runtime environment as fireboltCertification)

 ``` npx cypress open --browser electron --env satClientId=<client-id>,satClientSecret=<client-secret> --config-file cypress.sample.js ``` (With runtime environment as sample)


 ### Run the certification suite in cli

 ``` npx cypress run --env satClientId=<client-id>,satClientSecret=<client-secret> --config-file cypress.module.js ``` (With runtime environment as module)

 ``` npx cypress run --env satClientId=<client-id>,satClientSecret=<client-secret> --config-file cypress.fireboltCertification.js ``` (With runtime environment as fireboltCertification)
 
 ``` npx cypress run --env satClientId=<client-id>,satClientSecret=<client-secret> --config-file cypress.sample.js ``` (With runtime environment as sample)

  ### Run the certification suite in cli with overriding reporter-options
 
 ``` npm run cy:run -- --spec "" --env <key>=<value> ```

### NOTE:

```cypress/support/common.js``` stores the default config. To override config based on the runtime environment, modify the corresponding config file ```cypress.<runtimeEnvironment>.js``` in root folder

### Options

 The above commands can be appended with other runtime arguments such as 
 Other cypress command line can also be passed 

| Option | Description | 
|------------ | ------------ | 
| --config, -c | Specify the configuration to be used | 
| --env, -e | Specify additional run time environment variables or override configured environment variables | 
| --spec, -s | Specify the spec files to run | 
| --tag, -t | Speficy the tags to be considered in the run | 


### NOTE:

Currently, legacy CAD devices in XClass are not supported

### Helpful Information

- FixtureSetup is used to load all the fixture files from node-modules/configModule to cypress/fixtures/external/. This setup is done automatically in postInstall.

    ```npm run fixtureSetup```
 ## Data in fixture folder is segregated as per below configurations

 ![FCS-Test-Data-Hierarchy](https://github.com/comcast-fireboltCertification/firebolt-certification-suite/assets/135575089/3bf9e85f-7391-45ed-96e3-58088ad167cf)

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
