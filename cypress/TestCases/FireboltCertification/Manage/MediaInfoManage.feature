Feature: MediaInfo_Manage

    Background: Launch FCA for 'MediaInfo'
        Given the environment has been set up for 'MediaInfo' tests
        And 3rd party 'certification' app is launched
        
    @MediaInfo @manageSDK
    Scenario Outline: MediaInfo.<Method> - Positive Scenario: <Scenario>
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key>'

        Examples:
            | Scenario                      |  Method             | API_Key                            | Validation_Key               | 
            | Validate activeAudioFormats   | activeAudioFormats  | get a list of active audio formats | expected activeAudioFormats  | 
            | Validate activeVideoFormats   | activeVideoFormats  | get a list of active video formats | expected activeVideoFormats  | 

    @MediaInfo @manageSDK @notSupported
    Scenario Outline: MediaInfo.<method> - Positive Scenario: <Scenario>
        When 1st party app registers for the '<Event_Registration_Key>' event using the 'Firebolt' API        
        And 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key>'
        When User triggers event with value as '<Event_Param>'
        Then 'Firebolt' platform triggers to '1st party app' event '<Event_Validation_Key>'

        Examples:
            | Scenario                                                      | method                | Event_Registration_Key                 | API_Key                              | Validation_Key                 | Event_Validation_Key                                     | Event_Param                                                |
            | validate mediaInfo activeAudioFormatsChanged                  | activeAudioFormats    | mediaInfo onActiveAudioFormatsChanged  | get a list of active audio formats   | expected activeAudioFormats    | expected mediaInfo onActiveAudioFormatsChanged event     | onActiveAudioFormatsChanged event                          |
            | validate mediaInfo activeAudioFormatsChanged audioCodec_ac4   | activeAudioFormats    | mediaInfo onActiveAudioFormatsChanged  | get a list of active audio formats   | mediaInfo audioCodec as ac4    | onActiveAudioFormatsChanged with audioCodec as ac4       | onActiveAudioFormatsChanged event with audioCodec as ac4   |
            | validate mediaInfo activeVideoFormatsChanged                  | activeVideoFormats    | mediaInfo onActiveVideoFormatsChanged  | get a list of active video formats   | expected activeVideoFormats    | expected mediaInfo onActiveVideoFormatsChanged event     | onActiveVideoFormatsChanged event                          |  
            | validate mediaInfo activeVideoFormatsChanged videoCodec_mpeg1 | activeVideoFormats    | mediaInfo onActiveVideoFormatsChanged  | get a list of active video formats   | mediaInfo videoCodec as vp8    | onActiveAudioFormatsChanged with videoCodec as mpeg1     | onActiveVideoFormatsChanged event with videoCodec as mpeg1 |
