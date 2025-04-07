@VoiceGuidance @VoiceGuidanceManage @manageSDK
Feature: VoiceGuidance_Manage

    Background: Launch FCA for 'VoiceGuidance'
        Given the environment has been set up for 'VoiceGuidance' tests
        And 3rd party 'certification' app is launched

    @sdk @transport
    Scenario Outline: Voiceguidance.<Method> - Validating API and Event Responses for <Scenario>
        Given we test the 'VOICEGUIDANCE' getters and setters '<Method>' to '<Value>'
        And '1st party app' registers for the 'Firebolt' event
        And '1st party app' invokes the 'Firebolt' get API
        When 1st party app invokes the 'Firebolt' API to set value
        Then 'Firebolt' platform responds to '1st party app' set API
        When '1st party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '1st party app' get API
        And 'Firebolt' platform triggers '1st party app' event

        Examples:
            | Scenario                 | Method  | Value |
            | Disabling  voiceguidance | enabled | false |
            | Enabling  voiceguidance  | enabled | true  |
            | Setting speed to 1       | speed   | 1     |
            | Setting speed to 2       | speed   | 2     |

    @sdk @transport
    Scenario Outline: Voiceguidance.<Method> - Validating Error Response for <Scenario>
        Given we test the 'VOICEGUIDANCE' getters and setters '<Method>' to '<Value>'
        When 1st party app invokes the 'Firebolt' API to set invalid value
        Then 'Firebolt' platform responds to '1st party app' set API with 'INVALID_PARAMS'

        Examples:
            | Scenario                                | Method          | Value |
            | Setting enabled to a string             | enabled         | test  |
            | Setting enabled to 123                  | enabled         | 123   |
            | Setting speed to a string               | speed           | test  |
            | Setting speed to a boolean              | speed           | true  |
            | Setting speed to an invalid integer     | speed           | 12    |