Feature: ClosedCaptions_Manage

    Background: Launch FCA for 'ClosedCaptions'
        Given the environment has been set up for 'ClosedCaptions' tests
        And 3rd party 'certification' app is launched

    @ClosedCaptions @manageSDK
    Scenario Outline: ClosedCaptions.<Method> - Positive Scenario: <Scenario>
        Given we test the 'CLOSED_CAPTIONS_SETTINGS' getters and setters
        When '3rd party app' registers for the 'Firebolt' event
        When '1st party app' registers for the 'Firebolt' event
        And 1st party app invokes the 'Firebolt' API to set '<Method>' to '<Value>'
        Then 'Firebolt' platform responds to '1st party app' set API
        When 1st party app invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '1st party app' get API
        And 'Firebolt' platform triggers '1st party app' event

        Examples:
            | Scenario                             | Method             | Value                 | Event                     |
            | Set backgroundColor-#7f7f7f          | backgroundColor    | #7f7f7f               | backgroundColorChanged    |
            | Set backgroundOpacity-75             | backgroundOpacity  | 75                    | backgroundOpacityChanged  |
            | Set closedcaptions-false             | enabled            | false                 | enabledChanged            |
            | Set closedcaptions-true              | enabled            | true                  | enabledChanged            |
            | Set fontColor-#ff00ff                | fontColor          | #ff00ff               | fontColorChanged          |
            | Set fontEdge-raised                  | fontEdge           | raised                | fontEdgeChanged           |
            | Set fontEdge-none                    | fontEdge           | none                  | fontEdgeChanged           |
            | Set fontEdge-depressed               | fontEdge           | depressed             | fontEdgeChanged           |
            | Set fontEdge-uniform                 | fontEdge           | uniform               | fontEdgeChanged           |
            | Set fontEdge-drop-shadow-left        | fontEdge           | drop_shadow_left      | fontEdgeChanged           |
            | Set fontEdge-drop-shadow-right       | fontEdge           | drop_shadow_right     | fontEdgeChanged           |
            | Set fontEdgeColor-#FFFFFF            | fontEdgeColor      | #FFFFFF               | fontEdgeColorChanged      |
            | Set fontFamily-cursive               | fontFamily         | cursive               | fontFamilyChanged         |
            | Set fontFamily-monospaced_sanserif   | fontFamily         | monospaced_sanserif   | fontFamilyChanged         |
            | Set fontFamily-proportional_serif    | fontFamily         | proportional_serif    | fontFamilyChanged         |
            | Set fontFamily-monospaced_serif      | fontFamily         | monospaced_serif      | fontFamilyChanged         |
            | Set fontFamily-proportional_sanserif | fontFamily         | proportional_sanserif | fontFamilyChanged         |
            | Set fontFamily-smallcaps             | fontFamily         | smallcaps             | fontFamilyChanged         |
            | Set fontFamily-casual                | fontFamily         | casual                | fontFamilyChanged         |
            | Set fontOpacity-75                   | fontOpacity        | 75                    | fontOpacityChanged        |
            | Set fontSize-0.5                     | fontSize           | 0.5                   | fontSizeChanged           |
            | Set fontSize-1                       | fontSize           | 1                     | fontSizeChanged           |
            | Set fontSize-1.5                     | fontSize           | 1.5                   | fontSizeChanged           |
            | Set textAlign-left                   | textAlign          | left                  | textAlignChanged          |
            | Set textAlign-center                 | textAlign          | center                | textAlignChanged          |
            | Set textAlign-right                  | textAlign          | right                 | textAlignChanged          |
            | Set textAlignVertical-top            | textAlignVertical  | top                   | textAlignVerticalChanged  |
            | Set textAlignVertical-bottom         | textAlignVertical  | bottom                | textAlignVerticalChanged  |
            | Set preferredLanguages               | preferredLanguages | spanish               | PreferredLanguagesChanged |
            | Set windowColor-white                | windowColor        | white                 | windowColorChanged        |
            | Set windowOpacity-50                 | windowOpacity      | 50                    | windowOpacityChanged      |

    @ClosedCaptions @manageSDK
    Scenario Outline: ClosedCaptions.<Method> - Positive Scenario: <Scenario>
        Given we test the 'CLOSED_CAPTIONS_SETTINGS' getters and setters
        When '1st party app' registers for the 'Firebolt' '<Event>'
        And 1st party app invokes the 'Firebolt' API to set '<Method>' to 'null'
        Then 'Firebolt' platform responds to '1st party app' set API
        When 1st party app invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '1st party app' get API
        And 'Firebolt' platform triggers '1st party app' event

        Examples:
            | Scenario          | Method                     | Event                      |
            | fontFamily        | fontFamily                 | backgroundColorChanged     |
            | fontSize          | fontSize                   | onFontSizeChanged          |
            | fontColor         | fontColor                  | onFontColorChanged         |
            | fontEdge          | fontEdge                   | onFontEdgeChanged          |
            | fontEdgeColor     | fontEdgeColor              | onFontEdgeColorChanged     |
            | fontOpacity       | fontOpacity                | onFontOpacityChanged       |
            | backgroundColor   | backgroundColor            | onBackgroundColorChanged   |
            | backgroundOpacity | backgroundOpacity          | onBackgroundOpacityChanged |
            | textAlign         | textAlign                  | onTextAlignChanged         |
            | textAlignVertical | ftextAlignVerticalontColor | onTextAlignVerticalChanged |
            | windowColor       | windowColor                | onWindowColorChanged       |
            | windowOpacity     | windowOpacity              | onWindowOpacityChanged     |

    @ClosedCaptions @manageSDK
    Scenario Outline: ClosedCaptions.<Method> - Negative Scenario: <Scenario> expecting error
        Given we test the 'CLOSED_CAPTIONS_SETTINGS' getters and setters
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
