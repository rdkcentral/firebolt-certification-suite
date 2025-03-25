# Resources
The `Resources` folder in the Firebolt Certification Suite (FCS) contains all test cases and fixtures that are independent of any specific SDK version.

## Flowchart of folder structure and resource copying process
![alt text](Resources_flowChart.png)

## Directory Structure
- **Initial Structure (after cloning):** When you first clone the repository, the `Resources` directory will contain subfolders for TestCases and Fixtures.
  ```bash 
  Resources
    ├── common
    │   ├── fixtures      # SDK-independent fixture files
    │   ├── TestCases     # SDK-independent test case files
    ...
- **After Installing Dependencies:**  Once dependencies are installed (yarn install), the common test cases and fixtures from the configModule are copied into FCS’s `Resources/external/` directory.
  ```bash 
  Resources
    ├── common
    │   ├── fixtures      # SDK-independent fixture files
    │   ├── TestCases     # SDK-independent test case files
    ├── external
    │   ├── common
    │       ├── fixtures      # config module SDK-independent fixture files
    │       ├── TestCases     # config module SDK-independent test case files
    ...

## Test Execution
During test execution (e.g., using `cy:run` or `cy:open`), the script dynamically copies test cases and fixture files from the `Resources` folder to their respective locations in the `cypress` directory.

## Copying Process
- Files in `fixtures` are copied to: `cypress/fixtures/`. And `TestCases` are copied to: `cypress/TestCases/`.

- Files in `Resources/external/` are copied to: `cypress/fixtures/external/` and `cypress/TestCases/Distributor/`.

- Any additional folders inside `Resources/` (e.g., `Resources/external/<folderName>/`) are also copied to their respective subdirectories in `cypress/`.

## Extensibility for Certifications
If a new certification or resource type is introduced, we can group specific fixtures and test cases under a new folder within `Resources`.

### Example:
To organize resources for a particular purpose, such as a new certification:

```bash
Resources
├── <folderName>          # Folder for the specific certification or resource type (e.g., fireboltCertification)
│   ├── fixtures          # Certification-specific fixture files
│   ├── testCases         # Certification-specific test case files
...
