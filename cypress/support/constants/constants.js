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
  COMMUNICATION_MODE: 'communicationMode',
  CONFIG: 'CONFIG',
  CONTENT: 'Content',
  CONTEXT: 'Context',
  CONTEXT_FILE_PATH: 'cypress/fixtures/apiObjectContext.json',
  CORE: 'core',
  COUNTRYCODE: 'countryCode',
  CUCUMBER: 'cucumber',
  CURRENT_APP_ID: 'currentAppId',
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
  DEVICEMANIFESTDATA: 'deviceManifestData',
  DEVICEMODULEFORMAT: 'deviceModelFormat',
  DEVICE_AUDIO: 'device.audio',
  DEVICE_CONTENT_VALIDATION: 'deviceContentValidation',
  DEVICE_HDCP: 'device.hdcp',
  DEVICE_HDR: 'device.hdr',
  DEVICE_IP: 'deviceIp',
  DEVICE_MAC: 'deviceMac',
  DEVICE_MAC_UNAVAILABLE: 'Device MAC unavailable',
  DEVICE_RESOLUTION: 'DEVICERESOLUTION',
  DEVICE_SCREENRESOLUTION: 'device.screenResolution',
  DEVICE_VERSION: 'device.version',
  DEVICE_VIDEORESOLUTION: 'device.videoResolution',
  DISCOVERY_LAUNCH: 'discovery.launch',
  EMAIL: 'email',
  ENV_PLATFORM_SDK_VERSION: 'platformSdkVersion',
  ERROR: 'error',
  ERROR_CONTENT_JSON_PATH: 'objects/errorObjects/errorContent.json',
  ERROR_CONTENT_OBJECTS_PATH: 'cypress/fixtures/objects/errorObjects/errorContent.json',
  ERROR_EXPECTED: 'Expected response.error not to be null',
  ERROR_EXPECTED_DEFINED: 'Expected response.error to be defined',
  ERROR_EXPECTED_NULL: 'Expected response.error to be null',
  ERROR_INSIDE_RESULT_CHECK: 'Error inside Result check',
  ERROR_LIFECYCLE_STATE_VALIDATION: 'Lifecycle state validation failed due to following error - ',
  ERROR_LIST: ['Method not found', 'Method Not Implemented'],
  ERROR_NOT_UNDEFINED_CHECK: 'Error not undefined Check',
  ERROR_NULL_CHECK: 'Error null Check',
  ERROR_SCHEMA_OBJECTS_PATH: 'cypress/fixtures/objects/errorObjects/errorSchemaObject.json',
  ERROR_SCHEMA_SDK: 'errorSchemaSDK',
  ERROR_SCHEMA_TRANSPORT: 'errorSchemaTransport',
  EVENT: 'event',
  EVENT_ERROR_MSG: 'Event listener error validation',
  EVENT_LISTENER_RESPONSE: 'eventListenerResponse',
  EVENT_LISTENER_SCHEMA_RESULT: 'eventListenerSchemaResult',
  EVENT_NAME: 'eventName',
  EVENT_PARAM: 'event_param',
  EVENT_RESPONSE: 'eventResponse',
  EVENT_SCHEMA_MSG: 'Event listener schema validation',
  EVENT_SCHEMA_RESULT: 'eventSchemaResult',
  EXCEPTION_ERROR_OBJECT: 'exceptionErrorObject',
  EXCLUDED_METHODS: [],
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
  EXTERNAL_DEVICES_PATH: 'cypress/fixtures/external/devices/',
  EXTERNAL_MODULEREQID_PATH: 'cypress/fixtures/external/objects/moduleReqId/moduleReqId.json',
  EXTERNAL_PATH: 'cypress/fixtures/external/modules/',
  EXTERNAL_PREREQUISITE_DATA: './cypress/fixtures/external/PreRequisiteData.json',
  EXTRACTEDAPI_PATH: 'extractedApiObject.response.',
  FAIL: 'FAIL',
  FAILED_TO_PARSE_LIEFECYCLE_ERROR:
    'Failed to parse error object from response while setting lifecycle state. Response received : ',
  FAILED_TO_SET_LIFECYCLE_STATE:
    'Failed to set lifecycle state due to the following error received from platform: ',
  FCS: 'fcs',
  FCS_MODULEREQID_PATH: 'cypress/fixtures/objects/moduleReqId/moduleReqId.json',
  FCS_VALIDATION_JSON: 'fCSValidationjson',
  FIREBOLT: 'firebolt',
  FIREBOLTCALL: 'fireboltCall',
  FIREBOLTCALLS_FROM_CONFIGMODULE: './cypress/fixtures/external/',
  FIREBOLTCALLS_FROM_FCS: './cypress/fixtures/',
  FIREBOLTCONFIG: 'fireboltConfig',
  FIREBOLTMOCK: 'fireboltMock',
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
  HISTORY_VALIDATION_REQ: 'Lifecycle history validation Req # ',
  ID: 'id',
  INPUT: 'INPUT',
  INTENT: 'intent',
  INVALID_LIFECYCLE_STATE_RESPONSE: 'Invalid lifecycle state response',
  INVALID_RESPONSE: 'Invalid response',
  INVALID_HISTORY_RESPONSE: 'App history response does not contain expected fields',
  IS_NOT_SUPPORTED_API: 'isNotSupportedApi',
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
  ],
  LIFECYCLE_FINISHED_ERROR: 'lifecycleFinishedError',
  LIFECYCLE_HISTORY_FAILED: 'Failed to fetch lifecycle history due to following error: ',
  LIFECYCLE_HISTORY_RESPONSE: 'Lifecycle history response fetched from application: ',
  LIFECYCLE_HISTORY_SCHEMA_PATH: 'schemas/lifecycleHistorySchema',
  LIFECYCLE_INTENT: 'Lifecycle intent sent to application: ',
  LIFECYCLE_NOTIFICATION_GENERATED: 'Lifecycle events generated Req #',
  LIFECYCLE_NOTIFICATION_NOT_GENERATED: 'Lifecycle events not generated',
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
  LONGPOLL_TIMEOUT: 15000,
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
  NOTIFICATION_CONTENT_VALIDATION_REQ: 'Lifecycle notification content validation Req # ',
  NOTIFICATION_EXISTS_REQ: 'Lifecycle notification exists Req # ',
  NOTIFICATION_SCHEMA_VALIDATION_REQ: 'Lifecycle notification schema validation Req # ',
  NULL: 'null',
  NULL_CHECK: 'Null Check requirement SKIPPED as schema validation is PASSED. ',
  NULL_RESPONSE: 'NULL',
  NUMBER: 'number',
  OPENRPC_ERROR_SCHEMA_PATH: 'schemas/errorSchema.json',
  OBJECT: 'object',
  OPTIONS: 'options',
  PARAMETERS_INITIALIZATION: 'parameters.initialization',
  PARAMS: 'Params',
  PASS: 'PASS',
  PASSWORD: 'password',
  PLATFORM_INVALID_RESPONSE_LOG:
    'Platform returned response in invalid format, which could lead to failures in validations. Response must be an object',
  PLATFORM_NOT_SUPPORT_LOG: 'Platform does not support method',
  PREREQUISITE_DATA: 'PreRequisiteData.json',
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
    FETCH_EVENT_RESPONSE: 'fcs.fetchEventResponse',
    PERFORMANCE_THRESHOLD_VALIDATOR: 'performance.fetchPerformanceThreshold',
    CREATE_MARKER: 'performance.createMarker',
  },
  PERFORMANCE_METRICS: 'performanceMetrics',
  RESPONSE: 'Response: ',
  RESPONSE_NOT_FOUND: 'No_Response',
  RESPONSE_STATUS: {
    OK: 'OK',
  },
  RESPONSE_TOPIC_LIST: 'responseTopicList',
  RESULT: 'result',
  SANITY_REPORT_FILENAME: 'fca_sanity_suite',
  SANITY_REPORT_FILE_PATH: getSanityReportPath(),
  SANITY_REPORT_LONGPOLL_TIMEOUT: 200000,
  SANITY_REPORT_POLLING_TIMEOUT: 'sanityReportPollingTimeout',
  SCENARIO_REQUIREMENTS: 'scenarioRequirements',
  SCHEMA_CHECK_SKIPPED:
    'Assertion for Schema validation is skipped since skipSchemaValidation flag is true',
  SCHEMA_VALIDATION_CHECK: 'Schema validation Check',
  SCHEMA_VALIDATION_RESPONSE: 'schemaValidationResponse',
  SCHEMA_VALIDATION_STATUS: 'schemaValidationStatus',
  SCHEMA_VALIDATION_STATUS_CODE: ['PASS', 'FAIL', 'SKIPPED', 'PENDING'],
  SEARCH: 'search',
  SET_APP_STATE: 'Application state set to ',
  SET_LIFECYCLE_STATE_MISSING:
    'setLifecycleState function to send message to platform to set lifecycle state of application not implemented by underlying platform',
  SET_LIFECYCLE_STATE_REQUEST: 'Request sent to platform to set lifecycle state: ',
  SEVEN_SECONDS_TIMEOUT: 7000,
  SKIPCONTENTVALIDATION: 'skipContentValidation',
  SKIPPED: 'SKIPPED',
  SOURCE: 'source',
  STATE_CONTENT_VALIDATION_REQ: 'Lifecycle state content validation Req # ',
  STATE_SCHEMA_VALIDATION_REQ: 'Lifecycle state schema validation Req #',
  STATIC_CONTENT_VALIDATION: 'staticContentValidation',
  STATUS_CODE: [0, 1, 2, 3],
  STAY: 'stay',
  STEP_IMPLEMENTATION_MISSING: 'Step implementation missing',
  STRING: 'string',
  STRING_LANGUAGE_FORMAT: 'stringLanguageFormat',
  STRING_LOCALE_FORMAT: 'stringLocaleFormat',
  SUBSCRIBE: 'subscribe',
  SUPPORTED: 'supported',
  SUPPORTED_CALLTYPES: { FIREBOLTCALLS: 'fireboltCalls', FIREBOLTMOCKS: 'fireboltMocks' },
  SUPPORTED_SDK: ['Firebolt'],
  TASK: {
    CALLLIFECYCLE: 'callLifecycle',
    CALLMETHOD: 'callMethod',
    REGISTEREVENT: 'registerEvent',
    GETEVENTRESPONSE: 'getEventResponse',
    RUNTEST: 'runTest',
    HEALTHCHECK: 'healthCheck',
    STARTLIFECYCLERECORDING: 'startLifecycleRecording',
    STOPLIFECYCLERECORDING: 'stopLifecycleRecording',
    SETAPIRESPONSE: 'setApiResponse',
    CLEAREVENTHANDLER: 'clearEventHandler',
    PERFORMANCETESTHANDLER: 'performanceTestHandler',
  },
  TEST_HANDLER_DATA_UNDEFINED: 'Expected parsed data from fixtures to be defined',
  TEST_DATA_HANDLER_REQUESTTYPE: ['Params', 'Context', 'Content', 'beforeOperation'],
  TEST_TYPE: 'testType',
  THIRD_PARTY_APP: '3rd party app',
  THIRD_PARTY_APP_ID: 'default3rdPartyAppId',
  TIMEZONE: 'timeZone',
  TOPIC_PUBLISH_SUFFIX: '_FCS',
  TOPIC_SUBSCRIBE_SUFFIX: '_FCA',
  TRANSPORT: 'transport',
  TYPE_OBJECT: 'object',
  TYPE_STRING: 'string',
  UNIQUEID: 'uniqueid',
  UNLOADING_APP_TEST_TYPES: [
    'lifecycle',
    'Discovery.Launch',
    'Parameters',
    'userGrants',
    'lifeCycleApi',
  ],
  USER_EXIT_REASON: 'userExit',
  VERSION: 'version',
  WRITE_FAILED: 'Unable to write report json to file',
  WRITE_TO_FILE: 'writeToFile',
  CENSOR_DATA_PATH: 'censorData.json',
  IS_PERFORMANCE_METRICS_ENABLED: 'isPerformanceMetricsEnabled',
  INITIATED: 'initiated',
  STOPPED: 'stopped',
  START: 'start',
  STOP: 'stop',
  FIRST_PARTY_MOCK_USER: 'firstPartyUserId',
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
  CONFIG_DEFAULTTESTDATA_PATH: './cypress/fixtures/external/defaultTestData.json',
  FCS_DEFAULTTESTDATA_PATH: './cypress/fixtures/defaultTestData.json',
  ENV_SETUP_STATUS: 'environmentLaunched',
  APP_LAUNCH_STATUS: 'appLaunched',
  NO_EVENT_TRIGGERED: 'Expecting no event to be triggered from platform',
};
function getSanityReportPath() {
  // Check if Cypress is defined, for cypress test context
  if (typeof Cypress !== 'undefined') {
    return `./reports/${Cypress.env('jobId')}/fca_sanity_suite.json`;
  }
  // If not in Cypress context, for jest unit test context
  return null;
}
