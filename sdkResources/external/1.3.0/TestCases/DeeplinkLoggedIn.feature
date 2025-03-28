Feature: DeeplinkLoggedIn

    # Deeplink test cases for logged in apps
    Scenario Outline: Validate the launch of <appName> app with '<appId>' appId with movie intent
        Given the environment has been set up for 'Deeplink' tests with 'loggedIn apps'
        When 3rd party '<appType>' app is launched with '<appId>' appId with 'movie' intent
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on '<page>' page

        Examples:
            | appName     | appType  | appId              | page    | waitTime |
            | Prime Video | hybrid   | amazonPrime        | details | 40       |
            | Apple TV+   | firebolt | apple_inc_apple_tv | details | 40       |
            | Xumo        | firebolt | xumo               | details | 40       |
            | DisneyPlus  | badger   | disneyPlus         | details | 60       |
            | Tubi        | badger   | Tubi               | details | 40       |
            | Pluto       | hybrid   | pluto              | details | 40       |
            | Peacock     | firebolt | Peacock            | details | 40       |

    Scenario Outline: Validate the launch of <appName> app with '<appId>' appId with series intent
        Given the environment has been set up for 'Deeplink' tests with 'loggedIn apps'
        When 3rd party '<appType>' app is launched with '<appId>' appId with 'series' intent
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on '<page>' page

        Examples:
            | appName     | appType  | appId              | page    | waitTime |
            | Prime Video | hybrid   | amazonPrime        | details | 40       |
            | Apple TV+   | firebolt | apple_inc_apple_tv | details | 45       |
            | Xumo        | firebolt | xumo               | details | 40       |
            | DisneyPlus  | badger   | disneyPlus         | details | 60       |
            | Tubi        | badger   | Tubi               | details | 40       |
            | ESPN        | badger   | ESPNPlus           | details | 40       |
            | Pluto       | hybrid   | pluto              | details | 40       |
            | Discovery+  | badger   | DiscoveryPlus      | details | 40       |
            | Peacock     | firebolt | Peacock            | details | 40       |

    Scenario Outline: Validate the launch of <appName> app with '<appId>' appId with song intent
        Given the environment has been set up for 'Deeplink' tests with 'loggedIn apps'
        When 3rd party '<appType>' app is launched with '<appId>' appId with 'song' intent
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on '<page>' page

        Examples:
            | appName | appType | appId   | page    | waitTime |
            | Spotify | badger  | Spotify | details | 40       |

    Scenario Outline: Validate the launch of <appName> app with '<appId>' appId with movie intent from foreground state
        Given the environment has been set up for 'Deeplink' tests with 'loggedIn apps'
        When 3rd party '<appType>' app is launched with '<appId>' appId with 'appLaunch' intent
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on 'home' page
        When 3rd party '<appType>' app is launched with '<appId>' appId with 'movie' intent
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on '<page>' page

        Examples:
            | appName     | appType  | appId              | page    | waitTime |
            | Prime Video | hybrid   | amazonPrime        | details | 40       |
            | Apple TV+   | firebolt | apple_inc_apple_tv | details | 40       |
            | Xumo        | firebolt | xumo               | details | 40       |
            | DisneyPlus  | badger   | disneyPlus         | details | 60       |
            | Tubi        | badger   | Tubi               | details | 40       |
            | Pluto       | hybrid   | pluto              | details | 40       |
            | Peacock     | firebolt | Peacock            | details | 40       |

    Scenario Outline: Validate the launch of <appName> app with '<appId>' appId with movie intent from background state
        Given the environment has been set up for 'Deeplink' tests with 'loggedIn apps'
        When 3rd party '<appType>' app is launched with '<appId>' appId with 'appLaunch' intent
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on 'home' page
        When '<appId>' transitions to state 'background'
        And Test runner waits for <waitTime> 'seconds'
        When 3rd party '<appType>' app is launched with '<appId>' appId with 'movie' intent
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on '<page>' page

        Examples:
            | appName     | appType  | appId              | page    | waitTime |
            | Prime Video | hybrid   | amazonPrime        | details | 40       |
            | Apple TV+   | firebolt | apple_inc_apple_tv | details | 40       |
            | Xumo        | firebolt | xumo               | details | 40       |
            | DisneyPlus  | badger   | disneyPlus         | details | 60       |
            | Tubi        | badger   | Tubi               | details | 40       |
            | Pluto       | hybrid   | pluto              | details | 40       |
            | Peacock     | firebolt | Peacock            | details | 40       |

    Scenario Outline: Validate the launch of <appName> app with '<appId>' appId with series intent from foreground state
        Given the environment has been set up for 'Deeplink' tests with 'loggedIn apps'
        When 3rd party '<appType>' app is launched with '<appId>' appId with 'appLaunch' intent
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on 'home' page
        When 3rd party '<appType>' app is launched with '<appId>' appId with 'series' intent
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on '<page>' page

        Examples:
            | appName     | appType  | appId              | page    | waitTime |
            | Prime Video | hybrid   | amazonPrime        | details | 40       |
            | Apple TV+   | firebolt | apple_inc_apple_tv | details | 45       |
            | Xumo        | firebolt | xumo               | details | 40       |
            | DisneyPlus  | badger   | disneyPlus         | details | 60       |
            | Tubi        | badger   | Tubi               | details | 40       |
            | ESPN        | badger   | ESPNPlus           | details | 40       |
            | Pluto       | hybrid   | pluto              | details | 40       |
            | Discovery+  | badger   | DiscoveryPlus      | details | 40       |
            | Peacock     | firebolt | Peacock            | details | 40       |

    Scenario Outline: Validate the launch of <appName> app with '<appId>' appId with series intent from background state
        Given the environment has been set up for 'Deeplink' tests with 'loggedIn apps'
        When 3rd party '<appType>' app is launched with '<appId>' appId with 'appLaunch' intent
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on 'home' page
        When '<appId>' transitions to state 'background'
        And Test runner waits for <waitTime> 'seconds'
        When 3rd party '<appType>' app is launched with '<appId>' appId with 'series' intent
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on '<page>' page

        Examples:
            | appName     | appType  | appId              | page    | waitTime |
            | Prime Video | hybrid   | amazonPrime        | details | 40       |
            | Apple TV+   | firebolt | apple_inc_apple_tv | details | 45       |
            | Xumo        | firebolt | xumo               | details | 40       |
            | DisneyPlus  | badger   | disneyPlus         | details | 60       |
            | Tubi        | badger   | Tubi               | details | 40       |
            | ESPN        | badger   | ESPNPlus           | details | 40       |
            | Pluto       | hybrid   | pluto              | details | 40       |
            | Discovery+  | badger   | DiscoveryPlus      | details | 40       |
            | Peacock     | firebolt | Peacock            | details | 40       |
