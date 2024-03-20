Feature: Localization_Manage

    @initialization
    Scenario: Launch FCA for 'Localization'
        Given the environment has been set up for 'Localization' tests
        And 3rd party 'certification' app is launched

    # Since the "refui" app validation is not designed, the event validation step is commented out.
    @Localization @manageSDK @sdk @transport
    Scenario Outline: Localization.<Scenario> - Positive Scenario: <Scenario>
        When 1st party app registers for the '<Event_Registration_Key>' event using the 'Firebolt' API
        And 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Set_Method_Content>'
        When 1st party app invokes the 'Firebolt' API to '<Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Method_Validation_Key>'
        And 'Firebolt' platform triggers to '1st party app' event '<Event_Validation_Key>'

        Examples:
            | Scenario                | Event_Registration_Key                               | API_Key                                | Key                         | Method_Validation_Key               | Event_Validation_Key                                           | Set_Method_Content                               |
            | Locality                | manage localization onLocalityChanged                | set locality to washington             | get locality                | washington for locality             | onLocalityChanged for localization with washington             | null for localization setLocality                |
            | PostalCode              | manage localization onPostalCodeChanged              | set postalCode to 123456               | get manage postalCode       | 123456 for postalCode               | onPostalCodeChanged for localization with 123456               | null for localization setPostalCode              |
            | CountryCode             | manage localization onCountryCodeChanged             | set countrycode to PH                  | get countrycode             | PH for localization countrycode     | onCountryCodeChanged for localization with PH                  | null for localization setCountryCode             |
            | Language es             | manage localization onLanguageChanged                | set language to es                     | get language                | es for localization language        | onLanguageChanged for localization with es                     | null for localization setLanguage                |
            | Language en             | manage localization onLanguageChanged                | set language to en                     | get language                | en for localization language        | onLanguageChanged for localization with en                     | null for localization setLanguage                |
            | Locale                  | manage localization onLocaleChanged                  | set locale to enUK                     | get locale                  | enUK for localization locale        | onLocaleChanged for localization with enUK                     | null for localization setLocale                  |
            | Time-Zone               | manage localization onTimeZoneChanged                | set timeZone to America/NewYork        | get timeZone                | America/NewYork for timeZone        | onTimeZoneChanged for localization with America/NewYork        | null for localization setTimeZone                |
            | PreferredAudioLanguages | manage localization onPreferredAudioLanguagesChanged | set preferredAudioLanguages to spa eng | get preferredAudioLanguages | spa eng for preferredAudioLanguages | onPreferredAudioLanguagesChanged for localization with spa eng | null for localization setPreferredAudioLanguages |

    @Localization @manageSDK @sdk @transport
    Scenario Outline: Localization.<Method> - Negative Scenario: <Scenario> expecting error
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key>'

        Examples:
            | Scenario            | API_Key                     | Method     | Validation_Key                   |
            | Locality-integer    | set locality with integer   | locality   | Invalid parameter for locality   |
            | Locality-boolean    | set locality with boolean   | locality   | Invalid parameter for locality   |
            | Locale-integer      | set locale with integer     | locale     | Invalid parameter for locale     |
            | Postal Code-integer | set postalCode with boolean | postalCode | Invalid parameter for postalCode |
            | Postal Code-boolean | set postalCode with boolean | postalCode | Invalid parameter for postalCode |
            | TimeZone-integer    | set timeZone with boolean   | timeZone   | Invalid parameter for timeZone   |
            | TimeZone-boolean    | set timeZone with boolean   | timeZone   | Invalid parameter for timeZone   |

    @Localization @manageSDK @sdk @transport
    Scenario Outline: Localization.<Method> - Negative Scenario: <Scenario> expecting error
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key>'

        Examples:
            | Scenario                         | API_Key                             | Method                     | Validation_Key                                |
            | Set 12 to countrycode            | set countrycode with integer        | setCountryCode             | Invalid parameter for countrycode             |
            | Set true to countrycode          | set countrycode with boolean        | setCountryCode             | Invalid parameter for countrycode             |
            | Set english to language          | set language to english             | setLanguage                | Invalid parameter for language                |
            | Set true to language             | set language to true                | setLanguage                | Invalid parameter for language                |
            | Set 12 to language               | set language with integer           | setLanguage                | Invalid parameter for language                |
            | Set true to locale               | set locale with boolean             | setLocale                  | Invalid parameter for locale                  |
            | Set preferredAudioLanguages-test | set preferredAudioLanguages to test | setPreferredAudioLanguages | Invalid parameter for preferredAudioLanguages |


    @Localization @manageSDK @sdk @transport
    Scenario Outline: Localization.<SetMethod> - Positive Scenario: <Scenario> with undefined params
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key>'
        
        Examples:
            | Scenario                | SetMethod                  | API_Key                                    | Validation_Key                                |
            | locality                | setLocality                | set locality without params                | expected localization locality                |
            | postalCode              | setPostalCode              | set postalcode without params              | expected localization postalcode              |
            | countryCode             | setCountryCode             | set countrycode without params             | expected manage localization countrycode      |
            | language                | setLanguage                | set language without params                | expected manage localization language         |
            | preferredAudioLanguages | setPreferredAudioLanguages | set preferredaudioLanguages without params | expected localization preferredaudiolanguages |
            | locale                  | setLocale                  | set locale without params                  | expected manage localization locale           |
            | timeZone                | setTimeZone                | set timezone without params                | expected localization timezone                |


    @Localization @coreSDK @sdk @transport
    Scenario Outline: Localization.removeAdditionalInfo - Negative Scenario: <Scenario> and expecting error
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'invalid parameters for localization removeAdditionalInfo'
        
        Examples:
            | Scenario              | API_Key                                               |
            | with param as object  | set localization removeAdditionalInfo as integer      |
            | with param as integer | set localization removeAdditionalInfo as empty object |

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

