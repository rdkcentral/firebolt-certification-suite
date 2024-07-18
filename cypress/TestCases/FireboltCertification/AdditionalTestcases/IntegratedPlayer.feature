Feature: IntegratedPlayer

    @initialization
    Scenario: Launch FCA for 'IntegratedPlayer'
        Given the environment has been set up for 'IntegratedPlayer' tests
        And 3rd party 'certification' app is launched with 'inactive' state

    @sdk @IntegratedPlayer
    Scenario: Positive Scenario : Create and validate broadcast player instance
        When 1st party app invokes the 'Firebolt' API to 'create broadcastPlayer instance'
        Then 'Firebolt' platform responds to '1st party app' with 'broadcastPlayer instance'
        When 1st party app invokes the 'Firebolt' API to 'get status of broadcastPlayer'
        Then 'Firebolt' platform responds to '1st party app' with 'status of broadcastPlayer'
        When 1st party app invokes the 'Firebolt' API to 'load player'
        Then 'Firebolt' platform responds to '1st party app' with 'value for player load'
        When 1st party app invokes the 'Firebolt' API to 'play player'
        Then 'Firebolt' platform responds to '1st party app' with 'value for player play'
        When 1st party app invokes the 'Firebolt' API to 'get player progress'
        Then 'Firebolt' platform responds to '1st party app' with 'value for player progress'
        When 1st party app invokes the 'Firebolt' API to 'get player status'
        Then 'Firebolt' platform responds to '1st party app' with 'value for player status'
        When 1st party app invokes the 'Firebolt' API to 'get player tracks'
        Then 'Firebolt' platform responds to '1st party app' with 'value for player tracks'
        When 1st party app invokes the 'Firebolt' API to 'get broadcast status of player'
        Then 'Firebolt' platform responds to '1st party app' with 'broadcast status of player'
        When 1st party app invokes the 'Firebolt' API to 'stop player'
        Then 'Firebolt' platform responds to '1st party app' with 'value for player stop'
        When 1st party app invokes the 'Firebolt' API to 'destroy player'
        Then 'Firebolt' platform responds to '1st party app' with 'value for player destroy'

    @sdk @IntegratedPlayer
    Scenario: Positive Scenario : Create and validate streaming player instance
        When 1st party app invokes the 'Firebolt' API to 'create StreamingPlayer instance'
        Then 'Firebolt' platform responds to '1st party app' with 'StreamingPlayer instance'
        When 1st party app invokes the 'Firebolt' API to 'load player'
        Then 'Firebolt' platform responds to '1st party app' with 'value for player load'
        When 1st party app invokes the 'Firebolt' API to 'play player'
        Then 'Firebolt' platform responds to '1st party app' with 'value for player play'
        When 1st party app invokes the 'Firebolt' API to 'get player progress'
        Then 'Firebolt' platform responds to '1st party app' with 'value for player progress'
        When 1st party app invokes the 'Firebolt' API to 'get player status'
        Then 'Firebolt' platform responds to '1st party app' with 'value for player status'
        When 1st party app invokes the 'Firebolt' API to 'get player tracks'
        Then 'Firebolt' platform responds to '1st party app' with 'value for player tracks'
        When 1st party app invokes the 'Firebolt' API to 'stop player'
        Then 'Firebolt' platform responds to '1st party app' with 'value for player stop'
        When 1st party app invokes the 'Firebolt' API to 'destroy player'
        Then 'Firebolt' platform responds to '1st party app' with 'value for player destroy'
