# Test Cases

This directory contains the test cases that are used during the execution of the Firebolt Certification Suite (FCS).

## Structure of the Directory

- Test cases are dynamically copied from the `sdkResources` directory based on the selected SDK version.
- Depending on the SDK version specified (via CLI or default), the corresponding test cases are placed here for test execution.

## Important Notes

- **Do not modify** the files inside this directory directly, as they will be overwritten with each test execution.
- Test cases are copied from `sdkResources/<version>/TestCases` or `sdkResources/external/<version>/TestCases`.
- If no SDK version is passed in the CLI, the suite will use the default version, copying test cases from the relevant folders in `sdkResources`.

For more information about how test cases are managed, please refer to the main documentation in the [sdkResources directory](../../sdkResources/README.md).

## Folder Contents

This folder will only contain test cases once the tests are executed. Before running the tests, this folder will be empty.