@Discovery @coreSDK
Feature: Discovery

   Background: Launch FCA for 'Discovery'
      Given the environment has been set up for 'Discovery' tests
      And 3rd party 'certification' app is launched

   @sdk @transport @Sev0
   Scenario Outline: Discovery.policy - Positive Scenario: <Scenario>
      When '3rd party app' registers for the 'discovery onPolicyChanged' event using the 'Firebolt' API
      And '3rd party app' invokes the 'Firebolt' API to 'get value of policy'
      And 1st party app invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds to '1st party app' for '<API_Key>'
      When '3rd party app' invokes the 'Firebolt' API to 'get value of policy'
      Then 'Firebolt' platform responds with '<Method_Content>'
      And 'Firebolt' platform triggers event '<Event_Content>'

      Examples:
         | Scenario                          | API_Key                           | Method_Content                                    | Event_Content                                                    |
         | enable Recommendations            | enable recommendations            | true for history based recommendations in policy  | onPolicyChanged for discovery enableRecommendations with true    |
         | disable Recommendations           | disable recommendations           | false for history based recommendations in policy | onPolicyChanged for discovery enableRecommendations with false   |
         | enable remember watched programs  | enable remember watched programs  | true for remember watched programs in policy      | onPolicyChanged for discovery rememberWatchedPrograms with true  |
         | disable remember watched programs | disable remember watched programs | false for remember watched programs in policy     | onPolicyChanged for discovery rememberWatchedPrograms with false |

   @sdk @transport @Sev1
   Scenario Outline: Discovery.watched - Positive Scenario: <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with 'true for watched content in discovery'

      Examples:
         | Scenario                                                   | API_Key                                                   |
         | With only EntityId                                         | notify watched content with only entityid                 |
         | With EntityId and Progress                                 | notify watched content with entityid progress             |
         | With EntityId, Progress & completed status                 | notify watched content with entityid progress status      |
         | With EntityId, Progress, completed Status & watchedon date | notify watched content with entityid progress status date |

   @sdk @transport
   Scenario Outline: Discovery.watchNext - Positive Scenario: <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with 'true for watchnext tile in discovery'

      @Sev1
      Examples:
         | Scenario                                                              | API_Key                                                         |
         | With title & identifiers with entityId                                | suggest watchnext tile with entityid                            |
         | With title & identifiers with entityID & assetID                      | suggest watchnext tile with entityid assetid                    |
         | With title & identifiers with entityID, assetID, sessionId & seriesId | suggest watchnext tile with entityid assetid sessionid seriesid |

      @Sev2
      Examples:
         | Scenario                                                                              | API_Key                                                                        |
         | With title & identifiers with entityID, assetID & sessionId                           | suggest watchnext tile with entityid assetid sessionid                         |
         | With title & identifiers with entityID, assetID, sessionId, seriesId & appContentData | suggest watchnext tile with entityid assetid sessionid seriesid appcontentdata |
         | With title, identifiers & expires                                                     | suggest watchnext tile with expires                                            |
         | With title, identfiers, expires & images                                              | suggest watchnext tile with expires images                                     |

   @sdk @transport @Sev0
   Scenario Outline: Discovery.entitlements - Positive Scenario: <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with 'true for entitlements in discovery'

      Examples:
         | Scenario                | API_Key                                     |
         | With valid params       | notify entitlements                         |
         | With only entitlementId | notify entitlements with entitlementid only |

   @sdk @transport @Sev2
   Scenario Outline: Discovery.watched - Negative Scenario: <Scenario> expecting error
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with 'invalid params for discovery watched'

      Examples:
         | Scenario                 | API_Key                                             |
         | Empty param              | notify watched content with empty parameter         |
         | Invalid EntityID number  | notify watched content with invalid entityid number |
         | Invalid progress         | notify watched content with invalid progress        |
         | Invalid progress string  | notify watched content with invalid progress string |
         | Invalid completed status | notify watched content with invalid completed       |
         | Invalid watched on       | notify watched content with invalid watchedon       |

   @sdk @transport @Sev2
   Scenario Outline: Discovery.watchNext - Negative Scenario: <Scenario> expecting error
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with 'invalid params for discovery watchnext'

      Examples:
         | Scenario                           | API_Key                                                        |
         | with only title                    | suggest watchnext tile with only title                         |
         | Invalid identifiers                | suggest watchnext tile with invalid identifiers                |
         | Invalid expires                    | suggest watchnext tile with invalid expires                    |
         | Invalid expires-integer            | suggest watchnext tile with invalid expires integer            |
         | Invalid images                     | suggest watchnext tile with invalid images                     |
         | Invalid image-integer              | suggest watchnext tile with invalid image integer              |
         | Invalid identifiers EntityId       | suggest watchnext tile with invalid identifiers entityid       |
         | Invalid identifiers assetID        | suggest watchnext tile with invalid identifiers assetid        |
         | Invalid identifiers sessionId      | suggest watchnext tile with invalid identifiers sessionid      |
         | Invalid identifiers seriesId       | suggest watchnext tile with invalid identifiers seriesid       |
         | Invalid identifiers appContentData | suggest watchnext tile with invalid identifiers appcontentdata |

   @sdk @transport @Sev2
   Scenario Outline: Discovery.entitlements - Negative Scenario: <Scenario> expecting error
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with 'invalid params for discovery entitlements'

      Examples:
         | Scenario                              | API_Key                                 |
         | Invalid entitlements - no id          | notify entitlements with no id          |
         | Invalid entitlements - integer params | notify entitlements with integer params |

   @sdk @transport @Sev2
   Scenario Outline: Discovery.signIn - Negative Scenario: <Scenario> expecting error
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with 'invalid params for discovery signIn'

      Examples:
         | Scenario                              | API_Key                                      |
         | Invalid entitlements - no id          | notify user has signedIn with no id          |
         | Invalid entitlements - integer params | notify user has signedIn with integer params |

   @sdk @transport @Sev1
   Scenario Outline: Discovery.contentAccess - Positive Scenario: <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with 'null for discovery contentAccess'

      Examples:
         | Scenario                                                     | API_Key                                                                           |
         | With availabilities type channel-type                        | notify content access With availabilities channel type                            |
         | With availabilities type program-type                        | notify content access With availabilities program type                            |
         | With availabilities type, Id                                 | notify content access With availabilities type and Id                             |
         | With availabilities type, Id, catalog Id                     | notify content access With availabilities type Id and catalogId                   |
         | With availabilities type, Id, catalog Id, startTime          | notify content access With availabilities type Id catalogId and startTime         |
         | With availabilities type, Id, catalog Id, startTime, endTime | notify content access With availabilities type Id catalogId startTime and endTime |
         | With availabilities and entitlements                         | notify content access With availabilities and entitlements                        |
         | With only entitlements                                       | notify content access With only entitlements                                      |
         | with availabilities param empty                              | notify content access With availabilities param empty                             |
         | with entitlements param empty                                | notify content access With entitlements param empty                               |

   @sdk @transport @Sev2
   Scenario: Discovery.clearContentAccess - Positive Scenario: Clear both availabilities and entitlements from the subscriber
      When '3rd party app' invokes the 'Firebolt' API to 'clear ContentAccess'
      Then 'Firebolt' platform responds with 'null for discovery clearContentAccess'

   @sdk @transport @Sev2
   Scenario Outline: Discovery.contentAccess - Negative Scenario: <Scenario> expecting error
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with 'invalid parameter error for discovery contentAccess'

      Examples:
         | Scenario                                   | API_Key                                                               |
         | Without params                             | notify content access without params                                  |
         | Missing availabilities type value          | notify content access without availabilities type value               |
         | Missing availabilities id value            | notify content access without availabilities id value                 |
         | Invalid availabilities type value          | notify content access with invalid availabilities type value          |
         | Invalid availabilities type                | notify content access with invalid availabilities type                |
         | Invalid availabilities Id                  | notify content access with invalid availabilities Id                  |
         | Invalid availabilities catalog Id          | notify content access with invalid availabilities catalog Id          |
         | Invalid availabilities startTime           | notify content access with invalid availabilities startTime           |
         | Invalid availabilities endTime             | notify content access with invalid availabilities endTime             |
         | Invalid entitlements boolean entitlementId | notify content access with invalid entitlements boolean entitlementId |
         | Invalid entitlements integer entitlementId | notify content access with invalid entitlements integer entitlementId |
         | Invalid entitlements invalid startTime     | notify content access with invalid entitlements invalid startTime     |
         | Invalid entitlements invalid endTime       | notify content access with invalid entitlements invalid endTime       |

   @Device  @regression @sdk @requiresPlatformImplementation @Sev2
   Scenario: Discovery.onPolicyChanged - Positive Scenario: Clearing event listeners
      When '3rd party app' registers for the 'discovery onPolicyChanged' event using the 'Firebolt' API
      And I clear 'discovery onPolicyChanged event' listeners
      And 1st party app invokes the 'Firebolt' API to 'set allowPersonalization to true'
      Then 'Firebolt' platform responds to '1st party app' for 'set allowPersonalization to true'
      And 'Firebolt' platform does not trigger event for 'onDiscoveryPolicyChanged'