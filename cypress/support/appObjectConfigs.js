class apiObject {
  constructor(apiName, params, context, response, expected, appId) {
    this.apiName = apiName;
    this.params = params;
    this.context = context;
    this.expected = expected;
    response.apiResponse ? (this.response = response.apiResponse) : (this.response = response);
    this.apiSchemaResult = {
      validationStatus: response.schemaValidationStatus,
      validationResponse: response.schemaValidationResponse,
    };
    this.app = appId;
  }
}

class eventObject {
  constructor(eventName, params, context, response, appId, expectedResult) {
    console.log('constructor in eventConfig class');
    this.eventName = eventName;
    this.params = params;
    this.context = context;
    this.eventListenerResponse = response.eventListenerResponse;
    this.eventListenerSchemaResponse = response.eventListenerSchemaResult;
    this.eventObjectId = response.eventListenerId;
    this.expectedResult = expectedResult;
    this.eventResponse = null;
    this.eventSchemaResult = null;
    this.eventTime = null;
    this.app = appId;
  }

  setEventResponseData(response) {
    if ((response.eventListenerId && response.eventSchemaResult) || response.eventResponse) {
      this.eventResponse = response.eventResponse;
      this.eventSchemaResult = response.eventSchemaResult;
      this.eventTime = response.eventTime;
    } else {
      assert(false, 'Event Response should be defined');
    }
  }
}

export { apiObject, eventObject };
