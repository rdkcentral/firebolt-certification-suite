Feature: Profile_Manage_RpcOnly

    # Note: Reboot required after running this feature file

    @transport @ripple
    Scenario: PinChallenge.onRequestChallenge - Positive Scenario: Validating rpc method
        Given the environment has been set up for 'PinChallenge-rpc-Only' tests
        And 3rd party 'certification' app is launched
        When 1st party app registers for the 'pinChallenge onRequestChallenge manage' event using the 'Firebolt' API
        When '3rd party app' invokes the 'Firebolt' API to 'profile approvePurchase'
        And Fetch response for 'pinChallenge onRequestChallenge' event
        And 1st party app invokes the 'Firebolt' API to 'get pinChallenge challengeFocus'
        And 1st party app invokes the 'Firebolt' API to 'get pinChallenge challengeResponse'
        And Fetch response for 'profile approvePurchase' method
        Then 'Firebolt' platform responds with 'true for profile approvepurchase'


    @transport @ripple
    Scenario: PinChallenge.challengeError - Negative Scenario: Validating rpc method
        Given the environment has been set up for 'PinChallenge-rpc-Only' tests
        And 3rd party 'certification' app is launched
        When 1st party app registers for the 'pinChallenge onRequestChallenge manage' event using the 'Firebolt' API
        When '3rd party app' invokes the 'Firebolt' API to 'profile approvePurchase'
        And Fetch response for 'pinChallenge onRequestChallenge' event
        And 1st party app invokes the 'Firebolt' API to 'get pinChallenge challengeError'
        And Fetch response for 'profile approvePurchase' method
        Then 'Firebolt' platform responds with 'true for profile approvepurchase'