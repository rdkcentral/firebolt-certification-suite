Feature: Device_Manage

    Background: Launch FCA for 'Device'
        Given the environment has been set up for 'Device' tests
        And 3rd party 'certification' app is launched

    @Device @manageSDK @sdk @transport
    Scenario: Device.name - Positive Scenario: set device name - Bedroom
        When 1st party app registers for the 'device onNameChanged' event using the 'Firebolt' API
        And 1st party app invokes the 'Firebolt' API to 'set device name to Bedroom'
        Then 'Firebolt' platform responds to '1st party app' with 'null for device setName'
        When 1st party app invokes the 'Firebolt' API to 'get manage device name'
        Then 'Firebolt' platform responds to '1st party app' with 'Bedroom for device name'
        And 'Firebolt' platform triggers to '1st party app' event 'onNameChanged for device with Bedroom'
        And 'Firebolt' platform responds to '1st party app' with 'null for device setname'

    @Device @manageSDK @sdk @transport @notSupported
    Scenario Outline: Device.provision - Positive Scenario: <Scenario>
        When 1st party app invokes the 'Firebolt' API to '<Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<MethodContent>'

    Examples:
            | Scenario                                 | Key                                  | MethodContent                       |
            | set device provision with default params | provision device with default values | default values for device provision |
            | set device provision with distributor id | provision device with distributor id | distributor id for device provision |

    @Device @manageSDK @sdk @transport @notSupported
    Scenario: Device.provision - Positive Scenario: default params including device.id and account.id
        When 1st party app invokes the 'Firebolt' API to 'provision device with default values'
        And '3rd party app' invokes the 'Firebolt' API to 'get device id'
        And '3rd party app' invokes the 'Firebolt' API to 'get account id'
        Then 'Firebolt' platform responds with 'expected provision device id'
        Then 'Firebolt' platform responds with 'expected provision account id'
        Then 'Firebolt' platform responds with 'default value for device provision'

    @Device @manageSDK @sdk @transport @notSupported
    Scenario: Device.provision - Positive Scenario: with distributor id including device.id account.id and device.distributor
        When '3rd party app' invokes the 'Firebolt' API to 'fetch device distributor'
        And 1st party app invokes the 'Firebolt' API to 'provision device with distributor id'
        And '3rd party app' invokes the 'Firebolt' API to 'get device id'
        And '3rd party app' invokes the 'Firebolt' API to 'get account id'
        Then 'Firebolt' platform responds with 'expected provision device id'
        Then 'Firebolt' platform responds with 'expected provision account id'
        Then 'Firebolt' platform responds with 'distributor id for device provision'
        Then 'Firebolt' platform responds with 'default value for device provision'

    @Device @manageSDK @sdk @transport
    Scenario Outline: Device.name - Negative Scenario: <Scenario> expecting error
        When 1st party app invokes the 'Firebolt' API to '<Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'invalid parameters for device'

        Examples:
            | Scenario                     | Key                          |
            | set device name with integer | set device name with integer |
            | set device name with boolean | set device name with boolean |

    @Device @manageSDK @sdk @transport
    Scenario Outline: Device.provision - Negative Scenario: <Scenario> expecting error
        When 1st party app invokes the 'Firebolt' API to '<Key>'
        Then 'Firebolt' platform responds to '1st party app' with 'invalid parameters for device provision'

        Examples:
            | Scenario                               | Key                                |
            | set deviceProvision with integer       | provision device with integer      |
            | set deviceProvision with boolean       | provision device with boolean      |
            | set deviceProvision without deviceId   | provision device without deviceid  |
            | set deviceProvision with emptyParams   | provision device with empty params |
            | set deviceProvision without account id | provision device without accountid |


