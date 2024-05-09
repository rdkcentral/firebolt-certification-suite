/**
 * Copyright 2024 Comcast Cable Communications Management, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import Validation from '../../src/validation';
import * as utils from '../../src/utils';
const logger = require('../../../Logger')('schema.test.js');

jest.mock('../../src/utils', () => ({
  getAndDeferenceOpenRPC: jest.fn(),
}));

describe('test validateSchema', () => {
  let validation;

  beforeEach(() => {
    validation = new Validation();
  });

  it('should handle invalid JSON string', async () => {
    // Mocking the getAndDeferenceOpenRPC function to resolve successfully
    utils.getAndDeferenceOpenRPC.mockResolvedValue({
      methods: [
        {
          name: 'accessibility.closedCaptionsSettings',
          result: {
            schema: {
              type: 'object',
              properties: {
                enabled: { type: 'boolean' },
                styles: { type: 'object' },
              },
              required: ['enabled', 'styles'],
            },
          },
        },
      ],
    });

    const invalidJSONString = '{"key":"invalid json string"}';
    const sdkVersion = null;
    const openRPCModuleMethod = 'accessibility.closedCaptionsSettings';
    const result = await validation.validateSchema(
      invalidJSONString,
      sdkVersion,
      openRPCModuleMethod
    );

    expect(result.status).toBe(false);
    expect(result.message).toContain('Following error received during schema validation');
    expect(result.schemaValidationResult).toBe('');
    expect(result.schemaMap).toBe('');
  });

  it('should handle missing validJSONString or openRPCModuleMethod', async () => {
    // Mocking the getAndDeferenceOpenRPC function to resolve successfully
    utils.getAndDeferenceOpenRPC.mockResolvedValue({
      methods: [
        {
          name: 'accessibility.closedCaptionsSettings',
          result: {
            schema: {
              type: 'object',
              properties: {
                enabled: { type: 'boolean' },
                styles: { type: 'object' },
              },
              required: ['enabled', 'styles'],
            },
          },
        },
      ],
    });

    const validJSONString =
      '{"enabled":true,"styles":{"fontFamily":"Monospace sans-serif","fontSize":1,"fontColor":"#FFFFFF","fontEdge":"none","fontEdgeColor":"#7F7F7F","fontOpacity":100,"backgroundColor":"#000000","backgroundOpacity":100,"textAlign":"center","textAlignVertical":"middle"}}';
    const sdkVersion = null;
    const openRPCModuleMethod = 'accessibility.closedCaptionsSettings';

    // Test with missing validJSONString
    let result = await validation.validateSchema(undefined, sdkVersion, openRPCModuleMethod);
    expect(result.status).toBe(false);
    expect(result.message).toContain('Either json string or module method cannot be empty');
    expect(result.schemaValidationResult).toBe('');
    expect(result.schemaMap).toBe('');

    // Test with missing openRPCModuleMethod
    result = await validation.validateSchema(validJSONString, sdkVersion, undefined);
    expect(result.status).toBe(false);
    expect(result.message).toContain('Either json string or module method cannot be empty');
    expect(result.schemaValidationResult).toBe('');
    expect(result.schemaMap).toBe('');
  });

  it('should validate schema successfully', async () => {
    // Mocking the getAndDeferenceOpenRPC function to resolve successfully
    utils.getAndDeferenceOpenRPC.mockResolvedValue({
      methods: [
        {
          name: 'accessibility.closedCaptionsSettings',
          result: {
            schema: {
              type: 'object',
              properties: {
                enabled: { type: 'boolean' },
                styles: { type: 'object' },
              },
              required: ['enabled', 'styles'],
            },
          },
        },
      ],
    });

    const validationSchemaJSONString =
      '{"enabled":true,"styles":{"fontFamily":"Monospace sans-serif","fontSize":1,"fontColor":"#FFFFFF","fontEdge":"none","fontEdgeColor":"#7F7F7F","fontOpacity":100,"backgroundColor":"#000000","backgroundOpacity":100,"textAlign":"center","textAlignVertical":"middle"}}';
    const sdkVersion = null;
    const openRPCModuleMethod = 'accessibility.closedCaptionsSettings';
    const result = await validation.validateSchema(
      validationSchemaJSONString,
      sdkVersion,
      openRPCModuleMethod
    );

    expect(result.status).toBe(true);
    expect(result.message).toBe('');
    expect(result.schemaValidationResult.errors).toHaveLength(0);
  });

  it('should handle getAndDeferenceOpenRPC error', async () => {
    // Mocking the getAndDeferenceOpenRPC function to reject with an error
    utils.getAndDeferenceOpenRPC.mockRejectedValue(new Error('Dereference error'));

    const validationSchemaJSONString =
      '{"enabled":true,"styles":{"fontFamily":"Monospace sans-serif","fontSize":1,"fontColor":"#FFFFFF","fontEdge":"none","fontEdgeColor":"#7F7F7F","fontOpacity":100,"backgroundColor":"#000000","backgroundOpacity":100,"textAlign":"center","textAlignVertical":"middle"}}';
    const sdkVersion = null;
    const openRPCModuleMethod = 'accessibility.closedCaptionsSettings';
    const result = await validation.validateSchema(
      validationSchemaJSONString,
      sdkVersion,
      openRPCModuleMethod
    );

    expect(result.status).toBe(false);
    expect(result.message).toContain('Following error occurred while dereferencing schema');
    expect(result.schemaValidationResult).toBe('');
    expect(result.schemaMap).toBe('');
  });
});

describe('test formatResultAfterSchemaValidation', () => {
  let task;
  let response;
  let err;
  let schemaValidationResult;
  let params;
  let schemaMap;
  let result;
  let expectedResponse;
  let validation;

  beforeEach(() => {
    validation = new Validation();
    task = 'mockTask';
    response = null;
    err = null;
    schemaValidationResult = null;
    params = { mockParams: 'mockValue' };
    schemaMap = {
      type: 'string',
    };
    expectedResponse = null;
  });

  it('should return status code 3 with Schema Validation status PASS - err in pending list, valid format', () => {
    // testing for method not found
    err = { code: -123, message: 'Method not found' };
    let expectedResponse = {
      method: task,
      params: params,
      responseCode: 3,
      apiResponse: { result: response, error: err },
      schemaValidationStatus: 'PASS',
      schemaValidationResponse: {
        instance: err,
        schema: {
          oneOf: [
            {
              type: 'object',
              properties: { code: { type: 'number' }, message: { type: 'string' } },
              required: ['code', 'message'],
            },
            { type: 'string' },
          ],
        },
        options: {},
        path: [],
        propertyPath: 'instance',
        errors: [],
        disableFormat: false,
      },
    };
    let result = validation.formatResultAfterSchemaValidation(
      task,
      response,
      err,
      schemaValidationResult,
      params,
      schemaMap
    );
    logger.info(expect.getState().currentTestName + ' : ' + JSON.stringify(result));
    expect(result).toEqual(expectedResponse);

    // testing for Method Not Implemented
    err = { code: -123, message: 'Method Not Implemented' };
    expectedResponse = {
      method: task,
      params: params,
      responseCode: 3,
      apiResponse: { result: response, error: err },
      schemaValidationStatus: 'PASS',
      schemaValidationResponse: {
        instance: err,
        schema: {
          oneOf: [
            {
              type: 'object',
              properties: { code: { type: 'number' }, message: { type: 'string' } },
              required: ['code', 'message'],
            },
            { type: 'string' },
          ],
        },
        options: {},
        path: [],
        propertyPath: 'instance',
        errors: [],
        disableFormat: false,
      },
    };
    result = validation.formatResultAfterSchemaValidation(
      task,
      response,
      err,
      schemaValidationResult,
      params,
      schemaMap
    );
    logger.info(expect.getState().currentTestName + ' : ' + JSON.stringify(result));
    expect(result).toEqual(expectedResponse);
  });

  it('should return status code 3 with Schema Validation status FAIL - err in pending list, invalid format', () => {
    // testing for error not in expected format
    err = { code: 'mockError', message: 'Method Not Implemented' };
    expectedResponse = {
      method: task,
      params: params,
      responseCode: 3,
      apiResponse: { result: response, error: err },
      schemaValidationStatus: 'FAIL',
      schemaValidationResponse: {
        instance: err,
        schema: {
          oneOf: [
            {
              type: 'object',
              properties: { code: { type: 'number' }, message: { type: 'string' } },
              required: ['code', 'message'],
            },
            { type: 'string' },
          ],
        },
        options: {},
        path: [],
        propertyPath: 'instance',
        errors: [
          {
            path: [],
            property: 'instance',
            message: 'is not exactly one from [subschema 0],[subschema 1]',
            schema: {
              oneOf: [
                {
                  type: 'object',
                  properties: { code: { type: 'number' }, message: { type: 'string' } },
                  required: ['code', 'message'],
                },
                { type: 'string' },
              ],
            },
            instance: { code: 'mockError', message: 'Method Not Implemented' },
            name: 'oneOf',
            argument: ['[subschema 0]', '[subschema 1]'],
            stack: 'instance is not exactly one from [subschema 0],[subschema 1]',
          },
        ],
        disableFormat: false,
      },
    };
    result = validation.formatResultAfterSchemaValidation(
      task,
      response,
      err,
      schemaValidationResult,
      params,
      schemaMap
    );
    logger.info(expect.getState().currentTestName + ' : ' + JSON.stringify(result));
    expect(result).toEqual(expectedResponse);
  });

  it('should return status code 1 with Schema Validation status FAIL - err invalid format', () => {
    // testing for error not in expected format
    err = { code: 'mockError', message: 'some error' };
    expectedResponse = {
      method: task,
      params: params,
      responseCode: 1,
      apiResponse: { result: response, error: err },
      schemaValidationStatus: 'FAIL',
      schemaValidationResponse: {
        instance: err,
        schema: {
          oneOf: [
            {
              type: 'object',
              properties: { code: { type: 'number' }, message: { type: 'string' } },
              required: ['code', 'message'],
            },
            { type: 'string' },
          ],
        },
        options: {},
        path: [],
        propertyPath: 'instance',
        errors: [
          {
            path: [],
            property: 'instance',
            message: 'is not exactly one from [subschema 0],[subschema 1]',
            schema: {
              oneOf: [
                {
                  type: 'object',
                  properties: { code: { type: 'number' }, message: { type: 'string' } },
                  required: ['code', 'message'],
                },
                { type: 'string' },
              ],
            },
            instance: { code: 'mockError', message: 'some error' },
            name: 'oneOf',
            argument: ['[subschema 0]', '[subschema 1]'],
            stack: 'instance is not exactly one from [subschema 0],[subschema 1]',
          },
        ],
        disableFormat: false,
      },
    };
    result = validation.formatResultAfterSchemaValidation(
      task,
      response,
      err,
      schemaValidationResult,
      params,
      schemaMap
    );
    logger.info(expect.getState().currentTestName + ' : ' + JSON.stringify(result));
    expect(result).toEqual(expectedResponse);
  });

  it('should return status code 0 with Schema Validation status PASS - err valid format', () => {
    // testing for error not in expected format
    err = { code: -123, message: 'some error' };
    expectedResponse = {
      method: task,
      params: params,
      responseCode: 0,
      apiResponse: { result: response, error: err },
      schemaValidationStatus: 'PASS',
      schemaValidationResponse: {
        instance: err,
        schema: {
          oneOf: [
            {
              type: 'object',
              properties: { code: { type: 'number' }, message: { type: 'string' } },
              required: ['code', 'message'],
            },
            { type: 'string' },
          ],
        },
        options: {},
        path: [],
        propertyPath: 'instance',
        errors: [],
        disableFormat: false,
      },
    };
    result = validation.formatResultAfterSchemaValidation(
      task,
      response,
      err,
      schemaValidationResult,
      params,
      schemaMap
    );
    logger.info(expect.getState().currentTestName + ' : ' + JSON.stringify(result));
    expect(result).toEqual(expectedResponse);
  });

  it('should return status code 0 with Schema Validation status PASS - valid response format', () => {
    // testing for method not found
    response = 'expectedResponse';
    schemaValidationResult = {
      instance: response,
      schema: { type: 'string' },
      options: {},
      path: [],
      propertyPath: 'instance',
      errors: [],
      disableFormat: false,
    };
    const expectedResponse = {
      method: task,
      params: params,
      responseCode: 0,
      apiResponse: { result: response, error: err },
      schemaValidationStatus: 'PASS',
      schemaValidationResponse: schemaValidationResult,
    };
    const result = validation.formatResultAfterSchemaValidation(
      task,
      response,
      err,
      schemaValidationResult,
      params,
      schemaMap
    );
    logger.info(expect.getState().currentTestName + ' : ' + JSON.stringify(result));
    expect(result).toEqual(expectedResponse);
  });

  it('should return status code 0 with Schema Validation status PASS - valid null response', () => {
    // testing for error not in expected format
    response = null;
    schemaMap = {
      type: null,
    };
    schemaValidationResult = {
      instance: response,
      schema: schemaMap,
      options: {},
      path: [],
      propertyPath: 'instance',
      errors: [],
      disableFormat: false,
    };
    expectedResponse = {
      method: task,
      params: params,
      responseCode: 0,
      apiResponse: { result: response, error: err },
      schemaValidationStatus: 'PASS',
      schemaValidationResponse: schemaValidationResult,
    };
    result = validation.formatResultAfterSchemaValidation(
      task,
      response,
      err,
      schemaValidationResult,
      params,
      schemaMap
    );
    logger.info(expect.getState().currentTestName + ' : ' + JSON.stringify(result));
    expect(result).toEqual(expectedResponse);
  });

  it('should return status code 2 with Schema Validation status SKIPPED - response is undefined but schema is not null', () => {
    // testing for error not in expected format
    response = undefined;
    const expectedResponse = {
      method: task,
      params: params,
      responseCode: 2,
      apiResponse: { result: null, error: 'undefined' },
      schemaValidationStatus: 'SKIPPED',
      schemaValidationResponse: null,
    };
    result = validation.formatResultAfterSchemaValidation(
      task,
      response,
      err,
      schemaValidationResult,
      params,
      schemaMap
    );
    logger.info(expect.getState().currentTestName + ' : ' + JSON.stringify(result));
    expect(result).toEqual(expectedResponse);
  });

  it('should return status code 1 with Schema Validation status FAIL - response invalid format', () => {
    // testing for error not in expected format
    response = { message: 'some response' };
    schemaValidationResult = {
      instance: response,
      schema: { type: 'string' },
      options: {},
      path: [],
      propertyPath: 'instance',
      errors: [
        {
          path: ['response'],
          property: 'response',
          message: 'is not of a type(s) string',
          schema: { type: 'string' },
          instance: response,
          name: 'type',
          argument: ['string'],
          stack: 'instance is not of a type(s) string',
        },
      ],
      disableFormat: false,
    };
    expectedResponse = {
      method: task,
      params: params,
      responseCode: 1,
      apiResponse: { result: response, error: null },
      schemaValidationStatus: 'FAIL',
      schemaValidationResponse: schemaValidationResult,
    };
    result = validation.formatResultAfterSchemaValidation(
      task,
      response,
      err,
      schemaValidationResult,
      params,
      schemaMap
    );
    logger.info(expect.getState().currentTestName + ' : ' + JSON.stringify(result));
    expect(result).toEqual(expectedResponse);
  });
});

describe('test errorSchemaCheck', () => {
  let validation;

  beforeEach(() => {
    validation = new Validation();
  });
  it('should validate error against error schema (object)', () => {
    const validError = {
      code: 404,
      message: 'Not Found',
    };
    const result = validation.errorSchemaCheck(validError);
    expect(result).toBeTruthy();
  });
  it('should validate error against error schema (string)', () => {
    const validError = 'Internal Server Error';
    const result = validation.errorSchemaCheck(validError);
    expect(result).toBeTruthy();
  });
  it('should validate error against error schema (invalid object)', () => {
    const invalidError = {
      code: 'invalid',
      message: 123, // Field with invalid data type
    };
    const result = validation.errorSchemaCheck(invalidError);
    expect(result.errors.length).not.toEqual(0);
  });
  it('should validate error against error schema (invalid type)', () => {
    const invalidError = 42; // Not an object or string
    const result = validation.errorSchemaCheck(invalidError);
    expect(result.errors.length).not.toEqual(0);
  });
  it('should validate error against error schema (missing required property)', () => {
    const invalidError = {
      code: 404,
      // Missing the "message" property
    };
    const result = validation.errorSchemaCheck(invalidError);
    expect(result.errors.length).not.toEqual(0);
  });
});
