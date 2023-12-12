Feature: Advertising

   @initialization
   Scenario: Launch FCA for 'Advertising'
      Given the environment has been set up for 'Advertising' tests
      And 3rd party 'certification' app is launched

   @Advertising @coreSDK @sdk @transport
   Scenario Outline: Advertising.policy - Positive Scenario: <Scenario>
      Given '3rd party app' registers for the 'advertising policyChanged' event using the 'Firebolt' API
      Given 1st party app invokes the 'Firebolt' API to '<API_Key>'
      And '3rd party app' invokes the 'Firebolt' API to 'get advertising policy'
      And 'Firebolt' platform responds with '<Method_Validation_key>'
      And 'Firebolt' platform responds with '<Event_Validation_key>'

      Examples:
         | Scenario                | API_Key                 | Method_Validation_key                       | Event_Validation_key                                  |
         | Disable limitAdTracking | disable limitAdTracking | Advertising policy limitAdTracking as true  | Advertising onpolicy changed limitAdTracking as true  |
         | Enable limitAdTracking  | enable limitAdTracking  | Advertising policy limitAdTracking as false | Advertising onpolicy changed limitAdTracking as false |

   @Advertising @coreSDK @sdk @transport
   Scenario Outline: Advertising.policy - Positive Scenario: <Scenario>
      Given '3rd party app' registers for the 'advertising policyChanged' event using the 'Firebolt' API
      Given 1st party app invokes the 'Firebolt' API to '<API_Key>'
      And '3rd party app' invokes the 'Firebolt' API to 'get advertising policy'
      And 'Firebolt' platform responds with '<Method_Validation_key>'
      And 'Firebolt' platform responds with '<Event_Validation_key>'

      Examples:
         | Scenario                     | API_Key                             | Method_Validation_key                              | Event_Validation_key                                         |
         | SkipRestriction none         | set skipRestriction as none         | Advertising policy skipRestriction as none         | Advertising onpolicy changed skipRestriction as none         |
         | SkipRestriction adsUnwatched | set skipRestriction as adsUnwatched | Advertising policy skipRestriction as adsUnwatched | Advertising onpolicy changed skipRestriction as adsUnwatched |
         | SkipRestriction adsAll       | set skipRestriction as adsAll       | Advertising policy skipRestriction as adsAll       | Advertising onpolicy changed skipRestriction as adsAll       |
         | SkipRestriction all          | set skipRestriction as all          | Advertising policy skipRestriction as all          | Advertising onpolicy changed skipRestriction as all          |

   @Advertising @coreSDK @sdk @transport
   Scenario: Advertising.deviceAttributes - Positive Scenario: Get deviceAttributes
      When '3rd party app' invokes the 'Firebolt' API to 'get deviceAttributes'
      And 'Firebolt' platform responds with 'advertising device attributes'

   @Advertising @coreSDK @sdk @transport
   Scenario: Advertising.appBundleId - Positive Scenario: Get appBundleId
      When '3rd party app' invokes the 'Firebolt' API to 'get appBundleId'
      And 'Firebolt' platform responds with 'advertising appBundleId'

   # Misc validation
   # @Advertising @coreSDK @sdk @transport
   # Scenario Outline: Advertising.advertisingId - Positive Scenario: Special Validation <Scenario>
   #    And 1st party app invokes the 'Firebolt' API to '<Key>'
   #    And '3rd party app' invokes the 'Firebolt' API to 'get advertisingId'
   #    And '3rd party app' invokes the 'Firebolt' API to 'get initialization parameters'
   #    Then Firebolt platform responds for 'advertising.advertisingId' method and 'result' is '<Content>'
   #    Then Firebolt platform responds for 'parameters.initialization' method and 'result' is '<Content>'

   #    Examples:
   #       | Scenario                    | Key                       |
   #       | limitAdTracking_OFF         | set limitAdTracking_OFF   | 
   #       | limitAdTracking_ON          | set limitAdTracking_ON    |

   @Advertising @coreSDK @sdk @transport
   Scenario Outline: Advertising.config Coppa value - Positive Scenario: <Scenario>
      And '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      And 'Firebolt' platform responds with '<Method_Validation_key>'

      Examples:
         | Scenario                                | API_Key                                        | Method_Validation_key            |
         | Coppa None                              | get no coppa                                   | advertising config coppa as zero |
         | Coppa TRUE                              | get coppa as true                              | advertising config coppa as one  |
         | Coppa FALSE                             | get coppa as false                             | advertising config coppa as zero |
         | Coppa None with environment value test  | get no coppa with environment value test       | advertising config coppa as zero |
         | Coppa TRUE with environment value test  | get coppa as true with environment value test  | advertising config coppa as one  |
         | Coppa FALSE with environment value test | get coppa as false with environment value test | advertising config coppa as zero |

   # Misc validation
   # @Advertising @coreSDK @sdk @transport
   # Scenario Outline: Advertising.config - special Validation <Scenario>
   #    And 1st party app invokes the 'Firebolt' API to '<Key1>'
   #    And '3rd party app' invokes the 'Firebolt' API to '<Key2>'
   #    Then Firebolt platform responds for 'advertising.config' method and 'result' is '<Content>'

   #    Examples:
   #       | Scenario                                | Key1                     | Key2                 |
   #       | limitAdTracking_ON With param True      | set limitAdTracking_OFF  | get coppa as true    |
   #       | limitAdTracking_OFF With param True     | set limitAdTracking_ON   | get coppa as true    |
   #       | limitAdTracking_ON With param False     | set limitAdTracking_OFF  | get coppa as false   |
   #       | limitAdTracking_OFF With param False    | set limitAdTracking_ON   | get coppa as false   | 
   #       | Only coppa as params                    | set limitAdTracking_OFF  | get only coppa       |
   #       | Empty params                            | set limitAdTracking_OFF  | get empty parameter  |

   @Advertising @coreSDK @sdk @transport
   Scenario Outline: Advertising.config - Negative Scenario: <Scenario> expecting error
      And '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      And 'Firebolt' platform responds with '<Method_Validation_key>'

      Examples:
         | Scenario                                    | API_Key                                      | Method_Validation_key                      |
         | Empty params                                | get config with empty parameter              | invalid parameter error advertising config |
         | Invalid coppa value                         | get config with invalid coppa                | invalid parameter error advertising config |
         | Invalid authenticationEntity datatype value | get config with invalid authenticationEntity | invalid parameter error advertising config |
         | Invalid environment datatype value          | get config with invalid environment datatype | invalid parameter error advertising config |
         | Invalid environment value                   | get config with invalid environment          | invalid parameter error advertising config |
         | Integer values for params                   | get config with integer parameter            | invalid parameter error advertising config |

   @Advertising @coreSDK @sdk @transport
   Scenario: Advertising.policy - Positive Scenario: SkipRestriction with undefined params
      And 1st party app invokes the 'Firebolt' API to 'set skipRestriction with undefined parameter'
      And 'Firebolt' platform responds to '1st party app' with 'advertising skipRestriction'

   # Misc validation
   # @Advertising @coreSDK @sdk @transport
   # Scenario Outline: Advertising.advertisingId - Positive Scenario: <Scenario>
   #    And 1st party app invokes the 'Firebolt' API to '<Key1>'
   #    And '3rd party app' invokes the 'Firebolt' API to '<Key2>'
   #    Then Firebolt platform responds for 'advertising.advertisingId' method and 'result' is '<Content>'
      
   #    Examples:
   #       | Scenario                                | Key1                     | Key2                                 |
   #       | limitAdTracking_OFF_SCOPE_BROWSER       | set limitAdTracking_OFF  | get advertisingId for scope browser  |
   #       | limitAdTracking_ON_SCOPE_BROWSER        | set limitAdTracking_ON   | get advertisingId for scope browser  |
   #       | limitAdTracking_OFF_SCOPE_CONTENT       | set limitAdTracking_OFF  | get advertisingId for scope content  |
   #       | limitAdTracking_ON_SCOPE_CONTENT        | set limitAdTracking_ON   | get advertisingId for scope content  |

   @Advertising @coreSDK @sdk @transport
   Scenario Outline: Advertising.advertisingId - Negative Scenario: <Scenario> expecting error
      And '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
      And 'Firebolt' platform responds with '<Method_Validation_key>'

      Examples:
         | Scenario                         | API_Key                    | Method_Validation_key                             |
         | Invalid advertisingId type value | invalid advertisingId type | invalid parameter error advertising advertisingId |
         | Invalid advertisingId ID value   | invalid advertisingId ID   | invalid parameter error advertising advertisingId |
