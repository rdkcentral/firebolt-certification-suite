Feature: AudioDescriptions_Manage

   Background: Launch FCA for 'AudioDescriptions'
      Given the environment has been set up for 'AudioDescriptions' tests
      And 3rd party 'certification' app is launched

   # Since the "refui" app validation is not designed, the event validation step is commented out.
   @AudioDescriptions @manageSDK @sdk @transport
   Scenario Outline: AudioDescriptions.enabled - Positive Scenario: <Scenario>
      When 1st party app registers for the 'audioDescriptions onEnabledChanged' event using the 'Firebolt' API
      And 1st party app invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds to '1st party app' for '<API_Key>'
      When 1st party app invokes the 'Firebolt' API to 'get audioDescriptions'
      Then 'Firebolt' platform responds to '1st party app' with '<Method_Validation_Key>'
      And 'Firebolt' platform triggers to '1st party app' event '<Event_Validation_Key>'

      Examples:
         | Scenario                  | API_Key                  | Method_Validation_Key          | Event_Validation_Key                                |
         | Enable AudioDescriptions  | enable audioDescription  | enabled for audioDescriptions  | onEnabledChanged for audiodescriptions with enable  |
         | Disable AudioDescriptions | disable audioDescription | disabled for audioDescriptions | onEnabledChanged for audiodescriptions with disable |

   @AudioDescriptions @manageSDK @sdk @transport
   Scenario Outline: AudioDescriptions.enabled - Negative Scenario: <Scenario> expecting error
      When 1st party app invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds to '1st party app' with 'invalid params for audiodescriptions setEnabled'

      Examples:
         | Scenario                      | API_Key                                        |
         | Set audiodescriptions-test    | enable audioDescription with test parameter    |
         | Set audiodescriptions-INTEGER | enable audioDescription with integer parameter |