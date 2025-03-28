@Lifecycle
Feature: Lifecycle_Background

    @sdk @lifecycle
    Scenario Outline: Lifecycle Background Validation for App Launch in '<appName>' app
        Given the environment has been set up for 'lifecycle background' tests
        When 3rd party '<appType>' app is launched with '<appId>' appId
        And Test runner waits for <waitTime> 'seconds'
        And '<appId>' transitions to state 'background'
        And Test runner waits for 30 'seconds'
        Then '<appId>' will be in 'background' state

        Examples:
            | appName        | appType  | appId               | waitTime |
            | Prime Video    | hybrid   | amazonPrime         | 40       |
            | Apple TV+      | firebolt | apple_inc_apple_tv  | 40       |
            | DisneyPlus     | badger   | disneyPlus          | 60       |
            | Discovery+     | badger   | DiscoveryPlus       | 40       |
            | Pluto          | hybrid   | pluto               | 40       |
            | Peacock        | firebolt | Peacock             | 40       |
            | Spotify        | badger   | Spotify             | 40       |
            | Sling          | badger   | Sling               | 40       |
            | Hulu           | badger   | Hulu                | 40       |
            | Paramount      | firebolt | ParamountPlus       | 40       |
            | YouTube        | native   | YouTube             | 40       |
            | HBO Max        | badger   | hbo_hbomax          | 40       |
            | Xfinity Stream | firebolt | Comcast_StreamApp   | 40       |
            | Spectrum       | firebolt | charter_spectrum_tv | 40       |
            | Netflix        | native   | NetflixApp          | 40       |
            | Tubi           | badger   | Tubi                | 40       |
            | ESPN           | badger   | ESPNPlus            | 40       |
            | Xumo           | firebolt | xumo                | 40       |