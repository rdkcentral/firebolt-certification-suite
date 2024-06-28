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

            