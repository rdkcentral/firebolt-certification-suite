@Authentication @coreSDK @sdk @transport @comcast @espnplus
Feature: Authentication

    Background: Launch FCA for 'Authentication'
      Given the environment has been set up for 'Authentication' tests
      And 3rd party 'certification' app is launched with 'secondary 3rd party app' appId
      # And 3rd party 'certification' app is launched

    Scenario Outline: Authentication.token - Positive Scenario: <Scenario>
      When 'secondary 3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds to 'secondary 3rd party app' with '<Validation_key>'
      # When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      # Then 'Firebolt' platform responds with '<Validation_key>'

        Examples:
          | Scenario                        | API_Key                                           | Validation_key                     |
          | Get Distributor token type      | get the authentication token for distributor      | decode base64 authentication token |
          # DOES NOT WORK COMCAST ONLY 
          | Get Distributor-CIMA token type | get the authentication token for distributor_CIMA | decode base64 authentication token |
          # DOES NOT WORK COMCAST ONLY 
          | Get Distributor-OAT token type  | get the authentication token for distributor_OAT  | decode base64 authentication token |
          # DOES NOT WORK COMCAST ONLY 
          | Get Session token type          | fetch session token                               | authentication session             |
