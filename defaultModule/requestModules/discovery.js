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
 **/

// Note: paths for imports are given assuming we are running from node_modules/configModules.
// This is because Scripts/checkDefaultConfig.js copies neccessary folders missing from the configModule from here (defaultModule) to the config module.
import modularTransportClient from '../../../cypress/support/modularTransportClient';
const CONSTANTS = require('../../../cypress/support/constants/constants');
const UTILS = require('../../../cypress/support/cypress-support/src/utils');
const MESSAGE = 'message';
const WEBSOCKET = 'WebSocket';

/**
   * @function initWSClient()
   * @description init modular ws transport client. Any number of instance can be created to communicate with ws
      User has control to use which wsclient is needed
   * @param wsUrl is optional. Either pass in url directly or it will build url based on env
   * @return websocketClient object
   * @example initWSClient() or initWSClient('wss://localhost/abcd')
**/

async function initWSClient(wsUrl = null) {
  fireLog.info('Initialising the websocket client');
  try {
    let url = wsUrl;
    if (!wsUrl) {
      url = buildWSUrl();
    }
    const protocol = UTILS.getEnvVariable('wsProtocol', false);
    let webSocketClient = null;
    if (protocol) {
      webSocketClient = await modularTransportClient(WEBSOCKET, {
        url: url,
        protocol: protocol,
      });
    } else {
      webSocketClient = await modularTransportClient(WEBSOCKET, {
        url: url,
      });
    }
    await webSocketClient.initialize();
    fireLog.info('Websocket client initialized');
    return webSocketClient;
  } catch (err) {
    fireLog.error('Following error occured during initialising websocket client -' + err);
    return err;
  }
}

/**
 * @function buildWSUrl
 * @description  constructs a WebSocket URL using environment variables .
 * @return {string} The WebSocket URL.
 */

function buildWSUrl() {
  // support wss and ws
  const wsUrlProtocol = UTILS.getEnvVariable('wsUrlProtocol', false) || 'ws://';
  const port = UTILS.getEnvVariable('wsPort', false) || 9998;
  const path = '/' + (UTILS.getEnvVariable('wsUrlPath', false) || 'jsonrpc');
  const deviceIp = UTILS.getEnvVariable('deviceIp');
  return [
    wsUrlProtocol,
    deviceIp,
    ':' + port,
    path,
    UTILS.getEnvVariable('token', false) ? '?token=' + UTILS.getEnvVariable('token') : null,
  ].join('');
}

/**
 * @module discovery
 * @function launch
 * @description Launches a web application using the specified URL based on environment variables.
 * @example launch()
 **/

function launch() {
  const appId = UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID);
  const deviceIp = UTILS.getEnvVariable('deviceIp');
  const thunderPort = UTILS.getEnvVariable('thunderPort', false) || 9998;

  // If the mock environment variable is set to true, launch the web application using the specified URL
  if (UTILS.getEnvVariable('mock', false)) {
    // Construct the URL with available params
    const appId = UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID);
    const appIdUrl = UTILS.getEnvVariable(`${appId}Url`);
    const appUrl = decodeURIComponent(appIdUrl);

    if (!appIdUrl) {
      throw new Error(`${appId}Url not found in env variables`);
    }
    if (UTILS.getEnvVariable(CONSTANTS.LIFECYCLE_VALIDATION, false)) {
      cy.visit(appUrl + '&lifecycle_validation=true');
    } else {
      cy.visit(appUrl);
    }
    cy.wait(4000);
    cy.title().should('include', 'Firebolt Certification');
    // Do not return anything or return null within the function.
    return null;
  }

  return cy
    .task('launchAppViaThunder', { deviceIp, thunderPort, appId })
    .then((launchResponse) => {
      fireLog.info(
        'org.rdk.AppManager.launchApp response: ' + JSON.stringify(launchResponse)
      );
      return null;
    });
}

exports.launch = launch;
