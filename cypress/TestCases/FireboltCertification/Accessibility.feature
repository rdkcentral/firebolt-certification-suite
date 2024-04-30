Feature: Accessibility

   Background: Launch FCA for 'Accessibility'
      Given the environment has been set up for 'Accessibility' tests
      And 3rd party 'certification' app is launched

   @Accessibility @coreSDK @sdk @transport
   Scenario Outline: Accessibility.closedCaptionsSettings - Positive Scenario: <Scenario>
      When '3rd party app' registers for the 'accessibility onClosedCaptionsSettingsChanged' event using the 'Firebolt' API
      And '3rd party app' invokes the 'Firebolt' API to 'get closedCaptions settings'
      And 1st party app invokes the 'Firebolt' API to '<Key>'
      Then 'Firebolt' platform responds to '1st party app' with '<Set_Method_Content>'
      When '3rd party app' invokes the 'Firebolt' API to 'get closedCaptions settings'
      Then 'Firebolt' platform responds with '<Method_Content>'
      And 'Firebolt' platform triggers event '<Event_Content>'

      Examples:
         | Scenario                             | Key                                       | Method_Content                                                  | Event_Content                                                             | Set_Method_Content                            |
         | Disable closedcaptions               | disable closedCaptions                    | disabled for closedCaptions settings                            | onclosedCaptionsSettingsChanged with disabled                             | null for closedCaptions setEnabled            |
         | Enable closedcaptions                | enable closedCaptions                     | enabled for closedCaptions settings                             | onclosedCaptionsSettingsChanged with enabled                              | null for closedCaptions setEnabled            |
         | Set fontFamily-monospaced_sanserif   | set fontFamily to monospaced_sanserif     | monospace sanserif for fontfamily in closedcaptions settings    | onclosedCaptionsSettingsChanged with monospace sanserif for fontfamily    | null for closedCaptions setFontFamily         |
         | Set fontFamily-cursive               | set fontFamily to cursive                 | cursive for fontfamily in closedcaptions settings               | onclosedCaptionsSettingsChanged with cursive for fontfamily               | null for closedCaptions setFontFamily         |
         | Set fontFamily-proportional_serif    | set fontFamily to proportional_serif      | proportional serif for fontfamily in closedcaptions settings    | onclosedCaptionsSettingsChanged with proportional serif for fontfamily    | null for closedCaptions setFontFamily         |
         | Set fontFamily-monospaced_serif      | set fontFamily to monospaced_serif        | monospaced serif for fontfamily in closedcaptions settings      | onclosedCaptionsSettingsChanged with monospaced serif for fontfamily      | null for closedCaptions setFontFamily         |
         | Set fontFamily-proportional_sanserif | set fontFamily to proportional_sanserif   | proportional sanserif for fontfamily in closedcaptions settings | onclosedCaptionsSettingsChanged with proportional sanserif for fontfamily | null for closedCaptions setFontFamily         |
         | Set fontFamily-smallcaps             | set fontFamily to smallcaps               | smallcaps for fontfamily in closedcaptions settings             | onclosedCaptionsSettingsChanged with smallcaps for fontfamily             | null for closedCaptions setFontFamily         |
         | Set fontFamily-casual                | set fontFamily to casual                  | casual for fontfamily in closedcaptions settings                | onclosedCaptionsSettingsChanged with casual for fontfamily                | null for closedCaptions setFontFamily         |
         | Set fontSize-1                       | set fontSize to 1                         | 1 for fontSize in closedcaptions settings                       | onclosedCaptionsSettingsChanged with 1 for fontSize                       | null for closedCaptions setFontSize           |
         | Set fontSize-0.5                     | set fontSize to 0.5                       | 0.5 for fontSize in closedcaptions settings                     | onclosedCaptionsSettingsChanged with 0.5 for fontSize                     | null for closedCaptions setFontSize           |
         | Set fontSize-1.5                     | set fontSize to 1.5                       | 1.5 for fontSize in closedcaptions settings                     | onclosedCaptionsSettingsChanged with 1.5 for fontSize                     | null for closedCaptions setFontSize           |
         | Set fontColor-#ff00ff                | set fontColor to #ff00ff                  | #ff00ff for fontColor in closedcaptions settings                | onclosedCaptionsSettingsChanged with #ff00ff for fontColor                | null for closedCaptions setFontColor          |
         | Set fontEdge-raised                  | set fontEdge to raised                    | raised for fontEdge in closedcaptions settings                  | onclosedCaptionsSettingsChanged with raised for fontEdge                  | null for closedCaptions setFontEdge           |
         | Set fontEdge-none                    | set fontEdge to none                      | none for fontEdge in closedcaptions settings                    | onclosedCaptionsSettingsChanged with none for fontEdge                    | null for closedCaptions setFontEdge           |
         | Set fontEdge-depressed               | set fontEdge to depressed                 | depressed for fontEdge in closedcaptions settings               | onclosedCaptionsSettingsChanged with depressed for fontEdge               | null for closedCaptions setFontEdge           |
         | Set fontEdge-uniform                 | set fontEdge to uniform                   | uniform for fontEdge in closedcaptions settings                 | onclosedCaptionsSettingsChanged with uniform for fontEdge                 | null for closedCaptions setFontEdge           |
         | Set fontEdge-dropShadow-left         | set fontEdge to dropShadow_left           | dropShadowLeft for fontEdge in closedcaptions settings          | onclosedCaptionsSettingsChanged with dropShadowLeft for fontEdge          | null for closedCaptions setFontEdge           |
         | Set fontEdge-dropShadow-right        | set fontEdge to dropShadow_right          | dropShadowRight for fontEdge in closedcaptions settings         | onclosedCaptionsSettingsChanged with dropShadowRight for fontEdge         | null for closedCaptions setFontEdge           |
         | Set fontEdgeColor-#FFFFFF            | set fontEdgeColor to #FFFFFF              | #ffffff for fontEdgeColor in closedcaptions settings            | onclosedCaptionsSettingsChanged with #ffffff for fontEdgeColor            | null for closedCaptions setFontEdgeColor      |
         | Set backgroundColor-#7f7f7f          | set backgroundColor to #7f7f7f            | #7f7f7f for backgroundColor in closedcaptions settings          | onclosedCaptionsSettingsChanged with #7f7f7f for backgroundColor          | null for closedCaptions setBackgroundColor    |
         | Set fontOpacity-75                   | set fontOpacity to 75                     | 75 for fontOpacity in closedcaptions settings                   | onclosedCaptionsSettingsChanged with 75 for fontOpacity                   | null for closedCaptions setFontOpacity        |
         | Set backgroundOpacity-75             | set backgroundOpacity to 75               | 75 for backgroundOpacity in closedcaptions settings             | onclosedCaptionsSettingsChanged with 75 for backgroundOpacity             | null for closedCaptions setBackgroundOpacity  |
         | Set textAlign-left                   | set textAlign to left                     | left for textAlign in closedcaptions settings                   | onclosedCaptionsSettingsChanged with left for textAlign                   | null for closedCaptions setTextAlign          |
         | Set textAlign-center                 | set textAlign to center                   | center for textAlign in closedcaptions settings                 | onclosedCaptionsSettingsChanged with center for textAlign                 | null for closedCaptions setTextAlign          |
         | Set textAlign-right                  | set textAlign to right                    | right for textAlign in closedcaptions settings                  | onclosedCaptionsSettingsChanged with right for textAlign                  | null for closedCaptions setTextAlign          |
         | Set textAlignVertical-top            | set textAlignVertical to top              | top for textAlignVertical in closedcaptions settings            | onclosedCaptionsSettingsChanged with top for textAlignVertical            | null for closedCaptions setTextAlignVertical  |
         | Set textAlignVertical-middle         | set textAlignVertical to middle           | middle for textAlignVertical in closedcaptions settings         | onclosedCaptionsSettingsChanged with middle for textAlignVertical         | null for closedCaptions setTextAlignVertical  |
         | Set textAlignVertical-bottom         | set textAlignVertical to bottom           | bottom for textAlignVertical in closedcaptions settings         | onclosedCaptionsSettingsChanged with bottom for textAlignVertical         | null for closedCaptions setTextAlignVertical  |
         | Set windowColor-white                | set windowColor to white                  | white for windowColor in closedcaptions settings                | onclosedCaptionsSettingsChanged with white for windowColor                | null for closedCaptions setWindowColor        |
         | Set windowOpacity-50                 | set windowOpacity to 50                   | 50 for windowOpacity in closedcaptions settings                 | onclosedCaptionsSettingsChanged with 50 for windowOpacity                 | null for closedCaptions setWindowOpacity      |
         | Set preferredLanguages               | set preferredLanguages to spanish english | spanish for preferredLanguages in closedcaptions settings       | onclosedCaptionsSettingsChanged with spanish for preferredLanguages       | null for closedCaptions setPreferredLanguages |

   @Accessibility @coreSDK @sdk @transport
   Scenario Outline: Accessibility.closedCaptionsSettings - Positive Scenario: <Scenario> with 'null' params
      When '3rd party app' registers for the 'accessibility onClosedCaptionsSettingsChanged' event using the 'Firebolt' API
      And '3rd party app' invokes the 'Firebolt' API to 'get closedCaptions settings'
      And 1st party app invokes the 'Firebolt' API to '<Key>'
      Then 'Firebolt' platform responds to '1st party app' with '<Set_Method_Content>'
      When '3rd party app' invokes the 'Firebolt' API to 'get closedCaptions settings'
      Then 'Firebolt' platform responds with '<Method_Content>'
      And 'Firebolt' platform triggers event '<Event_Content>'

      Examples:
         | Scenario          | Key                           | Set_Method_Content                           | Method_Content                                             | Event_Content                                                        |
         | fontFamily        | set fontFamily as null        | null for closedCaptions setFontFamily        | monospaced serif for fontfamily in closedcaptions settings | onclosedCaptionsSettingsChanged with monospaced serif for fontfamily |
         | fontSize          | set fontSize as null          | null for closedCaptions setFontSize          | 1 for fontSize in closedcaptions settings                  | onclosedCaptionsSettingsChanged with 1 for fontSize                  |
         | fontColor         | set fontColor as null         | null for closedCaptions setFontColor         | #ffffff for fontColor in closedcaptions settings           | onclosedCaptionsSettingsChanged with #ff00ff for fontColor           |
         | fontEdge          | set fontEdge as null          | null for closedCaptions setFontEdge          | none for fontEdge in closedcaptions settings               | onclosedCaptionsSettingsChanged with none for fontEdge               |
         | fontEdgeColor     | set fontEdgeColor as null     | null for closedCaptions setFontEdgeColor     | #7f7f7f for fontEdgeColor in closedcaptions settings       | onclosedCaptionsSettingsChanged with #ffffff for fontEdgeColor       |
         | fontOpacity       | set fontOpacity as null       | null for closedCaptions setFontOpacity       | 100 for fontOpacity in closedcaptions settings             | onclosedCaptionsSettingsChanged with 75 for fontOpacity              |
         | backgroundColor   | set backgroundColor as null   | null for closedCaptions setBackgroundColor   | #000000 for backgroundColor in closedcaptions settings     | onclosedCaptionsSettingsChanged with #000000 for backgroundColor     |
         | backgroundOpacity | set backgroundOpacity as null | null for closedCaptions setBackgroundOpacity | 12 for backgroundOpacity in closedcaptions settings        | onclosedCaptionsSettingsChanged with 12 for backgroundOpacity        |
         | textAlign         | set textAlign as null         | null for closedCaptions setTextAlign         | center for textAlign in closedcaptions settings            | onclosedCaptionsSettingsChanged with center for textAlign            |
         | textAlignVertical | set textAlignVertical as null | null for closedCaptions setTextAlignVertical | middle for textAlignVertical in closedcaptions settings    | onclosedCaptionsSettingsChanged with middle for textAlignVertical    |
         | windowColor       | set windowColor as null       | null for closedCaptions setWindowColor       | #000000 for windowColor in closedcaptions settings         | onclosedCaptionsSettingsChanged with white for windowColor           |
         | windowOpacity     | set windowOpacity as null     | null for closedCaptions setWindowOpacity     | 0 for windowOpacity in closedcaptions settings             | onclosedCaptionsSettingsChanged with 0 for windowOpacity             |

   @Accessibility @coreSDK @sdk @transport
   Scenario Outline: Accessibility.voiceGuidanceSettings - Positive Scenario: <Scenario>
      When '3rd party app' registers for the 'accessibility onVoiceGuidanceSettingsChanged' event using the 'Firebolt' API
      And '3rd party app' invokes the 'Firebolt' API to 'get voiceGuidance settings'
      And 1st party app invokes the 'Firebolt' API to '<Key>'
      Then 'Firebolt' platform responds to '1st party app' with '<Set_Method_Content>'
      When '3rd party app' invokes the 'Firebolt' API to 'get voiceGuidance settings'
      Then 'Firebolt' platform responds with '<Method_Content>'
      And 'Firebolt' platform triggers event '<Event_Content>'


      Examples:
         | Scenario              | Key                   | Method_Content                          | Event_Content                              | Set_Method_Content                |
         | Disable voiceguidance | disable voiceGuidance | disabled voiceGuidance settings         | onvoiceGuidanceSettings with disabled      | null for voiceGuidance setEnabled |
         | Enable voiceguidance  | enable voiceGuidance  | enabled voiceGuidance settings          | onvoiceGuidanceSettings with enabled       | null for voiceGuidance setEnabled |
         | Set speed-1           | set speed as 1        | 1 for speed in voiceGuidance settings   | onvoiceGuidanceSettings with 1 for speed   | null for voiceGuidance setSpeed   |
         | Set speed-0.5         | set speed as 0.5      | 0.5 for speed in voiceGuidance settings | onvoiceGuidanceSettings with 0.5 for speed | null for voiceGuidance setSpeed   |
         | Set speed-2           | set speed as 2        | 2 for speed in voiceGuidance settings   | onvoiceGuidanceSettings with 2 for speed   | null for voiceGuidance setSpeed   |

   @Accessibility @coreSDK @sdk @transport
   Scenario Outline: Accessibility.audioDescriptionSettings - Positive Scenario: <Scenario>
      When '3rd party app' registers for the 'accessibility onAudioDescriptionSettingsChanged' event using the 'Firebolt' API
      And '3rd party app' invokes the 'Firebolt' API to 'get audioDescriptionSettings settings'
      And 1st party app invokes the 'Firebolt' API to '<Key>'
      Then 'Firebolt' platform responds to '1st party app' with 'null for audioDescriptions setEnabled'
      When '3rd party app' invokes the 'Firebolt' API to 'get audioDescriptionSettings settings'
      Then 'Firebolt' platform responds with '<Method_Content>'
      And 'Firebolt' platform triggers event '<Event_Content>'

      Examples:
         | Scenario                         | Key                      | Method_Content                     | Event_Content                            |
         | Disable audioDescriptionSettings | disable audioDescription | disabled audioDescription settings | onaudioDescriptionSettings with disabled |
         | Enable audioDescriptionSettings  | enable audioDescription  | enabled audioDescription settings  | onaudioDescriptionSettings with enabled  |

   @Accessibility @coreSDK @sdk @transport
   Scenario: Accessibility.onClosedCaptionsSettingsChanged event - Positive Scenario: Clear listeners
      When '3rd party app' registers for the 'accessibility onClosedCaptionsSettingsChanged' event using the 'Firebolt' API
      And I clear 'accessibility onClosedCaptionsSettingsChanged event' listeners
      And 1st party app invokes the 'Firebolt' API to 'disable closedCaptions'
      Then 'Firebolt' platform responds to '1st party app' with 'null for closedCaptions setEnabled'  
      And 'Firebolt' platform does not trigger event for 'onclosedCaptionsSettingsChanged'

   @Accessibility @coreSDK @sdk @transport
   Scenario Outline: Accessibility.closedCaptions - Positive Scenario: <Scenario>
      When '3rd party app' registers for the 'accessibility onClosedCaptionsSettingsChanged' event using the 'Firebolt' API
      And 1st party app invokes the 'Firebolt' API to '<Set_Method_Key>'
      Then 'Firebolt' platform responds to '1st party app' with '<Set_Method_Content>'
      When '3rd party app' invokes the 'Firebolt' API to 'get closedCaptions'
      Then 'Firebolt' platform responds with '<Method_Content>'
      And 'Firebolt' platform triggers event '<Event_Content>'

      Examples:
         | Scenario                           | Set_Method_Key                        | Method_Content                                                    | Event_Content                                                          | Set_Method_Content                           |
         | Enable closedcaptions              | enable closedCaptions                 | enabled for accessibility closedCaptions                          | onclosedCaptionsSettingsChanged with enabled                           | null for closedCaptions setEnabled           |
         | Set fontFamily-monospaced_sanserif | set fontFamily to monospaced_sanserif | monospace sanserif for fontfamily in accessibility closedcaptions | onclosedCaptionsSettingsChanged with monospace sanserif for fontfamily | null for closedCaptions setFontFamily        |
         | Set fontSize-1                     | set fontSize to 1                     | 1 for fontSize in accessibility closedcaptions                    | onclosedCaptionsSettingsChanged with 1 for fontSize                    | null for closedCaptions setFontSize          |
         | Set fontColor-#ffffff              | set fontColor to #ffffff              | #ffffff for fontColor in accessibility closedcaptions             | onclosedCaptionsSettingsChanged with #ffffff for fontColor             | null for closedCaptions setFontColor         |
         | Set fontEdge-raised                | set fontEdge to raised                | raised for fontEdge in accessibility closedcaptions               | onclosedCaptionsSettingsChanged with raised for fontEdge               | null for closedCaptions setFontEdge          |
         | Set fontEdgeColor-#7f7f7f          | set fontEdgeColor to #7f7f7f          | #7f7f7f for fontEdgeColor in accessibility closedcaptions         | onclosedCaptionsSettingsChanged with #7f7f7f for fontEdgeColor         | null for closedCaptions setFontEdgeColor     |
         | Set backgroundColor-#000000        | set backgroundColor to #000000        | #000000 for backgroundColor in accessibility closedcaptions       | onclosedCaptionsSettingsChanged with #000000 for backgroundColor       | null for closedCaptions setBackgroundColor   |
         | Set fontOpacity-100                | set fontOpacity to 100                | 100 for fontOpacity in accessibility closedcaptions               | onclosedCaptionsSettingsChanged with 100 for fontOpacity               | null for closedCaptions setFontOpacity       |
         | Set backgroundOpacity-100          | set backgroundOpacity to 100          | 100 for backgroundOpacity in accessibility closedcaptions         | onclosedCaptionsSettingsChanged with 100 for backgroundOpacity         | null for closedCaptions setBackgroundOpacity |
         | Set textAlign-left                 | set textAlign to left                 | left for textAlign in accessibility closedcaptions                | onclosedCaptionsSettingsChanged with left for textAlign                | null for closedCaptions setTextAlign         |
         | Set textAlignVertical-top          | set textAlignVertical to top          | top for textAlignVertical in accessibility closedcaptions         | onclosedCaptionsSettingsChanged with top for textAlignVertical         | null for closedCaptions setTextAlignVertical |
         | Set windowColor-#7f7f7f            | set windowColor to #7f7f7f            | #7f7f7f for windowColor in accessibility closedcaptions           | onclosedCaptionsSettingsChanged with #7f7f7f for windowColor           | null for closedCaptions setWindowColor       |
         | Set windowOpacity-40               | set windowOpacity to 40               | 40 for windowOpacity in accessibility closedcaptions              | onclosedCaptionsSettingsChanged with 40 for windowOpacity              | null for closedCaptions setWindowOpacity     |

   @Accessibility @coreSDK @sdk @transport
   Scenario Outline: Accessibility.voiceGuidance - Positive Scenario: <Scenario>
      When '3rd party app' registers for the 'accessibility onVoiceGuidanceSettingsChanged' event using the 'Firebolt' API
      And 1st party app invokes the 'Firebolt' API to '<Set_Method_Key>'
      Then 'Firebolt' platform responds to '1st party app' with '<Set_Method_Content>'
      When '3rd party app' invokes the 'Firebolt' API to 'get voiceGuidance'
      Then 'Firebolt' platform responds with '<Method_Content>'
      And 'Firebolt' platform triggers event '<Event_Content>'

      Examples:
         | Scenario              | Set_Method_Key        | Method_Content               | Event_Content                            | Set_Method_Content                |
         | Disable voiceguidance | disable voiceGuidance | disabled voiceGuidance       | onvoiceGuidanceSettings with disabled    | null for voiceGuidance setEnabled |
         | Enable voiceguidance  | enable voiceGuidance  | enabled voiceGuidance        | onvoiceGuidanceSettings with enabled     | null for voiceGuidance setEnabled |
         | Set speed-1           | set speed as 1        | 1 for speed in voiceGuidance | onvoiceGuidanceSettings with 1 for speed | null for voiceGuidance setSpeed   |