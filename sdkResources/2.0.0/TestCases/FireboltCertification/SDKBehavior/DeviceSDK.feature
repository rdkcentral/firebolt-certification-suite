@Device @manageSDK 
Feature: Device_SDK

    Background: Launch FCA for 'Device'
        Given the environment has been set up for 'Device' tests
        And 3rd party 'certification' app is launched

    @sdk
    Scenario: Device.name - Positive Scenario: setName with undefined params
        When 1st party app invokes the 'Firebolt' API to 'set device name without parameters'
        Then 'Firebolt' platform responds to '1st party app' with 'expected device name'