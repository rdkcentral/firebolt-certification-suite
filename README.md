# firebolt-certification-suite for RDK8


### Prerequisites

- node version 24 or later.
- An RDK8 device that can run the Firebolt Certification App (FCA).
- The host machine, FCA, PubSub server, and RDK8 device must be network-accessible to one another.

### 1. Clone FCS

```bash
git clone https://github.com/rdkcentral/firebolt-certification-suite.git
cd firebolt-certification-suite
git checkout support/fcs-rdk
```

### 2. Start the Simple PubSub server

From the FCS repository root, install the Simple PubSub dependencies and start the server:

```bash
cd simplePubSub
npm install
node index.mjs
```

By default, the server listens on port `8080`. Keep this process running while executing FCS.

### 3. Host the Firebolt Certification App

Host FCA by following the instructions in the
[firebolt-certification-app ](https://github.com/rdkcentral/firebolt-certification-app/tree/support/fca-rdk) repository.
Ensure that the hosted FCA URL is accessible from the RDK8 device.

### 4. Configure FCS

In `cypress.config.js`, update these values in the `env` object:

```javascript
const env = {
  deviceIp: '<RDK8_DEVICE_IP>',
  deviceMac: '<RDK8_DEVICE_MAC>',
  default3rdPartyAppId: '<FCA_APP_ID_INSTALLED_ON_DEVICE>',
  pubSubUrl: 'ws://<PUBSUB_HOST>:<PUBSUB_PORT>',
  communicationMode: 'SDK',
  suiteCommunicationMode: 'SDK',
  deviceCommPort: '3473',
  wsPort: '3473',
  wsUrlProtocol: 'ws://',
  // Keep the remaining configuration values unchanged.
};
```

The `default3rdPartyAppId` value must exactly match the FCA application ID installed on the RDK8 device.

### 5. Install FCA on the device

Install FCA application in the device with an entry point in this format:

```text
http://<FCA_HOST>:<FCA_PORT>/?pubSubUrl=<PUBSUB_URL>&appId=<FCA_APP_ID>&&macaddress=<DEVICE_MAC>&x=0.1
```

Example:

```text
http://192.168.160.146:8081/?pubSubUrl=ws://192.168.160.146:8082&appId=com.rdkcentral.fca&&macaddress=E4:5F:01:F5:58:D1&x=0.1
```

The entry-point values must correspond to the values configured in `cypress.config.js`. 

### 6. Run FCS

Return to the FCS repository root and run:

```
yarn install
```
Then execute the suite using:

```bash
npm run cy:run -- --spec "cypress/TestCases/FireboltCertification/Accessibility.feature" --env reportType=cucumber,testSuite=module,loggerLevel=debug,TAGS="not @notSupported"
```

Replace `Accessibility.feature` with another feature file when running a different module.

Or you can run full suite using below command

```bash
npm run cy:run -- --spec "cypress/TestCases/FireboltCertification/*.feature" --env reportType=cucumber,testSuite=module,loggerLevel=debug,TAGS="not @notSupported"
```


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

`npm run cy:open -- --env testSuite = <runtime-environment>`

### Run the certification suite in cli

`npm run cy:run -- --env testSuite = <runtime-environment>`

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

## Manual Cache Deletion for Cypress

If you encounter any caching issues while executing testcases, please refer to this document [Cache_Deletion.md](Docs/Cache_Deletion.md)

## Additional Information

Please refer [firebolt-certification-suite](https://github.com/rdkcentral/firebolt-certification-suite/blob/main/README.md) for more details

