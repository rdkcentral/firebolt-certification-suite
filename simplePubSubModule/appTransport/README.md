# App Transport with Default Module

### Getting Started

App Transport in the `defaultModule` of FCS uses WebSockets and a PubSub pattern to communicate. The provided pubSub client logic inside of [index.js](./index.js) is configured to work with a simple PubSub server. It allows for initializing a connection, publishing messages to topics, subscribing to topics, and unsubscribing from topics.

**NOTE1**: Users **MUST** update the URL within the `init()` function to point to their PubSub server for proper functionality.

**NOTE2**: Modify the `getTopic()` function in `./cypress/support/cypress-support/src/utils.js` if you would like to control the name of the PubSub topic FCS subscribes to. The MAC address of the device you are testing with is used as the default topic name.

### Customization

If you wish to extend the functionality of this PubSub client, or even create your own client, you can use the file in place as a template for getting started. While payload data can be anything you desire, maintaining the same function names and parameters in your code ensures compatibility with the existing functions inside of FCS.

### Functions

### init()

**Purpose**: Initializes a connection by creating a client.

**Example**: `init()`

### publish(topic, message, headers)

**Purpose**: Publishes a message to listeners of a topic.

**Parameters**:

- `topic` (string): The topic to publish a message to.
- `message` (string): The intent message that is being sent.
- `headers` (object): The headers included in the payload.

**Example**: `publish(topic, "{"communicationMode": "communicationMode", "action": "actionType"}", {headers:{id:12345}})`

### subscribe(topic, callback)

**Purpose**: Adds a listener to a response topic and triggers a callback when a message is received.

**Parameters**:

- `topic` (string): The topic used to publish the message.
- `callback` (function): The function that is called when a listener receives a message.

**Example**: `subscribe(topic, callback)`

### unsubscribe(topic)

**Purpose**: Stops the listener from a specific topic.

**Parameters**:

- `topic` (string): The topic to unsubscribe from.
