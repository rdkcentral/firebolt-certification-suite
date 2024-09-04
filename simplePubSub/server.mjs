import WebSocket, { WebSocketServer } from 'ws';
let serverSingleton;
let listeners = {};
function startServer(port) {
  port = port ? port : 8080;
  serverSingleton = new WebSocketServer({
    port: port,
  });
  serverSingleton.on('listening', () => {
    console.log('Server is listening on ' + JSON.stringify(serverSingleton.address()));
  });
  serverSingleton.on('connection', (ws, request) => {
    console.log('Connection established!');
    // Set up message handler
    ws.on('message', (data) => {
      let dataObject;
      try {
        dataObject = JSON.parse(data);
        console.log("Incoming: " + JSON.stringify(dataObject));
      } catch (err) {
        ws.send(JSON.stringify({ error: 'Invalid JSON Payload' }));
        return;
      }
      // No Operation?
      if (dataObject.operation == null || dataObject.operation == undefined) {
        ws.send(
          JSON.stringify({ error: `"operation" key must be set to "pub", "sub", or "unsub"` }),
        );
        return;
      }
      // No Topic?
      if (dataObject.topic == null || dataObject.topic == undefined) {
        ws.send(JSON.stringify({ error: `"topic" key must be set to topic to pub/sub/unsub to` }));
        return;
      }
      let operation = dataObject.operation;
      let topic = dataObject.topic;
      let payload = dataObject.payload;
      // Remove stale connections here
      if (Object.keys(listeners).length > 0) {
        for (let staleTopic in listeners) {
          listeners[staleTopic] = listeners[staleTopic].filter((websocket) => websocket._readyState == 1);
        }
      }
      if (operation == 'pub') {
        if (payload == null || payload == undefined) {
          return;
        }
        if (
          listeners[topic] == null ||
          listeners[topic] == undefined ||
          listeners[topic].length == 0
        ) {
          return;
        }
        listeners[topic].forEach((x) => {
          try {
            x.send(JSON.stringify({ payload, topic, operation }));
          } catch (err) {
            console.error(err);
          }
        });
        return;
      } else if (operation == 'sub') {
        if (listeners[topic] == null || listeners[topic] == undefined) {
          listeners[topic] = [];
        }
        listeners[topic].push(ws);
        return;
      } else if (operation == 'unsub') {
        try {
          listeners[topic] = listeners[topic].filter((websocket) => websocket != ws);
          ws.send(
            JSON.stringify({
              response: `Unsubscribed from topic "${topic}" successfully`,
              topic,
            }),
          );
        } catch (err) {
          ws.send(
            JSON.stringify({
              error: `An error occurred while unsubscribing: ${err}`,
              topic,
            }),
          );
        }
        return;
      } else {
        ws.send(
          JSON.stringify({
            error: `"operation" key must be set to "pub", "sub", or "unsub"`,
          }),
        );
        return;
      }
    });
  });
}
export { startServer };