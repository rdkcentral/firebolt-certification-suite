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
const common = require('./common');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const NodeModulesPolyfills =
  require('@esbuild-plugins/node-modules-polyfill').NodeModulesPolyfillPlugin;
const GlobalsPolyfills =
  require('@esbuild-plugins/node-globals-polyfill').NodeGlobalsPolyfillPlugin;
const Formatter = require('cucumber-json-report-formatter').Formatter;
const fs = require('fs');
const shell = require('shell-exec');
const jsonMerger = require('json-merger');
const { merge } = require('mochawesome-merge');
const Event = require('events');
const eventEmitter = new Event();
const CONSTANTS = require('../support/constants/constants');
const util = require('util');
const { DateTime } = require('luxon');
const { generateLocalReport } = require('./localReportGenerator');

let metaDataArr = [];

module.exports = async (on, config) => {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on(
    'file:preprocessor',
    createBundler({
      plugins: [
        NodeModulesPolyfills(),
        GlobalsPolyfills({
          process: true,
          buffer: true,
        }),
        createEsbuildPlugin.default(config),
      ],
    })
  );

  config = await common.genericSupport(config);
  if (config == null) {
    throw Error('Unable to use genericSupport file');
  }

  on('task', {
    log(message) {
      console.log(message);
      return null;
    },
    /* write json or string to file
    @param fileName - complete file name with path
    @param data - json or string
    Usage:
      cy.task('writeToFile', {fileName: "/tmp/sample.json", data: jsonContent})
    */
    writeToFile({ fileName, data }) {
      return new Promise((resolve, reject) => {
        try {
          // check if directory exists
          const directory = fileName.substring(0, fileName.lastIndexOf('/'));
          if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
          }
          fs.writeFile(fileName, data, 'utf-8', function (err) {
            if (err) {
              console.log('An error occured while writing content to File.', 'writeToFile');
              reject(false);
            }
            resolve(true);
          });
        } catch (err) {
          reject(false);
        }
      });
    },
    /* read files from folder
    @param directory - directory path
    @response - array
    Usage:
      cy.task('readFilesFromDir', "/tmp")
    */
    readFilesFromDir(directory) {
      return new Promise((resolve) => {
        let files;
        try {
          files = fs.readdirSync(directory);
        } catch (err) {
          resolve(null);
        }
        resolve(files);
      });
    },
    /* Check whether Directory Exist
    @param path - directory path
    Usage:
      cy.task('checkDirectoryExist', "/tmp")
    */
    checkDirectoryExist(path) {
      return new Promise((resolve) => {
        const exists = fs.existsSync(path);
        resolve(exists);
      });
    },
    /* merge multiple json files
    @param array - list of file path
    @response - json
    Usage:
      cy.task('mergeMultipleJson', ['/tmp/file1','/tmp/file2'])
    */
    mergeMultipleJson(files) {
      return new Promise((resolve) => {
        let combinedJson;
        if (files.length != 0) {
          try {
            combinedJson = jsonMerger.mergeFiles(files);
          } catch (err) {
            console.log(err);
            resolve(null);
          }
          resolve(combinedJson);
        } else {
          resolve({});
        }
      });
    },
    /* deleteFolder and files recursively
    @param  - path to the folder
    Usage:
      cy.task('deleteFolder', path)
    */
    deleteFolder(folderPath) {
      return new Promise((resolve, reject) => {
        fs.rmdir(folderPath, { recursive: true }, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve(true);
          }
        });
      });
    },
    executeShell(command) {
      return new Promise((resolve) => {
        shell(command).then((commandOutput) => {
          resolve(commandOutput);
        });
      });
    },
    /* checks for files in the path and returns the data present in it
    @param directory - directory path
    @response - data in the file
    Usage:
      cy.task('readFileIfExists', "tmp/test.json")
    */
    readFileIfExists(directory) {
      return new Promise((resolve) => {
        let files;
        if (fs.existsSync(directory)) {
          files = fs.readFileSync(directory, 'utf8');
          resolve(files);
        } else {
          resolve(null);
        }
      });
    },
  });

  on('before:run', async () => {
    // run some before code
    // Calling reportProcessor default function with instance of event
    const reportProcessor = importReportProcessor();
    reportProcessor.defaultMethod(eventEmitter);

    // Update run metadata
    const updatedMetadata = [
      { name: CONSTANTS.REPORT_COMMUNICATION_MODE, value: config.env.communicationMode },
      {
        name: CONSTANTS.REPORT_DATE,
        value: DateTime.utc().toFormat('yyyy-MM-dd HH:mm:ss') + ' UTC',
      },
    ];

    metaDataArr = updatedMetadata;
  });

  /* After the run do the following
      - save the cucumber-message.ndjson (TBD)
      - convert the cucumber-message.ndjson to cucumber-report.json
      - generate the html report (TBD)
  */
  on('after:run', async (results) => {
    console.log('override after:run');

    const reportObj = {};
    const formatter = new Formatter();

    const timestamp = Date.now();
    const sourceFile = './cucumber-messages.ndjson';
    let filePath = './reports/cucumber-json/';
    let suiteName = 'cucumber' + '_' + timestamp;
    let jobId;

    // Creating uuid folder under reports
    if (results.config.env.jobId) {
      jobId = results.config.env.jobId;
      filePath = `./reports/${jobId}/`;
    }

    if (!fs.existsSync(filePath)) {
      try {
        fs.mkdirSync(filePath);
        console.log('Cucumber-json folder created successfully.');
      } catch (error) {
        console.log(error);
      }
    }

    // get the testsuite name results (this has the environment variables used.). if not undefined use that as the suiteName instead of default.
    if (results.config.env.testSuiteName) {
      suiteName = results.config.env.testSuiteName + '_' + timestamp;
    }

    // generate the output file name
    const outputFile = filePath + suiteName + '.json';
    // convert the messages file to json file
    await formatter.parseCucumberJson(sourceFile, outputFile);

    // delete the messages.ndjson file.
    fs.unlink(sourceFile, (err) => {
      if (err) throw err;
      console.log('The file has been deleted!');
    });

    const reportType = config.env.reportType;
    // Reading sanity suite file name.
    if (reportType !== undefined) {
      // Reading sanity report file name.
      const sanityReportFileName = readFileName(filePath, CONSTANTS.SANITY_REPORT_FILENAME);
      const requiredReports =
        reportType.length === 0 ? [CONSTANTS.MOCHAWESOME, CONSTANTS.CUCUMBER] : [reportType];

      for (const reportType of requiredReports) {
        const fileName = readFileName(filePath, reportType);
        if (fileName) {
          let jsonReport;
          // If reportType is mochawesome and sanity report is present inside jobId(uuid) folder combining both report before pushing to config module.
          if (reportType === CONSTANTS.MOCHAWESOME && sanityReportFileName) {
            const mergedJson = await combineMochawesomeJson([
              filePath + sanityReportFileName,
              filePath + fileName,
            ]);
            // Convert merged json object to a buffer
            jsonReport = Buffer.from(JSON.stringify(mergedJson));
          } else {
            // To add custom metadata to the generated cucumber JSON
            await addCustomMetaData(outputFile, metaDataArr);
            // Reading data from mochawesome or cucumber json file as a buffer
            jsonReport = readDataFromFile(filePath + fileName);
          }
          const reportProperties = {};
          reportProperties.isCombinedTestRun = process.env.CYPRESS_isCombinedTestRun;
          // Add the report to the reportObj
          if (reportType === CONSTANTS.CUCUMBER) {
            reportObj.cucumberReport = jsonReport;
            // Pass fileName and filePath as well for local report generation
            reportObj.cucumberReportFilePath = filePath;
          } else if (reportType === CONSTANTS.MOCHAWESOME) {
            reportObj.mochawesomeReport = jsonReport;
          }
          reportObj.reportProperties = reportProperties;
        }
      }

      // Genereate local report if generateLocalReport is set to true
      if (config.env.generateLocalReport) {
        await generateLocalReport(reportObj, jobId);
      }

      // Emit the 'reports' event once after the loop and reportObj is populated.
      await new Promise((resolve) => {
        eventEmitter.once('reportProcessed', () => resolve());
        eventEmitter.emit('reports', reportObj, jobId);
      });
    }

    // Delete the json files after emitting
    if (config.env.deleteReport) {
      const files = readFileName(filePath);
      if (files) {
        for (const file of files) {
          const fullPath = filePath + file;
          // Check if the path is not a directory
          if (!fs.statSync(fullPath).isDirectory()) {
            deleteFile(filePath + file);
          }
        }
      }
    }
  });
  return config;
};

/* Function to combine mochawesome json files
    @param arrayOfFiles - list of file paths to combine
    @response - combined json
    Usage:
      combineMochawesomeJson(['/tmp/file1.json','/tmp/file2.json'])
*/
async function combineMochawesomeJson(arrayOfFiles) {
  const options = {
    files: arrayOfFiles,
  };
  return await merge(options);
}

// Importing configModule report Processor
function importReportProcessor() {
  try {
    const reportProcessor = require('../../node_modules/configModule/reportProcessor/index');
    return reportProcessor;
  } catch (error) {
    console.log(error);
  }
}

/* fetching file name or list of files based on the input.
    @param filePath - directory path
    @param fileName - if fileName is present it will return speific fileName from the directory
    @response - array | string
    Usage:
      readFilesFromDir('/tmp/', 'file_name.json')
*/
function readFileName(filePath, fileName) {
  let files;
  try {
    files = fs.readdirSync(filePath);
    if (files && fileName) {
      files = files.find((name) => name.includes(fileName));
    }
  } catch (err) {
    console.log(`${filePath} Path does not exist`);
  }
  return files;
}

/* read data from a file
    @param filePath - path of the file
    Usage:
      readFilesFromDir('/tmp/file_name.json')
*/
function readDataFromFile(filePath) {
  try {
    return fs.readFileSync(filePath);
  } catch (err) {
    console.log(`Unable to read data from ${filePath}`);
  }
}

/* deleting file 
    @param sourceFile - file path
    @response - array
    Usage:
      deleteFile('/tmp/file_name.json')
*/
function deleteFile(sourceFile) {
  fs.unlink(sourceFile, (err) => {
    if (err) {
      console.log(`Error while deleting the file ${err}`);
    }
    console.log(`The ${sourceFile} file has been deleted`);
  });
}

async function addCustomMetaData(outputFile, metaDataArr) {
  try {
    // Promisify the fs.readFile and fs.writeFile functions
    const readFileAsync = util.promisify(fs.readFile);
    const writeFileAsync = util.promisify(fs.writeFile);

    // Read the JSON data from the file
    const reportData = await readFileAsync(outputFile, 'utf8');
    const existingData = JSON.parse(reportData);

    // Append the metaDataArr to each item from the global metadata array
    existingData.forEach((item) => {
      item.metadata = metaDataArr;
    });

    const updatedJsonData = JSON.stringify(existingData, null, 2);

    // Write the updated JSON data back to the file
    await writeFileAsync(outputFile, updatedJsonData, 'utf8');
    console.log('Metadata array appended to existing JSON successfully.');

    return Promise.resolve();
  } catch (err) {
    console.error('Error in appending the metadata to the existing JSON:', err.message);
  }
}
