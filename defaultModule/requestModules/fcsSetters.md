# FCS Setters

This document provides a comprehensive list of the required and optional setter and getter APIs, along with their descriptions and usage examples. These APIs are essential for configuring and interacting with various FCS functionalities.

1. [Return Values](#return-values)
2. [Required Functions](#required-functions)
    * [launchApp](#launchApp)
    * [setAdditionalInfo](#setAdditionalInfo)
    * [setAudioDescriptionSettings](#setAudioDescriptionSettings)
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

To launches an application.

```
function launchApp(value) {
    if(response){
        return setterSuccess("launched App successfully!");
    }else{
        return setterFailure("Failed to launch app");
    }
}
```

When **setting an attribute** of launchApp, the *value* will be passed as a param.

Ex: ```fcsSetters.launchApp("AppName");``` 

</details>

<details id="setAdditionalInfo">
<summary><b>fcsSetters.setAdditionalInfo</b></summary>

Sets additional metadata for localization or configuration.

```
function setAdditionalInfo(value) {
    if(response){
        return setterSuccess("AdditionalInfo for Localization set successfully!");
    }else{
        return setterFailure("Failed to set AdditionalInfo for Localization");
    }
}
```

When **setting an attribute** of AdditionalInfo, the *value* will be passed as a param.

Ex: ```fcsSetters.setAdditionalInfo("{ key: 'exampleKey', value: 'exampleValue' }");```

</details>

<details id="setAudioDescriptionSettings">
<summary><b>fcsSetters.setAudioDescriptionSettings</b></summary>

Configures audio description settings.

```
function setAudioDescriptionSettings(attribute,value) {
    if(response){
        return setterSuccess("AudioDescription Settings set successfully!");
    }else{
        return setterFailure("Failed to set AudioDescription Settings.");
    }
}
```

When **setting an attribute** of AudioDescriptionSettings, the *attribute* will be passed as the first parameter, and the *value* as the second.

Ex: ```fcsSetters.setAudioDescriptionSettings("setEnabled", "true");```

</details>


<details id="setClosedCaptions">
<summary><b>fcsSetters.setClosedCaptions</b></summary>

Adjusts closed caption settings.

```
function setClosedCaptions(attribute,value) {
    if(response){
        return setterSuccess("Closed captions set successfully!");
    }else{
        return setterFailure("Failed to set closed captions.");
    }
}
```

When **setting an attribute** of closed captions, the *attribute* will be passed as the first parameter, and the *value* as the second.

Ex: ```fcsSetters.setClosedCaptions("FontFamily", "Arial")``` 

</details>

<details id="setDeviceAudio">
<summary><b>fcsSetters.setDeviceAudio</b></summary>

Configures device audio settings.

```
function setDeviceAudio(value) {
    if(response){
        return setterSuccess("DeviceAudio set successfully!");
    }else{
        return setterFailure("Failed to set DeviceAudio.");
    }
}
```

When **setting an attribute** of setDeviceAudio, the *value* will be passed as a param.

Ex: ```fcsSetters.setDeviceAudio("Stereo");```

</details>

<details id="setDiscoveryPolicy">
<summary><b>fcsSetters.setDiscoveryPolicy</b></summary>

Configures the discovery policy for the device.

```
function setDiscoveryPolicy(value) {
    if(response){
        return setterSuccess("DiscoveryPolicy set successfully!");
    }else{
        return setterFailure("Failed to set DiscoveryPolicy");
    }
}
```

When **setting an attribute** of DiscoveryPolicy, the *value* will be passed as a param.

Ex: ```fcsSetters.setDiscoveryPolicy("Allow");```

</details>

<details id="setLanguage">
<summary><b>fcsSetters.setLanguage</b></summary>

Sets the device's language.

```
function setLanguage(value) {
    if(response){
        return setterSuccess("Language set successfully!");
    }else{
        return setterFailure("Failed to set language");
    }
}
```

When **setting an attribute** of Language, the *value* will be passed as a param.

Ex: ```fcsSetters.setLanguage("en-US");```

</details>

<details id="setLifecycleState">
<summary><b>fcsSetters.setLifecycleState</b></summary>

Sets the lifecycle state of the application.

```
function setLifecycleState(value) {
    if(response){
        return setterSuccess("LifecycleState set successfully!");
    }else{
        return setterFailure("Failed to set LifecycleState");
    }
}
```

When **setting an attribute** of LifecycleState, the *value* will be passed as a param.

Ex: ```fcsSetters.setLifecycleState("background");``` 

</details>

<details id="setLimitAdTracking">
<summary><b>fcsSetters.setLimitAdTracking</b></summary>

Configures the limit ad tracking setting.

```
function setLimitAdTracking(value) {
    if(response){
        return setterSuccess("LimitAdTracking set successfully!");
    }else{
        return setterFailure("Failed to set LimitAdTracking.");
    }
}
```

When **setting an attribute** of LimitAdTracking, the *value* will be passed as a param.

Ex: ```fcsSetters.setLimitAdTracking("true");``` 

</details>

<details id="setLocale">
<summary><b>fcsSetters.setLocale</b></summary>

Sets the device's locale settings.

```
function setLocale(value) {
    if(response){
        return setterSuccess("Locale set successfully!");
    }else{
        return setterFailure("Failed to set Locale");
    }
}
```

When **setting an attribute** of Locale, the *value* will be passed as a param.

Ex: ```fcsSetters.setLocale("en-US");``` seeks to set the Locale to "true"

</details>


<details id="setPreferredAudioLanguages">
<summary><b>fcsSetters.setPreferredAudioLanguagese</b></summary>

Configures the preferred audio languages.

```
function setPreferredAudioLanguages(value) {
    if(response){
        return setterSuccess("PreferredAudioLanguages set successfully!");
    }else{
        return setterFailure("Failed to set PreferredAudioLanguages");
    }
}
```

When **setting an attribute** of PreferredAudioLanguages, the *value* will be passed as a param.

Ex: ```fcsSetters.setPreferredAudioLanguages("[\"en-US\", \"es-ES\"]");```

</details>

<details id="setVideoResolution">
<summary><b>fcsSetters.setVideoResolution</b></summary>

Configures the video resolution.

```
function setVideoResolution(value) {
    if(response){
        return setterSuccess("VideoResolution set successfully!");
    }else{
        return setterFailure("Failed to set VideoResolution.");
    }
}
```

When **setting an attribute** of LimitAdTracking, the *value* will be passed as a param.

Ex: ```fcsSetters.setVideoResolution("1080p");``` 

</details>

<details id="setVoiceGuidance">
<summary><b>fcsSetters.setVoiceGuidance</b></summary>

Configures voice guidance settings.

```
function setVoiceGuidance(attribute,value) {
    if(response){
        return setterSuccess("VoiceGuidance set successfully!");
    }else{
        return setterFailure("Failed to set VoiceGuidance.");
    }
}
```

When **setting an attribute** of VoiceGuidance, the *attribute* will be passed as the first parameter, and the *value* as the second.

Ex: ```fcsSetters.setVoiceGuidance("setEnabled", "true");``` 
</details>


<details id="unloadApp">
<summary><b>fcsSetters.unloadApp</b></summary>

Unloads an application.

```
function unloadApp(value) {
    if(response){
        return setterSuccess("Unloaded app successfully!");
    }else{
        return setterFailure("Failed to unload an app");
    }
}
```

When **setting an attribute** of unloadApp, the *value* will be passed as a param.

Ex: ```csSetters.unloadApp("AppName");``` 

</details>

## Optional Functions

<details id="getNegotiatedHdcp">
<summary><b>fcsSetters.getNegotiatedHdcp</b></summary>

Retrieves the current HDCP negotiation settings.

```
function getNegotiatedHdcp() {
    if(response){
        return setterSuccess("Getter NegotiatedHdcp successfully!");
    }else{
        return setterFailure("Failed to get NegotiatedHdcp");
    }
}
```

When **getting** the NegotiatedHdcp, no parm need to be passed.

Ex: ```fcsSetters.getNegotiatedHdcp()``` 

</details>

<details id="setCountryCode">
<summary><b>fcsSetters.setCountryCode</b></summary>

Sets the country code for the device.

```
function setCountryCode(value) {
    if(response){
        return setterSuccess("CountryCode set successfully!");
    }else{
        return setterFailure("Failed to set CountryCode");
    }
}
```

When **setting an attribute** of CountryCode, the *value* will be passed as a param.

Ex: ```fcsSetters.setCountryCode("08052")``` 

</details>

<details id="setDeviceHdcp">
<summary><b>fcsSetters.setDeviceHdcp</b></summary>

Configures HDCP settings for the device.

```
function setDeviceHdcp(value) {
    if(response){
        return setterSuccess("DeviceHdr set successfully!");
    }else{
        return setterFailure("Failed to set DeviceHdcp");
    }
}
```

When **setting an attribute** of DeviceHdcp, the *value* will be passed as a param.

Ex: ```fcsSetters.setDeviceHdcp("{"hdcp2.2": true}")``` 

</details>

<details id="setDeviceHdr">
<summary><b>fcsSetters.setDeviceHdr</b></summary>

Configures HDR settings for the device.

```
function setDeviceHdr(value) {
    if(response){
        return setterSuccess("DeviceHdr set successfully!");
    }else{
        return setterFailure("Failed to set DeviceHdr");
    }
}
```

When **setting an attribute** of DeviceHdr, the *value* will be passed as a param.

Ex: ```fcsSetters.setDeviceHdr("{"dolbyVision": true}")``` 

</details>

<details id="setDeviceNetwork">
<summary><b>fcsSetters.setDeviceNetwork</b></summary>

Configures the network settings for the device.

```
function setDeviceNetwork(value) {
    if(response){
        return setterSuccess("DeviceNetwork set successfully!");
    }else{
        return setterFailure("Failed to set DeviceNetwork");
    }
}
```

When **setting an attribute** of DeviceNetwork, the *value* will be passed as a param.

Ex: ```fcsSetters.setDeviceNetwork("Wifi")``` 

</details>



