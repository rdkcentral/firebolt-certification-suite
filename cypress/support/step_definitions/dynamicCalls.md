# Table of contents:
[DynamicCallsGlue](#dynamiccallsglue)
  - [Dynamic Firebolt Objects](#dynamic-firebolt-objects)
  - [we test the '(.+)' getters and setters(?: '(.*?)'(?: to '(.*?)')?)?](#we-test-the--getters-and-setters--to-)
    - [Examples](#examples)
    - [Params](#params)
  - [1st party app invokes the '(.+)' API to set( invalid)? value](#1st-party-app-invokes-the--api-to-set-invalid-value)
    - [Examples](#examples-1)
    - [Params](#params-1)
  - ['(.+)' invokes the '(.+)' get API](#-invokes-the--get-api)
    - [Examples](#examples-2)
    - [Params](#params-2)
  - ['(.+)' registers for the '(.+)' event](#-registers-for-the--event)
    - [Examples](#examples-3)
    - [Params](#params-3)
  - ['(.+)' platform responds to '(.+)' (get|set) API(?: with '(.+)')?](#-platform-responds-to--getset-api-with-)
    - [Examples](#examples-4)
    - [Params](#params-4)
  - ['(.+)' platform (triggers|does not trigger) '(.\*?)' event(?: with '(.+)')?](#-platform-triggersdoes-not-trigger--event-with-)
    - [Examples](#examples-5)
    - [Params](#params-5)

  


# DynamicCallsGlue

## Dynamic Firebolt Objects
Dynamic glue codes have to be used with dynamic objects. Details on dynamic objects here [link](../../fixtures/docs/dynamicObjects.md)

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

## 1st party app invokes the '(.+)' API to set( invalid)? value

#### Purpose: Sending a message to platform to set a value. Optional parameter: `invalid` can be used to specify whether to expect an error or a result.

### Examples:

- `Given 1st party app invokes the 'Firebolt' API to set`
- `Given 1st party app invokes the 'Firebolt' API to set invalid value`

### Params:

| **Param**          | **Definition**                                     |
| ------------------ | -------------------------------------------------- |
| **_sdk_**          | sdk name                                           |
| **_invalidValue_** | Determines whether an error or result is expected. |

**Note:** This glue step will work only if the fireboltCall object contains `setMethod` and `setParams` is a not required field, by default it will take an empty object.


## '(.+)' invokes the '(.+)' get API

#### Purpose: Sending a message to platform or 3rd party app to invoke an API and get the value.

### Examples:

- `And '1st party app' invokes the 'Firebolt' get API`
- `And '3rd party app' invokes the 'Firebolt' get API`
- `And 'test_app' invokes the 'Firebolt' get API`

### Params:

| **Param**   | **Definition**  |
| ----------- | --------------- |
| **_appId_** | app identifier. |
| **_sdk_**   | sdk name        |

**Note:** This glue step will work only if the fireboltCall object contains `method` and `params` is a not required field, by default it will take an empty object.

## '(.+)' registers for the '(.+)' event

#### Purpose: Sending a message to platform or third party app to start listening for an event.

### Examples:

- `And '3rd party app' registers for the 'Firebolt' event`
- `And '1st party app' registers for the 'Firebolt' event`

### Params:

| **Param**   | **Definition** |
| ----------- | -------------- |
| **_appId_** | app identifier |
| **_sdk_**   | sdk name       |

**Note:** This glue step will work only if the fireboltCall object contains `event` field.


## '(.+)' platform responds to '(.+)' (get|set) API(?: with '(.+)')?

#### Purpose: Validating that the get or set API response aligns with the expected response which will typically be configured by the dynamic object with a json path to validate.

### Examples:

- `And 'Firebolt' platform responds to '1st party app' get API`
- `And 'Firebolt' platform responds to '3rd party app' get API`
- `And 'Firebolt' platform responds to '1st party app' set API`
- `And 'Firebolt' platform responds to '1st party app' 'CLOSEDCAPTION_SETTINGS' set API with 'INVALID_TYPE_PARAMS'`

### Params:

| **Param**          | **Definition**                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| **_sdk_**          | name of the sdk                                                                                |
| **_appId_**        | app identifier                                                                                 |
| **_methodType_**   | Determines which method doing content validation Ex: set or get                                |
| **_errorContent_** | Doing error content validation when error content object key passed. Ex: 'INVALID_TYPE_PARAMS' |

**Note:** This glue step will work only when fireboltCall `setMethod` for set method validation and `method` for get method validation.

Below fields is not mandatory to add in the fireboltCall object, if not present default value will be used.
- setValidationJsonPath ---> 'result'
- setContent ---> null
- validationJsonPath ---> 'result'
- content ---> null

## '(.+)' platform (triggers|does not trigger) '(.\*?)' event(?: with '(.+)')?

#### Purpose: Validating the event response aligns with the expected response which will typically be configured by the dynamic object with a json path to validate.

### Examples:

- `And 'Firebolt' platform triggers '3rd party app' event`
- `And 'Firebolt' platform does not trigger '3rd party app' event`
- `And 'Firebolt' platform triggers '1st party app' event`
- `And 'Firebolt' platform triggers '1st party app' event with 'INVALID_TYPE_PARAMS'`

### Params:

| **Param**           | **Definition**                                                                                 |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| **_sdk_**           | sdk name                                                                                       |
| **_eventExpected_** | Determines whether the event is expected or not.                                               |
| **_appId_**         | app identifier                                                                                 |
| **_errorContent_**  | Doing error content validation when error content object key passed. Ex: 'INVALID_TYPE_PARAMS' |

**Note:** This glue step will work only when fireboltCall object having `event`, `eventValidationJsonPath` and `content` fields not present default value will be used.
- eventValidationJsonPath ---> 'eventResponse'
- content ---> null
