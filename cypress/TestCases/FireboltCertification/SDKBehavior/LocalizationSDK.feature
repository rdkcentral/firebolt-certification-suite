Feature: Localization_SDK

    Background: Launch FCA for 'Localization'
        Given the environment has been set up for 'Localization' tests
        And 3rd party 'certification' app is launched

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
