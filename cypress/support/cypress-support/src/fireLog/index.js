let CONSTANTS;

try {
  CONSTANTS = require('../../cypress/support/constants/constants.js');
} catch (err1) {
  try {
    CONSTANTS = require('../../../constants/constants.js');
  } catch (err2) {
    console.log('Unable to load CONSTANTS');
  }
}

/**
 * FireLog class provides assertion methods with logging using Cypress's cy.log().
 * It wraps Cypress's assertion methods, allowing logging of messages for each assertion.
 * @class
 *
 * @example
 * // Usage example
 * fireLog.isNotNull(someValue, "Some message");
 * fireLog.isTrue(isTrueValue, "True message");
 * fireLog.isFalse(isFalseValue, "False message");
 * fireLog.deepEqual(actual, expected, "deepEqual message");
 *
 * fireLog.info('Discovery launch intent: ' + JSON.stringify(parsedIntent), 'report');
 * fireLog.info() is being used to log the message without any assertion.
 * Removing cy.log and replacing with fireLog.info() to get a cleaner report.
 *
 *
 */

class FireLog extends Function {
  constructor() {
    // Creating the function body dynamically
    const functionBody = `
      return function (...args) {
        return this.log(...args);
      }
    `;
    super('...args', functionBody);

    const logLevels = ['debug', 'info', 'warn', 'error'];
    const levelPriority = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3,
    };
    let currentLevel;
    let consoleLevel;

    if (typeof getEnvVariable === 'function') {
      currentLevel = getEnvVariable(CONSTANTS.LOGGER_LEVEL, false); // log level to display
      consoleLevel = getEnvVariable(CONSTANTS.CONSOLE_LOGGER_LEVEL, false);
    } else {
      // TODO: Make an arrangement to set this log level from command line env variable
      currentLevel = 'info'; // log level to display
      consoleLevel = 'info';
    }

    if (!consoleLevel) consoleLevel = currentLevel;
    const handler = {
      apply: function (target, thisArg, argumentsList) {
        let message;
        const methodName = target.name;
        if (target.hasOwnLog) {
          // If the method has its own logging, just apply it
          return Reflect.apply(target, thisArg, argumentsList);
        } else {
          if (argumentsList.length > 3)
            message =
              'Expected: ' +
              JSON.stringify(argumentsList[0]) +
              ' Actual: ' +
              'Expected : ' +
              JSON.stringify(argumentsList[2]) +
              ' Actual : ' +
              JSON.stringify(argumentsList[1]);
          else if (argumentsList.length == 3) message = argumentsList[2];
          else if (argumentsList.length == 1) message = argumentsList[0];
          else if (argumentsList.length == 2) message = argumentsList[1];
          else
            message =
              argumentsList[argumentsList.length - 1] +
              ' Actual: ' +
              JSON.stringify(argumentsList[0]);
          return cy.log(message).then(() => {
            return Reflect.apply(target, thisArg, argumentsList);
          });
        }
      },
    };
    // Proxy for the fireLog method
    const instanceProxy = new Proxy(this, handler);
    const fireLogProxy = new Proxy(instanceProxy, {
      apply: function (target, thisArg, argumentsList) {
        const message = argumentsList[argumentsList.length - 1];
        return cy.log(message);
      },
    });

    // Use cy.log(message) for every method in the class
    const prototype = Object.getPrototypeOf(instanceProxy);
    Object.getOwnPropertyNames(prototype).forEach((method) => {
      if (
        method !== 'constructor' &&
        method !== 'fireLog' &&
        typeof instanceProxy[method] === 'function'
      ) {
        instanceProxy[method] = new Proxy(instanceProxy[method], handler);
        const methodSource = instanceProxy[method].toString();
        instanceProxy[method].hasOwnLog = methodSource.includes('cy.log');
      }
    });

    // Create logger-level methods
    logLevels.forEach((level) => {
      instanceProxy[level] = (
        message,
        logOutputLocation = 'console',
        consoleLoggerLevel = consoleLevel
      ) => {
        const prefix = `[${level}]`;
        const fullMessage = `${prefix} ${message}`;

        if (level === 'error') {
          throw new Error(fullMessage);
        }

        let cypressLogPromise = null;

        // Check if logOutputLocation is 'report' and log using cy.log based on loggerLevel
        if (logOutputLocation === 'report' && levelPriority[level] <= levelPriority[currentLevel]) {
          cypressLogPromise = cy.log(fullMessage);
        }

        // Check if logOutputLocation is 'console' and log using console based on consoleLoggerLevel
        if (
          logOutputLocation === 'console' &&
          levelPriority[level] <= levelPriority[consoleLoggerLevel]
        ) {
          console[level === 'debug' ? 'log' : level](fullMessage);
        }

        return cypressLogPromise || Promise.resolve();
      };
    });

    return fireLogProxy;
  }

  setLevel(level) {
    this.currentLevel = level;
  }

  // Method to log a message without any assertion
  log(message) {
    return cy.log(message);
  }

  isNull(value, message) {
    assert.isNull(value, message);
  }

  isNotNull(value, message) {
    assert.isNotNull(value, message);
  }

  isUndefined(value, message) {
    assert.isUndefined(value, message);
  }

  isTrue(value, message) {
    assert.isTrue(value, message);
  }

  isFalse(value, message) {
    assert.isFalse(value, message);
  }

  isOk(value, message) {
    assert.isOk(value, message);
  }

  isNotEmpty(object, message) {
    assert.isNotEmpty(object, message);
  }

  isBoolean(value, message) {
    assert.isBoolean(value, message);
  }

  deepEqual(actual, expected, message) {
    assert.deepEqual(actual, expected, message);
  }

  equal(actual, expected, message) {
    assert.equal(actual, expected, message);
  }

  strictEqual(actual, expected, message) {
    assert.strictEqual(actual, expected, message);
  }

  include(haystack, needle, message) {
    cy.log(
      message + ' ' + JSON.stringify(needle) + ' expected to be in ' + JSON.stringify(haystack)
    );
    assert.include(haystack, needle, message);
  }
  exists(value, message) {
    assert.exists(value, message);
  }

  /**
   * Perform assertion with optional soft assert support.
   * Supports both hard assertions (test fails immediately) and soft assertions (failures are collected and reported later).
   *
   * @param {*} actual - The actual value or boolean expression to be evaluated
   * @param {*} expected - The expected value to compare against (or message for backward compatibility)
   * @param {string} message - The assertion message to display on failure
   * @param {boolean} softAssert - If true, performs soft assertion (collects failures); if false/undefined, performs hard assertion (fails immediately)
   * @param {number} failureCode - Exit code to set on hard assertion failure (default: 1). Only used when softAssert is false
   *
   * @example
   * // Backward compatible - Hard assertion with boolean expression
   * fireLog.assert(false, 'Error message');
   *
   * // Soft assertion with boolean - failure is collected but test continues
   * fireLog.assert(false, true, 'Validation failed', true);
   *
   * // Soft assertion with string comparison
   * fireLog.assert('fail', 'pass', 'Screenshot validation failed via OCR', true);
   */
  assert(actual, expected, message, softAssert, failureCode = 1) {
    // Handle backward compatibility: if only 2 params provided and first is boolean
    if (arguments.length === 2 && typeof actual === 'boolean') {
      // assert(expression, message) - Hard assertion
      message = expected;
    }

    if (softAssert === true) {
      cy.softAssert(actual, expected, message);
    } else if (!actual) {
      cy.task('setExitCode', failureCode).then(() => {
        assert.fail(message);
      });
    }
  }

  /**
   * Validates all collected soft assertions and fails the test if any soft assertions failed.
   * This method should be called after performing one or more soft assertions using fireLog.assert() with softAssert=true.
   * If any soft assertions have failed, this will cause the test to fail and display all collected failure messages.
   *
   * @example
   * // Perform multiple soft assertions
   * fireLog.assert('fail', 'pass', 'First validation failed', true);
   * fireLog.assert(false, true, 'Second validation failed', true);
   *
   * // Validate all soft assertions at the end
   * fireLog.assertAll(); // Test will fail if any of the above soft assertions failed
   */
  assertAll() {
    cy.softAssertAll();
  }

  fail(message, failureCode = 1) {
    cy.task('setExitCode', failureCode).then(() => {
      cy.log(message);
      assert.fail(message);
    });
  }
}

const fireLog = new FireLog();
global.fireLog = fireLog;
module.exports = { fireLog };
