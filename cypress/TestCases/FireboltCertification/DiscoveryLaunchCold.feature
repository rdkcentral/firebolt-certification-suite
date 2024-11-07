@DiscoveryLaunch @coreSDK @AppColdLaunch
Feature: Discovery.launch_ColdLaunch

    @initialization
    Scenario: Launch FCA for Discovery.Launch Cold Launch
        Given the environment has been set up for 'Discovery.Launch' tests
        And 3rd party 'certification' app is launched

    @sdk @transport @Sev0
    Scenario Outline: Discovery.Launch - Cold Launch : Launch App with <Scenario> intent
        Given the environment has been set up for 'Discovery.Launch' tests
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 30 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        And '3rd party app' invokes the 'Firebolt' API to '<Call_Parameters_Initialization_With_Context_Key>'
        Then 'Firebolt' platform responds with '<Validation_Key_For_Parameters_Initialization_With_Intent>'
        And 'Firebolt' platform responds with 'foreground for lifecycle state'

        Examples:
            | Scenario   | Discovery_Launch_Key              | Call_Parameters_Initialization_With_Context_Key     | Validation_Key_For_Parameters_Initialization_With_Intent |
            | Null       | launch app with null intent       | get initialization parameters for null intent       | nullintent for initialization parameters                 |
            | Home       | launch app with home intent       | get initialization parameters for Home intent       | homeintent for initialization parameters                 |
            | Playback   | launch app with playback intent   | get initialization parameters for Playback intent   | playbackintent for initialization parameters             |
            | Entity     | launch app with entity intent     | get initialization parameters for Entity intent     | entityintent for initialization parameters               |
            | Launch     | launch app with intent            | get initialization parameters for Launch intent     | launchintent for initialization parameters               |
            | Search     | launch app with search intent     | get initialization parameters for Search intent     | searchintent for initialization parameters               |
            | Section    | launch app with section intent    | get initialization parameters for Section intent    | sectionintent for initialization parameters              |
            | Tune       | launch app with tune intent       | get initialization parameters for Tune intent       | tuneintent for initialization parameters                 |
            | PlayEntity | launch app with playentity intent | get initialization parameters for PlayEntity intent | playentityintent for initialization parameters           |
            | PlayQuery  | launch app with playquery intent  | get initialization parameters for PlayQuery intent  | playqueryintent for initialization parameters            |

    @sdk @transport @Sev1
    Scenario Outline: Discovery.Launch - Cold Launch : Launch App with <Scenario>
        Given the environment has been set up for 'Discovery.Launch' tests
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 30 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        And '3rd party app' invokes the 'Firebolt' API to '<Call_Parameters_Initialization_With_Context_Key>'
        Then 'Firebolt' platform responds with '<Validation_Key_For_Parameters_Initialization_With_Intent>'
        And 'Firebolt' platform responds with 'foreground for lifecycle state'

        Examples:
            | Scenario                                        | Discovery_Launch_Key                                            | Call_Parameters_Initialization_With_Context_Key     | Validation_Key_For_Parameters_Initialization_With_Intent                 |            
            | playquery intent with musictype song            | launch app with playquery intent with musictype song            | get initialization parameters for PlayQuery intent  | playqueryintent musictype song for initialization parameters             |
            | playquery intent with musicType album           | launch app with playquery intent with musictype album           | get initialization parameters for PlayQuery intent  | playqueryintent musictype album for initialization parameters            |
            | playquery intent with programType concert       | launch app with playquery intent with programtype concert       | get initialization parameters for PlayQuery intent  | playqueryintent programtype concert for initialization parameters        |
            | playquery intent with programType sportingevent | launch app with playquery intent with programtype sportingevent | get initialization parameters for PlayQuery intent  | playqueryintent programtype sportingevent for initialization parameters  |
            | playquery intent with programType preview       | launch app with playquery intent with programtype preview       | get initialization parameters for PlayQuery intent  | playqueryintent programtype preview for initialization parameters        |
            | playquery intent with programType other         | launch app with playquery intent with programtype other         | get initialization parameters for PlayQuery intent  | playqueryintent programtype other for initialization parameters          |
            | playquery intent with programType advertisement | launch app with playquery intent with programtype advertisement | get initialization parameters for PlayQuery intent  | playqueryintent programtype advertisement for initialization parameters  |
            | playquery intent with programType musicvideo    | launch app with playquery intent with programtype musicvideo    | get initialization parameters for PlayQuery intent  | playqueryintent programtype musicvideo for initialization parameters     |
            | playquery intent with programType minisode      | launch app with playquery intent with programtype minisode      | get initialization parameters for PlayQuery intent  | playqueryintent programtype minisode for initialization parameters       |
            | playquery intent with programType extra         | launch app with playquery intent with programtype extra         | get initialization parameters for PlayQuery intent  | playqueryintent programtype extra for initialization parameters          |
            | playEntity intent with programType movie        | launch app with playentity intent with programtype movie        | get initialization parameters for PlayEntity intent | playentityintent with programtype movie for initialization parameters    |
            | playEntity intent with programType episode      | launch app with playentity intent with programtype episode      | get initialization parameters for PlayEntity intent | playentityintent with programtype episode for initialization parameters  |
            | playEntity intent with programType concert      | launch app with playentity intent with programtype concert      | get initialization parameters for PlayEntity intent | playentityintent with programtype concert for initialization parameters  |

    @sdk @transport @Sev2
    Scenario Outline: Discovery.Launch - Cold Launch : Launch App with <Scenario>
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
            | playentity intent without options for entityType playlist                           | launch app with playentity intent without options                                                   | get initialization parameters for PlayEntity intent | playentityintent without options for initialization parameters                  |
            | playback intent without entityType and with programType movie                       | launch app with playback intent without entityType and with programType movie                       | get initialization parameters for Playback intent   | playbackintent for initialization parameters without entityType                 |
            | playentity intent without entityType and with programType movie for movieEntity     | launch app with playentity intent without entityType and with programType movie for movieEntity     | get initialization parameters for PlayEntity intent | playentity for initialization parameters without entityType for movieEntity     |
            | playentity intent without entityType and with programType movie for TvEpisodeEntity | launch app with playentity intent without entityType and with programType movie for TvEpisodeEntity | get initialization parameters for Playback intent   | playentity for initialization parameters without entityType for TvEpisodeEntity |

    @sdk @transport @Sev2
    Scenario Outline: Discovery.Launch - Cold Launch : Validating API Error handling for <Scenario>
        Given the environment has been set up for 'Discovery.Launch' tests
        When 1st party app invokes the 'Firebolt' API to '<Error_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'invalid parameters for discoverylaunch'

        Examples:
            | Scenario                                                   | Error_Key                                                              |
            | missing Action Intent                                      | no action intent for discoverylaunch                                   |
            | missing Context Intent                                     | no context intent for discoverylaunch                                  |
            | missing Source Intent                                      | no source intent for discoverylaunch                                   |
            | missing Data Intent                                        | no data intent for discoverylaunch                                     |
            | Invalid Action Intent                                      | invalid action intent for discoverylaunch                              |
            | Invalid Context Intent                                     | invalid context intent for discoverylaunch                             |
            | Playback Intent with only action                           | playback intent only action for discoverylaunch                        |
            | Playback Intent Integer Data                               | playback intent int data for discoverylaunch                           |
            | Entity Intent Integer Data                                 | entity intent int data for discoverylaunch                             |
            | Section Intent Integer Data                                | section intent int data for discoverylaunch                            |
            | Tune Intent Integer Data                                   | tune intent int data for discoverylaunch                               |
            | Home Intent Invalid AppId                                  | home intent invalid appid for discoverylaunch                          |
            | PlayEntity Intent Integer Data                             | playentity intent int data for discoverylaunch                         |
            | PlayQuery Intent Test Data                                 | playquery intent test data for discoverylaunch                         |
            | missing Query Intent                                       | no query intent for discoverylaunch                                    |
            | PlayQuery Intent Integer Data                              | playquery intent int data for discoverylaunch                          |
            | PlayQuery Intent Integer Query                             | playquery intent int query for discoverylaunch                         |
            | PlayQuery Intent Integer ProgramType                       | playquery intent int programtype for discoverylaunch                   |
            | PlayQuery Intent Integer MusicType                         | playquery intent int musictype for discoverylaunch                     |
            | PlayQuery Intent Integer Types                             | playquery intent int types for discoverylaunch                         |
            | PlayQuery Intent ProgramType without array                 | playquery intent programtype string for discoverylaunch                |
            | PlayQuery Intent MusicType without array                   | playquery intent musictype string for discoverylaunch                  |
            | PlayQuery Intent Types without array                       | playquery intent types without array for discoverylaunch               |
            | PlayQuery Intent Invalid ProgramType                       | playquery intent invalid programtype for discoverylaunch               |
            | PlayQuery Intent Invalid MusicType                         | playquery intent invalid musictype for discoverylaunch                 |
            | PlayEntity Intent with multiple options for playlistEntity | playentity multiple options for discoverylaunch                        |
            | PlayEntity Intent with options for entityType program      | playentity program with options for discoverylaunch                    |
            | PlayEntity Intent with Invalid playFirstTrack              | playentity invalid playfirsttrack for discoverylaunch                  |
            | PlayEntity Intent with Integer playFirstId                 | playentity integer playfirstid for discoverylaunch                     |
            | PlayEntity Intent without entityType for playlistEntity    | playentity without entitytype for discoverylaunch                      |
            | PlayEntity Intent without entityId for playlistEntity      | playentity without entityid for discoverylaunch                        |
            | PlayEntity Intent without programType for movieEntity      | playentity without programtype for movieentity for discoverylaunch     |
            | PlayEntity Intent without entityId for movieEntity         | playentity without entityid for movieentity for discoverylaunch        |
            | PlayEntity Intent without programType for TvEpisodeEntity  | playentity without programtype for tvepisodeentity for discoverylaunch |
            | PlayEntity Intent without entityId for TvEpisodeEntity     | playentity without entityid for tvepisodeentity for discoverylaunch    |
            | PlayEntity Intent without seriesId for TvEpisodeEntity     | playentity without seriesid for tvepisodeentity for discoverylaunch    |
            | PlayEntity Intent without seasonId for TvEpisodeEntity     | playentity without seasonid for tvepisodeentity for discoverylaunch    |
            | Invalid Source Intent                                      | invalid source intent for discoverylaunch                              |
            | Integer Source Home Intent                                 | home intent with source null for discoverylaunch                       |
            | Integer Source Playback Intent                             | invalid integer source playback intent for discoverylaunch             |
            | Integer Source Entity Intent                               | invalid integer source entity intent for discoverylaunch               |
            | Integer Source Intent                                      | invalid integer source intent for discoverylaunch                      |
            | Integer Source Search Intent                               | invalid integer source search intent for discoverylaunch               |
            | Integer Source Section Intent                              | invalid integer source section intent for discoverylaunch              |
            | Integer Source Tune Intent                                 | invalid integer source tune intent for discoverylaunch                 |
            | Search Intent Integer Data                                 | search intent integer data for discoverylaunch                         |

    @sdk @transport @Sev2
    Scenario Outline: Discovery.Launch - Cold Launch : Validate API and Event response when <Scenario> for context source
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
            | passing random string | launch app with null intent source     | get initialization parameters for null intent     | nullintent source for initialization parameters          |
            | passing valid string  | launch app with playback intent source | get initialization parameters for playback intent | playbackintent source for initialization parameters      |