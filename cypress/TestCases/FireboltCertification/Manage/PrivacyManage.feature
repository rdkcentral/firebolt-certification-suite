Feature: Privacy_Manage

   Background: Launch FCA for 'Privacy'
      Given the environment has been set up for 'Privacy' tests

   @Privacy @manageSDK @sdk @transport
   Scenario Outline: Privacy.<Method> - Positive Scenario: <Scenario>
      Given we test the 'PRIVACY_SETTINGS' getters and setters '<Method>' to '<Value>'
      When '1st party app' registers for the 'Firebolt' event
      And 1st party app invokes the 'Firebolt' API to set '<Method>' to '<Value>'
      Then 'Firebolt' platform responds to '1st party app' set API
      When '1st party app' invokes the 'Firebolt' get API
      Then 'Firebolt' platform responds to '1st party app' get API
      And 'Firebolt' platform triggers '1st party app' event

      Examples:
         | Scenario                                             | Method                         | Value |
         | Enable allowResumePoints                             | allowResumePoints              | true  |
         | Disable allowResumePoints                            | allowResumePoints              | false |
         | Enable allowUnentitledResumePoints                   | allowUnentitledResumePoints    | true  |
         | Disable allowRallowUnentitledResumePointsesumePoints | allowUnentitledResumePoints    | false |
         | Enable allowWatchHistory                             | allowWatchHistory              | true  |
         | Disable allowWatchHistory                            | allowWatchHistory              | false |
         | Enable allowProductAnalytics                         | allowProductAnalytics          | true  |
         | Disable allowProductAnalytics                        | allowProductAnalytics          | false |
         | Enable allowPersonalization                          | allowPersonalization           | true  |
         | Disable allowPersonalization                         | allowPersonalization           | false |
         | Enable allowUnentitledPersonalization                | allowUnentitledPersonalization | true  |
         | Disable allowUnentitledPersonalization               | allowUnentitledPersonalization | false |
         | Enable allowRemoteDiagnostics                        | allowRemoteDiagnostics         | true  |
         | Disable allowRemoteDiagnostics                       | allowRemoteDiagnostics         | false |
         | Enable allowPrimaryContentAdTargeting                | allowPrimaryContentAdTargeting | true  |
         | Disable allowPrimaryContentAdTargeting               | allowPrimaryContentAdTargeting | false |
         | Enable allowPrimaryBrowseAdTargeting                 | allowPrimaryBrowseAdTargeting  | true  |
         | Disable allowPrimaryBrowseAdTargeting                | allowPrimaryBrowseAdTargeting  | false |
         | Enable allowAppContentAdTargeting                    | allowAppContentAdTargeting     | true  |
         | Disable allowAppContentAdTargeting                   | allowAppContentAdTargeting     | false |
         | Enable allowACRCollection                            | allowACRCollection             | true  |
         | Disable allowACRCollection                           | allowACRCollection             | false |
         | Enable allowCameraAnalytics                          | allowCameraAnalytics           | true  |
         | Disable allowCameraAnalytics                         | allowCameraAnalytics           | false |

   # get method validation?
   @Privacy @manageSDK @sdk @transport
   Scenario: Privacy.settings - Positive Scenario: Settings
      And 1st party app invokes the 'Firebolt' API to set 'allowResumePoints' to 'true'
      Then 'Firebolt' platform responds to '1st party app' set API
      And 1st party app invokes the 'Firebolt' API to set 'allowUnentitledResumePoints' to 'true'
      Then 'Firebolt' platform responds to '1st party app' set API
      And 1st party app invokes the 'Firebolt' API to set 'allowWatchHistory' to 'true'
      Then 'Firebolt' platform responds to '1st party app' set API
      And 1st party app invokes the 'Firebolt' API to set 'allowProductAnalytics' to 'true'
      Then 'Firebolt' platform responds to '1st party app' set API
      And 1st party app invokes the 'Firebolt' API to set 'allowPersonalization' to 'true'
      Then 'Firebolt' platform responds to '1st party app' set API
      And 1st party app invokes the 'Firebolt' API to set 'allowUnentitledPersonalization' to 'true'
      Then 'Firebolt' platform responds to '1st party app' set API
      And 1st party app invokes the 'Firebolt' API to set 'allowRemoteDiagnostics' to 'true'
      Then 'Firebolt' platform responds to '1st party app' set API
      And 1st party app invokes the 'Firebolt' API to set 'allowPrimaryContentAdTargeting' to 'true'
      Then 'Firebolt' platform responds to '1st party app' set API
      And 1st party app invokes the 'Firebolt' API to set 'allowPrimaryBrowseAdTargeting' to 'true'
      Then 'Firebolt' platform responds to '1st party app' set API
      And 1st party app invokes the 'Firebolt' API to set 'allowAppContentAdTargeting' to 'true'
      Then 'Firebolt' platform responds to '1st party app' set API
      And 1st party app invokes the 'Firebolt' API to set 'allowACRCollection' to 'true'
      Then 'Firebolt' platform responds to '1st party app' set API
      And 1st party app invokes the 'Firebolt' API to set 'allowCameraAnalytics' to 'true'
      Then 'Firebolt' platform responds to '1st party app' set API
      When 1st party app invokes the 'Firebolt' API to 'get privacy settings'
      Then 'Firebolt' platform responds to '1st party app' for 'expected privacy settings'

   @Privacy @manageSDK @sdk @transport
   Scenario: Privacy.settings - Positive Scenario: Settings
      When 1st party app invokes the 'Firebolt' API to 'set privacy allow resumePoints as true'
      Then 'Firebolt' platform responds to '1st party app' for 'set privacy allow resumePoints as true'
      When 1st party app invokes the 'Firebolt' API to 'set privacy allow unentitledResumePoints as true'
      Then 'Firebolt' platform responds to '1st party app' for 'set privacy allow unentitledResumePoints as true'
      When 1st party app invokes the 'Firebolt' API to 'set privacy allow watchHistory as true'
      Then 'Firebolt' platform responds to '1st party app' for 'set privacy allow watchHistory as true'
      When 1st party app invokes the 'Firebolt' API to 'set privacy allow productAnalytics as true'
      Then 'Firebolt' platform responds to '1st party app' for 'set privacy allow productAnalytics as true'
      When 1st party app invokes the 'Firebolt' API to 'set privacy allow personalization as true'
      Then 'Firebolt' platform responds to '1st party app' for 'set privacy allow personalization as true'
      When 1st party app invokes the 'Firebolt' API to 'set privacy allow unentitledPersonalization as true'
      Then 'Firebolt' platform responds to '1st party app' for 'set privacy allow unentitledPersonalization as true'
      When 1st party app invokes the 'Firebolt' API to 'set privacy allow remoteDiagnostics as true'
      Then 'Firebolt' platform responds to '1st party app' for 'set privacy allow remoteDiagnostics as true'
      When 1st party app invokes the 'Firebolt' API to 'set privacy allow primaryContentAdTargeting as true'
      Then 'Firebolt' platform responds to '1st party app' for 'set privacy allow primaryContentAdTargeting as true'
      When 1st party app invokes the 'Firebolt' API to 'set privacy allow primaryBrowseAdTargeting as true'
      Then 'Firebolt' platform responds to '1st party app' for 'set privacy allow primaryBrowseAdTargeting as true'
      When 1st party app invokes the 'Firebolt' API to 'set privacy allow appContentAdTargeting as true'
      Then 'Firebolt' platform responds to '1st party app' for 'set privacy allow appContentAdTargeting as true'
      When 1st party app invokes the 'Firebolt' API to 'set privacy allow ACRCollection as true'
      Then 'Firebolt' platform responds to '1st party app' for 'set privacy allow ACRCollection as true'
      When 1st party app invokes the 'Firebolt' API to 'set privacy allow cameraAnalytics as true'
      Then 'Firebolt' platform responds to '1st party app' for 'set privacy allow cameraAnalytics as true'
      When 1st party app invokes the 'Firebolt' API to 'get privacy settings'
      Then 'Firebolt' platform responds to '1st party app' for 'expected privacy settings'

   @Privacy @manageSDK @sdk @transport
   Scenario Outline: Privacy.<Method> - Negative Scenario: <Scenario> and expecting error
      Given we test the 'PRIVACY_SETTINGS' getters and setters '<Method>' to '<Value>'
      When 1st party app invokes the 'Firebolt' API to set '<Method>' to invalid '<Value>'
      And 'Firebolt' platform responds to '1st party app' set API with 'INVALID_TYPE_PARAMS'

      Examples:
         | Scenario          | Method                         | Value |
         | Set Integer param | allowResumePoints              | 1     |
         | Set String param  | allowResumePoints              | test  |
         | Set Integer param | allowUnentitledResumePoints    | 1     |
         | Set String param  | allowUnentitledResumePoints    | test  |
         | Set Integer param | allowWatchHistory              | 1     |
         | Set String param  | allowWatchHistory              | test  |
         | Set Integer param | allowProductAnalytics          | 1     |
         | Set String param  | allowProductAnalytics          | test  |
         | Set Integer param | allowPersonalization           | 1     |
         | Set String param  | allowPersonalization           | test  |
         | Set Integer param | allowUnentitledPersonalization | 1     |
         | Set String param  | allowUnentitledPersonalization | test  |
         | Set Integer param | allowRemoteDiagnostics         | 1     |
         | Set String param  | allowRemoteDiagnostics         | test  |
         | Set Integer param | allowPrimaryContentAdTargeting | 1     |
         | Set String param  | allowPrimaryContentAdTargeting | test  |
         | Set Integer param | allowPrimaryBrowseAdTargeting  | 1     |
         | Set String param  | allowPrimaryBrowseAdTargeting  | test  |
         | Set Integer param | allowAppContentAdTargeting     | 1     |
         | Set String param  | allowAppContentAdTargeting     | test  |
         | Set Integer param | allowACRCollection             | 1     |
         | Set String param  | allowACRCollection             | test  |
         | Set Integer param | allowCameraAnalytics           | 1     |
         | Set String param  | allowCameraAnalytics           | test  |