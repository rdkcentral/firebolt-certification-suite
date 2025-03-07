# Static JSON Objects

Firebolt Calls has two types of JSON objects: Firebolt Calls and Validation Objects. These objects are used to make API calls and validate the responses received from the API.

JSON objects are used in glue code listed [here](../../support/step_definitions/fireboltCalls.md).

## Table of Contents:

- [Firebolt Calls](#firebolt-calls)
  - [How to Configure Firebolt Calls](#how-to-configure-firebolt-calls)
- [Validation Objects](#validation-objects)
  - [How to Configure Validation Objects](#how-to-configure-validation-objects)
- [Usage](#usage)

## Firebolt Calls

Firebolt JSON objects represent a firebolt API call to be made. It can contain the following parameters:

| Field    | Required | Accepted values                                                                                                                                            | Default values   |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| method   | Y        | Firebolt method name in the format module.method                                                                                                           | No default value |
| params   | N        | Represent the parameters to be sent for the method                                                                                                         | {}               |
| context  | N        | Represent the data that needs to be stored in the API/event object that helps to search for a specific object which contains the response in a global list | {}               |
| expected | N        | Determine whether expecting for an error or result                                                                                                         | "result"         |

### How to Configure Firebolt Calls

- Define a firebolt call object in `cypress/fixtures/fireboltCalls/<fileName>.json`, where fileName can be any meaningful name.
- Add the method, params, context, and expected parameters to the firebolt call object.
- `params` is the data that needs to be sent in the API call. It can be a string, number, boolean, or an object. Params can be a string or object
  - If the params passed as a objects, it will be used as is in the API call.
  - If the params passed as a string, and these values are processed as below:
    - If the parameters is boolean, number, or any other type, and these values are used across features, then add them in the [defaultTestDataSet.json](../defaultTestData.json) file and use the key name in the params.
    - If want to pass complex parameters. Define the params inside the `cypress/fixtures/modules/<fileName>.json` file and use the key name in the params field.

### Example 1:

Creating a Firebolt call object in `cypress/fixtures/fireboltCalls/account.json` using the following object to perform an account.id API call.

```json
"FETCH_ACCOUNT_ID": {
  "method": "account.id"
}
```

### Example 2:

Creating a Firebolt call object in `cypress/fixtures/fireboltCalls/closedcaptions.json` using the following object to set closedCaptions to false. `FALSE` is a boolean value and it is present in the [defaultTestData.json](../defaultTestData.json) file.

```json
"DISABLE_CLOSEDCAPTIONS":{
  "method": "manage_closedcaptions.setEnabled",
  "params": "FALSE"
}
```

---> "FALSE" must be present in the [defaultTestData.json](../defaultTestData.json) file.

### Example 3:

Creating a Firebolt call object to set the font family to monospaced sanserif. `ACCESSIBILITY_FONTFAMILY_MONOSPACE` is a object key name and it is present in the `cypress/fixtures/modules/accessibility.json` file.

```json
"SET_FONTFAMILY_TO_MONOSPACED_SANSERIF": {
  "method": "manage_closedcaptions.setFontFamily",
  "params": "ACCESSIBILITY_FONTFAMILY_MONOSPACE"
}
```

## Validation Objects

Validation object is used to validate the response received from the API. It contains the following parameters:

- method/event - Name of the API or event, which is used to extract the response object from the global list for content validation
- validationJsonPath - Path to the value in the response that needs to be validated.
- context - Represent the data that needs to be used to search for a specific object in the global list
- content - The Validation content object that holds the source of truth for the validation
- expectingError - Determines whether we are performing result or error content validation

| Field              | Required | Accepted values                                                                                                    | Default values                               |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| method/event       | Y        | Name of the API or event, which is used to extract the response object from the global list for content validation | No default value                             |
| validationJsonPath | N        | Path to the value in the response that needs to be validated                                                       | result(for method)/ eventResponse(for event) |
| context            | N        | Represent the data that needs to be used to search for a specific object in the global list                        | {}                                           |
| content            | N        | The Validation content object that holds the source of truth for the validation                                    | {}                                           |
| expectingError     | N        | Determines whether we are performing result or error content validation                                            | False                                        |

### How to Configure Validation Objects

- Define a validation object in `cypress/fixtures/fireboltCalls/<fileName>.json`, where fileName can be any name.
- Add the method or event name, validationJsonPath, context, content and expectingError parameters to the validation object. validationJsonPath, context, content, and expectingError are optional parameters. By default, they are set to below values:
  - validationJsonPath: "result"
  - context: {}
  - content: null
  - expectingError: false
- `content` is the expected value used for validating against a Firebolt API response. Content can only be a string and below are the different types of adding the content:
  - Pass the expected value directly as a string, for example, "true" or "1234" etc.
  - If the expected value is boolean, number, or any other type, and these values are used across features, then add them in the [defaultTestDataSet.json](../defaultTestData.json) file and use the key name in the content.
  - If want to do different kind of validations like regEx, decode etc. Define the validation object inside the `cypress/fixtures/objects/validationObjects/<fileName>.json` file and use the key name in the content.
  - Differnt types of validations are documented [here](./validations.md)

### Example 1:

Validation object to validate the account.id API response as '1234'.

```json
"ACCOUNT_ID": {
  "method": "account.id",
  "validationJsonPath": "result",
  "content": "1234"
}
```

### Example 2:

Validation object to validate the closedCaptionsSettings API response as false. `FALSE` value is a boolean and it is present in the [defaultTestData.json](../defaultTestData.json) file.

```json
"CLOSEDCAPTIONS_SETTINGS": {
  "method": "accessibility.closedCaptionsSettings",
  "validationJsonPath": "result.enabled",
  "content": "FALSE"
}
```

### Example 3:

Validation object to validate the authentication token API response. `AUTHENTICATION_DECODE_JWT_AUTHENTICATION_TOKEN` is a object key name and it is present in the `cypress/fixtures/objects/validationObjects/authentication.json` file. `AUTHENTICATION_DECODE_JWT_AUTHENTICATION_TOKEN` is split into two parts `AUTHENTICATION` and `DECODE_JWT_AUTHENTICATION_TOKEN`. `AUTHENTICATION` refers to the file name and `DECODE_JWT_AUTHENTICATION_TOKEN` refers to the object key name present inside the `authentication.json` file.

```json
"PLATFORM_AUTHENTICATION_TOKEN": {
  "method": "authentication.token",
  "validationJsonPath": "result",
  "content": "AUTHENTICATION_DECODE_JWT_AUTHENTICATION_TOKEN"
}
```

## Usage:

**Example 1:** How to make a `accessibility.closedCaptionsSettings` call

- Create a firebolt call object in `cypress/fixtures/fireboltCalls/accessibility.json` with the below content:
  ```json
  "GET_CLOSED_CAPTIONS_SETTINGS": {
    "method": "accessibility.closedCaptionsSettings"
  }
  ```
- Use the key name `GET_CLOSED_CAPTIONS_SETTINGS` as is or convert it to `get closedCaptions settings` in the API call glue step in the feature file as shown below:
  ```
  And '3rd party app' invokes the 'Firebolt' API to 'get closedCaptions settings'
  ```
- The glue code will look for the key name `GET_CLOSED_CAPTIONS_SETTINGS` in the fireboltCalls JSON file and make the API call `accessibility.closedCaptionsSettings`.
- The response object will be stored in the global list with the method name `accessibility.closedCaptionsSettings` and can be used for content validation.
- Create a validation object in `cypress/fixtures/fireboltCalls/accessibility.json` with the below content:
  ```json
  "CLOSEDCAPTIONS_SETTINGS": {
    "method": "accessibility.closedCaptionsSettings",
    "validationJsonPath": "result.enabled",
    "content": "FALSE"
  }
  ```
- Use the key name `CLOSEDCAPTIONS_SETTINGS` as is or convert it to `closedCaptions settings` in the validation glue step in the feature file as shown below:
  ```
  Then 'Firebolt' platform responds with 'closedCaptions settings'
  ```
- The glue code will look for the key name `CLOSEDCAPTIONS_SETTINGS` in the fireboltCalls JSON file and validate the response object with the content `FALSE`.
