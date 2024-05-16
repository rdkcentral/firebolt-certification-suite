Feature: Firebolt Certification Manage-SDK validation

  @sanity @ManageSDK @Suite @sdk @transport
  Scenario: Firebolt Certification Manage-SDK validation
    Given the environment has been set up for 'Firebolt Sanity' tests
    And 3rd party 'certification' app is launched
    When User starts 'firebolt certification' test using below datatable
      | paramType | variableName | value           |
      | INPUT     | action       | MANAGE          |
