const CONSTANTS = require('../../../constants/constants');
import lifecycle_v1 from './1.x/lifecycle_v1';
import lifecycle_v2 from './2.x/lifecycle_v2';

const version = Cypress.env(CONSTANTS.SDK_VERSION) || '1.0'; // Default to version 1.0 if not set

// Factory function to create the correct instance
export function createLifeCycleAppConfig() {
  if (version.startsWith('1.')) {
    return new lifecycle_v1();
  } else if (version.startsWith('2.')) {
    return new lifecycle_v2();
  } else {
    fireLog.fail(`Unsupported lifecycle version: ${version}. Supported versions are 1.x and 2.x.`);
  }
}
