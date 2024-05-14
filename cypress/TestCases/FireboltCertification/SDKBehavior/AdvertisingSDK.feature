Feature: Advertising_SDK

    Background: Launch FCA for 'Advertising'
        Given the environment has been set up for 'Advertising' tests
        And 3rd party 'certification' app is launched

    @Advertising @coreSDK @sdk @transport
    Scenario: Advertising.policy - Positive Scenario: SkipRestriction with undefined params
        When 1st party app invokes the 'Firebolt' API to 'set skipRestriction with undefined parameter'
        Then 'Firebolt' platform responds to '1st party app' with 'advertising skipRestriction'