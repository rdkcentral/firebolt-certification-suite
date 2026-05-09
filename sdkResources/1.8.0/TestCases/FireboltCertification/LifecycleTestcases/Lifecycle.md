# Lifecycle

Feature files for Firebolt Certification Lifecycle Module.

## LifeCycle Requirement Id's
Requirement id's for lifecycle are updated in `cypress/fixtures/objects/moduleReqId/moduleReqId.json` as shown below

```
    "scenarioNames":{
        "<Feature file name>": {
            "<Name of the scenario how it is added in feature file>": {
                [
                    {
                      "state": {
                        "id": "<requirement id>"
                      }
                    },
                    {
                      "history": {
                        "id": "<requirement id>"
                      }
                    },
                    {
                      "event": {
                        "id": "<requirement id>"
                      }
                    }
                ]
            },
        }
    }
```
Validations happens for state and event for the scenario only when requirement id present else it will skip the validation.