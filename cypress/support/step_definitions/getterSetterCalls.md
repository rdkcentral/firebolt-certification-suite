# GetterSetterCallsGlue

## 1st party app invokes the '(.+)' API (?:'(.+)' )?to set '(.+)' to( invalid)? '(.+)'

### Purpose: Sending a message to platform to set a value

### Params:
| Param | Definition |
| --- | --- |
| sdk | sdk name |
| fireboltCallKey | key name passed to look for firebolt call object in fireboltCallData |
| attribute | The attribute we are setting (ex. fontFamily) |
| invalidValue | Determines whether an error or result is expected. |
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
| appId |app identifier |
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
  
## '(.+)' platform responds to '([^']*)'(?: '([^']*)')? (get|set) API(?: with '(.+)')?
### Purpose: Performing a validation against the source of truth for the given API response

### Params:
| Param | Definition |
| --- | --- |
| sdk | name of the sdk |
| appId | app identifier |
| fireboltCallKey | key name passed to look for firebolt call object in fireboltCallData Json |
| methodType | Determines which method doing content validation Ex: set or get |
| errorContent | Doing error content validation when error content object key passed. Ex: 'INVALID_TYPE_PARAMS' |

### Examples:
 * `And 'Firebolt' platform responds to '1st party app' 'CLOSEDCAPTION_SETTINGS' get API`
 * `And 'Firebolt' platform responds to '1st party app' 'CLOSEDCAPTION_SETTINGS' set API`
 * `And 'Firebolt' platform responds to '3rd party app' 'CLOSEDCAPTION_SETTINGS' get API`
 * `And 'Firebolt' platform responds to '1st party app' set API`
 * `And 'Firebolt' platform responds to '1st party app' 'CLOSEDCAPTION_SETTINGS' set API with 'INVALID_TYPE_PARAMS'`

## '(.+)' platform (triggers|does not trigger) '(.*?)'(?: '(.*?)')? event(?: with '(.+)')?

### Purpose: Performing a event validation against the source of truth

### Params:
| Param | Definition |
| --- | --- |
| sdk | sdk name |
| eventExpected | Determines whether the event is expected or not. |
| appId |app identifier |
| fireboltCallKey | key name passed to look for firebolt call object in fireboltCallData |
| errorContent | Doing error content validation when error content object key passed. Ex: 'INVALID_TYPE_PARAMS' |

### Examples:
 * `And 'Firebolt' platform triggers '1st party app' 'CLOSEDCAPTION_SETTINGS' event`
 * `And 'Firebolt' platform triggers '1st party app' event`
 * `And 'Firebolt' platform triggers '3rd party app' 'CLOSEDCAPTION_SETTINGS' event`
 * `And 'Firebolt' platform does not trigger '3rd party app' 'CLOSEDCAPTION_SETTINGS' event`
 * `And 'Firebolt' platform triggers '1st party app' event`
 * `And 'Firebolt' platform triggers '1st party app' 'CLOSEDCAPTION_SETTINGS' event with 'INVALID_TYPE_PARAMS'`

## '(.+)' platform responds to '([^']*)'(?: '([^']*)')? (get|set) API(?: with '(.+)')?
### Purpose: Performing a validation against the source of truth for the given API response

### Params:
| Param | Definition |
| --- | --- |
| sdk | name of the sdk |
| appId | app identifier |
| fireboltCallKey | key name passed to look for firebolt call object in fireboltCallData Json |
| methodType | Determines which method doing content validation Ex: set or get |
| errorContent | Doing error content validation when error content object key passed. Ex: 'INVALID_TYPE_PARAMS' |

### Examples:
 * `And 'Firebolt' platform responds to '1st party app' 'CLOSEDCAPTION_SETTINGS' get API`
 * `And 'Firebolt' platform responds to '1st party app' 'CLOSEDCAPTION_SETTINGS' set API`
 * `And 'Firebolt' platform responds to '3rd party app' 'CLOSEDCAPTION_SETTINGS' get API`
 * `And 'Firebolt' platform responds to '1st party app' set API`
 * `And 'Firebolt' platform responds to '1st party app' 'CLOSEDCAPTION_SETTINGS' set API with 'INVALID_TYPE_PARAMS'`

## '(.+)' platform (triggers|does not trigger) '(.*?)'(?: '(.*?)')? event(?: with '(.+)')?

### Purpose: Performing a event validation against the source of truth

### Params:
| Param | Definition |
| --- | --- |
| sdk | sdk name |
| eventExpected | Determines whether the event is expected or not. |
| appId |app identifier |
| fireboltCallKey | key name passed to look for firebolt call object in fireboltCallData |
| errorContent | Doing error content validation when error content object key passed. Ex: 'INVALID_TYPE_PARAMS' |

### Examples:
 * `And 'Firebolt' platform triggers '1st party app' 'CLOSEDCAPTION_SETTINGS' event`
 * `And 'Firebolt' platform triggers '1st party app' event`
 * `And 'Firebolt' platform triggers '3rd party app' 'CLOSEDCAPTION_SETTINGS' event`
 * `And 'Firebolt' platform does not trigger '3rd party app' 'CLOSEDCAPTION_SETTINGS' event`
 * `And 'Firebolt' platform triggers '1st party app' event`
 * `And 'Firebolt' platform triggers '1st party app' 'CLOSEDCAPTION_SETTINGS' event with 'INVALID_TYPE_PARAMS'`
