# Test Cases

This directory contains the test cases used during the execution of the Firebolt Certification Suite (FCS). These test cases are dynamically copied into this folder based on the selected SDK version.

## Structure of the Directory

- The `cypress/TestCases` directory will **be empty initially** in the repository because it is **cleared** at the start of each test run. It is then **dynamically populated** from the corresponding SDK version folder in `sdkResources`.
- Once the tests are executed, the relevant test cases are copied over from:
  - `sdkResources/<version>/TestCases`
  - `sdkResources/external/<version>/TestCases`
- If no SDK version is passed via CLI, the suite defaults to the version specified in `package.json` and copies test cases from the corresponding folder.

> **Important Note**: Do not modify files directly in this directory, as they will be overwritten during each test run. The directory will only contain test cases **after** the tests are executed.

For more information about how test cases are managed, please refer to the main documentation in the [sdkResources directory](../../sdkResources/README.md).