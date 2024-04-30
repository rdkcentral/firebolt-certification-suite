Feature: Temp

  Scenario: 1st party app glue
    Given 1st party app invokes the 'Firebolt' API to 'fetch device id'
    Then 'Firebolt' platform responds to '1st party app' with 'expected device id'