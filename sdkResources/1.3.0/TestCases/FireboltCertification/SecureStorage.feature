@Securestorage @coreSDK
Feature: SecureStorage

    Background: Launch FCA for 'Securestorage'
        Given the environment has been set up for 'Securestorage' tests
        And 3rd party 'certification' app is launched

    @sdk @transport @Sev1
    Scenario Outline: SecureStorage.set - Validate secure data content when <Scenario>
        Given '3rd party app' invokes the 'Firebolt' API to '<Clear_API_Key>'
        And 'Firebolt' platform responds with 'null for clearing stored value'
        And '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key>'
        And 'Firebolt' platform responds with 'null for getting stored value'
        When '3rd party app' invokes the 'Firebolt' API to '<Set_API_Key>'
        Then 'Firebolt' platform responds with 'null for updating a secure data value'
        When '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key>'
        Then 'Firebolt' platform responds with '<Validation_Key>'

        Examples:
            | Scenario                   | Get_API_Key                                                             | Set_API_Key                                      | Validation_Key                                                       | Clear_API_Key                            |
            | scope changed to device    | get stored value with scope as device and key as authTestTokenDevice    | update stored value for key authTestTokenDevice  | expected value for authTestTokenDevice stored data in securestorage  | clear stored value with scope as device  |
            | scope changed to account   | get stored value with scope as account and key as authTestTokenAccount  | update stored value for key authTestTokenAccount | expected value for authTestTokenAccount stored data in securestorage | clear stored value with scope as account |
            
    @sdk @transport @Sev2
    Scenario Outline: SecureStorage.set - Validate secure data content when <Scenario>
        Given '3rd party app' invokes the 'Firebolt' API to '<Clear_API_Key>'
        And 'Firebolt' platform responds with 'null for clearing stored value'
        And '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key>'
        And 'Firebolt' platform responds with 'null for getting stored value'
        When '3rd party app' invokes the 'Firebolt' API to '<Set_API_Key>'
        Then 'Firebolt' platform responds with 'null for updating a secure data value'
        When '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key>'
        Then 'Firebolt' platform responds with '<Validation_Key>'

        Examples:
            | Scenario                                      | Get_API_Key                                                             | Set_API_Key                                                    | Validation_Key                                        | Clear_API_Key                            |
            | scope changed to device with optionalparams   | get stored value with scope as device and key as authTestTokenDevice1   | update stored value for key authTestTokenDevice1 with options  | authTestTokenValue1 for stored value in securestorage | clear stored value with scope as device  |
            | scope changed to account with optionalparams  | get stored value with scope as account and key as authTestTokenAccount1 | update stored value for key authTestTokenAccount1 with options | authTestTokenValue1 for stored value in securestorage | clear stored value with scope as account |

    @sdk @transport @Sev1
    Scenario Outline: SecureStorage.set - Validate secure data content when <Scenario>
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
            | updating existing device scope value  | get stored value with scope as device and key as authTestTokenDevice1   | update stored value for key authTestTokenDevice1  | get stored value with scope as device and key as authTestTokenDevice1   | authTestTokenValue2 for stored value in securestorage | authTestTokenValue1 for stored value in securestorage | update stored value for key authTestTokenDevice1 with options  | clear stored value with scope as device  |
            | updating existing account scope value | get stored value with scope as account and key as authTestTokenAccount1 | update stored value for key authTestTokenAccount1 | get stored value with scope as account and key as authTestTokenAccount1 | authTestTokenValue2 for stored value in securestorage | authTestTokenValue1 for stored value in securestorage | update stored value for key authTestTokenAccount1 with options | clear stored value with scope as account |

    @sdk @transport @Sev1
    Scenario Outline: SecureStorage.set - Validate secure data content when <Scenario>
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
            | Scenario                                                      | Get_API_Key1                                                           | Set_API_Key2                                                             | Get_API_Key2                                                          | Validation_Key1                                                      | Validation_Key2                                                                    | Set_API_Key1                                     |
            | adding scope as account for existing key with scope as device | get stored value with scope as device and key as authTestTokenDevice   | update stored value with scope as account and key as authTestTokenDevice | get stored value with scope as account and key as authTestTokenDevice | expected value for authTestTokenDevice stored data in securestorage  | expected value for account scoped authTestTokenDevice stored data in securestorage | update stored value for key authTestTokenDevice  |
            | adding scope as device for existing key with scope as account | get stored value with scope as account and key as authTestTokenAccount | update stored value with scope as device and key as authTestTokenAccount | get stored value with scope as device and key as authTestTokenAccount | expected value for authTestTokenAccount stored data in securestorage | expected value for device scoped authTestTokenAccount stored data in securestorage | update stored value for key authTestTokenAccount |

    @sdk @transport @Sev1
    Scenario Outline: SecureStorage.remove - Validate secure data content when <Scenario>
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
            | removing device scope  | set secure value for key authTestTokenDevice1  | set secure value for key authTestTokenDevice2  | remove the stored value authTestTokenDevice1 with scope device   | get stored value for authTestTokenDevice1 with scope device  | get stored value for authTestTokenDevice2 with scope device  | expected value for authTestTokenDevice2 stored data in securestorage  | expected value for authTestTokenDevice1 stored data in securestorage  | clear stored value with scope as device  |
            | removing account scope | set secure value for key authTestTokenAccount1 | set secure value for key authTestTokenAccount2 | remove the stored value authTestTokenAccount1 with scope account | get stored value for authTestTokenAccount1 with scope device | get stored value for authTestTokenAccount2 with scope device | expected value for authTestTokenAccount2 stored data in securestorage | expected value for authTestTokenAccount1 stored data in securestorage | clear stored value with scope as account |


    @sdk @transport @Sev2
    Scenario Outline: SecureStorage.remove - Validate secure data content <Scenario> after TTL
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
            | Scenario              | Get_API_Key                                                               | Set_API_Key                                          | Remove_API_Key                                          | Clear_API_Key                            |
            | with scope as device  | get stored value with scope as device and key as authTestTokenDeviceTTL   | set secure value with scope as device and TTL as 50  | remove stored value with scope as device and TTL as 50  | clear stored value with scope as device  |
            | with scope as account | get stored value with scope as account and key as authTestTokenAccountTTL | set secure value with scope as account and TTL as 50 | remove stored value with scope as account and TTL as 50 | clear stored value with scope as account |

    @sdk @transport @Sev2
    Scenario Outline: SecureStorage.clear - Validate secure data content is cleared <Scenario>
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
            | Scenario              | Clear_API_Key                            | Get_API_Key1                                                           | Get_API_Key2                                                            | Set_API_Key1                                     | Set_API_Key2                                      | Validation_Key1                                                      | Validation_Key2                                       |
            | with scope as device  | clear stored value with scope as device  | get stored value with scope as device and key as authTestTokenDevice   | get stored value with scope as device and key as authTestTokenDevice1   | update stored value for key authTestTokenDevice  | update stored value for key authTestTokenDevice1  | expected value for authTestTokenDevice stored data in securestorage  | authTestTokenValue2 for stored value in securestorage |
            | with scope as account | clear stored value with scope as account | get stored value with scope as account and key as authTestTokenAccount | get stored value with scope as account and key as authTestTokenAccount1 | update stored value for key authTestTokenAccount | update stored value for key authTestTokenAccount1 | expected value for authTestTokenAccount stored data in securestorage | authTestTokenValue2 for stored value in securestorage |


    # clears the existing key for 1st app
    # 2nd app is launched
    # clears the existing key for 2nd app
    # validates the cleared value for 1st app
    # validates the cleared value for 2nd app
    # set value1 in device scope
    # validates the set values for 1st app
    # validates the set value for 2nd app
    @sdk @transport @Sev1
    Scenario: SecureStorage.set - Validate API Adds value with device scope two apps
        Given '3rd party app' invokes the 'Firebolt' API to 'clear stored value with scope as device'
        And 'Firebolt' platform responds with 'null for clearing stored value'
        And 3rd party 'certification' app is launched with 'secondary 3rd party app' appId
        And 'secondary 3rd party app' invokes the 'Firebolt' API to 'clear stored value with scope as device'
        And 'Firebolt' platform responds to 'secondary 3rd party app' with 'null for clearing stored value'
        And '3rd party app' invokes the 'Firebolt' API to 'get stored value with scope as device and key as authTestTokenDevice'
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
    @sdk @transport @Sev2
    Scenario: SecureStorage.remove - Validate API removes value with device scope in two apps
        Given 3rd party 'certification' app is launched with 'secondary 3rd party app' appId
        And '3rd party app' invokes the 'Firebolt' API to 'set secure value for key authTestTokenDevice1'
        And 'Firebolt' platform responds with 'null for updating a secure data value'
        And '3rd party app' invokes the 'Firebolt' API to 'get stored value for authTestTokenDevice1 with scope device'
        And 'Firebolt' platform responds with 'expected value for authTestTokenDevice1 stored data in securestorage'
        And '3rd party app' invokes the 'Firebolt' API to 'set secure value for key authTestTokenDevice2'
        And 'Firebolt' platform responds with 'null for updating a secure data value'
        And '3rd party app' invokes the 'Firebolt' API to 'get stored value for authTestTokenDevice2 with scope device'
        And 'Firebolt' platform responds with 'expected value for authTestTokenDevice2 stored data in securestorage'
        And 'secondary 3rd party app' invokes the 'Firebolt' API to 'get stored value for authTestTokenDevice1 with scope device'
        And 'Firebolt' platform responds to 'secondary 3rd party app' with 'expected value for authTestTokenDevice1 stored data in securestorage'
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
        Then 'Firebolt' platform responds to 'secondary 3rd party app' with 'expected value for authTestTokenDevice2 stored data in securestorage'

    # 2nd app is launched
    # set value1 in device scope
    # set value2 in device scope
    # validates the set values for 1st app
    # validates the set values for 2nd app
    # clear values with device scope
    # validates the null value for 1st app
    # validates the null value for 2nd app
    @sdk @transport @Sev2
    Scenario: SecureStorage.clear - Validate API clears value with device scope in two apps
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
        And 'Firebolt' platform responds to 'secondary 3rd party app' with 'authTestTokenValue2 for stored value in securestorage'
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