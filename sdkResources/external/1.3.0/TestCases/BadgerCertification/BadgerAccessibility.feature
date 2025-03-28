Feature: Badger_Accessibility

  Background: Launch FCA for 'Accessibility'
    Given the environment has been set up for 'Accessibility' tests
    And 3rd party 'certification' app is launched

  @Accessibility @badger
  Scenario Outline: Accessibility.closedCaptionsSettings - Positive Scenario: <Scenario> with 'null' params
    # When '3rd party app' registers for the '<eventName>' event using the 'Badger' API
    And '3rd party app' invokes the 'Badger' API to 'get badger settings'
    And '3rd party app' invokes the 'Badger' API to '<getBadgerMethod>'
    And 1st party app invokes the 'Firebolt' API to '<getMethod>'
    And 1st party app invokes the 'Firebolt' API to '<setMethod>'
    And 1st party app invokes the 'Firebolt' API to '<getMethod>'
    Then 'Firebolt' platform responds to '1st party app' with '<getMethodResponse>'
    When '3rd party app' invokes the 'Badger' API to '<getBadgerMethod>'
    Then 'Badger' platform responds with '<getBadgerResponse>'
    # And 'Firebolt' platform triggers event '<eventResponse>'

    Examples:
        | Scenario                              | eventName                                       |         getMethod         | setMethod                 | getMethodResponse               | getBadgerMethod                 | getBadgerResponse                              | eventResponse                                           |
        | Validate voiceGuidance - False        | badger subscribeToSettings voiceguidance        | get voiceguidance enabled | disable voiceguidance     | false for voiceguidance enabled | get voiceguidance state         | false for badger voiceguidance settings        | subscribeToSettings for voiceguidance with false        |
        | Validate voiceGuidance - True         | badger subscribeToSettings voiceguidance        | get voiceguidance enabled | enable voiceguidance      | true for voiceguidance enabled  | get voiceguidance state         | true for badger voiceguidance settings         | subscribeToSettings for voiceguidance with true         |
        | Validate TextToSpeechEnabled2 - False | badger subscribeToSettings TextToSpeechEnabled2 | get voiceguidance enabled | disable voiceguidance     | false for voiceguidance enabled | get TextToSpeechEnabled2 state  | false for badger TextToSpeechEnabled2 settings | subscribeToSettings for TextToSpeechEnabled2 with false |
        | Validate TextToSpeechEnabled2 - True  | badger subscribeToSettings TextToSpeechEnabled2 | get voiceguidance enabled | enable voiceguidance      | true for voiceguidance enabled  | get TextToSpeechEnabled2 state  | true for badger TextToSpeechEnabled2 settings  | subscribeToSettings for TextToSpeechEnabled2 with true  |
        # | Validate voiceGuidance - True         | getMethod                 | voiceguidance.setEnabled  |
        # | Validate closedCaptioning - False     | getMethod                 | closedcaptions.setEnabled |
        # | Validate closedCaptioning - True      | getMethod                 | closedcaptions.setEnabled |
        # | Validate ShowClosedCapture - False    | getMethod                 | closedcaptions.setEnabled |
        # | Validate ShowClosedCapture - True     | getMethod                 | closedcaptions.setEnabled |
        # | Validate TextToSpeechEnabled2 - False | getMethod                 | voiceguidance.setEnabled  |
        # | Validate TextToSpeechEnabled2 - True  | getMethod                 | voiceguidance.setEnabled  |