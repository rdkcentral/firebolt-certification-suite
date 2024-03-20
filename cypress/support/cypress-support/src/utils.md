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
request: createIntentMessage('runTest',{ "certification": true}, {"asynchronous": "false","communicationMode": "SDK","isAsync": false,"action": "CORE"})

response: {
   "action": "search","data": {"query": "{\"task\":\"runTest\",\"params\":{\"certification\":true},\"action\":\"CORE\",\"context\":{\"communicationMode\":\"SDK\"},\"asynchronous\":false}"},"context": {"source": "device"}}
```

## parseExceptionList

### Purpose: This function is to parse the Cypress.env('exceptionMethods') env having exception methods list defined in configModule. This list may having (NOT_SUPPORTED_METHODS, NOT_AVAILABLE_METHODS, NOT_PERMITTED_METHODS), if it is present assigning the values to corresponding env variables.

### Examples:
* `parseExceptionList()`

## generateExceptionListForSanity

### Purpose: Function to concat all the exception list(Ex: Not Supported, Not Available and Not Permitted) created in parseExceptionList() and passing this concatenated list while creating intent message of sanity runs.
### Examples:
* `generateExceptionListForSanity()`

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


## getSetupDetails
### Purpose: Function to check if the platform specific env variables and params are provided in the required format for testing

### PreRequisites: 
- A json file with all required mandatory parameters should be placed with corresponding configModule's testData folder.
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
