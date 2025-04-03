@releaseSanity @UserGrants @sdk @transport @coreSDK
Feature: UserGrants Module

    Background: Launch FCA for 'UserGrants'
        Given the environment has been set up for 'UserGrants Sanity' tests

    @2455566 @2592052 @UserGrantsPart1
    Scenario: RPPL-95 - UserGrants.grant Writes User Grant Status to ESS
        When 1st party app invokes the 'Firebolt' API to 'approve an app usage user grant'
        Then 'Firebolt' platform responds to '1st party app' with 'null for usergrants grant'
        When 1st party app invokes the 'Firebolt' API to 'request an app usage user grant'
        Then 'Firebolt' platform responds to '1st party app' with 'granted state of the stored grant'

    @2458392 @2592052 @UserGrantsPart2
    Scenario: RPPL-95 - UserGrants.deny Writes User Grant Status to ESS
      When 1st party app invokes the 'Firebolt' API to 'deny an app usage user grant'
      Then 'Firebolt' platform responds to '1st party app' with 'null for usergrants deny'
      When 1st party app invokes the 'Firebolt' API to 'request an app usage user grant'
      Then 'Firebolt' platform responds to '1st party app' with 'denied state of the stored grant'

    @3575239 @2592052 @UserGrantsPart1 @UserGrantsPart2
    Scenario: RPPL-663 - UserGrants.clear Clears Grant From ESS
      When 1st party app invokes the 'Firebolt' API to 'clear an app usage user grant'
      Then 'Firebolt' platform responds to '1st party app' with 'null for usergrants clear'
      When 1st party app invokes the 'Firebolt' API to 'request an app usage user grant'
      Then 'Firebolt' platform responds to '1st party app' with 'no stored grant'
