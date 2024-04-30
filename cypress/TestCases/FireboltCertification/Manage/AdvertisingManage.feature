Feature: Advertising_Manage

   Background: Launch FCA for 'Advertising'
      Given the environment has been set up for 'Advertising' tests
      And 3rd party 'certification' app is launched

   @Advertising @manageSDK @sdk @transport
   Scenario: Advertising.resetIdentifier - Positive Scenario: Reset Identifier
      When 1st party app invokes the 'Firebolt' API to 'reset identifier for advertising'
      Then 'Firebolt' platform responds to '1st party app' with 'null for advertising resetIdentifier'

   # Since the "refui" app validation is not designed, the event validation step is commented out.
   @Advertising @manageSDK @sdk @transport
   Scenario Outline: Advertising.skipRestriction - Positive Scenario: <Scenario>
      When 1st party app registers for the 'advertising onSkipRestrictionChanged' event using the 'Firebolt' API
      And 1st party app invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds to '1st party app' with 'null for advertising setSkipRestriction'
      When 1st party app invokes the 'Firebolt' API to 'get advertising skipRestriction'
      Then 'Firebolt' platform responds to '1st party app' with '<Method_Validation_Key>'
      And 'Firebolt' platform triggers to '1st party app' event '<Event_Validation_Key>'

      Examples:
         | Scenario                     | API_Key                             | Method_Validation_Key            | Event_Validation_Key                       |
         | SkipRestriction none         | set skipRestriction as none         | none for skipRestriction         | onSkipRestrictionChanged with none         |
         | SkipRestriction adsUnwatched | set skipRestriction as adsUnwatched | adsUnwatched for skipRestriction | onSkipRestrictionChanged with adsUnwatched |
         | SkipRestriction adsAll       | set skipRestriction as adsAll       | adsAll for skipRestriction       | onSkipRestrictionChanged with adsAll       |
         | SkipRestriction all          | set skipRestriction as all          | all for skipRestriction          | onSkipRestrictionChanged with all          |


   @Advertising @manageSDK @sdk @transport
   Scenario: Advertising.setSkipRestriction - Negative Scenario: SkipRestriction expecting error
      When 1st party app invokes the 'Firebolt' API to 'set skipRestriction with integer'
      Then 'Firebolt' platform responds to '1st party app' with 'invalid parameters for skipRestriction'

   @Advertising @coreSDK @sdk @transport
   Scenario: Advertising.policy - Positive Scenario: SkipRestriction with undefined params
      When 1st party app invokes the 'Firebolt' API to 'set skipRestriction with undefined parameter'
      Then 'Firebolt' platform responds to '1st party app' with 'advertising skipRestriction'

   @Advertising @manageSDK @sdk @transport @notSupported
   Scenario: Advertising.resetIdentifier - Positive Scenario: Reset Identifier method
      When '3rd party app' invokes the 'Firebolt' API to 'get no coppa'
      And '3rd party app' invokes the 'Firebolt' API to 'get advertisingId'
      And 1st party app invokes the 'Firebolt' API to 'reset identifier for advertising'
      And '3rd party app' invokes the 'Firebolt' API to 'get no coppa'
      And '3rd party app' invokes the 'Firebolt' API to 'get advertisingId'
      Then I validate last '2' response are different for 'advertising.config' API method
      And I validate last '2' response are different for 'advertising.advertisingId' API method