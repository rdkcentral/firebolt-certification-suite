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
         | Scenario             | API_Key         | Validation_key        | method |
         | Validate player load | set player load | value for player load | load   |