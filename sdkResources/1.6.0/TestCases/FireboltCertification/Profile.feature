@Profile @coreSDK
Feature: Profile

    @sdk @transport @requiresPlatformImplementation @Sev0
    Scenario Outline: Profile.approveContentRating - Validating API responses for <Scenario> without UI
        Given the environment has been set up for 'Profile' tests
        And 3rd party 'certification' app is launched
        And Framework registers 'pinChallenge' test provider
        When '3rd party app' invokes the 'Firebolt' API to 'verify if current profile have access to content'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with '<Content>'
        And 'Firebolt' platform responds with 'expected lifecycle state as foreground'

        Examples:
            | Scenario          | Content                                |
            | Correct PIN entry | true for profile approveContentRating  |
            
    @sdk @transport @requiresPlatformImplementation @Sev2
    Scenario Outline: Profile.approveContentRating - Validating API responses for <Scenario> without UI
        Given the environment has been set up for 'Profile' tests
        And 3rd party 'certification' app is launched
        And Framework registers 'pinChallenge' test provider
        When '3rd party app' invokes the 'Firebolt' API to 'verify if current profile have access to content'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with '<Content>'
        And 'Firebolt' platform responds with 'expected lifecycle state as foreground'

        Examples:
            | Scenario             | Content                                |            
            | Wrong-PIN entry      | false for profile approveContentRating |
            | Cancelling PIN entry | false for profile approveContentRating |

    @sdk @transport @requiresPlatformImplementation @Sev0
    Scenario Outline: Profile.approveContentRating - Validating API responses for <Scenario> with UI
        Given the environment has been set up for 'Profile' tests
        And User 'starts' recording lifecycle history for '1st party app'
        And 3rd party 'certification' app is launched
        And User 'starts' recording lifecycle history for '3rd party app'
        And Framework registers 'pinChallenge' test provider
        When '3rd party app' invokes the 'Firebolt' API to 'verify if current profile have access to content'
        And User 'stops' recording lifecycle history for '1st party app'
        And User 'stops' recording lifecycle history for '3rd party app'
        Then 'Firebolt' platform responds with '<Content>'
        And User validates lifecycle history for '1st party app' with 'background:foreground:background'
        And User validates lifecycle history for '3rd party app' with 'background:foreground'

        Examples:
            | Scenario          | Content                                |
            | Correct PIN entry | true for profile approveContentRating  |
            
    @sdk @transport @requiresPlatformImplementation @Sev2
    Scenario Outline: Profile.approveContentRating - Validating API responses for <Scenario> with UI
        Given the environment has been set up for 'Profile' tests
        And User 'starts' recording lifecycle history for '1st party app'
        And 3rd party 'certification' app is launched
        And User 'starts' recording lifecycle history for '3rd party app'
        And Framework registers 'pinChallenge' test provider
        When '3rd party app' invokes the 'Firebolt' API to 'verify if current profile have access to content'
        And User 'stops' recording lifecycle history for '1st party app'
        And User 'stops' recording lifecycle history for '3rd party app'
        Then 'Firebolt' platform responds with '<Content>'
        And User validates lifecycle history for '1st party app' with 'background:foreground:background'
        And User validates lifecycle history for '3rd party app' with 'background:foreground'

        Examples:
            | Scenario             | Content                                |            
            | Wrong PIN entry      | false for profile approveContentRating |
            | Cancelling PIN entry | false for profile approveContentRating |

    @sdk @transport @requiresPlatformImplementation @Sev0
    Scenario Outline: Profile.approvePurchase - Validating API responses for <Scenario> without UI
        Given the environment has been set up for 'Profile' tests
        And 3rd party 'certification' app is launched
        And Framework registers 'pinChallenge' test provider
        When '3rd party app' invokes the 'Firebolt' API to 'verify if current profile have access to purchase'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with '<Content>'
        And 'Firebolt' platform responds with 'expected lifecycle state as foreground'

        Examples:
            | Scenario          | Content                           |
            | Correct PIN entry | true for profile approvePurchase  |
            
    @sdk @transport @requiresPlatformImplementation @Sev2
    Scenario Outline: Profile.approvePurchase - Validating API responses for <Scenario> without UI
        Given the environment has been set up for 'Profile' tests
        And 3rd party 'certification' app is launched
        And Framework registers 'pinChallenge' test provider
        When '3rd party app' invokes the 'Firebolt' API to 'verify if current profile have access to purchase'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with '<Content>'
        And 'Firebolt' platform responds with 'expected lifecycle state as foreground'

        Examples:
            | Scenario             | Content                           |            
            | Wrong PIN entry      | false for profile approvePurchase |
            | Cancelling PIN entry | false for profile approvePurchase |

    @sdk @transport @requiresPlatformImplementation @Sev0
    Scenario Outline: Profile.approvePurchase - Validating API responses for <Scenario> with UI
        Given the environment has been set up for 'Profile' tests
        And User 'starts' recording lifecycle history for '1st party app'
        And 3rd party 'certification' app is launched
        And User 'starts' recording lifecycle history for '3rd party app'
        And Framework registers 'pinChallenge' test provider
        When '3rd party app' invokes the 'Firebolt' API to 'verify if current profile have access to purchase'
        And User 'stops' recording lifecycle history for '1st party app'
        And User 'stops' recording lifecycle history for '3rd party app'
        Then 'Firebolt' platform responds with '<Content>'
        And User validates lifecycle history for '1st party app' with 'background:foreground:background'
        And User validates lifecycle history for '3rd party app' with 'background:foreground'

        Examples:
            | Scenario          | Content                           |
            | Correct PIN entry | true for profile approvePurchase  |
            
    @sdk @transport @requiresPlatformImplementation @Sev2
    Scenario Outline: Profile.approvePurchase - Validating API responses for <Scenario> with UI
        Given the environment has been set up for 'Profile' tests
        And User 'starts' recording lifecycle history for '1st party app'
        And 3rd party 'certification' app is launched
        And User 'starts' recording lifecycle history for '3rd party app'
        And Framework registers 'pinChallenge' test provider
        When '3rd party app' invokes the 'Firebolt' API to 'verify if current profile have access to purchase'
        And User 'stops' recording lifecycle history for '1st party app'
        And User 'stops' recording lifecycle history for '3rd party app'
        Then 'Firebolt' platform responds with '<Content>'
        And User validates lifecycle history for '1st party app' with 'background:foreground:background'
        And User validates lifecycle history for '3rd party app' with 'background:foreground'

        Examples:
            | Scenario             | Content                           |            
            | Wrong PIN entry      | false for profile approvePurchase |
            | Cancelling PIN entry | false for profile approvePurchase |

    @sdk @transport @Sev2
    Scenario: Profile.flags - Validating API response
        Given the environment has been set up for 'Profile' tests
        And 3rd party 'certification' app is launched
        When '3rd party app' invokes the 'Firebolt' API to 'allow profile flags'
        Then 'Firebolt' platform responds with 'expected profile flags for the current session'

    @sdk @transport @requiresPlatformImplementation @Sev0 @notSupported
    Scenario Outline: Profile.viewingRestrictions - Validating API response for <Scenario>
        Given the environment has been set up for 'Profile' tests
        When 3rd party 'certification' app is launched
        And '3rd party app' registers for the 'profile onViewingRestrictionsChanged' event using the 'Firebolt' API
        And User triggers event with value as '<Set_API_Key>'
        When '3rd party app' invokes the 'Firebolt' API to 'get profile viewingRestrictions'
        Then 'Firebolt' platform responds with '<Content>'
        And 'Firebolt' platform triggers event '<Content>'

        Examples:
            | Scenario              | Set_API_Key                 | Content                         |
            | Restrictions enabled  | enabling viewingRestrictions  | viewingRestrictions is enabled  |
            | Restrictions disabled | disabling viewingRestrictions | viewingRestrictions is disabled |
