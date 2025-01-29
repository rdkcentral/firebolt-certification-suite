# Fixtures

This directory contains the fixture files that are used during the execution of the Firebolt Certification Suite (FCS).

## Structure of the Directory

- Fixtures are dynamically copied from the `sdkResources` directory based on the selected SDK version.
- Depending on the SDK version specified (via CLI or default), the corresponding fixture files are placed here for test execution.

## Important Notes

- **Do not modify** the files inside this directory directly, as they will be overwritten with each test execution.
- Fixtures are copied from `sdkResources/<version>/fixtures` or `sdkResources/external/<version>/fixtures`.
- If no SDK version is passed in the CLI, the suite will use the default version, copying fixture files from the relevant folders in `sdkResources`.

For more information about how fixture files are managed, please refer to the main documentation in the [sdkResources directory](../../sdkResources/README.md).

## Folder Contents

This folder will only contain fixtures once the tests are executed. Before running the tests, this folder will be empty.
