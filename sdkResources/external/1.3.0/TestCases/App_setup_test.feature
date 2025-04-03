@Lifecycle @coreSDK
Feature: Single App Launch

    @sdk @transport
    Scenario: Validate the launch of Apple TV+ app
        Given the environment has been set up for 'app launch' tests
        When 3rd party 'firebolt' app is launched with 'apple_inc_apple_tv' appId
        And Test runner waits for 45 'seconds'
        Then 'third party app is launched' on 'home' page

    @sdk @transport @loggedin
    Scenario: Validate the launch of Apple TV+ app with 'apple_inc_apple_tv' appId with movie intent
        Given the environment has been set up for 'Deeplink' tests with 'loggedOut apps'
        When 3rd party 'firebolt' app is launched with 'apple_inc_apple_tv' appId with 'movie' intent
        And Test runner waits for 40 'seconds'
        Then 'third party app is launched' on 'details' page

    @loggedin
    Scenario: Validate the dismissal of Apple TV+ app with 'apple_inc_apple_tv' appId
        Given the environment has been set up for 'Dismiss' tests with 'loggedOut apps'
        When 3rd party 'firebolt' app is launched with 'apple_inc_apple_tv' appId with 'appLaunch' intent
        And Test runner waits for 20 'seconds'
        And 3rd party 'firebolt' app is dismissed
        And Test runner waits for 5 'seconds'
        Then 3rd party 'firebolt' app should be exited