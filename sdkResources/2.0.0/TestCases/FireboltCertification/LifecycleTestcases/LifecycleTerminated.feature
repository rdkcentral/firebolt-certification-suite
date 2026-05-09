@Lifecycle @coreSDK
Feature: Lifecycle_Terminated

    @notSupported @requiresPlatformImplementation
    Scenario Outline: Lifecycle R*3.8 Terminate app in <state> State
        Given the environment has been set up for 'lifecycle' tests
        When 3rd party 'certification' app is launched with '<state>' state
        Then '3rd party app' transitions to state 'terminated'
        Then '3rd party app' will be in 'terminated' state

        Examples:
            | state        |
            | foreground   |
            | background   |
            | initializing |
            | inactive     |
            | suspended    |
            | unloading    |