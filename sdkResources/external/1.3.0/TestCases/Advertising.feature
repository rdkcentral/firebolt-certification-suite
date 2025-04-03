@releaseSanity @Advertising @sdk @transport @coreSDK
Feature: Advertising Module

    Background: Launch FCA for 'Advertising'
        Given the environment has been set up for 'Advertising Sanity' tests
        And 3rd party 'certification' app is launched

    @3550003
    Scenario: Advertising.config - App Has Permissions for xrn:firebolt:capability:advertising:identifier
        When '3rd party app' invokes the 'Firebolt' API to 'get no coppa'
        Then 'Firebolt' platform responds with 'response including normal ifaValue'
