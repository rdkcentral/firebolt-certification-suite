Feature: Lifecycle_Background

    @Lifecycle @coreSDK
    Scenario Outline: Background an app from <state>
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with '<state>' state
        When '3rd party app' transitions to state 'background'
        Then '3rd party app' is in 'background' state

        Examples:
            | state      |
            | foreground |

        @notSupported
        Examples:
            | state      |
            | inactive   |

    # Commented step definitions to be implemented once design is worked out
    @needsFurtherInformation @notSupported 
    @Lifecycle @coreSDK @lifecycleManagement
    Scenario: Cannot Background app that is not loaded
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'unloaded' state
        # And I call 'LifecycleManagement.state' api
        When '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle background expecting error'
        # And I call 'LifecycleManagement.state' api
        # Then I validate last '2' response are same for 'LifecycleManagement.state' API Method
        # Then I validate method 'lifecycle.background' has 'message' message and code 'code'
    
    # Keeping this as notSupported because there is no support to background an already backgrounded app using lifecycle.background method
    @Lifecycle @coreSDK @notSupported
    Scenario: Cannot Background a Backgrounded App
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'background' state
        When '3rd party app' transitions to state 'background'
        Then '3rd party app' is in 'background' state
        
    @Lifecycle @coreSDK @notSupported
    Scenario: Cannot Background app in Unloading state
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'unloading' state
        When '3rd party app' transitions to state 'background'
        And AppObject state for '3rd party App' is set to 'unloading'
        Then '3rd party app' is in 'unloading' state

    @Lifecycle @coreSDK @notSupported
    Scenario: Cannot background app from suspended state
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'suspended' state
        When '3rd party app' transitions to state 'background'
        Then '3rd party app' is in 'suspended' state

    @Lifecycle @coreSDK
    Scenario: Should not Background app in initializing state
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'initializing' state
        When '3rd party app' transitions to state 'background'
        Then '3rd party app' is in 'initializing' state
