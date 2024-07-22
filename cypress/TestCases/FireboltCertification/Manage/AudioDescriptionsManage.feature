Feature: AudioDescriptions_Manage

   Background: Launch FCA for 'AudioDescriptions'
      Given the environment has been set up for 'AudioDescriptions' tests

   @AudioDescriptions @manageSDK @sdk @transport
   Scenario Outline: AudioDescriptions.enabled - Positive Scenario: <Scenario>
      Given we test the 'AUDIODESCRIPTIONS' getters and setters 'enabled' to '<Value>'
      When '1st party app' registers for the 'Firebolt' event
      And 1st party app invokes the 'Firebolt' API to set 'enabled' to '<Value>'
      Then 'Firebolt' platform responds to '1st party app' set API
      When '1st party app' invokes the 'Firebolt' get API
      Then 'Firebolt' platform responds to '1st party app' get API
      And 'Firebolt' platform triggers '1st party app' event

      Examples:
         | Scenario                  | Value |
         | Disable AudioDescriptions | false |
         | Enable AudioDescriptions  | true  |

   @AudioDescriptions @manageSDK @sdk @transport
   Scenario Outline: AudioDescriptions.enabled - Negative Scenario: <Scenario> expecting error
      Given we test the 'AUDIODESCRIPTIONS' getters and setters 'enabled' to '<Value>'
      When 1st party app invokes the 'Firebolt' API to set 'enabled' to invalid '<Value>'
      And 'Firebolt' platform responds to '1st party app' set API with 'INVALID_TYPE_PARAMS'

      Examples:
         | Scenario                      | Value |
         | Set audiodescriptions-test    | test  |
         | Set audiodescriptions-INTEGER | 123   |