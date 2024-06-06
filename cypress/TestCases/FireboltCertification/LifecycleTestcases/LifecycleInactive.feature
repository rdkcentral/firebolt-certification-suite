# Commented step definitions to be implemented once not supported methods are implemented and tested
# Validation objects are not added for not supported methods
@Lifecycle @coreSDK
Feature: Lifecycle_Inactive

    Scenario Outline: Lifecycle 2.3.1 Close an app from <state>
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with '<state>' state
        When '3rd party app' transitions to state 'inactive'
        Then '3rd party app' will be in 'inactive' state
        Examples:
            | state      |
            | foreground |
            | background |

    @lifecycleManagement
    Scenario: Lifecycle 2.3.3 No impact on closing app from inactive state
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'inactive' state
        # And 1st party app invokes the API to 'get lifecycle management state'
        When '3rd party app' invokes the 'Firebolt' API to 'close app with remote button'
        # And 1st party app invokes the API to 'get lifecycle management state'
        Then '3rd party app' will stay in 'inactive' state
        # Then 'Firebolt' platform responds with 'last two responses for lifecycleManagement state'