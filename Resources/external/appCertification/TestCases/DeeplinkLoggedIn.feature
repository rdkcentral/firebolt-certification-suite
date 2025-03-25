Feature: DeeplinkLoggedIn

    @Lifecycle @sdk @transport @coreSDK @loggedin
    Scenario Outline: Validate the launch of <appName> app with '<appId>' appId with movie intent
        Given the environment has been set up for 'Deeplink' tests with 'loggedIn apps'
        When 3rd party '<appType>' app is launched with '<appId>' appId with 'movie' intent
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on '<page>' page

        Examples:
            | appName     | appType  | appId              | page    | waitTime |
            # | Prime Video | badger   | amazonPrime        | details | 40       |
            | Apple TV+   | firebolt | apple_inc_apple_tv | details | 40       |
            | Xumo        | firebolt | xumo               | details | 40       |
            # | DisneyPlus  | badger   | disneyPlus         | details | 60       |
            # | Tubi        | badger   | Tubi               | details | 40       |
            # | Pluto       | badger   | pluto              | details | 40       |
            # | Peacock     | firebolt | Peacock            | details | 40       |

    @Lifecycle @sdk @transport @coreSDK @loggedin
    Scenario Outline: Validate the launch of <appName> app with '<appId>' appId with series intent
        Given the environment has been set up for 'Deeplink' tests with 'loggedIn apps'
        When 3rd party '<appType>' app is launched with '<appId>' appId with 'series' intent
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on '<page>' page

        Examples:
            | appName     | appType  | appId              | page    | waitTime |
            | Prime Video | badger   | amazonPrime        | details | 40       |
            # | Apple TV+   | firebolt | apple_inc_apple_tv | details | 45       |
            # | Xumo        | firebolt | xumo               | details | 40       |
            # | DisneyPlus  | badger   | disneyPlus         | details | 60       |
            # | Tubi        | badger   | Tubi               | details | 40       |
            | ESPN        | badger   | ESPNPlus           | details | 40       |
            # | Pluto       | badger   | pluto              | details | 40       |
            | Discovery+  | badger   | DiscoveryPlus      | details | 40       |
            # | Peacock     | firebolt | Peacock            | details | 40       |

    @Lifecycle @sdk @transport @coreSDK @loggedin
    Scenario Outline: Validate the launch of <appName> app with '<appId>' appId with song intent
        Given the environment has been set up for 'Deeplink' tests with 'loggedIn apps'
        When 3rd party '<appType>' app is launched with '<appId>' appId with 'song' intent
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on '<page>' page

        Examples:
            | appName | appType | appId   | page    | waitTime |
            | Spotify | native  | Spotify | details | 40       |
