Feature: MediaInfo_Manage

    Background: Launch FCA for 'Metrics'
        Given the environment has been set up for 'MediaInfo' tests
        And 3rd party 'certification' app is launched
        
    @Metrics @manageSDK
    Scenario Outline: Metrics.<Method> - Positive Scenario: <Scenario>
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<API_Key>'

        Examples:
            | Scenario                          |  Method             | API_Key                            |
            | Validate activeAudioFormats       | activeAudioFormats  | get a list of active audio formats |
            | Validate activeVideoFormats       | activeVideoFormats  | get a list of active video formats |