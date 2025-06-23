@Lifecycle
Feature: Lifecycle_Unload

    Scenario: Launching an App with paused state and unloading app
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'paused' state
        # Calling lifecycle.close or closeApp
        When '3rd party app' transitions to state 'unload'
        Then '3rd party app' will be in 'unload' state

    Scenario: Launching an App with suspended state and unloading app
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'suspended' state
        # Calling lifecycle.close or closeApp
        When '3rd party app' transitions to state 'unload'
        Then '3rd party app' will be in 'unload' state

    Scenario: Launching an App with hibernated state and unloading app
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'hibernated' state
        # Calling lifecycle.close or closeApp
        When '3rd party app' transitions to state 'unload'
        Then '3rd party app' will be in 'unload' state
