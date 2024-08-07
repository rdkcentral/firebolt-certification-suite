@Account @AccountManage @manageSDK
Feature: Account_Manage

   Background: Launch FCA for 'Account'
      Given the environment has been set up for 'Account' tests
      And 3rd party 'certification' app is launched

   @sdk @transport
   Scenario: Account.session - Positive Scenario: Push session token
      Given we test the 'ACCOUNT_SESSION' getters and setters 'session' to '<Value>'
      And 1st party app invokes the 'Firebolt' API to set 'session' to '<Value>'
      Then 'Firebolt' platform responds to '1st party app' set API

   @sdk @transport
   Scenario: Account.session - Negative Scenario: Push session token expecting error
      Given we test the 'ACCOUNT_SESSION' getters and setters 'session' to '<Value>'
      And 1st party app invokes the 'Firebolt' API to set 'session' to '<Value>'
      When '3rd party app' invokes the 'Firebolt' get API
      Then 'Firebolt' platform responds to '1st party app' set API

   @sdk @transport
   Scenario Outline: Account.session - Negative Scenario: <Scenario> expecting error
      Given we test the 'ACCOUNT_SESSION' getters and setters 'session' to '<Value>'
      When 1st party app invokes the 'Firebolt' API to set 'session' to invalid '<Value>'
      And 'Firebolt' platform responds to '1st party app' set API with 'INVALID_TYPE_PARAMS'

      Examples:
         | Scenario                             | Value                                              |
         | Invalid session token                | {"token": 736843276434827468,"expiresIn": 84000}           |
         | Invalid session ExpiresIn            | {"token": "RmlyZWJvbHQgTWFuYWdlIFNESyBSb2NrcyEhIQ==","expiresIn": "BJGHhjbdcJKSW"}       |
         | Passing ExpiresIn Invalid value      | {"token": "RmlyZWJvbHQgTWFuYWdlIFNESyBSb2NrcyEhIQ==","expiresIn": 0} |
         | Without session token - Empty params |            |

