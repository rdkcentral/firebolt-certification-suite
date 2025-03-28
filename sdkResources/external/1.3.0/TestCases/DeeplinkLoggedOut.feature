Feature: DeeplinkLoggedOut

    # Deeplink test cases for logged out apps
    Scenario Outline: Validate the launch of <appName> app with '<appId>' appId with movie intent
        Given the environment has been set up for 'Deeplink' tests with 'loggedOut apps'
        When 3rd party '<appType>' app is launched with '<appId>' appId with 'movie' intent
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on '<page>' page
        Examples:
            | appName     | appType  | appId              | page    | waitTime |
            | Prime Video | hybrid   | amazonPrime        | details | 40       |
            | Apple TV+   | firebolt | apple_inc_apple_tv | details | 40       |
            | Xumo        | firebolt | xumo               | other   | 40       |
            | DisneyPlus  | badger   | disneyPlus         | auth    | 60       |
            | Tubi        | badger   | Tubi               | other   | 40       |
            | Pluto       | hybrid   | pluto              | home    | 40       |
            | Peacock     | firebolt | Peacock            | auth    | 40       |

    Scenario Outline: Validate the launch of <appName> app with '<appId>' appId with series intent
        Given the environment has been set up for 'Deeplink' tests with 'loggedOut apps'
        When 3rd party '<appType>' app is launched with '<appId>' appId with 'series' intent
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on '<page>' page
        Examples:
            | appName     | appType  | appId              | page    | waitTime |
            | Prime Video | hybrid   | amazonPrime        | details | 40       |
            | Apple TV+   | firebolt | apple_inc_apple_tv | details | 45       |
            | Xumo        | firebolt | xumo               | other   | 40       |
            | DisneyPlus  | badger   | disneyPlus         | details | 60       |
            | Tubi        | badger   | Tubi               | auth    | 40       |
            | ESPN        | badger   | ESPNPlus           | other   | 40       |
            | Pluto       | hybrid   | pluto              | other   | 40       |
            | Discovery+  | badger   | DiscoveryPlus      | auth    | 40       |
            | Peacock     | firebolt | Peacock            | auth    | 40       |

    Scenario Outline: Validate the launch of <appName> app with '<appId>' appId with song intent
        Given the environment has been set up for 'Deeplink' tests with 'loggedOut apps'
        When 3rd party '<appType>' app is launched with '<appId>' appId with 'song' intent
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on '<page>' page
        Examples:
            | appName | appType | appId   | page    | waitTime |
            | Spotify | native  | Spotify | auth    | 40       |

    Scenario Outline: Validate the launch of <appName> app with '<appId>' appId with movie intent from foreground state
        Given the environment has been set up for 'Deeplink' tests with 'loggedOut apps'
        When 3rd party '<appType>' app is launched with '<appId>' appId with 'appLaunch' intent
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on '<initialLaunchPage>' page
        When 3rd party '<appType>' app is launched with '<appId>' appId with 'movie' intent
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on '<page>' page
        Examples:
            | appName     | appType  | appId              | page    | waitTime | initialLaunchPage |
            | Prime Video | hybrid   | amazonPrime        | auth    | 40       | auth              |
            | Apple TV+   | firebolt | apple_inc_apple_tv | details | 40       | auth              |
            | Xumo        | firebolt | xumo               | other   | 40       | other             |
            | DisneyPlus  | badger   | disneyPlus         | auth    | 60       | auth              |
            | Tubi        | badger   | Tubi               | other   | 40       | home              |
            | Pluto       | hybrid   | pluto              | home    | 40       | other             |
            | Peacock     | firebolt | Peacock            | auth    | 40       | auth              |

    Scenario Outline: Validate the launch of <appName> app with '<appId>' appId with movie intent from background state
        Given the environment has been set up for 'Deeplink' tests with 'loggedOut apps'
        When 3rd party '<appType>' app is launched with '<appId>' appId with 'appLaunch' intent
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on '<initialLaunchPage>' page
        When '<appId>' transitions to state 'background'
        And Test runner waits for <waitTime> 'seconds'
        When 3rd party '<appType>' app is launched with '<appId>' appId with 'movie' intent
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on '<page>' page
        Examples:
            | appName     | appType  | appId              | page    | waitTime | initialLaunchPage |
            | Prime Video | hybrid   | amazonPrime        | auth    | 40       | auth              |
            | Apple TV+   | firebolt | apple_inc_apple_tv | details | 40       | auth              |
            | Xumo        | firebolt | xumo               | other   | 40       | other             |
            | DisneyPlus  | badger   | disneyPlus         | auth    | 60       | auth              |
            | Tubi        | badger   | Tubi               | other   | 40       | home              |
            | Pluto       | hybrid   | pluto              | home    | 40       | other             |
            | Peacock     | firebolt | Peacock            | auth    | 40       | auth              |

    Scenario Outline: Validate the launch of <appName> app with '<appId>' appId with series intent from foreground state
        Given the environment has been set up for 'Deeplink' tests with 'loggedOut apps'
        When 3rd party '<appType>' app is launched with '<appId>' appId with 'appLaunch' intent
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on '<initialLaunchPage>' page
        When 3rd party '<appType>' app is launched with '<appId>' appId with 'series' intent
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on '<page>' page
        Examples:
            | appName     | appType  | appId              | page    | waitTime | initialLaunchPage |
            | Prime Video | hybrid   | amazonPrime        | auth    | 40       | auth              |
            | Apple TV+   | firebolt | apple_inc_apple_tv | details | 45       | auth              |
            | Xumo        | firebolt | xumo               | other   | 40       | other             |
            | DisneyPlus  | badger   | disneyPlus         | auth    | 60       | auth              |
            | Tubi        | badger   | Tubi               | auth    | 40       | home              |
            | ESPN        | badger   | ESPNPlus           | other   | 40       | home              |
            | Pluto       | hybrid   | pluto              | other   | 40       | other             |
            | Discovery+  | badger   | DiscoveryPlus      | auth    | 40       | auth              |
            | Peacock     | firebolt | Peacock            | auth    | 40       | auth              |

    Scenario Outline: Validate the launch of <appName> app with '<appId>' appId with series intent from background state
        Given the environment has been set up for 'Deeplink' tests with 'loggedOut apps'
        When 3rd party '<appType>' app is launched with '<appId>' appId with 'appLaunch' intent
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on '<initialLaunchPage>' page
        When '<appId>' transitions to state 'background'
        And Test runner waits for <waitTime> 'seconds'
        When 3rd party '<appType>' app is launched with '<appId>' appId with 'series' intent
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on '<page>' page
        Examples:
            | appName     | appType  | appId              | page    | waitTime | initialLaunchPage |
            | Prime Video | hybrid   | amazonPrime        | auth    | 40       | auth              |
            | Apple TV+   | firebolt | apple_inc_apple_tv | details | 45       | auth              |
            | Xumo        | firebolt | xumo               | other   | 40       | other             |
            | DisneyPlus  | badger   | disneyPlus         | auth    | 60       | auth              |
            | Tubi        | badger   | Tubi               | auth    | 40       | home              |
            | ESPN        | badger   | ESPNPlus           | other   | 40       | home              |
            | Pluto       | hybrid   | pluto              | other   | 40       | other             |
            | Discovery+  | badger   | DiscoveryPlus      | auth    | 40       | auth              |
            | Peacock     | firebolt | Peacock            | auth    | 40       | auth              |
