@Authentication @coreSDK 
Feature: Authentication

   Background: Launch FCA for 'Authentication'
      Given the environment has been set up for 'Authentication' tests
      And 3rd party 'certification' app is launched

   @sdk @transport @Sev0
   Scenario Outline: Authentication.token - Validate API Method response for <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with '<Validation_key>'

      Examples:
         | Scenario                    | API_Key                                           | Validation_key                     |
         | Platform token type         | get the authentication token for platform         | platform authentication token      |
         | Device token type           | get the authentication token for device           | decode base64 authentication token |
         | Distributor token type      | get the authentication token for distributor      | decode base64 authentication token |
        
   @sdk @transport @Sev1
   Scenario Outline: Authentication.token - Validate API Method response for <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with '<Validation_key>'

      Examples:
         | Scenario                    | API_Key                                           | Validation_key                     |
         | Distributor-CIMA token type | get the authentication token for distributor_CIMA | decode base64 authentication token |
         | Distributor-OAT token type  | get the authentication token for distributor_OAT  | decode base64 authentication token |

   @sdk @transport @Sev0
   Scenario Outline: Authentication.<Method> - Validate API Method response for <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with '<Validation_key>'

      Examples:
         | Scenario           | API_Key             | Validation_key         | Method  |
         | Device token type  | fetch device token  | authentication device  | device  |
         | Session token type | fetch session token | authentication session | session |
         | Root token type    | fetch root token    | authentication root    | root    |

   @sdk @transport @Sev1
   Scenario Outline: Authentication.token - Validating API Error handling when given <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with '<Validation_key>'

      Examples:
         | Scenario                             | API_Key                            | Validation_key                               |
         | invalid parameters for Platform1     | get token with platform1 parameter | invalid parameter error authentication token |
         | invalid parameters with type Boolean | get token with true parameter      | invalid parameter error authentication token |
         | invalid parameters with type Integer | get token with integer parameter   | invalid parameter error authentication token |