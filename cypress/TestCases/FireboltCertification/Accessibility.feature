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

    @sdk @transport @Sev1
    Scenario Outline: Accessibility.closedCaptionsSettings - Validating API and Event Responses for <Method> change to <Value>
        Given the environment has been set up for 'Accessibility closedCaptionsSettings' tests
        And '3rd party app' registers for the 'Firebolt' event
        And '3rd party app' invokes the 'Firebolt' get API
        When 1st party app invokes the 'Firebolt' API to set '<Method>' to '<Value>'
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
    Scenario Outline: Accessibility.onClosedCaptionsSettingsChanged - Validating API and Event Responses for <Method> change to null
        Given the environment has been set up for 'Accessibility closedCaptions Settings set to null' tests
        When '3rd party app' registers for the 'Firebolt' event
        And '3rd party app' invokes the 'Firebolt' get API
        When 1st party app invokes the 'Firebolt' API to set '<Method>' to 'null'
        Then 'Firebolt' platform responds to '1st party app' set API
        When '3rd party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '3rd party app' get API
        And 'Firebolt' platform triggers '3rd party app' event

        Examples:
            | Method            |
            | fontFamily        |
            | fontSize          |
            | fontColor         |
            | fontEdge          |
            | fontEdgeColor     |
            | fontOpacity       |
            | backgroundColor   |
            | backgroundOpacity |
            | textAlign         |
            | textAlignVertical |
            | windowColor       |
            | windowOpacity     |

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
            | Scenario                 | Method          | Value |
            | disable voiceguidance    | enabled         | false |
            | enabling voiceguidance   | enabled         | true  |
            # setters?
            | disable navigationHints  | navigationHints | false |
            | enabling navigationHints | navigationHints | true  |

    @sdk @transport @Sev1
    Scenario Outline: Accessibility.voiceGuidanceSettings - Validating API and Event Responses for <Method> change to <Value>
        Given the environment has been set up for 'Accessibility voiceguidancesettings' tests
        And '3rd party app' registers for the 'Firebolt' event
        And '3rd party app' invokes the 'Firebolt' get API
        When 1st party app invokes the 'Firebolt' API to set '<Method>' to '<Value>'
        Then 'Firebolt' platform responds to '1st party app' set API
        When '3rd party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '3rd party app' get API
        And 'Firebolt' platform triggers '3rd party app' event

        Examples:
            | Method | Value |
            | speed  | 1.0   |
            | speed  | 0.5   |
            | speed  | 2.0   |
            # setters?
            | rate   | 0.1   |
            | rate   | 1.0   |
            | rate   | 10    |

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

    @sdk @transport @Sev1
    Scenario Outline: Accessibility.closedCaptions - Validating API and Event Responses for <Method> change to <Value>
        Given the environment has been set up for 'Accessibility closedcaptions' tests
        And '3rd party app' registers for the 'Firebolt' event
        When 1st party app invokes the 'Firebolt' API to set '<Method>' to '<Value>'
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

    @sdk @transport @Sev1
    Scenario Outline: Accessibility.voiceGuidance - Validating API and Event Responses for <Method> change to <Value>
        Given the environment has been set up for 'Accessibility voiceguidance' tests
        And '3rd party app' registers for the 'Firebolt' event
        And '3rd party app' invokes the 'Firebolt' get API
        When 1st party app invokes the 'Firebolt' API to set '<Method>' to '<Value>'
        Then 'Firebolt' platform responds to '1st party app' set API
        When '3rd party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '3rd party app' get API
        And 'Firebolt' platform triggers '3rd party app' event

        Examples:
            | Method  | Value |
            | speed   | 1     |
