@Accessibility @coreSDK
Feature: Accessibility

    Background: Launch FCA for 'Accessibility'
        Given the environment has been set up for 'Accessibility' tests
        And 3rd party 'certification' app is launched

    @sdk @transport
    Scenario Outline: Accessibility.closedCaptionsSettings - Positive Scenario: <Scenario>
        Given we test the 'ACCESSIBILITY_CLOSEDCAPTIONS_SETTINGS' getters and setters '<Method>' to '<Value>'
        When '3rd party app' registers for the 'Firebolt' event
        When '3rd party app' invokes the 'Firebolt' get API
        Given 1st party app invokes the 'Firebolt' API to set '<Method>' to '<Value>'
        And 'Firebolt' platform responds to '1st party app' set API
        When '3rd party app' invokes the 'Firebolt' get API
        And 'Firebolt' platform responds to '3rd party app' get API
        And 'Firebolt' platform triggers '3rd party app' event

        Examples:
            | Scenario                             | Method             | Value                 |
            | Disable closedcaptions               | enabled            | false                 |
            | Enable closedcaptions                | enabled            | true                  |
            | Set fontFamily-monospaced_sanserif   | fontFamily         | monospaced_sanserif   |
            | Set fontFamily-cursive               | fontFamily         | cursive               |
            | Set fontFamily-proportional_serif    | fontFamily         | proportional_serif    |
            | Set fontFamily-monospaced_serif      | fontFamily         | monospaced_serif      |
            | Set fontFamily-proportional_sanserif | fontFamily         | proportional_sanserif |
            | Set fontFamily-smallcaps             | fontFamily         | smallcaps             |
            | Set fontFamily-casual                | fontFamily         | casual                |
            | Set fontSize-1                       | fontSize           | 1                     |
            | Set fontSize-0.5                     | fontSize           | 0.5                   |
            | Set fontSize-1.5                     | fontSize           | 1.5                   |
            | Set fontColor-#ff00ff                | fontColor          | #ff00ff               |
            | Set fontEdge-raised                  | fontEdge           | raised                |
            | Set fontEdge-none                    | fontEdge           | none                  |
            | Set fontEdge-depressed               | fontEdge           | depressed             |
            | Set fontEdge-uniform                 | fontEdge           | uniform               |
            | Set fontEdge-dropShadow-left         | fontEdge           | drop_shadow_left      |
            | Set fontEdge-dropShadow-right        | fontEdge           | drop_shadow_right     |
            | Set fontEdgeColor-#FFFFFF            | fontEdgeColor      | #FFFFFF               |
            | Set backgroundColor-#7f7f7f          | backgroundColor    | #7f7f7                |
            | Set fontOpacity-75                   | fontOpacity        | 75                    |
            | Set backgroundOpacity-75             | backgroundOpacity  | 75                    |
            | Set textAlign-left                   | textAlign          | left                  |
            | Set textAlign-center                 | textAlign          | center                |
            | Set textAlign-right                  | textAlign          | right                 |
            | Set textAlignVertical-top            | textAlignVertical  | top                   |
            | Set textAlignVertical-middle         | textAlignVertical  | middle                |
            | Set textAlignVertical-bottom         | textAlignVertical  | bottom                |
            | Set windowColor-white                | windowColor        | white                 |
            | Set windowOpacity-50                 | windowOpacity      | 50                    |
            | Set preferredLanguages               | preferredLanguages | spa,eng               |

   @sdk @transport
   Scenario Outline: Accessibility.closedCaptionsSettings - Positive Scenario: <Scenario> with 'null' params
      When '3rd party app' registers for the 'accessibility onClosedCaptionsSettingsChanged' event using the 'Firebolt' API
      And '3rd party app' invokes the 'Firebolt' API to 'get closedCaptions settings'
      And 1st party app invokes the 'Firebolt' API to '<Key>'
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

    @sdk @transport
    Scenario Outline: Accessibility.voiceGuidanceSettings - Positive Scenario: <Scenario>
        Given we test the 'ACCESSIBILITY_VOICEGUIDANCE_SETTINGS' getters and setters '<Method>' to '<Value>'
        When '3rd party app' registers for the 'Firebolt' event
        When '3rd party app' invokes the 'Firebolt' get API
        Given 1st party app invokes the 'Firebolt' API to set '<Method>' to '<Value>'
        And 'Firebolt' platform responds to '1st party app' set API
        When '3rd party app' invokes the 'Firebolt' get API
        And 'Firebolt' platform responds to '3rd party app' get API
        And 'Firebolt' platform triggers '3rd party app' event

        Examples:
            | Scenario              | Method  | Value |
            | Disable voiceguidance | enabled | false |
            | Enable voiceguidance  | enabled | true  |
            | Set speed-1           | speed   | 1     |
            | Set speed-0.5         | speed   | 0.5   |
            | Set speed-2           | speed   | 2     |

    @sdk @transport
    Scenario Outline: Accessibility.audioDescriptionSettings - Positive Scenario: <Scenario>
        Given we test the 'AUDIODESCRIPTIONS_SETTINGS' getters and setters '<Method>' to '<Value>'
        When '3rd party app' registers for the 'Firebolt' event
        When '3rd party app' invokes the 'Firebolt' get API
        Given 1st party app invokes the 'Firebolt' API to set '<Method>' to '<Value>'
        And 'Firebolt' platform responds to '1st party app' set API
        When '3rd party app' invokes the 'Firebolt' get API
        And 'Firebolt' platform responds to '3rd party app' get API
        And 'Firebolt' platform triggers '3rd party app' event

        Examples:
            | Scenario                         | Method  | Value |
            | Disable audioDescriptionSettings | enabled | false |
            | Enable audioDescriptionSettings  | enabled | true  |

    @sdk @transport
    Scenario Outline: Accessibility.closedCaptions - Positive Scenario: <Scenario>
        Given we test the 'ACCESSIBILITY_CLOSEDCAPTIONS' getters and setters '<Method>' to '<Value>'
        When '3rd party app' registers for the 'Firebolt' event
        Given 1st party app invokes the 'Firebolt' API to set '<Method>' to '<Value>'
        And 'Firebolt' platform responds to '1st party app' set API
        When '3rd party app' invokes the 'Firebolt' get API
        And 'Firebolt' platform responds to '3rd party app' get API
        And 'Firebolt' platform triggers '3rd party app' event

        Examples:
            | Scenario                           | Method            | Value               |
            | Enable closedcaptions              | enabled           | true                |
            | Set fontFamily-monospaced_sanserif | fontFamily        | monospaced_sanserif |
            | Set fontSize-1                     | fontSize          | 1                   |
            | Set fontColor-#ffffff              | fontColor         | #ffffff             |
            | Set fontEdge-raised                | fontEdge          | raised              |
            | Set fontEdgeColor-#7f7f7f          | fontEdgeColor     | #7F7F7F             |
            | Set backgroundColor-#000000        | backgroundColor   | #000000             |
            | Set fontOpacity-100                | fontOpacity       | 100                 |
            | Set backgroundOpacity-100          | backgroundOpacity | 100                 |
            | Set textAlign-left                 | textAlign         | left                |
            | Set textAlignVertical-top          | textAlignVertical | top                 |
            | Set windowColor-#7f7f7f            | windowColor       | #7F7F7F             |
            | Set windowOpacity-40               | windowOpacity     | 40                  |

    @sdk @transport
    Scenario Outline: Accessibility.voiceGuidance - Positive Scenario: <Scenario>
        Given we test the 'ACCESSIBILITY_VOICEGUIDANCE' getters and setters '<Method>' to '<Value>'
        When '3rd party app' registers for the 'Firebolt' event
        When '3rd party app' invokes the 'Firebolt' get API
        Given 1st party app invokes the 'Firebolt' API to set '<Method>' to '<Value>'
        And 'Firebolt' platform responds to '1st party app' set API
        When '3rd party app' invokes the 'Firebolt' get API
        And 'Firebolt' platform responds to '3rd party app' get API
        And 'Firebolt' platform triggers '3rd party app' event

        Examples:
            | Scenario              | Method  | Value |
            | Disable voiceguidance | enabled | false |
            | Enable voiceguidance  | enabled | true  |
            | Set speed-1           | speed   | 1     |