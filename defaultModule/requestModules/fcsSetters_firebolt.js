/**
 * Launches an application.
 * @param {any} value - The application to launch.
 * @returns {Promise<any>} A promise that resolves/reject based on the response when the operation is complete.
 * @example fcsSetters.launchApp("AppName");
 */
const launchApp = async (value) => {
  const requestMap = createRequestMap(`Discovery.launch`, value);
  return cy.sendMessagetoPlatforms(requestMap).then(async (response) => {
    try {
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: Response is null or not an object');
      }
      const success = response.hasOwnProperty('result');
      if (success) {
        return await setterSuccess(`Successfully ${value}d closed captions`);
      } else {
        return await setterFailure(
          `Unable to set ${value} closed captions`,
          JSON.stringify(response)
        );
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
  const requestMap = createRequestMap(`localization.${attribute}`, value);
  return cy.sendMessagetoPlatforms(requestMap).then(async (response) => {
    try {
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: Response is null or not an object');
      }
      const success = response.hasOwnProperty('result');
      if (success) {
        return await setterSuccess(`Successfully ${value}d closed captions`);
      } else {
        return await setterFailure(
          `Unable to set ${value} closed captions`,
          JSON.stringify(response)
        );
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
 * @example fcsSetters.setAudioDescriptionSettings("setEnabled", "true");
 */
const setAudioDescriptionSettings = async (attribute, value) => {
  attribute = attribute ?? 'Enabled'; // Default value
  const requestMap = createRequestMap(`Audiodescriptions.set${attribute}`, value);
  return cy.sendMessagetoPlatforms(requestMap).then(async (response) => {
    try {
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: Response is null or not an object');
      }
      const success = response.hasOwnProperty('result');
      if (success) {
        return await setterSuccess(`Successfully ${value}d closed captions`);
      } else {
        return await setterFailure(
          `Unable to set ${value} closed captions`,
          JSON.stringify(response)
        );
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
  const requestMap = createRequestMap(`Localization.set${attribute}`, value);
  return cy.sendMessagetoPlatforms(requestMap).then(async (response) => {
    try {
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: Response is null or not an object');
      }
      const success = response.hasOwnProperty('result');
      if (success) {
        return await setterSuccess(`Successfully ${value}d closed captions`);
      } else {
        return await setterFailure(
          `Unable to set ${value} closed captions`,
          JSON.stringify(response)
        );
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
      const success = response.hasOwnProperty('result');
      if (success) {
        return await setterSuccess(`Successfully ${value}d closed captions`);
      } else {
        return await setterFailure(
          `Unable to set ${value} closed captions`,
          JSON.stringify(response)
        );
      }
    } catch (error) {
      console.error('Error handling response:', error);
      return await setterFailure('Error occurred while processing the response', error.message);
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
      const success = response.hasOwnProperty('result');
      if (success) {
        return await setterSuccess(`Successfully ${value}d closed captions`);
      } else {
        return await setterFailure(
          `Unable to set ${value} closed captions`,
          JSON.stringify(response)
        );
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
  const requestMap = createRequestMap(`device.audio`, value);
  return cy.sendMessagetoPlatforms(requestMap).then(async (response) => {
    try {
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: Response is null or not an object');
      }
      const success = response.hasOwnProperty('result');
      if (success) {
        return await setterSuccess(`Successfully ${value}d closed captions`);
      } else {
        return await setterFailure(
          `Unable to set ${value} closed captions`,
          JSON.stringify(response)
        );
      }
    } catch (error) {
      console.error('Error handling response:', error);
      return await setterFailure('Error occurred while processing the response', error.message);
    }
  });
};

/**
 * Sets the device HDCP settings.
 * @param {any} value - The value to set.
 * @returns {Promise<any>} A promise that resolves/reject based on the response when the operation is complete.
 * @example fcsSetters.setDeviceHdcp("{"hdcp2.2": true}")
 */
const setDeviceHdcp = async (value) => {
  const requestMap = createRequestMap(`device.hdcp`, value);
  return cy.sendMessagetoPlatforms(requestMap).then(async (response) => {
    try {
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: Response is null or not an object');
      }
      const success = response.hasOwnProperty('result');
      if (success) {
        return await setterSuccess(`Successfully ${value}d closed captions`);
      } else {
        return await setterFailure(
          `Unable to set ${value} closed captions`,
          JSON.stringify(response)
        );
      }
    } catch (error) {
      console.error('Error handling response:', error);
      return await setterFailure('Error occurred while processing the response', error.message);
    }
  });
};

/**
 * Sets the device HDR settings.
 * @param {any} value - The value to set.
 * @returns {Promise<any>} A promise that resolves/reject based on the response when the operation is complete.
 * @example fcsSetters.setDeviceHdr("{"dolbyVision": true}")
 */
const setDeviceHdr = async (value) => {
  const requestMap = createRequestMap(`device.hdr`, value);
  return cy.sendMessagetoPlatforms(requestMap).then(async (response) => {
    try {
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: Response is null or not an object');
      }
      const success = response.hasOwnProperty('result');
      if (success) {
        return await setterSuccess(`Successfully ${value}d closed captions`);
      } else {
        return await setterFailure(
          `Unable to set ${value} closed captions`,
          JSON.stringify(response)
        );
      }
    } catch (error) {
      console.error('Error handling response:', error);
      return await setterFailure('Error occurred while processing the response', error.message);
    }
  });
};

/**
 * Sets the device network settings.
 * @param {any} value - The value to set.
 * @returns {Promise<any>} A promise that resolves/reject based on the response when the operation is complete.
 * @example fcsSetters.setDeviceNetwork("{"state": "connected", "type": "wifi"}")
 */
const setDeviceNetwork = async (value) => {
  const requestMap = createRequestMap(`device.network`, value);
  return cy.sendMessagetoPlatforms(requestMap).then(async (response) => {
    try {
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: Response is null or not an object');
      }
      const success = response.hasOwnProperty('result');
      if (success) {
        return await setterSuccess(`Successfully ${value}d closed captions`);
      } else {
        return await setterFailure(
          `Unable to set ${value} closed captions`,
          JSON.stringify(response)
        );
      }
    } catch (error) {
      console.error('Error handling response:', error);
      return await setterFailure('Error occurred while processing the response', error.message);
    }
  });
};

/**
 * Sets the language.
 * @param {any} value - The value to set.
 * @returns {Promise<any>} A promise that resolves/reject based on the response when the operation is complete.
 * @example fcsSetters.setLanguage("en-US");
 */
const setLanguage = async (value) => {
  const requestMap = createRequestMap(`Localization.setLanguage`, value);
  return cy.sendMessagetoPlatforms(requestMap).then(async (response) => {
    try {
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: Response is null or not an object');
      }
      const success = response.hasOwnProperty('result');
      if (success) {
        return await setterSuccess(`Successfully ${value}d closed captions`);
      } else {
        return await setterFailure(
          `Unable to set ${value} closed captions`,
          JSON.stringify(response)
        );
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
  const requestMap = createRequestMap(`lifecycle.state`, value);
  return cy.sendMessagetoPlatforms(requestMap).then(async (response) => {
    try {
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: Response is null or not an object');
      }
      const success = response.hasOwnProperty('result');
      if (success) {
        return await setterSuccess(`Successfully ${value}d closed captions`);
      } else {
        return await setterFailure(
          `Unable to set ${value} closed captions`,
          JSON.stringify(response)
        );
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
      const success = response.hasOwnProperty('result');
      if (success) {
        return await setterSuccess(`Successfully ${value}d closed captions`);
      } else {
        return await setterFailure(
          `Unable to set ${value} closed captions`,
          JSON.stringify(response)
        );
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
      const success = response.hasOwnProperty('result');
      if (success) {
        return await setterSuccess(`Successfully ${value}d closed captions`);
      } else {
        return await setterFailure(
          `Unable to set ${value} closed captions`,
          JSON.stringify(response)
        );
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
      const success = response.hasOwnProperty('result');
      if (success) {
        return await setterSuccess(`Successfully ${value}d closed captions`);
      } else {
        return await setterFailure(
          `Unable to set ${value} closed captions`,
          JSON.stringify(response)
        );
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
  const requestMap = createRequestMap(`Device.videoResolution`, value);
  return cy.sendMessagetoPlatforms(requestMap).then(async (response) => {
    try {
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: Response is null or not an object');
      }
      const success = response.hasOwnProperty('result');
      if (success) {
        return await setterSuccess(`Successfully ${value}d closed captions`);
      } else {
        return await setterFailure(
          `Unable to set ${value} closed captions`,
          JSON.stringify(response)
        );
      }
    } catch (error) {
      console.error('Error handling response:', error);
      return await setterFailure('Error occurred while processing the response', error.message);
    }
  });
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
  const requestMap = createRequestMap(`VoiceGuidance.set${attribute}`, value);
  return cy.sendMessagetoPlatforms(requestMap).then(async (response) => {
    try {
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: Response is null or not an object');
      }
      const success = response.hasOwnProperty('result');
      if (success) {
        return await setterSuccess(`Successfully ${value}d closed captions`);
      } else {
        return await setterFailure(
          `Unable to set ${value} closed captions`,
          JSON.stringify(response)
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
  const requestMap = createRequestMap(`lifecycle.setState`, value);
  return cy.sendMessagetoPlatforms(requestMap).then(async (response) => {
    try {
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: Response is null or not an object');
      }
      const success = response.hasOwnProperty('result');
      if (success) {
        return await setterSuccess(`Successfully ${value}d closed captions`);
      } else {
        return await setterFailure(
          `Unable to set ${value} closed captions`,
          JSON.stringify(response)
        );
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
  };
};

module.exports = {
  setAdditionalInfo,
  setAudioDescriptionSettings,
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
