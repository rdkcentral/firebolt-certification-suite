# utils commands

## replaceJsonStringWithEnvVar

### Purpose: This method will replace the env variable if string has <any value> operator.Internally it will look for '<' and '>' operator and read the value between those operand. This value needs to be added in .env or cypress env file. If variable not found, it will return same value

### Examples:
* `replaceJsonStringWithEnvVar('{ "result": { "type": "device", "value": "PD54331.." } }')`

## createIntentMessage

### Purpose: This function will create intent message using below parameters to send to App to start the test.
### Params:
| Param | Definition| Type |
| --- | --- | --- |
| task | Task/Handler name that needs to be sent to App to perform corresponding function | string |
| jsonParams | Params that needs to be sent to App(Ex: methodName and methodParams to invoke) | object |
| map | additional params that needs to be sent(Ex: communicationMode, action etc) | object |

### Examples:

```
request: createIntentMessage('runTest',{ "certification": true}, {"communicationMode": "SDK","action": "CORE"})

response: {
   "action": "search","data": {"query": "{\"task\":\"runTest\",\"params\":{\"certification\":true},\"action\":\"CORE\",\"context\":{\"communicationMode\":\"SDK\"}}"},"context": {"source": "device"}}
```

## parseExceptionList

### Purpose: This function is to parse the Cypress.env('exceptionMethods') env having exception methods list defined in configModule. This list may having (NOT_SUPPORTED_METHODS, NOT_AVAILABLE_METHODS, NOT_PERMITTED_METHODS), if it is present assigning the values to corresponding env variables.

### Examples:
* `parseExceptionList()`

## generateCombinedExceptionList

### Purpose: Function to concat all the exception list(Ex: Not Supported, Not Available and Not Permitted) created in parseExceptionList() and passing this concatenated list while creating intent message of sanity runs.
### Examples:
* `generateCombinedExceptionList()`

## overideParamsFromConfigModule

### Purpose: This function is to override excluded methods and excluded modules from config module if it is present else using the existing one defined in constants.

### Examples:
* `overideParamsFromConfigModule()`

## getTopic

### Purpose: Function to fetch the required topics.

### Params:
| Param | Definition| Type |
| --- | --- | --- |
| appIdentifier | appId used to create a topic | string |
| operation | operation should contain `publish` or `subscribe` | string |

### Examples:
request - `getTopic('test.test', 'publish')`

response - `test.test_mac_FCS`

## getCommunicationMode

### Purpose: Get communication mode.

### Examples:
* `getCommunicationMode()`

## extractModuleName

### Purpose: Parsing the module name from the dataIdentifier passed.

### Params:
| Param | Definition| Type |
| --- | --- | --- |
| dataIdentifier | Key to be used to fetch module name | string |

### Examples:
request - `extractModuleName('ACCESSIBILITY_CLOSEDCAPTIONS_TRUE')`

result - `'accessibility'`

## getApiOrEventObjectFromGlobalList

### Purpose: Extracting a method or event object from the global list

### Params:
| Param | Definition| Type |
| --- | --- | --- |
| method | Name of the API to be used to fetch the object from the global list | string |
| context | The context value used to fetch the specific object | string |
| appId | appId | string |
| validationType | validationType contains a method or event | string |

### Examples:
request - `cy.getApiOrEventObjectFromGlobalList('device.id', {}, 'test.test.test', 'method')`




## writeJsonToFileForReporting

### Purpose: Writes JSON data to a file.

### Params:
| Param | Definition| Type |
| --- | --- | --- |
| jsonData | The JSON data to write to the file | string |
| defaultDirectory | The default directory where the file will be saved | string |
| fileNamePrefix | The prefix to be used for the file name | string |

### Examples:
request - `cy.writeJsonToFileForReporting({ "key": "value" }, "/path/to/directory/", "report_");
## getAndDeferenceOpenRPC

### Purpose: To get and dereference the OpenRPC json. If version is provided, get version specific openRPC from URL (https://rdkcentral.github.io/firebolt/requirements/${version}/specifications/firebolt-open-rpc.json) and dereference it. Else, get the latest openRPC from URL (https://rdkcentral.github.io/firebolt/requirements/latest/specifications/firebolt-open-rpc.json) by default and dereference it

### Note: Currently, the openRPC supports both core and manage sdk modules

### Params:

| Param   | Definition | Type   |
| ------- | ---------- | ------ |
| version | version    | string |

### Examples:

- `getAndDeferenceOpenRPC('0.17.0')`
- `getAndDeferenceOpenRPC()`

## getEnvVariable

### Purpose:

The `getEnvVariable` function is a utility for retrieving values of Cypress environment variables. It allows you to get the value of a specified environment variable.

- If the retrieved value is not null, undefined, or an empty string and returns it.

- If the variable is required and not found, it throws an error with a descriptive message along with stack trace.

- If the variable is not required and not found, returns the retrieved value (which might be null or undefined).

### Params:

| Param      | Definition | Type    |
| ---------- | ---------- | ------- |
| variable   | variable   | String  |
| isRequired | isRequired | Boolean |

### Examples:

const variableValue = UTILS.getEnvVariable('YOUR_ENV_VARIABLE');

## lifecycleHistorySchemaValidation
### Purpose: Function to do schema validation for lifecycle history recording

### Params:

| Param   | Definition                           | Type   |
| ------- | ----------                           | ------ |
| result  | Response to do schema validation     | object |
| schema  | Lifecycle history schema             | object |
| lifecycleHistoryRecordType  | record task type name startLifecycleRecording/stopLifecycleRecording | string |
| envKey  | The name of the environment variable | string |

## assertWithRequirementLogs
### Purpose: Asserts the equality of expected and actual values and logs the result with additional information.  If an error object is provided, the assertion fails with the error object logged.

### Params:

| Param      | Definition                                                                                                   | Type    |
| -------    | ----------                                                                                                   | ------  |
| pretext    |  Additional information to be logged before the assertion result                                             | string  |
| expected   | The expected value for comparison                                                                            | *       |
| actual     | The actual value for comparison                                                                              | *       |
| equateDeep | Optional. If true, performs a deep equality check using assert.deepEqual(), otherwise uses assert.equal()    | boolean |
| errorObject| Optional. Error object for which assertion should fail                                                       | *       |


### Examples:

`assertWithRequirementLogs('Checking foreground state', 'foreground', 'foreground', true, { message: 'Invalid state' })`

## getSetupDetails
### Purpose: Function to check if the platform specific env variables and params are provided in the required format for testing

### PreRequisites: 
- A json file with all required mandatory parameters should be placed with corresponding configModule's fixtures folder.
- The json file should contain a list of params with each object having name and result as the keys. Within result, there should be the param's name, summary and schema with   which it should be validated
- The json file should be in the following format :
```
{
    "info": {
        "title": "PreRequisite"
    },
    "param": [
        {
            "name": "deviceMac",
            "result": {
                "name": "deviceMAC",
                "summary": "Device Mac Address",
                "schema": {
                    "type": "string"
                }
            }
        },
        {
            "name": "deviceIp",
            "result": {
                "name": "deviceIp",
                "summary": "Device IP Address",
                "schema": {
                    "$ref": "#/components/schemas/DeviceIDDescription"
                }
            }
        }
    ],
    "components": {
        "schemas": {
            "DeviceIDDescription": {
                "title": "DeviceIDDescription",
                "type": "string",
                "required": true,
                "properties": {}
            }
        }
    }
}
```
## pubSubClientCreation

### Purpose: Establishes a Pub/Sub connection and subscribes to the response topic.

### Params:
| Param | Definition| Type |
| --- | --- | --- |
| appTransport | Application transport object used for initialization | string |
### Examples:
request - `cy.pubSubClientCreation(appTranport);`

## subscribeResults

### Purpose: A callback function that fetches the required response from a subscription and pushes it to a global queue.

### Params:
| Param | Definition| Type |
| --- | --- | --- |
| data | Response payload from the subscription call | string |
| metaData |  Response headers from the subscription call | string |

### Examples:
request - `cy.subscribeResults('{ "result": { "type": "device", "value": "PD54331.." } }', { id: 1232435, client: 'clientName' });

## destroyGlobalObjects

### Purpose: Destroys global objects and recursively clears the environment variables whose names are stored in the list before test execution.

### Params:
| Param | Definition| Type |
| --- | --- | --- |
| objectNameList | List of objects to be cleared | string |

### Examples:
request - `cy.destroyGlobalObjects(['lifecycleAppObjectList']);

## checkForTags

### Purpose: Checks whether the tags in the beforeOperation object and the tag passed in the CLI have anything in common.

### Params:
| Param | Definition| Type |
| --- | --- | --- |
| tags | An array of tags to check | string |

### Examples:
request - `cy.checkForTags(["TAG1","TAG2"]);

## resolveDeviceVariable

### Purpose: The global resolveDeviceVariable function retrieves a value from the preprocessed device data stored in Cypress environment variables called resolvedDeviceData based on a specified key and returns the value of the key. The preprocessDeviceData function reads and processes device-specific data from a fixture JSON file based on a given deviceMac address.

### Examples:
resolveDeviceVariable("deviceId")

## FireLog

### Purpose: Provides assertion methods with logging using Cypress's cy.log(). It wraps Cypress's assertion methods, allowing logging of messages for each assertion.

### Examples:
`fireLog.isTrue(isTrueValue, "True message");`
`fireLog.isFalse(isFalseValue, "False message");`
`fireLog.deepEqual(actual, expected, "deepEqual message");`