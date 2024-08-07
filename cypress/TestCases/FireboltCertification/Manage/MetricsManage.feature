@Metrics @MetricsManage @manageSDK
Feature: Metrics_Manage

    Background: Launch FCA for 'Metrics'
        Given the environment has been set up for 'Metrics' tests

    # object params?
    @sdk @transport
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
    @sdk @transport
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
