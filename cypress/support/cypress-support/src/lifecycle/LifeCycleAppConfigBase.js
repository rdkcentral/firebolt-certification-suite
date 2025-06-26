const CONSTANTS = require('../../../constants/constants');
const UTILS = require('../../../cypress-support/src/utils');

class LifeCycleAppConfigBase {
  constructor() {
    this.state = {};
    this.history = [];
    this.additionalParams = undefined;
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
}
module.exports = LifeCycleAppConfigBase;
