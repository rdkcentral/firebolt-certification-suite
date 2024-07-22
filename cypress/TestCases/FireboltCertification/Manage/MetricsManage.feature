Feature: Metrics_Manage

    Background: Launch FCA for 'Metrics'
        Given the environment has been set up for 'Metrics' tests

    # object params?
    @Metrics @manageSDK
    Scenario Outline: Metrics.event - Positive Scenario: <Scenario>
        Given we test the 'METRICS_EVENT' getters and setters '<Method>' to '<Value>'
        When 1st party app invokes the 'Firebolt' API to set '<Method>' to '<Value>'
        And 'Firebolt' platform responds to '1st party app' set API

        Examples:
            | Scenario                          | Method | Value |
            | Send foo event                    | event  |       |
            | Send foo event with null value    | event  |       |
            | Send foo event with boolean value | event  |       |
            | Send data as empty object         | event  |       |
            | Send schema as empty string       | event  |       |

    # object params?
    @Metrics @manageSDK
    Scenario Outline: Metrics.event - Positive Scenario: <Scenario>
        Given we test the 'METRICS_EVENT' getters and setters '<Method>' to '<Value>'
        When 1st party app invokes the 'Firebolt' API to set '<Method>' to invalid '<Value>'
        And 'Firebolt' platform responds to '1st party app' set API with 'INVALID_TYPE_PARAMS'

        Examples:
            | Scenario              | Method | Value |
            | Schema as boolean     | event  |       |
            | Schema as integer     | event  |       |
            | Schema as invalid uri | event  |       |
            | Data as string        | event  |       |
            | Data as boolean       | event  |       |
            | Data as integer       | event  |       |

    @Metrics @manageSDK
    Scenario Outline: Metrics.event - Positive Scenario: <Scenario>
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<API_Key>'

        Examples:
            | Scenario                          | API_Key                                             |
            | Send foo event                    | send metrics event with schema and foo data         |
            | Send foo event with null value    | send metrics event with schema and null foo data    |
            | Send foo event with boolean value | send metrics event with schema and boolean foo data |
            | Send data as empty object         | send metrics event with empty data                  |
            | Send schema as empty string       | send metrics event with empty schema                |


    @Metrics @manageSDK
    Scenario Outline: Metrics.event - Negative Scenario: <Scenario> expecting error
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'invalid params for metrics event'

        Examples:
            | Scenario                | API_Key                                    |
            | Schema as boolean       | send metrics event with schema as boolean  |
            | Schema as integer       | send metrics event with schema as integer  |
            | Schema with invalid uri | send metrics event with invalid schema uri |
            | Data as string          | send metrics event with data as string     |
            | Data as boolean         | send metrics event with data as boolean    |
            | Data as integer         | send metrics event with data as integer    |