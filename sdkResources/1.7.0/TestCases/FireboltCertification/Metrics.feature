@Metrics @coreSDK
Feature: Metrics

    Background: Launch FCA for 'Metrics'
        Given the environment has been set up for 'Metrics' tests
        And 3rd party 'certification' app is launched

    @sdk @transport @Sev1
    Scenario Outline: Metrics.<Method> - Validating API Method success
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Validation_key>'

        Examples:
            | Method       | API_Key                         | Validation_key                   |
            | startContent | notify that content has started | true for startContent in metrics |
            | stopContent  | notify that content has stopped | true for stopContent in metrics  |

    @sdk @transport @Sev2
    Scenario Outline: Metrics.<Method> - Validating API Error handling when <Scenario>
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Validation_key>'
        Examples:
            | Scenario                               | Method               | API_Key                                                        | Validation_key                                  |
            | page has an emptyParam                 | page                 | notify that page has navigated with empty parameter            | invalid params for metrics page                 |
            | action has an emptyParam               | action               | notify about action with empty parameter                       | invalid params for metrics action               |
            | action has a type-null                 | action               | notify about action with type null                             | invalid params for metrics action               |
            | action has a type-256                  | action               | notify about action with type maxlength 256                    | invalid params for metrics action               |
            | action has a dfrnt-category            | action               | notify about action with different category                    | invalid params for metrics action               |
            | error caused by emptyParam             | error                | notify that error has occured with empty parameter             | invalid params for metrics error                |
            | mediaLoadStart has an emptyParam       | mediaLoadStart       | infer load time with empty parameter                           | invalid params for metrics mediaLoadStart       |
            | mediaPlay has an emptyParam            | mediaPlay            | start playback with empty parameter                            | invalid params for metrics mediaPlay            |
            | mediaPlaying has an emptyParam         | mediaPlaying         | notify that playback has started with empty parameter          | invalid params for metrics mediaPlaying         |
            | mediaPause has an emptyParam           | mediaPause           | notify that playback has paused with empty parameter           | invalid params for metrics mediaPause           |
            | mediaWaiting has an emptyParam         | mediaWaiting         | notify that playback has halted with empty parameter           | invalid params for metrics mediaWaiting         |
            | mediaProgress has an emptyParam        | mediaProgress        | notify that playback is progressing with empty parameter       | invalid params for metrics mediaProgress        |
            | mediaSeeking has an emptyParam         | mediaSeeking         | notify that playback seek is initiated with empty parameter    | invalid params for metrics mediaSeeking         |
            | mediaSeeked has an emptyParam          | mediaSeeked          | notify that playback seek is completed with empty parameter    | invalid params for metrics mediaSeeked          |
            | mediaRateChange has an emptyParam      | mediaRateChange      | notify that playback rate is changed with empty parameter      | invalid params for metrics mediaRateChange      |
            | mediaRenditionChange has an emptyParam | mediaRenditionChange | notify that playback rendition is Changed with empty parameter | invalid params for metrics mediaRenditionChange |

    @sdk @transport @Sev2
    Scenario Outline: Metrics.<Method> - Validating API Method response for <Scenario>
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Validation_key>'

        Examples:
            | Scenario                                              | Method               | API_Key                                                              | Validation_key                           |
            | startContent with entityId                            | startContent         | notify that content has started with entityId                        | true for startContent in metrics         |
            | startContent with child age policy                    | startContent         | notify that content has started with child age policy                | true for startContent in metrics         |
            | startContent with teen age policy                     | startContent         | notify that content has started with teen age policy                 | true for startContent in metrics         |
            | startContent with adult age policy                    | startContent         | notify that content has started with adult age policy                | true for startContent in metrics         |
            | stopContent with entityId                             | stopContent          | notify that content has stopped with entityId                        | true for stopContent in metrics          |
            | stopContent with child age policy                     | stopContent          | notify that content has stopped with child age policy                | true for stopContent in metrics          |
            | stopContent with teen age policy                      | stopContent          | notify that content has stopped with teen age policy                 | true for stopContent in metrics          |
            | stopContent with adult age policy                     | stopContent          | notify that content has stopped with adult age policy                | true for stopContent in metrics          |
            | page with pageId                                      | page                 | notify that page has navigated with pageId                           | true for page in metrics                 |
            | page with child age policy                            | page                 | notify that page has navigated with child age policy                 | true for page in metrics                 |
            | page with teen age policy                             | page                 | notify that page has navigated with teen age policy                  | true for page in metrics                 |
            | page with adult age policy                            | page                 | notify that page has navigated with adult age policy                 | true for page in metrics                 |
            | action with userMetrics                               | action               | notify about action with userMetrics                                 | true for action in metrics               |
            | action with appMetrics                                | action               | notify about action with appMetrics                                  | true for action in metrics               |
            | action with parametersMetrics                         | action               | notify about action with parametersMetrics                           | true for action in metrics               |
            | action with child age policy                          | action               | notify about action with child age policy                            | true for action in metrics               |
            | action with teen age policy                           | action               | notify about action with teen age policy                             | true for action in metrics               |
            | action with adult age policy                          | action               | notify about action with adult age policy                            | true for action in metrics               |
            | error with mediaStalled                               | error                | notify that error has occured with mediaStalled                      | true for error in metrics                |
            | error with child age policy                           | error                | notify that error has occured with child age policy                  | true for error in metrics                |
            | error with teen age policy                            | error                | notify that error has occured with teen age policy                   | true for error in metrics                |
            | error with adult age policy                           | error                | notify that error has occured with adult age policy                  | true for error in metrics                |
            | mediaLoadStart with entityId                          | mediaLoadStart       | infer load time with entityId                                        | true for mediaLoadStart in metrics       |
            | mediaLoadStart with child age policy                  | mediaLoadStart       | infer load time with child age policy                                | true for mediaLoadStart in metrics       |
            | mediaLoadStart with teen age policy                   | mediaLoadStart       | infer load time with teen age policy                                 | true for mediaLoadStart in metrics       |
            | mediaLoadStart with adult age policy                  | mediaLoadStart       | infer load time with adult age policy                                | true for mediaLoadStart in metrics       |
            | mediaPlay with entityId                               | mediaPlay            | start playback with entityId                                         | true for mediaPlay in metrics            |
            | mediaPlay with child age policy                       | mediaPlay            | start playback with child age policy                                 | true for mediaPlay in metrics            |
            | mediaPlay with teen age policy                        | mediaPlay            | start playback with teen age policy                                  | true for mediaPlay in metrics            |
            | mediaPlay with adult age policy                       | mediaPlay            | start playback with adult age policy                                 | true for mediaPlay in metrics            |
            | mediaPlaying with entityId                            | mediaPlaying         | notify that playback has started with entityId                       | true for mediaPlaying in metrics         |
            | mediaPlaying with child age policy                    | mediaPlaying         | notify that playback has started with child age policy               | true for mediaPlaying in metrics         |
            | mediaPlaying with teen age policy                     | mediaPlaying         | notify that playback has started with teen age policy                | true for mediaPlaying in metrics         |
            | mediaPlaying with adult age policy                    | mediaPlaying         | notify that playback has started with adult age policy               | true for mediaPlaying in metrics         |
            | mediaPause with entityId                              | mediaPause           | notify that playback has paused with entityId                        | true for mediaPause in metrics           |
            | mediaPause with child age policy                      | mediaPause           | notify that playback has paused with child age policy                | true for mediaPause in metrics           |
            | mediaPause with teen age policy                       | mediaPause           | notify that playback has paused with teen age policy                 | true for mediaPause in metrics           |
            | mediaPause with adult age policy                      | mediaPause           | notify that playback has paused with adult age policy                | true for mediaPause in metrics           |
            | mediaWaiting with entityId                            | mediaWaiting         | notify that playback has halted with entityId                        | true for mediaWaiting in metrics         |
            | mediaWaiting with child age policy                    | mediaWaiting         | notify that playback has halted with child age policy                | true for mediaWaiting in metrics         |
            | mediaWaiting with teen age policy                     | mediaWaiting         | notify that playback has halted with teen age policy                 | true for mediaWaiting in metrics         |
            | mediaWaiting with adult age policy                    | mediaWaiting         | notify that playback has halted with adult age policy                | true for mediaWaiting in metrics         |
            | mediaProgress with mediaPosition                      | mediaProgress        | notify that playback is progressing with mediaPosition               | true for mediaProgress in metrics        |
            | mediaProgress with child age policy                   | mediaProgress        | notify that playback is progressing with child age policy            | true for mediaProgress in metrics        |
            | mediaProgress with teen age policy                    | mediaProgress        | notify that playback is progressing with teen age policy             | true for mediaProgress in metrics        |
            | mediaProgress with adult age policy                   | mediaProgress        | notify that playback is progressing with adult age policy            | true for mediaProgress in metrics        |
            | mediaSeeking with mediaPosition                       | mediaSeeking         | notify that playback seek is initiated with mediaPosition            | true for mediaSeeking in metrics         |
            | mediaSeeking with child age policy                    | mediaSeeking         | notify that playback seek is initiated with child age policy         | true for mediaSeeking in metrics         |
            | mediaSeeking with teen age policy                     | mediaSeeking         | notify that playback seek is initiated with teen age policy          | true for mediaSeeking in metrics         |
            | mediaSeeking with adult age policy                    | mediaSeeking         | notify that playback seek is initiated with adult age policy         | true for mediaSeeking in metrics         |
            | mediaSeeked with mediaPosition                        | mediaSeeked          | notify that playback seek is completed with mediaPosition            | true for mediaSeeked in metrics          |
            | mediaSeeked with child age policy                     | mediaSeeked          | notify that playback seek is completed with child age policy         | true for mediaSeeked in metrics          |
            | mediaSeeked with teen age policy                      | mediaSeeked          | notify that playback seek is completed with teen age policy          | true for mediaSeeked in metrics          |
            | mediaSeeked with adult age policy                     | mediaSeeked          | notify that playback seek is completed with adult age policy         | true for mediaSeeked in metrics          |
            | mediaRateChange with playbackRate                     | mediaRateChange      | notify that playback rate is changed with playbackRate               | true for mediaRateChange in metrics      |
            | mediaRateChange with child age policy                 | mediaRateChange      | notify that playback rate is changed with child age policy           | true for mediaRateChange in metrics      |
            | mediaRateChange with teen age policy                  | mediaRateChange      | notify that playback rate is changed with teen age policy            | true for mediaRateChange in metrics      |
            | mediaRateChange with adult age policy                 | mediaRateChange      | notify that playback rate is changed with adult age policy           | true for mediaRateChange in metrics      |
            | mediaRenditionChange with bitrateProfile              | mediaRenditionChange | notify that playback rendition is changed with bitrateProfile        | true for mediaRenditionChange in metrics |
            | mediaRenditionChange with child age policy            | mediaRenditionChange | notify that playback rendition is changed with child age policy      | true for mediaRenditionChange in metrics |
            | mediaRenditionChange with teen age policy             | mediaRenditionChange | notify that playback rendition is changed with teen age policy       | true for mediaRenditionChange in metrics |
            | mediaRenditionChange with adult age policy            | mediaRenditionChange | notify that playback rendition is changed with adult age policy      | true for mediaRenditionChange in metrics |
            | mediaEnded with entityId                              | mediaEnded           | notify that playback has stopped with entityId                       | true for mediaEnded in metrics           |
            | mediaEnded with child age policy                      | mediaEnded           | notify that playback has stopped with child age policy               | true for mediaEnded in metrics           |
            | mediaEnded with teen age policy                       | mediaEnded           | notify that playback has stopped with teen age policy                | true for mediaEnded in metrics           |
            | mediaEnded with adult age policy                      | mediaEnded           | notify that playback has stopped with adult age policy               | true for mediaEnded in metrics           |
            | Metrics event with child age policy                   | event                | Inform the platform of event with child age policy                   | null for event in metrics                |
            | Metrics event with teen age policy                    | event                | Inform the platform of event with teen age policy                    | null for event in metrics                |
            | Metrics event with adult age policy                   | event                | Inform the platform of event with adult age policy                   | null for event in metrics                |
            | Metrics event with valid schema                       | event                | Inform the platform of event with valid schema and data              | null for event in metrics                |
            | action with parametersMetrics as string               | action               | notify about action with parametersMetrics as string                 | true for action in metrics               |
            | action with parametersMetrics as boolean              | action               | notify about action with parametersMetrics as boolean                | true for action in metrics               |
            | action with parametersMetrics as number               | action               | notify about action with parametersMetrics as number                 | true for action in metrics               |
            | action with parametersMetrics                         | action               | notify about action with parametersMetrics                           | true for action in metrics               |
            | error handling with mediaStalled parameter            | error                | notify that error has occured with mediaStalled parameter            | true for error in metrics                |
            | error handling with mediaStalled parameter as string  | error                | notify that error has occured with mediaStalled parameter as string  | true for error in metrics                |
            | error handling with mediaStalled parameter as boolean | error                | notify that error has occured with mediaStalled parameter as boolean | true for error in metrics                |
            | error handling with mediaStalled parameter as number  | error                | notify that error has occured with mediaStalled parameter as number  | true for error in metrics                |
            | Metrics appInfo                                       | appInfo              | Inform the platform about app build                                  | null for metrics appInfo                 |


    @sdk @transport @Sev2
    Scenario Outline: Metrics.<Method> - Validating API Error handling when given <Scenario>
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Validation_key>'

        Examples:
            | Scenario                                            | Method               | API_Key                                                           | Validation_key                                  |
            | startContent with numeric-entityId                  | startContent         | notify that content has started with numeric entityId             | invalid params for metrics startContent         |
            | startContent has invalid integer age policy         | startContent         | notify that content has started with integer age policy           | invalid params for metrics startContent         |
            | startContent has invalid boolean age policy         | startContent         | notify that content has started with boolean age policy           | invalid params for metrics startContent         |
            | stopContent with numeric-entityId                   | stopContent          | notify that content has stopped with numeric entityId             | invalid params for metrics stopContent          |
            | stopContent has invalid integer age policy          | stopContent          | notify that content has stopped with integer age policy           | invalid params for metrics stopContent          |
            | stopContent has invalid boolean age policy          | stopContent          | notify that content has stopped with boolean age policy           | invalid params for metrics stopContent          |
            | page with numeric-pageId                            | page                 | notify that page has navigated with numeric pageId                | invalid params for metrics page                 |
            | page has invalid integer age policy                 | page                 | notify that page has navigated with integer age policy            | invalid params for metrics page                 |
            | page has invalid boolean age policy                 | page                 | notify that page has navigated with boolean age policy            | invalid params for metrics page                 |
            | action with numeric-userMetrics                     | action               | notify about action with numeric userMetrics                      | invalid params for metrics action               |
            | action with numeric-appMetrics                      | action               | notify about action with numeric appMetrics                       | invalid params for metrics action               |
            | action with numeric-typeMetrics                     | action               | notify about action with numeric typeMetrics                      | invalid params for metrics action               |
            | action with numeric-paramMetrics                    | action               | notify about action with numeric paramMetrics                     | invalid params for metrics action               |
            | action with paramMetrics nested object              | action               | notify about action with paramMetrics for nested object           | invalid params for metrics action               |
            | action has invalid integer age policy               | action               | notify about action with integer age policy                       | invalid params for metrics action               |
            | action has invalid boolean age policy               | action               | notify about action with boolean age policy                       | invalid params for metrics action               |
            | error caused by numeric-type                        | error                | notify that error has occured with numeric type                   | invalid params for metrics error                |
            | error caused by string-type                         | error                | notify that error has occured with string type                    | invalid params for metrics error                |
            | error caused by numeric-code                        | error                | notify that error has occured with numeric code                   | invalid params for metrics error                |
            | error caused by numeric-description                 | error                | notify that error has occured with numeric description            | invalid params for metrics error                |
            | error caused by numeric-visible                     | error                | notify that error has occured with numeric visible                | invalid params for metrics error                |
            | error caused by numeric-parameters                  | error                | notify that error has occured with numeric parameters             | invalid params for metrics error                |
            | error has invalid integer age policy                | error                | notify that error has occured with integer age policy             | invalid params for metrics error                |
            | error has invalid boolean age policy                | error                | notify that error has occured with boolean age policy             | invalid params for metrics error                |
            | invalid parameter error for metrics error           | error                | notify that error has occured with parameters for nested object   | invalid params for metrics error                |
            | mediaLoadStart with numeric-entityId                | mediaLoadStart       | infer load time with numeric entityId                             | invalid params for metrics mediaLoadStart       |
            | mediaLoadStart has invalid integer age policy       | mediaLoadStart       | infer load time with integer age policy                           | invalid params for metrics mediaLoadStart       |
            | mediaLoadStart has invalid boolean age policy       | mediaLoadStart       | infer load time with boolean age policy                           | invalid params for metrics mediaLoadStart       |
            | mediaPlay with numeric-entityId                     | mediaPlay            | start playback with numeric entityId                              | invalid params for metrics mediaPlay            |
            | mediaPlay has invalid integer age policy            | mediaPlay            | start playback with integer age policy                            | invalid params for metrics mediaPlay            |
            | mediaPlay has invalid boolean age policy            | mediaPlay            | start playback with boolean age policy                            | invalid params for metrics mediaPlay            |
            | mediaPlaying with numeric-entityId                  | mediaPlaying         | notify that playback has started with numeric entityId            | invalid params for metrics mediaPlaying         |
            | mediaPlaying has invalid integer age policy         | mediaPlaying         | notify that playback has started with integer age policy          | invalid params for metrics mediaPlaying         |
            | mediaPlaying has invalid boolean age policy         | mediaPlaying         | notify that playback has started with boolean age policy          | invalid params for metrics mediaPlaying         |
            | mediaPause with numeric-entityId                    | mediaPause           | notify that playback has paused with numeric entityId             | invalid params for metrics mediaPause           |
            | mediaPause has invalid integer age policy           | mediaPause           | notify that playback has paused with integer age policy           | invalid params for metrics mediaPause           |
            | mediaPause has invalid boolean age policy           | mediaPause           | notify that playback has paused with boolean age policy           | invalid params for metrics mediaPause           |
            | mediaWaiting with numeric-entityId                  | mediaWaiting         | notify that playback has halted with numeric entityId             | invalid params for metrics mediaWaiting         |
            | mediaWaiting has invalid integer age policy         | mediaWaiting         | notify that playback has halted with integer age policy           | invalid params for metrics mediaWaiting         |
            | mediaWaiting has invalid boolean age policy         | mediaWaiting         | notify that playback has halted with boolean age policy           | invalid params for metrics mediaWaiting         |
            | mediaProgress with string-mediaPosition             | mediaProgress        | notify that playback is progressing with string mediaPosition     | invalid params for metrics mediaProgress        |
            | mediaProgress with string-progress                  | mediaProgress        | notify that playback is progressing with string progress          | invalid params for metrics mediaProgress        |
            | mediaProgress with invalid-progress                 | mediaProgress        | notify that playback is progressing with invalid progress         | invalid params for metrics mediaProgress        |
            | mediaProgress with decimal-progress                 | mediaProgress        | notify that playback is progressing with decimal progress         | invalid params for metrics mediaProgress        |
            | mediaProgress has invalid integer age policy        | mediaProgress        | notify that playback is progressing with integer age policy       | invalid params for metrics mediaProgress        |
            | mediaProgress has invalid boolean age policy        | mediaProgress        | notify that playback is progressing with boolean age policy       | invalid params for metrics mediaProgress        |
            | mediaSeeking with numeric-entityId                  | mediaSeeking         | notify that playback seek is initiated with numeric entityId      | invalid params for metrics mediaSeeking         |
            | mediaSeeking with decimal-target                    | mediaSeeking         | notify that playback seek is initiated with decimal target        | invalid params for metrics mediaSeeking         |
            | mediaSeeking with invalid-target                    | mediaSeeking         | notify that playback seek is initiated with invalid target        | invalid params for metrics mediaSeeking         |
            | mediaSeeking with string-target                     | mediaSeeking         | notify that playback seek is initiated with string target         | invalid params for metrics mediaSeeking         |
            | mediaSeeking has invalid integer age policy         | mediaSeeking         | notify that playback seek is initiated with integer age policy    | invalid params for metrics mediaSeeking         |
            | mediaSeeking has invalid boolean age policy         | mediaSeeking         | notify that playback seek is initiated with boolean age policy    | invalid params for metrics mediaSeeking         |
            | mediaSeeked with numeric-entityId                   | mediaSeeked          | notify that playback seek is completed with numeric entityId      | invalid params for metrics mediaSeeked          |
            | mediaSeeked with invalid-position                   | mediaSeeked          | notify that playback seek is completed with invalid position      | invalid params for metrics mediaSeeked          |
            | mediaSeeked with string-position                    | mediaSeeked          | notify that playback seek is completed with string position       | invalid params for metrics mediaSeeked          |
            | mediaSeeked with decimal-position                   | mediaSeeked          | notify that playback seek is completed with decimal position      | invalid params for metrics mediaSeeked          |
            | mediaSeeked has invalid integer age policy          | mediaSeeked          | notify that playback seek is completed with integer age policy    | invalid params for metrics mediaSeeked          |
            | mediaSeeked has invalid boolean age policy          | mediaSeeked          | notify that playback seek is completed with boolean age policy    | invalid params for metrics mediaSeeked          |
            | mediaRateChange with numeric-entityId               | mediaRateChange      | notify that playback rate is changed with numeric entityId        | invalid params for metrics mediaRateChange      |
            | mediaRateChange with string-rate                    | mediaRateChange      | notify that playback rate is changed with string rate             | invalid params for metrics mediaRateChange      |
            | mediaRateChange has invalid integer age policy      | mediaRateChange      | notify that playback rate is changed with integer age policy      | invalid params for metrics mediaRateChange      |
            | mediaRateChange has invalid boolean age policy      | mediaRateChange      | notify that playback rate is changed with boolean age policy      | invalid params for metrics mediaRateChange      |
            | mediaRenditionChange with numeric-bitRate           | mediaRenditionChange | notify that playback rendition is Changed with numeric bitRate    | invalid params for metrics mediaRenditionChange |
            | mediaRenditionChange has invalid integer age policy | mediaRenditionChange | notify that playback rendition is Changed with integer age policy | invalid params for metrics mediaRenditionChange |
            | mediaRenditionChange has invalid boolean age policy | mediaRenditionChange | notify that playback rendition is Changed with boolean age policy | invalid params for metrics mediaRenditionChange |
            | mediaEnded with numeric-entityId                    | mediaEnded           | notify that playback has stopped with numeric entityId            | invalid params for metrics mediaEnded           |
            | mediaEnded has invalid integer age policy           | mediaEnded           | notify that playback has stopped with integer age policy          | invalid params for metrics mediaEnded           |
            | mediaEnded has invalid boolean age policy           | mediaEnded           | notify that playback has stopped with boolean age policy          | invalid params for metrics mediaEnded           |
            | Metrics event with missing schema                   | event                | Inform the platform of event with missing schema                  | invalid params for metrics event                |
            | Metrics event with numeric schema                   | event                | Inform the platform of event with numeric schema                  | invalid params for metrics event                |
            | Metrics event with boolean schema                   | event                | Inform the platform of event with boolean schema                  | invalid params for metrics event                |
            | Metrics event with null schema                      | event                | Inform the platform of event with null schema                     | invalid params for metrics event                |
            | Metrics event with missing data                     | event                | Inform the platform of event with missing data                    | invalid params for metrics event                |
            | Metrics event with null data                        | event                | Inform the platform of event with null data                       | invalid params for metrics event                |
            | Metrics event with string data                      | event                | Inform the platform of event with string data                     | invalid params for metrics event                |
            | Metrics event with numeric data                     | event                | Inform the platform of event with numeric data                    | invalid params for metrics event                |
            | Metrics event with boolean data                     | event                | Inform the platform of event with boolean data                    | invalid params for metrics event                |
            | Metrics event has invalid integer age policy        | event                | Inform the platform of event with integer age policy              | invalid params for metrics event                |
            | Metrics event has invalid boolean age policy        | event                | Inform the platform of event with boolean age policy              | invalid params for metrics event                |
            | Metrics appInfo with numeric build                  | appInfo              | Inform the platform about app with numeric build                  | invalid params for metrics appInfo              |
            | Metrics appInfo with boolean build                  | appInfo              | Inform the platform about app with boolean build                  | invalid params for metrics appInfo              |


    @sdk @transport @Sev2
    Scenario Outline: Metrics.<Method> - Validating API Method response for <Scenario>
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Validation_key>'

        Examples:
            | Scenario                                              | Method               | API_Key                                                              | Validation_key                           |
            | startContent with custom age policy                   | startContent         | notify that content has started with custom age policy               | true for startContent in metrics         |