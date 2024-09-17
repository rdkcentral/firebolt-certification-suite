@Wifi @WifiManage @manageSDK
Feature: Wifi_Manage

    Background: Launch FCA for 'Wifi'
        Given the environment has been set up for 'Wifi' tests
        And 3rd party 'certification' app is launched

    @sdk @transport
    Scenario Outline: Wifi.scan - Positive Scenario: <Scenario>
        Given we test the 'WIFI' getters and setters 'scan' to '<Value>'
        When 1st party app invokes the 'Firebolt' API to set value

        Examples:
            | Scenario                                        | Value        |
            | Scan available wifi networks without timeout    | emptyObject  |
            | Scan available wifi networks with 20sec timeout | scan_timeout |

    @sdk @transport
    Scenario Outline: Wifi.<Method> - Negative Scenario: <Scenario> and expecting error
        Given we test the 'WIFI' getters and setters '<Method>' to '<Value>'
        When 1st party app invokes the 'Firebolt' API to set invalid value
        Then 'Firebolt' platform responds to '1st party app' set API with 'INVALID_TYPE_PARAMS'

        Examples:
            | Scenario                                        | Method  | API_Key              |
            | Scan available wifi networks boolean param      | scan    | scan_with_boolean    |
            | Connect the device to wifi boolean ssid         | connect | connect_with_integer |
            | Connect the device using wps with boolean value | wps     | connect_with_boolean |