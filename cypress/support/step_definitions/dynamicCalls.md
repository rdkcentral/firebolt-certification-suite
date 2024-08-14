# DynamicCallsGlue

## we test the '(.+)' getters and setters(?: '(.*?)'(?: to '(.*?)')?)?
- Extracting the fireboltCall object based on the key provided from the testcase. This object is saving in to the `runtime` environment variable along with `attribute` and `value`.

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

**Purpose:** Sending a message to platform to set a value and `invalid` is a optional parameter that specify whether to expect for an error or a result.

### Params:

| **Param**          | **Definition**                                     |
| ------------------ | -------------------------------------------------- |
| **_sdk_**          | sdk name                                           |
| **_invalidValue_** | Determines whether an error or result is expected. |

**Note:** This glue step will work only if the fireboltCall object contains `setMethod` and `setParams` fields.

### Examples:

- `Given 1st party app invokes the 'Firebolt' API to set`
- `Given 1st party app invokes the 'Firebolt' API to set invalid value`

## '(.+)' invokes the '(.+)' get API

**Purpose:** Sending a message to platform or 3rd party app to invoke an API and get the value.

### Params:

| **Param**   | **Definition**  |
| ----------- | --------------- |
| **_appId_** | app identifier. |
| **_sdk_**   | sdk name        |

**Note:** This glue step will work only if the fireboltCall object contains `method` and `params` fields.

### Examples:

- `And '1st party app' invokes the 'Firebolt' get API`
- `And '3rd party app' invokes the 'Firebolt' get API`
- `And 'test_app' invokes the 'Firebolt' get API`

## '(.+)' registers for the '(.+)' event

**Purpose:** Sending a message to platform or third party app to start listening for an event.

### Params:

| **Param**   | **Definition** |
| ----------- | -------------- |
| **_appId_** | app identifier |
| **_sdk_**   | sdk name       |

**Note:** This glue step will work only if the fireboltCall object contains `event` field.

### Examples:

- `And '3rd party app' registers for the 'Firebolt' event`
- `And '1st party app' registers for the 'Firebolt' event`

## '(.+)' platform responds to '(.+)' (get|set) API(?: with '(.+)')?

**Purpose:** Performing a validation against the source of truth for the given API response

### Params:

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

### Examples:

- `And 'Firebolt' platform responds to '1st party app' get API`
- `And 'Firebolt' platform responds to '3rd party app' get API`
- `And 'Firebolt' platform responds to '1st party app' set API`
- `And 'Firebolt' platform responds to '1st party app' 'CLOSEDCAPTION_SETTINGS' set API with 'INVALID_TYPE_PARAMS'`

## '(.+)' platform (triggers|does not trigger) '(.\*?)' event(?: with '(.+)')?

**Purpose:** Performing a event validation against the source of truth

### Params:

| **Param**           | **Definition**                                                                                 |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| **_sdk_**           | sdk name                                                                                       |
| **_eventExpected_** | Determines whether the event is expected or not.                                               |
| **_appId_**         | app identifier                                                                                 |
| **_errorContent_**  | Doing error content validation when error content object key passed. Ex: 'INVALID_TYPE_PARAMS' |

**Note:** This glue step will work only when fireboltCall object having `event`, `eventValidationJsonPath` and `content` fields. Event name is enough while doing error content validation.

### Examples:

- `And 'Firebolt' platform triggers '3rd party app' event`
- `And 'Firebolt' platform does not trigger '3rd party app' event`
- `And 'Firebolt' platform triggers '1st party app' event`
- `And 'Firebolt' platform triggers '1st party app' event with 'INVALID_TYPE_PARAMS'`
