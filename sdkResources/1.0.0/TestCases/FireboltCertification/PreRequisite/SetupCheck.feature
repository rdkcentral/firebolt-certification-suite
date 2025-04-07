Feature: SetupCheck

   @initialization @SetupCheck
   Scenario: Successful Environment Setup
      Given the environment has been set up for 'Setup Check' tests
      And Firebolt Certification Suite communicates successfully with the '1st party app'
      And Firebolt Certification Suite communicates successfully with the '3rd party app'
