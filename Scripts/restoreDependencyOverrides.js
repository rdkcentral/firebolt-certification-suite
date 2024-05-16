const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths to the relevant package.json files and original package versions file
const fcsPackagePath = path.join(__dirname, '..', 'package.json');
const originalVersionsFile = path.join(__dirname, '..', 'originalPkgVersion.json');

function restoreDependencyOverrides() {
  if (fs.existsSync(originalVersionsFile)) {
    const originalVersions = JSON.parse(fs.readFileSync(originalVersionsFile, 'utf8'));
    const fcsPackage = JSON.parse(fs.readFileSync(fcsPackagePath, 'utf8'));
    for (const [pkg, version] of Object.entries(originalVersions)) {
      if (fcsPackage.dependencies && fcsPackage.dependencies[pkg]) {
        console.log(`Restoring ${pkg} to version ${version}...`);
        fcsPackage.dependencies[pkg] = version;
      }
    }
    fs.writeFileSync(fcsPackagePath, JSON.stringify(fcsPackage, null, 2));
    // Run yarn install with the updated package.json
    execSync(`yarn install --ignore-scripts`, { stdio: 'inherit' });
    console.log('Package.json restored to original versions and installed all the dependencies.');

    // Delete the original versions file
    fs.unlinkSync(originalVersionsFile);
    console.log('Original versions file deleted.');
  } else {
    console.log('Original versions file not found. No restoration needed.');
  }
}

restoreDependencyOverrides();
