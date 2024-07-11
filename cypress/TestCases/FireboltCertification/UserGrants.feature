Feature: UserGrants

    # Testing with grantPolicy having with scope device and grant access, so all the apps in that device may have the access
    # provide access using any 3rd party and check in another 3rd party
    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario: UserGrants.Capabilities R.4.4.1.1 - Positive Scenario: Validate Capability Grant access with scope device
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        And Framework registers 'pinChallenge' test provider
        When '3rd party app' invokes the 'Firebolt' API to 'notify watched content with only entityid'
        Then 'Firebolt' platform responds with 'true for watched content in discovery'
        When 1st party app invokes the 'Firebolt' API to 'check if capabilities is granted for discovery watched'
        Then 'Firebolt' platform responds with 'true for capabilities granted'
        When '3rd party app' invokes the 'Firebolt' API to 'close app with user exit'
        And 3rd party 'certification' app is launched with 'secondary 3rd party app' appId
        Given 'secondary 3rd party app' invokes the 'Firebolt' API to 'notify watched content with only entityid'
        And 'Firebolt' platform responds to 'secondary 3rd party app' with 'true for watched content in discovery'
        When 1st party app invokes the 'Firebolt' API to 'check if capabilities is granted for discovery watched'
        Then 'Firebolt' platform responds with 'true for capabilities granted'

    # Deny access with scope device, so all the apps in that device may not have the access
    # launch a 3rd party and provide acess using any 3rd party and check in another 3rd party
    @Usergrants @coreSDK @sdk @transport @notSupported @requiresPlatformImplementation
    Scenario: UserGrants.Capabilities R.4.4.1.1 - Negative Scenario: Validate Capability access denied for pinChallenge with scope device
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        And Framework registers 'pinChallenge' test provider
        When '3rd party app' invokes the 'Firebolt' API to 'expect error while notifying watched content with only entityid'
        Then 'Firebolt' platform responds with 'invalid request for discovery watched'
        When 1st party app invokes the 'Firebolt' API to 'check if capabilities is granted for discovery watched'
        Then 'Firebolt' platform responds with 'false for capabilities granted'
        And 3rd party 'certification' app is launched with 'secondary 3rd party app' appId
        When 'secondary 3rd party app' invokes the 'Firebolt' API to 'expect error while notifying watched content with only entityid'
        Then 'Firebolt' platform responds to 'secondary 3rd party app' with 'invalid request for discovery watched'
        When 1st party app invokes the 'Firebolt' API to 'check if capabilities is granted for discovery watched'
        Then 'Firebolt' platform responds to 'secondary 3rd party app' with 'false for capabilities granted'