const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths to the relevant package.json files and temporary backup
const fcsPackagePath = path.join(__dirname, '..', 'package.json');
const configModulePath = path.join(__dirname, '..', 'node_modules', 'configModule', 'package.json');
const tmpPackagePath = path.join(__dirname, '..', 'tmp_package.json');

function applyDependencyOverrides() {
  if (fs.existsSync(configModulePath)) {
    const configModulePackage = require(configModulePath);

    if (configModulePackage.dependencyOverrides) {
      console.log('Applying dependency overrides...');

      // Backup the original package.json
      fs.copyFileSync(fcsPackagePath, tmpPackagePath);
      const fcsPackage = JSON.parse(fs.readFileSync(fcsPackagePath, 'utf8'));
      let hasOverrides = false;

      for (const [pkg, version] of Object.entries(configModulePackage.dependencyOverrides)) {
        if (fcsPackage.dependencies && fcsPackage.dependencies[pkg]) {
          console.log(`Overriding ${pkg} to version ${version}...`);
          fcsPackage.dependencies[pkg] = version;
          hasOverrides = true;
        }
      }

      if (hasOverrides) {
        fs.writeFileSync(fcsPackagePath, JSON.stringify(fcsPackage, null, 2));
        console.log('Updated package.json with dependency overrides.');

        // Run yarn install with the updated package.json
        execSync(`yarn install --ignore-scripts`, { stdio: 'inherit' });
        console.log('Dependency overrides applied.');
      } else {
        console.log('No relevant dependency overrides found.');
      }

      // Revert to the original package.json
      fs.copyFileSync(tmpPackagePath, fcsPackagePath);
      fs.unlinkSync(tmpPackagePath);
      console.log('Reverted to the original package.json.');
    } else {
      console.log('No dependency overrides found.');
    }
  } else {
    console.error('Config module not found.');
  }
}

applyDependencyOverrides();
