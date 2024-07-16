Feature: MediaInfo

    Background: Launch FCA for 'MediaInfo'
        Given the environment has been set up for 'MediaInfo' tests
        And 3rd party 'certification' app is launched

    @MediaInfo @coreSDK @sdk @transport
    Scenario Outline: MediaInfo.<Method> - Positive Scenario: <Scenario>
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Validation_Key>'
        Examples:
            | Scenario                        | Method            | API_Key           | Validation_Key         |
            | Validate audioFormat            | audioFormat       | get audio format  | expected audioFormat   | 
            | Validate videoFormat            | videoFormat       | get video format  | expected videoFormat   |

    @MediaInfo @coreSDK @sdk @transport @notSupported
    Scenario Outline: MediaInfo.<method> - Positive Scenario: <Scenario>
        When '3rd party app' registers for the '<Event_Registration_Key>' event using the 'Firebolt' API
        And '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Method_Validation_Key>'
        When User triggers event with value as '<Event_Param>'
        Then 'Firebolt' platform triggers event '<Event_Validation_Key>'

        Examples:
            | Scenario                                                          | method         | Event_Registration_Key            | API_Key            | Method_Validation_Key                             | Event_Validation_Key                                      | Event_Param                                                  |
            | validate mediaInfo audioFormatChanged                             | audioFormat    | mediaInfo onAudioFormatChanged    | get audio format   | expected audioFormat                              | expected mediaInfo onAudioFormatChanged event             | onAudioFormatChanged event                                   |
            | validate mediaInfo audioFormatChanged audioCodec_mpeg3            | audioFormat    | mediaInfo onAudioFormatChanged    | get audio format   | mediaInfo audioCodec as mpeg3                     | onAudioFormatChanged with audioCodec as mpeg3             | onAudioFormatChanged event with audioCodec as mpeg3          | 
            | validate mediaInfo audioFormatChanged audioContainer_audio/webm   | audioFormat    | mediaInfo onAudioFormatChanged    | get audio format   | mediaInfo audioContainer as audio/webm            | onAudioFormatChanged with audioContainer as audio/webm    | onAudioFormatChanged event with audioContainer as audio/webm | 
            | validate mediaInfo videoFormatChanged                             | videoFormat    | mediaInfo onVideoFormatChanged    | get video format   | expected videoFormat                              | expected mediaInfo onVideoFormatChanged event             | onVideoFormatChanged event                                   |  
            | validate mediaInfo videoFormatChanged videoCodec_mpeg1            | videoFormat    | mediaInfo onVideoFormatChanged    | get video format   | mediaInfo videoCodec as mpeg1                     | onVideoFormatChanged with videoCodec as mpeg1             | onVideoFormatChanged event with videoCodec as mpeg1          |  
            | validate mediaInfo videoFormatChanged VideoContainer video/mp2t   | videoFormat    | mediaInfo onVideoFormatChanged    | get video format   | mediaInfo VideoContainer as video/mp2t            | onVideoFormatChanged with VideoContainer as video/mp2t    | onVideoFormatChanged event with VideoContainer as video/mp2t |  