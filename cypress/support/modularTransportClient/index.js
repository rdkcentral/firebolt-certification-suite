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
const children = require('./transportLayers');
const externalTransport = require('configModule').externalTransport;

export default async (transportClient, options) => {
  const createAndInitializeObject = async (transportType) => {
    try {
      const transportClass = transportType[transportClient].default;
  
      const instance = transportClass.getInstance(options); // singleton getter
      await instance.initialize(options);
      return instance;
    } catch (error) {
      console.error('Error in createAndInitializeObject:', error);
      throw error;
    }
  };

  // Check for external transport client
  if (externalTransport?.[transportClient]) {
    return createAndInitializeObject(externalTransport);
  }
  // If no external transport client, check for internal transport client
  else if (children[transportClient]) {
    return createAndInitializeObject(children);
  }
};
