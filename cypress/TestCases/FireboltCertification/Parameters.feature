Feature: Parameters

   @Parameters @coreSDK @sdk @transport
   Scenario Outline: Parameters.initialization - Positive Scenario: <Scenario>
      Given the environment has been set up for 'Parameters' tests
      And 3rd party 'certification' app is launched
      When '3rd party app' invokes the 'Firebolt' API to 'get parameters initialization'
      And 1st party app invokes the 'Firebolt' API to '<Set_API_Key>'
      Then 'Firebolt' platform responds to '1st party app' with 'null for privacy setAllowAppContentAdTargeting'
      When '3rd party app' invokes the 'Firebolt' API to 'get parameters initialization'
      Then 'Firebolt' platform responds with '<Validation_Key>'

      Examples:
         | Scenario               | Set_API_Key                                       | Validation_Key                      |
         | Passing params - TRUE  | set privacy allowAppContentAdTargeting with true  | true for parameters initialization  |
         | Passing params - FALSE | set privacy allowAppContentAdTargeting with false | false for parameters initialization |

   @Parameters @coreSDK @sdk @transport
   Scenario: Parameters.initialization - Positive Scenario: Validate NavigationIntent - Home
      Given the environment has been set up for 'Parameters' tests
      When 1st party app invokes the 'Firebolt' API to 'discovery launch with home intent'
      And Test runner waits for 30 'seconds'
      Then 'Firebolt' platform responds to '1st party app' with 'true for discoveryLaunch'
      When '3rd party app' invokes the 'Firebolt' API to 'get parameters initialization'
      Then 'Firebolt' platform responds with 'home intent for parameters initialization'