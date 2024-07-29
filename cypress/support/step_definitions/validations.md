# ValidationsGlue

## '(.+)' platform responds(:? to '(.+)')? with '(.+)'
### Purpose: Validating the response against source of truth.

### Params:
| Param | Definition |
| --- | --- |
| sdk | name of the sdk |
| appId | appId used to fetch the object to validate the content |
| key | key name of the firebolt data contains method/context/expected |

### Examples:
* `Given 'Firebolt' platform responds for 'Validate device id'`
* `Given 'Firebolt' platform responds to '1st party appt' for 'Validate device id'`
* `Given 'Firebolt' platform responds to 'test.test.test' for 'Validate device id'`

## User validates lifecycle history for '(.+)' with '(.+)'
### Purpose: Validating explicitly recorded lifecycle history against source of truth from feature.

### Params:
| Param | Definition |
| --- | --- |
| appCallSign | callSign of launched app |
| historyValidationList | source of truth for lifecycle history validation |

### Examples:
* `User validates lifecycle history for '1st party app' with 'background:foreground:background'`
* `User validates lifecycle history for '3rd party app' with 'background:foreground'`

## Metrics collection process is '(initiated|stopped)'
### Purpose: To start or stop performance metrics service in device by passing appropriate intent to performance test handler

### Params:
| Param | Definition |
| --- | --- |
| action | initiated or stopped |

### Examples:
 * `Given Metrics collection process is 'inititated'`
 * `Given Metrics collection process is 'stopped'`

## Interactions collection process is '(initiated|stopped)'
### Purpose: To start or stop listening to firebolt interactions in device by passing appropriate intent to designated handler

### Params:
| Param | Definition |
| --- | --- |
| action | initiated or stopped |

### Examples:
 * `Given Interactions collection process is 'initiated'`
 * `Given Interactions collection process is 'stopped'`

 ## '(.+)' will (be|stay) in '(.+)' state
### Purpose: To validate 3rd party app transitionss wrt state, event and history aagainst appObject as the source of truth
Here, be/stay determines whether the app will get transitioned to new state or will be staying in the same state.
For the validation part, for the states when the app is not reachable for us to get the status or history, we use customValidation , where we get the validation key name from the moduleReqId.json of the specific testcase. The customValidation function will be defined in the corresponding confiModule. Refer to the [custom] validation.

### Params:
| Param | Definition                                |
| ---   | ---                                       |
| app   | app type                                  |
| state | expected state to be used for validation  |

### Examples:
 * Then '3rd party app' will stay in 'foreground' state
 * Then '3rd party app' will be in 'background' state

# Supported Validations

|  Validation Type  |  Description                                                                                                      |
|-------------------|-------------------------------------------------------------------------------------------------------------------|
|  regEx            |  Used when the response value is to be validated against a particular regex expression provided.                  |
|  miscellaneous    |  Used when the response is to be validated with a specific function provided.                                     |
|  decode           |  Used when the incoming response has to be decoded and validated. It can be base64 or JWT.                        |
|  fixture          |  Used when the response value is to be validated against an expected value already provided.                      |
|  custom           |  Used when the incoming response has to be validated using a customized function provided in the configModule.    |
|  undefined        |  Used when the incoming response has to be validated against undefined value.                                     |


## regEx
### format:
{
        "data": [
            {
                "type": "regEx",
                "validations": [
                    {
                        "type": "",
                        "description": ""
                    }
                ]
            }
        ]
    }
### Params:
| Param         | type   |  Description                                                                 |
| ------------  | ------ | -----------------------------------------------------------------------------|
| data          | array  |  An array that holds the entire set of validation objects                    |
| type          | string |  The value which indicates the type of validation                            |
| validations   | array  |  The array that holds all the data for validation, like value, format, etc.  |
| type          | string |  The type of regex the response has to be validated against.                 |
| description   | string |  The description of the validation executed with this type.                  |

### Example:
{
        "data": [
            {
                "type": "regEx",
                "validations": [
                    {
                        "type": "LANGUAGE",
                        "description": "Validation of the localization language"
                    }
                ]
            }
        ]
}

## miscellaneous
### format:
{
        "data": [
            {
                "type": "miscellaneous",
                "validations": [
                    {
                        "type": "",
                        "description": ""
                    }
                ]
            }
        ]
    }

### Params:
| Param         | type   |  Description                                                                 |
| ------------  | ------ | -----------------------------------------------------------------------------|
| data          | array  |  An array that holds the entire set of validation objects                    |
| type          | string |  The value which indicates the type of validation                            |
| validations   | array  |  The array that holds all the data for validation, like value, format, etc.  |
| type          | string |  The miscellaneous function to be used for validation.                       |
| description   | string |  The description of the validation executed with this type.                  |

### Example:
{
        "data": [
            {
                "type": "miscellaneous",
                "validations": [
                    {
                        "type": "limitAdTrackingOFF",
                        "description": "Validation of the Advertising AdvertisingId When LimitAdTracking OFF Format"
                    }
                ]
            }
        ]
}
## decode
### format:
{
        "method": "The method name whose response is to be validated",
        "data": [
            {
                "type": "decode",
                "specialCase": "jwt/ base64",
                "validations": [
                    {
                        "field": "",
                        "mode": "",
                        "format": "TOKEN_JWT_REGEXP / TOKEN_REGEXP",
                        "type": "",
                        "description": ""
                    }
                ]
            }
 }

### Params:
| Param         | type   |  Description                                                                                               |
| ------------  | ------ | ---------------------------------------------------------------------------------------------------------  |
| method        | string |  The name of the method whose response is to be validated.                                                 |
| data          | array  |  An array that holds the entire set of validation objects.                                                 |
| type          | string |  The value which indicates the type of validation.                                                         |
| specialCase   | string |  The value which indicates the type of decode. It can be either jwt/ base64                                |
| validations   | array  |  The array that holds all the data for validation, like value, format, etc.                                |
| field         | string |  The response field, which needs to be validated.                                                          |
| mode          | string |  The value that indicates the mode with which the decoded value has to be validated, eg : regex            |
| format        | string |  The type of regex the response has to be validated against. It can be TOKEN_JWT_REGEXP / TOKEN_REGEXP     |
| type          | string |  The type of regex format the extracted response for the "field" has to be validated.                      |
| description   | string |  The description of the validation executed with this type.                                                |

### Example:
{
        "method": "authentication.token",
        "data": [
            {
                "type": "decode",
                "specialCase": "jwt",
                "validations": [
                    {
                        "field": "iat",
                        "mode": "regex",
                        "format": "TOKEN_JWT_REGEXP",
                        "type": "NUMERIC_REGEXP",
                        "description": "Validation of the Authentication Token issueDate Format"
                    }
                ]
            }
 }
## fixture
### format:
{
        "method": "",
        "data": [
            {
                "type": "fixture",
                "validations": [
                    {
                        "mode": "",
                        "type": "",
                        "description": ""
                    }
                ]
            }
        ]
}

### Params:
| Param         | type   |  Description                                                                                               |
| ------------  | ------ | ---------------------------------------------------------------------------------------------------------  |
| method        | string |  The name of the method whose response is to be validated.                                                 |
| data          | array  |  An array that holds the entire set of validation objects.                                                 |
| type          | string |  The value which indicates the type of validation.                                                         |
| validations   | array  |  The array that holds all the data for validation, like value, format, etc.                                |
| mode          | string |  The mode of validation like staticContentValidation( where a fixed value is provided ),                   |
|               |        |  deviceContentValidation ( where the validation is done based on device specific value",                   |
| type          | string |  The content to be validated.                                                                              |
| description   | string |  The description of the validation executed with this type.                                                |

### Example:
{
        "method": "accessibility.closedCaptionsSettings",
        "data": [
            {
                "type": "fixture",
                "validations": [
                    {
                        "mode": "staticContentValidation",
                        "type": "ACCESSIBILITY_FONTFAMILY_CURSIVE",
                        "description": "Validation of the accessibility fontfamily cursive"
                    }
                ]
            }
        ]
}

## custom
### format:
{
        "method": "",
        "data": [
            {
                "type": "custom",
                "assertionDef": "",
                "validations": [
                    {
                        "type": "",
                        "description": ""
                    }
                ]
            }
        ]
}

### Params:
| Param         | type   |  Description                                                                                               |
| ------------  | ------ | ---------------------------------------------------------------------------------------------------------  |
| method        | string |  The name of the method whose response is to be validated.                                                 |
| data          | array  |  An array that holds the entire set of validation objects.                                                 |
| type          | string |  The value which indicates the type of validation.                                                         |
| assertionDef  | string |  The name of customized function for validating the response.                                              |
| validations   | array  |  The array that holds all the data for validation, like value, format, etc.                                |
| type          | string |  The type to be validated ( depends on the validation function ).                                          |
| description   | string |  The description of the validation executed with this type.                                                |

### Example:
{
        "method": "capabilities.permitted",
        "data": [
            {
                "type": "custom",
                "assertionDef": "validateCapabilitiesPermitted",
                "validations": [
                    {
                        "type": "permitted",
                        "description": "Validation of capabilities.permitted to check if the capabilities are permitted"
                    }
                ]
            }
        ]
}

### Custom Validation
## Format
The basic structure of the validation object in configModule with customValidation will be as :
{
        "method": "",
        "data": [
            {
                "type": "custom",
                "override": <value>,
                "assertionDef": "<custommethodName>",
                "validations": [
                    {
                        "type": "",
                        "description": ""
                    }
                ]
            }
		]
}

Here, the value of the key "assertionDef" will be the customMethod we use for validation. The customValidation method should be added in this file in configModule : customValidations/validationFunctions.js, and should be exported from "customValidations/index.js".

### Example:
{
        "method": "authentication.token",
        "data": [
            {
                "type": "custom",
                "override": 1,
                "assertionDef": "customMethod1",
                "validations": [
                    {
                        "field": "issueDate1",
                        "mode": "regex",
                        "format": "TOKEN_REGEXP",
                        "type": "DATEAUTHENTICATION_REGEXP",
                        "description": "Validation of the Authentication Token issueDate Format"
                    }
                ]
            }
		]
}

## undefined
### format:
{
        "method": "",
        "data": [
            {
                "type": "undefined",
                "validations": [
                    {
                        "field": "",
                        "description": ""
                    }
                ]
            }
        ]
}

### Params:
| Param         | type   |  Description                                                                                               |
| ------------  | ------ | ---------------------------------------------------------------------------------------------------------  |
| method        | string |  The name of the method whose response is to be validated.                                                 |
| data          | array  |  An array that holds the entire set of validation objects.                                                 |
| type          | string |  The value which indicates the type of validation.                                                         |
| validations   | array  |  The array that holds all the data for validation, like value, format, etc.                                |
| field         | string |  The field to be validated ( depends on the validation function ).                                          |
| description   | string |  The description of the validation executed with this type.                                                |

### Example:
        "method": "accessibility.closedCaptionsSettings",
        "data": [
            {
                "type": "undefined",
                "validations": [
                    {
                        "field": "result.styles.windowColor",
                        "description": "Validation of the accessibility windowcolor undefined"
                    }
                ]
            }
        ]
    

# Validation Override

## Format
The basic structure of the validation object in configModule with override will be as :
    {
            "data": [
                {
                    "type": "",
                    "override": <value>,
                    "validations": [
                        {
                            "type": "",
                            "description": ""
                        }
                    ]
                }
            ]
    }

While validating, if a key is present in both fcs-validation jsons (eg: cypress/fixtures/objects/validationObjects/accessibility.json ) and also in configModule's validation jsons (eg: in config module : fixtures/objects/validationObjects/account.json ) which will be in cypress/fixtures/external/objects/validationObjects/, it will be checking for the "override" value first. If the override value of config validation object is matching with fcs validation objects data's index value, then that specific object in the data array will be overriden with the object from configModule. Else, the configModule object will be pushed as a new object in the data array.

### Example:
{
        "data": [
            {
                "type": "regEx",
                "override": 0,
                "validations": [
                    {
                        "type": "COUNTRYCODE",
                        "description": "Validation of the localization countrycode"
                    }
                ]
            }
        ]
}
