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
const report = require('multiple-cucumber-html-reporter');
const reportEnv = require('../../reportEnv.json');
const shell = require('shell-exec');
const jsonMerger = require('json-merger');
const { merge } = require('mochawesome-merge');
const Event = require('events');
const eventEmitter = new Event();
const CONSTANTS = require('../support/constants/constants');

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
          console.log(`"${directory}" path does not exist - readFilesFromDir`);
          resolve(null);
        }
        resolve(files);
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
          console.log('Could not find file at ' + directory, 'readFileIfExists');
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
    // await afterRunHook();

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
            // Reading data from mochawesome or cucumber json file as a buffer
            jsonReport = readDataFromFile(filePath + fileName);
          }

          // Add the report to the reportObj
          if (reportType === CONSTANTS.CUCUMBER) {
            reportObj.cucumberReport = jsonReport;
          } else if (reportType === CONSTANTS.MOCHAWESOME) {
            reportObj.mochawesomeReport = jsonReport;
          }
        }
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
          deleteFile(filePath + file);
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
