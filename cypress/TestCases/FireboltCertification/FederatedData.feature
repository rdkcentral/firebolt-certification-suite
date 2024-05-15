Feature: FederatedData

    @initialization
    Scenario: Launch FCA for 'FederatedData'
        Given the environment has been set up for 'FederatedData' tests
        And 3rd party 'certification' app is launched
        When '3rd party app' invokes the 'Firebolt' API to 'get discovery entityInfo'
        And '3rd party app' invokes the 'Firebolt' API to 'get discovery purchasedContent'

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

