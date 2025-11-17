@Discovery @coreSDK
Feature: Discovery

   Background: Launch FCA for 'Discovery'
      Given the environment has been set up for 'Discovery' tests
      And 3rd party 'certification' app is launched

   @sdk @transport @Sev0
   Scenario Outline: Discovery.policy - Validating API and Event responses when <Scenario>
      Given the environment has been set up for '<FB_Object>' tests
      And '3rd party app' registers for the 'Firebolt' event
      And '3rd party app' invokes the 'Firebolt' get API
      When 1st party app invokes the 'Firebolt' API to set '<Method>' to '<Value>'
      Then 'Firebolt' platform responds to '1st party app' set API
      When '3rd party app' invokes the 'Firebolt' get API
      Then 'Firebolt' platform responds to '3rd party app' get API
      And 'Firebolt' platform triggers '3rd party app' event

      Examples:
         | Scenario                  | Method               | Value | FB_Object                           |
         | enabling recommendations  | allowPersonalization | true  | Discovery recommendations           |
         | disabling recommendations | allowPersonalization | false | Discovery recommendations           |
         | enabling watch history    | allowWatchHistory    | true  | Discovery remember watched programs |
         | disabling watch history   | allowWatchHistory    | false | Discovery remember watched programs |

   @sdk @transport @Sev1
   Scenario Outline: Discovery.watched - Validate Method success with parameter configuration: <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with 'true for watched content in discovery'

      Examples:
         | Scenario                                                                        | API_Key                                                                |
         | EntityId only                                                                   | notify watched content with only entityid                              |
         | EntityId and Progress                                                           | notify watched content with entityid progress                          |
         | EntityId, Progress & completed status                                           | notify watched content with entityid progress status                   |
         | EntityId, Progress, completed Status & watchedon date                           | notify watched content with entityid progress status date              |
         | EntityId, Progress, completed Status, watchedon date and child age policy       | notify watched content with entityid progress status date child policy |
         | EntityId, Progress, completed Status, watchedon date and teen age policy        | notify watched content with entityid progress status date teen policy  |
         | EntityId, Progress, completed Status, watchedon date and adult age policy       | notify watched content with entityid progress status date adult policy |
         | EntityId, Progress, completed Status, watchedon date and custom agepolicy       | notify watched content with entityid progress status date custom policy|


   @sdk @transport @Sev1
   Scenario Outline: Discovery.watchNext - Validate Method success with parameter configuration: <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with 'true for watchnext tile in discovery'

      Examples:
         | Scenario                                                         | API_Key                                                         |
         | Title & identifiers with entityId                                | suggest watchnext tile with entityid                            |
         | Title & identifiers with entityID & assetID                      | suggest watchnext tile with entityid assetid                    |
         | Title & identifiers with entityID, assetID, sessionId & seriesId | suggest watchnext tile with entityid assetid sessionid seriesid |

   @sdk @transport @Sev2
   Scenario Outline: Discovery.watchNext - Validate Method success with parameter configuration: <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with 'true for watchnext tile in discovery'

      Examples:
         | Scenario                                                                         | API_Key                                                                        |
         | Title & identifiers with entityID, assetID & sessionId                           | suggest watchnext tile with entityid assetid sessionid                         |
         | Title & identifiers with entityID, assetID, sessionId, seriesId & appContentData | suggest watchnext tile with entityid assetid sessionid seriesid appcontentdata |
         | Title, identifiers & expires                                                     | suggest watchnext tile with expires                                            |
         | Title, identfiers, expires & images                                              | suggest watchnext tile with expires images                                     |

   @sdk @transport @Sev0
   Scenario Outline: Discovery.entitlements - Validate Method success with <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with 'true for entitlements in discovery'

      Examples:
         | Scenario                 | API_Key                                     |
         | using valid params       | notify entitlements                         |
         | using only entitlementId | notify entitlements with entitlementid only |

   @sdk @transport @Sev2
   Scenario Outline: Discovery.watched - Validating API Error handling when given <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with 'invalid params for discovery watched'

      Examples:
         | Scenario                         | API_Key                                                      |
         | empty params                     | notify watched content with empty parameter                  |
         | invalid EntityID number          | notify watched content with invalid entityid number          |
         | invalid progress                 | notify watched content with invalid progress                 |
         | invalid progress string          | notify watched content with invalid progress string          |
         | invalid completed status         | notify watched content with invalid completed                |
         | invalid watched on               | notify watched content with invalid watchedon                |
         | invalid integer age policy value | notify watched content with invalid integer age policy value |
         | invalid boolean age policy value | notify watched content with invalid boolean age policy value |

   @sdk @transport @Sev2
   Scenario Outline: Discovery.watchNext - Validating API Error handling when given <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with 'invalid params for discovery watchnext'

      Examples:
         | Scenario                           | API_Key                                                        |
         | only a title                       | suggest watchnext tile with only title                         |
         | invalid identifiers                | suggest watchnext tile with invalid identifiers                |
         | invalid expirations                | suggest watchnext tile with invalid expires                    |
         | invalid expirations as integer     | suggest watchnext tile with invalid expires integer            |
         | invalid images                     | suggest watchnext tile with invalid images                     |
         | invalid image as integer           | suggest watchnext tile with invalid image integer              |
         | invalid identifiers EntityId       | suggest watchnext tile with invalid identifiers entityid       |
         | invalid identifiers assetID        | suggest watchnext tile with invalid identifiers assetid        |
         | invalid identifiers sessionId      | suggest watchnext tile with invalid identifiers sessionid      |
         | invalid identifiers seriesId       | suggest watchnext tile with invalid identifiers seriesid       |
         | invalid identifiers appContentData | suggest watchnext tile with invalid identifiers appcontentdata |

   @sdk @transport @Sev2
   Scenario Outline: Discovery.entitlements - Validating API Error handling when given <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with 'invalid params for discovery entitlements'

      Examples:
         | Scenario                                 | API_Key                                 |
         | invalid entitlements with no id          | notify entitlements with no id          |
         | invalid entitlements with integer params | notify entitlements with integer params |

   @sdk @transport @Sev2
   Scenario Outline: Discovery.signIn - Validating API Error handling when given <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with 'invalid params for discovery signIn'

      Examples:
         | Scenario                                 | API_Key                                      |
         | invalid entitlements with no id          | notify user has signedIn with no id          |
         | invalid entitlements with integer params | notify user has signedIn with integer params |

   @sdk @transport @Sev1
   Scenario Outline: Discovery.contentAccess - Validate Method success with parameter configuration: <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with 'null for discovery contentAccess'

      Examples:
         | Scenario                                                | API_Key                                                                           |
         | availabilities type channel-type                        | notify content access with availabilities channel type                            |
         | availabilities type program-type                        | notify content access with availabilities program type                            |
         | availabilities type, Id                                 | notify content access with availabilities type and Id                             |
         | availabilities type, Id, catalog Id                     | notify content access with availabilities type Id and catalogId                   |
         | availabilities type, Id, catalog Id, startTime          | notify content access with availabilities type Id catalogId and startTime         |
         | availabilities type, Id, catalog Id, startTime, endTime | notify content access with availabilities type Id catalogId startTime and endTime |
         | availabilities and entitlements                         | notify content access with availabilities and entitlements                        |
         | only entitlements                                       | notify content access with only entitlements                                      |
         | availabilities param empty                              | notify content access with availabilities param empty                             |
         | entitlements param empty                                | notify content access with entitlements param empty                               |

   @sdk @transport @Sev2
   Scenario: Discovery.clearContentAccess - Clearing availabilities and entitlements from the subscriber
      Given the environment has been set up for 'Discovery clearContentAccess' tests
      When '3rd party app' invokes the 'Firebolt' get API
      Then 'Firebolt' platform responds to '3rd party app' get API

   @sdk @transport @Sev2
   Scenario Outline: Discovery.contentAccess -  Validating API Error handling with <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with 'invalid parameter error for discovery contentAccess'

      Examples:
         | Scenario                                   | API_Key                                                               |
         | missing params                             | notify content access without params                                  |
         | missing availabilities type value          | notify content access without availabilities type value               |
         | missing availabilities id value            | notify content access without availabilities id value                 |
         | invalid availabilities type value          | notify content access with invalid availabilities type value          |
         | invalid availabilities type                | notify content access with invalid availabilities type                |
         | invalid availabilities Id                  | notify content access with invalid availabilities Id                  |
         | invalid availabilities catalog Id          | notify content access with invalid availabilities catalog Id          |
         | invalid availabilities startTime           | notify content access with invalid availabilities startTime           |
         | invalid availabilities endTime             | notify content access with invalid availabilities endTime             |
         | invalid entitlements boolean entitlementId | notify content access with invalid entitlements boolean entitlementId |
         | invalid entitlements integer entitlementId | notify content access with invalid entitlements integer entitlementId |
         | invalid entitlements invalid startTime     | notify content access with invalid entitlements invalid startTime     |
         | invalid entitlements invalid endTime       | notify content access with invalid entitlements invalid endTime       |

   @regression @sdk @requiresPlatformImplementation @Sev2
   Scenario: Discovery.onPolicyChanged - Clearing event listeners
      Given '3rd party app' registers for the 'discovery onPolicyChanged' event using the 'Firebolt' API
      And 3rd party stops listening to the event 'discovery onPolicyChanged event'
      When 1st party app invokes the 'Firebolt' API to 'set allowPersonalization to true'
      Then 'Firebolt' platform responds to '1st party app' for 'set allowPersonalization to true'
      And 'Firebolt' platform does not trigger event for 'onDiscoveryPolicyChanged'