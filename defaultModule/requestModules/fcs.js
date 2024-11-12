const CONSTANTS = require("../constants/constants");
const UTILS = require("../utils/utils");
const axios = require('axios');

/**
 * @module fcs
 * @function fetchEventResponse
 * @description Sending values to systemUI to fecth the event response
 * @param {Object} parsedParam - Params that needs to be sent to systemUI to fetch the event response
 * @example
 * fetchEventResponse({method: 'fcs.fetchEventResponse', params: 'closedcaptions.onBackgroundColorChanged-61'})
 **/
function fetchEventResponse(parsedParam) {
  if (Cypress.env(CONSTANTS.PLATFORM_COMMUNICATION) == CONSTANTS.LINCHPIN) {
    const params = { event: parsedParam.params };
    // Creating intent message to send it to platform
    const intentMessage = UTILS.createIntentMessage(
      CONSTANTS.TASK.GET_EVENT_RESPONSE,
      params
    );
    // returning an object with intent message and transport type.
    return UTILS.createLinchpinResponse(intentMessage);
  } else {
    const responseMap = Cypress.env(CONSTANTS.EVENT_RESPONSE_MAP);
    if (responseMap && responseMap.has(parsedParam.params)) {
      result = responseMap.get(parsedParam.params);
      return result.listenerResponse;
    } else {
      return parsedParam;
    }
  }
}

/**
 * @module fcs
 * @function clearEventListeners
 * @description Sending the event name to platform to clear the event listeners.
 * @param {Object} parsedParam - Params that needs to be sent to App(Ex: methodName and params to invoke)
 * @example
 * clearEventListeners({"method": "fcs.clearEventListeners","params":{"event": "accessibility.onClosedCaptionsSettingsChanged"}})
 **/
function clearEventListeners(clearEventObject) {
  // check all module, method and parameter are passed.
  if (!clearEventObject || !clearEventObject.params || !clearEventObject.params.event) {
    throw Error(
      'Incoming Event object needs to include params field and event name should be present inside params'
    );
  }

  const params = { event: clearEventObject.params.event };
  const additionalParams = { action: action };
  // Creating intent message to send it to platform
  const intentMessage = UTILS.createIntentMessage(
    CONSTANTS.TASK.CLEAREVENTHANDLER,
    params,
    additionalParams
  );
  // returning an object with intent message and transport type.
  return UTILS.createLinchpinResponse(intentMessage);
}

/** 
 * @function setLifecycleState
 * @description Sending the message to platform to set lifecycle state of application
 * @param {Object} parsedParam - Params that are used to create intent message
 * @example
 * setLifecycleState("method": "fcs.setLifecycleState","params": {state: background, appId: test.test.test}})
 **/
function setLifecycleState(parsedData) {
  if (
    !parsedData ||
    !parsedData.params ||
    !parsedData.params.appId ||
    !parsedData.params.state
  ) {
    cy.log("Request to set lifecycle state is invalid").then(() => {
      assert(false, "Request to set lifecycle state is invalid");
    });
    return false;
  }

  currentFeatureFile = JSON.stringify(window.testState.gherkinDocument.feature.name)
  if (currentFeatureFile.includes("Discovery.Launch") || currentFeatureFile.includes("Discovery.launch")) {
    fireLog(CONSTANTS.AS_CALL_REQUIRED).then(() => {
      throw new Error("Step implementation missing");
    });
  }

  let state = parsedData.params.state;
  let appId = parsedData.params.appId;
  let params,
    additionalParams,
    publishMessage;
  try {
    switch (state) {
      case "background":
        if (Cypress.env(CONSTANTS.PLATFORM_COMMUNICATION) === CONSTANTS.LINCHPIN) {
          params = {
            keyCode: ['home']
          };
          publishMessage = UTILS.createIntentMessage(
            CONSTANTS.TASK.KEY_PRESS_HANDLER,
            params
          );
          cy.log(`Pressing '${params.keyCode}' button to transition app to background`)
          return UTILS.createLinchpinResponse(publishMessage);
        }
        else {
          cy.log(`ConfigModule: Implementation Pending: ${state}`)
          throw new Error(CONSTANTS.STEP_IMPLEMENTATION_MISSING);
        }

      case "inactive":
        if (Cypress.env(CONSTANTS.TEST_TYPE).toLowerCase() == CONSTANTS.LIFECYCLE) {
          let appObject = Cypress.env(appId);
          appObject.setAppObjectState(CONSTANTS.LIFECYCLE_STATES.BACKGROUND);
        }
        if (Cypress.env(CONSTANTS.PLATFORM_COMMUNICATION) === CONSTANTS.LINCHPIN) {
          const requestTopic = UTILS.getTopic(appId);
          const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);
          params = {
            [CONSTANTS.METHOD_NAME]: CONSTANTS.LIFECYCLE_CLOSE,
            [CONSTANTS.APP_TYPE]: CONSTANTS.FIREBOLT,
            [CONSTANTS.METHOD_PARAMS]: CONSTANTS.LIFECYCLE_CLOSE_PARAM
          };
          additionalParams = { [CONSTANTS.COMMUNICATION_MODE]: UTILS.getCommunicationMode() };
          publishMessage = UTILS.createIntentMessage(
            CONSTANTS.TASK.CALLLIFECYCLE,
            params,
            additionalParams
          );
          cy.log(CONSTANTS.LIFECYCLE_INTENT + JSON.stringify(publishMessage));
          cy.sendMessagetoApp(requestTopic, responseTopic, publishMessage).then((response) => {
            if (response == null) {
              cy.log(CONSTANTS.FAILED_TO_SET_LIFECYCLE_STATE + JSON.stringify(response))
              assert(false, CONSTANTS.FAILED_TO_SET_LIFECYCLE_STATE + JSON.stringify(response));
              return false;
            }
            cy.lifecycleSchemaChecks(response);
          });
        }
        else {
          const socket = new WebSocket(`ws://${Cypress.env(CONSTANTS.DEVICE_IP)}:3474?appId=${Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID)}`);
          socket.onopen = (event) => {
            let data = JSON.stringify({ "jsonrpc": "2.0", "id": 1, "method": "Lifecycle.close", "params": { "reason": "remoteButton" } })
            socket.send(data);
            socket.close;
          }
        }
        break;
      case "suspended":
        cy.log(`ConfigModule: Implementation Pending: ${state}`)
        throw new Error(CONSTANTS.STEP_IMPLEMENTATION_MISSING);

      default:
        break;
    }
  } catch (error) {
    cy.log(
      `Failed to set lifecycle state: ${error}`
    ).then(() => {
      assert(
        false,
        "Failed to set lifecycle state due to following error: " + error
      );
    });
    return false;
  }
  return true;
}

/**
 * @module fcs
 * @function unloadApp
 * @description UnloadApp
 * @param {String} appId - appId which is to be unloaded
 * unloadApp('testAppId')
 **/
function unloadApp(appId) {
  fireLog.info("No Implementation found to unload app. AppId: " + appId + " not unloaded.")
  fireLog.info(CONSTANTS.CONFIG_IMPLEMENTATION_MISSING).then(() => {
    throw new Error(CONSTANTS.CONFIG_IMPLEMENTATION_MISSING);
  });
}

/**
 * @module fcs
 * @function dismissApp
 * @description dismissApp
 * @param {String} appId - appId which is to be dismissed
 * dismissApp('testAppId')
 **/
function dismissApp(appId) {
  fireLog.info("No Implementation found to dismiss app. AppId: " + appId + " not dismissed.")
  fireLog.info(CONSTANTS.CONFIG_IMPLEMENTATION_MISSING).then(() => {
    throw new Error(CONSTANTS.CONFIG_IMPLEMENTATION_MISSING);
  });
}

/**
 * @module fcs
 * @function closeApp
 * @description closeApp
 * @param {Object} request - request body containing method and appId which is to be closed
 * closeApp("method": "fcs.closeApp","params": "test.test.test")
 **/
function closeApp(request) {
  const appId = request.params
  const requestTopic = UTILS.getTopic(appId);
  const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);

  const communicationMode = UTILS.getCommunicationMode();
  additionalParams = {
    communicationMode: communicationMode,
    action: 'Lifecycle.validation',
  };
  const params = {
    mode: 'Lifecycle.validation',
    methodName: 'Lifecycle.close',
    methodParams: { reason: CONSTANTS.USER_EXIT_REASON },
  };
  const intentMessage = UTILS.createIntentMessage(
    CONSTANTS.TASK.RUNTEST,
    params,
    additionalParams
  );
  cy.log(
    'Sending lifecycle close method to close app, method: ' +
    params.methodName +
    ' params: ' +
    JSON.stringify(params.methodParams)
  );
  try {
    cy.sendMessagetoApp(requestTopic, responseTopic, intentMessage).then((response) => {
      let result;
      try {
        response = JSON.parse(response);
        result = response.report.result;
        fireLog.info(
          'Received response from app to acknowledge close request. Response: ' +
            JSON.stringify(response)
        );
      } catch {
        result = response;
      }
    if (result === CONSTANTS.NO_RESPONSE || result === null) {
      fireLog.info('App closed successfully');
    } else {
      fireLog.info(
        false,
        'App may have failed to close.');
    }
    cy.wait(5000);
  });
      } catch (error) {
    fireLog.info('Failed to close the 3rd party app: ', error);
  }
}

/** 
 * @function fetchDeviceDetails
 * @description Fetching the device details dynamically from titan api
 * @param {Object} deviceId - contains deviceId to extract required data
 * @example
 * fetchDeviceDetails("method": "fcs.fetchDeviceDetails","params": <device-id>)
 **/

function fetchDeviceDetails(deviceId) {
  deviceId = deviceId.params;

  let satTokenUrl = CONSTANTS.TITAN_SAT_URL;
  let satClient = Cypress.env(CONSTANTS.ENV_SAT_CLIENT);
  let satSecret = Cypress.env(CONSTANTS.ENV_SAT_SECRET);
  let deviceDetailsUrl = CONSTANTS.TITAN_SAT_DEVICEDATA_URL;
  let deviceMac = Cypress.env(CONSTANTS.DEVICE_MAC);

  getDeviceDetailsDynamically(
    satTokenUrl,
    satClient,
    satSecret,
    deviceDetailsUrl,
    deviceMac
  ).then((deviceData) => {
    let extractedData = {};
    const activeDevicedata = [];
    // if deviceData is fetched successfully, extract the required data
    if (deviceData) {
      // if length == 1 && status == active then store it and out

      if (deviceData.length == 1 && deviceData[0].data.status == "Active") {
        extractedData.DEVICEID = deviceData[0].id;
        extractedData.DEVICE_TYPE = deviceData[0].data.deviceType;
        extractedData.ACCOUNTID = deviceData[0].data.serviceAccountId;
        extractedData.DEVICE_DISTRIBUTOR = deviceData[0].data.partner;
        extractedData.DEVICE_SKU = deviceData[0].data.model;
      } else if (
        deviceData.length == 1 &&
        deviceData[0].data.status != "Active"
      ) {
        // if length == 1 && status != active then out
        fireLog.info(`No active device found`);
      } else if (deviceData.length > 1) {
        for (let i = 0; i < deviceData.length; i++) {
          if (deviceData[i].data.status == "Active") {
            activeDevicedata.push(deviceData[i]);
          }
        }
        // if length > 1 && only one status == active then store it and out
        if (activeDevicedata.length == 1) {
          extractedData.DEVICEID = activeDevicedata[0].id;
          extractedData.DEVICE_TYPE = activeDevicedata[0].data.deviceType;
          extractedData.ACCOUNTID = activeDevicedata[0].data.serviceAccountId;
          extractedData.DEVICE_DISTRIBUTOR = activeDevicedata[0].data.partner;
          extractedData.DEVICE_SKU = activeDevicedata[0].data.model;
        } else if (activeDevicedata.length > 1) {
          for (let i = 0; i < activeDevicedata.length; i++) {
            // if length > 1 && more than one status == active then call device.id
            if (activeDevicedata[i].id == deviceId) {
              extractedData.DEVICEID = activeDevicedata[i].id;
              extractedData.DEVICE_TYPE = activeDevicedata[i].data.deviceType;
              extractedData.ACCOUNTID =
                activeDevicedata[i].data.serviceAccountId;
              extractedData.DEVICE_DISTRIBUTOR =
                activeDevicedata[i].data.partner;
              extractedData.DEVICE_SKU = activeDevicedata[i].data.model;
            }
          }
        }
      }
    } else {
      fireLog.info(`No device data`);
    }
    if (
      Cypress.env(CONSTANTS.DEVICE_DATA) == undefined ||
      Cypress.env(CONSTANTS.DEVICE_DATA) == null
    ) {
      Cypress.env(CONSTANTS.DEVICE_DATA, {});
    }
    for (let key in extractedData) {
      Cypress.env(CONSTANTS.DEVICE_DATA)[key] = extractedData[key];
    }

    return Cypress.env(CONSTANTS.DEVICE_DATA);
  });
}

/**
 * @function getDeviceDetailsDynamically 
 * @description Fetch device details and the token required for fetching details dynamically 
 * @param {String} satTokenUrl - url required for fetching sat token
 * @param {String} satClient - sat cliend id required for fetching sat token
 * @param {String} satSecret - sat cliend secret required for fetching sat token
 * @param {String} deviceDetailsUrl - url required for fetching device data 
 * @param {String} deviceMac - macId of the device 

 *  * @example
 * getDeviceDetailsDynamically(`<token-url>`, `<satClient>, `<satSecret>`, `<device-details-url>`, `<mac>`)
 **/
async function getDeviceDetailsDynamically(
  satTokenUrl,
  satClient,
  satSecret,
  deviceDetailsUrl,
  deviceMac) {

  //get sat token
  let satToken;
  let response;
  if (satTokenUrl && satClient && satSecret) {
    try {
      response = await axios.get(satTokenUrl, {
        headers: {
          Accept: "application/json",
          "X-Client-Id": satClient,
          "X-Client-Secret": satSecret,
        },
      });
    } catch (error) {
      fireLog.info(`Error getting access token: ${error}`);
    }
    satToken = response.data.serviceAccessToken;
  } else {
    fireLog.info(`Invalid satClient or satSecret`);
  }

  // get device details
  let deviceData;
  if (deviceMac) {
    deviceMac = deviceMac.replace(/(..)/g, "$1:").slice(0, -1);
    try {
      deviceData = await axios.get(deviceDetailsUrl, {
        params: {
          hostMac: deviceMac,
        },
        headers: {
          Authorization: `Bearer ${satToken}`,
        },
      });
    } catch (error) {
      fireLog.info(`Error getting device data : ${error}`);
    }
    return deviceData.data;
  } else {
    fireLog.info(`Invalid deviceMac`);
  }
}

/**
 * @module performance
 * @function setFireboltInteractionsHandler
 * @description Sending the message to platform (eg : bolt extension) to call designated handler to start or stop listening to firebolt interactions
 * @param {Object} parsedParam - Params used to create intent message
 * @example
 * setFireboltInteractionsHandler({"method": "fcs.setFireboltInteractionsHandler","params": {trigger: start, optionalParams: ''}, "task": "fireboltInteractionsHandler"})
 **/
function setFireboltInteractionsHandler(parsedData) {
  if (!parsedData || !parsedData.params || !parsedData.task) {
    throw Error("Incoming firebolt interactions handler request is invalid");
  }
  const additionalParams = {
    communicationMode: "transport",
    appType: "fbInteractions",
  };
  const publishMessage = UTILS.createIntentMessage(
    parsedData.task,
    parsedData.params,
    additionalParams
  );
  return UTILS.createLinchpinResponse(publishMessage);
}

/**
 * @module fcs
 * @function screenshot
 * @description Sending the message to platform to capture the screenshot result.
 * @param {Object} requestParams - Validation objects to validate the screenshot response
 * @example
 * screenshot({ method: 'fcs.screenshot', "params": { addToReport: true, validations:: []}})
 **/
function screenshot(requestParams) {
  if (Cypress.env(CONSTANTS.PLATFORM_COMMUNICATION) === CONSTANTS.LINCHPIN) {
    Cypress.env(CONSTANTS.SCREENSHOT_VALIDATION_OBJECT, requestParams.params);
    const additionalParams = {
      communicationMode: CONSTANTS.HTTP,
      appType: "screenCapture",
    };
    let optionalParams = `${CONSTANTS.x_firebolt_testtoken}:${Cypress.env('testToken')},x-firebolt-jobid:${Cypress.env('jobId')},x-firebolt-reporttype:${Cypress.env('reportType')}`;
    const url = `http://${Cypress.env(CONSTANTS.DEVICE_IP)}:5800/screenshot.png`
    let params = UTILS.createIntentMessageParams(
      CONSTANTS.SCREENSHOT_PNG,
      null,
      null,
      CONSTANTS.GET,
      CONSTANTS.PORT_5800,
      optionalParams
    );

    const publishMessage = UTILS.createIntentMessage(CONSTANTS.TASK.CALL_HTTP_METHOD, params, additionalParams);
    cy.log('Request override for screenCapture :: Sending AS call ' + url);
    return UTILS.createLinchpinResponse(publishMessage);
  } else {
    throw new Error("Implementation pending for websocket communication");
  }
}

module.exports = {
  fetchEventResponse,
  setLifecycleState,
  unloadApp,
  closeApp,
  dismissApp,
  setFireboltInteractionsHandler,
  fetchDeviceDetails,
  clearEventListeners,
  screenshot,
};
