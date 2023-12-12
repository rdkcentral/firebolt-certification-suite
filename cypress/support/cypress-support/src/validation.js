import { getAndDeferenceOpenRPC } from './utils';
const JSON_PATH_VALIDATOR = require('jsonpath');
const Validator = require('jsonschema').Validator;

const validator = new Validator();
import errorSchema from '../errorSchema.json';
import { CONSTANTS } from './constants';

export default class Validation {
  constructor(validationModule) {
    this.validationModule = validationModule;
  }

  /**
     * @module validation
     * @function validateSchema
     * @description validate json response string received when invoking <Module.Method>, against corresponding schema
     * @param {string} validationSchemaJSONString - JSON response string
     * @param {string} sdkVersion - SDK version
     * @param {string} openRPCModuleMethod - String containing the Module and Method called as "<Module.Method>" (Ex: accessibility.closedCaptionsSettings)
     * @example
     * validateSchema('{"enabled":true,"styles":{"fontFamily":"Monospace sans-serif","fontSize":1,"fontColor":"#ffffff","fontEdge":"none","fontEdgeColor":"#7F7F7F","fontOpacity":100,"backgroundColor":"#000000","backgroundOpacity":100,"textAlign":"center","textAlignVertical":"middle"}}'
    , "core", "accessibility.closedCaptionsSettings")
     */
  async validateSchema(validationSchemaJSONString, sdkVersion=null, openRPCModuleMethod) {
    let deSchemaList;
    const response = { status: true, message: '', schemaValidationResult: '', schemaMap: '' };
    if (!validationSchemaJSONString || !openRPCModuleMethod) {
      response.status = false;
      response.message = 'Either json string or module method cannot be empty';
      response.schemaValidationResult = ''
      response.schemaMap = ''
      return response;
    }
    try {
      deSchemaList = await getAndDeferenceOpenRPC();
    } catch (error) {
      response.status = false;
      response.message =
        'Following error occurred while dereferencing schema - ' + JSON.stringify(error);
      response.schemaValidationResult = ''
      response.schemaMap = ''
      return response;
    }
    // extracting schema for <Module.Method> and perform validation
    for (
      let methodIndex = 0;
      deSchemaList !== undefined && methodIndex < deSchemaList.methods.length;
      methodIndex++
    ) {
      const methodsArray = deSchemaList.methods;
      const methodObject = methodsArray.find((obj) => {
        return (obj.name).toLowerCase() === openRPCModuleMethod.toLowerCase();
      });
      const schemaMap = methodObject.result.schema;
      const schemaValidationResult = validator.validate(
        JSON.parse(validationSchemaJSONString),
        schemaMap
      );
      response.schemaValidationResult = schemaValidationResult
      response.schemaMap = schemaMap
      if (JSON.stringify(schemaValidationResult.errors) === '[]') {
        return response;
      } else {
        response.status = false;
        response.message =
          'Following error received during schema validation - ' +
          JSON.stringify(schemaValidationResult.errors);
        response.schemaValidationResult = ''
        response.schemaMap = ''
        return response;
      }
    }
  }

   /*
   * @module validation
   * @function errorSchemaCheck
   * @description Validate error against error schema
   * @param {Object} err - error
   * @example
   * cy.errorSchemaCheck(err)
   */
  errorSchemaCheck(err) {
    let schemaValidationResult;
    if (errorSchema) {
      schemaValidationResult = validator.validate(err, errorSchema);
    }
    return schemaValidationResult;
  }
  
  /*
   * @module validation
   * @function formatResultAfterSchemaValidation
   * @description Format result with the fields required to be sent back to publisher
   * @param {String} task - Task/Handler name provided in incoming message that needs to be sent to subscriber to perform corresponding function
   * @param {Object} response - Response 
   * @param {Object} err - Error
   * @param {Object} schemaValidationResult - Result obtained on validating response with corresponding schema map
   * @param {Object} params - params
   * @param {Object} schemaMap - Schema map
   * @example
   * cy.formatResultAfterSchemaValidation(task, response, err, schemaValidationResult, params, schemaMap)
   */
  formatResultAfterSchemaValidation(task, response, err, schemaValidationResult, params, schemaMap) {
    let apiResponse, responseCode, schemaValidationStatus;
    if (err) {
      apiResponse = { result: null, error: err };
      schemaValidationResult = this.errorSchemaCheck(err);
      if (schemaValidationResult && schemaValidationResult.errors && schemaValidationResult.errors.length > 0) {
        if (err.message != undefined && CONSTANTS.ERROR_LIST.includes(err.message)) {
          responseCode = CONSTANTS.STATUS_CODE[3];
          schemaValidationStatus = CONSTANTS.SCHEMA_VALIDATION_STATUS_CODE[1];
        } else {
          responseCode = CONSTANTS.STATUS_CODE[1];
          schemaValidationStatus = CONSTANTS.SCHEMA_VALIDATION_STATUS_CODE[1];
        }
      } else {
        if (err.message != undefined && CONSTANTS.ERROR_LIST.includes(err.message)) {
          responseCode = CONSTANTS.STATUS_CODE[3];
          schemaValidationStatus = CONSTANTS.SCHEMA_VALIDATION_STATUS_CODE[0];
        } else {
          responseCode = CONSTANTS.STATUS_CODE[0];
          schemaValidationStatus = CONSTANTS.SCHEMA_VALIDATION_STATUS_CODE[0];
        }
      }
    } else {
      if (response == undefined || (schemaValidationResult && schemaValidationResult.errors && schemaValidationResult.errors.length > 0)) {
        // Handling expected null scenarios from Open RPC
        if (response === null && schemaMap && (Object.values(schemaMap).includes('null') || Object.values(schemaMap).includes(null) || findTypeInOneOF(schemaMap))) {
          apiResponse = { result: response, error: null };
          responseCode = CONSTANTS.STATUS_CODE[0];
          schemaValidationStatus = CONSTANTS.SCHEMA_VALIDATION_STATUS_CODE[0];
        } else if (schemaMap == undefined) {
          apiResponse = { result: response, error: null };
          responseCode = CONSTANTS.STATUS_CODE[0];
          schemaValidationStatus = CONSTANTS.SCHEMA_VALIDATION_STATUS_CODE[0];
        } else if (response == undefined) {
          apiResponse = { result: null, error: 'undefined' };
          responseCode = CONSTANTS.STATUS_CODE[2];
          schemaValidationStatus = CONSTANTS.SCHEMA_VALIDATION_STATUS_CODE[2];
        } else {
          apiResponse = { result: response, error: null };
          responseCode = CONSTANTS.STATUS_CODE[1];
          schemaValidationStatus = CONSTANTS.SCHEMA_VALIDATION_STATUS_CODE[1];
        }
      } else {
        apiResponse = { result: response, error: null };
        responseCode = CONSTANTS.STATUS_CODE[0];
        schemaValidationStatus = CONSTANTS.SCHEMA_VALIDATION_STATUS_CODE[0];
      }
    }

    return {
      method: task,
      params: params,
      responseCode: responseCode,
      apiResponse: apiResponse,
      schemaValidationStatus: schemaValidationStatus,
      schemaValidationResponse: schemaValidationResult,
    };
  }
  
  /*
   * @module validation
   * @function validateJSON
   * @description validate given jsonpath from the string.
   * @param {*} jsonString - json string
   * @param {*} jsonPath - json query path to get validate data from json string
   * @example
   * cy.validateJSON('[{"name": "London", "population": 8615246 }, { "name": "Berlin", "population": 3517424 }]', "$..name")
   */
  validateJSON(jsonString, jsonPath) {
    // setting default response to response, it may change in case of failure
    const response = { status: true, message: '' };
    if (!jsonString || !jsonPath) {
      response.status = false;
      response.message = 'Either json string or json path cannot be empty';
      return response;
    }
    const queryResponseArray = JSON_PATH_VALIDATOR.query(jsonString, jsonPath);
    console.log('jsonpath response: ', queryResponseArray);
    if (queryResponseArray.length === 0) {
      response.status = false;
      response.message = 'Invalid JSON Path: ' + jsonPath;
    }
    return response;
  }

  /**
   * @module validation
   * @function validateCustom
   * @description validate custom method inside module and return the response
   * @param {*} jsonString - should contain json string
   * @param {*} openRPCModuleMethod - should be Firebolt Module and Method as "<Module.Method>"
   * @param {*} customValidatorName - name of a custom validator.
   * @example
   * validateCustom("<JSON>", "Module.Method", "validationOne")
   */
  validateCustom(jsonString, openRPCModuleMethod, customValidatorName) {
    const response = { status: false, message: '' };
    // If validation module is invalid or absent
    if (
      this.validationModule === null ||
      this.validationModule === undefined ||
      !this.validationModule
    ) {
      response.message = 'Invalid validation module. Pass an appropriate validation module';
      return response;
    }
    // openRPC method format <module>.<method>
    const openRPCModuleMethodArray = openRPCModuleMethod.split('.');
    if (openRPCModuleMethodArray.length !== 2) {
      response.message = "Invalid module/method. Expected format '<Module.Method>'";
      return response;
    }
    const moduleName = openRPCModuleMethodArray[0];
    const methodName = openRPCModuleMethodArray[1];
    const getModule = this.validationModule[moduleName];
    if (getModule) {
      // check if method name exists and get custom functions inside given method
      const getValidatorFunction = getModule[methodName];
      if (getValidatorFunction) {
        // check if validator name exists and is a function.
        const getMethodFn = getValidatorFunction[customValidatorName];
        if (getMethodFn) {
          response.status = getMethodFn(jsonString);
          if (response.status === false) {
            response.message = 'Validation Failed';
          }
          // return false with messge if response is false, else return true
          return response;
        }
        response.message = `Validator ${customValidatorName} not found`;
        return response;
      }
      response.message = `Method ${methodName} not found`;
    } else {
      response.message = `Module ${moduleName} not found`;
    }
    return response;
  }
}
