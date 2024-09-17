@Metrics @MetricsManage @manageSDK
Feature: Metrics_Manage

    Background: Launch FCA for 'Metrics'
        Given the environment has been set up for 'Metrics' tests
        And 3rd party 'certification' app is launched

    @sdk @transport
    Scenario Outline: Metrics.event - Positive Scenario: <Scenario>
        Given we test the 'METRICS_MANAGE' getters and setters 'event' to '<Value>'
        When '1st party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '1st party app' get API

        Examples:
            | Scenario                          | Value                       |
            | Send foo event                    | foo_data_and_schema         |
            | Send foo event with null value    | null_foo_data_and_schema    |
            | Send foo event with boolean value | boolean_foo_data_and_schema |
            | Send data as empty object         | empty_data_object           |

    @sdk @transport
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
            | Schema as empty string  | send metrics event with schema as empty    |