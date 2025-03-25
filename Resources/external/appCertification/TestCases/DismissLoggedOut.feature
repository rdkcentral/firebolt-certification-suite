Feature: Dismiss

    @loggedOut
    Scenario Outline: Validate the dismissal of <appName> app with '<appId>' appId
        Given the environment has been set up for 'Dismiss' tests with 'loggedOut apps'
        And 3rd party '<appType>' app is launched with '<appId>' appId with 'appLaunch' intent
        And Test runner waits for <waitTime> 'seconds'
        And 3rd party '<appType>' app is dismissed
        And Test runner waits for 5 'seconds'
        Then 3rd party '<appType>' app should be exited

        Examples:
            | appName        | appType  | appId               | waitTime |
            | Apple TV+      | firebolt | apple_inc_apple_tv  | 20       |
            # | Spectrum       | firebolt | charter_spectrum_tv | 20       |
            # | DisneyPlus     | badger   | disneyPlus          | 20       |
            # | Spotify        | native   | Spotify             | 20       |
            | Tubi           | badger   | Tubi                | 20       |
            # | Pluto          | badger   | pluto               | 20       |
            # | Sling          | firebolt | Sling               | 20       |
            # | ESPN           | badger   | ESPNPlus            | 20       |
            # | Hulu           | firebolt | Hulu                | 20       |
            # | Paramount+     | firebolt | ParamountPlus       | 20       |
            # | Xfinity Stream | firebolt | Comcast_StreamApp   | 20       |
            # | Xumo           | firebolt | xumo                | 20       |
            # | HBO Max        | firebolt | hbo_hbomax          | 20       |
            | Peacock        | firebolt | Peacock             | 20       |
            # | Prime Video    | firebolt | amazonPrime         | 20       |
            # | Discovery+     | badger   | DiscoveryPlus       | 20       |
            | Youtube        | native   | YouTube             | 20       |
            # | Netflix        | native   | NetflixApp          | 20       |
