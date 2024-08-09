# GetterSetterCallsGlue

## Background

FCS supports the creation of Firebolt call objects, which include methods, parameters, and content. These objects provide details to glue codes for making API calls and validating responses. They are designed to handle multiple method calls for repetitive scenarios.

## Firebolt object

Firebolt objects can be added within JS files located in the `cypress/fixtures/fireboltCalls` folder.

### Sample Firebolt Object Format

Below is the sample format showing how to create a firebolt object.

```
  JS_OBJECT_NAME = {
    method: "getMethod name",
    params: {},
    validationJsonPath: resolveAtRuntime(["result.{{attribute}}", "result.styles.{{attribute}}"]),
    setMethod: resolveAtRuntime("manage_closedcaptions.set{{attribute.uppercaseFirstChar}}"),
    setParams: resolveAtRuntime("value"),
    setValidationJsonPath: "result",
    setContent: null,
    event: "event nameto be validated",
    eventValidationJsonPath: resolveAtRuntime(["eventResponse.{{attribute}}", "eventResponse.styles.{{attribute}}"]),
    content: {
        data: [
            {
                type: "fixture",
                validations: [
                    {
                        mode: "staticContentValidation",
                        type: resolveAtRuntime("value"),
                        description: resolveAtRuntime("Validating that accessibility.closedCaptionSettings {{attribute}} is {{value}}")
                    }
                ]
            }
        ]
    }
  };
```

#### Params:

| **Param**                     | **Definition**                                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **_JS_OBJECT_NAME_**          | Firebolt call object key name                                                                                             |
| **_resolveAtRuntime_**        | `resolveAtRuntime` is a global function used to fetch values from `runtime` environment variables.                        |
| **_attribute_**               | Attribute is a field name of the `runtime` environment variable that holds the value from the test case during execution. |
| **_value_**                   | Value is a field name of the `runtime` environment variable that holds the value from the test case during execution.     |
| **_method_**                  | Name of the get method to get value                                                                                       |
| **_params_**                  | Parameters for the get method                                                                                             |
| **_validationJsonPath_**      | Contains an array or string with the path of the response value that needs to be validated.                               |
| **_setMethod_**               | Name of the method to set values.                                                                                         |
| **_setParams_**               | Parameters for the method to set values.                                                                                  |
| **_setValidationJsonPath_**   | Contains an array or string with the path of the response value that needs to be validated..                              |
| **_setContent_**              | Holds the source of truth to validate against the response from the set method.                                           |
| **_event_**                   | Name of the event to start listening for.                                                                                 |
| **_eventValidationJsonPath_** | Contains an array or string with the path of the response value that needs to be validated for the event.                 |
| **_content_**                 | Holds the source of truth to validate against the response from the get method.                                           |

**Note:** None of the fields are mandatory. Retain or remove fields based on the use case.

### ResolveAtRuntime Function

**ResolveAtRuntime** is a global function utilized by FCS V2 JS files. This function is incorporated within the Firebolt object to execute at runtime, enabling it to retrieve the actual value based on the provided details during the execution of the test case.

- **Input Types**: `resolveAtRuntime` accepts either a single string or an array of strings.

  - **String Input with Pattern**: When a string contains the '{{' pattern (e.g., `resolveAtRuntime("manage_closedcaptions.set{{attribute}}")`), the function extracts the content within the pattern, fetches the corresponding value from the `runtime` environment variable, and replaces the pattern with this value.
  - **String Input without Pattern**: If the string does not contain the '{{' pattern (e.g., `resolveAtRuntime("value")`), the function fetches and returns the value directly from the `runtime` variable.
  - **Array of Strings**: When an array of strings is provided, the function iterates over each string, replacing the patterns with the actual values from the `runtime` environment variable.

This process ensures that all necessary values are dynamically resolved during the test case execution.

#### Examples:

Assuming runtime environment variable having below details

```
runtime: {
 attribute: 'fontSize',
 value: 1.5,
}
```

```
resolveAtRuntime(["result.{{attribute}}", "result.styles.{{attribute}}"])
returns: ['result.fontSize', 'result.styles.fontSize']
```

```
resolveAtRuntime("manage_closedcaptions.set{{attribute.uppercaseFirstChar}}")
returns: "manage_closedcaptions.setFontSize"
```

```
resolveAtRuntime("value")
returns: 1.5
```

## Supported glue codes

- we test the '(.+)' getters and setters(?: '(.*?)'(?: to '(.*?)')?)?
- 1st party app invokes the '(.+)' API to set( invalid)? value
- '(.+)' invokes the '(.+)' get API
- '(.+)' registers for the '(.+)' event
- '(.+)' platform responds to '(.+)' (get|set) API(?: with '(.+)')?
- '(.+)' platform (triggers|does not trigger) '(.\*?)' event(?: with '(.+)')?

### we test the '(.+)' getters and setters(?: '(.*?)'(?: to '(.*?)')?)?

#### Params:

| **_Param_**     | **Definition**                                                              |
| --------------- | --------------------------------------------------------------------------- |
| **_key_**       | key name of the fireboltCall setter/getter data.                            |
| **_attribute_** | The attribute to which the value is going to be set (ex. fontFamily).       |
| **_value_**     | The value used by the set method to set the value (ex. monospaced_sanserif) |

- Extracting the fireboltCall object based on the key provided from the testcase. This object is saving in to the `runtime` environment variable along with `attribute` and `value`.

**Format:** Runtime environment variable having the format as shown below

```
runtime: {
 fireboltCall: {}
 attribute: '',
 value: '',
}
```

**Note:** This glue is mandatory to add in the testcase before other steps.

#### Examples:

- `Given we test the 'CLOSED_CAPTIONS' getters and setters`
- `Given we test the 'CLOSED_CAPTIONS' getters and setters 'enabled' to 'true'`

### 1st party app invokes the '(.+)' API to set( invalid)? value

**Purpose:** Sending a message to platform to set a value and `invalid` is a optional parameter that specify whether to expect for an error or a result.

#### Params:

| **Param**          | **Definition**                                     |
| ------------------ | -------------------------------------------------- |
| **_sdk_**          | sdk name                                           |
| **_invalidValue_** | Determines whether an error or result is expected. |

**Note:** This glue step will work only if the fireboltCall object contains `setMethod` and `setParams` fields.

#### Examples:

- `Given 1st party app invokes the 'Firebolt' API to set`
- `Given 1st party app invokes the 'Firebolt' API to set invalid value`

### '(.+)' invokes the '(.+)' get API

**Purpose:** Sending a message to platform or 3rd party app to invoke an API and get the value.

#### Params:

| **Param**   | **Definition**  |
| ----------- | --------------- |
| **_appId_** | app identifier. |
| **_sdk_**   | sdk name        |

**Note:** This glue step will work only if the fireboltCall object contains `method` and `params` fields.

#### Examples:

- `And '1st party app' invokes the 'Firebolt' get API`
- `And '3rd party app' invokes the 'Firebolt' get API`
- `And 'test_app' invokes the 'Firebolt' get API`

### '(.+)' registers for the '(.+)' event

**Purpose:** Sending a message to platform or third party app to start listening for an event.

#### Params:

| **Param**   | **Definition** |
| ----------- | -------------- |
| **_appId_** | app identifier |
| **_sdk_**   | sdk name       |

**Note:** This glue step will work only if the fireboltCall object contains `event` field.

#### Examples:

- `And '3rd party app' registers for the 'Firebolt' event`
- `And '1st party app' registers for the 'Firebolt' event`

### '(.+)' platform responds to '(.+)' (get|set) API(?: with '(.+)')?

**Purpose:** Performing a validation against the source of truth for the given API response

#### Params:

| **Param**          | **Definition**                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| **_sdk_**          | name of the sdk                                                                                |
| **_appId_**        | app identifier                                                                                 |
| **_methodType_**   | Determines which method doing content validation Ex: set or get                                |
| **_errorContent_** | Doing error content validation when error content object key passed. Ex: 'INVALID_TYPE_PARAMS' |

**Note:** This glue step will work only when fireboltCall object having below fields.

- For set method response validation `setMethod`, `setValidationJsonPath` and `setContent`.
- For get method response validation `method`, `validationJsonPath` and `content`.
- `setValidationJsonPath` and `setContent` are optional while doing error content validation.

#### Examples:

- `And 'Firebolt' platform responds to '1st party app' get API`
- `And 'Firebolt' platform responds to '3rd party app' get API`
- `And 'Firebolt' platform responds to '1st party app' set API`
- `And 'Firebolt' platform responds to '1st party app' 'CLOSEDCAPTION_SETTINGS' set API with 'INVALID_TYPE_PARAMS'`

### '(.+)' platform (triggers|does not trigger) '(.\*?)' event(?: with '(.+)')?

#### Purpose: Performing a event validation against the source of truth

#### Params:

| **Param**           | **Definition**                                                                                 |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| **_sdk_**           | sdk name                                                                                       |
| **_eventExpected_** | Determines whether the event is expected or not.                                               |
| **_appId_**         | app identifier                                                                                 |
| **_errorContent_**  | Doing error content validation when error content object key passed. Ex: 'INVALID_TYPE_PARAMS' |

**Note:** This glue step will work only when fireboltCall object having `event`, `eventValidationJsonPath` and `content` fields. Event name is enough while doing error content validation.

#### Examples:

- `And 'Firebolt' platform triggers '3rd party app' event`
- `And 'Firebolt' platform does not trigger '3rd party app' event`
- `And 'Firebolt' platform triggers '1st party app' event`
- `And 'Firebolt' platform triggers '1st party app' event with 'INVALID_TYPE_PARAMS'`

## Usage

The getter/setter [Glues](#supported-glue-codes) can be used in test cases along with JS objects

### Example 1:

**Test case**

```
 Scenario Outline: Accessibility.closedCaptionsSettings - Positive Scenario: <Scenario>
        Given we test the 'ACCESSIBILITY_CLOSEDCAPTIONS_SETTINGS' getters and setters '<Method>' to '<Value>'
        When '3rd party app' registers for the 'Firebolt' event
        When '3rd party app' invokes the 'Firebolt' get API
        Given 1st party app invokes the 'Firebolt' API to set value
        And 'Firebolt' platform responds to '1st party app' set API
        When '3rd party app' invokes the 'Firebolt' get API
        And 'Firebolt' platform responds to '3rd party app' get API
        And 'Firebolt' platform triggers '3rd party app' event

        Examples:
            | Scenario               | Method     | Value |
            | Disable closedcaptions | enabled    | false |
```

**Firebolt object**

```
exports.ACCESSIBILITY_CLOSEDCAPTIONS_SETTINGS = {
  method: 'accessibility.closedCaptionsSettings',
  params: {},
  validationJsonPath: resolveAtRuntime(['result.{{attribute}}', 'result.styles.{{attribute}}']),
  setMethod: resolveAtRuntime('manage_closedcaptions.set{{attribute.uppercaseFirstChar}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
  event: 'accessibility.onClosedCaptionsSettingsChanged',
  eventValidationJsonPath: resolveAtRuntime([
    'eventResponse.{{attribute}}',
    'eventResponse.styles.{{attribute}}',
  ]),
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: resolveAtRuntime('value'),
            description: resolveAtRuntime(
              'Validating that accessibility.closedCaptionSettings {{attribute}} is {{value}}'
            ),
          },
        ],
      },
    ],
  },
};
```

### Example 2:

**Test case**

```
    Scenario Outline: ClosedCaptions.<Method> - Negative Scenario: <Scenario> expecting error
        Given we test the 'CLOSED_CAPTIONS_SETTINGS' getters and setters '<Method>' to '<Value>'
        When 1st party app invokes the 'Firebolt' API to set invalid value
        And 'Firebolt' platform responds to '1st party app' set API with '<Error>'

        Examples:
            | Scenario          | Method   | Value  | Error               |
            | Set enabled-test  | enabled  | test   | INVALID_TYPE_PARAMS |
```

**Firebolt object**

```
exports.CLOSED_CAPTIONS_SETTINGS = {
  setMethod: resolveAtRuntime('manage_closedcaptions.set{{attribute.uppercaseFirstChar}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
};

```
