# cypress-support
Generic Support Module for thorTV-Tests

## Purpose

All support modules combined into a single cypress-support module. This module will be geared towards Firebolt testing with various functionalities being overridden for different platforms as needed.

This will involve three modules:

| Components | Description |
| --- | --- |
| [Config](src/config.md)     | A modular manager providing possible overrides for Firebolt commands based on different platforms. Refer readme to know more about config manager and supported commands |
| [Transport](src/transport.md)  | Transport manager send payloads to the Platform under test. It will serve as a front-end to the Transport Client. Refer readme to know more about transport manager and supported commands | 
| [Validation](src/validation.md) | Validation manager is responsible to validate schema, jsonpath and custom validator methods. Refer readme to know more about validation manager and supported commands |

## Usages

- Cypress command inside `src/main.js` which would be the entry point to initialize generic support module. 

- All the cypress function inside `src/main.js` have return statement which can be used to take action based on response. 
