@releaseSanity @Metrics @sdk @transport @coreSDK
Feature: Metrics Module

    Background: Launch FCA for 'Metrics'
        Given the environment has been set up for 'Metrics Sanity' tests
        And 3rd party 'certification' app is launched

    @3590005
    Scenario: Sift Events Include deviceSessionId Used in MetricsManagement.addContext
        When 1st party app invokes the 'Firebolt' API to 'addContext for metrics'
        Then 'Firebolt' platform responds to '1st party app' with 'null for metrics addContext'
        When '3rd party app' invokes the 'Firebolt' API to 'notify user has navigated to page with id metrics test page1'
        Then 'Firebolt' platform responds with 'true for page in metrics'

    @3583131
    Scenario: Sift Events Include Fallback deviceSessionId After MetricsManagement.removeContext
        When 1st party app invokes the 'Firebolt' API to 'removeContext for metrics'
        Then 'Firebolt' platform responds to '1st party app' with 'null for metrics removeContext'
        When '3rd party app' invokes the 'Firebolt' API to 'notify user has navigated to page with id metrics test page2'
        Then 'Firebolt' platform responds with 'true for page in metrics'
