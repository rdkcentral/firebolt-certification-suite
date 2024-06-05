 Feature: AcknowledgeChallenge_Manage_RpcOnly

    # Note: Reboot required after running this feature file

    # Device manifest need to have the grantpolicy for this testcase to work
    @transport @ripple
    Scenario: AcknowledgeChallenge.onRequestChallenge - Positive Scenario: Validating rpc method
        Given the environment has been set up for 'AcknowledgeChallenge-rpc-Only' tests
        And 3rd party 'certification' app is launched
        And Framework registers 'ackchallenge' test provider
        And User set response for 'set acknowledge granted'
        When 1st party app registers for the 'acknowledgeChallenge onRequestChallenge manage' event using the 'Firebolt' API
        When '3rd party app' invokes the 'Firebolt' API to 'get localization countryCode'
        And Fetch response for 'acknowledgeChallenge onRequestChallenge' event
        And 1st party app invokes the 'Firebolt' API to 'get acknowledgeChallenge challengeFocus'
        And 1st party app invokes the 'Firebolt' API to 'get acknowledgeChallenge challengeResponse'
        And Fetch response for 'get localization countryCode' method
        Then 'Firebolt' platform responds with 'expected localization countryCode'

    @transport @ripple
    Scenario: AcknowledgeChallenge.challengeError - Negative Scenario: Validating rpc method
        Given the environment has been set up for 'AcknowledgeChallenge-rpc-Only' tests
        And 3rd party 'certification' app is launched
        And Framework registers 'ackchallenge' test provider
        And User set response for 'set acknowledge granted'
        When 1st party app registers for the 'acknowledgeChallenge onRequestChallenge manage' event using the 'Firebolt' API
        When '3rd party app' invokes the 'Firebolt' API to 'get localization countryCode'
        And Fetch response for 'acknowledgeChallenge onRequestChallenge' event
        And 1st party app invokes the 'Firebolt' API to 'get acknowledgeChallenge challengeError'
        And Fetch response for 'get localization countryCode' method
        Then 'Firebolt' platform responds with 'expected localization countryCode'
