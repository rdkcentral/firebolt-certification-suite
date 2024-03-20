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
const CONSTANTS = require('../../constants/constants');
const UTILS = require('./utils.js');
const timestamp = new Date();

export default class Queue {
  constructor() {
    // Initialize queue inputs
    this.items = [];
  }

  // Pushes the items to queue based on given conditions
  enqueue(element) {
    this.popExpired();
    if (this.items.length >= CONSTANTS.MESSAGE_QUEUE_SIZE) {
      this.dequeue();
    }
    console.log(JSON.stringify(element) + 'pushed to the queue at' + timestamp.toDateString());
    element.time = Math.round(timestamp.getTime() / 1000);
    return this.items.push(element);
  }

  // Pops the items from queue based on given conditions
  dequeue() {
    if (this.items.length > 0) {
      console.log(
        this.items[this.items.length - 1] + 'popped from the queue at' + timestamp.toDateString()
      );
      return this.items.shift();
    }
  }

  // Pops the items from queue which expired
  popExpired() {
    const currentTime = Math.round(timestamp.getTime() / 1000);
    for (let i = 0; i < this.items.length; i++) {
      if (currentTime - this.items[i].time > CONSTANTS.MESSAGE_QUEUE_TIME_DIFF) {
        delete this.items[i];
        return this.items;
      }
    }
  }

  // Parse the queue and fetch the corresponding item that matches the given id within a given timeout
  LongPollQueue(id, longPollTimeout) {
    let availableResponse = null;
    return new Promise((resolve) => {
      const interval = setTimeout(function () {
        const messageQueue = UTILS.getEnvVariable(CONSTANTS.MESSAGE_QUEUE);
        if (messageQueue.items) {
          for (let i = 0; i < messageQueue.items.length; i++) {
            if (messageQueue.items[i] && messageQueue.items[i].metaData.id === id) {
              availableResponse = messageQueue.items[i].data;
            }
          }
        }
        if (availableResponse) {
          clearTimeout(interval);
          resolve(availableResponse);
        } else {
          resolve(CONSTANTS.RESPONSE_NOT_FOUND);
        }
      }, longPollTimeout);
    });
  }

  // Checks if queue is empty
  isEmpty() {
    return this.items.length == 0;
  }

  // Clears the queue items
  clear() {
    this.items = [];
  }
}
