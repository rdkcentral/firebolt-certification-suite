# ValidationsGlue

## '(.+)' platform responds(:? to '(.+)')? with '(.+)'
### Purpose: Validating the response against source of truth.

### Params:
| Param | Definition |
| --- | --- |
| sdk | name of the sdk |
| appId | appId used to fetch the object to validate the content |
| key | key name of the firebolt data contains method/context/expected |

### Examples:
* `Given 'Firebolt' platform responds with 'Validate device id'`
* `Given 'Firebolt' platform responds to '1st party appt' with 'Validate device id'`
* `Given 'Firebolt' platform responds to 'test.test.test' with 'Validate device id'`

## User validates lifecycle history for '(.+)' with '(.+)'
### Purpose: Validating explicitly recorded lifecycle history against source of truth from feature.

### Params:
| Param | Definition |
| --- | --- |
| appCallSign | callSign of launched app |
| historyValidationList | source of truth for lifecycle history validation |

### Examples:
* `User validates lifecycle history for '1st party app' with 'background:foreground:background'`
* `User validates lifecycle history for '3rd party app' with 'background:foreground'`

## I '(start|stop)' performance metrics collection
### Purpose: To start or stop performance metrics service in device by passing appropriate intent to performance test handler

### Params:
| Param | Definition |
| --- | --- |
| action | start or stop |

### Examples:
 * `I 'start' performance metrics collection`
 * `I 'stop' performance metrics collection`