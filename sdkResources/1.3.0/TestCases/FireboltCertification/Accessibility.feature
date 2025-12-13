@Accessibility @coreSDK
Feature: Accessibility

    Background: Launch FCA for 'Accessibility'
        Given the environment has been set up for 'Accessibility' tests
        And 3rd party 'certification' app is launched

    @sdk @transport @Sev0
    Scenario Outline: Accessibility.closedCaptionsSettings - Validating API and Event Responses for <Scenario>
        Given the environment has been set up for 'Accessibility closedCaptionsSettings' tests
        And '3rd party app' registers for the 'Firebolt' event
        And '3rd party app' invokes the 'Firebolt' get API
        When 1st party app invokes the 'Firebolt' API to set '<Method>' to '<Value>'
        Then 'Firebolt' platform responds to '1st party app' set API
        When '3rd party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '3rd party app' get API
        And 'Firebolt' platform triggers '3rd party app' event

        Examples:
            | Scenario                   | Method  | Value |
            | disabling Closed Captions  | enabled | false |
            | enabling Closed Captions   | enabled | true  |


    @sdk @transport @Sev0
    Scenario Outline: Accessibility.voiceGuidanceSettings - Validating API and Event Responses for <Scenario>
        Given the environment has been set up for 'Accessibility voiceguidancesettings' tests
        And '3rd party app' registers for the 'Firebolt' event
        And '3rd party app' invokes the 'Firebolt' get API
        When 1st party app invokes the 'Firebolt' API to set '<Method>' to '<Value>'
        Then 'Firebolt' platform responds to '1st party app' set API
        When '3rd party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '3rd party app' get API
        And 'Firebolt' platform triggers '3rd party app' event

        Examples:
            | Scenario               | Method  | Value |
            | disable voiceguidance  | enabled | false |
            | enabling voiceguidance | enabled | true  |

    @sdk @transport @Sev1
    Scenario Outline: Accessibility.audioDescriptionSettings - Validating API and Event Responses for <Scenario>
        Given the environment has been set up for 'Accessibility audioDescriptionSettings' tests
        And '3rd party app' registers for the 'Firebolt' event
        And '3rd party app' invokes the 'Firebolt' get API
        When 1st party app invokes the 'Firebolt' API to set '<Method>' to '<Value>'
        Then 'Firebolt' platform responds to '1st party app' set API
        When '3rd party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '3rd party app' get API
        And 'Firebolt' platform triggers '3rd party app' event

        Examples:
            | Scenario                    | Method  | Value |
            | enabling Audio Description  | enabled | true  |
            | disabling Audio Description | enabled | false |

    @sdk @transport @Sev0
    Scenario Outline: Accessibility.closedCaptions - Validating API and Event Responses for <Scenario>
        Given the environment has been set up for 'Accessibility closedcaptions' tests
        And '3rd party app' registers for the 'Firebolt' event
        When 1st party app invokes the 'Firebolt' API to set '<Method>' to '<Value>'
        Then 'Firebolt' platform responds to '1st party app' set API
        When '3rd party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '3rd party app' get API
        And 'Firebolt' platform triggers '3rd party app' event

        Examples:
            | Scenario                   | Method            | Value               |
            | disabling Closed Captions  | enabled           | false               |
            | enabling Closed Captions   | enabled           | true                |


  @sdk @transport @requiresPlatformImplementation @Sev2
  Scenario Outline: Accessibility.<Method> - Clearing event listeners
    Given '3rd party app' registers for the 'accessibility <Method>' event using the 'Firebolt' API
    And 3rd party stops listening to the event 'accessibility <Method> event'
    When 1st party app invokes the 'Firebolt' API to 'disable <Value>'
    Then 'Firebolt' platform responds to '1st party app' for 'disable <Value>'
    And 'Firebolt' platform does not trigger event for '<Method>'

    Examples:
      | Method                            | Value            |
      | onClosedCaptionsSettingsChanged   | closedCaptions   |
      | onVoiceGuidanceSettingsChanged    | voiceGuidance    |
      | onAudioDescriptionSettingsChanged | audioDescription |

    @sdk @transport @Sev0
    Scenario Outline: Accessibility.voiceGuidance - Validating API and Event Responses for <Scenario>
        Given the environment has been set up for 'Accessibility voiceguidance' tests
        And '3rd party app' registers for the 'Firebolt' event
        And '3rd party app' invokes the 'Firebolt' get API
        When 1st party app invokes the 'Firebolt' API to set '<Method>' to '<Value>'
        Then 'Firebolt' platform responds to '1st party app' set API
        When '3rd party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '3rd party app' get API
        And 'Firebolt' platform triggers '3rd party app' event

        Examples:
            | Scenario                | Method  | Value |
            | disabling voiceguidance | enabled | false |
            | enabling voiceguidance  | enabled | true  |
