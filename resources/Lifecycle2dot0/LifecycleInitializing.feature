@Lifecycle
Feature: Lifecycle_Initializing

    Scenario: Launching an App with initializing state and moving to paused state
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'initializing' state
        # Assuming app is in 'initializing' state after launch and moving to 'paused' state after lifecyle.ready       
        When '3rd party app' invokes the 'Firebolt' API to 'lifecycle ready'
        Then '3rd party app' will be in 'paused' state