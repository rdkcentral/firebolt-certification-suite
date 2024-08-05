@Advertising @coreSDK
Feature: Advertising

   Background: Launch FCA for 'Advertising'
      Given the environment has been set up for 'Advertising' tests
      And 3rd party 'certification' app is launched

   @sdk @transport
   Scenario Outline: Advertising.policy - Positive Scenario: <Scenario>
      When '3rd party app' registers for the 'advertising onPolicyChanged' event using the 'Firebolt' API
      And '3rd party app' invokes the 'Firebolt' API to 'get advertising policy'
      And 1st party app invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds to '1st party app' for '<API_Key>'
      When '3rd party app' invokes the 'Firebolt' API to 'get advertising policy'
      Then 'Firebolt' platform responds with '<Method_Validation_key>'
      And 'Firebolt' platform triggers event '<Event_Validation_key>'

      Examples:
         | Scenario                | API_Key                 | Method_Validation_key                       | Event_Validation_key                                       |
         | Enable limitAdTracking  | enable limitAdTracking  | Advertising policy limitAdTracking as false | onPolicyChanged for advertising limitAdTracking with false |
         | Disable limitAdTracking | disable limitAdTracking | Advertising policy limitAdTracking as true  | onPolicyChanged for advertising limitAdTracking with true  |

   @sdk @transport
   Scenario Outline: Advertising.policy - Positive Scenario: <Scenario>
      When '3rd party app' registers for the 'advertising onPolicyChanged' event using the 'Firebolt' API
      And '3rd party app' invokes the 'Firebolt' API to 'get advertising policy'
      And 1st party app invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds to '1st party app' for '<API_Key>'
      When '3rd party app' invokes the 'Firebolt' API to 'get advertising policy'
      Then 'Firebolt' platform responds with '<Method_Validation_key>'
      And 'Firebolt' platform triggers event '<Event_Validation_key>'

      Examples:
         | Scenario                     | API_Key                             | Method_Validation_key                              | Event_Validation_key                                              |
         | SkipRestriction adsAll       | set skipRestriction as adsAll       | Advertising policy skipRestriction as adsAll       | onPolicyChanged for advertising skipRestriction with adsAll       |
         | SkipRestriction none         | set skipRestriction as none         | Advertising policy skipRestriction as none         | onPolicyChanged for advertising skipRestriction with none         |
         | SkipRestriction adsUnwatched | set skipRestriction as adsUnwatched | Advertising policy skipRestriction as adsUnwatched | onPolicyChanged for advertising skipRestriction with adsUnwatched |
         | SkipRestriction all          | set skipRestriction as all          | Advertising policy skipRestriction as all          | onPolicyChanged for advertising skipRestriction with all          |

   @sdk @transport
   Scenario: Advertising.deviceAttributes - Positive Scenario: Get deviceAttributes
      When '3rd party app' invokes the 'Firebolt' API to 'get deviceAttributes'
      Then 'Firebolt' platform responds with 'advertising device attributes'

   @sdk @transport
   Scenario: Advertising.appBundleId - Positive Scenario: Get appBundleId
      When '3rd party app' invokes the 'Firebolt' API to 'get appBundleId'
      Then 'Firebolt' platform responds with 'advertising appBundleId'

   @sdk @transport
   Scenario Outline: Advertising.advertisingId - Positive Scenario: Special Validation <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to 'get advertisingId'
      And '3rd party app' invokes the 'Firebolt' API to 'get initialization parameters'
      When 1st party app invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds to '1st party app' with '<API_Key>'
      When '3rd party app' invokes the 'Firebolt' API to 'get advertisingId'
      And '3rd party app' invokes the 'Firebolt' API to 'get initialization parameters'
      Then 'Firebolt' platform responds with '<AdvertidingId_Validation_key>'
      And 'Firebolt' platform responds with '<Parameters_Validation_key>'

      Examples:
         | Scenario            | API_Key                 | AdvertidingId_Validation_key          | Parameters_Validation_key                      |
         | limitAdTracking_ON  | disable limitAdTracking | limitAdTracking ON for advertisingId  | parameters initialization advertisingId ad on  |
         | limitAdTracking_OFF | enable limitAdTracking  | limitAdTracking OFF for advertisingId | parameters initialization advertisingId ad off |

   @sdk @transport
   Scenario Outline: Advertising.config Coppa value - Positive Scenario: <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with '<Method_Validation_key>'

      Examples:
         | Scenario                                | API_Key                                        | Method_Validation_key            |
         | Coppa None                              | get no coppa                                   | advertising config coppa as zero |
         | Coppa TRUE                              | get coppa as true                              | advertising config coppa as one  |
         | Coppa FALSE                             | get coppa as false                             | advertising config coppa as zero |
         | Coppa None with environment value test  | get no coppa with environment value test       | advertising config coppa as zero |
         | Coppa TRUE with environment value test  | get coppa as true with environment value test  | advertising config coppa as one  |
         | Coppa FALSE with environment value test | get coppa as false with environment value test | advertising config coppa as zero |

   @sdk @transport
   Scenario Outline: Advertising.config - special Scenario: Validation <Scenario>
      When '3rd party app' invokes the 'Firebolt' API to '<CORE_API_Key>'
      And 1st party app invokes the 'Firebolt' API to '<MANAGE_API_Key>'
      Then 'Firebolt' platform responds to '1st party app' with '<MANAGE_API_Key>'
      When '3rd party app' invokes the 'Firebolt' API to '<CORE_API_Key>'
      Then 'Firebolt' platform responds with '<Method_Validation_key>'

      Examples:
         | Scenario                             | MANAGE_API_Key          | CORE_API_Key        | Method_Validation_key |
         | limitAdTracking_ON With param True   | enable limitAdTracking  | get coppa as true   | advertising config    |
         | limitAdTracking_OFF With param True  | disable limitAdTracking | get coppa as true   | advertising config    |
         | limitAdTracking_ON With param False  | enable limitAdTracking  | get coppa as false  | advertising config    |
         | limitAdTracking_OFF With param False | disable limitAdTracking | get coppa as false  | advertising config    |
         | Only coppa as params                 | enable limitAdTracking  | get only coppa      | advertising config    |
         | Empty params                         | enable limitAdTracking  | get empty parameter | advertising config    |

   @sdk @transport
   Scenario Outline: Advertising.config - Negative Scenario: <Scenario> expecting error
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with '<Method_Validation_key>'

      Examples:
         | Scenario                                    | API_Key                                      | Method_Validation_key                      |
         | Empty params                                | get config with empty parameter              | invalid parameter error advertising config |
         | Invalid coppa value                         | get config with invalid coppa                | invalid parameter error advertising config |
         | Invalid authenticationEntity datatype value | get config with invalid authenticationEntity | invalid parameter error advertising config |
         | Invalid environment datatype value          | get config with invalid environment datatype | invalid parameter error advertising config |
         | Invalid environment value                   | get config with invalid environment          | invalid parameter error advertising config |
         | Integer values for params                   | get config with integer parameter            | invalid parameter error advertising config |

   @sdk @transport
   Scenario Outline: Advertising.advertisingId - Positive Scenario: <Scenario>
      When 1st party app invokes the 'Firebolt' API to '<MANAGE_API_Key>'
      And '3rd party app' invokes the 'Firebolt' API to '<CORE_API_Key>'
      Then 'Firebolt' platform responds to '1st party app' with '<MANAGE_API_Key>'
      When '3rd party app' invokes the 'Firebolt' API to '<CORE_API_Key>'
      Then 'Firebolt' platform responds with '<Validation_key>'

      Examples:
         | Scenario                                       | MANAGE_API_Key          | CORE_API_Key                                     | Validation_key                        |
         | limitAdTracking_OFF_SCOPE_BROWSER              | enable limitAdTracking  | get advertisingId for scope browser              | limitAdTracking OFF for advertisingId |
         | limitAdTracking_ON_SCOPE_BROWSER               | disable limitAdTracking | get advertisingId for scope browser              | limitAdTracking ON for advertisingId  |
         | limitAdTracking_OFF_SCOPE_CONTENT              | enable limitAdTracking  | get advertisingId for scope content              | limitAdTracking OFF for advertisingId |
         | limitAdTracking_ON_SCOPE_CONTENT               | disable limitAdTracking | get advertisingId for scope content              | limitAdTracking ON for advertisingId  |
         | limitAdTracking_ON_WITHOUT_SCOPE               | disable limitAdTracking | get advertisingId without scope                  | limitAdTracking ON for advertisingId  |
         | limitAdTracking_ON_WITH_RANDOM_STRING_SCOPE_ID | disable limitAdTracking | get advertisingId with scope id as random string | limitAdTracking ON for advertisingId  |
         | limitAdTracking_ON_WITH_EMPTY_STRING_SCOPE_ID  | disable limitAdTracking | get advertisingId with scope id as empty string  | limitAdTracking ON for advertisingId  |

   @sdk @transport
   Scenario Outline: Advertising.advertisingId - Negative Scenario: <Scenario> expecting error
      When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      Then 'Firebolt' platform responds with 'invalid parameter for advertising advertisingId'

      Examples:
         | Scenario                         | API_Key                                     |
         | Invalid advertisingId type value | get advertisingId with invalid type         |
         | Invalid advertisingId ID value   | get advertisingId with invalid ID           |
         | Invalid advertisingId scope type | get advertisingId with invalid scope type   |
         | Without scope type and id        | get advertisingId without scope type and id |
         | Without scope id                 | get advertisingId without scope id          |
         | Without scope type               | get advertisingId without scope type        |
         | Invalid advertisingId scope      | get advertisingId with invalid scope        |

      @sdk @transport @requiresPlatformImplementation
      Scenario: Advertising.onPolicyChanged - Positive Scenario: Clearing event listeners
            When '3rd party app' registers for the 'advertising onPolicyChanged' event using the 'Firebolt' API
            And 1st party stops listening to the event 'advertising onPolicyChanged event'
            And 1st party app invokes the 'Firebolt' API to 'set true for allowAppContentAdTargeting'
            Then 'Firebolt' platform responds to '1st party app' with 'set true for allowAppContentAdTargeting'
            And 'Firebolt' platform does not trigger event for 'onAdvertisingPolicyChanged'
