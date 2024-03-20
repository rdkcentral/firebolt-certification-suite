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
const requestModules = 'requestModules';
const responseModules = 'responseModules';
const defaultModule = 'defaultModule';
const defaultMethod = 'defaultMethod';
const CONSTANTS = require('../../constants/constants');
export default class Config {
  constructor(configModule) {
    this.configModule = configModule;
  }

  setMethod(method) {
    this.method = method;
  }

  getMethod() {
    return this.method;
  }

  setModuleName(moduleName) {
    this.moduleName = moduleName;
  }

  getModuleName() {
    return this.moduleName;
  }

  /* get request override config from configuration module.
   * ex: {"method": "closedcaptions.setEnabled", "params": { "value": true }}
   * If config not present, return same command as is to caller
   * If config present, return the object to caller.
   *
   * Key difference between getConfig and getOverride is,
   * getConfig - return null if config not present
   * getOverride - return same command as is to caller if override not found
   * Note: firebolt command format validation still exists in both cases.
   */
  getRequestOverride(fireboltObject) {
    // If config module is invalid or absent
    if (this.configModule === null || this.configModule === undefined || !this.configModule) {
      console.log('config module is not provided');
      return fireboltObject;
    }
    if (!fireboltObject || !fireboltObject.method) {
      console.log('firebolt object does not contain method param');
      return fireboltObject;
    }
    // firebolt method format <module>.<method>
    const moduleMethodArray = fireboltObject.method.split('.');

    if (moduleMethodArray.length !== 2) {
      console.log("Invalid module/method. Expected format '<Module.Method>'");
      return fireboltObject;
    }

    const moduleName = moduleMethodArray[0];
    const methodName = moduleMethodArray[1];

    this.setModuleName(moduleName);
    this.setMethod(methodName);

    // Check to see if we have a config override for this module and method
    let methodConfig =
      this.configModule[requestModules] &&
      this.configModule[requestModules][moduleName] &&
      this.configModule[requestModules][moduleName][methodName]
        ? this.configModule[requestModules][moduleName][methodName]
        : null;
    if (methodConfig === null) {
      methodConfig =
        this.configModule[requestModules] &&
        this.configModule[requestModules][moduleName] &&
        this.configModule[requestModules][moduleName][defaultMethod]
          ? this.configModule[requestModules][moduleName][defaultMethod]
          : null;
    }

    console.log(
      'Firebolt Method: ' +
        moduleName +
        '.' +
        methodName +
        ' and  params: ' +
        JSON.stringify(fireboltObject.params)
    );

    // Failing the test when module name is fcs and corresponding request module override not found
    if (moduleName === CONSTANTS.FCS && !methodConfig) {
      cy.log(
        ` ${fireboltObject.method} is a required requestModule override in config module`
      ).then(() => {
        assert(false, ` ${fireboltObject.method} is a required requestModule override`);
      });
    }

    // If we don't, check for a default
    if (methodConfig === null) {
      methodConfig =
        this.configModule[requestModules] &&
        this.configModule[requestModules][defaultModule] &&
        this.configModule[requestModules][defaultModule][defaultMethod]
          ? this.configModule[requestModules][defaultModule][defaultMethod]
          : null;
      // If we STILL don't, return the firebolt object
      if (methodConfig === null) {
        console.log(
          'No config request override found for ' +
            fireboltObject.method +
            '. Using unmodified firebolt command'
        );
        return fireboltObject;
      }
      return methodConfig(fireboltObject);
    }

    // If we've gotten to this point, we have a config override. Call it and return its response
    return methodConfig(fireboltObject);
  }

  /* get response override config from configuration module.
   * If config not present, return same response as is to caller
   * If config present, return the modified response to caller.
   *
   * getResponseOverride - return same command as is to caller if override not found
   */
  getResponseOverride(fireboltResponse) {
    // Get the method and module name
    const methodName = this.getMethod();
    const moduleName = this.getModuleName();

    // Set methodConfig to "responseModules-><module>.js-><method>()" if exists
    let methodConfig =
      this.configModule[responseModules] &&
      this.configModule[responseModules][moduleName] &&
      this.configModule[responseModules][moduleName][methodName]
        ? this.configModule[responseModules][moduleName][methodName]
        : null;
    if (methodConfig === null) {
      // If it did not exist check for "responseModules-><module>.js->defaultMethod()"
      methodConfig =
        this.configModule[responseModules] &&
        this.configModule[responseModules][moduleName] &&
        this.configModule[responseModules][moduleName][defaultMethod]
          ? this.configModule[responseModules][moduleName][defaultMethod]
          : null;
    }
    if (methodConfig === null) {
      // If it still did not exist check for "responseModules->defaultModule.js->defaultMethod()"
      methodConfig =
        this.configModule[responseModules] &&
        this.configModule[responseModules][defaultModule] &&
        this.configModule[responseModules][defaultModule][defaultMethod]
          ? this.configModule[responseModules][defaultModule][defaultMethod]
          : null;
    }
    if (methodConfig === null) {
      // If none existed return response
      console.log(
        'No config response override found for ' +
          moduleName +
          '.' +
          methodName +
          ' returning unmodified firebolt response'
      );
      return fireboltResponse;
    }
    cy.log(
      'Original Response to be converted to firebolt equivalent: ' +
        JSON.stringify(fireboltResponse)
    );
    // If we've gotten to this point, we have a config override. Call it and return its response
    return methodConfig(fireboltResponse);
  }
}
