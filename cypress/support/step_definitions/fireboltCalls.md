# FireboltCallsGlue

## 1st party app invokes the '(.+)' API to '(.+)'

### Purpose: send message to platform to make api call.

### Params:
| Param | Definition |
| --- | --- |
| sdk | name of the sdk |
| key | key name of the request data. |

### Examples:
* `Given 1st party app invokes the 'Firebolt' API to 'get device id'`
* `Given 1st party app invokes the API to 'get device id'`


## '(.+)' invokes the '(.+)' API to '(.+)'(?: on '(.+)' device)?

### Purpose: send message to 3rd party app to make api call.

### Params:
| Param | Definition |
| --- | --- |
| appId | 3rd party app id |
| sdk | name of the sdk |
| key | key name of the request data. |
| deviceIdentifier | Contains environment variable name which is having device mac. |

### Examples:
* `Given '3rd party app' invokes the 'Firebolt' API to 'get device id'`
* `Given 'test.test.test' invokes the 'Firebolt' API to 'get device id'`
* `Given 'secondary 3rd party app' invokes the 'Firebolt' API to 'get device id'`
* `Given '3rd party app' invokes the 'Firebolt' API to 'get device id' on 'device1' device`
   - This should launch the default 3rd party app on device1(this is same as default device) and then call the device.id api
* `Given 'Secondary 3rd party app' invokes the 'Firebolt' API to 'get device id' on 'device2' device`
  - This should launch the secondarty 3rd party app on device2 and then call the device.id api
* `Given 'appId' invokes the 'Firebolt' API to 'get device id' on 'device2' device`
  - This should launch the app with the appId specified on device2 and then call the device.id api
*  `Given 'Secondary 3rd party app' invokes the 'Firebolt' API to 'get device id'`
  - If device identifier is not present, there is no need for a launch. It will just need to invoke the api

## '(.+)' registers for the '(.+)' event using the '(.+)' API

### Purpose: send message to 3rd party app to register the events.

### Params:
| Param | Definition |
| --- | --- |
| appId | 3rd party app id |
| sdk | name of the sdk |
| key | key name of the firebolt data contains method/param/context. |

### Examples:
* `Given '3rd party app' registers for the 'Closed Captions Settings' event using the 'Firebolt' API`
* `Given 'test.test.test' registers for the 'Closed Captions Settings' event using the 'Firebolt' API`

## 1st party app registers for the '(.+)' event using the '(.+)' API

### Purpose: send message to platform to register the events.

### Params:
| Param | Definition |
| --- | --- |
| sdk | name of the sdk |
| key | key name of the firebolt data contains method/param/context. |

### Examples:
* `Given 1st party app registers for the 'Closed Captioning Changed' event using the 'Firebolt' API`

## I clear '(.+)' listeners

### Purpose: sending message to platform/third party App to clear event listener.

### Params:
| Param | Definition |
| --- | --- |
| sdk | key name of the data contains event name and required parameter. |

Note: Key name value is an object and it can contains data as below
| Field | Definition |
| --- | --- |
| event | name of the event |
| firstParty | Ensure that the value is set to true when sending messages to the platform, otherwise, it should be set to false for third party app |
| appId | When firstParty is false, we need to specify the app ID. If not, it will take the default app ID |

### Examples:
* `And I clear 'clear accessibility.onClosedCaptionsSettingsChanged' listeners`
