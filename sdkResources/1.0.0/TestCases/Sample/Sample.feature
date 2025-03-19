Feature: Sample

  Scenario: 1st party app glue
    And 3rd party 'certification' app is launched
    Given 1st party app invokes the 'Firebolt' API to 'get device id'
    Given 1st party app registers for the 'CLOSED_CAPTIONS_SETTINGS' event using the 'Firebolt' API

  Scenario: 3rd party glue
    Given '3rd party app' invokes the 'Firebolt' API to 'get device id'
    And '3rd party app' registers for the 'Closed Captions Settings' event using the 'Firebolt' API
    And '3rd party app' registers for the 'CLOSED BACKGROUND COLOR CHANGED' event using the 'Firebolt' API
