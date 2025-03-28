@releaseSanity @Discovery @sdk @transport @coreSDK
Feature: Discovery Module Non Badger Tests

    Background: Launch FCA for 'Discovery'
        Given the environment has been set up for 'Discovery Sanity' tests
        And 3rd party 'certification' app is launched

    @3900827
    Scenario: Validate Resume Points - Positive Scenario: Discovery.watched - progress < 1
        When '3rd party app' invokes the 'Firebolt' API to 'discovery watched progress lt 1'
        Then 'Firebolt' platform responds with 'true for discovery watched'

    @3911242
    Scenario: Validate Resume Points - Positive Scenario: Discovery.watched - progress > 1
        When '3rd party app' invokes the 'Firebolt' API to 'discovery watched progress gt 1'
        Then 'Firebolt' platform responds with 'true for discovery watched'

    @3590040
    Scenario: Validate Resume Points - Positive Scenario: Discovery.signIn
        When '3rd party app' invokes the 'Firebolt' API to 'discovery signIn'
        Then 'Firebolt' platform responds with 'true for discovery signIn'

    @3586673
    Scenario: Validate Resume Points - Positive Scenario: Discovery.signOut
        When '3rd party app' invokes the 'Firebolt' API to 'discovery signOut'
        Then 'Firebolt' platform responds with 'true for discovery signOut'

    @3583150
    Scenario: Validate Resume Points - Positive Scenario: Discovery.watchNext
        When '3rd party app' invokes the 'Firebolt' API to 'discovery watchNext progress of 1sec'
        Then 'Firebolt' platform responds with 'true for discovery watchNext'

    @3577287
    Scenario: Validate Resume Points - Positive Scenario: Ripple Overrides Source Field in Discovery.launch
        When '3rd party app' invokes the 'Firebolt' API to 'discovery launch source override'
        Then 'Firebolt' platform responds with 'true for discovery launch'
