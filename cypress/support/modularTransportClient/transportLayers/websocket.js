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
import { AsyncTransportClient } from './parent';
const defaultTimeout = Cypress.env('websocketTransportTimeout')
  ? Cypress.env('websocketTransportTimeout')
  : 15000;

export default class Websocket extends AsyncTransportClient {
  constructor(options) {
    super();
    this.options = options;
    this.listener = null;
  }

  async initialize() {
    if (this.options.url) {
      cy.log('2538 testlog websocket.js');
      return new Promise((res, rej) => {
        // Protocol can be used for other things (For instance an access token)
        if (this.options.protocol) {
          this.ws = new WebSocket(this.options.url, this.options.protocol);
        } else {
          this.ws = new WebSocket(this.options.url);
        }

        const websocket = this.ws;
        const openCallback = function (event) {
          websocket.removeEventListener('close', openCallback);
          websocket.removeEventListener('error', openCallback);
          res(event.data);
        };

        this.ws.addEventListener('error', function (event) {
          rej(event.data);
        });

        this.ws.addEventListener('close', function (event) {
          rej(event.data);
        });

        this.ws.addEventListener('open', openCallback);
      });
    } else {
      throw new Error(
        'Cannot establish websocket connection. Option "url" with ws://host:port or wss://host:port required'
      );
    }
  }

  async send(payload) {
    cy.log('2538 testlog payload', payload);
    if (this.listener) {
      throw new Error(
        'Cannot send payload while listening to messages. Please create another client instance'
      );
    }

    // Create a promise that sends the request and resolves when we receive a message on the websocket
    const callAndResponse = new Promise((res, rej) => {
      this.ws.addEventListener('error', function (event) {
        rej(event.data);
      });

      const websocket = this.ws;
      cy.log('2538 testlog websocket', websocket);
      const sendCallback = function (event) {
        websocket.removeEventListener('message', sendCallback);
        websocket.removeEventListener('error', sendCallback);
        res(event.data);
      };
      cy.log('2538 testlog sendCallback', sendCallback);

      this.ws.onmessage = (msg) => {
        cy.log('2538 testlog msg', msg);
        if (msg && msg.data) {
          const message = JSON.parse(msg.data);
          const requestMessage = JSON.parse(payload);
          const mapKey = Array.from(Cypress.env('eventResponseMap').keys()).find((key) =>
            key.includes(message.id)
          );
          cy.log('2538 testlog message', message);
          cy.log('2538 testlog requestMessage', requestMessage);
          const interactionKey = message.hasOwnProperty('FireboltInteraction');
          cy.log('2538 testlog interactionKey', interactionKey);

          if (interactionKey) {
            Cypress.env('fbInteractionLogs').addLog(message.FireboltInteraction);
          }
          cy.log('2538 testlog mapKey', mapKey);

          // Updating event response in the map when event is triggered by the platform
          if (
            mapKey &&
            Cypress.env('eventResponseMap').has(mapKey) &&
            !message?.result?.hasOwnProperty('listening')
          ) {
            const obj = Cypress.env('eventResponseMap').get(mapKey);
            cy.log('2538 testlog obj', obj);
            obj.listenerResponse = message;
            Cypress.env('eventResponseMap').set(mapKey, obj);
          }

          // Returning the message when response and request id matches.
          if (message.id == requestMessage.id) {
            cy.log('2538 testlog sending msg', message.id);
            cy.log('2538 testlog sending msg', requestMessage.id);
            sendCallback(msg);
          }
        } else {
          cy.log('2538 testlog sending msg else', msg);
          sendCallback(msg);
        }
      };
      this.ws.send(payload);
    });

    // Create a promise that rejects in <ms> milliseconds
    const timeout = new Promise((resolve, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);

        // Reject the promise
        reject('Did not receive response on websocket in ' + defaultTimeout + 'ms.');
      }, defaultTimeout);
    });

    /**
     * One of two things will happen:
     *  1) We will get a response for the message we sent in the "callAndResponse" promise
     *  2) We will reach the timeout set by the "timeout" promise
     *
     * Whichever thing happens first will be sent as the response
     */
    return Promise.race([callAndResponse, timeout]);
  }

  subscribe(topic, callback) {
    if (this.listener) {
      throw new Error(
        'Cannot subscribe multiple callbacks to events. Please create another client instance or unsubscribe using this instance'
      );
    }

    this.listener = callback;
    this.ws.addEventListener(topic, function (event) {
      callback(event.data);
    });
  }

  unsubscribe(topic) {
    this.ws.removeEventListener(topic, this.listener);
    this.listener = null;
  }
}