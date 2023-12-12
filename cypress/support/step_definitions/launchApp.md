# launchApp Glue
## I launch {string}

### Purpose: Launch Application 
### Supported Targets
* PLATCO, PLATCO_LOCAL
### Params:
| Param | Definition|
| --- | --- |
| referenceApp | name of app to be launched. Currently only 'referenceApp' supported.(app name should be already present in cypress.config.js under env or pass it through env override.) |

### Examples:
* `Given I launch 'referenceApp'`

## I launch HTML App '(.+)'(?: with '(.+)' validation)

### Purpose: Launch Application using HTML url 
### Supported Targets
* PLATCO(optional parameter for adding sniffer and app launch validation not supported), PLATCO_LOCAL
### Params:
| Param | Definition|
| --- | --- |
| url | HTML url to be launched |
| appCallSign | Callsign of launched app |


### Examples:
* `Given I launch HTML App 'https://firecertrefapp.firecert.comcast.com/edge/index.html'`
* `Given I launch HTML App 'https://firecertrefapp.firecert.comcast.com/edge/index.html' with 'HtmlApp-0' validation`
