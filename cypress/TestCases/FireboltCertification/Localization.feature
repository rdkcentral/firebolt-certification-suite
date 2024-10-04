@Localization @coreSDK
Feature: Localization

    Background: Launch FCA for 'Localization'
        Given the environment has been set up for 'Localization' tests
        And 3rd party 'certification' app is launched

    @sdk @transport
    Scenario: Localization.additionalInfo - Positive Scenario: Get additional info
        When '3rd party app' invokes the 'Firebolt' API to 'get localization additionalInfo'
        Then 'Firebolt' platform responds with 'expected localization additionalInfo'

    @sdk @transport
    Scenario Outline: Localization.addAdditionalInfo - Positive Scenario: <Scenario>
        Given '3rd party app' invokes the 'Firebolt' API to 'get localization additionalInfo'
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' for '<API_Key>'
        When '3rd party app' invokes the 'Firebolt' API to 'get localization additionalInfo'
        Then 'Firebolt' platform responds with '<Validation_Key>'

        Examples:
            | Scenario                           | API_Key                                              | Validation_Key                               |
            | with key and value as string       | set localization addAdditionalInfo with string       | string for localization additionalInfo       |
            | with key and value as empty string | set localization addAdditionalInfo with empty string | empty string for localization additionalInfo |

    @sdk @transport
    Scenario Outline: Localization.removeAdditionalInfo - Positive Scenario: <Scenario>
        Given '3rd party app' invokes the 'Firebolt' API to 'get localization additionalInfo'
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' for '<API_Key>'
        When '3rd party app' invokes the 'Firebolt' API to 'get localization additionalInfo'
        Then 'Firebolt' platform responds with '<Validation_Key>'

        Examples:
            | Scenario                           | API_Key                                                 | Validation_Key                                  |
            | with key and value as string       | set localization removeAdditionalInfo with string       | empty key value for localization additionalInfo |
            | with key and value as empty string | set localization removeAdditionalInfo with empty string | empty response for localization additionalInfo  |

    # Set addAdditionalInfo with integer and boolean
    @sdk @transport
    Scenario Outline: Localization.<Method> - Positive Scenario: <Scenario>
        Given '3rd party app' invokes the 'Firebolt' API to 'get localization additionalInfo'
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' for '<API_Key>'
        When '3rd party app' invokes the 'Firebolt' API to 'get localization additionalInfo'
        Then 'Firebolt' platform responds with '<Validation_Key>'

        Examples:
            | Scenario                                | API_Key                                           | Validation_Key                                 | Method               |
            | with key as string and value as integer | set localization addAdditionalInfo with integer   | integer for localization additionalInfo        | addAdditionalInfo    |
            | with key as string and value as integer | set localization removeAdditionalInfo with string | empty response for localization additionalInfo | removeAdditionalInfo |
            | with key as string and value as boolean | set localization addAdditionalInfo with boolean   | boolean for localization additionalInfo        | addAdditionalInfo    |
            | with key as string and value as boolean | set localization removeAdditionalInfo with string | empty response for localization additionalInfo | removeAdditionalInfo |

    @sdk @transport
    Scenario: Localization.latlon - Positive Scenario: Get latlon
        When '3rd party app' invokes the 'Firebolt' API to 'get localization latlon'
        Then 'Firebolt' platform responds with 'expected localization latlon'

    @sdk @transport
    Scenario Outline: Positive Scenario: Validate interlinked methods - <Methods>
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
            | Methods                                          | First_Event_Registration_Key | Second_Event_Registration_Key     | Set_API_Key        | First_Get_API_Key       | Second_Get_API_Key           | First_Method_Validation_Key  | Second_Method_Validation_Key    | First_Event_Validation_Key                 | Second_Event_Validation_Key                   |
            | Localization.locale and Localization.countrycode | localization onLocaleChanged | localization onCountryCodeChanged | set locale to enUK | get localization locale | get localization countrycode | enUK for localization locale | UK for localization countrycode | onlocalechanged for localization with enUK | oncountrycodechanged for localization with UK |
            | Localization.locale and Localization.language    | localization onLocaleChanged | localization onLanguageChanged    | set locale to esUK | get localization locale | get localization language    | esUK for localization locale | es for localization language    | onlocalechanged for localization with esUK | onlanguagechanged for localization with es    |

    @sdk @transport
    Scenario Outline: Localization.<Method> - Positive Scenario: Validate <Scenario>
        Given we test the 'LOCALIZATION' getters and setters '<Method>' to '<Value>'
        And '3rd party app' registers for the 'Firebolt' event
        And '3rd party app' invokes the 'Firebolt' get API
        When 1st party app invokes the 'Firebolt' API to set value
        Then 'Firebolt' platform responds to '1st party app' set API
        When '3rd party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '3rd party app' get API
        And 'Firebolt' platform triggers '3rd party app' event

        Examples:
            | Scenario                                   | Method                  | Value      |
            | Set & get locality                         | locality                | washington |
            | Set & get countrycode                      | countryCode             | PH         |
            | Set & get locale                           | locale                  | enUK       |
            | Set & get Language es                      | language                | es         |
            | Set & get Language en                      | language                | en         |
            | Set & get preferredAudioLanguages(spa-eng) | preferredAudioLanguages | spa,eng    |
            | Set & get preferredAudioLanguages(eng-spa) | preferredAudioLanguages | eng,spa    |
            | Set & get PostalCode                       | postalCode              | 12345      |

    @regression @sdk @requiresPlatformImplementation
    Scenario Outline: Localization.<Method_Name> - Positive Scenario: Clearing event listeners
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