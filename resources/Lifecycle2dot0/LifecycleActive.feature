@Lifecycle2
Feature: Lifecycle_Active

    Scenario: Validating 3rd party app launched with active state successfully
        # Sending message to bolt to register all Thunder events
        Given the environment has been set up for 'lifecycle2' tests
        # launching app using AppManager.launchApp, by default it will be in 'active' state
        And 3rd party 'certification' app is launched
        # Thunder events validation: LOADING, INITIALIZING, PAUSED, ACTIVE
        # Firebolt interaction validations: onStart, onActivate
        # State validation: TBD
        Then '3rd party app' will be in 'active' state

    Scenario: Launching an App with paused state and moving to active state
        Given the environment has been set up for 'lifecycle2' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'paused' state
        # LifecycleManager.setTargetAppState to 'active' state
        When '3rd party app' transitions to state 'active'
        Then '3rd party app' will be in 'active' state

    Scenario: Launching an App with suspended state and moving to active state expecting error
        Given the environment has been set up for 'lifecycle2' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'suspended' state
        # LifecycleManager.setTargetAppState to 'active' state
        # state transition is not possible so expecting error
        When '3rd party app' transitions to state 'active'
        Then '3rd party app' will stay in 'suspended' state

    Scenario: Launching an App with hibernated state and moving to active state expecting error
        Given the environment has been set up for 'lifecycle2' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'hibernated' state
        # LifecycleManager.setTargetAppState to 'active' state
        # state transition is not possible so expecting error
        When '3rd party app' transitions to state 'active'
        Then '3rd party app' will stay in 'hibernated' state

    Scenario: Launching an App with active state and moving to active state.
        Given the environment has been set up for 'lifecycle2' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'active' state
        # LifecycleManager.setTargetAppState to 'active' state
        # No firebolt interaction logs
        When '3rd party app' transitions to state 'active'
        Then '3rd party app' will stay in 'active' state