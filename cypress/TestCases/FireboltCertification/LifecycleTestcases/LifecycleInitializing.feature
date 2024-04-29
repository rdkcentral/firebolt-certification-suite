# Commented step definitions to be implemented once not supported methods are implemented and tested    
# Validation objects are not added for not supported methods
Feature: Lifecycle_Initializing
    
    @Lifecycle @coreSDK @notSupported
    Scenario: Lifecycle 2.3.2 Cannot Close an app from initializing
        Given the environment has been set up for 'lifecycle' tests
        And 3rd party 'certification' app is launched with 'initializing' state
        # And 1st party app invokes the API to 'get lifecycle management state'
        When '3rd party app' invokes the 'Firebolt' API to 'close app with remote button'
        Then 'Firebolt' platform responds with 'null for lifecycle close'
        And '3rd party app' is in 'initializing' state
        # And 1st party app invokes the API to 'get lifecycle management state'
        # Then 'Firebolt' platform responds with 'message and code for lifecycle close'
        # Then 'Firebolt' platform responds with 'last two responses for lifecycleManagement state'
