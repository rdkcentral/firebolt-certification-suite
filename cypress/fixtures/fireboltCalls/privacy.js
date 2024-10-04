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
exports.PRIVACY_SETTINGS = {
  method: resolveAtRuntime('manage_privacy.{{attribute}}'),
  params: null,
  validationJsonPath: 'result',
  setMethod: resolveAtRuntime('manage_privacy.set{{attribute.uppercaseFirstChar}}'),
  setParams: resolveAtRuntime('value'),
  setValidationJsonPath: 'result',
  setContent: null,
  event: resolveAtRuntime('manage_privacy.on{{attribute.uppercaseFirstChar}}Changed'),
  eventValidationJsonPath: 'eventResponse',
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
exports.SETTINGS = {
  allowACRCollection: true,
  allowResumePoints: true,
  allowAppContentAdTargeting: true,
  allowBusinessAnalytics: true,
  allowCameraAnalytics: true,
  allowPersonalization: true,
  allowPrimaryBrowseAdTargeting: true,
  allowPrimaryContentAdTargeting: true,
  allowProductAnalytics: true,
  allowRemoteDiagnostics: true,
  allowUnentitledPersonalization: true,
  allowUnentitledResumePoints: true,
  allowWatchHistory: true,
};
exports.SET_PRIVACY_SETALLOWAPPCONTENTADTARGETING_TRUE = {
  method: 'manage_privacy.setAllowAppContentAdTargeting',
  params: { value: true },
};
exports.SET_PRIVACY_SETALLOWREMOTEDIAGNOSTICS_TRUE = {
  method: 'manage_privacy.setAllowRemoteDiagnostics',
  params: { value: true },
};
exports.SET_PRIVACY_ALLOW_RESUMEPOINTS_AS_TRUE = {
  method: 'manage_privacy.setAllowResumePoints',
  params: { value: true },
};
exports.SET_PRIVACY_ALLOW_UNENTITLEDRESUMEPOINTS_AS_TRUE = {
  method: 'manage_privacy.setAllowUnentitledResumePoints',
  params: { value: true },
};
exports.SET_PRIVACY_ALLOW_WATCHHISTORY_AS_TRUE = {
  method: 'manage_privacy.setAllowWatchHistory',
  params: { value: true },
};
exports.SET_PRIVACY_ALLOW_PRODUCTANALYTICS_AS_TRUE = {
  method: 'manage_privacy.setAllowProductAnalytics',
  params: { value: true },
};
exports.SET_PRIVACY_ALLOW_PERSONALIZATION_AS_TRUE = {
  method: 'manage_privacy.setAllowPersonalization',
  params: { value: true },
};
exports.SET_PRIVACY_ALLOW_UNENTITLEDPERSONALIZATION_AS_TRUE = {
  method: 'manage_privacy.setAllowUnentitledPersonalization',
  params: { value: true },
};
exports.SET_PRIVACY_ALLOW_REMOTEDIAGNOSTICS_AS_TRUE = {
  method: 'manage_privacy.setAllowRemoteDiagnostics',
  params: { value: true },
};
exports.SET_PRIVACY_ALLOW_PRIMARYCONTENTADTARGETING_AS_TRUE = {
  method: 'manage_privacy.setAllowPrimaryContentAdTargeting',
  params: { value: true },
};
exports.SET_PRIVACY_ALLOW_PRIMARYBROWSEADTARGETING_AS_TRUE = {
  method: 'manage_privacy.setAllowPrimaryBrowseAdTargeting',
  params: { value: true },
};
exports.SET_PRIVACY_ALLOW_APPCONTENTADTARGETING_AS_TRUE = {
  method: 'manage_privacy.setAllowAppContentAdTargeting',
  params: { value: true },
};
exports.SET_PRIVACY_ALLOW_ACRCOLLECTION_AS_TRUE = {
  method: 'manage_privacy.setAllowACRCollection',
  params: { value: true },
};
exports.SET_PRIVACY_ALLOW_CAMERAANALYTICS_AS_TRUE = {
  method: 'manage_privacy.setAllowCameraAnalytics',
  params: { value: true },
};
exports.SET_PRIVACY_ALLOW_APPCONTENTADTARGETING_AS_FALSE = {
  method: 'manage_privacy.setAllowAppContentAdTargeting',
  params: { value: false },
};
exports.GET_PRIVACY_SETTINGS = {
  method: 'manage_privacy.settings',
  params: {},
};
exports.EXPECTED_PRIVACY_SETTINGS = {
  method: 'privacy.settings',
  validationJsonPath: 'result',
  content: {
    data: [
      {
        type: 'fixture',
        validations: [
          {
            mode: 'staticContentValidation',
            type: this.SETTINGS,
            description: 'Validation of the Device Id Format',
          },
        ],
      },
    ],
  },
};
