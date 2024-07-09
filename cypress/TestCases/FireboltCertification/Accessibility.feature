@Accessibility @coreSDK
Feature: Accessibility

   Background: Launch FCA for 'Accessibility'
      Given the environment has been set up for 'Accessibility' tests
      And 3rd party 'certification' app is launched

   
   Scenario Outline: Accessibility.closedCaptionsSettings - Positive Scenario: <Scenario>
      When '3rd party app' registers for the 'accessibility onClosedCaptionsSettingsChanged' event using the 'Firebolt' API
      And '3rd party app' invokes the 'Firebolt' API to 'get closedCaptions settings'
      And 1st party app invokes the 'Firebolt' API to '<Key>'
      Then 'Firebolt' platform responds to '1st party app' for '<Key>'
      When '3rd party app' invokes the 'Firebolt' API to 'get closedCaptions settings'
      Then 'Firebolt' platform responds with '<Method_Content>'
      And 'Firebolt' platform triggers event '<Event_Content>'

      @Sev0
      Examples:
         | Scenario               | Key                    | Method_Content                       | Event_Content                                 |
         | Disable closedcaptions | disable closedCaptions | disabled for closedCaptions settings | onclosedCaptionsSettingsChanged with disabled |
         | Enable closedcaptions  | enable closedCaptions  | enabled for closedCaptions settings  | onclosedCaptionsSettingsChanged with enabled  |
      @Sev1
      Examples:
         | Scenario                             | Key                                     | Method_Content                                                  | Event_Content                                                             |
         | Set fontFamily-monospaced_sanserif   | set fontFamily to monospaced_sanserif   | monospace sanserif for fontfamily in closedcaptions settings    | onclosedCaptionsSettingsChanged with monospace sanserif for fontfamily    |
         | Set fontFamily-cursive               | set fontFamily to cursive               | cursive for fontfamily in closedcaptions settings               | onclosedCaptionsSettingsChanged with cursive for fontfamily               |
         | Set fontFamily-proportional_serif    | set fontFamily to proportional_serif    | proportional serif for fontfamily in closedcaptions settings    | onclosedCaptionsSettingsChanged with proportional serif for fontfamily    |
         | Set fontFamily-monospaced_serif      | set fontFamily to monospaced_serif      | monospaced serif for fontfamily in closedcaptions settings      | onclosedCaptionsSettingsChanged with monospaced serif for fontfamily      |
         | Set fontFamily-proportional_sanserif | set fontFamily to proportional_sanserif | proportional sanserif for fontfamily in closedcaptions settings | onclosedCaptionsSettingsChanged with proportional sanserif for fontfamily |
         | Set fontFamily-smallcaps             | set fontFamily to smallcaps             | smallcaps for fontfamily in closedcaptions settings             | onclosedCaptionsSettingsChanged with smallcaps for fontfamily             |
         | Set fontFamily-casual                | set fontFamily to casual                | casual for fontfamily in closedcaptions settings                | onclosedCaptionsSettingsChanged with casual for fontfamily                |
         | Set fontSize-1                       | set fontSize to 1                       | 1 for fontSize in closedcaptions settings                       | onclosedCaptionsSettingsChanged with 1 for fontSize                       |
         | Set fontSize-0.5                     | set fontSize to 0.5                     | 0.5 for fontSize in closedcaptions settings                     | onclosedCaptionsSettingsChanged with 0.5 for fontSize                     |
         | Set fontSize-1.5                     | set fontSize to 1.5                     | 1.5 for fontSize in closedcaptions settings                     | onclosedCaptionsSettingsChanged with 1.5 for fontSize                     |
         | Set fontColor-#ff00ff                | set fontColor to #ff00ff                | #ff00ff for fontColor in closedcaptions settings                | onclosedCaptionsSettingsChanged with #ff00ff for fontColor                |
         | Set fontEdge-raised                  | set fontEdge to raised                  | raised for fontEdge in closedcaptions settings                  | onclosedCaptionsSettingsChanged with raised for fontEdge                  |
         | Set fontEdge-none                    | set fontEdge to none                    | none for fontEdge in closedcaptions settings                    | onclosedCaptionsSettingsChanged with none for fontEdge                    |
         | Set fontEdge-depressed               | set fontEdge to depressed               | depressed for fontEdge in closedcaptions settings               | onclosedCaptionsSettingsChanged with depressed for fontEdge               |
         | Set fontEdge-uniform                 | set fontEdge to uniform                 | uniform for fontEdge in closedcaptions settings                 | onclosedCaptionsSettingsChanged with uniform for fontEdge                 |
         | Set fontEdge-dropShadow-left         | set fontEdge to dropShadow_left         | dropShadowLeft for fontEdge in closedcaptions settings          | onclosedCaptionsSettingsChanged with dropShadowLeft for fontEdge          |
         | Set fontEdge-dropShadow-right        | set fontEdge to dropShadow_right        | dropShadowRight for fontEdge in closedcaptions settings         | onclosedCaptionsSettingsChanged with dropShadowRight for fontEdge         |
         | Set fontEdgeColor-#FFFFFF            | set fontEdgeColor to #FFFFFF            | #ffffff for fontEdgeColor in closedcaptions settings            | onclosedCaptionsSettingsChanged with #ffffff for fontEdgeColor            |
         | Set backgroundColor-#7f7f7f          | set backgroundColor to #7f7f7f          | #7f7f7f for backgroundColor in closedcaptions settings          | onclosedCaptionsSettingsChanged with #7f7f7f for backgroundColor          |
         | Set fontOpacity-75                   | set fontOpacity to 75                   | 75 for fontOpacity in closedcaptions settings                   | onclosedCaptionsSettingsChanged with 75 for fontOpacity                   |
         | Set backgroundOpacity-75             | set backgroundOpacity to 75             | 75 for backgroundOpacity in closedcaptions settings             | onclosedCaptionsSettingsChanged with 75 for backgroundOpacity             |
      @Sev2
      Examples:
         | Scenario                     | Key                                       | Method_Content                                            | Event_Content                                                       |
         | Set textAlign-left           | set textAlign to left                     | left for textAlign in closedcaptions settings             | onclosedCaptionsSettingsChanged with left for textAlign             |
         | Set textAlign-center         | set textAlign to center                   | center for textAlign in closedcaptions settings           | onclosedCaptionsSettingsChanged with center for textAlign           |
         | Set textAlign-right          | set textAlign to right                    | right for textAlign in closedcaptions settings            | onclosedCaptionsSettingsChanged with right for textAlign            |
         | Set textAlignVertical-top    | set textAlignVertical to top              | top for textAlignVertical in closedcaptions settings      | onclosedCaptionsSettingsChanged with top for textAlignVertical      |
         | Set textAlignVertical-middle | set textAlignVertical to middle           | middle for textAlignVertical in closedcaptions settings   | onclosedCaptionsSettingsChanged with middle for textAlignVertical   |
         | Set textAlignVertical-bottom | set textAlignVertical to bottom           | bottom for textAlignVertical in closedcaptions settings   | onclosedCaptionsSettingsChanged with bottom for textAlignVertical   |
         | Set windowColor-white        | set windowColor to white                  | white for windowColor in closedcaptions settings          | onclosedCaptionsSettingsChanged with white for windowColor          |
         | Set windowOpacity-50         | set windowOpacity to 50                   | 50 for windowOpacity in closedcaptions settings           | onclosedCaptionsSettingsChanged with 50 for windowOpacity           |
         | Set preferredLanguages       | set preferredLanguages to spanish english | spanish for preferredLanguages in closedcaptions settings | onclosedCaptionsSettingsChanged with spanish for preferredLanguages |

   
   Scenario Outline: Accessibility.closedCaptionsSettings - Positive Scenario: <Scenario> with 'null' params
      When '3rd party app' registers for the 'accessibility onClosedCaptionsSettingsChanged' event using the 'Firebolt' API
      And '3rd party app' invokes the 'Firebolt' API to 'get closedCaptions settings'
      And 1st party app invokes the 'Firebolt' API to '<Key>'
      Then 'Firebolt' platform responds to '1st party app' for '<Key>'
      When '3rd party app' invokes the 'Firebolt' API to 'get closedCaptions settings'
      Then 'Firebolt' platform responds with '<Method_Content>'
      And 'Firebolt' platform triggers event '<Event_Content>'

      @Sev2 @sdk @transport
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

   
   Scenario Outline: Accessibility.voiceGuidanceSettings - Positive Scenario: <Scenario>
      When '3rd party app' registers for the 'accessibility onVoiceGuidanceSettingsChanged' event using the 'Firebolt' API
      And '3rd party app' invokes the 'Firebolt' API to 'get voiceGuidance settings'
      And 1st party app invokes the 'Firebolt' API to '<Key>'
      Then 'Firebolt' platform responds to '1st party app' for '<Key>'
      When '3rd party app' invokes the 'Firebolt' API to 'get voiceGuidance settings'
      Then 'Firebolt' platform responds with '<Method_Content>'
      And 'Firebolt' platform triggers event '<Event_Content>'


      @Sev0 @sdk @transport
      Examples:
         | Scenario              | Key                   | Method_Content                  | Event_Content                         |
         | Disable voiceguidance | disable voiceGuidance | disabled voiceGuidance settings | onvoiceGuidanceSettings with disabled |
         | Enable voiceguidance  | enable voiceGuidance  | enabled voiceGuidance settings  | onvoiceGuidanceSettings with enabled  |

      @Sev1 @sdk @transport
      Examples:
         | Scenario      | Key              | Method_Content                          | Event_Content                              |
         | Set speed-1   | set speed as 1   | 1 for speed in voiceGuidance settings   | onvoiceGuidanceSettings with 1 for speed   |
         | Set speed-0.5 | set speed as 0.5 | 0.5 for speed in voiceGuidance settings | onvoiceGuidanceSettings with 0.5 for speed |
         | Set speed-2   | set speed as 2   | 2 for speed in voiceGuidance settings   | onvoiceGuidanceSettings with 2 for speed   |

   @sdk @transport @Sev1
   Scenario Outline: Accessibility.audioDescriptionSettings - Positive Scenario: <Scenario>
      When '3rd party app' registers for the 'accessibility onAudioDescriptionSettingsChanged' event using the 'Firebolt' API
      And '3rd party app' invokes the 'Firebolt' API to 'get audioDescriptionSettings settings'
      And 1st party app invokes the 'Firebolt' API to '<Key>'
      Then 'Firebolt' platform responds to '1st party app' for '<Key>'
      When '3rd party app' invokes the 'Firebolt' API to 'get audioDescriptionSettings settings'
      Then 'Firebolt' platform responds with '<Method_Content>'
      And 'Firebolt' platform triggers event '<Event_Content>'

      Examples:
         | Scenario                         | Key                      | Method_Content                     | Event_Content                            |
         | Disable audioDescriptionSettings | disable audioDescription | disabled audioDescription settings | onaudioDescriptionSettings with disabled |
         | Enable audioDescriptionSettings  | enable audioDescription  | enabled audioDescription settings  | onaudioDescriptionSettings with enabled  |

   @sdk @transport @requiresPlatformImplementation @Sev2
   Scenario: Accessibility.onClosedCaptionsSettingsChanged event - Positive Scenario: Clear listeners
      When '3rd party app' registers for the 'accessibility onClosedCaptionsSettingsChanged' event using the 'Firebolt' API
      And I clear 'accessibility onClosedCaptionsSettingsChanged event' listeners
      And 1st party app invokes the 'Firebolt' API to 'disable closedCaptions'
      Then 'Firebolt' platform responds to '1st party app' for 'disable closedCaptions'
      And 'Firebolt' platform does not trigger event for 'onclosedCaptionsSettingsChanged'

   
   Scenario Outline: Accessibility.closedCaptions - Positive Scenario: <Scenario>
      When '3rd party app' registers for the 'accessibility onClosedCaptionsSettingsChanged' event using the 'Firebolt' API
      And 1st party app invokes the 'Firebolt' API to '<Set_Method_Key>'
      Then 'Firebolt' platform responds to '1st party app' for '<Set_Method_Key>'
      When '3rd party app' invokes the 'Firebolt' API to 'get closedCaptions'
      Then 'Firebolt' platform responds with '<Method_Content>'
      And 'Firebolt' platform triggers event '<Event_Content>'

      @Sev0 @sdk @transport
      Examples:
         | Scenario              | Set_Method_Key        | Method_Content                           | Event_Content                                |
         | Enable closedcaptions | enable closedCaptions | enabled for accessibility closedCaptions | onclosedCaptionsSettingsChanged with enabled |

      @Sev1 @sdk @transport
      Examples:
         | Scenario                           | Set_Method_Key                        | Method_Content                                                    | Event_Content                                                          |
         | Set fontFamily-monospaced_sanserif | set fontFamily to monospaced_sanserif | monospace sanserif for fontfamily in accessibility closedcaptions | onclosedCaptionsSettingsChanged with monospace sanserif for fontfamily |
         | Set fontSize-1                     | set fontSize to 1                     | 1 for fontSize in accessibility closedcaptions                    | onclosedCaptionsSettingsChanged with 1 for fontSize                    |
         | Set fontColor-#ffffff              | set fontColor to #ffffff              | #ffffff for fontColor in accessibility closedcaptions             | onclosedCaptionsSettingsChanged with #ffffff for fontColor             |
         | Set fontEdge-raised                | set fontEdge to raised                | raised for fontEdge in accessibility closedcaptions               | onclosedCaptionsSettingsChanged with raised for fontEdge               |
         | Set fontEdgeColor-#7f7f7f          | set fontEdgeColor to #7f7f7f          | #7f7f7f for fontEdgeColor in accessibility closedcaptions         | onclosedCaptionsSettingsChanged with #7f7f7f for fontEdgeColor         |
         | Set backgroundColor-#000000        | set backgroundColor to #000000        | #000000 for backgroundColor in accessibility closedcaptions       | onclosedCaptionsSettingsChanged with #000000 for backgroundColor       |
         | Set fontOpacity-100                | set fontOpacity to 100                | 100 for fontOpacity in accessibility closedcaptions               | onclosedCaptionsSettingsChanged with 100 for fontOpacity               |
         | Set backgroundOpacity-100          | set backgroundOpacity to 100          | 100 for backgroundOpacity in accessibility closedcaptions         | onclosedCaptionsSettingsChanged with 100 for backgroundOpacity         |
         | Set textAlign-left                 | set textAlign to left                 | left for textAlign in accessibility closedcaptions                | onclosedCaptionsSettingsChanged with left for textAlign                |
         | Set textAlignVertical-top          | set textAlignVertical to top          | top for textAlignVertical in accessibility closedcaptions         | onclosedCaptionsSettingsChanged with top for textAlignVertical         |
         | Set windowColor-#7f7f7f            | set windowColor to #7f7f7f            | #7f7f7f for windowColor in accessibility closedcaptions           | onclosedCaptionsSettingsChanged with #7f7f7f for windowColor           |
         | Set windowOpacity-40               | set windowOpacity to 40               | 40 for windowOpacity in accessibility closedcaptions              | onclosedCaptionsSettingsChanged with 40 for windowOpacity              |

   
   Scenario Outline: Accessibility.voiceGuidance - Positive Scenario: <Scenario>
      When '3rd party app' registers for the 'accessibility onVoiceGuidanceSettingsChanged' event using the 'Firebolt' API
      And 1st party app invokes the 'Firebolt' API to '<Set_Method_Key>'
      Then 'Firebolt' platform responds to '1st party app' for '<Set_Method_Key>'
      When '3rd party app' invokes the 'Firebolt' API to 'get voiceGuidance'
      Then 'Firebolt' platform responds with '<Method_Content>'
      And 'Firebolt' platform triggers event '<Event_Content>'

      @Sev0 @sdk @transport
      Examples:
         | Scenario              | Set_Method_Key        | Method_Content         | Event_Content                         |
         | Disable voiceguidance | disable voiceGuidance | disabled voiceGuidance | onvoiceGuidanceSettings with disabled |
         | Enable voiceguidance  | enable voiceGuidance  | enabled voiceGuidance  | onvoiceGuidanceSettings with enabled  |

      @Sev1 @sdk @transport
      Examples:
         | Scenario    | Set_Method_Key | Method_Content               | Event_Content                            |
         | Set speed-1 | set speed as 1 | 1 for speed in voiceGuidance | onvoiceGuidanceSettings with 1 for speed |