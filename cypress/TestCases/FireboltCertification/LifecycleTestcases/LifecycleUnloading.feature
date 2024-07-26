# Commented step definitions to be implemented once not supported methods are implemented and tested    
# Validation objects are not added for not supported methods
Feature: Lifecycle_Unloading

    @Lifecycle @coreSDK @notSupported
    Scenario: Lifecycle R.4.5.4 No impact of multiple Finished events while unloading
        Given the environment has been set up for 'lifecycle' tests
        When 3rd party 'certification' app is launched with 'unloading' state
        Then '3rd party app' invokes the 'Firebolt' API to 'call lifecycle finished'
        And '3rd party app' invokes the 'Firebolt' API to 'call lifecycle finished and expects error'
        Then '3rd party app' will stay in 'unloaded' state

    @Lifecycle @coreSDK @notSupported
    Scenario: Lifecycle R*3.7.3 Unloading from Inactive state
        Given the environment has been set up for 'lifecycle' tests
        When 3rd party 'certification' app is launched with 'inactive' state
        Then '3rd party app' transitions to state 'unloading'
        Then '3rd party app' will be in 'unloading' state

    @Lifecycle @coreSDK @notSupported
    Scenario: Lifecycle R.3.3.4 Cannot Close an Unloading App
        Given the environment has been set up for 'lifecycle' tests
        When 3rd party 'certification' app is launched with 'unloading' state
        Then '3rd party app' transitions to state 'inactive'
        Then '3rd party app' will stay in 'unloading' state

    @Lifecycle @coreSDK @notSupported
    Scenario: Lifecycle R*4.5.3 finished from unloading state
        Given the environment has been set up for 'lifecycle' tests
        # And firebolt config 'Lifecycle.appFinishedTimeout' is set to to 60 'seconds'
        When 3rd party 'certification' app is launched with 'unloading' state
        Then '3rd party app' transitions to state 'unloaded'
        Then '3rd party app' will be in 'unloaded' state
        
    @Lifecycle @coreSDK @notSupported
    Scenario: Lifecycle R*3.7.2 Should not unload from active state (foreground)
        Given the environment has been set up for 'lifecycle' tests
        When 3rd party 'certification' app is launched with 'foreground' state
        # When 1st party app invokes the API to 'call lifecycleManagement unload expecting error'
        Then '3rd party app' will stay in 'foreground' state
        # Then 'Firebolt' platform responds with 'message and code for lifecycle unload'

    @Lifecycle @coreSDK @notSupported
    Scenario: Lifecycle R.3.5.3 Cannot Suspend Unloaded app
        Given the environment has been set up for 'lifecycle' tests
        When 3rd party 'certification' app is launched with 'unloaded' state
        # And 1st party app invokes the API to 'get lifecycle management state'
        Then '3rd party app' invokes the 'Firebolt' API to 'call lifecycle suspend and expects error'
        # And 1st party app invokes the API to 'get lifecycle management state'
        Then '3rd party app' will stay in 'unloaded' state
        # Then 'Firebolt' platform responds with 'message and code for lifecycle suspend'
        # And 'Firebolt' platform responds with 'last two responses for lifecycleManagement state'

    @Lifecycle @coreSDK @notSupported
    Scenario Outline: Lifecycle R.4.5.4 Should not finish from state other than unloading (<state>)
        Given the environment has been set up for 'lifecycle' tests
        When 3rd party 'certification' app is launched with '<state>' state
        When '3rd party app' invokes the 'Firebolt' API to 'call lifecycle finished and expects error'
        Then '3rd party app' will stay in '<state>' state
        # Then 'Firebolt' platform responds with 'message and code for lifecycle finished'
        Examples:
            | state        |
            | initializing |
            | foreground   |
            | background   |
            | inactive     |
            | suspended    |

    @Lifecycle @coreSDK @notSupported
    Scenario: Lifecycle R.3.3.4 Cannot Close an app that is not loaded
        Given the environment has been set up for 'lifecycle' tests
        # When 1st party app invokes the API to 'call lifecycleManagement close expecting error'
        # Then 'Firebolt' platform responds with 'message and code for lifecycleManagement close'