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
  childAgePolicy: { agePolicy: 'app:child' },
  teenAgePolicy: { agePolicy: 'app:teen' },
  adultAgePolicy: { agePolicy: 'app:adult' },
  customAgePolicy: { agePolicy: 'test' },
  emptyAgePolicy: { agePolicy: '' },
  pageChildAgePolicy: { pageId: 'home', agePolicy: 'app:child' },
  pageTeenAgePolicy: { pageId: 'home', agePolicy: 'app:teen' },
  pageAdultAgePolicy: { pageId: 'home', agePolicy: 'app:adult' },
  pageCustomAgePolicy: { pageId: 'home', agePolicy: 'test' },
  pageEmptyAgePolicy: { pageId: 'home', agePolicy: '' },
  entityChildAgePolicy: { entityId: '345', agePolicy: 'app:child' },
  entityTeenAgePolicy: { entityId: '345', agePolicy: 'app:teen' },
  entityAdultAgePolicy: { entityId: '345', agePolicy: 'app:adult' },
  entityCustomAgePolicy: { entityId: '345', agePolicy: 'test' },
  entityEmptyAgePolicy: { entityId: '345', agePolicy: '' },
  eventChildAgePolicy: {
    agePolicy: 'app:child',
    schema: 'http://meta.rdkcentral.com/some/schema',
    data: { foo: 'foo' },
  },
  eventTeenAgePolicy: {
    agePolicy: 'app:teen',
    schema: 'http://meta.rdkcentral.com/some/schema',
    data: { foo: 'foo' },
  },
  eventAdultAgePolicy: {
    agePolicy: 'app:adult',
    schema: 'http://meta.rdkcentral.com/some/schema',
    data: { foo: 'foo' },
  },
  eventCustomAgePolicy: {
    agePolicy: 'test',
    schema: 'http://meta.rdkcentral.com/some/schema',
    data: { foo: 'foo' },
  },
  eventEmptyAgePolicy: {
    agePolicy: '',
    schema: 'http://meta.rdkcentral.com/some/schema',
    data: { foo: 'foo' },
  },
  eventSchemaData: {
    schema: 'http://meta.rdkcentral.com/some/schema',
    data: { foo: 'foo' },
  },
  pageId: { pageId: 'home' },
  userMetrics: { category: 'user', type: 'The user did foo' },
  actionChildAgePolicy: { category: 'app', type: 'The user did foo', agePolicy: 'app:child' },
  actionTeenAgePolicy: { category: 'app', type: 'The user did foo', agePolicy: 'app:teen' },
  actionAdultAgePolicy: { category: 'app', type: 'The user did foo', agePolicy: 'app:adult' },
  actionCustomAgePolicy: { category: 'app', type: 'The user did foo', agePolicy: 'test' },
  actionEmptyAgePolicy: { category: 'app', type: 'The user did foo', agePolicy: '' },
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
  errorChildAgePolicy: {
    type: 'media',
    code: 'MEDIA-STALLED',
    description: 'playback stalled',
    visible: true,
    agePolicy: 'app:child',
  },
  errorTeenAgePolicy: {
    type: 'media',
    code: 'MEDIA-STALLED',
    description: 'playback stalled',
    visible: true,
    agePolicy: 'app:teen',
  },
  errorAdultAgePolicy: {
    type: 'media',
    code: 'MEDIA-STALLED',
    description: 'playback stalled',
    visible: true,
    agePolicy: 'app:adult',
  },
  errorCustomAgePolicy: {
    type: 'media',
    code: 'MEDIA-STALLED',
    description: 'playback stalled',
    visible: true,
    agePolicy: 'test',
  },
  errorEmptyAgePolicy: {
    type: 'media',
    code: 'MEDIA-STALLED',
    description: 'playback stalled',
    visible: true,
    agePolicy: '',
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
  progressChildAgePolicy: { entityId: '345', progress: 0.75, agePolicy: 'app:child' },
  progressTeenAgePolicy: { entityId: '345', progress: 0.75, agePolicy: 'app:teen' },
  progressAdultAgePolicy: { entityId: '345', progress: 0.75, agePolicy: 'app:adult' },
  progressCustomAgePolicy: { entityId: '345', progress: 0.75, agePolicy: 'test' },
  progressEmptyAgePolicy: { entityId: '345', progress: 0.75, agePolicy: '' },
  mediaSeeking: { entityId: '345', target: 0.5 },
  seekChildAgePolicy: { entityId: '345', target: 0.5, agePolicy: 'app:child' },
  seekTeenAgePolicy: { entityId: '345', target: 0.5, agePolicy: 'app:teen' },
  seekAdultAgePolicy: { entityId: '345', target: 0.5, agePolicy: 'app:adult' },
  seekCustomAgePolicy: { entityId: '345', target: 0.5, agePolicy: 'test' },
  seekEmptyAgePolicy: { entityId: '345', target: 0.5, agePolicy: '' },
  mediaSeeked: { entityId: '345', position: 0.51 },
  seekedChildAgePolicy: { entityId: '345', position: 0.51, agePolicy: 'app:child' },
  seekedTeenAgePolicy: { entityId: '345', position: 0.51, agePolicy: 'app:teen' },
  seekedAdultAgePolicy: { entityId: '345', position: 0.51, agePolicy: 'app:adult' },
  seekedCustomAgePolicy: { entityId: '345', position: 0.51, agePolicy: 'test' },
  seekedEmptyAgePolicy: { entityId: '345', position: 0.51, agePolicy: '' },
  playbackRate: { entityId: '345', rate: 2 },
  rateChildAgePolicy: { entityId: '345', rate: 2, agePolicy: 'app:child' },
  rateTeenAgePolicy: { entityId: '345', rate: 2, agePolicy: 'app:teen' },
  rateAdultAgePolicy: { entityId: '345', rate: 2, agePolicy: 'app:adult' },
  rateCustomAgePolicy: { entityId: '345', rate: 2, agePolicy: 'test' },
  rateEmptyAgePolicy: { entityId: '345', rate: 2, agePolicy: '' },
  bitrateProfile: { entityId: '345', bitrate: 5000, width: 1920, height: 1080, profile: 'HDR+' },
  renditionChildAgePolicy: {
    entityId: '345',
    bitrate: 5000,
    width: 1920,
    height: 1080,
    profile: 'HDR+',
    agePolicy: 'app:child',
  },
  renditionTeenAgePolicy: {
    entityId: '345',
    bitrate: 5000,
    width: 1920,
    height: 1080,
    profile: 'HDR+',
    agePolicy: 'app:teen',
  },
  renditionAdultAgePolicy: {
    entityId: '345',
    bitrate: 5000,
    width: 1920,
    height: 1080,
    profile: 'HDR+',
    agePolicy: 'app:adult',
  },
  renditionCustomAgePolicy: {
    entityId: '345',
    bitrate: 5000,
    width: 1920,
    height: 1080,
    profile: 'HDR+',
    agePolicy: 'test',
  },
  renditionEmptyAgePolicy: {
    entityId: '345',
    bitrate: 5000,
    width: 1920,
    height: 1080,
    profile: 'HDR+',
    agePolicy: '',
  },
  appBuild: { build: '1.2.2' },
};

exports.NOTIFY_THAT_CONTENT_HAS_STARTED = {
  method: 'metrics.startContent',
  params: {},
};

exports.NOTIFY_THAT_CONTENT_HAS_STOPPED = {
  method: 'metrics.stopContent',
  params: {},
};

exports.TRUE_FOR_STARTCONTENT_IN_METRICS = {
  method: 'metrics.startContent',
  validationJsonPath: 'result',
  content: true,
};

exports.TRUE_FOR_STOPCONTENT_IN_METRICS = {
  method: 'metrics.stopContent',
  validationJsonPath: 'result',
  content: true,
};

exports.TRUE_FOR_PAGE_IN_METRICS = {
  method: 'metrics.page',
  validationJsonPath: 'result',
  content: true,
};

exports.TRUE_FOR_ACTION_IN_METRICS = {
  method: 'metrics.action',
  validationJsonPath: 'result',
  content: true,
};

exports.TRUE_FOR_ERROR_IN_METRICS = {
  method: 'metrics.error',
  validationJsonPath: 'result',
  content: true,
};

exports.TRUE_FOR_MEDIALOADSTART_IN_METRICS = {
  method: 'metrics.mediaLoadStart',
  validationJsonPath: 'result',
  content: true,
};

exports.TRUE_FOR_MEDIAPLAY_IN_METRICS = {
  method: 'metrics.mediaPlay',
  validationJsonPath: 'result',
  content: true,
};

exports.TRUE_FOR_MEDIAPLAYING_IN_METRICS = {
  method: 'metrics.mediaPlaying',
  validationJsonPath: 'result',
  content: true,
};

exports.TRUE_FOR_MEDIAPAUSE_IN_METRICS = {
  method: 'metrics.mediaPause',
  validationJsonPath: 'result',
  content: true,
};

exports.TRUE_FOR_MEDIAWAITING_IN_METRICS = {
  method: 'metrics.mediaWaiting',
  validationJsonPath: 'result',
  content: true,
};

exports.TRUE_FOR_MEDIAPROGRESS_IN_METRICS = {
  method: 'metrics.mediaProgress',
  validationJsonPath: 'result',
  content: true,
};

exports.TRUE_FOR_MEDIASEEKING_IN_METRICS = {
  method: 'metrics.mediaSeeking',
  validationJsonPath: 'result',
  content: true,
};
exports.TRUE_FOR_MEDIASEEKED_IN_METRICS = {
  method: 'metrics.mediaSeeked',
  validationJsonPath: 'result',
  content: true,
};
exports.TRUE_FOR_MEDIARATECHANGE_IN_METRICS = {
  method: 'metrics.mediaRateChange',
  validationJsonPath: 'result',
  content: true,
};

exports.TRUE_FOR_MEDIARENDITIONCHANGE_IN_METRICS = {
  method: 'metrics.mediaRenditionChange',
  validationJsonPath: 'result',
  content: true,
};

exports.TRUE_FOR_MEDIAENDED_IN_METRICS = {
  method: 'metrics.mediaEnded',
  validationJsonPath: 'result',
  content: true,
};

exports.NOTIFY_THAT_CONTENT_HAS_STARTED_WITH_ENTITYID = {
  method: 'metrics.startContent',
  params: this.METRICS_VARIABLES.entityId,
};
exports.NOTIFY_THAT_CONTENT_HAS_STARTED_WITH_CHILD_AGE_POLICY = {
  method: 'metrics.startContent',
  params: this.METRICS_VARIABLES.childAgePolicy,
};

exports.NOTIFY_THAT_CONTENT_HAS_STARTED_WITH_TEEN_AGE_POLICY = {
  method: 'metrics.startContent',
  params: this.METRICS_VARIABLES.teenAgePolicy,
};

exports.NOTIFY_THAT_CONTENT_HAS_STARTED_WITH_ADULT_AGE_POLICY = {
  method: 'metrics.startContent',
  params: this.METRICS_VARIABLES.adultAgePolicy,
};

exports.NOTIFY_THAT_CONTENT_HAS_STARTED_WITH_CUSTOM_AGE_POLICY = {
  method: 'metrics.startContent',
  params: this.METRICS_VARIABLES.customAgePolicy,
};
exports.NOTIFY_THAT_CONTENT_HAS_STARTED_WITH_EMPTY_AGE_POLICY = {
  method: 'metrics.startContent',
  params: this.METRICS_VARIABLES.emptyAgePolicy,
};
exports.NOTIFY_THAT_CONTENT_HAS_STOPPED_WITH_CHILD_AGE_POLICY = {
  method: 'metrics.stopContent',
  params: this.METRICS_VARIABLES.childAgePolicy,
};
exports.NOTIFY_THAT_CONTENT_HAS_STOPPED_WITH_TEEN_AGE_POLICY = {
  method: 'metrics.stopContent',
  params: this.METRICS_VARIABLES.teenAgePolicy,
};
exports.NOTIFY_THAT_CONTENT_HAS_STOPPED_WITH_ADULT_AGE_POLICY = {
  method: 'metrics.stopContent',
  params: this.METRICS_VARIABLES.adultAgePolicy,
};
exports.NOTIFY_THAT_CONTENT_HAS_STOPPED_WITH_CUSTOM_AGE_POLICY = {
  method: 'metrics.stopContent',
  params: this.METRICS_VARIABLES.customAgePolicy,
};
exports.NOTIFY_THAT_CONTENT_HAS_STOPPED_WITH_EMPTY_AGE_POLICY = {
  method: 'metrics.startContent',
  params: this.METRICS_VARIABLES.emptyAgePolicy,
};
exports.NOTIFY_THAT_CONTENT_HAS_STOPPED_WITH_ENTITYID = {
  method: 'metrics.stopContent',
  params: this.METRICS_VARIABLES.entityId,
};
exports.NOTIFY_THAT_PAGE_HAS_NAVIGATED_WITH_PAGEID = {
  method: 'metrics.page',
  params: this.METRICS_VARIABLES.pageId,
};
exports.NOTIFY_THAT_PAGE_HAS_NAVIGATED_WITH_CHILD_AGE_POLICY = {
  method: 'metrics.page',
  params: exports.METRICS_VARIABLES.pageChildAgePolicy,
};
exports.NOTIFY_THAT_PAGE_HAS_NAVIGATED_WITH_TEEN_AGE_POLICY = {
  method: 'metrics.page',
  params: exports.METRICS_VARIABLES.pageTeenAgePolicy,
};
exports.NOTIFY_THAT_PAGE_HAS_NAVIGATED_WITH_ADULT_AGE_POLICY = {
  method: 'metrics.page',
  params: exports.METRICS_VARIABLES.pageAdultAgePolicy,
};
exports.NOTIFY_THAT_PAGE_HAS_NAVIGATED_WITH_EMPTY_AGE_POLICY = {
  method: 'metrics.page',
  params: exports.METRICS_VARIABLES.pageEmptyAgePolicy,
};
exports.NOTIFY_THAT_PAGE_HAS_NAVIGATED_WITH_CUSTOM_AGE_POLICY = {
  method: 'metrics.page',
  params: exports.METRICS_VARIABLES.pageCustomAgePolicy,
};
exports.NOTIFY_ABOUT_ACTION_WITH_USERMETRICS = {
  method: 'metrics.action',
  params: this.METRICS_VARIABLES.userMetrics,
};

exports.NOTIFY_ABOUT_ACTION_WITH_APPMETRICS = {
  method: 'metrics.action',
  params: this.METRICS_VARIABLES.appMetrics,
};

exports.NOTIFY_ABOUT_ACTION_WITH_PARAMETERSMETRICS = {
  method: 'metrics.action',
  params: this.METRICS_VARIABLES.parametersMetrics,
};
exports.NOTIFY_ABOUT_ACTION_WITH_CHILD_AGE_POLICY = {
  method: 'metrics.action',
  params: exports.METRICS_VARIABLES.actionChildAgePolicy,
};
exports.NOTIFY_ABOUT_ACTION_WITH_TEEN_AGE_POLICY = {
  method: 'metrics.action',
  params: exports.METRICS_VARIABLES.actionTeenAgePolicy,
};
exports.NOTIFY_ABOUT_ACTION_WITH_ADULT_AGE_POLICY = {
  method: 'metrics.action',
  params: exports.METRICS_VARIABLES.actionAdultAgePolicy,
};
exports.NOTIFY_ABOUT_ACTION_WITH_EMPTY_AGE_POLICY = {
  method: 'metrics.action',
  params: exports.METRICS_VARIABLES.actionEmptyAgePolicy,
};
exports.NOTIFY_ABOUT_ACTION_WITH_CUSTOM_AGE_POLICY = {
  method: 'metrics.action',
  params: exports.METRICS_VARIABLES.actionCustomAgePolicy,
};
exports.NOTIFY_THAT_ERROR_HAS_OCCURED_WITH_MEDIASTALLED = {
  method: 'metrics.error',
  params: this.METRICS_VARIABLES.mediaStalled,
};

exports.NOTIFY_THAT_ERROR_HAS_OCCURED_WITH_CHILD_AGE_POLICY = {
  method: 'metrics.error',
  params: exports.METRICS_VARIABLES.errorChildAgePolicy,
};
exports.NOTIFY_THAT_ERROR_HAS_OCCURED_WITH_TEEN_AGE_POLICY = {
  method: 'metrics.error',
  params: exports.METRICS_VARIABLES.errorTeenAgePolicy,
};
exports.NOTIFY_THAT_ERROR_HAS_OCCURED_WITH_ADULT_AGE_POLICY = {
  method: 'metrics.error',
  params: exports.METRICS_VARIABLES.errorAdultAgePolicy,
};
exports.NOTIFY_THAT_ERROR_HAS_OCCURED_WITH_EMPTY_AGE_POLICY = {
  method: 'metrics.error',
  params: exports.METRICS_VARIABLES.errorEmptyAgePolicy,
};
exports.NOTIFY_THAT_ERROR_HAS_OCCURED_WITH_CUSTOM_AGE_POLICY = {
  method: 'metrics.error',
  params: exports.METRICS_VARIABLES.errorCustomAgePolicy,
};
exports.INFER_LOAD_TIME_WITH_ENTITYID = {
  method: 'metrics.mediaLoadStart',
  params: this.METRICS_VARIABLES.entityId,
};
exports.INFER_LOAD_TIME_WITH_CHILD_AGE_POLICY = {
  method: 'metrics.mediaLoadStart',
  params: exports.METRICS_VARIABLES.entityChildAgePolicy,
};
exports.INFER_LOAD_TIME_WITH_TEEN_AGE_POLICY = {
  method: 'metrics.mediaLoadStart',
  params: exports.METRICS_VARIABLES.entityTeenAgePolicy,
};
exports.INFER_LOAD_TIME_WITH_ADULT_AGE_POLICY = {
  method: 'metrics.mediaLoadStart',
  params: exports.METRICS_VARIABLES.entityAdultAgePolicy,
};
exports.INFER_LOAD_TIME_WITH_CUSTOM_AGE_POLICY = {
  method: 'metrics.mediaLoadStart',
  params: exports.METRICS_VARIABLES.entityCustomAgePolicy,
};
exports.INFER_LOAD_TIME_WITH_EMPTY_AGE_POLICY = {
  method: 'metrics.mediaLoadStart',
  params: exports.METRICS_VARIABLES.entityEmptyAgePolicy,
};
exports.START_PLAYBACK_WITH_ENTITYID = {
  method: 'metrics.mediaPlay',
  params: this.METRICS_VARIABLES.entityId,
};
exports.START_PLAYBACK_WITH_CHILD_AGE_POLICY = {
  method: 'metrics.mediaPlay',
  params: exports.METRICS_VARIABLES.entityChildAgePolicy,
};
exports.START_PLAYBACK_WITH_TEEN_AGE_POLICY = {
  method: 'metrics.mediaPlay',
  params: exports.METRICS_VARIABLES.entityTeenAgePolicy,
};
exports.START_PLAYBACK_WITH_ADULT_AGE_POLICY = {
  method: 'metrics.mediaPlay',
  params: exports.METRICS_VARIABLES.entityAdultAgePolicy,
};
exports.START_PLAYBACK_WITH_EMPTY_AGE_POLICY = {
  method: 'metrics.mediaPlay',
  params: exports.METRICS_VARIABLES.entityEmptyAgePolicy,
};
exports.START_PLAYBACK_WITH_CUSTOM_AGE_POLICY = {
  method: 'metrics.mediaPlay',
  params: exports.METRICS_VARIABLES.entityCustomAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_HAS_STARTED_WITH_ENTITYID = {
  method: 'metrics.mediaPlaying',
  params: this.METRICS_VARIABLES.entityId,
};
exports.NOTIFY_THAT_PLAYBACK_HAS_STARTED_WITH_CHILD_AGE_POLICY = {
  method: 'metrics.mediaPlaying',
  params: exports.METRICS_VARIABLES.entityChildAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_HAS_STARTED_WITH_TEEN_AGE_POLICY = {
  method: 'metrics.mediaPlaying',
  params: exports.METRICS_VARIABLES.entityTeenAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_HAS_STARTED_WITH_ADULT_AGE_POLICY = {
  method: 'metrics.mediaPlaying',
  params: exports.METRICS_VARIABLES.entityAdultAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_HAS_STARTED_WITH_EMPTY_AGE_POLICY = {
  method: 'metrics.mediaPlaying',
  params: exports.METRICS_VARIABLES.entityEmptyAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_HAS_STARTED_WITH_CUSTOM_AGE_POLICY = {
  method: 'metrics.mediaPlaying',
  params: exports.METRICS_VARIABLES.entityCustomAgePolicy,
};

exports.NOTIFY_THAT_PLAYBACK_HAS_PAUSED_WITH_ENTITYID = {
  method: 'metrics.mediaPause',
  params: this.METRICS_VARIABLES.entityId,
};
exports.NOTIFY_THAT_PLAYBACK_HAS_PAUSED_WITH_CHILD_AGE_POLICY = {
  method: 'metrics.mediaPause',
  params: exports.METRICS_VARIABLES.entityChildAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_HAS_PAUSED_WITH_TEEN_AGE_POLICY = {
  method: 'metrics.mediaPause',
  params: exports.METRICS_VARIABLES.entityTeenAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_HAS_PAUSED_WITH_ADULT_AGE_POLICY = {
  method: 'metrics.mediaPause',
  params: exports.METRICS_VARIABLES.entityAdultAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_HAS_PAUSED_WITH_EMPTY_AGE_POLICY = {
  method: 'metrics.mediaPause',
  params: exports.METRICS_VARIABLES.entityEmptyAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_HAS_PAUSED_WITH_CUSTOM_AGE_POLICY = {
  method: 'metrics.mediaPause',
  params: exports.METRICS_VARIABLES.entityCustomAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_HAS_HALTED_WITH_ENTITYID = {
  method: 'metrics.mediaWaiting',
  params: this.METRICS_VARIABLES.mediaWaiting_entityId,
};
exports.NOTIFY_THAT_PLAYBACK_HAS_HALTED_WITH_CHILD_AGE_POLICY = {
  method: 'metrics.mediaWaiting',
  params: exports.METRICS_VARIABLES.entityChildAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_HAS_HALTED_WITH_TEEN_AGE_POLICY = {
  method: 'metrics.mediaWaiting',
  params: exports.METRICS_VARIABLES.entityTeenAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_HAS_HALTED_WITH_ADULT_AGE_POLICY = {
  method: 'metrics.mediaWaiting',
  params: exports.METRICS_VARIABLES.entityAdultAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_HAS_HALTED_WITH_EMPTY_AGE_POLICY = {
  method: 'metrics.mediaWaiting',
  params: exports.METRICS_VARIABLES.entityEmptyAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_HAS_HALTED_WITH_CUSTOM_AGE_POLICY = {
  method: 'metrics.mediaWaiting',
  params: exports.METRICS_VARIABLES.entityCustomAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_IS_PROGRESSING_WITH_MEDIAPOSITION = {
  method: 'metrics.mediaProgress',
  params: this.METRICS_VARIABLES.mediaProgress,
};
exports.NOTIFY_THAT_PLAYBACK_IS_PROGRESSING_WITH_CHILD_AGE_POLICY = {
  method: 'metrics.mediaProgress',
  params: exports.METRICS_VARIABLES.progressChildAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_IS_PROGRESSING_WITH_TEEN_AGE_POLICY = {
  method: 'metrics.mediaProgress',
  params: exports.METRICS_VARIABLES.progressTeenAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_IS_PROGRESSING_WITH_ADULT_AGE_POLICY = {
  method: 'metrics.mediaProgress',
  params: exports.METRICS_VARIABLES.progressAdultAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_IS_PROGRESSING_WITH_EMPTY_AGE_POLICY = {
  method: 'metrics.mediaProgress',
  params: exports.METRICS_VARIABLES.progressEmptyAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_IS_PROGRESSING_WITH_CUSTOM_AGE_POLICY = {
  method: 'metrics.mediaProgress',
  params: exports.METRICS_VARIABLES.progressCustomAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_SEEK_IS_INITIATED_WITH_MEDIAPOSITION = {
  method: 'metrics.mediaSeeking',
  params: this.METRICS_VARIABLES.mediaSeeking,
};
exports.NOTIFY_THAT_PLAYBACK_SEEK_IS_INITIATED_WITH_CHILD_AGE_POLICY = {
  method: 'metrics.mediaSeeking',
  params: exports.METRICS_VARIABLES.seekChildAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_SEEK_IS_INITIATED_WITH_TEEN_AGE_POLICY = {
  method: 'metrics.mediaSeeking',
  params: exports.METRICS_VARIABLES.seekTeenAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_SEEK_IS_INITIATED_WITH_ADULT_AGE_POLICY = {
  method: 'metrics.mediaSeeking',
  params: exports.METRICS_VARIABLES.seekAdultAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_SEEK_IS_INITIATED_WITH_EMPTY_AGE_POLICY = {
  method: 'metrics.mediaSeeking',
  params: exports.METRICS_VARIABLES.seekEmptyAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_SEEK_IS_INITIATED_WITH_CUSTOM_AGE_POLICY = {
  method: 'metrics.mediaSeeking',
  params: exports.METRICS_VARIABLES.seekCustomAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_SEEK_IS_COMPLETED_WITH_MEDIAPOSITION = {
  method: 'metrics.mediaSeeked',
  params: this.METRICS_VARIABLES.mediaSeeked,
};
exports.NOTIFY_THAT_PLAYBACK_SEEK_IS_COMPLETED_WITH_CHILD_AGE_POLICY = {
  method: 'metrics.mediaSeeked',
  params: exports.METRICS_VARIABLES.seekedChildAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_SEEK_IS_COMPLETED_WITH_TEEN_AGE_POLICY = {
  method: 'metrics.mediaSeeked',
  params: exports.METRICS_VARIABLES.seekedTeenAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_SEEK_IS_COMPLETED_WITH_ADULT_AGE_POLICY = {
  method: 'metrics.mediaSeeked',
  params: exports.METRICS_VARIABLES.seekedAdultAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_SEEK_IS_COMPLETED_WITH_EMPTY_AGE_POLICY = {
  method: 'metrics.mediaSeeked',
  params: exports.METRICS_VARIABLES.seekedEmptyAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_SEEK_IS_COMPLETED_WITH_CUSTOM_AGE_POLICY = {
  method: 'metrics.mediaSeeked',
  params: exports.METRICS_VARIABLES.seekedCustomAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_RATE_IS_CHANGED_WITH_PLAYBACKRATE = {
  method: 'metrics.mediaRateChange',
  params: this.METRICS_VARIABLES.playbackRate,
};
exports.NOTIFY_THAT_PLAYBACK_RATE_IS_CHANGED_WITH_CHILD_AGE_POLICY = {
  method: 'metrics.mediaRateChange',
  params: exports.METRICS_VARIABLES.rateChildAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_RATE_IS_CHANGED_WITH_TEEN_AGE_POLICY = {
  method: 'metrics.mediaRateChange',
  params: exports.METRICS_VARIABLES.rateTeenAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_RATE_IS_CHANGED_WITH_ADULT_AGE_POLICY = {
  method: 'metrics.mediaRateChange',
  params: exports.METRICS_VARIABLES.rateAdultAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_RATE_IS_CHANGED_WITH_EMPTY_AGE_POLICY = {
  method: 'metrics.mediaRateChange',
  params: exports.METRICS_VARIABLES.rateEmptyAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_RATE_IS_CHANGED_WITH_CUSTOM_AGE_POLICY = {
  method: 'metrics.mediaRateChange',
  params: exports.METRICS_VARIABLES.rateCustomAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_RENDITION_IS_CHANGED_WITH_BITRATEPROFILE = {
  method: 'metrics.mediaRenditionChange',
  params: this.METRICS_VARIABLES.bitrateProfile,
};
exports.NOTIFY_THAT_PLAYBACK_RENDITION_IS_CHANGED_WITH_CHILD_AGE_POLICY = {
  method: 'metrics.mediaRenditionChange',
  params: exports.METRICS_VARIABLES.renditionChildAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_RENDITION_IS_CHANGED_WITH_TEEN_AGE_POLICY = {
  method: 'metrics.mediaRenditionChange',
  params: exports.METRICS_VARIABLES.renditionTeenAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_RENDITION_IS_CHANGED_WITH_ADULT_AGE_POLICY = {
  method: 'metrics.mediaRenditionChange',
  params: exports.METRICS_VARIABLES.renditionAdultAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_RENDITION_IS_CHANGED_WITH_EMPTY_AGE_POLICY = {
  method: 'metrics.mediaRenditionChange',
  params: exports.METRICS_VARIABLES.renditionEmptyAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_RENDITION_IS_CHANGED_WITH_CUSTOM_AGE_POLICY = {
  method: 'metrics.mediaRenditionChange',
  params: exports.METRICS_VARIABLES.renditionCustomAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_HAS_STOPPED_WITH_ENTITYID = {
  method: 'metrics.mediaEnded',
  params: this.METRICS_VARIABLES.entityId,
};
exports.NOTIFY_THAT_PLAYBACK_HAS_STOPPED_WITH_CHILD_AGE_POLICY = {
  method: 'metrics.mediaEnded',
  params: exports.METRICS_VARIABLES.entityChildAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_HAS_STOPPED_WITH_TEEN_AGE_POLICY = {
  method: 'metrics.mediaEnded',
  params: exports.METRICS_VARIABLES.entityTeenAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_HAS_STOPPED_WITH_ADULT_AGE_POLICY = {
  method: 'metrics.mediaEnded',
  params: exports.METRICS_VARIABLES.entityAdultAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_HAS_STOPPED_WITH_EMPTY_AGE_POLICY = {
  method: 'metrics.mediaEnded',
  params: exports.METRICS_VARIABLES.entityEmptyAgePolicy,
};
exports.NOTIFY_THAT_PLAYBACK_HAS_STOPPED_WITH_CUSTOM_AGE_POLICY = {
  method: 'metrics.mediaEnded',
  params: exports.METRICS_VARIABLES.entityCustomAgePolicy,
};
exports.INFORM_THE_PLATFORM_OF_EVENT_WITH_CHILD_AGE_POLICY = {
  method: 'metrics.event',
  params: exports.METRICS_VARIABLES.eventChildAgePolicy,
};

exports.INFORM_THE_PLATFORM_OF_EVENT_WITH_TEEN_AGE_POLICY = {
  method: 'metrics.event',
  params: exports.METRICS_VARIABLES.eventTeenAgePolicy,
};

exports.INFORM_THE_PLATFORM_OF_EVENT_WITH_ADULT_AGE_POLICY = {
  method: 'metrics.event',
  params: exports.METRICS_VARIABLES.eventAdultAgePolicy,
};

exports.INFORM_THE_PLATFORM_OF_EVENT_WITH_EMPTY_AGE_POLICY = {
  method: 'metrics.event',
  params: exports.METRICS_VARIABLES.eventEmptyAgePolicy,
};

exports.INFORM_THE_PLATFORM_OF_EVENT_WITH_CUSTOM_AGE_POLICY = {
  method: 'metrics.event',
  params: exports.METRICS_VARIABLES.eventCustomAgePolicy,
};
exports.INFORM_THE_PLATFORM_OF_EVENT_WITH_VALID_SCHEMA_AND_DATA = {
  method: 'metrics.event',
  params: exports.METRICS_VARIABLES.eventSchemaData,
};
exports.NOTIFY_ABOUT_ACTION_WITH_PARAMETERSMETRICS_AS_STRING = {
  method: 'metrics.action',
  params: this.METRICS_VARIABLES.parametersMetrics_as_string,
};

exports.NOTIFY_ABOUT_ACTION_WITH_PARAMETERSMETRICS_AS_BOOLEAN = {
  method: 'metrics.action',
  params: this.METRICS_VARIABLES.parametersMetrics_as_boolean,
};

exports.NOTIFY_ABOUT_ACTION_WITH_PARAMETERSMETRICS_AS_NUMBER = {
  method: 'metrics.action',
  params: this.METRICS_VARIABLES.parametersMetrics_as_number,
};

exports.NOTIFY_ABOUT_ACTION_WITH_PARAMETERSMETRICS = {
  method: 'metrics.action',
  params: this.METRICS_VARIABLES.parametersMetrics,
};

exports.NOTIFY_THAT_ERROR_HAS_OCCURED_WITH_MEDIASTALLED_PARAMETER = {
  method: 'metrics.error',
  params: this.METRICS_VARIABLES.mediaStalled_parameter,
};

exports.NOTIFY_THAT_ERROR_HAS_OCCURED_WITH_MEDIASTALLED_PARAMETER_AS_STRING = {
  method: 'metrics.error',
  params: this.METRICS_VARIABLES.mediaStalled_parameter_as_string,
};

exports.NOTIFY_THAT_ERROR_HAS_OCCURED_WITH_MEDIASTALLED_PARAMETER_AS_BOOLEAN = {
  method: 'metrics.error',
  params: this.METRICS_VARIABLES.mediaStalled_parameter_as_boolean,
};

exports.NOTIFY_THAT_ERROR_HAS_OCCURED_WITH_MEDIASTALLED_PARAMETER_AS_NUMBER = {
  method: 'metrics.error',
  params: this.METRICS_VARIABLES.mediaStalled_parameter_as_number,
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
  PAGE_INTEGER_AGE_POLICY: { pageId: 'home', agePolicy: 10 },
  PAGE_BOOLEAN_AGE_POLICY: { pageId: 'home', agePolicy: true },
  ACTION_USERMETRICS_ERROR: { category: 12, type: 'abcd' },
  ACTION_TYPEMETRICS_ERROR: { category: 'app', type: 123 },
  ACTION_BOOLEAN_AGE_POLICY: { category: 'app', type: 'The user did foo', agePolicy: true },
  ACTION_INTEGER_AGE_POLICY: { category: 'app', type: 'The user did foo', agePolicy: 123 },
  ACTION_PARAMETERS_METRICS_ERROR: { category: 'app', type: 'The user did foo', parameters: 123 },
  ERROR_TYPE_ERROR: {
    type: 123,
    code: 'MEDIA-STALLED',
    description: 'playback stalled',
    visible: true,
  },
  ERROR_BOOLEAN_AGE_POLICY: {
    type: 'media',
    code: 'MEDIA-STALLED',
    description: 'playback stalled',
    visible: true,
    agePolicy: true,
  },
  ERROR_INTEGER_AGE_POLICY: {
    type: 'media',
    code: 'MEDIA-STALLED',
    description: 'playback stalled',
    visible: true,
    agePolicy: 10,
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
  PROGRESS_INTEGER_AGE_POLICY: { entityId: '345', progress: 0.75, agePolicy: 12 },
  PROGRESS_BOOLEAN_AGE_POLICY: { entityId: '345', progress: 0.75, agePolicy: true },
  MEDIAPROGRESS_PROGRESS_ERROR: { entityId: '345', progress: 'abc' },
  MEDIAPROGRESS_INVALID_PROGRESS_ERROR: { entityId: '345', progress: 100000 },
  MEDIAPROGRESS_DECIMAL_PROGRESS_ERROR: { entityId: '345', progress: 1.5 },
  MEDIASEEKING_ENTITYID_ERROR: { entityId: 123, target: 0.5 },
  SEEKING_BOOLEAN_AGE_POLICY: { entityId: '345', target: 0.5, agePolicy: true },
  SEEKING_INTEGER_AGE_POLICY: { entityId: '345', target: 0.5, agePolicy: 12 },
  MEDIASEEKING_DECIMAL_TARGET_ERROR: { entityId: '345', target: 1.5 },
  MEDIASEEKING_INVALID_TARGET_ERROR: { entityId: '345', target: 100000 },
  MEDIASEEKING_STRING_TARGET_ERROR: { entityId: '345', target: 'abc' },
  MEDIASEEKED_ERROR: { entityId: 123, position: 0.51 },
  SEEKED_BOOLEAN_AGE_POLICY: { entityId: '345', position: 0.51, agePolicy: true },
  SEEKED_INTEGER_AGE_POLICY: { entityId: '345', position: 0.51, agePolicy: 12 },
  MEDIASEEKED_INVALID_POSITION_ERROR: { entityId: 123, position: 100000 },
  MEDIASEEKED_STRING_POSITION_ERROR: { entityId: 123, position: 'abc' },
  MEDIASEEKED_DECIMAL_POSITION_ERROR: { entityId: 123, position: 1.5 },
  MEDIARATECHANGE_ERROR: { entityId: 123, rate: 2 },
  RATE_CHANGE_BOOLEAN_AGE_POLICY: { entityId: '345', rate: 2, agePolicy: true },
  RATE_CHANGE_INTEGER_AGE_POLICY: { entityId: '345', rate: 2, agePolicy: 12 },
  MEDIARATECHANGE_WITH_STRING_RATE_ERROR: { entityId: '345', rate: 'abc' },
  MEDIARENDITIONCHANGE_ERROR: {
    entityId: 12,
    bitrate: '5000',
    width: '1920',
    height: 1080,
    profile: 12,
  },
  RENDITION_BOOLEAN_AGE_POLICY: {
    entityId: '12',
    bitrate: 5000,
    width: 1920,
    height: 1080,
    profile: 'HDR+',
    agePolicy: true,
  },
  RENDITION_INTEGER_AGE_POLICY: {
    entityId: '12',
    bitrate: 5000,
    width: 1920,
    height: 1080,
    profile: 'HDR+',
    agePolicy: 12,
  },
  EVENT_BOOLEAN_AGE_POLICY: {
    agePolicy: true,
    schema: 'http://meta.rdkcentral.com/some/schema',
    data: { foo: 'foo' },
  },
  EVENT_INTEGER_AGE_POLICY: {
    agePolicy: 12,
    schema: 'http://meta.rdkcentral.com/some/schema',
    data: { foo: 'foo' },
  },
  EVENT_STRING_DATA: {
    schema: 'http://meta.rdkcentral.com/some/schema',
    data: 'foo',
  },
  EVENT_BOOLEAN_DATA: {
    schema: 'http://meta.rdkcentral.com/some/schema',
    data: true,
  },
  EVENT_NUMERIC_DATA: {
    schema: 'http://meta.rdkcentral.com/some/schema',
    data: 123,
  },
  EVENT_NULL_DATA: {
    schema: 'http://meta.rdkcentral.com/some/schema',
    data: null,
  },
  EVENT_MISSING_DATA: {
    schema: 'http://meta.rdkcentral.com/some/schema',
  },
  EVENT_MISSING_SCHEMA: {
    data: { foo: 'foo' },
  },
  EVENT_NULL_SCHEMA: {
    schema: null,
    data: { foo: 'foo' },
  },
  EVENT_BOOLEAN_SCHEMA: {
    schema: true,
    data: { foo: 'foo' },
  },
  EVENT_NUMERIC_SCHEMA: {
    schema: 123,
    data: { foo: 'foo' },
  },
  INTEGER_12: { entityId: 12 },
  ENTITY_INTEGER_AGE_POLICY: { entityId: 12, agePolicy: 12 },
  ENTITY_BOOLEAN_AGE_POLICY: { entityId: 12, agePolicy: true },
  INTEGER_BUILD: { build: 12 },
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
  content: errorContent.INVALID_PARAMS,
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
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_STOPCONTENT = {
  method: 'metrics.stopContent',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_PAGE = {
  method: 'metrics.page',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_ACTION = {
  method: 'metrics.action',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_ERROR = {
  method: 'metrics.error',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_MEDIALOADSTART = {
  method: 'metrics.mediaLoadStart',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_MEDIAPLAY = {
  method: 'metrics.mediaPlay',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_MEDIAPLAYING = {
  method: 'metrics.mediaPlaying',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_MEDIAPAUSE = {
  method: 'metrics.mediaPause',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_MEDIAWAITING = {
  method: 'metrics.mediaWaiting',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_MEDIAPROGRESS = {
  method: 'metrics.mediaProgress',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_MEDIASEEKING = {
  method: 'metrics.mediaSeeking',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_MEDIASEEKED = {
  method: 'metrics.mediaSeeked',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_MEDIARATECHANGE = {
  method: 'metrics.mediaRateChange',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_METRICS_MEDIARENDITIONCHANGE = {
  method: 'metrics.mediaRenditionChange',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};
exports.NOTIFY_THAT_CONTENT_HAS_STARTED_WITH_NUMERIC_ENTITYID = {
  method: 'metrics.startContent',
  params: this.STATIC_METRICS_VARIABLES.INTEGER_12,
  expected: 'error',
};
exports.NOTIFY_THAT_CONTENT_HAS_STARTED_WITH_INTEGER_AGE_POLICY = {
  method: 'metrics.startContent',
  params: this.STATIC_METRICS_VARIABLES.ENTITY_INTEGER_AGE_POLICY,
  expected: 'error',
};
exports.NOTIFY_THAT_CONTENT_HAS_STARTED_WITH_BOOLEAN_AGE_POLICY = {
  method: 'metrics.startContent',
  params: this.STATIC_METRICS_VARIABLES.ENTITY_BOOLEAN_AGE_POLICY,
  expected: 'error',
};
exports.NOTIFY_THAT_CONTENT_HAS_STOPPED_WITH_NUMERIC_ENTITYID = {
  method: 'metrics.stopContent',
  params: this.STATIC_METRICS_VARIABLES.INTEGER_12,
  expected: 'error',
};
exports.NOTIFY_THAT_CONTENT_HAS_STOPPED_WITH_INTEGER_AGE_POLICY = {
  method: 'metrics.stopContent',
  params: this.STATIC_METRICS_VARIABLES.ENTITY_INTEGER_AGE_POLICY,
  expected: 'error',
};
exports.NOTIFY_THAT_CONTENT_HAS_STOPPED_WITH_BOOLEAN_AGE_POLICY = {
  method: 'metrics.stopContent',
  params: this.STATIC_METRICS_VARIABLES.ENTITY_BOOLEAN_AGE_POLICY,
  expected: 'error',
};
exports.NOTIFY_THAT_PAGE_HAS_NAVIGATED_WITH_NUMERIC_PAGEID = {
  method: 'metrics.page',
  params: this.STATIC_METRICS_VARIABLES.PAGEID_ERROR,
  expected: 'error',
};
exports.NOTIFY_THAT_PAGE_HAS_NAVIGATED_WITH_INTEGER_AGE_POLICY = {
  method: 'metrics.page',
  params: exports.STATIC_METRICS_VARIABLES.PAGE_INTEGER_AGE_POLICY,
  expected: 'error',
};
exports.NOTIFY_THAT_PAGE_HAS_NAVIGATED_WITH_BOOLEAN_AGE_POLICY = {
  method: 'metrics.page',
  params: exports.STATIC_METRICS_VARIABLES.PAGE_BOOLEAN_AGE_POLICY,
  expected: 'error',
};
exports.NOTIFY_ABOUT_ACTION_WITH_NUMERIC_USERMETRICS = {
  method: 'metrics.action',
  params: this.STATIC_METRICS_VARIABLES.ACTION_USERMETRICS_ERROR,
  expected: 'error',
};
exports.NOTIFY_ABOUT_ACTION_WITH_INTEGER_AGE_POLICY = {
  method: 'metrics.action',
  params: exports.STATIC_METRICS_VARIABLES.ACTION_INTEGER_AGE_POLICY,
  expected: 'error',
};
exports.NOTIFY_ABOUT_ACTION_WITH_BOOLEAN_AGE_POLICY = {
  method: 'metrics.action',
  params: exports.STATIC_METRICS_VARIABLES.ACTION_BOOLEAN_AGE_POLICY,
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
exports.NOTIFY_THAT_ERROR_HAS_OCCURED_WITH_INTEGER_AGE_POLICY = {
  method: 'metrics.error',
  params: exports.STATIC_METRICS_VARIABLES.ERROR_INTEGER_AGE_POLICY,
  expected: 'error',
};
exports.NOTIFY_THAT_ERROR_HAS_OCCURED_WITH_BOOLEAN_AGE_POLICY = {
  method: 'metrics.error',
  params: exports.STATIC_METRICS_VARIABLES.ERROR_BOOLEAN_AGE_POLICY,
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
exports.INFER_LOAD_TIME_WITH_INTEGER_AGE_POLICY = {
  method: 'metrics.mediaLoadStart',
  params: exports.STATIC_METRICS_VARIABLES.ENTITY_INTEGER_AGE_POLICY,
  expected: 'error',
};
exports.INFER_LOAD_TIME_WITH_BOOLEAN_AGE_POLICY = {
  method: 'metrics.mediaLoadStart',
  params: exports.STATIC_METRICS_VARIABLES.ENTITY_BOOLEAN_AGE_POLICY,
  expected: 'error',
};
exports.START_PLAYBACK_WITH_NUMERIC_ENTITYID = {
  method: 'metrics.mediaPlay',
  params: this.STATIC_METRICS_VARIABLES.INTEGER_12,
  expected: 'error',
};
exports.START_PLAYBACK_WITH_INTEGER_AGE_POLICY = {
  method: 'metrics.mediaPlay',
  params: exports.STATIC_METRICS_VARIABLES.ENTITY_INTEGER_AGE_POLICY,
  expected: 'error',
};
exports.START_PLAYBACK_WITH_BOOLEAN_AGE_POLICY = {
  method: 'metrics.mediaPlay',
  params: exports.STATIC_METRICS_VARIABLES.ENTITY_BOOLEAN_AGE_POLICY,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_HAS_STARTED_WITH_NUMERIC_ENTITYID = {
  method: 'metrics.mediaPlaying',
  params: this.STATIC_METRICS_VARIABLES.INTEGER_12,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_HAS_STARTED_WITH_INTEGER_AGE_POLICY = {
  method: 'metrics.mediaPlaying',
  params: exports.STATIC_METRICS_VARIABLES.ENTITY_INTEGER_AGE_POLICY,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_HAS_STARTED_WITH_BOOLEAN_AGE_POLICY = {
  method: 'metrics.mediaPlaying',
  params: exports.STATIC_METRICS_VARIABLES.ENTITY_BOOLEAN_AGE_POLICY,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_HAS_PAUSED_WITH_NUMERIC_ENTITYID = {
  method: 'metrics.mediaPause',
  params: this.STATIC_METRICS_VARIABLES.INTEGER_12,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_HAS_PAUSED_WITH_INTEGER_AGE_POLICY = {
  method: 'metrics.mediaPause',
  params: exports.STATIC_METRICS_VARIABLES.ENTITY_INTEGER_AGE_POLICY,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_HAS_PAUSED_WITH_BOOLEAN_AGE_POLICY = {
  method: 'metrics.mediaPause',
  params: exports.STATIC_METRICS_VARIABLES.ENTITY_BOOLEAN_AGE_POLICY,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_HAS_HALTED_WITH_NUMERIC_ENTITYID = {
  method: 'metrics.mediaWaiting',
  params: this.STATIC_METRICS_VARIABLES.INTEGER_12,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_HAS_HALTED_WITH_INTEGER_AGE_POLICY = {
  method: 'metrics.mediaWaiting',
  params: exports.STATIC_METRICS_VARIABLES.ENTITY_INTEGER_AGE_POLICY,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_HAS_HALTED_WITH_BOOLEAN_AGE_POLICY = {
  method: 'metrics.mediaWaiting',
  params: exports.STATIC_METRICS_VARIABLES.ENTITY_BOOLEAN_AGE_POLICY,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_IS_PROGRESSING_WITH_STRING_MEDIAPOSITION = {
  method: 'metrics.mediaProgress',
  params: this.STATIC_METRICS_VARIABLES.MEDIAPROGRESS_ERROR,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_IS_PROGRESSING_WITH_INTEGER_AGE_POLICY = {
  method: 'metrics.mediaProgress',
  params: exports.STATIC_METRICS_VARIABLES.PROGRESS_INTEGER_AGE_POLICY,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_IS_PROGRESSING_WITH_BOOLEAN_AGE_POLICY = {
  method: 'metrics.mediaProgress',
  params: exports.STATIC_METRICS_VARIABLES.PROGRESS_BOOLEAN_AGE_POLICY,
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
exports.NOTIFY_THAT_PLAYBACK_SEEK_IS_INITIATED_WITH_INTEGER_AGE_POLICY = {
  method: 'metrics.mediaSeeking',
  params: exports.STATIC_METRICS_VARIABLES.SEEKING_INTEGER_AGE_POLICY,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_SEEK_IS_INITIATED_WITH_BOOLEAN_AGE_POLICY = {
  method: 'metrics.mediaSeeking',
  params: exports.STATIC_METRICS_VARIABLES.SEEKING_BOOLEAN_AGE_POLICY,
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
exports.NOTIFY_THAT_PLAYBACK_SEEK_IS_COMPLETED_WITH_INTEGER_AGE_POLICY = {
  method: 'metrics.mediaSeeked',
  params: exports.STATIC_METRICS_VARIABLES.SEEKED_INTEGER_AGE_POLICY,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_SEEK_IS_COMPLETED_WITH_BOOLEAN_AGE_POLICY = {
  method: 'metrics.mediaSeeked',
  params: exports.STATIC_METRICS_VARIABLES.SEEKED_BOOLEAN_AGE_POLICY,
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
exports.NOTIFY_THAT_PLAYBACK_RATE_IS_CHANGED_WITH_INTEGER_AGE_POLICY = {
  method: 'metrics.mediaRateChange',
  params: exports.STATIC_METRICS_VARIABLES.RATE_CHANGE_INTEGER_AGE_POLICY,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_RATE_IS_CHANGED_WITH_BOOLEAN_AGE_POLICY = {
  method: 'metrics.mediaRateChange',
  params: exports.STATIC_METRICS_VARIABLES.RATE_CHANGE_BOOLEAN_AGE_POLICY,
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
exports.NOTIFY_THAT_PLAYBACK_RENDITION_IS_CHANGED_WITH_INTEGER_AGE_POLICY = {
  method: 'metrics.mediaRenditionChange',
  params: exports.STATIC_METRICS_VARIABLES.RENDITION_INTEGER_AGE_POLICY,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_RENDITION_IS_CHANGED_WITH_BOOLEAN_AGE_POLICY = {
  method: 'metrics.mediaRenditionChange',
  params: exports.STATIC_METRICS_VARIABLES.RENDITION_BOOLEAN_AGE_POLICY,
  expected: 'error',
};
exports.INFORM_THE_PLATFORM_OF_EVENT_WITH_MISSING_SCHEMA = {
  method: 'metrics.event',
  params: exports.STATIC_METRICS_VARIABLES.EVENT_MISSING_SCHEMA,
  expected: 'error',
};
exports.INFORM_THE_PLATFORM_OF_EVENT_WITH_NUMERIC_SCHEMA = {
  method: 'metrics.event',
  params: exports.STATIC_METRICS_VARIABLES.EVENT_NUMERIC_SCHEMA,
  expected: 'error',
};
exports.INFORM_THE_PLATFORM_OF_EVENT_WITH_BOOLEAN_SCHEMA = {
  method: 'metrics.event',
  params: exports.STATIC_METRICS_VARIABLES.EVENT_BOOLEAN_SCHEMA,
  expected: 'error',
};
exports.INFORM_THE_PLATFORM_OF_EVENT_WITH_NULL_SCHEMA = {
  method: 'metrics.event',
  params: exports.STATIC_METRICS_VARIABLES.EVENT_NULL_SCHEMA,
  expected: 'error',
};
exports.INFORM_THE_PLATFORM_OF_EVENT_WITH_MISSING_DATA = {
  method: 'metrics.event',
  params: exports.STATIC_METRICS_VARIABLES.EVENT_MISSING_DATA,
  expected: 'error',
};
exports.INFORM_THE_PLATFORM_OF_EVENT_WITH_NULL_DATA = {
  method: 'metrics.event',
  params: exports.STATIC_METRICS_VARIABLES.EVENT_NULL_DATA,
  expected: 'error',
};
exports.INFORM_THE_PLATFORM_OF_EVENT_WITH_STRING_DATA = {
  method: 'metrics.event',
  params: exports.STATIC_METRICS_VARIABLES.EVENT_STRING_DATA,
  expected: 'error',
};
exports.INFORM_THE_PLATFORM_OF_EVENT_WITH_NUMERIC_DATA = {
  method: 'metrics.event',
  params: exports.STATIC_METRICS_VARIABLES.EVENT_NUMERIC_DATA,
  expected: 'error',
};
exports.INFORM_THE_PLATFORM_OF_EVENT_WITH_BOOLEAN_DATA = {
  method: 'metrics.event',
  params: exports.STATIC_METRICS_VARIABLES.EVENT_BOOLEAN_DATA,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_HAS_STOPPED_WITH_NUMERIC_ENTITYID = {
  method: 'metrics.mediaEnded',
  params: this.STATIC_METRICS_VARIABLES.INTEGER_12,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_HAS_STOPPED_WITH_INTEGER_AGE_POLICY = {
  method: 'metrics.mediaEnded',
  params: exports.STATIC_METRICS_VARIABLES.ENTITY_INTEGER_AGE_POLICY,
  expected: 'error',
};
exports.NOTIFY_THAT_PLAYBACK_HAS_STOPPED_WITH_BOOLEAN_AGE_POLICY = {
  method: 'metrics.mediaEnded',
  params: exports.STATIC_METRICS_VARIABLES.ENTITY_BOOLEAN_AGE_POLICY,
  expected: 'error',
};
exports.INFORM_THE_PLATFORM_ABOUT_APP_WITH_NUMERIC_BUILD = {
  method: 'metrics.appInfo',
  params: this.STATIC_METRICS_VARIABLES.INTEGER_BUILD,
  expected: 'error',
};
exports.INFORM_THE_PLATFORM_OF_EVENT_WITH_INTEGER_AGE_POLICY = {
  method: 'metrics.event',
  params: exports.STATIC_METRICS_VARIABLES.EVENT_INTEGER_AGE_POLICY,
  expected: 'error',
};
exports.INFORM_THE_PLATFORM_OF_EVENT_WITH_BOOLEAN_AGE_POLICY = {
  method: 'metrics.event',
  params: exports.STATIC_METRICS_VARIABLES.EVENT_BOOLEAN_AGE_POLICY,
  expected: 'error',
};
exports.INVALID_PARAMS_FOR_METRICS_APPINFO = {
  method: 'metrics.appInfo',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
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
exports.INFORM_THE_PLATFORM_ABOUT_APP_BUILD = {
  method: 'metrics.appInfo',
  params: this.METRICS_VARIABLES.appBuild,
};
exports.NULL_FOR_METRICS_APPINFO = {
  method: 'metrics.appInfo',
  validationJsonPath: 'result',
  content: null,
};
exports.INVALID_PARAMS_FOR_METRICS_MEDIAENDED = {
  method: 'metrics.mediaEnded',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};
exports.INFORM_THE_PLATFORM_ABOUT_APP_WITH_BOOLEAN_BUILD = {
  method: 'metrics.appInfo',
  params: { build: true },
  expected: 'error',
};
