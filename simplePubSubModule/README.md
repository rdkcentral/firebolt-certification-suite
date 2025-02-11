# SimplePubSubModule Setup Instructions

Follow these steps to set up and use the `simplePubSubModule` for your testing and development purposes.

## 1. Update the `configModule`

In your [`package.json`](../package.json), update the `configModule` field to point to `./simplePubSubModule`.

```json
"configModule": "./simplePubSubModule"
```

## 2. Configure Environment Variables

Add any necessary environment variables for your testing in a `config.json` file under the following [directory](./constants):

```
simplePubSubModule/constants/config.json
```

Customize this file with the environment variables required for your use case.

## 3. Add Custom Test Cases

If you want to supplement the existing test cases with your own, add them under the following [directory](./cypress):

```
simplePubSubModule/cypress/TestCases
```

Each test case should follow the Cypress test case structure for compatibility.

## 4. Include Additional Test Data

For tests that require additional data, include the necessary files under the following [directory](./cypress):

```
simplePubSubModule/cypress/fixtures
```

Organize the data in a way that aligns with your test scenarios.

## 5. Handle Package Installation

 - If working with a fresh clone of the repository, follow the setup instructions in the [main README](../README.md#setup) to install the necessary packages.
 - If packages have already been installed, it is recommended to clear the yarn cache, lockfile, node_modules and run a fresh install.


## Notes
- Ensure all file paths and configurations are correctly set up before running your tests.
- Refer to the Cypress documentation for additional details on writing and structuring test cases and fixtures.

You're now ready to use the `simplePubSubModule` for your projects!
