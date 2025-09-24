const CONSTANTS = require('../../constants/constants');
const { fireLog } = require('./fireLog');
const skipCodes = require('../../constants/validationSkipCodes.json');

/**
 * @module validationSkipUtils
 * @description Utility functions for handling validation skip scenarios
 */

/**
 * @function getValidationSkipMessage
 * @description Gets the skip message for a given skip code
 * @param {number} skipCode - The validation skip code
 * @returns {string} The skip message
 */
function getValidationSkipMessage(skipCode) {
  try {
    return skipCodes[skipCode] || 'Unknown reason';
  } catch (error) {
    console.warn('Could not load validation skip codes:', error.message);
    return 'Unknown reason';
  }
}

/**
 * @function createValidationSkipResponse
 * @description Creates a standardized validation skip response object
 * @param {number} skipCode - The validation skip code
 * @param {string} [customReason] - Custom reason to override default message
 * @returns {Object} Validation skip response object
 */
function createValidationSkipResponse(skipCode, customReason = null) {
  const reason = customReason || getValidationSkipMessage(skipCode);
  const message = `${CONSTANTS.VALIDATION_NOT_PERFORMED_MESSAGE}. Reason: ${reason}`;

  // Log the skip message to the report
  fireLog.info(message, 'report');

  return {
    status: 'skipped',
    skipCode: skipCode,
    reason: reason,
    message: message,
  };
}

/**
 * @function isValidationSkipped
 * @description Checks if a validation response indicates it was skipped
 * @param {Object} response - The validation response object
 * @returns {boolean} True if validation was skipped
 */
function isValidationSkipped(response) {
  return response && response.status === 'skipped' && response.skipCode;
}

module.exports = {
  getValidationSkipMessage,
  createValidationSkipResponse,
  isValidationSkipped,
};
