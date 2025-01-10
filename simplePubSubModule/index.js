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
const requestModules = require('./requestModules/index');
const responseModules = require('./responseModules/index');
const intentAddons = require('./intentAddons/index');
const appTransport = require('./appTransport/index');
const cypressAddons = require('./cypress/index');
const externalTransport = require('./transportLayers/index');

exports.requestModules = requestModules;
exports.responseModules = responseModules;
exports.intentAddons = intentAddons;
exports.appTransport = appTransport;
exports.cypressAddons = cypressAddons;
exports.externalTransport = externalTransport;
