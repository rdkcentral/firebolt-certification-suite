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

exports.CAPABILITIES_VARIABLES = {
  CAPABILITIES: {
    capabilityInfo: extractEnvValue('CYPRESSENV-capabilitiesList'),
    GRANTED_WITH_GRANT: {
      capability: 'xrn:firebolt:capability:localization:postal-code',
    },
    GRANTED_WITH_OPTIONS_ROLE_USE: {
      capability: 'xrn:firebolt:capability:localization:postal-code',
      options: {
        role: 'use',
      },
    },
    GRANTED_WITH_OPTIONS_ROLE_MANAGE: {
      capability: 'xrn:firebolt:capability:localization:postal-code',
      options: {
        role: 'manage',
      },
    },
    GRANTED_WITH_OPTIONS_ROLE_PROVIDE: {
      capability: 'xrn:firebolt:capability:localization:postal-code',
      options: {
        role: 'provide',
      },
    },
    GET_KEYBOARD: {
      capability: 'xrn:firebolt:capability:input:keyboard',
    },
    GET_ACKNOWLEDGECHALLENGE: {
      capability: 'xrn:firebolt:capability:usergrant:acknowledgechallenge',
    },
    GET_PINCHALLENGE: {
      capability: 'xrn:firebolt:capability:usergrant:pinchallenge',
    },
    INFO_USERGRANT_PINCHALLENGE: {
      capabilities: ['xrn:firebolt:capability:usergrant:pinchallenge'],
    },
    INFO_DEVICE_DISTRIBUTOR: { capabilities: ['xrn:firebolt:capability:device:distributor'] },
    INFO_NETWORK_STATUS: { capabilities: ['xrn:firebolt:capability:network:status'] },
    INFO_LOCALIZATION_TIMEZONE: {
      capabilities: ['xrn:firebolt:capability:localization:time-zone'],
    },
    PRIVACY_SETTINGS_INFO_PARAM: {
      capabilities: ['xrn:firebolt:capability:privacy:settings'],
    },
    INFO_PROTOCOL_WIFI: { capabilities: ['xrn:firebolt:capability:protocol:wifi'] },
    INFO_USERGRANT_ACKNOWLEDGECHALLENGE: {
      capabilities: ['xrn:firebolt:capability:usergrant:acknowledgechallenge'],
    },
    INFO_GRANTS_STATE: { capabilities: ['xrn:firebolt:capability:grants:state'] },
    SUPPORTED_USERGRANT_PINCHALLENGE: {
      capability: 'xrn:firebolt:capability:usergrant:pinchallenge',
    },
    SUPPORTED_DEVICE_DISTRIBUTOR: { capability: 'xrn:firebolt:capability:device:distributor' },
    SUPPORTED_NETWORK_STATUS: { capability: 'xrn:firebolt:capability:network:status' },
    SUPPORTED_LOCALIZATION_TIMEZONE: {
      capability: 'xrn:firebolt:capability:localization:time-zone',
    },
    SUPPORTED_PRIVACY_SETTINGS: { capability: 'xrn:firebolt:capability:privacy:settings' },
    SUPPORTED_PROTOCOL_WIFI: { capability: 'xrn:firebolt:capability:protocol:wifi' },
    SUPPORTED_USERGRANT_ACKNOWLEDGECHALLENGE: {
      capability: 'xrn:firebolt:capability:usergrant:acknowledgechallenge',
    },
    SUPPORTED_GRANTS_STATE: { capability: 'xrn:firebolt:capability:grants:state' },
    INFO_LIFECYCLE_READY: { capabilities: ['xrn:firebolt:capability:lifecycle:ready'] },
    SUPPORTED_LIFECYCLE_READY: { capability: 'xrn:firebolt:capability:lifecycle:ready' },
    PERMITTED_LIFECYCLE_READY_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:lifecycle:ready',
      options: {
        role: 'use',
      },
    },
    PERMITTED_LIFECYCLE_STATE_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:lifecycle:state',
      options: {
        role: 'use',
      },
    },
    PERMITTED_ACCOUNT_ID_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:account:id',
      options: {
        role: 'use',
      },
    },
    PERMITTED_ACCOUNT_UID_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:account:uid',
      options: {
        role: 'use',
      },
    },
    INFO_LIFECYCLE_STATE: { capabilities: ['xrn:firebolt:capability:lifecycle:state'] },
    INFO_LIFECYCLE_LAUNCH: { capabilities: ['xrn:firebolt:capability:lifecycle:launch'] },
    SUPPORTED_LIFECYCLE_STATE: { capability: 'xrn:firebolt:capability:lifecycle:state' },
    SUPPORTED_LIFECYCLE_LAUNCH: { capability: 'xrn:firebolt:capability:lifecycle:launch' },
    PERMITTED_LIFECYCLE_LAUNCH_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:lifecycle:launch',
      options: {
        role: 'use',
      },
    },
    PERMITTED_DISCOVERY_SIGNINSTATUS_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:discovery:sign-in-status',
      options: {
        role: 'use',
      },
    },
    PERMITTED_DISCOVERY_ENTITYINFO_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:discovery:entity-info',
      options: {
        role: 'use',
      },
    },
    PERMITTED_DISCOVERY_NAVIGATETO_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:discovery:navigate-to',
      options: {
        role: 'use',
      },
    },
    PERMITTED_DISCOVERY_POLICY_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:discovery:policy',
      options: {
        role: 'use',
      },
    },
    PERMITTED_DISCOVERY_PURCHASED_CONTENT_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:discovery:purchased-content',
      options: {
        role: 'use',
      },
    },
    PERMITTED_DEVICE_MAKE_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:device:make',
      options: {
        role: 'use',
      },
    },
    PERMITTED_DEVICE_INFO_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:device:info',
      options: {
        role: 'use',
      },
    },
    PERMITTED_DEVICE_ID_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:device:id',
      options: {
        role: 'use',
      },
    },
    PERMITTED_PROFILE_FLAGS_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:profile:flags',
      options: {
        role: 'use',
      },
    },
    PERMITTED_APPROVE_PURCHASE_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:approve:purchase',
      options: {
        role: 'use',
      },
    },
    PERMITTED_APPROVE_CONTENT_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:approve:content',
      options: {
        role: 'use',
      },
    },
    PERMITTED_TOKEN_ROOT_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:token:root',
      options: {
        role: 'use',
      },
    },
    PERMITTED_TOKEN_PLATFORM_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:token:platform',
      options: {
        role: 'use',
      },
    },
    PERMITTED_TOKEN_DEVICE_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:token:device',
      options: {
        role: 'use',
      },
    },
    PERMITTED_PROTOCOL_DIAL_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:protocol:dial',
      options: {
        role: 'use',
      },
    },
    PERMITTED_LOCALIZATION_LOCATION_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:localization:location',
      options: {
        role: 'use',
      },
    },
    PERMITTED_INPUT_KEYBOARD_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:input:keyboard',
      options: {
        role: 'use',
      },
    },
    PERMITTED_CAPABILITY_REQUEST_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:capabilities:request',
      options: {
        role: 'use',
      },
    },
    PERMITTED_CAPABILITY_INFO_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:capabilities:info',
      options: {
        role: 'use',
      },
    },
    PERMITTED_SECURE_STORAGE_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:storage:secure',
      options: {
        role: 'use',
      },
    },
    PERMITTED_TOKEN_SESSION_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:token:session',
      options: {
        role: 'use',
      },
    },
    PERMITTED_ACCESSIBILITY_CLOSEDCAPTIONS: {
      capability: 'xrn:firebolt:capability:accessibility:closedcaptions',
      options: {
        role: 'use',
      },
    },
    PERMITTED_ACCESSIBILITY_VOICEGUIDANCE: {
      capability: 'xrn:firebolt:capability:accessibility:voiceguidance',
      options: {
        role: 'use',
      },
    },
    PERMITTED_DEVICE_NAME: {
      capability: 'xrn:firebolt:capability:device:name',
      options: {
        role: 'use',
      },
    },
    PERMITTED_LOCALIZATION_LOCALITY: {
      capability: 'xrn:firebolt:capability:localization:locality',
      options: {
        role: 'use',
      },
    },
    PERMITTED_LOCALIZATION_POSTALCODE: {
      capability: 'xrn:firebolt:capability:localization:postal-code',
      options: {
        role: 'use',
      },
    },
    PERMITTED_LOCALIZATION_COUNTRYCODE: {
      capability: 'xrn:firebolt:capability:localization:country-code',
      options: {
        role: 'use',
      },
    },
    PERMITTED_LOCALIZATION_LANGUAGE: {
      capability: 'xrn:firebolt:capability:localization:language',
      options: {
        role: 'use',
      },
    },
    PERMITTED_LOCALIZATION_LOCALE: {
      capability: 'xrn:firebolt:capability:localization:locale',
      options: {
        role: 'use',
      },
    },
    PERMITTED_ADVERTISING_CONFIGURATION: {
      capability: 'xrn:firebolt:capability:advertising:configuration',
      options: {
        role: 'use',
      },
    },
    PERMITTED_PRIVACY_ADVERTISING_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:privacy:advertising',
      options: {
        role: 'use',
      },
    },
    PERMITTED_METRICS_MEDIA_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:metrics:media',
      options: {
        role: 'use',
      },
    },
    PERMITTED_METRICS_GENERAL_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:metrics:general',
      options: {
        role: 'use',
      },
    },
    PERMITTED_DEVICE_UID_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:device:uid',
      options: {
        role: 'use',
      },
    },
    PERMITTED_DEVICE_SKU_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:device:sku',
      options: {
        role: 'use',
      },
    },
    PERMITTED_DEVICE_MODEL_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:device:model',
      options: {
        role: 'use',
      },
    },
    PERMITTED_DISCOVERY_CONTENTACCESS_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:discovery:content-access',
      options: {
        role: 'use',
      },
    },
    PERMITTED_WITH_CAPABILITY_DISCOVERY_ENTITLE_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:discovery:content-access',
      options: {
        role: 'use',
      },
    },
    PERMITTED_WITH_CAPABILITY_DISCOVERY_WATCHNEXT_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:discovery:watch-next',
      options: {
        role: 'use',
      },
    },
    PERMITTED_WITH_CAPABILITY_DISCOVERY_WATCHED_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:discovery:watched',
      options: {
        role: 'use',
      },
    },
    PERMITTED_ADVERTISING_IDENTIFIER_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:advertising:identifier',
      options: {
        role: 'use',
      },
    },
    INFO_ADVERTISING_IDENTIFIER: {
      capabilities: ['xrn:firebolt:capability:advertising:identifier'],
    },
    INFO_ACCOUNT_ID: { capabilities: ['xrn:firebolt:capability:account:id'] },
    INFO_ACCOUNT_UID: { capabilities: ['xrn:firebolt:capability:account:uid'] },
    SUPPORTED_ADVERTISING_IDENTIFIER: {
      capability: 'xrn:firebolt:capability:advertising:identifier',
    },
    SUPPORTED_ACCOUNT_ID: { capability: 'xrn:firebolt:capability:account:id' },
    SUPPORTED_ACCOUNT_UID: { capability: 'xrn:firebolt:capability:account:uid' },
    SUPPORTED_DISCOVERY_ENTITLEMENTS: {
      capability: 'xrn:firebolt:capability:discovery:content-access',
    },
    SUPPORTED_DISCOVERY_SIGNINSTATUS: {
      capability: 'xrn:firebolt:capability:discovery:sign-in-status',
    },
    SUPPORTED_DISCOVERY_WATCHNEXT: { capability: 'xrn:firebolt:capability:discovery:watch-next' },
    SUPPORTED_DISCOVERY_WATCHED: { capability: 'xrn:firebolt:capability:discovery:watched' },
    SUPPORTED_DISCOVERY_ENTITYINFO: { capability: 'xrn:firebolt:capability:discovery:entity-info' },
    SUPPORTED_DISCOVERY_NAVIGATETO: { capability: 'xrn:firebolt:capability:discovery:navigate-to' },
    SUPPORTED_DISCOVERY_POLICY: { capability: 'xrn:firebolt:capability:discovery:policy' },
    SUPPORTED_DISCOVERY_PURCHASED_CONTENT: {
      capability: 'xrn:firebolt:capability:discovery:purchased-content',
    },
    INFO_DISCOVERY_ENTITLEMENTS: {
      capabilities: ['xrn:firebolt:capability:discovery:content-access'],
    },
    INFO_DISCOVERY_SIGNINSTATUS: {
      capabilities: ['xrn:firebolt:capability:discovery:sign-in-status'],
    },
    INFO_DISCOVERY_WATCHNEXT: { capabilities: ['xrn:firebolt:capability:discovery:watch-next'] },
    INFO_DISCOVERY_WATCHED: { capabilities: ['xrn:firebolt:capability:discovery:watched'] },
    INFO_DISCOVERY_ENTITYINFO: {
      capabilities: ['xrn:firebolt:capability:discovery:entity-info'],
    },
    INFO_DISCOVERY_NAVIGATETO: {
      capabilities: ['xrn:firebolt:capability:discovery:navigate-to'],
    },
    INFO_DISCOVERY_POLICY: { capabilities: ['xrn:firebolt:capability:discovery:policy'] },
    INFO_DISCOVERY_PURCHASED_CONTENT: {
      capabilities: ['xrn:firebolt:capability:discovery:purchased-content'],
    },
    PERMITTED_DISCOVERY_ENTITLE_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:discovery:content-access',
      options: {
        role: 'use',
      },
    },
    PERMITTED_DISCOVERY_WATCHNEXT_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:discovery:watch-next',
      options: {
        role: 'use',
      },
    },
    PERMITTED_DISCOVERY_WATCHED_USE_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:discovery:watched',
      options: {
        role: 'use',
      },
    },
    SUPPORTED_DEVICE_ID: { capability: 'xrn:firebolt:capability:device:id' },
    SUPPORTED_DEVICE_INFO: { capability: 'xrn:firebolt:capability:device:info' },
    SUPPORTED_DEVICE_MAKE: { capability: 'xrn:firebolt:capability:device:make' },
    SUPPORTED_DEVICE_MODEL: { capability: 'xrn:firebolt:capability:device:model' },
    SUPPORTED_DEVICE_NAME: { capability: 'xrn:firebolt:capability:device:name' },
    SUPPORTED_DEVICE_SKU: { capability: 'xrn:firebolt:capability:device:sku' },
    SUPPORTED_DEVICE_UID: { capability: 'xrn:firebolt:capability:device:uid' },
    SUPPORTED_PROFILE_FLAGS: { capability: 'xrn:firebolt:capability:profile:flags' },
    SUPPORTED_APPROVE_PURCHASE: { capability: 'xrn:firebolt:capability:approve:purchase' },
    SUPPORTED_LOCALIZATION_LOCATION: {
      capability: 'xrn:firebolt:capability:localization:location',
    },
    SUPPORTED_APPROVE_CONTENT: { capability: 'xrn:firebolt:capability:approve:content' },
    SUPPORTED_TOKEN_DEVICE: { capability: 'xrn:firebolt:capability:token:device' },
    SUPPORTED_TOKEN_PLATFORM: { capability: 'xrn:firebolt:capability:token:platform' },
    SUPPORTED_TOKEN_ROOT: { capability: 'xrn:firebolt:capability:token:root' },
    SUPPORTED_PROTOCOL_DIAL: { capability: 'xrn:firebolt:capability:protocol:dial' },
    SUPPORTED_INPUT_KEYBOARD: { capability: 'xrn:firebolt:capability:input:keyboard' },
    INFO_INPUT_KEYBOARD: { capabilities: ['xrn:firebolt:capability:input:keyboard'] },
    INFO_PROTOCOL_DIAL: { capabilities: ['xrn:firebolt:capability:protocol:dial'] },
    INFO_TOKEN_DEVICE: { capabilities: ['xrn:firebolt:capability:token:device'] },
    INFO_TOKEN_PLATFORM: { capabilities: ['xrn:firebolt:capability:token:platform'] },
    INFO_TOKEN_ROOT: { capabilities: ['xrn:firebolt:capability:token:root'] },
    INFO_APPROVE_CONTENT: { capabilities: ['xrn:firebolt:capability:approve:content'] },
    INFO_APPROVE_PURCHASE: { capabilities: ['xrn:firebolt:capability:approve:purchase'] },
    INFO_PROFILE_FLAGS: { capabilities: ['xrn:firebolt:capability:profile:flags'] },
    INFO_DEVICE_ID: { capabilities: ['xrn:firebolt:capability:device:id'] },
    INFO_DEVICE_INFO: { capabilities: ['xrn:firebolt:capability:device:info'] },
    INFO_DEVICE_MAKE: { capabilities: ['xrn:firebolt:capability:device:make'] },
    INFO_DEVICE_MODEL: { capabilities: ['xrn:firebolt:capability:device:model'] },
    INFO_DEVICE_NAME: { capabilities: ['xrn:firebolt:capability:device:name'] },
    INFO_DEVICE_SKU: { capabilities: ['xrn:firebolt:capability:device:sku'] },
    INFO_DEVICE_UID: { capabilities: ['xrn:firebolt:capability:device:uid'] },
    INFO_LOCALIZATION_LOCATION: {
      capabilities: ['xrn:firebolt:capability:localization:location'],
    },
    INFO_METRICS_GENERAL: { capabilities: ['xrn:firebolt:capability:metrics:general'] },
    INFO_METRICS_MEDIA: { capabilities: ['xrn:firebolt:capability:metrics:media'] },
    INFO_PRIVACY_ADVERTISING: { capabilities: ['xrn:firebolt:capability:privacy:advertising'] },
    INFO_ADVERTISING_CONFIGURATION: {
      capabilities: ['xrn:firebolt:capability:advertising:configuration'],
    },
    INFO_LOCALIZATION_LOCALITY: {
      capabilities: ['xrn:firebolt:capability:localization:locality'],
    },
    INFO_LOCALIZATION_POSTALCODE: {
      capabilities: ['xrn:firebolt:capability:localization:postal-code'],
    },
    INFO_LOCALIZATION_COUNTRYCODE: {
      capabilities: ['xrn:firebolt:capability:localization:country-code'],
    },
    INFO_LOCALIZATION_LANGUAGE: {
      capabilities: ['xrn:firebolt:capability:localization:language'],
    },
    INFO_LOCALIZATION_LOCALE: { capabilities: ['xrn:firebolt:capability:localization:locale'] },
    INFO_ACCESSIBILITY_CLOSEDCAPTIONS: {
      capabilities: ['xrn:firebolt:capability:accessibility:closedcaptions'],
    },
    INFO_ACCESSIBILITY_VOICEGUIDANCE: {
      capabilities: ['xrn:firebolt:capability:accessibility:voiceguidance'],
    },
    INFO_TOKEN_SESSION: { capabilities: ['xrn:firebolt:capability:token:session'] },
    SUPPORTED_METRICS_GENERAL: { capability: 'xrn:firebolt:capability:metrics:general' },
    SUPPORTED_METRICS_MEDIA: { capability: 'xrn:firebolt:capability:metrics:media' },
    SUPPORTED_PRIVACY_ADVERTISING: { capability: 'xrn:firebolt:capability:privacy:advertising' },
    SUPPORTED_SECURE_STORAGE: { capability: 'xrn:firebolt:capability:storage:secure' },
    SUPPORTED_ADVERTISING_CONFIGURATION: {
      capability: 'xrn:firebolt:capability:advertising:configuration',
    },
    SUPPORTED_LOCALIZATION_LOCALITY: {
      capability: 'xrn:firebolt:capability:localization:locality',
    },
    SUPPORTED_LOCALIZATION_POSTALCODE: {
      capability: 'xrn:firebolt:capability:localization:postal-code',
    },
    SUPPORTED_LOCALIZATION_COUNTRYCODE: {
      capability: 'xrn:firebolt:capability:localization:country-code',
    },
    SUPPORTED_LOCALIZATION_LANGUAGE: {
      capability: 'xrn:firebolt:capability:localization:language',
    },
    SUPPORTED_LOCALIZATION_LOCALE: { capability: 'xrn:firebolt:capability:localization:locale' },
    SUPPORTED_ACCESSIBILITY_CLOSEDCAPTIONS: {
      capability: 'xrn:firebolt:capability:accessibility:closedcaptions',
    },
    SUPPORTED_ACCESSIBILITY_VOICEGUIDANCE: {
      capability: 'xrn:firebolt:capability:accessibility:voiceguidance',
    },
    SUPPORTED_CAPABILITY_INFO: { capability: 'xrn:firebolt:capability:capabilities:info' },
    SUPPORTED_CAPABILITY_REQUEST: { capability: 'xrn:firebolt:capability:capabilities:request' },
    SUPPORTED_TOKEN_SESSION: { capability: 'xrn:firebolt:capability:token:session' },
    SECURE_STORAGE_INFO_PARAM: {
      capabilities: ['xrn:firebolt:capability:storage:secure'],
    },
    CAPABILITY_INFO_INFO_PARAM: {
      capabilities: ['xrn:firebolt:capability:capabilities:info'],
    },
    DISCOVERY_CONTENTACCESS_INFO_PARAM: {
      capabilities: ['xrn:firebolt:capability:discovery:content-access'],
    },
    SUPPORTED_DISCOVERY_CONTENTACCESS: {
      capability: 'xrn:firebolt:capability:discovery:content-access',
    },
    INFO_INVALID_CATEGORY: {
      capabilities: ['xrn:firebolt:capability:%$&*:model'],
    },
    INFO_EMPTY_PARAM: {},
    INFO_EMPTY_CAPABILITIES: {
      capabilities: [],
    },
    WIFI_INVALID_ROLE_PARAM: {
      capability: 'xrn:firebolt:capability:protocol:wifi',
      options: {
        role: 'test',
      },
    },
    INVALID_CAPABILITY: {
      capability: 123,
      options: {
        role: 'use',
      },
    },
    KEYBOARD_INVALID_CAPABILITY: {
      capability: 'xrn:firebolt:capability:$@*:keyboard',
    },
    SUPPORTED_MULTIPLE_CAPABILITY: {
      capability: [
        'xrn:firebolt:capability:network:status',
        'xrn:firebolt:capability:privacy:content',
      ],
    },
    GRANTED_WITHOUT_CAPABILITY: {
      options: {
        role: 'use',
      },
    },
    GRANTED_RANDOM_STRING_CAPABILITY: {
      capability: 'Test123',
    },
    GRANTED_NULL_CAPABILITY: {
      capability: null,
    },
    GRANTED_NUMBER_CAPABILITY: {
      capability: 123,
    },
    GRANTED_BOOLEAN_CAPABILITY: {
      capability: true,
    },
    GRANTED_ARRAY_CAPABILITY: {
      capability: [],
    },
    GRANTED_STRING_OPTIONS: {
      capability: 'xrn:firebolt:capability:localization:postal-code',
      options: 'Test123',
    },
    GRANTED_NUMBER_OPTIONS: {
      capability: 'xrn:firebolt:capability:localization:postal-code',
      options: 123,
    },
    GRANTED_BOOLEAN_OPTIONS: {
      capability: 'xrn:firebolt:capability:localization:postal-code',
      options: true,
    },
    GRANTED_ARRAY_OPTIONS: {
      capability: 'xrn:firebolt:capability:localization:postal-code',
      options: [],
    },
    GRANTED_INVALID_OPTIONS_ROLE: {
      capability: 'xrn:firebolt:capability:localization:postal-code',
      options: {
        role: 'Test123',
      },
    },
    GRANTED_INVALID_OPTIONS_NULL_ROLE: {
      capability: 'xrn:firebolt:capability:localization:postal-code',
      options: {
        role: null,
      },
    },
    GRANTED_INVALID_OPTIONS_NUMBER_ROLE: {
      capability: 'xrn:firebolt:capability:localization:postal-code',
      options: {
        role: 123,
      },
    },
    GRANTED_INVALID_OPTIONS_BOOLEAN_ROLE: {
      capability: 'xrn:firebolt:capability:localization:postal-code',
      options: {
        role: true,
      },
    },
    GRANTED_INVALID_OPTIONS_ARRAY_ROLE: {
      capability: 'xrn:firebolt:capability:localization:postal-code',
      options: {
        role: [],
      },
    },
    SUPPORTED_INVALID_CAPABILITY: { capability: 'invalid:firebolt:network:capability' },
    REQUEST_INFO_PARAM: {
      capabilities: ['xrn:firebolt:capability:capabilities:request'],
    },
    REQUEST_CAPABILITY_REQUEST: {
      grants: [
        {
          role: 'use',
          capability: 'xrn:firebolt:capability:capabilities:request',
        },
      ],
    },
    ONAVAILBLE_KEYBOARD: {
      capability: 'xrn:firebolt:capability:input:keyboard',
      listen: true,
    },
    ONUNAVAILBLE_KEYBOARD: {
      capability: 'xrn:firebolt:capability:input:keyboard',
      listen: true,
    },
    ONGRANTED_DEVICE_ID_ROLE_USE: {
      role: 'use',
      capability: 'xrn:firebolt:capability:device:id',
      listen: true,
    },
    ONREVOKED_DEVICE_ID_ROLE_USE: {
      role: 'use',
      capability: 'xrn:firebolt:capability:device:id',
      listen: true,
    },
  },
  CAPABILITIES_CONTENT: {
    supported: {
      data: [
        {
          type: 'miscellaneous',
          validations: [
            {
              type: 'supported',
              description: 'Validation of capabilities.info to check the capabilities info',
            },
          ],
        },
      ],
    },
    info: {
      data: [
        {
          type: 'miscellaneous',
          validations: [
            {
              type: 'info',
              description: 'Validation of capabilities.info to check the capabilities info',
            },
          ],
        },
      ],
    },
    granted: true,
    CAPABILITIES_REQUEST: {
      data: [
        {
          type: 'miscellaneous',
          validations: [
            {
              type: 'request',
              description: 'Validation of capabilities.request to check the capability requested',
              specialValidationObject: [
                {
                  method: 'capabilities.request',
                  validationPath: 'result[0].use.granted',
                  content: true,
                },
                {
                  method: 'capabilities.request',
                  validationPath: 'result[0].manage.granted',
                  content: true,
                },
                {
                  method: 'capabilities.request',
                  validationPath: 'result[0].provide.granted',
                  content: true,
                },
              ],
            },
          ],
        },
      ],
    },
  },
};
exports.CHECK_AVAILABILITY_OF_KEYBOARD_CAPABILITY = {
  method: 'capabilities.available',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.GET_KEYBOARD,
};
exports.EXPECTED_VALUE_FOR_KEYBOARD_CAPABILITY_AVAILABILITY = {
  method: 'capabilities.available',
  validationJsonPath: 'result',
  content: true,
};
exports.CHECK_AVAILABILITY_OF_ACKNOWLEDGECHALLENGE_CAPABILITY = {
  method: 'capabilities.available',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.GET_ACKNOWLEDGECHALLENGE,
};
exports.TRUE_FOR_ACKNOWLEDGECHALLENGE_CAPABILITY_AVAILABILITY = {
  method: 'capabilities.available',
  validationJsonPath: 'result',
  content: true,
};
exports.CHECK_AVAILABILITY_OF_PINCHALLENGE_CAPABILITY = {
  method: 'capabilities.available',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.GET_PINCHALLENGE,
};
exports.EXPECTED_VALUE_FOR_PINCHALLENGE_CAPABILITY_AVAILABILITY = {
  method: 'capabilities.available',
  validationJsonPath: 'result',
  content: true,
};
exports.GET_INFO_OF_USERGRANT_PINCHALLENGE_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_USERGRANT_PINCHALLENGE,
};
exports.GET_INFO_OF_DEVICE_DISTRIBUTOR_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_DEVICE_DISTRIBUTOR,
};
exports.GET_INFO_OF_WIFI_NETWORKSTATUS_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_NETWORK_STATUS,
};
exports.GET_INFO_OF_LOCALIZATION_TIMEZONE_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_LOCALIZATION_TIMEZONE,
};
exports.GET_INFO_OF_PRIVACY_SETTINGS_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PRIVACY_SETTINGS_INFO_PARAM,
};
exports.GET_INFO_OF_WIFI_PROTOCOL_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_PROTOCOL_WIFI,
};
exports.GET_INFO_OF_USERGRANT_ACKNOWLEDGECHALLENGE_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_USERGRANT_ACKNOWLEDGECHALLENGE,
};
exports.GET_INFO_OF_GRANTS_STATE_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_GRANTS_STATE,
};
exports.EXPECTED_VALUE_FOR_SUPPORTED_API = {
  method: 'capabilities.supported',
  validationJsonPath: 'result',
  content: this.CAPABILITIES_VARIABLES.CAPABILITIES_CONTENT.supported,
};
exports.EXPECTED_VALUE_FOR_INFO_API = {
  method: 'capabilities.info',
  validationJsonPath: 'result',
  content: this.CAPABILITIES_VARIABLES.CAPABILITIES_CONTENT.info,
};
exports.EXPECTED_VALUE_FOR_PERMITTED_API = {
  method: 'capabilities.permitted',
  validationJsonPath: 'result',
  content: '',
};
exports.CHECK_IF_USERGRANT_PINCHALLENGE_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_USERGRANT_PINCHALLENGE,
};
exports.CHECK_IF_DEVICE_DISTRIBUTOR_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_DEVICE_DISTRIBUTOR,
};
exports.CHECK_IF_WIFI_NETWORKSTATUS_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_NETWORK_STATUS,
};
exports.CHECK_IF_LOCALIZATION_TIMEZONE_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_LOCALIZATION_TIMEZONE,
};
exports.CHECK_IF_PRIVACY_SETTINGS_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_PRIVACY_SETTINGS,
};
exports.CHECK_IF_WIFI_PROTOCOL_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_PROTOCOL_WIFI,
};
exports.CHECK_IF_USERGRANT_ACKNOWLEDGECHALLENGE_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_USERGRANT_ACKNOWLEDGECHALLENGE,
};
exports.CHECK_IF_FOR_GRANTS_STATE_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_GRANTS_STATE,
};

exports.GET_INFO_OF_LIFECYCLE_READY_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_LIFECYCLE_READY,
};
exports.CHECK_IF_LIFECYCLE_READY_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_LIFECYCLE_READY,
};
exports.CHECK_IF_LIFECYCLE_READY_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_LIFECYCLE_READY_USE_ROLE_PARAM,
};
exports.GET_INFO_OF_LIFECYCLE_STATE_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_LIFECYCLE_STATE,
};
exports.CHECK_IF_LIFECYCLE_STATE_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_LIFECYCLE_STATE,
};
exports.CHECK_IF_LIFECYCLE_STATE_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_LIFECYCLE_STATE_USE_ROLE_PARAM,
};
exports.GET_INFO_OF_LIFECYCLE_LAUNCH_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_LIFECYCLE_LAUNCH,
};
exports.CHECK_IF_LIFECYCLE_LAUNCH_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_LIFECYCLE_LAUNCH,
};
exports.CHECK_IF_LIFECYCLE_LAUNCH_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_LIFECYCLE_LAUNCH_USE_ROLE_PARAM,
};
exports.GET_INFO_OF_ADVERTISING_IDENTIFIER_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_ADVERTISING_IDENTIFIER,
};
exports.CHECK_IF_ADVERTISING_IDENTIFIER_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_ADVERTISING_IDENTIFIER,
};
exports.CHECK_IF_ADVERTISING_IDENTIFIER_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_ADVERTISING_IDENTIFIER_USE_ROLE_PARAM,
};
exports.GET_INFO_OF_ACCOUNT_ID_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_ACCOUNT_ID,
};
exports.CHECK_IF_ACCOUNT_ID_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_ACCOUNT_ID,
};
exports.CHECK_IF_ACCOUNT_ID_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_ACCOUNT_ID_USE_ROLE_PARAM,
};
exports.GET_INFO_OF_ACCOUNT_UID_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_ACCOUNT_UID,
};
exports.CHECK_IF_ACCOUNT_UID_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_ACCOUNT_UID,
};
exports.CHECK_IF_ACCOUNT_UID_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_ACCOUNT_UID_USE_ROLE_PARAM,
};
exports.CHECK_IF_DISCOVERY_SIGNINSTATUS_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_DISCOVERY_SIGNINSTATUS,
};
exports.CHECK_IF_DISCOVERY_SIGNINSTATUS_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_DISCOVERY_SIGNINSTATUS_USE_ROLE_PARAM,
};
exports.GET_INFO_OF_DISCOVERY_WATCHNEXT_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_DISCOVERY_WATCHNEXT,
};
exports.CHECK_IF_DISCOVERY_WATCHNEXT_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_DISCOVERY_WATCHNEXT,
};
exports.CHECK_IF_DISCOVERY_WATCHNEXT_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_DISCOVERY_WATCHNEXT_USE_ROLE_PARAM,
};
exports.GET_INFO_OF_DISCOVERY_WATCHED_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_DISCOVERY_WATCHED,
};
exports.CHECK_IF_DISCOVERY_WATCHED_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_DISCOVERY_WATCHED,
};
exports.CHECK_IF_DISCOVERY_WATCHED_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_DISCOVERY_WATCHED_USE_ROLE_PARAM,
};
exports.GET_INFO_OF_DISCOVERY_ENTITYINFO_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_DISCOVERY_ENTITYINFO,
};
exports.CHECK_IF_DISCOVERY_ENTITYINFO_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_DISCOVERY_ENTITYINFO,
};
exports.CHECK_IF_DISCOVERY_ENTITYINFO_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_DISCOVERY_ENTITYINFO_USE_ROLE_PARAM,
};
exports.GET_INFO_OF_DISCOVERY_NAVIGATETO_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_DISCOVERY_NAVIGATETO,
};
exports.CHECK_IF_DISCOVERY_NAVIGATETO_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_DISCOVERY_NAVIGATETO,
};
exports.CHECK_IF_DISCOVERY_NAVIGATETO_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_DISCOVERY_NAVIGATETO_USE_ROLE_PARAM,
};
exports.GET_INFO_OF_DISCOVERY_POLICY_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_DISCOVERY_POLICY,
};
exports.CHECK_IF_DISCOVERY_POLICY_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_DISCOVERY_POLICY,
};
exports.CHECK_IF_DISCOVERY_POLICY_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_DISCOVERY_POLICY_USE_ROLE_PARAM,
};
exports.GET_INFO_OF_DISCOVERY_PURCHASEDCONTENT_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_DISCOVERY_PURCHASED_CONTENT,
};
exports.CHECK_IF_DISCOVERY_PURCHASEDCONTENT_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_DISCOVERY_PURCHASED_CONTENT,
};
exports.CHECK_IF_DISCOVERY_PURCHASEDCONTENT_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params:
    this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_DISCOVERY_PURCHASED_CONTENT_USE_ROLE_PARAM,
};
exports.GET_INFO_OF_KEYBOARD_INPUT_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_INPUT_KEYBOARD,
};
exports.CHECK_IF_KEYBOARD_INPUT_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_INPUT_KEYBOARD,
};
exports.CHECK_IF_KEYBOARD_INPUT_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_INPUT_KEYBOARD_USE_ROLE_PARAM,
};
exports.GET_INFO_OF_LOCALIZATION_LOCATION_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_LOCALIZATION_LOCATION,
};
exports.CHECK_IF_LOCALIZATION_LOCATION_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_LOCALIZATION_LOCATION,
};
exports.CHECK_IF_LOCALIZATION_LOCATION_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_LOCALIZATION_LOCATION_USE_ROLE_PARAM,
};
exports.GET_INFO_OF_PROTOCOLDIAL_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_PROTOCOL_DIAL,
};
exports.CHECK_IF_PROTOCOLDIAL_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_PROTOCOL_DIAL,
};
exports.CHECK_IF_PROTOCOLDIAL_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_PROTOCOL_DIAL_USE_ROLE_PARAM,
};

exports.GET_INFO_OF_AUTHENTICATION_TOKEN_DEVICE_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_TOKEN_DEVICE,
};
exports.CHECK_IF_AUTHENTICATION_TOKEN_DEVICE_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_TOKEN_DEVICE,
};
exports.CHECK_IF_AUTHENTICATION_TOKEN_DEVICE_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_TOKEN_DEVICE_USE_ROLE_PARAM,
};

exports.GET_INFO_OF_AUTHENTICATION_TOKEN_PLATFORM_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_TOKEN_PLATFORM,
};
exports.CHECK_IF_AUTHENTICATION_TOKEN_PLATFORM_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_TOKEN_PLATFORM,
};
exports.CHECK_IF_AUTHENTICATION_TOKEN_PLATFORM_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_TOKEN_PLATFORM_USE_ROLE_PARAM,
};
exports.GET_INFO_OF_AUTHENTICATION_TOKEN_ROOT_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_TOKEN_ROOT,
};
exports.CHECK_IF_AUTHENTICATION_TOKEN_ROOT_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_TOKEN_ROOT,
};
exports.CHECK_IF_AUTHENTICATION_TOKEN_ROOT_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_TOKEN_ROOT_USE_ROLE_PARAM,
};
exports.GET_INFO_OF_APPROVECONTENT_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_APPROVE_CONTENT,
};
exports.CHECK_IF_APPROVECONTENT_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_APPROVE_CONTENT,
};
exports.CHECK_IF_APPROVECONTENT_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_APPROVE_CONTENT_USE_ROLE_PARAM,
};

exports.GET_INFO_OF_PROFILE_APPROVEPURCHASE_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_APPROVE_PURCHASE,
};
exports.CHECK_IF_PROFILE_APPROVEPURCHASE_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_APPROVE_PURCHASE,
};
exports.CHECK_IF_PROFILE_APPROVEPURCHASE_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_APPROVE_PURCHASE_USE_ROLE_PARAM,
};

exports.GET_INFO_OF_PROFILE_FLAGS_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_PROFILE_FLAGS,
};
exports.CHECK_IF_PROFILE_FLAGS_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_PROFILE_FLAGS,
};
exports.CHECK_IF_PROFILE_FLAGS_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_PROFILE_FLAGS_USE_ROLE_PARAM,
};

exports.GET_INFO_OF_DEVICE_ID_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_DEVICE_ID,
};
exports.CHECK_IF_DEVICE_ID_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_DEVICE_ID,
};
exports.CHECK_IF_DEVICE_ID_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_DEVICE_ID_USE_ROLE_PARAM,
};

exports.GET_INFO_OF_DEVICE_INFO_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_DEVICE_INFO,
};
exports.CHECK_IF_DEVICE_INFO_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_DEVICE_INFO,
};
exports.CHECK_IF_DEVICE_INFO_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_DEVICE_INFO_USE_ROLE_PARAM,
};

exports.GET_INFO_OF_DEVICE_MAKE_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_DEVICE_MAKE,
};
exports.CHECK_IF_DEVICE_MAKE_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_DEVICE_MAKE,
};
exports.CHECK_IF_DEVICE_MAKE_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_DEVICE_MAKE_USE_ROLE_PARAM,
};

exports.GET_INFO_OF_DEVICE_MODEL_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_DEVICE_MODEL,
};
exports.CHECK_IF_DEVICE_MODEL_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_DEVICE_MODEL,
};
exports.CHECK_IF_DEVICE_MODEL_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_DEVICE_MODEL_USE_ROLE_PARAM,
};

exports.GET_INFO_OF_DEVICE_SKU_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_DEVICE_SKU,
};
exports.CHECK_IF_DEVICE_SKU_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_DEVICE_SKU,
};
exports.CHECK_IF_DEVICE_SKU_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_DEVICE_SKU_USE_ROLE_PARAM,
};

exports.GET_INFO_OF_DEVICE_UID_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_DEVICE_UID,
};
exports.CHECK_IF_DEVICE_UID_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_DEVICE_UID,
};
exports.CHECK_IF_DEVICE_UID_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_DEVICE_UID_USE_ROLE_PARAM,
};

exports.GET_INFO_OF_METRICS_GENERAL_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_METRICS_GENERAL,
};
exports.CHECK_IF_METRICS_GENERAL_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_METRICS_GENERAL,
};
exports.CHECK_IF_METRICS_GENERAL_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_METRICS_GENERAL_USE_ROLE_PARAM,
};

exports.GET_INFO_OF_METRICS_MEDIA_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_METRICS_MEDIA,
};
exports.CHECK_IF_METRICS_MEDIA_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_METRICS_MEDIA,
};
exports.CHECK_IF_METRICS_MEDIA_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_METRICS_MEDIA_USE_ROLE_PARAM,
};

exports.GET_INFO_OF_PRIVACY_ADVERTISING_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_PRIVACY_ADVERTISING,
};
exports.CHECK_IF_PRIVACY_ADVERTISING_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_PRIVACY_ADVERTISING,
};
exports.CHECK_IF_PRIVACY_ADVERTISING_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_PRIVACY_ADVERTISING_USE_ROLE_PARAM,
};

exports.GET_INFO_OF_ADVERTISING_CONFIGURATION_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_ADVERTISING_CONFIGURATION,
};
exports.CHECK_IF_ADVERTISING_CONFIGURATION_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_ADVERTISING_CONFIGURATION,
};
exports.CHECK_IF_ADVERTISING_CONFIGURATION_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_ADVERTISING_CONFIGURATION,
};

exports.GET_INFO_OF_LOCALIZATION_LOCALITY_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_LOCALIZATION_LOCALITY,
};
exports.CHECK_IF_LOCALIZATION_LOCALITY_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_LOCALIZATION_LOCALITY,
};
exports.CHECK_IF_LOCALIZATION_LOCALITY_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_LOCALIZATION_LOCALITY,
};

exports.GET_INFO_OF_LOCALIZATION_POSTALCODE_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_LOCALIZATION_POSTALCODE,
};
exports.CHECK_IF_LOCALIZATION_POSTALCODE_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_LOCALIZATION_POSTALCODE,
};
exports.CHECK_IF_LOCALIZATION_POSTALCODE_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_LOCALIZATION_POSTALCODE,
};

exports.GET_INFO_OF_LOCALIZATION_COUNTRYCODE_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_LOCALIZATION_COUNTRYCODE,
};
exports.CHECK_IF_LOCALIZATION_COUNTRYCODE_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_LOCALIZATION_COUNTRYCODE,
};
exports.CHECK_IF_LOCALIZATION_COUNTRYCODE_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_LOCALIZATION_COUNTRYCODE,
};

exports.GET_INFO_OF_LOCALIZATION_LANGUAGE_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_LOCALIZATION_LANGUAGE,
};
exports.CHECK_IF_LOCALIZATION_LANGUAGE_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_LOCALIZATION_LANGUAGE,
};
exports.CHECK_IF_LOCALIZATION_LANGUAGE_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_LOCALIZATION_LANGUAGE,
};

exports.GET_INFO_OF_LOCALIZATION_LOCALE_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_LOCALIZATION_LOCALE,
};
exports.CHECK_IF_LOCALIZATION_LOCALE_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_LOCALIZATION_LOCALE,
};
exports.CHECK_IF_LOCALIZATION_LOCALE_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_LOCALIZATION_LOCALE,
};

exports.GET_INFO_OF_ACCESSIBILITY_CLOSEDCAPTIONS_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_ACCESSIBILITY_CLOSEDCAPTIONS,
};
exports.CHECK_IF_ACCESSIBILITY_CLOSEDCAPTIONS_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_ACCESSIBILITY_CLOSEDCAPTIONS,
};
exports.CHECK_IF_ACCESSIBILITY_CLOSEDCAPTIONS_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_ACCESSIBILITY_CLOSEDCAPTIONS,
};

exports.GET_INFO_OF_ACCESSIBILITY_VOICEGUIDANCE_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_ACCESSIBILITY_VOICEGUIDANCE,
};
exports.CHECK_IF_ACCESSIBILITY_VOICEGUIDANCE_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_ACCESSIBILITY_VOICEGUIDANCE,
};
exports.CHECK_IF_ACCESSIBILITY_VOICEGUIDANCE_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_ACCESSIBILITY_VOICEGUIDANCE,
};

exports.GET_INFO_OF_DEVICE_NAME_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_DEVICE_NAME,
};
exports.CHECK_IF_DEVICE_NAME_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_DEVICE_NAME,
};
exports.CHECK_IF_DEVICE_NAME_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_DEVICE_NAME,
};
exports.GET_INFO_OF_AUTHENTICATION_TOKEN_SESSION_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_TOKEN_SESSION,
};
exports.CHECK_IF_AUTHENTICATION_TOKEN_SESSION_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_TOKEN_SESSION,
};
exports.CHECK_IF_AUTHENTICATION_TOKEN_SESSION_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_TOKEN_SESSION_USE_ROLE_PARAM,
};
exports.GET_INFO_OF_SECURE_STORAGE_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SECURE_STORAGE_INFO_PARAM,
};
exports.CHECK_IF_SECURE_STORAGE_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_SECURE_STORAGE,
};
exports.CHECK_IF_SECURE_STORAGE_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_SECURE_STORAGE_USE_ROLE_PARAM,
};

exports.GET_INFO_OF_CAPABILITY_INFO_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.CAPABILITY_INFO_INFO_PARAM,
};
exports.CHECK_IF_CAPABILITY_INFO_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_CAPABILITY_INFO,
};
exports.CHECK_IF_CAPABILITY_INFO_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_CAPABILITY_INFO_USE_ROLE_PARAM,
};
exports.GET_INFO_OF_DISCOVERY_CONTENTACCESS_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.DISCOVERY_CONTENTACCESS_INFO_PARAM,
};
exports.CHECK_IF_DISCOVERY_CONTENTACCESS_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_DISCOVERY_CONTENTACCESS,
};
exports.CHECK_IF_DISCOVERY_CONTENTACCESS_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_DISCOVERY_CONTENTACCESS_USE_ROLE_PARAM,
};
exports.CHECK_IF_LIFECYCLE_READY_CAPABILITY_EXPECTING_ERROR = {
  method: 'lifecycle.ready',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_LIFECYCLE_READY_USE_ROLE_PARAM,
  expected: 'error',
};
exports.CHECK_IF_LIFECYCLE_STATE_CAPABILITY_IS_PERMITTED_WITH_ROLE_USE = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_LIFECYCLE_STATE_USE_ROLE_PARAM,
};
exports.CHECK_IF_ACCOUNT_ID_CAPABILITY_IS_PERMITTED_WITH_ROLE_USE = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_ACCOUNT_ID_USE_ROLE_PARAM,
};
exports.CHECK_IF_ACCOUNT_UID_CAPABILITY_IS_PERMITTED_WITH_ROLE_USE = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_ACCOUNT_UID_USE_ROLE_PARAM,
};
exports.FETCH_LIFECYCLE_STATE = {
  method: 'lifecycle.state',
};
exports.EXPECTED_LIFECYCLE_STATE_AS_FOREGROUND = {
  method: 'lifecycle.state',
  validationJsonPath: 'result',
  content: 'foreground',
};
exports.CHECK_IF_DISCOVERY_ENTITLEMENTS_CAPABILITY_IS_PERMITTED_WITH_ROLE_USE = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_DISCOVERY_ENTITLE_USE_ROLE_PARAM,
};
exports.CHECK_IF_DISCOVERY_WATCHNEXT_CAPABILITY_IS_PERMITTED_WITH_ROLE_USE = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_DISCOVERY_WATCHNEXT_USE_ROLE_PARAM,
};
exports.CHECK_IF_DISCOVERY_WATCHED_CAPABILITY_IS_PERMITTED_WITH_ROLE_USE = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_DISCOVERY_WATCHED_USE_ROLE_PARAM,
};
exports.GET_INFO_OF_CAPABILITIES_WITH_INVALID_CATEGORY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_INVALID_CATEGORY,
  expected: 'error',
};
exports.GET_INFO_OF_CAPABILITIES_WITH_EMPTY_PARAM = {
  method: 'capabilities.info',
  params: {},
  expected: 'error',
};
exports.GET_INFO_OF_CAPABILITIES_WITH_EMPTY_CAPABILITIES = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_EMPTY_CAPABILITIES,
  expected: 'error',
};
exports.GET_PERMITTED_CAPABILITIES_WITH_INVALID_ROLE = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.WIFI_INVALID_ROLE_PARAM,
  expected: 'error',
};
exports.GET_PERMITTED_CAPABILITIES_WITH_INVALID_CAPABILITY = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INVALID_CAPABILITY,
  expected: 'error',
};
exports.CHECK_AVAILABILITY_OF_CAPABILITIES_WITH_INVALID_CAPABILITY = {
  method: 'capabilities.available',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.KEYBOARD_INVALID_CAPABILITY,
  expected: 'error',
};
exports.CHECK_AVAILABILITY_OF_CAPABILITIES_WITH_EMPTY_PARAM = {
  method: 'capabilities.available',
  params: {},
  expected: 'error',
};
exports.GET_SUPPORTED_CAPABILITIES_WITH_EMPTY_PARAM = {
  method: 'capabilities.supported',
  params: {},
  expected: 'error',
};
exports.GET_SUPPORTED_CAPABILITIES_MULTIPLE_CAPABILITY = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_MULTIPLE_CAPABILITY,
  expected: 'error',
};
exports.GET_SUPPORTED_CAPABILITIES_INVALID_CAPABILITY = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_INVALID_CAPABILITY,
  expected: 'error',
};
exports.GET_GRANTED_CAPABILITIES_WITH_NULL_CAPABILITY = {
  method: 'capabilities.granted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.GRANTED_RANDOM_STRING_CAPABILITY,
  expected: 'error',
};
exports.GET_GRANTED_CAPABILITIES_WITH_RANDOM_STRING_CAPABILITY = {
  method: 'capabilities.granted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.GRANTED_NULL_CAPABILITY,
  expected: 'error',
};
exports.GET_GRANTED_CAPABILITIES_WITH_NUMBER_CAPABILITY = {
  method: 'capabilities.granted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.GRANTED_NUMBER_CAPABILITY,
  expected: 'error',
};
exports.GET_GRANTED_CAPABILITIES_WITH_BOOLEAN_CAPABILITY = {
  method: 'capabilities.granted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.GRANTED_BOOLEAN_CAPABILITY,
  expected: 'error',
};
exports.GET_GRANTED_CAPABILITIES_WITH_ARRAY_CAPABILITY = {
  method: 'capabilities.granted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.GRANTED_ARRAY_CAPABILITY,
  expected: 'error',
};
exports.GET_GRANTED_CAPABILITIES_WITH_STRING_OPTIONS = {
  method: 'capabilities.granted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.GRANTED_STRING_OPTIONS,
  expected: 'error',
};
exports.GET_GRANTED_CAPABILITIES_WITH_NUMBER_OPTIONS = {
  method: 'capabilities.granted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.GRANTED_NUMBER_OPTIONS,
  expected: 'error',
};
exports.GET_GRANTED_CAPABILITIES_WITH_BOOLEAN_OPTIONS = {
  method: 'capabilities.granted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.GRANTED_BOOLEAN_OPTIONS,
  expected: 'error',
};
exports.GET_GRANTED_CAPABILITIES_WITH_ARRAY_OPTIONS = {
  method: 'capabilities.granted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.GRANTED_ARRAY_OPTIONS,
  expected: 'error',
};
exports.CAPABILITIES_GRANTED_WITH_INVALID_OPTIONS_ROLE = {
  method: 'capabilities.granted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.GRANTED_INVALID_OPTIONS_ROLE,
  expected: 'error',
};
exports.GET_GRANTED_CAPABILITIES_WITH_INVALID_OPTIONS_NULL_ROLE = {
  method: 'capabilities.granted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.GRANTED_INVALID_OPTIONS_NULL_ROLE,
  expected: 'error',
};
exports.GET_GRANTED_CAPABILITIES_WITH_INVALID_OPTIONS_NUMBER_ROLE = {
  method: 'capabilities.granted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.GRANTED_INVALID_OPTIONS_NUMBER_ROLE,
  expected: 'error',
};
exports.GET_GRANTED_CAPABILITIES_WITH_INVALID_OPTIONS_BOOLEAN_ROLE = {
  method: 'capabilities.granted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.GRANTED_INVALID_OPTIONS_BOOLEAN_ROLE,
  expected: 'error',
};
exports.GET_GRANTED_CAPABILITIES_WITH_INVALID_OPTIONS_ARRAY_ROLE = {
  method: 'capabilities.granted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.GRANTED_INVALID_OPTIONS_ARRAY_ROLE,
  expected: 'error',
};
exports.INVALID_PARAMS_FOR_CAPABILITIES_INFO = {
  method: 'capabilities.info',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};
exports.CUSTOM_ERROR_FOR_CAPABILITIES_INFO = {
  method: 'capabilities.info',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_CAPABILITIES_PERMITTED = {
  method: 'capabilities.permitted',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_CAPABILITIES_AVAILABLE = {
  method: 'capabilities.available',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_CAPABILITIES_SUPPORTED = {
  method: 'capabilities.supported',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};
exports.INVALID_PARAMS_FOR_CAPABILITIES_GRANTED = {
  method: 'capabilities.granted',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};
exports.CUSTOM_ERROR_FOR_LIFECYCLE_READY_CAPABILITY = {
  method: 'lifecycle.ready',
  validationJsonPath: 'result',
  content: errorContent.INVALID_PARAMS,
  expectingError: true,
};
exports.CHECK_IF_AUTHENTICATION_TOKEN_DEVICE_CAPABILITY_IS_PERMITTED_WITH_ROLE_USE = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_TOKEN_DEVICE_USE_ROLE_PARAM,
};
exports.CHECK_IF_AUTHENTICATION_TOKEN_PLATFORM_CAPABILITY_IS_PERMITTED_WITH_ROLE_USE = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_TOKEN_PLATFORM_USE_ROLE_PARAM,
};
exports.CHECK_IF_AUTHENTICATION_TOKEN_ROOT_CAPABILITY_IS_PERMITTED_WITH_ROLE_USE = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_TOKEN_ROOT_USE_ROLE_PARAM,
};
exports.CHECK_IF_AUTHENTICATION_TOKEN_SESSION_CAPABILITY_IS_PERMITTED_WITH_ROLE_USE = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_TOKEN_SESSION_USE_ROLE_PARAM,
};
exports.CHECK_IF_DEVICE_MAKE_CAPABILITY_IS_PERMITTED_WITH_ROLE_USE = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_DEVICE_MAKE_USE_ROLE_PARAM,
};
exports.CHECK_IF_DEVICE_MODEL_CAPABILITY_IS_PERMITTED_WITH_ROLE_USE = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_DEVICE_MODEL_USE_ROLE_PARAM,
};
exports.CHECK_IF_DEVICE_SKU_CAPABILITY_IS_PERMITTED_WITH_ROLE_USE = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_DEVICE_SKU_USE_ROLE_PARAM,
};
exports.CHECK_IF_DEVICE_UID_CAPABILITY_IS_PERMITTED_WITH_ROLE_USE = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_DEVICE_UID_USE_ROLE_PARAM,
};
exports.CAPABILITIES_ONAVAILABLE = {
  method: 'capabilities.onAvailable',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.ONAVAILBLE_KEYBOARD,
};
exports.EXPECTED_VALUE_FOR_CAPABILITIES_ONAVAILABLE = {
  event: 'capabilities.onAvailable',
  validationJsonPath: 'eventResponse',
  content: this.CAPABILITIES_VARIABLES.CAPABILITIES.ONAVAILABLE,
};
exports.FALSE_FOR_KEYBOARD_CAPABILITY_AVAILABILITY = {
  method: 'capabilities.available',
  validationJsonPath: 'result',
  content: false,
};
exports.CAPABILITIES_ONUNAVAILABLE = {
  method: 'capabilities.onUnavailable',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.ONUNAVAILBLE_KEYBOARD,
};
exports.EXPECTED_VALUE_FOR_CAPABILITIES_ONUNAVAILABLE = {
  event: 'capabilities.onUnavailable',
  validationJsonPath: 'eventResponse',
  content: this.CAPABILITIES_VARIABLES.CAPABILITIES.ONUNAVAILABLE,
};
exports.CAPABILITIES_ONGRANTED = {
  method: 'capabilities.onGranted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.ONGRANTED_DEVICE_ID_ROLE_USE,
};
exports.CHECK_IF_DEVICE_ID_CAPABILITY_IS_GRANTED = {
  method: 'capabilities.granted',
  params: 'USERGRANTS_DEVICE_ID',
};
exports.FALSE_FOR_GRANTED_CAPABILITY_WITH_PASSED_ROLE = {
  method: 'capabilities.granted',
  validationJsonPath: 'result',
  content: false,
};
exports.CAPABILITIES_ONREVOKED = {
  method: 'capabilities.onRevoked',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.ONREVOKED_DEVICE_ID_ROLE_USE,
};
exports.EXPECTED_VALUE_FOR_CAPABILITIES_ONGRANTED = {
  event: 'capabilities.onGranted',
  validationJsonPath: 'eventResponse',
  content: this.CAPABILITIES_VARIABLES.CAPABILITIES.ONGRANTED,
};
exports.EXPECTED_VALUE_FOR_CAPABILITIES_ONREVOKED = {
  event: 'capabilities.onRevoked',
  validationJsonPath: 'eventResponse',
  content: this.CAPABILITIES_VARIABLES.CAPABILITIES.ONREVOKED,
};
exports.GET_INFO_OF_CAPABILITY_REQUEST_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.REQUEST_INFO_PARAM,
};
exports.GET_CAPABILITYINFO_OF_REQUEST_CAPABILITY = {
  method: 'capabilities.request',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.REQUEST_CAPABILITY_REQUEST,
};
exports.CHECK_IF_CAPABILITY_REQUEST_CAPABILITY_IS_PERMITTED = {
  method: 'capabilities.permitted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.PERMITTED_CAPABILITY_REQUEST_USE_ROLE_PARAM,
};
exports.CHECK_IF_CAPABILITY_REQUEST_CAPABILITY_IS_SUPPORTED = {
  method: 'capabilities.supported',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.SUPPORTED_CAPABILITY_REQUEST,
};
exports.EXPECTED_CAPABILITY_IS_REQUESTED = {
  method: 'capabilities.request',
  validationJsonPath: 'result',
  content: this.CAPABILITIES_VARIABLES.CAPABILITIES_CONTENT.CAPABILITIES_REQUEST,
};
exports.GET_CAPABILITY_INFO = {
  method: 'capabilities.info',
  params: 'CYPRESSENV-capabilitiesList',
};
exports.CHECK_IF_PASSED_CAPABILITY_IS_GRANTED = {
  method: 'capabilities.granted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.GRANTED_WITH_GRANT,
};
exports.TRUE_FOR_GRANTED_CAPABILITY_WITH_PASSED_ROLE = {
  method: 'capabilities.granted',
  validationJsonPath: 'result',
  content: true,
};
exports.CHECK_IF_CAPABILITY_IS_GRANTED_WITH_ROLE_AS_USE = {
  method: 'capabilities.granted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.GRANTED_WITH_OPTIONS_ROLE_USE,
};
exports.CHECK_IF_CAPABILITY_IS_GRANTED_WITH_ROLE_AS_MANAGE = {
  method: 'capabilities.granted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.GRANTED_WITH_OPTIONS_ROLE_MANAGE,
};
exports.CHECK_IF_CAPABILITY_IS_GRANTED_WITH_ROLE_AS_PROVIDE = {
  method: 'capabilities.granted',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.GRANTED_WITH_OPTIONS_ROLE_PROVIDE,
};
