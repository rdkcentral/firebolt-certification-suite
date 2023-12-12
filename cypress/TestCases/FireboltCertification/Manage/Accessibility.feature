Feature: Accessibility

   @initialization
   Scenario: Launch FCA for 'Accessibility'
      Given the environment has been set up for 'Accessibility' tests

   @Accessibility @coreSDK @sdk @transport
   Scenario: Validate Closedcaptions.onEnabledChanged Event
      And 1st party app registers for the 'closedCaptions changed' event using the 'Firebolt' API
      And 1st party app invokes the 'Firebolt' API to 'set closedCaptions enabled'
      Then 'Firebolt' platform responds to '1st party app' with 'closedCaptions enabled event'