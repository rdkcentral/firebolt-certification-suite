Feature: Account

   Background: Launch FCA for 'Account'
      Given the environment has been set up for 'Account' tests
      And 3rd party 'certification' app is launched

   @Account @coreSDK @sdk @transport
   Scenario Outline: Account.<method> - Positive Scenario: <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds for '<Validation_key>'

      Examples:
         | Scenario             | API_Key           | Validation_key | method |
         | Validate account ID  | fetch account ID  | account id     | id     |
         | Validate account UID | fetch account UID | account uid    | uid    |