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
## screenshot:

### Request override
- The `screenshot` request override is used to take a screenshot of the current screen of the platform. This function has to be added in config module `requestModules/fcs.js` file.

#### Request format for screenshot request override function:

```javascript
{
  method: 'fcs.screenshot',
  params: {
    validations: []
  }
}
```

**Examples:**

**Example 1:** Passing validation objects to request override to validate the image with label `auth` with confidence 60 against the screenshot response.

```javascript
{
  method: 'fcs.screenshot',
  params: {
    validations: [
      {
        "type": "image",
        "label": "auth",
        "confidence": 60
      }
    ]
  }
}
```

### Response override

- The `screenshot` response override is used to validate the screenshot response against the validation object passed in the request override function. This function is added in the config module `responseModules/fcs.js` file.

#### Return response format of screenshot response override function:
- In the response below, `status` is the key that indicates the overall status of the screenshot validation. `validations` is an array of objects that holds the status of each validation object.
- `status` is the required field to determine the status of the validation.

```javascript
{
  status: "pass/fail",
  validations: [
    {status: "pass/fail"},
  ]
}
```

**Examples:** Response override function returning the response as below after validating the screenshot response against the validation object passed in the request override function.

**Example 1:** Below represents validation of the screenhot response against the validation object is passed.

```javascript
{
  status: "pass",
  validations: [
    {status: "pass"}
  ]
}
```

**Example 2:** Screenshot validation failed against the validation object passed.

```javascript
{
  status: "fail",
  validations: [
    {status: "fail"}
  ]
}
```