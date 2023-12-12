import FireboltInvoker from './FireboltInvoker.js';
import modularTransportClient from 'modularTransportClient';
const CONSTANTS = require('./constants.js');

export default class Transport {
  constructor() {
    // Initialize FireboltInvoker once
    this.fireboltInvoker = new FireboltInvoker();
  }

  async sendMessage(messageObject) {
    console.log(`Printing the message object: ${JSON.stringify(messageObject)}`);
    if (this.isFireboltSDK(messageObject)) {
      if (!messageObject.action) {
        messageObject.action = CONSTANTS.CORE;
      }
      // Object contains a "method" field in the format "<Module>.<Method>". Consider it as Firebolt call.
      // Expected format: {"action": "CORE", "method": "closedCaptions.setEnabled", "params": "", "paramsArray": ""}
      const methodResponse = await this.fireboltInvoker.invoke(
        messageObject.method,
        messageObject.param
      );
      return methodResponse;
    } else if (this.isMTC(messageObject)) {
      // Object contains "transport" and "options" fields, consider it as MTC call.
      let transportClient = await modularTransportClient(messageObject.transport, {
        ...messageObject.options,
      });
      // If given transportClient exists, initialize the client else throw error.
      if (transportClient) {
        if (messageObject.payload) {
          return transportClient.send(messageObject.payload);
        }
        return transportClient.send();
      }
      return {
        error: {
          code: -32602,
          message: 'Invalid params',
          data: 'Failed to initialize transport client. Invalid Inputs!',
        },
      };
    } else {
      // TO DO: Update this logic to a better solution
      // return { error: { code: -32602, message: "Invalid params", data: "Neither MTC or firebolt object." } }
      console.log('Neither MTC or firebolt object.');
      return messageObject;
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
    console.log(
      'Printing the message object transport: ' + messageObject.hasOwnProperty(CONSTANTS.TRANSPORT)
    );
    console.log(
      'Printing the message object options: ' + messageObject.hasOwnProperty(CONSTANTS.OPTIONS)
    );
    return (
      messageObject.hasOwnProperty(CONSTANTS.TRANSPORT) &&
      messageObject.hasOwnProperty(CONSTANTS.OPTIONS)
    );
  }
}
