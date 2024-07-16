Feature: UserGrants_Manage

    # First allowing the grant and calling usergrants.app then checking grant using Capabilities.granted
    @Usergrants @manageSDK @sdk @transport @requiresPlatformImplementation
    Scenario: Usergrants.app R.5.1.2 - Positive Scenario: with grant(ackchallenge)
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        And Framework registers 'ackchallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'fetch device id'
        And User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'
        When 1st party app invokes the 'Firebolt' API to 'get usergrants for 3rd party app'
        Then 'Firebolt' platform responds to '1st party app' with 'expected list of grants for 3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for device id'
        Then 'Firebolt' platform responds with 'true for capabilities granted'

    # First allowing the grant for device.distributor for the device and calling usergrants.device and validating.
    @Usergrants @manageSDK @sdk @transport @requiresPlatformImplementation
    Scenario: Usergrants.device R.5.1.3 - Positive Scenario: with grant(ackchallenge)
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        And Framework registers 'ackchallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'fetch device distributor'
        And User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'
        When 1st party app invokes the 'Firebolt' API to 'get usergrants for device'
        Then 'Firebolt' platform responds to '1st party app' with 'expected list of grants for device'

    # First allowing the grant and calling usergrants.capability then checking grant using Capabilities.granted
    @Usergrants @manageSDK @sdk @transport @requiresPlatformImplementation
    Scenario: Usergrants.capability R.5.1.4 - Positive Scenario: with grant(ackchallenge)
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        And Framework registers 'ackchallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When '3rd party app' invokes the 'Firebolt' API to 'fetch device id'
        And User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'
        When 1st party app invokes the 'Firebolt' API to 'get usergrants for device id capability'
        Then 'Firebolt' platform responds to '1st party app' with 'expected list of grants for device id capability'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for device id'
        Then 'Firebolt' platform responds with 'true for capabilities granted'

    # Example - 1: Granting the device distributor capability at device level and validating by retrieving the list of active grants for the device.
    # Example - 2: Granting the device ID capability to specific 3rd party app and validating by retrieving the list of active grants for that app.
    # Example - 3: Denying the device distributor capability at device level and validating by retrieving the list of denied grants for the device.
    # Example - 4: Denying the device ID capability to specific 3rd party app and validating by retrieving the list of denied grants for that app.
    @Usergrants @manageSDK @sdk @transport @requiresPlatformImplementation
    Scenario Outline: Usergrants.<method> - Positive Scenario: <Scenario>
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        And 1st party app invokes the 'Firebolt' API to '<API_Key1>'
        Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key1>'
        When 1st party app invokes the 'Firebolt' API to '<API_Key2>'
        Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key2>'

        Examples:
            | Scenario                         | API_Key1                            | Validation_Key1           | API_Key2                         | Validation_Key2                                  | Method        |
            | grant capability at device level | grant device distributor capability | null for usergrants grant | get usergrants for device        | expected list of grants for device               | grant R.5.1.5 |
            | grant capability at app level    | grant device id capability          | null for usergrants grant | get usergrants for 3rd party app | expected list of grants for 3rd party app        | grant R.5.1.5 |
            | deny capability at device level  | deny device distributor capability  | null for usergrants deny  | get usergrants for device        | expected list of denied grants for device        | deny R.5.1.6  |
            | deny capability at app level     | deny device id capability           | null for usergrants deny  | get usergrants for 3rd party app | expected list of denied grants for 3rd party app | deny R.5.1.6  |

    @Usergrants @manageSDK @sdk @transport @requiresPlatformImplementation
    Scenario Outline: Usergrants.clear R.5.1.7 - Positive Scenario: <Scenario>
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        And Framework registers 'ackchallenge' test provider
        And User 'starts' recording lifecycle history for '3rd party app'
        When 1st party app invokes the 'Firebolt' API to '<Api_Key>'
        And User 'stops' recording lifecycle history for '3rd party app'
        Then User validates lifecycle history for '3rd party app' with 'background:foreground'
        When 1st party app invokes the 'Firebolt' API to '<Grant_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key>'
        When 1st party app invokes the 'Firebolt' API to '<Clear_Api_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'null for usergrants clear'
        When 1st party app invokes the 'Firebolt' API to '<Grant_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Grant_Api_Validation_Key>'

        Examples:
            | Scenario                                 | Api_Key                  | Grant_Key                        | Validation_Key                            | Clear_Api_Key                       | Grant_Api_Validation_Key                      |
            | clear grant at device level for role use | fetch device distributor | get usergrants for device        | expected list of grants for device        | clear device distributor capability | empty array for usergrants device distributor |
            | clear grant at device app for role use   | fetch device id          | get usergrants for 3rd party app | expected list of grants for 3rd party app | clear device id capability          | empty array for usergrants device id          |

    # here requesting a grant for device id for the role use
    @Usergrants @manageSDK @sdk @transport @requiresPlatformImplementation
    Scenario: Usergrants.request - Positive Scenario: requesting for grant without force params, with force=true
        Given the environment has been set up for 'userGrants' tests
        And Framework registers 'pinChallenge' test provider
        And 1st party app invokes the 'Firebolt' API to 'request grant for discovery watched capability'
        Then 'Firebolt' platform responds to '1st party app' with 'granted for discovery watched capability'
        When User set response for 'set acknowledge granted'
        And Framework registers 'ackchallenge' test provider
        When 1st party app invokes the 'Firebolt' API to 'get 3rd party app grants'
        Then 'Firebolt' platform responds to '1st party app' with 'granted for usergrants discovery watched capability'
        # Calling usergrants.request with force true, so the grant will be asked again
        When User set response for 'set pinchallenge wrong pin'
        And 1st party app invokes the 'Firebolt' API to 'request grant for discovery watched capability with role use and force true'
        Then 'Firebolt' platform responds to '1st party app' with 'denied for discovery watched capability'
        When User set response for 'set acknowledge deny'
        And Framework registers 'ackchallenge' test provider
        When 1st party app invokes the 'Firebolt' API to 'get 3rd party app grants'
        Then 'Firebolt' platform responds to '1st party app' with 'denied for usergrants country code capability'

    # here requesting a grant for device id for the role use
    @Usergrants @manageSDK @sdk @transport @requiresPlatformImplementation
    Scenario: Usergrants.request - Positive Scenario: requesting for grant without force params, with force=true and force=false
        Given the environment has been set up for 'userGrants' tests
        And Framework registers 'ackchallenge' test provider
        And 1st party app invokes the 'Firebolt' API to 'request grant for country code capability'
        Then 'Firebolt' platform responds to '1st party app' with 'granted for country code capability'
        When 1st party app invokes the 'Firebolt' API to 'get 3rd party app grants'
        Then 'Firebolt' platform responds to '1st party app' with 'granted for usergrants country code capability'
        # Calling usergrants.request with force true, so the grant will be asked again
        When User set response for 'set acknowledge deny'
        And 1st party app invokes the 'Firebolt' API to 'request grant for country code capability with role use and force true'
        Then 'Firebolt' platform responds to '1st party app' with 'denied for country code capability'
        When 1st party app invokes the 'Firebolt' API to 'get 3rd party app grants'
        Then 'Firebolt' platform responds to '1st party app' with 'denied for usergrants country code capability'
        # Calling usergrants.request with force false, grant will not be asked
        When 1st party app invokes the 'Firebolt' API to 'request grant for country code capability with role use and force false'
        Then 'Firebolt' platform responds to '1st party app' with 'denied for country code capability'
        When 1st party app invokes the 'Firebolt' API to 'get 3rd party app grants'
        Then 'Firebolt' platform responds to '1st party app' with 'denied for usergrants country code capability'

    @Usergrants @manageSDK @sdk @transport @requiresPlatformImplementation
    Scenario Outline: Usergrants.<Method> - Negative Scenario: <Scenario> expecting error
        Given the environment has been set up for 'userGrants' tests
        When 1st party app invokes the 'Firebolt' API to '<Api_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key>'

        Examples:
            | Scenario                | Api_Key                                                                  | Validation_Key                              | Method     |
            | With integer appId      | get usergrants app with invalid appId parameter                          | invalid parameter for usergrants app        | app        |
            | With boolean appId      | get usergrants app with invalid type boolean appId parameter             | invalid parameter for usergrants app        | app        |
            | with integer capability | get usergrants capability with invalid type integer capability parameter | invalid parameter for usergrants capability | capability |
            | with boolean capability | get usergrants capability with invalid type boolean capability parameter | invalid parameter for usergrants capability | capability |

    @Usergrants @manageSDK @sdk @transport @requiresPlatformImplementation
    Scenario Outline: Usergrants.<Method> - Negative Scenario: <Scenario> expecting error
        Given the environment has been set up for 'userGrants' tests
        When 1st party app invokes the 'Firebolt' API to '<Api_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key>'

        Examples:
            | Scenario                              | Method  | Api_Key                                                      | Validation_Key                           |
            | invalid role                          | grant   | get usergrants grant with invalid role parameter             | invalid parameter for usergrants grant   |
            | invalid capability                    | grant   | get usergrants grant with invalid capability parameter       | invalid parameter for usergrants grant   |
            | invalid appId                         | grant   | get usergrants grant with invalid options appId parameter    | invalid parameter for usergrants grant   |
            | capability not defined in grantPolicy | grant   | get usergrants grant with capability not defined in manifest | custom error for usergrants grant        |
            | invalid role                          | deny    | get usergrants deny with invalid role parameter              | invalid parameter for usergrants deny    |
            | invalid capability                    | deny    | get usergrants deny with invalid capability parameter        | invalid parameter for usergrants deny    |
            | invalid appId                         | deny    | get usergrants deny with invalid appId parameter             | invalid parameter for usergrants deny    |
            | capability not defined in grantPolicy | deny    | get usergrants deny with capability not defined in manifest  | custom error for usergrants deny         |
            | invalid role                          | clear   | get usergrants clear with invalid role parameter             | invalid parameter for usergrants clear   |
            | invalid capability                    | clear   | get usergrants clear with invalid capability parameter       | invalid parameter for usergrants clear   |
            | invalid appId                         | clear   | get usergrants clear with invalid options appId parameter    | invalid parameter for usergrants clear   |
            | invalid role                          | request | get usergrants request with invalid role parameter           | invalid parameter for usergrants request |
            | invalid capability                    | request | get usergrants request with invalid capability parameter     | invalid parameter for usergrants request |
            | invalid appId                         | request | get usergrants request with invalid options appId parameter  | invalid parameter for usergrants request |

    @Usergrants @manageSDK @sdk @transport @requiresPlatformImplementation
    Scenario: UserGrants.Capability R.5.1.4 - Positive Scenario: by clearing the grant and validating usergrants.capability as empty
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        And Framework registers 'ackchallenge' test provider
        When '3rd party app' invokes the 'Firebolt' API to 'fetch device distributor'
        Then 'Firebolt' platform responds with 'expected device distributor'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for device distributor'
        Then 'Firebolt' platform responds with 'true for capabilities granted'
        When 1st party app invokes the 'Firebolt' API to 'clear device distributor capability'
        Then 'Firebolt' platform responds to '1st party app' with 'null for usergrants clear'
        When 1st party app invokes the 'Firebolt' API to 'get usergrants for device distributor capability'
        Then 'Firebolt' platform responds to '1st party app' with 'empty array for device distributor capability'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for device distributor'
        Then 'Firebolt' platform responds with 'null for capabilities granted'

    @Usergrants @manageSDK @sdk @transport @requiresPlatformImplementation
    Scenario: Usergrants.app R.5.1.2 - Positive Scenario: by clearing the grant and validating usergrants.app as empty
        Given the environment has been set up for 'userGrants' tests
        And 3rd party 'certification' app is launched
        And Framework registers 'ackchallenge' test provider
        When '3rd party app' invokes the 'Firebolt' API to 'fetch device id'
        Then 'Firebolt' platform responds with 'expected device id'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for device id'
        Then 'Firebolt' platform responds with 'true for capabilities granted'
        When 1st party app invokes the 'Firebolt' API to 'clear device id capability'
        Then 'Firebolt' platform responds to '1st party app' with 'null for usergrants clear'
        When 1st party app invokes the 'Firebolt' API to 'get usergrants for 3rd party app'
        Then 'Firebolt' platform responds to '1st party app' with 'empty array for usergrants device id'
        When '3rd party app' invokes the 'Firebolt' API to 'check if capabilities is granted for device id'
        Then 'Firebolt' platform responds with 'null for capabilities granted'