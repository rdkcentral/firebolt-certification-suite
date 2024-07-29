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

    @Device @coreSDK @regression @sdk @requiresPlatformImplementation
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
            | Scenario                                               | Method                 | API_Key                                                                           | validation_key                                     |
            | Invalid Audio codec type integer                       | audioFormatSupported   | get audioFormatSupported with invalid Audiocodec type integer                     | invalid parameter error for audioFormatSupported   | 
            | Invalid Audio codec type boolean                       | audioFormatSupported   | get audioFormatSupported with invalid Audiocodec type boolean                     | invalid parameter error for audioFormatSupported   |
            | Invalid Audio codec dummycodec key                     | audioFormatSupported   | get audioFormatSupported with invalid Audiocodec dummycodec key                   | invalid parameter error for audioFormatSupported   |           
            | Invalid audioFormatOptions atmos type interger         | audioFormatSupported   | get audioFormatSupported with audioFormatOptions atmos type interger              | invalid parameter error for audioFormatSupported   |
            | Invalid audioFormatOptions atmos type string           | audioFormatSupported   | get audioFormatSupported with audioFormatOptions atmos type string                | invalid parameter error for audioFormatSupported   |
            | Invalid audioFormatOptions codecLevel type interger    | audioFormatSupported   | get audioFormatSupported with audioFormatOptions codecLevel type interger         | invalid parameter error for audioFormatSupported   |
            | Invalid audioFormatOptions codecLevel type boolean     | audioFormatSupported   | get audioFormatSupported with audioFormatOptions codecLevel type boolean          | invalid parameter error for audioFormatSupported   |
            | Invalid audioFormatOptions codecProfile type interger  | audioFormatSupported   | get audioFormatSupported with audioFormatOptions codecProfile type interger       | invalid parameter error for audioFormatSupported   |
            | Invalid audioFormatOptions codecProfile type boolean   | audioFormatSupported   | get audioFormatSupported with audioFormatOptions codecProfile type boolean        | invalid parameter error for audioFormatSupported   |
            | Invalid audioFormatOptions container type interger     | audioFormatSupported   | get audioFormatSupported with audioFormatOptions container type interger          | invalid parameter error for audioFormatSupported   |
            | Invalid audioFormatOptions container type boolean      | audioFormatSupported   | get audioFormatSupported with audioFormatOptions container type boolean           | invalid parameter error for audioFormatSupported   |
            | Invalid audioFormatOptions sampleRate type boolean     | audioFormatSupported   | get audioFormatSupported with audioFormatOptions sampleRate type boolean          | invalid parameter error for audioFormatSupported   |
            | Invalid audioFormatOptions sampleRate type string      | audioFormatSupported   | get audioFormatSupported with audioFormatOptions sampleRate type string           | invalid parameter error for audioFormatSupported   |
            | Invalid Video codec type integer                       | videoFormatSupported   | get videoFormatSupported with invalid Videocodec type integer                     | invalid parameter error for videoFormatSupported   |
            | Invalid Video codec type boolean                       | videoFormatSupported   | get videoFormatSupported with invalid Videocodec type boolean                     | invalid parameter error for videoFormatSupported   |
            | Invalid Video codec dummycodec key                     | videoFormatSupported   | get videoFormatSupported with invalid Videocodec dummycodec key                   | invalid parameter error for videoFormatSupported   |           
            | Invalid videoFormatOptions resolution type boolean     | videoFormatSupported   | get videoFormatSupported with VideoFormatOptions resolution type boolean          | invalid parameter error for videoFormatSupported   |
            | Invalid videoFormatOptions resolution type interger    | videoFormatSupported   | get videoFormatSupported with VideoFormatOptions resolution type integer          | invalid parameter error for videoFormatSupported   |
            | Invalid videoFormatOptions atmos type interger         | videoFormatSupported   | get videoFormatSupported with VideoFormatOptions atmos type interger              | invalid parameter error for videoFormatSupported   |
            | Invalid videoFormatOptions atmos type string           | videoFormatSupported   | get videoFormatSupported with VideoFormatOptions atmos type string                | invalid parameter error for videoFormatSupported   |
            | Invalid videoFormatOptions codecLevel type interger    | videoFormatSupported   | get videoFormatSupported with VideoFormatOptions codecLevel type interger         | invalid parameter error for videoFormatSupported   |
            | Invalid videoFormatOptions codecLevel type boolean     | videoFormatSupported   | get videoFormatSupported with VideoFormatOptions codecLevel type boolean          | invalid parameter error for videoFormatSupported   |
            | Invalid videoFormatOptions codecProfile type interger  | videoFormatSupported   | get videoFormatSupported with VideoFormatOptions codecProfile type interger       | invalid parameter error for videoFormatSupported   |
            | Invalid videoFormatOptions codecProfile type boolean   | videoFormatSupported   | get videoFormatSupported with VideoFormatOptions codecProfile type boolean        | invalid parameter error for videoFormatSupported   |
            | Invalid videoFormatOptions container type interger     | videoFormatSupported   | get videoFormatSupported with VideoFormatOptions container type interger          | invalid parameter error for videoFormatSupported   |
            | Invalid videoFormatOptions container type boolean      | videoFormatSupported   | get videoFormatSupported with VideoFormatOptions container type boolean           | invalid parameter error for videoFormatSupported   |
            | Invalid videoFormatOptions frameRate type boolean      | videoFormatSupported   | get videoFormatSupported with VideoFormatOptions frameRate type boolean           | invalid parameter error for videoFormatSupported   |
            | Invalid videoFormatOptions frameRate type string       | videoFormatSupported   | get videoFormatSupported with VideoFormatOptions frameRate type string            | invalid parameter error for videoFormatSupported   |
            | Invalid videoFormatOptions hdr type interger           | videoFormatSupported   | get videoFormatSupported with VideoFormatOptions hdr type interger                | invalid parameter error for videoFormatSupported   |
            | Invalid videoFormatOptions hdr type boolean            | videoFormatSupported   | get videoFormatSupported with VideoFormatOptions hdr type boolean                 | invalid parameter error for videoFormatSupported   |


    @Device @coreSDK @sdk @transport @notSupported
    Scenario Outline: Device.<method> - Positive Scenario: <Scenario>
        When '3rd party app' registers for the '<Event_Registration_Key>' event using the 'Firebolt' API
        And '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Method_Validation_Key>'
        When User triggers event with value as '<Event_Param>'
        Then 'Firebolt' platform triggers event '<Event_Validation_Key>'

        Examples:
            | Scenario                                        | method              | Event_Registration_Key              | API_Key                      | Method_Validation_Key            | Event_Validation_Key                                | Event_Param                                             |
            | validate device audioMode_auto                  | audioMode           | device onAudioModeChanged           | fetch audioMode              | device audioMode as auto         | onAudioModeChanged with audioMode as auto           | onAudioModeChanged event with audioMode as auto         | 
            | validate device audioMode_mono                  | audioMode           | device onAudioModeChanged           | fetch audioMode              | device audioMode as mono         | onAudioModeChanged with audioMode as mono           | onAudioModeChanged event with audioMode as mono         | 
            | validate device audioMode_none                  | audioMode           | device onAudioModeChanged           | fetch audioMode              | device audioMode as none         | onAudioModeChanged with audioMode as none           | onAudioModeChanged event with audioMode as none         | 
            | validate device audioMode_passthrough           | audioMode           | device onAudioModeChanged           | fetch audioMode              | device audioMode as passthrough  | onAudioModeChanged with audioMode as passthrough    | onAudioModeChanged event with audioMode as passthrough  | 
            | validate device audioMode_stereo                | audioMode           | device onAudioModeChanged           | fetch audioMode              | device audioMode as stereo       | onAudioModeChanged with audioMode as stereo         | onAudioModeChanged event with audioMode as stereo       | 
            | validate device audioMode_surround              | audioMode           | device onAudioModeChanged           | fetch audioMode              | device audioMode as surround     | onAudioModeChanged with audioMode as surround       | onAudioModeChanged event with audioMode as surround     | 
            | validate device audioMode_unknown               | audioMode           | device onAudioModeChanged           | fetch audioMode              | device audioMode as unknown      | onAudioModeChanged with audioMode as unknown        | onAudioModeChanged event with audioMode as unknown      | 
            | validate device videoMode_480i                  | videoMode           | device onVideoModeChanged           | fetch videoMode              | device videoMode as 480i         | onVideoModeChanged with videoMode as 480i           | onVideoModeChanged event with videoMode as 480i         |
            | validate device videoMode_480p                  | videoMode           | device onVideoModeChanged           | fetch videoMode              | device videoMode as 480p         | onVideoModeChanged with videoMode as 480p           | onVideoModeChanged event with videoMode as 480p         |
            | validate device videoMode_576i25                | videoMode           | device onVideoModeChanged           | fetch videoMode              | device videoMode as 576i25       | onVideoModeChanged with videoMode as 576i25         | onVideoModeChanged event with videoMode as 576i25       |
            | validate device videoMode_576p50                | videoMode           | device onVideoModeChanged           | fetch videoMode              | device videoMode as 576p50       | onVideoModeChanged with videoMode as 576p50         | onVideoModeChanged event with videoMode as 576p50       |
            | validate device videoMode_576p60                | videoMode           | device onVideoModeChanged           | fetch videoMode              | device videoMode as 576p60       | onVideoModeChanged with videoMode as 576p60         | onVideoModeChanged event with videoMode as 576p60       |
            | validate device videoMode_720p50                | videoMode           | device onVideoModeChanged           | fetch videoMode              | device videoMode as 720p50       | onVideoModeChanged with videoMode as 720p50         | onVideoModeChanged event with videoMode as 720p50       |
            | validate device videoMode_720p60                | videoMode           | device onVideoModeChanged           | fetch videoMode              | device videoMode as 720p60       | onVideoModeChanged with videoMode as 720p60         | onVideoModeChanged event with videoMode as 720p60       |
            | validate device videoMode_1080i50               | videoMode           | device onVideoModeChanged           | fetch videoMode              | device videoMode as 1080i50      | onVideoModeChanged with videoMode as 1080i50        | onVideoModeChanged event with videoMode as 1080i50      |
            | validate device videoMode_1080i60               | videoMode           | device onVideoModeChanged           | fetch videoMode              | device videoMode as 1080i60      | onVideoModeChanged with videoMode as 1080i60        | onVideoModeChanged event with videoMode as 1080i60      |
            | validate device videoMode_1080p24               | videoMode           | device onVideoModeChanged           | fetch videoMode              | device videoMode as 1080p24      | onVideoModeChanged with videoMode as 1080p24        | onVideoModeChanged event with videoMode as 1080p24      |
            | validate device videoMode_1080p25               | videoMode           | device onVideoModeChanged           | fetch videoMode              | device videoMode as 1080p25      | onVideoModeChanged with videoMode as 1080p25        | onVideoModeChanged event with videoMode as 1080p25      |
            | validate device videoMode_1080p30               | videoMode           | device onVideoModeChanged           | fetch videoMode              | device videoMode as 1080p30      | onVideoModeChanged with videoMode as 1080p30        | onVideoModeChanged event with videoMode as 1080p30      |
            | validate device videoMode_1080p50               | videoMode           | device onVideoModeChanged           | fetch videoMode              | device videoMode as 1080p50      | onVideoModeChanged with videoMode as 1080p50        | onVideoModeChanged event with videoMode as 1080p50      |
            | validate device videoMode_1080p60               | videoMode           | device onVideoModeChanged           | fetch videoMode              | device videoMode as 1080p60      | onVideoModeChanged with videoMode as 1080p60        | onVideoModeChanged event with videoMode as 1080p60      |
            | validate device videoMode_2160p24               | videoMode           | device onVideoModeChanged           | fetch videoMode              | device videoMode as 2160p24      | onVideoModeChanged with videoMode as 2160p24        | onVideoModeChanged event with videoMode as 2160p24      |
            | validate device videoMode_2160p25               | videoMode           | device onVideoModeChanged           | fetch videoMode              | device videoMode as 2160p25      | onVideoModeChanged with videoMode as 2160p25        | onVideoModeChanged event with videoMode as 2160p25      |
            | validate device videoMode_2160p30               | videoMode           | device onVideoModeChanged           | fetch videoMode              | device videoMode as 2160p30      | onVideoModeChanged with videoMode as 2160p30        | onVideoModeChanged event with videoMode as 2160p30      |
            | validate device videoMode_2160p50               | videoMode           | device onVideoModeChanged           | fetch videoMode              | device videoMode as 2160p50      | onVideoModeChanged with videoMode as 2160p50        | onVideoModeChanged event with videoMode as 2160p50      |
            | validate device videoMode_2160p60               | videoMode           | device onVideoModeChanged           | fetch videoMode              | device videoMode as 2160p60      | onVideoModeChanged with videoMode as 2160p60        | onVideoModeChanged event with videoMode as 2160p60      |
            | validate device videoMode_4320p60               | videoMode           | device onVideoModeChanged           | fetch videoMode              | device videoMode as 4320p60      | onVideoModeChanged with videoMode as 4320p60        | onVideoModeChanged event with videoMode as 4320p60      |
            | validate device videoMode_unknown               | videoMode           | device onVideoModeChanged           | fetch videoMode              | device videoMode as unknown      | onVideoModeChanged with videoMode as unknown        | onVideoModeChanged event with videoMode as unknown      |
            | validate device videoModes_480i                 | videoModes          | device onVideoModesChanged          | fetch videoModes             | device videoModes as 480i        | onVideoModesChanged with videoModes as 480i         | onVideoModesChanged event with videoModes as 480i       |
            | validate device videoModes_480p                 | videoModes          | device onVideoModesChanged          | fetch videoModes             | device videoModes as 480p        | onVideoModesChanged with videoModes as 480p         | onVideoModesChanged event with videoModes as 480p       |
            | validate device videoModes_576i25               | videoModes          | device onVideoModesChanged          | fetch videoModes             | device videoModes as 576i25      | onVideoModesChanged with videoModes as 576i25       | onVideoModesChanged event with videoModes as 576i25     |
            | validate device videoModes_576p50               | videoModes          | device onVideoModesChanged          | fetch videoModes             | device videoModes as 576p50      | onVideoModesChanged with videoModes as 576p50       | onVideoModesChanged event with videoModes as 576p50     |
            | validate device videoModes_576p60               | videoModes          | device onVideoModesChanged          | fetch videoModes             | device videoModes as 576p60      | onVideoModesChanged with videoModes as 576p60       | onVideoModesChanged event with videoModes as 576p60     |
            | validate device videoModes_720p50               | videoModes          | device onVideoModesChanged          | fetch videoModes             | device videoModes as 720p50      | onVideoModesChanged with videoModes as 720p50       | onVideoModesChanged event with videoModes as 720p50     |
            | validate device videoModes_720p60               | videoModes          | device onVideoModesChanged          | fetch videoModes             | device videoModes as 720p60      | onVideoModesChanged with videoModes as 720p60       | onVideoModesChanged event with videoModes as 720p60     |
            | validate device videoModes_1080i50              | videoModes          | device onVideoModesChanged          | fetch videoModes             | device videoModes as 1080i50     | onVideoModesChanged with videoModes as 1080i50      | onVideoModesChanged event with videoModes as 1080i50    |
            | validate device videoModes_1080i60              | videoModes          | device onVideoModesChanged          | fetch videoModes             | device videoModes as 1080i60     | onVideoModesChanged with videoModes as 1080i60      | onVideoModesChanged event with videoModes as 1080i60    |
            | validate device videoModes_1080p24              | videoModes          | device onVideoModesChanged          | fetch videoModes             | device videoModes as 1080p24     | onVideoModesChanged with videoModes as 1080p24      | onVideoModesChanged event with videoModes as 1080p24    |
            | validate device videoModes_1080p25              | videoModes          | device onVideoModesChanged          | fetch videoModes             | device videoModes as 1080p25     | onVideoModesChanged with videoModes as 1080p25      | onVideoModesChanged event with videoModes as 1080p25    |
            | validate device videoModes_1080p30              | videoModes          | device onVideoModesChanged          | fetch videoModes             | device videoModes as 1080p30     | onVideoModesChanged with videoModes as 1080p30      | onVideoModesChanged event with videoModes as 1080p30    |
            | validate device videoModes_1080p50              | videoModes          | device onVideoModesChanged          | fetch videoModes             | device videoModes as 1080p50     | onVideoModesChanged with videoModes as 1080p50      | onVideoModesChanged event with videoModes as 1080p50    |
            | validate device videoModes_1080p60              | videoModes          | device onVideoModesChanged          | fetch videoModes             | device videoModes as 1080p60     | onVideoModesChanged with videoModes as 1080p60      | onVideoModesChanged event with videoModes as 1080p60    |
            | validate device videoModes_2160p24              | videoModes          | device onVideoModesChanged          | fetch videoModes             | device videoModes as 2160p24     | onVideoModesChanged with videoModes as 2160p24      | onVideoModesChanged event with videoModes as 2160p24    |
            | validate device videoModes_2160p25              | videoModes          | device onVideoModesChanged          | fetch videoModes             | device videoModes as 2160p25     | onVideoModesChanged with videoModes as 2160p25      | onVideoModesChanged event with videoModes as 2160p25    |
            | validate device videoModes_2160p30              | videoModes          | device onVideoModesChanged          | fetch videoModes             | device videoModes as 2160p30     | onVideoModesChanged with videoModes as 2160p30      | onVideoModesChanged event with videoModes as 2160p30    |
            | validate device videoModes_2160p50              | videoModes          | device onVideoModesChanged          | fetch videoModes             | device videoModes as 2160p50     | onVideoModesChanged with videoModes as 2160p50      | onVideoModesChanged event with videoModes as 2160p50    |
            | validate device videoModes_2160p60              | videoModes          | device onVideoModesChanged          | fetch videoModes             | device videoModes as 2160p60     | onVideoModesChanged with videoModes as 2160p60      | onVideoModesChanged event with videoModes as 2160p60    |
            | validate device videoModes_4320p60              | videoModes          | device onVideoModesChanged          | fetch videoModes             | device videoModes as 4320p60     | onVideoModesChanged with videoModes as 4320p60      | onVideoModesChanged event with videoModes as 4320p60    |
            | validate device videoModes_unknown              | videoModes          | device onVideoModesChanged          | fetch videoModes             | device videoModes as unknown     | onVideoModesChanged with videoModes as unknown      | onVideoModesChanged event with videoModes as unknown    |
            | validate device sourceFrameRateUsedChanged      | sourceFrameRateUsed | device onSourceFrameRateUsedChanged | fetch sourceFrameRateUsed    | expected sourceFrameRateUsed     | expected device onSourceFrameRateUsedChanged event  | onSourceFrameRateUsedChanged event                      |
            | validate device hdrProfile_dolbyVision          | hdrProfile          | device onHdrProfileChanged          | fetch hdrProfile             | device hdrProfile as dolbyVision | onHdrProfileChanged with hdrProfile as dolbyVision  | onHdrProfileChanged event with hdrProfile as dolbyVision| 
            | validate device hdrProfile_hdr10                | hdrProfile          | device onHdrProfileChanged          | fetch hdrProfile             | device hdrProfile as hdr10       | onHdrProfileChanged with hdrProfile as hdr10        | onHdrProfileChanged event with hdrProfile as hdr10      | 
            | validate device hdrProfile_hdr10plus            | hdrProfile          | device onHdrProfileChanged          | fetch hdrProfile             | device hdrProfile as hdr10plus   | onHdrProfileChanged with hdrProfile as hdr10plus    | onHdrProfileChanged event with hdrProfile as hdr10plus  | 
            | validate device hdrProfile_hlg                  | hdrProfile          | device onHdrProfileChanged          | fetch hdrProfile             | device hdrProfile as hlg         | onHdrProfileChanged with hdrProfile as hlg          | onHdrProfileChanged event with hdrProfile as hlg        | 
            | validate device hdrProfile_sdr                  | hdrProfile          | device onHdrProfileChanged          | fetch hdrProfile             | device hdrProfile as sdr         | onHdrProfileChanged with hdrProfile as sdr          | onHdrProfileChanged event with hdrProfile as sdr        | 
            | validate device hdrProfile_unknown              | hdrProfile          | device onHdrProfileChanged          | fetch hdrProfile             | device hdrProfile as unknown     | onHdrProfileChanged with hdrProfile as unknown      | onHdrProfileChanged event hdrProfile as unknown         | 
            | validate device audioOutputChanged_auto         | audioMode           | device onAudioOutputChanged         | fetch audioMode              | device audioMode as auto         | onAudioOutputChanged with audioMode as auto         | onAudioOutputChanged event with audioMode as auto       | 
            | validate device audioOutputChanged_mono         | audioMode           | device onAudioOutputChanged         | fetch audioMode              | device audioMode as mono         | onAudioOutputChanged with audioMode as mono         | onAudioOutputChanged event with audioMode as mono       | 
            | validate device audioOutputChanged_none         | audioMode           | device onAudioOutputChanged         | fetch audioMode              | device audioMode as none         | onAudioOutputChanged with audioMode as none         | onAudioOutputChanged event with audioMode as none       | 
            | validate device audioOutputChanged_passthrough  | audioMode           | device onAudioOutputChanged         | fetch audioMode              | device audioMode as passthrough  | onAudioOutputChanged with audioMode as passthrough  | onAudioOutputChanged event with audioMode as passthrough| 
            | validate device audioOutputChanged_stereo       | audioMode           | device onAudioOutputChanged         | fetch audioMode              | device audioMode as stereo       | onAudioOutputChanged with audioMode as stereo       | onAudioOutputChanged event with audioMode as stereo     | 
            | validate device audioOutputChanged_surround     | audioMode           | device onAudioOutputChanged         | fetch audioMode              | device audioMode as surround     | onAudioOutputChanged with audioMode as surround     | onAudioOutputChanged event with audioMode as surround   | 
            | validate device audioOutputChanged_unknown      | audioMode           | device onAudioOutputChanged         | fetch audioMode              | device audioMode as unknown      | onAudioOutputChanged with audioMode as unknown      | onAudioOutputChanged event with audioMode as unknown    | 

 


