Feature: Lifecycle

    @Lifecycle @sdk @transport @coreSDK @regression
    Scenario: Lifecycle R*4.1 Validate lifecycle.ready - Notify the platform that the app is ready
        Given the environment has been set up for 'lifeCycleApi' tests
        And 3rd party 'certification' app is launched
        When '3rd party app' invokes the 'Firebolt' API to 'notify that the app is ready'
        Then 'Firebolt' platform responds with 'null for lifecycle ready'

    @Lifecycle @sdk @transport @coreSDK @regression
    Scenario: Lifecycle R*4.1 Validate 'lifecycle.ready' - expecting error
        Given the environment has been set up for 'lifeCycleApi' tests
        And 3rd party 'certification' app is launched
        When '3rd party app' invokes the 'Firebolt' API to 'notify that the app is ready'
        Then 'Firebolt' platform responds with 'null for lifecycle ready'
        When '3rd party app' invokes the 'Firebolt' API to 'check if lifecycle ready expecting error'
        Then 'Firebolt' platform responds with 'custom error for lifecycle ready'
        When '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'

    @Lifecycle @sdk @transport @coreSDK @regression
    Scenario: Lifecycle R*4.6 Validate lifecycle.state - Get the current state
        Given the environment has been set up for 'lifeCycleApi' tests
        And 3rd party 'certification' app is launched
        When '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'

    @Lifecycle @coreSDK @regression @sdk @transport
    Scenario Outline: Lifecycle R*4.3 Validate lifecycle.close - '<Scenario>' expecting error
        Given the environment has been set up for 'lifeCycleApi' tests
        And 3rd party 'certification' app is launched
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Method_Content>'
        When '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'

        Examples:
            | Scenario       | API_Key                            | Method_Content                              |
            | Empty params   | close app with empty parameter     | invalid parameter error for lifecycle close |

        @Lifecycle @coreSDK @regression @sdk @transport @skipNegative
        Examples:
            | Scenario       | API_Key                            | Method_Content                              |
            | Integer params | close app with integer parameter   | invalid parameter error for lifecycle close |
            | Boolean params | close app with boolean parameter   | invalid parameter error for lifecycle close |
            | Invalid params | close app with invalid parameter   | invalid parameter error for lifecycle close |

    @Lifecycle @coreSDK @regression @sdk @transport
    Scenario Outline: Lifecycle R*4.3 Validate lifecycle.close - Positive Scenario - '<Scenario>'
        Given the environment has been set up for 'lifeCycleApi' tests
        And 3rd party 'certification' app is launched
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with 'null for lifecycle close'

        Examples:
            | Scenario           | API_Key                      |
            | with remote button | close app with remote button |
            | with user exit     | close app with user exit     |
            | with close error   | close app with error         |
            | with done          | close app with done          |

    @Lifecycle @sdk @transport @coreSDK @regression
    Scenario: Lifecycle R*4.5 Validate 'lifecycle.finished' - expecting error
        Given the environment has been set up for 'lifeCycleApi' tests
        And 3rd party 'certification' app is launched
        When '3rd party app' invokes the 'Firebolt' API to 'notify that the app is done unloading'
        Then 'Firebolt' platform responds with 'error for lifecycle finished'
        When '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'