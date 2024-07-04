Feature: ClosedCaptions_Manage

    Background: Launch FCA for 'ClosedCaptions'
        Given the environment has been set up for 'ClosedCaptions' tests
        And 3rd party 'certification' app is launched

    @ClosedCaptions @manageSDK
    Scenario Outline: ClosedCaptions.<Method> - Positive Scenario: <Scenario>
    Given we test the 'CLOSEDCAPTIONS' getters and setters
        When '1st party app' registers for the 'Firebolt' '<Event>'
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

   