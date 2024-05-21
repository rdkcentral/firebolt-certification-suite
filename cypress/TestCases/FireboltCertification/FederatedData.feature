Feature: FederatedData

    @initialization
    Scenario: Launch FCA for 'FederatedData'
        Given the environment has been set up for 'FederatedData' tests
        And 3rd party 'certification' app is launched
        When '3rd party app' invokes the 'Firebolt' API to 'push entityInfo'
        And '3rd party app' invokes the 'Firebolt' API to 'push purchasedContent'

    @FederatedData @coreSDK @sdk @transport
    Scenario Outline: Discovery_content.requestDetails - Positive Scenario: <Scenario>
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key>'

        Examples:
            | Scenario                                  | API_Key                                 | Validation_Key                               |
            | Ways to watch                             | get entity details with way to watch    | expected way to watch data                   |
            | Content Ratings                           | get entity details with content ratings | expected content ratings                     |
            | Way to watch with two entires             | get way to watch data with two entires  | expected way to watch data with two entires  |
            | With identifiers AssetId                  | get entity details with assetId         | expected identifiers assetId                 |
            | With identifiers SeasonId                 | get entity details with SeasonId        | expected identifiers SeasonId                |
            | With identifiers SeriesId                 | get entity details with SeriesId        | expected identifiers SeriesId                |
            | With identifiers AppcontentData           | get entity details with AppcontentData  | expected identifiers AppcontentData          |
            | With entity episodeNumber                 | get entity details with episodeNumber   | expected entity episodeNumber                |
            | With entity SeasonNumber                  | get entity details with SeasonNumber    | expected entity SeasonNumber                 |
            | With entity Synopsis                      | get entity details with Synopsis        | expected entity Synopsis                     |
            | With entity ReleaseDate                   | get entity details with ReleaseDate     | expected entity ReleaseDate                  |
            | With entityInfo all values                | get entity details with all values      | expected entity details with all values      |
            | Without entity type                       | get entity details without entity type  | expected entity details without entity type  |
            | With entity type                          | get entity details with entity type     | expected entity details with entity type     |
            | Without program type but with entity type | get entity details without program type | expected entity details without program type |

    @FederatedData @coreSDK @sdk @transport
    Scenario Outline: Discovery_content.requestDetails - Negative Scenario: <Scenario> expecting error
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key>'

        Examples:
            | Scenario           | API_Key                                    | Validation_Key                                |
            | Without Expires    | get entity details without expires         | custom error for content requestDetails       |
            | Invalid EntityId   | get entity details with invalid entityId   | invalid parameters for content requestDetails |
            | Invalid Parameters | get entity details with invalid parameters | invalid parameters for content requestDetails |

    @FederatedData @coreSDK @sdk @transport
    Scenario: Discovery_content.requestPurchases - Positive Scenario: Purchases
        When 1st party app invokes the 'Firebolt' API to 'get list of purchases'
        Then 'Firebolt' platform responds to '1st party app' with 'expected purchases'

    @FederatedData @coreSDK @sdk @transport
    Scenario: Discovery_content.requestPurchases - Negative Scenario: Purchases with integer
        When 1st party app invokes the 'Firebolt' API to 'get list of purchases with integer'
        Then 'Firebolt' platform responds to '1st party app' with 'invalid parameters for purchases'

    # for Discovery.details and Discovery.purchases added TCs as per new openRPC.
    @FederatedData @coreSDK @sdk @transport
    Scenario Outline: Discovery.details - Positive Scenario: <Scenario>
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with 'expected entity details'

        Examples:
            | Scenario                                       | API_Key                                             |
            | Push details with all values                   | push entity details data                            |
            | Push details with ways to watch                | push entity details with waysToWatch                |
            | Push details with content ratings              | push entity details with contentRatings             |
            | Push details with identifiers assetId          | push entity details with identifiers assetId        |
            | Push details with identifiers app content data | push entity details with identifiers appcontentData |
            | Push details with info release date            | push entity details with info releaseDate           |
            | Push details with info Season number           | push entity details with info SeasonNumber          |
            | Push details with info Season count            | push entity details with info SeasonCount           |
            | Push details with info episode number          | push entity details with info episodeNumber         |
            | Push details with info episode count           | push entity details with info episodeCount          |

    @FederatedData @coreSDK @sdk @transport
    Scenario Outline: Discovery.details - Negative Scenario: <Scenario> expecting error
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with 'Invalid parameters for discovery details'

        Examples:
            | Scenario                        | API_Key                                                 |
            | Empty param                     | push entity details without parameters                  |
            | Without entityId                | push entity details without entityId                    |
            | Invalid integer entityId        | push entity details entityId with integer               |
            | Invalid boolean entityId        | push entity details entityId with boolean               |
            | Without expires                 | push entity details without expires                     |
            | Without details                 | push entity details without details                     |
            | Without info                    | push entity details without info                        |
            | Without identifiers             | push entity details without identifiers                 |
            | Without identifiers entityType  | push entity details without identifiers entityType      |
            | Without identifiers programType | push entity details without identifiers programType     |
            | Invalid title                   | push entity details with invalid title                  |
            | Invalid identifiers entityType  | push entity details with invalid identifiers entityType |

    @FederatedData @coreSDK @sdk @transport
    Scenario Outline: Discovery.purchases - Positive Scenario: <Scenario>
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with 'expected purchases list'

        Examples:
            | Scenario                                    | API_Key                                        |
            | Purchases with all values                   | push purchases                                 |
            | Purchases with identifiers assetId          | push purchases with identifiers assetId        |
            | Purchases with identifiers app content data | push purchases with identifiers appcontentData |
            | Purchases with ways to watch                | push purchases with waysToWatch                |
            | Purchases with content ratings              | push purchases with contentRatings             |
            | Purchases with release date                 | push purchases with releaseDate                |

    @FederatedData @coreSDK @sdk @transport
    Scenario Outline: Discovery.purchases - Negative Scenario: <Scenario> expecting error
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with 'Invalid parameters for discovery purchases'

        Examples:
            | Scenario           | API_Key                           |
            | Empty param        | push purchases without parameters |
            | Without expires    | push purchases without expires    |
            | Without totalCount | push purchases without totalCount |
            | Without entries    | push purchases without entries    |