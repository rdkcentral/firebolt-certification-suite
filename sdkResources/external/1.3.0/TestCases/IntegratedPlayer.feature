@IntegratedPlayer
Feature: IntegratedPlayer

    @initialization
    Scenario: Launch FCA for 'IntegratedPlayer'
        Given the environment has been set up for 'IntegratedPlayer' tests
        Then 3rd party 'player' app is launched
        And Test runner waits for 10 'seconds'
        And 'player' transitions to state 'inactive'


    # Create player instance, load, play, set API values. Get the values being set and validate each API. Finally stop and destroy player instance
    @sdk @sanity
    Scenario: Positive Scenario : Create and validate player APIs
        When 1st party app invokes the 'Firebolt' API to 'create player instance'
        Then 'Firebolt' platform responds to '1st party app' with 'player instance'
        When 1st party app invokes the 'Firebolt' API to 'load content in player'
        Then 'Firebolt' platform responds to '1st party app' with 'expected value when content is loaded'
        When 1st party app invokes the 'Firebolt' API to 'start playing the content'
        Then 'Firebolt' platform responds to '1st party app' with 'expected value when content is played'
        When 1st party app invokes the 'Firebolt' API to 'select the given audio track'
        Then 'Firebolt' platform responds to '1st party app' with 'expected value when audio track is selected'
        When 1st party app invokes the 'Firebolt' API to 'get the supported audio track'
        Then 'Firebolt' platform responds to '1st party app' with 'expected value of audio track'
        When 1st party app invokes the 'Firebolt' API to 'select the given captions track'
        Then 'Firebolt' platform responds to '1st party app' with 'expected value when captions track is selected'
        When 1st party app invokes the 'Firebolt' API to 'get the supported captions track'
        Then 'Firebolt' platform responds to '1st party app' with 'expected value of captions track'
        When 1st party app invokes the 'Firebolt' API to 'stop playing the content that was last loaded'
        Then 'Firebolt' platform responds to '1st party app' with 'player stopped'
        When 1st party app invokes the 'Firebolt' API to 'destroy the player given by the id'
        Then 'Firebolt' platform responds to '1st party app' with 'player destroyed'


    # Create player instance, load, play, set API values. Validate status and provideStatus triggers onStatus event with set values
    @sdk @sanity
    Scenario: Positive Scenario : Get status of player instance with provideStatus and validate onStatus event
        When 1st party app invokes the 'Firebolt' API to 'create player instance'
        Then 'Firebolt' platform responds to '1st party app' with 'player instance'
        When 1st party app registers for the 'player onStatus' event using the 'Firebolt' API
        When 1st party app invokes the 'Firebolt' API to 'load content in player'
        Then 'Firebolt' platform responds to '1st party app' with 'expected value when content is loaded'
        When 1st party app invokes the 'Firebolt' API to 'start playing the content'
        Then 'Firebolt' platform responds to '1st party app' with 'expected value when content is played'
        When 1st party app invokes the 'Firebolt' API to 'set position of player in seconds for the media'
        Then 'Firebolt' platform responds to '1st party app' with 'expected value of position'
        When 1st party app invokes the 'Firebolt' API to 'set speed of player'
        Then 'Firebolt' platform responds to '1st party app' with 'expected value of speed'
        When 1st party app invokes the 'Firebolt' API to 'get latest status of player'
        Then 'Firebolt' platform responds to '1st party app' with 'latest status of player'
        When 'player' invokes the 'Firebolt' API to 'invoke provide status'
        And 'Firebolt' platform triggers to '1st party app' with 'expected value for latest status of player'

    # @sdk
    # Scenario Outline: Negative Scenario : <Scenario> and expect error
    #     When 1st party app invokes the 'Firebolt' API to '<Key>'
    #     Then 'Firebolt' platform responds to '1st party app' with '<Response>'
    # Examples:
    #     | Scenario                                   | Key                                     | Response                                       |
    #     | Load player with invalid uri               | load player with invalid uri            | custom error for invalid uri                   |
    #     | Set position of player out of range        | set position of player out of range     | custom error for position out of range         |
    #     | Set position with position as string       | set position with position as string    | custom error when position cannot be set       |
    #     | Set audio track with trackId as boolean    | set audio track with boolean trackId    | custom error when audio track cannot be set    |
    #     | Set audio track with trackId as integer    | set audio track with integer trackId    | custom error when audio track cannot be set    |
    #     | Set captions track with trackId as boolean | Set captions track with boolean trackId | custom error when captions track cannot be set |
    #     | Set captions track with trackId as integer | Set captions track with integer trackId | custom error when captions track cannot be set |
    #     | Set speed with speed as string             | set speed with speed as string          | custom error when speed cannot be set          |
    #     | load player with request as string         | load player with request as string      | custom unspecified error                       |
    #     | Set speed with speed as zero               | set speed with speed as zero            | custom error for no media                      |

    # Validate provideStatus API with valid params and validate response
    @sdk
    Scenario Outline: Positive Scenario : Validate '<Scenario>'
        When 'player' invokes the 'Firebolt' API to '<Key>'
        And 'Firebolt' platform triggers to '1st party app' with '<Event_Content>'

        Examples:
        | Scenario                                            | Key                                                       | Event_Content                                               |
        | provide status state idle                           | provide status with state as idle                         | value of player onstatus state idle                         |
        | provide status state pending                        | provide status with state as pending                      | value of player onstatus state pending                      |
        | provide status state blocked                        | provide status with state as blocked                      | value of player onstatus state blocked                      |
        | provide status state failed                         | provide status with state as failed                       | value of player onstatus state failed                       |
        | provide status blocked reason - no network          | provide status with blocked reason as no network          | value of player onstatus blocked reason no network          |
        | provide status blocked reason - content not found   | provide status with blocked reason as content not found   | value of player onstatus blocked reason content not found   |
        | provide status blocked reason - drm error           | provide status with blocked reason as drm error           | value of player onstatus blocked reason drm error           |
        | provide status blocked reason - not entitled        | provide status with blocked reason as not entitled        | value of player onstatus blocked reason not entitled        |
        | provide status blocked reason - geo blocked         | provide status with blocked reason as geo blocked         | value of player onstatus blocked reason geo blocked         |
        | provide status blocked reason - channel not scanned | provide status with blocked reason as channel not scanned | value of player onstatus blocked reason channel not scanned |
        | provide status blocked reason - no signal           | provide status with blocked reason as no signal           | value of player onstatus blocked reason no signal           |
        | provide status blocked reason - technical fault     | provide status with blocked reason as technical fault     | value of player onstatus blocked reason technical fault     |
        | provide status blocked reason - channel off air     | provide status with blocked reason as channel off air     | value of player onstatus blocked reason channel off air     |
        | provide status blocked reason - player failure      | provide status with blocked reason as player failure      | value of player onstatus blocked reason player failure      |


        # Call IntegratedPlayer APIs with valid params and validate response

        # @sdk
        # Scenario Outline: Positive Scenario : Validate player API '<Scenario>'
        #     When 1st party app invokes the 'Firebolt' API to '<Key>'
        #     Then 'Firebolt' platform responds to '1st party app' with '<Response>'
        # Examples:
        #     | Scenario            | Key                                             | Response                                       |
        #     | load                | load content in player                          | expected value when content is loaded          |
        #     | play                | start playing the content                       | value for player play                          |
        #     | Get status          | get player status                               | value for player status                        |
        #     | Set audio track     | select the given audio track                    | expected value when audio track is selected    |
        #     | Get audio tracks    | get the supported audio track                   | expected value of audio track                  |
        #     | Set captions track  | select the given captions track                 | expected value when captions track is selected |
        #     | Get captions tracks | get the supported captions track                | expected value of captions track               |
        #     | Seek to position    | set position of player in seconds for the media | expected value of position                     |
        #     | Set speed           | set speed of player                             | expected value of speed                        |
        #     | Provide status      | get latest status of player                     | latest status of player                        |
        #     | Stop                | stop playing the content that was last loaded   | player stopped                                 |
        #     | Destroy             | destroy the player given by the id              | player destroyed                               |
    # Load API validation
    @sdk @sanity
    Scenario Outline: Positive Scenario : Validate player API '<Scenario>' for player instance
        When 1st party app invokes the 'Firebolt' API to 'create player instance'
        Then 'Firebolt' platform responds to '1st party app' with 'player instance'
        When 1st party app invokes the 'Firebolt' API to '<Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Response>'
        When 1st party app invokes the 'Firebolt' API to 'stop playing the content that was last loaded'
        Then 'Firebolt' platform responds to '1st party app' with 'player stopped'
        When 1st party app invokes the 'Firebolt' API to 'destroy the player given by the id'
        Then 'Firebolt' platform responds to '1st party app' with 'player destroyed'
    Examples:
        | Scenario                        | Key                                           | Response                              |
        | load                            | load content in player                        | expected value when content is loaded |
        | load player with autoplay true  | load content in player with autoplay as true  | expected value when content is loaded |
        | load player with autoplay false | load content in player with autoplay as false | expected value when content is loaded |
        | load player with metadata       | load content in player with metadata          | expected value when content is loaded |
        | load player with config         | load content in player with config            | expected value when content is loaded |

    # Call integratedPlayer APIs before creating player instance and expect error
    # @sdk
    # Scenario Outline: Negative Scenario : <Scenario> and expect error
    #     When 1st party app invokes the 'Firebolt' API to '<Key>'
    #     Then 'Firebolt' platform responds to '1st party app' with '<Response>'
    # Examples:
    #     | Scenario                                                               | Key                                                                    | Response                          |
    #     | Start playing the content before player creation                       | start playing the content before player creation                       | custom error for player not found |
    #     | Get player status before player creation                               | get player status before player creation                               | custom error for player not found |
    #     | Select the given audio track before player creation                    | select the given audio track before player creation                    | custom error for player not found |
    #     | Select the given captions track before player creation                 | select the given captions track before player creation                 | custom error for player not found |
    #     | Get the supported captions track before player creation                | get the supported captions track before player creation                | custom error for player not found |
    #     | Set position of player in seconds for the media before player creation | set position of player in seconds for the media before player creation | custom error for player not found |
    #     | Set speed of player before player creation                             | set speed of player before player creation                             | custom error for player not found |
    #     | Stop playing the content that was last loaded before player creation   | stop playing the content that was last loaded before player creation   | custom error for player not found |
    #     | Destroy the player given by the id before player creation              | destroy the player given by the id before player creation              | custom error for player not found |

    # Call integratedPlayer API without registering for provider and validate error
    # @sdk @notSupported
    # Scenario: Negative Scenario : Call player API without registering for '<Scenario>' provider
    #     Given the environment has been set up for 'IntegratedPlayerProvider' tests
    #     Then 3rd party 'player' app is launched
    #     And Test runner waits for 10 'seconds'
    #     And 'player' transitions to state 'inactive'
    #     When 1st party app invokes the 'Firebolt' API to 'create player instance'
    #     Then 'Firebolt' platform responds to '1st party app' with 'player instance not available'

    # Call integratedPlayer API but platform timeout without sending response
    # @sdk @notSupported
    # Scenario: Negative Scenario : Call player API but platform timeout without sending response
    #     Given the environment has been set up for 'IntegratedPlayerProvider' tests
    #     Then 3rd party 'player' app is launched
    #     And Test runner waits for 10 'seconds'
    #     And 'player' transitions to state 'inactive'
    #     When 1st party app invokes the 'Firebolt' API to 'create player but platform does not send back response'
    #     Then 'Firebolt' platform responds to '1st party app' with 'player instance not available'
