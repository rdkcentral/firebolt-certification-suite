/**
 * Copyright 2024 Comcast Cable Communications Management, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
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
        console.log(`Default subdirectory '${dir}' created.`);
      } else if (dir === 'requestModules') {
        // Special handling for requestModule to look for missing files.

        const defaultFiles = await fs.readdir(defaultSubDirPath);

        for (const file of defaultFiles) {
          const defaultFilePath = path.join(defaultSubDirPath, file);
          const targetFilePath = path.join(targetSubDirPath, file);

          const fileExists = await fs.pathExists(targetFilePath);
          if (!fileExists) {
            await fs.copy(defaultFilePath, targetFilePath);
            console.log(`Copied '${file}' to 'requestModule'.`);
          }
        }
        const defaultIndexPath = path.join(defaultSubDirPath, 'index.js');
        const targetIndexPath = path.join(targetSubDirPath, 'index.js');

        const defaultIndexExists = await fs.pathExists(defaultIndexPath);
        const targetIndexExists = await fs.pathExists(targetIndexPath);

        if (defaultIndexExists) {
          const defaultContent = await fs.readFile(defaultIndexPath, 'utf8');
          const targetContent = targetIndexExists ? await fs.readFile(targetIndexPath, 'utf8') : '';

          // Merge contents, remove duplicates
          const mergedLines = new Set([
            ...targetContent.split('\n'),
            ...defaultContent.split('\n'),
          ]);

          const mergedContent = Array.from(mergedLines).join('\n');

          // Write back to target index.js
          await fs.writeFile(targetIndexPath, mergedContent, 'utf8');
          console.log(
            `Merged 'index.js' content from defaultModule to configModule/requestModule.`
          );
        }
      }
    }
  } catch (err) {
    console.log('Error ensuring config module:', err);
    process.exit(1);
  }
};

ensureConfigModule();
