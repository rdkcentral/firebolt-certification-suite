Feature: IntegratedPlayer
 
    @initialization
    Scenario: Launch FCA for 'IntegratedPlayer'
        Given the environment has been set up for 'IntegratedPlayer' tests
        And 3rd party 'certification' app is launched with 'inactive' state

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
