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
import FireboltInvoker from './FireboltInvoker.js';
import modularTransportClient from '../../modularTransportClient';
const CONSTANTS = require('../../constants/constants');
const logger = require('../../Logger')('transport.js');
export default class Transport {
  constructor() {
    // Initialize FireboltInvoker once
    this.fireboltInvoker = new FireboltInvoker();
  }

  async sendMessage(messageObject, responseWaitTime) {
    logger.info(`Printing the message object: ${JSON.stringify(messageObject)}`, `sendMessage`);
    try {
      if (this.isFireboltSDK(messageObject)) {
        if (!messageObject.action) {
          messageObject.action = CONSTANTS.CORE;
        }

        // Object contains a "method" field in the format "<Module>.<Method>". Consider it as Firebolt call.
        // Expected format: {"action": "CORE", "method": "closedCaptions.setEnabled", "params": "", "paramsArray": ""}
        const methodResponse = await this.fireboltInvoker.invoke(
          messageObject.method,
          messageObject.params
        );
        return methodResponse;
      } else if (this.isMTC(messageObject)) {
        // Object contains "transport" and "options" fields, consider it as MTC call.
        messageObject.options.timeout = responseWaitTime;
        const transportClient = await modularTransportClient(messageObject.transport, {
          ...messageObject.options,
        });

        // If given transportClient exists, initialize the client else throw error.
        if (transportClient) {
          const response = messageObject.payload
            ? await transportClient.send(messageObject.payload)
            : await transportClient.send();
  
          return response;
        }
  
        const errorResponse = {
          error: {
            code: -32602,
            message: 'Invalid params',
            data: 'Failed to initialize transport client. Invalid Inputs!',
          },
        };
        return errorResponse;
      } else {
        logger.info(`Neither MTC or firebolt object.`, `sendMessage`);
        return messageObject;
      }
    } catch (err) {
      console.error('Error in sendMessage:', err);
      throw err;
    }
  }

  async unsubscribe() {
    try {
      if (process.env.transportObject) {
        const transportObjectArray = process.env.transportObject;
        transportObjectArray.forEach((transportClient) => {
          transportClient.unsubscribe();
        });
      }
    } catch (error) {
      console.log('Error while unsubscribing: ', error);
    }
  }

  // Object contains a "method" field in the format "<Module>.<Method>" (Ex: "closedCaptions.setEnabled"). Consider it as Firebolt call.
  isFireboltSDK(messageObject) {
    if (messageObject.method && messageObject.method.includes('.')) {
      const module = messageObject.method.split('.')[0];
      const method = messageObject.method.split('.')[1];
      return module + '.' + method == messageObject.method;
    }
    return false;
  }
  // Object contains "transport" and "options" fields, consider it as MTC call.
  isMTC(messageObject) {
    logger.info(
      'Printing the message object transport: ' + messageObject.hasOwnProperty(CONSTANTS.TRANSPORT),
      'isMTC'
    );
    logger.info(
      'Printing the message object options: ' + messageObject.hasOwnProperty(CONSTANTS.OPTIONS),
      'isMTC'
    );
    return (
      messageObject.hasOwnProperty(CONSTANTS.TRANSPORT) &&
      messageObject.hasOwnProperty(CONSTANTS.OPTIONS)
    );
  }
}
