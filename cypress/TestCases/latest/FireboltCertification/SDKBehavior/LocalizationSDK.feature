@Localization @manageSDK
Feature: Localization_SDK

    Background: Launch FCA for 'Localization'
        Given the environment has been set up for 'Localization' tests
        And 3rd party 'certification' app is launched

    @sdk
    Scenario Outline: Localization.<Scenario> - Positive Scenario: <Attribute> with undefined params
        Given we test the 'LOCALIZATION_SDK_BEHAVIOUR' getters and setters '<Attribute>'
        When 1st party app invokes the 'Firebolt' API to set value
        Then 'Firebolt' platform responds to '1st party app' set API

        Examples:
            | Scenario       | Attribute   |
            | setLocality    | locality    |
            | setPostalCode  | postalCode  |
            | setCountryCode | countryCode |
            | setLanguage    | language    |
            | setLocale      | locale      |
            | setTimeZone    | timeZone    |

    @sdk
    Scenario: Localization.setPreferredAudioLanguages - Positive Scenario: preferredAudioLanguages with undefined params
        Given we test the 'LOCALIZATION_PREFERREDAUDIO_LANGUAGES' getters and setters 'preferredAudioLanguages'
        When 1st party app invokes the 'Firebolt' API to set value
        Then 'Firebolt' platform responds to '1st party app' set API