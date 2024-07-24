Simple PubSub
=============

A simple pub/sub application PoC communicating on a LAN using Websockets

## Requirements and Setup

Requires Node and NPM. Known-working versions are v18.10.0 (Node) and 8.19.2 (NPM)

To setup, simply clone this repository and run `npm install`

## Starting the server

`node index.mjs` will start the server on the default port 8080.

`node index.mjs <port>` will start the server on the provided port. Ex: `node index.mjs 9998`

## Communication

Regardless of Pub/Sub, you must first establish a Websocket connection with the server either on the same machine via `ws://localhost:<port>` or on LAN via `ws://<LAN IP>:<port>`

## Call Schema

All calls use the same JSON Schema:

| key | description | required for pub? | required for sub? | required for unsub? |
| --- | --- | --- | --- | --- |
| operation | One of "pub", "sub", or "unsub | yes | yes | yes |
| topic | The topic to publish/subscribe to | yes | yes | yes |
| payload | The data to publish if "pub" | yes | no | no |

## Examples

### Subscribe to all messages on topic "foo"
```{"operation": "sub", "topic": "foo"}```

This connection will now receive all messages published to topic "foo"

### Publish a message to topic "foo"
```{"operation": "pub", "topic": "foo", "payload": "Hello to all subscribers of foo!"}```

An acknowledgement will be sent on this connection and the `payload` will be sent to all subscribers of topic "foo"

### Unsubscribe from all messages on topic "foo"
```{"operation": "unsub", "topic": "foo"}```

This connection will not receive anymore messages published to the topic "foo"

