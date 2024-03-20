# StartTestGlue

## User starts '(.+)' test(?: using below datatable)

### Purpose: run test using variables used in env json or from datatable

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
