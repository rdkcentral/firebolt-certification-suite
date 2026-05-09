@ClosedCaptions @ClosedCaptionsManage @manageSDK
Feature: ClosedCaptions_Manage

    Background: Launch FCA for 'ClosedCaptions'
        Given the environment has been set up for 'ClosedCaptions' tests

    @sdk @transport
    Scenario Outline: ClosedCaptions.<Method> - Positive Scenario: <Scenario>
        Given we test the 'CLOSED_CAPTIONS_SETTINGS' getters and setters '<Method>' to '<Value>'
        And '1st party app' registers for the 'Firebolt' event
        When 1st party app invokes the 'Firebolt' API to set value
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
    Scenario Outline: Closedcaptions.<Method> - Positive Scenario: <Method> with 'null' params
        Given we test the 'CLOSEDCAPTIONS_SETTINGS_SET_TO_NULL' getters and setters '<Method>' to 'null'
        When '1st party app' registers for the 'Firebolt' event
        And 1st party app invokes the 'Firebolt' API to set value
        Then 'Firebolt' platform responds to '1st party app' set API
        When '1st party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '1st party app' get API
        And 'Firebolt' platform triggers '1st party app' event
  
        Examples:
            | Method            |
            | fontFamily        |
            | fontSize          |
            | fontColor         |
            | fontEdge          |
            | fontEdgeColor     |
            | fontOpacity       |
            | backgroundColor   |
            | backgroundOpacity |
            | textAlign         |
            | textAlignVertical |
            | windowColor       |
            | windowOpacity     |

    @sdk @transport
    Scenario Outline: ClosedCaptions.<Method> - Negative Scenario: <Scenario> expecting error
        Given we test the 'CLOSED_CAPTIONS_SETTINGS' getters and setters '<Method>' to '<Value>'
        When 1st party app invokes the 'Firebolt' API to set invalid value
        Then 'Firebolt' platform responds to '1st party app' set API with 'INVALID_PARAMS'

        Examples:
            | Scenario                    | Method             | Value      |
            | Set enabled-test            | enabled            | test       |
            | Set enabled-123             | enabled            | 123        |
            | Set fontFamily-123          | fontFamily         | 123        |
            | Set fontFamily-true         | fontFamily         | true       |
            | Set fontSize-true           | fontSize           | true       |
            | Set fontSize-test           | fontSize           | test       |
            | Set fontSize-true           | fontSize           | true       |
            | Set fontSize-0.25           | fontSize           | 0.25       |
            | Set fontFamily-sans-serif   | fontFamily         | sans-serif |
            | Set fontEdge-123            | fontEdge           | 123        |
            | Set fontEdge-true           | fontEdge           | true       |
            | Set fontEdge-solid          | fontEdge           | solid      |
            | Set preferredLanguages-true | preferredLanguages | true       |
            | Set preferredLanguages-123  | preferredLanguages | 123        |
            | Set preferredLanguages-test | preferredLanguages | test       |
            | Set windowColor-123         | windowColor        | 123        |
            | Set windowOpacity-true      | windowOpacity      | true       |
            | Set fontEdgeColor-123       | fontEdgeColor      | 123        |
            | Set fontEdgeColor-true      | fontEdgeColor      | true       |
            | Set backgroundColor-123     | backgroundColor    | 123        |
            | Set backgroundColor-true    | backgroundColor    | true       |
            | Set textAlign-123           | textAlign          | 123        |
            | Set textAlign-true          | textAlign          | true       |
            | Set textAlignVertical-123   | textAlignVertical  | 123        |
            | Set textAlignVertical-true  | textAlignVertical  | true       |
            | Set fontColor-123           | fontColor          | 123        |
            | Set fontColor-true          | fontColor          | true       |
            | Set fontOpacity-120         | fontOpacity        | 120        |
            | Set fontOpacity-test        | fontOpacity        | test       |
            | Set fontOpacity-true        | fontOpacity        | true       |
            | Set backgroundOpacity-120   | backgroundOpacity  | 120        |
            | Set backgroundOpacity-test  | backgroundOpacity  | test       |
            | Set backgroundOpacity-true  | backgroundOpacity  | true       |