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

const CONSTANTS = require('./constants/constants');

class apiObject {
  constructor(apiName, params, context, response, expected, appId) {
    this.apiName = apiName;
    this.params = params;
    this.context = context;
    this.expected = expected;
    response.apiResponse ? (this.response = response.apiResponse) : (this.response = response);
    this.apiSchemaResult = {
      validationStatus: response.schemaValidationStatus,
      validationResponse: response.schemaValidationResponse,
    };
    this.app = appId;
  }
}

class eventObject {
  constructor(eventName, params, context, response, appId, expectedResult) {
    console.log('constructor in eventConfig class');
    this.eventName = eventName;
    this.params = params;
    this.context = context;
    this.eventListenerResponse = response.eventListenerResponse;
    this.eventListenerSchemaResponse = response.eventListenerSchemaResult;
    this.eventObjectId = response.eventListenerId;
    this.expectedResult = expectedResult;
    this.eventResponse = null;
    this.eventSchemaResult = null;
    this.eventTime = null;
    this.app = appId;
  }

  // Function to update the event response in event object.
  setEventResponseData(response) {
    if (
      (response.eventListenerId && response.eventSchemaResult && response.eventResponse != null) ||
      response.hasOwnProperty(CONSTANTS.EVENT_RESPONSE)
    ) {
      this.eventResponse = response.eventResponse;
      this.eventSchemaResult = response.eventSchemaResult;
      this.eventTime = response.eventTime;
    } else {
      assert(false, 'Platform does not trigger event');
    }
  }
}

export { apiObject, eventObject };
