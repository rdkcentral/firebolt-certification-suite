Feature: Lifecycle_Suspended

    @Lifecycle @coreSDK
    Scenario: Lifecycle 1.6.1 App should subscribe to onSuspended listener regardless of capability
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'foreground' state
        When '3rd party app' registers for the 'lifecycle onSuspended' event using the 'Firebolt' API

    @Lifecycle @coreSDK @notSupported @requiresPlatformImplementation
    Scenario: Lifecycle 2.5.4 Suspend App from Inactive state
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'inactive' state
        When '3rd party app' transitions to state 'suspended'
        Then '3rd party app' will be in 'suspended' state

    @Lifecycle @coreSDK @notSupported @needsFurtherInformation @requiresPlatformImplementation
    Scenario: Lifecycle 2.2.4 Relaunch a previously Suspended app after Unsuspend
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'suspended' state
        When '3rd party app' transitions to state 'inactive'
        Then '3rd party app' transitions to state 'foreground'
        Then '3rd party app' will be in 'foreground' state

    @Lifecycle @coreSDK @notSupported @requiresPlatformImplementation
    Scenario: Lifecycle 2.5.3 Cannot Suspend a suspended App
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'suspended' state
        When '3rd party app' transitions to state 'suspended'
        Then '3rd party app' will stay in 'suspended' state

    @Lifecycle @coreSDK @notSupported @requiresPlatformImplementation
    Scenario: Lifecycle 2.5.1 Cannot Suspend a unloaded App
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'unloaded' state
        When '3rd party app' transitions to state 'suspended'
        Then '3rd party app' will stay in 'unloaded' state
    
    @Lifecycle @coreSDK @notSupported @requiresPlatformImplementation
    Scenario: Lifecycle 2.5.5 Cannot relaunch Suspended App
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'suspended' state
        When 3rd party 'certification' app is launched
        Then '3rd party app' will stay in 'suspended' state

    @Lifecycle @coreSDK @notSupported @requiresPlatformImplementation
    Scenario Outline: Lifecycle 2.5.2 Cannot Suspend <state> app
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with '<state>' state
        When '3rd party app' transitions to state 'suspended'
        Then '3rd party app' will stay in '<state>' state

        Examples:
            | state      |
            | foreground |
            | background |

    @Lifecycle @coreSDK @notSupported @requiresPlatformImplementation
    Scenario: Lifecycle 2.3.2 Cannot Close Suspended App
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'suspended' state
        # And 1st party app invokes the API to 'get lifecycle management state'
        And '3rd party app' invokes the 'Firebolt' API to 'close app with remote button'
        # And 1st party app invokes the API to 'get lifecycle management state'
        Then '3rd party app' will stay in 'suspended' state
        # Then 'Firebolt' platform responds with 'last two responses for lifecycleManagement state'
        Then 'Firebolt' platform responds with 'message and code for lifecycle close'

    @Lifecycle @coreSDK @notSupported @requiresPlatformImplementation
    Scenario: Lifecycle 2.6, 2.6.2 Unsuspending App
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'suspended' state
        When '3rd party app' transitions to state 'inactive'
        Then '3rd party app' will be in 'inactive' state
    
    @Lifecycle @coreSDK @notSupported @requiresPlatformImplementation
    Scenario Outline: Lifecycle 2.6.1 Cannot Unsuspend in <state> State
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with '<state>' state
        # And 1st party app invokes the API to 'get lifecycle management state'
        And '3rd party app' invokes the 'Firebolt' API to 'unsuspend app'
        # And 1st party app invokes the API to 'get lifecycle management state'
        Then '3rd party app' will stay in '<state>' state
        # Then 'Firebolt' platform responds with 'message and code for lifecycle unsuspend'

        Examples:
            | state        |
            | initializing |
            | foreground   |
            | background   |
            | inactive     |
            | unloading    |

    @Lifecycle @coreSDK @notSupported @requiresPlatformImplementation
    Scenario: Lifecycle 2.6.3 Unsuspend unloaded app
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'unloaded' state
        # And 1st party app invokes the API to 'get lifecycle management state'
        And '3rd party app' invokes the 'Firebolt' API to 'unsuspend app'
        # And 1st party app invokes the API to 'get lifecycle management state'
        Then '3rd party app' will stay in 'unloaded' state
        # Then 'Firebolt' platform responds with 'message and code for lifecycle unsuspend'
        # Then 'Firebolt' platform responds with 'last two responses for lifecycleManagement state'

    @Lifecycle @coreSDK @notSupported
    Scenario: Lifecycle 2.5.6 Try to suspend an app that doesn't exist
        Given the environment has been set up for 'lifecycle' tests
        # And 1st party app invokes the API to 'get lifecycle management state'
        And '3rd party app' invokes the 'Firebolt' API to 'suspend an app that does not exist'
        # And 1st party app invokes the API to 'get lifecycle management state'
        # Then 'Firebolt' platform responds with 'message and code for lifecycle suspend'
        # Then 'Firebolt' platform responds with 'last two responses for lifecycleManagement state'