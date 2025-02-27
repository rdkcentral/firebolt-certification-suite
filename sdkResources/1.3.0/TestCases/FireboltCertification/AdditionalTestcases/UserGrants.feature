Feature: UserGrants

    # 1st example - #Deferred testcase - For acknowledgechallenge the grant is neither denied nor granted, instead exit the acknowledgechallenge overlay
    # 2nd example - #Timeout testcase - For acknowledgechallenge the grant is neither denied nor granted, since no response is given it will be timed out
    @Usergrants @coreSDK @sdk @transport
    Scenario Outline: UserGrants.Capability - Positive Scenario: <scenario>
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        And Framework registers 'ackchallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'expect error for device distributor'
        Then 'Firebolt' platform responds with 'invalid request for device distributor'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for device distributor'
        Then 'Firebolt' platform responds with 'null for capabilities granted'
        When '3rd party app' invokes the 'Firebolt' API to 'get info of device distributor capability'
        Then 'Firebolt' platform responds with 'null for capabilities info granted'

        Examples:
            | scenario                                                                | 
            | AcknowledgeChallenge Grant is deferred by exiting overlay               | 
            | Acknowledgechallenge Grant is deferred based on the timeout (4 seconds) |

    # Testing with grantPolicy having not supported capability, so it will return error since capability is not supported
    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario: UserGrants.Capabilities - Negative Scenario: Validate Capability Without supported capability expecting error
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        And Framework registers 'pinChallenge' test provider
        # Using a capability that is not supported
        When '3rd party app' invokes the 'Firebolt' API to 'expect error for notsupported capability'
        Then 'Firebolt' platform responds with 'not supported error for given capability'