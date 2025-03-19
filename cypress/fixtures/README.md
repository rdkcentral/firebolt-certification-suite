# fixtures

This directory contains the fixture files that are used during the execution of the Firebolt Certification Suite (FCS). These fixture files are dynamically copied into this folder based on the selected SDK version and common, non-SDK-dependent resources.

## Structure of the Directory

- The `cypress/fixtures` directory will **be empty initially** in the repository because it is **cleared** at the start of each test run. It is then **dynamically populated** from the corresponding SDK version folder in `sdkResources` and `commonResources`.
- Once the tests are executed, the relevant fixtures are copied over from:
  - `sdkResources/<version>/fixtures`
  - `sdkResources/external/<version>/fixtures`
  - `commonResources/commonFixtures`
  - `commonResources/external/commonFixtures`
  - Any additional folders under `commonResources` (e.g., `commonResources/<folderName>/fixtures`).
- If no SDK version is passed via CLI, the suite defaults to the version specified in `package.json` and copies fixtures from the corresponding folder.

> **Important Note**: Do not modify files directly in this directory, as they will be overwritten during each test run. The directory will only contain fixtures **after** the tests are executed. For any fixture changes, edit files inside the `sdkResources` or `commonResources` directory to update or modify fixtures for a specific SDK version or non-SDK-dependent resources, respectively. Any changes made directly in the `cypress/fixtures` folders will be lost during the next test execution.

For more information about how test cases are managed, please refer to the main documentation in the [sdkResources directory](../../sdkResources/README.md) and the [commonResources directory](../../commonResources/README.md).
