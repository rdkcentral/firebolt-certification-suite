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

/**
 * @module addon
 * @function launchApp
 * @description Function to add additional details(Ex: platform specific) for the passed message.
 * @example
 * @request launchApp()
 * @returns
 */

function launchApp(message) {
  if (
    message.params &&
    message.params.intent &&
    message.params.intent.data &&
    message.params.intent.data.query
  ) {
    let queryModifier = JSON.parse(message.params.intent.data.query);
    console.log('query Modifier' + JSON.stringify(queryModifier));
    if (queryModifier.params) {
      queryModifier.params['testtoken'] = Cypress.env('testToken');
      queryModifier.params['macaddress'] = Cypress.env('deviceMac');
      message.params.intent.data.query = JSON.stringify(queryModifier);
    } else {
      console.log('params property is missing in the queryModifier object');
    }
  }
  return message;
}

export { launchApp };
