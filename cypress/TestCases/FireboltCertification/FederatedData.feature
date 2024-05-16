Feature: FederatedData

    @initialization
    Scenario: Launch FCA for 'FederatedData'
        Given the environment has been set up for 'FederatedData' tests
        And 3rd party 'certification' app is launched
        When '3rd party app' invokes the 'Firebolt' API to 'push entityInfo data'
        And '3rd party app' invokes the 'Firebolt' API to 'push purchasedContent list'

    @FederatedData @coreSDK @sdk @transport
    Scenario Outline: Discovery_content.requestDetails - Positive Scenario: <Scenario>
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key>'

        Examples:
            | Scenario                                  | API_Key                                | Validation_Key                              |
            | Ways to watch                             | get entityInfo with way to watch       | expected way to watch data                  |
            | Content Ratings                           | get entityInfo with content ratings    | expected content ratings                    |
            | Way to watch with two entires             | get way to watch data with two entires | expected way to watch data with two entires |
            | With identifiers AssetId                  | get entityInfo with assetId            | expected identifiers assetId                |
            | With identifiers SeasonId                 | get entityInfo with SeasonId           | expected identifiers SeasonId               |
            | With identifiers SeriesId                 | get entityInfo with SeriesId           | expected identifiers SeriesId               |
            | With identifiers AppcontentData           | get entityInfo with AppcontentData     | expected identifiers AppcontentData         |
            | With entity episodeNumber                 | get entityInfo with episodeNumber      | expected entity episodeNumber               |
            | With entity SeasonNumber                  | get entityInfo with SeasonNumber       | expected entity SeasonNumber                |
            | With entity Synopsis                      | get entityInfo with Synopsis           | expected entity Synopsis                    |
            | With entity ReleaseDate                   | get entityInfo with ReleaseDate        | expected entity ReleaseDate                 |
            | With EntityInfo all values                | get entityInfo with all values         | expected entityInfo with all values         |
            | Without entity type                       | get entityInfo without entity type     | expected entityInfo without entity type     |
            | With entity type                          | get entityInfo with entity type        | expected entityInfo with entity type        |
            | Without program type but with entity type | get entityInfo without program type    | expected entityInfo without program type    |

    @FederatedData @coreSDK @sdk @transport
    Scenario Outline: Discovery_content.requestDetails - Negative Scenario: <Scenario> expecting error
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key>'

        Examples:
            | Scenario           | API_Key                                | Validation_Key                                |
            | Without Expires    | get entityInfo without expires         | custom error for content requestDetails       |
            | Invalid EntityId   | get entityInfo with invalid entityId   | invalid parameters for content requestDetails |
            | Invalid Parameters | get entityInfo with invalid parameters | invalid parameters for content requestDetails |

    @FederatedData @coreSDK @sdk @transport
    Scenario: Discovery_content.requestPurchases - Positive Scenario: Purchased content
        When 1st party app invokes the 'Firebolt' API to 'get list of purchased content'
        Then 'Firebolt' platform responds to '1st party app' with 'expected purchased content list'

    @FederatedData @coreSDK @sdk @transport
    Scenario: Discovery_content.requestPurchases - Negative Scenario: Purchased content with integer
        When 1st party app invokes the 'Firebolt' API to 'get list of purchased content with integer'
        Then 'Firebolt' platform responds to '1st party app' with 'invalid parameters for purchased content'

    @FederatedData @coreSDK @sdk @transport
    Scenario: Discovery.details - Positive Scenario: Push details
        When '3rd party app' invokes the 'Firebolt' API to 'push entityInfo data'
        Then 'Firebolt' platform responds with 'expected entity info'

    @FederatedData @coreSDK @sdk @transport
    Scenario Outline: Discovery.details - Negative Scenario: <Scenario> expecting error
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'Invalid parameters for discovery details'

        Examples:
            | Scenario                        | API_Key                                             |
            | Empty param                     | push entityInfo without parameters                  |
            | Without entityId                | push entityInfo without entityId                    |
            | Invalid integer entityId        | push entityInfo entityId with integer               |
            | Invalid boolean entityId        | push entityInfo entityId with boolean               |
            | Without expires                 | push entityInfo without expires                     |
            | Without details                 | push entityInfo without details                     |
            | Without info                    | push entityInfo without info                        |
            | Without identifiers             | push entityInfo without identifiers                 |
            | Without identifiers entityType  | push entityInfo without identifiers entityType      |
            | Without identifiers programType | push entityInfo without identifiers programType     |
            | Invalid title                   | push entityInfo with invalid title                  |
            | Invalid identifiers entityType  | push entityInfo with invalid identifiers entityType |

    @FederatedData @coreSDK @sdk @transport
    Scenario: Discovery.purchases - Positive Scenario: List of purchased content
        When '3rd party app' invokes the 'Firebolt' API to 'push purchasedContent list'
        Then 'Firebolt' platform responds with 'expected purchasedContent'

    @FederatedData @coreSDK @sdk @transport
    Scenario Outline: Discovery.purchases - Negative Scenario: <Scenario> expecting error
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'Invalid parameters for discovery purchases'

        Examples:
            | Scenario           | API_Key                                       |
            | Empty param        | push purchasedContent list without parameters |
            | Without expires    | push purchasedContent list without expires    |
            | Without totalCount | push purchasedContent list without totalCount |
            | Without entries    | push purchasedContent list without entries    |