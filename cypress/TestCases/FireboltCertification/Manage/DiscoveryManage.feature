Feature: Discovery_Manage

    Background: Launch FCA for 'Discovery'
        Given the environment has been set up for 'Discovery' tests
        And 3rd party 'certification' app is launched

    # Since the "refui" app validation is not designed, the event validation step is commented out.
    @Discovery @manageSDK @sdk @transport
    Scenario Outline: Discovery.onSignIn event - Positive Scenario: '<Scenario>'
        When 1st party app registers for the 'discovery onSignIn' event using the 'Firebolt' API
        And '3rd party app' invokes the 'Firebolt' API to '<Key>'
        Then 'Firebolt' platform responds for 'signIn for discovery'
        And 'Firebolt' platform triggers to '1st party app' event 'onSignIn for discovery with appid'

        Examples:
            | Scenario             | Key                                            |
            | With entitlements    | notify user has signed In with entitlements    |
            | Without entitlements | notify user has signed In without entitlements |

    @Discovery @manageSDK @sdk @transport
    Scenario: Discovery.onSignOut event - Positive Scenario: Validating discovery onSignOut event
        When 1st party app registers for the 'discovery onSignOut' event using the 'Firebolt' API
        And '3rd party app' invokes the 'Firebolt' API to 'notify user has signed out'
        Then 'Firebolt' platform responds for 'signOut for discovery'
        And 'Firebolt' platform triggers to '1st party app' event 'onSignOut for discovery with appid'
