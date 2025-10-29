# Validation Skip Utils

A utility module for handling validation skip scenarios in a standardized way.

## Main Function

### `createValidationSkipResponse(skipCode, customReason)`

Creates a standardized validation skip response with proper logging.

**Parameters:**
- `skipCode` (number) - Pre-defined skip code (see available codes below)
- `customReason` (string, optional) - Custom message to override default

**Returns:** Skip response object with status, code, reason, and message.

## Usage Examples

### Using Pre-defined Skip Codes
```javascript
// Use a standard skip code
createValidationSkipResponse(CONSTANTS.VALIDATION_SKIP_CODES.PERFORMANCE_METRICS_DISABLED);

// General purpose skip
createValidationSkipResponse(CONSTANTS.VALIDATION_SKIP_CODES.GENERAL_SKIP);
```

### Using Custom Messages
```javascript
// Override with custom reason
createValidationSkipResponse(
  CONSTANTS.VALIDATION_SKIP_CODES.GENERAL_SKIP, 
  "Custom validation skip reason"
);
```

## Available Skip Codes

| Code | Constant | Message |
|------|----------|---------|
| 1 | `SCREENSHOTS_DISABLED` | Screenshots are disabled |
| 2 | `PERFORMANCE_METRICS_DISABLED` | Performance metrics flag is disabled |
| 3 | `PERFORMANCE_FLAG_DISABLED` | Performance flag is disabled |
| 4 | `NO_VALID_LOG_PATTERNS` | Log pattern validation skipped - no valid log patterns available |
| 5 | `VALIDATION_NOT_APPLICABLE` | Validation not applicable for current test type |
| 6 | `REQUIRED_CONFIG_MISSING` | Required configuration missing |
| 7 | `FEATURE_FLAG_DISABLED` | Feature flag disabled |
| 8 | `PLATFORM_NOT_SUPPORTED` | Platform not supported |
| 9 | `CUSTOM_METHOD_NOT_FOUND` | Custom validation method not found |
| 10 | `PREREQUISITES_NOT_MET` | Validation prerequisites not met |
| 11 | `GENERAL_SKIP` | Validation skipped |

## In Cypress Commands

Use with `cy.wrap()` to make it chainable:

```javascript
const skipResponse = createValidationSkipResponse(CONSTANTS.VALIDATION_SKIP_CODES.GENERAL_SKIP);
cy.wrap(skipResponse);
```
