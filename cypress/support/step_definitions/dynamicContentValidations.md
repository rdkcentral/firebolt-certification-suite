# Dynamic Content Validation

### Background:
While executing the validations step in fcs tests, there are mainly seven modes of validation, which are mentioned in [Supported Validations](../../fixtures/docs/validations.md#supported-validations). Out of these seven, deviceContentValidation is used when the validation is to be done based on device specific value of the device which we are currently testing on.
While executing the test, the validation key will be fetched from the cypress/fixtures/fireboltCalls/ folder based on the current executing module. For example, if the "expected device id" is the validation key used in the validation step, it will be placed in the device.json file inside the fireboltCalls folder as:

```
    "EXPECTED_DEVICE_ID": {
        "method": "device.id",
        "validationJsonPath": "result",
        "content": 
        
    }
```
Later, the content specified in this object is searched inside the cypress/fixtures/objects/validationObjects/ folder, and it is expected to be in the following format:

```
    
    : {
        "data": [
            {
                "type": "fixture",
                "validations": [
                    {
                        "mode": "deviceContentValidation",
                        "type": "DEVICEID",
                        "description": "Validation of the Device Id Format"
                    }
                ]
            }
        ]
    },
```

In the validationObject, when the validation mode is "deviceContentValidation", the source of truth for the validation can be one of the following two ways:
1. Static data 
2. Dynamic data

Static data :
For static data, the source of truth is stored in a <deviceMac.json> file placed inside configModule's cypress/fixtures/devices/ folder, based on the deviceMac value of the device currently being tested. When the test begins, these values are loaded into an object and stored in an environment variable called "deviceData". If deviceMac.json is not found in the specified path, the values are saved as they are, for example: DEVICEID as "DEVICEID".

Dynamic data :
For dynamic data, the source of truth is fetched from the configModule's override function called "fetchDeviceDetails" explained in [Request overrides](https://github.com/rdkcentral/firebolt-certification-suite?tab=readme-ov-file#request-overrides).

### Dynamic data usage :

To fetch dynamic data from configModule, we have to set an environment variable called "fetch_device_details_dynamically" as true in the config.json file inside configModule's (constants/) folder. If this environment variable is true, dynamic device details will be fetched from configModule's override function called "fetchDeviceDetails". Later, the static data saved in "deviceData" environment variable will be  overriden with the dynamic data fetched from the override fucntion. If the dynamic device details fetching fails in configModule, the data will default to the static data.
FCS expects the source of truth to be generated for the modules listed in constant "DYNAMIC_DEVICE_DETAILS_MODULES" inside [constants.js file](../constants/constants.js). 


### Dynamic data implementation :

The configModule should have an override function "fetchDeviceDetails" as explained [here](https://github.com/rdkcentral/firebolt-certification-suite?tab=readme-ov-file#request-overrides). So, if the "fetch_device_details_dynamically" is set to true and "fetchDeviceDetails" override function is implemented in configModule, when the test executes the step "Given the environment has been set up for '<testType>' tests", the "fetchDeviceDetails" override function is called if the "testType" is present in "DYNAMIC_DEVICE_DETAILS_MODULES" constant. 

In the override function "fetchDeviceDetails" the logic to fetch dynamic data is added as per platform's requirement using corresponding urls. Once dynamic data is fetched inside configModule, it is then saved into the "deviceData" environment variable, where the existing static data is overriden with the dynamic data. For eg:, from override function if we gets the values for deviceId, deviceType and distributor, we have to override the "deviceData" environment variable with these values as :

#### Format

```
    let deviceData = Cypress.env(CONSTANTS.DEVICE_DATA) #saves the env variable to "deviceData"

    deviceData.DEVICEID = deviceId;
    deviceData.DEVICE_TYPE = deviceType;
    deviceData.DEVICE_DISTRIBUTOR = distributor;

    Cypress.env(CONSTANTS.DEVICE_DATA, deviceData); #updated the env variable with dynamic data

```

### Example :
From FCS, the override function is invoked in the following format:
Format:
  ```
   {
    "method": "fetchDeviceDetails",
    "params": <deviceId>
  }

The response by overriding the static values in the environment will be as follows:
Example:

```
  {
    "DEVICEID": "12345",
    "DEVICE_TYPE": "xxxxxx",
    "DEVICE_DISTRIBUTOR": "xxxxxx",
     ...
}

```

Here, "deviceId" is the only parameter we are passing from fcs while invoking override function, as this value might be used to extract the required data, if dynamic response contains more than one value. 
