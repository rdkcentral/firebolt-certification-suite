@Advertising @coreSDK
Feature: Advertising

   Background: Launch FCA for 'Advertising'
      Given the environment has been set up for 'Advertising' tests
      And 3rd party 'certification' app is launched

   @sdk @transport @Sev0
   Scenario Outline: Advertising.policy - Validating API and Event responses when <Scenario>
      Given '3rd party app' registers for the 'advertising onPolicyChanged' event using the 'Firebolt' API
      And '3rd party app' invokes the 'Firebolt' API to 'get advertising policy'
      When 1st party app invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds to '1st party app' for '<API_Key>'
      When '3rd party app' invokes the 'Firebolt' API to 'get advertising policy'
      Then 'Firebolt' platform responds with '<Method_Validation_key>'
      And 'Firebolt' platform triggers event '<Event_Validation_key>'

      Examples:
         | Scenario                  | API_Key                 | Method_Validation_key                       | Event_Validation_key                                       |
         | enabling limitAdTracking  | enable limitAdTracking  | Advertising policy limitAdTracking as false | onPolicyChanged for advertising limitAdTracking with false |
         | disabling limitAdTracking | disable limitAdTracking | Advertising policy limitAdTracking as true  | onPolicyChanged for advertising limitAdTracking with true  |

   @sdk @transport @Sev1
   Scenario Outline: Advertising.policy - Validating API and Event responses when <Method> set to <Value>
      Given we test the 'ADVERTISING_SKIPRESTRICTION' getters and setters '<Method>' to '<Value>'
      And '3rd party app' registers for the 'Firebolt' event
      And '3rd party app' invokes the 'Firebolt' get API
      When 1st party app invokes the 'Firebolt' API to set value
      Then 'Firebolt' platform responds to '1st party app' set API
      When '3rd party app' invokes the 'Firebolt' get API
      Then 'Firebolt' platform responds to '3rd party app' get API
      And 'Firebolt' platform triggers '3rd party app' event

      Examples:
         | Method          | Value        |
         | skipRestriction | adsAll       |
         | skipRestriction | none         |
         | skipRestriction | adsUnwatched |
         | skipRestriction | all          |

   @sdk @transport @Sev2
   Scenario: Advertising.deviceAttributes - Validating API Method response content
      Given we test the 'ADVERTISING_DEVICEATTRIBUTES' getters and setters
      When '3rd party app' invokes the 'Firebolt' get API
      Then 'Firebolt' platform responds to '3rd party app' get API

   @sdk @transport @Sev2
   Scenario: Advertising.appBundleId - Validating API Method response content
      When '3rd party app' invokes the 'Firebolt' API to 'get appBundleId'
      Then 'Firebolt' platform responds with 'advertising appBundleId'

   @sdk @transport @Sev1
   Scenario Outline: Advertising.advertisingId - Validating API and Event responses when <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to 'get advertisingId'
      And '3rd party app' invokes the 'Firebolt' API to 'get initialization parameters'
      And 1st party app invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds to '1st party app' with '<API_Key>'
      When '3rd party app' invokes the 'Firebolt' API to 'get advertisingId'
      And '3rd party app' invokes the 'Firebolt' API to 'get initialization parameters'
      Then 'Firebolt' platform responds with '<AdvertidingId_Validation_key>'
      And 'Firebolt' platform responds with '<Parameters_Validation_key>'

      Examples:
         | Scenario                  | API_Key                 | AdvertidingId_Validation_key          | Parameters_Validation_key                      |
         | disabling limitAdTracking | enable limitAdTracking  | limitAdTracking OFF for advertisingId | parameters initialization advertisingId ad off |
         | enabling limitAdTracking  | disable limitAdTracking | limitAdTracking ON for advertisingId  | parameters initialization advertisingId ad on  |

   @sdk @transport @Sev2
   Scenario Outline: Advertising.config - Validating API Method responses for Coppa set to <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with '<Method_Validation_key>'

      Examples:
         | Scenario                          | API_Key                                        | Method_Validation_key            |
         | none                              | get no coppa                                   | advertising config coppa as zero |
         | true                              | get coppa as true                              | advertising config coppa as one  |
         | false                             | get coppa as false                             | advertising config coppa as zero |
         | none with environment value test  | get no coppa with environment value test       | advertising config coppa as zero |
         | true with environment value test  | get coppa as true with environment value test  | advertising config coppa as one  |
         | false with environment value test | get coppa as false with environment value test | advertising config coppa as zero |

   @sdk @transport @Sev2
   Scenario Outline: Advertising.config - Validating API and Event responses when <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<CORE_API_Key>'
      And 1st party app invokes the 'Firebolt' API to '<MANAGE_API_Key>'
      Then 'Firebolt' platform responds to '1st party app' with '<MANAGE_API_Key>'
      When '3rd party app' invokes the 'Firebolt' API to '<CORE_API_Key>'
      Then 'Firebolt' platform responds with '<Method_Validation_key>'

      Examples:
         | Scenario                                        | MANAGE_API_Key          | CORE_API_Key        | Method_Validation_key |
         | limitAdTracking is enabled with param True      | enable limitAdTracking  | get coppa as true   | advertising config    |
         | limitAdTracking is disabled with param True     | disable limitAdTracking | get coppa as true   | advertising config    |
         | limitAdTracking is enabled with param False     | enable limitAdTracking  | get coppa as false  | advertising config    |
         | limitAdTracking is disabled with param False    | disable limitAdTracking | get coppa as false  | advertising config    |
         | limitAdTracking is enabled with coppa as params | enable limitAdTracking  | get only coppa      | advertising config    |
         | limitAdTracking is enabled with empty params    | enable limitAdTracking  | get empty parameter | advertising config    |

   @sdk @transport @Sev2
   Scenario Outline: Advertising.config - Validating API Error Handling When Given <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with '<Method_Validation_key>'

      Examples:
         | Scenario                                    | API_Key                                      | Method_Validation_key                      |
         | empty params                                | get config with empty parameter              | invalid parameter error advertising config |
         | invalid coppa value                         | get config with invalid coppa                | invalid parameter error advertising config |
         | invalid authenticationEntity datatype value | get config with invalid authenticationEntity | invalid parameter error advertising config |
         | invalid environment datatype value          | get config with invalid environment datatype | invalid parameter error advertising config |
         | invalid environment value                   | get config with invalid environment          | invalid parameter error advertising config |
         | integer values for params                   | get config with integer parameter            | invalid parameter error advertising config |

   @sdk @transport @Sev1
   Scenario Outline: Advertising.advertisingId - Validating API and Event Responses when <Scenario>
      When 1st party app invokes the 'Firebolt' API to '<MANAGE_API_Key>'
      And '3rd party app' invokes the 'Firebolt' API to '<CORE_API_Key>'
      Then 'Firebolt' platform responds to '1st party app' with '<MANAGE_API_Key>'
      When '3rd party app' invokes the 'Firebolt' API to '<CORE_API_Key>'
      Then 'Firebolt' platform responds with '<Validation_key>'

      Examples:
         | Scenario                                                  | MANAGE_API_Key          | CORE_API_Key                                     | Validation_key                        |
         | limitAdTracking is disabled for scope browser             | enable limitAdTracking  | get advertisingId for scope browser              | limitAdTracking OFF for advertisingId |
         | limitAdTracking is enabled for scope browser              | disable limitAdTracking | get advertisingId for scope browser              | limitAdTracking ON for advertisingId  |
         | limitAdTracking is disabled for scope content             | enable limitAdTracking  | get advertisingId for scope content              | limitAdTracking OFF for advertisingId |
         | limitAdTracking is enabled for scope content              | disable limitAdTracking | get advertisingId for scope content              | limitAdTracking ON for advertisingId  |
         | limitAdTracking is enabled with scope                     | disable limitAdTracking | get advertisingId without scope                  | limitAdTracking ON for advertisingId  |
         | limitAdTracking is enabled with random string as scope ID | disable limitAdTracking | get advertisingId with scope id as random string | limitAdTracking ON for advertisingId  |
         | limitAdTracking is enabled with empty string as scope ID  | disable limitAdTracking | get advertisingId with scope id as empty string  | limitAdTracking ON for advertisingId  |

   @sdk @transport @Sev2
   Scenario Outline: Advertising.advertisingId - Validate Error Handling When Given <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with 'invalid parameter for advertising advertisingId'

      Examples:
         | Scenario             | API_Key                                     |
         | invalid type value   | get advertisingId with invalid type         |
         | invalid ID value     | get advertisingId with invalid ID           |
         | invalid scope type   | get advertisingId with invalid scope type   |
         | invalid scope        | get advertisingId with invalid scope        |
         | no scope type and id | get advertisingId without scope type and id |
         | no scope id          | get advertisingId without scope id          |
         | no scope type        | get advertisingId without scope type        |
         

      @sdk @transport @requiresPlatformImplementation @Sev2
      Scenario: Advertising.onPolicyChanged - Clearing event listeners
            Given '3rd party app' registers for the 'advertising onPolicyChanged' event using the 'Firebolt' API
            And 3rd party stops listening to the event 'advertising onPolicyChanged event'
            When 1st party app invokes the 'Firebolt' API to 'set true for allowAppContentAdTargeting'
            Then 'Firebolt' platform responds to '1st party app' with 'set true for allowAppContentAdTargeting'
            And 'Firebolt' platform does not trigger event for 'onAdvertisingPolicyChanged'
