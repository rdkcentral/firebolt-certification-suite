Feature: Accessibility

   @initialization
   Scenario: Launch FCA for 'Accessibility'
      Given the environment has been set up for 'Accessibility' tests
      And 3rd party 'certification' app is launched

   @Accessibility @coreSDK @sdk @transport
   Scenario Outline: Accessibility.closedCaptionsSettings - Positive Scenario: <Scenario>
      When '3rd party app' registers for the 'closedCaptions settings' event using the 'Firebolt' API
      And 1st party app invokes the 'Firebolt' API to '<Key>'
      And '3rd party app' invokes the 'Firebolt' API to 'get closedCaptions settings'
      Then 'Firebolt' platform responds with '<Method_Content>'
      And 'Firebolt' platform responds with '<Event_Content>'
      And 'Firebolt' platform responds to '1st party app' with '<set_Method_Content>'

      Examples:
         | Scenario                             | Key                                     | Method_Content                                                  | Event_Content                                                         | set_Method_Content                            |
         | Disable closedcaptions               | disable closedCaptions                  | disabled for closedCaptions settings                            | disabled for closedCaptions settings event                            | null for closedCaptions setEnabled            |
         | Enable closedcaptions                | enable closedCaptions                   | enabled for closedCaptions settings                             | enabled for closedCaptions settings event                             | null for closedCaptions setEnabled            |
         | Set fontFamily-monospaced_sanserif   | set fontFamily to monospaced_sanserif   | monospace sanserif for fontfamily in closedcaptions settings    | monospace sanserif for fontfamily in closedcaptions settings event    | null for closedCaptions setFontFamily         |
         | Set fontFamily-cursive               | set fontFamily to cursive               | cursive for fontfamily in closedcaptions settings               | cursive for fontfamily in closedcaptions settings event               | null for closedCaptions setFontFamily         |
         | Set fontFamily-proportional_serif    | set fontFamily to proportional_serif    | proportional serif for fontfamily in closedcaptions settings    | proportional serif for fontfamily in closedcaptions settings event    | null for closedCaptions setFontFamily         |
         | Set fontFamily-monospaced_serif      | set fontFamily to monospaced_serif      | monospaced serif for fontfamily in closedcaptions settings      | monospaced serif for fontfamily in closedcaptions settings event      | null for closedCaptions setFontFamily         |
         | Set fontFamily-proportional_sanserif | set fontFamily to proportional_sanserif | proportional sanserif for fontfamily in closedcaptions settings | proportional sanserif for fontfamily in closedcaptions settings event | null for closedCaptions setFontFamily         |
         | Set fontFamily-smallcaps             | set fontFamily to smallcaps             | smallcaps for fontfamily in closedcaptions settings             | smallcaps for fontfamily in closedcaptions settings event             | null for closedCaptions setFontFamily         |
         | Set fontFamily-casual                | set fontFamily to casual                | casual for fontfamily in closedcaptions settings                | casual for fontfamily in closedcaptions settings event                | null for closedCaptions setFontFamily         |
         | Set fontSize-1                       | set fontSize to 1                       | 1 for fontSize in closedcaptions settings                       | 1 for fontSize in closedcaptions settings event                       | null for closedCaptions setFontSize           |
         | Set fontColor-#ff00ff                | set fontColor to #ff00ff                | #ff00ff for fontColor in closedcaptions settings                | #ff00ff for fontColor in closedcaptions settings event                | null for closedCaptions setFontColor          |
         | Set fontEdge-raised                  | set fontEdge to raised                  | raised for fontEdge in closedcaptions settings                  | raised for fontEdge in closedcaptions settings event                  | null for closedCaptions setFontEdge           |
         | Set fontEdge-none                    | set fontEdge to none                    | none for fontEdge in closedcaptions settings                    | none for fontEdge in closedcaptions settings event                    | null for closedCaptions setFontEdge           |
         | Set fontEdge-depressed               | set fontEdge to depressed               | depressed for fontEdge in closedcaptions settings               | depressed for fontEdge in closedcaptions settings event               | null for closedCaptions setFontEdge           |
         | Set fontEdge-uniform                 | set fontEdge to uniform                 | uniform for fontEdge in closedcaptions settings                 | uniform for fontEdge in closedcaptions settings event                 | null for closedCaptions setFontEdge           |
         | Set fontEdge-dropShadow-left         | set fontEdge to dropShadow_left         | dropShadowLeft for fontEdge in closedcaptions settings          | dropShadowLeft for fontEdge in closedcaptions settings event          | null for closedCaptions setFontEdge           |
         | Set fontEdge-dropShadow-right        | set fontEdge to dropShadow_right        | dropShadowRight for fontEdge in closedcaptions settings         | dropShadowRight for fontEdge in closedcaptions settings event         | null for closedCaptions setFontEdge           |
         | Set fontEdgeColor-#FFFFFF            | set fontEdgeColor to #FFFFFF            | #ffffff for fontEdgeColor in closedcaptions settings            | #ffffff for fontEdgeColor in closedcaptions settings event            | null for closedCaptions setFontEdgeColor      |
         | Set backgroundColor-#7f7f7f          | set backgroundColor to #7f7f7f          | #7f7f7f for backgroundColor in closedcaptions settings          | #7f7f7f for backgroundColor in closedcaptions settings event          | null for closedCaptions setBackgroundColor    |
         | Set fontOpacity-75                   | set fontOpacity to 75                   | 75 for fontOpacity in closedcaptions settings                   | 75 for fontOpacity in closedcaptions settings event                   | null for closedCaptions setFontOpacity        |
         | Set backgroundOpacity-75             | set backgroundOpacity to 75             | 75 for backgroundOpacity in closedcaptions settings             | 75 for backgroundOpacity in closedcaptions settings event             | null for closedCaptions setBackgroundOpacity  |
         | Set textAlign-left                   | set textAlign to left                   | left for textAlign in closedcaptions settings                   | left for textAlign in closedcaptions settings event                   | null for closedCaptions setTextAlign          |
         | Set textAlign-center                 | set textAlign to center                 | center for textAlign in closedcaptions settings                 | center for textAlign in closedcaptions settings event                 | null for closedCaptions setTextAlign          |
         | Set textAlign-right                  | set textAlign to right                  | right for textAlign in closedcaptions settings                  | right for textAlign in closedcaptions settings event                  | null for closedCaptions setTextAlign          |
         | Set textAlignVertical-top            | set textAlignVertical to top            | top for textAlignVertical in closedcaptions settings            | top for textAlignVertical in closedcaptions settings event            | null for closedCaptions setTextAlignVertical  |
         | Set textAlignVertical-middle         | set textAlignVertical to middle         | middle for textAlignVertical in closedcaptions settings         | middle for textAlignVertical in closedcaptions settings event         | null for closedCaptions setTextAlignVertical  |
         | Set textAlignVertical-bottom         | set textAlignVertical to bottom         | bottom for textAlignVertical in closedcaptions settings         | bottom for textAlignVertical in closedcaptions settings event         | null for closedCaptions setTextAlignVertical  |
         | Set windowColor-white                | set windowColor to white                | white for windowColor in closedcaptions settings                | white for windowColor in closedcaptions settings event                | null for closedCaptions setWindowColor        |
         | Set windowOpacity-50                 | set windowOpacity to 50                 | 50 for windowOpacity in closedcaptions settings                 | 50 for windowOpacity in closedcaptions settings event                 | null for closedCaptions setWindowOpacity      |
         | Set fontSize-0.5                     | set fontSize to 0.5                     | 0.5 for fontSize in closedcaptions settings                     | 0.5 for fontSize in closedcaptions settings event                     | null for closedCaptions setFontSize           |
         | Set fontSize-1.5                     | set fontSize to 1.5                     | 1.5 for fontSize in closedcaptions settings                     | 1.5 for fontSize in closedcaptions settings event                     | null for closedCaptions setFontSize           |
         | Set preferredLanguages               | set Languages to english spanish        | english for preferredLanguages in closedcaptions settings       | english for preferredLanguages in closedcaptions settings event       | null for closedCaptions setPreferredLanguages |

   @Accessibility @coreSDK @sdk @transport
   Scenario Outline: Accessibility.closedCaptionsSettings - Positive Scenario: <Scenario> with undefined params
      When 1st party app invokes the 'Firebolt' API to '<Key>'
      Then 'Firebolt' platform responds to '1st party app' with '<Method_Content>'

      Examples:
         | Scenario           | Key                                       | Method_Content                                   |
         | enabled            | enable closedCaptions with no parameters  | enabled for closedCaptions setEnabled            |
         | fontFamily         | set fontFamily with no parameters         | casual for closedCaptions setFontFamily          |
         | fontSize           | set fontSize with no parameters           | 1.5 for closedcaptions setFontSize               |
         | fontColor          | set fontColor with no parameters          | #ff00ff for closedcaptions setFontColor          |
         | fontEdge           | set fontEdge with no parameters           | dropShadowRight for closedcaptions setFontEdge   |
         | fontEdgeColor      | set fontEdgeColor with no parameters      | #ffffff for closedcaptions setFontEdgeColor      |
         | fontOpacity        | set fontOpacity with no parameters        | 75 for closedcaptions setFontOpacity             |
         | backgroundColor    | set backgroundColor with no parameters    | #7f7f7f for closedcaptions setBackgroundColor    |
         | backgroundOpacity  | set backgroundOpacity with no parameters  | 75 for closedcaptions setBackgroundOpacity       |
         | textAlign          | set textAlign with no parameters          | right for closedcaptions setTextAlign            |
         | textAlignVertical  | set textAlignVertical with no parameters  | bottom for closedcaptions settextAlignVertical   |
         | windowColor        | set windowColor with no parameters        | white for closedcaptions setWindowColor          |
         | windowOpacity      | set windowOpacity with no parameters      | 50 for closedcaptions setWindowOpacity           |
         | preferredLanguages | set preferredLanguages with no parameters | english for closedcaptions setPreferredLanguages |

   @Accessibility @coreSDK @sdk @transport
   Scenario Outline: Accessibility.closedCaptionsSettings - Positive Scenario: <Scenario> with 'null' params
      When 1st party app invokes the 'Firebolt' API to '<Key>'
      And '3rd party app' invokes the 'Firebolt' API to 'get closedCaptions settings'
      Then 'Firebolt' platform responds with '<Method_Content>'
      And 'Firebolt' platform responds to '1st party app' with '<Set_Method_Content>'

      Examples:
         | Scenario          | Key                           | Set_Method_Content                           | Method_Content                                             |
         | fontFamily        | set fontFamily as null        | null for closedCaptions setFontFamily        | monospaced serif for fontfamily in closedcaptions settings |
         | fontSize          | set fontSize as null          | null for closedCaptions setFontSize          | 1 for fontSize in closedcaptions settings                  |
         | fontColor         | set fontColor as null         | null for closedCaptions setFontColor         | #ffffff for fontColor in closedcaptions settings           |
         | fontEdge          | set fontEdge as null          | null for closedCaptions setFontEdge          | none for fontEdge in closedcaptions settings               |
         | fontEdgeColor     | set fontEdgeColor as null     | null for closedCaptions setFontEdgeColor     | #7f7f7f for fontEdgeColor in closedcaptions settings       |
         | fontOpacity       | set fontOpacity as null       | null for closedCaptions setFontOpacity       | 100 for fontOpacity in closedcaptions settings             |
         | backgroundColor   | set backgroundColor as null   | null for closedCaptions setBackgroundColor   | #000000 for backgroundColor in closedcaptions settings     |
         | backgroundOpacity | set backgroundOpacity as null | null for closedCaptions setBackgroundOpacity | 12 for backgroundOpacity in closedcaptions settings        |
         | textAlign         | set textAlign as null         | null for closedCaptions setTextAlign         | center for textAlign in closedcaptions settings            |
         | textAlignVertical | set textAlignVertical as null | null for closedCaptions setTextAlignVertical | middle for textAlignVertical in closedcaptions settings    |
         | windowColor       | set windowColor as null       | null for closedCaptions setWindowColor       | #000000 for windowColor in closedcaptions settings         |
         | windowOpacity     | set windowOpacity as null     | null for closedCaptions setWindowOpacity     | 0 for windowOpacity in closedcaptions settings             |

   @Accessibility @coreSDK @sdk @transport
   Scenario Outline: Accessibility.closedCaptionsSettings - Negative Scenario: <Scenario> expecting error
      When 1st party app invokes the 'Firebolt' API to '<Key>'
      Then 'Firebolt' platform responds to '1st party app' with '<Error_Object>'

      Examples:
         | Scenario                    | Key                                          | Error_Object                                            |
         | Enable closedcaptions-test  | enable closedCaptions with test parameter    | invalid params for closedcaptions setEnabled            |
         | Enable closedcaptions-123   | enable closedCaptions with integer parameter | invalid params for closedcaptions setEnabled            |
         | Set fontFamily-123          | set fontFamily to 123                        | invalid params for closedcaptions setFontFamily         |
         | Set fontFamily-true         | set fontFamily to true                       | invalid params for closedcaptions setFontFamily         |
         | Set fontSize-test           | set fontSize to test                         | invalid params for closedcaptions setFontSize           |
         | Set fontSize-true           | set fontSize to true                         | invalid params for closedcaptions setFontSize           |
         | Set fontSize-0.25           | set fontSize to 0.25                         | custom error for closedcaptions setFontSize             |
         | Set fontColor-123           | set fontColor to 123                         | invalid params for closedcaptions setFontColor          |
         | Set fontColor-true          | set fontColor to true                        | invalid params for closedcaptions setFontColor          |
         | Set fontEdge-123            | set fontEdge to 123                          | invalid params for closedcaptions setFontEdge           |
         | Set fontEdge-true           | set fontEdge to true                         | invalid params for closedcaptions setFontEdge           |
         | Set fontEdgeColor-123       | set fontEdgeColor to 123                     | invalid params for closedcaptions setFontEdgeColor      |
         | Set fontEdgeColor-true      | set fontEdgeColor to true                    | invalid params for closedcaptions setFontEdgeColor      |
         | Set backgroundColor-123     | set backgroundColor to 123                   | invalid params for closedcaptions setBackgroundColor    |
         | Set backgroundColor-true    | set backgroundColor to true                  | invalid params for closedcaptions setBackgroundColor    |
         | Set fontOpacity-120         | set fontOpacity to 120                       | custom error for closedcaptions setFontOpacity          |
         | Set fontOpacity-test        | set fontOpacity to test                      | invalid params for closedcaptions setFontOpacity        |
         | Set fontOpacity-true        | set fontOpacity to true                      | invalid params for closedcaptions setFontOpacity        |
         | Set backgroundOpacity-120   | set backgroundOpacity to 120                 | custom error for closedcaptions setBackgroundOpacity    |
         | Set backgroundOpacity-test  | set backgroundOpacity to test                | invalid params for closedcaptions setBackgroundOpacity  |
         | Set backgroundOpacity-true  | set backgroundOpacity to true                | invalid params for closedcaptions setBackgroundOpacity  |
         | Set textAlign-123           | set textAlign to 123                         | invalid params for closedcaptions setTextAlign          |
         | Set textAlign-true          | set textAlign to true                        | invalid params for closedcaptions setTextAlign          |
         | Set textAlignVertical-123   | set textAlignVertical to 123                 | invalid params for closedcaptions setTextAlignVertical  |
         | Set textAlignVertical-true  | set textAlignVertical to true                | invalid params for closedcaptions setTextAlignVertical  |
         | Set windowColor-123         | set windowColor to 123                       | invalid params for closedcaptions setWindowColor        |
         | Set windowOpacity-true      | set windowOpacity to true                    | invalid params for closedcaptions setWindowOpacity      |
         | Set fontFamily-sans-serif   | set fontFamily to sans_serif                 | custom error for closedcaptions setFontFamily           |
         | Set fontEdge-solid          | set fontEdge to solid                        | custom error for closedcaptions setFontEdge             |
         | Set preferredLanguages-true | set preferredLanguages to true               | invalid params for closedcaptions setPreferredLanguages |
         | Set preferredLanguages-123  | set preferredLanguages to 123                | invalid params for closedcaptions setPreferredLanguages |

   @Accessibility @coreSDK @sdk @transport
   Scenario Outline: Accessibility.voiceGuidanceSettings - Positive Scenario: <Scenario>
      When '3rd party app' registers for the 'voiceGuidance settings' event using the 'Firebolt' API
      And 1st party app invokes the 'Firebolt' API to '<Key>'
      And '3rd party app' invokes the 'Firebolt' API to 'get voiceGuidance settings'
      Then 'Firebolt' platform responds with '<Method_Content>'
      And 'Firebolt' platform responds with '<Event_Content>'
      And 'Firebolt' platform responds to '1st party app' with '<Set_Method_Content>'

      Examples:
         | Scenario              | Key                   | Method_Content                          | Event_Content                                 | Set_Method_Content                |
         | Disable voiceguidance | disable voiceGuidance | disabled voiceGuidance settings         | disabled voiceGuidance settings event         | null for voiceGuidance setEnabled |
         | Enable voiceguidance  | enable voiceGuidance  | enabled voiceGuidance settings          | enabled voiceGuidance settings event          | null for voiceGuidance setEnabled |
         | Set speed-1           | set speed as 1        | 1 for speed in voiceGuidance settings   | 1 for speed in voiceGuidance settings event   | null for voiceGuidance setSpeed   |
         | Set speed-0.5         | set speed as 0.5      | 0.5 for speed in voiceGuidance settings | 0.5 for speed in voiceGuidance settings event | null for voiceGuidance setSpeed   |
         | Set speed-2           | set speed as 2        | 2 for speed in voiceGuidance settings   | 2 for speed in voiceGuidance settings event   | null for voiceGuidance setSpeed   |

   @Accessibility @coreSDK @sdk @transport
   Scenario Outline: Accessibility.voiceGuidanceSettings - Negative Scenario: <Scenario> expecting error
      When 1st party app invokes the 'Firebolt' API to '<Key>'
      Then 'Firebolt' platform responds to '1st party app' with '<Error_Object>'

      Examples:
         | Scenario        | Key                                         | Error_Object                                |
         | Set Enable-test | enable voiceGuidance with test parameter    | invalid params for voiceGuidance setEnabled |
         | Set Enable-123  | enable voiceGuidance with integer parameter | invalid params for voiceGuidance setEnabled |
         | Set speed-test  | set speed as test                           | invalid params for voiceGuidance setSpeed   |
         | Set speed-true  | set speed as true                           | invalid params for voiceGuidance setSpeed   |

   @Accessibility @coreSDK @sdk @transport
   Scenario Outline: Accessibility.audioDescriptionSettings - Positive Scenario: <Scenario>
      When '3rd party app' registers for the 'audioDescription settings' event using the 'Firebolt' API
      And 1st party app invokes the 'Firebolt' API to '<Key>'
      And '3rd party app' invokes the 'Firebolt' API to 'get audioDescriptionSettings settings'
      Then 'Firebolt' platform responds with '<Method_Content>'
      And 'Firebolt' platform responds with '<Event_Content>'
      And 'Firebolt' platform responds to '1st party app' with 'null for audioDescription setEnabled'

      Examples:
         | Scenario                         | Key                      | Method_Content                     | Event_Content                            |
         | Disable audioDescriptionSettings | disable audioDescription | disabled audioDescription settings | disabled audioDescription settings event |
         | Enable audioDescriptionSettings  | enable audioDescription  | enabled audioDescription settings  | enabled audioDescription settings event  |

   @Accessibility @coreSDK @sdk @transport
   Scenario Outline: Accessibility.audioDescriptionSettings - Negative Scenario: <Scenario> expecting error
      When 1st party app invokes the 'Firebolt' API to '<Key>'
      Then 'Firebolt' platform responds to '1st party app' with 'invalid params for audiodescriptions setEnabled'

      Examples:
         | Scenario                             | Key                                            |
         | Enable audioDescriptionSettings-test | enable audioDescription with test parameter    |
         | Enable audioDescriptionSettings-123  | enable audioDescription with integer parameter |

   @Accessibility @coreSDK @sdk @transport
   Scenario Outline: Accessibility.voiceGuidanceSettings - Positive Scenario: <Scenario> with undefined params
      When 1st party app invokes the 'Firebolt' API to '<Key>'
      Then 'Firebolt' platform responds to '1st party app' with '<Method_Content>'

      Examples:
         | Scenario             | Key                                     | Method_Content                        |
         | Enable voiceguidance | enable voiceguidance with no parameters | enabled for voiceGuidance setEnabled  |
         | speed-2              | set speed as 2 with no parameters       | 2 for speed in voiceGuidance setSpeed |