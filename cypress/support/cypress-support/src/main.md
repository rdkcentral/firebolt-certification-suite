## Cypress Support Commands

The main.js is where all cypress-support Cypress commands are defined.

### Supported Commands

#### > cy.sendMessagetoPlatforms(messageObject, responseWaitTime)

This command will look for any request override config present for given firebolt module/method.if not present,it will calls the transport manager with requestMap as originally passed.Once a response is recieved the config module checks for a response override,if not present will return response from transport manager.

##### Params:

| Param            | Definition                                                               |
| ---------------- | ------------------------------------------------------------------------ |
| requestMap       | requestMap should contain method and param etc.                          |
| responseWaitTime | responseWaitTime is the time to wait for the response from the platform. |

**Note**: The responseTimeout is set to 15000ms by default. If the response is not received within this time, it will throw an error. You can override this value by passing a different value in the `responseWaitTime` parameter.

**Example:**

```javascript
request: cy.sendMessagetoPlatforms({
  method: 'closedcaptions.setEnabled',
  params: { value: true },
});
```

```javascript
request: cy.sendMessagetoPlatforms({ method: 'fcs.setEnabled', params: {} });
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

##### Params:

| Param           | Description                                                                        |
| --------------- | ---------------------------------------------------------------------------------- |
| requestTopic    | The topic used to publish the message.                                              |
| responseTopic   | The topic used to subscribe to the message.                                         |
| intent          | A basic intent message applicable to all platforms to initiate the test on FCA.    |
| longPollTimeout | The duration to wait for a response from the app.                                   |

**Example:**

```javascript
request: cy.sendMessagetoApp(
  'mac_appId_FCS',
  mac_appId_FCA,
  { communicationMode: 'SDK', action: 'search' },
  15000
);
```

Note: Response can vary depending on the execution.


#### > cy.startAdditionalServices(input)

**Description** Executes external services defined in the config module, if available.
- This command will look for the `startAdditionalServices` function present in the `additionalServices/index.js` file. If present, it will be invoked; otherwise, nothing will happen.
- By default, this will look for the `startAdditionalServices` function in the config module. If we want to execute another function instead of `startAdditionalServices`, we can override the default function by passing the function name from the command line for the parameter `externalService`.

**Note**: To include additional services, ensure the function is implemented in the `additionalServices/index.js` file.

**Params**: 
| Param | Definition |
| --- | --- |
| input | Currently, `startAdditionalServices` accepts one input, and this input is passed to the external function added in the config module. |

Ex:
```
request: cy.startAdditionalServices(input)
```