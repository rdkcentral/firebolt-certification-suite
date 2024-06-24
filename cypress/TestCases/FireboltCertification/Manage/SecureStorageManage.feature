Feature: SecureStorage_Manage

    Background: Launch FCA for 'SecureStorage'
        Given the environment has been set up for 'securestorage' tests
        And 3rd party 'certification' app is launched

    @SecureStorage @manageSDK
    Scenario Outline: SecureStorage.setForApp - Positive Scenario: <Scenario>
        Given 1st party app invokes the 'Firebolt' API to '<Clear_API_Key>'
        And 'Firebolt' platform responds to '1st party app' for 'null for clearing stored value for an app'
        And 1st party app invokes the 'Firebolt' API to '<API_Key>'
        And 'Firebolt' platform responds to '1st party app' for 'null for getting stored value'
        When 1st party app invokes the 'Firebolt' API to '<Set_API_Key>'
        Then 'Firebolt' platform responds to '1st party app' for '<Set_API_Key>'
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Method_Validation_Key>'

        Examples:
            | Scenario                                            | Set_API_Key                                                                 | API_Key                                                                 | Method_Validation_Key                                                | Clear_API_Key                                       |
            | setForApp with device scope                         | set secure data value for an app with scope device                          | get stored value with scope as device and key as authTestTokenDevice    | expected value for authTestTokenDevice stored data in securestorage  | clear stored value with scope as device for an app  |
            | setForApp with account scope                        | set secure data value for an app with scope account                         | get stored value with scope as account and key as authTestTokenAccount  | expected value for authTestTokenAccount stored data in securestorage | clear stored value with scope as account for an app |
            | setForApp with device scope and optional parameter  | set secure data value for an app with scope device with optional parameter  | get stored value with scope as device and key as authTestTokenDevice1   | authTestTokenValue1 for stored data in securestorage                 | clear stored value with scope as device for an app  |
            | setForApp with account scope and optional parameter | set secure data value for an app with scope account with optional parameter | get stored value with scope as account and key as authTestTokenAccount1 | authTestTokenValue1 for stored data in securestorage                 | clear stored value with scope as account for an app |

    @SecureStorage @manageSDK
    Scenario Outline: SecureStorage.removeForApp - Positive Scenario: <Scenario>
        Given 1st party app invokes the 'Firebolt' API to '<Set_API_Key1>'
        And 'Firebolt' platform responds to '1st party app' for '<Set_API_Key1>'
        And 1st party app invokes the 'Firebolt' API to '<Get_API_Key1>'
        And 'Firebolt' platform responds to '1st party app' for '<Validation_Key1>'
        And 1st party app invokes the 'Firebolt' API to '<Set_API_Key2>'
        And 'Firebolt' platform responds to '1st party app' for 'null for updating a secure data value'
        And 1st party app invokes the 'Firebolt' API to '<Get_API_Key2>'
        And 'Firebolt' platform responds to '1st party app' for '<Validation_Key2>'
        When 1st party app invokes the 'Firebolt' API to '<Remove_API_Key>'
        Then 'Firebolt' platform responds to '1st party app' for '<Remove_API_Key>'
        When 1st party app invokes the 'Firebolt' API to '<Get_API_Key1>'
        When 1st party app invokes the 'Firebolt' API to '<Get_API_Key2>'
        Then 'Firebolt' platform responds to '1st party app' with 'Validation_Key2'

        Examples:
            | Scenario                        | Remove_API_Key                                         | API_Key                                                      | Set_API_Key1                                        | Set_API_Key2                                        | Get_API_Key1                                                            | Get_API_Key2                                                            | Validation_Key2                                                       | Validation_Key1                                                       |
            | removeForApp with device scope  | remove secure data value for an app with scope device  | get stored value for authTestTokenDevice with scope device   | set secure data value for an app with scope device1 | set secure data value for an app with scope device2 | get stored value for an app for authTestTokenDevice1 with scope device  | get stored value for an app for authTestTokenDevice2 with scope device  | expected value for authTestTokenDevice2 stored data in securestorage  | expected value for authTestTokenDevice1 stored data in securestorage  |
            | removeForApp with account scope | remove secure data value for an app with scope account | get stored value for authTestTokenAccount with scope account | set secure data value for an app with scope account | set secure data value for an app with scope account | get stored value for an app for authTestTokenAccount1 with scope device | get stored value for an app for authTestTokenAccount2 with scope device | expected value for authTestTokenAccount2 stored data in securestorage | expected value for authTestTokenAccount1 stored data in securestorage |

    @SecureStorage @manageSDK
    Scenario Outline: SecureStorage.clearForApp - Positive Scenario: <Scenario>
        Given 1st party app invokes the 'Firebolt' API to '<Set_API_Key1>'
        And 'Firebolt' platform responds to '1st party app' for '<Set_API_Key1>'
        And 1st party app invokes the 'Firebolt' API to '<Get_API_Key1>'
        And 'Firebolt' platform responds to '1st party app' for '<Validation_Key1>'
        And 1st party app invokes the 'Firebolt' API to '<Set_API_Key2>'
        And 'Firebolt' platform responds to '1st party app' for 'null for updating a secure data value'
        And 1st party app invokes the 'Firebolt' API to '<Get_API_Key2>'
        And 'Firebolt' platform responds to '1st party app' for '<Validation_Key2>'
        When 1st party app invokes the 'Firebolt' API to '<Clear_API_Key>'
        Then 'Firebolt' platform responds to '1st party app' for '<Clear_API_Key>'
        When 1st party app invokes the 'Firebolt' API to '<Get_API_Key1>'
        When 1st party app invokes the 'Firebolt' API to '<Get_API_Key2>'
        Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key2>'

        Examples:
            | Scenario                       | Clear_API_Key                                         | API_Key                                                      | Set_API_Key1                                        | Set_API_Key2                                        | Get_API_Key1                                                            | Get_API_Key2                                                            | Validation_Key2                                                       | Validation_Key1                                                       |
            | clearForApp with device scope  | clear secure data value for an app with scope device  | get stored value for authTestTokenDevice with scope device   | set secure data value for an app with scope device1 | set secure data value for an app with scope device2 | get stored value for an app for authTestTokenDevice1 with scope device  | get stored value for an app for authTestTokenDevice2 with scope device  | expected value for authTestTokenDevice2 stored data in securestorage  | expected value for authTestTokenDevice1 stored data in securestorage  |
            | clearForApp with account scope | clear secure data value for an app with scope account | get stored value for authTestTokenAccount with scope account | set secure data value for an app with scope account | set secure data value for an app with scope account | get stored value for an app for authTestTokenAccount1 with scope device | get stored value for an app for authTestTokenAccount2 with scope device | expected value for authTestTokenAccount2 stored data in securestorage | expected value for authTestTokenAccount1 stored data in securestorage |

    @SecureStorage @manageSDK
    Scenario Outline: SecureStorage.setForApp - Negative Scenario: <Scenario>
        Given 1st party app invokes the 'Firebolt' API to '<Clear_API_Key>'
        And 'Firebolt' platform responds to '1st party app' for 'null for clearing stored value for an app'
        And 1st party app invokes the 'Firebolt' API to '<API_Key>'
        And 'Firebolt' platform responds to '1st party app' for 'null for getting stored value'
        When 1st party app invokes the 'Firebolt' API to '<Set_API_Key>'
        Then 'Firebolt' platform responds to '1st party app' for 'invalid params for setting a data value in securestorage'
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Method_Validation_Key>'

        Examples:
            | Scenario                     | Set_API_Key                                         | API_Key                                                              | Method_Validation_Key                                               | Clear_API_Key                                      |
            | setForApp with invalid scope | set secure data value for an app with invalid scope | get stored value with scope as device and key as authTestTokenDevice | expected value for authTestTokenDevice stored data in securestorage | clear stored value with scope as device for an app |
            | setForApp with integer scope | set secure data value for an app with invalid scope | get stored value with scope as device and key as authTestTokenDevice | expected value for authTestTokenDevice stored data in securestorage | clear stored value with scope as device for an app |
            | setForApp with null scope    | set secure data value for an app with null scope    | get stored value with scope as device and key as authTestTokenDevice | expected value for authTestTokenDevice stored data in securestorage | clear stored value with scope as device for an app |
            | setForApp with boolean scope | set secure data value for an app with boolean scope | get stored value with scope as device and key as authTestTokenDevice | expected value for authTestTokenDevice stored data in securestorage | clear stored value with scope as device for an app |
            | setForApp with empty scope   | set secure data value for an app with empty scope   | get stored value with scope as device and key as authTestTokenDevice | expected value for authTestTokenDevice stored data in securestorage | clear stored value with scope as device for an app |
            | setForApp without scope      | set secure data value for an app without scope      | get stored value with scope as device and key as authTestTokenDevice | expected value for authTestTokenDevice stored data in securestorage | clear stored value with scope as device for an app |
            | setForApp with integer key   | set secure data value for an app with integer key   | get stored value with scope as device and key as authTestTokenDevice | expected value for authTestTokenDevice stored data in securestorage | clear stored value with scope as device for an app |
            | setForApp with null key      | set secure data value for an app with null key      | get stored value with scope as device and key as authTestTokenDevice | expected value for authTestTokenDevice stored data in securestorage | clear stored value with scope as device for an app |
            | setForApp with boolean key   | set secure data value for an app with boolean key   | get stored value with scope as device and key as authTestTokenDevice | expected value for authTestTokenDevice stored data in securestorage | clear stored value with scope as device for an app |
            | setForApp without key        | set secure data value for an app without key        | get stored value with scope as device and key as authTestTokenDevice | expected value for authTestTokenDevice stored data in securestorage | clear stored value with scope as device for an app |
            | setForApp with integer value | set secure data value for an app with integer value | get stored value with scope as device and key as authTestTokenDevice | expected value for authTestTokenDevice stored data in securestorage | clear stored value with scope as device for an app |
            | setForApp with null value    | set secure data value for an app with null value    | get stored value with scope as device and key as authTestTokenDevice | expected value for authTestTokenDevice stored data in securestorage | clear stored value with scope as device for an app |
            | setForApp with boolean value | set secure data value for an app with boolean value | get stored value with scope as device and key as authTestTokenDevice | expected value for authTestTokenDevice stored data in securestorage | clear stored value with scope as device for an app |
            | setForApp without value      | set secure data value for an app without value      | get stored value with scope as device and key as authTestTokenDevice | expected value for authTestTokenDevice stored data in securestorage | clear stored value with scope as device for an app |

# @SecureStorage @manageSDK
# Scenario Outline: SecureStorage.<Method> - Negative Scenario: <Scenario> expecting error
#     When 1st party app invokes the 'Firebolt' API to '<API_Key>'
#     Then 'Firebolt' platform responds to '1st party app' with '<Method_Validation_key>'

#     Examples:
#         | Scenario             | Method       | API_Key                                                    | Method_Validation_key                                            |
#         | setForApp-integer    | setForApp    | set secure data value for an app with integer parameter    | invalid params for setting a data value in securestorage         |
#         | setForApp-boolean    | setForApp    | set secure data value for an app with true parameter       | invalid params for setting a data value in securestorage         |
#         | removeForApp-integer | removeForApp | remove secure data value for an app with integer parameter | invalid params for removing stored value in securestorage        |
#         | removeForApp-boolean | removeForApp | remove secure data value for an app with true parameter    | invalid params for removing stored value in securestorage        |
#         | clearForApp-integer  | clearForApp  | clear secure data values for an app with integer parameter | invalid params for clearing all data for an app in securestorage |
#         | clearForApp-boolean  | clearForApp  | clear secure data values for an app with true parameter    | invalid params for clearing all data for an app in securestorage |