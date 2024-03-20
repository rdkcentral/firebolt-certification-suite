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

import modularTransportClient from '../../modularTransportClient';
import { getEnvVariable } from './utils';

const WEBSOCKET = 'WebSocket';
const DEFAULT_WS_URL_PROTOCOL = 'ws://';
const DEFAULT_WS_PORT = 9998;
const DEFAULT_WS_URL_PATH = 'jsonrpc';
let fbRequestId = 0;
let singletonInstance = null;

export default class FireboltInvoker {
  constructor() {
    if (singletonInstance) {
      console.log('Singleton instance already exists');
      return singletonInstance;
    }

    this.instance = null;
    singletonInstance = this;

    return this;
  }

  buildWebSocketUrl(deviceIp, wsUrlProtocol, port, path) {
    const protocol = wsUrlProtocol || DEFAULT_WS_URL_PROTOCOL;
    const wsPort = port || DEFAULT_WS_PORT;
    const wsPath = path || DEFAULT_WS_URL_PATH;

    return `${protocol}${deviceIp}:${wsPort}/${wsPath}`;
  }

  async get() {
    if (this.instance === null) {
      const wsUrl = this.buildWebSocketUrl(
        getEnvVariable('deviceIp'),
        getEnvVariable('wsUrlProtocol', false),
        getEnvVariable('wsPort', false),
        getEnvVariable('wsUrlPath', false)
      );
      console.log('Creating WebSocket connection for URL: ' + JSON.stringify(wsUrl));
      try {
        this.instance = await modularTransportClient(WEBSOCKET, {
          url: wsUrl,
        });
        await this.instance.initialize();
        console.log('WebSocket client initialized');
        if (this.instance) {
          Cypress.env('webSocketClient', this.instance);
          return this.instance;
        } else {
          Cypress.env('webSocketClient', null);
        }
      } catch (err) {
        console.error('Error occurred during initializing WebSocket client:', err);
        throw new Error('WebSocket initialization failed.');
      }
    }
    return this.instance;
  }

  async invoke(methodName, params) {
    const fireboltMessage = {
      method: methodName,
      jsonrpc: '2.0',
      id: fbRequestId++,
    };

    if (params) {
      fireboltMessage.params = params;
    }

    console.log('Firebolt Message in the invoke:' + JSON.stringify(fireboltMessage));

    try {
      const currentInstance = await this.get();
      const response = await currentInstance.send(JSON.stringify(fireboltMessage));

      if (response) {
        return response;
      }
    } catch (error) {
      console.error('Error occurred during invoking Firebolt:', error);
      throw error;
    }
  }
}
