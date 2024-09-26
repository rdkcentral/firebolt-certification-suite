@SecondScreen @coreSDK
Feature: SecondScreen

   Background: Launch FCA for 'SecondScreen'
      Given the environment has been set up for 'SecondScreen' tests
      And 3rd party 'certification' app is launched

   @sdk @transport
   Scenario Outline: SecondScreen.<Method> - Positive Scenario: <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_key>'
      Then 'Firebolt' platform responds with '<Validation_key>'      


      Examples:
         | Scenario                                    | Method    | API_key                                  | Validation_key                  |
         | Validate passing device with empty array    | device    | get secondscreen device with empty array | expected secondscreen device    |
         | Validate passing device with string         | device    | get secondscreen device with string      | expected secondscreen device    |
         | Validate passing protocols with empty array | protocols | get secondscreen protocols               | expected secondscreen protocols |

   @sdk @transport
   Scenario Outline: SecondScreen.device - Negative Scenario: <Scenario> expecting error
      When '3rd party app' invokes the 'Firebolt' API to '<API_key>'
      Then 'Firebolt' platform responds with '<Validation_key>'

      Examples:
         | Scenario                           | API_key                              | Validation_key                             |
         | Validate passing device as boolean | get secondscreen device with boolean | invalid parameters for secondscreen device |
         | Validate passing device as integer | get secondscreen device with integer | invalid parameters for secondscreen device |

   @sdk @transport
   Scenario: SecondScreen.FriendlyName - Positive Scenario: Validate Set friendlyName
      Given we test the 'SECONDSCREEN_FRIENDLYNAME' getters and setters 'name' to 'Living Room'
      And '3rd party app' registers for the 'Firebolt' event
      And '3rd party app' invokes the 'Firebolt' get API
      When 1st party app invokes the 'Firebolt' API to set value
      Then 'Firebolt' platform responds to '1st party app' set API
      When '3rd party app' invokes the 'Firebolt' get API
      Then 'Firebolt' platform responds to '3rd party app' get API
      And 'Firebolt' platform triggers '3rd party app' event

   @regression @sdk @requiresPlatformImplementation
   Scenario: SecondScreen.onFriendlyNameChanged - Positive Scenario: Validating event clearing listeners
      Given '3rd party app' registers for the 'secondscreen onFriendlyNameChanged' event using the 'Firebolt' API
      And 3rd party stops listening to the event 'secondscreen onFriendlyNameChanged event'
      When 1st party app invokes the 'Firebolt' API to 'set friendlyName to guest room'
      Then 'Firebolt' platform responds to '1st party app' for 'set friendlyName to guest room'
      And 'Firebolt' platform does not trigger event for 'onFriendlyNameChanged'

   @regression @sdk @requiresPlatformImplementation @notSupported
   Scenario Outline: SecondScreen.<EventName> - Positive Scenario: Validating event name in response
      When '3rd party app' registers for the '<RegisteredEvent>' event using the 'Firebolt' API
      And User triggers event with value as '<EventParams>'
      Then 'Firebolt' platform triggers event '<Event_Validation_Key>'

      Examples:
         | EventName       | RegisteredEvent              | Event_Validation_Key               | EventParams           |
         | onLaunchRequest | secondscreen onLaunchRequest | secondscreen onLaunchRequest event | onLaunchRequest event |
         | onLaunchRequest | secondscreen onLaunchRequest | secondscreen onLaunchRequest event | onLaunchRequest event |
         | onCloseRequest  | secondscreen onCloseRequest  | secondscreen onCloseRequest event  | onCloseRequest event  |
         | onCloseRequest  | secondscreen onCloseRequest  | secondscreen onCloseRequest event  | onCloseRequest event  |

   @regression @sdk @requiresPlatformImplementation @notSupported
   Scenario Outline: SecondScreen.<Event_Name> - Positive Scenario: Validating event Clearing listeners
      When '3rd party app' registers for the '<Registered_Event>' event using the 'Firebolt' API
      And 3rd party stops listening to the event '<Clear_Event_Name>'
      And User triggers event with value as '<Event_Params>'
      Then 'Firebolt' platform does not trigger event for '<Event_Validation_Key>'
      Examples:
         | Event_Name      | Registered_Event             | Clear_Event_Name                         | Event_Validation_Key                        | Event_Params          |
         | onLaunchRequest | secondscreen onLaunchRequest | secondscreen onLaunchRequest clear event | null for secondscreen onLaunchRequest event | onLaunchRequest event |
         | onCloseRequest  | secondscreen onCloseRequest  | secondscreen onCloseRequest clear event  | null for secondscreen onCloseRequest event  | onCloseRequest event  |
