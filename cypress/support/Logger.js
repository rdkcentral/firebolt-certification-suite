const winston = require('winston');
const CONSTANTS = require('../support/constants/constants');

const logConfiguration = {
  transports: [new winston.transports.Console({ level: CONSTANTS.LOGGER_LEVEL })],
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss',
    }),
    winston.format.printf((options) => {
      const args = options[Symbol.for('splat')];
      return `[${options.timestamp}][${options.level}][${options.moduleName}][${args}][${options.message}]`;
    })
  ),
};
const logger = winston.createLogger(logConfiguration);

module.exports = function (name) {
  return logger.child({ moduleName: name });
};
