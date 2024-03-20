Feature: Wifi_Manage

    @initialization
    Scenario: Launch FCA for 'Wifi'
        Given the environment has been set up for 'Wifi' tests
        And 3rd party 'certification' app is launched

    @Wifi @manageSDK @sdk @transport
    Scenario Outline: Wifi.scan - Positive Scenario: <Scenario>
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        
        Examples:
            | Scenario                                        | API_Key                           |
            | Scan available wifi networks without timeout    | scan wifi with empty params       |
            | Scan available wifi networks with 20sec timeout | scan wifi with 20 seconds timeout |

    @Wifi @manageSDK @sdk @transport
    Scenario Outline: Wifi.<Method> - Negative Scenario: <Scenario> and expecting error
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Error_Object>'
        
        Examples:
            | Scenario                                        | Method  | API_Key                   | Error_Object                            |
            | Scan available wifi networks boolean param      | scan    | scan wifi with boolean    | invalid boolean params for wifi scan    |
            | Connect the device to wifi boolean ssid         | connect | connect wifi with integer | invalid integer params for wifi connect |
            | Connect the device using wps with boolean value | wps     | connect wps with boolean  | invalid value params for wifi wps       |
