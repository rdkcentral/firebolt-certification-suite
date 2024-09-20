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
const accountVariables = require('./account');
const deviceVariables = require('./device');
const accessibilityVariables = require('./accessibility');
const localizationVariables = require('./localization');
const capabilitiesVariables = require('./capabilities');
const wifiVariables = require('./wifi');
const secondScreenVariables = require('./secondscreen');
const metricsVariables = require('./metrics');

exports.DYNAMIC_FB_CALL_VARIABLES = {
  DEFAULTS: {
    ...accountVariables.ACCOUNT_VARIABLES,
    ...deviceVariables.DEVICE_VARIABLES,
    ...localizationVariables.LOCALIZATION_VARIABLES,
    ...capabilitiesVariables.CAPABILITIES_VARIABLES,
    ...wifiVariables.WIFI_VARIABLES,
    ...metricsVariables.METRICS_VARIABLES,
  },
  ...accessibilityVariables.ACCESSIBILITY_VARIABLES,
  ...secondScreenVariables.SECONDSCREEN_VARIABLES,
};
