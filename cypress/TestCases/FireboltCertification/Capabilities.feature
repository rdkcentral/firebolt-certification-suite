Feature: Capabilities

  Background: Launch FCA for 'Capabilities'
    Given the environment has been set up for 'Capabilities' tests
    And 3rd party 'certification' app is launched

  @Capabilities @coreSDK
  Scenario: Capabilities.info - Positive Scenario: Validate passing all the capabilities list
    When '3rd party app' invokes the 'Firebolt' API to 'get capability info'
    Then 'Firebolt' platform responds with 'expected value for info api'

  @Capabilities @coreSDK
  Scenario Outline: Capabilities.available - Positive Scenario: <Scenario>
    When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
    Then 'Firebolt' platform responds with '<Validation_key>'

    Examples:
      | Scenario                                                            | API_Key                                               | Validation_key                                        |
      | Validate keyboard capability available in 3rd party app             | check availability of keyboard capability             | true for keyboard capability availability             |
      | Validate acknowledgechallenge capability available in 3rd party app | check availability of acknowledgechallenge capability | true for acknowledgechallenge capability availability |
      | Validate pinchallenge capability available in 3rd party app         | check availability of pinchallenge capability         | true for pinchallenge capability availability         |

  @Capabilities @coreSDK
  Scenario Outline: Capabilities.available - Positive Scenario: <Scenario>
    When 1st party app invokes the 'Firebolt' API to '<API_Key>'
    Then 'Firebolt' platform responds to '1st party app' with '<Validation_key>'

    Examples:
      | Scenario                                                       | API_Key                                               | Validation_key                                        |
      | Validate keyboard capability available in platform             | check availability of keyboard capability             | true for keyboard capability availability             |
      | Validate acknowledgechallenge capability available in platform | check availability of acknowledgechallenge capability | true for acknowledgechallenge capability availability |
      | Validate pinchallenge capability available in platform         | check availability of pinchallenge capability         | true for pinchallenge capability availability         |

  @Capabilities @coreSDK
  Scenario Outline: Capabilities.granted - Positive Scenario: <Scenario>
    When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
    Then 'Firebolt' platform responds with 'true for granted capability with passed role'

    Examples:
      | Scenario                              | API_Key                                             |
      | Validate with grants                  | check if passed capability is granted               |
      | Validate with options role as use     | check if capability is granted with role as use     |
      | Validate with options role as manage  | check if capability is granted with role as manage  |
      | Validate with options role as provide | check if capability is granted with role as provide |

  @Capabilities @coreSDK
  Scenario Outline: Capabilities api - Positive Scenario: <Scenario>
    When '3rd party app' invokes the 'Firebolt' API to '<Info_API_Key>'
    Then 'Firebolt' platform responds with 'expected value for info api'
    When '3rd party app' invokes the 'Firebolt' API to '<Supported_API_Key>'
    Then 'Firebolt' platform responds with 'expected value for supported api'

    Examples:
      | Scenario                                     | Info_API_Key                                          | Supported_API_Key                                               |
      | Validate userGrant pinChallenge              | get info of usergrant pinchallenge capability         | check if usergrant pinchallenge capability is supported         |
      | Validate device distributor                  | get info of device distributor capability             | check if device distributor capability is supported             |
      | Validate wifi networkStatus                  | get info of wifi networkstatus capability             | check if wifi networkstatus capability is supported             |
      | Validate localization time-zone              | get info of localization timezone capability          | check if localization timezone capability is supported          |
      | Validate privacy settings                    | get info of privacy settings capability               | check if privacy settings capability is supported               |
      | Validate protocolWifi                        | get info of wifi protocol capability                  | check if wifi protocol capability is supported                  |
      | Validate acknowledgeChallenge userGrant      | get info of usergrant acknowledgechallenge capability | check if usergrant acknowledgechallenge capability is supported |
      | Validate grants state                        | get info of grants state capability                   | check if for grants state capability is supported               |
      | Validate localization time-zone without role | get info of localization timezone capability          | check if localization timezone capability is supported          |

  @Capabilities @coreSDK
  Scenario Outline: Capabilities api - Positive Scenario: <Scenario>
    When '3rd party app' invokes the 'Firebolt' API to '<Info_API_Key>'
    Then 'Firebolt' platform responds with 'expected value for info api'
    When '3rd party app' invokes the 'Firebolt' API to '<Permitted_API_Key>'
    Then 'Firebolt' platform responds with 'expected value for permitted api'
    When '3rd party app' invokes the 'Firebolt' API to '<Supported_API_Key>'
    Then 'Firebolt' platform responds with 'expected value for supported api'

    Examples:
      | Scenario                               | Info_API_Key                                         | Supported_API_Key                                              | Permitted_API_Key                                              |
      | Validate lifecycle ready               | get info of lifecycle ready capability               | check if lifecycle ready capability is supported               | check if lifecycle ready capability is permitted               |
      | Validate lifecycle state               | get info of lifecycle state capability               | check if lifecycle state capability is supported               | check if lifecycle state capability is permitted               |
      | Validate lifecycle launch              | get info of lifecycle launch capability              | check if lifecycle launch capability is supported              | check if lifecycle launch capability is permitted              |
      | Validate advertising identifier        | get info of advertising identifier capability        | check if advertising identifier capability is supported        | check if advertising identifier capability is permitted        |
      | Validate account id                    | get info of account id capability                    | check if account id capability is supported                    | check if account id capability is permitted                    |
      | Validate account uid                   | get info of account uid capability                   | check if account uid capability is supported                   | check if account uid capability is permitted                   |
      | Validate discovery signInStatus        | get info of discovery signinstatus capability        | check if discovery signinstatus capability is supported        | check if discovery signinstatus capability is permitted        |
      | Validate discovery watchNext           | get info of discovery watchnext capability           | check if discovery watchnext capability is supported           | check if discovery watchnext capability is permitted           |
      | Validate discovery watched             | get info of discovery watched capability             | check if discovery watched capability is supported             | check if discovery watched capability is permitted             |
      | Validate discovery entityInfo          | get info of discovery entityinfo capability          | check if discovery entityinfo capability is supported          | check if discovery entityinfo capability is permitted          |
      | Validate discovery navigateTo          | get info of discovery navigateto capability          | check if discovery navigateto capability is supported          | check if discovery navigateto capability is permitted          |
      | Validate discovery policy              | get info of discovery policy capability              | check if discovery policy capability is supported              | check if discovery policy capability is permitted              |
      | Validate discovery purchasedContent    | get info of discovery purchasedcontent capability    | check if discovery purchasedcontent capability is supported    | check if discovery purchasedcontent capability is permitted    |
      | Validate keyboard input                | get info of keyboard input capability                | check if keyboard input capability is supported                | check if keyboard input capability is permitted                |
      | Validate localization location         | get info of localization location capability         | check if localization location capability is supported         | check if localization location capability is permitted         |
      | Validate protocolDial                  | get info of protocoldial capability                  | check if protocoldial capability is supported                  | check if protocoldial capability is permitted                  |
      | Validate authentication token device   | get info of authentication token device capability   | check if authentication token device capability is supported   | check if authentication token device capability is permitted   |
      | Validate authentication token platform | get info of authentication token platform capability | check if authentication token platform capability is supported | check if authentication token platform capability is permitted |
      | Validate authentication token root     | get info of authentication token root capability     | check if authentication token root capability is supported     | check if authentication token root capability is permitted     |
      | Validate approveContent                | get info of approvecontent capability                | check if approvecontent capability is supported                | check if approvecontent capability is permitted                |
      | Validate profile approvePurchase       | get info of profile approvepurchase capability       | check if profile approvepurchase capability is supported       | check if profile approvepurchase capability is permitted       |
      | Validate profile flags                 | get info of profile flags capability                 | check if profile flags capability is supported                 | check if profile flags capability is permitted                 |
      | Validate device id                     | get info of device id capability                     | check if device id capability is supported                     | check if device id capability is permitted                     |
      | Validate device info                   | get info of device info capability                   | check if device info capability is supported                   | check if device info capability is permitted                   |
      | Validate device make                   | get info of device make capability                   | check if device make capability is supported                   | check if device make capability is permitted                   |
      | Validate device model                  | get info of device model capability                  | check if device model capability is supported                  | check if device model capability is permitted                  |
      | Validate device sku                    | get info of device sku capability                    | check if device sku capability is supported                    | check if device sku capability is permitted                    |
      | Validate device uid                    | get info of device uid capability                    | check if device uid capability is supported                    | check if device uid capability is permitted                    |
      | Validate metrics general               | get info of metrics general capability               | check if metrics general capability is supported               | check if metrics general capability is permitted               |
      | Validate metrics media                 | get info of metrics media capability                 | check if metrics media capability is supported                 | check if metrics media capability is permitted                 |
      | Validate privacy advertising           | get info of privacy advertising capability           | check if privacy advertising capability is supported           | check if privacy advertising capability is permitted           |
      | Validate advertising configuration     | get info of advertising configuration capability     | check if advertising configuration capability is supported     | check if advertising configuration capability is permitted     |
      | Validate localization locality         | get info of localization locality capability         | check if localization locality capability is supported         | check if localization locality capability is permitted         |
      | Validate localization postalCode       | get info of localization postalCode capability       | check if localization postalCode capability is supported       | check if localization postalCode capability is permitted       |
      | Validate localization countryCode      | get info of localization countryCode capability      | check if localization countryCode capability is supported      | check if localization countryCode capability is permitted      |
      | Validate localization language         | get info of localization language capability         | check if localization language capability is supported         | check if localization language capability is permitted         |
      | Validate localization locale           | get info of localization locale capability           | check if localization locale capability is supported           | check if localization locale capability is permitted           |
      | Validate accessibility closedCaptions  | get info of accessibility closedCaptions capability  | check if accessibility closedCaptions capability is supported  | check if accessibility closedCaptions capability is permitted  |
      | Validate accessibility voiceGuidance   | get info of accessibility voiceGuidance capability   | check if accessibility voiceGuidance capability is supported   | check if accessibility voiceGuidance capability is permitted   |
      | Validate device name                   | get info of device name capability                   | check if device name capability is supported                   | check if device name capability is permitted                   |
      | Validate authentication token session  | get info of authentication token session capability  | check if authentication token session capability is supported  | check if authentication token session capability is permitted  |
      | Validate secure storage                | get info of secure storage capability                | check if secure storage capability is supported                | check if secure storage capability is permitted                |
      | Validate capability info               | get info of capability info capability               | check if capability info capability is supported               | check if capability info capability is permitted               |
      | Validate discovery contentAccess       | get info of discovery contentaccess capability       | check if discovery contentaccess capability is supported       | check if discovery contentaccess capability is permitted       |

  @Capabilities @coreSDK
  Scenario: Capabilities.permitted - Negative Scenario: lifecycle ready capability and expecting error
    When '3rd party app' invokes the 'Firebolt' API to 'check if lifecycle ready capability is permitted'
    Then 'Firebolt' platform responds with 'expected value for permitted api'
    When '3rd party app' invokes the 'Firebolt' API to 'check if lifecycle ready capability expecting error'
    Then 'Firebolt' platform responds with 'custom error for lifecycle ready capability'

  @Capabilities @coreSDK
  Scenario Outline: Capabilities.permitted - Positive Scenario: <Scenario>
    When '3rd party app' invokes the 'Firebolt' API to '<Permitted_API_Key>'
    Then 'Firebolt' platform responds with 'expected value for permitted api'
    When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
    Then 'Firebolt' platform responds with '<Validation_Key>'
    Examples:
      | Scenario                            | Permitted_API_Key                                              | API_Key               | Validation_Key                         |
      | Validate lifecycle state capability | check if lifecycle state capability is permitted with role use | fetch lifecycle state | expected lifecycle state as foreground |
      | Validate account id capability      | check if account id capability is permitted with role use      | fetch account id      | account id                             |
      | Validate account uid capability     | check if account uid capability is permitted with role use     | fetch account uid     | account uid                            |

  @Capabilities @coreSDK
  Scenario Outline: Capabilities.permitted - Positive Scenario: <Scenario>
    When '3rd party app' invokes the 'Firebolt' API to '<Permitted_API_Key>'
    Then 'Firebolt' platform responds with 'expected value for permitted api'
    When '3rd party app' invokes the 'Firebolt' API to '<Discovery_API_Key>'
    Then 'Firebolt' platform responds with '<Discovery_Validation_Key>'
    Examples:
      | Scenario                                   | Permitted_API_Key                                                     | Discovery_API_Key                         | Discovery_Validation_Key              |
      | Validate discovery entitlements capability | check if discovery entitlements capability is permitted with role use | notify entitlements                       | true for entitlements in discovery    |
      | Validate discovery watchNext capability    | check if discovery watchnext capability is permitted with role use    | suggest watchnext tile with entityid      | true for watchnext tile in discovery  |
      | Validate discovery watched capability      | check if discovery watched capability is permitted with role use      | notify watched content with only entityid | true for watched content in discovery |

  @Capabilities @coreSDK
  Scenario Outline: Capabilities.<Method> - Negative Scenario: <Scenario> and expecting error
    When '3rd party app' invokes the 'Firebolt' API to '<Error_Key>'
    Then 'Firebolt' platform responds with '<Error_Validation_Key>'
    Examples:
      | Method    | Scenario                               | Error_Key                                                  | Error_Validation_Key                      |
      | info      | Validate Invalid capabilities category | get info of capabilities with invalid category             | invalid params for capabilities info      |
      | info      | Validate Empty param                   | get info of capabilities with empty param                  | invalid params for capabilities info      |
      | info      | Validate without capabilities          | get info of capabilities with empty capabilities           | custom error for capabilities info        |
      | permitted | Validate Wifi with invalid role        | get permitted capabilities with invalid role               | invalid params for capabilities permitted |
      | permitted | Validate invalid capability            | get permitted capabilities with invalid capability         | invalid params for capabilities permitted |
      | available | Validate Invalid capabilities category | check availability of capabilities with invalid capability | invalid params for capabilities available |
      | available | Validate Empty param                   | check availability of capabilities with empty param        | invalid params for capabilities available |
      | supported | Validate empty params                  | get supported capabilities with empty param                | invalid params for capabilities supported |
      | supported | Validate multiple capability           | get supported capabilities multiple capability             | invalid params for capabilities supported |
      | supported | Validate invalid capability            | get supported capabilities invalid capability              | invalid params for capabilities supported |
      | granted   | Validate without capability            | get granted capabilities without capability                | invalid params for capabilities granted   |
      | granted   | Validate capability as random string   | get granted capabilities with random string capability     | invalid params for capabilities granted   |
      | granted   | Validate capability as null            | get granted capabilities with null capability              | invalid params for capabilities granted   |
      | granted   | Validate capability as number          | get granted capabilities with number capability            | invalid params for capabilities granted   |
      | granted   | Validate capability as boolean         | get granted capabilities with boolean capability           | invalid params for capabilities granted   |
      | granted   | Validate capability as array           | get granted capabilities with array capability             | invalid params for capabilities granted   |
      | granted   | Validate options as string             | get granted capabilities with string options               | invalid params for capabilities granted   |
      | granted   | Validate options as number             | get granted capabilities with number options               | invalid params for capabilities granted   |
      | granted   | Validate options as boolean            | get granted capabilities with boolean options              | invalid params for capabilities granted   |
      | granted   | Validate options as array              | get granted capabilities with array options                | invalid params for capabilities granted   |
      | granted   | Validate options with null role        | get granted capabilities with invalid options null role    | invalid params for capabilities granted   |
      | granted   | Validate options with number role      | get granted capabilities with invalid options number role  | invalid params for capabilities granted   |
      | granted   | Validate options with boolean role     | get granted capabilities with invalid options boolean role | invalid params for capabilities granted   |
      | granted   | Validate options with array role       | get granted capabilities with invalid options array role   | invalid params for capabilities granted   |

  @Capabilities @coreSDK
  Scenario: Capabilities api - Positive Scenario: Validate capability request
    When '3rd party app' invokes the 'Firebolt' API to 'get info of capability request capability'
    Then 'Firebolt' platform responds with 'expected value for info api'
    When '3rd party app' invokes the 'Firebolt' API to 'get capabilityInfo of request capability'
    Then 'Firebolt' platform responds with 'expected capability is requested'
    When '3rd party app' invokes the 'Firebolt' API to 'check if capability request capability is permitted'
    Then 'Firebolt' platform responds with 'expected value for permitted api'
    When '3rd party app' invokes the 'Firebolt' API to 'check if capability request capability is supported'
    Then 'Firebolt' platform responds with 'expected value for supported api'

  @Capabilities @sdk @transport @coreSDK
  Scenario Outline: Capabilities.permitted - Positive Scenario:  <Scenario>
    When '3rd party app' invokes the 'Firebolt' API to '<Permitted_Api_Key>'
    Then 'Firebolt' platform responds with 'expected value for permitted api'
    When '3rd party app' invokes the 'Firebolt' API to '<Api_Key>'
    Then 'Firebolt' platform responds with '<Validation_Key>'

    Examples:
      | Scenario                                          | Permitted_Api_Key                                                            | Api_Key                                   | Validation_Key                     |
      | Validate authentication token device capability   | check if authentication token device capability is permitted with role use   | get the authentication token for device   | decode base64 authentication token |
      | Validate authentication token platform capability | check if authentication token platform capability is permitted with role use | get the authentication token for platform | platform authentication token      |

  @Capabilities @sdk @transport @coreSDK
  Scenario Outline: Capabilities.permitted - Positive Scenario:  <Scenario>
    When '3rd party app' invokes the 'Firebolt' API to '<Permitted_Api_Key>'
    Then 'Firebolt' platform responds with 'expected value for permitted api'
    When '3rd party app' invokes the 'Firebolt' API to '<Api_Key>'
    Then 'Firebolt' platform responds with '<Validation_Key>'

    Examples:
      | Scenario                                         | Permitted_Api_Key                                                           | Api_Key             | Validation_Key         |
      | Validate authentication token root capability    | check if authentication token root capability is permitted with role use    | fetch root token    | authentication root    |
      | Validate authentication token session capability | check if authentication token session capability is permitted with role use | fetch session token | authentication session |
      | Validate device make capability                  | check if device make capability is permitted with role use                  | fetch device make   | expected device make   |
      | Validate device model capability                 | check if device model capability is permitted with role use                 | fetch device model  | expected device model  |
      | Validate device sku capability                   | check if device sku capability is permitted with role use                   | fetch device sku    | expected device sku    |
      | Validate device uid capability                   | check if device uid capability is permitted with role use                   | fetch device uid    | expected device uid    |

  @Capabilities @sdk @transport @coreSDK @notSupported
  Scenario: Validate Capabilities.OnAvailable
    When 1st party app registers for the 'capabilities onAvailable' event using the 'Firebolt' API
    And User set response for 'set keyboard response in platform'
    And Framework registers 'keyboard' test provider
    When 1st party app invokes the 'Firebolt' API to 'check availability of keyboard capability'
    Then 'Firebolt' platform responds to '1st party app' with 'true for keyboard capability availability'
    And 'Firebolt' platform triggers to '1st party app' event 'expected value for capabilities onAvailable'

  @Capabilities @sdk @transport @coreSDK @notSupported
  Scenario: Validate Capabilities.OnUnavailable
    When 1st party app registers for the 'capabilities onUnavailable' event using the 'Firebolt' API
    # And App will be in 'closed' state
    And User set response for 'set keyboard response in platform'
    When Framework registers 'keyboard' test provider
    And 1st party app invokes the 'Firebolt' API to 'check availability of keyboard capability'
    Then 'Firebolt' platform responds to '1st party app' with 'false for keyboard capability availability'
    And 'Firebolt' platform triggers to '1st party app' event 'expected value for capabilities onUnAvailable'

  @Capabilities @sdk @transport @coreSDK @notSupported
  Scenario: Validate Capabilities.OnGranted
    When '3rd party app' registers for the 'capabilities onGranted' event using the 'Firebolt' API
    And User set response for 'set pinchallenge correct pin'
    And Framework registers 'pinChallenge' test provider
    When User set response for 'set acknowledge granted'
    And Framework registers 'ackchallenge' test provider
    When '3rd party app' invokes the 'Firebolt' API to 'fetch device id'
    Then 'Firebolt' platform responds with 'expected device id'
    When '3rd party app' invokes the 'Firebolt' API to 'check if device id capability is granted'
    Then 'Firebolt' platform responds with 'true for granted capability with passed role'
    And 'Firebolt' platform triggers event 'expected value for capabilities OnGranted'

  @Capabilities @sdk @transport @coreSDK @notSupported
  Scenario: Validate Capabilities.OnRevoked
    When '3rd party app' registers for the 'capabilities onRevoked' event using the 'Firebolt' API
    And User set response for 'set pinchallenge wrong pin'
    And Framework registers 'pinChallenge' test provider
    When User set response for 'set acknowledge granted'
    And Framework registers 'ackchallenge' test provider
    When '3rd party app' invokes the 'Firebolt' API to 'expect error for device id'
    Then 'Firebolt' platform responds with 'invalid request for device id'
    When '3rd party app' invokes the 'Firebolt' API to 'check if device id capability is granted'
    Then 'Firebolt' platform responds with 'false for granted capability with passed role'
    And 'Firebolt' platform triggers event 'expected value for capabilities OnRevoked'