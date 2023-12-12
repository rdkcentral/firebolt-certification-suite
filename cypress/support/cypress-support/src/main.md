## Cypress Support Commands

The main.js is where all cypress-support Cypress commands are defined.

### Supported Commands

#### > cy.sendMessagetoPlatforms(messageObject)

This command will look for any request override config present for given firebolt module/method.if not present,it will calls the transport manager with requestMap as originally passed.Once a response is recieved the config module checks for a response override,if not present will return response from transport manager.

Ex:

```
request: cy.sendMessagetoPlatforms( {"method": "closedcaptions.setEnabled", "params": { "value": true }} )
```
Note: Response can vary depending on the configuration module being used.

#### > cy.startTest(datatables)

This command will send message to App to start the sanity test, from the datatables it will create a intent message using `cy.createIntentMessage` and if confingModule has any add-on function to add additional details it will be added to the intent message by `cy.runIntentAddon`.

##### Params:
| Param | Definition|
| --- | --- |
| datatables | Contains the input variable to override default value to run suite files (Ex: appId, SDK mode) |

Ex:

```
request: cy.startTest({"rawTable": [ ["paramType","variableName","value"], ["INPUT","asynchronous","false"]]})
```

#### > cy.runIntentAddon(command, intent)

This command will look for any add-ons present for passed command in config module, if present it will be invoked and additional fields are added(related to platform specific) to the passed intent else it will return the intent without changes.

Ex:

```
request: cy.runIntentAddon("RunTest", {"asynchronous": "false","communicationMode": "SDK","isAsync": false,"action": "CORE"})

response: {"asynchronous": "false","communicationMode": "SDK","isAsync": false,"action": "CORE", metadata:{...}}
```
#### > cy.sendMessagetoApp(requestTopic, responseTopic, intent, longPollTimeout)

This command will initialize a transport client, publish a message on a topic, subscribe to a message on the same topic, pushes the results to a global queue, polls the queue for a particular time period and returns the response fetched from queue based on id matching

Ex:

```
request: cy.sendMessagetoApp('900218FFD490_appId_FCS',900218FFD490_appId_FCA,{"asynchronous": "false","communicationMode": "SDK","isAsync": false,"action": "search"}, 1000)
```

Note: Response can vary depending on the execution.

#### > cy.testDataHandler(requestType, dataIdentifier)

This command is used mainly for parsing and fetching test data from various fixture files depending on the requestType passed to the command. RequestType can have different values based on what type of data need to be parsed and fetched from test data file. DataIdentifier specifies the key of the test data which is used to identify and fetch the test data from different test data files.

Currently supported requestType is Params, Context and Content.

- Params - Represent the parameters to be sent for a firebolt call.
- Context - Represent the data that needs to be stored in api/event object that helps to search specific object in a global list.
- Content - Represent the expected value used for validating against a firebolt api response.

  Currently two types of validation are there
   * Static Content Validation - Required content will be fetched from `default json` or from the corresponding `module json` files based on the precedence.
      - `module.json` files reside in `fixtures/modules/` or `fixtures/external/modules/`
   * Device Content Validation
      - Content will be fetched from `devicMac.json` file when devicMac is present. 
      - `deviceMac.json` present in `fixtures/external/devices/` after moved by the `fixtureSetup` script.
      - deviceMac is not present content will be taken from `defaultDeviceData` json file.
      - Default device data present in this path `fixtures/defaultDeviceData.json`

Note: `Mock Firebolt` is the default device and mac addressed is not required.
   
   

Ex:

```
request: cy.testDataHandler("Params","Account_Id")
```
```
response: {value: 123456}
```
```
request: cy.testDataHandler("Content","Device_ID")
```
```
response: 1234
```

#### > cy.parseDataFromTestDataJson(requestType, dataIdentifier)

Function to format the data fetched from fixtures.

Ex:

```
request: cy.parseDataFromTestDataJson({"CLOSEDCAPTIONS_TRUE":"true","CLOSEDCAPTIONS_FALSE":"false"},"CLOSEDCAPTIONS_TRUE")
```
```
response: {value: "true"}
```
#### > extractModuleName(dataIdentifier)

Function to parse the module name from the dataIdentifier passed.

Ex:

```
request: extractModuleName("ACCESSIBILITY_CLOSEDCAPTIONS_TRUE")
```
```
response: accessibility
```
#### > cy.getDataFromTestDataJson(requestType, dataIdentifier)

This command will fetch the data from fixtures and format the fetched data

Ex:

```
request: cy.getDataFromTestDataJson("modules/accessibility.json","CLOSEDCAPTIONS_TRUE")
```
```
response: {value: true}
```