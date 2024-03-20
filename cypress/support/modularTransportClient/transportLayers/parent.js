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
export class TransportClient {
  constructor() {
    if (!this.initialize) {
      throw new Error('"initialize" function not implemented for ' + this.constructor.name);
    }
    if (!this.send) {
      throw new Error('"send" function not implemented for ' + this.constructor.name);
    }
  }
}

export class AsyncTransportClient extends TransportClient {
  constructor() {
    super();
    if (!this.subscribe) {
      throw new Error('"subscribe" function not implemented for ' + this.constructor.name);
    } else if (!this.unsubscribe) {
      throw new Error('"unsubscribe" function not implemented for ' + this.constructor.name);
    }
  }
}
