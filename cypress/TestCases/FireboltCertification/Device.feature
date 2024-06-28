Feature: Device

    Background: Launch FCA for 'Device'
        Given the environment has been set up for 'Device' tests
        And 3rd party 'certification' app is launched

    @Device @coreSDK @sdk @transport
    Scenario Outline:Device.<Method> - Positive Scenario: <Scenario>
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Validation_Key>'
        Examples:
            | Scenario                    | API_Key                  | Validation_Key              | Method      |
            | Validate Device id          | fetch device id          | expected device id          | id          |
            | Validate Device distributor | fetch device distributor | expected device distributor | distributor |
            | Validate Device platform    | fetch device platform    | expected device platform    | platform    |
            | Validate Device uid         | fetch device uid         | expected device uid         | uid         |
            | Validate Device type        | fetch device type        | expected device type        | type        |
            | Validate Device model       | fetch device model       | expected device model       | model       |
            | Validate Device sku         | fetch device sku         | expected device sku         | sku         |
            | Validate Device make        | fetch device make        | expected device make        | make        |

    @Device @coreSDK @sdk @transport
    Scenario: Device.name - Positive Scenario: Validate device name change
        When '3rd party app' registers for the 'device onNameChanged' event using the 'Firebolt' API
        And '3rd party app' invokes the 'Firebolt' API to 'get device name'
        And 1st party app invokes the 'Firebolt' API to 'set device name to living hall'
        Then 'Firebolt' platform responds to '1st party app' for 'set device name to living hall'
        When '3rd party app' invokes the 'Firebolt' API to 'get device name'
        Then 'Firebolt' platform responds with 'living hall for device name'
        And 'Firebolt' platform triggers event 'onDeviceNameChanged with living hall'

    @Device @mfos @coreSDK @regression @sdk
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

    @Device @coreSDK @regression @sdk
    Scenario: Device.onNameChanged - Positive Scenario: Clearing event listeners
        When '3rd party app' registers for the 'device onNameChanged' event using the 'Firebolt' API
        And I clear 'device onNameChanged event' listeners
        And 1st party app invokes the 'Firebolt' API to 'set device name to kitchen'
        Then 'Firebolt' platform responds to '1st party app' for 'set device name to kitchen'
        And 'Firebolt' platform does not trigger event for 'onDeviceNameChanged'

    @Device @coreSDK @sdk @transport @notSupported
    Scenario Outline: Device.network - Positive Scenario: <Scenario>
        When '3rd party app' registers for the 'device onNetworkChanged' event using the 'Firebolt' API
        And '3rd party app' invokes the 'Firebolt' API to 'fetch device network'
        Then 'Firebolt' platform responds with '<Method_Validation_Key>'
        When User triggers event with value as '<Event_Params>'
        Then 'Firebolt' platform triggers event '<Event_Validation_Key>'

        Examples:
            | Scenario                               | Method_Validation_Key                   | Event_Validation_Key                        | Event_Params                                       |
            | Validate network_wifi_connected        | device network as wifi connected        | onNetworkChanged with wifi connected        | onNetworkChanged events with wifi connected        |
            | Validate network_wifi_disconnected     | device network as wifi disconnected     | onNetworkChanged with wifi disconnected     | onNetworkChanged events with wifi disconnected     |
            | Validate network_Ethernet_connected    | device network as ethernet connected    | onNetworkChanged with ethernet connected    | onNetworkChanged events with ethernet connected    |
            | Validate network_Ethernet_disconnected | device network as ethernet disconnected | onNetworkChanged with ethernet disconnected | onNetworkChanged events with ethernet disconnected |
            | Validate network_Hybrid_connected      | device network as hybrid connected      | onNetworkChanged with hybrid connected      | onNetworkChanged events with hybrid connected      |
            | Validate network_Hybrid_disconnected   | device network as hybrid disconnected   | onNetworkChanged with hybrid disconnected   | onNetworkChanged events with hybrid disconnected   |

    @Device @mfos @coreSDK @regression @sdk
    Scenario Outline: Device.<Method> - Positive Scenario: <Scenario>
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<validation_key>'

        Examples:
            | Scenario                                                          | Method                    | API_Key                                                       | validation_key                         |
            | Validate hdcpVersionSupported                                     | hdcpVersionSupported      | fetch hdcpVersionSupported                                    | expected hdcpVersionSupported          |
            | Validate hdrProfile                                               | hdrProfile                | fetch hdrProfile                                              | expected hdrProfile                    |
            | Validate hdrProfiles                                              | hdrProfiles               | fetch hdrProfiles                                             | expected hdrProfiles                   |
            | Validate audioFormatSupported                                     | audioFormatSupported      | fetch audioFormatSupported                                    | expected audioFormatSupported          |
            | Validate audioFormatSupported with audioFormatOptions atmos       | audioFormatSupported      | fetch audioFormatSupported with audioFormatOptions atmos      | expected audioFormatSupported          |
            | Validate videoFormatSupported                                     | videoFormatSupported      | fetch videoFormatSupported                                    | expected videoFormatSupported          |
            | Validate videoFormatSupported with VideoFormatOptions resolution  | videoFormatSupported      | fetch videoFormatSupported with VideoFormatOptions resolution | expected videoFormatSupported          |
            | Validate audioMode                                                | audioMode                 | fetch audioMode                                               | expected audioMode                     |
            | Validate videoMode                                                | videoMode                 | fetch videoMode                                               | expected videoMode                     |    
            | Validate videoModes                                               | videoModes                | fetch videoModes                                              | expected videoModes                    | 
            | Validate sourceFrameRateUsed                                      | sourceFrameRateUsed       | fetch sourceFrameRateUsed                                     | expected sourceFrameRateUsed           |   

    @Device @mfos @coreSDK @regression @sdk
    Scenario Outline: Device.<Method> - Negative Scenario: <Scenario>
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<validation_key>'

        Examples:
            | Scenario                                             | Method                 |  API_Key                                                                   | validation_key                                     |
            | Invalid Audio codec type integer                     | audioFormatSupported   | get audioFormatSupported with invalid Audiocodec type integer              | invalid parameter error for audioFormatSupported   | 
            | Invalid Audio codec type boolean                     | audioFormatSupported   | get audioFormatSupported with invalid Audiocodec type boolean              | invalid parameter error for audioFormatSupported   |
            | Invalid audioFormatOptions atmos type interger       | audioFormatSupported   | get audioFormatSupported with audioFormatOptions atmos type interger       | invalid parameter error for audioFormatSupported   |
            | Invalid audioFormatOptions atmos type string         | audioFormatSupported   | get audioFormatSupported with audioFormatOptions atmos type string         | invalid parameter error for audioFormatSupported   |
            | Invalid Video codec type integer                     | videoFormatSupported   | get videoFormatSupported with invalid Videocodec type integer              | invalid parameter error for videoFormatSupported   |
            | Invalid Video codec type boolean                     | videoFormatSupported   | get videoFormatSupported with invalid Videocodec type boolean              | invalid parameter error for videoFormatSupported   |
            | Invalid VideoFormatOptions resolution type boolean   | videoFormatSupported   | get videoFormatSupported with VideoFormatOptions resolution type boolean   | invalid parameter error for videoFormatSupported   |
            | Invalid VideoFormatOptions resolution type interger  | videoFormatSupported   | get videoFormatSupported with VideoFormatOptions resolution type interger  | invalid parameter error for videoFormatSupported   |


 


