Feature: Account

   Background: Launch FCA for 'Account'
      Given the environment has been set up for 'Account' tests
      And 3rd party 'certification' app is launched

   @Account @coreSDK @sdk @transport
   Scenario Outline: Account.<method> - Positive Scenario: <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with '<Validation_key>'

      Examples:
         | Scenario             | API_Key           | Validation_key | method |
         | Validate account ID  | fetch account ID  | account id     | id     |
         | Validate account UID | fetch account UID | account uid    | uid    |

    @Account @coreSDK @sdk @transport @notSupported @requiresPlatformImplementation
    Scenario Outline: Account.<method> - Negative Scenario: <Scenario>
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Validation_key>'

        Examples:
            | Scenario                              | API_Key                                           | Validation_key                          | method |
            | Account ID Device not provisioned     | fetch account ID when device is not provisioned   | invalid parameter error for account id  | id     |
            | Account UID Device not provisioned    | fetch account UID when device is not provisioned  | invalid parameter error for account uid | uid    |
            | Account ID Account retrieval attempt  | fetch account ID when account is not provisioned  | invalid parameter error for account id  | id     |
            | Account UID Account retrieval attempt | fetch account UID when account is not provisioned | invalid parameter error for account uid | uid    |