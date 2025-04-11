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
const { v4: uuidv4 } = require('uuid');
const LZString = require('lz-string');
const CONSTANTS = require('../../constants/constants');
const logger = require('../../Logger')('pubsub.js');

const DEFAULT_TIMEOUT = Cypress.env('pubsubTransportTimeout')
  ? Cypress.env('pubsubTransportTimeout')
  : 15000;
const DEFAULT_QUEUE_SIZE = CONSTANTS.MESSAGE_QUEUE_SIZE || 100;
const DEFAULT_QUEUE_TIME_DIFF = CONSTANTS.MESSAGE_QUEUE_TIME_DIFF || 3600; // 1 hour in seconds

export default class PubSub extends AsyncTransportClient {
  constructor(options = {}) {
    super();

    // Throw error if no URL is provided
    if (!options.url) {
      throw new Error('PubSub initialization error: No URL provided.');
    }

    // Initialize variables
    this.ws = null;
    this.isConnected = false;
    this.listener = null;
    this.topicList = [];
    this.queueItems = [];

    // Configure options with defaults
    this.options = {
      url: options.url,
      protocol: options.protocol || null,
      useCompression: options.useCompression || Cypress.env(CONSTANTS.ENV_MSG_COMPRESSION) || false,
      callbackFilter: options.callbackFilter || null,
      topic: options.topic || null,
      responseTopic: options.responseTopic || null,
      timeout: options.timeout || DEFAULT_TIMEOUT,
    };

    // Initialize queue settings
    this.queueSize = options.queueSize || DEFAULT_QUEUE_SIZE;
    this.queueTimeExpiry = options.queueTimeExpiry || DEFAULT_QUEUE_TIME_DIFF;

    // Register the queue in Cypress.env if it doesn't exist
    if (!Cypress.env('messageQueue')) {
      Cypress.env('messageQueue', this);
    }
  }

  /**
   * Initializes the PubSub connection
   * Handles authentication with SAT if needed
   * @returns {Promise} Resolves when connection is established, rejects on error
   */
  async initialize() {
    logger.info('Initializing PubSub connection');

    try {
      // Establish WebSocket connection
      return new Promise((resolve, reject) => {
        // Create WebSocket with or without SAT authentication
        this.ws = this.options.protocol
          ? new WebSocket(this.options.url, this.options.protocol)
          : new WebSocket(this.options.url);

        // Setup handlers
        const openHandler = (event) => {
          logger.debug('PubSub connection opened successfully');
          this.isConnected = true;
          this.ws.removeEventListener('open', openHandler);
          this.ws.removeEventListener('error', errorHandler);
          this.ws.removeEventListener('close', closeHandler);
          resolve(event.data);
        };

        const errorHandler = (event) => {
          logger.error('PubSub connection error', event);
          this.ws.removeEventListener('open', openHandler);
          this.ws.removeEventListener('error', errorHandler);
          this.ws.removeEventListener('close', closeHandler);
          reject(event.data || new Error('WebSocket connection error'));
        };

        const closeHandler = (event) => {
          logger.error('PubSub connection closed during initialization');
          this.isConnected = false;
          this.ws.removeEventListener('open', openHandler);
          this.ws.removeEventListener('error', errorHandler);
          this.ws.removeEventListener('close', closeHandler);
          reject(event.data || new Error('WebSocket connection closed during initialization'));
        };

        // Add lifecycle handlers
        this.ws.addEventListener('open', openHandler);
        this.ws.addEventListener('error', errorHandler);
        this.ws.addEventListener('close', closeHandler);
      });
    } catch (error) {
      logger.error('Error establishing PubSub connection:', error);
      return Promise.reject(error);
    }
  }

  /**
   * Handles incoming WebSocket messages
   * @param {Event} event - WebSocket message event
   * @param {Function} callback - Callback function to handle messages
   * @private
   */
  _handleIncomingMessage(event, callback) {
    if (!event.data) {
      logger.warn('Received empty message');
      return;
    }

    let data;
    try {
      data = JSON.parse(event.data);
    } catch (error) {
      logger.error(`Failed to parse incoming message: ${error}`);
      return;
    }

    logger.debug(`Received message: ${JSON.stringify(data)}`);

    // Decompress payload if needed (regardless of filter)
    if (this.options.useCompression && data.payload) {
      try {
        data.payload = LZString.decompressFromBase64(data.payload, {
          inputEncoding: 'StorageBinaryString',
        });
      } catch (error) {
        logger.error(`Failed to decompress message: ${error}`);
      }
    }

    // Apply filter logic
    let shouldProcess = true;

    // If a callback filter function is provided, use it to determine if message should be processed
    if (this.options.callbackFilter && typeof this.options.callbackFilter === 'function') {
      shouldProcess = this.options.callbackFilter(data);
      if (!shouldProcess) {
        logger.debug('Message filtered out by custom filter function');
        return;
      }
    }

    // Add to queue
    const queueInput = {
      data: data.payload,
      metaData: data.headers,
    };

    this.enqueue(queueInput);

    // Call the provided callback function
    if (callback && typeof callback === 'function') {
      callback(queueInput);
    }
    logger.debug(`Processed message: ${JSON.stringify(data)}`);
  }

  /**
   * Publish a message to a topic and optionally listen for a response
   * @param {string|object} message - Message to publish
   * @param {string} topic - Topic to publish to
   * @returns {Promise} - Resolves with response or timeout message
   */
  async send(message, topic) {
    if (!this.isConnected) {
      throw new Error('PubSub not connected. Call initialize() first.');
    }

    const publishTopic = this.options.topic || topic;
    if (!publishTopic) {
      throw new Error('No topic specified for publishing');
    }

    // Determine response topic
    const responseTopic = this.options.responseTopic || publishTopic;

    // Subscribe to response topic if not already subscribed
    if (!this.topicList.includes(responseTopic)) {
      this.topicList.push(responseTopic);
      this.subscribe(responseTopic, (data) => {
        try {
          data = JSON.parse(data);
          const queueInput = {};
          queueInput.data = data.payload;
          queueInput.metaData = data.headers;
          this.enqueue(queueInput);
        } catch (error) {
          logger.error(`Error while processing response: ${error}`);
        }
      });
    }

    // Apply compression if enabled
    let processedMessage = message;
    if (this.options.useCompression) {
      processedMessage = LZString.compressToBase64(message, {
        outputEncoding: 'StorageBinaryString',
      });
    }

    // Create the message payload
    const messageId = uuidv4();
    const payload = {
      requestId: uuidv4(),
      headers: {
        id: messageId,
      },
      operation: 'publish',
      topics: [publishTopic],
      payload: processedMessage,
      payloadType: '1000',
      timestamp: new Date().getTime(),
    };

    logger.info(
      `Publishing message to topic "${publishTopic}"${this.options.useCompression ? ' with compression' : ''}: ${JSON.stringify(payload)}`
    );

    // Create a promise that sends the request and waits for response
    const callAndResponse = new Promise((resolve) => {
      // Send the message
      this.ws.send(JSON.stringify(payload));

      // Use long polling to wait for response
      this.LongPollQueue(messageId, this.options.timeout).then((response) => {
        if (response === CONSTANTS.NO_RESPONSE || response === CONSTANTS.RESPONSE_NOT_FOUND) {
          resolve(
            `Did not receive response in ${this.options.timeout}ms at topic ${responseTopic} for header ID: ${messageId}`
          );
        } else {
          console.log('KEATON CALL AND RESPONSE', response);
          resolve(response);
        }
      });
    });

    // Create a timeout promise
    const timeout = new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          `Did not receive response in ${this.options.timeout}ms at topic ${responseTopic} for header ID: ${messageId}`
        );
      }, this.options.timeout);
    });

    // Race the promises
    return Promise.race([callAndResponse, timeout]);
  }

  /**
   * Alias for send method to maintain compatibility
   */
  publish(message, topic) {
    return this.send(message, topic);
  }

  /**
   * Subscribe to a topic
   * @param {string} topic - Topic to subscribe to
   * @param {Function} callback - Callback function to handle messages
   */
  subscribe(topic, callback) {
    if (!this.isConnected) {
      throw new Error('PubSub not connected. Call initialize() first.');
    }

    const message = {
      requestId: uuidv4(),
      operation: 'subscribe',
      topics: [topic],
      timestamp: new Date().getTime(),
    };

    this.listener = callback;

    this.ws.addEventListener('message', (event) => {
      logger.info(`Received incoming notification on topic "${topic}"`);
      this._handleIncomingMessage(event, callback);
    });

    logger.info(`Subscribing to topic "${topic}"`);
    this.ws.send(JSON.stringify(message));
  }

  /**
   * Unsubscribe from topics
   * @param {string|string[]} topic - Topic or array of topics to unsubscribe from
   */
  unsubscribe(topic = this.topicList) {
    if (!this.isConnected) {
      logger.warn('PubSub not connected, nothing to unsubscribe');
      return;
    }

    const topicList = Array.isArray(topic) ? topic : topic.split(',');

    const message = {
      requestId: uuidv4(),
      operation: 'unsubscribe',
      topics: topicList,
      timestamp: new Date().getTime(),
    };

    logger.info(`Unsubscribing from topics: ${topicList.join(', ')}`);

    // Reset tracking variables
    this.topicList = this.topicList.filter((t) => !topicList.includes(t));
    if (this.topicList.length === 0) {
      this.listener = null;
    }

    this.ws.send(JSON.stringify(message));
  }

  /**
   * Close the WebSocket connection
   */
  close() {
    if (this.isConnected && this.ws) {
      this.ws.close(1000, 'Connection closed by client');
      this.isConnected = false;
      this.listener = null;
      this.topicList = [];
      logger.info('PubSub connection closed');
    }
  }

  /**
   * Update client options
   * @param {Object} options - New options to apply
   */
  async updateOptions(options) {
    this.options = { ...this.options, ...options };
    logger.debug('PubSub options updated');
  }

  /**
   * Queue Management Functions
   */

  /**
   * Add an item to the queue
   * @param {Object} element - Item to add to queue
   * @returns {number} - New queue length
   */
  enqueue(element) {
    this.popExpired();

    if (this.queueItems.length >= this.queueSize) {
      this.dequeue();
    }

    const timestamp = new Date();
    logger.debug(`Item pushed to queue at ${timestamp.toISOString()}`);

    element.time = Math.round(timestamp.getTime() / 1000);
    return this.queueItems.push(element);
  }

  /**
   * Remove oldest item from queue
   * @returns {Object|undefined} - Removed item or undefined if queue empty
   */
  dequeue() {
    if (this.queueItems.length > 0) {
      const removed = this.queueItems.shift();
      logger.debug(`Item removed from queue`);
      return removed;
    }
    return undefined;
  }

  /**
   * Remove expired items from queue
   * @returns {Array} - Updated queue
   */
  popExpired() {
    const currentTime = Math.round(new Date().getTime() / 1000);
    this.queueItems = this.queueItems.filter((item) => {
      return currentTime - item.time <= this.queueTimeExpiry;
    });
    return this.queueItems;
  }

  /**
   * Long polling for queue items
   * @param {string} id - ID to look for in queue
   * @param {number} timeout - Timeout in milliseconds
   * @returns {Promise} - Resolves with matching item or timeout message
   */
  LongPollQueue(id, timeout = this.options.timeout) {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const checkInterval = 1000; // Check every second

      const interval = setInterval(() => {
        // Self-reference to avoid Cypress.env access if possible
        const item = this.queueItems.find(
          (item) => item && item.metaData && item.metaData.id === id
        );

        if (item) {
          clearInterval(interval);
          resolve(item.data);
          return;
        }

        // Check for timeout
        if (Date.now() - startTime >= timeout) {
          clearInterval(interval);
          resolve(CONSTANTS.RESPONSE_NOT_FOUND || CONSTANTS.NO_RESPONSE || 'RESPONSE_NOT_FOUND');
        }
      }, checkInterval);
    });
  }

  /**
   * Check if queue is empty
   * @returns {boolean} - True if empty, false otherwise
   */
  isEmpty() {
    return this.queueItems.length === 0;
  }

  /**
   * Clear the queue
   */
  clear() {
    this.queueItems = [];
    logger.debug('Queue cleared');
  }
}
