## 3rd party '(.+)' app is launched(?: with '(.+)' appId)?(?: with '(.+)' state)?$

### Purpose: Launch 3rd party app with additional classifier - firebolt certification app/ firebolt app and with optional parameters appId, application state

### Params:
| Param | Definition|
| --- | --- |
| appType | additional classifier for the app - Launch the certification app for certification validations. Launching a firebolt app for app certification |
| appCallSign | The appId used to launch the app which is identified by the firebolt platform servicing the request |
| state | lifecycle state of the application |

### Examples:
 * `Given 3rd party 'certification' app is launched`
 * `Given 3rd party 'firebolt' app is launched with 'foo' appId`
 * `Given 3rd party 'certification' app is launched and with 'foreground' state`
 * `Given 3rd party 'certification' app is launched with 'foo' appId with 'foreground' state`
 * `Given 3rd party 'certification' app is launched with 'foreground' state`
 * `Given 3rd party 'certification' app is launched with 'NullIntent' intent`
 * `Given 3rd party 'certification' app is launched with 'foo' appId with 'foreground' state with 'NullIntent' intent`

## {string} transitions to state {string}
### Purpose: Set state of 3rd party app as well as state inside appObject to use as source of truth

### Params:
| Param | Definition|
| --- | --- |
| app | appType |
| state | lifecycle state of the application to be set |

### Examples:
 * `When '3rd party app' transitions to state 'foreground'`
 
## AppObject state for {string} is set to {string}

### Purpose: Set appObject state of 3rd party app explicitly for validating as source of truth

### Params:
| Param | Definition|
| --- | --- |
| app | app type |
| state | state to be set in appObject |

### Examples:
 * `When AppObject state for '3rd party App' is set to 'foreground'`
  
## I send '([^']+)' voice command

### Purpose: Sends a voice command to the platform and validates the response.

### Params:
| Param | Definition|
| --- | --- |
| command | The voice command to be sent |

### Examples:
 * `When I send 'open settings' voice command'`