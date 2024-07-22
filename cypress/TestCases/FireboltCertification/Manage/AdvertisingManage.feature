Feature: Advertising_Manage

   Background: Launch FCA for 'Advertising'
      Given the environment has been set up for 'Advertising' tests
      And 3rd party 'certification' app is launched

   @Advertising @manageSDK @sdk @transport
   Scenario: Advertising.resetIdentifier - Positive Scenario: Reset Identifier
      Given we test the 'ADVERTISING_RESET_IDENTIFIER' getters and setters
      When '1st party app' invokes the 'Firebolt' get API
      Then 'Firebolt' platform responds to '1st party app' get API

   @Advertising @manageSDK @sdk @transport
   Scenario Outline: Advertising.skipRestriction - Positive Scenario: <Scenario>
      Given we test the 'ADVERTISING_SKIP_RESTRICTION' getters and setters
      When '1st party app' registers for the 'Firebolt' event
      And 1st party app invokes the 'Firebolt' API to set 'skipRestriction' to '<Value>'
      Then 'Firebolt' platform responds to '1st party app' set API
      When '1st party app' invokes the 'Firebolt' get API
      Then 'Firebolt' platform responds to '1st party app' get API
      And 'Firebolt' platform triggers '1st party app' event

      Examples:
         | Scenario                     | Value        |
         | SkipRestriction adsAll       | adsAll       |
         | SkipRestriction none         | none         |
         | SkipRestriction adsUnwatched | adsUnwatched |
         | SkipRestriction all          | all          |

   @Advertising @manageSDK @sdk @transport
   Scenario: Advertising.setSkipRestriction - Negative Scenario: SkipRestriction expecting error
      Given we test the 'ADVERTISING_SKIP_RESTRICTION' getters and setters
      When 1st party app invokes the 'Firebolt' API to set 'skipRestriction' to invalid '898756'
      And 'Firebolt' platform responds to '1st party app' set API with 'INVALID_TYPE_PARAMS'

   # glue support is not there, do we need to modify this TC to v2 format?
   @Advertising @manageSDK @sdk @transport @notSupported
   Scenario: Advertising.resetIdentifier - Positive Scenario: Reset Identifier method
      When '3rd party app' invokes the 'Firebolt' API to 'get no coppa'
      And '3rd party app' invokes the 'Firebolt' API to 'get advertisingId'
      And 1st party app invokes the 'Firebolt' API to 'reset identifier for advertising'
      And '3rd party app' invokes the 'Firebolt' API to 'get no coppa'
      And '3rd party app' invokes the 'Firebolt' API to 'get advertisingId'
      Then I validate last '2' response are different for 'advertising.config' API method
      And I validate last '2' response are different for 'advertising.advertisingId' API method