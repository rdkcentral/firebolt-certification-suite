# Exit Codes in Firebolt Certification Suite (FCS)

## Exit Code Table

| Code | Message           | Description                                |
|------|-------------------|--------------------------------------------|
| 0    | Success           | No failures occurred                       |
| 1    | General Failure   | Default failure for failed assertions/tests|
| 2    | Critical Failure  | Indicates blocking/critical failure        |

## Exit Code Hierarchy

`[2, 1, 0]`  
Priority goes from left (most severe) to right (least severe).  
Only the highest-priority failure is used when exiting the test runner.

## How Failures Work

- When calling `fireLog.fail(msg, code)` or `fireLog.assert(expression, msg, code)`:
  - `code` is compared against the current highest exit code.
  - The one with higher priority (according to the hierarchy) will be used for `process.exitCode` in the plugin.

## How to Add New Exit Codes

1. Add a new number to the table above with a clear description.
2. Insert it at the correct place in the hierarchy array.
3. Use it in `fail(message, newCode)` wherever appropriate.

## Example

```js
fireLog.fail("Token validation failed", 2); // Critical failure
