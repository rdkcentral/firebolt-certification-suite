const CONSTANTS = require('../../../constants/constants');
const UTILS = require('../utils');

export class LifeCycleAppConfigBase {
  constructor() {
    this.state = {};
    this.history = [];
    this.additionalParams = undefined;
    this.visibilityState = null;
  }

  getHistory() {
    return this.history;
  }

  // Common functionality for both versions
  getCurrentState() {
    return this.state;
  }

  getVisibilityState() {
    return this.visibilityState;
  }

  validateVisibilityState() {
    const visibilityState = this.getVisibilityState();
    if (!visibilityState) {
      cy.log(CONSTANTS.LIFECYCLE_VISIBILITYSTATE_SKIP_MESSAGE);
      return;
    }
    // Note: The requirement ID is currently unused, but may be utilized in future updates.
    const scenarioRequirement = UTILS.getEnvVariable(CONSTANTS.SCENARIO_REQUIREMENTS);
    const lifecycleStateRequirementId = scenarioRequirement.find((req) =>
      req.hasOwnProperty(CONSTANTS.VISIBLE_CHECK)
    );
    const pretext = CONSTANTS.VISIBILITYSTATE_VALIDATION_REQ;
    const intentMessage = UTILS.createIntentMessage(CONSTANTS.TASK.VISIBILITYSTATE, {
      params: CONSTANTS.VISIBILITYSTATE,
    });
    const requestTopic = UTILS.getTopic(null);
    const responseTopic = UTILS.getTopic(null, CONSTANTS.SUBSCRIBE);

    cy.sendMessagetoApp(requestTopic, responseTopic, intentMessage).then((result) => {
      result = JSON.parse(result);
      if (result.report === CONSTANTS.RESPONSE_NOT_FOUND) {
        cy.log(CONSTANTS.NO_MATCHED_RESPONSE).then(() => {
          assert(false, CONSTANTS.NO_MATCHED_RESPONSE);
        });
        return;
      }
      if (result.error) {
        assert(false, result.error.message);
        return;
      }

      const expected = visibilityState;
      const actual = result.report;

      if (expected !== actual) {
        cy.log(
          `${pretext}: Expected : ${expected} , Actual : ${actual}${CONSTANTS.VISIBILITYSTATE_FAILURE_FIX_LOG}`
        ).then(() => {
          assert.equal(expected, actual, CONSTANTS.VISIBILITYSTATE_FAILURE_LOG);
        });
      } else {
        cy.log(`${pretext}: Expected : ${expected} , Actual : ${actual}`).then(() => {
          assert.equal(expected, actual, pretext);
        });
      }
    });
  }
}
