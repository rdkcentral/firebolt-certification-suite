# Resources
The `Resources` folder in the Firebolt Certification Suite (FCS) contains all test cases and fixtures that are independent of any specific SDK version.

## Guidelines for Placing Files in Resources
![alt text](Resources_filesFlowChart.png)

## Directory Structure
- **Initial Structure (after cloning):** When you first clone the repository, the `Resources` directory will contain subfolders for TestCases and Fixtures.
  ```bash 
  Resources
    ├── <subFolder>
    │   ├── fixtures      # SDK-independent fixture files
    │   ├── TestCases     # SDK-independent test case files
    ...
- **After Installing Dependencies:**  Once dependencies are installed (yarn install), the common test cases and fixtures from the configModule are copied into FCS’s `Resources/external/` directory.
  ```bash 
  Resources
    ├── <subFolder>
    │   ├── fixtures      # SDK-independent fixture files
    │   ├── TestCases     # SDK-independent test case files
    ├── external
    │   ├── <subFolder>
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
```

## Note on File Overrides
During the copying process, if two files with the **same name** exist in different source directories, one file will override the other in the target location.

### Example:
When processing the `fixtures` directory, if both `Resources/<subfolder1>/fixtures/data.json` and `Resources/<subfolder2>/fixtures/data.json` exist, the second file (`Resources/<subfolder2>/fixtures/data.json`) will override the first file in the target location (`cypress/fixtures/data.json`).

The console log will display a warning in **red** text to alert users:

```bash
File override warning: /cypress/fixtures/data.json will be overwritten by /Resources/<subfolder2>/fixtures/data.json
```