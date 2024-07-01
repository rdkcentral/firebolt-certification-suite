Feature: Accessibility

    Background: Launch FCA for 'Accessibility'
        Given the environment has been set up for 'Accessibility' tests
        And 3rd party 'certification' app is launched

    @Accessibility @coreSDK @sdk @transport
    Scenario Outline: Accessibility.closedCaptionsSettings - Positive Scenario: <Scenario>
        When '3rd party app' registers for the 'Firebolt' 'CLOSEDCAPTION_SETTINGS' event
        When '3rd party app' invokes the 'Firebolt' get API 'CLOSEDCAPTION_SETTINGS'
        Given 1st party app invokes the 'Firebolt' API 'CLOSEDCAPTION_SETTINGS' to set '<Method>' to '<Value>'
        And 'Firebolt' platform responds to '1st party app' 'CLOSEDCAPTION_SETTINGS' set API
        When '3rd party app' invokes the 'Firebolt' get API 'CLOSEDCAPTION_SETTINGS'
        And 'Firebolt' platform responds to '3rd party app' 'CLOSEDCAPTION_SETTINGS' get API
        And 'Firebolt' platform triggers '3rd party app' 'CLOSEDCAPTION_SETTINGS' event

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
            | Set backgroundOpacity-75             | fontOpacity        | 75                    |
            | Set textAlign-left                   | textAlign          | left                  |
            | Set textAlign-center                 | textAlign          | center                |
            | Set textAlign-right                  | textAlign          | right                 |
            | Set textAlignVertical-top            | textAlignVertical  | top                   |
            | Set textAlignVertical-middle         | textAlignVertical  | middle                |
            | Set textAlignVertical-bottom         | textAlignVertical  | bottom                |
            | Set windowColor-white                | windowColor        | white                 |
            | Set windowOpacity-50                 | windowOpacity      | 50                    |
            | Set preferredLanguages               | preferredLanguages | spa,eng               |

    @Accessibility @coreSDK @sdk @transport
    Scenario Outline: Accessibility.closedCaptionsSettings - Positive Scenario: <Scenario> with 'null' params
        When '3rd party app' registers for the 'Firebolt' 'CLOSEDCAPTION_SETTINGS' event
        When '3rd party app' invokes the 'Firebolt' get API 'CLOSEDCAPTION_SETTINGS'
        Given 1st party app invokes the 'Firebolt' API 'CLOSEDCAPTION_SETTINGS' to set '<Method>' to 'null'
        And 'Firebolt' platform responds to '1st party app' 'CLOSEDCAPTION_SETTINGS' set API
        When '3rd party app' invokes the 'Firebolt' get API 'CLOSEDCAPTION_SETTINGS'
        And 'Firebolt' platform responds to '3rd party app' 'CLOSEDCAPTION_SETTINGS' get API
        And 'Firebolt' platform triggers '3rd party app' 'CLOSEDCAPTION_SETTINGS' event

        Examples:
            | Scenario          | Method            |
            | fontFamily        | fontFamily        |
            | fontSize          | fontSize          |
            | fontColor         | fontColor         |
            | fontEdge          | fontEdge          |
            | fontEdgeColor     | fontEdgeColor     |
            | fontOpacity       | fontOpacity       |
            | backgroundColor   | backgroundColor   |
            | backgroundOpacity | backgroundOpacity |
            | textAlign         | textAlign         |
            | textAlignVertical | textAlignVertical |
            | windowColor       | windowColor       |
            | windowOpacity     | windowOpacity     |

    @Accessibility @coreSDK @sdk @transport
    Scenario Outline: Accessibility.voiceGuidanceSettings - Positive Scenario: <Scenario>
        When '3rd party app' registers for the 'Firebolt' 'VOICEGUIDANCE_SETTINGS' event
        When '3rd party app' invokes the 'Firebolt' get API 'VOICEGUIDANCE_SETTINGS'
        Given 1st party app invokes the 'Firebolt' API 'VOICEGUIDANCE_SETTINGS' to set '<Method>' to '<Value>'
        And 'Firebolt' platform responds to '1st party app' 'VOICEGUIDANCE_SETTINGS' set API
        When '3rd party app' invokes the 'Firebolt' get API 'VOICEGUIDANCE_SETTINGS'
        And 'Firebolt' platform responds to '3rd party app' 'VOICEGUIDANCE_SETTINGS' get API
        And 'Firebolt' platform triggers '3rd party app' 'VOICEGUIDANCE_SETTINGS' event

        Examples:
            | Scenario              | Method  | Value |
            | Disable voiceguidance | enabled | false |
            | Enable voiceguidance  | enabled | true  |
            | Set speed-1           | speed   | 1     |
            | Set speed-0.5         | speed   | 0.5   |
            | Set speed-2           | speed   | 2     |

    @Accessibility @coreSDK @sdk @transport
    Scenario Outline: Accessibility.audioDescriptionSettings - Positive Scenario: <Scenario>
        When '3rd party app' registers for the 'Firebolt' 'AUDIODESCRIPTIONS_SETTINGS' event
        When '3rd party app' invokes the 'Firebolt' get API 'AUDIODESCRIPTIONS_SETTINGS'
        Given 1st party app invokes the 'Firebolt' API 'AUDIODESCRIPTIONS_SETTINGS' to set '<Method>' to '<Value>'
        And 'Firebolt' platform responds to '1st party app' 'AUDIODESCRIPTIONS_SETTINGS' set API
        When '3rd party app' invokes the 'Firebolt' get API 'AUDIODESCRIPTIONS_SETTINGS'
        And 'Firebolt' platform responds to '3rd party app' 'AUDIODESCRIPTIONS_SETTINGS' get API
        And 'Firebolt' platform triggers '3rd party app' 'AUDIODESCRIPTIONS_SETTINGS' event

        Examples:
            | Scenario                         | Method  | Value |
            | Disable audioDescriptionSettings | enabled | false |
            | Enable audioDescriptionSettings  | enabled | true  |

