Feature: Localization

    Background: Launch FCA for 'Localization'
        Given the environment has been set up for 'Localization' tests
        And 3rd party 'certification' app is launched

    @Localization @coreSDK @sdk @transport
    Scenario: Localization.additionalInfo - Positive Scenario: Get additional info
        When '3rd party app' invokes the 'Firebolt' API to 'get localization additionalInfo'
        Then 'Firebolt' platform responds with 'expected localization additionalInfo'

    @Localization @coreSDK @sdk @transport
    Scenario Outline: Localization.addAdditionalInfo - Positive Scenario: <Scenario>
        When '3rd party app' invokes the 'Firebolt' API to 'get localization additionalInfo'
        And 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'null for localization addAdditionalInfo'
        When '3rd party app' invokes the 'Firebolt' API to 'get localization additionalInfo'
        Then 'Firebolt' platform responds with '<Validation_Key>'

        Examples:
            | Scenario                           | API_Key                                              | Validation_Key                               |
            | with key and value as string       | set localization addAdditionalInfo with string       | string for localization additionalInfo       |
            | with key and value as empty string | set localization addAdditionalInfo with empty string | empty string for localization additionalInfo |

    @Localization @coreSDK @sdk @transport
    Scenario Outline: Localization.removeAdditionalInfo - Positive Scenario: <Scenario>
        When '3rd party app' invokes the 'Firebolt' API to 'get localization additionalInfo'
        And 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'null for localization removeAdditionalInfo'
        When '3rd party app' invokes the 'Firebolt' API to 'get localization additionalInfo'
        Then 'Firebolt' platform responds with '<Validation_Key>'

        Examples:
            | Scenario                           | API_Key                                                 | Validation_Key                                  |
            | with key and value as string       | set localization removeAdditionalInfo with string       | empty key/value for localization additionalInfo |
            | with key and value as empty string | set localization removeAdditionalInfo with empty string | empty response for localization additionalInfo  |

    @Localization @coreSDK @sdk @transport
    Scenario Outline: Localization.<Scenario> - Positive Scenario: Get <Scenario>
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Validation_Key>'

        Examples:
            | Scenario    | API_Key                      | Validation_Key                    |
            | countrycode | get localization countrycode | expected localization countrycode |
            | language    | get localization language    | expected localization language    |
            | locale      | get localization locale      | expected localization locale      |
            | latlon      | get localization latlon      | expected localization latlon      |

    @Localization @coreSDK @sdk @transport
    Scenario Outline: <Method> - Positive Scenario: Validate <Scenario>
        When '3rd party app' registers for the '<Event_Registration_Key>' event using the 'Firebolt' API
        And '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key>'
        And 1st party app invokes the 'Firebolt' API to '<Set_API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Set_Method_Content>'
        When '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key>'
        Then 'Firebolt' platform responds with '<Method_Validation_Key>'
        And 'Firebolt' platform triggers event '<Event_Validation_Key>'

        Examples:
            | Scenario                                   | Method                               | Event_Registration_Key                        | Set_API_Key                             | Get_API_Key                              | Method_Validation_Key                            | Event_Validation_Key                                               | Set_Method_Content                               |
            | Set & get locality                         | Localization.locality                | localization onLocalityChanged                | set localization locality to washington | get localization locality                | washington for localization locality             | onlocalitychanged for localization locality with washington        | null for localization setLocality                |
            | Set & get countrycode                      | Localization.countrycode             | localization onCountryCodeChanged             | set countrycode to PH                   | get localization countrycode             | PH for localization countrycode                  | oncountrycodechanged for localization with ph                      | null for localization setCountrycode             |
            | Set & get locale                           | Localization.locale                  | localization onLocaleChanged                  | set locale to enUK                      | get localization locale                  | enUK for localization locale                     | onlocalechanged for localization with enUK                         | null for localization setLocale                  |
            | Set & get Language es                      | Localization.language                | localization onLanguageChanged                | set language to es                      | get localization language                | es for localization language                     | onlanguagechanged for localization with es                         | null for localization setLanguage                |
            | Set & get Language en                      | Localization.language                | localization onLanguageChanged                | set language to en                      | get localization language                | en for localization language                     | onlanguagechanged for localization with en                         | null for localization setLanguage                |
            | Set & get preferredAudioLanguages(spa-eng) | Localization.preferredAudioLanguages | localization onPreferredAudioLanguagesChanged | set preferredaudiolanguages to spa eng  | get localization preferredaudiolanguages | spa eng for localization preferredaudiolanguages | onpreferredaudiolanguageschanged for localization with eng spa     | null for localization setPreferredAudioLanguages |
            | Set & get preferredAudioLanguages(eng-spa) | Localization.preferredAudioLanguages | localization onPreferredAudioLanguagesChanged | set preferredaudiolanguages to eng spa  | get localization preferredaudiolanguages | eng spa for localization preferredaudiolanguages | onpreferredaudiolanguageschanged for localization with eng and spa | null for localization setPreferredAudioLanguages |
            | Set & get PostalCode                       | Localization.postalCode              | localization onPostalCodeChanged              | set postalcode to 12345                 | get postalcode                           | 12345 for localization postalcode                | onpostalcodechanged for localization postalCode with 12345                   | null for localization setPostalCode              |

    @Device @coreSDK @regression @sdk
    Scenario Outline: Localization.<Method_Name> - Positive Scenario: Clearing event listeners
        When '3rd party app' registers for the '<Registered_Event>' event using the 'Firebolt' API
        And I clear '<Clear_Event_Name>' listeners
        And 1st party app invokes the 'Firebolt' API to '<Set_API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Set_Method_Content>'
        And 'Firebolt' platform responds with '<Event_Validation_Key>'

        Examples:
            | Method_Name    | Registered_Event                  | Clear_Event_Name                        | Set_API_Key                | Event_Validation_Key                             | Set_Method_Content                   |
            | setLocality    | localization onLocalityChanged    | localization onLocalityChanged event    | set locality to Washington | null for localization onLocalityChanged event    | null for localization setLocality    |
            | setCountryCode | localization onCountryCodeChanged | localization onCountryCodeChanged event | set countrycode to PH      | null for localization onCountryCodeChanged event | null for localization setCountryCode |
            | setLocale      | localization onlocalechanged      | localization onLocaleChanged event      | set locale to enUS         | null for localization onLocaleChanged event      | null for localization setLocale      |
            | setLanguage    | localization onlanguagechanged    | localization onLanguageChanged event    | set language to en         | null for localization onLanguageChanged event    | null for localization setLanguage    |
