## Firebolt Invoker Module

This module implements a Firebolt invoker for handling WebSocket communication. It utilizes the modularTransportClient for WebSocket interactions. The module follows the singleton pattern to ensure a single instance is created.

### Configuration

The FireboltInvoker class relies on environment variables for configuring the WebSocket connection. Make sure to set the following environment variables.

* deviceIp: Ip or Hostname of the WebSocket server.
* wsUrlProtocol: Protocol (e.g., 'ws' or 'wss').
* wsPort: Port number for the WebSocket connection.
* wsUrlPath: Path for the WebSocket connection.

### Supported functions

#### > get()

Initializes a WebSocket connection using the configured parameters.

Ex:

```
const instance = Fireboltinvoker.get();
```
Note: Response can vary depending on the configuration module being used.

#### > invoke(methodName, params)

Invokes a Firebolt method with the provided parameters.

Ex:

```
const response = Fireboltinvoker.invoke('methodName', { /* params */ });
```