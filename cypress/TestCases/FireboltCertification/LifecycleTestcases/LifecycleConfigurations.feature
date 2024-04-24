# Commented step definitions to be implemented once not supported methods are implemented and tested    
# Validation objects are not added for not supported methods
Feature: Lifecycle_Configuration
    @Lifecycle @coreSDK @notSupported
    Scenario: Lifecycle 6.1 App launch time out
        Given the environment has been set up for 'lifecycle' tests
        # And firebolt config 'Lifecycle.appReadyTimeout' is set to to 5 'seconds'
        And 3rd party 'certification' app is launched with 'initializing' state
        # And Test runner waits for 5 'seconds'
        Then '3rd party app' is in 'terminated' state
        
    @Lifecycle @coreSDK @notSupported
    Scenario: Lifecycle 6.2 appFinishedTimeout exceeded
        Given the environment has been set up for 'lifecycle' tests
        # And firebolt config 'Lifecycle.appReadyTimeout' is set to to 5 'seconds'
        And 3rd party 'certification' app is launched with 'unloading' state
        # And Test runner waits for 10 'seconds'
        Then '3rd party app' is in 'terminated' state

    @Lifecycle @coreSDK @notSupported
    Scenario: Lifecycle 6.2 appFinishedTimeout data type
        Given the environment has been set up for 'lifecycle' tests
        # And 1st party app invokes API methods using below datatable
        # Then 'Firebolt' platform responds with 'message and code for lifecycle appFinishedTimeout'
        #     | key                          | value  |
        #     | Lifecycle.appFinishedTimeout | "abcd" |
        #     | Lifecycle.appFinishedTimeout | 'a'    |
        #     | Lifecycle.appFinishedTimeout | true   |
        #     | Lifecycle.appFinishedTimeout |        |

    @Lifecycle @coreSDK @notSupported
    Scenario: Lifecycle 6.1 appReadyTimeout data type
        Given the environment has been set up for 'lifecycle' tests
        # And 1st party app invokes API methods using below datatable
        # Then 'Firebolt' platform responds with 'message and code for lifecycle appReadyTimeout'
        #     | key                       | value  |
        #     | Lifecycle.appReadyTimeout | "abcd" |
        #     | Lifecycle.appReadyTimeout | 'a'    |
        #     | Lifecycle.appReadyTimeout | true   |
        #     | Lifecycle.appReadyTimeout |        |