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
    Scenario Outline: Discovery.Launch Hot Launch - Validate API method response for <Scenario> and app in foreground state
        Given the environment has been set up for 'DiscoveryLaunch' tests
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 30 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'
        And 'Firebolt' platform triggers event '<Event_Content>'

        Examples:
            | Scenario                                 | Discovery_Launch_Key                                                            | Event_Content                                                                     |
            | Home intent                              | launch app with home intent                                                     | onNavigateTo with home intent                                                     |
            | Playback intent                          | launch app with playback intent                                                 | onNavigateTo with playback intent                                                 |
            | playback intent without entityType       | launch app with playback intent without entityType                              | onNavigateTo with playback intent without entityType                              |
            | entity intent                            | launch app with entity intent                                                   | onNavigateTo with entity intent                                                   |
            | entity intent without entityType         | launch app with entity intent without entityType                                | onNavigateTo with entity intent without entityType                                |
            | Launch intent                            | launch app with intent                                                          | onNavigateTo with intent                                                          |
            | Search intent                            | launch app with search intent                                                   | onNavigateTo with search intent                                                   |
            | Section intent                           | launch app with section intent                                                  | onNavigateTo with section intent                                                  |
            | Tune intent                              | launch app with tune intent                                                     | onNavigateTo with tune intent                                                     |
            | PlayEntity intent                        | launch app with playentity intent                                               | onNavigateTo with playentity intent                                               |
            | PlayQuery intent                         | launch app with playquery intent                                                | onNavigateTo with playquery intent                                                |

    @sdk @transport @Sev1
    Scenario Outline: Discovery.Launch Hot Launch - Validate API method response for <Scenario> and app in foreground state
        Given the environment has been set up for 'DiscoveryLaunch' tests
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 30 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'
        And 'Firebolt' platform triggers event '<Event_Content>'

        Examples:
            | Scenario                                                        | Discovery_Launch_Key                                                            | Event_Content                                                                     |            
            | playquery intent with musictype song                            | launch app with playquery intent with musictype song                            | onNavigateTo with playquery intent with musictype song                            |
            | playquery intent with programtype sportingevent                 | launch app with playquery intent with programtype sportingevent                 | onNavigateTo with playquery intent with programtype sportingevent                 |
            | playquery intent with musictype song programtype musicvideo     | launch app with playquery intent with musictype song programtype musicvideo     | onNavigateTo with playquery intent with musictype song programtype musicvideo     |
            | playentity intent with programtype movie                        | launch app with playentity intent with programtype movie                        | onNavigateTo with playentity intent with programtype movie                        |
            | playentity intent with programtype episode                      | launch app with playentity intent with programtype episode                      | onNavigateTo with playentity intent with programtype episode                      |
            | playquery intent with musictype album programtype musicvideo    | launch app with playquery intent with musictype album programtype musicvideo    | onNavigateTo with playquery intent with musictype album programtype musicvideo    |

    @sdk @transport @Sev2
    Scenario Outline: Discovery.Launch Hot Launch - Validate API method response for <Scenario> and app in foreground state
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
            | playquery intent with programtype sportingevent                 | launch app with playquery intent with programtype sportingevent                 | onNavigateTo with playquery intent with programtype sportingevent                 |
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
    Scenario Outline: Discovery.Launch Hot Launch - Validate API method response for <Scenario> and app in inactive state
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
            | home intent                                                 | launch app with home intent                                              | onNavigateTo with home intent                                              |
            | playback intent                                             | launch app with playback intent                                          | onNavigateTo with playback intent                                          |
            | entity intent                                               | launch app with entity intent                                            | onNavigateTo with entity intent                                            |
            | launch intent                                               | launch app with intent                                                   | onNavigateTo with intent                                                   |
            | search intent                                               | launch app with search intent                                            | onNavigateTo with search intent                                            |
            | section intent                                              | launch app with section intent                                           | onNavigateTo with section intent                                           |
            | tune intent                                                 | launch app with tune intent                                              | onNavigateTo with tune intent                                              |
            | playEntity intent                                           | launch app with playentity intent                                        | onNavigateTo with playentity intent                                        |
            | playQuery intent                                            | launch app with PlayQuery intent                                         | onNavigateTo with PlayQuery intent                                         |
            
    @sdk @transport @requiresPlatformImplementation @Sev1
    Scenario Outline: Discovery.Launch Hot Launch - Validate API method response for <Scenario> and app in inactive state
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
            | PlayQuery intent with musictype song                      | launch app with playquery intent with musictype song                     | onNavigateTo with playquery intent with musictype song                     |
            | PlayQuery intent with programtype concert                 | launch app with playquery intent with programtype concert                | onNavigateTo with playquery intent with programtype concert                |
            | PlayEntity intent with programType movie                  | launch app with playentity intent with programtype movie                 | onNavigateTo with playentity intent with programtype movie                 |

    @sdk @transport @requiresPlatformImplementation @Sev0
    Scenario Outline: Discovery.Launch Hot Launch - Validate API method response for <Scenario> and app in inactive state
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
    Scenario Outline: Discovery.Launch Hot Launch - Validate API method response for <Scenario> and app in background state
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
            | home intent                                                   | launch app with home intent                                              | onNavigateTo with home intent                                              |
            | playback intent                                               | launch app with playback intent                                          | onNavigateTo with playback intent                                          |
            | entity intent                                                 | launch app with entity intent                                            | onNavigateTo with entity intent                                            |
            | launch intent                                                 | launch app with intent                                                   | onNavigateTo with intent                                                   |
            | search intent                                                 | launch app with search intent                                            | onNavigateTo with search intent                                            |
            | section intent                                                | launch app with section intent                                           | onNavigateTo with section intent                                           |
            | tune intent                                                   | launch app with tune intent                                              | onNavigateTo with tune intent                                              |
            | playEntity intent                                             | launch app with playentity intent                                        | onNavigateTo with playentity intent                                        |
            | playQuery intent                                              | launch app with PlayQuery intent                                         | onNavigateTo with PlayQuery intent                                         |
            
    @sdk @transport @Sev1
    Scenario Outline: Discovery.Launch Hot Launch - Validate API method response for <Scenario> and app in background state
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
            | playQuery intent with musictype song                      | launch app with playquery intent with musictype song                     | onNavigateTo with playquery intent with musictype song                     |
            | playQuery intent with programtype concert                 | launch app with playquery intent with programtype concert                | onNavigateTo with playquery intent with programtype concert                |
            | playEntity intent with programType movie                  | launch app with playentity intent with programtype movie                 | onNavigateTo with playentity intent with programtype movie                 |
            
    @sdk @transport @Sev2
    Scenario Outline: Discovery.Launch Hot Launch - Validate API method response for <Scenario> and app in background state
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
    Scenario Outline: Discovery.Launch Hot Launch - Validate API method response with Null intent and app in <State> state
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
    Scenario Outline: Discovery.Launch Hot Launch - Validate API method response for <Scenario> and app in suspended state
        Given the environment has been set up for 'DiscoveryLaunch' tests
        And '3rd party app' transitions to state 'suspended'
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 10 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'

        Examples:
            | Scenario                                                  | Discovery_Launch_Key                                                     |
            | home intent                                               | launch app with home intent                                              |
            | playback intent                                           | launch app with playback intent                                          |
            | entity intent                                             | launch app with entity intent                                            |
            | launch intent                                             | launch app with intent                                                   |
            | search intent                                             | launch app with search intent                                            |
            | section intent                                            | launch app with section intent                                           |
            | tune intent                                               | launch app with tune intent                                              |
            | playEntity intent                                         | launch app with playentity intent                                        |
            | playQuery intent                                          | launch app with PlayQuery intent                                         |
            
    @sdk @transport @suspended @Sev1
    Scenario Outline: Discovery.Launch Hot Launch - Validate API method response for <Scenario> and app in suspended
        Given the environment has been set up for 'DiscoveryLaunch' tests
        And '3rd party app' transitions to state 'suspended'
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 10 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'

        Examples:
            | Scenario                                                  | Discovery_Launch_Key                                                     |            
            | playQuery intent with musictype song                      | launch app with playquery intent with musictype song                     |
            | playQuery intent with programtype concert                 | launch app with playquery intent with programtype concert                |
            | playEntity intent with programType movie                  | launch app with playentity intent with programtype movie                 |

    @sdk @transport @suspended @Sev2
    Scenario Outline: Discovery.Launch Hot Launch - Validate API method response for <Scenario> and app in suspended
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
    Scenario Outline: Discovery.Launch Hot Launch - Validating API error handling given <Scenario>
        Given the environment has been set up for 'DiscoveryLaunch' tests
        And '3rd party app' transitions to state 'foreground'
        When '3rd party app' registers for the 'discovery onNavigateTo' event using the 'Firebolt' API
        And 1st party app invokes the 'Firebolt' API to '<Error_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'invalid parameters for discovery launch'

        Examples:
            | Scenario          | Error_Key                             |
            | no Action Intent  | no action intent for discoverylaunch  |
            | no Context Intent | no context intent for discoverylaunch |
            | no Source Intent  | no source intent for discoverylaunch  |
            | no Data Intent    | no data intent for discoverylaunch    |

        @skipNegative
        Examples:
            | Scenario               | Error_Key                                  |
            | invalid Action Intent  | invalid action intent for discoverylaunch  |
            | invalid Context Intent | invalid context intent for discoverylaunch |
            | invalid Data Intent    | invalid data intent for discoverylaunch    |

    @sdk @transport @Sev2
    Scenario: Discovery.Launch Hot Launch - Validating API error handling given an invalid appId
        Given the environment has been set up for 'Discovery.Launch' tests
        And 3rd party 'certification' app is launched
        When 1st party app invokes the 'Firebolt' API to 'launch app with invalid appId type'
        Then 'Firebolt' platform responds to '1st party app' with 'invalid parameters for discovery launch'

    @sdk @transport @Sev2
    Scenario Outline: Discovery.Launch Hot Launch - Validate API method response for <Scenario> for context source
        Given the environment has been set up for 'DiscoveryLaunch' tests
        When 1st party app invokes the 'Firebolt' API to '<Discovery_Launch_Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'true for discoverylaunch'
        When Test runner waits for 30 'seconds'
        And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
        Then 'Firebolt' platform responds with 'foreground for lifecycle state'
        And 'Firebolt' platform triggers event '<Event_Content>'

        Examples:
            | Scenario              | Discovery_Launch_Key                 | Event_Content                          |
            | passing random string | launch app with random string source | onNavigateTo with random string source |
            | passing valid string  | launch app with search intent source | onNavigateTo with search intent source |

    @sdk @transport @Sev2
    Scenario: Discovery.Launch Hot Launch - Validating API error handling given an Invalid context source
        Given the environment has been set up for 'DiscoveryLaunch' tests
        And '3rd party app' transitions to state 'foreground'
        When 1st party app invokes the 'Firebolt' API to 'launch app with search intent int source'
        Then 'Firebolt' platform responds to '1st party app' with 'invalid parameters for discovery launch'

    @sdk @transport @requiresPlatformImplementation @Sev2
    Scenario Outline: Discovery.Launch Hot Launch - Validate API method response when one app is in <state> and one is in foreground
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
            | state       |
            | background  |
            | inactive    |