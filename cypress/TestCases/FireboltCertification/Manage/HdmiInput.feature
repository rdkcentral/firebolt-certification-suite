@HdmiInput @manageSDK
Feature: HdmiInput_Manage

   Background: Initialize 'HdmiInput'
      Given the environment has been set up for 'hdmiInput' tests
      And 3rd party 'certification' app is launched

   @sdk @transport
   Scenario: HDMIInput.ports - Positive Scenario: Validate HDMIInput ports
      When 1st party app invokes the 'Firebolt' API to 'get hdmiinput ports list'
      Then 'Firebolt' platform responds to '1st party app' with 'expected hdmiinput ports'

   @sdk @transport
   Scenario Outline: HDMIInput.port - Positive Scenario: <Scenario>
      When 1st party app invokes the 'Firebolt' API to '<Key>'
      Then 'Firebolt' platform responds to '1st party app' with 'expected hdmiinput port'

      Examples:
         | Scenario                        | Key                                  |
         | Validate HDMIInput port - Hdmi1 | get hdmiinput port with portId HDMI1 |
         | Validate HDMIInput port - Hdmi2 | get hdmiinput port with portId HDMI2 |

   @sdk @transport
   Scenario Outline: HDMIInput.port - Positive Scenario: <Scenario>
      When 1st party app invokes the 'Firebolt' API to '<Key>'
      Then 'Firebolt' platform responds to '1st party app' for '<Key>'
      When 1st party app invokes the 'Firebolt' API to 'get hdmiinput port with portId HDMI1'
      Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key>'

      Examples:
         | Scenario                                                | Key                                      | Validation_Key                           |
         | Validate HDMIInput port autoLowLatencyModeCapable true  | set autoLowLatencyModeCapable with true  | true for autoLowLatencyModeCapable port  |
         | Validate HDMIInput port autoLowLatencyModeCapable false | set autoLowLatencyModeCapable with false | false for autoLowLatencyModeCapable port |
         | Validate HDMIInput port edidVersion 1.4                 | set edidVersion to 1.4                   | 1.4 for edidVersion port                 |
         | Validate HDMIInput port edidVersion 2.0                 | set edidVersion to 2.0                   | 2.0 for edidVersion port                 |
         | Validate HDMIInput port edidVersion unknown             | set edidVersion to unknown               | 2.0 for edidVersion port                 |

   @sdk @transport
   Scenario Outline: HDMIInput.ports - Positive Scenario: <Scenario>
      When 1st party app invokes the 'Firebolt' API to '<Key>'
      Then 'Firebolt' platform responds to '1st party app' for '<Key>'
      When 1st party app invokes the 'Firebolt' API to 'get hdmiinput ports list'
      Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key>'

      Examples:
         | Scenario                                                 | Key                                      | Validation_Key                            |
         | Validate HDMIInput ports autoLowLatencyModeCapable true  | set autoLowLatencyModeCapable with true  | true for autoLowLatencyModeCapable ports  |
         | Validate HDMIInput ports autoLowLatencyModeCapable false | set autoLowLatencyModeCapable with false | false for autoLowLatencyModeCapable ports |
         | Validate HDMIInput ports edidVersion 1.4                 | set edidVersion to 1.4                   | 1.4 for edidVersion ports                 |
         | Validate HDMIInput ports edidVersion 2.0                 | set edidVersion to 2.0                   | 2.0 for edidVersion ports                 |
         | Validate HDMIInput ports edidVersion unknown             | set edidVersion to unknown               | 2.0 for edidVersion ports                 |

   # If edidVersion is 1.4, then autoLowLatencyModeCapable and autoLowLatencyModeSignalled must be false
   @sdk @transport
   Scenario: HDMIInput.ports - Positive Scenario: Validate HDMIInput ports with edidVersion 1.4
      When 1st party app invokes the 'Firebolt' API to 'set edidVersion to 1.4'
      Then 'Firebolt' platform responds to '1st party app' for 'set edidVersion to 1.4'
      When 1st party app invokes the 'Firebolt' API to 'get hdmiinput ports list'
      Then 'Firebolt' platform responds to '1st party app' with 'false for autoLowLatencyModeCapable ports'
      Then 'Firebolt' platform responds to '1st party app' with 'false for autoLowLatencyModeSignalled ports'

   @sdk @transport
   Scenario: HDMIInput.open - Positive Scenario: Validate HDMIInput open
      When 1st party app invokes the 'Firebolt' API to 'open HDMI1 port'
      Then 'Firebolt' platform responds to '1st party app' with 'null for hdmiinput open'

   @sdk @transport
   Scenario: HDMIInput.close - Positive Scenario: Validate HDMIInput close
      When 1st party app invokes the 'Firebolt' API to 'close HDMI port'
      Then 'Firebolt' platform responds to '1st party app' with 'null for hdmiinput close'

   @sdk @transport
   Scenario Outline:  HdmiInput.<Method> - Positive Scenario: <Scenario>
      When 1st party app registers for the '<Event_Registration_Key>' event using the 'Firebolt' API
      And 1st party app invokes the 'Firebolt' API to '<Key>'
      And 1st party app invokes the 'Firebolt' API to '<Get_API_Key>'
      Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key>'
      And 'Firebolt' platform triggers to '1st party app' event '<Event_Validation_Key>'

      Examples:
         | Scenario                            | Key                                            | Validation_Key                                 | Event_Registration_Key                       | Get_API_Key                   | Event_Validation_Key                         | Method                    |
         | set AutoLowLatencyModeCapable-true  | set autoLowLatencyModeCapable true with HDMI1  | true for autoLowLatencyModeCapable HDMI1 port  | hdmiInput onAutoLowLatencyModeCapableChanged | get autoLowLatencyModeCapable | true for onAutoLowLatencyModeCapableChanged  | autoLowLatencyModeCapable |
         | set AutoLowLatencyModeCapable-false | set autoLowLatencyModeCapable false with HDMI1 | false for autoLowLatencyModeCapable HDMI1 port | hdmiInput onAutoLowLatencyModeCapableChanged | get autoLowLatencyModeCapable | false for onAutoLowLatencyModeCapableChanged | autoLowLatencyModeCapable |
         | set EdidVersion-1.4                 | set edidVersion to 1.4                         | 1.4 for edidVersion HDMI1 port                 | hdmiInput onEdidVersionChanged               | get edidVersion               | 1.4 for onEdidVersionChanged                 | edidVersion               |
         | set EdidVersion-2.0                 | set edidVersion to 2.0                         | 2.0 for edidVersion HDMI1 port                 | hdmiInput onEdidVersionChanged               | get edidVersion               | 2.0 for onEdidVersionChanged                 | edidVersion               |
         | set EdidVersion-unknown             | set edidVersion to unknown                     | 2.0 for edidVersion HDMI1 port                 | hdmiInput onEdidVersionChanged               | get edidVersion               | 2.0 for onEdidVersionChanged                 | edidVersion               |
         | set LowLatencyMode-true             | set lowLatencyMode with true                   | true for lowLatencyMode                        | hdmiInput onLowLatencyModeChanged            | get lowLatencyMode            | true for onLowLatencyModeChanged             | lowLatencyMode            |
         | set LowLatencyMode-false            | set lowLatencyMode with false                  | false for lowLatencyMode                       | hdmiInput onLowLatencyModeChanged            | get lowLatencyMode            | false for onLowLatencyModeChanged            | lowLatencyMode            |

   @sdk @transport
   Scenario Outline: HDMIInput.port - Negative Scenario: <Scenario>
      When 1st party app invokes the 'Firebolt' API to '<Key>'
      Then 'Firebolt' platform responds to '1st party app' with 'Invalid parameters for hdmiInput port'

      Examples:
         | Scenario                                 | Key                               |
         | Validate HDMIInput port - integer        | set hdmiInput with integer        |
         | Validate HDMIInput port - boolean        | set hdmiInput with boolean        |
         | Validate HDMIInput port - invalid string | set hdmiInput with invalid string |

   @sdk @transport
   Scenario Outline: HDMIInput.ports - Negative Scenario: <Scenario>
      When 1st party app invokes the 'Firebolt' API to '<Key>'
      Then 'Firebolt' platform responds to '1st party app' with 'Invalid parameters for hdmiInput edidVersion'

      Examples:
         | Scenario                                                 | Key                                                |
         | Validate HDMIInput ports with integer edidVersion        | set hdmiInput port with integer edidVersion        |
         | Validate HDMIInput ports with boolean edidVersion        | set hdmiInput port with boolean edidVersion        |
         | Validate HDMIInput ports with invalid string edidVersion | set hdmiInput port with invalid string edidVersion |

   @sdk @transport
   Scenario Outline: HDMIInput.<Method> - Negative Scenario: <Scenario>
      When 1st party app invokes the 'Firebolt' API to '<Key>'
      Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key>'

      Examples:
         | Scenario                                     | Key                                               | Validation_Key                                   | Method                    |
         | set AutoLowLatencyModeCapable-integer        | set autoLowLatencyModeCapable with integer        | Invalid parameters for autoLowLatencyModeCapable | autoLowLatencyModeCapable |
         | set AutoLowLatencyModeCapable-invalid string | set autoLowLatencyModeCapable with invalid string | Invalid parameters for autoLowLatencyModeCapable | autoLowLatencyModeCapable |
         | set EdidVersion-integer                      | set EdidVersion with integer                      | Invalid parameters for EdidVersion               | edidVersion               |
         | set EdidVersion-boolean                      | set EdidVersion with boolean                      | Invalid parameters for EdidVersion               | edidVersion               |
         | set LowLatencyMode-integer                   | set LowLatencyMode with integer                   | Invalid parameters for LowLatencyMode            | lowLatencyMode            |
         | set LowLatencyMode-string                    | set LowLatencyMode with string                    | Invalid parameters for LowLatencyMode            | lowLatencyMode            |
         | set AutoLowLatencyModeCapable-without port   | set autoLowLatencyModeCapable without port        | Invalid parameters for autoLowLatencyModeCapable | autoLowLatencyModeCapable |
         | set EdidVersion-without port                 | set EdidVersion without port                      | Invalid parameters for EdidVersion               | edidVersion               |
         | set AutoLowLatencyModeCapable-empty param    | set autoLowLatencyModeCapable with empty param    | Invalid parameters for autoLowLatencyModeCapable | autoLowLatencyModeCapable |
         | set EdidVersion-empty param                  | set EdidVersion with empty param                  | Invalid parameters for EdidVersion               | edidVersion               |
         | set LowLatencyMode-empty param               | set LowLatencyMode with empty param               | Invalid parameters for LowLatencyMode            | lowLatencyMode            |

   @sdk @transport
   Scenario Outline: HDMIInput.open - Negative Scenario: <Scenario>
      When 1st party app invokes the 'Firebolt' API to '<Key>'
      Then 'Firebolt' platform responds to '1st party app' with 'Invalid parameters for hdmiInput open'

      Examples:
         | Scenario                               | Key                                 |
         | Validate HDMIInput open - empty param  | set hdmiInput open with empty param |
         | Validate HDMIInput open - integer port | set hdmiInput open with integer     |
         | Validate HDMIInput open - boolean port | set hdmiInput open with boolean     |

   @sdk @transport
   Scenario: HDMIInput.ports - Negative Scenario: Validate HDMIInput ports with edidVersion 1.4 and autoLowLatencyModeCapable - true
      When 1st party app invokes the 'Firebolt' API to 'set edidVersion to 1.4'
      And 1st party app invokes the 'Firebolt' API to 'set autoLowLatencyModeCapable with true'
      And 1st party app invokes the 'Firebolt' API to 'get hdmiinput ports list with error'
      Then 'Firebolt' platform responds to '1st party app' with 'Invalid parameters for hdmiInput ports'

   @sdk @transport
   Scenario: HDMIInput.port - Negative Scenario: Validate HDMIInput port with edidVersion 1.4 and autoLowLatencyModeCapable - true
      When 1st party app invokes the 'Firebolt' API to 'set edidVersion to 1.4'
      And 1st party app invokes the 'Firebolt' API to 'set autoLowLatencyModeCapable with true'
      And 1st party app invokes the 'Firebolt' API to 'get hdmiinput port with error'
      Then 'Firebolt' platform responds to '1st party app' with 'Invalid parameters for hdmiInput port'

   # Event parameters are not added yet as they are not known.
   @sdk @notsupported
   Scenario Outline: HdmiInput.<Event> - Positive Scenario: Validate <Scenario>
      When 1st party app registers for the '<Event_Key>' event using the 'Firebolt' API
      And 1st party app invokes the 'Firebolt' API to 'get hdmiinput port with portId HDMI1'
      Then 'Firebolt' platform responds to '1st party app' with '<Method_content>'
      When User triggers event with value as '<Event_Params>'
      Then 'Firebolt' platform triggers event '<Event_Validation_Key>'

      Examples:
         | Scenario                                  | Event                             | Event_Key                                   | Method_content                                       | Event_Validation_Key                                        |
         | Hdmi1 - connected true                    | onConnectionChanged               | hdmiinput onConnectionChanged               | true for hdmiinput port connected                    | true for hdmiinput onConnectionChanged event                |
         | Hdmi1 - connected false                   | onConnectionChanged               | hdmiinput onConnectionChanged               | false for hdmiinput port connected                   | false for hdmiinput onConnectionChanged event               |
         | Hdmi1 - signal unknown                    | onSignalChanged                   | hdmiinput onSignalChanged                   | unknown for hdmiinput port signal                    | unknown for hdmiinput onSignalChanged event                 |
         | Hdmi1 - signal none                       | onSignalChanged                   | hdmiinput onSignalChanged                   | none for hdmiinput port signal                       | none for hdmiinput onSignalChanged event                    |
         | Hdmi1 - signal stable                     | onSignalChanged                   | hdmiinput onSignalChanged                   | stable for hdmiinput port signal                     | stable for hdmiinput onSignalChanged event                  |
         | Hdmi1 - signal unstable                   | onSignalChanged                   | hdmiinput onSignalChanged                   | unstable for hdmiinput port signal                   | unstable for hdmiinput onSignalChanged event                |
         | Hdmi1 - signal unsupported                | onSignalChanged                   | hdmiinput onSignalChanged                   | unsupported for hdmiinput port signal                | unsupported for hdmiinput onSignalChanged event             |
         | Hdmi1 - autoLowLatencyModeSignalled true  | onAutoLowLatencyModeSignalChanged | hdmiinput onAutoLowLatencyModeSignalChanged | true for hdmiinput port autoLowLatencyModeSignalled  | true for hdmiinput onAutoLowLatencyModeSignalChanged event  |
         | Hdmi1 - autoLowLatencyModeSignalled false | onAutoLowLatencyModeSignalChanged | hdmiinput onAutoLowLatencyModeSignalChanged | false for hdmiinput port autoLowLatencyModeSignalled | false for hdmiinput onAutoLowLatencyModeSignalChanged event |

   # Needs to confirm whether the event gets triggered. Event parameters are not added yet as they are not known.
   @sdk @notsupported
   Scenario Outline: HdmiInput.onConnectionChanged - Positive Scenario: Validate Hdmi1 - hdmiinput.open
      When 1st party app registers for the 'hdmiinput onConnectionChanged' event using the 'Firebolt' API
      And 1st party app invokes the 'Firebolt' API to 'open HDMI1 port'
      Then 'Firebolt' platform responds to '1st party app' with 'null for hdmi input open'
      When User triggers event with value as '<Event_Params>'
      Then 'Firebolt' platform triggers event 'true for hdmiinput onConnectionChanged event'

   # Needs to confirm whether the event gets triggered. Event parameters are not added yet as they are not known.
   @sdk @notsupported
   Scenario Outline: HdmiInput.onConnectionChanged - Positive Scenario: Validate Hdmi1 - hdmiinput.close
      When 1st party app registers for the 'hdmiinput onConnectionChanged' event using the 'Firebolt' API
      And 1st party app invokes the 'Firebolt' API to 'close HDMI port'
      Then 'Firebolt' platform responds to '1st party app' with 'null for hdmi input close'
      When User triggers event with value as '<Event_Params>'
      Then 'Firebolt' platform triggers event 'false for hdmiinput onConnectionChanged event'
