# Custom Logger Module

## Overview

The Custom Logger module is a lightweight logging solution for Node.js applications, built on top of the `winston` library. It provides a simple interface for logging messages with customizable formatting and log levels.

## Features

- Configurable log levels
- Timestamps for log messages
- Module-specific logging
- Output to console

## Installation

Note: winston library has already added as a dependency in package.json.

To use the Custom Logger module in your Node.js project, follow these steps:

1. Install the `winston` library:

npm install winston

## Configuration

You can customize the log level in constants.js (cypress/support/constants.js), by default, it is set to the debug level.

## Usage

logger.info('This is an informational message', 'moduleName');
logger.warn('This is a warning message');
logger.error('This is an error message');

Note: The moduleName parameter can add more specific information to the logger message. It's optional.
