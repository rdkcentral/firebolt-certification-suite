@Metrics @coreSDK @rpcOnly
Feature: Metrics_RpcOnly

    @transport
    Scenario Outline: Metrics.<Method> - Positive Scenario: Validating rpc method metrics <Method>
        Given the environment has been set up for 'Metrics' tests
        And 3rd party 'certification' app is launched
        When we test the 'METRICS_METHOD' getters and setters '<Method>' to '{}'
        And '3rd party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '3rd party app' get API

        Examples:
            | Method  |
            | ready   |
            | signIn  |
            | signOut |

    @transport
    Scenario: Internal.initialize - Positive Scenario: Validating rpc method
        Given the environment has been set up for 'Metrics' tests
        And 3rd party 'certification' app is launched
        When 1st party app invokes the 'Firebolt' API to 'initialize session'
        Then 'Firebolt' platform responds to '1st party app' with 'content for internal initialize'