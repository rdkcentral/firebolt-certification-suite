// scripts/generateFeature.js
const fs = require('fs');
const path = require('path');
const CONSTANTS = require('../cypress/support/constants/constants');
const logger = require('../cypress/support/Logger')('generateFeature.js');
const extractedData = [];
const axios = require('axios');


// Get the flags from Cypress env
const rawFlags = process.env.DYNAMIC_FEATURE_FILE_FLAGS || '';
const flags = rawFlags.split(/[,\|]/).map(f => f.trim().toLowerCase());
console.log('Parsed Flags:', flags);
console.log(flags.includes('channelperformance'))

// Dispatcher
if (flags.includes('channelperformance')) generateChannelPerformanceFeature();
if (flags.length === 0) {
  console.log('No valid FEATURE_FLAGS provided.');
}

function generateChannelPerformanceFeature() {
    const channelListURL = process.env.CHANNEL_LIST_URL;
    axios.get(channelListURL)
    .then(response => {
        const data = response.data;
        console.log('Data fetched successfully:', data);
        data.services.forEach((service, serviceIndex) => {
            service.locators.forEach((locator, locatorIndex) => {
                if(locator.playerConfig && locator.playerConfig.ipaAppId && locator.playerConfig.ipaAppId === 'com.xumo.ipa') {
                    const path = locator.path;
                    console.log(`Service Index: ${serviceIndex}, Locator Index: ${locatorIndex}, Path: ${path}`);
                    const tsbType = locator.playerConfig?.tsbType;

                    extractedData.push({
                        serviceIndex,
                        locatorIndex,
                        path,
                        tsbType
                    });
                }
            });
        });

        // Generate 11 dynamic URIs
        console.log('Extracted Data:', extractedData);
        const uris = extractedData.map(item => item.path);
        console.log('Extracted URIs:', uris);

        // Build the .feature file content
        const featureContent = `
        Feature: Dynamic URI Validation

        Scenario Outline: Validate dynamic URI
            Given I have loaded dynamic data
            Then the value for "<uri>" should be one

            Examples:
            | uri         |
        ${uris.map(uri => `      | ${uri} |`).join('\n')}
        `;

        // Define output path
        const outputDir = path.join(__dirname, '../resources/common/TestCases/Sample');
        const outputPath = path.join(outputDir, 'DynamicExample.feature');

        // Ensure the directory exists
        fs.mkdirSync(outputDir, { recursive: true });

        // Write the feature file
        fs.writeFileSync(outputPath, featureContent.trim(), 'utf8');

        console.log('✅ Feature file generated at:', outputPath);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

