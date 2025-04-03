Feature: App Assurance Logged Out

    @appLaunch
    Scenario: Validate the launch of an app
        Given the environment has been set up for 'app launch' tests
        When 3rd party 'appType' app is launched with 'appAssuranceId' appId
        And Test runner waits for 45 'seconds'
        Then 'third party app is launched' on 'home|auth' page

    # ---------------Dismiss logged out apps---------------------
    @dismiss @appLaunch
    Scenario: Validate the dismissal of an app with 'appAssuranceId' appId with appLaunch intent
        Given the environment has been set up for 'Dismiss' tests with 'loggedOut apps'
        When 3rd party 'appType' app is launched with 'appAssuranceId' appId with 'appLaunch' intent
        And Test runner waits for 40 'seconds'
        And 3rd party 'appType' app is dismissed
        And Test runner waits for 5 'seconds'
        Then 3rd party 'appType' app should be exited
    
    @dismiss @movie
    Scenario: Validate the dismissal of an app with 'appAssuranceId' appId with movie intent
        Given the environment has been set up for 'Dismiss' tests with 'loggedOut apps'
        When 3rd party 'appType' app is launched with 'appAssuranceId' appId with 'movie' intent
        And Test runner waits for 40 'seconds'
        And 3rd party 'appType' app is dismissed
        And Test runner waits for 5 'seconds'
        Then 3rd party 'appType' app should be exited
    
    @dismiss @series
    Scenario: Validate the dismissal of an app with 'appAssuranceId' appId with series intent
        Given the environment has been set up for 'Dismiss' tests with 'loggedOut apps'
        When 3rd party 'appType' app is launched with 'appAssuranceId' appId with 'series' intent
        And Test runner waits for 45 'seconds'
        And 3rd party 'appType' app is dismissed
        And Test runner waits for 5 'seconds'
        Then 3rd party 'appType' app should be exited
