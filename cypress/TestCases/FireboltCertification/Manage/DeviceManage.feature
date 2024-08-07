@Device @DeviceManage @manageSDK
Feature: Device_Manage

    Background: Launch FCA for 'Device'
        Given the environment has been set up for 'Device' tests
        And 3rd party 'certification' app is launched

    @sdk @transport
    Scenario: Device.name - Positive Scenario: set device name - Bedroom
        Given we test the 'DEVICE_NAME' getters and setters 'setName' to 'Bedroom'
        When '1st party app' registers for the 'Firebolt' event
        And 1st party app invokes the 'Firebolt' API to set 'setName' to 'Bedroom'
        Then 'Firebolt' platform responds to '1st party app' set API
        When '1st party app' invokes the 'Firebolt' get API
        Then 'Firebolt' platform responds to '1st party app' get API
        And 'Firebolt' platform triggers '1st party app' event

    @sdk @transport @notSupported
    Scenario Outline: Device.provision - Positive Scenario: <Scenario>
        Given we test the 'DEVICE_NAME' getters and setters 'provision' to '<Value>'
        When 1st party app invokes the 'Firebolt' API to set 'provision' to '<Value>'
        And 'Firebolt' platform responds to '1st party app' set API

            Examples:
            | Scenario                                 | Value                                                                    |
            | set device provision with default params | "accountId": "1234","deviceId": "1234"                                   |
            | set device provision with distributor id | "accountId": "1234","deviceId": "1234","distributorId": "global_partner" |

    @sdk @transport @notSupported
    Scenario: Device.provision - Positive Scenario: default params including device.id and account.id
        When 1st party app invokes the 'Firebolt' API to 'provision device with default values'
        And '3rd party app' invokes the 'Firebolt' API to 'get device id'
        And '3rd party app' invokes the 'Firebolt' API to 'get account id'
        Then 'Firebolt' platform responds with 'expected provision device id'
        Then 'Firebolt' platform responds with 'expected provision account id'
        Then 'Firebolt' platform responds with 'default value for device provision'

    @sdk @transport @notSupported
    Scenario: Device.provision - Positive Scenario: with distributor id including device.id account.id and device.distributor
        When '3rd party app' invokes the 'Firebolt' API to 'fetch device distributor'
        And 1st party app invokes the 'Firebolt' API to 'provision device with distributor id'
        And '3rd party app' invokes the 'Firebolt' API to 'get device id'
        And '3rd party app' invokes the 'Firebolt' API to 'get account id'
        Then 'Firebolt' platform responds with 'expected provision device id'
        Then 'Firebolt' platform responds with 'expected provision account id'
        Then 'Firebolt' platform responds with 'distributor id for device provision'
        Then 'Firebolt' platform responds with 'default value for device provision'

    @sdk @transport
    Scenario Outline: Device.name - Negative Scenario: <Scenario> expecting error
        Given we test the 'DEVICE_NAME' getters and setters 'setName' to '<Value>'
        When 1st party app invokes the 'Firebolt' API to set 'setName' to invalid '<Value>'
        And 'Firebolt' platform responds to '1st party app' set API with 'INVALID_TYPE_PARAMS'

        Examples:
            | Scenario                     | Value |
            | set device name with integer | 123   |
            | set device name with boolean | true  |

    @sdk @transport
    Scenario Outline: Device.provision - Negative Scenario: <Scenario> expecting error
        Given we test the 'DEVICE_NAME' getters and setters 'provision' to '<Value>'
        When 1st party app invokes the 'Firebolt' API to set 'provision' to invalid '<Value>'
        And 'Firebolt' platform responds to '1st party app' set API with 'INVALID_TYPE_PARAMS'

        Examples:
            | Scenario                               | Value                      |
            | set deviceProvision with integer       | 123                        |
            | set deviceProvision with boolean       | true                       |
            | set deviceProvision without deviceId   | "accountId": "12345678910" |
            | set deviceProvision with emptyParams   | {}                         |
            | set deviceProvision without account id | "deviceId": "1234"         |