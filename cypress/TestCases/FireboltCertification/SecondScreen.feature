Feature: Secondscreen

   Background: Launch FCA for 'Secondscreen'
      Given the environment has been set up for 'Secondscreen' tests
      And 3rd party 'certification' app is launched

   @Secondscreen @coreSDK @sdk @transport
   Scenario Outline: Secondscreen.<Method> - Positive Scenario: <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_key>'
      Then 'Firebolt' platform responds with '<Validation_key>'

      Examples:
         | Scenario                                    | API_key                                  | Validation_key                  | Method    |
         | Validate passing device with empty array    | get secondscreen device with empty array | expected secondscreen device    | device    |
         | Validate passing device with string         | get secondscreen device with string      | expected secondscreen device    | device    |
         | Validate passing protocols with empty array | get secondscreen protocols               | expected secondscreen protocols | protocols |

   @Secondscreen @coreSDK @sdk @transport
   Scenario Outline: Secondscreen.device - Negative Scenario: <Scenario> expecting error
      When '3rd party app' invokes the 'Firebolt' API to '<API_key>'
      Then 'Firebolt' platform responds with '<Validation_key>'

      Examples:
         | Scenario                           | API_key                              | Validation_key                             |
         | Validate passing device as boolean | get secondscreen device with boolean | invalid parameters for secondscreen device |
         | Validate passing device as integer | get secondscreen device with integer | invalid parameters for secondscreen device |

   @Secondscreen @coreSDK @sdk @transport
   Scenario: Secondscreen.FriendlyName - Positive Scenario: Validate Set friendlyName
      Given '3rd party app' registers for the 'secondscreen onFriendlyNameChanged' event using the 'Firebolt' API
      When '3rd party app' invokes the 'Firebolt' API to 'get secondscreen friendlyName'
      And 1st party app invokes the 'Firebolt' API to 'set friendlyName to guest room'
      And '3rd party app' invokes the 'Firebolt' API to 'get secondscreen friendlyName'
      Then 'Firebolt' platform responds with 'guest room for secondscreen friendlyName'
      And 'Firebolt' platform triggers event 'onFriendlyNameChanged for secondscreen with guest room'

   @Secondscreen @coreSDK @regression @sdk
   Scenario: Secondscreen.onFriendlyNameChanged - Positive Scenario: Validating event clearing listeners
      Given '3rd party app' registers for the 'secondscreen onFriendlyNameChanged' event using the 'Firebolt' API
      And I clear 'secondscreen onFriendlyNameChanged event' listeners
      And 1st party app invokes the 'Firebolt' API to 'set friendlyName to guest room'
      Then 'Firebolt' platform responds to '1st party app' with 'null for device setName'
      And 'Firebolt' platform does not trigger event for 'onFriendlyNameChanged'