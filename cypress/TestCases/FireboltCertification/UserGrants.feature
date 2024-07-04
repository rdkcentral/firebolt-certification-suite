Feature: UserGrants

    # If lifespan value is set to once, grant is requested for every attempt.
    # Case-1: Validating by allowing the grant
    # Case-2: Validating by denying the grant (using pinchallenge and acknowledge).
    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario: UserGrants.Grant - Positive Scenario: Validate Capabilities with denied (pinChallenge) and lifespan once
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        # Case-1
        And Framework registers 'pinChallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'get postalcode'
        Then 'Firebolt' platform responds with '20850 for localization postalcode'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for postalcode'
        Then 'Firebolt' platform responds with 'null for capabilities granted'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'
        # Case-2
        When User set response for 'set pinchallenge wrong pin'
        And User 'starts' recording lifecycle history for '3rd party app'
        And '3rd party app' invokes the 'Firebolt' API to 'expect error for postalcode'
        Then 'Firebolt' platform responds with 'invalid request for postalcode'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for postalcode'
        Then 'Firebolt' platform responds with 'null for capabilities granted'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'

    # Testing with grantPolicy having one option with one step(here step with acknowledge)
    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario: UserGrants.Capabilities - Positive Scenario: Validate Capability Grant access with one step option(only acknowledgeChallenge)
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        And Framework registers 'ackchallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'get localization countrycode'
        Then 'Firebolt' platform responds with 'expected localization countrycode'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for localization countrycode'
        Then 'Firebolt' platform responds with 'true for capabilities granted'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'

    # Testing with grantPolicy having with scope device and grant access, so all the apps in that device may have the access
    # provide access using any 3rd party and check in another 3rd party
    # Involves 2 apps, Will be handled in FIRECERT-2194
    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario: UserGrants.Capabilities - Positive Scenario: Validate Capability Grant access with scope device
        Given the environment has been set up for 'userGrants' tests
        # 3rd party app
        And 3rd party 'certification' app is launched
        And Framework registers 'pinChallenge' test provider
        When '3rd party app' invokes the 'Firebolt' API to 'notify watched content with only entityid'
        Then 'Firebolt' platform responds with 'true for watched content in discovery'
        When 1st party app invokes the 'Firebolt' API to 'check if capabilities is granted for discovery watched'
        Then 'Firebolt' platform responds with 'true for capabilities granted'
        When '3rd party app' invokes the 'Firebolt' API to 'close app with user exit'
        # 1st part app
        ###### And 1st party 'certification' app is launched
        When '3rd party app' invokes the 'Firebolt' API to 'notify watched content with only entityid'
        Then 'Firebolt' platform responds with 'true for watched content in discovery'
        When 1st party app invokes the 'Firebolt' API to 'check if capabilities is granted for discovery watched'
        Then 'Firebolt' platform responds with 'true for capabilities granted'

    # Deny access with scope device, so all the apps in that device may not have the access
    # launch a 3rd party and provide acess using any 3rd party and check in another 3rd party
    # Involves 2 apps, Will be handled in FIRECERT-2194
    @Usergrants @coreSDK @sdk @transport @notSupported @requiresPlatformImplementation
    Scenario: UserGrants.Capabilities - Negative Scenario: Validate Capability access denied for pinChallenge with scope device
        Given the environment has been set up for 'userGrants' tests
        # 3rd party app
        And 3rd party 'certification' app is launched
        And Framework registers 'pinChallenge' test provider
        When '3rd party app' invokes the 'Firebolt' API to 'expect error while notifying watched content with only entityid'
        Then 'Firebolt' platform responds with 'invalid request for discovery watched'
        When 1st party app invokes the 'Firebolt' API to 'check if capabilities is granted for discovery watched'
        Then 'Firebolt' platform responds with 'false for capabilities granted'
        # 1st part app
        ###### And 1st party 'certification' app is launched
        When '3rd party app' invokes the 'Firebolt' API to 'expect error while notifying watched content with only entityid'
        Then 'Firebolt' platform responds with 'invalid request for discovery watched'
        When 1st party app invokes the 'Firebolt' API to 'check if capabilities is granted for discovery watched'
        Then 'Firebolt' platform responds with 'false for capabilities granted'

    # Testing with grantPolicy having device level grant access and check in another device
    # Involves multiple devices, Will be handled in FIRECERT-2195
    @Usergrants @coreSDK @sdk @transport @notSupported
    Scenario: UserGrants.Capabilities - Positive Scenario: Validate Capability permission in 2 diff devices
        Given the environment has been set up for 'userGrants' tests
        # 1st device
        And 3rd party 'certification' app is launched
        And Framework registers 'ackchallenge' test provider
        When '3rd party app' invokes the 'Firebolt' API to 'fetch device distributor'
        Then 'Firebolt' platform responds with 'expected device distributor'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for device distributor'
        Then 'Firebolt' platform responds with 'true for capabilities granted'
        # 2nd device
        When 3rd party 'certification' app is launched
        # in another device
        And '3rd party app' invokes the 'Firebolt' API to 'fetch device distributor'
        Then 'Firebolt' platform responds with 'expect error for device distributor'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for device distributor'
        Then 'Firebolt' platform responds with 'true for capabilities granted'


    # If lifespan value forever only once ask for grant until we clear the given grant
    # Case-1: Allowing the grant and validating the result
    # Case-2: Checking the lifecycle history to check ui is not coming and validating for result because already allowed grant in Case-1.
    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario: UserGrants.Capabilities - Positive Scenario: Validate Capabilities with granted (pinChallenge) and lifespan forever
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        #Case-1
        And Framework registers 'pinChallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'get locality'
        Then 'Firebolt' platform responds with 'washington for localization locality'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for locality'
        Then 'Firebolt' platform responds with 'true for capabilities granted'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'
        #Case-2
        When User 'starts' recording lifecycle history for '3rd party app'
        And '3rd party app' invokes the 'Firebolt' API to 'get locality'
        Then 'Firebolt' platform responds with 'washington for localization locality'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'EMPTY_HISTORY'

    # If lifespan value forever only once ask for grant until we clear the given grant
    # Case-1: Denying the grant and validating for error
    # Case-2: Checking the lifecycle history to check ui is not coming and calling postal code and validating for error because already denied grant in Case-1.
    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario: UserGrants.Capabilities - Negative Scenario: Validate Capabilities with denied (pinChallenge) and lifespan forever
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        #Case-1
        And Framework registers 'pinChallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'expect error localization locality'
        Then 'Firebolt' platform responds with 'invalid request for localization locality'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for locality'
        Then 'Firebolt' platform responds with 'false for capabilities granted'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'
        #Case-2
        When User 'starts' recording lifecycle history for '3rd party app'
        And '3rd party app' invokes the 'Firebolt' API to 'expect error localization locality'
        Then 'Firebolt' platform responds with 'invalid request for localization locality'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'EMPTY_HISTORY'

    # If lifespan value appActive it ask grant once when app is active and it ask again when app is closed and active again.
    # Case-1: Allowing grant when app is active and validating
    # Case-2: Closing and launching the app, allowing grant and validating ui is coming again
    # Added @notSupported as glue is not implemented yet.
    @Usergrants @coreSDK @sdk @transport @notSupported @requiresPlatformImplementation
    Scenario: UserGrants.Capabilities - Positive Scenario: Validate Capabilities with granted (pinChallenge) and lifespan appActive
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        #Case-1
        And Framework registers 'pinChallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'get device name'
        Then 'Firebolt' platform responds with 'living hall for device name'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for locality'
        Then 'Firebolt' platform responds with 'true for capabilities granted'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'
        #Case-2
        When '3rd party app' invokes the 'Firebolt' API to 'close app with user exit'
        When 3rd party 'certification' app is launched
        And User set response for 'set pinchallenge correct pin'
        And User 'starts' recording lifecycle history for '3rd party app'
        And '3rd party app' invokes the 'Firebolt' API to 'get device name'
        Then 'Firebolt' platform responds with 'living hall for device name'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'

    # If lifespan value appActive it ask grant once when app is active and it ask again when app is closed and active again.
    # Case-1: Denying grant when app is active and validating
    # Case-2: Closing and launching the app, denying grant and validating ui is coming again
    # Added @notSupported as glue is not implemented yet.
    @Usergrants @coreSDK @sdk @transport @notSupported @requiresPlatformImplementation
    Scenario: UserGrants.Capabilities - Negative Scenario: Validate Capabilities with denied (pinChallenge) and lifespan appActive
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        #Case-1
        And Framework registers 'pinChallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'expect error for device name'
        Then 'Firebolt' platform responds with 'invalid request for device name'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for device name'
        Then 'Firebolt' platform responds with 'false for capabilities granted'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'
        #Case-2
        When '3rd party app' invokes the 'Firebolt' API to 'close app with user exit'
        When 3rd party 'certification' app is launched
        And User set response for 'set pinchallenge wrong pin'
        And User 'starts' recording lifecycle history for '3rd party app'
        And '3rd party app' invokes the 'Firebolt' API to 'expect error for device name'
        Then 'Firebolt' platform responds with 'invalid request for device name'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'

    # Assuming lifespan having seconds and ttl is 60 sec
    # If lifespan value seconds, after giving the grant it should not ask grant within ttl and it ask after the ttl
    # Case-1: Allowing grant and validating the result
    # Case-2: Calling the API again within the ttl and it should not ask for grant
    # Case-3: Calling API after ttl, here it will ask grant again
    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario: UserGrants.Capabilities - Positive Scenario: Validate Capabilities with granted (ackchallenge) and lifespan:seconds lifespanTtl:60 sec
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        #Case-1
        And Framework registers 'ackchallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'fetch device id'
        Then 'Firebolt' platform responds with 'expected device id'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for device id'
        Then 'Firebolt' platform responds with 'true for capabilities granted'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'
        # Case-2
        # Calling once again within ttl - it shouldn't ask for grant
        When '3rd party app' invokes the 'Firebolt' API to 'fetch device id'
        Then 'Firebolt' platform responds with 'expected device id'
        # Case-3
        When Test runner waits for 70 'seconds'
        And User set response for 'set acknowledge deny'
        And User 'starts' recording lifecycle history for '3rd party app'
        And '3rd party app' invokes the 'Firebolt' API to 'expect error for device id'
        Then 'Firebolt' platform responds with 'invalid request for device id'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for device id'
        Then 'Firebolt' platform responds with 'false for capabilities granted'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'

    # Assuming lifespan having seconds and ttl is 60 sec
    # If lifespan value seconds, after giving the grant it should not ask grant within ttl and it ask after the ttl
    # Case-1: Denying grant and validating the error
    # Case-2: Calling the API again within the ttl and it should not ask for grant
    # Case-3: Calling API after ttl, here it will ask for grant again
    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario: UserGrants.Capabilities - Negative Scenario: Validate Capabilities with denied (ackchallenge) and lifespan:seconds lifespanTtl:60 sec
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        # Case-1
        And Framework registers 'ackchallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'expect error for device id'
        Then 'Firebolt' platform responds with 'invalid request for device id'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for device id'
        Then 'Firebolt' platform responds with 'false for capabilities granted'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'
        # Case-2
        # Calling once again within ttl - it shouldn't ask for grant
        When '3rd party app' invokes the 'Firebolt' API to 'expect error for device id'
        Then 'Firebolt' platform responds with 'invalid request for device id'
        # Case-3
        When Test runner waits for 70 'seconds'
        And User set response for 'set acknowledge granted'
        And User 'starts' recording lifecycle history for '3rd party app'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch device id'
        Then 'Firebolt' platform responds with 'expected device id'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for device id'
        Then 'Firebolt' platform responds with 'true for capabilities granted'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'

    # Assuming lifespan having seconds and ttl is 200 sec
    # If lifespan value seconds, after giving the grant it should not ask grant within ttl and it ask after the ttl
    # Case-1: Allowing grant and validating the result
    # Case-2: Before ttl ends rebooting the device and on calling api, it should return result without asking for grant
    @Usergrants @coreSDK @sdk @transport @notSupported @requiresPlatformImplementation
    Scenario: UserGrants.Capabilities - Positive Scenario: Validate Capabilities with grant(pinChallenge) and lifespan:seconds lifespanTtl:800sec - after reboot within ttl it should not ask for grant
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        # Case-1
        And Framework registers 'pinChallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'get localization language'
        Then 'Firebolt' platform responds with 'expected localization language'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for localization language'
        Then 'Firebolt' platform responds with 'true for capabilities granted'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'
        # Case-2
        # rebooting the device before ttl ends and validating again
        ### When I reboot device
        When 3rd party 'certification' app is launched
        And User 'starts' recording lifecycle history for '3rd party app'
        And '3rd party app' invokes the 'Firebolt' API to 'get localization language'
        Then 'Firebolt' platform responds with 'expected localization language'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for localization language'
        Then 'Firebolt' platform responds with 'true for capabilities granted'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'EMPTY_HISTORY'

    # Assuming lifespan having seconds and ttl is 60 sec
    # If lifespan value seconds, after giving the grant it should not ask grant within ttl and it ask after the ttl
    # Case-1: Allowing grant and validating the result
    # Case-2: Reboot the device after ttl, after reboot when API is called again and asks for grant, then deny grant
    @Usergrants @coreSDK @sdk @transport @notSupported @requiresPlatformImplementation
    Scenario: UserGrants.Capabilities - Positive Scenario: Validate Capabilities with grant(ackchallenge) and lifespan:seconds lifespanTtl:60sec - reboot after ttl and it should ask grant
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        # Case-1
        And Framework registers 'ackchallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'fetch device id'
        Then 'Firebolt' platform responds with 'expected device id'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for device id'
        Then 'Firebolt' platform responds with 'true for capabilities granted'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'
        When Test runner waits for 60 'seconds'
        # rebooting the device after ttl and validating again
        ### When I reboot device
        And 3rd party 'certification' app is launched
        And User set response for 'set acknowledge deny'
        And Framework registers 'ackchallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        And '3rd party app' invokes the 'Firebolt' API to 'expect error for device id'
        Then 'Firebolt' platform responds with 'invalid request for device id'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for device id'
        Then 'Firebolt' platform responds with 'false for capabilities granted'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'

    # Assuming lifespan having seconds and ttl is 200 sec
    # If lifespan value seconds, after giving the grant it should not ask grant within ttl and it ask after the ttl
    # Case-1: Deny grant and validate error
    # Case-2: Before ttl ends rebooting the device, call api and expect to return result without asking for grant
    @Usergrants @coreSDK @sdk @transport @notSupported @requiresPlatformImplementation
    Scenario: UserGrants.Capabilities - Negative Scenario: Validate Capabilities with denied (pinChallenge) and lifespan:seconds lifespanTtl:800sec - after reboot within ttl and it should not ask grant
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        # Case-1
        And Framework registers 'pinChallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'expect error for localization language'
        Then 'Firebolt' platform responds with 'invalid request for localization language'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for localization language'
        Then 'Firebolt' platform responds with 'false for capabilities granted'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'
        # Case-2
        # rebooting the device before ttl ends and validating again
        ### When I reboot device
        When 3rd party 'certification' app is launched
        And User 'starts' recording lifecycle history for '3rd party app'
        And '3rd party app' invokes the 'Firebolt' API to 'expect error for localization language'
        Then 'Firebolt' platform responds with 'invalid request for localization language'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for localization language'
        Then 'Firebolt' platform responds with 'false for capabilities granted'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'EMPTY_HISTORY'

    # Assuming lifespan having seconds and ttl is 60 sec
    # With lifespan seconds, after giving the grant it should not ask grant within ttl and it ask after the ttl
    # Case-1: Deny grant and validate error
    # Case-2: Reboot device after ttl, after reboot when api is called again, expect to ask grant and then deny grant
    @Usergrants @coreSDK @sdk @transport @notSupported @requiresPlatformImplementation
    Scenario: UserGrants.Capabilities - Negative Scenario: Validate Capabilities with denied (ackchallenge) and lifespan:seconds lifespanTtl:60sec - reboot after ttl and it should ask grant
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        # Case-1
        And Framework registers 'ackchallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'expect error for device id'
        Then 'Firebolt' platform responds with 'invalid request for device id'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for device id'
        Then 'Firebolt' platform responds with 'false for capabilities granted'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'
        # Case-2
        # rebooting the device after ttl and validating again
        ### When I reboot device
        When 3rd party 'certification' app is launched
        And User set response for 'set acknowledge granted'
        And Framework registers 'ackchallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch device id'
        Then 'Firebolt' platform responds with 'expected device id'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for device id'
        Then 'Firebolt' platform responds with 'true for capabilities granted'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'

    # grantPolicy having lifespan:seconds and lifespanTtl:60 seconds
    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario: UserGrants.Capabilities - Positive Scenario: privacySetting - autoApplyPolicy:always property-getter:true silently grant
        Given the environment has been set up for 'userGrants' tests
        And 1st party app invokes the 'Firebolt' API to 'disable closedCaptions'
        And 3rd party 'certification' app is launched
        And 1st party app invokes the 'Firebolt' API to 'set privacy allow watchHistory as true'
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'get closedCaptions settings'
        Then 'Firebolt' platform responds with 'disabled for closedCaptions settings'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'EMPTY_HISTORY'
        When '3rd party app' invokes the 'Firebolt' API to 'check if accessibility closedCaptions capability is granted with role as use'
        Then 'Firebolt' platform responds with 'true for capabilities granted'

    # First testcase having grantPolicy with lifespan:seconds and lifespanTtl:60 seconds
    # Second testcase having lifespan:appActive
    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario Outline: UserGrants.Capabilities - Positive Scenario: <Scenario>
        Given the environment has been set up for 'userGrants' tests
        And 1st party app invokes the 'Firebolt' API to '<Key>'
        And 3rd party 'certification' app is launched
        And 1st party app invokes the 'Firebolt' API to 'set privacy allow watchHistory as false'
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Invalid_Request_Error>'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'EMPTY_HISTORY'
        When '3rd party app' invokes the 'Firebolt' API to '<Check_Capabilities_Granted>'
        Then 'Firebolt' platform responds with 'false for capabilities granted'

        Examples:
            | Scenario                                                                             | Key                    | API_Key                                  | Invalid_Request_Error                       | Check_Capabilities_Granted                                                   |
            | Validate Capability autoApplyPolicy:always property-getter:false silently denied     | disable closedCaptions | expect error for closedCaptions settings | invalid request for closedCaptions settings | check if accessibility closedCaptions capability is granted with role as use |
            | Validate Capability autoApplyPolicy:disallowed property-getter:false silently denied | disable voiceguidance  | expect error for voiceGuidance Settings  | invalid request for voiceGuidance settings  | check if accessibility voiceGuidance capability is granted with role as use  |

    # grantPolicy having lifespan:appActive
    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario: UserGrants.Capabilities - Positive Scenario: Validate Capabilities with privacySetting - autoApplyPolicy:allowed property-getter:true silently grant
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        And 1st party app invokes the 'Firebolt' API to 'set privacy allow watchHistory as true'
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'fetch device token'
        Then 'Firebolt' platform responds with 'authentication device'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'EMPTY_HISTORY'
        When '3rd party app' invokes the 'Firebolt' API to 'check if authentication token device capability is granted with role use'
        Then 'Firebolt' platform responds with 'true for capabilities granted'

    # grantPolicy having lifespan:appActive
    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario: UserGrants.Capabilities - Positive Scenario: Validate Capabilities with privacySetting - autoApplyPolicy:allowed property-getter:false grant
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        And 1st party app invokes the 'Firebolt' API to 'set privacy allow watchHistory as false'
        And Framework registers 'pinChallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'fetch device token'
        Then 'Firebolt' platform responds with 'authentication device'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'
        When 1st party app invokes the 'Firebolt' API to 'get privacy allow watchHistory'
        Then 'Firebolt' platform responds to '1st party app' with 'true for privacy allow watchHistory'
        When '3rd party app' invokes the 'Firebolt' API to 'check if authentication token device capability is granted with role use'
        Then 'Firebolt' platform responds with 'true for capabilities granted'

    # grantPolicy having lifespan:appActive
    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario: UserGrants.Capabilities - Positive Scenario: Validate Capabilities with privacySetting - autoApplyPolicy:allowed property-getter:false deny
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        And 1st party app invokes the 'Firebolt' API to 'set privacy allow watchHistory as false'
        And Framework registers 'pinChallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'expect error for device token'
        Then 'Firebolt' platform responds with 'invalid request for authentication device'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'
        When 1st party app invokes the 'Firebolt' API to 'get privacy allow watchHistory'
        Then 'Firebolt' platform responds to '1st party app' with 'false for privacy allow watchHistory'
        When '3rd party app' invokes the 'Firebolt' API to 'check if authentication token device capability is granted with role use'
        Then 'Firebolt' platform responds with 'false for capabilities granted'

    # grantPolicy having lifespan:appActive
    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario: UserGrants.Capabilities - Positive Scenario: Validate Capabilities with privacySetting - autoApplyPolicy:disallowed property-getter:true grant
        Given the environment has been set up for 'userGrants' tests
        And 1st party app invokes the 'Firebolt' API to 'disable voiceguidance'
        And 3rd party 'certification' app is launched
        And 1st party app invokes the 'Firebolt' API to 'set privacy allow watchHistory as true'
        And Framework registers 'pinChallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'get voiceGuidance settings'
        Then 'Firebolt' platform responds with 'disabled voiceGuidance settings'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'
        When 1st party app invokes the 'Firebolt' API to 'get privacy allow watchHistory'
        Then 'Firebolt' platform responds to '1st party app' with 'true for privacy allow watchHistory'
        When '3rd party app' invokes the 'Firebolt' API to 'check if accessibility voiceGuidance capability is granted with role use'
        Then 'Firebolt' platform responds with 'true for capabilities granted'

    # grantPolicy having lifespan:appActive
    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario: UserGrants.Capabilities - Positive Scenario: Validate Capabilities with privacySetting - autoApplyPolicy:disallowed property-getter:true deny
        Given the environment has been set up for 'userGrants' tests
        And 1st party app invokes the 'Firebolt' API to 'disable voiceguidance'
        And 3rd party 'certification' app is launched
        And 1st party app invokes the 'Firebolt' API to 'set privacy allow watchHistory as true'
        And Framework registers 'pinChallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'expect error for voiceGuidance settings'
        Then 'Firebolt' platform responds with 'invalid request for voiceGuidance settings'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'
        When 1st party app invokes the 'Firebolt' API to 'get privacy allow watchHistory'
        Then 'Firebolt' platform responds to '1st party app' with 'false for privacy allow watchHistory'
        When '3rd party app' invokes the 'Firebolt' API to 'check if accessibility voiceGuidance capability is granted with role as use'
        Then 'Firebolt' platform responds with 'false for capabilities granted'

    # grantPolicy having lifespan:appActive
    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario Outline: UserGrants.Capabilities - Positive Scenario: with privacySetting - <Scenario>
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        And 1st party app invokes the 'Firebolt' API to '<Key>'
        And Framework registers 'pinChallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'get secondscreen device'
        Then 'Firebolt' platform responds with 'expected secondscreen device'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'
        When 1st party app invokes the 'Firebolt' API to 'get privacy allow watchHistory'
        Then 'Firebolt' platform responds to '1st party app' with 'true for privacy allow watchHistory'
        When '3rd party app' invokes the 'Firebolt' API to 'check if secondscreen device capability is granted with role use'
        Then 'Firebolt' platform responds with 'true for capabilities granted'

        Examples:
            | Scenario                                                              | Key                                     |
            | Validate Capability autoApplyPolicy:never property-getter:true grant  | set privacy allow watchHistory as true  |
            | Validate Capability autoApplyPolicy:never property-getter:false grant | set privacy allow watchHistory as false |

    #grantPolicy having lifespan:appActive
    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario Outline: UserGrants.Capabilities - Positive Scenario: with privacySetting - <Scenario>
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        And 1st party app invokes the 'Firebolt' API to '<Key>'
        And Framework registers 'pinChallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'expect error for secondscreen device'
        Then 'Firebolt' platform responds with 'invalid request for secondscreen device'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'
        When 1st party app invokes the 'Firebolt' API to 'get privacy allow watchHistory'
        Then 'Firebolt' platform responds to '1st party app' with 'false for privacy allow watchHistory'
        When '3rd party app' invokes the 'Firebolt' API to 'check if secondscreen device capability is granted with role use'
        Then 'Firebolt' platform responds with 'false for capabilities granted'

        Examples:
            | Scenario                                                             | Key                                     |
            | Validate Capability autoApplyPolicy:never property-getter:true deny  | set privacy allow watchHistory as true  |
            | Validate Capability autoApplyPolicy:never property-getter:false deny | set privacy allow watchHistory as false |

    #grantPolicy having lifespan:appActive
    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario Outline: UserGrants.Capabilities - Positive Scenario:privacySetting - <Scenario>
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        And 1st party app invokes the 'Firebolt' API to 'set privacy allow watchHistory as true'
        And Framework registers 'pinChallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Invalid_Request_Error>'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'
        When 1st party app invokes the 'Firebolt' API to 'get privacy allow watchHistory'
        Then 'Firebolt' platform responds to '1st party app' with '<Method_Content>'
        When '3rd party app' invokes the 'Firebolt' API to '<Check_Capabilities_Granted>'
        Then 'Firebolt' platform responds with 'false for capabilities granted'

        Examples:
            | Scenario                                                                                            | API_Key                              | Invalid_Request_Error                   | Method_Content                       | Check_Capabilities_Granted                                       |
            | Validate Capability updateProperty:true - property-getter:true deny property should be set to false | expect error for secondscreen device | invalid request for secondscreen device | false for privacy allow watchHistory | check if secondscreen device capability is granted with role use |
            | Validate Capability updateProperty:false - property-getter:true deny property should not be updated | expect error for allow profile flags | invalid request for profile flags       | true for privacy allow watchHistory  | check if profile flags capability is granted with role use       |

    # grantPolicy having lifespan:appActive
    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario Outline: UserGrants.Capabilities - Positive Scenario:privacySetting - <Scenario>
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        And 1st party app invokes the 'Firebolt' API to '<Set_API_Key>'
        And Framework registers 'pinChallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Method_Content>'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'
        When 1st party app invokes the 'Firebolt' API to 'get privacy allow watchHistory'
        Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key>'
        When '3rd party app' invokes the 'Firebolt' API to '<Check_Capabilities_Granted>'
        Then 'Firebolt' platform responds with 'true for capabilities granted'

        Examples:
            | Scenario                                                                                              | Set_API_Key                             | API_Key                 | Method_Content                                 | Validation_Key                       | Check_Capabilities_Granted                                       |
            | Validate Capability updateProperty:true - property-getter:false grant property should be set to false | set privacy allow watchHistory as false | get secondscreen device | expected secondscreen device                   | true for privacy allow watchHistory  | check if secondscreen device capability is granted with role use |
            | Validate Capability updateProperty:true - property-getter:true grant property should not be changed   | set privacy allow watchHistory as true  | get secondscreen device | expected secondscreen device                   | true for privacy allow watchHistory  | check if secondscreen device capability is granted with role use |
            | Validate Capability updateProperty:false - property-getter:false grant property should not be changed | set privacy allow watchHistory as false | allow profile flags     | expected profile flags for the current session | false for privacy allow watchHistory | check if profile flags capability is granted with role use       |

    # lifespan having powerActive
    # Case-1: Allow grant and validate the result
    # Case-2: Call API after device is rebooted,expect to ask for grant, deny grant and validate error
    @Usergrants @coreSDK @sdk @transport @notSupported @requiresPlatformImplementation
    Scenario: UserGrants.Capabilities - Positive Scenario: Validate Capabilities with grant (pinChallenge) and lifespan powerActive - after reboot deny and validate
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        # Case-1
        And Framework registers 'pinChallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'fetch device model'
        Then 'Firebolt' platform responds with 'expected device model'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for device model'
        Then 'Firebolt' platform responds with 'true for capabilities granted'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'
        # Case-2
        # rebooting the device
        ###### When I reboot device
        When 3rd party 'certification' app is launched
        And Framework registers 'pinChallenge' test provider
        And User set response for 'set pinchallenge wrong pin'
        And User 'starts' recording lifecycle history for '3rd party app'
        And '3rd party app' invokes the 'Firebolt' API to 'expect error for device model'
        Then 'Firebolt' platform responds with 'invalid request for device model'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for device model'
        Then 'Firebolt' platform responds with 'false for capabilities granted'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'

    # lifespan having powerActive
    # Case-1: Deny grant and validate error
    # Case-2: Call API after device is rebooted,expect to ask for grant, allow grant and validate result
    @Usergrants @coreSDK @sdk @transport @notSupported @requiresPlatformImplementation
    Scenario: UserGrants.Capabilities - Negative Scenario: Validate Capabilities with denied (pinChallenge) and lifespan powerActive - after reboot grant and validate
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        # Case-1
        And Framework registers 'pinChallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'expect error for device model'
        Then 'Firebolt' platform responds with 'invalid request for device model'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for device model'
        Then 'Firebolt' platform responds with 'false for capabilities granted'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'
        # Case-2
        # rebooting the device
        ###### When I reboot device
        When 3rd party 'certification' app is launched
        And Framework registers 'pinChallenge' test provider
        And User set response for 'set pinchallenge correct pin'
        And User 'starts' recording lifecycle history for '3rd party app'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch device model'
        Then 'Firebolt' platform responds with 'expected device model'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for device model'
        Then 'Firebolt' platform responds with 'true for capabilities granted'
        When User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'

    # 1st example: Call usergrants.request for account.uid with granting acknowledgeChallenge for role use and validate capabilities.info for same capability and check role use is granted and not any other role
    # 2nd example: Call usergrants.request for account.uid with granting acknowledgeChallenge for role manage and validate capabilities.info for same capability and check role manage is granted and not any other role
    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario Outline: UserGrants.request - Positive Scenario: <Scenario>
        Given the environment has been set up for 'userGrants' tests
        And Framework registers 'ackchallenge' test provider
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        And 3rd party 'certification' app is launched
        And '3rd party app' invokes the 'Firebolt' API to 'get info of account uid capability'
        And '3rd party app' invokes the 'Firebolt' API to 'check if account uid capability is granted with role as use'
        And '3rd party app' invokes the 'Firebolt' API to 'check if account uid capability is granted with role as manage'
        Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key>'

        Examples:
            | Scenario                                                | API_Key                                                   | Validation_Key                                      |
            | Validate userGrants.request by granting for role use    | request grant for account uid capability with role use    | granted for account uid capability with role use    |
            | Validate userGrants.request by granting for role manage | request grant for account uid capability with role manage | granted for account uid capability with role manage |

    # 1st example: Call usergrants.request for account.uid with denying acknowledgeChallenge for role use and validate capabilities.info for same capability and check role use is denied
    # 2nd example: Call usergrants.request for account.uid with denying acknowledgeChallenge for role manage and validate capabilities.info for same capability and check role manage is denied
    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario Outline: UserGrants.request - Negative Scenario: <Scenario>
        Given the environment has been set up for 'userGrants' tests
        And Framework registers 'ackchallenge' test provider
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        And 3rd party 'certification' app is launched
        And '3rd party app' invokes the 'Firebolt' API to 'get info of account uid capability'
        And '3rd party app' invokes the 'Firebolt' API to 'check if account uid capability is granted with role as use'
        And '3rd party app' invokes the 'Firebolt' API to 'check if account uid capability is granted with role as manage'
        Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key>'

        Examples:
            | Scenario                                               | API_Key                                                   | Validation_Key                                     |
            | Validate userGrants.request by denying for role use    | request grant for account uid capability with role use    | denied for account uid capability with role use    |
            | Validate userGrants.request by denying for role manage | request grant for account uid capability with role manage | denied for account uid capability with role manage |

    # Call usergrants.request with securestorage for role use, but the grant policy has role manage, since role mismatch it should return null since no grantpolicy is matched
    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario: UserGrants.request - Negative Scenario: Validate userGrants.request call with role use, but grantpolicy having manage capability
        Given the environment has been set up for 'userGrants' tests
        And Framework registers 'pinChallenge' test provider
        When 1st party app invokes the 'Firebolt' API to 'request grant for secure storage capability with role use'
        And 3rd party 'certification' app is launched
        And '3rd party app' invokes the 'Firebolt' API to 'get stored value with scope as device and key as authTestTokenDevice'
        Then 'Firebolt' platform responds with 'expected value for authTestTokenDevice stored data in securestorage'
        When '3rd party app' invokes the 'Firebolt' API to 'get info of secure storage capability'
        And '3rd party app' invokes the 'Firebolt' API to 'check if account uid capability is granted with role as use'
        And '3rd party app' invokes the 'Firebolt' API to 'check if account uid capability is granted with role as manage'
        Then 'Firebolt' platform responds to '1st party app' with 'granted for secure storage capability with role use'

    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario: UserGrants.request - Positive Scenario: Validate UserGrants.request which grantpolicy is not present in manifest
        Given the environment has been set up for 'userGrants' tests
        When 1st party app invokes the 'Firebolt' API to 'request grant for device info capability with role use'
        And 3rd party 'certification' app is launched
        And '3rd party app' invokes the 'Firebolt' API to 'fetch device platform'
        Then 'Firebolt' platform responds with 'expected device platform'
        When '3rd party app' invokes the 'Firebolt' API to 'get info of device info capability'
        And '3rd party app' invokes the 'Firebolt' API to 'check if device info capability is granted with role as use'
        And '3rd party app' invokes the 'Firebolt' API to 'check if device info capability is granted with role as manage'
        Then 'Firebolt' platform responds to '1st party app' with 'granted for device info capability with role use'

    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario: UserGrants.request - Positive Scenario: Validate userGrants.request by deferring
        Given the environment has been set up for 'userGrants' tests
        And Framework registers 'ackchallenge' test provider
        When 1st party app invokes the 'Firebolt' API to 'request grant for account uid capability with role use'
        And 3rd party 'certification' app is launched
        And '3rd party app' invokes the 'Firebolt' API to 'fetch account UID with error'
        Then 'Firebolt' platform responds with 'invalid request for account uid'
        When '3rd party app' invokes the 'Firebolt' API to 'get info of account uid capability'
        And '3rd party app' invokes the 'Firebolt' API to 'check if account uid capability is granted with role as use'
        And '3rd party app' invokes the 'Firebolt' API to 'check if account uid capability is granted with role as manage'
        And '3rd party app' invokes the 'Firebolt' API to 'check if account uid capability is granted with role as provide'
        Then 'Firebolt' platform responds to '1st party app' with 'deferred for account uid capability with role use'

    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario: UserGrants.request - Positive Scenario: Validate userGrants.request by deferring with timeout
        Given the environment has been set up for 'userGrants' tests
        And Framework registers 'ackchallenge' test provider
        When 1st party app invokes the 'Firebolt' API to 'request grant for account uid capability with role use'
        And 3rd party 'certification' app is launched
        And '3rd party app' invokes the 'Firebolt' API to 'fetch account UID with error'
        Then 'Firebolt' platform responds with 'invalid request for account uid'
        When '3rd party app' invokes the 'Firebolt' API to 'get info of account uid capability'
        And '3rd party app' invokes the 'Firebolt' API to 'check if account uid capability is granted with role as use'
        And '3rd party app' invokes the 'Firebolt' API to 'check if account uid capability is granted with role as manage'
        And '3rd party app' invokes the 'Firebolt' API to 'check if account uid capability is granted with role as provide'
        Then 'Firebolt' platform responds to '1st party app' with 'deferred for account uid capability with role use'

    # Call capabilities.request for account.uid with granting acknowledgeChallenge for role provide and validate by calling capabilities.info with same capability and check which role manage is granted and not any other role
    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario: UserGrants.request - Positive Scenario: Validate usergrants.request by granting for role provide
        Given the environment has been set up for 'userGrants' tests
        And Framework registers 'ackchallenge' test provider
        When 1st party app invokes the 'Firebolt' API to 'request grant for account uid capability with role provide'
        And 3rd party 'certification' app is launched
        And '3rd party app' invokes the 'Firebolt' API to 'fetch account UID'
        Then 'Firebolt' platform responds with 'account uid'
        When '3rd party app' invokes the 'Firebolt' API to 'get info of account uid capability'
        And '3rd party app' invokes the 'Firebolt' API to 'check if account uid capability is granted with role as use'
        And '3rd party app' invokes the 'Firebolt' API to 'check if account uid capability is granted with role as manage'
        And '3rd party app' invokes the 'Firebolt' API to 'check if account uid capability is granted with role as provide'
        Then 'Firebolt' platform responds to '1st party app' with 'granted for account uid capability with role provide'

    # Call capabilities.request for account.uid with denying acknowledgeChallenge for role manage and validate by calling capabilities.info with same capability and check which role manage is denied
    @Usergrants @coreSDK @sdk @transport @requiresPlatformImplementation
    Scenario: UserGrants.request - Negative Scenario: Validate usergrants.request by denying for role provide
        Given the environment has been set up for 'userGrants' tests
        And Framework registers 'ackchallenge' test provider
        When 1st party app invokes the 'Firebolt' API to 'request grant for account uid capability with role provide'
        And 3rd party 'certification' app is launched
        And '3rd party app' invokes the 'Firebolt' API to 'fetch account UID with error'
        Then 'Firebolt' platform responds with 'invalid request for account uid'
        When '3rd party app' invokes the 'Firebolt' API to 'get info of account uid capability'
        And '3rd party app' invokes the 'Firebolt' API to 'check if account uid capability is granted with role as use'
        And '3rd party app' invokes the 'Firebolt' API to 'check if account uid capability is granted with role as manage'
        And '3rd party app' invokes the 'Firebolt' API to 'check if account uid capability is granted with role as provide'
        Then 'Firebolt' platform responds to '1st party app' with 'denied for account uid capability with role provide'