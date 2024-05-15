const axios = require('axios');
const fs = require('fs');
const path = require('path');
const $RefParser = require('@apidevtools/json-schema-ref-parser');

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
    console.log(err);
  }
}

module.exports = { getAndDereferenceOpenRpc };
