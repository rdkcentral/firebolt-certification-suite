@SecondScreen @coreSDK
Feature: SecondScreen

   Background: Launch FCA for 'SecondScreen'
      Given the environment has been set up for 'SecondScreen' tests
      And 3rd party 'certification' app is launched

   @sdk @transport @Sev1
   Scenario Outline: SecondScreen.<Method> - Validating API Method responses when <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_key>'
      Then 'Firebolt' platform responds with '<Validation_key>'      


      Examples:
         | Scenario                           | Method    | API_key                                  | Validation_key                  |
         | passing device with empty array    | device    | get secondscreen device with empty array | expected secondscreen device    |
         | passing device with string         | device    | get secondscreen device with string      | expected secondscreen device    |
         | passing protocols with empty array | protocols | get secondscreen protocols               | expected secondscreen protocols |

   @sdk @transport @Sev2
   Scenario Outline: SecondScreen.device - Validating API Error handling when <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_key>'
      Then 'Firebolt' platform responds with '<Validation_key>'

      Examples:
         | Scenario                           | API_key                              | Validation_key                             |
         | passing device as boolean | get secondscreen device with boolean | invalid parameters for secondscreen device |
         | passing device as integer | get secondscreen device with integer | invalid parameters for secondscreen device |

   @sdk @transport @Sev2
   Scenario: SecondScreen.FriendlyName - Validating API and Event response
      Given we test the 'SECONDSCREEN_FRIENDLYNAME' getters and setters 'name' to 'Living Room'
      And '3rd party app' registers for the 'Firebolt' event
      And '3rd party app' invokes the 'Firebolt' get API
      When 1st party app invokes the 'Firebolt' API to set 'name' to 'Living Room'
      Then 'Firebolt' platform responds to '1st party app' set API
      When '3rd party app' invokes the 'Firebolt' get API
      Then 'Firebolt' platform responds to '3rd party app' get API
      And 'Firebolt' platform triggers '3rd party app' event

   @regression @sdk @requiresPlatformImplementation @Sev2
   Scenario: SecondScreen.onFriendlyNameChanged - Clearing event listeners
      Given '3rd party app' registers for the 'secondscreen onFriendlyNameChanged' event using the 'Firebolt' API
      And 3rd party stops listening to the event 'secondscreen onFriendlyNameChanged event'
      When 1st party app invokes the 'Firebolt' API to 'set friendlyName to guest room'
      Then 'Firebolt' platform responds to '1st party app' for 'set friendlyName to guest room'
      And 'Firebolt' platform does not trigger event for 'onFriendlyNameChanged'

   @regression @sdk @requiresPlatformImplementation @notSupported @Sev1
   Scenario Outline: SecondScreen.<EventName> - Validating API and Event responses
      When '3rd party app' registers for the '<RegisteredEvent>' event using the 'Firebolt' API
      And User triggers event with value as '<EventParams>'
      Then 'Firebolt' platform triggers event '<Event_Validation_Key>'

      Examples:
         | EventName       | RegisteredEvent              | Event_Validation_Key               | EventParams           |
         | onLaunchRequest | secondscreen onLaunchRequest | secondscreen onLaunchRequest event | onLaunchRequest event |
         | onLaunchRequest | secondscreen onLaunchRequest | secondscreen onLaunchRequest event | onLaunchRequest event |
         | onCloseRequest  | secondscreen onCloseRequest  | secondscreen onCloseRequest event  | onCloseRequest event  |
         | onCloseRequest  | secondscreen onCloseRequest  | secondscreen onCloseRequest event  | onCloseRequest event  |

   @regression @sdk @requiresPlatformImplementation @notSupported @Sev1
   Scenario Outline: SecondScreen.<Event_Name> - Clearing event listeners
      When '3rd party app' registers for the '<Registered_Event>' event using the 'Firebolt' API
      And 3rd party stops listening to the event '<Clear_Event_Name>'
      And User triggers event with value as '<Event_Params>'
      Then 'Firebolt' platform does not trigger event for '<Event_Validation_Key>'
      Examples:
         | Event_Name      | Registered_Event             | Clear_Event_Name                         | Event_Validation_Key                        | Event_Params          |
         | onLaunchRequest | secondscreen onLaunchRequest | secondscreen onLaunchRequest clear event | null for secondscreen onLaunchRequest event | onLaunchRequest event |
         | onCloseRequest  | secondscreen onCloseRequest  | secondscreen onCloseRequest clear event  | null for secondscreen onCloseRequest event  | onCloseRequest event  |
