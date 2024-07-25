@ClosedCaptions @ClosedCaptionsManage @manageSDK
Feature: ClosedCaptions_Manage

    Background: Launch FCA for 'ClosedCaptions'
        Given the environment has been set up for 'ClosedCaptions' tests

    @sdk @transport
    Scenario Outline: ClosedCaptions.<Method> - Positive Scenario: <Scenario>
        Given we test the 'CLOSED_CAPTIONS_SETTINGS' getters and setters '<Method>' to '<Value>'
        When '1st party app' registers for the 'Firebolt' event
        And 1st party app invokes the 'Firebolt' API to set '<Method>' to '<Value>'
        Then 'Firebolt' platform responds to '1st party app' set API
        When '1st party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '1st party app' get API
        And 'Firebolt' platform triggers '1st party app' event

        Examples:
            | Scenario                             | Method             | Value                 |
            | Set backgroundColor-#7f7f7f          | backgroundColor    | #7f7f7f               |
            | Set backgroundOpacity-75             | backgroundOpacity  | 75                    |
            | Set closedcaptions-false             | enabled            | false                 |
            | Set closedcaptions-true              | enabled            | true                  |
            | Set fontColor-#ff00ff                | fontColor          | #ff00ff               |
            | Set fontEdge-raised                  | fontEdge           | raised                |
            | Set fontEdge-none                    | fontEdge           | none                  |
            | Set fontEdge-depressed               | fontEdge           | depressed             |
            | Set fontEdge-uniform                 | fontEdge           | uniform               |
            | Set fontEdge-drop-shadow-left        | fontEdge           | drop_shadow_left      |
            | Set fontEdge-drop-shadow-right       | fontEdge           | drop_shadow_right     |
            | Set fontEdgeColor-#FFFFFF            | fontEdgeColor      | #FFFFFF               |
            | Set fontFamily-cursive               | fontFamily         | cursive               |
            | Set fontFamily-monospaced_sanserif   | fontFamily         | monospaced_sanserif   |
            | Set fontFamily-proportional_serif    | fontFamily         | proportional_serif    |
            | Set fontFamily-monospaced_serif      | fontFamily         | monospaced_serif      |
            | Set fontFamily-proportional_sanserif | fontFamily         | proportional_sanserif |
            | Set fontFamily-smallcaps             | fontFamily         | smallcaps             |
            | Set fontFamily-casual                | fontFamily         | casual                |
            | Set fontOpacity-75                   | fontOpacity        | 75                    |
            | Set fontSize-0.5                     | fontSize           | 0.5                   |
            | Set fontSize-1                       | fontSize           | 1                     |
            | Set fontSize-1.5                     | fontSize           | 1.5                   |
            | Set textAlign-left                   | textAlign          | left                  |
            | Set textAlign-center                 | textAlign          | center                |
            | Set textAlign-right                  | textAlign          | right                 |
            | Set textAlignVertical-top            | textAlignVertical  | top                   |
            | Set textAlignVertical-middle         | textAlignVertical  | middle                |
            | Set textAlignVertical-bottom         | textAlignVertical  | bottom                |
            | Set preferredLanguages               | preferredLanguages | spa,eng               |
            | Set windowColor-white                | windowColor        | white                 |
            | Set windowOpacity-50                 | windowOpacity      | 50                    |

    @sdk @transport
    Scenario Outline: Closedcaptions.<Method> - Positive Scenario: <Scenario> with 'null' params
        When 1st party app registers for the '<Event>' event using the 'Firebolt' API
        And 1st party app invokes the 'Firebolt' API to '<Set_API_Key>'
        Then 'Firebolt' platform responds to '1st party app' for '<Set_API_Key>'
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Method_Validation_Key>'
        And 'Firebolt' platform triggers to '1st party app' with '<Event_Validation_Key>'

        Examples:
            | Scenario          | Method            | Set_API_Key                   | API_Key               | Method_Validation_Key                                 | Event_Validation_Key                                             | Event                                     |
            | fontFamily        | fontFamily        | set fontFamily as null        | get fontFamily        | default value for fontFamily in closedcaptions        | onFontFamilyChanged for closedcaptions with default value        | closedcaptions onFontFamilyChanged        |
            | fontSize          | fontSize          | set fontSize as null          | get fontSize          | default value for fontSize in closedcaptions          | onFontSizeChanged for closedcaptions with default value          | closedcaptions onFontSizeChanged          |
            | fontColor         | fontColor         | set fontColor as null         | get fontColor         | default value for fontColor in closedcaptions         | onFontColorChanged for closedcaptions with default value         | closedcaptions onFontColorChanged         |
            | fontEdge          | fontEdge          | set fontEdge as null          | get fontEdge          | default value for fontEdge in closedcaptions          | onFontEdgeChanged for closedcaptions with default value          | closedcaptions onFontEdgeChanged          |
            | fontEdgeColor     | fontEdgeColor     | set fontEdgeColor as null     | get fontEdgeColor     | default value for fontEdgeColor in closedcaptions     | onFontEdgeColorChanged for closedcaptions with default value     | closedcaptions onFontEdgeColorChanged     |
            | fontOpacity       | fontOpacity       | set fontOpacity as null       | get fontOpacity       | default value for fontOpacity in closedcaptions       | onFontOpacityChanged for closedcaptions with default value       | closedcaptions onFontOpacityChanged       |
            | backgroundColor   | backgroundColor   | set backgroundColor as null   | get backgroundColor   | default value for backgroundColor in closedcaptions   | onBackgroundColorChanged for closedcaptions with default value   | closedcaptions onBackgroundColorChanged   |
            | backgroundOpacity | backgroundOpacity | set backgroundOpacity as null | get backgroundOpacity | default value for backgroundOpacity in closedcaptions | onBackgroundOpacityChanged for closedcaptions with default value | closedcaptions onBackgroundOpacityChanged |
            | textAlign         | textAlign         | set textAlign as null         | get textAlign         | default value for textAlign in closedcaptions         | onTextAlignChanged for closedcaptions with default value         | closedcaptions onTextAlignChanged         |
            | textAlignVertical | textAlignVertical | set textAlignVertical as null | get textAlignVertical | default value for textAlignVertical in closedcaptions | onTextAlignVerticalChanged for closedcaptions with default value | closedcaptions onTextAlignVerticalChanged |
            | windowColor       | windowColor       | set windowColor as null       | get windowColor       | default value for windowColor in closedcaptions       | onWindowColorChanged for closedcaptions with default value       | closedcaptions onWindowColorChanged       |
            | windowOpacity     | windowOpacity     | set windowOpacity as null     | get windowOpacity     | default value for windowOpacity in closedcaptions     | onWindowOpacityChanged for closedcaptions with default value     | closedcaptions onWindowOpacityChanged     |

    @sdk @transport
    Scenario Outline: ClosedCaptions.<Method> - Negative Scenario: <Scenario> expecting error
        Given we test the 'CLOSED_CAPTIONS_SETTINGS' getters and setters '<Method>' to '<Value>'
        When 1st party app invokes the 'Firebolt' API to set '<Method>' to invalid '<Value>'
        And 'Firebolt' platform responds to '1st party app' set API with '<Error>'

        Examples:
            | Scenario                    | Method             | Value      | Error               |
            | Set enabled-test            | enabled            | test       | INVALID_TYPE_PARAMS |
            | Set enabled-123             | enabled            | 123        | INVALID_TYPE_PARAMS |
            | Set fontFamily-123          | fontFamily         | 123        | INVALID_TYPE_PARAMS |
            | Set fontFamily-true         | fontFamily         | true       | INVALID_TYPE_PARAMS |
            | Set fontSize-true           | fontSize           | true       | INVALID_TYPE_PARAMS |
            | Set fontSize-test           | fontSize           | test       | INVALID_TYPE_PARAMS |
            | Set fontSize-true           | fontSize           | true       | INVALID_TYPE_PARAMS |
            | Set fontSize-0.25           | fontSize           | 0.25       | CUSTOM_ERROR        |
            | Set fontFamily-sans-serif   | fontFamily         | sans-serif | CUSTOM_ERROR        |
            | Set fontEdge-123            | fontEdge           | 123        | INVALID_TYPE_PARAMS |
            | Set fontEdge-true           | fontEdge           | true       | INVALID_TYPE_PARAMS |
            | Set fontEdge-solid          | fontEdge           | solid      | CUSTOM_ERROR        |
            | Set preferredLanguages-true | preferredLanguages | true       | INVALID_TYPE_PARAMS |
            | Set preferredLanguages-123  | preferredLanguages | 123        | INVALID_TYPE_PARAMS |
            | Set preferredLanguages-test | preferredLanguages | test       | INVALID_TYPE_PARAMS |
            | Set windowColor-123         | windowColor        | 123        | INVALID_TYPE_PARAMS |
            | Set windowOpacity-true      | windowOpacity      | true       | INVALID_TYPE_PARAMS |
            | Set fontEdgeColor-123       | fontEdgeColor      | 123        | INVALID_TYPE_PARAMS |
            | Set fontEdgeColor-true      | fontEdgeColor      | true       | INVALID_TYPE_PARAMS |
            | Set backgroundColor-123     | backgroundColor    | 123        | INVALID_TYPE_PARAMS |
            | Set backgroundColor-true    | backgroundColor    | true       | INVALID_TYPE_PARAMS |
            | Set textAlign-123           | textAlign          | 123        | INVALID_TYPE_PARAMS |
            | Set textAlign-true          | textAlign          | true       | INVALID_TYPE_PARAMS |
            | Set textAlignVertical-123   | textAlignVertical  | 123        | INVALID_TYPE_PARAMS |
            | Set textAlignVertical-true  | textAlignVertical  | true       | INVALID_TYPE_PARAMS |
            | Set fontColor-123           | fontColor          | 123        | INVALID_TYPE_PARAMS |
            | Set fontColor-true          | fontColor          | true       | INVALID_TYPE_PARAMS |
            | Set fontOpacity-120         | fontOpacity        | 120        | CUSTOM_ERROR        |
            | Set fontOpacity-test        | fontOpacity        | test       | INVALID_TYPE_PARAMS |
            | Set fontOpacity-true        | fontOpacity        | true       | INVALID_TYPE_PARAMS |
            | Set backgroundOpacity-120   | backgroundOpacity  | 120        | CUSTOM_ERROR        |
            | Set backgroundOpacity-test  | backgroundOpacity  | test       | INVALID_TYPE_PARAMS |
            | Set backgroundOpacity-true  | backgroundOpacity  | true       | INVALID_TYPE_PARAMS |
