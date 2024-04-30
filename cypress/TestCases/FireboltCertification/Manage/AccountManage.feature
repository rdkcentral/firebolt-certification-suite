Feature: Account_Manage

   Background: Launch FCA for 'Account'
      Given the environment has been set up for 'Account' tests
      And 3rd party 'certification' app is launched

   @Account @manageSDK @sdk @transport
   Scenario: Account.session - Positive Scenario: Push session token
      When 1st party app invokes the 'Firebolt' API to 'push session token'
      Then 'Firebolt' platform responds to '1st party app' with 'push session token'

   @Account @manageSDK @sdk @transport
   Scenario: Account.session - Negative Scenario: Push session token expecting error
      When 1st party app invokes the 'Firebolt' API to 'push session token'
      And '3rd party app' invokes the 'Firebolt' API to 'get advertisingId with custom error'
      Then 'Firebolt' platform responds to '1st party app' for 'push session token'

   @Account @manageSDK @sdk @transport
   Scenario Outline: Account.session - Negative Scenario: <Scenario> expecting error
      When 1st party app invokes the 'Firebolt' API to '<Key>'
      Then 'Firebolt' platform responds to '1st party app' for 'invalid parameters for account session'

      Examples:
         | Scenario                             | Key                                              |
         | Invalid session token                | set account session with invalid token           |
         | Invalid session ExpiresIn            | set account session with invalid ExpiresIn       |
         | Passing ExpiresIn Invalid value      | set account session with invalid ExpiresIn value |
         | Without session token - Empty params | set account session without parameters           |