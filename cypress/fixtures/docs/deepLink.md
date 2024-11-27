# Deeplink

Deeplink is a feature that allows us to navigate to a specific page within the application after the application is loaded.

## Setup

Ensure that the below configurations are done before using the deeplink feature.

- **[App metadata](#app-metadata)**
- **[Intent Template](#intent-template)**

### App metadata

App metadata is a JSON object that contains the information such as the entityId, seriesId etc related to the application.

- This metadata present in either FCS or in the config module under `fixtures/objects/appData/`.
- The metadata is present in `app_metadata.json` file or `<appId>.josn` file. Inside appData folder only one `app_metadata.json` should be present and `<appId>.json` files.
- The metadata is present in the `<appId>.json` file is having the presidence over the `app_metadata.json` file and also the metadata present in the config module is having priority over fcs metadata.

**Note:** While adding the metadata make sure that the intent name is same as the intent name present in the intent template and the same intent name will be used in the test case.

#### Sample App metadata

**app_metadata.json** In case of `app_metadata.json` file make sure to add the intent details under the specific appId.

```json
{
  "<appId>": {
    "<intent>": {
      "entityId": "<entityId>",
      "validationText": "<validationText>"
    }
  }
}
```

**app1.json** In case of `<appId>.json` file we can directly add the intent details based on the intent.

```json
{
  "<intent>": {
    "entityId": "<entityId>",
    "validationText": "<validationText>"
  }
}
```

### Intent Template

The intent template having the different kind of intent templates that are used while launching the application. Such as `movie`, `show`, `episode` intent etc.

- The intent template is present in the `fixtures/intentTemplates.js` file.
- This file present only in the FCS and this intent template not having the actual details like entityId, seriesId, appId etc.
- This template get the actual data from the app metadata file that's been added from the FCS or from the config module.
- To get the actual data from the app metadata file we need to use the [resolveAtRuntime](./dynamicObjects.md#runtime-variables) function by passing the appropriate arguments.

**Example:** Below are the examples showing how the intent templates get the actual data from the app metadata file.

**Example 1:** Below is the example of the intent template for the movie intent. Movie intent is required the values like appId and entityId to launch the movie on the specified application.

#### intentTemplates.js

```javascript
const movie = {
  appId: resolveAtRuntime('appId'),
  intent: {
    action: 'playback',
    data: { programType: 'movie', entityId: resolveAtRuntime('intent->entityId') },
    context: { source: 'voice' },
  },
};
```

#### app_metadata.json

```json
{
  "testApp": {
    "movie": {
      "entityId": "entityId",
      "validationText": "test"
    }
  }
}
```

#### Final intent template

```javascript
const movie = {
  appId: 'testApp',
  intent: {
    action: 'playback',
    data: { programType: 'movie', entityId: 'entityId' },
    context: { source: 'voice' },
  },
};
```

- In the above example, the `resolveAtRuntime('appId')` and `resolveAtRuntime('intent->entityId')` will get the actual appId and entityId from the app metadata file.
- In case of `resolveAtRuntime('intent->entityId')` the `intent` is the name of the object present in [runtime](./dynamicObjects.md#runtime-variables) environment variable. So, the `resolveAtRuntime` will look for the `entityId` inside the `intent` object.

**Example 2:** Below is the example of the intent template for the series intent. Series intent is required the values like appId, entityId, seriesId and seasonId to launch the series on the specified application.

#### intentTemplates.js

```javascript
const Series = {
  appId: resolveAtRuntime('appId'),
  intent: {
    action: 'playback',
    data: {
      entityType: 'program',
      programType: 'episode',
      entityId: resolveAtRuntime('intent->entityId'),
      seriesId: resolveAtRuntime('intent->seriesId'),
      seasonId: resolveAtRuntime('intent->seasonId'),
    },
    context: { source: 'voice' },
  },
};
```

#### app_metadata.json

```json
{
  "testApp": {
    "Series": {
      "entityId": "entityId",
      "seriesId": "seriesId",
      "seasonId": "seasonId",
      "validationText": "test"
    }
  }
}
```

#### Final intent template

```javascript
const movie = {
  appId: 'testApp',
  intent: {
    action: 'playback',
    data: {
      entityType: 'program',
      programType: 'episode',
      entityId: 'entityId',
      seriesId: 'seriesId',
      seasonId: 'seasonId',
    },
    context: { source: 'voice' },
  },
};
```

- In the above example, the `resolveAtRuntime('appId')`, `resolveAtRuntime('intent->entityId')`, `resolveAtRuntime('intent->seriesId')` and `resolveAtRuntime('intent->seasonId')` will get the actual appId, entityId, seriesId and seasonId from the app metadata file.

### Pre-requisites

- Ensure that the intent details are added in the app metadata file.
- Ensure intent name added in the app metadata file is same as the intent name present in the intent template.

### Usage

**Example 1:** Launching the testApp with movie intent. `movie` intent should be present in `intentTemplates.js` file and the intent details should be present in the app metadata file for the same intent name.

**Test case:**
In the below test case we are launching the `testApp` with `movie` intent.
```javascript
Scenario: Validate the launch of <appName> app with 'testApp' appId
  Given the environment has been set up for 'app launch' tests
  And 3rd party 'firebolt' app is launched with 'testApp' appId with 'movie' intent
  And Test runner waits for 45 'seconds'
  Then 'third party app is launched' on 'playback' page
```

**app_metadata.json**
```json
{
  "testApp": {
    "movie": {
      "entityId": "entityId",
      "validationText": "test"
    }
  }
}
```

**intentTemplates.js**
```javascript
const movie = {
  appId: resolveAtRuntime('appId'),
  intent: {
    action: 'playback',
    data: { programType: 'movie', entityId: resolveAtRuntime('intent->entityId') },
    context: { source: 'voice' },
  },
};
```