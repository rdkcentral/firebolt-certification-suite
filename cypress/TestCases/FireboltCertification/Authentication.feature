Feature: Authentication

   @initialization
   Scenario: Launch FCA for 'Authentication'
      Given the environment has been set up for 'Authentication' tests
      And 3rd party 'certification' app is launched

    @Authentication @coreSDK @sdk @transport
    Scenario Outline: Authentication.token - Positive Scenario: <Scenario>
    When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
    And 'Firebolt' platform responds with '<Validation_key>'

      Examples:
         | Scenario                        | API_Key                                           | Validation_key                     |
         | Get Platform token type         | get the authentication token for platform         | platform authentication token      |
         | Get Device token type           | get the authentication token for device           | decode base64 authentication token |
         | Get Distributor token type      | get the authentication token for distributor      | decode base64 authentication token |
         | Get Distributor-CIMA token type | get the authentication token for distributor_CIMA | decode base64 authentication token |
         | Get Distributor-OAT token type  | get the authentication token for distributor_OAT  | decode base64 authentication token |

    @Authentication @coreSDK @sdk @transport
    Scenario Outline: Authentication.<Method> - Positive Scenario: <Scenario>
    When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
    And 'Firebolt' platform responds with '<Validation_key>'

      Examples:
         | Scenario               | API_Key             | Validation_key         |
         | Get Device token type  | fetch device token  | authentication device  |
         | Get Session token type | fetch session token | authentication session |
         | Get Root token type    | fetch root token    | authentication root    |

    @Authentication @coreSDK @sdk @transport
    Scenario Outline: Authentication.token - Negative Scenario: <Scenario>
    When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
    And 'Firebolt' platform responds with '<Validation_key>'

      Examples:
         | Scenario                       | API_Key                            | Validation_key                               |
         | Invalid Parameter Platform1    | get token with platform1 parameter | invalid parameter error authentication token |
         | Invalid Parameter type Boolean | get token with true parameter      | invalid parameter error authentication token |
         | Invalid Parameter type Integer | get token with integer parameter   | invalid parameter error authentication token |