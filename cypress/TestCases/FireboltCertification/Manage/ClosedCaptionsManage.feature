Feature: ClosedCaptions_Manage

    Background: Launch FCA for 'ClosedCaptions'
        Given the environment has been set up for 'ClosedCaptions' tests
        And 3rd party 'certification' app is launched

    @ClosedCaptions @manageSDK
    Scenario Outline: ClosedCaptions.<Method> - Positive Scenario: <Scenario>
        When 1st party app registers for the '<Event>' event using the 'Firebolt' API
        And 1st party app invokes the 'Firebolt' API to '<Set_API_Key>'
        Then 'Firebolt' platform responds to '1st party app' for '<Set_API_Key>'
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Method_Validation_Key>'
        And 'Firebolt' platform triggers to '1st party app' event '<Event_Validation_Key>'

        Examples:
            | Scenario                             | Method             | Event                                      | Set_API_Key                             | API_Key                | Method_Validation_Key                                  | Event_Validation_Key                                              |
            | Set backgroundColor-#7f7f7f          | backgroundColor    | closedcaptions onBackgroundColorChanged    | set backgroundColor to #7f7f7f          | get backgroundColor    | #7f7f7f for backgroundColor in closedCaptions          | onBackgroundColorChanged for closedcaptions with #7f7f7f          |
            | Set backgroundOpacity-75             | backgroundOpacity  | closedcaptions onBackgroundOpacityChanged  | set backgroundOpacity to 75             | get backgroundOpacity  | 75 for backgroundOpacity in closedCaptions             | onBackgroundOpacityChanged for closedcaptions with 75             |
            | Set closedcaptions-false             | enabled            | closedcaptions onEnabledChanged            | disable closedCaptions                  | get enabled            | disabled for closedCaptions                            | onEnabledChanged for closedcaptions with disable                  |
            | Set closedcaptions-true              | enabled            | closedcaptions onEnabledChanged            | enable closedCaptions                   | get enabled            | enabled for closedCaptions                             | onEnabledChanged for closedcaptions with enable                   |
            | Set fontColor-#ff00ff                | fontColor          | closedcaptions onFontColorChanged          | set fontColor to #ff00ff                | get fontColor          | #ff00ff for fontColor in closedCaptions                | onFontColorChanged for closedcaptions with #ff00ff                |
            | Set fontEdge-raised                  | fontEdge           | closedcaptions onFontEdgeChanged           | set fontEdge to raised                  | get fontEdge           | raised for fontEdge in closedCaptions                  | onFontEdgeChanged for closedcaptions with raised                  |
            | Set fontEdge-none                    | fontEdge           | closedcaptions onFontEdgeChanged           | set fontEdge to none                    | get fontEdge           | none for fontEdge in closedCaptions                    | onFontEdgeChanged for closedcaptions with none                    |
            | Set fontEdge-depressed               | fontEdge           | closedcaptions onFontEdgeChanged           | set fontEdge to depressed               | get fontEdge           | depressed for fontEdge in closedCaptions               | onFontEdgeChanged for closedcaptions with depressed               |
            | Set fontEdge-uniform                 | fontEdge           | closedcaptions onFontEdgeChanged           | set fontEdge to uniform                 | get fontEdge           | uniform for fontEdge in closedCaptions                 | onFontEdgeChanged for closedcaptions with uniform                 |
            | Set fontEdge-drop-shadow-left        | fontEdge           | closedcaptions onFontEdgeChanged           | set fontEdge to dropShadow left         | get fontEdge           | dropShadow left for fontEdge in closedCaptions         | onFontEdgeChanged for closedcaptions with dropShadow left         |
            | Set fontEdge-drop-shadow-right       | fontEdge           | closedcaptions onFontEdgeChanged           | set fontEdge to dropShadow right        | get fontEdge           | dropShadow right for fontEdge in closedCaptions        | onFontEdgeChanged for closedcaptions with dropShadow right        |
            | Set fontEdgeColor-#FFFFFF            | fontEdgeColor      | closedcaptions onFontEdgeColorChanged      | set fontEdgeColor to #FFFFFF            | get fontEdgeColor      | #FFFFFF for fontEdgeColor in closedCaptions            | onFontEdgeColorChanged for closedcaptions with #FFFFFF            |
            | Set fontFamily-cursive               | fontFamily         | closedcaptions onFontFamilyChanged         | set fontFamily to cursive               | get fontfamily         | cursive for fontFamily in closedCaptions               | onFontFamilyChanged for closedcaptions with cursive               |
            | Set fontFamily-monospaced_sanserif   | fontFamily         | closedcaptions onFontFamilyChanged         | set fontFamily to monospaced sanserif   | get fontFamily         | monospaced sanserif for fontFamily in closedCaptions   | onFontFamilyChanged for closedcaptions with monospaced sanserif   |
            | Set fontFamily-proportional_serif    | fontFamily         | closedcaptions onFontFamilyChanged         | set fontFamily to proportional serif    | get fontFamily         | proportional serif for fontFamily in closedCaptions    | onFontFamilyChanged for closedcaptions with proportional serif    |
            | Set fontFamily-monospaced_serif      | fontFamily         | closedcaptions onFontFamilyChanged         | set fontFamily to monospaced serif      | get fontFamily         | monospaced serif for fontFamily in closedCaptions      | onFontFamilyChanged for closedcaptions with monospaced serif      |
            | Set fontFamily-proportional_sanserif | fontFamily         | closedcaptions onFontFamilyChanged         | set fontFamily to proportional sanserif | get fontFamily         | proportional sanserif for fontFamily in closedCaptions | onFontFamilyChanged for closedcaptions with proportional sanserif |
            | Set fontFamily-smallcaps             | fontFamily         | closedcaptions onFontFamilyChanged         | set fontFamily to smallcaps             | get fontFamily         | smallcaps for fontFamily in closedCaptions             | onFontFamilyChanged for closedcaptions with smallcaps             |
            | Set fontFamily-casual                | fontFamily         | closedcaptions onFontFamilyChanged         | set fontFamily to casual                | get fontFamily         | casual for fontFamily in closedCaptions                | onFontFamilyChanged for closedcaptions with casual                |
            | Set fontOpacity-75                   | fontOpacity        | closedcaptions onFontOpacityChanged        | set fontOpacity to 75                   | get fontOpacity        | 75 for fontOpacity in closedCaptions                   | onFontOpacityChanged for closedcaptions with 75                   |
            | Set fontSize-0.5                     | fontSize           | closedcaptions onFontSizeChanged           | set fontSize to 0.5                     | get fontSize           | 0.5 for fontSize in closedCaptions                     | onFontSizeChanged for closedcaptions with 0.5                     |
            | Set fontSize-1                       | fontSize           | closedcaptions onFontSizeChanged           | set fontSize to 1                       | get fontSize           | 1 for fontSize in closedCaptions                       | onFontSizeChanged for closedcaptions with 1                       |
            | Set fontSize-1.5                     | fontSize           | closedcaptions onFontSizeChanged           | set fontSize to 1.5                     | get fontSize           | 1.5 for fontSize in closedCaptions                     | onFontSizeChanged for closedcaptions with 1.5                     |
            | Set textAlign-left                   | textAlign          | closedcaptions onTextAlignChanged          | set textAlign to left                   | get textAlign          | left for textAlign in closedCaptions                   | onTextAlignChanged for closedcaptions with left                   |
            | Set textAlign-center                 | textAlign          | closedcaptions onTextAlignChanged          | set textAlign to center                 | get textAlign          | center for textAlign in closedCaptions                 | onTextAlignChanged for closedcaptions with center                 |
            | Set textAlign-right                  | textAlign          | closedcaptions onTextAlignChanged          | set textAlign to right                  | get textAlign          | right for textAlign in closedCaptions                  | onTextAlignChanged for closedcaptions with right                  |
            | Set textAlignVertical-top            | textAlignVertical  | closedcaptions onTextAlignVerticalChanged  | set textAlignVertical to top            | get textAlignVertical  | top for textAlignVertical in closedCaptions            | onTextAlignVerticalChanged for closedcaptions with top            |
            | Set textAlignVertical-middle         | textAlignVertical  | closedcaptions onTextAlignVerticalChanged  | set textAlignVertical to middle         | get textAlignVertical  | middle for textAlignVertical in closedCaptions         | onTextAlignVerticalChanged for closedcaptions with middle         |
            | Set textAlignVertical-bottom         | textAlignVertical  | closedcaptions onTextAlignVerticalChanged  | set textAlignVertical to bottom         | get textAlignVertical  | bottom for textAlignVertical in closedCaptions         | onTextAlignVerticalChanged for closedcaptions with bottom         |
            | Set preferredLanguages               | preferredLanguages | closedcaptions onPreferredLanguagesChanged | set preferredLanguages to spanish       | get preferredLanguages | spanish for preferredLanguages in closedCaptions       | onPreferredLanguagesChanged for closedcaptions with spanish       |
            | Set windowColor-white                | windowColor        | closedcaptions onWindowColorChanged        | set windowColor to white                | get windowColor        | white for windowColor in closedCaptions                | onWindowColorChanged for closedcaptions with #000000              |
            | Set windowOpacity-50                 | windowOpacity      | closedcaptions onWindowOpacityChanged      | set windowOpacity to 50                 | get windowOpacity      | 50 for windowOpacity in closedCaptions                 | onWindowOpacityChanged for closedcaptions with 50                 |

    @ClosedCaptions @manageSDK
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

    @ClosedCaptions @manageSDK
    Scenario Outline: ClosedCaptions.<Method> - Negative Scenario: <Scenario> expecting error
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Method_Validation_key>'

        Examples:
            | Scenario                    | Method                | API_Key                                      | Method_Validation_key                                   |
            | Set enabled-test            | setEnabled            | enable closedCaptions with test parameter    | invalid params for closedcaptions setEnabled            |
            | Set enabled-123             | setEnabled            | enable closedCaptions with integer parameter | invalid params for closedcaptions setEnabled            |
            | Set fontFamily-123          | setFontFamily         | set fontFamily to 123                        | invalid params for closedcaptions setFontFamily         |
            | Set fontFamily-true         | setFontFamily         | set fontFamily to true                       | invalid params for closedcaptions setFontFamily         |
            | Set fontSize-true           | setFontSize           | set fontSize to true                         | invalid params for closedcaptions setFontSize           |
            | Set fontSize-test           | setFontSize           | set fontSize to test                         | invalid params for closedcaptions setFontSize           |
            | Set fontSize-true           | setFontSize           | set fontSize to true                         | invalid params for closedcaptions setFontSize           |
            | Set fontSize-0.25           | setFontSize           | set fontSize to 0.25                         | custom error for closedcaptions setFontSize             |
            | Set fontFamily-sans-serif   | setFontFamily         | set fontFamily to sans serif                 | custom error for closedcaptions setFontFamily           |
            | Set fontEdge-123            | setFontEdge           | set fontEdge to 123                          | invalid params for closedcaptions setFontEdge           |
            | Set fontEdge-true           | setFontEdge           | set fontEdge to true                         | invalid params for closedcaptions setFontEdge           |
            | Set fontEdge-solid          | setFontEdge           | set fontEdge to solid                        | custom error for closedcaptions setFontEdge             |
            | Set preferredLanguages-true | setPreferredLanguages | set preferredLanguages to true               | invalid params for closedcaptions setPreferredLanguages |
            | Set preferredLanguages-123  | setPreferredLanguages | set preferredLanguages to 123                | invalid params for closedcaptions setPreferredLanguages |
            | Set preferredLanguage-test  | setPreferredLanguages | set preferredLanguages to test               | invalid params for closedcaptions setPreferredLanguages |
            | Set windowColor-123         | setWindowColor        | set windowColor to 123                       | invalid params for closedcaptions setWindowColor        |
            | Set windowOpacity-true      | setWindowOpacity      | set windowOpacity to true                    | invalid params for closedcaptions setWindowOpacity      |
            | Set fontEdgeColor-123       | setFontEdgeColor      | set fontEdgeColor to 123                     | invalid params for closedcaptions setFontEdgeColor      |
            | Set fontEdgeColor-true      | setFontEdgeColor      | set fontEdgeColor to true                    | invalid params for closedcaptions setFontEdgeColor      |
            | Set backgroundColor-123     | setBackgroundColor    | set backgroundColor to 123                   | invalid params for closedcaptions setBackgroundColor    |
            | Set backgroundColor-true    | setBackgroundColor    | set backgroundColor to true                  | invalid params for closedcaptions setBackgroundColor    |
            | Set textAlign-123           | setTextAlign          | set textAlign to 123                         | invalid params for closedcaptions setTextAlign          |
            | Set textAlign-true          | setTextAlign          | set textAlign to true                        | invalid params for closedcaptions setTextAlign          |
            | Set textAlignVertical-123   | setTextAlignVertical  | set textAlignVertical to 123                 | invalid params for closedcaptions setTextAlignVertical  |
            | Set textAlignVertical-true  | setTextAlignVertical  | set textAlignVertical to true                | invalid params for closedcaptions setTextAlignVertical  |
            | Set fontColor-123           | setFontColor          | set fontColor to 123                         | invalid params for closedcaptions setFontColor          |
            | Set fontColor-true          | setFontColor          | set fontColor to true                        | invalid params for closedcaptions setFontColor          |
            | Set fontOpacity-120         | setFontOpacity        | set fontOpacity to 120                       | custom error for closedcaptions setFontOpacity          |
            | Set fontOpacity-test        | setFontOpacity        | set fontOpacity to test                      | invalid params for closedcaptions setFontOpacity        |
            | Set fontOpacity-true        | setFontOpacity        | set fontOpacity to true                      | invalid params for closedcaptions setFontOpacity        |
            | Set backgroundOpacity-120   | setBackgroundOpacity  | set backgroundOpacity to 120                 | custom error for closedcaptions setBackgroundOpacity    |
            | Set backgroundOpacity-test  | setBackgroundOpacity  | set backgroundOpacity to test                | invalid params for closedcaptions setBackgroundOpacity  |
            | Set backgroundOpacity-true  | setBackgroundOpacity  | set backgroundOpacity to true                | invalid params for closedcaptions setBackgroundOpacity  |