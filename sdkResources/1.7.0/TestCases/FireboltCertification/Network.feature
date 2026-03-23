@Network @coreSDK
Feature: Network

    Background: Launch FCA for 'Network'
        Given the environment has been set up for 'Network' tests
        And 3rd party 'certification' app is launched

    @sdk @transport @Sev0
    Scenario Outline: Network.<Method> - Validate API Method Response Content
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Validation_key>'
        Examples:
            | Method    | API_Key                | Validation_key |
            | connected | fetch connected status | true           |
