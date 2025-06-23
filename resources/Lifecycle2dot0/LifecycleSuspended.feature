@Lifecycle
Feature: Lifecycle_Suspended

    Scenario: Launching an App with paused state and moving to suspended state
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'paused' state
        # LifecycleManager.setTargetAppState to 'suspended' state
        When '3rd party app' transitions to state 'suspended'
        Then '3rd party app' will be in 'suspended' state

    Scenario: Launching an App with hibernated state and moving to suspended state
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'hibernated' state
        # LifecycleManager.setTargetAppState to 'suspended' state
        When '3rd party app' transitions to state 'suspended'
        Then '3rd party app' will be in 'suspended' state

    Scenario: Launching an App with active state and moving to suspended state expecting error
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'active' state
        # LifecycleManager.setTargetAppState to 'suspended' state
        # state transition is not possible so expecting error
        When '3rd party app' transitions to state 'suspended'
        Then '3rd party app' will stay in 'active' state

    Scenario: Launching an App with suspended state and moving to suspended state.
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'suspended' state
        # LifecycleManager.setTargetAppState to 'suspended' state
        # No firebolt interaction logs
        When '3rd party app' transitions to state 'suspended'
        Then '3rd party app' will stay in 'suspended' state