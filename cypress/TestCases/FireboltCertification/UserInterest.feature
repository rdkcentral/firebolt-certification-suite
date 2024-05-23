Feature: UserInterest

    @initialization
    Scenario: Launch FCA for 'Userinterest'
        Given the environment has been set up for 'Userinterest' tests
        And 3rd party 'certification' app is launched

    @coreSDK @sdk @transport @userinterest
    Scenario Outline: Discovery.userInterest - Positive Scenario: with interest type <Scenario>
        When 1st party app registers for the 'Content onUserInterest' event using the 'Firebolt' API
        And '3rd party app' invokes the 'Firebolt' API to 'get userInterest with <GetParam>'
        Then 'Firebolt' platform responds with 'null for discovery userInterest'
        And 'Firebolt' platform triggers to '1st party app' event '<Event_Content>'

        Examples:
            | Scenario                                                                           | GetParam                                                                              | Event_Content                                                |
            | interest reason playlist                                                           | type interest reason playlist program entity                                          | onRequestUserInterest with type interest reason playlist     |
            | disinterest reason playlist                                                        | type disinterest reason playlist program entity                                       | onRequestUserInterest with type disinterest reason playlist  |
            | interest reason playlist & channel streaming entity                                | type interest reason playlist channel streaming entity                                | onRequestUserInterest with type interest reason playlist     |
            | disinterest reason playlist & channel streaming entity                             | type disinterest reason playlist channel streaming entity                             | onRequestUserInterest with type disinterest reason playlist  |
            | interest reason playlist & channel overTheAir entity                               | type interest reason playlist channel overTheAir entity                               | onRequestUserInterest with type interest reason playlist     |
            | disinterest reason playlist & channel overTheAir entity                            | type disinterest reason playlist channel overTheAir entity                            | onRequestUserInterest with type disinterest reason playlist  |
            | interest reason playlist & program episode entity                                  | type interest reason playlist program episode entity                                  | onRequestUserInterest with type interest reason playlist     |
            | disinterest reason playlist & program episode entity                               | type disinterest reason playlist program episode entity                               | onRequestUserInterest with type disinterest reason playlist  |
            | interest reason playlist & program season entity                                   | type interest reason playlist program season entity                                   | onRequestUserInterest with type interest reason playlist     |
            | disinterest reason playlist & program season entity                                | type disinterest reason playlist program season entity                                | onRequestUserInterest with type disinterest reason playlist  |
            | interest reason playlist & program series entity                                   | type interest reason playlist program series entity                                   | onRequestUserInterest with type interest reason playlist     |
            | disinterest reason playlist & program series entity                                | type disinterest reason playlist program series entity                                | onRequestUserInterest with type dinterest reason playlist    |
            | interest reason playlist & program additional concert entity                       | type interest reason playlist program additional concert entity                       | onRequestUserInterest with type interest reason playlist     |
            | disinterest reason playlist & program additional concert entity                    | type disinterest reason playlist program additional concert entity                    | onRequestUserInterest with type dinterest reason playlist    |
            | interest reason playlist & program additional sportingEvent entity                 | type interest reason playlist program additional sportingEvent entity                 | onRequestUserInterest with type interest reason playlist     |
            | disinterest reason playlist & program additional sportingEvent entity              | type disinterest reason playlist program additional sportingEvent entity              | onRequestUserInterest with type dinterest reason playlist    |
            | interest reason playlist & program additional preview entity                       | type interest reason playlist program additional preview entity                       | onRequestUserInterest with type interest reason playlist     |
            | disinterest reason playlist & program additional preview entity                    | type disinterest reason playlist program additional preview entity                    | onRequestUserInterest with type dinterest reason playlist    |
            | interest reason playlist & program additional other entity                         | type interest reason playlist program additional other entity                         | onRequestUserInterest with type interest reason playlist     |
            | disinterest reason playlist & program additional other entity                      | type disinterest reason playlist program additional other entity                      | onRequestUserInterest with type dinterest reason playlist    |
            | interest reason playlist & program additional advertisement entity                 | type interest reason playlist program additional advertisement entity                 | onRequestUserInterest with type interest reason playlist     |
            | disinterest reason playlist & program additional advertisement entity              | type disinterest reason playlist program additional advertisement entity              | onRequestUserInterest with type dinterest reason playlist    |
            | interest reason playlist & program additional musicVideo entity                    | type interest reason playlist program additional musicVideo entity                    | onRequestUserInterest with type interest reason playlist     |
            | disinterest reason playlist & program additional musicVideo entity                 | type disinterest reason playlist program additional musicVideo entity                 | onRequestUserInterest with type dinterest reason playlist    |
            | interest reason playlist & program additional minisode entity                      | type interest reason playlist program additional minisode entity                      | onRequestUserInterest with type interest reason playlist     |
            | disinterest reason playlist & program additional minisode entity                   | type disinterest reason playlist program additional minisode entity                   | onRequestUserInterest with type dinterest reason playlist    |
            | interest reason playlist & program additional extra entity                         | type interest reason playlist program additional extra entity                         | onRequestUserInterest with type interest reason playlist     |
            | disinterest reason playlist & program additional extra entity                      | type disinterest reason playlist program additional extra entity                      | onRequestUserInterest with type dinterest reason playlist    |
            | interest reason playlist & program additional extra entity                         | type interest reason playlist program additional extra entity                         | onRequestUserInterest with type interest reason playlist     |
            | disinterest reason playlist & program additional extra entity                      | type disinterest reason playlist program additional extra entity                      | onRequestUserInterest with type dinterest reason playlist    |
            | interest reason playlist & music song entity                                       | type interest reason playlist music song entity                                       | onRequestUserInterest with type interest reason playlist     |
            | disinterest reason playlist & music song entity                                    | type disinterest reason playlist music song entity                                    | onRequestUserInterest with type dinterest reason playlist    |
            | interest reason playlist & music album entity                                      | type interest reason playlist music album entity                                      | onRequestUserInterest with type interest reason playlist     |
            | disinterest reason playlist & music album entity                                   | type disinterest reason playlist music album entity                                   | onRequestUserInterest with type dinterest reason playlist    |
            | interest reason playlist & program tvepisode entity with seriesId and seasonId     | type interest reason playlist program tvepisode entity with seriesId and seasonId     | onRequestUserInterest with type interest reason playlist     |
            | disinterest reason playlist & program tvepisode entity with seriesId and seasonId  | type disinterest reason playlist program tvepisode entity with seriesId and seasonId  | onRequestUserInterest with type disinterest reason playlist  |
            | interest reason reaction                                                           | type interest reason reaction program entity                                          | onRequestUserInterest with type interest reason reaction     |
            | disinterest reason reaction                                                        | type disinterest reason reaction program entity                                       | onRequestUserInterest with type disinterest reason reaction  |
            | interest reason reaction & channel streaming entity                                | type interest reason reaction channel streaming entity                                | onRequestUserInterest with type interest reason reaction     |
            | disinterest reason reaction & channel streaming entity                             | type disinterest reason reaction channel streaming entity                             | onRequestUserInterest with type disinterest reason reaction  |
            | interest reason reaction & channel overTheAir entity                               | type interest reason reaction channel overTheAir entity                               | onRequestUserInterest with type interest reason reaction     |
            | disinterest reason reaction & channel overTheAir entity                            | type disinterest reason reaction channel overTheAir entity                            | onRequestUserInterest with type disinterest reason reaction  |
            | interest reason reaction & program episode entity                                  | type interest reason reaction program episode entity                                  | onRequestUserInterest with type interest reason reaction     |
            | disinterest reason reaction & program episode entity                               | type disinterest reason reaction program episode entity                               | onRequestUserInterest with type disinterest reason reaction  |
            | interest reason reaction & program season entity                                   | type interest reason reaction program season entity                                   | onRequestUserInterest with type interest reason reaction     |
            | disinterest reason reaction & program season entity                                | type disinterest reason reaction program season entity                                | onRequestUserInterest with type disinterest reason reaction  |
            | interest reason reaction & program series entity                                   | type interest reason reaction program series entity                                   | onRequestUserInterest with type interest reason reaction     |
            | disinterest reason reaction & program series entity                                | type disinterest reason reaction program series entity                                | onRequestUserInterest with type dinterest reason reaction    |
            | interest reason reaction & program additional concert entity                       | type interest reason reaction program additional concert entity                       | onRequestUserInterest with type interest reason reaction     |
            | disinterest reason reaction & program additional concert entity                    | type disinterest reason reaction program additional concert entity                    | onRequestUserInterest with type dinterest reason reaction    |
            | interest reason reaction & program additional sportingEvent entity                 | type interest reason reaction program additional sportingEvent entity                 | onRequestUserInterest with type interest reason reaction     |
            | disinterest reason reaction & program additional sportingEvent entity              | type disinterest reason reaction program additional sportingEvent entity              | onRequestUserInterest with type dinterest reason reaction    |
            | interest reason reaction & program additional preview entity                       | type interest reason reaction program additional preview entity                       | onRequestUserInterest with type interest reason reaction     |
            | disinterest reason reaction & program additional preview entity                    | type disinterest reason reaction program additional preview entity                    | onRequestUserInterest with type dinterest reason reaction    |
            | interest reason reaction & program additional other entity                         | type interest reason reaction program additional other entity                         | onRequestUserInterest with type interest reason reaction     |
            | disinterest reason reaction & program additional other entity                      | type disinterest reason reaction program additional other entity                      | onRequestUserInterest with type dinterest reason reaction    |
            | interest reason reaction & program additional advertisement entity                 | type interest reason reaction program additional advertisement entity                 | onRequestUserInterest with type interest reason reaction     |
            | disinterest reason reaction & program additional advertisement entity              | type disinterest reason reaction program additional advertisement entity              | onRequestUserInterest with type dinterest reason reaction    |
            | interest reason reaction & program additional musicVideo entity                    | type interest reason reaction program additional musicVideo entity                    | onRequestUserInterest with type interest reason reaction     |
            | disinterest reason reaction & program additional musicVideo entity                 | type disinterest reason reaction program additional musicVideo entity                 | onRequestUserInterest with type dinterest reason reaction    |
            | interest reason reaction & program additional minisode entity                      | type interest reason reaction program additional minisode entity                      | onRequestUserInterest with type interest reason reaction     |
            | disinterest reason reaction & program additional minisode entity                   | type disinterest reason reaction program additional minisode entity                   | onRequestUserInterest with type dinterest reason reaction    |
            | interest reason reaction & program additional extra entity                         | type interest reason reaction program additional extra entity                         | onRequestUserInterest with type interest reason reaction     |
            | disinterest reason reaction & program additional extra entity                      | type disinterest reason reaction program additional extra entity                      | onRequestUserInterest with type dinterest reason reaction    |
            | interest reason reaction & program additional extra entity                         | type interest reason reaction program additional extra entity                         | onRequestUserInterest with type interest reason reaction     |
            | disinterest reason reaction & program additional extra entity                      | type disinterest reason reaction program additional extra entity                      | onRequestUserInterest with type dinterest reason reaction    |
            | interest reason reaction & music song entity                                       | type interest reason reaction music song entity                                       | onRequestUserInterest with type interest reason reaction     |
            | disinterest reason reaction & music song entity                                    | type disinterest reason reaction music song entity                                    | onRequestUserInterest with type dinterest reason reaction    |
            | interest reason reaction & music album entity                                      | type interest reason reaction music album entity                                      | onRequestUserInterest with type interest reason reaction     |
            | disinterest reason reaction & music album entity                                   | type disinterest reason reaction music album entity                                   | onRequestUserInterest with type dinterest reason reaction    |
            | interest reason reaction & program tvepisode entity with seriesId and seasonId     | type interest reason reaction program tvepisode entity with seriesId and seasonId     | onRequestUserInterest with type interest reason reaction     |
            | disinterest reason reaction & program tvepisode entity with seriesId and seasonId  | type disinterest reason reaction program tvepisode entity with seriesId and seasonId  | onRequestUserInterest with type disinterest reason reaction  |
            | interest reason recording                                                          | type interest reason recording program entity                                         | onRequestUserInterest with type interest reason recording    |
            | disinterest reason recording                                                       | type disinterest reason recording program entity                                      | onRequestUserInterest with type disinterest reason recording |
            | interest reason recording & channel streaming entity                               | type interest reason recording channel streaming entity                               | onRequestUserInterest with type interest reason recording    |
            | disinterest reason recording & channel streaming entity                            | type disinterest reason recording channel streaming entity                            | onRequestUserInterest with type disinterest reason recording |
            | interest reason recording & channel overTheAir entity                              | type interest reason recording channel overTheAir entity                              | onRequestUserInterest with type interest reason recording    |
            | disinterest reason recording & channel overTheAir entity                           | type disinterest reason recording channel overTheAir entity                           | onRequestUserInterest with type disinterest reason recording |
            | interest reason recording & program episode entity                                 | type interest reason recording program episode entity                                 | onRequestUserInterest with type interest reason recording    |
            | disinterest reason recording & program episode entity                              | type disinterest reason recording program episode entity                              | onRequestUserInterest with type disinterest reason recording |
            | interest reason recording & program season entity                                  | type interest reason recording program season entity                                  | onRequestUserInterest with type interest reason recording    |
            | disinterest reason recording & program season entity                               | type disinterest reason recording program season entity                               | onRequestUserInterest with type disinterest reason recording |
            | interest reason recording & program series entity                                  | type interest reason recording program series entity                                  | onRequestUserInterest with type interest reason recording    |
            | disinterest reason recording & program series entity                               | type disinterest reason recording program series entity                               | onRequestUserInterest with type dinterest reason recording   |
            | interest reason recording & program additional concert entity                      | type interest reason recording program additional concert entity                      | onRequestUserInterest with type interest reason recording    |
            | disinterest reason recording & program additional concert entity                   | type disinterest reason recording program additional concert entity                   | onRequestUserInterest with type dinterest reason recording   |
            | interest reason recording & program additional sportingEvent entity                | type interest reason recording program additional sportingEvent entity                | onRequestUserInterest with type interest reason recording    |
            | disinterest reason recording & program additional sportingEvent entity             | type disinterest reason recording program additional sportingEvent entity             | onRequestUserInterest with type dinterest reason recording   |
            | interest reason recording & program additional preview entity                      | type interest reason recording program additional preview entity                      | onRequestUserInterest with type interest reason recording    |
            | disinterest reason recording & program additional preview entity                   | type disinterest reason recording program additional preview entity                   | onRequestUserInterest with type dinterest reason recording   |
            | interest reason recording & program additional other entity                        | type interest reason recording program additional other entity                        | onRequestUserInterest with type interest reason recording    |
            | disinterest reason recording & program additional other entity                     | type disinterest reason recording program additional other entity                     | onRequestUserInterest with type dinterest reason recording   |
            | interest reason recording & program additional advertisement entity                | type interest reason recording program additional advertisement entity                | onRequestUserInterest with type interest reason recording    |
            | disinterest reason recording & program additional advertisement entity             | type disinterest reason recording program additional advertisement entity             | onRequestUserInterest with type dinterest reason recording   |
            | interest reason recording & program additional musicVideo entity                   | type interest reason recording program additional musicVideo entity                   | onRequestUserInterest with type interest reason recording    |
            | disinterest reason recording & program additional musicVideo entity                | type disinterest reason recording program additional musicVideo entity                | onRequestUserInterest with type dinterest reason recording   |
            | interest reason recording & program additional minisode entity                     | type interest reason recording program additional minisode entity                     | onRequestUserInterest with type interest reason recording    |
            | disinterest reason recording & program additional minisode entity                  | type disinterest reason recording program additional minisode entity                  | onRequestUserInterest with type dinterest reason recording   |
            | interest reason recording & program additional extra entity                        | type interest reason recording program additional extra entity                        | onRequestUserInterest with type interest reason recording    |
            | disinterest reason recording & program additional extra entity                     | type disinterest reason recording program additional extra entity                     | onRequestUserInterest with type dinterest reason recording   |
            | interest reason recording & program additional extra entity                        | type interest reason recording program additional extra entity                        | onRequestUserInterest with type interest reason recording    |
            | disinterest reason recording & program additional extra entity                     | type disinterest reason recording program additional extra entity                     | onRequestUserInterest with type dinterest reason recording   |
            | interest reason recording & music song entity                                      | type interest reason recording music song entity                                      | onRequestUserInterest with type interest reason recording    |
            | disinterest reason recording & music song entity                                   | type disinterest reason recording music song entity                                   | onRequestUserInterest with type dinterest reason recording   |
            | interest reason recording & music album entity                                     | type interest reason recording music album entity                                     | onRequestUserInterest with type interest reason recording    |
            | disinterest reason recording & music album entity                                  | type disinterest reason recording music album entity                                  | onRequestUserInterest with type dinterest reason recording   |
            | interest reason recording & program tvepisode entity with seriesId and seasonId    | type interest reason recording program tvepisode entity with seriesId and seasonId    | onRequestUserInterest with type interest reason recording    |
            | disinterest reason recording & program tvepisode entity with seriesId and seasonId | type disinterest reason recording program tvepisode entity with seriesId and seasonId | onRequestUserInterest with type disinterest reason recording |

    @coreSDK @sdk @transport @userinterest
    Scenario Outline: Discovery.userInterest - Negative Scenario: <Scenario> expecting error
        When '3rd party app' invokes the 'Firebolt' API to 'get userInterest <GetParam>'
        Then 'Firebolt' platform responds with 'invalid params for discovery userInterest'

        Examples:
            | Scenario                                                | GetParam                                                     |
            | Empty param                                             | without any params                                           |
            | Without Interest type                                   | without interest type                                        |
            | Invalid Interest type - integer params                  | with numeric interestType                                    |
            | Invalid Interest type - test params                     | with string interestType                                     |
            | Invalid Interest type - boolean params                  | with boolean interestType                                    |
            | Invalid channelType in channel entity                   | with invalid channelType in channel entity                   |
            | Boolean channelType in channel entity                   | with boolean channelType in channel entity                   |
            | Integer channelType in channel entity                   | with integer channelType in channel entity                   |
            | Invalid programType in program entity                   | with invalid programType in program entity                   |
            | Boolean programType in program entity                   | with boolean programType in program entity                   |
            | Integer programType in program entity                   | with integer programType in program entity                   |
            | Invalid musicType in music entity                       | with invalid musicType in music entity                       |
            | Boolean musicType in music entity                       | with boolean musicType in music entity                       |
            | Integer musicType in music entity                       | with integer musicType in music entity                       |
            | Invalid seriesId in program episode entity              | with invalid seriesId in program episode entity              |
            | Invalid seasonId in program episode entity              | with invalid seasonId in program episode entity              |
            | Invalid seriesId and seasonId in program episode entity | with invalid seriesId and seasonId in program episode entity |
            | Invalid seriesId in program season entity               | with invalid seriesId in program season entity               |
            | Invalid programType for program entity with seriesId    | with invalid programType for program entity with seriesId    |
            | Invalid programType for program entity with seasonId    | with invalid programType for program entity with seasonId    |

    @coreSDK @sdk @userinterest
    Scenario Outline: Content.requestUserInterest - Positive Scenario: with type <Scenario>
        And 1st party app invokes the 'Firebolt' API to 'get requestUserInterest with type <setParam>'
        Then 'Firebolt' platform responds to '1st party app' with '<method_Content>'

        Examples:
            | Scenario                         | setParam                     | method_Content                            |
            | interest and reason playlist     | interest reason playlist     | requestUserInterest with reason playlist  |
            | interest and reason reaction     | interest reason reaction     | requestUserInterest with reason reaction  |
            | interest and reason recording    | interest reason recording    | requestUserInterest with reason recording |
            | disinterest and reason playlist  | disinterest reason playlist  | requestUserInterest with reason playlist  |
            | disinterest and reason reaction  | disinterest reason reaction  | requestUserInterest with reason reaction  |
            | disinterest and reason recording | disinterest reason recording | requestUserInterest with reason recording |

    @coreSDK @sdk @transport @userinterest
    Scenario Outline: Content.requestUserInterest - Negative Scenario: <Scenario> expecting error
        When 1st party app invokes the 'Firebolt' API to 'get requestUserInterest with <param>'
        Then 'Firebolt' platform responds to '1st party app' with 'invalid params for content requestUserInterest'

        Examples:
            | Scenario                               | param                |
            | Invalid Interest value - test params   | invalid interestType |
            | Invalid Interest type - boolean params | boolean interestType |
            | Invalid reason value - test params     | invalid reasonType   |
            | Invalid Interest type - boolean params | boolean reasonType   |