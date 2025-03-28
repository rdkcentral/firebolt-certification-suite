@releaseSanity @ReservedAppIds @sdk @transport @coreSDK
Feature: ReservedAppIds Module

    Background: Launch FCA for 'ReservedAppIds'
        Given the environment has been set up for 'ReservedAppIds Sanity' tests

    @3585986
    Scenario: Discovery.launch with valid appIds mapped in manifest - main - URN appId in discovery.launch
        When 1st party app invokes the 'Firebolt' API to 'discovery launch with appId main'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discovery launch'
