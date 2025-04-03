@Authentication @coreSDK @sdk @transport @xumo @comcast
Feature: Authentication

    Background: Launch FCA for 'Authentication'
      Given the environment has been set up for 'Authentication' tests
      And 3rd party 'certification' app is launched

    @4423700 @4423701
    Scenario Outline: Authentication.token - Positive Scenario: <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with '<Validation_key>'

        Examples:
          | Scenario                        | API_Key                                           | Validation_key                     |
          | Get Device token type           | get the authentication token for device           | decode base64 authentication token |

    @4423702 @4423709
    Scenario Outline: Authentication.token - Positive Scenario: <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with '<Validation_key>'

        Examples:
          | Scenario                        | API_Key                                           | Validation_key                     |
          | Get Platform token type         | get the authentication token for platform         | platform authentication token      |

    @4423710 @4423712
    Scenario Outline: Authentication.<Method> - Positive Scenario: <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with '<Validation_key>'

        Examples:
          | Scenario               | API_Key             | Validation_key         | Method  |
          | Get Device token type  | fetch device token  | authentication device  | device  |

    @4423713 @4423714
    Scenario Outline: Authentication.<Method> - Positive Scenario: <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with '<Validation_key>'

        Examples:
          | Scenario               | API_Key             | Validation_key         | Method  |
          | Get Root token type    | fetch root token    | authentication root    | root    |

    # Below Negative Scenarios will fail due to RPPL-2716
    @4423715 @4423716
    Scenario Outline: Authentication.token - Negative Scenario: <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with '<Validation_key>'

        Examples:
          | Scenario                       | API_Key                            | Validation_key                            |
          | Invalid Parameter Platform1    | get token with platform1 parameter | invalid parameter platform1 auth token    |
          | Invalid Parameter type Boolean | get token with true parameter      | invalid parameter type boolean auth token |
          | Invalid Parameter type Integer | get token with integer parameter   | invalid parameter type integer auth token |
