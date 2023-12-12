const CONSTANTS = require('./constants.js');
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
    let currentTime = Math.round(timestamp.getTime() / 1000);
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
      let interval = setTimeout(function () {
        if (Cypress.env(CONSTANTS.MESSAGE_QUEUE).items) {
          for (let i = 0; i < Cypress.env(CONSTANTS.MESSAGE_QUEUE).items.length; i++) {
            if (
              Cypress.env(CONSTANTS.MESSAGE_QUEUE).items[i] &&
              Cypress.env(CONSTANTS.MESSAGE_QUEUE).items[i].metaData.id === id
            ) {
              availableResponse = Cypress.env(CONSTANTS.MESSAGE_QUEUE).items[i].data;
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
