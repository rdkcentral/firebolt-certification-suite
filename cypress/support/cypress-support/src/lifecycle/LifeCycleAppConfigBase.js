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

  /**
   * Send message to 3rd party app to invoke lifecycle API
   */
  invokeLifecycleApi(appId, method, methodParams = null) {
    try {
      const requestTopic = UTILS.getTopic(appId);
      const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);

      const params = {
        [CONSTANTS.METHOD_NAME]: method,
        [CONSTANTS.APP_TYPE]: [CONSTANTS.FIREBOLT],
        ...(methodParams && { methodParams }),
      };

      const additionalParams = {
        [CONSTANTS.COMMUNICATION_MODE]: UTILS.getCommunicationMode(),
      };

      const publishMessage = UTILS.createIntentMessage(
        CONSTANTS.TASK.CALLLIFECYCLE,
        params,
        additionalParams
      );

      if (!publishMessage) {
        throw new Error(CONSTANTS.INVALID_PUBLISH_MESSAGE);
      }

      // Logging the intent
      if (publishMessage?.data?.query) {
        let logPayload = publishMessage.data.query;
        if (typeof logPayload === CONSTANTS.STRING) logPayload = JSON.parse(logPayload);

        const logIntent =
          logPayload.params.methodName === CONSTANTS.LIFECYCLE_APIS.HISTORY
            ? CONSTANTS.LIFECYCLE_HISTORY_INTENT
            : CONSTANTS.LIFECYCLE_INTENT;

        cy.log(logIntent + JSON.stringify(publishMessage));
      }

      return cy.sendMessagetoApp(requestTopic, responseTopic, publishMessage).then((response) => {
        if (!response) {
          cy.log(CONSTANTS.LIFECYCLE_EMPTY_RESPONSE);
          assert(false, CONSTANTS.LIFECYCLE_EMPTY_RESPONSE);
          return false;
        }

        let parsed;
        try {
          parsed = JSON.parse(response);
        } catch (err) {
          cy.log(CONSTANTS.FAILED_TO_PARSE_LIEFECYCLE_ERROR + response);
          assert(false, CONSTANTS.FAILED_TO_PARSE_LIEFECYCLE_ERROR + response);
          return false;
        }

        if (parsed.error) {
          UTILS.assertWithRequirementLogs(
            CONSTANTS.FAILED_TO_SET_LIFECYCLE_STATE,
            null,
            null,
            null,
            parsed.error
          );
          return false;
        }

        if (CONSTANTS.LIFECYCLE_METHOD_LIST.includes(method)) {
          cy.updateResponseForFCS(method, '', parsed).then((updatedResponse) => {
            return updatedResponse;
          });
        }
      });
    } catch (err) {
      cy.log(CONSTANTS.LIFECYCLE_API_INVOCATION_FAILED + ': ' + err.message);
      assert(false, CONSTANTS.LIFECYCLE_API_INVOCATION_FAILED + ': ' + err.message);
      return false;
    }
  }

  /**
   * Fetches and logs the app's lifecycle history.
   * Stores it in Cypress environment variable if found.
   */
  fetchLifecycleHistory(appId) {
    this.invokeLifecycleApi(appId, CONSTANTS.LIFECYCLE_APIS.HISTORY, '{}').then((response) => {
      try {
        const historyValue = _.get(JSON.parse(response), CONSTANTS.LIFECYCLE_HISTORY_FIELD, null);

        if (_.isEmpty(historyValue)) {
          logger.info(CONSTANTS.APP_HISTORY_EMPTY);
        } else {
          Cypress.env(CONSTANTS.APP_LIFECYCLE_HISTORY, historyValue);
        }

        cy.log(CONSTANTS.LIFECYCLE_HISTORY_RESPONSE + JSON.stringify(historyValue));
      } catch (err) {
        cy.log(CONSTANTS.LIFECYCLE_HISTORY_FAILED + err.message);
        assert(false, CONSTANTS.LIFECYCLE_HISTORY_FAILED + err.message);
      }
    });
  }

  // Send message to platform to set 3rd party app to the specified lifecycle state
  setLifecycleState(state, appId) {
    try {
      const version = Cypress.env(CONSTANTS.SDK_VERSION) || '1.0'; // Default to version 1.0 if not set
      let method;

      if (version.startsWith('1.')) {
        method = CONSTANTS.REQUEST_OVERRIDE_CALLS.SETLIFECYCLESTATEV1;
      } else if (version.startsWith('2.')) {
        method = CONSTANTS.REQUEST_OVERRIDE_CALLS.SETLIFECYCLESTATEV2;
      } else {
        throw new Error(
          `Unsupported lifecycle version: ${version}. Supported versions are 1.x and 2.x.`
        );
      }

      const requestMap = {
        method,
        params: { state, appId },
      };
      cy.log(CONSTANTS.SET_LIFECYCLE_STATE_REQUEST + JSON.stringify(requestMap)).then(() => {
        cy.sendMessagetoPlatforms(requestMap).then((result) => {
          if (result) {
            logger.info(CONSTANTS.SET_APP_STATE + state);
          }
        });
      });
    } catch (error) {
      throw new Error(`${CONSTANTS.FAILED_TO_SET_LIFECYCLE_STATE}: ${error.message}`);
    }
  }

  getVisibilityState() {
    return this.visibilityState;
  }

  validateVisibilityState() {
    const visibilityState = this.getVisibilityState();
    if (!visibilityState) {
      fireLog.info(CONSTANTS.LIFECYCLE_VISIBILITYSTATE_SKIP_MESSAGE);
      return;
    }

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
