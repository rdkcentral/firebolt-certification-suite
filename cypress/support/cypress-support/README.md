# cypress-support
Generic Support Module for thorTV-Tests

## Purpose

This support module is meant to be used inside of [Thortv-Tests](https://github.comcast.com/lightning-automation/bolt_worker). 
All support modules combined into a single cypress-support module. This module will be geared towards Firebolt testing with various functionalities being overridden for different platforms as needed.

This will involve three modules:

| Components | Description |
| --- | --- |
| [Config](src/config.md)     | A modular manager providing possible overrides for Firebolt commands based on different platforms. Refer readme to know more about config manager and supported commands |
| [Transport](src/transport.md)  | Transport manager send payloads to the Platform under test. It will serve as a front-end to the Transport Client. Refer readme to know more about transport manager and supported commands | 
| [Validation](src/validation.md) | Validation manager is responsible to validate schema, jsonpath and custom validator methods. Refer readme to know more about validation manager and supported commands |

## Development

- Clone cypress-support locally

- Build cypress-support using `npm install`

- Once development complete, run `npm run build` to generate dist file.

- Push files to git and create PR for review

- Once reviwed and tested, merge the changes to master and delete the branch.

**Note**: All cypress command should be in `src/main.js` and those cypress should have return statement. 

**Supported Modules**: Currently below modules are supported and needs to be added as dependencies in primary application. 

- [xreConfigModule](https://github.comcast.com/lightning-automation/XRE-Config-Module) - This module will allow tester to request a Firebolt call but the configuration will silently change that Firebolt command into a XAPI call. Refer module readme for more details.

- [validationModule](https://github.comcast.com/lightning-automation/validation-module) - This validation manager will take in an optional module to perform custom validations of JSON payload.

## Usages

- cypress-support module needs to be added as dependency in primary application.

- Either one of the above supported modules needs to be added as dependency in primary application. and passed in to get initialized for config and validation manager. Refer [example](https://github.comcast.com/lightning-automation/thorTV-Tests/blob/SYSTEST-9178_cypressSupportIntegration/README.md#generic-support)

- Cypress command inside `src/main.js` which would be the entry point to initialize generic support module. 

- All the cypress function inside `src/main.js` have return statement which can be used to take action based on response. 
