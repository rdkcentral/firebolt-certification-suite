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
* `Given 'Firebolt' platform responds for 'Validate device id'`
* `Given 'Firebolt' platform responds to '1st party appt' for 'Validate device id'`
* `Given 'Firebolt' platform responds to 'test.test.test' for 'Validate device id'`

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

## Metrics collection process is '(initiated|stopped)'
### Purpose: To start or stop performance metrics service in device by passing appropriate intent to performance test handler

### Params:
| Param | Definition |
| --- | --- |
| action | initiated or stopped |

### Examples:
 * `Given Metrics collection process is 'inititated'`
 * `Given Metrics collection process is 'stopped'`

## (device|process|all) (memory|load|set size|required) consumption should be within the limit of the threshold(?: of '(.+)' (cpu|bytes) with '(.+)' percentile)
### Purpose: This glue is responsible to call Graphite API, fetch the performance metrics and validate metrics based on the given parameters.

### Params:
| Param | Definition |
| --- | --- |
| type | (device|process|all) |
| process | (memory|load|set size|required) |
| percentile | percentile |
| bytes | bytes |
| threshold | the maximum cpu/bytes threshold |

### Examples:
 * `Then device load consumption should be within the limit of the threshold`
 * `Then process set size consumption should be within the limit of the threshold of '1073741824' bytes with '70' percentile`
 * `Then all required consumption should be within the limit of the threshold`

 ## '(.+)' will (be|stay) in '(.+)' state
### Purpose: To validate 3rd party app transitionss wrt state, event and history aagainst appObject as the source of truth
Here, be/stay determines whether the app will get transitioned to new state or will be staying in the same state.
For the validation part, for the states when the app is not reachable for us to get the status or history, we use customValidation , where we get the validation key name from the moduleReqId.json of the specific testcase. The customValidation function will be defined in the corresponding confiModule. Refer to the [custom] validation.

### Params:
| Param | Definition                                |
| ---   | ---                                       |
| app   | app type                                  |
| state | expected state to be used for validation  |

### Examples:
 * Then '3rd party app' will stay in 'foreground' state
 * Then '3rd party app' will be in 'background' state

* `When AppObject state for '3rd party App' is set to 'foreground'`

## Verify '(.+)' app is '(.+)'

### Purpose: To perform content validation using an object matching the validation object key name.

### Params:
| Param               | Definition                                                                                                                              |
|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| app                 | app type                                                                                                                                |
| validationObjectKey | The name of an object coming from fireboltCalls fixtures (the object can include firebolt call info but may just have validation data). |

### Examples:
* `Then Verify 'Youtube' app is 'playing entity'`
* `Then Verify 'Netfliz' app is 'dismissed from foreground'`