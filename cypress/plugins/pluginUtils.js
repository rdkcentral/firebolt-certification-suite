const axios = require('axios');
const fs = require('fs');
const path = require('path');
const $RefParser = require('@apidevtools/json-schema-ref-parser');
const _ = require('lodash');

/**
 * Fetches and dereferences OpenRPC documents from various sources including a Firebolt URL, local files, and external URLs.
 *
 * @async
 * @function getAndDereferenceOpenRpc
 * @param {string[]} externalUrls - An array of URLs to fetch external OpenRPC documents from.
 * @param {string} [version=null] - The version of the Firebolt OpenRPC document to fetch. If not provided, the latest version is fetched.
 * @returns {Promise<Object[]>} A Promise that resolves with an array of dereferenced OpenRPC documents.
 * @throws {Error} Throws an error if there's a problem fetching or dereferencing any of the OpenRPC documents.
 */
async function getAndDereferenceOpenRpc(externalUrls, version = null) {
  // Define constants
  const openRpcDocs = [];
  const fireboltUrl = version && sdkSignOff
  ? 'https://rdkcentral.github.io/firebolt/requirements/next/specifications/firebolt-open-rpc.json'
  : version
    ? `https://rdkcentral.github.io/firebolt/requirements/${version}/specifications/firebolt-open-rpc.json`
    : 'https://rdkcentral.github.io/firebolt/requirements/latest/specifications/firebolt-open-rpc.json';
  const localOpenRpcDir = path.join('node_modules', 'configModule', 'constants', 'openRPC');

  try {
    // Get firebolt openRPC & dereference
    const fireboltRes = await axios.get(fireboltUrl);
    const deSchemaList = await $RefParser.dereference(fireboltRes.data);
    openRpcDocs.push(deSchemaList);

    // Check if the local openRPC directory exists
    const localOpenRpcDirExists = fs.existsSync(localOpenRpcDir);

    // If the directory does exist, read files, dereference, and push to openRpcDocs
    if (localOpenRpcDirExists) {
      const files = fs.readdirSync(localOpenRpcDir);
      const localOpenRpcFiles = files.filter((file) => file.endsWith('.json'));
      const promises = localOpenRpcFiles.map(async (file) => {
        const filePath = path.join('configModule', 'constants', 'openRPC', file);
        const localOpenRpc = require(filePath);
        const localDeSchemaList = await $RefParser.dereference(localOpenRpc);
        return localDeSchemaList;
      });

      const localDeSchemaLists = await Promise.all(promises);
      openRpcDocs.push(...localDeSchemaLists);
    }

    // Get external openRPC & dereference
    if (externalUrls && externalUrls.length > 0) {
      const promises = externalUrls.map(async (url) => {
        const externalRes = await axios.get(url);
        const externalDeSchemaList = await $RefParser.dereference(externalRes.data);
        return externalDeSchemaList;
      });

      const externalDeSchemaLists = await Promise.all(promises);
      openRpcDocs.push(...externalDeSchemaLists);
    }
    return openRpcDocs;
  } catch (err) {
    console.error(err, 'getAndDereferenceOpenRpc');
  }
}

/**
 * Generates an index.js file that requires all JavaScript files in a specified directory.
 * @param {string} path - The path to the directory containing the FireboltCalls V2 data.
 * @param {string} outputObj - The name of the output object.
 * @throws {Error} If an error occurs while reading the directory or writing the file.
 */
function generateIndexFile(path, outputObj) {
  // Define variables
  const moduleFiles = [];
  let indexFileContent = `let ${outputObj} = {};\n`;

  try {
    // First check if the provided path exists
    if (fs.existsSync(path)) {
      // Read files in the directory
      const files = fs.readdirSync(path);

      // Filter out non-JavaScript files and the index file itself,
      // then slice off the .js extension and push the file names to the v2TestFiles array
      files.forEach((file) => {
        if (file && file.endsWith('.js') && !file.includes('index')) {
          moduleFiles.push(file.slice(0, -3));
        }
      });

      // Loop through the test files and require them in the index file
      moduleFiles.forEach((moduleName) => {
        indexFileContent += `const ${moduleName} = require('./${moduleName}');\n`;
        indexFileContent += `Object.assign(${outputObj}, ${moduleName});\n`;
      });
    }

    // Add exports at the bottom of the file
    indexFileContent += `module.exports = ${outputObj};`;

    // Define the path of the file to be created
    const indexFilePath = `${path}index.js`;

    // Check if the file exists and delete if it does
    if (fs.existsSync(indexFilePath)) {
      fs.unlinkSync(indexFilePath);
    }

    // Check if the directory exists, if not create it
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }

    // Write to the new index.js file
    fs.writeFileSync(indexFilePath, indexFileContent);
  } catch (error) {
    console.error(`An error occurred while generating the index file: ${error}`);
    throw error;
  }
}

/**
 * @function preprocessDeviceData
 * @description Reads the device data JSON file and adds it to the config object.
 * @param {string} config - The config object.
 * @example
 * preprocessDeviceData(config);
 */

function preprocessDeviceData(config) {
  const deviceMac = config.env.deviceMac;
  try {
    if (!deviceMac) {
      console.error('Device MAC address is required.');
    }
    const formattedDeviceMac = deviceMac.replace(/:/g, '').toUpperCase();
    const jsonFilePath = `cypress/fixtures/external/devices/${formattedDeviceMac}.json`;
    let deviceData;

    try {
      deviceData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
    } catch (readError) {
      console.error(
        `Error reading or parsing the JSON file at ${jsonFilePath}: ${readError.message}`
      );
    }

    const resolvedDeviceData = { ...deviceData };
    config.env = Object.assign({}, config.env, { resolvedDeviceData });
  } catch (error) {
    console.error(`Error in preprocessDeviceData: ${error.message}`);
  }
}

module.exports = {
  getAndDereferenceOpenRpc,
  generateIndexFile,
  preprocessDeviceData,
};
