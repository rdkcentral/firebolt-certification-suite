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
const errorContent = require('../objects/errorContentObjects.js');

exports.METRICS_VARIABLES = {
  FOO_DATA_AND_SCHEMA: {
    schema: 'http://meta.rdkcentral.com/some/schema',
    data: {
      foo: 'foo',
    },
  },
  NULL_FOO_DATA_AND_SCHEMA: {
    schema: 'http://meta.rdkcentral.com/some/schema',
    data: {
      foo: null,
    },
  },
  BOOLEAN_FOO_DATA_AND_SCHEMA: {
    schema: 'http://meta.rdkcentral.com/some/schema',
    data: {
      foo: true,
    },
  },
  EMPTY_DATA_OBJECT: {
    schema: 'http://meta.rdkcentral.com/some/schema',
    data: {},
  },
  emptyObject: {},
  entityId: { entityId: '345' },
  pageId: { pageId: 'home' },
  userMetrics: { category: 'user', type: 'The user did foo' },
  appMetrics: { category: 'app', type: 'The user did foo' },
  parametersMetrics_as_string: {
    category: 'app',
    type: 'The user did foo',
    parameters: { value: 'test' },
  },
  parametersMetrics_as_boolean: {
    category: 'app',
    type: 'The user did foo',
    parameters: { value: true },
  },
  parametersMetrics_as_number: {
    category: 'app',
    type: 'The user did foo',
    parameters: { value: 123 },
  },
  parametersMetrics: {
    category: 'app',
    type: 'The user did foo',
    parameters: {
      appname: 'testing',
      env: 'prod',
      filter: false,
      'in-home': true,
      totalDuration: 6600,
    },
  },
  mediaStalled: {
    type: 'media',
    code: 'MEDIA-STALLED',
    description: 'playback stalled',
    visible: true,
  },
  mediaStalled_parameter: {
    type: 'media',
    code: 'MEDIA-STALLED',
    description: 'playback stalled',
    visible: true,
    parameters: {
      appname: 'testing',
      env: 'prod',
      filter: false,
      'in-home': true,
      totalDuration: 6600,
    },
  },
  mediaStalled_parameter_as_number: {
    type: 'media',
    code: 'MEDIA-STALLED',
    description: 'playback stalled',
    visible: true,
    parameters: { value: 123 },
  },
  mediaStalled_parameter_as_boolean: {
    type: 'media',
    code: 'MEDIA-STALLED',
    description: 'playback stalled',
    visible: true,
    parameters: { value: true },
  },
  mediaStalled_parameter_as_string: {
    type: 'media',
    code: 'MEDIA-STALLED',
    description: 'playback stalled',
    visible: true,
    parameters: { value: 'test' },
  },
  mediaWaiting_entityId: { entityId: '1234' },
  mediaProgress: { entityId: '345', progress: 0.75 },
  mediaSeeking: { entityId: '345', target: 0.5 },
  mediaSeeked: { entityId: '345', position: 0.51 },
  playbackRate: { entityId: '345', rate: 2 },
  bitrateProfile: { entityId: '345', bitrate: 5000, width: 1920, height: 1080, profile: 'HDR+' },
  appBuild: { build: '1.2.2' },
};
exports.INTERNAL_INITIALIZATION = {
  version: {
    major: 0,
    minor: 13,
    patch: 0,
    readable: 'Firebolt Core FEE 0.13.0',
  },
};
exports.INITIALIZE_SESSION = {
  method: 'internal.initialize',
  params: {
    version: {
      major: 0,
      minor: 13,
      patch: 0,
      readable: 'Firebolt Core SDK 0.13.0',
    },
  },
};
exports.STATIC_METRICS_VARIABLES = {
  SCHEMA_AS_BOOLEAN: { schema: true, data: { foo: 'foo' } },
  SCHEMA_AS_INTEGER: { schema: 123, data: { foo: 'foo' } },
  SCHEMA_AS_INVALID_URI: { schema: 'testing', data: { foo: 'foo' } },
  DATA_AS_STRING: { schema: 'testing', data: 'foo' },
  DATA_AS_BOOLEAN: { schema: '', data: true },
  DATA_AS_INTEGER: { schema: '', data: 123 },
  SCHEMA_AS_EMPTY: {
    schema: '',
    data: {
      foo: 'foo',
    },
  },

  ACTION_TYPE_NULL: { category: 'user' },
  ACTION_TYPE_256: {
    category: 'app',
    type: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  },
  ACTION_DFRNT_CATEGORY: { category: 'test', type: 'The user did foo' },
  ACTION_PARAMETERS_METRICS_NESTED_OBJECT_ERROR: {
    category: 'app',
    type: 'The user did foo',
    parameters: {
      value1: 'test1',
      value2: {
        appname: 'testing',
        env: 'prod',
        filter: false,
        'in-home': true,
        totalDuration: 6600,
      },
    },
  },
  PAGEID_ERROR: { pageId: 12 },
  ACTION_USERMETRICS_ERROR: { category: 12, type: 'abcd' },
  ACTION_TYPEMETRICS_ERROR: { category: 'app', type: 123 },
  ACTION_PARAMETERS_METRICS_ERROR: { category: 'app', type: 'The user did foo', parameters: 123 },
  ERROR_TYPE_ERROR: {
    type: 123,
    code: 'MEDIA-STALLED',
    description: 'playback stalled',
    visible: true,
  },
  ERROR_TYPE_STRING_ERROR: {
    type: 'abc',
    code: 'MEDIA-STALLED',
    description: 'playback stalled',
    visible: true,
  },
  ERROR_CODE_ERROR: { type: 'media', code: 123, description: 'playback stalled', visible: true },
  ERROR_DESC_ERROR: { type: 'media', code: 'MEDIA-STALLED', description: 123, visible: true },
  ERROR_VISIBLE_ERROR: {
    type: 'media',
    code: 'MEDIA-STALLED',
    description: 'playback stalled',
    visible: 123,
  },
  ERROR_PARAM_ERROR: {
    type: 'media',
    code: 'MEDIA-STALLED',
    description: 'playback stalled',
    visible: true,
    parameters: 123,
  },
  MEDIAPROGRESS_ERROR: { entityId: 123, progress: 0.75 },
  MEDIAPROGRESS_PROGRESS_ERROR: { entityId: '345', progress: 'abc' },
  MEDIAPROGRESS_INVALID_PROGRESS_ERROR: { entityId: '345', progress: 100000 },
  MEDIAPROGRESS_DECIMAL_PROGRESS_ERROR: { entityId: '345', progress: 1.5 },
  MEDIASEEKING_ENTITYID_ERROR: { entityId: 123, target: 0.5 },
  MEDIASEEKING_DECIMAL_TARGET_ERROR: { entityId: '345', target: 1.5 },
  MEDIASEEKING_INVALID_TARGET_ERROR: { entityId: '345', target: 100000 },
  MEDIASEEKING_STRING_TARGET_ERROR: { entityId: '345', target: 'abc' },
  MEDIASEEKED_ERROR: { entityId: 123, position: 0.51 },
  MEDIASEEKED_INVALID_POSITION_ERROR: { entityId: 123, position: 100000 },
  MEDIASEEKED_STRING_POSITION_ERROR: { entityId: 123, position: 'abc' },
  MEDIASEEKED_DECIMAL_POSITION_ERROR: { entityId: 123, position: 1.5 },
  MEDIARATECHANGE_ERROR: { entityId: 123, rate: 2 },
  MEDIARATECHANGE_WITH_STRING_RATE_ERROR: { entityId: '345', rate: 'abc' },
  MEDIARENDITIONCHANGE_ERROR: {
    entityId: 12,
    bitrate: '5000',
    width: '1920',
    height: 1080,
    profile: 12,
  },
  INTEGER_12: { value: 12 },
  ERROR_PARAM_NESTED_OBJECT_ERROR: {
    type: 'media',
    code: 'MEDIA-STALLED',
    description: 'playback stalled',
    visible: true,
    parameters: {
      value1: 'test1',
      value2: {
        appname: 'testing',
        env: 'prod',
        filter: false,
        'in-home': true,
        totalDuration: 6600,
      },
    },
  },
};
exports.CONTENT_FOR_INTERNAL_INITIALIZE = {
  method: 'internal.initialize',
  validationJsonPath: 'result',
  content: this.INTERNAL_INITIALIZATION,
};
exports.SEND_METRICS_EVENT_WITH_SCHEMA_AS_BOOLEAN = {
  method: 'manage_metrics.event',
  params: this.STATIC_METRICS_VARIABLES.SCHEMA_AS_BOOLEAN,
  expected: 'error',
};
exports.SEND_METRICS_EVENT_WITH_SCHEMA_AS_INTEGER = {
  method: 'manage_metrics.event',
  params: this.STATIC_METRICS_VARIABLES.SCHEMA_AS_INTEGER,
  expected: 'error',
};
exports.SEND_METRICS_EVENT_WITH_INVALID_SCHEMA_URI = {
  method: 'manage_metrics.event',
  params: this.STATIC_METRICS_VARIABLES.SCHEMA_AS_INVALID_URI,
  expected: 'error',
};
exports.SEND_METRICS_EVENT_WITH_DATA_AS_STRING = {
  method: 'manage_metrics.event',
  params: this.STATIC_METRICS_VARIABLES.DATA_AS_STRING,
  expected: 'error',
};
exports.SEND_METRICS_EVENT_WITH_DATA_AS_BOOLEAN = {
  method: 'manage_metrics.event',
  params: this.STATIC_METRICS_VARIABLES.DATA_AS_BOOLEAN,
  expected: 'error',
};
exports.SEND_METRICS_EVENT_WITH_DATA_AS_INTEGER = {
  method: 'manage_metrics.event',
  params: this.STATIC_METRICS_VARIABLES.DATA_AS_INTEGER,
  expected: 'error',
};
exports.SEND_METRICS_EVENT_WITH_SCHEMA_AS_EMPTY = {
  method: 'manage_metrics.event',
  params: this.STATIC_METRICS_VARIABLES.SCHEMA_AS_EMPTY,
  expected: 'error',
};
exports.INVALID_PARAMS_FOR_METRICS_EVENT = {
  method: 'metrics.event',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};

exports.NOTIFY_THAT_PAGE_HAS_NAVIGATED_WITH_EMPTY_PARAMETER = {
  method: 'metrics.page',
  params: {},
  expected: 'error',
};
exports.NOTIFY_ABOUT_ACTION_WITH_EMPTY_PARAMETER = {
  method: 'metrics.action',
  params: {},
  expected: 'error',
};
exports.NOTIFY_ABOUT_ACTION_WITH_TYPE_NULL = {
  method: 'metrics.action',
  params: this.STATIC_METRICS_VARIABLES.ACTION_TYPE_NULL,
  expected: 'error',
};
exports.NOTIFY_ABOUT_ACTION_WITH_TYPE_MAXLENGTH_256 = {
  method: 'metrics.action',
  params: this.STATIC_METRICS_VARIABLES.ACTION_TYPE_256,
  expected: 'error',
};
exports.NOTIFY_ABOUT_ACTION_WITH_DIFFERENT_CATEGORY = {
  method: 'metrics.action',
  params: this.STATIC_METRICS_VARIABLES.ACTION_DFRNT_CATEGORY,
  expected: 'error',
};
exports.NOTIFY_THAT_ERROR_HAS_OCCURED_WITH_EMPTY_PARAMETER = {
  method: 'metrics.error',
  params: {},
  expected: 'error',
};
exports.INFER_LOAD_TIME_WITH_EMPTY_PARAMETER = {
  method: 'metrics.mediaLoadStart',
  params: {},
  expected: 'error',
};
exports.START_PLAYBACK_WITH_EMPTY_PARAMETER = {
  method: 'metrics.mediaPlay',
  params: {},
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_HAS_STARTED_WITH_EMPTY_PARAMETER = {
  method: 'metrics.mediaPlaying',
  params: {},
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_HAS_PAUSED_WITH_EMPTY_PARAMETER = {
  method: 'metrics.mediaPause',
  params: {},
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_HAS_HALTED_WITH_EMPTY_PARAMETER = {
  method: 'metrics.mediaWaiting',
  params: {},
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_IS_PROGRESSING_WITH_EMPTY_PARAMETER = {
  method: 'metrics.mediaProgress',
  params: {},
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_SEEK_IS_INITIATED_WITH_EMPTY_PARAMETER = {
  method: 'metrics.mediaSeeking',
  params: {},
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_SEEK_IS_COMPLETED_WITH_EMPTY_PARAMETER = {
  method: 'metrics.mediaSeeked',
  params: {},
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_RATE_IS_CHANGED_WITH_EMPTY_PARAMETER = {
  method: 'metrics.mediaRateChange',
  params: {},
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_RENDITION_IS_CHANGED_WITH_EMPTY_PARAMETER = {
  method: 'metrics.mediaRenditionChange',
  params: {},
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_HAS_STOPPED_WITH_EMPTY_PARAMETER = {
  method: 'metrics.mediaEnded',
  params: {},
  expected: 'error',
};
exports.INVALID_PARAMS_FOR_METRICS_STARTCONTENT = {
  method: 'metrics.startContent',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_STOPCONTENT = {
  method: 'metrics.stopContent',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_PAGE = {
  method: 'metrics.page',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_ACTION = {
  method: 'metrics.action',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_ERROR = {
  method: 'metrics.error',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_MEDIALOADSTART = {
  method: 'metrics.mediaLoadStart',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_MEDIAPLAY = {
  method: 'metrics.mediaPlay',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_MEDIAPLAYING = {
  method: 'metrics.mediaPlaying',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_MEDIAPAUSE = {
  method: 'metrics.mediaPause',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_MEDIAWAITING = {
  method: 'metrics.mediaWaiting',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_MEDIAPROGRESS = {
  method: 'metrics.mediaProgress',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_MEDIASEEKING = {
  method: 'metrics.mediaSeeking',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_MEDIASEEKED = {
  method: 'metrics.mediaSeeked',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_MEDIARATECHANGE = {
  method: 'metrics.mediaRateChange',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_MEDIARENDITIONCHANGE = {
  method: 'metrics.mediaRenditionChange',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.NOTIFY_THAT_CONTENT_HAS_STARTED_WITH_NUMERIC_ENTITYID = {
  method: 'metrics.startContent',
  params: this.STATIC_METRICS_VARIABLES.INTEGER_12,
  expected: 'error',
};
exports.NOTIFY_THAT_CONTENT_HAS_STOPPED_WITH_NUMERIC_ENTITYID = {
  method: 'metrics.stopContent',
  params: this.STATIC_METRICS_VARIABLES.INTEGER_12,
  expected: 'error',
};
exports.NOTIFY_THAT_PAGE_HAS_NAVIGATED_WITH_NUMERIC_PAGEID = {
  method: 'metrics.page',
  params: this.STATIC_METRICS_VARIABLES.PAGEID_ERROR,
  expected: 'error',
};
exports.NOTIFY_ABOUT_ACTION_WITH_NUMERIC_USERMETRICS = {
  method: 'metrics.action',
  params: this.STATIC_METRICS_VARIABLES.ACTION_USERMETRICS_ERROR,
  expected: 'error',
};
exports.NOTIFY_ABOUT_ACTION_WITH_NUMERIC_APPMETRICS = {
  method: 'metrics.action',
  params: this.STATIC_METRICS_VARIABLES.ACTION_USERMETRICS_ERROR,
  expected: 'error',
};
exports.NOTIFY_ABOUT_ACTION_WITH_NUMERIC_TYPEMETRICS = {
  method: 'metrics.action',
  params: this.STATIC_METRICS_VARIABLES.ACTION_TYPEMETRICS_ERROR,
  expected: 'error',
};
exports.NOTIFY_ABOUT_ACTION_WITH_NUMERIC_PARAMMETRICS = {
  method: 'metrics.action',
  params: this.STATIC_METRICS_VARIABLES.ACTION_PARAMETERS_METRICS_ERROR,
  expected: 'error',
};
exports.NOTIFY_ABOUT_ACTION_WITH_PARAMMETRICS_FOR_NESTED_OBJECT = {
  method: 'metrics.action',
  params: this.STATIC_METRICS_VARIABLES.ACTION_PARAMETERS_METRICS_NESTED_OBJECT_ERROR,
  expected: 'error',
};
exports.NOTIFY_THAT_ERROR_HAS_OCCURED_WITH_NUMERIC_TYPE = {
  method: 'metrics.error',
  params: this.STATIC_METRICS_VARIABLES.ERROR_TYPE_ERROR,
  expected: 'error',
};
exports.NOTIFY_THAT_ERROR_HAS_OCCURED_WITH_STRING_TYPE = {
  method: 'metrics.error',
  params: this.STATIC_METRICS_VARIABLES.ERROR_TYPE_STRING_ERROR,
  expected: 'error',
};
exports.NOTIFY_THAT_ERROR_HAS_OCCURED_WITH_NUMERIC_CODE = {
  method: 'metrics.error',
  params: this.STATIC_METRICS_VARIABLES.ERROR_CODE_ERROR,
  expected: 'error',
};
exports.NOTIFY_THAT_ERROR_HAS_OCCURED_WITH_NUMERIC_DESCRIPTION = {
  method: 'metrics.error',
  params: this.STATIC_METRICS_VARIABLES.ERROR_DESC_ERROR,
  expected: 'error',
};
exports.NOTIFY_THAT_ERROR_HAS_OCCURED_WITH_NUMERIC_VISIBLE = {
  method: 'metrics.error',
  params: this.STATIC_METRICS_VARIABLES.ERROR_VISIBLE_ERROR,
  expected: 'error',
};
exports.NOTIFY_THAT_ERROR_HAS_OCCURED_WITH_NUMERIC_PARAMETERS = {
  method: 'metrics.error',
  params: this.STATIC_METRICS_VARIABLES.ERROR_PARAM_ERROR,
  expected: 'error',
};
exports.NOTIFY_THAT_ERROR_HAS_OCCURED_WITH_PARAMETERS_FOR_NESTED_OBJECT = {
  method: 'metrics.error',
  params: this.STATIC_METRICS_VARIABLES.ERROR_PARAM_NESTED_OBJECT_ERROR,
  expected: 'error',
};
exports.INFER_LOAD_TIME_WITH_NUMERIC_ENTITYID = {
  method: 'metrics.mediaLoadStart',
  params: this.STATIC_METRICS_VARIABLES.INTEGER_12,
  expected: 'error',
};
exports.START_PLAYBACK_WITH_NUMERIC_ENTITYID = {
  method: 'metrics.mediaPlay',
  params: this.STATIC_METRICS_VARIABLES.INTEGER_12,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_HAS_STARTED_WITH_NUMERIC_ENTITYID = {
  method: 'metrics.mediaPlaying',
  params: this.STATIC_METRICS_VARIABLES.INTEGER_12,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_HAS_PAUSED_WITH_NUMERIC_ENTITYID = {
  method: 'metrics.mediaPause',
  params: this.STATIC_METRICS_VARIABLES.INTEGER_12,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_HAS_HALTED_WITH_NUMERIC_ENTITYID = {
  method: 'metrics.mediaWaiting',
  params: this.STATIC_METRICS_VARIABLES.INTEGER_12,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_IS_PROGRESSING_WITH_STRING_MEDIAPOSITION = {
  method: 'metrics.mediaProgress',
  params: this.STATIC_METRICS_VARIABLES.MEDIAPROGRESS_ERROR,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_IS_PROGRESSING_WITH_STRING_PROGRESS = {
  method: 'metrics.mediaProgress',
  params: this.STATIC_METRICS_VARIABLES.MEDIAPROGRESS_PROGRESS_ERROR,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_IS_PROGRESSING_WITH_INVALID_PROGRESS = {
  method: 'metrics.mediaProgress',
  params: this.STATIC_METRICS_VARIABLES.MEDIAPROGRESS_INVALID_PROGRESS_ERROR,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_IS_PROGRESSING_WITH_DECIMAL_PROGRESS = {
  method: 'metrics.mediaProgress',
  params: this.STATIC_METRICS_VARIABLES.MEDIAPROGRESS_DECIMAL_PROGRESS_ERROR,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_SEEK_IS_INITIATED_WITH_NUMERIC_ENTITYID = {
  method: 'metrics.mediaSeeking',
  params: this.STATIC_METRICS_VARIABLES.MEDIASEEKING_ENTITYID_ERROR,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_SEEK_IS_INITIATED_WITH_DECIMAL_TARGET = {
  method: 'metrics.mediaSeeking',
  params: this.STATIC_METRICS_VARIABLES.MEDIASEEKING_DECIMAL_TARGET_ERROR,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_SEEK_IS_INITIATED_WITH_INVALID_TARGET = {
  method: 'metrics.mediaSeeking',
  params: this.STATIC_METRICS_VARIABLES.MEDIASEEKING_INVALID_TARGET_ERROR,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_SEEK_IS_INITIATED_WITH_STRING_TARGET = {
  method: 'metrics.mediaSeeking',
  params: this.STATIC_METRICS_VARIABLES.MEDIASEEKING_STRING_TARGET_ERROR,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_SEEK_IS_COMPLETED_WITH_NUMERIC_ENTITYID = {
  method: 'metrics.mediaSeeked',
  params: this.STATIC_METRICS_VARIABLES.MEDIASEEKED_ERROR,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_SEEK_IS_COMPLETED_WITH_INVALID_POSITION = {
  method: 'metrics.mediaSeeked',
  params: this.STATIC_METRICS_VARIABLES.MEDIASEEKED_INVALID_POSITION_ERROR,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_SEEK_IS_COMPLETED_WITH_STRING_POSITION = {
  method: 'metrics.mediaSeeked',
  params: this.STATIC_METRICS_VARIABLES.MEDIASEEKED_STRING_POSITION_ERROR,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_SEEK_IS_COMPLETED_WITH_DECIMAL_POSITION = {
  method: 'metrics.mediaSeeked',
  params: this.STATIC_METRICS_VARIABLES.MEDIASEEKED_DECIMAL_POSITION_ERROR,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_RATE_IS_CHANGED_WITH_NUMERIC_ENTITYID = {
  method: 'metrics.mediaRateChange',
  params: this.STATIC_METRICS_VARIABLES.MEDIARATECHANGE_ERROR,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_RATE_IS_CHANGED_WITH_STRING_RATE = {
  method: 'metrics.mediaRateChange',
  params: this.STATIC_METRICS_VARIABLES.MEDIARATECHANGE_WITH_STRING_RATE_ERROR,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_RENDITION_IS_CHANGED_WITH_NUMERIC_BITRATE = {
  method: 'metrics.mediaRenditionChange',
  params: this.STATIC_METRICS_VARIABLES.MEDIARENDITIONCHANGE_ERROR,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_HAS_STOPPED_WITH_NUMERIC_ENTITYID = {
  method: 'metrics.mediaEnded',
  params: this.STATIC_METRICS_VARIABLES.INTEGER_12,
  expected: 'error',
};
exports.INFORM_THE_PLATFORM_ABOUT_APP_WITH_NUMERIC_BUILD = {
  method: 'metrics.appInfo',
  params: this.STATIC_METRICS_VARIABLES.INTEGER_12,
  expected: 'error',
};
exports.INVALID_PARAMS_FOR_METRICS_APPINFO = {
  method: 'metrics.appInfo',
  validationJsonPath: 'result',
  content: errorContent.INVALID_TYPE_PARAMS,
  expectingError: true,
};
exports.SEND_METRICS_EVENT_WITH_SCHEMA_AND_FOO_DATA = {
  method: 'manage_metrics.event',
  params: this.METRICS_VARIABLES.FOO_DATA_AND_SCHEMA,
};
exports.SEND_METRICS_EVENT_WITH_SCHEMA_AND_NULL_FOO_DATA = {
  method: 'manage_metrics.event',
  params: this.METRICS_VARIABLES.NULL_FOO_DATA_AND_SCHEMA,
};
exports.SEND_METRICS_EVENT_WITH_SCHEMA_AND_BOOLEAN_FOO_DATA = {
  method: 'manage_metrics.event',
  params: this.METRICS_VARIABLES.BOOLEAN_FOO_DATA_AND_SCHEMA,
};
exports.SEND_METRICS_EVENT_WITH_EMPTY_DATA = {
  method: 'manage_metrics.event',
  params: this.METRICS_VARIABLES.EMPTY_DATA_OBJECT,
};
exports.NOTIFY_THAT_APP_IS_MINIMALLY_USABLE = {
  method: 'metrics.ready',
  params: {},
};
exports.LOG_A_SIGN_IN_EVENT = {
  method: 'metrics.signIn',
  params: {},
};
exports.LOG_A_SIGN_OUT_EVENT = {
  method: 'metrics.signOut',
  params: {},
};
exports.TRUE_FOR_READY_IN_METRICS = {
  method: 'metrics.ready',
  validationJsonPath: 'result',
  content: true,
};
exports.TRUE_FOR_SIGNIN_IN_METRICS = {
  method: 'metrics.signIn',
  validationJsonPath: 'result',
  content: true,
};
exports.TRUE_FOR_SIGNOUT_IN_METRICS = {
  method: 'metrics.signOut',
  validationJsonPath: 'result',
  content: true,
};
