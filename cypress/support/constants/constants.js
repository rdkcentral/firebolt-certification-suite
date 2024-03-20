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
  ALLOWED_STATE_TRANSITION_OBJECT_LOCATION: 'objects/lifecycleAppObject.json',
  ALPHANUMERIC: 'alphanumeric',
  API_NAME: 'apiName',
  API_VERSION: 'apiVersion',
  APP_HISTORY_EMPTY: 'App history is empty',
  APP_ID: 'appId',
  APP_LIFECYCLE_HISTORY: 'appLifeCycleHistory',
  APP_TRANSPORT_UNAVAILABLE: 'App Transport unavailable',
  APP_TYPE: 'appType',
  ARRAY: 'array',
  ASYNCHRONOUS: 'asynchronous',
  BASE64: 'base64',
  BEFORE_OPERATION: 'beforeOperation',
  BEFORE_OPERATION_TAGS: 'beforeOperationTags',
  BOOLEAN: 'boolean',
  CAPABILITIES_INFO: 'capabilities.info',
  CAPABILITIES_PERMITTED: 'capabilities.permitted',
  CAPABILITIES_REQUEST: 'capabilities.request',
  CAPABILITIES_SUPPORTED: 'capabilities.supported',
  CERTIFICATION: 'certification',
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
  ERROR_LIST: ['Method not found', 'Method Not Implemented'],
  ERROR_NOT_UNDEFINED_CHECK: 'Error not undefined Check',
  ERROR_NULL_CHECK: 'Error null Check',
  ERROR_SCHEMA_OBJECTS_PATH: 'cypress/fixtures/objects/errorObjects/errorSchemaObject.json',
  EVENT: 'event',
  EVENT_ERROR_MSG: 'Event listener error validation',
  EVENT_LISTENER_SCHEMA_RESULT: 'eventListenerSchemaResult',
  EVENT_NAME: 'eventName',
  EVENT_PARAM: 'event_param',
  EVENT_SCHEMA_MSG: 'Event listener schema validation',
  EVENT_SCHEMA_RESULT: 'eventSchemaResult',
  EXCLUDED_METHODS: [],
  EXCLUDED_MODULES: [],
  EXCLUDED_VALUES: [null, undefined],
  EXECUTE_SHELL: 'executeShell',
  EXPECTED_ERROR_RESPONSE: 'Expected error in response:',
  EXTERNAL_DEVICES_PATH: 'cypress/fixtures/external/devices/',
  EXTERNAL_MODULEREQID_PATH: 'cypress/fixtures/external/moduleReqId/moduleReqId.json',
  EXTERNAL_PATH: 'cypress/fixtures/external/modules/',
  EXTERNAL_PREREQUISITE_DATA: './cypress/fixtures/external/PreRequisiteData.json',
  EXTRACTEDAPI_PATH: 'extractedApiObject.response.',
  FAIL: 'FAIL',
  FAILED_TO_PARSE_LIEFECYCLE_ERROR:
    'Failed to parse error object from response while setting lifecycle state',
  FAILED_TO_SET_LIFECYCLE_STATE:
    'Failed to set lifecycle state due to the following error received from platform: ',
  FCS: 'fcs',
  FCS_MODULEREQID_PATH: 'cypress/fixtures/objects/moduleReqId/moduleReqId.json',
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
  ID: 'id',
  INPUT: 'INPUT',
  INTENT: 'intent',
  INVALID_RESPONSE: 'Invalid response',
  IS_NOT_SUPPORTED_API: 'isNotSupportedApi',
  IS_SCENARIO_EXEMPTED: 'isScenarioExempted',
  JOBID: 'jobId',
  JSON_FILE_EXTENSION: '_CoreSuiteReport.json',
  JWT: 'jwt',
  LAUNCHAPP: 'launchApp',
  LATEST: 'latest',
  LEVEL_LIST: ['should,could'],
  LEVEL_MUST: ['must'],
  LIFECYCLE_APIS: {
    READY: 'Lifecycle.ready',
    CLOSE: 'Lifecycle.close',
    HISTORY: 'Lifecycle.history',
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
  LIFECYCLE_HISTORY_SCHEMA_PATH: 'schemas/lifecycleHistorySchema',
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
  LIFECYCLE_STATE_SET_SUCCESS: 'Lifecycle state successfully set to ',
  LIFECYCLE_VALIDATION: 'lifecycle_validation',
  LIFECYCLE_VALIDATION_METHOD: 'Lifecycle.validation',
  LIMITADTRACKING_OFF: 'limitAdTrackingOFF',
  LIMITADTRACKING_ON: 'limitAdTrackingON',
  LOGGER_LEVEL: 'debug',
  LONGPOLL_TIMEOUT: 15000,
  MESSAGE_QUEUE: 'messageQueue',
  MESSAGE_QUEUE_SIZE: 100,
  MESSAGE_QUEUE_TIME_DIFF: 150000,
  METADATA: 'metadata',
  METADATA_FILE_PATH: '../../metaDataEnv.json',
  METHOD: 'method',
  METHOD_CONTENT: 'Method Content validation',
  METHOD_NAME: 'methodName',
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
  },
  NEXT: 'next',
  NOTSUPPORTED: 'notSupported',
  NOT_AVAILABLE: 'notAvailable',
  NOT_SUPPORTED_METHODS: 'NOT_SUPPORTED_METHODS',
  NO_API_OBJECT: 'Api Object Not Found',
  NO_APP_OR_EVENT_OBJECT: 'App or Event Object Not Found',
  NO_CONTENT: 'Expected Content Not found',
  NO_CONTEXT: 'noContext',
  NO_DATA: 'no data',
  NO_MATCHED_RESPONSE: 'Unable to find the response for the current request',
  NO_PARAMS: 'noParam',
  NO_RESPONSE: 'No_Response',
  NULL_CHECK: 'Null Check requirement SKIPPED as schema validation is PASSED',
  NUMBER: 'number',
  OBJECT: 'object',
  OPTIONS: 'options',
  PARAMETERS_INITIALIZATION: 'parameters.initialization',
  PARAMS: 'Params',
  PASS: 'PASS',
  PASSWORD: 'password',
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
    SETPERFORMANCETESTHANDLER: 'fcs.setPerformanceTestHandler',
    SETLIFECYCLESTATE: 'fcs.setLifecycleState',
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
  SCHEMA_CHECK_SKIPPED:
    'Assertion for Schema validation is skipped since skipSchemaValidation flag is true',
  SCHEMA_VALIDATION_CHECK: 'Schema validation Check',
  SCHEMA_VALIDATION_RESPONSE: 'schemaValidationResponse',
  SCHEMA_VALIDATION_STATUS_CODE: ['PASS', 'FAIL', 'SKIPPED', 'PENDING'],
  SEARCH: 'search',
  SEVEN_SECONDS_TIMEOUT: 7000,
  SKIPCONTENTVALIDATION: 'skipContentValidation',
  SKIPPED: 'SKIPPED',
  SOURCE: 'source',
  STATIC_CONTENT_VALIDATION: 'staticContentValidation',
  STATUS_CODE: [0, 1, 2, 3],
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
  START: 'start',
  STOP: 'stop',
  FIRST_PARTY_MOCK_USER: 'firstPartyUserId',
  THIRD_PARTY_MOCK_USER: 'thirdPartyMockUser',
  HTTP: 'HTTP',
  STATE_METHOD: 'state/method/',
};
function getSanityReportPath() {
  // Check if Cypress is defined, for cypress test context
  if (typeof Cypress !== 'undefined') {
    return `./reports/${Cypress.env('jobId')}/fca_sanity_suite.json`;
  }
  // If not in Cypress context, for jest unit test context
  return null;
}
