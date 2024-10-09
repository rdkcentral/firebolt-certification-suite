## Interaction Log service

### Background -
The interaction log service captures the various firebolt calls invoked during a test execution. This service will notify all the Firebolt calls invoked in the platform if the Firebolt call is called manually by any action or internally called by any application or service.
### Uses -
The Interaction log service is essential for tracking all the Firebolt calls made by the platform. When a method is called, it may internally trigger/invoke other Firebolt methods. This service can obtain the list of internal method calls and validate them if needed.
### Configurations -
#### Framework side - fcs/config module side
FCS will be using pubsub communication to receive interaction logs. FCS will subscribe to `_fbinteractions` suffixed topic. Interaction logs will be received by this topic and get stored in an array.<br>

Below are the different ways to start the interaction service
* Using `interactionsMetrics` flag. By default, this is false. This can be enabled from the cli command to start the service
* Using glue codes, we can start and stop the interaction service for capturing the logs and then using validation glue, validate these logs. [Reference](#glue-codes-used-for-interaction-service)
* Using Before operation, interaction service can be started by adding `interactionsMetrics = true` in [beforeOperation](#before-operation).

Interactions logs will be stored in `fbInteractionLogs` env variable as an array.
### Device side -
* Device should have the support of interaction logging service.<br>
* By default FCS uses pubsub communication, the device should have the ability to use pubsub communication to send the interaction logs to the `_fbinteractions` suffixed topic. If the device doesn't have this ability, then the respective implementation of using pubsub/any other communication to send the logs has to be implemented in both device and FCS/config module.
## Implementations -
### Glue codes used for interaction service
* Given Interactions collection process is (initiated|stopped)  [here](/cypress/support/step_definitions/validations.md#interactions-collection-process-is-initiatedstopped)
* Given Validate Firebolt Interactions logs [here](/cypress/support/step_definitions/validations.md#validate-firebolt-interactions-logs)
 
### Custom validation support
To do validation for interaction logs, custom function function should be added in config module.
User can add `validateInteractionLogs` function inside `configModule/cypress/fixtures/customValidations/` to do validation of the interaction logs.

Refer to [this](/cypress/support/step_definitions/validations.md#custom) to add the custom validation object.

### Execution - How to execute
* Pass `interactionsMetrics= true` from the cli command to start the service
```
npx cypress open --browser electron -- env interactionsMetrics=true
```
* Inside module requirement JSON we have to add `interactionsMetrics: true` inside beforeOperation to start the service
```
"scenarioNames":{
   "<Feature file name>": {
      "<Name of the scenario how it is added in feature file>": {
         "beforeOperation": [
            {
               "interactionsMetrics": true
            }
         ]
      },
   }
}
```

### Note: 
Interaction Logs will be cleared after the each scenario execution is done, so any kind of validations should be added in that scenario only.