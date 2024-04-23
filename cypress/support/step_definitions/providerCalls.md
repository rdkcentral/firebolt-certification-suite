# ProviderCallsGlue

## Framework registers '(.+)' test provider

### Purpose: Informs the platform to use the test provider for simulating user inputs.

### Params:
| Param | Definition |
| --- | --- |
| provider | Provider name that needs to register for. |

### Examples:
* `Framework registers 'pinChallenge' test provider`

## User '(.+)' recording lifecycle history for '(.+)'

### Purpose: Sending a message to the platform/app to start/stop recording lifecycle histories.

### Params:
| Param | Definition |
| --- | --- |
| recordTaskType | A record type that contains either start or stop. |
| appCallSign | appCallSign to determine on which app to start/stop recording |

### Note: 

For first party app the response is as per the templete defined below. If the response received from the platform is in a different format, it needs to be corrected in the respective configModule response override file.

#### Lifecycle History Response Template
```{
    "appId": "your-generic-appid",
    "history": [
        {
            "event": {
                "previous": "foreground",
                "state": "background"
            },
            "timestamp": 1682067435630
        },
        {
            "event": {
                "previous": "background",
                "state": "foreground"
            },
            "timestamp": 1682067438820
        }
    ]
}  
```
#### Steps
 - Create a response override function inside the configuration module based on the method and module name.
 - If the response format is different, override the response as per the template above.
 - No need to add a response override function when the response is in the expected format.

### Examples:
* `And User 'starts' recording lifecycle history for '1st party app'`
* `And User 'starts' recording lifecycle history for '3rd party app'`
* `And User 'starts' recording lifecycle history for 'test.test.test'`

## User set response for '(.+)'

### Purpose: Making a call to set the value in 1st party app or 3rd party app.

### Params:
| Param | Definition |
| --- | --- |
| setResponseKey | key name of the object. |

### Note: setResponseKey value is an object and it can contains data as below
| Field | Definition |
| --- | --- |
| fireboltCall/fireboltMock | FireboltCall as a key will be used to make firebolt calls to the 1st party app or 3rd party app. FireboltMock as a key will be used to override the default response or set the responses. Data of fireboltMock / fireboltCall keys should be added in config module `testData/fireboltMocks/FeatureFileName.json` or FCS `fixtures/fireboltCalls/FeatureFileName.json` |
| firstParty | Ensure that the value is set to true when sending messages to the 1st party app, otherwise, it should be set to false for third party app |
| tags | Based on the tags specified here and the cli , corresponding configModule would perform necessary action steps. `tags` is optional field. |

### Examples:
* `And User set response for 'set closedcaptions as true'`