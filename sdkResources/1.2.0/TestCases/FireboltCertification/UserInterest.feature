@UserInterest @coreSDK
Feature: UserInterest

    Background: Launch FCA for 'Userinterest'
        Given the environment has been set up for 'Userinterest' tests
        And 3rd party 'certification' app is launched

    @sdk @transport @Sev1
    Scenario Outline: Discovery.userInterest - Validate event response with <Scenario>
        When 1st party app registers for the 'Content onUserInterest' event using the 'Firebolt' API
        And '3rd party app' invokes the 'Firebolt' API to 'notify userInterest with <userInterestData>'
        Then 'Firebolt' platform responds with 'null for discovery userInterest'
        And 'Firebolt' platform triggers to '1st party app' event 'onUserInterest with <Event_Content>'

        Examples:
            | Scenario                                          | userInterestData                                         | Event_Content                    |
            | interest & reason playlist with program entity    | type interest and reason playlist with program entity    | type interest reason playlist    |
            | disinterest & reason playlist with program entity | type disinterest and reason playlist with program entity | type disinterest reason playlist |
            
    @sdk @transport @Sev2
    Scenario Outline: Discovery.userInterest - Validate event response content with <Scenario>
        When 1st party app registers for the 'Content onUserInterest' event using the 'Firebolt' API
        And '3rd party app' invokes the 'Firebolt' API to 'notify userInterest with <userInterestData>'
        Then 'Firebolt' platform responds with 'null for discovery userInterest'
        And 'Firebolt' platform triggers to '1st party app' event 'onUserInterest with <Event_Content>'

        Examples:
            | Scenario                                                                               | userInterestData                                                                              | Event_Content                                                                        |
            | interest & reason playlist with channel streaming entity                               | type interest and reason playlist with channel streaming entity                               | type interest reason playlist channel                                                |
            | disinterest & reason playlist with channel streaming entity                            | type disinterest and reason playlist with channel streaming entity                            | type disinterest reason playlist channel                                             |
            | interest & reason playlist with channel overTheAir entity                              | type interest and reason playlist with channel overTheAir entity                              | type interest reason playlist overTheAir                                             |
            | disinterest & reason playlist with channel overTheAir entity                           | type disinterest and reason playlist with channel overTheAir entity                           | type disinterest reason playlist overTheAir                                          |
            | interest & reason playlist with program episode entity                                 | type interest and reason playlist with program episode entity                                 | type interest reason playlist program episode                                        |
            | disinterest & reason playlist with program episode entity                              | type disinterest and reason playlist with program episode entity                              | type disinterest reason playlist program episode                                     |
            | interest & reason playlist with program additional concert entity                      | type interest and reason playlist with program additional concert entity                      | type interest reason playlist additional concert entity                              |
            | disinterest & reason playlist with program additional concert entity                   | type disinterest and reason playlist with program additional concert entity                   | type disinterest reason playlist additional concert entity                           |
            | interest & reason playlist with program additional sportingEvent entity                | type interest and reason playlist with program additional sportingEvent entity                | type interest reason playlist additional sportingEvent entity                        |
            | disinterest & reason playlist with program additional sportingEvent entity             | type disinterest and reason playlist with program additional sportingEvent entity             | type disinterest reason playlist additional sportingEvent entity                     |
            | interest & reason playlist with music song entity                                      | type interest and reason playlist with music song entity                                      | type interest reason playlist music song entity                                      |
            | disinterest & reason playlist with music song entity                                   | type disinterest and reason playlist with music song entity                                   | type disinterest reason playlist music song entity                                   |
            | interest & reason playlist with music album entity                                     | type interest and reason playlist with music album entity                                     | type interest reason playlist music album entity                                     |
            | disinterest & reason playlist with music album entity                                  | type disinterest and reason playlist with music album entity                                  | type disinterest reason playlist music album entity                                  |
            | interest & reason reaction with program entity                                         | type interest and reason reaction with program entity                                         | type interest reason reaction program entity                                         |
            | disinterest & reason reaction with program entity                                      | type disinterest and reason reaction with program entity                                      | type disinterest reason reaction program entity                                      |
            | interest & reason reaction with channel streaming entity                               | type interest and reason reaction with channel streaming entity                               | type interest reason reaction channel streaming entity                               |
            | disinterest & reason reaction with channel streaming entity                            | type disinterest and reason reaction with channel streaming entity                            | type disinterest reason reaction channel streaming entity                            |
            | interest & reason reaction with program additional preview entity                      | type interest and reason reaction with program additional preview entity                      | type interest reason reaction program additional preview entity                      |
            | disinterest & reason reaction with program additional preview entity                   | type disinterest and reason reaction with program additional preview entity                   | type disinterest reason reaction program additional preview entity                   |
            | interest & reason reaction with program additional advertisement entity                | type interest and reason reaction with program additional advertisement entity                | type interest reason reaction program additional advertisement entity                |
            | disinterest & reason reaction with program additional advertisement entity             | type disinterest and reason reaction with program additional advertisement entity             | type disinterest reason reaction program additional advertisement entity             |
            | interest & reason reaction with program additional musicVideo entity                   | type interest and reason reaction with program additional musicVideo entity                   | type interest reason reaction program additional musicVideo entity                   |
            | disinterest & reason reaction with program additional musicVideo entity                | type disinterest and reason reaction with program additional musicVideo entity                | type disinterest reason reaction program additional musicVideo entity                |
            | interest & reason reaction with program additional minisode entity                     | type interest and reason reaction with program additional minisode entity                     | type interest reason reaction program additional minisode entity                     |
            | disinterest & reason reaction with program additional minisode entity                  | type disinterest and reason reaction with program additional minisode entity                  | type disinterest reason reaction program additional minisode entity                  |
            | interest & reason reaction with program additional extra entity                        | type interest and reason reaction with program additional extra entity                        | type interest reason reaction program additional extra entity                        |
            | disinterest & reason reaction with program additional extra entity                     | type disinterest and reason reaction with program additional extra entity                     | type disinterest reason reaction program additional extra entity                     |
            | interest & reason reaction with program tvepisode entity with seriesId and seasonId    | type interest and reason reaction with program tvepisode entity with seriesId and seasonId    | type interest reason reaction program tvepisode entity with seriesId and seasonId    |
            | disinterest & reason reaction with program tvepisode entity with seriesId and seasonId | type disinterest and reason reaction with program tvepisode entity with seriesId and seasonId | type disinterest reason reaction program tvepisode entity with seriesId and seasonId |
            | interest & reason recording with program entity                                        | type interest and reason recording with program entity                                        | type interest reason recording program entity                                        |
            | disinterest & reason recording with program entity                                     | type disinterest and reason recording with program entity                                     | type disinterest reason recording program entity                                     |
            | interest & reason recording with channel streaming entity                              | type interest and reason recording with channel streaming entity                              | type interest reason recording channel streaming entity                              |
            | disinterest & reason recording with channel streaming entity                           | type disinterest and reason recording with channel streaming entity                           | type disinterest reason recording channel streaming entity                           |
            | interest & reason recording with channel overTheAir entity                             | type interest and reason recording with channel overTheAir entity                             | type interest reason recording channel overTheAir entity                             |
            | disinterest & reason recording with channel overTheAir entity                          | type disinterest and reason recording with channel overTheAir entity                          | type disinterest reason recording channel overTheAir entity                          |
            | interest & reason recording with program episode entity                                | type interest and reason recording with program episode entity                                | type interest reason recording program episode entity                                |
            | disinterest & reason recording with program episode entity                             | type disinterest and reason recording with program episode entity                             | type disinterest reason recording program episode entity                             |
            | interest & reason recording with program season entity                                 | type interest and reason recording with program season entity                                 | type interest reason recording program season entity                                 |
            | disinterest & reason recording with program season entity                              | type disinterest and reason recording with program season entity                              | type disinterest reason recording program season entity                              |


    @sdk @transport @Sev2
    Scenario Outline: Discovery.userInterest - Validating API Error handling when given <Scenario>
        When '3rd party app' invokes the 'Firebolt' API to 'notify userInterest <Param>'
        Then 'Firebolt' platform responds with 'invalid params for discovery userInterest'

        Examples:
            | Scenario                                                | Param                                                        |
            | empty params                                            | without any params                                           |
            | no Interest type                                        | without interest type                                        |
            | invalid Interest type with integer params               | with numeric interestType                                    |
            | invalid Interest type with test params                  | with string interestType                                     |
            | invalid Interest type with boolean params               | with boolean interestType                                    |
            | invalid channelType in channel entity                   | with invalid channelType in channel entity                   |
            | boolean channelType in channel entity                   | with boolean channelType in channel entity                   |
            | integer channelType in channel entity                   | with integer channelType in channel entity                   |
            | invalid programType in program entity                   | with invalid programType in program entity                   |
            | boolean programType in program entity                   | with boolean programType in program entity                   |
            | integer programType in program entity                   | with integer programType in program entity                   |
            | invalid musicType in music entity                       | with invalid musicType in music entity                       |
            | boolean musicType in music entity                       | with boolean musicType in music entity                       |
            | integer musicType in music entity                       | with integer musicType in music entity                       |
            | invalid seriesId in program episode entity              | with invalid seriesId in program episode entity              |
            | invalid seasonId in program episode entity              | with invalid seasonId in program episode entity              |
            | invalid seriesId and seasonId in program episode entity | with invalid seriesId and seasonId in program episode entity |
            | invalid seriesId in program season entity               | with invalid seriesId in program season entity               |
            | invalid programType for program entity with seriesId    | with invalid programType for program entity with seriesId    |
            | invalid programType for program entity with seasonId    | with invalid programType for program entity with seasonId    |

    @sdk @Sev1
    Scenario Outline: Content.requestUserInterest - Platform-UX - Notify requestUserInterest with type <Scenario>
        And 1st party app invokes the 'Firebolt' API to 'notify requestUserInterest with type <userInterestData>'
        Then 'Firebolt' platform responds to '1st party app' with '<method_Content>'

        Examples:
            | Scenario                         | userInterestData             | method_Content                            |
            | interest and reason playlist     | interest reason playlist     | requestUserInterest with reason playlist  |
            | interest and reason reaction     | interest reason reaction     | requestUserInterest with reason reaction  |
            | interest and reason recording    | interest reason recording    | requestUserInterest with reason recording |
            | disinterest and reason playlist  | disinterest reason playlist  | requestUserInterest with reason playlist  |
            | disinterest and reason reaction  | disinterest reason reaction  | requestUserInterest with reason reaction  |
            | disinterest and reason recording | disinterest reason recording | requestUserInterest with reason recording |

    @sdk @transport @Sev2
    Scenario Outline: Content.requestUserInterest - Validating API Error handling when given <Scenario>
        When 1st party app invokes the 'Firebolt' API to 'notify requestUserInterest with <Param>'
        Then 'Firebolt' platform responds to '1st party app' with 'invalid params for content requestUserInterest'

        Examples:
            | Scenario                                  | Param                |
            | invalid Interest value with test params   | invalid interestType |
            | invalid Interest type with boolean params | boolean interestType |
            | invalid reason value with test params     | invalid reasonType   |
            | invalid Interest type with boolean params | boolean reasonType   |

    @sdk @requiresPlatformImplementation @Sev2
    Scenario: Content.requestUserInterest - Validating API Error handling when platform times-out without sending response
        When 1st party app invokes the 'Firebolt' API to 'notify requestUserInterest with type interest timeout'
        Then 'Firebolt' platform responds to '1st party app' with 'not available for requestUserInterest'

    @sdk @requiresPlatformImplementation @Sev2
    Scenario: Content.requestUserInterest - Validating API Error handling when 3rd party app returns error
        When 1st party app invokes the 'Firebolt' API to 'notify requestUserInterest with type interest returns error'
        Then 'Firebolt' platform responds to '1st party app' with 'invalid parameters for requestUserInterest'

    @sdk @requiresPlatformImplementation @Sev1
    Scenario: Content.requestUserInterest - Validating API Error handling when attempting to skip registering for providers
        Given the environment has been set up for 'UserInterestProvider' tests
        And 3rd party 'certification' app is launched
        When 1st party app invokes the 'Firebolt' API to 'notify requestUserInterest with type interest without provider'
        Then 'Firebolt' platform responds to '1st party app' with 'not available for requestUserInterest'
