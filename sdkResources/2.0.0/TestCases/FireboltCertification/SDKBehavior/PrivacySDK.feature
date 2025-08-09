@Privacy @manageSDK
Feature: Privacy_SDK


    Background: Launch FCA for 'Privacy'
        Given the environment has been set up for 'Privacy' tests
        And 3rd party 'certification' app is launched

    @sdk
    Scenario Outline: Privacy.<Set_Method> - Positive Scenario: <Scenario> with undefined params
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Method_validation_Key>'

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
