/**
 * Copyright 2024 Comcast Cable Communications Management, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
module.exports = {
  ACTION: 'action',
  ACTION_CORE: 'CORE',
  ACCOUNT_ID: 'account.id',
  ACCOUNT_UID: 'account.uid',
  ADVERTISINGID_LIMITIADTRACKING_OFF_IFA_TYPE: 'sessionId',
  ADVERTISINGID_LIMITIADTRACKING_OFF_US_PRIVACY: '1-N-',
  ADVERTISINGID_LIMITIADTRACKING_ON_IFA_TYPE: 'sessionId',
  ADVERTISINGID_LIMITIADTRACKING_ON_US_PRIVACY: '1-Y-',
  ADVERTISING_ADVERTISINGID: 'advertising.advertisingId',
  ADVERTISING_LIMITIADTRACKING_OFF_LMT: '0',
  ADVERTISING_LIMITIADTRACKING_ON_LMT: '1',
  STATE_TRANSITION_AND_VALIDATION_CONFIG_LOCATION: 'objects/lifecycleAppObject.json',
  ALPHANUMERIC: 'alphanumeric',
  API_NAME: 'apiName',
  API_VERSION: 'apiVersion',
  APP: 'App',
  APP_HISTORY_EMPTY: 'App history is empty',
  APP_ID: 'appId',
  APP_LIFECYCLE_HISTORY: 'appLifeCycleHistory',
  APP_RESPONSE: 'Response from third party app: ',
  APP_TRANSPORT_UNAVAILABLE: 'App Transport unavailable',
  APP_TYPE: 'appType',
  ARRAY: 'array',
  ASYNCHRONOUS: 'asynchronous',
  BASE64: 'base64',
  BEFORE_OPERATION: 'beforeOperation',
  BEFORE_OPERATION_TAGS: 'beforeOperationTags',
  BEFORE_OPERATION_FORMAT:
    'Before operation object is not in proper array format, recheck the before objects in fixture/external/moduleReqId - getBeforeOperationObject',
  BOOLEAN: 'boolean',
  CAPABILITIES_INFO: 'capabilities.info',
  CAPABILITIES_PERMITTED: 'capabilities.permitted',
  CAPABILITIES_REQUEST: 'capabilities.request',
  CAPABILITIES_SUPPORTED: 'capabilities.supported',
  CERTIFICATION: 'certification',
  COMBINEDFIREBOLTCALLS: 'combinedFireboltCalls',
  COMBINEDFIREBOLTMOCKS: 'combinedFireboltMocks',
  COMBINEVALIDATIONOBJECTSJSON: 'combineValidationObjectsJson',
  COMMUNICATION_MODE: 'communicationMode',
  CONFIG: 'CONFIG',
  CONFIG_IMPLEMENTATION_MISSING: 'Config module implementation missing',
  CONFIG_MODULE_SETRESPONSE_PATH: 'cypress/fixtures/external/setResponseData.json',
  CONTENT: 'Content',
  CONTEXT: 'Context',
  CONTEXT_FILE_PATH: 'cypress/fixtures/apiObjectContext.json',
  CORE: 'core',
  CORRELATIONID: 'correlationId',
  COUNTRYCODE: 'countryCode',
  CUCUMBER: 'cucumber',
  CURRENT_APP_ID: 'currentAppId',
  CUSTOM_METHOD_PATH:
    'https://github.com/rdkcentral/firebolt-certification-suite/blob/main/cypress/support/step_definitions/validations.md#custom',
  CYPRESS_MODULES_PATH: 'cypress/fixtures/external/modules',
  DATE: 'date',
  DECIMAL: 'decimal',
  DECODE: 'decode',
  DECODEVALUE_JSON_PATH: 'decodeValue.json',
  DEFAULT_DEVICE_DATA_PATH: 'cypress/fixtures/defaultDeviceData.json',
  DEFAULT_DIRECTORY: '/tmp/jsonReports/',
  DEFAULT_PATH: 'cypress/fixtures/defaultTestData.json',
  DEFAULT_TEST_DATA: 'defaultTestData.json',
  DEREFERENCE_OPENRPC: 'dereferenceOpenRPC',
  DEVICE: 'device',
  DEVICE1: 'device1',
  DEVICEMANIFESTDATA: 'deviceManifestData',
  DEVICEMODULEFORMAT: 'deviceModelFormat',
  DEVICE_AUDIO: 'device.audio',
  DEVICE_CONTENT_VALIDATION: 'deviceContentValidation',
  DEVICE_ENV: 'Device',
  DEVICE_FIRMWARE: 'Device Firmware',
  DEVICE_HDCP: 'device.hdcp',
  DEVICE_HDR: 'device.hdr',
  DEVICE_IP: 'deviceIp',
  DEVICE_MAC: 'deviceMac',
  DEVICE_MAC_UNAVAILABLE: 'Device MAC unavailable',
  DEVICE_RESOLUTION: 'DEVICERESOLUTION',
  DEVICE_SCREENRESOLUTION: 'device.screenResolution',
  DEVICE_VERSION: 'device.version',
  DEVICE_MODEL: 'device.model',
  DEVICE_DISTRIBUTOR: 'device.distributor',
  DEVICE_PLATFORM: 'device.platform',
  DEVICE_VIDEORESOLUTION: 'device.videoResolution',
  DISCOVERY_LAUNCH: 'discovery.launch',
  EMAIL: 'email',
  ENV_PLATFORM_SDK_VERSION: 'platformSdkVersion',
  ENV_PLATFORM: 'platform',
  ENV_PLATFORM_RELEASE: 'platform release',
  ENV_PRODUCT: 'product',
  ENV_FIREBOLT_VERSION: 'fireboltVersion',
  ENV_DEVICE_FIRMWARE: 'deviceFirmware',
  ENV_DEVICE_MODEL: 'deviceModel',
  ENV_DEVICE_DISTRIBUTOR: 'deviceDistributor',
  ENV_PARTNER: 'partner',
  ENV_TARGET_VERSION: 'targetVersion',
  ERROR: 'error',
  ERROR_CODE: 'Error code',
  ERROR_CONTENT_VALIDATIONJSON: 'errorContentValidationJson',
  ERROR_EXPECTED: 'Expected response.error not to be null',
  ERROR_EXPECTED_DEFINED: 'Expected response.error to be defined',
  ERROR_EXPECTED_NULL: 'Expected response.error to be null',
  ERROR_INSIDE_RESULT_CHECK: 'Error inside Result check',
  ERROR_LIFECYCLE_STATE_VALIDATION: 'Lifecycle state validation failed due to following error - ',
  ERROR_LIST: ['Method not found', 'Method Not Implemented'],
  ERROR_NOT_UNDEFINED_CHECK: 'Error not undefined Check',
  ERROR_NULL_CHECK: 'Error null Check',
  ERROR_CONTENT_OBJECTS_PATH: 'cypress/fixtures/objects/errorContentObjects.json',
  ERROR_SCHEMA_SDK: 'errorSchemaSDK',
  ERROR_SCHEMA_TRANSPORT: 'errorSchemaTransport',
  EVENT: 'event',
  EVENT_ERROR_MSG: 'Event listener error validation',
  EVENT_LISTENER_RESPONSE: 'eventListenerResponse',
  EVENT_LISTENER_SCHEMA_RESULT: 'eventListenerSchemaResult',
  EVENT_NAME: 'eventName',
  EVENT_PARAM: 'event_param',
  EVENT_RESPONSE: 'eventResponse',
  EVENT_RESPONSE_MAP: 'eventResponseMap',
  EVENT_SCHEMA_MSG: 'Event listener schema validation',
  EVENT_SCHEMA_RESULT: 'eventSchemaResult',
  EVENT_VALIDATIONJSONPATH: 'eventValidationJsonPath',
  EXCEPTION_ERROR_OBJECT: 'exceptionErrorObject',
  EXCEPTION_METHODS: 'exceptionMethods',
  EXCLUDED_METHODS: ['Lifecycle.close'],
  EXCLUDED_MODULES: [],
  EXCLUDED_VALUES: [null, undefined],
  EXECUTE_SHELL: 'executeShell',
  EXPECTED_DATA_NOT_FOUND_IN_MODULE_JSONS:
    '`Expected data ${dataIdentifier} was not found in fixtures. Returning ${dataIdentifier} as is.`',
  EXPECTED_DEFAULT_TESTDATA_MESSAGE:
    'Expected JSON data should be defined in fixtures/objects/defaultTestData.json',
  EXPECTED_ERROR_RESPONSE: 'Expected error in response:',
  EXPECTED_JSON_IN_FIREBOLTCALLS: 'Expected JSON data should be defined in fixtures/fireboltCalls/',
  EXPECTED_JSON_IN_VALIDATION_OBJECTS:
    'Expected JSON data should be defined in fixtures/objects/validationObjects/',
  EXPECTING_ERROR: 'expectingError',
  EXTERNAL_ERROR_CONTENT_OBJECTS_PATH: 'cypress/fixtures/external/objects/errorContentObjects.json',
  EXTERNAL_DEVICES_PATH: 'cypress/fixtures/external/devices/',
  EXTERNAL_MODULEREQID_PATH: 'cypress/fixtures/external/objects/moduleReqId/moduleReqId.json',
  EXTERNAL_PATH: 'cypress/fixtures/external/modules/',
  EXTERNAL_PREREQUISITE_DATA: './cypress/fixtures/external/PreRequisiteData.json',
  EXTRACTEDAPI_PATH: 'extractedApiObject.apiResponse.',
  FAIL: 'FAIL',
  FAIL_ON_PUBSUB_CONNECTION_ERROR: 'failOnPubSubConnectionError',
  FAILED_TO_PARSE_LIEFECYCLE_ERROR:
    'Failed to parse error object from response while setting lifecycle state. Response received : ',
  FAILED_TO_SET_LIFECYCLE_STATE:
    'Failed to set lifecycle state due to the following error received from platform: ',
  FCA_APP_LIST: 'fcaAppList',
  FCS: 'fcs',
  FCS_MODULEREQID_PATH: 'cypress/fixtures/objects/moduleReqId/moduleReqId.json',
  FCS_SETRESPONSE_PATH: 'cypress/fixtures/setResponseData.json',
  FCS_VALIDATION_JSON: 'fCSValidationjson',
  FIREBOLT: 'firebolt',
  FIREBOLTCALL: 'fireboltCall',
  FIREBOLT_VERSION: 'Firebolt Version',
  FIREBOLTCALLS_FROM_CONFIGMODULE: 'cypress/fixtures/external/fireboltCalls/',
  FIREBOLTCALLS_FROM_FCS: 'cypress/fixtures/fireboltCalls/',
  FIREBOLTCONFIG: 'fireboltConfig',
  FIREBOLTMOCK: 'fireboltMock',
  FIREBOLTMOCK_FROM_CONFIGMODULE: 'cypress/fixtures/external/fireboltMocks/',
  FIREBOLTMOCK_FROM_FCS: 'cypress/fixtures/fireboltMocks/',
  FIREBOLT_SPECIFICATION_NEXT_URL: 'firebolt_specification_next_url',
  FIREBOLT_SPECIFICATION_PROPOSED_URL: 'firebolt_specification_proposed_url',
  FIREBOLT_SPECIFICATION_URL: 'firebolt_specification_url',
  FIRST_PARTY_APP: '1st party app',
  VALIDATION_OBJECTS_PATH: 'cypress/fixtures/objects/validationObjects/',
  CONFIG_VALIDATION_OBJECTS_PATH: 'cypress/fixtures/external/objects/validationObjects/',
  FIXTURE: 'fixture',
  FIXTURE_DEFINED_PATH:
    'Expected JSON data should be defined in fixtures/objects/validationObjects/',
  CUSTOM: 'custom',
  VALIDATION_FUNCTION: 'validationFunction',
  NOT_SUPPORTED: 'NOT_SUPPORTED',
  FIRST_PARTY_APPID: 'firstPartyAppId',
  GENERATE_HTML_REPORT: true,
  GETEVENTRESPONSE_ERROR_MSG: 'Received error: Requested listener not found',
  GLOBAL_API_OBJECT_LIST: 'apiObjectList',
  GLOBAL_EVENT_OBJECT_LIST: 'eventObjectList',
  HEALTH_CHECK_RETRIES: 'healthCheckRetries',
  HEXADECIMAL: 'hexaDecimal',
  HISTORY_VALIDATION_REQ: 'Lifecycle history validation ',
  ID: 'id',
  INPUT: 'INPUT',
  INTENT: 'intent',
  INVALID_LIFECYCLE_STATE_RESPONSE: 'Invalid lifecycle state response',
  INVALID_RESPONSE: 'Invalid response',
  INVALID_HISTORY_RESPONSE: 'App history response does not contain expected fields',
  IS_NOT_SUPPORTED_API: 'isNotSupportedApi',
  IS_RPC_ONLY: 'isRpcOnlyValidation',
  IS_SAME_APP_TRANSITION: 'isSameAppTransition',
  IS_SCENARIO_EXEMPTED: 'isScenarioExempted',
  JOBID: 'jobId',
  JSON_FILE_EXTENSION: '_CoreSuiteReport.json',
  JWT: 'jwt',
  LAUNCHAPP: 'launchApp',
  LATEST: 'latest',
  LEVEL_LIST: ['should', 'could'],
  LEVEL_MUST: ['must'],
  LIFECYCLE_APIS: {
    CLOSE: 'Lifecycle.close',
    FINISHED: 'Lifecycle.finished',
    HISTORY: 'Lifecycle.history',
    READY: 'Lifecycle.ready',
    SUSPEND: 'Lifecycle.suspend',
    UNSUSPEND: 'Lifecycle.unsuspend',
  },
  LIFECYCLE_APP_OBJECT_LIST: 'lifecycleAppObjectList',
  LIFECYCLE_CLOSE_TEST_TYPES: [
    'Profile',
    'Keyboard',
    'Parameters',
    'Discovery.Launch',
    'lifecycle',
    'AcknowledgeChallenge',
    'userGrants',
    'lifeCycleApi',
    'UserInterestProvider',
  ],
  LIFECYCLE_FINISHED_ERROR: 'lifecycleFinishedError',
  LIFECYCLE_HISTORY_FAILED: 'Failed to fetch lifecycle history due to following error: ',
  LIFECYCLE_HISTORY_RESPONSE: 'Lifecycle history response fetched from application: ',
  LIFECYCLE_HISTORY_SCHEMA_PATH: 'schemas/lifecycleHistorySchema',
  LIFECYCLE_INTENT: 'Lifecycle intent sent to application: ',
  LIFECYCLE_METHOD_LIST: ['Lifecycle.ready', 'Lifecycle.state', 'Lifecycle.close'],
  LIFECYCLE_NOTIFICATION_GENERATED: 'Lifecycle events generated ',
  LIFECYCLE_STATE: 'Lifecycle.state',
  LIFECYCLE_STATES: {
    FOREGROUND: 'foreground',
    BACKGROUND: 'background',
    INITIALIZING: 'initializing',
    INACTIVE: 'inactive',
    UNLOADING: 'unloading',
    UNLOADED: 'unloaded',
    SUSPENDED: 'suspended',
    TERMINATED: 'terminated',
  },
  LIFECYCLE_VALIDATION: 'lifecycle_validation',
  LIFECYCLE_VALIDATION_METHOD: 'Lifecycle.validation',
  LIMITADTRACKING_OFF: 'limitAdTrackingOFF',
  LIMITADTRACKING_ON: 'limitAdTrackingON',
  LISTENING: 'listening',
  LONGPOLL_TIMEOUT: 15000,
  MACADDRESS_PARAM: 'macaddress',
  MESSAGE_QUEUE: 'messageQueue',
  MESSAGE_QUEUE_SIZE: 100,
  MESSAGE_QUEUE_TIME_DIFF: 150000,
  METADATA: 'metadata',
  METADATA_FILE_PATH: '../../metaDataEnv.json',
  METHOD: 'method',
  METHOD_CONTENT: 'Method Content validation',
  METHOD_NAME: 'methodName',
  METHODS_TO_IGNORE_WHICH_HAS_SET: ['privacy.settings', 'securestorage.setForApp'],
  MFOS_base_url: 'MFOS_base_url',
  MISC: 'miscellaneous',
  MOCHAWESOME: 'mochawesome',
  MODE: 'mode',
  MODE_SDK: 'SDK',
  MODE_TRANSPORT: 'Transport',
  MODULEREQIDJSON: 'moduleReqIdJson',
  MODULES_PATH: 'cypress/fixtures/modules/',
  MODULE_NAMES: {
    DEVICE: 'device',
    ADVERTISING: 'advertising',
    PARAMETERS: 'parameters',
    LIFECYCLE: 'lifecycle',
    CAPABILITIES: 'capabilities',
    LIFECYCLEAPI: 'lifecycleapi',
    USERGRANTS: 'usergrants',
  },
  NEXT: 'next',
  NOTSUPPORTED: 'notSupported',
  NOTAVAILABLE: 'notAvailable',
  NOT_AVAILABLE: 'NOT_AVAILABLE',
  NOT_AVAILABLE_METHODS: 'NOT_AVAILABLE_METHODS',
  NOT_PERMITTED_METHODS: 'NOT_PERMITTED_METHODS',
  NOT_PERMITTED: 'NOT_PERMITTED',
  NOT_SUPPORTED_METHODS: 'NOT_SUPPORTED_METHODS',
  NO_API_OBJECT: 'Api Object Not Found',
  NO_APP_OR_EVENT_OBJECT: 'App or Event Object Not Found',
  NO_CONTENT: 'Expected Content Not found',
  NO_CONTEXT: 'noContext',
  NO_DATA: 'no data',
  NO_DATA_FOR_THE_KEY: 'Could not find the data for the passed key - ',
  NO_MATCHED_RESPONSE: 'Unable to find the response for the current request',
  NO_PARAMS: 'noParam',
  NO_RESPONSE: 'No_Response',
  NOTIFICATION_CONTENT_VALIDATION_REQ: 'Lifecycle notification content validation ',
  NOTIFICATION_EXISTS_REQ: 'Lifecycle notification exists ',
  NOTIFICATION_SCHEMA_VALIDATION_REQ: 'Lifecycle notification schema validation ',
  NULL: 'null',
  NULL_RESPONSE: null,
  NULL_CHECK: 'Null Check requirement SKIPPED as schema validation is PASSED. ',
  NUMBER: 'number',
  OPENRPC_ERROR_SCHEMA_PATH: 'schemas/errorSchema.json',
  OBJECT: 'object',
  OPTIONS: 'options',
  OVERRIDE: 'override',
  PARAMETERS_INITIALIZATION: 'parameters.initialization',
  PARAM: 'param',
  PARAMS: 'Params',
  PASS: 'PASS',
  PASSWORD: 'password',
  PLATFORM: 'Platform',
  PLATFORM_NOT_SUPPORT_LOG: 'Platform does not support method',
  PLATFORM_NOT_TRIGGER_EVENT: 'Platform MUST not trigger event ',
  PLATFORM_TRIGGER_EVENT: 'Platform MUST trigger event ',
  PLATFORM_RELEASE: 'Release',
  PARTNER: 'Partner',
  PRODUCT: 'Product',
  PREREQUISITE_DATA: 'PreRequisiteData.json',
  PUB_SUB_URL: 'pubSubUrl', // Env Var for the URL for the Default Module's pubSub implementation
  SETUPCHECK: 'Setup Check',
  SETUPVALUES: 'external/setupValues.json',
  SETUPVALUES_FILEPATH: 'cypress/fixtures/external/setupValues.json',
  PREVIOUS_TEST_TYPE: 'previousTestType',
  PROPOSED: 'proposed',
  PUBLISH: 'publish',
  PUBSUB_COMMUNINCATION_ERROR: 'pubSub communication error',
  QUEUE_RESPONSE: 'Recieved queue response',
  READFILEIFEXISTS: 'readFileIfExists',
  READ_FILES_FROM_DIRECTORY: 'readFilesFromDir',
  RECORD_TASK_TYPE_START: 'starts',
  REGEX: 'regEx',
  REPORT_COMMUNICATION_MODE: 'Communication Mode',
  REPORT_DATE: 'Date',
  REQUEST_OVERRIDE_CALLS: {
    SETRESPONSE: 'fcs.setResponse',
    CLEARLISTENER: 'fcs.clearEventListeners',
    SETTESTPROVIDER: 'fcs.setTestProvider',
    RECORD_LIFECYCLE_HISTORY: 'fcs.recordLifecycleHistory',
    SETPERFORMANCETESTHANDLER: 'performance.setPerformanceTestHandler',
    SETLIFECYCLESTATE: 'fcs.setLifecycleState',
    TRIGGEREVENT: 'fcs.triggerEvent',
    FETCH_EVENT_RESPONSE: 'fcs.fetchEventResponse',
    PERFORMANCE_THRESHOLD_VALIDATOR: 'performance.fetchPerformanceThreshold',
    CREATE_MARKER: 'performance.createMarker',
    UNLOADAPP: 'fcs.unloadApp',
  },
  PERFORMANCE_METRICS: 'performanceMetrics',
  RESPONSE: 'Response: ',
  RESPONSE_INVALID_RESPONSE_LOG:
    'Platform or App returned response in invalid format, which could lead to failures in validations. Response must be in JSON RPC format',
  RESPONSE_NOT_FOUND: 'No_Response',
  RESPONSE_STATUS: {
    OK: 'OK',
  },
  RESPONSE_TOPIC_LIST: 'responseTopicList',
  RESULT: 'result',
  RPC_ONLY_TIMEOUT: 200000,
  RUNTIME: 'runtime',
  SANITY_REPORT_FILENAME: 'fca_sanity_suite',
  SANITY_REPORT_FILE_PATH: getSanityReportPath(),
  SANITY_REPORT_LONGPOLL_TIMEOUT: 200000,
  SANITY_REPORT_POLLING_TIMEOUT: 'sanityReportPollingTimeout',
  SCENARIO_REQUIREMENTS: 'scenarioRequirements',
  SCHEMA_CHECK_SKIPPED:
    'Assertion for Schema validation is skipped since skipSchemaValidation flag is true',
  SCHEMA_ONLY: 'schemaOnly',
  SCHEMA_VALIDATION_CHECK: 'Schema validation Check',
  SCHEMA_VALIDATION_RESPONSE: 'schemaValidationResponse',
  SCHEMA_VALIDATION_STATUS: 'schemaValidationStatus',
  SCHEMA_VALIDATION_STATUS_CODE: ['PASS', 'FAIL', 'SKIPPED', 'PENDING'],
  SDK_VERSION: 'sdkVersion',
  SEARCH: 'search',
  SET: 'set',
  SET_APP_STATE: 'Application state set to ',
  SET_CONTENT: 'setContent',
  SET_LIFECYCLE_STATE_MISSING:
    'setLifecycleState function to send message to platform to set lifecycle state of application not implemented by underlying platform',
  SET_LIFECYCLE_STATE_REQUEST: 'Request sent to platform to set lifecycle state: ',
  SET_METHOD: 'setMethod',
  SET_VALIDATIONPATH: 'setValidationJsonPath',
  SEVEN_SECONDS_TIMEOUT: 7000,
  SKIPCONTENTVALIDATION: 'skipContentValidation',
  SKIPPED: 'SKIPPED',
  SOURCE: 'source',
  STATE_CONTENT_VALIDATION_REQ: ' Lifecycle state content validation ',
  STATE_SCHEMA_VALIDATION_REQ: ' Lifecycle state schema validation ',
  STATIC_CONTENT_VALIDATION: 'staticContentValidation',
  STATUS_CODE: [0, 1, 2, 3],
  STAY: 'stay',
  STEP_IMPLEMENTATION_MISSING: 'Step implementation missing',
  STRING: 'string',
  STRING_LANGUAGE_FORMAT: 'stringLanguageFormat',
  STRING_LOCALE_FORMAT: 'stringLocaleFormat',
  SUBSCRIBE: 'subscribe',
  SUPPORTED: 'supported',
  SUPPORTED_CALLTYPES: {
    FIREBOLTCALLS: 'fireboltCalls',
    FIREBOLTMOCKS: 'fireboltMocks',
    SET_RESPONSE_JSON: 'setResponseJson',
  },
  SUPPORTED_SDK: ['Firebolt'],
  TASK: {
    CALLLIFECYCLE: 'callLifecycle',
    CALLMETHOD: 'callMethod',
    REGISTEREVENT: 'registerEvent',
    GETEVENTRESPONSE: 'getEventResponse',
    GETMETHODRESPONSE: 'getMethodResponse',
    RUNTEST: 'runTest',
    HEALTHCHECK: 'healthCheck',
    STARTLIFECYCLERECORDING: 'startLifecycleRecording',
    STOPLIFECYCLERECORDING: 'stopLifecycleRecording',
    SETAPIRESPONSE: 'setApiResponse',
    CLEAREVENTHANDLER: 'clearEventHandler',
    PERFORMANCETESTHANDLER: 'performanceTestHandler',
    VISIBILITYSTATE: 'visibilityState',
    REGISTERPROVIDERHANDLER: 'registerProviderHandler',
  },
  TEST_TYPE: 'testType',
  THIRD_PARTY_APP: '3rd party app',
  THIRD_PARTY_APP_ID: 'default3rdPartyAppId',
  TIMEZONE: 'timeZone',
  TOPIC_PUBLISH_SUFFIX: '_FCS',
  TOPIC_SUBSCRIBE_SUFFIX: '_FCA',
  TRANSPORT: 'transport',
  TYPE_FUNCTION: 'function',
  TYPE_OBJECT: 'object',
  TYPE_STRING: 'string',
  UNDEFINED: 'undefined',
  UNIQUEID: 'uniqueid',
  UNLOADING_APP_TEST_TYPES: [
    'lifecycle',
    'Discovery.Launch',
    'Parameters',
    'userGrants',
    'lifeCycleApi',
  ],
  USER_EXIT_REASON: 'userExit',
  VALIDATIONJSONPATH: 'validationJsonPath',
  VERSION: 'version',
  WRITE_FAILED: 'Unable to write report json to file',
  WRITE_TO_FILE: 'writeToFile',
  CENSOR_DATA_PATH: 'censorData.json',
  IS_PERFORMANCE_METRICS_ENABLED: 'isPerformanceMetricsEnabled',
  INITIATED: 'initiated',
  STOPPED: 'stopped',
  START: 'start',
  STOP: 'stop',
  FIRST_PARTY_MOCK_USER: 'firstPartyMockUser',
  THIRD_PARTY_MOCK_USER: 'thirdPartyMockUser',
  HTTP: 'HTTP',
  STATE_METHOD: 'state/method/',
  NOT_SUPPORTED_CAPABILITIES_LIST: 'notSupportedCapabilitiesList',
  THRESHOLD_MONITOR_START_TIME: 'thresholdMonitorStartTime',
  PERFORMANCE_SERVICE_CALL_FAILED_MESSAGE: '`Failed to ${action} performance metrics service`',
  PERFORMANCE_METRICS_SUCCESS_MESSAGE: '`Performance metrics with action ${action} is successfull`',
  PERFORMANCE_METRICS_FAILURE_MESSAGE:
    '`Performance metrics with action ${action} is failed with error ${JSON.stringify(result.message)}`',
  CREATE_MARKER: 'createMarker',
  MODULE_OVERRIDES: ['fcs', 'performance'],
  COMBINEDDEFAULTTESTDATA: 'combinedDefaultTestData',
  CONFIG_DEFAULTTESTDATA_PATH: 'cypress/fixtures/external/defaultTestData.json',
  FCS_DEFAULTTESTDATA_PATH: 'cypress/fixtures/defaultTestData.json',
  ENV_SETUP_STATUS: 'environmentLaunched',
  APP_LAUNCH_STATUS: 'appLaunched',
  VISIBILITYSTATE_VALIDATION_REQ: ' Lifecycle visibility state validation ',
  LIFECYCLE_VISIBILITYSTATE_SKIP_MESSAGE:
    'App is not reachable to fetch visibility state. Skipping Visibility state validation.',
  VISIBILITYSTATE_FAILURE_FIX_LOG:
    ', How to fix: If the visibility state response is as per the platform, add the expected value in configModule. More details is present in footer',
  VISIBILITYSTATE_FAILURE_LOG:
    '. If the visibility state response is as per the platform, add the expected value in configModule. More details is present in footer',
  NO_EVENT_TRIGGERED: 'Expecting no event to be triggered from platform',
  REGISTERPROVIDER: 'registerprovider',
  USERINTERESTPROVIDER: 'userinterestprovider',
  VISIBILITYSTATE: 'visibilityState',
  VISIBLE_CHECK: 'visible_check',
  STEP_DEFINITION_NEEDS_TO_IMPLEMENT: 'Step definition needs to be implemented',
  SECONDARY_THIRD_PARTY_APP: 'secondary 3rd party app',
  SECONDARY_THIRD_PARTY_APP_ID: 'secondary3rdPartyAppId',
  SECONDARY_APPID_MISSING_ERROR:
    '`Unable to find the ${envAppIdKey} value in the env, please add the value in configModule/constants/config.json`',
  SET_EVENT_REQUEST: 'Request sent to set event values in platform: ',
  SET_EVENT_SUCCESS: 'Event value set successfully in platform',
};
function getSanityReportPath() {
  // Check if Cypress is defined, for cypress test context
  if (typeof Cypress !== 'undefined') {
    return `./reports/${Cypress.env('jobId')}/fca_sanity_suite.json`;
  }
  // If not in Cypress context, for jest unit test context
  return null;
}
