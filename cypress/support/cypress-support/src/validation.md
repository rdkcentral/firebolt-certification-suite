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
  
#### > cy.validateCustom(jsonString, moduleMethod, customValidatorName)

This method should validate custom function inside given openRPC method.

Custom validator should take in three parameters: A JSON string, Firebolt Module and Method as "<Module.Method>" and a String containing the name of a custom validator. Determining the custom validation to use should work similarly to the configuration manager.

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