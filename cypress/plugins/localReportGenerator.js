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

const fs = require('fs');
const path = require('path');
const util = require('util');
const { JSDOM } = require('jsdom');
const mochawesomeReportGenerator = require('mochawesome-report-generator');
const cucumberReportGenerator = require('multiple-cucumber-html-reporter');
const reportEnv = require('../../reportEnv.json');

const rename = util.promisify(fs.rename);
const readdir = util.promisify(fs.readdir);
const mkdir = util.promisify(fs.mkdir);

/**
 * Generates local reports for Mochawesome and Cucumber based on the provided report data.
 *
 * @async
 * @param {Object} reportObj - The report data object. This should have `mochawesomeReport` and/or `cucumberReport` properties.
 * @param {string} jobId - The job ID, used to create a unique directory for the report.
 * @returns {Promise<void>} A Promise that resolves when the report(s) have been generated.
 *
 * @example
 * const reportObj = {
 *   mochawesomeReport: '{...}',  // JSON string or Buffer of Mochawesome report data
 *   cucumberReport: '{...}'  // JSON string or Buffer of Cucumber report data
 * };
 * const jobId = '12345';
 * await generateLocalReport(reportObj, jobId);
 */
async function generateLocalReport(reportObj, jobId) {
  // If reportObj.mochawesomeReport exists, generate a mochawesome report
  if (reportObj.mochawesomeReport) {
    // Convert buffer data to JSON
    const reportData = JSON.parse(reportObj.mochawesomeReport);

    // Configure mochawesome report options
    const options = {
      reportDir: `./reports/${jobId}/mochawesome`,
      reportFilename: 'mochawesome-report',
      saveJson: true,
    };

    await mochawesomeReportGenerator.create(reportData, options);

    console.log(
      `A local report has been generated and can be accessed at ./reports/${jobId}/mochawesome/mochawesome-report.html`
    );
  }

  // If reportObj.cucumberReport exists, generate a cucumber report
  if (reportObj.cucumberReport && reportObj.cucumberReportFilePath) {
    // Move cucumber json to a separate directory and get the path
    const cucumberDir = await filterCucumberJson(reportObj.cucumberReportFilePath);

    // Configure cucumber report options
    reportEnv.jsonDir = cucumberDir;
    reportEnv.reportPath = `./reports/${jobId}/cucumber-html-report`;

    // Generate the cucumber report
    await cucumberReportGenerator.generate(reportEnv);

    // Remove tags from the generated cucumber report
    removeTagsFromCukeHtml(reportEnv.reportPath + '/index.html');

    console.log(
      `A local report has been generated and can be accessed at ./reports/${jobId}/cucumber-html-report/index.html`
    );
  }
}

/**
 * Filters JSON files that include the keyword 'cucumber' in a directory, moves them to a new directory, and returns the path of the new directory.
 *
 * @async
 * @param {string} directory - The path of the directory to filter files from.
 * @returns {Promise<string>} The path of the new directory where the filtered files have been moved.
 *
 * @example
 * const directory = './path/to/directory';
 * const newDirectory = await filterCucumberJson(directory);
 */
async function filterCucumberJson(directory) {
  const newDirectory = path.join(directory, 'cucumberJson');

  // Create the new directory if it doesn't exist
  if (!fs.existsSync(newDirectory)) {
    await mkdir(newDirectory);
  }

  // Get all files in the directory
  const files = await readdir(directory);

  // Filter for files that include the keyword 'cucumber'
  const cucumberFiles = files.filter((file) => file.includes('cucumber') && file.endsWith('.json'));

  // Move each cucumber file to the new directory
  for (const file of cucumberFiles) {
    const oldPath = path.join(directory, file);
    const newPath = path.join(newDirectory, file);
    await rename(oldPath, newPath);
  }

  // Return the path of the new directory
  return newDirectory;
}

/**
 * Removes the second column from the table with id "features-table" in an HTML report.
 * The function reads the HTML content from a file, modifies it, and writes the modified content back to the file.
 *
 * @param {string} htmlReportPath - The path of the HTML report file.
 *
 * @example
 * const htmlReportPath = './path/to/report.html';
 * removeTagsFromCukeHtml(htmlReportPath);
 */
function removeTagsFromCukeHtml(htmlReportPath) {
  const html = fs.readFileSync(htmlReportPath, 'utf8');
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const table = document.querySelector('#features-table');
  if (table) {
    // Select the table rows in both thead and tbody
    const rows = table.querySelectorAll('thead tr, tbody tr');

    // Loop through each row in the table
    rows.forEach((row) => {
      // Select the 2nd th and 2nd td elements in the row
      const secondTh = row.querySelector('th:nth-child(2)');
      const secondTd = row.querySelector('td:nth-child(2)');

      // Remove the 2nd elements
      if (secondTh) secondTh.remove();
      if (secondTd) secondTd.remove();
    });

    // Get the modified HTML content
    const modifiedHtml = dom.serialize();

    // Write the modified HTML content back to a file
    fs.writeFileSync(htmlReportPath, modifiedHtml, 'utf8');
  } else {
    console.log('Table with id "features-table" not found in the HTML.');
  }
}

module.exports = { generateLocalReport };
