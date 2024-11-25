@Device @coreSDK
Feature: Device

    Background: Launch FCA for 'Device'
        Given the environment has been set up for 'Device' tests
        And 3rd party 'certification' app is launched

    @sdk @transport @Sev0
    Scenario Outline:Device.<Method> - Validate API Method Response Content
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Validation_Key>'

        Examples:
            | Method      | Validation_Key              | API_Key                  |
            | id          | expected device id          | fetch device id          |
            | distributor | expected device distributor | fetch device distributor |
            | type        | expected device type        | fetch device type        |
            | platform    | expected device platform    | fetch device platform    |

    @sdk @transport @Sev1
    Scenario Outline:Device.<Method> - Validate API Method Response Content
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Validation_Key>'

        Examples:
            | Method      | Validation_Key              | API_Key                  |
            | uid         | expected device uid         | fetch device uid         |
            | model       | expected device model       | fetch device model       |
            | sku         | expected device sku         | fetch device sku         |
            | make        | expected device make        | fetch device make        |

    @sdk @transport @Sev2
    Scenario: Device.name - Validating API and Event Responses for name change
        Given we test the 'DEVICE_NAME_CORE' getters and setters 'setName' to 'Living hall'
        And '1st party app' registers for the 'Firebolt' event
        When 1st party app invokes the 'Firebolt' API to set value
        Then 'Firebolt' platform responds to '1st party app' set API
        When '1st party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '1st party app' get API
        And 'Firebolt' platform triggers '1st party app' event

    @regression @sdk @transport @Sev0
    Scenario Outline: Device.<Method> - Validate API Method Response Content
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<validation_key>'

        Examples:
            | Method           | API_Key                | validation_key            |
            | hdcp             | fetch hdcp             | expected hdcp             |
            | hdr              | fetch hdr              | expected hdr              |
            | screenResolution | fetch screenResolution | expected screenResolution |
            | videoResolution  | fetch videoResolution  | expected videoResolution  |

    @regression @sdk @transport @Sev1
    Scenario Outline: Device.<Method> - Validate API Method Response Content
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<validation_key>'

        Examples:
            | Method           | API_Key                | validation_key            |
            | audio            | fetch audio            | expected audio            |

    @regression @sdk @transport @Sev2
    Scenario Outline: Device.<Method> - Validate API Method Response Content
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<validation_key>'

        Examples:
            | Method           | API_Key                | validation_key            |
            | version          | fetch device version   | expected device version   |

    @regression @sdk @requiresPlatformImplementation @Sev2
    Scenario: Device.onNameChanged - Clearing event listeners
        Given '3rd party app' registers for the 'device onNameChanged' event using the 'Firebolt' API
        And 3rd party stops listening to the event 'device onNameChanged event'
        When 1st party app invokes the 'Firebolt' API to 'set device name to kitchen'
        Then 'Firebolt' platform responds to '1st party app' for 'set device name to kitchen'
        And 'Firebolt' platform does not trigger event for 'onDeviceNameChanged'

    @sdk @transport @requiresPlatformImplementation @notSupported @Sev2
    Scenario Outline: Device.onNetworkChanged - Get and validate state of <Scenario>
        Given '3rd party app' registers for the 'device onNetworkChanged' event using the 'Firebolt' API
        When '3rd party app' invokes the 'Firebolt' API to 'fetch device network'
        Then 'Firebolt' platform responds with '<Method_Validation_Key>'
        And User triggers event with value as '<Event_Params>'
        Then 'Firebolt' platform triggers event '<Event_Validation_Key>'

        Examples:
            | Scenario                      | Method_Validation_Key                   | Event_Validation_Key                        | Event_Params                                       |
            | Network_wifi_connected        | device network as wifi connected        | onNetworkChanged with wifi connected        | onNetworkChanged events with wifi connected        |
            | Network_wifi_disconnected     | device network as wifi disconnected     | onNetworkChanged with wifi disconnected     | onNetworkChanged events with wifi disconnected     |
            | Network_Ethernet_connected    | device network as ethernet connected    | onNetworkChanged with ethernet connected    | onNetworkChanged events with ethernet connected    |
            | Network_Ethernet_disconnected | device network as ethernet disconnected | onNetworkChanged with ethernet disconnected | onNetworkChanged events with ethernet disconnected |
            | Network_Hybrid_connected      | device network as hybrid connected      | onNetworkChanged with hybrid connected      | onNetworkChanged events with hybrid connected      |
            | Network_Hybrid_disconnected   | device network as hybrid disconnected   | onNetworkChanged with hybrid disconnected   | onNetworkChanged events with hybrid disconnected   |