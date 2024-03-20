Feature: Keyboard

    @Keyboard @coreSDK @sdk @transport
    Scenario Outline: Keyboard.<Method> - Positive Scenario: <Scenario> without UI
        Given the environment has been set up for 'Keyboard' tests
        And 3rd party 'certification' app is launched
        And Framework registers 'keyboard' test provider
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with '<Content>'
        And 'Firebolt' platform responds with 'foreground for lifecycle state'

        Examples:
            | Method   | Scenario                          | API_Key                                                        | Content                         |
            | email    | email with signIn type            | prompt the user for their email address with signIn type       | the entered email address       |
            | email    | email with signUp type            | prompt the user for their email address with signUp type       | the entered email address       |
            | email    | email with signIn with type alone | prompt the user for their email address with signIn type alone | the entered email address       |
            | password | password                          | prompt the user for their password                             | the entered user password       |
            | password | password as empty                 | prompt the user for their password as empty                    | the entered user password       |
            | standard | standard platform                 | prompt the user for their standard platform                    | the entered standard user value |

    @Keyboard @coreSDK @sdk @transport
    Scenario Outline: Keyboard.<Method> - Positive Scenario: <Scenario> with UI
        Given the environment has been set up for 'Keyboard' tests
        And User 'starts' recording lifecycle history for '1st party app'
        And 3rd party 'certification' app is launched
        And User 'starts' recording lifecycle history for '3rd party app'
        And Framework registers 'keyboard' test provider
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        And User 'stop' recording lifecycle history for '1st party app'
        And User 'stop' recording lifecycle history for '3rd party app'
        Then 'Firebolt' platform responds with '<Content>'
        And User validates lifecycle history for '1st party app' with 'background:foreground:background'
        And User validates lifecycle history for '3rd party app' with 'background:foreground'

        Examples:
            | Method   | Scenario                        | API_Key                                                  | Content                         |
            | email    | email from keyboard             | prompt the user for their email address with signIn type | the entered email address       |
            | password | password from keyboard          | prompt the user for their password                       | the entered user password       |
            | standard | standard platform from keyboard | prompt the user for their standard platform              | the entered standard user value |

    @Keyboard @coreSDK @sdk @transport
    Scenario Outline: Keyboard.<Method> - Negative Scenario: <Scenario> without UI expecting error
        Given the environment has been set up for 'Keyboard' tests
        And 3rd party 'certification' app is launched
        And Framework registers 'keyboard' test provider
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Validation_key>'

        Examples:
            | Mehtod   | Scenario                             | API_Key                                                      | Validation_key              |
            | email    | passing email type as invalid string | prompt the user for their email with invalid type as string  | invalid parameter for email |
            | email    | passing email type as integer        | prompt the user for their email with invalid type as integer | invalid parameter for email |
            | email    | passing email type as empty          | prompt the user for their email with type as empty           | invalid parameter for email |
            | password | passing password as integer          | prompt the user for their invalid password as integer        | invalid parameter password  |
            | standard | passing standard as integer          | prompt the user for their invalid standard as integer        | invalid parameter standard  |
            | standard | passing standard as empty            | prompt the user for their standard as empty                  | invalid parameter standard  |


    @Keyboard @coreSDK @sdk @transport
    Scenario Outline: Keyboard.<Method> - Negative Scenario: <Scenario> with UI expecting error
        Given the environment has been set up for 'Keyboard' tests
        And User 'starts' recording lifecycle history for '1st party app'
        And 3rd party 'certification' app is launched
        And User 'starts' recording lifecycle history for '3rd party app'
        And Framework registers 'keyboard' test provider
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Validation_key>'

        Examples:
            | Method   | Scenario                             | API_Key                                                      | Validation_key              |
            | email    | passing email type as invalid string | prompt the user for their email with invalid type as string  | invalid parameter for email |
            | email    | passing email type as integer        | prompt the user for their email with invalid type as integer | invalid parameter for email |
            | email    | passing email type as empty          | prompt the user for their email with type as empty           | invalid parameter for email |
            | password | passing password as integer          | prompt the user for their invalid password as integer        | invalid parameter password  |
            | standard | passing standard as integer          | prompt the user for their invalid standard as integer        | invalid parameter password  |
            | standard | passing standard as empty            | prompt the user for their standard as empty                  | invalid parameter standard  |

