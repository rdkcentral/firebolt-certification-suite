# Request overrides

## fetchPerformanceThreshold:

- Request:<br>
  Makes an HTTP request to graphite with deviceMac, processType with how much percentile, and from what time to fetch the metrics.<br>
  Format:
  ```
   {
     method: 'performance.fetchPerformanceThreshold',
     params: {'type': '<(device|process|all)>', process: '<(memory|load|set size|required)>', percentile: 70, threshold: '<Threshold to use as source of truth>'}
   }
  ```
  Examples:
  ```
   {
     method: 'performance.fetchPerformanceThreshold',
     params: {'type': 'device', process: 'memory', percentile: 70, threshold: '35000000'}
   }
   {
     method: 'performance.fetchPerformanceThreshold',
     params: {'type': 'process', process: 'set size', percentile: 70, threshold: '75000000'}
   }
   {
     method: 'performance.fetchPerformanceThreshold',
     params: {'type': 'all', process: 'required', percentile: 70, threshold: '75000000'}
   }
  ```
- Response:<br>
  Receives an array of objects, which contains success and message properties, success defines the execution is a success or failure and message defines either response or any custom message that descibes the pass/fail.
  Example:
  ```
   [
      {
        "success": true,
        "message": "Expected received threshold for set sizeRSS is 37748736 to be less than the expected threshold of 1073741824"
      },
      {
        "success": true,
        "message": "Expected received threshold for set sizePSS is 41964544 to be less than the expected threshold of 1073741824"
      }
   ]
  ```

## createMarker:

- Request:<br>
  Making an HTTP call to grafana to create a marker on dashboard with given description.<br>
  Format:
  ```
   {
     method: 'performance.createMarker',
     params: <Scenario name>
   }
  ```
  Examples:
  ```
   {
     method: 'performance.createMarker',
     params: 'Account.id - Positive Scenario: Validate account ID'
   }
  ```
- Response:<br>
  Recieves an object with success and message properties.
  Example:
  ```
  {
    "success": true,
    "message": "Marker has been created successfully"
  }
  {
    "success": false,
    "message": `Unable to create marker, failed with status code- 200 and error- unable to find the dashboard`
  }
  ```

## setTestProvider: 

- Request:<br>
  Making a call which sends necessary message to the platform to use a test provider for simulating user inputs.<br>
  Format:
  ```
   {
     method: 'fcs.setTestProvider',
     params: <provider name>
   }
  ```
  Examples:
  ```
   {
     method: 'fcs.setTestProvider',
     params: 'pinChallenge'
   }
   ```
- Response:<br>
  Receives an object with intent message.
  Example:
  ```
  {
  "action": "search",
  "context": {
    "source": "device"
  },
  "data": {
    "query": "{\"task\":\"registerProviderHandler\",\"params\":{\"provider\":\"pinChallenge\"},\"action\":\"CORE\",\"context\":{\"communicationMode\":\"SDK\"},\"asynchronous\":false}"
    }
  }
  ```

## recordLifecycleHistory:

- Request:<br>
  Making a call to the platform to start/stop the lifecycle history recording.<br>
  Format:
  ```
   {
    "method": "fcs.recordLifecycleHistory",
    "params": {
      "task": "<task name>",
      "appId": "<app ID>"
    }
  }

  ```
  Examples:
  ```
   {
    "method": "fcs.recordLifecycleHistory",
    "params": {
      "task": "start",
      "appId": "test"
    }
  }
   ```
- Response:<br>
  Receives an object with intent message and transport type.
  Example:
  ```
  "transport": "<transportMode>",
  "payload": {
  "action": "search",
  "context": {
    "source": "device"
  },
  "data": {
    "query": "{\"task\":\"start\",\"params\":{\"provider\":\"pinChallenge\"},\"action\":\"CORE\",\"context\":{\"communicationMode\":\"SDK\"},\"asynchronous\":false}"
    }
  }
  ```

## fetchDeviceDetails:

- Request:<br>
  Making a call to fetch device details and the token required for dynamically fetching details .<br>

  Format:
  ```
   {
    "method": "fcs.fetchDeviceDetails",
    "params": <deviceId>
  }

  ```
  Examples:
  ```
   {

    "method": "fcs.fetchDeviceDetails",
    "params": "354444327"
  }
   ```
- Response:<br>
  Receives the updated environment variable device_data with dynamic device details.
Example:

  ```
  {
    "DEVICEID": "354444327",
    "DEVICE_TYPE": "ipstb",
    "DEVICE_MODEL": "VALUE",
     ...
}
  ```
