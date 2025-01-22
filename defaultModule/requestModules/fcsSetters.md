# FCS Setters

This document provides a comprehensive list of the required and optional setter and getter APIs, along with their descriptions and usage examples. These APIs are essential for configuring and interacting with various FCS functionalities.
<br>**Note**: After clicking a link, you'll need to expand the corresponding function section manually by clicking on the dropdown arrow.

1. [Return Values](#return-values)
2. [Required Functions](#required-functions)
    * [launchApp](#launchApp)
    * [setAdditionalInfo](#setAdditionalInfo)
    * [setAudioDescriptions](#setAudioDescriptions)
    * [setClosedCaptions](#setClosedCaptions)
    * [setDeviceAudio](#setDeviceAudio)
    * [setDiscoveryPolicy](#setDiscoveryPolicy)
    * [setLanguage](#setLanguage)
    * [setLifecycleState](#setLifecycleState)
    * [setLimitAdTracking](#setLimitAdTracking)
    * [setLocale](#setLocale)
    * [setPreferredAudioLanguages](#setPreferredAudioLanguages)
    * [setVideoResolution](#setVideoResolution)
    * [setVoiceGuidance](#setVoiceGuidance)
    * [unloadApp](#unloadApp)    

3. [Optional Functions](#optional-functions)
    * [getNegotiatedHdcp](#getNegotiatedHdcp)
    * [setCountryCode](#setCountryCode)
    * [setDeviceHdcp](#setDeviceHdcp)
    * [setDeviceHdr](#setDeviceHdr)
    * [setDeviceNetwork](#setDeviceNetwork)


## Return Values

All fcsSetter functions must return one of 3 values. Any other value returned will throw an error. For all values, the message is optional.

**setterSuccess(message)** - Return this to indicate that the setter executed successfully.

**setterFailure(message)** - Return this to indicate that the setter did not execute successfully.

**setterNotImplemented(message)** - Return this to indicate that the setter is not yet implemented. *This will automatically be returned if FCS attempts to invoke a setter that does not exist*.

## Required Functions

<details id="launchApp">
<summary><b>fcsSetters.launchApp</b></summary>

Launch an application on the device under test (DUT).

```
function launchApp(value) {   
    let response = // Call your service to launch appId <value> on the device
    let success = // Perform validations to ensure the app was launched successfully

    if(success) {
        return setterSuccess(`Launched ${value} successfully!`);
    } else{
        return setterFailure(`Failed to launch app ${value}`);
    }
}
```

Param **value** will represent the appId to launch on the DUT.

**Example** 

```fcsSetters.launchApp("myAppId");``` 

</details>

<details id="setAdditionalInfo">
<summary><b>fcsSetters.setAdditionalInfo</b></summary>

Sets additional metadata or remove additional metadata for localization or configuration.

```
function setAdditionalInfo(attribute, value) {
    let response = // Call your service to update the additional info
    let success = // Perform validations to ensure additional was updated successfully

    if (success) {
        return setterSuccess(`Successfully set '${attribute}' with value '${value}'!`);
    } else {
        return setterFailure(`Failed to set '${attribute}' with value '${value}'`);
    }
}
```
There are 2 possible scenarios this function should handle:

**Add Additional Info**

In this scenario, the *attribute* will be addAddionalInfo to add the additional metadata for localization. 
The *value* will be an object containing key-value pairs representing the additional metadata to be added.

**Remove additional Info**

In this scenario, the *attribute* will be removeAddionalInfo to remove the additional metadata for localization. 
The *value* will be an object containing the key of the metadata to be removed.

**Examples** 

Add additional Info: ```fcsSetters.setAdditionalInfo("addAdditionalInfo", { key: "exampleKey", value: "exampleValue" });```

Remove additional Info: ```fcsSetters.setAdditionalInfo("removeAdditionalInfo", { key: "exampleKey" });```

</details>

<details id="setAudioDescriptions">
<summary><b>fcsSetters.setAudioDescriptions</b></summary>

Configures audio description settings.

```
function setAudioDescriptions(attribute, value) {
    let response = // Call your service to update the audio description settings
    let success = // Perform validations to ensure audio description was updated successfully

    if (success) {
        return setterSuccess(`Set Audio Description '${attribute}' to '${value}' successfully!`);
    } else {
        return setterFailure(`Failed to set Audio Description '${attribute}' to '${value}'`);
    }
}
```

This function handles the following scenario

**Enabling or Disabling AudioDescriptions**

In this scenario, the *attribute* will be null/undefined or simply "setEnabled". 
The *value* will be a string containing a boolean "true" or "false". *true* will enable audio description, and *false* will disable it.

**Example**

```fcsSetters.setAudioDescriptions("setEnabled", "true");```

</details>


<details id="setClosedCaptions">
<summary><b>fcsSetters.setClosedCaptions</b></summary>

Configures closed caption settings.

```
function setClosedCaptions(attribute,value) {
    let response = // Call your service to update the Closed Captions state for the device
    let success = // Perform validations to ensure closed caption was updated successfully

    if(success) {
        return setterSuccess(`Set Closed Captions '${attribute}' to '${value}' successfully!`);
    } else {
        return setterFailure(`Unable to set Closed Caption '${attribute}' to '${value}'`);
    }
}
```

There are 2 possible scenarios this function should handle:

**Enabling or Disabling Closed Captions**

In this scenario, the *attribute* will be null/undefined or simply "setEnable". 
The *value* will be a string containing a boolean "true" or "false". *true* will enable closed captioning, and *false* will disable it.

**Setting a Closed Captions attribute**

In this scenario, the *attribute* will contain an attribute for which to set a value and *value* will contain that value.

**Examples**

Enable Closed Captions: ```fcsSetters.setClosedCaptions("true")``` 

Set "FontFamily" to "Arial": ```fcsSetters.setClosedCaptions("FontFamily", "Arial")```

</details>


<details id="setDeviceAudio">
<summary><b>fcsSetters.setDeviceAudio</b></summary>

Configures audio settings for the device.

```
function setDeviceAudio(value) {
    let response = // Call your service to set device audio state
    let success = // Perform validations to ensure device audio was updated successfully

    if (success) {
        return setterSuccess(`Set Device Audio to '${value}' successfully!`);
    } else {
        return setterFailure(`Failed to set Device Audio to '${value}'`);
    }
}
```

Param **value** will represent the desired audio mode.

**Possible value**
  - stereo
  - dolbyDigital5.1
  - dolbyDigital5.1+
  - dolbyAtmos

**Example**

```fcsSetters.setDeviceAudio("stereo");```


</details>

<details id="setDiscoveryPolicy">
<summary><b>fcsSetters.setDiscoveryPolicy</b></summary>

Configures the discovery policy for the device.

```
function setDiscoveryPolicy(attribute, value) {
    let response = // Call your service to set discovery policy state
    let success = // Perform validations to ensure discovery policy was updated successfully

    if (success) {
        return setterSuccess(`Set '${attribute}' policy to '${value}' successfully!`);
    } else {
        return setterFailure(`Failed to set  '${attribute}' policy to '${value}'`);
    }
}
```

There are 2 possible scenarios this function should handle:


**Setting AllowPersonalization to true**

In this scenario, the *attribute* will be setAllowPersonalization. 
The *value* will be a string containing a boolean "true" or "false". *true* will allow Personalization and *false* will disable Personalization.

**Setting AllowWatchHistory to true**

In this scenario, the *attribute* will be setAllowWatchHistory. 
The *value* will be a string containing a boolean "true" or "false". *true* will enable/remember WatchHistory tracking and *false* will disable Watch history tracking.

**Examples**

Setting AllowPersonalization to true: ```fcsSetters.setDiscoveryPolicy("allowPesonalization","true")``` 

Setting AllowWatchHistory to true: ```fcsSetters.setDiscoveryPolicy("allowWatchHistory", "true")```

</details>

<details id="setLanguage">
<summary><b>fcsSetters.setLanguage</b></summary>

Sets the device's language.

```
function setLanguage(value) {
    let response = // Call your service to set the language 
    let success = // Perform validations to ensure language was updated successfully

    if (success) {
        return setterSuccess(`Set Language to '${value}' successfully!`);
    } else {
        return setterFailure(`Failed to set Language to '${value}'`);
    }
}
```

Param **value** will represent the desired language.

**Possible value**
  - en
  - es

**Example** 

```fcsSetters.setLanguage("en");```

</details>

<details id="setLifecycleState">
<summary><b>fcsSetters.setLifecycleState</b></summary>

Sets the lifecycle state of the application.

```
function setLifecycleState(value) {
    let response = // Call your service to set the lifecycle state
    let success = //Perform validations to ensure lifecycle state was updated successfully

    if (success) {
        return setterSuccess(`Set Lifecycle State to '${value}' successfully!`);
    } else {
        return setterFailure(`Failed to set Lifecycle State to '${value}'`);
    }
}

```

Param **value** will represent the desired lifecycle state.

**Possible value**
  - foreground
  - background
  - suspended
  - inactive
  - unloading

**Example**

```fcsSetters.setLifecycleState("background");``` 

</details>

<details id="setLimitAdTracking">
<summary><b>fcsSetters.setLimitAdTracking</b></summary>

Configures the limit ad tracking setting.

```
function setLimitAdTracking(attribute, value) {
    let response = // Call your service to set the limit ad tracking
    let success = // Perform validations to limit ad tracking was updated successfully

    if (success) {
        return setterSuccess(`Set '${attribute}' Tracking to '${value}' successfully!`);
    } else {
        return setterFailure(`Failed to set '${attribute}' Tracking to '${value}'`);
    }
}
```

There are 3 possible scenarios this function should handle:

**SetAllowPrimaryBrowseAdTargeting**

In this scenario, the *attribute* will be SetAllowPrimaryBrowseAdTargeting. 
The *value* will be a string containing a boolean "true" or "false". *true* will allow PrimaryBrowseAdTargeting and *false* will disable it.

**SetAllowAppContentAdTargeting**

In this scenario, the *attribute* will be SetAllowAppContentAdTargeting. 
The *value* will be a string containing a boolean "true" or "false". *true* will allow AppContentAdTargeting and *false* will disable it.

**SetAllowPrimaryContentAdTargeting**

In this scenario, the *attribute* will be SetAllowPrimaryContentAdTargeting. 
The *value* will be a string containing a boolean "true" or "false". *true* will allow PrimaryContentAdTargeting and *false* will disable it.**

**Examples**

Set AllowAppContentAdTargeting: ```fcsSetters.setLimitAdTracking("SetAllowAppContentAdTargeting","true")``` 

Set AllowPrimaryBrowseAdTargeting: ```fcsSetters.setLimitAdTracking("SetAllowPrimaryBrowseAdTargeting","true")``` 

Set AllowPrimaryContentAdTargeting: ```fcsSetters.setLimitAdTracking("SetAllowPrimaryContentAdTargeting","true")``` 

</details>

<details id="setLocale">
<summary><b>fcsSetters.setLocale</b></summary>

Sets the device's locale settings.

```
function setLocale(value) {
    let response = // Call your service to set the locale state
    let success = // Perform validations to ensure locale was updated successfully

    if (success) {
        return setterSuccess(`Set Locale to '${value}' successfully!`);
    } else {
        return setterFailure(`Failed to set Locale to '${value}'`);
    }
}
```

Param **value** represent the desired locale setting.

**Possible value**
  - en-US
  - es-US

**Example**

```fcsSetters.setLocale("en-US");``` 

</details>


<details id="setPreferredAudioLanguages">
<summary><b>fcsSetters.setPreferredAudioLanguages</b></summary>

Configures the preferred audio languages.

```
function setPreferredAudioLanguages(value) {
    let response = // Call your service to set the preferred audio languages
    let success = // Perform validations to ensure preferred audio language was updated successfully

    if (success) {
        return setterSuccess(`Set Preferred Audio Languages to '${value}' successfully!`);
    } else {
        return setterFailure(`Failed to set Preferred Audio Languages to '${value}'`);
    }
}
```

Param **value**  will be a list of preferred audio languages, represented as an array of language code.

**Possible value**
  - ["eng","spa"]
  - ["spa","eng"]

**Example**

```fcsSetters.setPreferredAudioLanguages("[\"eng\", \"spa\"]");```

</details>

<details id="setVideoResolution">
<summary><b>fcsSetters.setVideoResolution</b></summary>

Configures the video resolution.

```
function setVideoResolution(value) {
    let response = // Call your service to set the video resolution
    let success = // Perform validations to ensure video resolution was updated successfully

    if (success) {
        return setterSuccess(`Set Video Resolution to '${value}' successfully!`);
    } else {
        return setterFailure(`Failed to set Video Resolution to '${value}'`);
    }
}
```

Param **value** represent array of desired video resolution.

**Example**

```fcsSetters.setVideoResolution("[\"1920\", \"1080\"]");``` 

</details>

<details id="setVoiceGuidance">
<summary><b>fcsSetters.setVoiceGuidance</b></summary>

Configures voice guidance settings.

```
function setVoiceGuidance(attribute, value) {
    let response = // Call your service to update the Voice Guidance state for the device
    let success = // Perform validations to ensure the voice guidance was updated successfully

    if (success) {
        return setterSuccess(`Set Voice Guidance attribute '${attribute}' to '${value}' successfully!`);
    } else {
        return setterFailure(`Unable to set Voice Guidance attribute '${attribute}' to '${value}'`);
    }
}
```

This function handles the following scenario

**Enabling or Disabling Voice Guidance**

In this scenario, the *attribute* will be null/undefined or simply "enable". 
The *value* will be a string containing a boolean "true" or "false". "true" will enable closed captioning, and false will disable it.

**Example**

To enable Voice Guidance: ```fcsSetters.setVoiceGuidance("enable", "true");```

</details>

<details id="unloadApp">
<summary><b>fcsSetters.unloadApp</b></summary>

Unloads an application on the device under Test(DUT).

```
function unloadApp(value) {   
    let response = // Call your service to unloadlaunch appId <value> on the device
    let success = // Perform validations to ensure the app was unloaded successfully

    if(success) {
        return setterSuccess(`Unloaded ${value} successfully!`);
    } else{
        return setterFailure(`Failed to unload ${value} app`);
    }
}
```

Param **value** will contain the appId to unload on the DUT.

**Example** 

```fcsSetters.unloadApp("myAddId");``` 

</details>

## Optional Functions

<details id="getNegotiatedHdcp">
<summary><b>fcsSetters.getNegotiatedHdcp</b></summary>

Retrieves the current HDCP negotiation settings.

```
function getNegotiatedHdcp() {
    let response = // Call your service to retrieve the HDCP negotiation settings
    let success = // Validate that the retrieval was successful

    if (success) {
        return setterSuccess("Retrieved Negotiated Hdcp settings successfully!");
    } else {
        return setterFailure("Failed to retrieve Negotiated Hdcp settings");
    }
}

```

**No parameters** need to be passed, and the function simply retrieves the current HDCP negotiation settings.

**Example** 

```fcsSetters.getNegotiatedHdcp()``` 

</details>

<details id="setCountryCode">
<summary><b>fcsSetters.setCountryCode</b></summary>

Sets the country code for the device.

```
function setCountryCode(value) {
    let response = // Call your service to set the country code
    let success = // Perform validations to ensure country code was updtaedsuccessfully

    if (success) {
        return setterSuccess(`Set Country Code to '${value}' successfully!`);
    } else {
        return setterFailure(`Failed to set Country Code to '${value}'`);
    }
}
```

Param **value** will represent the country code.

**Possible value**
  - US
  - UK

**Example**

```fcsSetters.setCountryCode("US")``` 

</details>

<details id="setDeviceHdcp">
<summary><b>fcsSetters.setDeviceHdcp</b></summary>

Configures HDCP settings for the device.

```
function setDeviceHdcp(value) {
    let response = // Call your service to set the HDCP settings
    let success = // Perform validations to ensure HDCP settings was updated successfully

    if (success) {
        return setterSuccess(`Set Device HDCP to '${value}' successfully!`);
    } else {
        return setterFailure(`Failed to set Device HDCP to '${value}'`);
    }
}
```
Param **value** will be an object representing the HDCP settings.

**Possible value**
  - hdcp1.4
  - hdcp2.2

**Example**

```fcsSetters.setDeviceHdcp("{"hdcp2.2": true}")``` 

</details>

<details id="setDeviceHdr">
<summary><b>fcsSetters.setDeviceHdr</b></summary>

Configures HDR settings for the device.

```
function setDeviceHdr(value) {
    let response = // Call your service to set the HDR settings with the provided object
    let success = // Perform validations to ensure device HDR was updated successfully

    if (success) {
        return setterSuccess(`Set Device HDR to '${JSON.stringify(value)}' successfully!`);
    } else {
        return setterFailure(`Failed to set Device HDR to '${JSON.stringify(value)}'`);
    }
}
```

Param **value** will be an object representing the HDR settings.

**Possible value**
  - hdr10
  - hdr10Plus
  - dolbyVision
  - hlg

**Example**

```fcsSetters.setDeviceHdr("{"dolbyVision": true}")``` 

</details>

<details id="setDeviceNetwork">
<summary><b>fcsSetters.setDeviceNetwork</b></summary>

Configures the network settings for the device.

```
function setDeviceNetwork(value) {
    let response = // Call your service to set the network settings with the provided object
    let success = // Perform validations to ensure device network was updated successfully

    if (success) {
        return setterSuccess(`Set Device Network to '${JSON.stringify(value)}' successfully!`);
    } else {
        return setterFailure(`Failed to set Device Network to '${JSON.stringify(value)}'`);
    }
}
```

Param **value** will be an object represent the network settings.

**Possible value**
  - wifi
  - ethernet
  - hybrid

**Example**

```fcsSetters.setDeviceNetwork("{"state": "connected", "type": "wifi"}")``` 

</details>



