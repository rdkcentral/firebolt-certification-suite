Feature: Lifecycle_Inactive

    @Lifecycle @coreSDK
    Scenario Outline: Close an app from <state>
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with '<state>' state
        When '3rd party app' transitions to state 'inactive'
        Then '3rd party app' is in 'inactive' state
        Examples:
            | state      |
            | foreground |
            | background |

    # Commented step definitions to be implemented once design is worked out
    @Lifecycle @coreSDK @lifecycleManagement
    Scenario: No impact on closing app from inactive state
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'inactive' state
        #And I call 'LifecycleManagement.state' api
        When '3rd party app' invokes the 'Firebolt' API to 'close app with remote button'
        #And I call 'LifecycleManagement.state' api
        Then '3rd party app' is in 'inactive' state
        #And I validate last '2' response are same for 'LifecycleManagement.state' API method