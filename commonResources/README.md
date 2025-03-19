# commonResources
The `commonResources` folder in the Firebolt Certification Suite (FCS) contains all test cases and fixtures that are independent of any specific SDK version.

## Directory Structure
- **Initial Structure (after cloning):** When you first clone the repository, the `commonResources` directory will contain subfolders for TestCases and Fixtures.
  ```bash 
  commonResources
    ├── commonFixtures      # SDK-independent fixture files
    ├── commonTestCases     # SDK-independent test case files
    ...
- **After Installing Dependencies:**  Once dependencies are installed (yarn install), the common test cases and fixtures from the configModule are copied into FCS’s `commonResources/external/` directory.
  ```bash 
  commonResources
    ├── commonFixtures      # SDK-independent fixture files
    ├── commonTestCases     # SDK-independent test case files
    ├── external
    │   ├── commonFixtures  # Fixtures copied from the configModule
    │   ├── commonTestCases # Test cases copied from the configModule
    ...

## Test Execution
During test execution (e.g., using `cy:run` or `cy:open`), the script dynamically copies test cases and fixture files from the `commonResources` folder to their respective locations in the `cypress` directory.

## Copying Process
- Files in `commonFixtures` are copied to: `cypress/fixtures/`. And `commonTestCases` are copied to: `cypress/TestCases/`.

- Files in `commonResources/external/` are copied to: `cypress/fixtures/external/` and `cypress/TestCases/Distributor/`.

- Any additional folders inside `commonResources/` (e.g., `commonResources/external/<folderName>/`) are also copied to their respective subdirectories in `cypress/`.

## Extensibility for Certifications
If a new certification or resource type is introduced, we can group specific fixtures and test cases under a new folder within `commonResources`.

### Example:
To organize resources for a particular purpose, such as a new certification:

```bash
commonResources
├── <folderName>          # Folder for the specific certification or resource type (e.g., fireboltCertification)
│   ├── fixtures          # Certification-specific fixture files
│   ├── testCases         # Certification-specific test case files
...
