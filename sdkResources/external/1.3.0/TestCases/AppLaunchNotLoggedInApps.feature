Feature: App Launch-not logged in apps

    Scenario Outline: Validate the launch of <appName> app with '<appId>' appId
        Given the environment has been set up for 'app launch' tests
        And 3rd party '<appType>' app is launched with '<appId>' appId
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on '<page>' page

        Examples:
            | appName        | appId               | page   | waitTime | appType  |
            | Apple TV+      | apple_inc_apple_tv  | auth   | 45       | firebolt |
            | Spectrum       | charter_spectrum_tv | search | 50       | firebolt |
           