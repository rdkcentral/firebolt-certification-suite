@Device @coreSDK
Feature: Device

    Background: Launch FCA for 'Device'
        Given the environment has been set up for 'Device' tests
        And 3rd party 'certification' app is launched

    @sdk @transport
    Scenario Outline:Device.<Method> - Positive Scenario: <Scenario>
        Given we test the 'DEVICE' getters and setters '<Method>' to '{}'
        When '3rd party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '3rd party app' get API
        Examples:
            | Scenario                    | Method      |
            | Validate Device id          | id          |
            | Validate Device distributor | distributor |
            | Validate Device platform    | platform    |
            | Validate Device uid         | uid         |
            | Validate Device type        | type        |
            | Validate Device model       | model       |
            | Validate Device sku         | sku         |
            | Validate Device make        | make        |

    @sdk @transport
    Scenario: Device.name - Positive Scenario: Validate device name change
        Given we test the 'DEVICE_NAME_CORE' getters and setters 'setName' to 'Living hall'
        And '1st party app' registers for the 'Firebolt' event
        When 1st party app invokes the 'Firebolt' API to set value
        Then 'Firebolt' platform responds to '1st party app' set API
        When '1st party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '1st party app' get API
        And 'Firebolt' platform triggers '1st party app' event

    @mfos  @regression @sdk
    Scenario Outline: Device.<Method> - Positive Scenario: <Scenario>
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<validation_key>'

        Examples:
            | Scenario                  | Method           | API_Key                | validation_key            |
            | Validate device version   | version          | fetch device version   | expected device version   |
            | Validate hdcp             | hdcp             | fetch hdcp             | expected hdcp             |
            | Validate hdr              | hdr              | fetch hdr              | expected hdr              |
            | Validate screenResolution | screenResolution | fetch screenResolution | expected screenResolution |
            | Validate videoResolution  | videoResolution  | fetch videoResolution  | expected videoResolution  |
            | Validate audio            | audio            | fetch audio            | expected audio            |

    @regression @sdk @requiresPlatformImplementation
    Scenario: Device.onNameChanged - Positive Scenario: Clearing event listeners
        Given '3rd party app' registers for the 'device onNameChanged' event using the 'Firebolt' API
        And 3rd party stops listening to the event 'device onNameChanged event'
        When 1st party app invokes the 'Firebolt' API to 'set device name to kitchen'
        Then 'Firebolt' platform responds to '1st party app' for 'set device name to kitchen'
        And 'Firebolt' platform does not trigger event for 'onDeviceNameChanged'

    @sdk @transport @requiresPlatformImplementation @notSupported
    Scenario Outline: Device.network - Positive Scenario: <Scenario>
        Given '3rd party app' registers for the 'device onNetworkChanged' event using the 'Firebolt' API
        When '3rd party app' invokes the 'Firebolt' API to 'fetch device network'
        Then 'Firebolt' platform responds with '<Method_Validation_Key>'
        And User triggers event with value as '<Event_Params>'
        Then 'Firebolt' platform triggers event '<Event_Validation_Key>'

        Examples:
            | Scenario                               | Method_Validation_Key                   | Event_Validation_Key                        | Event_Params                                       |
            | Validate network_wifi_connected        | device network as wifi connected        | onNetworkChanged with wifi connected        | onNetworkChanged events with wifi connected        |
            | Validate network_wifi_disconnected     | device network as wifi disconnected     | onNetworkChanged with wifi disconnected     | onNetworkChanged events with wifi disconnected     |
            | Validate network_Ethernet_connected    | device network as ethernet connected    | onNetworkChanged with ethernet connected    | onNetworkChanged events with ethernet connected    |
            | Validate network_Ethernet_disconnected | device network as ethernet disconnected | onNetworkChanged with ethernet disconnected | onNetworkChanged events with ethernet disconnected |
            | Validate network_Hybrid_connected      | device network as hybrid connected      | onNetworkChanged with hybrid connected      | onNetworkChanged events with hybrid connected      |
            | Validate network_Hybrid_disconnected   | device network as hybrid disconnected   | onNetworkChanged with hybrid disconnected   | onNetworkChanged events with hybrid disconnected   |
