Feature: VoiceGuidance_Manage

    Background: Launch FCA for 'VoiceGuidance'
        Given the environment has been set up for 'VoiceGuidance' tests

    @VoiceGuidance @manageSDK @sdk @transport
    Scenario Outline: Voiceguidance.<Method> - Positive Scenario: <Scenario>
        Given we test the 'VOICEGUIDANCE' getters and setters '<Method>' to '<Value>'
        When '1st party app' registers for the 'Firebolt' event
        And 1st party app invokes the 'Firebolt' API to set '<Method>' to '<Value>'
        Then 'Firebolt' platform responds to '1st party app' set API
        When '1st party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '1st party app' get API
        And 'Firebolt' platform triggers '1st party app' event

        Examples:
            | Scenario              | Method  | Value |
            | Disable voiceguidance | enabled | false |
            | Enable voiceguidance  | enabled | true  |
            | Set speed-1           | speed   | 1     |
            | Set speed-2           | speed   | 2     |

    @VoiceGuidance @manageSDK @sdk @transport
    Scenario Outline: Voiceguidance.<Method> - Negative Scenario: <Scenario> and expecting error
        Given we test the 'VOICEGUIDANCE' getters and setters '<Method>' to '<Value>'
        When 1st party app invokes the 'Firebolt' API to set '<Method>' to invalid '<Value>'
        And 'Firebolt' platform responds to '1st party app' set API with 'INVALID_TYPE_PARAMS'

        Examples:
            | Scenario          | Method  | Value |
            | Set string param  | enabled | test  |
            | Set integer param | enabled | 1     |
            | Set Enable-test   | enabled | test  |
            | Set Enable-123    | enabled | 123   |
            | Set speed-test    | speed   | test  |
            | Set speed-true    | speed   | true  |
            | Set string param  | speed   | test  |
            | Set boolean param | speed   | true  |
            | Set speed-12      | speed   | 12    |