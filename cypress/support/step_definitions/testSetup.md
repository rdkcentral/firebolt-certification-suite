# TestSetup Glue

## the environment has been set up for {string} tests

### Purpose: Sets up the environment for the specified test based on the test name.

#### Below are the tasks that are performed based on the test name:

- This glue is used to potentially initialize the Firebolt object for dynamic calls. The Firebolt object can be initialized with dynamic objects if they are available, but it will work regardless of whether dynamic objects are found or required. For more details on dynamic objects, refer to [here](../../fixtures/docs/dynamicObjects.md/#firebolt-object).

- This glue will close the app instance for the specified test names. To close the app instance, the test name should be configured in the `closeAppTestTypes` environment variable.

### Params:

| Param | Definition   |
| ----- | ------------ |
| test  | name of test |

### Examples:

- `Given the environment has been set up for 'Account' tests`
- `Given the environment has been set up for 'ADVERTISING_SKIPRESTRICTION' tests`
- `Given the environment has been set up for 'Localization:locale' tests`
- `Given the environment has been set up for 'Accessibility closedcaptions settings' tests`



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

## text '(.+)' is found in the '(.+)' log

### Purpose: Searches for a specific text pattern in a given log file.

### Params:
| Param | Definition|
| --- | --- |
| logKey | The specific log text pattern to search for. |
| fileIdentifier| The log file identifier where the search will be performed. |

### Examples:
* `Given text 'SignIn' is found in the 'app' log`