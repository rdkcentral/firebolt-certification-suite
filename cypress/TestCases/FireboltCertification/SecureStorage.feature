@Securestorage @coreSDK
Feature: SecureStorage

    Background: Launch FCA for 'Securestorage'
        Given the environment has been set up for 'Securestorage' tests
        And 3rd party 'certification' app is launched

    @sdk @transport
    Scenario Outline: SecureStorage.set - Positive Scenario: Validate <Scenario>
        Given '3rd party app' invokes the 'Firebolt' API to '<Clear_API_Key>'
        And 'Firebolt' platform responds with 'null for clearing stored value'
        And '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key>'
        And 'Firebolt' platform responds with 'null for getting stored value'
        When '3rd party app' invokes the 'Firebolt' API to '<Set_API_Key>'
        Then 'Firebolt' platform responds with 'null for updating a secure data value'
        When '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key>'
        Then 'Firebolt' platform responds with '<Validation_Key>'

        Examples:
            | Scenario                                    | Get_API_Key                                                             | Set_API_Key                                                    | Validation_Key                                                       | Clear_API_Key                            |
            | Adding scope as device                      | get stored value with scope as device and key as authTestTokenDevice    | update stored value for key authTestTokenDevice                | expected value for authTestTokenDevice stored data in securestorage  | clear stored value with scope as device  |
            | Adding scope as account                     | get stored value with scope as account and key as authTestTokenAccount  | update stored value for key authTestTokenAccount               | expected value for authTestTokenAccount stored data in securestorage | clear stored value with scope as account |
            | Adding scope as device with optionalparams  | get stored value with scope as device and key as authTestTokenDevice1   | update stored value for key authTestTokenDevice1 with options  | authTestTokenValue1 for stored value in securestorage                | clear stored value with scope as device  |
            | Adding scope as account with optionalparams | get stored value with scope as account and key as authTestTokenAccount1 | update stored value for key authTestTokenAccount1 with options | authTestTokenValue1 for stored value in securestorage                | clear stored value with scope as account |

    @sdk @transport
    Scenario Outline: SecureStorage.set - Positive Scenario: Validate <Scenario>
        Given '3rd party app' invokes the 'Firebolt' API to '<Initial_Set_API_Key>'
        And 'Firebolt' platform responds with 'null for updating a secure data value'
        And '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key1>'
        And 'Firebolt' platform responds with '<Initial_Validation_Key>'
        When '3rd party app' invokes the 'Firebolt' API to '<Set_API_Key>'
        Then 'Firebolt' platform responds with 'null for updating a secure data value'
        When '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key2>'
        Then 'Firebolt' platform responds with '<Validation_Key>'

        Examples:
            | Scenario                              | Get_API_Key1                                                            | Set_API_Key                                       | Get_API_Key2                                                            | Validation_Key                                        | Initial_Validation_Key                                | Initial_Set_API_Key                                            | Clear_API_Key                            |
            | Updating existing device scope value  | get stored value with scope as device and key as authTestTokenDevice1   | update stored value for key authTestTokenDevice1  | get stored value with scope as device and key as authTestTokenDevice1   | authTestTokenValue2 for stored value in securestorage | authTestTokenValue1 for stored value in securestorage | update stored value for key authTestTokenDevice1 with options  | clear stored value with scope as device  |
            | Updating existing account scope value | get stored value with scope as account and key as authTestTokenAccount1 | update stored value for key authTestTokenAccount1 | get stored value with scope as account and key as authTestTokenAccount1 | authTestTokenValue2 for stored value in securestorage | authTestTokenValue1 for stored value in securestorage | update stored value for key authTestTokenAccount1 with options | clear stored value with scope as account |

    @sdk @transport
    Scenario Outline: SecureStorage.set - Positive Scenario: Validate <Scenario>
        Given  '3rd party app' invokes the 'Firebolt' API to '<Set_API_Key1>'
        And 'Firebolt' platform responds with 'null for updating a secure data value'
        And '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key1>'
        And 'Firebolt' platform responds with '<Validation_Key1>'
        When '3rd party app' invokes the 'Firebolt' API to '<Set_API_Key2>'
        Then 'Firebolt' platform responds with 'null for updating a secure data value'
        When '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key1>'
        Then 'Firebolt' platform responds with '<Validation_Key1>'
        When '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key2>'
        Then 'Firebolt' platform responds with '<Validation_Key2>'

        Examples:
            | Scenario                                                   | Get_API_Key1                                                           | Set_API_Key2                                                             | Get_API_Key2                                                          | Validation_Key1                                                      | Validation_Key2                                                                    | Set_API_Key1                                     |
            | Adding scope as account for existing key with scope device | get stored value with scope as device and key as authTestTokenDevice   | update stored value with scope as account and key as authTestTokenDevice | get stored value with scope as account and key as authTestTokenDevice | expected value for authTestTokenDevice stored data in securestorage  | expected value for account scoped authTestTokenDevice stored data in securestorage | update stored value for key authTestTokenDevice  |
            | Adding scope as device for existing key with scope account | get stored value with scope as account and key as authTestTokenAccount | update stored value with scope as device and key as authTestTokenAccount | get stored value with scope as device and key as authTestTokenAccount | expected value for authTestTokenAccount stored data in securestorage | expected value for device scoped authTestTokenAccount stored data in securestorage | update stored value for key authTestTokenAccount |

    @sdk @transport
    Scenario Outline: SecureStorage.remove - Positive Scenario: Validate <Scenario>
        Given '3rd party app' invokes the 'Firebolt' API to '<Set_API_Key1>'
        And 'Firebolt' platform responds with 'null for updating a secure data value'
        And '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key1>'
        And 'Firebolt' platform responds with '<Validation_Key1>'
        And '3rd party app' invokes the 'Firebolt' API to '<Set_API_Key2>'
        And 'Firebolt' platform responds with 'null for updating a secure data value'
        And '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key2>'
        And 'Firebolt' platform responds with '<Validation_Key2>'
        When '3rd party app' invokes the 'Firebolt' API to '<Remove_API_Key>'
        Then 'Firebolt' platform responds with 'null for removing stored value'
        When '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key1>'
        Then 'Firebolt' platform responds with 'null for getting stored value'
        When '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key2>'
        Then 'Firebolt' platform responds with '<Validation_Key2>'

        Examples:
            | Scenario               | Set_API_Key1                                   | Set_API_Key2                                   | Remove_API_Key                                                   | Get_API_Key1                                                 | Get_API_Key2                                                 | Validation_Key2                                                       | Validation_Key1                                                       | Clear_API_Key                            |
            | Removing device scope  | set secure value for key authTestTokenDevice1  | set secure value for key authTestTokenDevice2  | remove the stored value authTestTokenDevice1 with scope device   | get stored value for authTestTokenDevice1 with scope device  | get stored value for authTestTokenDevice2 with scope device  | expected value for authTestTokenDevice2 stored data in securestorage  | expected value for authTestTokenDevice1 stored data in securestorage  | clear stored value with scope as device  |
            | Removing account scope | set secure value for key authTestTokenAccount1 | set secure value for key authTestTokenAccount2 | remove the stored value authTestTokenAccount1 with scope account | get stored value for authTestTokenAccount1 with scope device | get stored value for authTestTokenAccount2 with scope device | expected value for authTestTokenAccount2 stored data in securestorage | expected value for authTestTokenAccount1 stored data in securestorage | clear stored value with scope as account |


    @sdk @transport
    Scenario Outline: SecureStorage.get - Negative Scenario: Validate <Scenario> expecting errorr
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Validation_Key>'

        Examples:
            | Scenario                                        | API_Key                                     | Validation_Key                           |
            | Passing invalid scope for get                   | get stored value with invalid scope         | invalid parameters for securestorage get |
            | Passing scope for get as empty string           | get stored value with scope as empty string | invalid parameters for securestorage get |
            | Passing scope for get as number                 | get stored value with scope as number       | invalid parameters for securestorage get |
            | Passing scope for null for getting stored value | get stored value with scope as null         | invalid parameters for securestorage get |
            | Passing scope for get as boolean                | get stored value with scope as boolean      | invalid parameters for securestorage get |
            | without scope                                   | get stored value without scope              | invalid parameters for securestorage get |
            | Passing key for get as number                   | get stored value with key as number         | invalid parameters for securestorage get |
            | Passing key as null                             | get stored value with key as null           | invalid parameters for securestorage get |
            | Passing key as boolean                          | get stored value with key as boolean        | invalid parameters for securestorage get |
            | without key                                     | get stored value without key                | invalid parameters for securestorage get |
            | Passing key for get as empty string             | get stored value with key as empty          | custom error for securestorage get       |

    @sdk @transport
    Scenario Outline: SecureStorage.set - Negative Scenario: Validate <Scenario> expecting error
        Given '3rd party app' invokes the 'Firebolt' API to 'update stored value for key authTestTokenDevice'
        And 'Firebolt' platform responds with 'null for updating a secure data value'
        And '3rd party app' invokes the 'Firebolt' API to 'get stored value with scope as device and key as authTestTokenDevice'
        And 'Firebolt' platform responds with 'expected value for authTestTokenDevice stored data in securestorage'
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Validation_Key>'
        When '3rd party app' invokes the 'Firebolt' API to 'get stored value with scope as device and key as authTestTokenDevice'
        Then 'Firebolt' platform responds with 'expected value for authTestTokenDevice stored data in securestorage'

        Examples:
            | Scenario                        | API_Key                                       | Validation_Key                           |
            | Passing invalid scope           | set secure value with invalid scope           | invalid parameters for securestorage set |
            | Passing scope as number         | set secure value with scope as number         | invalid parameters for securestorage set |
            | Passing scope as null           | set secure value with scope as null           | invalid parameters for securestorage set |
            | Passing scope as boolean        | set secure value with scope as boolean        | invalid parameters for securestorage set |
            | Passing scope as empty string   | set secure value with scope as empty string   | invalid parameters for securestorage set |
            | without scope                   | set secure value without scope                | invalid parameters for securestorage set |
            | Passing key as number           | set secure value with key as number           | invalid parameters for securestorage set |
            | Passing key as null             | set secure value with key as null             | invalid parameters for securestorage set |
            | Passing key as boolean          | set secure value with key as boolean          | invalid parameters for securestorage set |
            | without key                     | set secure value without key                  | invalid parameters for securestorage set |
            | Passing value as number         | set secure value with value as number         | invalid parameters for securestorage set |
            | Passing value as null           | set secure value with value as null           | invalid parameters for securestorage set |
            | Passing value as boolean        | set secure value with value as boolean        | invalid parameters for securestorage set |
            | without value                   | set secure value without value                | invalid parameters for securestorage set |
            | Passing invalid options         | set secure value with invalid options         | invalid parameters for securestorage set |
            | Passing options as empty object | set secure value with options as empty object | invalid parameters for securestorage set |
            | Passing options as empty string | set secure value with options as empty string | invalid parameters for securestorage set |
            | Passing key as empty string     | set secure value with empty key               | custom error for securestorage set       |

    @sdk @transport
    Scenario Outline: SecureStorage.remove - Negative Scenario: Validate <Scenario> expecting error
        Given '3rd party app' invokes the 'Firebolt' API to 'update stored value for key authTestTokenDevice'
        And 'Firebolt' platform responds with 'null for updating a secure data value'
        And '3rd party app' invokes the 'Firebolt' API to 'get stored value with scope as device and key as authTestTokenDevice'
        And 'Firebolt' platform responds with 'expected value for authTestTokenDevice stored data in securestorage'
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Validation_Key>'
        When '3rd party app' invokes the 'Firebolt' API to 'get stored value with scope as device and key as authTestTokenDevice'
        Then 'Firebolt' platform responds with 'expected value for authTestTokenDevice stored data in securestorage'

        Examples:
            | Scenario                      | API_Key                                        | Validation_Key                              |
            | Passing invalid scope         | remove stored value with invalid scope         | invalid parameters for securestorage remove |
            | Passing scope as empty string | remove stored value with scope as empty string | invalid parameters for securestorage remove |
            | Passing scope as number       | remove stored value with scope as number       | invalid parameters for securestorage remove |
            | Passing scope as null         | remove stored value with scope as null         | invalid parameters for securestorage remove |
            | Passing scope as boolean      | remove stored value with scope as boolean      | invalid parameters for securestorage remove |
            | without scope                 | remove stored value without scope              | invalid parameters for securestorage remove |
            | Passing key as number         | remove stored value with key as number         | invalid parameters for securestorage remove |
            | Passing key as null           | remove stored value with key as null           | invalid parameters for securestorage remove |
            | Passing key as boolean        | remove stored value with key as boolean        | invalid parameters for securestorage remove |
            | without key                   | remove stored value without key                | invalid parameters for securestorage remove |
            | Passing key as empty string   | remove stored value with empty key             | custom error for securestorage remove       |

    @sdk @transport
    Scenario Outline: SecureStorage.remove - Positive Scenario: Validate get and remove <Scenario> after TTL
        Given '3rd party app' invokes the 'Firebolt' API to '<Clear_API_Key>'
        And 'Firebolt' platform responds with 'null for clearing stored value'
        And '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key>'
        And 'Firebolt' platform responds with 'null for getting stored value'
        And '3rd party app' invokes the 'Firebolt' API to '<Set_API_Key>'
        And 'Firebolt' platform responds with 'null for updating a secure data value'
        And '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key>'
        And 'Firebolt' platform responds with 'authTestTokenValueTTL for stored value in securestorage'
        And Test runner waits for 60 'seconds'
        When '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key>'
        Then 'Firebolt' platform responds with 'null for getting stored value'
        When '3rd party app' invokes the 'Firebolt' API to '<Remove_API_Key>'
        Then 'Firebolt' platform responds with 'null for removing stored value'
        When '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key>'
        Then 'Firebolt' platform responds with 'null for getting stored value'

        Examples:
            | Scenario           | Get_API_Key                                                               | Set_API_Key                                          | Remove_API_Key                                          | Clear_API_Key                            |
            | with device scope  | get stored value with scope as device and key as authTestTokenDeviceTTL   | set secure value with scope as device and TTL as 50  | remove stored value with scope as device and TTL as 50  | clear stored value with scope as device  |
            | with account scope | get stored value with scope as account and key as authTestTokenAccountTTL | set secure value with scope as account and TTL as 50 | remove stored value with scope as account and TTL as 50 | clear stored value with scope as account |

    @sdk @transport
    Scenario Outline: SecureStorage.clear - Positive Scenario: Clears all the data values <Scenario>
        Given '3rd party app' invokes the 'Firebolt' API to '<Set_API_Key1>'
        And 'Firebolt' platform responds with 'null for updating a secure data value'
        And '3rd party app' invokes the 'Firebolt' API to '<Set_API_Key2>'
        And 'Firebolt' platform responds with 'null for updating a secure data value'
        And '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key1>'
        And 'Firebolt' platform responds with '<Validation_Key1>'
        And '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key2>'
        And 'Firebolt' platform responds with '<Validation_Key2>'
        When '3rd party app' invokes the 'Firebolt' API to '<Clear_API_Key>'
        Then 'Firebolt' platform responds with 'null for clearing stored value'
        When '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key1>'
        Then 'Firebolt' platform responds with 'null for getting stored value'
        When '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key2>'
        Then 'Firebolt' platform responds with 'null for getting stored value'

        Examples:
            | Scenario           | Clear_API_Key                            | Get_API_Key1                                                           | Get_API_Key2                                                            | Set_API_Key1                                     | Set_API_Key2                                      | Validation_Key1                                                      | Validation_Key2                                       |
            | with device scope  | clear stored value with scope as device  | get stored value with scope as device and key as authTestTokenDevice   | get stored value with scope as device and key as authTestTokenDevice1   | update stored value for key authTestTokenDevice  | update stored value for key authTestTokenDevice1  | expected value for authTestTokenDevice stored data in securestorage  | authTestTokenValue2 for stored value in securestorage |
            | with account scope | clear stored value with scope as account | get stored value with scope as account and key as authTestTokenAccount | get stored value with scope as account and key as authTestTokenAccount1 | update stored value for key authTestTokenAccount | update stored value for key authTestTokenAccount1 | expected value for authTestTokenAccount stored data in securestorage | authTestTokenValue2 for stored value in securestorage |

    @sdk @transport
    Scenario Outline: SecureStorage.clear - Negative Scenario: Validate <Scenario> expecting error
        Given '3rd party app' invokes the 'Firebolt' API to 'update stored value for key authTestTokenDevice'
        And 'Firebolt' platform responds with 'null for updating a secure data value'
        And '3rd party app' invokes the 'Firebolt' API to 'get stored value with scope as device and key as authTestTokenDevice'
        And 'Firebolt' platform responds with 'expected value for authTestTokenDevice stored data in securestorage'
        And '3rd party app' invokes the 'Firebolt' API to 'update stored value for key authTestTokenAccount'
        And 'Firebolt' platform responds with 'null for updating a secure data value'
        And '3rd party app' invokes the 'Firebolt' API to 'get stored value with scope as account and key as authTestTokenAccount'
        And 'Firebolt' platform responds with 'expected value for authTestTokenAccount stored data in securestorage'
        When '3rd party app' invokes the 'Firebolt' API to '<Clear_API_key>'
        Then 'Firebolt' platform responds with 'invalid parameters for securestorage clear'
        When '3rd party app' invokes the 'Firebolt' API to 'get stored value with scope as device and key as authTestTokenDevice'
        Then 'Firebolt' platform responds with 'expected value for authTestTokenDevice stored data in securestorage'
        When '3rd party app' invokes the 'Firebolt' API to 'get stored value with scope as account and key as authTestTokenAccount'
        Then 'Firebolt' platform responds with 'expected value for authTestTokenAccount stored data in securestorage'

        Examples:
            | Scenario                      | Clear_API_key                                 |
            | Passing invalid scope         | clear stored value with invalid scope         |
            | Passing scope as empty string | clear stored value with scope as empty string |
            | Passing scope as number       | clear stored value with scope as number       |
            | Passing scope as null         | clear stored value with scope as null         |
            | Passing scope as boolean      | clear stored value with scope as boolean      |
            | without scope                 | clear stored value without scope              |

    # clears the existing key for 1st app
    # 2nd app is launched
    # clears the existing key for 2nd app
    # validates the cleared value for 1st app
    # validates the cleared value for 2nd app
    # set value1 in device scope
    # validates the set values for 1st app
    # validates the set value for 2nd app
    @sdk @transport
    Scenario: SecureStorage.set - Positive Scenario: Validate Adding scope as device in 2 apps
        Given '3rd party app' invokes the 'Firebolt' API to 'clear stored value with scope as device'
        And 'Firebolt' platform responds with 'null for clearing stored value'
        And 3rd party 'certification' app is launched with 'secondary 3rd party app' appId
        And 'secondary 3rd party app' invokes the 'Firebolt' API to 'clear stored value with scope as device'
        And 'Firebolt' platform responds to 'secondary 3rd party app' with 'null for clearing stored value'
        And '3rd party app' invokes the 'Firebolt' API to '<get stored value with scope as device and key as authTestTokenDevice'
        And 'Firebolt' platform responds with 'null for getting stored value'
        And 'secondary 3rd party app' invokes the 'Firebolt' API to 'get stored value with scope as device and key as authTestTokenDevice'
        And 'Firebolt' platform responds to 'secondary 3rd party app' with 'null for getting stored value'
        When '3rd party app' invokes the 'Firebolt' API to 'update stored value for key authTestTokenDevice'
        Then 'Firebolt' platform responds with 'null for updating a secure data value'
        When '3rd party app' invokes the 'Firebolt' API to 'get stored value with scope as device and key as authTestTokenDevice'
        Then 'Firebolt' platform responds with 'expected value for authTestTokenDevice stored data in securestorage'
        When 'secondary 3rd party app' invokes the 'Firebolt' API to 'get stored value with scope as device and key as authTestTokenDevice'
        Then 'Firebolt' platform responds to 'secondary 3rd party app' with 'expected value for authTestTokenDevice stored data in securestorage'

    # 2nd app is launched
    # set value1 in device scope
    # validates the set values for 1st app
    # set value2 in device scope
    # validates the set values for 1st app
    # validates the set values for 2nd app
    # removes value1 with device scope
    # validates the removed value for 1st app
    # validates the removed value for 2nd app
    # validates the remaining value for 1st app
    # validates the remaining value for 2nd app
    @sdk @transport
    Scenario: SecureStorage.remove - Positive Scenario: Validate Removing device scope in 2 apps
        Given 3rd party 'certification' app is launched with 'secondary 3rd party app' appId
        And '3rd party app' invokes the 'Firebolt' API to 'set secure value for key authTestTokenDevice1'
        And 'Firebolt' platform responds with 'null for updating a secure data value'
        And '3rd party app' invokes the 'Firebolt' API to 'get stored value for authTestTokenDevice1 with scope device'
        And 'Firebolt' platform responds with ' expected value for authTestTokenDevice1 stored data in securestorage'
        And '3rd party app' invokes the 'Firebolt' API to 'set secure value for key authTestTokenDevice2'
        And 'Firebolt' platform responds with 'null for updating a secure data value'
        And '3rd party app' invokes the 'Firebolt' API to 'get stored value for authTestTokenDevice2 with scope device'
        And 'Firebolt' platform responds with 'expected value for authTestTokenDevice2 stored data in securestorage'
        And 'secondary 3rd party app' invokes the 'Firebolt' API to 'get stored value for authTestTokenDevice1 with scope device'
        And 'Firebolt' platform responds to 'secondary 3rd party app' with ' expected value for authTestTokenDevice1 stored data in securestorage'
        And 'secondary 3rd party app' invokes the 'Firebolt' API to 'get stored value for authTestTokenDevice2 with scope device'
        And 'Firebolt' platform responds to 'secondary 3rd party app' with 'expected value for authTestTokenDevice2 stored data in securestorage'
        When '3rd party app' invokes the 'Firebolt' API to 'remove the stored value authTestTokenDevice1 with scope device'
        Then 'Firebolt' platform responds with 'null for removing stored value'
        When '3rd party app' invokes the 'Firebolt' API to 'get stored value for authTestTokenDevice1 with scope device'
        Then 'Firebolt' platform responds with 'null for getting stored value'
        When 'secondary 3rd party app' invokes the 'Firebolt' API to 'get stored value for authTestTokenDevice1 with scope device'
        Then 'Firebolt' platform responds to 'secondary 3rd party app' with 'null for getting stored value'
        When '3rd party app' invokes the 'Firebolt' API to 'get stored value for authTestTokenDevice2 with scope device'
        Then 'Firebolt' platform responds with 'expected value for authTestTokenDevice2 stored data in securestorage'
        When 'secondary 3rd party app' invokes the 'Firebolt' API to 'get stored value for authTestTokenDevice2 with scope device'
        Then 'Firebolt' platform responds to 'secondary 3rd party app' with '<expected value for authTestTokenDevice2 stored data in securestorage'

    # 2nd app is launched
    # set value1 in device scope
    # set value2 in device scope
    # validates the set values for 1st app
    # validates the set values for 2nd app
    # clear values with device scope
    # validates the null value for 1st app
    # validates the null value for 2nd app
    @sdk @transport
    Scenario: SecureStorage.clear - Positive Scenario: Clears all the data values with device scope in 2 apps
        Given 3rd party 'certification' app is launched with 'secondary 3rd party app' appId
        And '3rd party app' invokes the 'Firebolt' API to 'update stored value for key authTestTokenDevice'
        And 'Firebolt' platform responds with 'null for updating a secure data value'
        And '3rd party app' invokes the 'Firebolt' API to 'update stored value for key authTestTokenDevice1'
        And 'Firebolt' platform responds with 'null for updating a secure data value'
        And '3rd party app' invokes the 'Firebolt' API to 'get stored value with scope as device and key as authTestTokenDevice'
        And 'Firebolt' platform responds with 'authTestTokenValue2 for stored value in securestorage'
        And '3rd party app' invokes the 'Firebolt' API to 'get stored value with scope as device and key as authTestTokenDevice1'
        And 'Firebolt' platform responds with 'expected value for authTestTokenDevice stored data in securestorage'
        And 'secondary 3rd party app' invokes the 'Firebolt' API to 'get stored value with scope as device and key as authTestTokenDevice'
        And 'Firebolt' platform responds to 'secondary 3rd party app' with '<VauthTestTokenValue2 for stored value in securestorage'
        And 'secondary 3rd party app' invokes the 'Firebolt' API to 'get stored value with scope as device and key as authTestTokenDevice1'
        And 'Firebolt' platform responds to 'secondary 3rd party app' with 'expected value for authTestTokenDevice stored data in securestorage'
        When '3rd party app' invokes the 'Firebolt' API to 'clear stored value with scope as device '
        Then 'Firebolt' platform responds with 'null for clearing stored value'
        When '3rd party app' invokes the 'Firebolt' API to 'get stored value with scope as device and key as authTestTokenDevice'
        Then 'Firebolt' platform responds with 'null for getting stored value'
        When '3rd party app' invokes the 'Firebolt' API to 'get stored value with scope as device and key as authTestTokenDevice1'
        Then 'Firebolt' platform responds with 'null for getting stored value'
        When 'secondary 3rd party app' invokes the 'Firebolt' API to 'get stored value with scope as device and key as authTestTokenDevice'
        Then 'Firebolt' platform responds to 'secondary 3rd party app' with 'null for getting stored value'
        When 'secondary 3rd party app' invokes the 'Firebolt' API to 'get stored value with scope as device and key as authTestTokenDevice1'
        Then 'Firebolt' platform responds to 'secondary 3rd party app' with 'null for getting stored value'