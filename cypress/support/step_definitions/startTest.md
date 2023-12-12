# StartTestGlue

## User starts '(.+)' test(?: using below datatable)

### Purpose: run test using variables used in env json or from datatable
### Supported Targets
* PLATCO, RIPPLE, X1 and FLEX
### Params:
| Param | Definition |
| --- | --- |
| firecertName | name of the test |
| datatables | Optional. Pass input variable in below format to override default value |

### Examples:
* `Given User starts 'firebolt certification' test` - runTest command will get executed if app is already launched
* `And User starts 'firebolt certification' test using below datatable` - runTest using datatable values
* `| paramType | variableName | value |`
* `| INPUT | communicationMode | SDK |`


## 1st party app invokes the '(.+)' API to '(.+)'

### Purpose: send message to platform to make api call.

### Params:
| Param | Definition |
| --- | --- |
| sdk | name of the sdk |
| key | key name of the request data. |

### Examples:
* `Given 1st party app invokes the 'Firebolt' API to 'get device id'`


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