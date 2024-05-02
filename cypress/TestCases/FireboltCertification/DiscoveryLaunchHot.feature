Feature: Discovery.launch_HotLaunch

    @initialization
    Scenario: Launch FCA for Discovery.Launch Hot Launch
        Given the environment has been set up for 'DiscoveryLaunch' tests
        And 3rd party 'certification' app is launched
        And Test runner waits for 10 'seconds'
        And '3rd party app' transitions to state 'foreground'
        And '3rd party app' registers for the 'discovery onNavigateTo' event using the 'Firebolt' API

    @DiscoveryLaunch @coreSDK @sdk @transport
    Scenario Outline: Discovery.Launch Hot Launch - Positive Scenario: <Scenario> intent and app in foreground
        Given the environment has been set up for 'DiscoveryLaunch' tests
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 30 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'
        And 'Firebolt' platform triggers event '<Event_Content>'

        Examples:
            | Scenario                                                            | Discovery_Launch_Key                                                            | Event_Content                                                                     |
            | Home Foreground                                                     | launch app with home intent                                                     | onNavigateTo with home intent                                                     |
            | Playback Foreground                                                 | launch app with playback intent                                                 | onNavigateTo with playback intent                                                 |
            | Playback Foreground without entityType                              | launch app with playback intent without entityType                              | onNavigateTo with playback intent without entityType                              |
            | Entity Foreground                                                   | launch app with entity intent                                                   | onNavigateTo with entity intent                                                   |
            | Entity Foreground without entityType                                | launch app with entity intent without entityType                                | onNavigateTo with entity intent without entityType                                |
            | Launch Foreground                                                   | launch app with intent                                                          | onNavigateTo with intent                                                          |
            | Search Foreground                                                   | launch app with search intent                                                   | onNavigateTo with search intent                                                   |
            | Section Foreground                                                  | launch app with section intent                                                  | onNavigateTo with section intent                                                  |
            | Tune Foreground                                                     | launch app with tune intent                                                     | onNavigateTo with tune intent                                                     |
            | PlayEntity Foreground                                               | launch app with playentity intent                                               | onNavigateTo with playentity intent                                               |
            | PlayQuery Foreground                                                | launch app with playquery intent                                                | onNavigateTo with playquery intent                                                |
            | PlayQuery Foreground with musictype song                            | launch app with playquery intent with musictype song                            | onNavigateTo with playquery intent with musictype song                            |
            | PlayQuery Foreground with musictype album                           | launch app with playquery intent with musictype album                           | onNavigateTo with playquery intent with musictype album                           |
            | PlayQuery Foreground with programtype concert                       | launch app with playquery intent with programtype concert                       | onNavigateTo with playquery intent with programtype concert                       |
            | PlayQuery Foreground with programtype sportingevent                 | launch app with playquery intent with programtype sportingevent                 | onNavigateTo with playquery intent with programtype sportingevent                 |
            | PlayQuery Foreground with programtype preview                       | launch app with playquery intent with programtype preview                       | onNavigateTo with playquery intent with programtype preview                       |
            | PlayQuery Foreground with programtype other                         | launch app with playquery intent with programtype other                         | onNavigateTo with playquery intent with programtype other                         |
            | PlayQuery Foreground with programtype advertisement                 | launch app with playquery intent with programtype advertisement                 | onNavigateTo with playquery intent with programtype advertisement                 |
            | PlayQuery Foreground with programtype musicvideo                    | launch app with playquery intent with programtype musicvideo                    | onNavigateTo with playquery intent with programtype musicvideo                    |
            | PlayQuery Foreground with programtype minisode                      | launch app with playquery intent with programtype minisode                      | onNavigateTo with playquery intent with programtype minisode                      |
            | PlayQuery Foreground with programtype extra                         | launch app with playquery intent with programtype extra                         | onNavigateTo with playquery intent with programtype extra                         |
            | PlayQuery Foreground with musictype song programtype concert        | launch app with playquery intent with musictype song programtype concert        | onNavigateTo with playquery intent with musictype song programtype concert        |
            | PlayQuery Foreground with musictype song programtype sportingevent  | launch app with playquery intent with musictype song programtype sportingevent  | onNavigateTo with playquery intent with musictype song programtype sportingevent  |
            | PlayQuery Foreground with musictype song programtype preview        | launch app with playquery intent with musictype song programtype preview        | onNavigateTo with playquery intent with musictype song programtype preview        |
            | PlayQuery Foreground with musictype song programtype other          | launch app with playquery intent with musictype song programtype other          | onNavigateTo with playquery intent with musictype song programtype other          |
            | PlayQuery Foreground with musictype song programtype advertisement  | launch app with playquery intent with musictype song programtype advertisement  | onNavigateTo with playquery intent with musictype song programtype advertisement  |
            | PlayQuery Foreground with musictype song programtype musicvideo     | launch app with playquery intent with musictype song programtype musicvideo     | onNavigateTo with playquery intent with musictype song programtype musicvideo     |
            | PlayQuery Foreground with musictype song programtype minisode       | launch app with playquery intent with musictype song programtype minisode       | onNavigateTo with playquery intent with musictype song programtype minisode       |
            | PlayQuery Foreground with musictype song programtype extra          | launch app with playquery intent with musictype song programtype extra          | onNavigateTo with playquery intent with musictype song programtype extra          |
            | PlayQuery Foreground with musictype album programtype concert       | launch app with playquery intent with musictype album programtype concert       | onNavigateTo with playquery intent with musictype album programtype concert       |
            | PlayQuery Foreground with musictype album programtype sportingevent | launch app with playquery intent with musictype album programtype sportingevent | onNavigateTo with playquery intent with musictype album programtype sportingevent |
            | PlayQuery Foreground with musictype album programtype preview       | launch app with playquery intent with musictype album programtype preview       | onNavigateTo with playquery intent with musictype album programtype preview       |
            | PlayQuery Foreground with musictype album programtype other         | launch app with playquery intent with musictype album programtype other         | onNavigateTo with playquery intent with musictype album programtype other         |
            | PlayQuery Foreground with musictype album programtype advertisement | launch app with playquery intent with musictype album programtype advertisement | onNavigateTo with playquery intent with musictype album programtype advertisement |
            | PlayQuery Foreground with musictype album programtype musicvideo    | launch app with playquery intent with musictype album programtype musicvideo    | onNavigateTo with playquery intent with musictype album programtype musicvideo    |
            | PlayQuery Foreground with musictype album programtype minisode      | launch app with playquery intent with musictype album programtype minisode      | onNavigateTo with playquery intent with musictype album programtype minisode      |
            | PlayQuery Foreground with musictype album programtype extra         | launch app with playquery intent with musictype album programtype extra         | onNavigateTo with playquery intent with musictype album programtype extra         |
            | PlayEntity Foreground without options for entityType playlist       | launch app with playentity intent without options                               | onNavigateTo with playentity intent without options                               |
            | PlayEntity Foreground with programType movie                        | launch app with playentity intent with programtype movie                        | onNavigateTo with playentity intent with programtype movie                        |
            | PlayEntity Foreground with programType episode                      | launch app with playentity intent with programtype episode                      | onNavigateTo with playentity intent with programtype episode                      |
            | PlayEntity Foreground with programType concert                      | launch app with playentity intent with programtype concert                      | onNavigateTo with playentity intent with programtype concert                      |

    @DiscoveryLaunch @coreSDK @sdk @transport
    Scenario Outline: Discovery.Launch Hot Launch - Positive Scenario: <Scenario> intent and app in inactive
        Given the environment has been set up for 'DiscoveryLaunch' tests
        And '3rd party app' transitions to state 'inactive'
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 10 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'
        And 'Firebolt' platform triggers event '<Event_Content>'

        Examples:
            | Scenario                                                    | Discovery_Launch_Key                                                     | Event_Content                                                              |
            | Home Inactive                                               | launch app with home intent                                              | onNavigateTo with home intent                                              |
            | Playback Inactive                                           | launch app with playback intent                                          | onNavigateTo with playback intent                                          |
            | Entity Inactive                                             | launch app with entity intent                                            | onNavigateTo with entity intent                                            |
            | Launch Inactive                                             | launch app with intent                                                   | onNavigateTo with intent                                                   |
            | Search Inactive                                             | launch app with search intent                                            | onNavigateTo with search intent                                            |
            | Section Inactive                                            | launch app with section intent                                           | onNavigateTo with section intent                                           |
            | Tune Inactive                                               | launch app with tune intent                                              | onNavigateTo with tune intent                                              |
            | PlayEntity Inactive                                         | launch app with playentity intent                                        | onNavigateTo with playentity intent                                        |
            | PlayQuery Inactive                                          | launch app with PlayQuery intent                                         | onNavigateTo with PlayQuery intent                                         |
            | PlayQuery Inactive with musictype song                      | launch app with playquery intent with musictype song                     | onNavigateTo with playquery intent with musictype song                     |
            | PlayQuery Inactive with programtype concert                 | launch app with playquery intent with programtype concert                | onNavigateTo with playquery intent with programtype concert                |
            | PlayQuery Inactive with musictype song programtype concert  | launch app with playquery intent with musictype song programtype concert | onNavigateTo with playquery intent with musictype song programtype concert |
            | PlayEntity Inactive without options for entityType playlist | launch app with playentity intent without options                        | onNavigateTo with playentity intent without options                        |
            | PlayEntity Inactive with programType movie                  | launch app with playentity intent with programtype movie                 | onNavigateTo with playentity intent with programtype movie                 |

    @DiscoveryLaunch @coreSDK @sdk @transport
    Scenario Outline: Discovery.Launch Hot Launch - Positive Scenario: <Scenario> intent and app in background
        Given the environment has been set up for 'DiscoveryLaunch' tests
        And '3rd party app' transitions to state 'background'
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 10 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'
        And 'Firebolt' platform triggers event '<Event_Content>'

        Examples:
            | Scenario                                                      | Discovery_Launch_Key                                                     | Event_Content                                                              |
            | Home Background                                               | launch app with home intent                                              | onNavigateTo with home intent                                              |
            | Playback Background                                           | launch app with playback intent                                          | onNavigateTo with playback intent                                          |
            | Entity Background                                             | launch app with entity intent                                            | onNavigateTo with entity intent                                            |
            | Launch Background                                             | launch app with intent                                                   | onNavigateTo with intent                                                   |
            | Search Background                                             | launch app with search intent                                            | onNavigateTo with search intent                                            |
            | Section Background                                            | launch app with section intent                                           | onNavigateTo with section intent                                           |
            | Tune Background                                               | launch app with tune intent                                              | onNavigateTo with tune intent                                              |
            | PlayEntity Background                                         | launch app with playentity intent                                        | onNavigateTo with playentity intent                                        |
            | PlayQuery Background                                          | launch app with PlayQuery intent                                         | onNavigateTo with PlayQuery intent                                         |
            | PlayQuery Background with musictype song                      | launch app with playquery intent with musictype song                     | onNavigateTo with playquery intent with musictype song                     |
            | PlayQuery Background with programtype concert                 | launch app with playquery intent with programtype concert                | onNavigateTo with playquery intent with programtype concert                |
            | PlayQuery Background with musictype song programtype concert  | launch app with playquery intent with musictype song programtype concert | onNavigateTo with playquery intent with musictype song programtype concert |
            | PlayEntity Background without options for entityType playlist | launch app with playentity intent without options                        | onNavigateTo with playentity intent without options                        |
            | PlayEntity Background with programType movie                  | launch app with playentity intent with programtype movie                 | onNavigateTo with playentity intent with programtype movie                 |

    @DiscoveryLaunch @coreSDK @sdk @transport
    Scenario Outline: Discovery.Launch Hot Launch - Positive Scenario: Null intent and app in <state>
        Given the environment has been set up for 'DiscoveryLaunch' tests
        And '3rd party app' transitions to state '<State>'
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 10 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'

        Examples:
            | Discovery_Launch_Key        | State      |
            | launch app with null intent | foreground |
            | launch app with null intent | inactive   |
            | launch app with null intent | background |
            | launch app with null intent | suspended  |

    @DiscoveryLaunch @coreSDK @sdk @transport @suspended
    Scenario Outline: Discovery.Launch Hot Launch - Positive Scenario: <Scenario> intent and app in suspended
        Given the environment has been set up for 'DiscoveryLaunch' tests
        And '3rd party app' transitions to state 'suspended'
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 10 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'

        Examples:
            | Scenario                                                     | Discovery_Launch_Key                                                     |
            | Home Suspended                                               | launch app with home intent                                              |
            | Playback Suspended                                           | launch app with playback intent                                          |
            | Entity Suspended                                             | launch app with entity intent                                            |
            | Launch Suspended                                             | launch app with intent                                                   |
            | Search Suspended                                             | launch app with search intent                                            |
            | Section Suspended                                            | launch app with section intent                                           |
            | Tune Suspended                                               | launch app with tune intent                                              |
            | PlayEntity Suspended                                         | launch app with playentity intent                                        |
            | PlayQuery Suspended                                          | launch app with PlayQuery intent                                         |
            | PlayQuery Suspended with musictype song                      | launch app with playquery intent with musictype song                     |
            | PlayQuery Suspended with programtype concert                 | launch app with playquery intent with programtype concert                |
            | PlayQuery Suspended with musictype song programtype concert  | launch app with playquery intent with musictype song programtype concert |
            | PlayEntity Suspended without options for entityType playlist | launch app with playentity intent without options                        |
            | PlayEntity Suspended with programType movie                  | launch app with playentity intent with programtype movie                 |

    @DiscoveryLaunch @coreSDK @sdk @transport
    Scenario Outline: Discovery.Launch Hot Launch - Negative Scenario: <Scenario> expecting error
        Given the environment has been set up for 'DiscoveryLaunch' tests
        And '3rd party app' transitions to state 'forground'
        When '3rd party app' registers for the 'discovery onNavigateTo' event using the 'Firebolt' API
        And 1st party app invokes the 'Firebolt' API to '<Error_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'invalid parameters for discovery launch'

        Examples:
            | Scenario          | Error_Key                             |
            | No Action Intent  | no action intent for discoverylaunch  |
            | No Context Intent | no context intent for discoverylaunch |
            | No Source Intent  | no source intent for discoverylaunch  |
            | No Data Intent    | no data intent for discoverylaunch    |

        @DiscoveryLaunch @sdk @coreSDK  @transport @skipNegative
        Examples:
            | Scenario               | Error_Key                                  |
            | Invalid Action Intent  | invalid action intent for discoverylaunch  |
            | Invalid Context Intent | invalid context intent for discoverylaunch |
            | Invalid Data Intent    | invalid data intent for discoverylaunch    |

    @DiscoveryLaunch @coreSDK @sdk @transport
    Scenario: Discovery.Launch Hot Launch - Negative Scenario: Passing the invalid appId type
        Given the environment has been set up for 'Discovery.Launch' tests
        And 3rd party 'certification' app is launched
        When 1st party app invokes the 'Firebolt' API to 'launch app with invalid appId type'
        Then 'Firebolt' platform responds to '1st party app' with 'invalid parameters for discovery launch'

    @DiscoveryLaunch @coreSDK @sdk @transport
    Scenario Outline: Discovery.Launch Hot Launch - Positive Scenario: <Scenario> for context source
        Given the environment has been set up for 'DiscoveryLaunch' tests
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 30 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'
        And 'Firebolt' platform triggers event '<Event_Content>'

        Examples:
            | Scenario              | Discovery_Launch_Key                 | Event_Content                          |
            | Passing random string | launch app with random string source | onNavigateTo with random string source |
            | Passing valid string  | launch app with search intent source | onNavigateTo with search intent source |

    @DiscoveryLaunch @coreSDK @sdk @transport
    Scenario: Discovery.Launch Hot Launch - Negative Scenario: Invalid context source expecting error
        Given the environment has been set up for 'DiscoveryLaunch' tests
        And '3rd party app' transitions to state 'forground'
        When 1st party app invokes the 'Firebolt' API to 'launch app with search intent int source'
        Then 'Firebolt' platform responds to '1st party app' with 'invalid parameters for discovery launch'
    
    @DiscoveryLaunch @coreSDK @sdk @transport
    Scenario Outline: Discovery.Launch Hot Launch - Positive Scenario: <Scenario> intent and app in foreground
        Given the environment has been set up for 'DiscoveryLaunch' tests
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 30 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'
        And 'Firebolt' platform triggers event '<Event_Content>'

        Examples:
            | Scenario                                                         | Discovery_Launch_Key                                                             | Event_Content                                                                     | 
            | Power Intent                                                     | launch app with power Intent                                                     | onNavigateTo with power intent                                                    | 
            | Volume Intent                                                    | launch app with volume Intent                                                    | onNavigateTo with volume intent                                                   |
            | Mute Intent                                                      | launch app with mute Intent                                                      | onNavigateTo with mute intent                                                     |      
            | Channel Intent with channel next                                 | launch app with channel Intent with channel next                                 | onNavigateTo with channel Intent with channel next                                |
            | Channel Intent with channel previous                             | launch app with channel Intent with channel previous                             | onNavigateTo with channel Intent with channel previous                            |
            | Pause Intent                                                     | launch app with pause Intent                                                     | onNavigateTo with pause intent                                                    |
            | Resume Intent                                                    | launch app with resume Intent                                                    | onNavigateTo with resume intent                                                   |
            | Replay Intent                                                    | launch app with replay Intent                                                    | onNavigateTo with replay intent                                                   |
            | Stop Intent                                                      | launch app with stop Intent                                                      | onNavigateTo with stop intent                                                     |
            | Seek Intent                                                      | launch app with seek Intent                                                      | onNavigateTo with seek intent                                                     |
            | Seek Intent with relative true                                   | launch app with seek Intent with relative true                                   | onNavigateTo with seek Intent with relative true                                  |
            | Trick Play Intent                                                | launch app with trick play Intent                                                | onNavigateTo with trick play Intent                                               |
            | Closed Captions Intent with true                                 | launch app with closed captions Intent with true                                 | onNavigateTo with closed captions Intent with true                                |
            | closed Captions Intent with false                                | launch app with closed captions Intent with false                                | onNavigateTo with closed captions Intent with false                               |
            | Voice Guidance Intent with true                                  | launch app with voice guidance Intent with true                                  | onNavigateTo with voice guidance Intent with true                                 |
            | Voice Guidance Intent with false                                 | launch app with voice guidance Intent with false                                 | onNavigateTo with voice guidance Intent with false                                |
            | Voice Guidance Intent with speed 2                               | launch app with voice guidance Intent with speed 2                               | onNavigateTo with voice guidance Intent with speed 2                              |
            | Voice Guidance Intent with speed -1 and relative true            | launch app with voice guidance Intent with speed -1 and relative true            | onNavigateTo with voice guidance Intent with speed -1 and relative true           |
            | Voice Guidance Intent with true and verbosity low                | launch app with voice guidance Intent with true and verbosity low                | onNavigateTo with voice guidance Intent with true and verbosity low               |
            | Voice Guidance Intent with true and verbosity high               | launch app with voice guidance Intent with true and verbosity high               | onNavigateTo with voice guidance Intent with true and verbosity high              |
            | Audio Descritions Intent with true                               | launch app with audio descritions Intent with true                               | onNavigateTo with audio descritions Intent with true                              |
            | Audio Descritions Intent with false                              | launch app with audio descritions Intent with false                              | onNavigateTo with audio descritions Intent with false                             |
            | High Contrast Intent with high contrast mode on                  | launch app with high contrast Intent with high contrast mode on                  | onNavigateTo with high contrast Intent with high contrast mode on                 |
            | High Contrast Intent with high contrast mode off                 | launch app with high contrast Intent with high contrast mode off                 | onNavigateTo with high contrast Intent with high contrast mode off                |
            | Screen Magnification Intent with screen magnification turned on  | launch app with screen magnification Intent with screen magnification turned on  | onNavigateTo with screen magnification Intent with screen magnification turned on |
            | Screen Magnification Intent with screen magnification turned off | launch app with screen magnification Intent with screen magnification turned off | onNavigateTo with screen magnification Intent with screen magnification turned off|
            | Screen Magnification Intent with magnification scale 2.5         | launch app with screen magnification Intent with magnification scale 2.5         | onNavigateTo with screen magnification Intent with magnification scale 2.5        |
            | Focus Intent with cursor up                                      | launch app with focus Intent cursor up                                           | onNavigateTo with focus Intent cursor up                                          |
            | Focus Intent with cursor down                                    | launch app with focus Intent cursor down                                         | onNavigateTo with focus Intent cursor down                                        |
            | Focus Intent with cursor left                                    | launch app with focus Intent cursor left                                         | onNavigateTo with focus Intent cursor left                                        |
            | Focus Intent with cursor right                                   | launch app with focus Intent cursor right                                        | onNavigateTo with focus Intent cursor right                                       |
            | Select Intent                                                    | launch app with Select Intent                                                    | onNavigateTo with Select Intent                                                   |
            | Scroll Intent up with unit page                                  | launch app with Scroll Intent up with unit page                                  | onNavigateTo with Scroll Intent up with unit page                                 |
            | Scroll Intent down with unit page                                | launch app with Scroll Intent down with unit page                                | onNavigateTo with Scroll Intent down with unit page                               |
            | Scroll Intent left with unit page                                | launch app with Scroll Intent left with unit page                                | onNavigateTo with Scroll Intent left with unit page                               |
            | Scroll Intent right with unit page                               | launch app with Scroll Intent right with unit page                               | onNavigateTo with Scroll Intent right with unit page                              |
            | Scroll Intent up with unit line                                  | launch app with Scroll Intent up with unit line                                  | onNavigateTo with Scroll Intent up with unit line                                 |
            | Scroll Intent down with unit line                                | launch app with Scroll Intent down with unit line                                | onNavigateTo with Scroll Intent down with unit line                               |
            | Scroll Intent left with unit line                                | launch app with Scroll Intent left with unit line                                | onNavigateTo with Scroll Intent left with unit line                               |
            | Scroll Intent right with unit line                               | launch app with Scroll Intent right with unit line                               | onNavigateTo with Scroll Intent right with unit line                              |
            | Scroll Intent up with unit percent                               | launch app with Scroll Intent up with unit percent                               | onNavigateTo with Scroll Intent up with unit percent                              |
            | Scroll Intent down with unit percent                             | launch app with Scroll Intent down with unit percent                             | onNavigateTo with Scroll Intent down with unit percent                            |
            | Scroll Intent left with unit percent                             | launch app with Scroll Intent left with unit percent                             | onNavigateTo with Scroll Intent left with unit percent                            |
            | Scroll Intent right with unit percent                            | launch app with Scroll Intent right with unit percent                            | onNavigateTo with Scroll Intent right with unit percent                           |
            | Back Intent                                                      | launch app with back Intent                                                      | onNavigateTo with back Intent                                                     |
            | Exit Intent                                                      | launch app with exit Intent                                                      | onNavigateTo with exit Intent                                                     |


