# TestSetup Glue
## I initialize a {string} test

### Purpose: initalize a test during prerequisite

### Params:
| Param | Definition|
| --- | --- |
| test | name of test |

### Examples:
* `Given I initialize a 'Parental Control' test`


## destroyAppInstance

### Purpose: Function to close the app instance during the test initialization stage
### Note: Currently, for the following test names app will close

`'Profile', 'Keyboard', 'Parameters', 'Discovery.Launch',
'lifecycle', 'AcknowledgeChallenge', 'userGrants'`

### Params:
| Param | Definition| Type |
| --- | --- | --- |
| testType | test name | string |

### Examples:
* `destroyAppInstance('Parameters')`


## Firebolt Certification Suite communicates successfully with the {String}

### Purpose: Setup the environment for the test in question.

### Params:
| Param | Definition|
| --- | --- |
| appType | The appType can be either 1st party app or 3rd party app |

### Examples:
* `And Firebolt Certification Suite communicates successfully with the '1st party app'`
* `And Firebolt Certification Suite communicates successfully with the '3rd party app'`