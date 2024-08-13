# Firebolt Certification

Feature files for Firebolt Certification Modules.

## Setup

Refer [setup instructions](https://github.com/rdkcentral/firebolt-certification-suite) to complete the required setup and execute test cases against any platform.

## General Instruction

Testcase should adhere to proper Gherkin format to maintain consistency and clarity across glue codes.
```
Given the environment has been set up for 'Accessibility' tests
And '3rd party app' invokes the 'Firebolt' API to 'get closedCaptions settings'
Then Firebolt platform responds for 'accessibility.closedCaptionsSettings' method and '<Method_JSON_Path>' is '<Content>'
```
* [Location of glue](../../support/step_definitions/)
* [Location of modules](../../fixtures/modules/)
* [Location of fireboltCalls](../../fixtures/fireboltCalls/)
* [Location of defaultTestData json](../../fixtures/defaultTestData.json)
* [Location of cypress commands](../../support/cypress-commands)
## Tagging

Tagging is implemented to effectively categorize the test cases and indicate the set of commands supported by test cases. We suggest the following pattern when adding tags:
**@module @sdk @communicationMode-1 @communicationMode-2**

Here are some examples of tags for different categories:
* Tags for module: @accessibility
* Tags for sdk: @coreSDK, @manageSDK
* Tags for communicationModes: @sdk, @transport

## Directory strucute:
Within the `cypress/TestCases` folder we have the following sub-folders:
- FireboltCertification: Contains core and manage feature files.
- Sanity: Contains core and manage sanity tests.

## Dynamic Firebolt Call

### Background

FCS has the current support to create firebolt calls with these mentioned parameters [Methods, Method Parameters, Content]. These parameters define the method API calls, validation responses. Firebolt call object is designed in a way that it can handle multiple method calls.

### Firebolt object

- Firebolt objects can be added in Javascript files located in the `cypress/fixtures/fireboltCalls` folder. Ex: `cypress/fixtures/fireboltCalls/accessibility.js`
- Having the support to override the firebolt objects from the config moduleby giving a same key.

#### Sample Firebolt Object Format

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

##### Params:

```
FIREBOLT_CALL = {
    method: ...,
    params: ...,
    validationJsonPath: ...,
    setMethod: ...,
    setParams: ...,
    setValidationJsonPath: ...,
    setContent: ...,
    event: ...,
    eventValidationJsonPath: ...,
    content: ...
  };
```

| **Param**               | **Definition**                                                                                            | **Example**                                   |
| ----------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| method                  | The method name to make a call, associated with get test steps                                            | accessibility.closedCaptionsSettings          |
| params                  | parameters of the method                                                                                  | {}                                            |
| validationJsonPath      | Contains an array or string with the path of the response value that needs to be validated                | result.enabled                                |
| setMethod               | The setter method name to make a call, associated with set test steps                                     | closedcaptions.setEnabled                     |
| setParams               | Parameters of the set method to set new value.                                                            | {value: true}                                 |
| setValidationJsonPath   | Contains an array or string with the path of the response value that needs to be validated.               | result.enabled                                |
| setContent              | Holds the source of truth to validate against the response of the set method.                             | null                                          |
| event                   | Name of the event to start listening for.                                                                 | accessibility.onClosedCaptionsSettingsChanged |
| eventValidationJsonPath | Contains an array or string with the path of the response value that needs to be validated for the event. | result.enabled                                |
| content                 | Holds the source of truth to validate against the response of th get method or event.                     | accessibility.closedCaptionsSettings          |

**Note:**

- Acceptable types for the above params i.e string, number, array, object etc.
- These are all the supported fields but depending on the test scenario and glue code used none of them are technically required.

##### Firebolt object having two inputs.

- **attribute:** Attribute is a field name of the `runtime` environment variable that holds the value from the test case during execution.
- **value:** Value is a field name of the `runtime` environment variable that holds the value from the test case during execution.

Every field in the fireboltCall object can be a function call `resolveAtRuntime()` and the different ways to use that function call:

- resolveAtRuntime('value')
- resolveAtRuntime('value')
- resolveAtRuntime('embedded {{value}}')
- resolveAtRuntime(['array', 'with {{value}}s', 'embedded{{attribute}}'])
- resolveAtRuntime('{{attribute.uppercaseFirstChar}}')
- resolveAtRuntime('{{attribute.lowercaseFirstChar}}')

**Note:**

### ResolveAtRuntime Function

**ResolveAtRuntime** is a global function utilized by FCS V2 JS files. This function is incorporated within the Firebolt object to execute at runtime, enabling it to retrieve the actual value based on the provided details during the execution of the test case.

- **Input Types**: `resolveAtRuntime` accepts either a single string or an array of strings.

  - **String Input with Pattern**: When a string contains the '{{' pattern (e.g., `resolveAtRuntime("manage_closedcaptions.set{{attribute}}")`), the function extracts the content within the pattern, fetches the corresponding value from the `runtime` environment variable, and replaces the pattern with this value.
  - **String Input without Pattern**: If the string does not contain the '{{' pattern (e.g., `resolveAtRuntime("value")`), the function fetches and returns the value directly from the `runtime` variable.
  - **Array of Strings**: When an array of strings is provided, the function iterates over each string, replacing the patterns with the actual values from the `runtime` environment variable.

This process ensures that all necessary values are dynamically resolved during the test case execution.

##### Examples:

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

### Supported glue codes [[here]](../support//step_definitions/dynamicCalls.md)

- we test the '(.+)' getters and setters(?: '(._?)'(?: to '(._?)')?)?
- 1st party app invokes the '(.+)' API to set( invalid)? value
- '(.+)' invokes the '(.+)' get API
- '(.+)' registers for the '(.+)' event
- '(.+)' platform responds to '(.+)' (get|set) API(?: with '(.+)')?
- '(.+)' platform (triggers|does not trigger) '(.\*?)' event(?: with '(.+)')?

### Usage

The dynamic calls Glues can be used in test cases along with fireboltCall dynamic objects.

#### Below examples shows the how fireboltCall object and testcase can be written using dynamic glues.

##### Example 1:

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

**Test case 1**

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

**Test case 2**

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
            | Scenario               | Method        | Value  |
            | Disable closedcaptions | enabled    | false     |
            | Enable closedcaptions  | enabled    | true
            | Set fontFamily-monospaced_sanserif | fontFamily | monospaced_sanserif  |
            | Set fontFamily-cursive | fontFamily | cursive   |
            | Set fontFamily-proportional_serif  | fontFamily | proportional_serif    |
```

##### Example 2:

**Firebolt object**

```
exports.CLOSED_CAPTIONS_SETTINGS = {
  setMethod: resolveAtRuntime('manage_closedcaptions.set{{attribute.uppercaseFirstChar}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
};

```

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
