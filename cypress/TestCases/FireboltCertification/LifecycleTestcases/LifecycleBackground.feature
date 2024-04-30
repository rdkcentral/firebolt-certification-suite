# Commented step definitions to be implemented once not supported methods are implemented and tested    
# Validation objects are not added for not supported methods
Feature: Lifecycle_Background

    @Lifecycle @coreSDK
    Scenario Outline: Lifecycle 2.4.2 Background an app from <state>
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

    @needsFurtherInformation @notSupported 
    @Lifecycle @coreSDK @lifecycleManagement
    Scenario: Lifecycle 2.4.3 Cannot Background app that is not loaded
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'unloaded' state
        # And 1st party app invokes the API to 'get lifecycle management state'
        When '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle background expecting error'
        # And 1st party app invokes the API to 'get lifecycle management state'
        # Then 'Firebolt' platform responds with 'last two responses for lifecycleManagement state'
        # Then 'Firebolt' platform responds with 'message and code for lifecycle background'
    
    # Keeping this as notSupported because there is no support to background an already backgrounded app using lifecycle.background method
    @Lifecycle @coreSDK @notSupported
    Scenario: Lifecycle 2.4.1 Cannot Background a Backgrounded App
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'background' state
        When '3rd party app' transitions to state 'background'
        Then '3rd party app' is in 'background' state
        
    @Lifecycle @coreSDK @notSupported
    Scenario: Lifecycle 2.4.3 Cannot Background app in Unloading state
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'unloading' state
        When '3rd party app' transitions to state 'background'
        And AppObject state for '3rd party App' is set to 'unloading'
        Then '3rd party app' is in 'unloading' state

    @Lifecycle @coreSDK @notSupported
    Scenario: Lifecycle 2.4.3 Cannot background app from suspended state
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'suspended' state
        When '3rd party app' transitions to state 'background'
        Then '3rd party app' is in 'suspended' state

    @Lifecycle @coreSDK
    Scenario: Lifecycle 2.4.3 Should not Background app in initializing state
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'initializing' state
        When '3rd party app' transitions to state 'background'
        Then '3rd party app' is in 'initializing' state