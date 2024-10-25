@Localization @coreSDK
Feature: Localization

    Background: Launch FCA for 'Localization'
        Given the environment has been set up for 'Localization' tests
        And 3rd party 'certification' app is launched

    @sdk @transport @Sev2
    Scenario: Localization.additionalInfo - Get additional info
        When '3rd party app' invokes the 'Firebolt' API to 'get localization additionalInfo'
        Then 'Firebolt' platform responds with 'expected localization additionalInfo'

    @sdk @transport @Sev2
    Scenario Outline: Localization.AdditionalInfo - Adding <Scenario> for localization additional info
        Given '3rd party app' invokes the 'Firebolt' API to 'get localization additionalInfo'
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' for '<API_Key>'
        When '3rd party app' invokes the 'Firebolt' API to 'get localization additionalInfo'
        Then 'Firebolt' platform responds with '<Validation_Key>'

        Examples:
            | Scenario                      | API_Key                                              | Validation_Key                               |
            | string as key and value       | set localization addAdditionalInfo with string       | string for localization additionalInfo       |
            | empty string as key and value | set localization addAdditionalInfo with empty string | empty string for localization additionalInfo |

    @sdk @transport @Sev2
    Scenario Outline: Localization.AdditionalInfo - Removing <Scenario> from localization additional info
        Given '3rd party app' invokes the 'Firebolt' API to 'get localization additionalInfo'
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' for '<API_Key>'
        When '3rd party app' invokes the 'Firebolt' API to 'get localization additionalInfo'
        Then 'Firebolt' platform responds with '<Validation_Key>'

        Examples:
            | Scenario                       | API_Key                                                 | Validation_Key                                  |
            | string as key and value        | set localization removeAdditionalInfo with string       | empty key/value for localization additionalInfo |
            | empty string as key and value  | set localization removeAdditionalInfo with empty string | empty response for localization additionalInfo  |

    @sdk @transport @Sev2
    Scenario: Localization.latlon - Get Latitude and Longitude localization info
        When '3rd party app' invokes the 'Firebolt' API to 'get localization latlon'
        Then 'Firebolt' platform responds with 'expected localization latlon'

    @sdk @transport @Sev0
    Scenario Outline: Localization.locale - Validate Locale Response to <Methods> change
        Given '3rd party app' registers for the '<First_Event_Registration_Key>' event using the 'Firebolt' API
        And '3rd party app' registers for the '<Second_Event_Registration_Key>' event using the 'Firebolt' API
        And '3rd party app' invokes the 'Firebolt' API to '<First_Get_API_Key>'
        When 1st party app invokes the 'Firebolt' API to '<Set_API_Key>'
        Then 'Firebolt' platform responds to '1st party app' for '<Set_API_Key>'
        When '3rd party app' invokes the 'Firebolt' API to '<First_Get_API_Key>'
        Then 'Firebolt' platform responds with '<First_Method_Validation_Key>'
        And 'Firebolt' platform triggers event '<First_Event_Validation_Key>'
        When '3rd party app' invokes the 'Firebolt' API to '<Second_Get_API_Key>'
        Then 'Firebolt' platform responds with '<Second_Method_Validation_Key>'
        And 'Firebolt' platform triggers event '<Second_Event_Validation_Key>'

        Examples:
            | Methods                  | First_Event_Registration_Key      | Second_Event_Registration_Key   | Set_API_Key           | First_Get_API_Key            | Second_Get_API_Key         | First_Method_Validation_Key     | Second_Method_Validation_Key    | First_Event_Validation_Key                      | Second_Event_Validation_Key                   |
            | Localization.countrycode | localization onCountryCodeChanged | localization onLocaleChanged    | set countrycode to UK | get localization countrycode | get localization locale    | UK for localization countrycode | enUK for localization locale    | oncountrycodechanged for localization with UK   | onlocalechanged for localization with UK      |
            | Localization.language    | localization onLanguageChanged    | localization onLocaleChanged    | set language to es    | get localization language    | get localization locale    | es for localization language    | esUK for localization locale    | onlanguagechanged for localization with es      | onlocalechanged for localization with esUK    |

    @sdk @transport @Sev0
    Scenario Outline: Localization.<Method> - Validating API and Event Responses for <Method> change to <Value>
        Given we test the 'LOCALIZATION' getters and setters '<Method>' to '<Value>'
        And '3rd party app' registers for the 'Firebolt' event
        And '3rd party app' invokes the 'Firebolt' get API
        When 1st party app invokes the 'Firebolt' API to set value
        Then 'Firebolt' platform responds to '1st party app' set API
        When '3rd party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '3rd party app' get API
        And 'Firebolt' platform triggers '3rd party app' event

        Examples:
            | Method                  | Value      |
            | locale                  | enUK       |
            | language                | en         |
            | language                | es         |

    @sdk @transport @Sev1
    Scenario Outline: Localization.<Method> - Validating API and Event Responses for <Method> change to <Value>
        Given we test the 'LOCALIZATION' getters and setters '<Method>' to '<Value>'
        And '3rd party app' registers for the 'Firebolt' event
        And '3rd party app' invokes the 'Firebolt' get API
        When 1st party app invokes the 'Firebolt' API to set value
        Then 'Firebolt' platform responds to '1st party app' set API
        When '3rd party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '3rd party app' get API
        And 'Firebolt' platform triggers '3rd party app' event

        Examples:
            | Method                  | Value      |
            | locality                | washington |
            | countryCode             | PH         |
            | preferredAudioLanguages | spa,eng    |
            | preferredAudioLanguages | eng,spa    |
            | postalCode              | 12345      |

    @regression @sdk @requiresPlatformImplementation @Sev2
    Scenario Outline: Localization.<Method_Name> - Clearing event listeners for <Method_Name>
        Given '3rd party app' registers for the '<Registered_Event>' event using the 'Firebolt' API
        And 3rd party stops listening to the event '<Clear_Event_Name>'
        When 1st party app invokes the 'Firebolt' API to '<Set_API_Key>'
        Then 'Firebolt' platform responds to '1st party app' for '<Set_API_Key>'
        And 'Firebolt' platform does not trigger event for '<Event_Validation_Key>'

        Examples:
            | Method_Name    | Registered_Event                  | Clear_Event_Name                        | Set_API_Key                | Event_Validation_Key |
            | setLocality    | localization onLocalityChanged    | localization onLocalityChanged event    | set locality to Washington | onLocalityChanged    |
            | setCountryCode | localization onCountryCodeChanged | localization onCountryCodeChanged event | set countrycode to PH      | onCountryCodeChanged |
            | setLocale      | localization onlocalechanged      | localization onLocaleChanged event      | set locale to enUS         | onLocaleChanged      |
            | setLanguage    | localization onlanguagechanged    | localization onLanguageChanged event    | set language to en         | onLanguageChanged    |