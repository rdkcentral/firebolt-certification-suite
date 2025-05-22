## Transport Manager


### Supported Commands
#### > cy.sendMessage(messageObject, responseWaitTime)

This function should process the incoming "messageObject", send the message appropriately to one of the two types of calls and return the raw response.


| Type | Description |
| --- | --- |
| Firebolt call using the SDK |  If object passed in contains a "method" field in the format "<Module>.<Method>" (Ex: "closedCaptions.setEnabled") it's considered as Firebolt call. The appropriate SDK will be called. |
| Modular Transport Client | If object passed in contains "transport" and "options" fields, it will be considered an MTC call. The "transport" field will contain the module to use from MTC. For example, an HTTP call.  | 
| responseWaitTime | responseWaitTime is the time to wait for the response from the platform. |
