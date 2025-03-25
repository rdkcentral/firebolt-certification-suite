Feature: Dismiss

    @loggedin
    Scenario Outline: Validate the dismissal of <appName> app with '<appId>' appId
        Given the environment has been set up for 'Dismiss' tests with 'loggedIn apps'
        And 3rd party '<appType>' app is launched with '<appId>' appId with 'appLaunch' intent
        And Test runner waits for <waitTime> 'seconds'
        And 3rd party '<appType>' app is dismissed
        And Test runner waits for 5 'seconds'
        Then 3rd party '<appType>' app should be exited

        Examples:
            | appName        | appType  | appId               | waitTime |
            | Apple TV+      | firebolt | apple_inc_apple_tv  | 20       |
            | Spectrum       | firebolt | charter_spectrum_tv | 20       |
            | DisneyPlus     | badger   | disneyPlus          | 20       |
            | Spotify        | native   | Spotify             | 20       |
            | Tubi           | badger   | Tubi                | 20       |
            | Pluto          | badger   | pluto               | 20       |
            | Sling          | firebolt | Sling               | 20       |
            | ESPN           | badger   | ESPNPlus            | 20       |
            | Hulu           | firebolt | Hulu                | 20       |
            | Paramount+     | firebolt | ParamountPlus       | 20       |
            | Xfinity Stream | firebolt | Comcast_StreamApp   | 20       |
            | Xumo           | firebolt | xumo                | 20       |
            | HBO Max        | firebolt | hbo_hbomax          | 20       |
            | Peacock        | firebolt | Peacock             | 20       |
            | Prime Video    | firebolt | amazonPrime         | 20       |
            | Discovery+     | badger   | DiscoveryPlus       | 20       |
            | Youtube        | native   | YouTube             | 20       |
            | Netflix        | native   | NetflixApp          | 20       |

    # Dismiss test cases for logged in apps
    @sdk @transport @loggedin
    Scenario Outline: Validate the dismissal of <appName> app with '<appId>' appId with movie intent
        Given the environment has been set up for 'Dismiss' tests with 'loggedIn apps'
        And 3rd party '<appType>' app is launched with '<appId>' appId with 'movie' intent
        And Test runner waits for <waitTime> 'seconds'
        And 3rd party '<appType>' app is dismissed
        And Test runner waits for <waitTime> 'seconds'
        Then 3rd party '<appType>' app should be exited

        Examples:
            | appName     | appType  | appId              | waitTime |
            | Prime Video | badger   | amazonPrime        | 40       |
            | Apple TV+   | firebolt | apple_inc_apple_tv | 40       |
            | Xumo        | firebolt | xumo               | 40       |
            | DisneyPlus  | badger   | disneyPlus         | 60       |
            | Tubi        | badger   | Tubi               | 40       |
            | Pluto       | badger   | pluto              | 40       |
            | Peacock     | firebolt | Peacock            | 40       |

    @sdk @transport @loggedin
    Scenario Outline: Validate the dismissal of <appName> app with '<appId>' appId with series intent
        Given the environment has been set up for 'Dismiss' tests with 'loggedIn apps'
        And 3rd party '<appType>' app is launched with '<appId>' appId with 'series' intent
        And Test runner waits for <waitTime> 'seconds'
        And 3rd party '<appType>' app is dismissed
        And Test runner waits for <waitTime> 'seconds'
        Then 3rd party '<appType>' app should be exited

        Examples:
            | appName     | appType  | appId              | waitTime |
            | Prime Video | badger   | amazonPrime        | 40       |
            | Apple TV+   | firebolt | apple_inc_apple_tv | 45       |
            | Xumo        | firebolt | xumo               | 40       |
            | DisneyPlus  | badger   | disneyPlus         | 60       |
            | Tubi        | badger   | Tubi               | 40       |
            | ESPN        | badger   | ESPNPlus           | 40       |
            | Pluto       | badger   | pluto              | 40       |
            | Discovery+  | badger   | DiscoveryPlus      | 40       |
            | Peacock     | firebolt | Peacock            | 40       |

    @sdk @transport @loggedin
    Scenario Outline: Validate the dismissal of <appName> app with '<appId>' appId with song intent
        Given the environment has been set up for 'Dismiss' tests with 'loggedIn apps'
        And 3rd party '<appType>' app is launched with '<appId>' appId with 'song' intent
        And Test runner waits for <waitTime> 'seconds'
        And 3rd party '<appType>' app is dismissed
        And Test runner waits for <waitTime> 'seconds'
        Then 3rd party '<appType>' app should be exited

        Examples:
            | appName | appType | appId   | waitTime |
            | Spotify | native  | Spotify | 40       |

