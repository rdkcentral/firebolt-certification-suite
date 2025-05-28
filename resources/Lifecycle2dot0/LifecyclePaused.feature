@Lifecycle
Feature: Lifecycle_Paused

    Scenario: Launching an App with active state and moving to paused state
        Given the environment has been set up for 'lifecycle' tests
        # Launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'active' state
        # LifecycleManager.setTargetAppState to 'RUNNING' state
        When '3rd party app' transitions to state 'paused'
        And '3rd party app' will be in 'paused' state

    Scenario: Launching an App with suspended state and moving to paused state
        Given the environment has been set up for 'lifecycle' tests
        # Launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'suspended' state
        # LifecycleManager.setTargetAppState to 'RUNNING' state
        When '3rd party app' transitions to state 'paused'
        And '3rd party app' will be in 'paused' state

    Scenario: Launching an App with hibernated state and moving to paused state expecting error
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'hibernated' state
        # LifecycleManager.setTargetAppState to 'RUNNING' state
        # state transition is not possible so expecting error
        When '3rd party app' transitions to state 'paused'
        And '3rd party app' will be in 'paused' state

    Scenario: Launching an App with paused state and moving to paused state.
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'paused' state
        # LifecycleManager.setTargetAppState to 'paused' state
        # No firebolt interaction logs
        When '3rd party app' transitions to state 'paused'
        And '3rd party app' will stay in 'paused' state