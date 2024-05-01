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
const logger = require('../../cypress/support/logger')('index.js');

const client = {
  ws: null,
  listener: null,
};

/**
 * @module appTransport
 * @function init
 * @description This function creates a WebSocket client and initializes a connection to a PubSub system. It returns a promise that resolves when the connection is successfully established, or rejects if an error occurs or the connection is closed.
 * @returns {Promise} Returns a promise that resolves with the event data if the WebSocket client establishes a connection, or rejects with the event data if an error occurs or the connection is closed.
 * @example
 * init().then(data => {
 *   logger.info('Connection established', data);
 * }).catch(error => {
 *   logger.error('Failed to establish connection', error);
 * });
 */
function init() {
  logger.info('Establishing pubsub connection');

  return new Promise((resolve, reject) => {
    // Enter a valid WebSocket URL
    client.ws = new WebSocket('ws://your-ws-url-here.com');

    const websocket = client.ws;

    const openCallback = function (event) {
      websocket.removeEventListener('close', openCallback);
      websocket.removeEventListener('error', openCallback);
      resolve(event.data);
    };

    client.ws.addEventListener('error', function (event) {
      reject(event.data);
    });

    client.ws.addEventListener('close', function (event) {
      reject(event.data);
    });

    client.ws.addEventListener('open', openCallback);
  });
}

/**
 * @module appTransport
 * @function publish
 * @description This function publishes a message to a specified topic. If headers are provided, they are included in the payload.
 * @param {string} topic - The name of the topic to publish the message to.
 * @param {string} message - The message to be published. This should be a stringified JSON object.
 * @param {object} [headers] - Optional headers to be included in the payload.
 * @returns {boolean} Returns true if the message was successfully sent, or false if an error occurred.
 * @example
 * publish('myTopic', JSON.stringify({key: 'value'}), {id: 12345});
 */
function publish(topic, message, headers) {
  if (!topic) {
    logger.error('No topic provided...');
    return false;
  }

  // Format message to be sent
  const publishMsg = {
    operation: 'pub',
    topic,
    payload: {
      message,
    },
  };

  // Add headers if they are provided
  if (headers) {
    publishMsg.payload.headers = headers;
  }

  // Send publish message
  try {
    client.ws.send(JSON.stringify(publishMsg));
    return true;
  } catch (err) {
    logger.error('Failed to publish message...', err);
    return false;
  }
}

/**
 * @module appTransport
 * @function subscribe
 * @description This function subscribes to a specified topic and triggers a callback function when a message is received on that topic.
 * @param {string} topic - The name of the topic to subscribe to.
 * @param {*} callback - The function to be called when a message is received. The payload of the message along with the headers will be passed as arguments to this function.
 * @example
 * subscribe(topic, callback)
 */
function subscribe(topic, callback) {
  // Format subscribe message
  const subscribeMsg = {
    operation: 'sub',
    topic,
  };

  client.listener = callback;

  // Listen for incoming messages
  client.ws.addEventListener('message', (event) => {
    logger.info('Received notification on topic "' + topic + '"', 'subscribe');
    const data = JSON.parse(event.data);

    // Format received message by removing headers from payload object
    const formattedMsg = {
      operation: data.operation,
      topic: data.topic,
      headers: data.payload?.headers,
      payload: data.payload.message,
    };

    // Add headers to top level of formatted message if they exist
    if (data.payload.headers) {
      formattedMsg.headers = data.payload.headers;
    }
    // If a callback function is provided, call it with the formattedMsg payload and headers
    if (typeof callback == 'function') {
      logger.info(
        'Incoming notification is valid. Calling callback:' + JSON.stringify(data),
        'sunscribe'
      );
      callback(formattedMsg.payload, formattedMsg.headers);
    }
  });

  // Send subscribe message
  client.ws.send(JSON.stringify(subscribeMsg));
}

/**
 * @module appTransport
 * @function unsubscribe
 * @description This function unsubscribes from a specified topic and stops the listener for incoming messages on that topic.
 * @param {string} topic - The name of the topic to unsubscribe from.
 * @example
 * unsubscribe('myTopic');
 */
function unsubscribe(topic) {
  const message = {
    operation: 'unsub',
    topic: topic,
  };
  client.listener = null;

  // Send unsubscribe message
  client.ws.send(JSON.stringify(message));
}

// Uncomment the line below to get app transport working
// module.exports = { init, publish, subscribe, unsubscribe };
