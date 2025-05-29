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

    @sdk @transport @requiresPlatformImplementation @Sev0
    Scenario Outline: Profile.viewingRestrictions - Validating API response for <Scenario>
        Given the environment has been set up for 'Profile' tests
        When 3rd party 'certification' app is launched
        And '3rd party app' registers for the 'profile onViewingRestrictionsChanged' event using the 'Firebolt' API
        # # TODO: Need to add the set call after getting the details
        # And 1st party app invokes the 'Firebolt' API to '<Set_API_Key>'
        When '3rd party app' invokes the 'Firebolt' API to 'get profile viewingRestrictions'
        Then 'Firebolt' platform responds with '<Response>'
        And 'Firebolt' platform triggers event '<Response>'

        Examples:
            | Scenario              | Set_API_Key                 | Content                         |
            | Restrictions enabled  | enable viewingRestrictions  | viewingRestrictions is enabled  |
            | Restrictions disabled | disable viewingRestrictions | viewingRestrictions is disabled |


    @sdk @transport @requiresPlatformImplementation @Sev0
    Scenario Outline: Profile.viewingRestrictions - Validating API response for <Scenario>
        Given the environment has been set up for 'Profile' tests
        When 3rd party 'certification' app is launched
        And '3rd party app' registers for the 'profile onViewingRestrictionsChanged' event using the 'Firebolt' API
        # # TODO: Need to add the set call after getting the details
        # And 1st party app invokes the 'Firebolt' API to '<Set_API_Key>'
        When '3rd party app' invokes the 'Firebolt' API to 'get profile viewingRestrictions'
        Then 'Firebolt' platform responds with '<Response>'
        And 'Firebolt' platform triggers event '<Response>'

        Examples:
            | Scenario                             | Set_API_Key                             | Content                                      |
            | Restrictions for MPAA with PG rating | set Restriction for MPAA with PG rating | expected restriction with PG rating for MPAA |


    @sdk @transport @requiresPlatformImplementation @Sev0
    Scenario Outline: Profile.viewingRestrictions - Validating API response for <Scenario>
        Given the environment has been set up for 'Profile' tests
        When 3rd party 'certification' app is launched
        And '3rd party app' registers for the 'profile onViewingRestrictionsChanged' event using the 'Firebolt' API
        # # TODO: Need to add the set call after getting the details
        # And 1st party app invokes the 'Firebolt' API to '<Set_API_Key>'
        When '3rd party app' invokes the 'Firebolt' API to 'get profile viewingRestrictions'
        Then 'Firebolt' platform responds with '<Response>'
        And 'Firebolt' platform triggers event '<Response>'

        Examples:
            | Scenario                                                  | Set_API_Key                                                  | Content                                                           |
            | Restrictions for US_TV with TV 14 rating and V sub rating | set Restriction for US_TV with TV 14 rating and V sub rating | expected restriction with TV 14 rating for US_TV and V sub rating |


    @sdk @transport @requiresPlatformImplementation @Sev0
    Scenario Outline: Profile.viewingRestrictions - Negative Scenario: <Scenario> expecting error
        When 1st party app invokes the 'Firebolt' API to '<Scenario>'
        Then 'Firebolt' platform responds to '1st party app' with 'invalid parameters for profile viewingRestrictions'

        Examples:
            | Scenario                                                           |
            | set profile viewingRestrictions with integer                       |
            | set profile viewingRestrictions with string                        |
            | set viewingRestrictions with ABC rating for MPAA                   |
            | set viewingRestrictions with V sub rating without rating for US_TV |