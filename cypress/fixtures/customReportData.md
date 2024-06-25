# Overview
The JSON structure is used to define custom footer content and custom metadata for various pages in a web application.

## Fields
`customFooter`
    Contains custom HTML content for the footers of different pages.

- #### PageFooter:
  - Type: string
  - Description: HTML content for the main page footer.
  - Example: ""<div id=\"pagefooter\"><p><b>This is a main page footer:</b></p></div>","
- #### Account:
  - Type: string
  - Description: HTML content for the Account page footer.
  - Example: "<div><p><b>Custom for Account pages</b></p></div>"

`customMetadata`
    Contains custom HTML content for the metadata sections of different pages.


- #### Account:
  - Type: string
  - Description: HTML content for the Account page metadata.
  - Example: "SetupAccount1</br>SetupAccount2"

# Usage Notes
- The customFooter object is used to define HTML content for footers on various pages.
- The customMetadata object is used to define HTML content for metadata sections on various pages.
- Ensure that the HTML content is properly escaped to avoid any issues with rendering in the web application.
- 
# Additional Information
- This JSON structure can be extended to include more pages by adding more keys(based on feature file name) to the customFooter and customMetadata objects as needed.
