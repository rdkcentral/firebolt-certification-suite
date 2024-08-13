# Contributing
If you would like to contribute code to this project you can do so through GitHub by forking the repository
and sending a pull request.
Before RDK accepts your code into the project you must sign the RDK Contributor License Agreement (CLA).

## Pull Request Naming Conventions
All PR titles must follow a specific format to ensure clarity and consistency across the project. The allowed prefixes are based on the type of change your PR introduces:

1. Feature Enhancements:
Prefix your PR title with feat: if your PR adds a new feature.
Example: feat: add user login functionality

2. Bug Fixes:
Prefix your PR title with fix: if your PR resolves a bug.
Example: fix: correct user input validation issue

3. Breaking Changes:
Prefix your PR title with BREAKING CHANGE: if your PR introduces changes that are not backward-compatible.
Example: BREAKING CHANGE: update API endpoint to v2

4. Descriptors (Optional):
You can optionally add a descriptor within parentheses to provide more context about the affected area or feature.
Examples:
   - feat(auth): add user login functionality
   - fix(ui): correct button alignment

### PR Title Format
Your PR title must conform to one of the following formats:

 - feat: \<description\>
 - fix: \<description\>
 - BREAKING CHANGE: \<description\>
 - feat(<DESCRIPTOR>): \<description\>
 - fix(<DESCRIPTOR>): \<description\>
 - BREAKING CHANGE(<DESCRIPTOR>): \<description\>

Examples of Valid PR Titles
 - feat: implement new authentication flow
 - fix(api): handle null values in response
 - BREAKING CHANGE: remove deprecated endpoints
 - feat(database): optimize query performance

### Automated PR Name Check
Upon opening, editing, or synchronizing a PR, an automated workflow will check if the PR title adheres to these conventions. If the title does not meet the required format, the PR will fail the check, and a comment will be posted with instructions to correct the title.

Please make sure your PR title is correctly formatted before submitting.

### Squash Merge Requirement
All PRs should be merged using the Squash and Merge strategy. When performing the merge, ensure that the PR title is used as the commit message. This helps maintain a clean and concise commit history.