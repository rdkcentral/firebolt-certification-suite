@VoiceGuidance @VoiceGuidanceManage @manageSDK
Feature: VoiceGuidance_Manage

    Background: Launch FCA for 'VoiceGuidance'
        Given the environment has been set up for 'VoiceGuidance' tests
        And 3rd party 'certification' app is launched

    @sdk @transport
    Scenario Outline: Voiceguidance.<Method> - Positive Scenario: <Scenario>
        Given we test the 'VOICEGUIDANCE' getters and setters '<Method>' to '<Value>'
        And '1st party app' registers for the 'Firebolt' event
        When 1st party app invokes the 'Firebolt' API to set value
        Then 'Firebolt' platform responds to '1st party app' set API
        When '1st party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '1st party app' get API
        And 'Firebolt' platform triggers '1st party app' event

        Examples:
            | Scenario              | Method  | Value |
            | Disable voiceguidance | enabled | false |
            | Enable voiceguidance  | enabled | true  |
            | Set speed-1           | speed   | 1.0   |
            | Set speed-2           | speed   | 2.0   |

    @sdk @transport
    Scenario Outline: Voiceguidance.<Method> - Positive Scenario: <Scenario>
        Given we test the 'VOICEGUIDANCE' getters and setters '<Method>' to '<Value>'
        And '1st party app' registers for the 'Firebolt' event
        # setters?
        # When 1st party app invokes the 'Firebolt' API to set value
        # Then 'Firebolt' platform responds to '1st party app' set API
        When '1st party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '1st party app' get API
        And 'Firebolt' platform triggers '1st party app' event

        Examples:
            | Scenario                | Method          | Value |
            | Disable navigationHints | navigationHints | false |
            | Enable navigationHints  | navigationHints | true  |
            | Set rate-0.1            | rate            | 0.1   |
            | Set rate-2.0            | rate            | 2.0   |
            | Set rate-10             | rate            | 10    |

    @sdk @transport
    Scenario Outline: Voiceguidance.<Method> - Negative Scenario: <Scenario> and expecting error
        Given we test the 'VOICEGUIDANCE' getters and setters '<Method>' to '<Value>'
        When 1st party app invokes the 'Firebolt' API to set invalid value
        Then 'Firebolt' platform responds to '1st party app' set API with 'INVALID_PARAMS'

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
            # doubt on setter methods?
            | Set navigationHints with string | navigationHints | test |
            | Set navigationHints with 123    | navigationHints | 123  |
            | Set rate with string            | rate            | test |
            | Set rate with boolean           | rate            | true |
            | Set rate with invalid integer   | rate            | 15   |