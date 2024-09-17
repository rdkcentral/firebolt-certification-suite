# Dynamic Objects (Only Supported in JS Objects)

FCS supports dynamic Firebolt JS objects to be used across multiple examples in a scenario outline. This is applicable for test cases where we can validate setter response, getter response, event response, etc. using a single JS object. More details are outlined below.

## Table of Contents:

- [Supported Dynamic Glue Codes](#supported-dynamic-glue-codes)
- [Firebolt object](#firebolt-object)
  - [Sample Firebolt Object Format](#sample-firebolt-object-format)
- [Supported types of validations](#supported-types-of-validations-here)
- [Runtime Variables](#runtime-variables)
- [ResolveAtRuntime Function](#resolveatruntime-function)
- [Usage](#usage)
- [Advanced Support](#advanced-support)

## Supported Dynamic Glue Codes

To use dynamic Firebolt objects, we need to use dynamic glue codes listed [here](../../support/step_definitions/dynamicCalls.md)

- we test the '(.+)' getters and setters(?: '(._?)'(?: to '(._?)')?)?
- 1st party app invokes the '(.+)' API to set( invalid)? value
- '(.+)' invokes the '(.+)' get API
- '(.+)' registers for the '(.+)' event
- '(.+)' platform responds to '(.+)' (get|set) API(?: with '(.+)')?
- '(.+)' platform (triggers|does not trigger) '(.\*?)' event(?: with '(.+)')?

## Firebolt object

- Firebolt objects can be added in JavaScript files located in the `cypress/fixtures/fireboltCalls` folder. Ex: `cypress/fixtures/fireboltCalls/accessibility.js`
- Firebolt objects present in the config module will take priority if the same key is present in FCS.

### A dynamic firebolt object

```javascript
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
| params                  | parameters of the method                                                                                  | {}                                            | string, number, array, object  |
| validationJsonPath      | Contains an array or string with the path of the response value that needs to be validated                | result.enabled                                | string or array                |
| setMethod               | The setter method name to make a call, associated with set test steps                                     | closedcaptions.setEnabled                     | string                         |
| setParams               | Parameters of the set method to set new value.                                                            | {value: true}                                 | string or object               |
| setValidationJsonPath   | Contains an array or string with the path of the response value that needs to be validated.               | result.enabled                                | string or array                |
| setContent              | Holds the source of truth to validate against the response of the set method.                             | null                                          | string, null, boolean or array |
| event                   | Name of the event to start listening for.                                                                 | accessibility.onClosedCaptionsSettingsChanged | string                         |
| eventValidationJsonPath | Contains an array or string with the path of the response value that needs to be validated for the event. | result.enabled                                | string or array                |
| content                 | Holds the source of truth to validate against the response of th get method or event.                     | true                                          | string, null, boolean or array |

**Note:**

- These are all the supported fields, but depending on the test scenario and glue code used, none of them are technically required.

## Supported types of validations [here](./validations.md)

## Runtime Variables

Runtime variables are used to store values from the feature file and use them in dynamic Firebolt objects for making API calls, API validation, event validation, etc.

Below are the runtime variables that are used by the FireboltCall object.

- **attribute:** Attribute is a field name of the `runtime` environment variable that holds the value of the method name. For example, if the method name is `closedCaptions.setEnabled`, the attribute value will be `enabled`.
- **value:** Value is a field name of the `runtime` environment variable that holds the value used for to set the value or for validation.

**Note:** `resolveAtRuntime()` function is used by the FireboltCall object in order to process runtime variables and other fields.

## ResolveAtRuntime Function

**ResolveAtRuntime** is a global function utilized by the JS files. This function is used to dynamically resolve values during test case execution. This function will replace variables in the FireboltCall object with the actual values from the `runtime` variable.

- **Input Types**: `resolveAtRuntime` accepts either a string or an array of strings as input.

  - **String Input with Pattern**: When a string contains the '{{' pattern (e.g., `resolveAtRuntime("manage_closedcaptions.set{{attribute}}")`), the function replaces the pattern with the actual value from the `runtime` environment variable.
  - **String Input without Pattern**: If the string does not contain the '{{' pattern (e.g., `resolveAtRuntime("value")`), the function directly returns the value from the `runtime` environment variable.
  - **Array of Strings**: When an array of strings is provided, the function iterates over each string, replacing the patterns with the actual values from the `runtime` environment variable.

- **Options:** The function has the support to accespts the optional parameter `uppercaseFirstChar` or `lowercaseFirstChar` to convert the first character of the resolved value to uppercase or lowercase. This parameter is separated by a dot from the attribute name. This parameter is used to convert the attribute value to the correct format for the method name. For example, `resolveAtRuntime('manage_closedcaptions.set{{attribute.uppercaseFirstChar}}')`.
- **Options:** The function supports optional parameters `uppercaseFirstChar` or `lowercaseFirstChar` to convert the first character of the resolved value to uppercase or lowercase. This parameter is separated by a dot from the attribute name.

  - `uppercaseFirstChar`

    - Converts the first character of the resolved value to uppercase.
    - Useful for formatting method names or any string where the first letter should be capitalized.
    - Example usage:
      ```javascript
      resolveAtRuntime('manage_closedcaptions.set{{attribute.uppercaseFirstChar}}');
      // If attribute is 'fontFamily', the result will be 'setFontFamily'
      ```

  - `lowercaseFirstChar`
    - Converts the first character of the resolved value to lowercase.
    - Useful for formatting method names or any string where the first letter should be in lowercase.
    - Example usage:
      ```javascript
      resolveAtRuntime('manage_closedcaptions.set{{attribute.lowercaseFirstChar}}');
      // If attribute is 'FontFamily', the result will be 'setfontFamily'
      ```

Usage of this function by dynamic Firebolt objects ensures that all necessary values are dynamically resolved during test case execution in the corresponding glue code.

### Examples:

Assuming the runtime environment variable has the below details:

```javascript
runtime = {
  attribute: 'fontSize',
  value: 1.5,
};
```

#### Example 1:

The example below shows how the `resolveAtRuntime` function works with input as an array of strings. The `resolveAtRuntime` function will loop through each string in the array and replace the pattern with the actual value from the `runtime` environment variable.

```
resolveAtRuntime(["result.{{attribute}}", "result.styles.{{attribute}}"])
returns: ['result.fontSize', 'result.styles.fontSize']
```

#### Example 2:

When the input is a string with the pattern `{{attribute.uppercaseFirstChar}}`, the function will replace the pattern with the actual value from the `runtime` environment variable and convert the first character of the resolved value to uppercase.

```
resolveAtRuntime("manage_closedcaptions.set{{attribute.uppercaseFirstChar}}")
returns: "manage_closedcaptions.setFontSize"
```

#### Example 3:

The `resolveAtRuntime` function will just return the value from the `runtime` environment variable when the input is a string without the pattern.

```
resolveAtRuntime("value")
returns: 1.5
```

## Usage

The dynamic calls Glues can be used in test cases along with FireboltCall dynamic objects.

### Below are examples illustrating various ways to utilize dynamic Firebolt objects and glue codes within test cases

#### Example 1:

**Firebolt object**
This object is used to test the setter and getter methods of the `accessibility.closedCaptionsSettings` API.

```javascript
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

In the below test case, fetching the Firebolt object `ACCESSIBILITY_CLOSEDCAPTIONS_SETTINGS` and storing it in the `runtime` environment variable. Using this object to make a call to validate the setter and getter methods along with the event.

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

The following test case demonstrates that multiple APIs can be written using the same Firebolt object.

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

This object is used to set new value to closed captions and validate the response.

```javascript
exports.CLOSED_CAPTIONS_SETTINGS = {
  setMethod: resolveAtRuntime('manage_closedcaptions.set{{attribute.uppercaseFirstChar}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
};
```

**Test case**
In the below testcase, fetching the firebolt object `CLOSED_CAPTIONS_SETTINGS` and storing it in `runtime` environment variable.

- Calling `closedCaptions.setEnabled` method with invalid value and validating the error response.

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

### Dynamic Firebolt Call Variables

Dynamic objects provides advanced support to create separate variables objects in JS and to create a common set of variables. Below are examples demonstrating this capability.

- Create a separate object in any JS file under the `cypress/fixtures/fireboltCalls` folder.
- The object key name should start with the prefix `DYNAMIC_FB_CALL_VARIABLES` as shown below.

```javascript
exports.DYNAMIC_FB_CALL_VARIABLES = {
  DEFAULTS: {
    CLOSEDCAPTIONS: {
      fontFamily: 'sanserif' || null,
    },
  },
};
```

- The above prefix is not limited to `DYNAMIC_FB_CALL_VARIABLES` additional prefixes can be added as per the requirement. New prefixes should be added to the `variableObjectsPrefixLists` environment variable. Overriding or adding new variables should be done via the config module.
- To use the above variables in the fireboltCall object, use the [`resolveAtRuntime`](#resolveatruntime-function) function as shown below.
  ```javascript
  resolveAtRuntime('DYNAMIC_FB_CALL_VARIABLES.DEFAULTS.CLOSEDCAPTIONS.fontFamily');
  ```
  The `resolveAtRuntime` function will treat the passed input as a path and will resolve the value of the `fontFamily` from the `DYNAMIC_FB_CALL_VARIABLES` object.

**Note:** This support will work only when input having prefix present in the `variableObjectsPrefixLists` environment variable. Ex: `DYNAMIC_FB_CALL_VARIABLES`.

#### Examples

##### Example 1: Calling account.session with parameters

- Create a firebolt object in `cypress/fixtures/fireboltCalls/account.js` with the following content:
  ```javascript
  exports.PUSH_SESSION_TOKENACCOUNT = {
    setMethod: 'manage_account.session',
    setParams: resolveAtRuntime('DYNAMIC_FB_CALL_VARIABLES.ACCOUNT.ACCOUNT_SESSION'),
    setContent: resolveAtRuntime('DYNAMIC_FB_CALL_VARIABLES.DEFAULTS.NULL'),
  };
  ```
- Define the variables object in `cypress/fixtures/fireboltCalls/account.js` with the following content:
  ```javascript
  exports.DYNAMIC_FB_CALL_VARIABLES = {
    ACCOUNT: {
      ACCOUNT_SESSION: {
        token: '',
        expiresIn: '',
      },
      NULL: null,
    },
  };
  ```
  Note: It is not mandatory to have the same file name. The variables object should be present in the same folder where the firebolt object is located or it should be overridden from the config module.
- `resolveAtRuntime` will invoked while executing the test case and will resolve the value of the `DYNAMIC_FB_CALL_VARIABLES.ACCOUNT.ACCOUNT_SESSION`.
- The validation content will be resolved to `null` from the `DYNAMIC_FB_CALL_VARIABLES.DEFAULTS.NULL` object.

### Overriding Firebolt Objects

Firebolt objects can be overridden from the config module or from the CLI command. Below are examples demonstrating this capability. Firebolt objects and dynamic variables in FCS can be overridden to provide custom configurations and values. This allows for flexibility and customization in your test scenarios. Here are examples of how to override firebolt objects and dynamic variables.

#### Overriding Firebolt Objects

Firebolt objects can be overridden by creating a new object with the same key name in the config module. The new object will be created with the same key name by doing deep merge with the default firebolt object. Here's an example:

```javascript
// Original firebolt object
exports.ACCESSIBILITY_CLOSEDCAPTIONS_SETTINGS = {
  setMethod: 'closedcaptions.setEnabled',
  setParams: { value: true },
  setValidationJsonPath: 'result.enabled',
  setContent: null,
};

// firebolt object from the config module
exports.ACCESSIBILITY_CLOSEDCAPTIONS_SETTINGS = {
  setMethod: 'closedcaptions.setEnabled',
  setParams: { value: false },
  setValidationJsonPath: 'result.enabled',
  setContent: null,
};
```

In the above example, the original firebolt object ACCESSIBILITY_CLOSEDCAPTIONS_SETTINGS is overridden with a new object that has different values for the setParams field.

#### Overriding Dynamic Variables

Dynamic variables can be overridden by creating a new object with the same key name in the config module. The new object will be created with the same key name by doing deep merge with the default dynamic variables object. Here's an example:

```javascript
// Original dynamic variable
exports.DYNAMIC_FB_CALL_VARIABLES = {
  ACCOUNT: {
    ACCOUNT_SESSION: {
      token: '',
      expiresIn: '',
    },
  },
  CONTENT: {
    DEVICE_ID: {
      data: [
        {
          type: 'fixture',
          validations: [
            {
              mode: 'staticContentValidation',
              type: 'true',
            },
          ],
        },
      ],
    },
  },
};

// dynamic variable from config module
exports.DYNAMIC_FB_CALL_VARIABLES = {
  ACCOUNT: {
    ACCOUNT_SESSION: {
      token: 'abc123',
      expiresIn: '3600',
    },
  },
  CONTENT: {
    DEVICE_ID: {
      data: [
        {
          type: 'fixture',
          validations: [
            {
              mode: 'deviceContentValidation',
              type: 'DEVICEID',
            },
          ],
        },
      ],
    },
  },
};
```
In the above example, 
- Account session token and expiresIn values are overridden with new values in the config module.
- The content of the DEVICE_ID object is overridden from staticContentValidation to deviceContentValidation in the config module.