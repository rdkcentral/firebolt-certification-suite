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
// This is a template to be used when creating a new transport layer
import { AsyncTransportClient, TransportClient } from './parent';

// Extend to AsyncTransportClient or TransportClient depending on whether subscribe/unsubscribe is needed
export default class Transport {
  constructor(options) {
    this.options = options;
  }

  async initialize() {}

  async send(payload) {}

  subscribe(topic, callback) {}

  unsubscribe(topic) {}
}
