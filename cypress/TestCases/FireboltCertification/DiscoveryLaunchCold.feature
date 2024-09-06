@DiscoveryLaunch @coreSDK @AppColdLaunch
Feature: Discovery.launch_ColdLaunch

    @initialization
    Scenario: Launch FCA for Discovery.Launch Cold Launch
        Given the environment has been set up for 'Discovery.Launch' tests
        And 3rd party 'certification' app is launched

    @sdk @transport
    Scenario Outline: Discovery.Launch Cold Launch - Positive Scenario: <Scenario> intent with context
        Given the environment has been set up for 'Discovery.Launch' tests
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 30 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        And '3rd party app' invokes the 'Firebolt' API to '<Call_Parameters_Initialization_With_Context_Key>'
        Then 'Firebolt' platform responds with '<Validation_Key_For_Parameters_Initialization_With_Intent>'
        And 'Firebolt' platform responds with 'foreground for lifecycle state'

    Examples:
        | Scenario                                                                            | Discovery_Launch_Key                                                                                | Call_Parameters_Initialization_With_Context_Key     | Validation_Key_For_Parameters_Initialization_With_Intent                        |
        | Null                                                                                | launch app with null intent                                                                         | get initialization parameters for null intent       | nullintent for initialization parameters                                        |
        | Home                                                                                | launch app with home intent                                                                         | get initialization parameters for Home intent       | homeintent for initialization parameters                                        |
        | Playback                                                                            | launch app with playback intent                                                                     | get initialization parameters for Playback intent   | playbackintent for initialization parameters                                    |
        | Entity                                                                              | launch app with entity intent                                                                       | get initialization parameters for Entity intent     | entityintent for initialization parameters                                      |
        | Launch                                                                              | launch app with intent                                                                              | get initialization parameters for Launch intent     | launchintent for initialization parameters                                      |
        | Search                                                                              | launch app with search intent                                                                       | get initialization parameters for Search intent     | searchintent for initialization parameters                                      |
        | Search with programType movie                                                       | launch app with search intent with programType movie                                                | get initialization parameters for Search intent     | searchintent programType movie for initialization parameters                    |
        | Search with programType episode                                                     | launch app with search intent with programType episode                                              | get initialization parameters for Search intent     | searchintent programType episode for initialization parameters                  |
        | Search with programType season                                                      | launch app with search intent with programType season                                               | get initialization parameters for Search intent     | searchintent programType season for initialization parameters                   |
        | Search with programType series                                                      | launch app with search intent with programType series                                               | get initialization parameters for Search intent     | searchintent programType series for initialization parameters                   |
        | Search with programType concert                                                     | launch app with search intent with programtype concert                                              | get initialization parameters for Search intent     | searchintent programtype concert for initialization parameters                  |
        | Search with programType sportingevent                                               | launch app with search intent with programtype sportingevent                                        | get initialization parameters for Search intent     | searchintent programtype sportingevent for initialization parameters            |
        | Search with programType preview                                                     | launch app with search intent with programtype preview                                              | get initialization parameters for Search intent     | searchintent programtype preview for initialization parameters                  |
        | Search with programType other                                                       | launch app with search intent with programtype other                                                | get initialization parameters for Search intent     | searchintent programtype other for initialization parameters                    |
        | Search with programType advertisement                                               | launch app with search intent with programtype advertisement                                        | get initialization parameters for Search intent     | searchintent programtype advertisement for initialization parameters            |
        | Search with programType musicvideo                                                  | launch app with search intent with programtype musicvideo                                           | get initialization parameters for Search intent     | searchintent programtype musicvideo for initialization parameters               |
        | Search with programType minisode                                                    | launch app with search intent with programtype minisode                                             | get initialization parameters for Search intent     | searchintent programtype minisode for initialization parameters                 |
        | Search with programType extra                                                       | launch app with search intent with programtype extra                                                | get initialization parameters for Search intent     | searchintent programtype extra for initialization parameters                    |
        | Search with musicType song                                                          | launch app with search intent with musictype song                                                   | get initialization parameters for Search intent     | searchintent musictype song for initialization parameters                       |
        | Search with musicType album                                                         | launch app with search intent with musictype album                                                  | get initialization parameters for Search intent     | searchintent musictype album for initialization parameters                      |
        | Search with channelType streaming                                                   | launch app with search intent with channelType streaming                                            | get initialization parameters for Search intent     | searchintent channeltype streaming for initialization parameters                |
        | Search with channelType overTheAir                                                  | launch app with search intent with channelType overTheAir                                           | get initialization parameters for Search intent     | searchintent channeltype overtheair for initialization parameters               |
        | Search with untyped entity                                                          | launch app with search intent with untyped entity                                                   | get initialization parameters for Search intent     | searchintent untyped entity for initialization parameters                       |
        | Search with playlist entity                                                         | launch app with search intent with playlist entity                                                  | get initialization parameters for Search intent     | searchintent playlist entity for initialization parameters                      |
        | Section                                                                             | launch app with section intent                                                                      | get initialization parameters for Section intent    | sectionintent for initialization parameters                                     |
        | Tune                                                                                | launch app with tune intent                                                                         | get initialization parameters for Tune intent       | tuneintent for initialization parameters                                        |
        | PlayEntity                                                                          | launch app with playentity intent                                                                   | get initialization parameters for PlayEntity intent | playentityintent for initialization parameters                                  |
        | PlayQuery                                                                           | launch app with playquery intent                                                                    | get initialization parameters for PlayQuery intent  | playqueryintent for initialization parameters                                   |
        | PlayQuery with musicType song                                                       | launch app with playquery intent with musictype song                                                | get initialization parameters for PlayQuery intent  | playqueryintent musictype song for initialization parameters                    |
        | PlayQuery with musicType album                                                      | launch app with playquery intent with musictype album                                               | get initialization parameters for PlayQuery intent  | playqueryintent musictype album for initialization parameters                   |
        | PlayQuery with programType concert                                                  | launch app with playquery intent with programtype concert                                           | get initialization parameters for PlayQuery intent  | playqueryintent programtype concert for initialization parameters               |
        | PlayQuery with programType sportingevent                                            | launch app with playquery intent with programtype sportingevent                                     | get initialization parameters for PlayQuery intent  | playqueryintent programtype sportingevent for initialization parameters         |
        | PlayQuery with programType preview                                                  | launch app with playquery intent with programtype preview                                           | get initialization parameters for PlayQuery intent  | playqueryintent programtype preview for initialization parameters               |
        | PlayQuery with programType other                                                    | launch app with playquery intent with programtype other                                             | get initialization parameters for PlayQuery intent  | playqueryintent programtype other for initialization parameters                 |
        | PlayQuery with programType advertisement                                            | launch app with playquery intent with programtype advertisement                                     | get initialization parameters for PlayQuery intent  | playqueryintent programtype advertisement for initialization parameters         |
        | PlayQuery with programType musicvideo                                               | launch app with playquery intent with programtype musicvideo                                        | get initialization parameters for PlayQuery intent  | playqueryintent programtype musicvideo for initialization parameters            |
        | PlayQuery with programType minisode                                                 | launch app with playquery intent with programtype minisode                                          | get initialization parameters for PlayQuery intent  | playqueryintent programtype minisode for initialization parameters              |
        | PlayQuery with programType extra                                                    | launch app with playquery intent with programtype extra                                             | get initialization parameters for PlayQuery intent  | playqueryintent programtype extra for initialization parameters                 |
        | PlayEntity with programType movie                                                   | launch app with playentity intent with programtype movie                                            | get initialization parameters for PlayEntity intent | playentityintent with programtype movie for initialization parameters           |
        | PlayEntity with programType episode                                                 | launch app with playentity intent with programtype episode                                          | get initialization parameters for PlayEntity intent | playentityintent with programtype episode for initialization parameters         |
        | PlayEntity with programType concert                                                 | launch app with playentity intent with programtype concert                                          | get initialization parameters for PlayEntity intent | playentityintent with programtype concert for initialization parameters         |
        | PlayEntity without options for entityType playlist                                  | launch app with playentity intent without options                                                   | get initialization parameters for PlayEntity intent | playentityintent without options for initialization parameters                  |
        | Playback intent without entityType and with programType movie                       | launch app with playback intent without entityType and with programType movie                       | get initialization parameters for Playback intent   | playbackintent for initialization parameters without entityType                 |
        | PlayEntity intent without entityType and with programType movie for movieEntity     | launch app with playentity intent without entityType and with programType movie for movieEntity     | get initialization parameters for PlayEntity intent | playentity for initialization parameters without entityType for movieEntity     |
        | PlayEntity intent without entityType and with programType movie for TvEpisodeEntity | launch app with playentity intent without entityType and with programType movie for TvEpisodeEntity | get initialization parameters for Playback intent   | playentity for initialization parameters without entityType for TvEpisodeEntity |

    @sdk @transport
    Scenario Outline: Discovery.Launch Cold Launch - Negative Scenario: <Scenario> and expecting error
        Given the environment has been set up for 'Discovery.Launch' tests
        When 1st party app invokes the 'Firebolt' API to '<Error_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'invalid parameters for discoverylaunch'

    Examples:
        | Scenario                                                    | Error_Key                                                                       |
        | No Action Intent                                            | no action intent for discoverylaunch                                            |
        | No Context Intent                                           | no context intent for discoverylaunch                                           |
        | No Source Intent                                            | no source intent for discoverylaunch                                            |
        | No Data Intent                                              | no data intent for discoverylaunch                                              |
        | Invalid Action Intent                                       | invalid action intent for discoverylaunch                                       |
        | Invalid Context Intent                                      | invalid context intent for discoverylaunch                                      |
        | Playback Intent with only action                            | playback intent only action for discoverylaunch                                 |
        | Playback Intent Integer Data                                | playback intent int data for discoverylaunch                                    |
        | Entity Intent Integer Data                                  | entity intent int data for discoverylaunch                                      |
        | Section Intent Integer Data                                 | section intent int data for discoverylaunch                                     |
        | Tune Intent Integer Data                                    | tune intent int data for discoverylaunch                                        |
        | Home Intent Invalid AppId                                   | home intent invalid appid for discoverylaunch                                   |
        | PlayEntity Intent Integer Data                              | playentity intent int data for discoverylaunch                                  |
        | PlayQuery Intent Test Data                                  | playquery intent test data for discoverylaunch                                  |
        | No Query Intent                                             | no query intent for discoverylaunch                                             |
        | PlayQuery Intent Integer Data                               | playquery intent int data for discoverylaunch                                   |
        | PlayQuery Intent Integer Query                              | playquery intent int query for discoverylaunch                                  |
        | PlayQuery Intent Integer ProgramType                        | playquery intent int programtype for discoverylaunch                            |
        | PlayQuery Intent Integer MusicType                          | playquery intent int musictype for discoverylaunch                              |
        | PlayQuery Intent Integer Types                              | playquery intent int types for discoverylaunch                                  |
        | PlayQuery Intent ProgramType without array                  | playquery intent programtype string for discoverylaunch                         |
        | PlayQuery Intent MusicType without array                    | playquery intent musictype string for discoverylaunch                           |
        | PlayQuery Intent Types without array                        | playquery intent types without array for discoverylaunch                        |
        | PlayQuery Intent Invalid ProgramType                        | playquery intent invalid programtype for discoverylaunch                        |
        | PlayQuery Intent Invalid MusicType                          | playquery intent invalid musictype for discoverylaunch                          |
        | PlayEntity Intent with multiple options for playlistEntity  | playentity multiple options for discoverylaunch                                 |
        | PlayEntity Intent with options for entityType program       | playentity program with options for discoverylaunch                             |
        | PlayEntity Intent with Invalid playFirstTrack               | playentity invalid playfirsttrack for discoverylaunch                           |
        | PlayEntity Intent with Integer playFirstId                  | playentity integer playfirstid for discoverylaunch                              |
        | PlayEntity Intent without entityType for playlistEntity     | playentity without entitytype for discoverylaunch                               |
        | PlayEntity Intent without entityId for playlistEntity       | playentity without entityid for discoverylaunch                                 |
        | PlayEntity Intent without programType for movieEntity       | playentity without programtype for movieentity for discoverylaunch              |
        | PlayEntity Intent without entityId for movieEntity          | playentity without entityid for movieentity for discoverylaunch                 |
        | PlayEntity Intent without programType for TvEpisodeEntity   | playentity without programtype for tvepisodeentity for discoverylaunch          |
        | PlayEntity Intent without entityId for TvEpisodeEntity      | playentity without entityid for tvepisodeentity for discoverylaunch             |
        | PlayEntity Intent without seriesId for TvEpisodeEntity      | playentity without seriesid for tvepisodeentity for discoverylaunch             |
        | PlayEntity Intent without seasonId for TvEpisodeEntity      | playentity without seasonid for tvepisodeentity for discoverylaunch             |
        | Invalid Source Intent                                       | invalid source intent for discoverylaunch                                       |
        | Integer Source Home Intent                                  | home intent with source null for discoverylaunch                                |
        | Integer Source Playback Intent                              | invalid integer source playback intent for discoverylaunch                      |
        | Integer Source Entity Intent                                | invalid integer source entity intent for discoverylaunch                        |
        | Integer Source Intent                                       | invalid integer source intent for discoverylaunch                               |
        | Integer Source Search Intent                                | invalid integer source search intent for discoverylaunch                        |
        | Integer Source Section Intent                               | invalid integer source section intent for discoverylaunch                       |
        | Integer Source Tune Intent                                  | invalid integer source tune intent for discoverylaunch                          |
        | Search Intent Integer Data                                  | search intent integer data for discoverylaunch                                  |
        | Search Intent Suggestion not array                          | search intent Suggestion not array                                              |
        | Search Intent without programType for movieEntity           | search intent without programtype for movieentity for discoverylaunch           |
        | Search Intent without entityType for movieEntity            | search intent without entitytype for movieentity for discoverylaunch            |
        | Search Intent without entityId for movieEntity              | search intent without entityId for movieentity for discoverylaunch              |
        | Search Intent without seriesId for episodeEntity            | search intent without seriesId for episodeentity for discoverylaunch            |
        | Search Intent without seasonId for episodeEntity            | search intent without seasonId for episodeentity for discoverylaunch            |
        | Search Intent without seriesId for seasonEntity             | search intent without seriesId for seasonentity for discoverylaunch             |
        | Search Intent without musicType for musicEntity             | search intent without musicType for musicentity for discoverylaunch             |
        | Search Intent without channelType for channelEntity         | search intent without channelType for channelentity for discoverylaunch         |
        | Search Intent without entityId for untypedEntity            | search intent without entityId for untypedentity for discoverylaunch            |
        | Search Intent with invalid entityType for movieEntity       | search intent with invalid entityType for movieEntity for discoverylaunch       |
        | Search Intent with invalid movieType for movieEntity        | search intent with invalid movieType for movieEntity for discoverylaunch        |
        | Search Intent with integer entityId for movieEntity         | search intent with integer entityId for movieEntity for discoverylaunch         |
        | Search Intent with integer assetId for movieEntity          | search intent with integer assetId for movieEntity for discoverylaunch          |
        | Search Intent with integer appContentData for movieEntity   | search intent with integer appContentData for movieEntity for discoverylaunch   |
        | Search Intent with invalid episodeType for episodeEntity    | search intent with invalid episodetype for episodeEntity for discoverylaunch    |
        | Search Intent with integer seasonId for episodeEntity       | search intent with integer seasonId for episodeEntity for discoverylaunch       |
        | Search Intent with invalid seriesId for episodeEntity       | search intent with invalid seriesId for episodeEntity for discoverylaunch       |
        | Search Intent with invalid seasonType for seasonEntity      | search intent with invalid seasonType for seasonEntity for discoverylaunch      |
        | Search Intent with invalid seriesType for seriesEntity      | search intent with invalid seriesType for seriesEntity for discoverylaunch      |
        | Search Intent with invalid programType for additionalEntity | search intent with invalid programType for additionalEntity for discoverylaunch |
        | Search Intent with invalid entityType for musicEntity       | search intent with invalid entityType for musicEntity for discoverylaunch       |
        | Search Intent with invalid musicType for musicEntity        | search intent with invalid musicType for musicEntity for discoverylaunch        |
        | Search Intent with invalid entityType for channelEntity     | search intent with invalid entityType for channelEntity for discoverylaunch     |
        | Search Intent with invalid channelType for channelEntity    | search intent with invalid channelType for channelEntity for discoverylaunch    |

    @sdk @transport
    Scenario Outline: Discovery.Launch Cold Launch - Positive Scenario: <Scenario> for context source
        Given the environment has been set up for 'Discovery.Launch' tests
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 30 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        And '3rd party app' invokes the 'Firebolt' API to '<Call_Parameters_Initialization_With_Context_Key>'
        Then 'Firebolt' platform responds with '<Validation_Key_For_Parameters_Initialization_With_Intent>'
        And 'Firebolt' platform responds with 'foreground for lifecycle state'

    Examples:
        | Scenario              | Discovery_Launch_Key                   | Call_Parameters_Initialization_With_Context_Key   | Validation_Key_For_Parameters_Initialization_With_Intent |
        | Passing random string | launch app with null intent source     | get initialization parameters for null intent     | nullintent source for initialization parameters          |
        | Passing valid string  | launch app with playback intent source | get initialization parameters for playback intent | playbackintent source for initialization parameters      |

    # Below two scenarios are purely added for sdk certification testing and sign off due to limitation in testing discovery launch testcases with current support
    # These test scenario changes will be reverted after testing and sign off is completed
    @sdk @transport
    Scenario Outline: Discovery.Launch Cold Launch - Positive Scenario: <Scenario> intent with context
        When '3rd party app' invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds with 'true for discoverylaunch'
    Examples:
        | Scenario                              | Discovery_Launch_Key                                         |
        | Search with programType movie         | launch app with search intent with programType movie         |
        | Search with programType episode       | launch app with search intent with programType episode       |
        | Search with programType season        | launch app with search intent with programType season        |
        | Search with programType series        | launch app with search intent with programType series        |
        | Search with programType concert       | launch app with search intent with programtype concert       |
        | Search with programType sportingevent | launch app with search intent with programtype sportingevent |
        | Search with programType preview       | launch app with search intent with programtype preview       |
        | Search with programType other         | launch app with search intent with programtype other         |
        | Search with programType advertisement | launch app with search intent with programtype advertisement |
        | Search with programType musicvideo    | launch app with search intent with programtype musicvideo    |
        | Search with programType minisode      | launch app with search intent with programtype minisode      |
        | Search with programType extra         | launch app with search intent with programtype extra         |
        | Search with musicType song            | launch app with search intent with musictype song            |
        | Search with musicType album           | launch app with search intent with musictype album           |
        | Search with channelType streaming     | launch app with search intent with channelType streaming     |
        | Search with channelType overTheAir    | launch app with search intent with channelType overTheAir    |
        | Search with untyped entity            | launch app with search intent with untyped entity            |
        | Search with playlist entity           | launch app with search intent with playlist entity           |

  @sdk @transport
    Scenario Outline: Discovery.Launch Cold Launch - Negative Scenario: <Scenario> and expecting error
        When '3rd party app' invokes the 'Firebolt' API to '<Error_Key>'
        Then 'Firebolt' platform responds with 'invalid parameters for discoverylaunch'
    Examples:
        | Scenario                                                    | Error_Key                                                                       |
        | Search Intent Suggestion not array                          | search intent Suggestion not array                                              |
        | Search Intent without programType for movieEntity           | search intent without programtype for movieentity for discoverylaunch           |
        | Search Intent without entityType for movieEntity            | search intent without entitytype for movieentity for discoverylaunch            |
        | Search Intent without entityId for movieEntity              | search intent without entityId for movieentity for discoverylaunch              |
        | Search Intent without seriesId for episodeEntity            | search intent without seriesId for episodeentity for discoverylaunch            |
        | Search Intent without seasonId for episodeEntity            | search intent without seasonId for episodeentity for discoverylaunch            |
        | Search Intent without seriesId for seasonEntity             | search intent without seriesId for seasonentity for discoverylaunch             |
        | Search Intent without musicType for musicEntity             | search intent without musicType for musicentity for discoverylaunch             |
        | Search Intent without channelType for channelEntity         | search intent without channelType for channelentity for discoverylaunch         |
        | Search Intent without entityId for untypedEntity            | search intent without entityId for untypedentity for discoverylaunch            |
        | Search Intent with invalid entityType for movieEntity       | search intent with invalid entityType for movieEntity for discoverylaunch       |
        | Search Intent with invalid movieType for movieEntity        | search intent with invalid movieType for movieEntity for discoverylaunch        |
        | Search Intent with integer entityId for movieEntity         | search intent with integer entityId for movieEntity for discoverylaunch         |
        | Search Intent with integer assetId for movieEntity          | search intent with integer assetId for movieEntity for discoverylaunch          |
        | Search Intent with integer appContentData for movieEntity   | search intent with integer appContentData for movieEntity for discoverylaunch   |
        | Search Intent with invalid episodeType for episodeEntity    | search intent with invalid episodetype for episodeEntity for discoverylaunch    |
        | Search Intent with integer seasonId for episodeEntity       | search intent with integer seasonId for episodeEntity for discoverylaunch       |
        | Search Intent with invalid seriesId for episodeEntity       | search intent with invalid seriesId for episodeEntity for discoverylaunch       |
        | Search Intent with invalid seasonType for seasonEntity      | search intent with invalid seasonType for seasonEntity for discoverylaunch      |
        | Search Intent with invalid seriesType for seriesEntity      | search intent with invalid seriesType for seriesEntity for discoverylaunch      |
        | Search Intent with invalid programType for additionalEntity | search intent with invalid programType for additionalEntity for discoverylaunch |
        | Search Intent with invalid entityType for musicEntity       | search intent with invalid entityType for musicEntity for discoverylaunch       |
        | Search Intent with invalid musicType for musicEntity        | search intent with invalid musicType for musicEntity for discoverylaunch        |
        | Search Intent with invalid entityType for channelEntity     | search intent with invalid entityType for channelEntity for discoverylaunch     |
        | Search Intent with invalid channelType for channelEntity    | search intent with invalid channelType for channelEntity for discoverylaunch    |
        | Search Intent with invalid entityId for untypedEntity       | search intent with invalid entityId for untypedEntity for discoverylaunch    |
        