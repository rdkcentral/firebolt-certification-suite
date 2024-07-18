# Firebolt Certification
Feature file for certifying UserGrants module.

## Purpose
A module for managing grants given by the user.

## Requirements :
1.**Grant Policies**
* Grant Policies specify details like how long a grant is valid for and what is the scope of the grant.
* The grantPolicy object will include policies for different roles such as manage, use, and provide.

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

 2.**Dependencies** 
 * Capabilities which are dependent on other grant policies must be added inside "dependencies" object of "capabilities" object.
  
  **Example structure for a capability with dependencies:**
                        ```
                        "dependencies": {
                                "xrn:firebolt:capability:discovery:watched": [
                                    "xrn:firebolt:capability:data:app-usage"
                                ]
                        }
                       ``` 

3.**Acknowledgement**
 * The Acknowledgement capability enables a user to acknowledge a user grant by simply clicking a button.
 * This requires additional implementation on the config module side. The prompt should appear for the user to acknowledge the challenge, allowing the grant to be either denied or granted based on user action.

4.**Pin Challenge**
* The Pin Challenge capability enables a user to confirm that they are the account owner, or a delegate of, by responding to a numeric PIN challenge.
* This requires additional implementation on the config module side. The prompt should appear for the user to enter the PIN, allowing the grant to be either denied or granted based on user input.