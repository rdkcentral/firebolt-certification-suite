@Profile @ProfileManage @manageSDK @rpcOnly
Feature: Profile_Manage_RpcOnly

    # Note: Reboot required after running this feature file

    @transport @requiresPlatformImplementation
    Scenario: PinChallenge.onRequestChallenge - Positive Scenario: Validating rpc method
        Given the environment has been set up for 'PinChallenge-rpc-Only' tests
        And 3rd party 'certification' app is launched
        When 1st party app registers for the 'pinChallenge onRequestChallenge manage' event using the 'Firebolt' API
        And '3rd party app' invokes the 'Firebolt' API to 'profile approvePurchase'
        And Fetch response for 'pinChallenge onRequestChallenge' event from 1st party app
        And 1st party app invokes the 'Firebolt' API to 'request focus for pinchallenge provider'
        And 1st party app invokes the 'Firebolt' API to 'send response from pinchallenge provider'
        And Fetch response for 'profile approvePurchase' method from 3rd party app
        Then 'Firebolt' platform responds with 'true for profile approvepurchase'


    @transport @requiresPlatformImplementation
    Scenario: PinChallenge.challengeError - Negative Scenario: Validating rpc method
        Given the environment has been set up for 'PinChallenge-rpc-Only' tests
        And 3rd party 'certification' app is launched
        When 1st party app registers for the 'pinChallenge onRequestChallenge manage' event using the 'Firebolt' API
        And '3rd party app' invokes the 'Firebolt' API to 'profile approvePurchase'
        And Fetch response for 'pinChallenge onRequestChallenge' event from 1st party app
        And 1st party app invokes the 'Firebolt' API to 'send error from pinchallenge provider'
        And Fetch response for 'profile approvePurchase' method from 3rd party app
        Then 'Firebolt' platform responds with 'custom error'