@Capabilities @coreSDK
Feature: Capabilities

  Background: Launch FCA for 'Capabilities'
    Given the environment has been set up for 'Capabilities' tests
    And 3rd party 'certification' app is launched

  @sdk @transport
  Scenario: Capabilities.info - Validate API Method Response Content
    When '3rd party app' invokes the 'Firebolt' API to 'get capability info'
    Then 'Firebolt' platform responds with 'expected value for info api'

  @sdk @transport
  Scenario Outline: Capabilities.available - Validate API Method Response for <Scenario>
    When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
    Then 'Firebolt' platform responds with '<Validation_key>'

    Examples:
      | Scenario                                         | API_Key                                               | Validation_key                                          |
      | keyboard capability in 3rd party app             | check availability of keyboard capability             | expected value for keyboard capability availability     |
      | acknowledgechallenge capability in 3rd party app | check availability of acknowledgechallenge capability | true for acknowledgechallenge capability availability   |
      | pinchallenge capability in 3rd party app         | check availability of pinchallenge capability         | expected value for pinchallenge capability availability |

  @sdk @transport
  Scenario Outline: Capabilities.available - Validate API Method Response for <Scenario>
    When 1st party app invokes the 'Firebolt' API to '<API_Key>'
    Then 'Firebolt' platform responds to '1st party app' with '<Validation_key>'

    Examples:
      | Scenario                                    | API_Key                                               | Validation_key                                          |
      | keyboard capability in platform             | check availability of keyboard capability             | expected value for keyboard capability availability     |
      | acknowledgechallenge capability in platform | check availability of acknowledgechallenge capability | true for acknowledgechallenge capability availability   |
      | pinchallenge capability in platform         | check availability of pinchallenge capability         | expected value for pinchallenge capability availability |

  @sdk @transport
  Scenario Outline: Capabilities.granted - Validate API Method Response with <Scenario>
    When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
    Then 'Firebolt' platform responds with 'true for granted capability with passed role'

    Examples:
      | Scenario                | API_Key                                             |
      | grants                  | check if passed capability is granted               |
      | options role as use     | check if capability is granted with role as use     |
      | options role as manage  | check if capability is granted with role as manage  |
      | options role as provide | check if capability is granted with role as provide |

  @sdk @transport
  Scenario Outline: Capabilities api - Validating API and Event responses for <Scenario>
    When '3rd party app' invokes the 'Firebolt' API to '<Info_API_Key>'
    Then 'Firebolt' platform responds with 'expected value for info api'
    When '3rd party app' invokes the 'Firebolt' API to '<Supported_API_Key>'
    Then 'Firebolt' platform responds with 'expected value for supported api'

    Examples:
      | Scenario                            | Info_API_Key                                          | Supported_API_Key                                               |
      | userGrant pinChallenge              | get info of usergrant pinchallenge capability         | check if usergrant pinchallenge capability is supported         |
      | device distributor                  | get info of device distributor capability             | check if device distributor capability is supported             |
      | wifi networkStatus                  | get info of wifi networkstatus capability             | check if wifi networkstatus capability is supported             |
      | localization time-zone              | get info of localization timezone capability          | check if localization timezone capability is supported          |
      | privacy settings                    | get info of privacy settings capability               | check if privacy settings capability is supported               |
      | protocolWifi                        | get info of wifi protocol capability                  | check if wifi protocol capability is supported                  |
      | acknowledgeChallenge userGrant      | get info of usergrant acknowledgechallenge capability | check if usergrant acknowledgechallenge capability is supported |
      | grants state                        | get info of grants state capability                   | check if for grants state capability is supported               |
      | localization time-zone without role | get info of localization timezone capability          | check if localization timezone capability is supported          |

  @sdk @transport
  Scenario Outline: Capabilities api - Validating API and event responses for <Scenario>
    When '3rd party app' invokes the 'Firebolt' API to '<Info_API_Key>'
    Then 'Firebolt' platform responds with 'expected value for info api'
    When '3rd party app' invokes the 'Firebolt' API to '<Permitted_API_Key>'
    Then 'Firebolt' platform responds with 'expected value for permitted api'
    When '3rd party app' invokes the 'Firebolt' API to '<Supported_API_Key>'
    Then 'Firebolt' platform responds with 'expected value for supported api'

    Examples:
      | Scenario                      | Info_API_Key                                         | Supported_API_Key                                              | Permitted_API_Key                                              |
      | lifecycle ready               | get info of lifecycle ready capability               | check if lifecycle ready capability is supported               | check if lifecycle ready capability is permitted               |
      | lifecycle state               | get info of lifecycle state capability               | check if lifecycle state capability is supported               | check if lifecycle state capability is permitted               |
      | lifecycle launch              | get info of lifecycle launch capability              | check if lifecycle launch capability is supported              | check if lifecycle launch capability is permitted              |
      | advertising identifier        | get info of advertising identifier capability        | check if advertising identifier capability is supported        | check if advertising identifier capability is permitted        |
      | account id                    | get info of account id capability                    | check if account id capability is supported                    | check if account id capability is permitted                    |
      | account uid                   | get info of account uid capability                   | check if account uid capability is supported                   | check if account uid capability is permitted                   |
      | discovery signInStatus        | get info of discovery signinstatus capability        | check if discovery signinstatus capability is supported        | check if discovery signinstatus capability is permitted        |
      | discovery watchNext           | get info of discovery watchnext capability           | check if discovery watchnext capability is supported           | check if discovery watchnext capability is permitted           |
      | discovery watched             | get info of discovery watched capability             | check if discovery watched capability is supported             | check if discovery watched capability is permitted             |
      | discovery entityInfo          | get info of discovery entityinfo capability          | check if discovery entityinfo capability is supported          | check if discovery entityinfo capability is permitted          |
      | discovery navigateTo          | get info of discovery navigateto capability          | check if discovery navigateto capability is supported          | check if discovery navigateto capability is permitted          |
      | discovery policy              | get info of discovery policy capability              | check if discovery policy capability is supported              | check if discovery policy capability is permitted              |
      | discovery purchasedContent    | get info of discovery purchasedcontent capability    | check if discovery purchasedcontent capability is supported    | check if discovery purchasedcontent capability is permitted    |
      | keyboard input                | get info of keyboard input capability                | check if keyboard input capability is supported                | check if keyboard input capability is permitted                |
      | localization location         | get info of localization location capability         | check if localization location capability is supported         | check if localization location capability is permitted         |
      | protocolDial                  | get info of protocoldial capability                  | check if protocoldial capability is supported                  | check if protocoldial capability is permitted                  |
      | authentication token device   | get info of authentication token device capability   | check if authentication token device capability is supported   | check if authentication token device capability is permitted   |
      | authentication token platform | get info of authentication token platform capability | check if authentication token platform capability is supported | check if authentication token platform capability is permitted |
      | authentication token root     | get info of authentication token root capability     | check if authentication token root capability is supported     | check if authentication token root capability is permitted     |
      | approveContent                | get info of approvecontent capability                | check if approvecontent capability is supported                | check if approvecontent capability is permitted                |
      | profile approvePurchase       | get info of profile approvepurchase capability       | check if profile approvepurchase capability is supported       | check if profile approvepurchase capability is permitted       |
      | profile flags                 | get info of profile flags capability                 | check if profile flags capability is supported                 | check if profile flags capability is permitted                 |
      | device id                     | get info of device id capability                     | check if device id capability is supported                     | check if device id capability is permitted                     |
      | device info                   | get info of device info capability                   | check if device info capability is supported                   | check if device info capability is permitted                   |
      | device make                   | get info of device make capability                   | check if device make capability is supported                   | check if device make capability is permitted                   |
      | device model                  | get info of device model capability                  | check if device model capability is supported                  | check if device model capability is permitted                  |
      | device sku                    | get info of device sku capability                    | check if device sku capability is supported                    | check if device sku capability is permitted                    |
      | device uid                    | get info of device uid capability                    | check if device uid capability is supported                    | check if device uid capability is permitted                    |
      | metrics general               | get info of metrics general capability               | check if metrics general capability is supported               | check if metrics general capability is permitted               |
      | metrics media                 | get info of metrics media capability                 | check if metrics media capability is supported                 | check if metrics media capability is permitted                 |
      | privacy advertising           | get info of privacy advertising capability           | check if privacy advertising capability is supported           | check if privacy advertising capability is permitted           |
      | advertising configuration     | get info of advertising configuration capability     | check if advertising configuration capability is supported     | check if advertising configuration capability is permitted     |
      | localization locality         | get info of localization locality capability         | check if localization locality capability is supported         | check if localization locality capability is permitted         |
      | localization postalCode       | get info of localization postalCode capability       | check if localization postalCode capability is supported       | check if localization postalCode capability is permitted       |
      | localization countryCode      | get info of localization countryCode capability      | check if localization countryCode capability is supported      | check if localization countryCode capability is permitted      |
      | localization language         | get info of localization language capability         | check if localization language capability is supported         | check if localization language capability is permitted         |
      | localization locale           | get info of localization locale capability           | check if localization locale capability is supported           | check if localization locale capability is permitted           |
      | accessibility closedCaptions  | get info of accessibility closedCaptions capability  | check if accessibility closedCaptions capability is supported  | check if accessibility closedCaptions capability is permitted  |
      | accessibility voiceGuidance   | get info of accessibility voiceGuidance capability   | check if accessibility voiceGuidance capability is supported   | check if accessibility voiceGuidance capability is permitted   |
      | device name                   | get info of device name capability                   | check if device name capability is supported                   | check if device name capability is permitted                   |
      | authentication token session  | get info of authentication token session capability  | check if authentication token session capability is supported  | check if authentication token session capability is permitted  |
      | secure storage                | get info of secure storage capability                | check if secure storage capability is supported                | check if secure storage capability is permitted                |
      | capability info               | get info of capability info capability               | check if capability info capability is supported               | check if capability info capability is permitted               |
      | discovery contentAccess       | get info of discovery contentaccess capability       | check if discovery contentaccess capability is supported       | check if discovery contentaccess capability is permitted       |

  @sdk @transport
  Scenario: Capabilities.permitted - Validating API Error Handling 
    When '3rd party app' invokes the 'Firebolt' API to 'check if lifecycle ready capability is permitted'
    Then 'Firebolt' platform responds with 'expected value for permitted api'
    When '3rd party app' invokes the 'Firebolt' API to 'check if lifecycle ready capability expecting error'
    Then 'Firebolt' platform responds with 'custom error for lifecycle ready capability'

  @sdk @transport
  Scenario Outline: Capabilities.permitted - Validating API and Event responses for <Scenario>
    When '3rd party app' invokes the 'Firebolt' API to '<Permitted_API_Key>'
    Then 'Firebolt' platform responds with 'expected value for permitted api'
    When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
    Then 'Firebolt' platform responds with '<Validation_Key>'
    Examples:
      | Scenario                   | Permitted_API_Key                                              | API_Key               | Validation_Key                         |
      | lifecycle state capability | check if lifecycle state capability is permitted with role use | fetch lifecycle state | expected lifecycle state as foreground |
      | account id capability      | check if account id capability is permitted with role use      | fetch account id      | account id                             |
      | account uid capability     | check if account uid capability is permitted with role use     | fetch account uid     | account uid                            |

  @sdk @transport
  Scenario Outline: Capabilities.permitted - Validating API and Event responses for <Scenario>
    When '3rd party app' invokes the 'Firebolt' API to '<Permitted_API_Key>'
    Then 'Firebolt' platform responds with 'expected value for permitted api'
    When '3rd party app' invokes the 'Firebolt' API to '<Discovery_API_Key>'
    Then 'Firebolt' platform responds with '<Discovery_Validation_Key>'
    Examples:
      | Scenario                          | Permitted_API_Key                                                     | Discovery_API_Key                         | Discovery_Validation_Key              |
      | discovery entitlements capability | check if discovery entitlements capability is permitted with role use | notify entitlements                       | true for entitlements in discovery    |
      | discovery watchNext capability    | check if discovery watchnext capability is permitted with role use    | suggest watchnext tile with entityid      | true for watchnext tile in discovery  |
      | discovery watched capability      | check if discovery watched capability is permitted with role use      | notify watched content with only entityid | true for watched content in discovery |

  @sdk @transport
  Scenario Outline: Capabilities.<Method> - Validating API Error handling given <Scenario>
    When '3rd party app' invokes the 'Firebolt' API to '<Error_Key>'
    Then 'Firebolt' platform responds with '<Error_Validation_Key>'
    Examples:
      | Method    | Scenario                      | Error_Key                                                  | Error_Validation_Key                      |
      | info      | invalid capabilities category | get info of capabilities with invalid category             | invalid params for capabilities info      |
      | info      | empty param                   | get info of capabilities with empty param                  | invalid params for capabilities info      |
      | info      | no capabilities               | get info of capabilities with empty capabilities           | custom error for capabilities info        |
      | permitted | Wifi with invalid role        | get permitted capabilities with invalid role               | invalid params for capabilities permitted |
      | permitted | invalid capabilities          | get permitted capabilities with invalid capability         | invalid params for capabilities permitted |
      | available | Invalid capabilities category | check availability of capabilities with invalid capability | invalid params for capabilities available |
      | available | empty param                   | check availability of capabilities with empty param        | invalid params for capabilities available |
      | supported | empty params                  | get supported capabilities with empty param                | invalid params for capabilities supported |
      | supported | multiple capabilities         | get supported capabilities multiple capability             | invalid params for capabilities supported |
      | supported | invalid capabilities          | get supported capabilities invalid capability              | invalid params for capabilities supported |
      | granted   | without capabilities          | get granted capabilities without capability                | invalid params for capabilities granted   |
      | granted   | capability as random string   | get granted capabilities with random string capability     | invalid params for capabilities granted   |
      | granted   | capability as null            | get granted capabilities with null capability              | invalid params for capabilities granted   |
      | granted   | capability as number          | get granted capabilities with number capability            | invalid params for capabilities granted   |
      | granted   | capability as boolean         | get granted capabilities with boolean capability           | invalid params for capabilities granted   |
      | granted   | capability as array           | get granted capabilities with array capability             | invalid params for capabilities granted   |
      | granted   | options as string             | get granted capabilities with string options               | invalid params for capabilities granted   |
      | granted   | options as number             | get granted capabilities with number options               | invalid params for capabilities granted   |
      | granted   | options as boolean            | get granted capabilities with boolean options              | invalid params for capabilities granted   |
      | granted   | options as array              | get granted capabilities with array options                | invalid params for capabilities granted   |
      | granted   | options with null role        | get granted capabilities with invalid options null role    | invalid params for capabilities granted   |
      | granted   | options with number role      | get granted capabilities with invalid options number role  | invalid params for capabilities granted   |
      | granted   | options with boolean role     | get granted capabilities with invalid options boolean role | invalid params for capabilities granted   |
      | granted   | options with array role       | get granted capabilities with invalid options array role   | invalid params for capabilities granted   |

  @sdk @transport
  Scenario: Capabilities api - Validate API Method Response for capability request
    When '3rd party app' invokes the 'Firebolt' API to 'get info of capability request capability'
    Then 'Firebolt' platform responds with 'expected value for info api'
    When '3rd party app' invokes the 'Firebolt' API to 'get capabilityInfo of request capability'
    Then 'Firebolt' platform responds with 'expected capability is requested'
    When '3rd party app' invokes the 'Firebolt' API to 'check if capability request capability is permitted'
    Then 'Firebolt' platform responds with 'expected value for permitted api'
    When '3rd party app' invokes the 'Firebolt' API to 'check if capability request capability is supported'
    Then 'Firebolt' platform responds with 'expected value for supported api'

  @sdk @transport
  Scenario Outline: Capabilities.permitted - Validating API and event responses for <Scenario>
    When '3rd party app' invokes the 'Firebolt' API to '<Permitted_Api_Key>'
    Then 'Firebolt' platform responds with 'expected value for permitted api'
    When '3rd party app' invokes the 'Firebolt' API to '<Api_Key>'
    Then 'Firebolt' platform responds with '<Validation_Key>'

    Examples:
      | Scenario                                 | Permitted_Api_Key                                                            | Api_Key                                   | Validation_Key                     |
      | authentication token device capability   | check if authentication token device capability is permitted with role use   | get the authentication token for device   | decode base64 authentication token |
      | authentication token platform capability | check if authentication token platform capability is permitted with role use | get the authentication token for platform | platform authentication token      |

  @sdk @transport
  Scenario Outline: Capabilities.permitted - Validating API and event responses for <Scenario>
    When '3rd party app' invokes the 'Firebolt' API to '<Permitted_Api_Key>'
    Then 'Firebolt' platform responds with 'expected value for permitted api'
    When '3rd party app' invokes the 'Firebolt' API to '<Api_Key>'
    Then 'Firebolt' platform responds with '<Validation_Key>'

    Examples:
      | Scenario                                | Permitted_Api_Key                                                           | Api_Key             | Validation_Key         |
      | authentication token root capability    | check if authentication token root capability is permitted with role use    | fetch root token    | authentication root    |
      | authentication token session capability | check if authentication token session capability is permitted with role use | fetch session token | authentication session |
      | device make capability                  | check if device make capability is permitted with role use                  | fetch device make   | expected device make   |
      | device model capability                 | check if device model capability is permitted with role use                 | fetch device model  | expected device model  |
      | device sku capability                   | check if device sku capability is permitted with role use                   | fetch device sku    | expected device sku    |
      | device uid capability                   | check if device uid capability is permitted with role use                   | fetch device uid    | expected device uid    |

  @sdk @transport @requiresPlatformImplementation
  Scenario: Capabilities.OnAvailable - Validating API and event response
    Given 1st party app registers for the 'capabilities onAvailable' event using the 'Firebolt' API
    And User set response for 'set keyboard response in platform'
    And Framework registers 'keyboard' test provider
    When 1st party app invokes the 'Firebolt' API to 'check availability of keyboard capability'
    Then 'Firebolt' platform responds to '1st party app' with 'true for keyboard capability availability'
    And 'Firebolt' platform triggers to '1st party app' event 'expected value for capabilities onAvailable'

  @sdk @transport @requiresPlatformImplementation @notSupported
  Scenario: Capabilities.OnUnavailable - Validating API and event response
    Given 1st party app registers for the 'capabilities onUnavailable' event using the 'Firebolt' API
    And User set response for 'set keyboard response in platform'
    And Framework registers 'keyboard' test provider
    When 1st party app invokes the 'Firebolt' API to 'check availability of keyboard capability'
    Then 'Firebolt' platform responds to '1st party app' with 'false for keyboard capability availability'
    And 'Firebolt' platform triggers to '1st party app' event 'expected value for capabilities onUnAvailable'

  @sdk @transport @requiresPlatformImplementation
  Scenario: Capabilities.OnGranted - Validating API and event response
    Given '3rd party app' registers for the 'capabilities onGranted' event using the 'Firebolt' API
    And User set response for 'set pinchallenge correct pin'
    And Framework registers 'pinChallenge' test provider
    And User set response for 'set acknowledge granted'
    And Framework registers 'ackchallenge' test provider
    When '3rd party app' invokes the 'Firebolt' API to 'fetch device id'
    Then 'Firebolt' platform responds with 'expected device id'
    When '3rd party app' invokes the 'Firebolt' API to 'check if device id capability is granted'
    Then 'Firebolt' platform responds with 'true for granted capability with passed role'
    And 'Firebolt' platform triggers event 'expected value for capabilities OnGranted'

  @sdk @transport @requiresPlatformImplementation
  Scenario: Capabilities.OnRevoked - Validating API and event response
    Given '3rd party app' registers for the 'capabilities onRevoked' event using the 'Firebolt' API
    And User set response for 'set pinchallenge wrong pin'
    And Framework registers 'pinChallenge' test provider
    And User set response for 'set acknowledge granted'
    And Framework registers 'ackchallenge' test provider
    When '3rd party app' invokes the 'Firebolt' API to 'expect error for device id'
    Then 'Firebolt' platform responds with 'invalid request for device id'
    When '3rd party app' invokes the 'Firebolt' API to 'check if device id capability is granted'
    Then 'Firebolt' platform responds with 'false for granted capability with passed role'
    And 'Firebolt' platform triggers event 'expected value for capabilities OnRevoked'