Feature: MediaInfo_Manage

    Background: Launch FCA for 'MediaInfo'
        Given the environment has been set up for 'MediaInfo' tests
        And 3rd party 'certification' app is launched
        
    @MediaInfo @manageSDK
    Scenario Outline: MediaInfo.<Method> - Positive Scenario: <Scenario>
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<API_Key>'

        Examples:
            | Scenario                      |  Method             | API_Key                            |
            | Validate activeAudioFormats   | activeAudioFormats  | get a list of active audio formats |
            | Validate activeVideoFormats   | activeVideoFormats  | get a list of active video formats |

    @MediaInfo @manageSDK @notSupported
    Scenario Outline: MediaInfo.<method> - Positive Scenario: <Scenario>
        When 1st party app registers for the '<Event_Registration_Key>' event using the 'Firebolt' API        
        And 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<API_Key>'
        When User triggers event with value as '<Event_Param>'
        Then 'Firebolt' platform triggers event '<Event_Validation_Key>'

        Examples:
            | Scenario                                       | method                | Event_Registration_Key                 | API_Key                              | Event_Validation_Key                                     | Event_Param                           |
            | validate mediaInfo activeAudioFormatsChanged   | activeAudioFormats    | mediaInfo onActiveAudioFormatsChanged  | get a list of active audio formats   | expected mediaInfo onActiveAudioFormatsChanged event     | onActiveAudioFormatsChanged event     |
            | validate mediaInfo activeVideoFormatsChanged   | activeVideoFormats    | mediaInfo onActiveVideoFormatsChanged  | get a list of active video formats   | expected mediaInfo onActiveVideoFormatsChanged event     | onActiveVideoFormatsChanged event     |  