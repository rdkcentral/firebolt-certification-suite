@DiscoveryLaunch @coreSDK @AppHotLaunch
Feature: Discovery.launch_HotLaunch

    @initialization
    Scenario: Launch FCA for Discovery.Launch Hot Launch
        Given the environment has been set up for 'DiscoveryLaunch' tests
        And 3rd party 'certification' app is launched
        And Test runner waits for 10 'seconds'
        And '3rd party app' transitions to state 'foreground'
        And '3rd party app' registers for the 'discovery onNavigateTo' event using the 'Firebolt' API

    @sdk @transport @Sev0
    Scenario Outline: Discovery.Launch - Hot Launch : Relaunch App with <Scenario> while in foreground state
        Given the environment has been set up for 'DiscoveryLaunch' tests
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 30 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'
        And 'Firebolt' platform triggers event '<Event_Content>'


        Examples:
            | Scenario                                 | Discovery_Launch_Key                                | Event_Content                                        |
            | Home intent                              | launch app with home intent                         | onNavigateTo with home intent                        |
            | Playback intent                          | launch app with playback intent                     | onNavigateTo with playback intent                    |
            | playback intent without entityType       | launch app with playback intent without entityType  | onNavigateTo with playback intent without entityType |
            | entity intent                            | launch app with entity intent                       | onNavigateTo with entity intent                      |
            | entity intent without entityType         | launch app with entity intent without entityType    | onNavigateTo with entity intent without entityType   |
            | Launch intent                            | launch app with intent                              | onNavigateTo with intent                             |
            | Search intent                            | launch app with search intent                       | onNavigateTo with search intent                      |
            | Section intent                           | launch app with section intent                      | onNavigateTo with section intent                     |
            | Tune intent                              | launch app with tune intent                         | onNavigateTo with tune intent                        |
            | PlayEntity intent                        | launch app with playentity intent                   | onNavigateTo with playentity intent                  |
            | PlayQuery intent                         | launch app with playquery intent                    | onNavigateTo with playquery intent                   |

    @sdk @transport @Sev1
    Scenario Outline: Discovery.Launch - Hot Launch : Relaunch App with <Scenario> while in foreground state
        Given the environment has been set up for 'DiscoveryLaunch' tests
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 30 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'
        And 'Firebolt' platform triggers event '<Event_Content>'

        Examples:
            | Scenario                                                        | Discovery_Launch_Key                                                         | Event_Content                                                                     |            
            | playquery intent with musictype song                            | launch app with playquery intent with musictype song                         | onNavigateTo with playquery intent with musictype song                            |
            | playquery intent with programtype sportingevent                 | launch app with playquery intent with programtype sportingevent              | onNavigateTo with playquery intent with programtype sportingevent                 |
            | playquery intent with musictype song programtype musicvideo     | launch app with playquery intent with musictype song programtype musicvideo  | onNavigateTo with playquery intent with musictype song programtype musicvideo     |
            | playentity intent with programtype movie                        | launch app with playentity intent with programtype movie                     | onNavigateTo with playentity intent with programtype movie                        |
            | playentity intent with programtype episode                      | launch app with playentity intent with programtype episode                   | onNavigateTo with playentity intent with programtype episode                      |
            | playquery intent with musictype album programtype musicvideo    | launch app with playquery intent with musictype album programtype musicvideo | onNavigateTo with playquery intent with musictype album programtype musicvideo    |
            | Search intent with programType movie                            | launch app with search intent with programType movie                         | onNavigateTo with searchintent programType movie                                  |
            | Search intent with programType episode                          | launch app with search intent with programType episode                       | onNavigateTo with searchintent programType episode                                |
            | Search intent with programType season                           | launch app with search intent with programType season                        | onNavigateTo with searchintent programType season                                 |
            | Search intent with programType series                           | launch app with search intent with programType series                        | onNavigateTo with searchintent programType series                                 |
            | Search intent with programType concert                          | launch app with search intent with programtype concert                       | onNavigateTo with searchintent programtype concert                                |
            | Search intent with programType sportingevent                    | launch app with search intent with programtype sportingevent                 | onNavigateTo with searchintent programtype sportingevent                          |
            | Search intent with programType preview                          | launch app with search intent with programtype preview                       | onNavigateTo with searchintent programtype preview                                |
            | Search intent with programType other                            | launch app with search intent with programtype other                         | onNavigateTo with searchintent programtype other                                  |
            | Search intent with programType advertisement                    | launch app with search intent with programtype advertisement                 | onNavigateTo with searchintent programtype advertisement                          |
            | Search intent with programType musicvideo                       | launch app with search intent with programtype musicvideo                    | onNavigateTo with searchintent programtype musicvideo                             |
            | Search intent with programType minisode                         | launch app with search intent with programtype minisode                      | onNavigateTo with searchintent programtype minisode                               |
            | Search intent with programType extra                            | launch app with search intent with programtype extra                         | onNavigateTo with searchintent programtype extra                                  |
            | Search intent with musicType song                               | launch app with search intent with musictype song                            | onNavigateTo with searchintent musictype song                                     |
            | Search intent with musicType album                              | launch app with search intent with musictype album                           | onNavigateTo with searchintent musictype album                                    |
            | Search intent with channelType streaming                        | launch app with search intent with channelType streaming                     | onNavigateTo with searchintent channeltype streaming                              |
            | Search intent with channelType overTheAir                       | launch app with search intent with channelType overTheAir                    | onNavigateTo with searchintent channeltype overtheair                             |
            | Search intent with untyped entity                               | launch app with search intent with untyped entity                            | onNavigateTo with searchintent untyped entity                                     |
            | Search intent with playlist entity                              | launch app with search intent with playlist entity                           | onNavigateTo with searchintent playlist entity                                    |

    @sdk @transport @Sev2
    Scenario Outline: Discovery.Launch - Hot Launch : Relaunch App with <Scenario> while in foreground state
        Given the environment has been set up for 'DiscoveryLaunch' tests
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 30 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'
        And 'Firebolt' platform triggers event '<Event_Content>'

        Examples:
            | Scenario                                                        | Discovery_Launch_Key                                                            | Event_Content                                                                     |  
            | playquery intent with musictype album                           | launch app with playquery intent with musictype album                           | onNavigateTo with playquery intent with musictype album                           |
            | playquery intent with programtype concert                       | launch app with playquery intent with programtype concert                       | onNavigateTo with playquery intent with programtype concert                       |
            | PlayQuery intent with programtype preview                       | launch app with playquery intent with programtype preview                       | onNavigateTo with playquery intent with programtype preview                       |
            | PlayQuery intent with programtype other                         | launch app with playquery intent with programtype other                         | onNavigateTo with playquery intent with programtype other                         |
            | PlayQuery intent with programtype advertisement                 | launch app with playquery intent with programtype advertisement                 | onNavigateTo with playquery intent with programtype advertisement                 |
            | PlayQuery intent with programtype musicvideo                    | launch app with playquery intent with programtype musicvideo                    | onNavigateTo with playquery intent with programtype musicvideo                    |
            | PlayQuery intent with programtype minisode                      | launch app with playquery intent with programtype minisode                      | onNavigateTo with playquery intent with programtype minisode                      |
            | PlayQuery intent with programtype extra                         | launch app with playquery intent with programtype extra                         | onNavigateTo with playquery intent with programtype extra                         |
            | PlayQuery intent with musictype song programtype concert        | launch app with playquery intent with musictype song programtype concert        | onNavigateTo with playquery intent with musictype song programtype concert        |
            | PlayQuery intent with musictype song programtype sportingevent  | launch app with playquery intent with musictype song programtype sportingevent  | onNavigateTo with playquery intent with musictype song programtype sportingevent  |
            | PlayQuery intent with musictype song programtype preview        | launch app with playquery intent with musictype song programtype preview        | onNavigateTo with playquery intent with musictype song programtype preview        |
            | PlayQuery intent with musictype song programtype other          | launch app with playquery intent with musictype song programtype other          | onNavigateTo with playquery intent with musictype song programtype other          |
            | PlayQuery intent with musictype song programtype advertisement  | launch app with playquery intent with musictype song programtype advertisement  | onNavigateTo with playquery intent with musictype song programtype advertisement  |
            | PlayQuery intent with musictype song programtype minisode       | launch app with playquery intent with musictype song programtype minisode       | onNavigateTo with playquery intent with musictype song programtype minisode       |
            | PlayQuery intent with musictype song programtype extra          | launch app with playquery intent with musictype song programtype extra          | onNavigateTo with playquery intent with musictype song programtype extra          |
            | PlayQuery intent with musictype album programtype concert       | launch app with playquery intent with musictype album programtype concert       | onNavigateTo with playquery intent with musictype album programtype concert       |
            | PlayQuery intent with musictype album programtype sportingevent | launch app with playquery intent with musictype album programtype sportingevent | onNavigateTo with playquery intent with musictype album programtype sportingevent |
            | PlayQuery intent with musictype album programtype preview       | launch app with playquery intent with musictype album programtype preview       | onNavigateTo with playquery intent with musictype album programtype preview       |
            | PlayQuery intent with musictype album programtype other         | launch app with playquery intent with musictype album programtype other         | onNavigateTo with playquery intent with musictype album programtype other         |
            | PlayQuery intent with musictype album programtype advertisement | launch app with playquery intent with musictype album programtype advertisement | onNavigateTo with playquery intent with musictype album programtype advertisement |
            | PlayQuery intent with musictype album programtype minisode      | launch app with playquery intent with musictype album programtype minisode      | onNavigateTo with playquery intent with musictype album programtype minisode      |
            | PlayQuery intent with musictype album programtype extra         | launch app with playquery intent with musictype album programtype extra         | onNavigateTo with playquery intent with musictype album programtype extra         |
            | PlayEntity intent without options for entityType playlist       | launch app with playentity intent without options                               | onNavigateTo with playentity intent without options                               |
            | PlayEntity intent with programType concert                      | launch app with playentity intent with programtype concert                      | onNavigateTo with playentity intent with programtype concert                      |

    @sdk @transport @requiresPlatformImplementation @Sev0
    Scenario Outline: Discovery.Launch - Hot Launch : Relaunch App with <Scenario> while in inactive state
        Given the environment has been set up for 'DiscoveryLaunch' tests
        And '3rd party app' transitions to state 'inactive'
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 10 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'
        And 'Firebolt' platform triggers event '<Event_Content>'

        Examples:
            | Scenario          | Discovery_Launch_Key              | Event_Content                       |
            | home intent       | launch app with home intent       | onNavigateTo with home intent       |
            | playback intent   | launch app with playback intent   | onNavigateTo with playback intent   |
            | entity intent     | launch app with entity intent     | onNavigateTo with entity intent     |
            | launch intent     | launch app with intent            | onNavigateTo with intent            |
            | search intent     | launch app with search intent     | onNavigateTo with search intent     |
            | section intent    | launch app with section intent    | onNavigateTo with section intent    |
            | tune intent       | launch app with tune intent       | onNavigateTo with tune intent       |
            | playEntity intent | launch app with playentity intent | onNavigateTo with playentity intent |
            | playQuery intent  | launch app with PlayQuery intent  | onNavigateTo with PlayQuery intent  |
            
    @sdk @transport @requiresPlatformImplementation @Sev1
    Scenario Outline: Discovery.Launch - Hot Launch : Relaunch App with <Scenario> while in inactive state
        Given the environment has been set up for 'DiscoveryLaunch' tests
        And '3rd party app' transitions to state 'inactive'
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 10 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'
        And 'Firebolt' platform triggers event '<Event_Content>'

        Examples:
            | Scenario                                        | Discovery_Launch_Key                                         | Event_Content                                               |            
            | PlayQuery intent with musictype song            | launch app with playquery intent with musictype song         | onNavigateTo with playquery intent with musictype song      |
            | PlayQuery intent with programtype concert       | launch app with playquery intent with programtype concert    | onNavigateTo with playquery intent with programtype concert |
            | PlayEntity intent with programType movie        | launch app with playentity intent with programtype movie     | onNavigateTo with playentity intent with programtype movie  |
            | Search intent with programType movie            | launch app with search intent with programType movie         | onNavigateTo with searchintent programType movie            |
            | Search intent with programType advertisement    | launch app with search intent with programtype advertisement | onNavigateTo with searchintent programtype advertisement    |
            | Search intent with musicType song               | launch app with search intent with musictype song            | onNavigateTo with searchintent musictype song               |
            | Search intent with musicType album              | launch app with search intent with musictype album           | onNavigateTo with searchintent musictype album              |
            | Search intent with channelType streaming        | launch app with search intent with channelType streaming     | onNavigateTo with searchintent channeltype streaming        |
            | Search intent with channelType overTheAir       | launch app with search intent with channelType overTheAir    | onNavigateTo with searchintent channeltype overtheair       |
            | Search intent with untyped entity               | launch app with search intent with untyped entity            | onNavigateTo with searchintent untyped entity               |
            | Search intent with playlist entity              | launch app with search intent with playlist entity           | onNavigateTo with searchintent playlist entity              |

    @sdk @transport @requiresPlatformImplementation @Sev2
    Scenario Outline: Discovery.Launch - Hot Launch : Relaunch App with <Scenario> while in inactive state
        Given the environment has been set up for 'DiscoveryLaunch' tests
        And '3rd party app' transitions to state 'inactive'
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 10 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'
        And 'Firebolt' platform triggers event '<Event_Content>'

        Examples:
            | Scenario                                                  | Discovery_Launch_Key                                                     | Event_Content                                                              |                  
            | PlayQuery intent with musictype song programtype concert  | launch app with playquery intent with musictype song programtype concert | onNavigateTo with playquery intent with musictype song programtype concert |
            | PlayEntity intent without options for entityType playlist | launch app with playentity intent without options                        | onNavigateTo with playentity intent without options                        |

    @sdk @transport @Sev0
    Scenario Outline: Discovery.Launch - Hot Launch : Relaunch App with <Scenario> while in background state
        Given the environment has been set up for 'DiscoveryLaunch' tests
        And '3rd party app' transitions to state 'background'
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 10 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'
        And 'Firebolt' platform triggers event '<Event_Content>'


        Examples:
            | Scenario           | Discovery_Launch_Key              | Event_Content                       |
            | home intent        | launch app with home intent       | onNavigateTo with home intent       |
            | playback intent    | launch app with playback intent   | onNavigateTo with playback intent   |
            | entity intent      | launch app with entity intent     | onNavigateTo with entity intent     |
            | launch intent      | launch app with intent            | onNavigateTo with intent            |
            | search intent      | launch app with search intent     | onNavigateTo with search intent     |
            | section intent     | launch app with section intent    | onNavigateTo with section intent    |
            | tune intent        | launch app with tune intent       | onNavigateTo with tune intent       |
            | playEntity intent  | launch app with playentity intent | onNavigateTo with playentity intent |
            | playQuery intent   | launch app with PlayQuery intent  | onNavigateTo with PlayQuery intent  |
            
    @sdk @transport @Sev1
    Scenario Outline: Discovery.Launch - Hot Launch : Relaunch App with <Scenario> while in background state
        Given the environment has been set up for 'DiscoveryLaunch' tests
        And '3rd party app' transitions to state 'background'
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 10 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'
        And 'Firebolt' platform triggers event '<Event_Content>'

        Examples:
            | Scenario                                      | Discovery_Launch_Key                                         | Event_Content                                               |            
            | playQuery intent with musictype song          | launch app with playquery intent with musictype song         | onNavigateTo with playquery intent with musictype song      |
            | playQuery intent with programtype concert     | launch app with playquery intent with programtype concert    | onNavigateTo with playquery intent with programtype concert |
            | playEntity intent with programType movie      | launch app with playentity intent with programtype movie     | onNavigateTo with playentity intent with programtype movie  |
            | Search intent with programType movie          | launch app with search intent with programType movie         | onNavigateTo with searchintent programType movie            |
            | Search intent with programType advertisement  | launch app with search intent with programtype advertisement | onNavigateTo with searchintent programtype advertisement    |
            | Search intent with musicType song             | launch app with search intent with musictype song            | onNavigateTo with searchintent musictype song               |
            | Search intent with musicType album            | launch app with search intent with musictype album           | onNavigateTo with searchintent musictype album              |
            | Search intent with channelType streaming      | launch app with search intent with channelType streaming     | onNavigateTo with searchintent channeltype streaming        |
            | Search intent with channelType overTheAir     | launch app with search intent with channelType overTheAir    | onNavigateTo with searchintent channeltype overtheair       |
            | Search intent with untyped entity             | launch app with search intent with untyped entity            | onNavigateTo with searchintent untyped entity               |
            | Search intent with playlist entity            | launch app with search intent with playlist entity           | onNavigateTo with searchintent playlist entity              |

    @sdk @transport @Sev2
    Scenario Outline: Discovery.Launch - Hot Launch : Relaunch App with <Scenario> while in background state
        Given the environment has been set up for 'DiscoveryLaunch' tests
        And '3rd party app' transitions to state 'background'
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 10 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'
        And 'Firebolt' platform triggers event '<Event_Content>'

        Examples:
            | Scenario                                                  | Discovery_Launch_Key                                                     | Event_Content                                                              |              
            | playQuery intent with musictype song programtype concert  | launch app with playquery intent with musictype song programtype concert | onNavigateTo with playquery intent with musictype song programtype concert |
            | playEntity intent without options for entityType playlist | launch app with playentity intent without options                        | onNavigateTo with playentity intent without options                        |

    @sdk @transport @Sev1
    Scenario Outline: Discovery.Launch - Hot Launch : Relaunch App with Null intent and app in <State> state
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

    @sdk @transport @suspended @Sev0
    Scenario Outline: Discovery.Launch - Hot Launch : Relaunch App with <Scenario> while in suspended state
        Given the environment has been set up for 'DiscoveryLaunch' tests
        And '3rd party app' transitions to state 'suspended'
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 10 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'

        Examples:
            | Scenario          | Discovery_Launch_Key              |
            | home intent       | launch app with home intent       |
            | playback intent   | launch app with playback intent   |
            | entity intent     | launch app with entity intent     |
            | launch intent     | launch app with intent            |
            | search intent     | launch app with search intent     |
            | section intent    | launch app with section intent    |
            | tune intent       | launch app with tune intent       |
            | playEntity intent | launch app with playentity intent |
            | playQuery intent  | launch app with PlayQuery intent  |
            
    @sdk @transport @suspended @Sev1
    Scenario Outline: Discovery.Launch - Hot Launch : Relaunch App with <Scenario> while in suspended state
        Given the environment has been set up for 'DiscoveryLaunch' tests
        And '3rd party app' transitions to state 'suspended'
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 10 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'

        Examples:
            | Scenario                                     | Discovery_Launch_Key                                         |            
            | playQuery intent with musictype song         | launch app with playquery intent with musictype song         |
            | playQuery intent with programtype concert    | launch app with playquery intent with programtype concert    |
            | playEntity intent with programType movie     | launch app with playentity intent with programtype movie     |
            | Search intent with programType movie         | launch app with search intent with programType movie         |
            | Search intent with programType advertisement | launch app with search intent with programtype advertisement |
            | Search intent with musicType song            | launch app with search intent with musictype song            |
            | Search intent with musicType album           | launch app with search intent with musictype album           |
            | Search intent with channelType streaming     | launch app with search intent with channelType streaming     |
            | Search intent with channelType overTheAir    | launch app with search intent with channelType overTheAir    |
            | Search intent with untyped entity            | launch app with search intent with untyped entity            |
            | Search intent with playlist entity           | launch app with search intent with playlist entity           |

    @sdk @transport @suspended @Sev2
    Scenario Outline: Discovery.Launch - Hot Launch : Relaunch App with <Scenario> while in suspended state
        Given the environment has been set up for 'DiscoveryLaunch' tests
        And '3rd party app' transitions to state 'suspended'
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 10 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'

        Examples:
            | Scenario                                                     | Discovery_Launch_Key                                                     |             
            | playquery Suspended with musictype song programtype concert  | launch app with playquery intent with musictype song programtype concert |
            | playentity Suspended without options for entityType playlist | launch app with playentity intent without options                        |

    @sdk @transport @Sev2
    Scenario Outline: Discovery.Launch - Hot Launch : Validating API error handling given <Scenario>
        Given the environment has been set up for 'DiscoveryLaunch' tests
        And '3rd party app' transitions to state 'foreground'
        When '3rd party app' registers for the 'discovery onNavigateTo' event using the 'Firebolt' API
        And 1st party app invokes the 'Firebolt' API to '<Error_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'invalid parameters for discovery launch'

        Examples:
            | Scenario                                                    | Error_Key                                                                       |
            | no Action Intent                                            | no action intent for discoverylaunch                                            |
            | no Context Intent                                           | no context intent for discoverylaunch                                           |
            | no Source Intent                                            | no source intent for discoverylaunch                                            |
            | no Data Intent                                              | no data intent for discoverylaunch                                              |
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
            | Search Intent without entityType for playlistEntity         | search intent without entitytype for playlistentity for discoverylaunch         |
            | Search Intent with invalid entityType for programEntity     | search intent with invalid entityType for programEntity for discoverylaunch     |
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
            | Search Intent with invalid entityType for playlistEntity    | search intent with invalid entityType for playlistEntity for discoverylaunch    |

        @skipNegative
        Examples:
            | Scenario               | Error_Key                                  |
            | invalid Action Intent  | invalid action intent for discoverylaunch  |
            | invalid Context Intent | invalid context intent for discoverylaunch |
            | invalid Data Intent    | invalid data intent for discoverylaunch    |

    @sdk @transport @Sev2
    Scenario: Discovery.Launch - Hot Launch : Validating API error handling given an invalid appId
        Given the environment has been set up for 'Discovery.Launch' tests
        And 3rd party 'certification' app is launched
        When 1st party app invokes the 'Firebolt' API to 'launch app with invalid appId type'
        Then 'Firebolt' platform responds to '1st party app' with 'invalid parameters for discovery launch'

    @sdk @transport @Sev2
    Scenario Outline: Discovery.Launch - Hot Launch : Validate API and Event response for <Scenario> for context
        Given the environment has been set up for 'DiscoveryLaunch' tests
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 30 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'
        And 'Firebolt' platform triggers event '<Event_Content>'

        Examples:
            | Scenario                        | Discovery_Launch_Key                 | Event_Content                          |
            | passing random string source    | launch app with random string source | onNavigateTo with random string source |
            | passing valid string source     | launch app with search intent source | onNavigateTo with search intent source |
            | passing child agePolicy string  | launch app with child agePolicy      | onNavigateTo with child agePolicy      |
            | passing teen agePolicy string   | launch app with teen agePolicy       | onNavigateTo with teen agePolicy       |
            | passing adult agePolicy string  | launch app with adult agePolicy      | onNavigateTo with adult agePolicy      |
            | passing empty agePolicy string  | launch app with empty agePolicy      | onNavigateTo with adult agePolicy      |
            | passing custom agePolicy string | launch app with custom agePolicy     | onNavigateTo with custom agePolicy     |

    @sdk @transport @Sev2
    Scenario Outline: Discovery.Launch - Hot Launch : Validating API error handling given <Scenario> for context
        Given the environment has been set up for 'DiscoveryLaunch' tests
        And '3rd party app' transitions to state 'foreground'
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'invalid parameters for discovery launch'

        Examples:
            | Scenario                        | Discovery_Launch_Key                     |
            | invalid integer agePolicy value | launch app with int agePolicy            |
            | invalid boolean agePolicy value | launch app with boolean agePolicy        |
            | passing integer source          | launch app with search intent int source |

    @sdk @transport @requiresPlatformImplementation @Sev2
    Scenario Outline: Discovery.Launch - Hot Launch : Validate API and Event response when one app is in <state> state and one is in foreground state
        Given the environment has been set up for 'DiscoveryLaunch' tests
        And 3rd party 'certification' app is launched with 'secondary 3rd party app' appId
        When Test runner waits for 10 'seconds'
        And 'secondary 3rd party app' registers for the 'discovery onNavigateTo' event using the 'Firebolt' API
        And 'secondary 3rd party app' transitions to state '<state>'
        And 3rd party 'certification' app is launched
        And '3rd party app' registers for the 'discovery onNavigateTo' event using the 'Firebolt' API
        When 1st party app invokes the 'Firebolt' API to 'launch app with home intent'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'
        And 'Firebolt' platform triggers event 'onNavigateTo with home intent'
        And 'Firebolt' platform does not trigger to 'secondary 3rd party app' event 'onNavigateTo'

    Examples:
        | state      |
        | background |
        | inactive   |