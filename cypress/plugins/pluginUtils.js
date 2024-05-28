const axios = require('axios');
const fs = require('fs');
const path = require('path');
const $RefParser = require('@apidevtools/json-schema-ref-parser');
const logger = require('../support/Logger')('pluginUtils.js');

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
  const fireboltUrl = version
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
    logger.error(err, 'getAndDereferenceOpenRpc');
  }
}

/**
 * Generates an index.js file that requires all JavaScript files in a specified directory.
 * @param {string} path - The path to the directory containing the FireboltCalls V2 data.
 * @throws {Error} If an error occurs while reading the directory or writing the file.
 */
function generateFireboltCallsIndexFile(path) {
  // Define variables
  const v2TestFiles = [];
  // let indexFileContent = '';
  let indexFileContent = 'let fireboltCalls = {};\n';

  try {
    // First check if the provided path exists
    if (fs.existsSync(path)) {
      // Read files in the directory
      const files = fs.readdirSync(path);

      // Filter out non-JavaScript files and the index file itself,
      // then slice off the .js extension and push the file names to the v2TestFiles array
      files.forEach((file) => {
        if (file && file.endsWith('.js') && !file.includes('index')) {
          v2TestFiles.push(file.slice(0, -3));
        }
      });

      // Loop through the test files and require them in the index file
      v2TestFiles.forEach((moduleName) => {
        indexFileContent += `const ${moduleName} = require('./${moduleName}');\n`;
        indexFileContent += `Object.assign(fireboltCalls, ${moduleName});\n`;
      });
    }

    // Add exports at the bottom of the file
    indexFileContent += 'module.exports = fireboltCalls;';

    // Delete the index.js file if it already exists
    if (fs.existsSync(`${path}/index.js`)) {
      fs.unlinkSync(`${path}/index.js`);
    }

    // Write to the new index.js file
    fs.writeFileSync(`${path}/index.js`, indexFileContent);
  } catch (error) {
    logger.error(
      `An error occurred while generating the FireboltCalls index file: ${error}`,
      'generateFirboltCallsIndexFile'
    );
    throw error;
  }
}

module.exports = { getAndDereferenceOpenRpc, generateFireboltCallsIndexFile };
