@Lifecycle2
Feature: Lifecycle_Suspended

    Scenario: Launching an App with paused state and moving to suspended state
        Given the environment has been set up for 'lifecycle2' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'paused' state
        # LifecycleManager.setTargetAppState to 'suspended' state
        When '3rd party app' transitions to state 'suspended'
        Then '3rd party app' will be in 'suspended' state

    Scenario: Launching an App with hibernated state and moving to suspended state
        Given the environment has been set up for 'lifecycle2' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'hibernated' state
        # LifecycleManager.setTargetAppState to 'suspended' state
        When '3rd party app' transitions to state 'suspended'
        Then '3rd party app' will be in 'suspended' state

    Scenario: Launching an App with active state and moving to suspended state expecting error
        Given the environment has been set up for 'lifecycle2' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'active' state
        # LifecycleManager.setTargetAppState to 'suspended' state
        # state transition is not possible so expecting error
        When '3rd party app' transitions to state 'suspended'
        Then '3rd party app' will stay in 'active' state

    Scenario: Launching an App with suspended state and moving to suspended state.
        Given the environment has been set up for 'lifecycle2' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'suspended' state
        # LifecycleManager.setTargetAppState to 'suspended' state
        # No firebolt interaction logs
        When '3rd party app' transitions to state 'suspended'
        Then '3rd party app' will stay in 'suspended' state

    Scenario: Launching an App with active state and closing the app
        # Sending message to bolt to register all Thunder events
        Given the environment has been set up for 'lifecycle2' tests
        # launching app using AppManager.launchApp, by default it will be in 'active' state
        And 3rd party 'certification' app is launched
        # Thunder events validation: LOADING, INITIALIZING, PAUSED, ACTIVE
        # Firebolt interaction validations: onStart, onActivate
        Then '3rd party app' will be in 'active' state
        # TODO: Need to separate step definition for closeApp etc.
        When '3rd party app' invokes the 'Firebolt' API to 'closeApp'
        # Thunder events validation: PAUSED, TERMINATING
        # Firebolt interaction validations: onPause
        Then '3rd party app' will be in 'paused' state
        When '3rd party app' transitions to state 'suspended'
        # Firebolt interaction validations: onSuspend
        Then '3rd party app' will be in 'suspended' state
