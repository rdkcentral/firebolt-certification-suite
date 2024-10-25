@Accessibility @coreSDK
Feature: Accessibility

    Background: Launch FCA for 'Accessibility'
        Given the environment has been set up for 'Accessibility' tests
        And 3rd party 'certification' app is launched

    @sdk @transport @Sev0
    Scenario Outline: Accessibility.closedCaptionsSettings - Validating API and Event Responses for <Scenario>
        Given we test the 'ACCESSIBILITY_CLOSEDCAPTIONS_SETTINGS' getters and setters '<Method>' to '<Value>'
        And '3rd party app' registers for the 'Firebolt' event
        And '3rd party app' invokes the 'Firebolt' get API
        When 1st party app invokes the 'Firebolt' API to set value
        Then 'Firebolt' platform responds to '1st party app' set API
        When '3rd party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '3rd party app' get API
        And 'Firebolt' platform triggers '3rd party app' event

        Examples:
            | Scenario                   | Method  | Value |
            | disabling Closed Captions  | enabled | false |
            | enabling Closed Captions   | enabled | true  |

    @sdk @transport @Sev1
    Scenario Outline: Accessibility.closedCaptionsSettings - Validating API and Event Responses for <Method> change to <Value>
        Given we test the 'ACCESSIBILITY_CLOSEDCAPTIONS_SETTINGS' getters and setters '<Method>' to '<Value>'
        And '3rd party app' registers for the 'Firebolt' event
        And '3rd party app' invokes the 'Firebolt' get API
        When 1st party app invokes the 'Firebolt' API to set value
        Then 'Firebolt' platform responds to '1st party app' set API
        When '3rd party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '3rd party app' get API
        And 'Firebolt' platform triggers '3rd party app' event

        Examples:
            | Method             | Value                 |
            | fontFamily         | monospaced_sanserif   |
            | fontFamily         | cursive               |
            | fontFamily         | proportional_serif    |
            | fontFamily         | monospaced_serif      |
            | fontFamily         | proportional_sanserif |
            | fontFamily         | smallcaps             |
            | fontFamily         | casual                |
            | fontSize           | 1                     |
            | fontSize           | 0.5                   |
            | fontSize           | 1.5                   |
            | fontColor          | #ff00ff               |
            | fontEdge           | raised                |
            | fontEdge           | none                  |
            | fontEdge           | depressed             |
            | fontEdge           | uniform               |
            | fontEdge           | drop_shadow_left      |
            | fontEdge           | drop_shadow_right     |
            | fontEdgeColor      | #FFFFFF               |
            | backgroundColor    | #7f7f7                |
            | fontOpacity        | 75                    |
            | backgroundOpacity  | 75                    |
            | textAlign          | left                  |
            | textAlign          | center                |
            | textAlign          | right                 |
            | textAlignVertical  | top                   |
            | textAlignVertical  | middle                |
            | textAlignVertical  | bottom                |
            | windowColor        | white                 |
            | windowOpacity      | 50                    |
            | preferredLanguages | spa,eng               |

    @sdk @transport @Sev2
    Scenario Outline: Accessibility.closedCaptionsSettings - Validating API and Event Responses for <Scenario> given a null value
        Given '3rd party app' registers for the 'accessibility onClosedCaptionsSettingsChanged' event using the 'Firebolt' API
        And '3rd party app' invokes the 'Firebolt' API to 'get closedCaptions settings'
        When 1st party app invokes the 'Firebolt' API to '<Key>'
        Then 'Firebolt' platform responds to '1st party app' for '<Key>'
        When '3rd party app' invokes the 'Firebolt' API to 'get closedCaptions settings'
        Then 'Firebolt' platform responds with '<Method_Content>'
        And 'Firebolt' platform triggers event '<Event_Content>'

        Examples:
            | Scenario          | Key                           | Method_Content                      | Event_Content                                                            |
            | fontFamily        | set fontFamily as null        | default value for fontFamily        | onclosedCaptionsSettingsChanged with default value for fontfamily        |
            | fontSize          | set fontSize as null          | default value for fontSize          | onclosedCaptionsSettingsChanged with default value for fontSize          |
            | fontColor         | set fontColor as null         | default value for fontColor         | onclosedCaptionsSettingsChanged with default value for fontColor         |
            | fontEdge          | set fontEdge as null          | default value for fontEdge          | onclosedCaptionsSettingsChanged with default value for fontEdge          |
            | fontEdgeColor     | set fontEdgeColor as null     | default value for fontEdgeColor     | onclosedCaptionsSettingsChanged with default value for fontEdgeColor     |
            | fontOpacity       | set fontOpacity as null       | default value for fontOpacity       | onclosedCaptionsSettingsChanged with default value for fontOpacity       |
            | backgroundColor   | set backgroundColor as null   | default value for backgroundColor   | onclosedCaptionsSettingsChanged with default value for backgroundColor   |
            | backgroundOpacity | set backgroundOpacity as null | default value for backgroundOpacity | onclosedCaptionsSettingsChanged with default value for backgroundOpacity |
            | textAlign         | set textAlign as null         | default value for textAlign         | onclosedCaptionsSettingsChanged with default value for textAlign         |
            | textAlignVertical | set textAlignVertical as null | default value for textAlignVertical | onclosedCaptionsSettingsChanged with default value for textAlignVertical |
            | windowColor       | set windowColor as null       | default value for windowColor       | onclosedCaptionsSettingsChanged with default value for windowColor       |
            | windowOpacity     | set windowOpacity as null     | default value for windowOpacity     | onclosedCaptionsSettingsChanged with default value for windowOpacity     |

    @sdk @transport @Sev0
    Scenario Outline: Accessibility.voiceGuidanceSettings - Validating API and Event Responses for <Scenario>
        Given we test the 'ACCESSIBILITY_VOICEGUIDANCE_SETTINGS' getters and setters '<Method>' to '<Value>'
        And '3rd party app' registers for the 'Firebolt' event
        And '3rd party app' invokes the 'Firebolt' get API
        When 1st party app invokes the 'Firebolt' API to set value
        Then 'Firebolt' platform responds to '1st party app' set API
        When '3rd party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '3rd party app' get API
        And 'Firebolt' platform triggers '3rd party app' event

        Examples:
            | Scenario               | Method  | Value |
            | disable voiceguidance  | enabled | false |
            | enabling voiceguidance | enabled | true  |

    @sdk @transport @Sev1
    Scenario Outline: Accessibility.voiceGuidanceSettings - Validating API and Event Responses for <Method> change to <Value>
        Given we test the 'ACCESSIBILITY_VOICEGUIDANCE_SETTINGS' getters and setters '<Method>' to '<Value>'
        And '3rd party app' registers for the 'Firebolt' event
        And '3rd party app' invokes the 'Firebolt' get API
        When 1st party app invokes the 'Firebolt' API to set value
        Then 'Firebolt' platform responds to '1st party app' set API
        When '3rd party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '3rd party app' get API
        And 'Firebolt' platform triggers '3rd party app' event

        Examples:
            | Method  | Value |
            | speed   | 1     |
            | speed   | 0.5   |
            | speed   | 2     |

    @sdk @transport @Sev1
    Scenario Outline: Accessibility.audioDescriptionSettings - Validating API and Event Responses for <Scenario>
        Given we test the 'AUDIODESCRIPTIONS_SETTINGS' getters and setters '<Method>' to '<Value>'
        And '3rd party app' registers for the 'Firebolt' event
        And '3rd party app' invokes the 'Firebolt' get API
        When 1st party app invokes the 'Firebolt' API to set value
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
        Given we test the 'ACCESSIBILITY_CLOSEDCAPTIONS' getters and setters '<Method>' to '<Value>'
        And '3rd party app' registers for the 'Firebolt' event
        When 1st party app invokes the 'Firebolt' API to set value
        Then 'Firebolt' platform responds to '1st party app' set API
        When '3rd party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '3rd party app' get API
        And 'Firebolt' platform triggers '3rd party app' event

        Examples:
            | Scenario                   | Method            | Value               |
            | disabling Closed Captions  | enabled           | false               |
            | enabling Closed Captions   | enabled           | true                |

    @sdk @transport @Sev1
    Scenario Outline: Accessibility.closedCaptions - Validating API and Event Responses for <Method> change to <Value>
        Given we test the 'ACCESSIBILITY_CLOSEDCAPTIONS' getters and setters '<Method>' to '<Value>'
        And '3rd party app' registers for the 'Firebolt' event
        When 1st party app invokes the 'Firebolt' API to set value
        Then 'Firebolt' platform responds to '1st party app' set API
        When '3rd party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '3rd party app' get API
        And 'Firebolt' platform triggers '3rd party app' event

        Examples:
            | Method            | Value               |
            | fontFamily        | monospaced_sanserif |
            | fontSize          | 1                   |
            | fontColor         | #ffffff             |
            | fontEdge          | raised              |
            | fontEdgeColor     | #7F7F7F             |
            | backgroundColor   | #000000             |
            | fontOpacity       | 100                 |
            | backgroundOpacity | 100                 |
            | textAlign         | left                |
            | textAlignVertical | top                 |
            | windowColor       | #7F7F7F             |
            | windowOpacity     | 40                  |

    @sdk @transport @requiresPlatformImplementation @Sev2
    Scenario: Accessibility.onClosedCaptionsSettingsChanged event - Clearing event listeners for onClosedCaptionsSettingsChanged
        Given '3rd party app' registers for the 'accessibility onClosedCaptionsSettingsChanged' event using the 'Firebolt' API
        And 3rd party stops listening to the event 'accessibility onClosedCaptionsSettingsChanged event'
        When 1st party app invokes the 'Firebolt' API to 'disable closedCaptions'
        Then 'Firebolt' platform responds to '1st party app' for 'disable closedCaptions'
        And 'Firebolt' platform does not trigger event for 'onclosedCaptionsSettingsChanged'

    @sdk @transport @Sev0
    Scenario Outline: Accessibility.voiceGuidance - Validating API and Event Responses for <Scenario>
        Given we test the 'ACCESSIBILITY_VOICEGUIDANCE' getters and setters '<Method>' to '<Value>'
        And '3rd party app' registers for the 'Firebolt' event
        And '3rd party app' invokes the 'Firebolt' get API
        When 1st party app invokes the 'Firebolt' API to set value
        Then 'Firebolt' platform responds to '1st party app' set API
        When '3rd party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '3rd party app' get API
        And 'Firebolt' platform triggers '3rd party app' event

        Examples:
            | Scenario                | Method  | Value |
            | disabling voiceguidance | enabled | false |
            | enabling voiceguidance  | enabled | true  |

    @sdk @transport @Sev1
    Scenario Outline: Accessibility.voiceGuidance - Validating API and Event Responses for <Method> change to <Value>
        Given we test the 'ACCESSIBILITY_VOICEGUIDANCE' getters and setters '<Method>' to '<Value>'
        And '3rd party app' registers for the 'Firebolt' event
        And '3rd party app' invokes the 'Firebolt' get API
        When 1st party app invokes the 'Firebolt' API to set value
        Then 'Firebolt' platform responds to '1st party app' set API
        When '3rd party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '3rd party app' get API
        And 'Firebolt' platform triggers '3rd party app' event

        Examples:
            | Method  | Value |
            | speed   | 1     |