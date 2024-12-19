# Set Default Values

Before executing any of the feature files, execute the [SetDefaultValues](https://github.com/rdkcentral/firebolt-certification-suite/cypress/TestCases/FireboltCertification/PreRequisite/SetDefaultValues.feature) inside the prerequisites folder to set default values on the platform.

## Overview

This feature file is used to set the device under test to a default state and has to be executed before running module feature files. When this feature file is executed, firebolt calls are sent to the device to change values such as device name, CC state etc. This is especially needed in test cases where we are validating firebolt events. In order for an event to be triggered, the previous value and the current value need to be different. Executing this feature file would ensure that previous values are different than the values that will be set during module executions.

List of values that are being set when this feature file is executed are [listed below](https://github.com/rdkcentral/firebolt-certification-suite/cypress/TestCases/FireboltCertification/SetDefaultValues.md#current-list-of-default-values-present-in-prerequisitedata)

##  Example

Steps to be followed to set a new value is given below
### Example : How to set device name to Kitchen 
- For this, the manage firebolt call device.setName will be sent to the device with value as Kitchen.

* Define a new key as "set device name to kitchen" inside the [PreRequisiteData](https://github.com/rdkcentral/firebolt-certification-suite/cypress/fixtures/PreRequisiteData.json) JSON file.
* Convert "set device name to kitchen" to "SET_DEVICE_NAME_TO_KITCHEN" by replacing space with underscore and converting all letters to uppercase. Then add this key to the file [device.json](https://github.com/rdkcentral/firebolt-certification-suite/cypress/fixtures/fireboltCalls/device.json) as shown below. Here, firebolt call sent to the device is specified in the method field and parameters for the call is specified in the params field.

            "SET_DEVICE_NAME_TO_KITCHEN": {
                "method": "manage_device.setName",
                "params": "DEVICE_NAME_KITCHEN"
            }
* The parameter "DEVICE_NAME_KITCHEN" details can be added in the file [device.json](https://github.com/rdkcentral/firebolt-certification-suite/cypress/fixtures/modules/device.json) as shown below . More about where to add params is described [here](https://github.com/rdkcentral/firebolt-certification-suite?tab=readme-ov-file#data-in-fixture-folder-is-segregated-as-per-below-configurations)

        "NAME_KITCHEN": "Kitchen",



## Current List of default values present in [PreRequisiteData](https://github.com/rdkcentral/firebolt-certification-suite/cypress/fixtures/PreRequisiteData.json) 


| Key                                        | Description                               | MethodName               | 
| -------------------------------------------| ------------------------------------------| -------------------------|
| enable closedCaptions                      | This will set closedcaptions to true      | closedcaptions.setEnabled|
| set fontFamily to monospaced_sanserif | This will set closedcaptions font family value to monospaced_sanserif| closedcaptions .setFontFamily |
| set fontsize to 2| This will set closedcaptions fontsize value to 2 | closedcaptions.setFontSize |
| set fontColor to #ffffff | This will set closedcaptions fontColor value to #ffffff | closedcaptions.setFontColor |
| set fontEdge to none | This will set closedcaptions fontEdge value to none | closedcaptions.setFontEdge |
| set fontEdgeColor to #7f7f7f| This will set closedcaptions fontEdgeColor value to #7f7f7f| closedcaptions.setFontEdgeColor |
| set fontopacity to 100| This will set closedcaptions fontOpacity value to 100 | closedcaptions.setFontOpacity |
| set backgroundcolor to #000000| This will set closedcaptions background color value to #000000| closedcaptions.setBackgroundColor |
| set backgroundopacity to 100| This will set closedcaptions background opacity value to 100 | closedcaptions.setBackgroundOpacity |
| set textalign to center                               | This will set closedcaptions text align value to center                                                                | closedcaptions.setTextAlign |
| set textalignvertical to middle           | This will set closedcaptions text align vertical value to middle      | closedcaptions.setTextAlignVertical |
| set windowOpacity to 40                   | This will set closedcaptions window opacity value to 40               | closedcaptions.setWindowOpacity |
| set languages to english spanish          | This will set closedcaptions pereferredlanguage as english and spanish| closedcaptions.setPreferredLanguages |
| set skipRestriction as adsUnwatched       | This will set advertising window skip restriction to adsUnwatched     | advertising.setSkipRestriction |
| set device name to living room            | This will set device name value to Living Room                        | device.setName |
| set localization locality to Philadelphia    | This will set localization locality value to philadelphia    | localization.setLocality |
| set postalCode to 19103   | This will set localization postal code value to 19103                | localization.setPostalCode |
| set countryCode to US  | This will set localization countrycode value to "US"                        | localization.setCountryCode |
| set language to EN  | This will set localization language value to "en"                | localization.setLanguage |
| set locale to ENUS   | This will set localization locale value to "en-US"   | localization.setLocale |
| enable voiceguidance  | This will set voiceguidance to true | voiceguidance.setEnabled |
| set speed as 2 | This will set voiceguidance speed value to 2| voiceguidance.setSpeed |
| set privacy setAllowAppContentAdTargeting true | This will set privacy allowAppContentAdTargeting value to false   | privacy.setAllowAppContentAdTargeting |
| set privacy setAllowPersonalization false | This will set privacy allowPersonalization value to false     | privacy.setAllowPersonalization |
| set privacy setAllowWatchHistory false| This will set privacy allowWatchHistory value to false| privacy.setAllowWatchHistory |
| set privacy setAllowResumePoints false| This will set privacy AllowResumePoints value to false| privacy.setAllowResumePoints |
| set privacy setAllowUnentitledPersonalization false| This will set privacy AllowUnentitledPersonalization value to false| privacy.setAllowUnentitledPersonalization |
| set privacy setAllowUnentitledResumePoints false| This will set privacy AllowUnentitledResumePoints value to false| privacy.setAllowUnentitledResumePoints |
| set privacy setAllowProductAnalytics false| This will set privacy AllowProductAnalytics value to false| privacy.setAllowProductAnalytics |
| set privacy setAllowRemoteDiagnostics false| This will set privacy AllowRemoteDiagnostics value to false| privacy.setAllowRemoteDiagnostics |
| set privacy setAllowPrimaryContentAdTargeting false| This will set privacy AllowPrimaryContentAdTargeting value to false| privacy.setAllowPrimaryContentAdTargeting |
| set privacy setAllowPrimaryBrowseAdTargeting false| This will set privacy AllowPrimaryBrowseAdTargeting value to false| privacy.setAllowPrimaryBrowseAdTargeting |
| set privacy setAllowACRCollection false| This will set privacy AllowACRCollection value to false| privacy.setAllowACRCollection |
| set privacy setAllowCameraAnalytics false| This will set privacy AllowCameraAnalytics value to false| privacy.setAllowCameraAnalytics |
| set for key authtesttokendevice to scope device with default_value| This will set securestorage for app to scope device with default value| securestorage.setForApp |
| set for key authtesttokenaccount to scope account with default_value| This will set securestorage for app to scope account with default value| securestorage.setForApp |
| set for key authtesttokenaccount to scope account with default_token| This will set securestorage for app to scope account with default token| securestorage.setForApp |
| set preferredaudiolanguages to eng spa | This will set localization preferredaudiolanguages value to "english" and "spanish"                        | localization.setPreferredAudioLanguages |
| set localization timezone with america losangeles  | This will set localization timezone value to "America/Los_Angeles"                       | localization.setTimeZone |
| set audiodescriptions enabled false | This will set audiodescriptions to false                        | audioDescriptions.setEnabled |




    















