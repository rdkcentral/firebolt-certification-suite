Feature: Dismiss

    Scenario Outline: Validate the dismissal of <appName> app with '<appId>' appId
        Given the environment has been set up for 'Dismiss' tests with 'loggedOut apps'
        And 3rd party '<appType>' app is launched with '<appId>' appId with 'appLaunch' intent
        And Test runner waits for <waitTime> 'seconds'
        Then '<appId>' will be in 'foreground' state
        When 3rd party '<appType>' app is dismissed
        And Test runner waits for 10 'seconds'
        Then 3rd party '<appType>' app should be exited

        Examples:
            | appName        | appType  | appId               | waitTime |
            | Apple TV+      | firebolt | apple_inc_apple_tv  | 30       |
            | Spectrum       | firebolt | charter_spectrum_tv | 20       |
            | DisneyPlus     | badger   | disneyPlus          | 20       |
            | Spotify        | badger   | Spotify             | 20       |
            | Pluto          | hybrid   | pluto               | 20       |
            | ESPN           | badger   | ESPNPlus            | 20       |
            | Hulu           | badger   | Hulu                | 20       |
            | Xfinity Stream | firebolt | Comcast_StreamApp   | 20       |
            | HBO Max        | badger   | hbo_hbomax          | 20       |
            | Peacock        | firebolt | Peacock             | 20       |
            | Prime Video    | hybrid   | amazonPrime         | 20       |
            | Discovery+     | badger   | DiscoveryPlus       | 20       |
            | Youtube        | native   | YouTube             | 20       |
            | Netflix        | native   | NetflixApp          | 20       |
            | Tubi           | badger   | Tubi                | 20       |
            | Sling          | badger   | Sling               | 20       |
            | Paramount+     | firebolt | ParamountPlus       | 20       |
            | Xumo           | firebolt | xumo                | 20       |
