#test2
Feature: TVGuide XIPA Channel Playback
   Background:
    Given the environment has been set up for 'XIPA' tests
    And Test runner sends 'home' keypress
    And Test runner waits for 3 'seconds'
    When I navigate to '1025' XIPA channel
    Then 'com.xumo.ipa' will be in 'running' state
    And Test runner sends 'enter' keypress
    When Test runner waits for 5 'seconds'
    Then I should see 'Crime & Justice' as channel name
  Scenario: User surfs through channels and validates channel names
    Then I surf 'down' and see the following channel names:
      | Homes Under the Hammer   |
      | Great British Menu       |
      | Billiards                |
      | Bionic Woman             |  
      | NBC News Now             |
      | Artist of the Year       |
      | Emergency 24/7           |
      | Pick Monkey              |
      | 1003 Stories             |
      | Sky Sports Vault         |
      | 1001 Classics            |