# Validations

## Error Content Validation

### Background
 Validating the error content obtained in the response. The validation is done against a source of truth, which contains an array of error codes. The goal is to ensure that the error codes and messages in the response match the expected values defined in the source of truth.

### Validation Object Format
The source of truth for error validation is formatted as an object containing type and validation array with error codes. It also supports custom validation.


```
{
    "<Error object name>": {
        "type": "<validation type>",
        "validations": [
            {
                "type": {
                    "errorCode": [ERROR_CODE1, ERROR_CODE2]
                }
            }
        ]
    }
}
```
### Usage
To perform error content validation, follow these steps:
1. FCS having default error content objects [errorContentObjects.json](../cypress/fixtures/objects/errorContentObjects.json)
Example: 
```
{
     "NOT_SUPPORTED": {
        "type": "schemaOnly"
    }
}
```
- When an object has a `"type": "schemaOnly"`, it will skip content validation halt exection after completing schema validation.


2. To perform error content validation, create an error content object following the [Validation Object Format](#validation-object-format) by overriding the error objects from the config module.

Path - Error content object can be added in config module in the below path
`cypress/fixtures/objects/errorContentObjects.json`

Add the error content object in the config module at the following path:
 
`cypress/fixtures/objects/errorContentObjects.json`

- If an object in the config module shares the same key name as an error object defined in FCS, it will override the FCS error object.
- Additional error objects can be added in the config module to validate different error codes.


Example:
```
{
    "INVALID_TYPE_PARAMS": {
        "type": "errorValidationFunction",
        "validations": [
            {
                "type": {
                    "errorCode": [
                        -32602,
                        -32400,
                        -40300
                    ]
                }
            }
        ]
    }
}
```

### Custom Error Validation[here](../cypress/support/step_definitions/validations.md#custom)
Support for custom validation from the config module has been added.

The following object represents the custom validation object format:
```
    "INVALID_TYPE_PARAMS": {
        "<Error object name>": {
            "type": "custom",
            "assertionDef" : "<custom validation function name>",
            "validations": [
                {
                    "type": {
                        "errorCode": []
                    }
                }
            ]
        }
    }
```
Note: Additional validation fields, such as error messages, are also added

 - Custom validation function should be defined in config module `cypress/fixtures/customValidations/`