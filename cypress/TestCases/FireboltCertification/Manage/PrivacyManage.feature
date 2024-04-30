Feature: Privacy_Manage

   Background: Launch FCA for 'Privacy'
      Given the environment has been set up for 'Privacy' tests
      And 3rd party 'certification' app is launched

   @Privacy @manageSDK @sdk @transport
   Scenario Outline: Privacy.<Method> - Positive Scenario: <Scenario>
      When 1st party app registers for the '<Event_Registration_Key>' event using the 'Firebolt' API
      And 1st party app invokes the 'Firebolt' API to '<API_Set_Key>'
      Then 'Firebolt' platform responds to '1st party app' for '<API_Set_Key>'
      When 1st party app invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds to '1st party app' with '<Method_Validation_Key>'
      And 'Firebolt' platform triggers to '1st party app' event '<Event_Validation_Key>'

      Examples:
         | Scenario                               | Method                         | Event_Registration_Key                          | API_Set_Key                                          | API_Key                                     | Method_Validation_Key                             | Event_Validation_Key                                      |
         | Enable allowResumePoints               | allowResumePoints              | privacy onAllowResumePointsChanged              | set privacy allow resumePoints as true               | get privacy allow resumePoints              | true for privacy allow resumePoints               | onAllowResumePointsChanged for privacy true               |
         | Disable allowResumePoints              | allowResumePoints              | privacy onAllowResumePointsChanged              | set privacy allow resumePoints as false              | get privacy allow resumePoints              | false for privacy allow resumePoints              | onAllowResumePointsChanged for privacy false              |
         | Enable allowUnentitledResumePoints     | allowUnentitledResumePoints    | privacy onAllowUnentitledResumePointsChanged    | set privacy allow unEntitledResumePoints as true     | get privacy allow unEntitledResumePoints    | true for privacy allow unEntitledResumePoints     | onAllowUnentitledResumePointsChanged for privacy true     |
         | Disable allowUnentitledResumePoints    | allowUnentitledResumePoints    | privacy onAllowUnentitledResumePointsChanged    | set privacy allow unEntitledResumePoints as false    | get privacy allow unEntitledResumePoints    | false for privacy allow unEntitledResumePoints    | onAllowUnentitledResumePointsChanged for privacy false    |
         | Enable allowWatchHistory               | allowWatchHistory              | privacy onAllowWatchHistoryChanged              | set privacy allow watchHistory as true               | get privacy allow watchHistory              | true for privacy allow watchHistory               | onAllowWatchHistoryChanged for privacy true               |
         | Disable allowWatchHistory              | allowWatchHistory              | privacy onAllowWatchHistoryChanged              | set privacy allow watchHistory as false              | get privacy allow watchHistory              | false for privacy allow watchHistory              | onAllowWatchHistoryChanged for privacy false              |
         | Enable allowProductAnalytics           | allowProductAnalytics          | privacy onAllowProductAnalyticsChanged          | set privacy allow productAnalytics as true           | get privacy allow productAnalytics          | true for privacy allow productAnalytics           | onAllowProductAnalyticsChanged for privacy true           |
         | Disable allowProductAnalytics          | allowProductAnalytics          | privacy onAllowProductAnalyticsChanged          | set privacy allow productAnalytics as false          | get privacy allow productAnalytics          | false for privacy allow productAnalytics          | onAllowProductAnalyticsChanged for privacy false          |
         | Enable allowPersonalization            | allowPersonalization           | privacy onAllowPersonalizationChanged           | set privacy allow personalization as true            | get privacy allow personalization           | true for privacy allow personalization            | onAllowPersonalizationChanged for privacy true            |
         | Disable allowPersonalization           | allowPersonalization           | privacy onAllowPersonalizationChanged           | set privacy allow personalization as false           | get privacy allow personalization           | false for privacy allow personalization           | onAllowPersonalizationChanged for privacy false           |
         | Enable allowUnentitledPersonalization  | allowUnentitledPersonalization | privacy onAllowUnentitledPersonalizationChanged | set privacy allow unEntitledpersonalization as true  | get privacy allow unEntitledpersonalization | true for privacy allow unEntitledpersonalization  | onAllowUnentitledPersonalizationChanged for privacy true  |
         | Disable allowUnentitledPersonalization | allowUnentitledPersonalization | privacy onAllowUnentitledPersonalizationChanged | set privacy allow unEntitledpersonalization as false | get privacy allow unEntitledpersonalization | false for privacy allow unEntitledpersonalization | onAllowUnentitledPersonalizationChanged for privacy false |
         | Enable allowRemoteDiagnostics          | allowRemoteDiagnostics         | privacy onAllowRemoteDiagnosticsChanged         | set privacy allow remoteDiagnostics as true          | get privacy allow remoteDiagnostics         | true for privacy allow remoteDiagnostics          | onAllowRemoteDiagnosticsChanged for privacy true          |
         | Disable allowRemoteDiagnostics         | allowRemoteDiagnostics         | privacy onAllowRemoteDiagnosticsChanged         | set privacy allow remoteDiagnostics as false         | get privacy allow remoteDiagnostics         | false for privacy allow remoteDiagnostics         | onAllowRemoteDiagnosticsChanged for privacy false         |
         | Enable allowPrimaryContentAdTargeting  | allowPrimaryContentAdTargeting | privacy onAllowPrimaryContentAdTargetingChanged | set privacy allow primaryContentAdTargeting as true  | get privacy allow primaryContentAdTargeting | true for privacy allow primaryContentAdTargeting  | onAllowPrimaryContentAdTargetingChanged for privacy true  |
         | Disable allowPrimaryContentAdTargeting | allowPrimaryContentAdTargeting | privacy onAllowPrimaryContentAdTargetingChanged | set privacy allow primaryContentAdTargeting as false | get privacy allow primaryContentAdTargeting | false for privacy allow primaryContentAdTargeting | onAllowPrimaryContentAdTargetingChanged for privacy false |
         | Enable allowPrimaryBrowseAdTargeting   | allowPrimaryBrowseAdTargeting  | privacy onAllowPrimaryBrowseAdTargetingChanged  | set privacy allow primaryBrowseAdTargeting as true   | get privacy allow primaryBrowseAdTargeting  | true for privacy allow primaryBrowseAdTargeting   | onAllowPrimaryBrowseAdTargetingChanged for privacy true   |
         | Disable allowPrimaryBrowseAdTargeting  | allowPrimaryBrowseAdTargeting  | privacy onAllowPrimaryBrowseAdTargetingChanged  | set privacy allow primaryBrowseAdTargeting as false  | get privacy allow primaryBrowseAdTargeting  | false for privacy allow primaryBrowseAdTargeting  | onAllowPrimaryBrowseAdTargetingChanged for privacy false  |
         | Enable allowAppContentAdTargeting      | allowAppContentAdTargeting     | privacy onAllowAppContentAdTargetingChanged     | set privacy allow appContentAdTargeting as true      | get privacy allow appContentAdTargeting     | true for privacy allow appContentAdTargeting      | onAllowAppContentAdTargetingChanged for privacy true      |
         | Disable allowAppContentAdTargeting     | allowAppContentAdTargeting     | privacy onAllowAppContentAdTargetingChanged     | set privacy allow appContentAdTargeting as false     | get privacy allow appContentAdTargeting     | false for privacy allow appContentAdTargeting     | onAllowAppContentAdTargetingChanged for privacy false     |
         | Enable allowACRCollection              | allowACRCollection             | privacy onAllowACRCollectionChanged             | set privacy allow ACRCollection as true              | get privacy allow ACRCollection             | true for privacy allow ACRCollection              | onAllowACRCollectionChanged for privacy true              |
         | Disable allowACRCollection             | allowACRCollection             | privacy onAllowACRCollectionChanged             | set privacy allow ACRCollection as false             | get privacy allow ACRCollection             | false for privacy allow ACRCollection             | onAllowACRCollectionChanged for privacy false             |
         | Enable allowCameraAnalytics            | allowCameraAnalytics           | privacy onAllowCameraAnalyticsChanged           | set privacy allow cameraAnalytics as true            | get privacy allow cameraAnalytics           | true for privacy allow cameraAnalytics            | onallowcameraanalyticschanged for privacy true            |
         | Disable allowCameraAnalytics           | allowCameraAnalytics           | privacy onAllowCameraAnalyticsChanged           | set privacy allow cameraAnalytics as false           | get privacy allow cameraAnalytics           | false for privacy allow cameraAnalytics           | onallowcameraanalyticschanged for privacy false           |

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
   Scenario Outline: Privacy.<Set_Method> - Positive Scenario: <Scenario> with undefined params
      When 1st party app invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds to '1st party app' for '<Method_validation_Key>'

      Examples:
         | Scenario                           | Set_Method                        | API_Key                                                    | Method_validation_Key                               |
         | Set allowResumePoints              | setAllowResumePoints              | set privacy allow resumePoints without params              | true for allow resumePoints in privacy              |
         | Set allowUnentitledResumePoints    | setAllowUnentitledResumePoints    | set privacy allow unEntitledResumePoints without params    | true for allow unEntitledResumePoints in privacy    |
         | Set allowWatchHistory              | setAllowWatchHistory              | set privacy allow watchHistory without params              | true for allow watchHistory in privacy              |
         | Set allowProductAnalytics          | setAllowProductAnalytics          | set privacy allow productAnalytics without params          | true for allow productAnalytics in privacy          |
         | Set allowPersonalization           | setAllowPersonalization           | set privacy allow personalization without params           | true for allow personalization in privacy           |
         | Set allowUnentitledPersonalization | setAllowUnentitledPersonalization | set privacy allow unEntitledpersonalization without params | true for allow unEntitledpersonalization in privacy |
         | Set allowRemoteDiagnostics         | setAllowRemoteDiagnostics         | set privacy allow remoteDiagnostics without params         | true for allow remoteDiagnostics in privacy         |
         | Set allowPrimaryContentAdTargeting | setAllowPrimaryContentAdTargeting | set privacy allow primaryContentAdTargeting without params | true for allow primaryContentAdTargeting in privacy |
         | Set allowPrimaryBrowseAdTargeting  | setAllowPrimaryBrowseAdTargeting  | set privacy allow primaryBrowseAdTargeting without params  | true for allow primaryBrowseAdTargeting in privacy  |
         | Set allowAppContentAdTargeting     | setAllowAppContentAdTargeting     | set privacy allow appContentAdTargeting without params     | true for allow appContentAdTargeting in privacy     |
         | Set allowACRCollection             | setAllowACRCollection             | set privacy allow ACRcollection without params             | true for allow ACRcollection in privacy             |
         | Set allowCameraAnalytics           | setAllowCameraAnalytics           | set privacy allow cameraAnalytics without params           | true for allow cameraAnalytics in privacy           |

   @Privacy @manageSDK @sdk @transport
   Scenario Outline: Privacy.<Method> - Negative Scenario: <Scenario> and expecting error
      When 1st party app invokes the 'Firebolt' API to '<Error_Key>'
      Then 'Firebolt' platform responds to '1st party app' for '<Error_Object>'

      Examples:
         | Scenario          | Method                         | Error_Key                                                              | Error_Object                                                      |
         | Set Integer value | allowResumePoints              | set privacy allowResumePoints with invalid params integer              | invalid params integer for privacy allowResumePoints              |
         | Set String value  | allowResumePoints              | set privacy allowResumePoints with invalid test params                 | invalid test params for privacy allowResumePoints                 |
         | Set Integer value | allowUnentitledResumePoints    | set privacy allowUnentitledResumePoints with invalid params integer    | invalid params integer for privacy allowUnentitledResumePoints    |
         | Set String value  | allowUnentitledResumePoints    | set privacy allowUnentitledResumePoints with invalid test params       | invalid test params for privacy allowUnentitledResumePoints       |
         | Set Integer value | allowWatchHistory              | set privacy allowwatchhistory with invalid params integer              | invalid params integer for privacy allowwatchhistory              |
         | Set String value  | allowWatchHistory              | set privacy allowwatchhistory with invalid test params                 | invalid test params for privacy allowwatchhistory                 |
         | Set Integer value | allowProductAnalytics          | set privacy allowProductAnalytics with invalid params integer          | invalid params integer for privacy allowProductAnalytics          |
         | Set String value  | allowProductAnalytics          | set privacy allowProductAnalytics with invalid test params             | invalid test params for privacy allowProductAnalytics             |
         | Set Integer value | allowPersonalization           | set privacy allowPersonalization with invalid params integer           | invalid params integer for privacy allowPersonalization           |
         | Set String value  | allowPersonalization           | set privacy allowPersonalization with invalid test params              | invalid test params for privacy allowPersonalization              |
         | Set Integer value | allowUnentitledPersonalization | set privacy allowunentitledpersonalization with invalid params integer | invalid params integer for privacy allowunentitledpersonalization |
         | Set String value  | allowUnentitledPersonalization | set privacy allowunentitledpersonalization with invalid test params    | invalid test params for privacy allowunentitledpersonalization    |
         | Set Integer value | allowRemoteDiagnostics         | set privacy allowRemoteDiagnostics with invalid params integer         | invalid params integer for privacy allowRemoteDiagnostics         |
         | Set String value  | allowRemoteDiagnostics         | set privacy allowRemoteDiagnostics with invalid test params            | invalid test params for privacy allowRemoteDiagnostics            |
         | Set Integer value | allowPrimaryContentAdTargeting | set privacy allowPrimaryContentAdTargeting with invalid params integer | invalid params integer for privacy allowPrimaryContentAdTargeting |
         | Set String value  | allowPrimaryContentAdTargeting | set privacy allowPrimaryContentAdTargeting with invalid test params    | invalid test params for privacy allowPrimaryContentAdTargeting    |
         | Set Integer value | allowPrimaryBrowseAdTargeting  | set privacy allowPrimaryBrowseAdTargeting with invalid params integer  | invalid params integer for privacy allowPrimaryBrowseAdTargeting  |
         | Set String value  | allowPrimaryBrowseAdTargeting  | set privacy allowPrimaryBrowseAdTargeting with invalid test params     | invalid test params for privacy allowPrimaryBrowseAdTargeting     |
         | Set Integer value | allowAppContentAdTargeting     | set privacy allowAppContentAdTargeting with invalid params integer     | invalid params integer for privacy allowAppContentAdTargeting     |
         | Set String value  | allowAppContentAdTargeting     | set privacy allowAppContentAdTargeting with invalid test params        | invalid test params for privacy allowAppContentAdTargeting        |
         | Set Integer value | allowACRCollection             | set privacy allowACRCollection with invalid params integer             | invalid params integer for privacy allowACRCollection             |
         | Set String value  | allowACRCollection             | set privacy allowACRCollection with invalid test params                | invalid test params for privacy allowACRCollection                |
         | Set Integer value | allowCameraAnalytics           | set privacy allowCameraAnalytics with invalid params integer           | invalid params integer for privacy allowCameraAnalytics           |
         | Set String value  | allowCameraAnalytics           | set privacy allowCameraAnalytics with invalid test params              | invalid test params for privacy allowCameraAnalytics              |