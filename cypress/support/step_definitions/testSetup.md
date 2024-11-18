# TestSetup Glue

## the environment has been set up for {string} tests

### Purpose: Sets up the environment for the specified test based on the test name. 

#### Below are the tasks that are performed based on the test name:
- This glue will used to initialize the firebolt object for the dynamic calls.
  - Passing the key name in `module:method` format
    ##### Format
    ```javascript
    Given the environment has been set up for 'module:method' tests
    ```
    - In the abover format, `module` is the name of the Firebolt object and firebolt object fetched and stored in the `runtime` environment variable using module name.
    - `module:method` this will split the key name by `:` and both the module and method will be stored in the `runtime` environment variable.
  - Example: `Given the environment has been set up for 'Localization:locale' tests` - `Localization` is the firebolt object name.

  - Passing the key name directly
    ##### Format
    ```javascript
    Given the environment has been set up for 'keyName' tests
    ```
    - In the above format, `keyName` is the name of the Firebolt object and firebolt object fetched and stored in the `runtime` environment variable using key name.
    
    Example: `Given the environment has been set up for 'ADVERTISING_SKIPRESTRICTION' tests` - `ADVERTISING_SKIPRESTRICTION` is the firebolt object name.

  - Passing the key name with spaces
    ##### Format
    ```javascript
    Given the environment has been set up for 'key Name' tests
    ```
    - In the above format, If `key Name` having spaces, then it should be replaced with `_` in the key name and finally, the key name converted to uppercase.
    
    Example: `Given the environment has been set up for 'Advertising skiprestriction' tests` - `ADVERTISING_SKIPRESTRICTION` is the firebolt object name.

- This glue will close the app instance for the specified test names. To close the app instance, the test name should be configured in the `closeAppTestTypes` environment variable.

### Params:
| Param | Definition|
| --- | --- |
| test | name of test |

### Examples:
* `Given the environment has been set up for 'Account' tests`
* `Given the environment has been set up for 'ADVERTISING_SKIPRESTRICTION' tests`
* `Given the environment has been set up for 'Localization:locale' tests`
* `Given the environment has been set up for 'Accessibility closedcaptions settings' tests`


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