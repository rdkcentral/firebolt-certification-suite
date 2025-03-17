# JS Objects

## Table of Contents:

- [Firebolt Calls](#firebolt-calls)
  - [How to Configure Firebolt Calls](#how-to-configure-firebolt-calls)
- [Validation Objects](#validation-objects)
  - [How to Configure Validation Objects](#how-to-configure-validation-objects)
- [Usage](#usage)
- [Advanced Support](#advanced-support)

There are two types of JSON objects used in test cases. One is for making Firebolt calls to the device, and the second is for validating the response of the call.

## Firebolt Calls

A Firebolt object is used to make an API call. It contains the following parameters:

- method - Name of the API to make an API call
- params - Represents the parameters to be sent for a Firebolt call
- context - Represents the data that needs to be stored in the API/event object that helps to search for a specific object which contains the response in a global list
- expected - Determines whether expecting an error or result

### How to Configure Firebolt Calls

- Define a Firebolt call object in `cypress/fixtures/fireboltCalls/<fileName>.js`, where fileName can be any name.
- Add the method, params, context, and expected parameters to the Firebolt call object. Params, context, and expected are optional parameters. By default, they are set to the below values:
  - params: {}
  - context: {}
  - expected: "result"
- Params can be an object and present in JS files themselves.

### Example 1:

```javascript
exports.FETCH_ACCOUNT_ID = {
  method: 'account.id',
};
```

### Example 2:

```javascript
exports.DISABLE_CLOSEDCAPTIONS = {
  method: 'manage_closedcaptions.setEnabled',
  params: { value: false },
};
```

## Validation Objects

A Validation object is used to validate the response received from the API. It contains the following parameters:

- method/event - Name of the API or event, which is used to extract the response object from the global list for content validation
- validationJsonPath - Path to the value in the response that needs to be validated
- context - Represents the data that needs to be used to search for a specific object in the global list
- content - The validation content object that holds the source of truth for the validation
- expectingError - Determines whether we are performing result or error content validation

### How to Configure Validation Objects

- Define a validation object in `cypress/fixtures/fireboltCalls/<fileName>.js`, where fileName can be any name.
- Add the method or event name, validationJsonPath, context, content, and expectingError parameters to the validation object. validationJsonPath, context, content, and expectingError are optional parameters. By default, they are set to the below values:
  - validationJsonPath: "result"
  - context: {}
  - content: null
  - expectingError: false
- `content` is the expected value used for validating against a Firebolt API response. Content can only be a string, and below are the different types of adding the content:
  - Pass the expected value directly as a string, for example, "true" or "1234" etc.
  - If you want to do different kinds of validations like regEx, decode, etc., define the validation object content as mentioned in [Supported Validation Types](./validations.md).

### Example 1:

```javascript
exports.ACCOUNT_ID: {
  method: "account.id",
  validationJsonPath: "result",
  content: "1234"
}
```

### Example 2:

```javascript
exports.CLOSEDCAPTIONS_SETTINGS = {
  method: 'accessibility.closedCaptionsSettings',
  validationJsonPath: 'result.enabled',
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: true,
          },
        ],
      },
    ],
  },
};
```

## Usage:

**Example 1:** How to make a `accessibility.closedCaptionsSettings` call and validate the response.

- Create a firebolt call object in `cypress/fixtures/fireboltCalls/accessibility.js` with the below content:
  ```javascript
  exports.GET_CLOSED_CAPTIONS_SETTINGS: {
    method: "accessibility.closedCaptionsSettings"
  }
  ```
- Use the key name `GET_CLOSED_CAPTIONS_SETTINGS` as is or convert it to `get closedCaptions settings` in the API call glue step in the feature file as shown below:
  ```
  And '3rd party app' invokes the 'Firebolt' API to 'get closedCaptions settings'
  ```
- The glue code will look for the key name `GET_CLOSED_CAPTIONS_SETTINGS` in the fireboltCalls JSON file and make the API call `accessibility.closedCaptionsSettings`.
- The response object will be stored in the global list with the method name `accessibility.closedCaptionsSettings` and can be used for content validation.
- Create a validation object in `cypress/fixtures/fireboltCalls/accessibility.js` with the below content:
  ```javascript
  exports.CLOSEDCAPTIONS_SETTINGS: {
    method: "accessibility.closedCaptionsSettings",
    validationJsonPath: "result.enabled",
    content: true
  }
  ```

## Advanced Support

### Creating Separate VARIABLES in JS Config:

Static objects can contain a common set of parameters or content that can be used in another file. Creating a common set of variables in a separate configuration file or in the same file and using them in Firebolt objects will help to maintain data consistency.

To create a common set of variables, follow the below steps:

1. Creating a common set of objects and using it in same file:

   In the below example, the `staticData` object is created to hold common parameters that can be reused accross `accessibility.js` file.

   **Example 1:**

   ```javascript
   const staticData = {
     enable: { value: true },
   };

   // Below object present in cypress/fixtures/fireboltCalls/accessibility.js
   exports.CLOSEDCAPTIONS_SETTINGS = {
     method: 'accessibility.closedCaptionsSettings',
     params: staticData.enable,
     validationJsonPath: 'result.enabled',
     content: true,
   };
   ```

   **Example 2:**

   ```javascript
   exports.staticData = {
     enable: { value: true },
   };

   // Below object present in cypress/fixtures/fireboltCalls/accessibility.js
   exports.CLOSEDCAPTIONS_SETTINGS = {
     method: 'accessibility.closedCaptionsSettings',
     params: this.staticData.enable,
     validationJsonPath: 'result.enabled',
     content: true,
   };
   ```

2. Creating a common set of objects in a separate configuration file:

   In the below example, the `staticData` object is created in a separate file and imported into the `accessibility.js` file.

   **Example 1:**

   ```javascript
   // In cypress/fixtures/fireboltCalls/staticData.js
   exports.staticData = {
     enable: { value: true },
   };
   ```

   ```javascript
   // In cypress/fixtures/fireboltCalls/accessibility.js
   const staticData = require('./staticData').staticData;

   exports.CLOSEDCAPTIONS_SETTINGS = {
     method: 'accessibility.closedCaptionsSettings',
     params: staticData.enable,
     validationJsonPath: 'result.enabled',
     content: true,
   };
   ```
