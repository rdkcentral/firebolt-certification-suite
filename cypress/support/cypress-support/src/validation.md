## Validation Manager


### Supported Commands
#### > cy.validateJSON(jsonString, jsonPath)

This method should validate given json string from given jsonpath

**NPM library used**: jsonpath

It will take in two parameters: A JSON string and a String representing a JSON Path query. 
The JSON Path query should extract the value from JSON string and validate the length of extracted object. 
If length == 0, return true, else return false with error message.

example:
- Valid JSON:
```
  cy.validateJSON('[{"name": "London", "population": 8615246 }, { "name": "Berlin", "population": 3517424 }]', "$..name")
  
  response: {status: true, message: ""}
```
  
- Invalid JSON:
```
  cy.validateJSON('[{"name": "London", "population": 8615246 }, { "name": "Berlin", "population": 3517424 }]', "$..berlin")
  
  response: ```{status: false, message: "Invalid JSON Path $..berlin"}
```

<p align="right">(<a href="#">back to top</a>)</p>

#### > cy.validateSchema(jsonString, sdk, openRPCModuleMethod)

This method should validate json string received when invoking <Module.Method> against corresponding schema.

**NPM library used**: json-schema-ref-parser

The schema validator should take in three parameters: A JSON string, SDK of the Firebolt Command (Ex: Core/Manage/Discovery) and a String containing the Module and Method as "<Module.Method>" (Ex: closedcaptions.setEnabled).

Dereferencing OPEN RPC method based on SDK provided. This would extract schema for given <Module.Method> and perform validation.

ex:
- Valid Schema:
```
  cy.validateSchema('{"enabled":true,"styles":{"fontFamily":"Monospace sans-serif","fontSize":1,"fontColor":"#ffffff","fontEdge":"none","fontEdgeColor":"#7F7F7F","fontOpacity":100,"backgroundColor":"#000000","backgroundOpacity":100,"textAlign":"center","textAlignVertical":"middle"}}'
    , "core", "accessibility.closedCaptionsSettings")
  
  response: {status: true, message: ""}
```

- Invalid Schema:
```
  cy.validateSchema('{"enabled":true,"styles":{"fontFamily":"Monospace sans-serif","fontSize":1,"fontColor":"#ffffff","fontEdge":"none","fontEdgeColor":"#7F7F7F","fontOpacity":100,"backgroundColor":"#000000","backgroundOpacity":100,"textAlign":"center","textAlignVertical":"middle"}}'
    , "core", "device.voiceGuidance")
  
  response: {status: false, message: "Schema Validation Failed"}
```

<p align="right">(<a href="#">back to top</a>)</p>
  
#### > cy.validateCustom(jsonString, moduleMethod, customValidatorName)

This method should validate custom function inside given openRPC method.

Custom validator should take in three parameters: A JSON string, Firebolt Module and Method as "<Module.Method>" and a String containing the name of a custom validator. Determining the custom validation to use should work similarly to the configuration manager.

**Supported Modules**: Currently below module is supported. This modules needs to be added as dependency to use this function.

- [validationModule](https://github.comcast.com/lightning-automation/validation-module) - This validation manager will take in an optional module to perform custom validations of JSON payload.
 
ex:
- Valid custom object
```
cy.validateCustom("<JSON>", "accessibility.closedCaptionsSettings", "validationOne")

response: ```{status: true, message: ""}
```

- Invalid custom object
```
cy.validateCustom("<JSON>", "device.name", "notInvalidationModule")

response: ```{status: false, message: "Validator 'notInvalidationModule' not found"}
```

**Note**: All response from validation manager would be depends on validation success/failure. 

If validation success - ```return {status: true, message: ""}```, 

else ```{status: false, message: "failure reason"}```

<p align="right">(<a href="#">back to top</a>)</p>

#### > errorSchemaCheck

### Purpose: Validate error against error schema

### Params:
| Param | Definition| Type |
| --- | --- | --- |
| err | Error | object |

### Examples:
```
cy.errorSchemaCheck(err)
```

#### > formatResultAfterSchemaValidation

### Purpose: Format result with the fields required to be sent back to publisher

### Params:
| Param | Definition| Type |
| --- | --- | --- |
| task |Task/Handler name provided in incoming message that needs to be sent to subscriber to perform corresponding function|string |
| response | Response | object |
| err | Error | object |
| schemaValidationResult | Result obtained on validating response with corresponding schema map | object |
| params | Params | object |
| schemaMap | Schema map | object |

### Examples:
```
cy.formatResultAfterSchemaValidation(task, response, err, schemaValidationResult, params, schemaMap)
```