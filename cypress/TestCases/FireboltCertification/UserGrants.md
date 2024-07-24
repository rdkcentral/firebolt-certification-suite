# Firebolt Certification
Feature file for certifying UserGrants module.

## Purpose
A module for managing grants given by the user.

## Requirements :
Usergrant test cases present in FCS are using the grantPolicies listed in [grantPolicy.json](../../fixtures/grantPolicy.json) for validation. Each API used for validating usergrants has a grantPolicy defined in this file with different capabilities and values for scope, lifespan, grantSteps, etc

### Configurations : 
In order for usergrant scenarios to work, the grantPolicies must be configured on the device for the user to be prompted for a grant. Configuring grantPolicies on a device varies across platforms and is out of scope of this document. Users need to configure grantPolicies on their device based on the platform implementation.

  **Example structure for a grant policy:**
                    ```
                        "grantPolicies": {
                            "xrn:firebolt:capability:localization:postal-code": {
                                    "use": {
                                        "options": [
                                            {
                                                "steps": [
                                                    {
                                                        "capability": "xrn:firebolt:capability:usergrant:pinchallenge",
                                                        "configuration": {
                                                            "pinSpace": "purchase"
                                                        }
                                                    },
                                                    {
                                                        "capability": "xrn:firebolt:capability:usergrant:acknowledgechallenge"
                                                    }
                                                ]
                                            }
                                        ],
                                        "scope": "app",
                                        "lifespan": "once",
                                        "overridable": false
                                    }
                           ```         

| Field           | Type    | Description                                                                                      |
|-----------------|--------------------------------------------------------------------------------------------------|
| `steps`         | Array   | An array of GrantSteps, all of which need to be verified to fulfill the GrantPolicy.             |
| `capability`    | String  | Refers to a specific granting capability.                                                        |
| `configuration` | Object  | Contains configuration details on how the capability should be set up or used..                  |
| `scope`         | String  | Defines the scope of the grant, specifying whether it applies to all apps on the device or just the requesting app. Possible values: `app` or `device`.         |
| `lifespan`      | String  | Indicates the duration for which the grant is valid. Possible values: `once`, `forever`, `seconds`, `powerActive`, `appActive`.                                                       |
| `overridable`   | Boolean | Specifies whether the policy can be overridden by other policies.                                            |

**Note**: All our grantPolicies include two granting capabilities (`acknowledgeChallenge` and `pinChallenge`). If a platform does not support one of these capabilities, remove the unsupported step from the grantPolicy before execution. Using a granting capability that is not supported by the platform may result in improper behavior.

### Config module Implementation:

To execute Usergrant test cases, additional implementation in the configuration module is required. These test cases use glue codes for mocking a grant response or a usergrant api. Below are the glue codes needed for the additional configuration.

1. **Before Operation**
   Before operations are a set of operations performed before a test case is executed. For more details, refer to the [Before Operation](https://github.com/rdkcentral/firebolt-certification-suite/blob/dev/README.md#before-operation)

2. **Framework registers** 
   This glue informs the platform to use a test provider for simulating user inputs. It registers providers like 'pinChallenge' or 'Ackchallenge'. The `setTestProvider` function, which should be implemented in the configModule, sends the necessary messages to the platform to enable the simulation.
    - **Examples:**
     - `Framework registers 'pinChallenge' test provider`

3. **User sets response**
   Making a call to set the value in 1st party app or 3rd party app. For more details, refer to the [User set response](https://github.com/rdkcentral/firebolt-certification-suite/blob/dev/cypress/support/step_definitions/providerCalls.md#user-set-response-for-)
    - **Examples:**
     - `User sets response for 'pinChallenge correct pin'`
     - `User sets response for 'acknowledge granted'`
  
  - **Acknowledgement:**  
     The Acknowledgement allows a user to acknowledge a user grant by clicking a button. The challenge should appear for the user to acknowledge the grant, allowing the grant to be either accepted or denied based on user action. 

   - **PinChallenge:**  
     The Pin Challenge requires a user to respond to a numeric PIN challenge to confirm their identity. The challenge should appear for the user to enter the PIN, allowing the grant to be either accepted or denied based on user input.

4. **User 'starts' recording lifecycle history**
   Sending a message to the platform/app to start/stop recording lifecycle histories. For more details, refer to the [User starts recording lifecycle history](https://github.com/rdkcentral/firebolt-certification-suite/blob/dev/cypress/support/step_definitions/providerCalls.md#user--recording-lifecycle-history-for-)