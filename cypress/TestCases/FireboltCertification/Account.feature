@Account @coreSDK
Feature: Account

   Background: Launch FCA for 'Account'
      Given the environment has been set up for 'Account' tests
      And 3rd party 'certification' app is launched

   @sdk @transport
   Scenario Outline: Account.<Method> - Positive Scenario: <Scenario>
      Given we test the 'ACCOUNT_ID_UID' getters and setters '<Method>'
      When '3rd party app' invokes the 'Firebolt' get API
      Then 'Firebolt' platform responds to '3rd party app' get API

      Examples:
         | Scenario             | Method |
         | Validate account ID  | id     |
         | Validate account UID | uid    |

   @sdk @transport @notSupported @requiresPlatformImplementation
   Scenario Outline: Account.<method> - Negative Scenario: <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with '<Validation_key>'

      Examples:
         | Scenario                              | API_Key                                           | Validation_key                          | method |
         | Account ID Device not provisioned     | fetch account ID when device is not provisioned   | invalid parameter error for account id  | id     |
         | Account UID Device not provisioned    | fetch account UID when device is not provisioned  | invalid parameter error for account uid | uid    |
         | Account ID Account retrieval attempt  | fetch account ID when device is not provisioned  | invalid parameter error for account id  | id     |
         | Account UID Account retrieval attempt | fetch account UID when device is not provisioned | invalid parameter error for account uid | uid    |