Feature: IntegratedPlayer

    @initialization
    Scenario: Launch FCA for 'IntegratedPlayer'
        Given the environment has been set up for 'IntegratedPlayer' tests
        And 3rd party 'certification' app is launched with 'inactive' state

    @sdk @IntegratedPlayer
    Scenario Outline: Player.<method> - Positive Scenario: <Scenario>
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Validation_key>'

      Examples:
        | Scenario                     | API_Key             | Validation_key            | method   |
        | Validate player load api     | load player         | value for player load     | load     |
        | Validate player destroy api  | destroy player      | value for player destroy  | destroy  |
        | Validate player play api     | play player         | value for player play     | play     |
        | Validate player progress api | get player progress | value for player progress | progress |
        | Validate player status api   | get player status   | value for player status   | status   |
        | Validate player stop api     | stop player         | value for player stop     | stop     |
        | Validate player tracks api   | get player tracks   | value for player tracks   | tracks   |
    
    @sdk @IntegratedPlayer
    Scenario Outline: BroadcastPlayer.<method> - Positive Scenario: <Scenario>
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Validation_key>'

        Examples:
            | Scenario                    | API_Key                              | Validation_key                   | method         |
            | Validate create api         | create broadcastPlayer instance      | broadcastPlayer instance         | create         |
            | Validate status api         | get status of broadcastPlayer        | status of broadcastPlayer        | status         |
            | Validate provideStatus api  | get broadcast status of player       | broadcast status of player       | provideStatus  |
            | Validate createResponse api | get response from createprovider     | response of createprovider       | createResponse |
            | Validate createError api    | get error from createprovider        | error of createprovider          | createError    |
            | Validate statusResponse api | get response from statusprovider     | response of statusprovider       | statusResponse |
            | Validate statusError api    | get error from statusprovider        | error of statusprovider          | statusError    |
