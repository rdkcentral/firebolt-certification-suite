@releaseSanity @CETTags @sdk @transport @coreSDK
Feature: CET Tags Module Tests

    Background: Launch FCA for 'CET Tags' tests
        Given the environment has been set up for 'CET Tags Sanity' tests
        And 3rd party 'certification' app is launched
        When 1st party app invokes the 'Firebolt' API to 'set privacy allow personalization as true'
        Then 'Firebolt' platform responds to '1st party app' for 'set privacy allow personalization as true'
        When 1st party app invokes the 'Firebolt' API to 'set privacy allow watchHistory as true'
        Then 'Firebolt' platform responds to '1st party app' for 'set privacy allow watchHistory as true'
        When 1st party app invokes the 'Firebolt' API to 'set privacy allow productAnalytics as true'
        Then 'Firebolt' platform responds to '1st party app' for 'set privacy allow productAnalytics as true'

    @2302637
    Scenario: Validate CET Tags - RPPL-174 Resume Point CET Tags - Some enforcement_value matches
        When 1st party app invokes the 'Firebolt' API to 'set privacy allow resumePoints as false'
        Then 'Firebolt' platform responds to '1st party app' for 'set privacy allow resumePoints as false'
        When '3rd party app' invokes the 'Firebolt' API to 'discovery watched with 80 percent progress'
        Then 'Firebolt' platform responds with 'true for discovery watched'

    @2303584
    Scenario: Validate CET Tags - RPPL-174 Resume Point CET Tags - No enforcement_value match
        When 1st party app invokes the 'Firebolt' API to 'set privacy allow resumePoints as true'
        Then 'Firebolt' platform responds to '1st party app' for 'set privacy allow resumePoints as true'
        When '3rd party app' invokes the 'Firebolt' API to 'discovery watched with 90 percent progress'
        Then 'Firebolt' platform responds with 'true for discovery watched'

    @3398541
    Scenario: Validate CET Tags - Metrics CET Tags - Some enforcement_value matches
        When 1st party app invokes the 'Firebolt' API to 'set privacy allow resumePoints as false'
        Then 'Firebolt' platform responds to '1st party app' for 'set privacy allow resumePoints as false'
        When '3rd party app' invokes the 'Firebolt' API to 'notify user has navigated to page with id cettags test page1'
        Then 'Firebolt' platform responds with 'true for page in metrics'

    @3398540
    Scenario: Validate CET Tags - Metrics CET Tags - No enforcement_value match
        When 1st party app invokes the 'Firebolt' API to 'set privacy allow resumePoints as true'
        Then 'Firebolt' platform responds to '1st party app' for 'set privacy allow resumePoints as true'
        When '3rd party app' invokes the 'Firebolt' API to 'notify user has navigated to page with id cettags test page2'
        Then 'Firebolt' platform responds with 'true for page in metrics'
