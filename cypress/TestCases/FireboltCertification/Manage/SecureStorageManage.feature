Feature: SecureStorage_Manage

    Background: Launch FCA for 'SecureStorage'
        Given the environment has been set up for 'securestorage' tests
        And 3rd party 'certification' app is launched

    @SecureStorage @manageSDK
    Scenario Outline: SecureStorage.setForApp - Positive Scenario: <Scenario>
        When 1st party app invokes the 'Firebolt' API to '<Set_API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'null for setting a data value'
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Method_Validation_Key>'

        Examples:
            | Scenario                                            | Set_API_Key                                                                 | API_Key                                                                 | Method_Validation_Key                                                |
            | setForApp with device scope                         | set secure data value for an app with scope device                          | get stored value with scope as device and key as authTestTokenDevice    | expected value for authTestTokenDevice stored data in securestorage  |
            | setForApp with account scope                        | set secure data value for an app with scope account                         | get stored value with scope as account and key as authTestTokenAccount  | expected value for authTestTokenAccount stored data in securestorage |
            | setForApp with device scope and optional parameter  | set secure data value for an app with scope device with optional parameter  | get stored value with scope as device and key as authTestTokenDevice1   | authTestTokenValue1 for stored data in securestorage                 |
            | setForApp with account scope and optional parameter | set secure data value for an app with scope account with optional parameter | get stored value with scope as account and key as authTestTokenAccount1 | authTestTokenValue1 for stored data in securestorage                 |

    @SecureStorage @manageSDK
    Scenario Outline: SecureStorage.removeForApp - Positive Scenario: <Scenario>
        When 1st party app invokes the 'Firebolt' API to '<Set_API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'null for removing stored value for an app'
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'null for getting stored value'

        Examples:
            | Scenario                        | Set_API_Key                                            | API_Key                                                      |
            | removeForApp with device scope  | remove secure data value for an app with scope device  | get stored value for authTestTokenDevice with scope device   |
            | removeForApp with account scope | remove secure data value for an app with scope account | get stored value for authTestTokenAccount with scope account |

    @SecureStorage @manageSDK
    Scenario Outline: SecureStorage.clearForApp - Positive Scenario: <Scenario>
        When 1st party app invokes the 'Firebolt' API to '<Set_API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'null for clearing all data for an app'
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'null for getting stored value'

        Examples:
            | Scenario                       | Set_API_Key                                            | API_Key                                        |
            | clearForApp with device scope  | clear secure data values for an app with scope device  | get stored value for an app with scope device  |
            | clearForApp with account scope | clear secure data values for an app with scope account | get stored value for an app with scope account |

    @SecureStorage @manageSDK
    Scenario Outline: SecureStorage.<Method> - Negative Scenario: <Scenario> expecting error
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Method_Validation_key>'

        Examples:
            | Scenario             | Method       | API_Key                                                    | Method_Validation_key                                            |
            | setForApp-integer    | setForApp    | set secure data value for an app with integer parameter    | invalid params for setting a data value in securestorage         |
            | setForApp-boolean    | setForApp    | set secure data value for an app with true parameter       | invalid params for setting a data value in securestorage         |
            | removeForApp-integer | removeForApp | remove secure data value for an app with integer parameter | invalid params for removing stored value in securestorage        |
            | removeForApp-boolean | removeForApp | remove secure data value for an app with true parameter    | invalid params for removing stored value in securestorage        |
            | clearForApp-integer  | clearForApp  | clear secure data values for an app with integer parameter | invalid params for clearing all data for an app in securestorage |
            | clearForApp-boolean  | clearForApp  | clear secure data values for an app with true parameter    | invalid params for clearing all data for an app in securestorage |