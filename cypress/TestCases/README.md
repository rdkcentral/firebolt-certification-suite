# Firebolt Certification

Feature files for Firebolt Certification Modules.

## Setup

Refer [setup instructions](../../README.md#setup) to complete the required setup and execute test cases against any platform.

## General Instruction

Testcase should adhere to proper Gherkin format to maintain consistency and clarity across glue codes.
```
Given the environment has been set up for 'Accessibility' tests
And '3rd party app' invokes the 'Firebolt' API to 'get closedCaptions settings'
Then Firebolt platform responds for 'accessibility.closedCaptionsSettings' method and '<Method_JSON_Path>' is '<Content>'
```
* [Location of glue](../support/step_definitions/)
* [Location of fixtures](../fixtures/README.md)
* [Location of cypress commands](../support/cypress-commands)
## Tagging

Tagging is implemented to effectively categorize the test cases and indicate the set of commands supported by test cases. We suggest the following pattern when adding tags:
**@module @sdk @communicationMode-1 @communicationMode-2**

Here are some examples of tags for different categories:
* Tags for module: @accessibility
* Tags for sdk: @coreSDK, @manageSDK
* Tags for communicationModes: @sdk, @transport

## Directory strucute:
Within the `cypress/TestCases/<sdkVersion>` folder we have the following sub-folders:
- FireboltCertification: Contains core and manage feature files.
- Sanity: Contains core and manage sanity tests.
