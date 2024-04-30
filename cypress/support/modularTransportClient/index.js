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
    
    if (!process.env.transportObject) {
      const object = new transportType[transportClient].default(options);
      await object.initialize();
      const transportObjectArray = [object];
      process.env.transportObject = transportObjectArray;
      return process.env.transportObject[0];
    } else {
      const transportObjectArray = process.env.transportObject;

      const existingObjectIndex = transportObjectArray.findIndex(
        (obj) => Object.getPrototypeOf(obj).constructor.name === transportClient
      );
      // Check if the transportObjectArray already contains incoming transportClient object based on the options

      if (existingObjectIndex !== -1) {
        // Set new options
        if (process.env.transportObject[existingObjectIndex].updateOptions) {
          process.env.transportObject[existingObjectIndex].updateOptions(options);
        }
        return process.env.transportObject[existingObjectIndex];
      } else {
        // Create the object and push it to process.env.transportObject array
        const object = new transportType[transportClient].default(options);
        await object.initialize();
        transportObjectArray.push(object);
        process.env.transportObject = transportObjectArray;

        return process.env.transportObject[process.env.transportObject.length - 1];
      }
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
