    Feature: Metrics_RpcOnly

    @transport @rpcOnly
    Scenario Outline: Metrics.<Scenario> - Positive Scenario: Validating rpc method metrics <Scenario>
        Given the environment has been set up for 'Metrics' tests
        And 3rd party 'certification' app is launched
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Validation_key>'

        Examples:
            | Scenario | API_Key                             | Validation_key              |
            | ready    | notify that app is minimally usable | true for ready in metrics   |
            | signIn   | log a sign in event                 | true for signIn in metrics  |
            | signOut  | log a sign out event                | true for signOut in metrics |

    @transport @rpcOnly
    Scenario: Internal.initialize - Positive Scenario: Validating rpc method
        Given the environment has been set up for 'Metrics' tests
        And 3rd party 'certification' app is launched
        When 1st party app invokes the 'Firebolt' API to 'initialize session'
        Then 'Firebolt' platform responds to '1st party app' with 'content for internal initialize'