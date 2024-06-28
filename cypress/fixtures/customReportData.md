# Overview
We use a JSON structure to define `customFooter` and `customMetadata` for various pages within the report. This allows dynamic customization, ensuring that each page can have specific information and design elements as needed.

## Loading the JSON Data
The JSON data will first be loaded from `configModule/fixtures/external/objects/customReportData.json`. If this file is not available in the configModule, the data will be loaded from the local JSON file located at `cypress/fixtures/customReportData.json`.

## Fields
`customFooter`
    Contains customizable HTML content for the footers of different modules.

- #### PageFooter:
  - Type: string
  - Description: HTML content for the main page footer.
  - Example: `<div id=\"pagefooter\"><p><b>Main page footer:</b></p></div>`
- #### Account:
  - Type: string
  - Description: HTML content for the Account page footer.
  - Example: `<div><p><b>Custom for Account pages</b></p></div>`

`customMetadata`
    Contains customizable HTML content for the metadata sections of different modules.


- #### Account:
  - Type: string
  - Description: HTML content for the Account page metadata.
  - Example: `SetupAccount1</br>SetupAccount2`

# Usage Notes
- The `customFooter` object defines HTML content for footers on various pages.
- The `customMetadata` object defines HTML content for metadata sections on various pages.
- <b>Ensure that the HTML content is properly escaped to avoid any issues with rendering</b>.

# Additional Information
- The JSON structure can be extended to include additional pages by adding new keys based on the feature file names, to the customFooter and customMetadata objects as needed.
