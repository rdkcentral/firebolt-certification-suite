## Interaction Log service
### Background -
The interaction log service will notify all the Firebolt calls getting invoked in the platform whether the Firebolt call is made manually by any action or internally made by any application or service. Whenever the platform identifies a firebolt call, the interaction log service will notify that.
### Uses -
The Interaction log service is essential for tracking method calls. When a method is called, it internally triggers/invokes other Firebolt methods. This service can be used to obtain the list of internal method calls.
### Configurations -
#### Framework side - fcs/config module side
Below are the different ways to start the interaction service
* Using `interactionsMetrics` flag. This can be enabled from the cli command to start the service
* Using glue codes we can able to start and stop the interaction service and then using validation glue able to validate the obtained logs.
* Using Before operation, able to start the service by adding `interactionsMetrics` to true in [beforeOperation](#before-operation). 

#### Device side -
Platform should have the support of interactonaction logging service. The way interactionlogs will be fetched from device differs on platform and that can be handled through config module.
## Implementations -
### Glue codes used for interaction service
* Given Interactions collection process is (initiated|stopped)  [here](/cypress/support/step_definitions/validations.md#interactions-collection-process-is-initiatedstopped)
* Given Validate Firebolt Interactions logs [here](/cypress/support/step_definitions/validations.md#validate-firebolt-interactions-logs)
 
### Custom validation support
To do validation for interaction logs, custom function function should be added in config module.
User can add `validateFireboltInteractionLogs` function inside `configModule/cypress/fixtures/customValidations/` to do validation of the interaction logs.
 
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