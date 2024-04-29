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
         | Scenario                             | Key                                            |
         | Validate HDMIInput port - Hdmi1      | get hdmiinput port with portId HDMI1           |
         | Validate HDMIInput port - Hdmi2      | get hdmiinput port with portId HDMI2           |

   @HdmiInput @manageSDK @sdk @transport
   Scenario Outline: HDMIInput.port - Positive Scenario: <Scenario>
      When 1st party app invokes the 'Firebolt' API to '<Key>'
      Then 'Firebolt' platform responds to '1st party app' with 'expected hdmi input port'

      Examples:
         | Scenario                             | Key                                            |
         | Validate HDMIInput port - Hdmi1      | get hdmiinput port with portId HDMI1           |
         | Validate HDMIInput port - Hdmi2      | get hdmiinput port with portId HDMI2           |
    
