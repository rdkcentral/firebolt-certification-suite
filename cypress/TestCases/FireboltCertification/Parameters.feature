Feature: Parameters

   @Parameters @coreSDK @sdk @transport
   Scenario: Parameters.initialization - Positive Scenario: Validate Passing params - TRUE
      Given the environment has been set up for 'Parameters' tests
      And 3rd party 'certification' app is launched
      When 1st party app invokes the 'Firebolt' API to 'set privacy allowAppContentAdTargeting with true'
      And '3rd party app' invokes the 'Firebolt' API to 'get parameters initialization'
      Then 'Firebolt' platform responds with 'true for parameters initialization'

   @Parameters @coreSDK @sdk @transport
   Scenario: Parameters.initialization - Positive Scenario: Validate NavigationIntent - Home
      Given the environment has been set up for 'Parameters' tests
      And 3rd party 'certification' app is launched
      When 1st party app invokes the 'Firebolt' API to 'discovery launch with home intent'
      And '3rd party app' invokes the 'Firebolt' API to 'get parameters initialization'
      Then 'Firebolt' platform responds with 'home intent for parameters initialization'

