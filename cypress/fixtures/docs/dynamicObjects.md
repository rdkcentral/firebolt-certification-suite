# Dynamic Objects (Only Supported in JS Objects)

## [Supported Dynamic Glue Codes](../../support/step_definitions/dynamicCalls.md)

- we test the '(.+)' getters and setters(?: '(._?)'(?: to '(._?)')?)?
- 1st party app invokes the '(.+)' API to set( invalid)? value
- '(.+)' invokes the '(.+)' get API
- '(.+)' registers for the '(.+)' event
- '(.+)' platform responds to '(.+)' (get|set) API(?: with '(.+)')?
- '(.+)' platform (triggers|does not trigger) '(.\*?)' event(?: with '(.+)')?

## Background

FCS has the current support to create firebolt calls with these mentioned parameters [Methods, Method Parameters, Content]. These parameters define the method API calls, validation responses. Firebolt call object is designed in a way that it can handle multiple method calls.

## Firebolt object

- Firebolt objects can be added in Javascript files located in the `cypress/fixtures/fireboltCalls` folder. Ex: `cypress/fixtures/fireboltCalls/accessibility.js`
- Having the support to override the firebolt objects from the config module by giving a same key.

### Sample Firebolt Object Format

Below is the sample format showing how to create a firebolt object.

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

| **Param**               | **Definition**                                                                                            | **Example**                                   | **Supported Type**             |
| ----------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ------------------------------ |
| method                  | The method name to make a call, associated with get test steps                                            | accessibility.closedCaptionsSettings          | string                         |
| params                  | parameters of the method                                                                                  | {}                                            | string or object               |
| validationJsonPath      | Contains an array or string with the path of the response value that needs to be validated                | result.enabled                                | string or array                |
| setMethod               | The setter method name to make a call, associated with set test steps                                     | closedcaptions.setEnabled                     | string                         |
| setParams               | Parameters of the set method to set new value.                                                            | {value: true}                                 | string or object               |
| setValidationJsonPath   | Contains an array or string with the path of the response value that needs to be validated.               | result.enabled                                | string or array                |
| setContent              | Holds the source of truth to validate against the response of the set method.                             | null                                          | string, null, boolean or array |
| event                   | Name of the event to start listening for.                                                                 | accessibility.onClosedCaptionsSettingsChanged | string                         |
| eventValidationJsonPath | Contains an array or string with the path of the response value that needs to be validated for the event. | result.enabled                                | string or array                |
| content                 | Holds the source of truth to validate against the response of th get method or event.                     | true                                          | string, null, boolean or array |

**Note:**

- Acceptable types for the above params i.e string, number, array, object etc.
- These are all the supported fields but depending on the test scenario and glue code used none of them are technically required.

## Runtime Variables

Runtime variables are used to store the values that are populated from the test case during execution.

Below are the runtime variables that can be used in the fireboltCall object.

- **attribute:** Attribute is a field name of the `runtime` environment variable that holds the value of the method name. For example, if the method name is `closedCaptions.setEnabled`, the attribute value will be `enabled`.
- **value:** Value is a field name of the `runtime` environment variable that holds the value used for to set the value or for validation.

**Note:** In order to use the runtime variables in the fireboltCall object, the `resolveAtRuntime()` function should be used.

## ResolveAtRuntime Function

**ResolveAtRuntime** is a global function utilized by the JS files. This function is used to dynamically resolve the values during the test case execution. It is used to replace the placeholders in the fireboltCall object with the actual values from the `runtime` environment variable.

- **Input Types**: `resolveAtRuntime` accepts either a string or an array of strings as input.

  - **String Input with Pattern**: When a string contains the '{{' pattern (e.g., `resolveAtRuntime("manage_closedcaptions.set{{attribute}}")`), the function replaces the pattern with the actual value from the `runtime` environment variable.
  - **String Input without Pattern**: If the string does not contain the '{{' pattern (e.g., `resolveAtRuntime("value")`), the function directly returns the value from the `runtime` environment variable.
  - **Array of Strings**: When an array of strings is provided, the function iterates over each string, replacing the patterns with the actual values from the `runtime` environment variable.

- **Options:** The function has the support to accespts the optional parameter `uppercaseFirstChar` or `lowercaseFirstChar` to convert the first character of the resolved value to uppercase or lowercase. This parameter is separated by a dot from the attribute name. This parameter is used to convert the attribute value to the correct format for the method name. For example, `resolveAtRuntime('manage_closedcaptions.set{{attribute.uppercaseFirstChar}}')`.

This process ensures that all necessary values are dynamically resolved during the test case execution.

### Examples:

Assuming runtime environment variable having below details

```
runtime: {
 attribute: 'fontSize',
 value: 1.5,
}
```

#### Example 1:

```
resolveAtRuntime(["result.{{attribute}}", "result.styles.{{attribute}}"])
returns: ['result.fontSize', 'result.styles.fontSize']
```

#### Example 2:

```
resolveAtRuntime("manage_closedcaptions.set{{attribute.uppercaseFirstChar}}")
returns: "manage_closedcaptions.setFontSize"
```

#### Example 3:

```
resolveAtRuntime("value")
returns: 1.5
```

## Usage

The dynamic calls Glues can be used in test cases along with fireboltCall dynamic objects.

### Below examples shows the how fireboltCall object and testcase can be written using dynamic glues.

#### Example 1:

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

#### Example 2:

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

## Advanced Support

FCS has the advanced support to create separate variables in JS config and creating a common set of variables. Below are the examples for the same.

- Create a separate object in any JS file under the `cypress/fixtures/fireboltCalls` folder.
- Object key name should be start with prefix `DYNAMIC_FB_CALLS_VARIABLES` as shown below.

```
exports.DYNAMIC_FB_CALL_VARIABLES = {
   DEFAULTS: {
      CLOSEDCAPTIONS: {
         fontFamily: 'sanserif' || null
      }
   }
}
```

- Above prefix is not only limited to `DYANMIC_FB_CALLS_VARIABLES`, additional prefix can be added as per the requirement. New prefix should be added in the `variableObjectsPrefixLists` environment variable and overriding or adding new variables should be done via the config module or from the cli command.
- To use the above variables in the fireboltCall object, use the [`resolveAtRuntime`](#resolveatruntime-function) function as shown below.
  ```
   resolveAtRuntime('DYNAMIC_FB_CALL_VARIABLES.DEFAULTS.CLOSEDCAPTIONS.fontFamily')
  ```
  resolveAtRuntime function will treat the passed input as path and will resolve the value of the fontfamily from the DYNAMIC_FB_CALL_VARIABLES object.

### Examples

#### Example 1: Calling account.session with parameters

- Create a firebolt object in `cypress/fixtures/fireboltCalls/account.js` with the below content:
  ```
     exports.PUSH_SESSION_TOKENACCOUNT = {
        setMethod: 'manage_account.session',
        setParams: resolveAtRuntime('DYNAMIC_FB_CALL_VARIABLES.ACCOUNT.ACCOUNT_SESSION'),
        setContent: resolveAtRuntime('DYNAMIC_FB_CALL_VARIABLES.DEFAULTS.NULL'),
     };
  ```
- Define the variables object in `cypress/fixtures/fireboltCalls/account.js` with the below content:
  ```
     exports.DYNAMIC_FB_CALL_VARIABLES = {
        ACCOUNT: {
           ACCOUNT_SESSION: {
              token: '',
              expiresIn: '',
           },
           NULL: null,
        }
     }
  ```
  ---> Not mandatory to have the same file name, it should be present in the same folder where the firebolt object is present, but the object key name should start with the prefix `DYNAMIC_FB_CALL_VARIABLES`.
- `resolveAtRuntime` will invoked while executing the test case and will resolve the value of the `DYNAMIC_FB_CALL_VARIABLES.ACCOUNT.ACCOUNT_SESSION`.
- The validation content will be resolved to `null` from the `DYNAMIC_FB_CALL_VARIABLES.DEFAULTS.NULL` object.
