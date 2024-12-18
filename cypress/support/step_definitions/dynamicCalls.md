# Dynamic Calls Glue

## Table of Contents:
  - [Dynamic Firebolt Objects](#dynamic-firebolt-objects)
  - [1st party app(?: invokes the '(.+)' API)? to set(?: '(.*?)' to( invalid)? '(.*?)'|( invalid)? value)?](#1st-party-app-invokes-the--api-to-set-invalid-value)
  - ['(.+)' invokes(?: the '(.+)')? get API](#-invokes-the--get-api)
  - ['(.+)' registers for(?: the '(.+)')? event](#-registers-for-the--event)
  - ['(.+)' platform responds to '(.+)' (get|set) API(?: with '(.+)'| with '(.+)')?](#-platform-responds-to--getset-api-with-)
  - ['(.+)' platform (triggers|does not trigger) '(.*?)' event(?: with '(.+)'| with '(.+)')?](#-platform-triggersdoes-not-trigger--event-with-)
  - ['(.+)' on '(.+)' page](#-on--page)


## Dynamic Firebolt Objects
Dynamic glue codes have to be used with dynamic objects. Details on dynamic objects [here](../../fixtures/docs/dynamicObjects.md)

## we test the '(.+)' getters and setters(?: '(.*?)'(?: to '(.*?)')?)?
#### Purpose: Extracting the fireboltCall object based on the key name and storing it in a `runtime` environment variable along with the attribute and value.

**Note:** This glue is mandatory to add in the testcase before using any other dynamic runtime steps.

### Examples:

- `Given we test the 'CLOSED_CAPTIONS' getters and setters`
- `Given we test the 'CLOSED_CAPTIONS' getters and setters 'enabled' to 'true'`

### Params:

| **_Param_**     | **Definition**                                                              |
| --------------- | --------------------------------------------------------------------------- |
| **_key_**       | key name of the fireboltCall setter/getter data.                            |
| **_attribute_** | The attribute to which the value is going to be set (ex. fontFamily).       |
| **_value_**     | The value used by the set method to set the value (ex. monospaced_sanserif) |

**Format:** Runtime environment variable having the format as shown below

```
runtime: {
 fireboltCall: {}
 attribute: '',
 value: '',
}
```

## 1st party app(?: invokes the '(.+)' API)? to set(?: '(.*?)' to( invalid)? '(.*?)'|( invalid)? value)?

#### Purpose: Sending a message to platform to set a value. Optional parameter: `invalid` can be used to specify whether to expect an error or a result.

### Examples:
- `Given 1st party app invokes the 'Firebolt' API to set invalid value`
- `Given 1st party app invokes the 'Firebolt' API to set 'enabled' to 'true'`
- `Given 1st party app to set 'enabled' to 'true'`
 
*Note: The below formats will be deprecated in the future:*
- `Given 1st party app invokes the 'Firebolt' API to set value`
- `Given 1st party app to set value`

### Params:

| **Param**           | **Definition**                                                    |
| ------------------  | --------------------------------------------------                |
| **_sdk_**           | sdk name                                                          |
| **_attribute_**     | attribute holds the value of the method name                      |
| **_invalidValue_**  | Determines whether expecting for an error or result.              |
| **_value_**         | value holds the value used for to set the value or for validation |
| **_invalidValue1_** | Determines whether expecting for an error or result.              |

**Note:** This glue step will work only if the fireboltCall object contains `setMethod` and `setParams` is a not required field, by default it will take an empty object.


## '(.+)' invokes(?: the '(.+)')? get API

#### Purpose: Sending a message to platform or 3rd party app to invoke an API and get the value.

### Examples:

- `And '1st party app' invokes the 'Firebolt' get API`
- `And '3rd party app' invokes the 'Firebolt' get API`
- `And 'test_app' invokes the 'Firebolt' get API`
- `And '1st party app' invokes get API`

### Params:

| **Param**   | **Definition**  |
| ----------- | --------------- |
| **_appId_** | app identifier. |
| **_sdk_**   | sdk name        |

**Note:** This glue step will work only if the fireboltCall object contains `method` and `params` is a not required field, by default it will take an empty object.

## '(.+)' registers for(?: the '(.+)')? event

#### Purpose: Sending a message to platform or third party app to start listening for an event.

### Examples:

- `And '3rd party app' registers for the 'Firebolt' event`
- `And '1st party app' registers for the 'Firebolt' event`
- `And '1st party app' registers for event`

### Params:

| **Param**   | **Definition** |
| ----------- | -------------- |
| **_appId_** | app identifier |
| **_sdk_**   | sdk name       |

**Note:** This glue step will work only if the fireboltCall object contains `event` field.


## '(.+)' platform responds to '(.+)' (get|set) API(?: with '(.+)'| with '(.+)')?

#### Purpose: Validating that the get or set API response aligns with the expected response which will typically be configured by the dynamic object with a json path to validate.

### Examples:
- `And 'Firebolt' platform responds to '1st party app' get API`
- `And 'Firebolt' platform responds to '1st party app' set API`
- `And 'Firebolt' platform responds to '3rd party app' get API`
- `And 'Firebolt' platform responds to '1st party app' set API with 'INVALID_PARAMS'`
- `And 'Firebolt' platform responds to '3rd party app' get API with 'true'`

### Params:

| **Param**          | **Definition**                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| **_sdk_**          | name of the sdk                                                                                |
| **_appId_**        | app identifier                                                                                 |
| **_methodType_**   | Determines which method doing content validation Ex: set or get                                |
| **_content_**     | Optional parameter to pass the content to validate the response.    |
| **_errorContent_** | Doing error content validation when error content object key passed. Ex: 'INVALID_PARAMS' |

**Note:** This glue step will work only when fireboltCall `setMethod` for set method validation and `method` for get method validation.

Below fields is not mandatory to add in the fireboltCall object, if not present default value will be used.
- setValidationJsonPath ---> 'result'
- setContent ---> null
- validationJsonPath ---> 'result'
- content ---> null

## '(.+)' platform (triggers|does not trigger) '(.*?)' event(?: with '(.+)'| with '(.+)')?

#### Purpose: Validating the event response aligns with the expected response which will typically be configured by the dynamic object with a json path to validate.

### Examples:
- `And 'Firebolt' platform triggers '1st party app' event`
- `And 'Firebolt' platform triggers '3rd party app' event`
- `And 'Firebolt' platform does not trigger '3rd party app' event`
- `And 'Firebolt' platform triggers '1st party app' event with 'INVALID_PARAMS'`
- `And 'Firebolt' platform triggers '1st party app' event with 'true'`

### Params:

| **Param**           | **Definition**                                                                                 |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| **_sdk_**           | sdk name                                                                                       |
| **_eventExpected_** | Determines whether the event is expected or not.                                               |
| **_appId_**         | app identifier                                                                                 |
| **_content_**     | Optional parameter to pass the content to validate the response.    |
| **_errorContent_**  | Doing error content validation when error content object key passed. Ex: 'INVALID_PARAMS' |

**Note:** This glue step will work only when fireboltCall object having `event`, `eventValidationJsonPath` and `content` fields not present default value will be used.
- eventValidationJsonPath ---> 'eventResponse'
- content ---> null


## '(.+)' on '(.+)' page

#### Purpose: Function to do event and screenshot validation for the given page.

### Examples:

- `Then 'third party app is launched' on 'auth' page`

### Params:

| **Param**           | **Definition**                                                                                 |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| **_sdk_**           | sdk name                                                                                       |
| **_eventExpected_** | Firebolt object key name.                                          |
| **_page_**         | Name of the page where the screenshot is taken.                     |

**Note:** This glue step will work only if the fireboltCall object contains `event`, `validationJsonPath` and `content`..