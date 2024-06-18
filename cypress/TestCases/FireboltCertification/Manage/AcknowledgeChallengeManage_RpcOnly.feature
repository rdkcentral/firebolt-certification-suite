 Feature: AcknowledgeChallenge_Manage_RpcOnly

    # Note: Reboot required after running this feature file

    @transport @ripple @requiresPlatformImplementation
    Scenario: AcknowledgeChallenge.onRequestChallenge - Positive Scenario: Validating rpc method
        Given the environment has been set up for 'AcknowledgeChallenge-rpc-Only' tests
        And 3rd party 'certification' app is launched
        And Framework registers 'ackchallenge' test provider
        And User set response for 'granting acknowledge challenge'
        When 1st party app registers for the 'acknowledgeChallenge onRequestChallenge manage' event using the 'Firebolt' API
        When '3rd party app' invokes the 'Firebolt' API to 'get localization countryCode'
        And Fetch response for 'acknowledgeChallenge onRequestChallenge' event from 1st party app
        And 1st party app invokes the 'Firebolt' API to 'request focus for challenge provider'
        And 1st party app invokes the 'Firebolt' API to 'send response from challenge provider'
        And Fetch response for 'localization countryCode' method from 3rd party app
        Then 'Firebolt' platform responds with 'expected localization countryCode'

    @transport @ripple @requiresPlatformImplementation
    Scenario: AcknowledgeChallenge.challengeError - Negative Scenario: Validating rpc method
        Given the environment has been set up for 'AcknowledgeChallenge-rpc-Only' tests
        And 3rd party 'certification' app is launched
        And Framework registers 'ackchallenge' test provider
        And User set response for 'granting acknowledge challenge'
        When 1st party app registers for the 'acknowledgeChallenge onRequestChallenge manage' event using the 'Firebolt' API
        When '3rd party app' invokes the 'Firebolt' API to 'get localization countryCode'
        And Fetch response for 'acknowledgeChallenge onRequestChallenge' event from 1st party app
        And 1st party app invokes the 'Firebolt' API to 'send error from challenge provider'
        And Fetch response for 'localization countryCode' method from 3rd party app
        Then 'Firebolt' platform responds with 'expected localization countryCode'