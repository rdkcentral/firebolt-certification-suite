const spawn = require('cross-spawn');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

// Reading first parameter from the scripts to call function
const functionName = process.argv[2];
const params = process.argv.slice(3).join(' ');

const sdkVersionMatch = params.match(/sdkVersion=([^\s,]+)/);
let sdkVersion = sdkVersionMatch ? sdkVersionMatch[1] : 'latest';

if (sdkVersion === 'latest' && process.env.SDK_VERSION_LATEST) {
  sdkVersion = process.env.SDK_VERSION_LATEST;
}
// Creating UUID
function generateUUID() {
  return uuidv4();
}

// Function to extract value of params that contain spaces
function modifyParams(params) {
  const envSectionMatch = params.match(/--env\s+(.*?)(?=\s+--|$)/);
  const envSection = envSectionMatch ? envSectionMatch[1] : '';
  const paramValuePairs = envSection.split(',');

  let modifiedParams = params;
  for (const pair of paramValuePairs) {
    if (pair.includes(' ')) {
      const [key, value] = pair.split('=');
      process.env[`CYPRESS_${key}`] = value;
      modifiedParams = modifiedParams.replace(pair + ',', '').replace(',' + pair, '');
    }
  }
  return modifiedParams;
}

// Function to check if it's a combined test run
function isCombinedTestRun(params) {
  const specValueMatch = params.match(/--spec\s+([^ ]*)/);
  const specValue = specValueMatch ? specValueMatch[1] : '';
  return specValue === '*' || specValue.includes(',');
}

const isCombinedTest = isCombinedTestRun(params);
process.env.CYPRESS_isCombinedTestRun = isCombinedTest;

// Extract jobId from the parameters
let jobId = '';
const processingEnvArgs = params.includes('--env');
if (processingEnvArgs) {
  const envArgs = params.match(/--env\s+(.*?)(?=\s+--|$)/)[1].split(',');
  for (const envArg of envArgs) {
    if (envArg.startsWith('jobId=')) {
      jobId = envArg.split('=')[1];
      break;
    }
  }
}

// If jobId is not found in the parameters, generate a new one
if (!jobId) {
  jobId = generateUUID();
}

process.env.CYPRESS_jobId = jobId;

// Function to execute preprocessorScript
function runPreprocessorScript() {
  const preprocessorScript = path.join(__dirname, 'copyFixturesTestcases.js');
  spawn('node', [preprocessorScript], {
    stdio: 'inherit',
    env: { ...process.env, sdkVersion },
  });
}

// Function to execute cypress run
function run() {
  runPreprocessorScript();

  const args = ['run', '--e2e', ...modifyParams(params).split(' ')];
  console.log(`[Running cypress command: cypress ${args.join(' ')}]`);

  const cypressProcess = spawn('cypress', args, { stdio: 'inherit' });

  cypressProcess.on('error', (error) => {
    console.error(`Error: ${error.message}`);
  });

  cypressProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`Cypress process exited with code ${code}`);
    }
  });
}

// Function to open Cypress without report options
function open() {
  runPreprocessorScript();

  const command = 'cypress';
  const args = ['open', '--e2e', ...modifyParams(params).split(' ')];
  console.log(`[Running cypress command: ${command} ${args.join(' ')}]`);

  const cypressProcess = spawn(command, args, { stdio: 'inherit' });

  cypressProcess.on('error', (error) => {
    console.error(`Error: ${error.message}`);
  });

  cypressProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`Cypress process exited with code ${code}`);
    }
  });
}

// Calling function based on name
if (functionName === 'run') {
  run();
} else if (functionName === 'open') {
  open();
} else {
  console.error('Invalid function name');
}
