@Lifecycle
Feature: Lifecycle_Active

    Scenario: Validating 3rd party app launched with active state successfully
        # Sending message to bolt to register all Thunder events
        Given the environment has been set up for 'lifecycle' tests
        # launching app using AppManager.launchApp, by default it will be in 'active' state
        And 3rd party 'certification' app is launched
        # Thunder events validation: LOADING, INITIALIZING, PAUSED, ACTIVE
        # Firebolt interaction validations: onStart, onActivate
        # State validation: TBD
        Then '3rd party app' will be in 'active' state

    Scenario: Launching an App with active state and closing the app
        # Sending message to bolt to register all Thunder events
        Given the environment has been set up for 'lifecycle' tests
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
