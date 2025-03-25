Feature: App Launch-not logged in apps

    @Lifecycle @sdk @transport @coreSDK
    Scenario Outline: Validate the launch of <appName> app with '<appId>' appId
        Given the environment has been set up for 'app launch' tests
        And 3rd party 'firebolt' app is launched with '<appId>' appId
        And Test runner waits for <waitTime> 'seconds'
        Then 'third party app is launched' on '<page>' page

        Examples:
            | appName        | appId               | eventName                   | page   | waitTime |
            | Apple TV+      | apple_inc_apple_tv  | lifecycle.ready             | home   | 45       |
            # | Spectrum       | charter_spectrum_tv | lifecycle.ready             | search | 50       |
            | DisneyPlus     | disneyPlus          | badger.dismissLoadingScreen | auth   | 60       |
            | Spotify        | Spotify             | badger.dismissLoadingScreen | auth   | 40       |
            # | Tubi           | Tubi                | badger.dismissLoadingScreen | home   | 40       |
            # | Pluto          | pluto               | badger.dismissLoadingScreen | auth   | 40       |
            # | Sling          | Sling               | badger.dismissLoadingScreen | auth   | 40       |
            # | ESPN           | ESPNPlus            | badger.dismissLoadingScreen | home   | 40       |
            # | Hulu           | Hulu                | badger.dismissLoadingScreen | auth   | 40       |
            # | Paramount+     | ParamountPlus       | badger.dismissLoadingScreen | auth   | 40       |
            # | Xfinity Stream | Comcast_StreamApp   | badger.dismissLoadingScreen | auth   | 40       |
            | Xumo           | xumo                | lifecycle.ready             | home   | 40       |
            # | HBO Max        | hbo_hbomax          | badger.dismissLoadingScreen | auth   | 40       |
            # | Peacock        | Peacock             | badger.dismissLoadingScreen | auth   | 40       |
            | Prime Video    | amazonPrime         | lifecycle.ready             | auth   | 40       |
            # | Discovery+     | DiscoveryPlus       | badger.dismissLoadingScreen | auth   | 40       |
