Feature: Accessibility

  @initialization
  Scenario: Launch FCA for 'Accessibility'
    Given the environment has been set up for 'Accessibility' tests
    And 3rd party 'certification' app is launched

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
      | Scenario          | Key                           | Set_Method_Content                           | Method_Content                                         | Event_Content                                                        |
      | fontFamily        | set fontFamily as null        | null for closedCaptions setFontFamily        | undefined fontfamily in closedcaptions settings        | onclosedCaptionsSettingsChanged with monospaced serif for fontfamily |
      | fontSize          | set fontSize as null          | null for closedCaptions setFontSize          | undefined fontSize in closedcaptions settings          | onclosedCaptionsSettingsChanged with 1 for fontSize                  |
      | fontColor         | set fontColor as null         | null for closedCaptions setFontColor         | undefined fontColor in closedcaptions settings         | onclosedCaptionsSettingsChanged with #ff00ff for fontColor           |
      | fontEdge          | set fontEdge as null          | null for closedCaptions setFontEdge          | undefined fontEdge in closedcaptions settings          | onclosedCaptionsSettingsChanged with none for fontEdge               |
      | fontEdgeColor     | set fontEdgeColor as null     | null for closedCaptions setFontEdgeColor     | undefined fontEdgeColor in closedcaptions settings     | onclosedCaptionsSettingsChanged with #ffffff for fontEdgeColor       |
      | fontOpacity       | set fontOpacity as null       | null for closedCaptions setFontOpacity       | undefined fontOpacity in closedcaptions settings       | onclosedCaptionsSettingsChanged with 75 for fontOpacity              |
      | backgroundColor   | set backgroundColor as null   | null for closedCaptions setBackgroundColor   | undefined backgroundColor in closedcaptions settings   | onclosedCaptionsSettingsChanged with #000000 for backgroundColor     |
      | backgroundOpacity | set backgroundOpacity as null | null for closedCaptions setBackgroundOpacity | undefined backgroundOpacity in closedcaptions settings | onclosedCaptionsSettingsChanged with 12 for backgroundOpacity        |
      | textAlign         | set textAlign as null         | null for closedCaptions setTextAlign         | undefined textAlign in closedcaptions settings         | onclosedCaptionsSettingsChanged with center for textAlign            |
      | textAlignVertical | set textAlignVertical as null | null for closedCaptions setTextAlignVertical | undefined textAlignVertical in closedcaptions settings | onclosedCaptionsSettingsChanged with middle for textAlignVertical    |
      | windowColor       | set windowColor as null       | null for closedCaptions setWindowColor       | undefined windowColor in closedcaptions settings       | onclosedCaptionsSettingsChanged with white for windowColor           |
      | windowOpacity     | set windowOpacity as null     | null for closedCaptions setWindowOpacity     | undefined windowOpacity in closedcaptions settings     | onclosedCaptionsSettingsChanged with 0 for windowOpacity             |
