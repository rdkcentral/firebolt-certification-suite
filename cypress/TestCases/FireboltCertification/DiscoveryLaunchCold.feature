Feature: Discovery.launch_ColdLaunch

    @initialization
    Scenario: Launch FCA for Discovery.Launch Cold Launch
        Given the environment has been set up for 'Discovery.Launch' tests
        And 3rd party 'certification' app is launched

    @DiscoveryLaunch @coreSDK @sdk @transport
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

    @DiscoveryLaunch @coreSDK @sdk @transport
    Scenario Outline: Discovery.Launch Cold Launch - Negative Scenario: <Scenario> and expecting error
        Given the environment has been set up for 'Discovery.Launch' tests
        When 1st party app invokes the 'Firebolt' API to '<Error_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'invalid parameters for discoverylaunch'

        Examples:
            | Scenario                                                   | Error_Key                                                              |
            | No Action Intent                                           | no action intent for discoverylaunch                                   |
            | No Context Intent                                          | no context intent for discoverylaunch                                  |
            | No Source Intent                                           | no source intent for discoverylaunch                                   |
            | No Data Intent                                             | no data intent for discoverylaunch                                     |
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
            | No Query Intent                                            | no query intent for discoverylaunch                                    |
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

    @DiscoveryLaunch @coreSDK @sdk @transport
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

    @DiscoveryLaunch @coreSDK @sdk @transport
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
            | Scenario                                                         | Discovery_Launch_Key                                                             | Call_Parameters_Initialization_With_Context_Key                   | Validation_Key_For_Parameters_Initialization_With_Intent                          | 
            | Power Intent                                                     | launch app with power Intent                                                     | get initialization parameters for power intent                    | powerintent for initialization parameters                                         |
            | Volume Intent                                                    | launch app with volume Intent                                                    | get initialization parameters for volume intent                   | volumeintemt for initialization parameters                                        |           
            | Mute Intent                                                      | launch app with mute Intent                                                      | get initialization parameters for mute intent                     | muteintent for initialization parameters                                          |
            | Channel Intent with channel next                                 | launch app with channel Intent with channel next                                 | get initialization parameters for channel intent                  | channelintent next channel for initialization parameters                          |
            | Channel Intent with channel previous                             | launch app with channel Intent with channel previous                             | get initialization parameters for channel intent                  | channelintent previous channel for initialization parameters                      |
            | Pause Intent                                                     | launch app with pause Intent                                                     | get initialization parameters for pause intent                    | pauseintent  for initialization parameters                                        |
            | Resume Intent                                                    | launch app with resume Intent                                                    | get initialization parameters for resume intent                   | resumeintent for initialization parameters                                        |
            | Replay Intent                                                    | launch app with replay Intent                                                    | get initialization parameters for replay intent                   | replayintent for initialization parameters                                        |
            | Stop Intent                                                      | launch app with stop Intent                                                      | get initialization parameters for stop intent                     | stopintent for initialization parameters                                          |
            | Seek Intent                                                      | launch app with seek Intent                                                      | get initialization parameters for seek intent                     | seekintent for initialization parameters                                          |
            | Seek Intent with relative true                                   | launch app with seek Intent with relative true                                   | get initialization parameters for seek intent                     | seekintent relative true for initialization parameters                            |
            | Trick Play Intent                                                | launch app with trick play Intent                                                | get initialization parameters for trick play intent               | trick play intent for initialization parameters                                   |
            | Closed Captions Intent with true                                 | launch app with closed captions Intent with true                                 | get initialization parameters for closed captions intent          | closedcaptionsintent true for initialization parameters                           |
            | closed Captions Intent with false                                | launch app with closed captions Intent with false                                | get initialization parameters for closed captions intent          | closedcaptionsintent false for initialization parameters                          |
            | Voice Guidance Intent with true                                  | launch app with voice guidance Intent with true                                  | get initialization parameters for voice guidance intent           | voiceguidanceintent true for initialization parameters                            |
            | Voice Guidance Intent with false                                 | launch app with voice guidance Intent with false                                 | get initialization parameters for voice guidance intent           | voiceguidanceintent false for initialization parameters                           |
            | Voice Guidance Intent with speed 2                               | launch app with voice guidance Intent with speed 2                               | get initialization parameters for voice guidance intent           | voiceguidanceintent with speed 2 for initialization parameters                    |
            | Voice Guidance Intent with speed -1 and relative true            | launch app with voice guidance Intent with speed -1 and relative true            | get initialization parameters for voice guidance intent           | voiceguidanceintent with speed -1 and relative true for initialization parameters |
            | Voice Guidance Intent with true and verbosity low                | launch app with voice guidance Intent with true and verbosity low                | get initialization parameters for voice guidance intent           | voiceguidanceintent true verbosity low for initialization parameters              |
            | Voice Guidance Intent with true and verbosity high               | launch app with voice guidance Intent with true and verbosity high               | get initialization parameters for voice guidance intent           | voiceguidanceintent true and verbosity high for initialization parameters         |
            | Audio Descritions Intent with true                               | launch app with audio descritions Intent with true                               | get initialization parameters for audio descritions intent        | audiodescritionsintent true for initialization parameters                         |
            | Audio Descritions Intent with false                              | launch app with audio descritions Intent with false                              | get initialization parameters for audio descritions intent        | audiodescritionsintent false for initialization parameters                        |
            | High Contrast Intent with high contrast mode on                  | launch app with high contrast Intent with high contrast mode on                  | get initialization parameters for high contrast intent            | highcontrastintent mode on for initialization parameters                          |
            | High Contrast Intent with high contrast mode off                 | launch app with high contrast Intent with high contrast mode off                 | get initialization parameters for high contrast intent            | highcontrastintent mode off for initialization parameters                         |
            | Screen Magnification Intent with screen magnification turned on  | launch app with screen magnification Intent with screen magnification turned on  | get initialization parameters for screen magnification intent     | screenmagnificationintent turned on for initialization parameters                 |
            | Screen Magnification Intent with screen magnification turned off | launch app with screen magnification Intent with screen magnification turned off | get initialization parameters for screen magnification intent     | screenmagnificationintent turned off for initialization parameters                |
            | Screen Magnification Intent with magnification scale 2.5         | launch app with screen magnification Intent with magnification scale 2.5         | get initialization parameters for screen magnification intent     | screenmagnificationintent magnification scale 2.5 for initialization parameters   |
            | Focus Intent with cursor up                                      | launch app with focus Intent cursor up                                           | get initialization parameters for focus intent                    | focusintent cursor up for initialization parameters                               |
            | Focus Intent with cursor down                                    | launch app with focus Intent cursor down                                         | get initialization parameters for focus intent                    | focusintent cursor down for initialization parameters                             |
            | Focus Intent with cursor left                                    | launch app with focus Intent cursor left                                         | get initialization parameters for focus intent                    | focusintent cursor left for initialization parameters                             |
            | Focus Intent with cursor right                                   | launch app with focus Intent cursor right                                        | get initialization parameters for focus intent                    | focusintent cursor right for initialization parameters                            |
            | Select Intent                                                    | launch app with Select Intent                                                    | get initialization parameters for Select intent                   | selectintent for initialization parameters                                        |
            | Scroll Intent up with unit page                                  | launch app with Scroll Intent up with unit page                                  | get initialization parameters for Scroll Intent intent            | scrollintent up unit page for initialization parameters                           |
            | Scroll Intent down with unit page                                | launch app with Scroll Intent down with unit page                                | get initialization parameters for Scroll Intent intent            | scrollintent down unit page for initialization parameters                         |
            | Scroll Intent left with unit page                                | launch app with Scroll Intent left with unit page                                | get initialization parameters for Scroll Intent intent            | scrollintent left unit page for initialization parameters                         |
            | Scroll Intent right with unit page                               | launch app with Scroll Intent right with unit page                               | get initialization parameters for Scroll Intent intent            | scrollintent right unit page for initialization parameters                        |
            | Scroll Intent up with unit line                                  | launch app with Scroll Intent up with unit line                                  | get initialization parameters for Scroll Intent intent            | scrollintent up unit line for initialization parameters                           |
            | Scroll Intent down with unit line                                | launch app with Scroll Intent down with unit line                                | get initialization parameters for Scroll Intent intent            | scrollintent down unit page for initialization parameters                         |
            | Scroll Intent left with unit line                                | launch app with Scroll Intent left with unit line                                | get initialization parameters for Scroll Intent intent            | scrollintent left unit page for initialization parameters                         |
            | Scroll Intent right with unit line                               | launch app with Scroll Intent right with unit line                               | get initialization parameters for Scroll Intent intent            | scrollintent right unit page for initialization parameters                        |
            | Scroll Intent up with unit percent                               | launch app with Scroll Intent up with unit percent                               | get initialization parameters for Scroll Intent intent            | scrollintent up unit percent for initialization parameters                        |
            | Scroll Intent down with unit percent                             | launch app with Scroll Intent down with unit percent                             | get initialization parameters for Scroll Intent intent            | scrollintent down unit percent for initialization parameters                      |
            | Scroll Intent left with unit percent                             | launch app with Scroll Intent left with unit percent                             | get initialization parameters for Scroll Intent intent            | scrollintent left unit percent for initialization parameters                      |
            | Scroll Intent right with unit percent                            | launch app with Scroll Intent right with unit percent                            | get initialization parameters for Scroll Intent intent            | scrollintent right unit percent for initialization parameters                     |
            | Back Intent                                                      | launch app with back Intent                                                      | get initialization parameters for back intent                     | backintent for initialization parameters                                          |
            | Exit Intent                                                      | launch app with exit Intent                                                      | get initialization parameters for exit intent                     | exitintent for initialization parameters                                          |



