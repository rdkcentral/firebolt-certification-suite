# FCS Setters

This will explain what should be going into the "fcsSetters.js" file as well as provide examples and an explanation for each setter.

1. [Return Values](#return-values)
2. [Required Functions](#required-functions)
    * [setClosedCaptions](#setClosedCaptions)
    * [setAudioDescriptionSettings](#setAudioDescriptionSettings)
    * [setVoiceGuidance](#setVoiceGuidance)
    * [setLimitAdTracking](#setLimitAdTracking)
    * [setVideoResolution](#setVideoResolution)
    * [setDeviceAudio](#setDeviceAudio)
    * [launchApp](#launchApp)
    * [setDiscoveryPolicy](#setDiscoveryPolicy)
    * [setLifecycleState](#setLifecycleState)
    * [unloadApp](#unloadApp)
    * [setLanguage](#setLanguage)
    * [setPreferredAudioLanguages](#setPreferredAudioLanguages)
    * [setLocale](#setLocale)
    * [setAdditionalInfo](#setAdditionalInfo)
    * [setDeviceHdr](#setDeviceHdr)
    * [setDeviceHdcp](#setDeviceHdcp)
    * [setDeviceNetwork](#setDeviceNetwork)
    * [setCountryCode](#setCountryCode)

3. [Optional Functions](#optional-functions)


## Return Values

All fcsSetter functions must return one of 3 values. Any other value returned will throw an error. For all values, the message is optional.

**setterSuccess(message)** - Return this to indicate that the setter executed successfully.

**setterFailure(message)** - Return this to indicate that the setter did not execute successfully.

**setterNotImplemented(message)** - Return this to indicate that the setter is not yet implemented. *This will automatically be returned if FCS attempts to invoke a setter that does not exist*.

## Required Functions

<details id="setClosedCaptions">
<summary><b>fcsSetters.setClosedCaptions</b></summary>

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

Ex: ```fcsSetters.setClosedCaptions("FontFamily", "Arial")``` seeks to set the Closed Captions "Font Family" to "Arial"
</details>


<details id="setAudioDescriptionSettings">
<summary><b>fcsSetters.setAudioDescriptionSettings</b></summary>

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

Ex: ```fcsSetters.setAudioDescriptionSettings("setEnabled", "true")``` seeks to set the AudioDescriptionSettings "Enabled" to "true"

</details>

<details id="setVoiceGuidance">
<summary><b>fcsSetters.setVoiceGuidance</b></summary>

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

Ex: ```fcsSetters.setVoiceGuidance("setEnabled", "true")``` seeks to set the VoiceGuidance "Enabled" to "true"

</details>

<details id="setLimitAdTracking">
<summary><b>fcsSetters.setLimitAdTracking</b></summary>

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

Ex: ```fcsSetters.setLimitAdTracking("true")``` seeks to set the LimitAdTracking to "true"

</details>

<details id="setVideoResolution">
<summary><b>fcsSetters.setVideoResolution</b></summary>

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

Ex: ```fcsSetters.setVideoResolution("true")``` seeks to set the VideoResolution to "true"

</details>

<details id="setDeviceAudio">
<summary><b>fcsSetters.setDeviceAudio</b></summary>

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

Ex: ```fcsSetters.setDeviceAudio("true")``` seeks to set the DeviceAudio to "true"

</details>

<details id="launchApp">
<summary><b>fcsSetters.launchApp</b></summary>

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

Ex: ```fcsSetters.launchApp("true")``` seeks to set the launchApp to "true"

</details>

<details id="setDiscoveryPolicy">
<summary><b>fcsSetters.setDiscoveryPolicy</b></summary>

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

Ex: ```fcsSetters.setDiscoveryPolicy("true")``` seeks to set the DiscoveryPolicy to "true"

</details>

<details id="setLifecycleState">
<summary><b>fcsSetters.setLifecycleState</b></summary>

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

Ex: ```fcsSetters.setLifecycleState("background")``` seeks to set the launchApp to "true"

</details>

<details id="unloadApp">
<summary><b>fcsSetters.unloadApp</b></summary>

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

Ex: ```fcsSetters.unloadApp("true")``` seeks to set the unloadApp to "true"

</details>

<details id="setLanguage">
<summary><b>fcsSetters.setLanguage</b></summary>

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

Ex: ```fcsSetters.setLanguage("true")``` seeks to set the Language to "true"

</details>

<details id="setPreferredAudioLanguages">
<summary><b>fcsSetters.setPreferredAudioLanguagese</b></summary>

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

Ex: ```fcsSetters.setPreferredAudioLanguages("true")``` seeks to set the PreferredAudioLanguages to "true"

</details>

<details id="setLocale">
<summary><b>fcsSetters.setLocale</b></summary>

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

Ex: ```fcsSetters.setLocale("true")``` seeks to set the Locale to "true"

</details>

<details id="setAdditionalInfo">
<summary><b>fcsSetters.setAdditionalInfo</b></summary>

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

Ex: ```fcsSetters.setAdditionalInfo("{Key:"abc",value:"123"}")``` seeks to set the Locale to "true"

</details>


## Optional Functions

<details id="setDeviceHdr">
<summary><b>fcsSetters.setDeviceHdr</b></summary>

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

Ex: ```fcsSetters.setDeviceHdr("{"dolbyVision": true}")``` seeks to set the dolbyVision to "true"

</details>

<details id="setDeviceHdcp">
<summary><b>fcsSetters.setDeviceHdcp</b></summary>

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

Ex: ```fcsSetters.setDeviceHdcp("{"hdcp2.2": true}")``` seeks to set the hdcp2.2 to "true"

</details>

<details id="setDeviceNetwork">
<summary><b>fcsSetters.setDeviceNetwork</b></summary>

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

Ex: ```fcsSetters.setDeviceNetwork("Wifi")``` seeks to set the DeviceNetwork to "Wifi"

</details>

<details id="setCountryCode">
<summary><b>fcsSetters.setCountryCode</b></summary>

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

Ex: ```fcsSetters.setCountryCode("08052")``` seeks to set the Country code to "08052"

</details>

<details>
<summary> fcsSetters.setNotRequired </summary>
It said not required...
</details>