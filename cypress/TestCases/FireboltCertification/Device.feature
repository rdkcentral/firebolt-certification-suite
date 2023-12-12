Feature: Device

    @initialization
    Scenario: Launch FCA for 'Device'
        Given the environment has been set up for 'Device' tests
        And 3rd party 'certification' app is launched

    @Device @coreSDK @sdk @transport
    Scenario Outline:Device.<Method> Positive Scenario: <Scenario>
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Validation_Key>'
        Examples:
            | Scenario                    | API_Key                  | Validation_Key              | Method      |
            | Validate Device id          | fetch device id          | expected device id          | id          |
            | Validate Device distributor | fetch device distributor | expected device distributor | distributor |
            | Validate Device platform    | fetch device platform    | expected device platform    | platform    |
            | Validate Device uid         | fetch device uid         | expected device uid         | uid         |
            | Validate Device type        | fetch device type        | expected device type        | type        |
            | Validate Device model       | fetch device model       | expected device model       | model       |
            | Validate Device sku         | fetch device sku         | expected device sku         | sku         |
            | Validate Device make        | fetch device make        | expected device make        | make        |

    @Device @coreSDK @sdk @transport
    Scenario: Device.name - Positive Scenario: Validate device name change
        When '3rd party app' registers for the 'device onNameChanged' event using the 'Firebolt' API
        And 1st party app invokes the 'Firebolt' API to 'set device name to living hall'
        And '3rd party app' invokes the 'Firebolt' API to 'get device name'
        Then 'Firebolt' platform responds with 'living hall for device name'
        Then 'Firebolt' platform responds with 'living hall for device name event'
