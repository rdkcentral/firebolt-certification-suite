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
  constructor(currentLevel) {
    console.log("Firelog level set to: ", currentLevel);
    
    // Creating the function body dynamically
    const functionBody = `
      return function (...args) {
        return this.log(...args);
      }
    `;
    super('...args', functionBody);
    this.errors = [];
    const logLevels = ['debug', 'info', 'warn', 'error'];
    const levelPriority = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3,
    };

    this.currentLevel = currentLevel;
    this.consoleLevel = currentLevel;

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
        consoleLoggerLevel = this.consoleLevel
      ) => {
        const prefix = `[${level}]`;
        const fullMessage = `${prefix} ${message}`;

        if (level === 'error') {
          throw new Error(fullMessage);
        }

        let cypressLogPromise = null;

        // Check if logOutputLocation is 'report' and log using cy.log based on loggerLevel
        if (logOutputLocation === 'report' && levelPriority[level] <= levelPriority[this.currentLevel]) {
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

  // Method to log a message without any assertion
  log(message) {
    return cy.log(message);
  }

  isNull(value, message, assertionType) {
    if (assertionType === CONSTANTS.SOFT) {
      cy.log(message);
      try {
        assert.isNull(value, message);
      } catch (error) {
        this.errors.push(error.message);
      }
    } else {
      assert.isNull(value, message);
    }
  }

  isNotNull(value, message, assertionType) {
    if (assertionType === CONSTANTS.SOFT) {
      cy.log(message);
      try {
        assert.isNotNull(value, message);
      } catch (error) {
        this.errors.push(error.message);
      }
    } else {
      assert.isNotNull(value, message);
    }
  }

  isUndefined(value, message, assertionType) {
    if (assertionType === CONSTANTS.SOFT) {
      cy.log(message);
      try {
        assert.isUndefined(value, message);
      } catch (error) {
        this.errors.push(error.message);
      }
    } else {
      assert.isUndefined(value, message);
    }
  }

  isTrue(value, message, assertionType) {
    if (assertionType === CONSTANTS.SOFT) {
      cy.log(message);
      try {
        assert.isTrue(value, message);
      } catch (error) {
        this.errors.push(error.message);
      }
    } else {
      assert.isTrue(value, message);
    }
  }

  isFalse(value, message, assertionType) {
    if (assertionType === CONSTANTS.SOFT) {
      cy.log(message);
      try {
        assert.isFalse(value, message);
      } catch (error) {
        this.errors.push(error.message);
      }
    } else {
      assert.isFalse(value, message);
    }
  }

  isOk(value, message, assertionType) {
    if (assertionType === CONSTANTS.SOFT) {
      cy.log(message);
      try {
        assert.isOk(value, message);
      } catch (error) {
        this.errors.push(error.message);
      }
    } else {
      assert.isOk(value, message);
    }
  }

  isNotEmpty(object, message, assertionType) {
    if (assertionType === CONSTANTS.SOFT) {
      cy.log(message);
      try {
        assert.isNotEmpty(object, message);
      } catch (error) {
        this.errors.push(error.message);
      }
    } else {
      assert.isNotEmpty(object, message);
    }
  }

  isBoolean(value, message, assertionType) {
    if (assertionType === CONSTANTS.SOFT) {
      cy.log(message);
      try {
        assert.isBoolean(value, message);
      } catch (error) {
        this.errors.push(error.message);
      }
    } else {
      assert.isBoolean(value, message);
    }
  }

  deepEqual(actual, expected, message, assertionType) {
    if (assertionType === CONSTANTS.SOFT) {
      cy.log(message);
      try {
        assert.deepEqual(actual, expected, message);
      } catch (error) {
        this.errors.push(error.message);
      }
    } else {
      assert.deepEqual(actual, expected, message);
    }
  }

  equal(actual, expected, message, assertionType) {
    if (assertionType === CONSTANTS.SOFT) {
      cy.log(message);
      try {
        assert.equal(actual, expected, message);
      } catch (error) {
        this.errors.push(error.message);
      }
    } else {
      assert.equal(actual, expected, message);
    }
  }

  strictEqual(actual, expected, message, assertionType) {
    if (assertionType === CONSTANTS.SOFT) {
      cy.log(message);
      try {
        assert.strictEqual(actual, expected, message);
      } catch (error) {
        this.errors.push(error.message);
      }
    } else {
      assert.strictEqual(actual, expected, message);
    }
  }

  include(haystack, needle, message, assertionType) {
    if (assertionType === CONSTANTS.SOFT) {
      cy.log(message);
      try {
        assert.include(haystack, needle, message);
      } catch (error) {
        this.errors.push(error.message);
      }
    } else {
      cy.log(
        message + ' ' + JSON.stringify(needle) + ' expected to be in ' + JSON.stringify(haystack)
      );
      assert.include(haystack, needle, message);
    }
  }

  exists(value, message, assertionType) {
    if (assertionType === CONSTANTS.SOFT) {
      cy.log(message);
      try {
        assert.exists(value, message);
      } catch (error) {
        this.errors.push(error.message);
      }
    } else {
      assert.exists(value, message);
    }
  }

  assert(expression, message, assertionType) {
    if (assertionType === CONSTANTS.SOFT) {
      cy.log(message);
      try {
        assert(expression, message);
      } catch (error) {
        this.errors.push(error.message);
      }
    } else {
      assert(expression, message);
    }
  }

  assertAll() {
    if (this.errors.length > 0) {
      throw new Error(
        `Assertion failed with ${this.errors.length} errors: \n${this.errors.join('\n')}`
      );
    }

    // Clear the assertions after processing
    this.errors = [];
  }

  fail(message, failureCode = 1) {
    cy.task('setExitCode', failureCode).then(() => {
      cy.log(message);
      assert.fail(message);
    });
  }
}

const loggerLevelFromEnv = process.env.loggerLevel || 'info';
const fireLog = new FireLog(loggerLevelFromEnv);
global.fireLog = fireLog;
module.exports = { fireLog };