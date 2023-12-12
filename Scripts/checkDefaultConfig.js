const fs = require('fs-extra');
const path = require('path');

const defaultModulePath = path.join(__dirname, '../defaultModule');
const configModulePath = path.join(__dirname, '../node_modules', 'configModule');

const ensureConfigModule = async () => {
  try {
    const existsConfigModule = await fs.pathExists(configModulePath);

    if (!existsConfigModule) {
      // If the whole configModule doesn't exist, copy the defaultModule.
      await fs.copy(defaultModulePath, configModulePath);
      console.log('Default configModule created.');
      return;
    }

    // If configModule exists, check for subdirectories.
    const subdirectories = await fs.readdir(defaultModulePath);

    for (const dir of subdirectories) {
      const defaultSubDirPath = path.join(defaultModulePath, dir);
      const targetSubDirPath = path.join(configModulePath, dir);

      const existsSubDir = await fs.pathExists(targetSubDirPath);
      if (!existsSubDir) {
        // Copy missing subdirectory from defaultModule.
        await fs.copy(defaultSubDirPath, targetSubDirPath);
        console.log(`Default subdirectory ${dir} created.`);
      }
    }
  } catch (err) {
    console.error('Error ensuring config module:', err);
    process.exit(1);
  }
};

ensureConfigModule();
