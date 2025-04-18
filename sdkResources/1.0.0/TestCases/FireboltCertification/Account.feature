@Account @coreSDK
Feature: Account

   Background: Launch FCA for 'Account'
      Given the environment has been set up for 'Account' tests
      And 3rd party 'certification' app is launched

   @sdk @transport @Sev0
   Scenario Outline: Account.<Method> - Validate API Method Response Content
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with '<Validation_key>'
      Examples:
         | Method | Validation_key | API_Key           |
         | id     | account id     | fetch account ID  |
         | uid    | account uid    | fetch account UID |

   @sdk @transport @notSupported @requiresPlatformImplementation @Sev2
   Scenario Outline: Account.<Method> - Validate API Method Response Content with <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with '<Validation_key>'

      Examples:
         | Scenario                  | Method | API_Key                                           | Validation_key                          |
         | device not provisioned    | id     | fetch account ID when device is not provisioned   | invalid parameter error for account id  |
         | device not provisioned    | uid    | fetch account UID when device is not provisioned  | invalid parameter error for account uid |
         | account retrieval attempt | id     | fetch account ID when account is not provisioned  | invalid parameter error for account id  |
         | account retrieval attempt | uid    | fetch account UID when account is not provisioned | invalid parameter error for account uid |