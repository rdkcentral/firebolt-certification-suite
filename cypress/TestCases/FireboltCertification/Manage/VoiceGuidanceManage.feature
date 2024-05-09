Feature: VoiceGuidance_Manage

    Background: Launch FCA for 'VoiceGuidance'
        Given the environment has been set up for 'VoiceGuidance' tests
        And 3rd party 'certification' app is launched

    @VoiceGuidance @manageSDK @sdk @transport
    Scenario Outline: Voiceguidance.<Method> - Positive Scenario: <Scenario>
        When 1st party app registers for the '<Event_registration_Key>' event using the 'Firebolt' API
        And 1st party app invokes the 'Firebolt' API to '<API_Set_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Set_Method_Content>'
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Method_Validation_Key>'
        And 'Firebolt' platform triggers to '1st party app' event '<Event_Validation_Key>'

        Examples:
            | Scenario              | Method  | Event_registration_Key         | API_Set_Key                  | API_Key                   | Method_Validation_Key           | Event_Validation_Key                          | Set_Method_Content                |
            | Disable voiceguidance | enabled | voiceguidance onenabledchanged | disable voiceguidance        | get voiceguidance enabled | false for voiceguidance enabled | onenabledchanged for voiceguidance with false | null for voiceguidance setEnabled |
            | Enable voiceguidance  | enabled | voiceguidance onenabledchanged | enable voiceguidance         | get voiceguidance enabled | true for voiceguidance enabled  | onenabledchanged for voiceguidance with true  | null for voiceguidance setEnabled |
            | Set speed-1           | speed   | voiceguidance onspeedchanged   | set voiceguidance speed to 1 | get voiceguidance speed   | 1 for voiceguidance speed       | onSpeedChanged for voiceguidance with 1       | null for voiceguidance setSpeed   |
            | Set speed-2           | speed   | voiceguidance onspeedchanged   | set voiceguidance speed to 2 | get voiceguidance speed   | 2 for voiceguidance speed       | onSpeedChanged for voiceguidance with 2       | null for voiceguidance setSpeed   |


    @VoiceGuidance @manageSDK @sdk @transport
    Scenario Outline: Voiceguidance.<Method> - Negative Scenario: <Scenario> and expecting error
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Error_Object>'

        Examples:
            | Scenario          | Method  | API_Key                                     | Error_Object                                 |
            | Set string param  | enabled | set voiceguidance enabled with test string  | invalid test sting for voiceguidance enabled |
            | Set integer param | enabled | set voiceguidance enabled with integer      | invalid integer for voiceguidance enabled    |
            | Set Enable-test   | enabled | enable voiceGuidance with test parameter    | invalid params for voiceGuidance setEnabled  |
            | Set Enable-123    | enabled | enable voiceGuidance with integer parameter | invalid params for voiceGuidance setEnabled  |
            | Set speed-test    | speed   | set speed as test                           | invalid params for voiceGuidance setSpeed    |
            | Set speed-true    | speed   | set speed as true                           | invalid params for voiceGuidance setSpeed    |
            | Set string param  | speed   | set voiceguidance speed to test string      | invalid test sting for voiceguidance speed   |
            | Set boolean param | speed   | set voiceguidance speed to true             | invalid true for voiceguidance speed         |
            | Set speed-12      | speed   | set voiceguidance speed to integer          | invalid integer for voiceguidance speed      |
