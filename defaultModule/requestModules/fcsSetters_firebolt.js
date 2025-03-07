const CONSTANTS = require('../../../cypress/support/constants/constants');
const UTILS = require('../../../cypress/support/cypress-support/src/utils');

/**
 * Launches an application.
 * @param {any} value - The application to launch.
 * @returns {Promise<any>} A promise that resolves/reject based on the response when the operation is complete.
 * @example fcsSetters.launchApp("AppName");
 */
const launchApp = async (value) => {
  const requestMap = createRequestMap(`discovery.launch`, value);

  return cy.sendMessagetoPlatforms(requestMap).then(async (response) => {
    try {
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: Response is null or not an object');
      }
      const success = response.hasOwnProperty(CONSTANTS.RESULT);
      if (success) {
        return await setterSuccess(`Launched ${value} successfully!`);
      } else {
        console.log(`Response from the platform - ${JSON.stringify(response)}`);
        return await setterFailure(`Failed to launch app ${value}`);
      }
    } catch (error) {
      console.error('Error handling response:', error);
      return await setterFailure('Error occurred while processing the response', error.message);
    }
  });
};

/**
 * Sets additional metadata for localization or configuration.
 * @param {any} value - The value to set.
 * @returns {Promise<any>} A promise that resolves/reject based on the response when the operation is complete.
 * @example fcsSetters.setAdditionalInfo("{ key: 'exampleKey', value: 'exampleValue' }");
 */
const setAdditionalInfo = async (attribute, value) => {
  const requestMap = createRequestMap(`localization.set${attribute}`, value);

  return cy.sendMessagetoPlatforms(requestMap).then(async (response) => {
    try {
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: Response is null or not an object');
      }
      const success = response.hasOwnProperty(CONSTANTS.RESULT);
      if (success) {
        return await setterSuccess(`Successfully set '${attribute}' with value '${value}'!`);
      } else {
        console.log(`Response from the platform - ${JSON.stringify(response)}`);
        return await setterFailure(`Failed to set '${attribute}' with value '${value}'`);
      }
    } catch (error) {
      console.error('Error handling response:', error);
      return await setterFailure('Error occurred while processing the response', error.message);
    }
  });
};

/**
 * Sets audio description settings.
 * @param {string} attribute - The attribute to set.
 * @param {any} value - The value to set.
 * @returns {Promise<any>} A promise that resolves/reject based on the response when the operation is complete.
 * @example fcsSetters.setAudioDescriptions("setEnabled", "true");
 */
const setAudioDescriptions = async (attribute, value) => {
  attribute = attribute ?? 'Enabled'; // Default value
  const requestMap = createRequestMap(`audiodescriptions.set${attribute}`, value);

  return cy.sendMessagetoPlatforms(requestMap).then(async (response) => {
    try {
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: Response is null or not an object');
      }
      const success = response.hasOwnProperty(CONSTANTS.RESULT);
      if (success) {
        return await setterSuccess(
          `Set Audio Description '${attribute}' to '${value}' successfully!`
        );
      } else {
        console.log(`Response from the platform - ${JSON.stringify(response)}`);
        return await setterFailure(`Failed to set Audio Description '${attribute}' to '${value}'`);
      }
    } catch (error) {
      console.error('Error handling response:', error);
      return await setterFailure('Error occurred while processing the response', error.message);
    }
  });
};

/**
 * Sets the country code.
 * @param {any} value - The value to set.
 * @returns {Promise<any>} A promise that resolves/reject based on the response when the operation is complete.
 * @example fcsSetters.setCountryCode("US");
 */
const setCountryCode = async (value) => {
  const requestMap = createRequestMap(`localization.setCountryCode`, value);

  return cy.sendMessagetoPlatforms(requestMap).then(async (response) => {
    try {
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: Response is null or not an object');
      }
      const success = response.hasOwnProperty(CONSTANTS.RESULT);
      if (success) {
        return await setterSuccess(`Set Country Code to '${value}' successfully!`);
      } else {
        console.log(`Response from the platform - ${JSON.stringify(response)}`);
        return await setterFailure(`Failed to set Country Code to '${value}'`);
      }
    } catch (error) {
      console.error('Error handling response:', error);
      return await setterFailure('Error occurred while processing the response', error.message);
    }
  });
};

/**
 * Sets closed captions settings.
 * @param {string} attribute - The attribute to set.
 * @param {any} value - The value to set.
 * @returns {Promise<any>}A promise that resolves/reject based on the response when the operation is complete.
 * @example fcsSetters.setClosedCaptions("setEnabled", "true");
 */
const setClosedCaptions = async (attribute, value) => {
  attribute = attribute ?? 'Enabled'; // Default value
  const requestMap = createRequestMap(`closedcaptions.set${attribute}`, value);

  return cy.sendMessagetoPlatforms(requestMap).then(async (response) => {
    try {
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: Response is null or not an object');
      }
      const success = response.hasOwnProperty(CONSTANTS.RESULT);
      if (success) {
        return await setterSuccess(`Successfully ${value}d closed captions`);
      } else {
        console.log(`Response from the platform - ${JSON.stringify(response)}`);
        return await setterFailure(`Unable to set ${value} closed captions`);
      }
    } catch (error) {
      console.error('Error handling response:', error);
      return await setterFailure(
        'Response in invalid format, which could lead to failures in validations. Response must be in JSON RPC format::',
        error.message
      );
    }
  });
};

/**
 * Sets the discovery policy.
 * @param {any} value - The value to set.
 * @returns {Promise<any>} A promise that resolves/reject based on the response when the operation is complete.
 * @example fcsSetters.setDiscoveryPolicy("Allow");
 */
const setDiscoveryPolicy = async (attribute, value) => {
  const requestMap = createRequestMap(`privacy.set${attribute}`, value);

  return cy.sendMessagetoPlatforms(requestMap).then(async (response) => {
    try {
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: Response is null or not an object');
      }
      const success = response.hasOwnProperty(CONSTANTS.RESULT);
      if (success) {
        return await setterSuccess(`Set '${attribute}' policy to '${value}' successfully!`);
      } else {
        console.log(`Response from the platform - ${JSON.stringify(response)}`);
        return await setterFailure(`Failed to set '${attribute}' policy to '${value}'`);
      }
    } catch (error) {
      console.error('Error handling response:', error);
      return await setterFailure('Error occurred while processing the response', error.message);
    }
  });
};

/**
 * Sets device audio.
 * @param {any} value - The value to set.
 * @returns {Promise<any>} A promise that resolves/reject based on the response when the operation is complete.
 * @example fcsSetters.setDeviceAudio("stereo");
 */
const setDeviceAudio = async (value) => {
  return setterNotImplemented('setDeviceAudio is not supported by firebolt');
};

/**
 * Sets the device HDCP settings.
 * @param {any} value - The value to set.
 * @returns {Promise<any>} A promise that resolves/reject based on the response when the operation is complete.
 * @example fcsSetters.setDeviceHdcp("{"hdcp2.2": true}")
 */
const setDeviceHdcp = async (value) => {
  return setterNotImplemented('setDeviceHdcp is not supported by firebolt');
};

/**
 * Sets the device HDR settings.
 * @param {any} value - The value to set.
 * @returns {Promise<any>} A promise that resolves/reject based on the response when the operation is complete.
 * @example fcsSetters.setDeviceHdr("{"dolbyVision": true}")
 */
const setDeviceHdr = async (value) => {
  return setterNotImplemented('setDeviceHdr is not supported by firebolt');
};

/**
 * Sets the device network settings.
 * @param {any} value - The value to set.
 * @returns {Promise<any>} A promise that resolves/reject based on the response when the operation is complete.
 * @example fcsSetters.setDeviceNetwork("{"state": "connected", "type": "wifi"}")
 */
const setDeviceNetwork = async (value) => {
  return setterNotImplemented('setDeviceNetwork is not supported by firebolt');
};

/**
 * Sets the language.
 * @param {any} value - The value to set.
 * @returns {Promise<any>} A promise that resolves/reject based on the response when the operation is complete.
 * @example fcsSetters.setLanguage("en-US");
 */
const setLanguage = async (value) => {
  const requestMap = createRequestMap(`localization.setLanguage`, value);

  return cy.sendMessagetoPlatforms(requestMap).then(async (response) => {
    try {
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: Response is null or not an object');
      }
      const success = response.hasOwnProperty(CONSTANTS.RESULT);
      if (success) {
        return await setterSuccess(`Set Language to '${value}' successfully!`);
      } else {
        console.log(`Response from the platform - ${JSON.stringify(response)}`);
        return await setterFailure(`Failed to set Language to '${value}'`);
      }
    } catch (error) {
      console.error('Error handling response:', error);
      return await setterFailure('Error occurred while processing the response', error.message);
    }
  });
};

/**
 * Sets the lifecycle state.
 * @param {string} attribute - The attribute to set.
 * @param {any} value - The value to set.
 * @returns {Promise<any>} A promise that resolves/reject based on the response when the operation is complete.
 * @example fcsSetters.setLifecycleState("foreground");
 */
const setLifecycleState = async (value) => {
  const requestMap = createRequestMap(`fcs.setLifecycleState`, value);

  return cy.sendMessagetoPlatforms(requestMap).then(async (response) => {
    try {
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: Response is null or not an object');
      }
      const success = response.hasOwnProperty(CONSTANTS.RESULT);
      if (success) {
        return await setterSuccess(`Set Lifecycle State to '${value}' successfully!`);
      } else {
        console.log(`Response from the platform - ${JSON.stringify(response)}`);
        return await setterFailure(`Failed to set Lifecycle State to '${value}'`);
      }
    } catch (error) {
      console.error('Error handling response:', error);
      return await setterFailure('Error occurred while processing the response', error.message);
    }
  });
};

/**
 * Sets the limit ad tracking preference.
 * @param {any} value - The value to set.
 * @returns {Promise<any>} A promise that resolves/reject based on the response when the operation is complete.
 * @example fcsSetters.setLimitAdTracking("true");
 */
const setLimitAdTracking = async (attribute, value) => {
  const requestMap = createRequestMap(`privacy.set${attribute}`, value);

  return cy.sendMessagetoPlatforms(requestMap).then(async (response) => {
    try {
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: Response is null or not an object');
      }
      const success = response.hasOwnProperty(CONSTANTS.RESULT);
      if (success) {
        return await setterSuccess(`Set '${attribute}' Tracking to '${value}' successfully!`);
      } else {
        console.log(`Response from the platform - ${JSON.stringify(response)}`);
        return await setterFailure(`Failed to set '${attribute}' Tracking to '${value}'`);
      }
    } catch (error) {
      console.error('Error handling response:', error);
      return await setterFailure('Error occurred while processing the response', error.message);
    }
  });
};

/**
 * Sets the locale.
 * @param {any} value - The value to set.
 * @returns {Promise<any>} A promise that resolves/reject based on the response when the operation is complete.
 * @example fcsSetters.setLocale("en-US");
 */
const setLocale = async (value) => {
  const requestMap = createRequestMap(`localization.setLocale`, value);

  return cy.sendMessagetoPlatforms(requestMap).then(async (response) => {
    try {
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: Response is null or not an object');
      }
      const success = response.hasOwnProperty(CONSTANTS.RESULT);
      if (success) {
        return await setterSuccess(`Set Locale to '${value}' successfully!`);
      } else {
        console.log(`Response from the platform - ${JSON.stringify(response)}`);
        return await setterFailure(`Failed to set Locale to '${value}'`);
      }
    } catch (error) {
      console.error('Error handling response:', error);
      return await setterFailure('Error occurred while processing the response', error.message);
    }
  });
};

/**
 * Sets the preferred audio languages.
 * @param {any} value - The value to set.
 * @returns {Promise<any>} A promise that resolves/reject based on the response when the operation is complete.
 * @example fcsSetters.setPreferredAudioLanguages(["en-US"]);
 */
const setPreferredAudioLanguages = async (value) => {
  const requestMap = createRequestMap(`localization.setPreferredAudioLanguages`, value);

  return cy.sendMessagetoPlatforms(requestMap).then(async (response) => {
    try {
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: Response is null or not an object');
      }
      const success = response.hasOwnProperty(CONSTANTS.RESULT);
      if (success) {
        return await setterSuccess(`Set Preferred Audio Languages to '${value}' successfully!`);
      } else {
        console.log(`Response from the platform - ${JSON.stringify(response)}`);
        return await setterFailure(`Failed to set Preferred Audio Languages to '${value}'`);
      }
    } catch (error) {
      console.error('Error handling response:', error);
      return await setterFailure('Error occurred while processing the response', error.message);
    }
  });
};

/**
 * Sets the video resolution.
 * @param {any} value - The value to set.
 * @returns {Promise<any>} A promise that resolves/reject based on the response when the operation is complete.
 * @example fcsSetters.setVideoResolution("1080p");
 */
const setVideoResolution = async (value) => {
  return setterNotImplemented('setVideoResolution is not supported by firebolt');
};

/**
 * Sets voice guidance.
 * @param {string} attribute - The attribute to set.
 * @param {any} value - The value to set.
 * @returns {Promise<any>} A promise that resolves/reject based on the response when the operation is complete.
 * @example fcsSetters.setVoiceGuidance("enabled", "true");
 */
const setVoiceGuidance = async (attribute, value) => {
  attribute = attribute ?? 'Enabled'; // Default value
  const requestMap = createRequestMap(`voiceguidance.set${attribute}`, value);

  return cy.sendMessagetoPlatforms(requestMap).then(async (response) => {
    try {
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: Response is null or not an object');
      }
      const success = response.hasOwnProperty(CONSTANTS.RESULT);
      if (success) {
        return await setterSuccess(
          `Set Voice Guidance attribute '${attribute}' to '${value}' successfully!`
        );
      } else {
        console.log(`Response from the platform - ${JSON.stringify(response)}`);
        return await setterFailure(
          `Unable to set Voice Guidance attribute '${attribute}' to '${value}'`
        );
      }
    } catch (error) {
      console.error('Error handling response:', error);
      return await setterFailure('Error occurred while processing the response', error.message);
    }
  });
};

/**
 * Unloads an application.
 * @param {any} value - The application to unload.
 * @returns {Promise<any>} A promise that resolves/reject based on the response when the operation is complete.
 * @example fcsSetters.unloadApp("AppName");
 */
const unloadApp = async (value) => {
  const requestMap = createRequestMap(`fcs.unloadApp`, value);

  return cy.sendMessagetoPlatforms(requestMap).then(async (response) => {
    try {
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: Response is null or not an object');
      }
      const success = response.hasOwnProperty(CONSTANTS.RESULT);
      if (success) {
        return await setterSuccess(`Unloaded ${value} successfully!`);
      } else {
        console.log(`Response from the platform - ${JSON.stringify(response)}`);
        return await ssetterFailure(`Failed to unload ${value} app`);
      }
    } catch (error) {
      console.error('Error handling response:', error);
      return await setterFailure('Error occurred while processing the response', error.message);
    }
  });
};

/**
 * To get the current HDCP negotiation settings.
 * @param {}
 * @returns {Promise<any>} A promise that resolves/reject based on the response when the operation is complete.
 * @example fcsSetters.getNegotiatedHdcp();
 */
const getNegotiatedHdcp = async () => {
  return setterNotImplemented();
};

/**
 * Creates a request map object.
 * @param {string} method - The method to call.
 * @param {any} value - The value to set.
 * @returns {object} The request map object.
 */
const createRequestMap = (method, value) => {
  return {
    method: method,
    params: { value: value },
    appId: UTILS.fetchAppIdentifierFromEnv(CONSTANTS.FIRST_PARTY_APP),
  };
};

module.exports = {
  setAdditionalInfo,
  setAudioDescriptions,
  setCountryCode,
  setClosedCaptions,
  setDiscoveryPolicy,
  setDeviceAudio,
  setDeviceHdcp,
  setDeviceHdr,
  setDeviceNetwork,
  setLanguage,
  launchApp,
  setLifecycleState,
  setLimitAdTracking,
  setLocale,
  setPreferredAudioLanguages,
  setVideoResolution,
  setVoiceGuidance,
  unloadApp,
  getNegotiatedHdcp,
};
