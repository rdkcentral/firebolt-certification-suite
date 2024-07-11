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


## '(.+)' invokes the '(.+)' API to '(.+)

### Purpose: send message to 3rd party app to make api call.

### Params:
| Param | Definition |
| --- | --- |
| appId | 3rd party app id |
| sdk | name of the sdk |
| key | key name of the request data. |

### Examples:
* `Given '3rd party app' invokes the 'Firebolt' API to 'get device id'`
* `Given 'test.test.test' invokes the 'Firebolt' API to 'get device id'`

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


## 1st party app invokes the '(.+)' API (?:'(.+)' )?to set '(.+)' to( invalid)? '(.+)'

### Purpose: Sending a message to platform to set a value

### Params:
| Param | Definition |
| --- | --- |
| sdk | sdk name |
| fireboltCallKey | key name passed to look for firebolt call object in fireboltCallData |
| attribute | The attribute we are setting (ex. fontFamily) |
| invalidValue | Determines whether expecting for an error or result |
| value | The value used by the set method to set the value (ex. monospaced_sanserif) |

### Examples:
* `Given '1st party app' invokes the 'Firebolt' API 'CLOSEDCAPTION_SETTINGS' to set 'enable' to 'true'`
* `Given '1st party app' invokes the 'Firebolt' API 'CLOSEDCAPTION_SETTINGS' to set 'enable' to invalid 'test'`
* `Given '1st party app' invokes the 'Firebolt' API to set 'enable' to 'true'`

## '(.+)' registers for the '(.*?)'(?: '(.*?)')? event

### Purpose: Sending a message to platform or app to register a event

### Params:
| Param | Definition |
| --- | --- |
| appId |app identtifier |
| sdk | sdk name |
| fireboltCallKey | key name passed to look for firebolt call object in fireboltCallData |

### Examples:
 * `And '1st party app' registers for the 'Firebolt' 'CLOSEDCAPTION_SETTINGS' event`
 * `And '3rd party app' registers for the 'Firebolt' 'CLOSEDCAPTION_SETTINGS' event`
 * `And '1st party app' registers for the 'Firebolt' event`

## '(.+)' invokes the '(.+)' get API(?: '(.+)')

### Purpose: Sending a message to platform or 3rd party app to get a value

### Params:
| Param | Definition |
| --- | --- |
| appId | app identifier. |
| sdk | sdk name |
| fireboltCallKey | key name passed to look for firebolt call object in fireboltCallData |

### Examples:
* `And '1st party app' invokes the 'Firebolt' get API 'CLOSEDCAPTION_SETTINGS'`
* `And '3rd party app' invokes the 'Firebolt' get API 'CLOSEDCAPTION_SETTINGS'`
* `And '3rd party app' invokes the 'Firebolt' get API`
* `And 'test_app' invokes the 'Firebolt' get API 'CLOSEDCAPTION_SETTINGS'`

## User triggers event with value as '(.+)'

### Purpose: sending message to platform to make post call to set event values.

### Params:
| Param | Definition |
| --- | --- |
| key |  key name of the event data |

### Examples:
* `And User triggers event with value as 'onNetworkChanged events with wifi connected'`
