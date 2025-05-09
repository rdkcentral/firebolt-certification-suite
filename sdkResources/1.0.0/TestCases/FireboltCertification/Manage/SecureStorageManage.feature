@SecureStorage @SecureStorageManage @manageSDK
Feature: SecureStorage_Manage

    Background: Launch FCA for 'SecureStorage'
        Given the environment has been set up for 'securestorage' tests
        And 3rd party 'certification' app is launched

    @sdk @transport
    Scenario Outline: SecureStorage.setForApp - Positive Scenario: <Scenario>
        Given 1st party app invokes the 'Firebolt' API to '<Clear_API_Key>'
        And 'Firebolt' platform responds to '1st party app' for 'null for clearing stored value for an app'
        And '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        And 'Firebolt' platform responds with 'null for getting stored value'
        When 1st party app invokes the 'Firebolt' API to '<Set_API_Key>'
        Then 'Firebolt' platform responds to '1st party app' for '<Set_API_Key>'
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Method_Validation_Key>'

        Examples:
            | Scenario                                            | Set_API_Key                                                                 | API_Key                                                                 | Method_Validation_Key                                                | Clear_API_Key                                       |
            | setForApp with device scope                         | set secure data value for an app with scope device                          | get stored value with scope as device and key as authTestTokenDevice    | expected value for authTestTokenDevice stored data in securestorage  | clear stored value with scope as device for an app  |
            | setForApp with account scope                        | set secure data value for an app with scope account                         | get stored value with scope as account and key as authTestTokenAccount  | expected value for authTestTokenAccount stored data in securestorage | clear stored value with scope as account for an app |
            | setForApp with device scope and optional parameter  | set secure data value for an app with scope device with optional parameter  | get stored value with scope as device and key as authTestTokenDevice1   | authTestTokenValue1 for stored data in securestorage                 | clear stored value with scope as device for an app  |
            | setForApp with account scope and optional parameter | set secure data value for an app with scope account with optional parameter | get stored value with scope as account and key as authTestTokenAccount1 | authTestTokenValue1 for stored data in securestorage                 | clear stored value with scope as account for an app |

    @sdk @transport
    Scenario Outline: SecureStorage.removeForApp - Positive Scenario: <Scenario>
        Given 1st party app invokes the 'Firebolt' API to '<Clear_API_Key>'
        And 'Firebolt' platform responds to '1st party app' for 'null for clearing stored value for an app'
        And '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key1>'
        And 'Firebolt' platform responds with 'null for getting stored value'
        And 1st party app invokes the 'Firebolt' API to '<Set_API_Key1>'
        And 'Firebolt' platform responds to '1st party app' for 'null for updating a secure data value for an app'
        And 1st party app invokes the 'Firebolt' API to '<Set_API_Key2>'
        And 'Firebolt' platform responds to '1st party app' for 'null for updating a secure data value for an app'
        And '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key1>'
        And 'Firebolt' platform responds with '<Validation_Key1>'
        And '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key2>'
        And 'Firebolt' platform responds with '<Validation_Key2>'
        When 1st party app invokes the 'Firebolt' API to '<Remove_API_Key>'
        Then 'Firebolt' platform responds to '1st party app' for '<Remove_API_Key>'
        When '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key1>'
        Then 'Firebolt' platform responds with 'null for getting stored value'
        When '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key2>'
        Then 'Firebolt' platform responds with '<Validation_Key2>'

        Examples:
            | Scenario                        | Remove_API_Key                                          | Set_API_Key1                                         | Set_API_Key2                                         | Get_API_Key1                                                             | Get_API_Key2                                                             | Validation_Key2                                                       | Validation_Key1                                                       | Clear_API_Key                                       |
            | removeForApp with device scope  | remove secure data value for an app with scope device   | set secure data value1 for an app with scope device  | set secure data value2 for an app with scope device  | get stored value for an app for authTestTokenDevice1 with scope device   | get stored value for an app for authTestTokenDevice2 with scope device   | expected value for authTestTokenDevice2 stored data in securestorage  | expected value for authTestTokenDevice1 stored data in securestorage  | clear stored value with scope as device for an app  |
            | removeForApp with account scope | remove secure data value1 for an app with scope account | set secure data value1 for an app with scope account | set secure data value2 for an app with scope account | get stored value for an app for authTestTokenAccount1 with scope account | get stored value for an app for authTestTokenAccount2 with scope account | expected value for authTestTokenAccount2 stored data in securestorage | expected value for authTestTokenAccount1 stored data in securestorage | clear stored value with scope as account for an app |

    @sdk @transport
    Scenario Outline: SecureStorage.clearForApp - Positive Scenario: <Scenario>
        Given 1st party app invokes the 'Firebolt' API to '<Set_API_Key1>'
        And 'Firebolt' platform responds to '1st party app' for '<Set_API_Key1>'
        And '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key1>'
        And 'Firebolt' platform responds with '<Validation_Key1>'
        And 1st party app invokes the 'Firebolt' API to '<Set_API_Key2>'
        And 'Firebolt' platform responds to '1st party app' for '<Set_API_Key2>'
        And '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key2>'
        And 'Firebolt' platform responds with '<Validation_Key2>'
        When 1st party app invokes the 'Firebolt' API to '<Clear_API_Key>'
        Then 'Firebolt' platform responds to '1st party app' for '<Clear_API_Key>'
        When '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key1>'
        Then 'Firebolt' platform responds with 'null for getting stored value'
        When '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key2>'
        Then 'Firebolt' platform responds with 'null for getting stored value'

        Examples:
            | Scenario                       | Clear_API_Key                                          | API_Key                                                      | Set_API_Key1                                         | Set_API_Key2                                         | Get_API_Key1                                                             | Get_API_Key2                                                             | Validation_Key2                                                       | Validation_Key1                                                       |
            | clearForApp with device scope  | clear secure data values for an app with scope device  | get stored value for authTestTokenDevice with scope device   | set secure data value1 for an app with scope device  | set secure data value2 for an app with scope device  | get stored value for an app for authTestTokenDevice1 with scope device   | get stored value for an app for authTestTokenDevice2 with scope device   | expected value for authTestTokenDevice2 stored data in securestorage  | expected value for authTestTokenDevice1 stored data in securestorage  |
            | clearForApp with account scope | clear secure data values for an app with scope account | get stored value for authTestTokenAccount with scope account | set secure data value1 for an app with scope account | set secure data value2 for an app with scope account | get stored value for an app for authTestTokenAccount1 with scope account | get stored value for an app for authTestTokenAccount2 with scope account | authtesttokenvalue2 for stored value in securestorage | authtesttokenvalue1 for stored value in securestorage |

    @sdk @transport
    Scenario Outline: SecureStorage.setForApp - Negative Scenario: <Scenario>
        When 1st party app invokes the 'Firebolt' API to '<Set_API_Key>'
        Then 'Firebolt' platform responds to '1st party app' for 'invalid params for setting a data value in securestorage'

        Examples:
            | Scenario                     | Set_API_Key                                         |
            | setForApp with invalid scope | set secure data value for an app with invalid scope |
            | setForApp with integer scope | set secure data value for an app with integer scope |
            | setForApp with null scope    | set secure data value for an app with null scope    |
            | setForApp with boolean scope | set secure data value for an app with boolean scope |
            | setForApp with empty scope   | set secure data value for an app with empty scope   |
            | setForApp without scope      | set secure data value for an app without scope      |
            | setForApp with integer key   | set secure data value for an app with integer key   |
            | setForApp with null key      | set secure data value for an app with null key      |
            | setForApp with boolean key   | set secure data value for an app with boolean key   |
            | setForApp without key        | set secure data value for an app without key        |
            | setForApp with integer value | set secure data value for an app with integer value |
            | setForApp with null value    | set secure data value for an app with null value    |
            | setForApp with boolean value | set secure data value for an app with boolean value |
            | setForApp without value      | set secure data value for an app without value      |

    @sdk @transport
    Scenario Outline: SecureStorage.removeForApp - Negative Scenario: <Scenario>
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' for 'invalid parameters for securestorage removeForApp'

        Examples:
            | Scenario                      | API_Key                                                |
            | Passing invalid scope         | remove secure data value for an app with invalid scope |
            | Passing scope as empty string | remove secure data value for an app with empty scope   |
            | Passing scope as integer      | remove secure data value for an app with integer scope |
            | Passing scope as null         | remove secure data value for an app with null scope    |
            | Passing scope as boolean      | remove secure data value for an app with boolean scope |
            | without scope                 | remove secure data value for an app without scope      |
            | Passing key as integer        | remove secure data value for an app with integer key   |
            | Passing key as null           | remove secure data value for an app with null key      |
            | Passing key as boolean        | remove secure data value for an app with boolean key   |
            | Without key                   | remove secure data value for an app without key        |

    @sdk @transport
    Scenario Outline: SecureStorage.clearForApp - Negative Scenario: <Scenario>
        When 1st party app invokes the 'Firebolt' API to '<Clear_API_key>'
        Then 'Firebolt' platform responds to '1st party app' for 'invalid params for clearing all data for an app in securestorage'

        Examples:
            | Scenario                      | Clear_API_key                                          |
            | Passing invalid scope         | clear secure data values for an app with invalid scope |
            | Passing scope as empty string | clear secure data values for an app with empty scope   |
            | Passing scope as integer      | clear secure data values for an app with integer scope |
            | Passing scope as null         | clear secure data values for an app with null scope    |
            | Passing scope as boolean      | clear secure data values for an app with boolean scope |
            | without scope                 | clear secure data values for an app without scope      |

    # secondary 3rd party app is launched
    # clears the existing key for 1st app
    # validates the cleared value for 1st app
    # set value for 1st app
    # validates the set value for 1st app
    # validates the set value for 2nd app
    @sdk @transport
    Scenario: SecureStorage.setForApp - Positive Scenario: setForApp with device scope with 2 apps
        Given 3rd party 'certification' app is launched with 'secondary 3rd party app' appId
        And 1st party app invokes the 'Firebolt' API to 'clear stored value with scope as device for an app'
        And 'Firebolt' platform responds to '1st party app' for 'null for clearing stored value for an app'
        And '3rd party app' invokes the 'Firebolt' API to 'get stored value with scope as device and key as authTestTokenDevice'
        And 'Firebolt' platform responds with 'null for getting stored value'
        And 'secondary 3rd party app' invokes the 'Firebolt' API to 'get stored value with scope as device and key as authTestTokenDevice'
        And 'Firebolt' platform responds to 'secondary 3rd party app' with 'null for getting stored value'
        When 1st party app invokes the 'Firebolt' API to 'set secure data value for an app with scope device'
        Then 'Firebolt' platform responds to '1st party app' for 'set secure data value for an app with scope device'
        When '3rd party app' invokes the 'Firebolt' API to 'get stored value with scope as device and key as authTestTokenDevice'
        Then 'Firebolt' platform responds with 'expected value for authTestTokenDevice stored data in securestorage'
        When 'secondary 3rd party app' invokes the 'Firebolt' API to 'get stored value with scope as device and key as authTestTokenDevice'
        Then 'Firebolt' platform responds to 'secondary 3rd party app' with 'null for getting stored value'

    # secondary 3rd party app is launched
    # clears the existing key for 1st app
    # validates the cleared value for 1st app
    # set value1 for 1st app
    # set value2 for 1st app
    # validates the set values for 1st app
    # set value1 for 2nd app
    # validates the set value for 2nd app
    # remove value1 for 1st app
    # validate the values for 1st app
    # validate the value for 2nd app
    @sdk @transport
    Scenario: SecureStorage.removeForApp - Positive Scenario: removeForApp with device scope with 2 apps
        Given 3rd party 'certification' app is launched with 'secondary 3rd party app' appId
        And 1st party app invokes the 'Firebolt' API to 'clear stored value with scope as device for an app'
        And 'Firebolt' platform responds to '1st party app' for 'null for clearing stored value for an app'
        And '3rd party app' invokes the 'Firebolt' API to 'get stored value for an app for authTestTokenDevice1 with scope device'
        And 'Firebolt' platform responds with 'null for getting stored value'
        And 'secondary 3rd party app' invokes the 'Firebolt' API to 'get stored value for an app for authTestTokenDevice1 with scope device'
        And 'Firebolt' platform responds to 'secondary 3rd party app' with 'null for getting stored value'
        And 1st party app invokes the 'Firebolt' API to 'set secure data value1 for an app with scope device'
        And 'Firebolt' platform responds to '1st party app' for 'null for updating a secure data value for an app'
        And 1st party app invokes the 'Firebolt' API to 'set secure data value2 for an app with scope device'
        And 'Firebolt' platform responds to '1st party app' for 'null for updating a secure data value for an app'
        And '3rd party app' invokes the 'Firebolt' API to 'get stored value for an app for authTestTokenDevice1 with scope device'
        And 'Firebolt' platform responds with 'expected value for authTestTokenDevice1 stored data in securestorage'
        And '3rd party app' invokes the 'Firebolt' API to 'get stored value for an app for authTestTokenDevice2 with scope device'
        And 'Firebolt' platform responds with 'expected value for authTestTokenDevice2 stored data in securestorage'
        And 1st party app invokes the 'Firebolt' API to 'set secure data value1 for second app with scope device'
        And 'Firebolt' platform responds to '1st party app' for 'null for updating a secure data value for an app'
        And 'secondary 3rd party app' invokes the 'Firebolt' API to 'get stored value for an app for authTestTokenDevice1 with scope device'
        And 'Firebolt' platform responds to 'secondary 3rd party app' with 'expected value for authTestTokenDevice1 stored data in securestorage'
        When 1st party app invokes the 'Firebolt' API to 'remove secure data value for an app with scope device'
        Then 'Firebolt' platform responds to '1st party app' for 'remove secure data value for an app with scope device'
        When '3rd party app' invokes the 'Firebolt' API to 'get stored value for an app for authTestTokenDevice1 with scope device'
        Then 'Firebolt' platform responds with 'null for getting stored value'
        When '3rd party app' invokes the 'Firebolt' API to 'get stored value for an app for authTestTokenDevice2 with scope device'
        Then 'Firebolt' platform responds with 'expected value for authTestTokenDevice2 stored data in securestorage'
        When 'secondary 3rd party app' invokes the 'Firebolt' API to 'get stored value for an app for authTestTokenDevice1 with scope device'
        Then 'Firebolt' platform responds to 'secondary 3rd party app' with 'expected value for authTestTokenDevice1 stored data in securestorage'


    # secondary 3rd party app is launched
    # set value1 for 1st app
    # set value1 for 2nd app
    # validates the set values for 1st app
    # validates the set value for 2nd app
    # clears the existing key for 1st app
    # validates the cleared value for 1st app
    # validate the values for 2nd app
    @sdk @transport
    Scenario: SecureStorage.clearForApp - Positive Scenario: clearForApp with device scope
        Given 3rd party 'certification' app is launched with 'secondary 3rd party app' appId
        And 1st party app invokes the 'Firebolt' API to 'set secure data value1 for an app with scope device'
        And 'Firebolt' platform responds to '1st party app' for 'set secure data value1 for an app with scope device'
        And 1st party app invokes the 'Firebolt' API to 'set secure data value1 for second app with scope device'
        And 'Firebolt' platform responds to '1st party app' for 'null for updating a secure data value for an app'
        And '3rd party app' invokes the 'Firebolt' API to 'get stored value for an app for authTestTokenDevice1 with scope device'
        And 'Firebolt' platform responds with 'expected value for authTestTokenDevice1 stored data in securestorage'
        And 'secondary 3rd party app' invokes the 'Firebolt' API to 'get stored value for an app for authTestTokenDevice1 with scope device'
        And 'Firebolt' platform responds to 'secondary 3rd party app' with 'expected value for authTestTokenDevice1 stored data in securestorage'
        When 1st party app invokes the 'Firebolt' API to 'clear secure data values for an app with scope device'
        Then 'Firebolt' platform responds to '1st party app' for 'clear secure data values for an app with scope device'
        When '3rd party app' invokes the 'Firebolt' API to 'get stored value for an app for authTestTokenDevice1 with scope device'
        Then 'Firebolt' platform responds with 'null for getting stored value'
        When 'secondary 3rd party app' invokes the 'Firebolt' API to 'get stored value for an app for authTestTokenDevice1 with scope device'
        Then 'Firebolt' platform responds to 'secondary 3rd party app' with 'expected value for authTestTokenDevice1 stored data in securestorage'
