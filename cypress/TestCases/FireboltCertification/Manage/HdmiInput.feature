Feature: HdmiInput_Manage

   Background: Initialize 'HdmiInput'
      Given the environment has been set up for 'Account' tests
      And 3rd party 'certification' app is launched

   @HdmiInput @manageSDK @sdk @transport
   Scenario: HDMIInput.ports - Positive Scenario: Validate HDMIInput ports
      When 1st party app invokes the 'Firebolt' API to 'get hdmi input ports list'
      Then 'Firebolt' platform responds to '1st party app' with 'expected hdmi input ports'

   @HdmiInput @manageSDK @sdk @transport
   Scenario Outline: HDMIInput.port - Positive Scenario: <Scenario>
      When 1st party app invokes the 'Firebolt' API to '<Key>'
      Then 'Firebolt' platform responds to '1st party app' with 'expected hdmi input port'

      Examples:
         | Scenario                        | Key                                  |
         | Validate HDMIInput port - Hdmi1 | get hdmiinput port with portId HDMI1 |
         | Validate HDMIInput port - Hdmi2 | get hdmiinput port with portId HDMI2 |

   @HdmiInput @manageSDK @sdk @transport
   Scenario Outline: HDMIInput.port - Positive Scenario: <Scenario>
      When 1st party app invokes the 'Firebolt' API to '<Key>'
      When 1st party app invokes the 'Firebolt' API to 'get hdmiinput port with portId HDMI1'
      Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key>'

      Examples:
         | Scenario                                                | Key                                      | Validation_Key                           |
         | Validate HDMIInput port autoLowLatencyModeCapable true  | set autoLowLatencyModeCapable with true  | true for autoLowLatencyModeCapable port  |
         | Validate HDMIInput port autoLowLatencyModeCapable false | set autoLowLatencyModeCapable with false | false for autoLowLatencyModeCapable port |
         | Validate HDMIInput port edidVersion 1.4                 | set edidVersion to 1.4                   | 1.4 for edidVersion port                 |
         | Validate HDMIInput port edidVersion 2.0                 | set edidVersion to 2.0                   | 2.0 for edidVersion port                 |
         | Validate HDMIInput port edidVersion unknown             | set edidVersion to unknown               | 2.0 for edidVersion port                 |

   @HdmiInput @manageSDK @sdk @transport
   Scenario Outline: HDMIInput.ports - Positive Scenario: <Scenario>
      When 1st party app invokes the 'Firebolt' API to '<Key>'
      When 1st party app invokes the 'Firebolt' API to 'get hdmi input ports list'
      Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key>'

      Examples:
         | Scenario                                                 | Key                                      | Validation_Key                            |
         | Validate HDMIInput ports edidVersion 1.4                 | set autoLowLatencyModeCapable with true  | true for autoLowLatencyModeCapable ports  |
         | Validate HDMIInput ports edidVersion 2.0                 | set autoLowLatencyModeCapable with false | false for autoLowLatencyModeCapable ports |
         | Validate HDMIInput ports edidVersion unknown             | set edidVersion to 1.4                   | 1.4 for edidVersion ports                 |
         | Validate HDMIInput ports autoLowLatencyModeCapable true  | set edidVersion to 2.0                   | 2.0 for edidVersion ports                 |
         | Validate HDMIInput ports autoLowLatencyModeCapable false | set edidVersion to unknown               | 2.0 for edidVersion ports                 |

   ## If edidVersion is 1.4, then autoLowLatencyModeCapable and autoLowLatencyModeSignalled must be false
   @HdmiInput @manageSDK @sdk @transport
   Scenario: HDMIInput.ports - Positive Scenario: Validate HDMIInput ports with edidVersion 1.4
      When 1st party app invokes the 'Firebolt' API to 'set edidVersion to 1.4'
      When 1st party app invokes the 'Firebolt' API to 'get hdmi input ports list'
      Then 'Firebolt' platform responds to '1st party app' with 'false for autoLowLatencyModeCapable ports'
      Then 'Firebolt' platform responds to '1st party app' with 'false for autoLowLatencyModeSignalled ports'

   @HdmiInput @manageSDK @sdk @transport
   Scenario: HDMIInput.open - Positive Scenario: Validate HDMIInput open
      When 1st party app invokes the 'Firebolt' API to 'open HDMI1 port'
      Then 'Firebolt' platform responds to '1st party app' with 'null for hdmi input open'

   @HdmiInput @manageSDK @sdk @transport
   Scenario: HDMIInput.close - Positive Scenario: Validate HDMIInput close
      When 1st party app invokes the 'Firebolt' API to 'close HDMI port'
      Then 'Firebolt' platform responds to '1st party app' with 'null for hdmi input close'

   @HdmiInput @manageSDK @sdk @transport
   Scenario Outline:  HdmiInput.<Method> - Positive Scenario: <Scenario>
      When 1st party app registers for the '<Event_Registration_Key>' event using the 'Firebolt' API
      When 1st party app invokes the 'Firebolt' API to '<Key>'
      When 1st party app invokes the 'Firebolt' API to '<Get_API_Key>'
      Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key>'
      And 'Firebolt' platform triggers to '1st party app' event '<Event_Validation_Key>'

      Examples:
         | Scenario                            | Key                                            | Validation_Key                                 | Event_Registration_Key                       | Get_API_Key                   | Event_Validation_Key                         |
         | set AutoLowLatencyModeCapable-true  | set autoLowLatencyModeCapable true with HDMI1  | true for autoLowLatencyModeCapable HDMI1 port  | hdmiInput onAutoLowLatencyModeCapableChanged | get autoLowLatencyModeCapable | true for onAutoLowLatencyModeCapableChanged  |
         | set AutoLowLatencyModeCapable-false | set autoLowLatencyModeCapable false with HDMI1 | false for autoLowLatencyModeCapable HDMI1 port | hdmiInput onAutoLowLatencyModeCapableChanged | get autoLowLatencyModeCapable | false for onAutoLowLatencyModeCapableChanged |
         | set EdidVersion-1.4                 | set edidVersion to 1.4                         | 1.4 for edidVersion HDMI1 port                 | hdmiInput onEdidVersionChanged               | get edidVersion               | 1.4 for onEdidVersionChanged                 |
         | set EdidVersion-2.0                 | set edidVersion to 2.0                         | 2.0 for edidVersion HDMI1 port                 | hdmiInput onEdidVersionChanged               | get edidVersion               | 2.0 for onEdidVersionChanged                 |
         | set EdidVersion-unknown             | set edidVersion to unknown                     | 2.0 for edidVersion HDMI1 port                 | hdmiInput onEdidVersionChanged               | get edidVersion               | 2.0 for onEdidVersionChanged                 |
         | set LowLatencyMode-true             | set lowLatencyMode with true                   | true for lowLatencyMode                        | hdmiInput onLowLatencyModeChanged            | get lowLatencyMode            | true for onLowLatencyModeChanged             |
         | set LowLatencyMode-false            | set lowLatencyMode with false                  | false for lowLatencyMode                       | hdmiInput onLowLatencyModeChanged            | get lowLatencyMode            | false for onLowLatencyModeChanged            |

   @HdmiInput @manageSDK @sdk @transport
   Scenario Outline: HDMIInput.port - Negative Scenario: <Scenario>
      When 1st party app invokes the 'Firebolt' API to '<Key>'
      Then 'Firebolt' platform responds to '1st party app' with 'Invalid parameters for hdmiInput port'

      Examples:
         | Scenario                                 | Key                               |
         | Validate HDMIInput port - integer        | set hdmiInput with integer        |
         | Validate HDMIInput port - boolean        | set hdmiInput with boolean        |
         | Validate HDMIInput port - invalid string | set hdmiInput with invalid string |

   @HdmiInput @manageSDK @sdk @transport
   Scenario Outline: HDMIInput.ports - Negative Scenario: <Scenario>
      When 1st party app invokes the 'Firebolt' API to '<Key>'
      Then 'Firebolt' platform responds to '1st party app' with 'Invalid parameters for hdmiInput ports'

      Examples:
         | Scenario                                                 | Key                                                |
         | Validate HDMIInput ports with integer edidVersion        | set hdmiInput port with integer edidVersion        |
         | Validate HDMIInput ports with boolean edidVersion        | set hdmiInput port with boolean edidVersion        |
         | Validate HDMIInput ports with invalid string edidVersion | set hdmiInput port with invalid string edidVersion |