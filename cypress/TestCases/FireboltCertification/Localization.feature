Feature: Localization

    @initialization
    Scenario: Launch FCA for 'Localization'
        Given the environment has been set up for 'Localization' tests
        And 3rd party 'certification' app is launched

    @Localization @coreSDK @sdk @transport
    Scenario: Localization.additionalInfo - Positive Scenario - Get additional info
        When '3rd party app' invokes the 'Firebolt' API to 'get localization additionalInfo'
        Then 'Firebolt' platform responds with 'expected localization additionalInfo'

    @Localization @coreSDK @sdk @transport
    Scenario Outline: Validating Localization.addAdditionalInfo - Positive Scenario - <Scenario>
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        And '3rd party app' invokes the 'Firebolt' API to 'get localization additionalInfo'
        Then 'Firebolt' platform responds with '<Validation_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'expected localization addAdditionalInfo'
        Examples:
            | Scenario                           | API_Key                                              | Validation_Key                               |
            | with key and value as string       | set localization addAdditionalInfo with string       | string for localization additionalInfo       |
            | with key and value as empty string | set localization addAdditionalInfo with empty string | empty string for localization additionalInfo |

    @Localization @coreSDK @sdk @transport
    Scenario Outline: Validating Localization.removeAdditionalInfo - Positive Scenario - <Scenario>
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        And '3rd party app' invokes the 'Firebolt' API to 'get localization additionalInfo'
        Then 'Firebolt' platform responds with '<Validation_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'expected localization removeAdditionalInfo'
        Examples:
            | Scenario                           | API_Key                                                 | Validation_Key                                  |
            | with key and value as string       | set localization removeAdditionalInfo with string       | empty key/value for localization additionalInfo |
            | with key and value as empty string | set localization removeAdditionalInfo with empty string | empty response for localization additionalInfo  |


    @Localization @coreSDK @sdk @transport
    Scenario Outline: Localization.addAdditionalInfo - Negative Scenario: <Scenario> and expecting error 
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'invalid parameters for localization addAdditionalInfo'
        Examples:
            | Scenario                             | API_Key                                                             |
            | with key as string and value as null | set localization addAdditionalInfo with key as string value as null |
            | with key as null and value as string | set localization addAdditionalInfo with key as null value as string |
            | with key and value as null           | set localization addAdditionalInfo with key and value as null       |
            | with key and value as integer        | set localization addAdditionalInfo with key and value as integer    |
            | with key and value as object         | set localization addAdditionalInfo with key and value as object     |
            | with empty object                    | set localization addAdditionalInfo with empty object                |

    @Localization @coreSDK @sdk @transport
    Scenario Outline: Validating Localization.removeAdditionalInfo - Negative Scenario - <Scenario> and expecting error
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'invalid parameters for localization removeAdditionalInfo'
        Examples:
            | Scenario              | API_Key                                               |
            | with param as object  | set localization removeAdditionalInfo as integer      |
            | with param as integer | set localization removeAdditionalInfo as empty object |

    @Localization @coreSDK @sdk @transport
    Scenario Outline: Validate localization.<Scenario> - Positive Scenario - Get <Scenario>
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Validation_Key>'
        Examples:
            | Scenario    | API_Key                      | Validation_Key                    |
            | countrycode | get localization countrycode | expected localization countrycode |
            | language    | get localization language    | expected localization language    |
            | locale      | get localization locale      | expected localization locale      |
            | latlon      | get localization latlon      | expected localization latlon      |

    @Localization @coreSDK @sdk @transport
    Scenario: Validate Localization.locality - Positive Scenario - Set & get locality
        When 1st party app registers for the 'locality onChanged' event using the 'Firebolt' API
        And 1st party app invokes the 'Firebolt' API to 'set localization locality to washington'
        And '3rd party app' invokes the 'Firebolt' API to 'get localization locality'
        Then 'Firebolt' platform responds with 'washington for localization locality'

    @Localization @coreSDK @sdk @transport
    Scenario Outline: Validate <Method> - Positive Scenario: <Scenario>
        When '3rd party app' registers for the '<Event_Registration_Key>' event using the 'Firebolt' API
        And 1st party app invokes the 'Firebolt' API to '<Set_API_Key>'
        And '3rd party app' invokes the 'Firebolt' API to '<get_API_Key>'
        Then 'Firebolt' platform responds with '<Method_Validation_Key>'
        Then 'Firebolt' platform responds with '<Event_Validation_Key>'
        Examples:
            | Scenario                                    | Method                               | Event_Registration_Key       | Set_API_Key                            | get_API_Key                              | Method_Validation_Key                            | Event_Validation_Key                                   |
            | Set & get countrycode                       | localization.countrycode             | countrycode onChanged        | set countrycode to PH                  | get localization countrycode             | PH for localization countrycode                  | PH for localization countrycode event                  |
            | Set & get locale                            | localization.locale                  | locale onChanged             | set locale to enUS                     | get localization locale                  | enUS for localization locale                     | enUS for localization locale event                     |
            | Set & get Language en                       | localization.language                | language onChanged           | set language to en                     | get localization language                | en for localization language                     | en for localization language event                     |
            | Set & get Language es                       | localization.language                | language onChanged           | set language to es                     | get localization language                | es for localization language                     | es for localization language event                     |
            | Set & get  preferredAudioLanguages(spa-eng) | localization.preferredAudioLanguages | preferredlanguages onChanged | set preferredaudiolanguages to spa eng | get localization preferredaudiolanguages | spa eng for localization preferredaudiolanguages | spa eng for localization preferredaudiolanguages event |
            | Set & get  preferredAudioLanguages(eng-spa) | localization.preferredAudioLanguages | preferredlanguages onChanged | set preferredaudiolanguages to eng spa | get localization preferredaudiolanguages | eng spa for localization preferredaudiolanguages | eng spa for localization preferredaudiolanguages event |

    @Localization @coreSDK @sdk @transport
    Scenario: Localization.postalCode - Positive Scenario: Set & get PostalCode
        When 1st party app invokes the 'Firebolt' API to 'set postalcode to 12345'
        And '3rd party app' invokes the 'Firebolt' API to 'get postalcode'
        Then 'Firebolt' platform responds with '12345 for localization postalcode'

