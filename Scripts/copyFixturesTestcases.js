const fs = require('fs');
const path = require('path');

const sdkVersion = process.env.sdkVersion;

const fcsTestCasesDir = path.join(__dirname, '..', 'cypress', 'TestCases');
const sdkTestCasesDir = path.join(__dirname, '..', 'sdkResources', sdkVersion, 'TestCases');
const configTestCasesDir = path.join(
  __dirname,
  '..',
  'sdkResources',
  'external',
  sdkVersion,
  'TestCases'
);

const fcsFixturesDir = path.join(__dirname, '..', 'cypress', 'fixtures');
const sdkFixturesDir = path.join(__dirname, '..', 'sdkResources', sdkVersion, 'fixtures');
const configFixturesDir = path.join(
  __dirname,
  '..',
  'sdkResources',
  'external',
  sdkVersion,
  'fixtures'
);

const commonResourcesDir = path.join(__dirname, '..', 'commonResources');

// Clear existing directories
deleteDirectory(fcsTestCasesDir);
deleteDirectory(fcsFixturesDir, 'fireboltJsonVersion');

// Copy TestCases
if (fs.existsSync(sdkTestCasesDir)) {
  copyFiles(sdkTestCasesDir, fcsTestCasesDir);
}
if (fs.existsSync(configTestCasesDir)) {
  const distributorTestCasesDir = path.join(fcsTestCasesDir, 'Distributor');
  copyFiles(configTestCasesDir, distributorTestCasesDir);
} else if (!fs.existsSync(sdkTestCasesDir)) {
  console.log(
    `No TestCases found for sdkVersion '${sdkVersion}' in either sdkResources or external directory`
  );
}

// Copy Fixtures
if (fs.existsSync(sdkFixturesDir)) {
  copyFiles(sdkFixturesDir, fcsFixturesDir);
}
if (fs.existsSync(configFixturesDir)) {
  const distributorFixturesDir = path.join(fcsFixturesDir, 'external');
  copyFiles(configFixturesDir, distributorFixturesDir);
} else if (!fs.existsSync(sdkFixturesDir)) {
  console.log(
    `No Fixtures found for sdkVersion '${sdkVersion}' in either sdkResources or external directory`
  );
}

// Process commonResources
if (fs.existsSync(commonResourcesDir)) {
  processCommonResources(commonResourcesDir);
} else {
  console.log(`No commonResources directory found.`);
}

// Function to process commonResources directory
function processCommonResources(sourceDir, externalMode = false) {
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(sourceDir, entry.name);

    if (entry.isDirectory()) {
      // Handle subdirectories
      if (entry.name === 'commonFixtures' || entry.name === 'fixtures') {
        const targetDir = externalMode
          ? path.join(fcsFixturesDir, 'external')
          : fcsFixturesDir;
        fs.mkdirSync(targetDir, { recursive: true });
        copyFiles(entryPath, targetDir);
        console.log(`Processed directory contents of: ${entryPath} to ${targetDir}`);
      } else if (entry.name === 'commonTestCases' || entry.name === 'TestCases') {
        const targetDir = externalMode
          ? path.join(fcsTestCasesDir, 'Distributor')
          : fcsTestCasesDir;
        fs.mkdirSync(targetDir, { recursive: true });
        copyFiles(entryPath, targetDir);
        console.log(`Processed directory contents of: ${entryPath} to ${targetDir}`);
      } else if (entry.name === 'external') {
        processCommonResources(entryPath, true); // Process externalMode
      } else {
        processCommonResources(entryPath, externalMode); // Process other subdirectories
      }
    } else if (entry.isFile()) {
      // Copy files directly
      if (entryPath.includes('fixtures') || entryPath.includes('commonFixtures')) {
        const targetDir = externalMode
          ? path.join(fcsFixturesDir, 'external')
          : fcsFixturesDir;
        fs.mkdirSync(targetDir, { recursive: true });
        const targetPath = path.join(targetDir, entry.name);
        fs.copyFileSync(entryPath, targetPath);
        console.log(`Copied fixture file: ${entryPath} to ${targetPath}`);
      } else if (entryPath.includes('TestCases') || entryPath.includes('commonTestCases')) {
        const targetDir = externalMode
          ? path.join(fcsTestCasesDir, 'Distributor')
          : fcsTestCasesDir;
        fs.mkdirSync(targetDir, { recursive: true });
        const targetPath = path.join(targetDir, entry.name);
        fs.copyFileSync(entryPath, targetPath);
        console.log(`Copied TestCase file: ${entryPath} to ${targetPath}`);
      }
    }
  }
}

// Function to copy files and directories
function copyFiles(configDir, externalDir) {
  fs.mkdirSync(externalDir, { recursive: true });

  const entries = fs.readdirSync(configDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(configDir, entry.name);
    const destPath = path.join(externalDir, entry.name);

    if (entry.name === 'README.md' && fs.existsSync(destPath)) {
      console.log(`Skipping copying README.md as it already exists in ${externalDir}`);
      continue;
    }
    entry.isDirectory() ? copyFiles(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
  }
  console.log(`Copied contents from ${configDir} to ${externalDir}`);
}

// Function to delete directories (with exclusions)
function deleteDirectory(directory, skipfolder) {
  if (fs.existsSync(directory)) {
    const files = fs.readdirSync(directory);
    files.forEach((file) => {
      if (file !== 'README.md' && file !== skipfolder) {
        const filePath = path.join(directory, file);
        fs.rmSync(filePath, { recursive: true, force: true });
      }
    });
  }
}
