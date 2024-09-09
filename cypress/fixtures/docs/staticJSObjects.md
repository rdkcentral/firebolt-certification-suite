# Table of contents: 
[JS Objects](#js-objects)
 - [Firebolt Calls](#firebolt-calls)
   - [How to Configure Firebolt Calls](#how-to-configure-firebolt-calls)
   - [Example 1](#example-1)
   - [Example 2](#example-2)
 - [Validation Objects](#validation-objects)
   - [How to Configure Validation Objects](#how-to-configure-validation-objects)
   - [Example 1](#example-1-1)
   - [Example 2](#example-2-1)
- [Usage](#usage)
- [Advanced Support](#advanced-support)

## JS Objects

There are 2 types of JSON objects used in test cases. One is for making firebolt calls to the device and second is for validating the response of the call.

### Firebolt Calls

Firebolt object is used to make an API call. It contains the following parameters:

- method - Name of the API to make an API call
- params - Represent the parameters to be sent for a Firebolt call
- context - Represent the data that needs to be stored in the API/event object that helps to search for a specific object which contains the response in a global list
- expected - Determine whether expecting for an error or result

#### How to Configure Firebolt Calls

- Define a firebolt call object in `cypress/fixtures/fireboltCalls/<fileName>.js`, where fileName can be any name.
- Add the method, params, context, and expected parameters to the firebolt call object. params, context, and expected are optional parameters. By default, they are set to below values:
  - params: {}
  - context: {}
  - expected: "result"
- params can be a object and present in JS files itself.

#### Example 1:

```
"FETCH_ACCOUNT_ID": {
  "method": "account.id"
}
```

#### Example 2:

```
"DISABLE_CLOSEDCAPTIONS":{
   "method": "manage_closedcaptions.setEnabled",
   "params": { "value": false }
}
```

### Validation Objects

Validation object is used to validate the response received from the API. It contains the following parameters:

- method/event - Name of the API or event, which is used to extract the response object from the global list for content validation
- validationJsonPath - Path to the value in the response that needs to be validated.
- context - Represent the data that needs to be used to search for a specific object in the global list
- content - The Validation content object that holds the source of truth for the validation
- expectingError - Determines whether we are performing result or error content validation

#### How to Configure Validation Objects

- Define a validation object in `cypress/fixtures/fireboltCalls/<fileName>.js`, where fileName can be any name.
- Add the method or event name, validationJsonPath, context, content and expectingError parameters to the validation object. validationJsonPath, context, content, and expectingError are optional parameters. By default, they are set to below values:
  - validationJsonPath: "result"
  - context: {}
  - content: null
  - expectingError: false
- `content` is the expected value used for validating against a Firebolt API response. Content can only be a string and below are the different types of adding the content:
  - Pass the expected value directly as a string, for example, "true" or "1234" etc.
  - If want to do different kind of validations like regEx, decode etc. Define the validation object coneten as mentioned in [Supported Validation Types](./validations.md).

#### Example 1:

```
"ACCOUNT_ID": {
    "method": "account.id",
    "validationJsonPath": "result",
    "content": "1234"
}
```

#### Example 2:

```
"CLOSEDCAPTIONS_SETTINGS": {
   "method": "accessibility.closedCaptionsSettings",
   "validationJsonPath": "result.enabled",
   "content": {
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
}
```

### Usage:

**Example 1:** How to make a `accessibility.closedCaptionsSettings` call and validate the response.

- Create a firebolt call object in `cypress/fixtures/fireboltCalls/accessibility.js` with the below content:
  ```
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
  ```
   exports.CLOSEDCAPTIONS_SETTINGS: {
       method: "accessibility.closedCaptionsSettings",
       validationJsonPath: "result.enabled",
       content: true
   }
  ```

### Advanced Support

1. **Creating Separate VARIABLES in JS Config:**
   C

2. **Creating Common Set of VARIABLES:**
   Demonstrates how to create a common set of VARIABLES to be used throughout all JS config files.
