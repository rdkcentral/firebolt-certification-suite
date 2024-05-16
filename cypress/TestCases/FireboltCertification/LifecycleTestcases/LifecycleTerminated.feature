Feature: Lifecycle_Terminated

    @Lifecycle @coreSDK @notSupported
    Scenario Outline: Lifecycle 2.8 Terminate app in <state> State
        Given the environment has been set up for 'lifecycle' tests
        When 3rd party 'certification' app is launched with '<state>' state
        Then '3rd party app' transitions to state 'terminated'
        Then '3rd party app' will stay in 'terminated' state

        Examples:
            | state        |
            | foreground   |
            | background   |
            | initializing |
            | inactive     |
            | suspended    |
            | unloading    |