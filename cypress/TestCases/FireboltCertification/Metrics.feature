@Metrics @coreSDK
Feature: Metrics

    Background: Launch FCA for 'Metrics'
        Given the environment has been set up for 'Metrics' tests
        And 3rd party 'certification' app is launched

    @sdk @transport
    Scenario Outline: Metrics.<Method> - Validating API and Event Responses
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Validation_key>'

        Examples:
            | Method       | API_Key                          | Validation_key                   |
            | startContent | notify that content has started  | true for startContent in metrics | 
            | stopContent  | notify that content has stopped  | true for stopContent in metrics  |

    @sdk @transport
    Scenario Outline: Metrics.<Method> - Validating API Error handling for <Scenario>
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Validation_key>'

        Examples:
            | Scenario                             | Method               | API_Key                                                        | Validation_key                                  |
            | page with emptyParam                 | page                 | notify that page has navigated with empty parameter            | invalid params for metrics page                 |
            | action with emptyParam               | action               | notify about action with empty parameter                       | invalid params for metrics action               |
            | action with type-null                | action               | notify about action with type null                             | invalid params for metrics action               |
            | action with type-256                 | action               | notify about action with type maxlength 256                    | invalid params for metrics action               |
            | action with dfrnt-category           | action               | notify about action with different category                    | invalid params for metrics action               |
            | error with emptyParam                | error                | notify that error has occured with empty parameter             | invalid params for metrics error                |
            | mediaLoadStart with emptyParam       | mediaLoadStart       | infer load time with empty parameter                           | invalid params for metrics mediaLoadStart       |
            | mediaPlay with emptyParam            | mediaPlay            | start playback with empty parameter                            | invalid params for metrics mediaPlay            |
            | mediaPlaying with emptyParam         | mediaPlaying         | notify that playback has started with empty parameter          | invalid params for metrics mediaPlaying         |
            | mediaPause with emptyParam           | mediaPause           | notify that playback has paused with empty parameter           | invalid params for metrics mediaPause           |
            | mediaWaiting with emptyParam         | mediaWaiting         | notify that playback has halted with empty parameter           | invalid params for metrics mediaWaiting         |
            | mediaProgress with emptyParam        | mediaProgress        | notify that playback is progressing with empty parameter       | invalid params for metrics mediaProgress        |
            | mediaSeeking with emptyParam         | mediaSeeking         | notify that playback seek is initiated with empty parameter    | invalid params for metrics mediaSeeking         |
            | mediaSeeked with emptyParam          | mediaSeeked          | notify that playback seek is completed with empty parameter    | invalid params for metrics mediaSeeked          |
            | mediaRateChange with emptyParam      | mediaRateChange      | notify that playback rate is changed with empty parameter      | invalid params for metrics mediaRateChange      |
            | mediaRenditionChange with emptyParam | mediaRenditionChange | notify that playback rendition is Changed with empty parameter | invalid params for metrics mediaRenditionChange |
            | mediaEnded with emptyParam           | mediaEnded           | notify that playback has stopped with empty parameter          | invalid params for metrics mediaEnded           |

    @sdk @transport
    Scenario Outline: Metrics.<Method> - Validating API and Event Responses for <Scenario>
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Validation_key>'

        Examples:
            | Scenario                                     | Method               | API_Key                                                              | Validation_key                           |
            | startContent with entityId                   | startContent         | notify that content has started with entityId                        | true for startContent in metrics         |
            | stopContent with entityId                    | stopContent          | notify that content has stopped with entityId                        | true for stopContent in metrics          |
            | page with pageId                             | page                 | notify that page has navigated with pageId                           | true for page in metrics                 |
            | action with userMetrics                      | action               | notify about action with userMetrics                                 | true for action in metrics               |
            | action with appMetrics                       | action               | notify about action with appMetrics                                  | true for action in metrics               |
            | action with parametersMetrics                | action               | notify about action with parametersMetrics                           | true for action in metrics               |
            | error with mediaStalled                      | error                | notify that error has occured with mediaStalled                      | true for error in metrics                |
            | mediaLoadStart with entityId                 | mediaLoadStart       | infer load time with entityId                                        | true for mediaLoadStart in metrics       |
            | mediaPlay with entityId                      | mediaPlay            | start playback with entityId                                         | true for mediaPlay in metrics            |
            | mediaPlaying with entityId                   | mediaPlaying         | notify that playback has started with entityId                       | true for mediaPlaying in metrics         |
            | mediaPause with entityId                     | mediaPause           | notify that playback has paused with entityId                        | true for mediaPause in metrics           |
            | mediaWaiting with entityId                   | mediaWaiting         | notify that playback has halted with entityId                        | true for mediaWaiting in metrics         |
            | mediaProgress with mediaPosition             | mediaProgress        | notify that playback is progressing with mediaPosition               | true for mediaProgress in metrics        |
            | mediaSeeking with mediaPosition              | mediaSeeking         | notify that playback seek is initiated with mediaPosition            | true for mediaSeeking in metrics         |
            | mediaSeeked with mediaPosition               | mediaSeeked          | notify that playback seek is completed with mediaPosition            | true for mediaSeeked in metrics          |
            | mediaRateChange with playbackRate            | mediaRateChange      | notify that playback rate is changed with playbackRate               | true for mediaRateChange in metrics      |
            | mediaRenditionChange with bitrateProfile     | mediaRenditionChange | notify that playback rendition is Changed with bitrateProfile        | true for mediaRenditionChange in metrics |
            | mediaEnded with entityId                     | mediaEnded           | notify that playback has stopped with entityId                       | true for mediaEnded in metrics           |
            | action with parametersMetrics as string      | action               | notify about action with parametersMetrics as string                 | true for action in metrics               |
            | action with parametersMetrics as boolean     | action               | notify about action with parametersMetrics as boolean                | true for action in metrics               |
            | action with parametersMetrics as number      | action               | notify about action with parametersMetrics as number                 | true for action in metrics               |
            | action with parametersMetrics                | action               | notify about action with parametersMetrics                           | true for action in metrics               |
            | error with mediaStalled parameter            | error                | notify that error has occured with mediaStalled parameter            | true for error in metrics                |
            | error with mediaStalled parameter as string  | error                | notify that error has occured with mediaStalled parameter as string  | true for error in metrics                |
            | error with mediaStalled parameter as boolean | error                | notify that error has occured with mediaStalled parameter as boolean | true for error in metrics                |
            | error with mediaStalled parameter as number  | error                | notify that error has occured with mediaStalled parameter as number  | true for error in metrics                |
            | Metrics appInfo                              | appInfo              | Inform the platform about app build                                  | null for metrics appInfo                 |


    @sdk @transport
    Scenario Outline: Metrics.<Method> - Validating API Error handling for <Scenario>
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Validation_key>'

        Examples:
            | Scenario                                  | Method               | API_Key                                                         | Validation_key                                  |
            | startContent with numeric-entityId        | startContent         | notify that content has started with numeric entityId           | invalid params for metrics startContent         |
            | stopContent with numeric-entityId         | stopContent          | notify that content has stopped with numeric entityId           | invalid params for metrics stopContent          |
            | page with numeric-pageId                  | page                 | notify that page has navigated with numeric pageId              | invalid params for metrics page                 |
            | action with numeric-userMetrics           | action               | notify about action with numeric userMetrics                    | invalid params for metrics action               |
            | action with numeric-appMetrics            | action               | notify about action with numeric appMetrics                     | invalid params for metrics action               |
            | action with numeric-typeMetrics           | action               | notify about action with numeric typeMetrics                    | invalid params for metrics action               |
            | action with numeric-paramMetrics          | action               | notify about action with numeric paramMetrics                   | invalid params for metrics action               |
            | action with paramMetrics nested object    | action               | notify about action with paramMetrics for nested object         | invalid params for metrics action               |
            | error with numeric-type                   | error                | notify that error has occured with numeric type                 | invalid params for metrics error                |
            | error with string-type                    | error                | notify that error has occured with string type                  | invalid params for metrics error                |
            | error with numeric-code                   | error                | notify that error has occured with numeric code                 | invalid params for metrics error                |
            | error with numeric-description            | error                | notify that error has occured with numeric description          | invalid params for metrics error                |
            | error with numeric-visible                | error                | notify that error has occured with numeric visible              | invalid params for metrics error                |
            | error with numeric-parameters             | error                | notify that error has occured with numeric parameters           | invalid params for metrics error                |
            | invalid parameter error for metrics error | error                | notify that error has occured with parameters for nested object | invalid params for metrics error                |
            | mediaLoadStart with numeric-entityId      | mediaLoadStart       | infer load time with numeric entityId                           | invalid params for metrics mediaLoadStart       |
            | mediaPlay with numeric-entityId           | mediaPlay            | start playback with numeric entityId                            | invalid params for metrics mediaPlay            |
            | mediaPlaying with numeric-entityId        | mediaPlaying         | notify that playback has started with numeric entityId          | invalid params for metrics mediaPlaying         |
            | mediaPause with numeric-entityId          | mediaPause           | notify that playback has paused with numeric entityId           | invalid params for metrics mediaPause           |
            | mediaWaiting with numeric-entityId        | mediaWaiting         | notify that playback has halted with numeric entityId           | invalid params for metrics mediaWaiting         |
            | mediaProgress with string-mediaPosition   | mediaProgress        | notify that playback is progressing with string mediaPosition   | invalid params for metrics mediaProgress        |
            | mediaProgress with string-progress        | mediaProgress        | notify that playback is progressing with string progress        | invalid params for metrics mediaProgress        |
            | mediaProgress with invalid-progress       | mediaProgress        | notify that playback is progressing with invalid progress       | invalid params for metrics mediaProgress        |
            | mediaProgress with decimal-progress       | mediaProgress        | notify that playback is progressing with decimal progress       | invalid params for metrics mediaProgress        |
            | mediaSeeking with numeric-entityId        | mediaSeeking         | notify that playback seek is initiated with numeric entityId    | invalid params for metrics mediaSeeking         |
            | mediaSeeking with decimal-target          | mediaSeeking         | notify that playback seek is initiated with decimal target      | invalid params for metrics mediaSeeking         |
            | mediaSeeking with invalid-target          | mediaSeeking         | notify that playback seek is initiated with invalid target      | invalid params for metrics mediaSeeking         |
            | mediaSeeking with string-target           | mediaSeeking         | notify that playback seek is initiated with string target       | invalid params for metrics mediaSeeking         |
            | mediaSeeked with numeric-entityId         | mediaSeeked          | notify that playback seek is completed with numeric entityId    | invalid params for metrics mediaSeeked          |
            | mediaSeeked with invalid-position         | mediaSeeked          | notify that playback seek is completed with invalid position    | invalid params for metrics mediaSeeked          |
            | mediaSeeked with string-position          | mediaSeeked          | notify that playback seek is completed with string position     | invalid params for metrics mediaSeeked          |
            | mediaSeeked with decimal-position         | mediaSeeked          | notify that playback seek is completed with decimal position    | invalid params for metrics mediaSeeked          |
            | mediaRateChange with numeric-entityId     | mediaRateChange      | notify that playback rate is changed with numeric entityId      | invalid params for metrics mediaRateChange      |
            | mediaRateChange with string-rate          | mediaRateChange      | notify that playback rate is changed with string rate           | invalid params for metrics mediaRateChange      |
            | mediaRenditionChange with numeric-bitRate | mediaRenditionChange | notify that playback rendition is Changed with numeric bitRate  | invalid params for metrics mediaRenditionChange |
            | mediaEnded with numeric-entityId          | mediaEnded           | notify that playback has stopped with numeric entityId          | invalid params for metrics mediaEnded           |
            | Metrics appInfo with numeric build        | appInfo              | Inform the platform about app with numeric build                | invalid params for metrics appInfo              |
            | Metrics appInfo with boolean build        | appInfo              | Inform the platform about app with boolean build                | invalid params for metrics appInfo              |