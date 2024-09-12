exports.CAPABILITIES = {
  method: resolveAtRuntime('capabilities.available'),
  params: {},
  validationJsonPath: 'result',
  content: resolveAtRuntime(
    'DYNAMIC_FB_CALL_VARIABLES.CAPABILITIES_VARIABLES.CAPABILITIES_CONTENT.{{attribute}}'
  ),
};

exports.DYNAMIC_FB_CALL_VARIABLES = {
  CAPABILITIES_VARIABLES: {
    CAPABILITIES: {
      capabilityInfo: extractEnvValue('CYPRESSENV-capabilitiesList'),
      keyboard_capability: {
        capability: 'xrn:firebolt:capability:input:keyboard',
      },
      acknowledgechallenge_capability: {
        capability: 'xrn:firebolt:capability:usergrant:acknowledgechallenge',
      },
      pinchallenge_capability: {
        capability: 'xrn:firebolt:capability:usergrant:pinchallenge',
      },
      postalCode_capability: {
        capability: 'xrn:firebolt:capability:localization:postal-code',
      },
      postalCode_capability_role_use: {
        capability: 'xrn:firebolt:capability:localization:postal-code',
        options: {
          role: 'use',
        },
      },
      postalCode_capability_role_manage: {
        capability: 'xrn:firebolt:capability:localization:postal-code',
        options: {
          role: 'manage',
        },
      },
      postalCode_capability_role_provide: {
        capability: 'xrn:firebolt:capability:localization:postal-code',
        options: {
          role: 'provide',
        },
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
      SUPPORTED_USERGRANT_PINCHALLENGE: 'xrn:firebolt:capability:usergrant:pinchallenge',
      SUPPORTED_DEVICE_DISTRIBUTOR: 'xrn:firebolt:capability:device:distributor',
      SUPPORTED_NETWORK_STATUS: 'xrn:firebolt:capability:network:status',
      SUPPORTED_LOCALIZATION_TIMEZONE: 'xrn:firebolt:capability:localization:time-zone',
      SUPPORTED_PRIVACY_SETTINGS: 'xrn:firebolt:capability:privacy:settings',
      SUPPORTED_PROTOCOL_WIFI: 'xrn:firebolt:capability:protocol:wifi',
      SUPPORTED_USERGRANT_ACKNOWLEDGECHALLENGE:
        'xrn:firebolt:capability:usergrant:acknowledgechallenge',
      SUPPORTED_GRANTS_STATE: 'xrn:firebolt:capability:grants:state',
      INFO_LIFECYCLE_READY: { capabilities: ['xrn:firebolt:capability:lifecycle:ready'] },
      SUPPORTED_LIFECYCLE_READY: 'xrn:firebolt:capability:lifecycle:ready',
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
      SUPPORTED_LIFECYCLE_STATE: 'xrn:firebolt:capability:lifecycle:state',
      SUPPORTED_LIFECYCLE_LAUNCH: 'xrn:firebolt:capability:lifecycle:launch',
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
      SUPPORTED_ADVERTISING_IDENTIFIER: 'xrn:firebolt:capability:advertising:identifier',
      SUPPORTED_ACCOUNT_ID: 'xrn:firebolt:capability:account:id',
      SUPPORTED_ACCOUNT_UID: 'xrn:firebolt:capability:account:uid',
      SUPPORTED_DISCOVERY_ENTITLEMENTS: 'xrn:firebolt:capability:discovery:content-access',
      SUPPORTED_DISCOVERY_SIGNINSTATUS: 'xrn:firebolt:capability:discovery:sign-in-status',
      SUPPORTED_DISCOVERY_WATCHNEXT: 'xrn:firebolt:capability:discovery:watch-next',
      SUPPORTED_DISCOVERY_WATCHED: 'xrn:firebolt:capability:discovery:watched',
      SUPPORTED_DISCOVERY_ENTITYINFO: 'xrn:firebolt:capability:discovery:entity-info',
      SUPPORTED_DISCOVERY_NAVIGATETO: 'xrn:firebolt:capability:discovery:navigate-to',
      SUPPORTED_DISCOVERY_POLICY: 'xrn:firebolt:capability:discovery:policy',
      SUPPORTED_DISCOVERY_PURCHASED_CONTENT: 'xrn:firebolt:capability:discovery:purchased-content',
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
      SUPPORTED_DEVICE_ID: 'xrn:firebolt:capability:device:id',
      SUPPORTED_DEVICE_INFO: 'xrn:firebolt:capability:device:info',
      SUPPORTED_DEVICE_MAKE: 'xrn:firebolt:capability:device:make',
      SUPPORTED_DEVICE_MODEL: 'xrn:firebolt:capability:device:model',
      SUPPORTED_DEVICE_NAME: 'xrn:firebolt:capability:device:name',
      SUPPORTED_DEVICE_SKU: 'xrn:firebolt:capability:device:sku',
      SUPPORTED_DEVICE_UID: 'xrn:firebolt:capability:device:uid',
      SUPPORTED_PROFILE_FLAGS: 'xrn:firebolt:capability:profile:flags',
      SUPPORTED_APPROVE_PURCHASE: 'xrn:firebolt:capability:approve:purchase',
      SUPPORTED_LOCALIZATION_LOCATION: 'xrn:firebolt:capability:localization:location',
      SUPPORTED_APPROVE_CONTENT: 'xrn:firebolt:capability:approve:content',
      SUPPORTED_TOKEN_DEVICE: 'xrn:firebolt:capability:token:device',
      SUPPORTED_TOKEN_PLATFORM: 'xrn:firebolt:capability:token:platform',
      SUPPORTED_TOKEN_ROOT: 'xrn:firebolt:capability:token:root',
      SUPPORTED_PROTOCOL_DIAL: 'xrn:firebolt:capability:protocol:dial',
      SUPPORTED_INPUT_KEYBOARD: 'xrn:firebolt:capability:input:keyboard',
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
      SUPPORTED_METRICS_GENERAL: 'xrn:firebolt:capability:metrics:general',
      SUPPORTED_METRICS_MEDIA: 'xrn:firebolt:capability:metrics:media',
      SUPPORTED_PRIVACY_ADVERTISING: 'xrn:firebolt:capability:privacy:advertising',
      SUPPORTED_SECURE_STORAGE: 'xrn:firebolt:capability:storage:secure',
      SUPPORTED_ADVERTISING_CONFIGURATION: 'xrn:firebolt:capability:advertising:configuration',
      SUPPORTED_LOCALIZATION_LOCALITY: 'xrn:firebolt:capability:localization:locality',
      SUPPORTED_LOCALIZATION_POSTALCODE: 'xrn:firebolt:capability:localization:postal-code',
      SUPPORTED_LOCALIZATION_COUNTRYCODE: 'xrn:firebolt:capability:localization:country-code',
      SUPPORTED_LOCALIZATION_LANGUAGE: 'xrn:firebolt:capability:localization:language',
      SUPPORTED_LOCALIZATION_LOCALE: 'xrn:firebolt:capability:localization:locale',
      SUPPORTED_ACCESSIBILITY_CLOSEDCAPTIONS:
        'xrn:firebolt:capability:accessibility:closedcaptions',
      SUPPORTED_ACCESSIBILITY_VOICEGUIDANCE: 'xrn:firebolt:capability:accessibility:voiceguidance',
      SUPPORTED_CAPABILITY_INFO: 'xrn:firebolt:capability:capabilities:info',
      SUPPORTED_CAPABILITY_REQUEST: 'xrn:firebolt:capability:capabilities:request',
      SUPPORTED_TOKEN_SESSION: 'xrn:firebolt:capability:token:session',
      SECURE_STORAGE_INFO_PARAM: {
        capabilities: ['xrn:firebolt:capability:storage:secure'],
      },
      CAPABILITY_INFO_INFO_PARAM: {
        capabilities: ['xrn:firebolt:capability:capabilities:info'],
      },
      DISCOVERY_CONTENTACCESS_INFO_PARAM: {
        capabilities: ['xrn:firebolt:capability:discovery:content-access'],
      },
      SUPPORTED_DISCOVERY_CONTENTACCESS: 'xrn:firebolt:capability:discovery:content-access',
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
      available: true,
      granted: true,
    },
  },
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
exports.GET_INFO_OF_DISCOVERY_SIGNINSTATUS_CAPABILITY = {
  method: 'capabilities.info',
  params: this.CAPABILITIES_VARIABLES.CAPABILITIES.INFO_DISCOVERY_SIGNINSTATUS,
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
