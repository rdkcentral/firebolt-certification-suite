# Commented step definitions to be implemented once not supported methods are implemented and tested
# Validation objects are not added for not supported methods
@Lifecycle @coreSDK
Feature: Lifecycle_Foreground

    Scenario: Lifecycle 2.2 Loading & Launching an App (initializing -> foreground)
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'initializing' state
        When '3rd party app' transitions to state 'foreground'
        Then '3rd party app' will be in 'foreground' state

    Scenario: Lifecycle 2.2.1 Relaunch foreground app
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'foreground' state
        And 3rd party 'certification' app is launched
        Then '3rd party app' will stay in 'foreground' state

    @needsfurtherinformation @lifecycleManagement @notSupported
    Scenario: Lifecycle 2.2.5 App Launching another app
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'foreground' state
        When '3rd party app' invokes the 'Firebolt' API to 'get home intent'
        # And 1st party app invokes the API to 'get lifecycle management state' # Launched app may not establish Linchpin connection. State validation possible through LifecycleManagement APIs.
        # Then 'Firebolt' platform responds with 'message for lifecycleManagement state' # LifecycleManagement APIs not implemented. Expected response TBD
        # Then '3rd party app' will be in 'foreground' state  #TO BE REPLACED BY ABOVE LINE
        And AppObject state for '3rd party App' is set to 'background'
        Then '3rd party app' will be in 'background' state