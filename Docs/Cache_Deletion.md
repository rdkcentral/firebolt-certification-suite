# Manual Cache Deletion for Cypress

This document outlines the manual steps required to delete the Cypress cache in scenarios where it cannot be handled programmatically. It provides instructions for both Windows and MacOS operating systems.

## Manual Steps

### For Windows:

- Open C:\Users\<username>\AppData 
- Click on View > Show and select Hidden items. 
- Go to AppData\Local\Cypress directory 
- Delete the Cypress directory.

### For Mac:

- Open Finder.
- Click Go in the menu bar and select Go to Folder. Or use the Cmd+Shift+G key shortcut.
- Type ~/Library and press Return (Enter) in the search panel.
- The user Library folder will be shown.
- Go to Library\Cache\Cypress
- Delete the Cypress directory.

**Note:**: After deleting the Cypress folder, upon running yarn install, Cypress will be added into your codebase again, since it is already listed as a dependency.
