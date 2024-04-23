Feature: Lifecycle_Foreground

    @Lifecycle @coreSDK
    Scenario: Loading & Launching an App (initializing -> foreground)
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'initializing' state
        When '3rd party app' transitions to state 'foreground'
        Then '3rd party app' is in 'foreground' state

    @Lifecycle @coreSDK
    Scenario: Relaunch foreground app
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'foreground' state
        And 3rd party 'certification' app is launched
        Then '3rd party app' is in 'foreground' state

    # Commented step definitions to be implemented once design is worked out
    @needsfurtherinformation
    @Lifecycle @coreSDK @lifecycleManagement @notSupported
    Scenario: App Launching another app
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'foreground' state
        When '3rd party app' invokes the 'Firebolt' API to 'get home intent'
        # And I call 'LifecycleManagement.state' api # Launched app may not establish Linchpin connection. State validation possible through LifecycleManagement APIs.
        # Then I validate method 'LifecycleManagement.state' with context 'NO_CONTEXT' has '<TBD>' message # LifecycleManagement APIs not implemented. Expected response TBD
        # Then I validate app state for '<appid>' is 'foreground' #TO BE REPLACED BY ABOVE LINE
        And AppObject state for '3rd party App' is set to 'background'
        Then '3rd party app' is in 'background' state