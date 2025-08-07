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
exports.DISCOVERY_RECOMMENDATIONS = {
  method: 'discovery.policy',
  params: {},
  validationJsonPath: 'result.enableRecommendations',
  setMethod: resolveAtRuntime('manage_privacy.set{{attribute.uppercaseFirstChar}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
  event: 'discovery.onPolicyChanged',
  eventValidationJsonPath: 'eventResponse.enableRecommendations',
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: resolveAtRuntime('value'),
            description: resolveAtRuntime(
              'Validating that manage_privacy.set{{attribute.uppercaseFirstChar}} {{attribute}} is {{value}}'
            ),
          },
        ],
      },
    ],
  },
};
exports.DISCOVERY_REMEMBER_WATCHED_PROGRAMS = {
  method: 'discovery.policy',
  params: {},
  validationJsonPath: 'result.rememberWatchedPrograms',
  setMethod: resolveAtRuntime('manage_privacy.set{{attribute.uppercaseFirstChar}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
  event: 'discovery.onPolicyChanged',
  eventValidationJsonPath: 'eventResponse.rememberWatchedPrograms',
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: resolveAtRuntime('value'),
            description: resolveAtRuntime(
              'Validating that manage_privacy.set{{attribute.uppercaseFirstChar}} {{attribute}} is {{value}}'
            ),
          },
        ],
      },
    ],
  },
};

exports.DISCOVERY_CLEARCONTENTACCESS = {
  method: 'discovery.clearContentAccess',
  params: {},
  validationJsonPath: 'result',
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: null,
            description: resolveAtRuntime('Validating that discovery.clearContentAccess'),
          },
        ],
      },
    ],
  },
};

exports.DISCOVERY_COMMON_VARIABLES = {
  DISCOVERY: {
    SIGNIN_WITH_ENTITILEMENTS: {
      entitlements: [
        {
          entitlementId: 'test-entitlement-firecert-1',
          startTime: '2025-01-01T00:00:00.000Z',
          endTime: '2025-01-01T00:00:00.000Z',
        },
      ],
    },
    WATCHED_ONLY_ENTITY_ID: {
      entityId: 'partner.com/entity/123',
    },
    WATCHED_ENTITY_ID_PROGRESS: {
      entityId: 'partner.com/entity/123',
      progress: 0.95,
    },
    WATCHED_ENTITY_ID_PROGRESS_STATUS: {
      entityId: 'partner.com/entity/123',
      progress: 0.95,
      completed: true,
    },
    WATCHED_ENTITY_ID_PROGRESS_STATUS_DATE: {
      entityId: 'partner.com/entity/123',
      progress: 0.95,
      completed: true,
      watchedOn: '2021-04-23T18:25:43.511Z',
    },
    WATCHED_ENTITY_ID_PROGRESS_STATUS_DATE_CHILD_POLICY: {
      entityId: 'partner.com/entity/123',
      progress: 0.95,
      completed: true,
      watchedOn: '2021-04-23T18:25:43.511Z',
      options: {
        agePolicy: 'app:child',
      },
    },
    WATCHED_ENTITY_ID_PROGRESS_STATUS_DATE_TEEN_POLICY: {
      entityId: 'partner.com/entity/123',
      progress: 0.95,
      completed: true,
      watchedOn: '2021-04-23T18:25:43.511Z',
      options: {
        agePolicy: 'app:teen',
      },
    },
    WATCHED_ENTITY_ID_PROGRESS_STATUS_DATE_ADULT_POLICY: {
      entityId: 'partner.com/entity/123',
      progress: 0.95,
      completed: true,
      watchedOn: '2021-04-23T18:25:43.511Z',
      options: {
        agePolicy: 'app:adult',
      },
    },
    WATCHED_ENTITY_ID_PROGRESS_STATUS_DATE_CUSTOM_POLICY: {
      entityId: 'partner.com/entity/123',
      progress: 0.95,
      completed: true,
      watchedOn: '2021-04-23T18:25:43.511Z',
      options: {
        agePolicy: 'test',
      },
    },
    WATCHED_ENTITY_ID_PROGRESS_STATUS_DATE_EMPTY_POLICY: {
      entityId: 'partner.com/entity/123',
      progress: 0.95,
      completed: true,
      watchedOn: '2021-04-23T18:25:43.511Z',
      options: {
        agePolicy: '',
      },
    },
    WATCHNEXT_ONLY_TITLE_IDENTIFIERS_ENTITYID: {
      title: 'A Cool Show',
      identifiers: {
        entityId: 'partner.com/entity/567',
      },
    },
    WATCHNEXT_ONLY_TITLE_IDENTIFIERS_ENTITYID_ASSETID: {
      title: 'A Cool Show',
      identifiers: {
        entityId: 'partner.com/entity/567',
        assetId: '123bjs13',
      },
    },
    WATCHNEXT_ONLY_TITLE_IDENTIFIERS_ENTITYID_ASSETID_SESSIONID: {
      title: 'A Cool Show',
      identifiers: {
        entityId: 'partner.com/entity/567',
        assetId: '123bjs13',
        seasonId: 'SE02',
      },
    },
    WATCHNEXT_ONLY_TITLE_IDENTIFIERS_ENTITYID_ASSETID_SESSIONID_SERIESID: {
      title: 'A Cool Show',
      identifiers: {
        entityId: 'partner.com/entity/567',
        assetId: '123bjs13',
        seasonId: 'SE02',
        seriesId: 'GOT',
      },
    },
    WATCHNEXT_ONLY_TITLE_IDENTIFIERS_ENTITYID_ASSETID_SESSIONID_SERIESID_APPCONTENTDATA: {
      title: 'A Cool Show',
      identifiers: {
        entityId: 'partner.com/entity/567',
        assetId: '123bjs13',
        seasonId: 'SE02',
        seriesId: 'GOT',
        appContentData: 'HBOMAX',
      },
    },
    WATCHNEXT_ONLY_TITLE_IDENTIFIERS_EXPIRES: {
      title: 'A Cool Show',
      identifiers: {
        entityId: 'partner.com/entity/567',
      },
      expires: '2021-04-23T18:25:43.511Z',
    },
    WATCHNEXT_ONLY_TITLE_IDENTIFIERS_EXPIRES_IMAGES: {
      title: 'A Cool Show',
      identifiers: {
        entityId: 'partner.com/entity/567',
      },
      expires: '2021-04-23T18:25:43.511Z',
      images: {
        '3x4': {
          'en-US': 'https://i.ytimg.com/vi/4r7wHMg5Yjg/maxresdefault.jpg',
          es: 'https://i.ytimg.com/vi/4r7wHMg5Yjg/maxresdefault.jpg',
        },
        '16x9': {
          en: 'https://i.ytimg.com/vi/4r7wHMg5Yjg/maxresdefault.jpg',
        },
      },
    },
    ENTITLEMENTS: {
      entitlements: [
        {
          entitlementId: 'test-entitlement-firecert-1',
          startTime: '2025-01-01T00:00:00.000Z',
          endTime: '2025-01-01T00:00:00.000Z',
        },
      ],
    },
    ENTITLEMENTS_ENTITLEMENTID_ONLY: {
      entitlements: [
        {
          entitlementId: 'test-entitlement-firecert-1',
        },
      ],
    },
    WATCHED_INVALID_ENTITY_ID_NUMBER: {
      entityId: 123,
    },
    WATCHED_INVALID_PROGRESS: {
      entityId: 'partner.com/entity/123',
      progress: -0.95,
    },
    WATCHED_INVALID_PROGRESS_STRING: {
      entityId: 'partner.com/entity/123',
      progress: '0.95',
    },
    WATCHED_INVALID_COMPLETED: {
      entityId: 'partner.com/entity/123',
      progress: 0.95,
      completed: 'invalid value',
    },
    WATCHED_INVALID_WATCHEDON: {
      entityId: 'partner.com/entity/123',
      progress: 0.95,
      completed: true,
      watchedOn: 123,
    },
    WATCHED_INVALID_INTEGER_AGE_POLICY_VALUE: {
      entityId: 'partner.com/entity/123',
      progress: 0.95,
      completed: true,
      watchedOn: '2021-04-23T18:25:43.511Z',
      options: {
        agePolicy: 123,
      },
    },
    WATCHED_INVALID_BOOLEAN_AGE_POLICY_VALUE: {
      entityId: 'partner.com/entity/123',
      progress: 0.95,
      completed: true,
      watchedOn: '2021-04-23T18:25:43.511Z',
      options: {
        agePolicy: true,
      },
    },
    WATCHNEXT_ONLY_TITLE: {
      title: 'A Cool Show',
    },
    WATCHNEXT_INVALID_IDENTIFIERS: {
      title: 'A Cool Show',
      identifiers: 'entityId',
    },
    WATCHNEXT_INVALID_IDENTIFIERS_ENTITYID: {
      title: 'A Cool Show',
      identifiers: {
        entityId: true,
      },
    },
    WATCHNEXT_INVALID_IDENTIFIERS_ASSETID: {
      title: 'A Cool Show',
      identifiers: {
        entityId: 'partner.com/entity/567',
        assetId: 21,
      },
    },
    WATCHNEXT_INVALID_IDENTIFIERS_SESSIONID: {
      title: 'A Cool Show',
      identifiers: {
        entityId: 'partner.com/entity/567',
        assetId: '123bjs13',
        seasonId: 4,
      },
    },
    WATCHNEXT_INVALID_IDENTIFIERS_SERIESID: {
      title: 'A Cool Show',
      identifiers: {
        entityId: 'partner.com/entity/567',
        assetId: '123bjs13',
        seasonId: 'SE02',
        seriesId: false,
      },
    },
    WATCHNEXT_INVALID_IDENTIFIERS_APPCONTENTDATA: {
      title: 'A Cool Show',
      identifiers: {
        entityId: 'partner.com/entity/567',
        assetId: '123bjs13',
        seasonId: 'SE02',
        seriesId: 'GOT',
        appContentData: 10,
      },
    },
    WATCHNEXT_INVALID_EXPIRES: {
      title: 'A Cool Show',
      identifiers: {
        entityId: 'partner.com/entity/567',
      },
      expires: 'True',
    },
    WATCHNEXT_INVALID_EXPIRES_INTEGER: {
      title: 'A Cool Show',
      identifiers: {
        entityId: 'partner.com/entity/567',
      },
      expires: 123,
    },
    WATCHNEXT_INVALID_IMAGES: {
      title: 'A Cool Show',
      identifiers: {
        entityId: 'partner.com/entity/567',
      },
      expires: '2021-04-23T18:25:43.511Z',
      images: {
        '3X4': 'INVALID image',
      },
    },
    WATCHNEXT_INVALID_IMAGE_INTEGER: {
      title: 'A Cool Show',
      identifiers: {
        entityId: 'partner.com/entity/567',
      },
      expires: '2021-04-23T18:25:43.511Z',
      images: 123,
    },
    INVALID_ENTITLEMENTS_ENTITLEMENTID: {
      entitlements: [
        {
          startTime: '2025-01-01T00:00:00.000Z',
          endTime: '2025-01-01T00:00:00.000Z',
        },
      ],
    },
    INVALID_ENTITLEMENTS_INTEGER_PARAMS: {
      entitlements: [
        {
          entitlementId: 123,
          startTime: 123,
          endTime: 123,
        },
      ],
    },
    SIGNIN_INVALID_ENTITLEMENTS: {
      entitlements: [
        {
          startTime: '2025-01-01T00:00:00.000Z',
          endTime: '2025-01-01T00:00:00.000Z',
        },
      ],
    },
    CONTENTACCESS_AVAILABILITIES_ONLY_TYPE_ID: {
      ids: {
        availabilities: [
          {
            type: 'program-lineup',
            id: 'chmap-lineup-a-firecert',
          },
        ],
      },
    },
    CONTENTACCESS_WITH_AVAILABILITIES_AND_ENTITLEMENTS: {
      ids: {
        availabilities: [
          {
            type: 'channel-lineup',
            id: 'chmap-lineup-a-firecert',
            startTime: '2021-04-23T18:25:43.511Z',
            endTime: '2021-04-23T18:25:43.511Z',
          },
          {
            type: 'channel-lineup',
            id: 'chmap-lineup-a-firecert',
            startTime: '2021-04-23T18:25:43.511Z',
            endTime: '2021-04-23T18:25:43.511Z',
          },
        ],
        entitlements: [
          {
            entitlementId: 'test-entitlement-firecert-1',
            startTime: '2025-01-01T00:00:00.000Z',
            endTime: '2025-01-01T00:00:00.000Z',
          },
        ],
      },
    },
    CONTENTACCESS_WITH_ONLY_ENTITLEMENTS: {
      ids: {
        entitlements: [
          {
            entitlementId: 'test-entitlement-firecert-1',
            startTime: '2025-01-01T00:00:00.000Z',
            endTime: '2025-01-01T00:00:00.000Z',
          },
        ],
      },
    },
    CONTENTACCESS_AVAILABILITIES_AS_EMPTY: {
      ids: {
        availabilities: [],
      },
    },
    CONTENTACCESS_ENTITLEMENTS_AS_EMPTY: {
      ids: {
        entitlements: [],
      },
    },
    CONTENTACCESS_AVAILABILITIES_WITHOUT_TYPE: {
      ids: {
        availabilities: [
          {
            id: 'partner.com/availability/123',
            catalogId: 'app1',
            startTime: '2021-04-23T18:25:43.511Z',
            endTime: '2021-04-23T18:25:43.511Z',
          },
        ],
      },
    },
    CONTENTACCESS_AVAILABILITIES_WITHOUT_ID: {
      ids: {
        availabilities: [
          {
            type: 'program-lineup',
            catalogId: 'app1',
            startTime: '2021-04-23T18:25:43.511Z',
            endTime: '2021-04-23T18:25:43.511Z',
          },
        ],
      },
    },
    CONTENTACCESS_AVAILABILITIES_INVALID_TYPE_VALUE: {
      ids: {
        availabilities: [
          {
            type: 'device-lineup',
            id: 'partner.com/availability/123',
            catalogId: 'app1',
            startTime: '2021-04-23T18:25:43.511Z',
            endTime: '2021-04-23T18:25:43.511Z',
          },
        ],
      },
    },
    CONTENTACCESS_AVAILABILITIES_INVALID_DATATYPE_TYPE: {
      ids: {
        availabilities: [
          {
            type: false,
            id: 'partner.com/availability/123',
            catalogId: 'app1',
            startTime: '2021-04-23T18:25:43.511Z',
            endTime: '2021-04-23T18:25:43.511Z',
          },
        ],
      },
    },
    CONTENTACCESS_AVAILABILITIES_INVALID_DATATYPE_ID: {
      ids: {
        availabilities: [
          {
            type: 'program-lineup',
            id: false,
            catalogId: 'app1',
            startTime: '2021-04-23T18:25:43.511Z',
            endTime: '2021-04-23T18:25:43.511Z',
          },
        ],
      },
    },
    CONTENTACCESS_AVAILABILITIES_INVALID_DATATYPE_CATALOG_ID: {
      ids: {
        availabilities: [
          {
            type: 'program-lineup',
            id: 'partner.com/availability/123',
            catalogId: 123,
            startTime: '2021-04-23T18:25:43.511Z',
            endTime: '2021-04-23T18:25:43.511Z',
          },
        ],
      },
    },
    CONTENTACCESS_AVAILABILITIES_INVALID_DATATYPE_START_TIME: {
      ids: {
        availabilities: [
          {
            type: 'program-lineup',
            id: 'partner.com/availability/123',
            catalogId: 'app1',
            startTime: true,
            endTime: '2021-04-23T18:25:43.511Z',
          },
        ],
      },
    },
    CONTENTACCESS_AVAILABILITIES_INVALID_DATATYPE_END_TIME: {
      ids: {
        availabilities: [
          {
            type: 'program-lineup',
            id: 'partner.com/availability/123',
            catalogId: 'app1',
            startTime: '2021-04-23T18:25:43.511Z',
            endTime: false,
          },
        ],
      },
    },
    CONTENTACCESS_ENTITLEMENTS_INVALID_ENTITLEMENTID_TRUE: {
      ids: {
        entitlements: [
          {
            entitlementId: true,
            startTime: '2025-01-01T00:00:00.000Z',
            endTime: '2025-01-01T00:00:00.000Z',
          },
        ],
      },
    },
    CONTENTACCESS_ENTITLEMENTS_INVALID_ENTITLEMENTID_INTEGER: {
      ids: {
        entitlements: [
          {
            entitlementId: 123,
            startTime: '2025-01-01T00:00:00.000Z',
            endTime: '2025-01-01T00:00:00.000Z',
          },
        ],
      },
    },
    CONTENTACCESS_ENTITLEMENTS_INVALID_START_TIME: {
      ids: {
        entitlements: [
          {
            entitlementId: '123',
            startTime: '01022023',
          },
        ],
      },
    },
    CONTENTACCESS_ENTITLEMENTS_INVALID_END_TIME: {
      ids: {
        entitlements: [
          {
            entitlementId: '123',
            endTime: '01022023',
          },
        ],
      },
    },
  },
};
exports.DISCOVERY_ONSIGNIN = {
  method: 'manage_discovery.onSignIn',
  params: {},
};

exports.NOTIFY_USER_HAS_SIGNED_IN_WITH_ENTITLEMENTS = {
  method: 'discovery.signIn',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.SIGNIN_WITH_ENTITILEMENTS,
};

exports.NOTIFY_USER_HAS_SIGNED_IN_WITHOUT_ENTITLEMENTS = {
  method: 'discovery.signIn',
  params: {},
};

exports.DISCOVERY_ONSIGNOUT = {
  method: 'manage_discovery.onSignOut',
  params: {},
};

exports.NOTIFY_USER_HAS_SIGNED_OUT = {
  method: 'discovery.signOut',
  params: {},
};

exports.SIGNIN_FOR_DISCOVERY = {
  method: 'discovery.signIn',
  validationJsonPath: 'result',
  content: true,
};

exports.SIGNOUT_FOR_DISCOVERY = {
  method: 'discovery.signOut',
  validationJsonPath: 'result',
  content: true,
};

exports.NOTIFY_WATCHED_CONTENT_WITH_ONLY_ENTITYID = {
  method: 'discovery.watched',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHED_ONLY_ENTITY_ID,
};

exports.NOTIFY_WATCHED_CONTENT_WITH_ENTITYID_PROGRESS = {
  method: 'discovery.watched',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHED_ENTITY_ID_PROGRESS,
};

exports.NOTIFY_WATCHED_CONTENT_WITH_ENTITYID_PROGRESS_STATUS = {
  method: 'discovery.watched',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHED_ENTITY_ID_PROGRESS_STATUS,
};

exports.NOTIFY_WATCHED_CONTENT_WITH_ENTITYID_PROGRESS_STATUS_DATE = {
  method: 'discovery.watched',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHED_ENTITY_ID_PROGRESS_STATUS_DATE,
};

exports.NOTIFY_WATCHED_CONTENT_WITH_ENTITYID_PROGRESS_STATUS_DATE_CHILD_POLICY = {
  method: 'discovery.watched',
  params:
    this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHED_ENTITY_ID_PROGRESS_STATUS_DATE_CHILD_POLICY,
};
exports.NOTIFY_WATCHED_CONTENT_WITH_ENTITYID_PROGRESS_STATUS_DATE_TEEN_POLICY = {
  method: 'discovery.watched',
  params:
    this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHED_ENTITY_ID_PROGRESS_STATUS_DATE_TEEN_POLICY,
};
exports.NOTIFY_WATCHED_CONTENT_WITH_ENTITYID_PROGRESS_STATUS_DATE_ADULT_POLICY = {
  method: 'discovery.watched',
  params:
    this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHED_ENTITY_ID_PROGRESS_STATUS_DATE_ADULT_POLICY,
};
exports.NOTIFY_WATCHED_CONTENT_WITH_ENTITYID_PROGRESS_STATUS_DATE_CUSTOM_POLICY = {
  method: 'discovery.watched',
  params:
    this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHED_ENTITY_ID_PROGRESS_STATUS_DATE_CUSTOM_POLICY,
};
exports.NOTIFY_WATCHED_CONTENT_WITH_ENTITYID_PROGRESS_STATUS_DATE_EMPTY_POLICY = {
  method: 'discovery.watched',
  params:
    this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHED_ENTITY_ID_PROGRESS_STATUS_DATE_EMPTY_POLICY,
};

exports.TRUE_FOR_WATCHED_CONTENT_IN_DISCOVERY = {
  method: 'discovery.watched',
  validationJsonPath: 'result',
  content: true,
};

exports.SUGGEST_WATCHNEXT_TILE_WITH_ENTITYID = {
  method: 'discovery.watchNext',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHNEXT_ONLY_TITLE_IDENTIFIERS_ENTITYID,
};

exports.SUGGEST_WATCHNEXT_TILE_WITH_ENTITYID_ASSETID = {
  method: 'discovery.watchNext',
  params:
    this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHNEXT_ONLY_TITLE_IDENTIFIERS_ENTITYID_ASSETID,
};
exports.SUGGEST_WATCHNEXT_TILE_WITH_ENTITYID_ASSETID_SESSIONID = {
  method: 'discovery.watchNext',
  params:
    this.DISCOVERY_COMMON_VARIABLES.DISCOVERY
      .WATCHNEXT_ONLY_TITLE_IDENTIFIERS_ENTITYID_ASSETID_SESSIONID,
};
exports.SUGGEST_WATCHNEXT_TILE_WITH_ENTITYID_ASSETID_SESSIONID_SERIESID = {
  method: 'discovery.watchNext',
  params:
    this.DISCOVERY_COMMON_VARIABLES.DISCOVERY
      .WATCHNEXT_ONLY_TITLE_IDENTIFIERS_ENTITYID_ASSETID_SESSIONID_SERIESID,
};
exports.SUGGEST_WATCHNEXT_TILE_WITH_ENTITYID_ASSETID_SESSIONID_SERIESID_APPCONTENTDATA = {
  method: 'discovery.watchNext',
  params:
    this.DISCOVERY_COMMON_VARIABLES.DISCOVERY
      .WATCHNEXT_ONLY_TITLE_IDENTIFIERS_ENTITYID_ASSETID_SESSIONID_SERIESID_APPCONTENTDATA,
};
exports.SUGGEST_WATCHNEXT_TILE_WITH_EXPIRES = {
  method: 'discovery.watchNext',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHNEXT_ONLY_TITLE_IDENTIFIERS_EXPIRES,
};
exports.SUGGEST_WATCHNEXT_TILE_WITH_EXPIRES_IMAGES = {
  method: 'discovery.watchNext',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHNEXT_ONLY_TITLE_IDENTIFIERS_EXPIRES_IMAGES,
};
exports.TRUE_FOR_WATCHNEXT_TILE_IN_DISCOVERY = {
  method: 'discovery.watchNext',
  validationJsonPath: 'result',
  content: true,
};

exports.NOTIFY_ENTITLEMENTS = {
  method: 'discovery.entitlements',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.ENTITLEMENTS,
};
exports.NOTIFY_ENTITLEMENTS_WITH_ENTITLEMENTID_ONLY = {
  method: 'discovery.entitlements',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.ENTITLEMENTS_ENTITLEMENTID_ONLY,
};
exports.TRUE_FOR_ENTITLEMENTS_IN_DISCOVERY = {
  method: 'discovery.entitlements',
  validationJsonPath: 'result',
  content: true,
};

exports.NOTIFY_WATCHED_CONTENT_WITH_EMPTY_PARAMETER = {
  method: 'discovery.watched',
  params: {},
  expected: 'error',
};

exports.NOTIFY_WATCHED_CONTENT_WITH_INVALID_ENTITYID_NUMBER = {
  method: 'discovery.watched',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHED_INVALID_ENTITY_ID_NUMBER,
  expected: 'error',
};

exports.NOTIFY_WATCHED_CONTENT_WITH_INVALID_PROGRESS = {
  method: 'discovery.watched',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHED_INVALID_PROGRESS,
  expected: 'error',
};

exports.NOTIFY_WATCHED_CONTENT_WITH_INVALID_PROGRESS_STRING = {
  method: 'discovery.watched',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHED_INVALID_PROGRESS_STRING,
  expected: 'error',
};

exports.NOTIFY_WATCHED_CONTENT_WITH_INVALID_COMPLETED = {
  method: 'discovery.watched',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHED_INVALID_COMPLETED,
  expected: 'error',
};

exports.NOTIFY_WATCHED_CONTENT_WITH_INVALID_WATCHEDON = {
  method: 'discovery.watched',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHED_INVALID_WATCHEDON,
  expected: 'error',
};
exports.NOTIFY_WATCHED_CONTENT_WITH_INVALID_INTEGER_AGE_POLICY_VALUE = {
  method: 'discovery.watched',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHED_INVALID_INTEGER_AGE_POLICY_VALUE,
  expected: 'error',
};
exports.NOTIFY_WATCHED_CONTENT_WITH_INVALID_BOOLEAN_AGE_POLICY_VALUE = {
  method: 'discovery.watched',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHED_INVALID_BOOLEAN_AGE_POLICY_VALUE,
  expected: 'error',
};

exports.INVALID_PARAMS_FOR_DISCOVERY_WATCHED = {
  method: 'discovery.watched',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};

exports.INVALID_PARAMS_FOR_DISCOVERY_WATCHNEXT = {
  method: 'discovery.watchNext',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};

exports.INVALID_PARAMS_FOR_DISCOVERY_ENTITLEMENTS = {
  method: 'discovery.entitlements',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};

exports.SUGGEST_WATCHNEXT_TILE_WITH_ONLY_TITLE = {
  method: 'discovery.watchNext',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHNEXT_ONLY_TITLE,
  expected: 'error',
};

exports.SUGGEST_WATCHNEXT_TILE_WITH_INVALID_IDENTIFIERS = {
  method: 'discovery.watchNext',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHNEXT_INVALID_IDENTIFIERS,
  expected: 'error',
};

exports.SUGGEST_WATCHNEXT_TILE_WITH_INVALID_EXPIRES = {
  method: 'discovery.watchNext',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHNEXT_INVALID_EXPIRES,
  expected: 'error',
};
exports.SUGGEST_WATCHNEXT_TILE_WITH_INVALID_EXPIRES_INTEGER = {
  method: 'discovery.watchNext',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHNEXT_INVALID_EXPIRES_INTEGER,
  expected: 'error',
};

exports.SUGGEST_WATCHNEXT_TILE_WITH_INVALID_IMAGES = {
  method: 'discovery.watchNext',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHNEXT_INVALID_IMAGES,
  expected: 'error',
};

exports.SUGGEST_WATCHNEXT_TILE_WITH_INVALID_IMAGE_INTEGER = {
  method: 'discovery.watchNext',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHNEXT_INVALID_IMAGE_INTEGER,
  expected: 'error',
};
exports.SUGGEST_WATCHNEXT_TILE_WITH_INVALID_IDENTIFIERS_ENTITYID = {
  method: 'discovery.watchNext',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHNEXT_INVALID_IDENTIFIERS_ENTITYID,
  expected: 'error',
};

exports.SUGGEST_WATCHNEXT_TILE_WITH_INVALID_IDENTIFIERS_ASSETID = {
  method: 'discovery.watchNext',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHNEXT_INVALID_IDENTIFIERS_ASSETID,
  expected: 'error',
};

exports.SUGGEST_WATCHNEXT_TILE_WITH_INVALID_IDENTIFIERS_SESSIONID = {
  method: 'discovery.watchNext',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHNEXT_INVALID_IDENTIFIERS_SESSIONID,
  expected: 'error',
};

exports.SUGGEST_WATCHNEXT_TILE_WITH_INVALID_IDENTIFIERS_SERIESID = {
  method: 'discovery.watchNext',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHNEXT_INVALID_IDENTIFIERS_SERIESID,
  expected: 'error',
};

exports.SUGGEST_WATCHNEXT_TILE_WITH_INVALID_IDENTIFIERS_APPCONTENTDATA = {
  method: 'discovery.watchNext',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.WATCHNEXT_INVALID_IDENTIFIERS_APPCONTENTDATA,
  expected: 'error',
};

exports.NOTIFY_ENTITLEMENTS_WITH_NO_ID = {
  method: 'discovery.entitlements',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.INVALID_ENTITLEMENTS_ENTITLEMENTID,
  expected: 'error',
};

exports.NOTIFY_ENTITLEMENTS_WITH_INTEGER_PARAMS = {
  method: 'discovery.entitlements',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.INVALID_ENTITLEMENTS_INTEGER_PARAMS,
  expected: 'error',
};

exports.NOTIFY_USER_HAS_SIGNEDIN_WITH_NO_ID = {
  method: 'discovery.signIn',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.SIGNIN_INVALID_ENTITLEMENTS,
  expected: 'error',
};

exports.NOTIFY_USER_HAS_SIGNEDIN_WITH_INTEGER_PARAMS = {
  method: 'discovery.signIn',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.INVALID_ENTITLEMENTS_INTEGER_PARAMS,
  expected: 'error',
};

exports.INVALID_PARAMS_FOR_DISCOVERY_SIGNIN = {
  method: 'discovery.signIn',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};

exports.NOTIFY_CONTENT_ACCESS_WITH_AVAILABILITIES_TYPE_AND_ID = {
  method: 'discovery.contentAccess',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.CONTENTACCESS_AVAILABILITIES_ONLY_TYPE_ID,
};

exports.NOTIFY_CONTENT_ACCESS_WITH_AVAILABILITIES_AND_ENTITLEMENTS = {
  method: 'discovery.contentAccess',
  params:
    this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.CONTENTACCESS_WITH_AVAILABILITIES_AND_ENTITLEMENTS,
};
exports.NOTIFY_CONTENT_ACCESS_WITH_ONLY_ENTITLEMENTS = {
  method: 'discovery.contentAccess',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.CONTENTACCESS_WITH_ONLY_ENTITLEMENTS,
};
exports.NOTIFY_CONTENT_ACCESS_WITH_AVAILABILITIES_PARAM_EMPTY = {
  method: 'discovery.contentAccess',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.CONTENTACCESS_AVAILABILITIES_AS_EMPTY,
};
exports.NOTIFY_CONTENT_ACCESS_WITH_ENTITLEMENTS_PARAM_EMPTY = {
  method: 'discovery.contentAccess',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.CONTENTACCESS_ENTITLEMENTS_AS_EMPTY,
};

exports.NULL_FOR_DISCOVERY_CONTENTACCESS = {
  method: 'discovery.contentAccess',
  validationJsonPath: 'result',
  content: null,
};

exports.NOTIFY_CONTENT_ACCESS_WITHOUT_PARAMS = {
  method: 'discovery.contentAccess',
  params: {},
  expected: 'error',
};

exports.NOTIFY_CONTENT_ACCESS_WITHOUT_AVAILABILITIES_TYPE_VALUE = {
  method: 'discovery.contentAccess',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.CONTENTACCESS_AVAILABILITIES_WITHOUT_TYPE,
  expected: 'error',
};

exports.NOTIFY_CONTENT_ACCESS_WITHOUT_AVAILABILITIES_ID_VALUE = {
  method: 'discovery.contentAccess',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.CONTENTACCESS_AVAILABILITIES_WITHOUT_ID,
  expected: 'error',
};

exports.NOTIFY_CONTENT_ACCESS_WITH_INVALID_AVAILABILITIES_TYPE_VALUE = {
  method: 'discovery.contentAccess',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.CONTENTACCESS_AVAILABILITIES_INVALID_TYPE_VALUE,
  expected: 'error',
};

exports.NOTIFY_CONTENT_ACCESS_WITH_INVALID_AVAILABILITIES_TYPE = {
  method: 'discovery.contentAccess',
  params:
    this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.CONTENTACCESS_AVAILABILITIES_INVALID_DATATYPE_TYPE,
  expected: 'error',
};

exports.NOTIFY_CONTENT_ACCESS_WITH_INVALID_AVAILABILITIES_ID = {
  method: 'discovery.contentAccess',
  params:
    this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.CONTENTACCESS_AVAILABILITIES_INVALID_DATATYPE_ID,
  expected: 'error',
};

exports.NOTIFY_CONTENT_ACCESS_WITH_INVALID_AVAILABILITIES_CATALOG_ID = {
  method: 'discovery.contentAccess',
  params:
    this.DISCOVERY_COMMON_VARIABLES.DISCOVERY
      .CONTENTACCESS_AVAILABILITIES_INVALID_DATATYPE_CATALOG_ID,
  expected: 'error',
};

exports.NOTIFY_CONTENT_ACCESS_WITH_INVALID_AVAILABILITIES_STARTTIME = {
  method: 'discovery.contentAccess',
  params:
    this.DISCOVERY_COMMON_VARIABLES.DISCOVERY
      .CONTENTACCESS_AVAILABILITIES_INVALID_DATATYPE_START_TIME,
  expected: 'error',
};

exports.NOTIFY_CONTENT_ACCESS_WITH_INVALID_AVAILABILITIES_ENDTIME = {
  method: 'discovery.contentAccess',
  params:
    this.DISCOVERY_COMMON_VARIABLES.DISCOVERY
      .CONTENTACCESS_AVAILABILITIES_INVALID_DATATYPE_END_TIME,
  expected: 'error',
};

exports.NOTIFY_CONTENT_ACCESS_WITH_INVALID_ENTITLEMENTS_BOOLEAN_ENTITLEMENTID = {
  method: 'discovery.contentAccess',
  params:
    this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.CONTENTACCESS_ENTITLEMENTS_INVALID_ENTITLEMENTID_TRUE,
  expected: 'error',
};

exports.NOTIFY_CONTENT_ACCESS_WITH_INVALID_ENTITLEMENTS_INTEGER_ENTITLEMENTID = {
  method: 'discovery.contentAccess',
  params:
    this.DISCOVERY_COMMON_VARIABLES.DISCOVERY
      .CONTENTACCESS_ENTITLEMENTS_INVALID_ENTITLEMENTID_INTEGER,
  expected: 'error',
};

exports.NOTIFY_CONTENT_ACCESS_WITH_INVALID_ENTITLEMENTS_INVALID_STARTTIME = {
  method: 'discovery.contentAccess',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.CONTENTACCESS_ENTITLEMENTS_INVALID_START_TIME,
  expected: 'error',
};

exports.NOTIFY_CONTENT_ACCESS_WITH_INVALID_ENTITLEMENTS_INVALID_ENDTIME = {
  method: 'discovery.contentAccess',
  params: this.DISCOVERY_COMMON_VARIABLES.DISCOVERY.CONTENTACCESS_ENTITLEMENTS_INVALID_END_TIME,
  expected: 'error',
};

exports.INVALID_PARAMETER_ERROR_FOR_DISCOVERY_CONTENTACCESS = {
  method: 'discovery.contentAccess',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};

exports.DISCOVERY_ONPOLICYCHANGED = {
  method: 'discovery.onPolicyChanged',
  params: {},
};

exports.DISCOVERY_ONPOLICYCHANGED_EVENT = {
  event: 'discovery.onPolicyChanged',
  firstParty: false,
};

exports.SET_ALLOWPERSONALIZATION_TO_TRUE = {
  method: 'manage_privacy.setAllowPersonalization',
  params: { value: true },
};

exports.ONDISCOVERYPOLICYCHANGED = {
  event: 'discovery.onPolicyChanged',
  validationJsonPath: 'eventResponse',
  content: null,
};

exports.DISABLE_RECOMMENDATIONS = {
  method: 'manage_privacy.setAllowPersonalization',
  params: { value: false },
};

exports.DISABLE_REMEMBER_WATCHED_PROGRAMS = {
  method: 'manage_privacy.setAllowWatchHistory',
  params: { value: false },
};
