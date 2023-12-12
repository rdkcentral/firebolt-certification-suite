Feature: Account

   @initialization
   Scenario: Launch FCA for 'Account'
      Given the environment has been set up for 'Account' tests
      And 3rd party 'certification' app is launched

   @Account @coreSDK @sdk @transport
   Scenario Outline: Positive Scenario: <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with '<Validation_key>'

      Examples:
         | Scenario             | API_Key           | Validation_key |
         | Validate account ID  | fetch account ID  | account id     |
         | Validate account UID | fetch account UID | account uid    |

   # @Account @coreSDK @sdk @transport
   # Scenario Outline: Negative Scenario: <Scenario>
   #    When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
   #    Then 'Firebolt' platform responds with '<Validation_key>'

   #    Examples:
   #       | Scenario                              | API_Key                                           | Validation_key                          |
   #       | Account ID Device not provisioned     | fetch account ID when device is not provisioned   | invalid parameter error for account id  |
   #       | Account UID Device not provisioned    | fetch account UID when device is not provisioned  | invalid parameter error for account uid |
   #       | Account ID Account retrieval attempt  | fetch account ID when account is not provisioned  | invalid parameter error for account id  |
   #       | Account UID Account retrieval attempt | fetch account UID when account is not provisioned | invalid parameter error for account uid |
