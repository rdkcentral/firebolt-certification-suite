Feature: App Assurance Logged IN

    @appLaunch
    Scenario: Validate the launch of an app
        Given the environment has been set up for 'app launch' tests
        When 3rd party 'appType' app is launched with 'appAssuranceId' appId
        And Test runner waits for 45 'seconds'
        Then 'third party app is launched' on 'home' page

    # ---------------Dismiss loggedIn apps--------------------
    @dismiss @appLaunch
    Scenario: Validate the dismissal of an app with 'appAssuranceId' appId for appLaunch intent
        Given the environment has been set up for 'Dismiss' tests with 'loggedIn apps'
        When 3rd party 'appType' app is launched with 'appAssuranceId' appId with 'appLaunch' intent
        And Test runner waits for 40 'seconds'
        And 3rd party 'appType' app is dismissed
        And Test runner waits for 5 'seconds'
        Then 3rd party 'appType' app should be exited

    @dismiss @movie
    Scenario: Validate the dismissal of an app with 'appAssuranceId' appId for movie intent
        Given the environment has been set up for 'Dismiss' tests with 'loggedIn apps'
        When 3rd party 'appType' app is launched with 'appAssuranceId' appId with 'movie' intent
        And Test runner waits for 40 'seconds'
        And 3rd party 'appType' app is dismissed
        And Test runner waits for 5 'seconds'
        Then 3rd party 'appType' app should be exited

    @dismiss @series
    Scenario: Validate the dismissal of an app with 'appAssuranceId' appId for series intent
        Given the environment has been set up for 'Dismiss' tests with 'loggedIn apps'
        When 3rd party 'appType' app is launched with 'appAssuranceId' appId with 'series' intent
        And Test runner waits for 45 'seconds'
        And 3rd party 'appType' app is dismissed
        And Test runner waits for 5 'seconds'
        Then 3rd party 'appType' app should be exited

    @dismiss @song
    Scenario: Validate the dismissal of an app with 'appAssuranceId' appId for song intent
        Given the environment has been set up for 'Dismiss' tests with 'loggedIn apps'
        When 3rd party 'appType' app is launched with 'appAssuranceId' appId with 'song' intent
        And Test runner waits for 45 'seconds'
        And 3rd party 'appType' app is dismissed
        And Test runner waits for 5 'seconds'
        Then 3rd party 'appType' app should be exited

    # ---------------Deeplink loggedIn apps--------------------
    @deeplink @movie
    Scenario: Validate the launch of an app with 'appAssuranceId' appId with movie intent
        Given the environment has been set up for 'Deeplink' tests with 'loggedIn apps'
        When 3rd party 'appType' app is launched with 'appAssuranceId' appId with 'movie' intent
        And Test runner waits for 50 'seconds'
        Then 'third party app is launched' on 'details' page

    @deeplink @series
    Scenario: Validate the launch of an app with 'appAssuranceId' appId with series intent
        Given the environment has been set up for 'Deeplink' tests with 'loggedIn apps'
        When 3rd party 'appType' app is launched with 'appAssuranceId' appId with 'series' intent
        And Test runner waits for 50 'seconds'
        Then 'third party app is launched' on 'details' page

    @deeplink @song
    Scenario: Validate the launch of an app with 'appAssuranceId' appId with song intent
        Given the environment has been set up for 'Deeplink' tests with 'loggedIn apps'
        When 3rd party 'appType' app is launched with 'appAssuranceId' appId with 'song' intent
        And Test runner waits for 50 'seconds'
        Then 'third party app is launched' on 'details' page

    @deeplink @search
    Scenario: Validate the launch of an app with 'appAssuranceId' appId with search intent
        Given the environment has been set up for 'Deeplink' tests with 'loggedIn apps'
        When 3rd party 'appType' app is launched with 'appAssuranceId' appId with 'search' intent
        And Test runner waits for 50 'seconds'
        Then 'third party app is launched' on 'details' page
