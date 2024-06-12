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
const logger = require('../support/Logger')('localReportGenerator.js');

const rename = util.promisify(fs.rename);
const readdir = util.promisify(fs.readdir);
const mkdir = util.promisify(fs.mkdir);
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

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

    logger.info(
      `A local report has been generated and can be accessed at ./reports/${jobId}/mochawesome/mochawesome-report.html`,
      `generateLocalReport`
    );
  }

  // If reportObj.cucumberReport exists, generate a cucumber report
  if (reportObj.cucumberReport && reportObj.cucumberReportFilePath) {
    // Move cucumber json to a separate directory and get the path
    const cucumberDir = await filterCucumberJson(reportObj.cucumberReportFilePath);
    let customReportData;
    try {
      customReportData = require('../fixtures/external/objects/customReportData.json');
    } catch (error) {
      customReportData = require('../fixtures/customReportData.json');
    }
    // Configure cucumber report options
    reportEnv.jsonDir = cucumberDir;
    reportEnv.reportPath = `./reports/${jobId}/cucumber-html-report`;
    const featuresDir = `./reports/${jobId}/cucumber-html-report/features`;
    if (customReportData.customFooter)
      reportEnv.pageFooter = customReportData.customFooter.PageFooter;

    // Generate the cucumber report
    await cucumberReportGenerator.generate(reportEnv);

    // Remove tags from the generated cucumber report
    removeTagsFromCukeHtml(reportEnv.reportPath + '/index.html');
    if (customReportData.customFooter)
      await processFeaturesFiles(featuresDir, customReportData.customFooter, 'customFooter');
    if (customReportData.customMetadata)
      await processFeaturesFiles(featuresDir, customReportData.customMetadata, 'customMetadata');

    logger.info(
      `A local report has been generated and can be accessed at ./reports/${jobId}/cucumber-html-report/index.html`,
      `generateLocalReport`
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
    logger.error(`Table with id "features-table" not found in the HTML.`, `removeTagsFromCukeHtml`);
  }
}

async function updateCustomData(filePath, newCustomData, flag) {
  const data = await readFileAsync(filePath, 'utf8');
  let updatedData;
  if (flag.includes('customFooter')) {
    const regex = /<div id="pagefooter">.*?<\/div>/s;
    updatedData = data.replace(regex, newCustomData);
  } else if (flag.includes('customMetadata')) {
    let regex = /<h2>Metadata<\/h2>/;

    // Replace the found pattern with the new header content
    updatedData = data.replace(regex, '<h2>Setup & Metadata</h2>');
    regex = /(<ul class="quick-list">)([\s\S]*?)(<\/ul>)/;

    // Generate the new <li> elements for Setup
    const setupItems = Object.entries(newCustomData.Setup)
      .map(([key, value]) => {
        return `<li class="prereq-item">- <span class="meta-data-data">${value}</span></li>`;
      })
      .join('\n');

    const setupSection = `
        <li>
          <span class="meta-data-title">Setup</span>
          <ul class="prereq-list">
            ${setupItems}
          </ul>
        </li>`;

    updatedData = updatedData.replace(regex, `$1$2\n${setupSection}$3`);
  }
  await writeFileAsync(filePath, updatedData, 'utf8');
}

// Process each footer in html files
async function processFeaturesFiles(reportDir, customData, customFlag) {
  try {
    const files = await readdir(reportDir);

    for (const file of files) {
      const data = await getCustomData(file, customData);
      if (data) {
        const filePath = path.join(reportDir, file);
        await updateCustomData(filePath, data, customFlag);
      }
    }
  } catch (err) {
    console.error('Error reading report directory:', err);
  }
}

// Function to get the custom footer based on filename
async function getCustomData(fileName, customData) {
  for (const key in customData) {
    if (fileName.includes(`${key}.html`)) {
      return customData[key];
    }
  }
  return null;
}

module.exports = { generateLocalReport };
