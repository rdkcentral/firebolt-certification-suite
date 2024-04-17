Feature: Firebolt Certification Manage-SDK validation

  @mfos @sanity @ManageSDK @Suite @sdk @transport
  Scenario: Setup environment for sanity
    Given the environment has been set up for 'Firebolt Sanity' tests

  @mfos
  Scenario: Launch FCA for MFOS
    And 3rd party 'certification' app is launched

  @mfos @sanity @ManageSDK @Suite @sdk @transport
  Scenario: Firebolt Certification Manage-SDK validation
    Then User starts 'firebolt certification' test using below datatable
      | paramType | variableName | value           |
      | INPUT     | action       | MANAGE          |
      | CONFIG    | appId        | firstPartyAppId |