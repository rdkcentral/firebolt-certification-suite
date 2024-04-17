Feature: Metrics_Manage

    @initialization
    Scenario: Launch FCA for 'Metrics'
        Given the environment has been set up for 'Metrics' tests
        And 3rd party 'certification' app is launched
        
    @Metrics @manageSDK
    Scenario Outline: Metrics.event - Positive Scenario: <Scenario>
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'null for metrics event'

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
