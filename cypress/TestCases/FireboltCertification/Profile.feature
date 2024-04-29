Feature: Profile

    @Profile @coreSDK @sdk @transport
    Scenario Outline: Profile.approveContentRating - Positive Scenario: <Scenario> without UI
        Given the environment has been set up for 'Profile' tests
        And 3rd party 'certification' app is launched
        And Framework registers 'pinChallenge' test provider
        When '3rd party app' invokes the 'Firebolt' API to 'verify if current profile have access to content'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds for '<Content>'
        And 'Firebolt' platform responds for 'expected lifecycle state as foreground'

        Examples:
            | Scenario       | Content                                |
            | Correct-PIN    | true for profile approveContentRating  |
            | Wrong-PIN      | false for profile approveContentRating |
            | Cancelling-PIN | false for profile approveContentRating |

    @Profile @coreSDK @sdk @transport
    Scenario Outline: Profile.approveContentRating - Positive Scenario: <Scenario> with UI
        Given the environment has been set up for 'Profile' tests
        And User 'starts' recording lifecycle history for '1st party app'
        And 3rd party 'certification' app is launched
        And User 'starts' recording lifecycle history for '3rd party app' 
        And Framework registers 'pinChallenge' test provider
        When '3rd party app' invokes the 'Firebolt' API to 'verify if current profile have access to content'
        And User 'stops' recording lifecycle history for '1st party app'
        And User 'stops' recording lifecycle history for '3rd party app' 
        Then 'Firebolt' platform responds for '<Content>'
        And User validates lifecycle history for '1st party app' with 'background:foreground:background'
        And User validates lifecycle history for '3rd party app' with 'background:foreground'

        Examples:
            | Scenario       | Content                                |
            | Correct-PIN    | true for profile approveContentRating  |
            | Wrong-PIN      | false for profile approveContentRating |
            | Cancelling-PIN | false for profile approveContentRating |

    @Profile @coreSDK @sdk @transport
    Scenario Outline: Profile.approvePurchase - Positive Scenario: <Scenario> without UI
        Given the environment has been set up for 'Profile' tests
        And 3rd party 'certification' app is launched
        And Framework registers 'pinChallenge' test provider
        When '3rd party app' invokes the 'Firebolt' API to 'verify if current profile have access to purchase'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds for '<Content>'
        And 'Firebolt' platform responds for 'expected lifecycle state as foreground'

        Examples:
            | Scenario       | Content                           |
            | Correct-PIN    | true for profile approvePurchase  |
            | Wrong-PIN      | false for profile approvePurchase |
            | Cancelling-PIN | false for profile approvePurchase |

    @Profile @coreSDK @sdk @transport
    Scenario Outline: Profile.approvePurchase - Positive Scenario: <Scenario> with UI
        Given the environment has been set up for 'Profile' tests
        And User 'starts' recording lifecycle history for '1st party app'
        And 3rd party 'certification' app is launched
        And User 'starts' recording lifecycle history for '3rd party app'
        And Framework registers 'pinChallenge' test provider
        When '3rd party app' invokes the 'Firebolt' API to 'verify if current profile have access to purchase'
        And User 'stops' recording lifecycle history for '1st party app'
        And User 'stops' recording lifecycle history for '3rd party app' 
        Then 'Firebolt' platform responds for '<Content>'
        And User validates lifecycle history for '1st party app' with 'background:foreground:background'
        And User validates lifecycle history for '3rd party app' with 'background:foreground'

        Examples:
            | Scenario       | Content                           |
            | Correct-PIN    | true for profile approvePurchase  |
            | Wrong-PIN      | false for profile approvePurchase |
            | Cancelling-PIN | false for profile approvePurchase |

    @Profile @coreSDK @sdk @transport
    Scenario: Profile.flags - Positive Scenario
        Given the environment has been set up for 'Profile' tests
        And 3rd party 'certification' app is launched
        When '3rd party app' invokes the 'Firebolt' API to 'allow profile flags'
        Then 'Firebolt' platform responds for 'expected profile flags for the current session'

