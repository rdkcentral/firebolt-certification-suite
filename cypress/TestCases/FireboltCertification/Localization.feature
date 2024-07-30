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
        When '3rd party app' invokes the 'Firebolt' API to 'get localization additionalInfo'
        And 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' for '<API_Key>'
        When '3rd party app' invokes the 'Firebolt' API to 'get localization additionalInfo'
        Then 'Firebolt' platform responds with '<Validation_Key>'

        Examples:
            | Scenario                           | API_Key                                              | Validation_Key                               |
            | with key and value as string       | set localization addAdditionalInfo with string       | string for localization additionalInfo       |
            | with key and value as empty string | set localization addAdditionalInfo with empty string | empty string for localization additionalInfo |

    @sdk @transport
    Scenario Outline: Localization.removeAdditionalInfo - Positive Scenario: <Scenario>
        When '3rd party app' invokes the 'Firebolt' API to 'get localization additionalInfo'
        And 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' for '<API_Key>'
        When '3rd party app' invokes the 'Firebolt' API to 'get localization additionalInfo'
        Then 'Firebolt' platform responds with '<Validation_Key>'

        Examples:
            | Scenario                           | API_Key                                                 | Validation_Key                                  |
            | with key and value as string       | set localization removeAdditionalInfo with string       | empty key/value for localization additionalInfo |
            | with key and value as empty string | set localization removeAdditionalInfo with empty string | empty response for localization additionalInfo  |

    @sdk @transport
    Scenario: Localization.latlon - Positive Scenario: Get latlon
        When '3rd party app' invokes the 'Firebolt' API to 'get localization latlon'
        Then 'Firebolt' platform responds with 'expected localization latlon'
    
    @sdk @transport
    Scenario Outline: Positive Scenario: Validate interlinked methods - <Methods>
        When '3rd party app' registers for the '<First_Event_Registration_Key>' event using the 'Firebolt' API
        And '3rd party app' registers for the '<Second_Event_Registration_Key>' event using the 'Firebolt' API
        And '3rd party app' invokes the 'Firebolt' API to '<First_Get_API_Key>'
        And 1st party app invokes the 'Firebolt' API to '<Set_API_Key>'
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
    Scenario Outline: <Method> - Positive Scenario: Validate <Scenario>
        When '3rd party app' registers for the '<Event_Registration_Key>' event using the 'Firebolt' API
        And '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key>'
        And 1st party app invokes the 'Firebolt' API to '<Set_API_Key>'
        Then 'Firebolt' platform responds to '1st party app' for '<Set_API_Key>'
        When '3rd party app' invokes the 'Firebolt' API to '<Get_API_Key>'
        Then 'Firebolt' platform responds with '<Method_Validation_Key>'
        And 'Firebolt' platform triggers event '<Event_Validation_Key>'

        Examples:
            | Scenario                                   | Method                               | Event_Registration_Key                        | Set_API_Key                             | Get_API_Key                              | Method_Validation_Key                            | Event_Validation_Key                                               |
            | Set & get locality                         | Localization.locality                | localization onLocalityChanged                | set localization locality to washington | get localization locality                | washington for localization locality             | onlocalitychanged for localization locality with washington        |
            | Set & get countrycode                      | Localization.countrycode             | localization onCountryCodeChanged             | set countrycode to PH                   | get localization countrycode             | PH for localization countrycode                  | oncountrycodechanged for localization with ph                      |
            | Set & get locale                           | Localization.locale                  | localization onLocaleChanged                  | set locale to enUK                      | get localization locale                  | enUK for localization locale                     | onlocalechanged for localization with enUK                         |
            | Set & get Language es                      | Localization.language                | localization onLanguageChanged                | set language to es                      | get localization language                | es for localization language                     | onlanguagechanged for localization with es                         |
            | Set & get Language en                      | Localization.language                | localization onLanguageChanged                | set language to en                      | get localization language                | en for localization language                     | onlanguagechanged for localization with en                         |
            | Set & get preferredAudioLanguages(spa-eng) | Localization.preferredAudioLanguages | localization onPreferredAudioLanguagesChanged | set preferredaudiolanguages to spa eng  | get localization preferredaudiolanguages | spa eng for localization preferredaudiolanguages | onpreferredaudiolanguageschanged for localization with eng spa     |
            | Set & get preferredAudioLanguages(eng-spa) | Localization.preferredAudioLanguages | localization onPreferredAudioLanguagesChanged | set preferredaudiolanguages to eng spa  | get localization preferredaudiolanguages | eng spa for localization preferredaudiolanguages | onpreferredaudiolanguageschanged for localization with eng and spa |
            | Set & get PostalCode                       | Localization.postalCode              | localization onPostalCodeChanged              | set postalcode to 12345                 | get postalcode                           | 12345 for localization postalcode                | onpostalcodechanged for localization postalCode with 12345         |

    @Device  @regression @sdk @requiresPlatformImplementation
    Scenario Outline: Localization.<Method_Name> - Positive Scenario: Clearing event listeners
        When '3rd party app' registers for the '<Registered_Event>' event using the 'Firebolt' API
        And 1st party stops listening to the event '<Clear_Event_Name>'
        And 1st party app invokes the 'Firebolt' API to '<Set_API_Key>'
        Then 'Firebolt' platform responds to '1st party app' for '<Set_API_Key>'
        And 'Firebolt' platform does not trigger event for '<Event_Validation_Key>'

        Examples:
            | Method_Name    | Registered_Event                  | Clear_Event_Name                        | Set_API_Key                | Event_Validation_Key |
            | setLocality    | localization onLocalityChanged    | localization onLocalityChanged event    | set locality to Washington | onLocalityChanged    |
            | setCountryCode | localization onCountryCodeChanged | localization onCountryCodeChanged event | set countrycode to PH      | onCountryCodeChanged |
            | setLocale      | localization onlocalechanged      | localization onLocaleChanged event      | set locale to enUS         | onLocaleChanged      |
            | setLanguage    | localization onlanguagechanged    | localization onLanguageChanged event    | set language to en         | onLanguageChanged    |