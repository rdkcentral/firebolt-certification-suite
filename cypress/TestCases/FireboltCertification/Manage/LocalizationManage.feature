Feature: Localization_Manage

    Background: Launch FCA for 'Localization'
        Given the environment has been set up for 'Localization' tests

    @Localization @manageSDK @sdk @transport
    Scenario Outline: Localization.<Scenario> - Positive Scenario: <Scenario>
        Given we test the 'LOCALIZATION' getters and setters '<Method>' to '<Value>'
        When '1st party app' registers for the 'Firebolt' event
        And 1st party app invokes the 'Firebolt' API to set '<Method>' to '<Value>'
        Then 'Firebolt' platform responds to '1st party app' set API
        When '1st party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '1st party app' get API
        And 'Firebolt' platform triggers '1st party app' event

        Examples:
            | Scenario                | Method                  | Value            |
            | Locality                | locality                | washington       |
            | PostalCode              | postalCode              | 123456           |
            | CountryCode             | countryCode             | PH               |
            | Language es             | language                | es               |
            | Language en             | language                | en               |
            | Locale                  | locale                  | en-UK            |
            | Time-Zone               | timeZone                | America/New_York |
            | PreferredAudioLanguages | preferredAudioLanguages | spa,eng          |

    @Localization @manageSDK @sdk @transport
    Scenario Outline: Localization.<Method> - Negative Scenario: <Scenario> expecting error
        Given we test the 'LOCALIZATION' getters and setters '<Method>' to '<Value>'
        When 1st party app invokes the 'Firebolt' API to set '<Method>' to invalid '<Value>'
        And 'Firebolt' platform responds to '1st party app' set API with 'INVALID_TYPE_PARAMS'

        Examples:
            | Scenario            | Method   | Value |
            | Locality-integer    | locality | 123   |
            | Locality-boolean    | locality | true  |
            | Locale-integer      | locale   | 123   |
            | Postal Code-integer | locality | 123   |
            | Postal Code-boolean | locality | true  |
            | TimeZone-integer    | locality | 123   |
            | TimeZone-boolean    | locality | true  |

    @Localization @manageSDK @sdk @transport
    Scenario Outline: Localization.<Method> - Negative Scenario: <Scenario> expecting error
        Given we test the 'LOCALIZATION' getters and setters '<Method>' to '<Value>'
        When 1st party app invokes the 'Firebolt' API to set '<Method>' to invalid '<Value>'
        And 'Firebolt' platform responds to '1st party app' set API with 'INVALID_TYPE_PARAMS'

        Examples:
            | Scenario                         | Method                  | Value |
            | Set 12 to countrycode            | countryCode             | 12    |
            | Set true to countrycode          | countryCode             | true  |
            | Set english to language          | language                | 123   |
            | Set true to language             | language                | true  |
            | Set 12 to language               | language                | 12    |
            | Set true to locale               | locale                  | true  |
            | Set preferredAudioLanguages-test | preferredAudioLanguages | test  |

    # empty object?
    @Localization @manageSDK @sdk @transport
    Scenario Outline: Localization.removeAdditionalInfo - Negative Scenario: <Scenario> and expecting error
        Given we test the 'LOCALIZATION_ADDITIONAL_INFO' getters and setters '<Method>' to '<Value>'
        When 1st party app invokes the 'Firebolt' API to set '<Method>' to invalid '<Value>'
        And 'Firebolt' platform responds to '1st party app' set API with 'INVALID_TYPE_PARAMS'

        Examples:
            | Scenario              | Method               | Value |
            | with param as integer | removeAdditionalInfo | 12345 |
            | with param as object  | removeAdditionalInfo |       |

    # object params?
    @Localization @manageSDK @sdk @transport
    Scenario Outline: Localization.addAdditionalInfo - Negative Scenario: <Scenario> and expecting error
        Given we test the 'LOCALIZATION_ADDITIONAL_INFO' getters and setters '<Method>' to '<Value>'
        When 1st party app invokes the 'Firebolt' API to set '<Method>' to invalid '<Value>'
        And 'Firebolt' platform responds to '1st party app' set API with 'INVALID_TYPE_PARAMS'

        Examples:
            | Scenario                             | Method            | Value |
            | with key as string and value as null | addAdditionalInfo | 12345 |
            | with key as null and value as string | addAdditionalInfo |       |
            | with key and value as null           | addAdditionalInfo |       |
            | with key and value as integer        | addAdditionalInfo |       |
            | with key and value as object         | addAdditionalInfo |       |
            | with empty object                    | addAdditionalInfo |       |