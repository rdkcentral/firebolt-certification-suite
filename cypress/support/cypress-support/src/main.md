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
request: cy.startTest({"rawTable": [ ["paramType","variableName","value"]]})
```

#### > cy.runIntentAddon(command, intent)

This command will look for any add-ons present for passed command in config module, if present it will be invoked and additional fields are added(related to platform specific) to the passed intent else it will return the intent without changes.

Ex:

```
request: cy.runIntentAddon("RunTest", {"communicationMode": "SDK","action": "CORE"})

response: {"communicationMode": "SDK","action": "CORE", metadata:{...}}
```
#### > cy.sendMessagetoApp(requestTopic, responseTopic, intent, longPollTimeout)

This command will initialize a transport client, publish a message on a topic, subscribe to a message on the same topic, pushes the results to a global queue, polls the queue for a particular time period and returns the response fetched from queue based on id matching

Ex:

```
request: cy.sendMessagetoApp('mac_appId_FCS',mac_appId_FCA,{"communicationMode": "SDK","action": "search"}, 1000)
```

Note: Response can vary depending on the execution.
