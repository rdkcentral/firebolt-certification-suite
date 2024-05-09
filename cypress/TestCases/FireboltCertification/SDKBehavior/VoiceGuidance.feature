Feature: VoiceGuidance_SDK

    @VoiceGuidance @coreSDK @sdk @transport
    Scenario Outline: Voiceguidance.<Method> - Positive Scenario: <Scenario> with undefined params
        Given the environment has been set up for 'Voiceguidance' tests
        And 3rd party 'certification' app is launched
        When 1st party app invokes the 'Firebolt' API to '<Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Method_Content>'

        Examples:
            | Scenario             | Key                                     | Method_Content                        | Method  |
            | Enable voiceguidance | enable voiceguidance with no parameters | enabled for voiceGuidance setEnabled  | enabled |
            | speed-2              | set speed as 2 with no parameters       | 2 for speed in voiceGuidance setSpeed | speed   |