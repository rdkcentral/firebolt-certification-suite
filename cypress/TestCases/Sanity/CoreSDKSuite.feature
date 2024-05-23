Feature: Firebolt Certification Core-SDK validation

  @sanity @coreSDK @Suite @sdk @transport
  Scenario: Firebolt Certification Core-SDK validation
    Given the environment has been set up for 'Firebolt Sanity' tests
    And 3rd party 'certification' app is launched
    Then User starts 'firebolt certification' test using below datatable
      | paramType | variableName | value |
     
