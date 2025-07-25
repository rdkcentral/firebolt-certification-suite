@ClosedCaptions @manageSDK
Feature: ClosedCaptions_SDK

    Background: Launch FCA for 'ClosedCaptions'
        Given the environment has been set up for 'ClosedCaptions' tests
        And 3rd party 'certification' app is launched

    @sdk
    Scenario Outline: ClosedCaptions.<Method> - Positive Scenario: <Scenario> with undefined params
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Method_Validation_Key>'

        Examples:
            | Scenario               | Method                | API_Key                                   | Method_Validation_Key                            |
            | Set enabled            | setEnabled            | enable closedCaptions with no parameters  | enabled for closedCaptions setEnabled            |
            | Set fontFamily         | setFontFamily         | set fontFamily with no parameters         | casual for closedCaptions setFontFamily          |
            | Set fontSize           | setFontSize           | set fontSize with no parameters           | 1.5 for closedcaptions setFontSize               |
            | Set fontColor          | setFontColor          | set fontColor with no parameters          | #ff00ff for closedcaptions setFontColor          |
            | Set fontEdge           | setFontEdge           | set fontEdge with no parameters           | dropShadow right for closedcaptions setFontEdge  |
            | Set fontEdgeColor      | setFontEdgeColor      | set fontEdgeColor with no parameters      | #ffffff for closedcaptions setFontEdgeColor      |
            | Set fontOpacity        | setFontOpacity        | set fontOpacity with no parameters        | 75 for closedcaptions setFontOpacity             |
            | Set backgroundColor    | setBackgroundColor    | set backgroundColor with no parameters    | #7f7f7f for closedcaptions setBackgroundColor    |
            | Set backgroundOpacity  | setBackgroundOpacity  | set backgroundOpacity with no parameters  | 75 for closedcaptions setBackgroundOpacity       |
            | Set textAlign          | setTextAlign          | set textAlign with no parameters          | right for closedcaptions setTextAlign            |
            | Set textAlignVertical  | setTextAlignVertical  | set textAlignVertical with no parameters  | bottom for closedcaptions setTextAlignVertical   |
            | Set windowColor        | setWindowColor        | set windowColor with no parameters        | white for closedcaptions setWindowColor          |
            | Set windowOpacity      | setWindowOpacity      | set windowOpacity with no parameters      | 50 for closedcaptions setWindowOpacity           |
            | Set preferredLanguages | setPreferredLanguages | set preferredLanguages with no parameters | spanish for closedcaptions setPreferredLanguages |