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
module.exports = {
  NUMERIC_REGEXP: new RegExp('^[0-9]+$'),
  PASSWORD_REGEXP: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'),
  TOKEN_REGEXP: new RegExp('^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$'),
  UID_REGEXP: new RegExp(/^(?:.*\d)(?:.*[a-zA-Z]).{2,}$/),
  LANGUAGE_REGEXP: new RegExp('^[a-z]{2}(-[A-Z]{2})?$'),
  LOCALE_REGEXP: new RegExp('^[A-Z]{2}(-[a-z]{2})?$'),
  SCREENRES_REGEXP: new RegExp('\\[([0-9].{3}),([1-9].{3})\\]'),
  ISODATE_REGEXP: new RegExp(
    '([0-9]{4})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T(([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])[.][0-9]{3}Z'
  ),
  DATE_REGEXP: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
  DATEAUTHENTICATION_REGEXP: RegExp(
    '[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])'
  ),
  DECIMAL_REGEXP: /^\d+\.\d{0,2}$/,
  HEXADECIMAL_REGEXP: /\b[0-9A-Fa-f]{6}\b/g,
  EMAIL_REGEXP: /\S+@\S+\.\S+/,
  OBJECT_REGEXP: /[^\\"]+/,
  STRING_REGEXP: new RegExp('^[A-Za-z]*$'),
  ALPHANUMERIC_REGEXP: new RegExp(/^(?:.*\d)(?:.*[a-zA-Z]).{2,}$/),
  DEVICE_MODEL_REGEXP: new RegExp('^[a-zA-Z0-9_-]*$'),
  issueDate: [11, 31],
  notOnOrAfter: [14, 34],
  partner: [9, 16],
  lmt: [6, 7],
  TOKEN_JWT_REGEXP: new RegExp('^[A-Za-z0-9_-]{2,}(?:.[A-Za-z0-9_-]{2,}){2}$'),
  COUNTRYCODE_REGEXP: new RegExp('^.{2,3}$'),
  VERSION_REGEXP: new RegExp(/^(\d+\.)?(\d+\.)?(\*|\d+)$/),
  TIMEZONE_REGEXP: new RegExp('[a-zA-Z&_.-]'),
};
