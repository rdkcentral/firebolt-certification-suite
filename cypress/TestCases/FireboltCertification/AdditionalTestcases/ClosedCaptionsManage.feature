Feature: ClosedCaptions_Manage

    Background: Launch FCA for 'ClosedCaptions'
        Given the environment has been set up for 'ClosedCaptions' tests
        And 3rd party 'certification' app is launched

    # Below scenario can be implemented by respective config module to return error or default value 
    # For all the below testcases we are passing invalid string in params but there is no enum value specified so the platform can decide to either return error or default value 
    @ClosedCaptions @manageSDK
    Scenario Outline: ClosedCaptions.<Method> - Setting random string values: <Scenario>
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Method_Validation_key>'

        Examples:
            | Scenario                    | Method                | API_Key                            | Method_Validation_key                                   |
            | Set fontFamily-test         | setFontFamily         | set fontFamily to test             | custom error for closedCaptions setFontFamily           |
            | Set fontEdgeColor-test      | setFontEdgeColor      | set fontEdgeColor to test          | invalid params for closedcaptions setFontEdgeColor      |
            | Set backgroundColor-test    | setBackgroundColor    | set backgroundColor to test        | invalid params for closedcaptions setBackgroundColor    |
            | Set textAlign-top           | setTextAlign          | set textAlign to top               | invalid params for closedcaptions setTextAlign          |
            | Set textAlignVertical-right | setTextAlignVertical  | set textAlignVertical to right     | invalid params for closedcaptions setTextAlignVertical  |
            | Set fontColor-test          | setFontColor          | set fontColor to test              | invalid params for closedcaptions setFontColor          |




