@Device @coreSDK
Feature: Device

    Background: Launch FCA for 'Device'
        Given the environment has been set up for 'Device' tests
        And 3rd party 'certification' app is launched

    @sdk @transport
    Scenario Outline:Device.<Method> - Positive Scenario: <Scenario>
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Validation_Key>'

        Examples:
            | Scenario                    | Method      | Validation_Key              | API_Key                  |
            | Validate Device id          | id          | expected device id          | fetch device id          |
            | Validate Device distributor | distributor | expected device distributor | fetch device distributor |
            | Validate Device uid         | uid         | expected device uid         | fetch device uid         |
            | Validate Device type        | type        | expected device type        | fetch device type        |
            | Validate Device model       | model       | expected device model       | fetch device model       |
            | Validate Device sku         | sku         | expected device sku         | fetch device sku         |
            | Validate Device make        | make        | expected device make        | fetch device make        |

    @sdk @transport
    Scenario: Device.platform - Positive Scenario: Validate device platform
        When '3rd party app' invokes the 'Firebolt' API to 'fetch device platform'
        Then 'Firebolt' platform responds with 'expected device platform'

    @sdk @transport
    Scenario: Device.name - Positive Scenario: Validate device name change
        Given we test the 'DEVICE_NAME_CORE' getters and setters 'setName' to 'Living hall'
        And '1st party app' registers for the 'Firebolt' event
        When 1st party app invokes the 'Firebolt' API to set value
        Then 'Firebolt' platform responds to '1st party app' set API
        When '1st party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '1st party app' get API
        And 'Firebolt' platform triggers '1st party app' event

    @regression @sdk @transport
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
