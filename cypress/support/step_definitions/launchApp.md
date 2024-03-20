## '(3rd party app|1st party app)' is in'(.+)' state

### Purpose: Move App to specified state 

### Params:
| Param | Definition|
| --- | --- |
| app | app type |
| state | state to be set in app |


### Examples:
* `Given '3rd party app' is in 'inactive' state`
* `Given '1st party app' is in 'background' state`
* `Given 'test.test.test' is in 'background' state`

## 3rd party '(.+)' app is launched(?: with( '(.+)' appId and '(.+)' state))?$

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
 * `Given 3rd party 'certification' app is launched with 'foo' appId and with 'foreground' state`

## {string} attempts to transition to app state {string}
### Purpose: Set state of 3rd party app as well as state inside appObject to use as source of truth

### Params:
| Param | Definition|
| --- | --- |
| app | appType |
| state | lifecycle state of the application to be set |

### Examples:
 * `When '3rd party app' attempts to transition to app state 'foreground'`
