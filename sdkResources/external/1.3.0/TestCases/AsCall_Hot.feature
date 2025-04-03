@coreSDK @AppHotLaunch @AS_AppLaunch
Feature: AS_Call_HotLaunch

  @initialization
  Scenario: Launch FCA for AS Call Hot Launch
    Given the environment has been set up for 'AS_HotLaunch' tests
    And 3rd party 'certification' app is launched
    And Test runner waits for 10 'seconds'
    And '3rd party app' transitions to state 'foreground'
    And '3rd party app' registers for the 'discovery onNavigateTo' event using the 'Firebolt' API

  @sdk @transport
  Scenario: AS Call Hot Launch with Null intent while existing app is in foreground state
    Given the environment has been set up for 'AS_HotLaunch' tests
    And '3rd party app' transitions to state 'foreground'
    When 1st party app invokes the 'Firebolt' API to 'launch app with null intent'
    And Test runner waits for 10 'seconds'
    And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
    Then 'Firebolt' platform responds with 'foreground for lifecycle state'

  @sdk @transport
  Scenario Outline: AS Call Hot Launch <Scenario> intent and app in foreground
    Given the environment has been set up for 'AS_HotLaunch' tests
    When 1st party app invokes the 'Firebolt' API to '<AS_Call_Key>'
    And Test runner waits for 30 'seconds'
    And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
    Then 'Firebolt' platform responds with 'foreground for lifecycle state'
    And 'Firebolt' platform triggers event '<Event_Content>'

    Examples:
      | Scenario                                                            | AS_Call_Key                                                                     | Event_Content                                                                     |
      | Home Foreground                                                     | launch app with home intent                                                     | onNavigateTo with home intent                                                     |
      | Playback Foreground                                                 | launch app with playback intent                                                 | onNavigateTo with playback intent                                                 |
      | Playback Foreground without entityType                              | launch app with playback intent without entityType                              | onNavigateTo with playback intent without entityType                              |
      | Entity Foreground                                                   | launch app with entity intent                                                   | onNavigateTo with entity intent                                                   |
      | Entity Foreground without entityType                                | launch app with entity intent without entityType                                | onNavigateTo with entity intent without entityType                                |
      | Launch Foreground                                                   | launch app with intent                                                          | onNavigateTo with intent                                                          |
      | Search Foreground                                                   | launch app with search intent                                                   | onNavigateTo with search intent                                                   |
      # | Search Foreground with programType movie                            | launch app with search intent with programType movie                            | onNavigateTo with searchintent programType movie                                  |
      # | Search Foreground with programType episode                          | launch app with search intent with programType episode                          | onNavigateTo with searchintent programType episode                                |
      # | Search Foreground with programType season                           | launch app with search intent with programType season                           | onNavigateTo with searchintent programType season                                 |
      # | Search Foreground with programType series                           | launch app with search intent with programType series                           | onNavigateTo with searchintent programType series                                 |
      # | Search Foreground with programType concert                          | launch app with search intent with programtype concert                          | onNavigateTo with searchintent programtype concert                                |
      # | Search Foreground with programType sportingevent                    | launch app with search intent with programtype sportingevent                    | onNavigateTo with searchintent programtype sportingevent                          |
      # | Search Foreground with programType preview                          | launch app with search intent with programtype preview                          | onNavigateTo with searchintent programtype preview                                |
      # | Search Foreground with programType other                            | launch app with search intent with programtype other                            | onNavigateTo with searchintent programtype other                                  |
      # | Search Foreground with programType advertisement                    | launch app with search intent with programtype advertisement                    | onNavigateTo with searchintent programtype advertisement                          |
      # | Search Foreground with programType musicvideo                       | launch app with search intent with programtype musicvideo                       | onNavigateTo with searchintent programtype musicvideo                             |
      # | Search Foreground with programType minisode                         | launch app with search intent with programtype minisode                         | onNavigateTo with searchintent programtype minisode                               |
      # | Search Foreground with programType extra                            | launch app with search intent with programtype extra                            | onNavigateTo with searchintent programtype extra                                  |
      # | Search Foreground with musicType song                               | launch app with search intent with musictype song                               | onNavigateTo with searchintent musictype song                                     |
      # | Search Foreground with musicType album                              | launch app with search intent with musictype album                              | onNavigateTo with searchintent musictype album                                    |
      # | Search Foreground with channelType streaming                        | launch app with search intent with channelType streaming                        | onNavigateTo with searchintent channeltype streaming                              |
      # | Search Foreground with channelType overTheAir                       | launch app with search intent with channelType overTheAir                       | onNavigateTo with searchintent channeltype overtheair                             |
      # | Search Foreground with untyped entity                               | launch app with search intent with untyped entity                               | onNavigateTo with searchintent untyped entity                                     |
      # | Search Foreground with playlist entity                              | launch app with search intent with playlist entity                              | onNavigateTo with searchintent playlist entity                                    |
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

  @sdk @transport @inactiveHotLaunch
  Scenario: AS Call Hot Launch with Null intent while existing app is in inactive state
    Given the environment has been set up for 'AS_HotLaunch' tests
    And '3rd party app' transitions to state 'inactive'
    When 1st party app invokes the 'Firebolt' API to 'launch app with null intent'
    And Test runner waits for 10 'seconds'
    And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
    Then 'Firebolt' platform responds with 'foreground for lifecycle state'

  @sdk @transport @inactiveHotLaunch
  Scenario Outline: AS Call Hot Launch <Scenario> intent and app in inactive
    Given the environment has been set up for 'AS_HotLaunch' tests
    And '3rd party app' transitions to state 'inactive'
    When 1st party app invokes the 'Firebolt' API to '<AS_Call_Key>'
    And Test runner waits for 10 'seconds'
    And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
    Then 'Firebolt' platform responds with 'foreground for lifecycle state'
    And 'Firebolt' platform triggers event '<Event_Content>'

    Examples:
      | Scenario                                                    | AS_Call_Key                                                              | Event_Content                                                              |
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
  # | Search Inactive with programType movie                      | launch app with search intent with programType movie                     | onNavigateTo with searchintent programType movie                           |
  # | Search Inactive with programType advertisement              | launch app with search intent with programtype advertisement             | onNavigateTo with searchintent programtype advertisement                   |
  # | Search Inactive with musicType song                         | launch app with search intent with musictype song                        | onNavigateTo with searchintent musictype song                              |
  # | Search Inactive with musicType album                        | launch app with search intent with musictype album                       | onNavigateTo with searchintent musictype album                             |
  # | Search Inactive with channelType streaming                  | launch app with search intent with channelType streaming                 | onNavigateTo with searchintent channeltype streaming                       |
  # | Search Inactive with channelType overTheAir                 | launch app with search intent with channelType overTheAir                | onNavigateTo with searchintent channeltype overtheair                      |
  # | Search Inactive with untyped entity                         | launch app with search intent with untyped entity                        | onNavigateTo with searchintent untyped entity                              |
  # | Search Inactive with playlist entity                        | launch app with search intent with playlist entity                       | onNavigateTo with searchintent playlist entity                             |

  @sdk @transport @backgroundHotLaunch
  Scenario: AS Call Hot Launch with Null intent while existing app is in background state
    Given the environment has been set up for 'AS_HotLaunch' tests
    And '3rd party app' transitions to state 'background'
    When 1st party app invokes the 'Firebolt' API to 'launch app with null intent'
    And Test runner waits for 10 'seconds'
    And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
    Then 'Firebolt' platform responds with 'foreground for lifecycle state'

  @sdk @transport @backgroundHotLaunch
  Scenario Outline: AS Call Hot Launch <Scenario> intent and app in background
    Given the environment has been set up for 'AS_HotLaunch' tests
    And '3rd party app' transitions to state 'background'
    When 1st party app invokes the 'Firebolt' API to '<AS_Call_Key>'
    And Test runner waits for 10 'seconds'
    And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
    Then 'Firebolt' platform responds with 'foreground for lifecycle state'
    And 'Firebolt' platform triggers event '<Event_Content>'

    Examples:
      | Scenario                                                      | AS_Call_Key                                                              | Event_Content                                                              |
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
  # | Search Background with programType movie                      | launch app with search intent with programType movie                     | onNavigateTo with searchintent programType movie                           |
  # | Search Background with programType advertisement              | launch app with search intent with programtype advertisement             | onNavigateTo with searchintent programtype advertisement                   |
  # | Search Background with musicType song                         | launch app with search intent with musictype song                        | onNavigateTo with searchintent musictype song                              |
  # | Search Background with musicType album                        | launch app with search intent with musictype album                       | onNavigateTo with searchintent musictype album                             |
  # | Search Background with channelType streaming                  | launch app with search intent with channelType streaming                 | onNavigateTo with searchintent channeltype streaming                       |
  # | Search Background with channelType overTheAir                 | launch app with search intent with channelType overTheAir                | onNavigateTo with searchintent channeltype overtheair                      |
  # | Search Background with untyped entity                         | launch app with search intent with untyped entity                        | onNavigateTo with searchintent untyped entity                              |
  # | Search Background with playlist entity                        | launch app with search intent with playlist entity                       | onNavigateTo with searchintent playlist entity                             |

  @sdk @transport @suspendedHotLaunch
  Scenario: AS Call Hot Launch with Null intent while existing app is in suspended state
    Given the environment has been set up for 'AS_HotLaunch' tests
    And '3rd party app' transitions to state 'suspended'
    When 1st party app invokes the 'Firebolt' API to 'launch app with null intent'
    And Test runner waits for 10 'seconds'
    And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
    Then 'Firebolt' platform responds with 'foreground for lifecycle state'

  @sdk @transport @suspendedHotLaunch
  Scenario Outline: AS Call Hot Launch <Scenario> intent and app in suspended
    Given the environment has been set up for 'AS_HotLaunch' tests
    And '3rd party app' transitions to state 'suspended'
    When 1st party app invokes the 'Firebolt' API to '<AS_Call_Key>'
    And Test runner waits for 10 'seconds'
    And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
    Then 'Firebolt' platform responds with 'foreground for lifecycle state'

    Examples:
      | Scenario                                                     | AS_Call_Key                                                              |
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
  # | Search Suspended with programType movie                      | launch app with search intent with programType movie                     |
  # | Search Suspended with programType advertisement              | launch app with search intent with programtype advertisement             |
  # | Search Suspended with musicType song                         | launch app with search intent with musictype song                        |
  # | Search Suspended with musicType album                        | launch app with search intent with musictype album                       |
  # | Search Suspended with channelType streaming                  | launch app with search intent with channelType streaming                 |
  # | Search Suspended with channelType overTheAir                 | launch app with search intent with channelType overTheAir                |
  # | Search Suspended with untyped entity                         | launch app with search intent with untyped entity                        |
  # | Search Suspended with playlist entity                        | launch app with search intent with playlist entity                       |

  @sdk @transport
  Scenario Outline: AS Call Hot Launch <Scenario> for context source
    Given the environment has been set up for 'AS_HotLaunch' tests
    When 1st party app invokes the 'Firebolt' API to '<AS_Call_Key>'
    And Test runner waits for 30 'seconds'
    And '3rd party app' invokes the 'Firebolt' API to 'fetch lifecycle state'
    Then 'Firebolt' platform responds with 'foreground for lifecycle state'
    And 'Firebolt' platform triggers event '<Event_Content>'

    Examples:
      | Scenario              | AS_Call_Key                          | Event_Content                          |
      | Passing random string | launch app with random string source | onNavigateTo with random string source |
      | Passing valid string  | launch app with search intent source | onNavigateTo with search intent source |
