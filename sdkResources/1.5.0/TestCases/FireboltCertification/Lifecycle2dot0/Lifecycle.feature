@Lifecycle @coreSDK
Feature: Lifecycle_Initializing

    # Need to remove
    # Scenario: Launching an App with initializing state and moving to paused state
    #     Given the environment has been set up for 'lifecycle' tests
    #     # Launching app using AppManager.launchApp or preloadApp method
    #     And 3rd party 'certification' app is launched with 'initializing' state
    #     # LifecycleManager.setTargetAppState to 'RUNNING' state
    #     When '3rd party app' transitions to state 'paused'
    #     And '3rd party app' will stay in 'paused' state


    Scenario: Launching an App with active state and moving to paused state
        Given the environment has been set up for 'lifecycle' tests
        # Launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'active' state
        # LifecycleManager.setTargetAppState to 'RUNNING' state
        When '3rd party app' transitions to state 'paused'
        And '3rd party app' will stay in 'paused' state


    Scenario: Launching an App with suspended state and moving to paused state
        Given the environment has been set up for 'lifecycle' tests
        # Launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'suspended' state
        # LifecycleManager.setTargetAppState to 'RUNNING' state
        When '3rd party app' transitions to state 'paused'
        And '3rd party app' will stay in 'paused' state

    Scenario: Launching an App with paused state and moving to active state
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'paused' state
        # LifecycleManager.setTargetAppState to 'active' state
        When '3rd party app' transitions to state 'active'
        And '3rd party app' will stay in 'active' state

    Scenario: Launching an App with paused state and moving to suspended state
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'paused' state
        # LifecycleManager.setTargetAppState to 'suspended' state
        When '3rd party app' transitions to state 'suspended'
        And '3rd party app' will stay in 'suspended' state

    Scenario: Launching an App with hibernated state and moving to suspended state
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'hibernated' state
        # LifecycleManager.setTargetAppState to 'suspended' state
        When '3rd party app' transitions to state 'suspended'
        And '3rd party app' will stay in 'suspended' state

    Scenario: Launching an App with suspended state and moving to hibernated state
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'suspended' state
        # LifecycleManager.setTargetAppState to 'hibernated' state
        When '3rd party app' transitions to state 'hibernated'
        And '3rd party app' will stay in 'hibernated' state

    # Need to remove
    # Scenario: Launching an App with initializing state and moving to active state
    #     Given the environment has been set up for 'lifecycle' tests
    #     # Launching app using AppManager.launchApp
    #     And 3rd party 'certification' app is launched with 'initializing' state
    #     # LifecycleManager.setTargetAppState to 'ACTIVE' state
    #     # state transition is not possible so expecting error
    #     When '3rd party app' transitions to state 'active'
    #     And '3rd party app' will stay in 'active' state

    Scenario: Launching an App with suspended state and moving to active state expecting error
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'suspended' state
        # LifecycleManager.setTargetAppState to 'active' state
        # state transition is not possible so expecting error
        When '3rd party app' transitions to state 'active'
        And '3rd party app' will stay in 'active' state

    Scenario: Launching an App with hibernated state and moving to active state expecting error
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'hibernated' state
        # LifecycleManager.setTargetAppState to 'active' state
        # state transition is not possible so expecting error
        When '3rd party app' transitions to state 'active'
        And '3rd party app' will stay in 'active' state


    Scenario: Launching an App with hibernated state and moving to paused state expecting error
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'hibernated' state
        # LifecycleManager.setTargetAppState to 'RUNNING' state
        # state transition is not possible so expecting error
        When '3rd party app' transitions to state 'paused'
        And '3rd party app' will stay in 'paused' state

    # Scenario: Launching an App (initializing -> suspended) expecting error
    #     Given the environment has been set up for 'lifecycle' tests
    #     #launching app using AppManager.launchApp
    #     And 3rd party 'certification' app is launched with 'initializing' state
    #     # LifecycleManager.setTargetAppState to 'suspended' state
    #     # state transition is not possible so expecting error
    #     When '3rd party app' transitions to state 'suspended'
    #     And '3rd party app' will stay in 'suspended' state

    Scenario: Launching an App with active state and moving to suspended state expecting error
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'active' state
        # LifecycleManager.setTargetAppState to 'suspended' state
        # state transition is not possible so expecting error
        When '3rd party app' transitions to state 'suspended'
        And '3rd party app' will stay in 'suspended' state


    # Scenario: Launching an App (initializing -> hibernated) expecting error
    #     Given the environment has been set up for 'lifecycle' tests
    #     #launching app using AppManager.launchApp
    #     And 3rd party 'certification' app is launched with 'initializing' state
    #     # LifecycleManager.setTargetAppState to 'hibernated' state
    #     # state transition is not possible so expecting error
    #     When '3rd party app' transitions to state 'hibernated'
    #     And '3rd party app' will stay in 'hibernated' state

    Scenario: Launching an App with paused state and moving to hibernated state expecting error
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'paused' state
        # LifecycleManager.setTargetAppState to 'hibernated' state
        # state transition is not possible so expecting error
        When '3rd party app' transitions to state 'hibernated'
        And '3rd party app' will stay in 'hibernated' state

    Scenario: Launching an App with active state and moving to hibernated state expecting error
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'active' state
        # LifecycleManager.setTargetAppState to 'hibernated' state
        # state transition is not possible so expecting error
        When '3rd party app' transitions to state 'hibernated'
        And '3rd party app' will stay in 'hibernated' state

    Scenario: Launching an App with paused state and unloading app
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'paused' state
        # Calling lifecycle.close or closeApp
        When '3rd party app' transitions to state 'unload'
        And '3rd party app' will stay in 'unload' state

    Scenario: Launching an App with suspended state and unloading app
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'suspended' state
        # Calling lifecycle.close or closeApp
        When '3rd party app' transitions to state 'unload'
        And '3rd party app' will stay in 'unload' state

    Scenario: Launching an App with hibernated state and unloading app
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'hibernated' state
        # Calling lifecycle.close or closeApp
        When '3rd party app' transitions to state 'unload'
        And '3rd party app' will stay in 'unload' state



    # Scenarios for seeting the same state is required?

    # Scenario: Launching an App with initializing state and moving to initializing state.
    #     Given the environment has been set up for 'lifecycle' tests
    #     #launching app using AppManager.launchApp
    #     And 3rd party 'certification' app is launched with 'initializing' state
    #     # LifecycleManager.setTargetAppState to 'initializing' state
    #     # No firebolt interaction logs
    #     When '3rd party app' transitions to state 'initializing'
    #     And '3rd party app' will stay in 'initializing' state

    Scenario: Launching an App with paused state and moving to paused state.
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'paused' state
        # LifecycleManager.setTargetAppState to 'paused' state
        # No firebolt interaction logs
        When '3rd party app' transitions to state 'paused'
        And '3rd party app' will stay in 'paused' state

    Scenario: Launching an App with active state and moving to active state.
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'active' state
        # LifecycleManager.setTargetAppState to 'active' state
        # No firebolt interaction logs
        When '3rd party app' transitions to state 'active'
        And '3rd party app' will stay in 'active' state

    Scenario: Launching an App with suspended state and moving to suspended state.
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'suspended' state
        # LifecycleManager.setTargetAppState to 'suspended' state
        # No firebolt interaction logs
        When '3rd party app' transitions to state 'suspended'
        And '3rd party app' will stay in 'suspended' state

    Scenario: Launching an App with hibernated state and moving to hibernated state.
        Given the environment has been set up for 'lifecycle' tests
        #launching app using AppManager.launchApp
        And 3rd party 'certification' app is launched with 'hibernated' state
        # LifecycleManager.setTargetAppState to 'hibernated' state
        # No firebolt interaction logs
        When '3rd party app' transitions to state 'hibernated'
        And '3rd party app' will stay in 'hibernated' state
