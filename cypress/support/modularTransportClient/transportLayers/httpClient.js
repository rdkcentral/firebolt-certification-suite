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
import { TransportClient } from './parent';
const logger = require('../../Logger')('httpClient.js');
const axios = require('axios');

const defaultTimeout = Cypress.env('httpTransportTimeout')
  ? Cypress.env('httpTransportTimeout')
  : 5000;
axios.defaults.timeout = defaultTimeout;
axios.defaults.transitional.clarifyTimeoutError = true;

export default class HttpClient extends TransportClient {
  constructor(options) {
    super();
    this.options = options;
  }

  async initialize() {}

  async send(payload) {
    if (!this.options.url) {
      throw new Error('Cannot send message without a url');
    }

    return new Promise((res, rej) => {
      let method = this.options.method;
      if (!method) {
        if (payload) {
          method = 'POST';
        } else {
          method = 'GET';
        }
      }

      let url = this.options.url;

      if (this.options.params) {
        const params = this.options.params;
        url = url + '?';
        for (const param in params) {
          url = url + param + '=' + params[param] + '&';
        }
      }

      const options = {
        method: method,
        headers: this.options.headers,
        timeout: this.options.requestTimeout,
      };

      if (!this.options.failOnHttpError) {
        options['validateStatus'] = false;
      }

      try {
        if (method == 'GET') {
          axios
            .get(url, options)
            .then((response) => {
              logger.info(`GET statusCode: ${response.status}`);
              res(response);
            })
            .catch(function (error) {
              if (error.code === 'ETIMEDOUT') {
                rej(
                  'HTTP transport layer did not receive http response in ' + defaultTimeout + 'ms.'
                );
              }
              rej(error);
            });
        } else {
          // For data sent via payload and not query params
          if (this.options.hasOwnProperty('payload')) {
            payload = this.options.payload;
          }
          axios
            .post(url, payload, options)
            .then((response) => {
              logger.info(`POST statusCode: ${response.status}`);
              res(response);
            })
            .catch(function (error) {
              if (error.code === 'ETIMEDOUT') {
                rej(
                  'HTTP transport layer did not receive http response in ' + defaultTimeout + 'ms.'
                );
              }
              rej(error);
            });
        }
      } catch (err) {
        logger.error('Error: ', err.response);
        rej('Request returned a non 2xx status code: ' + err.response.status);
      }
    });
  }

  async updateOptions(options) {
    this.options = options;
  }
}
