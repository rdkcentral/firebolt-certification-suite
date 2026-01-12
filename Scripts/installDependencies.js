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

console.log(">>>>> Install dependencies script");

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PACKAGE_PATH = path.join(__dirname, '..', 'package.json');
const TEMP_CONFIG_DIR = path.resolve(__dirname, './tempConfigModule');
const CONFIG_DEPENDENCIES_DIR = path.resolve(__dirname, './tempConfigModule/dependencies');
const EXTERNAL_NPM_LOCK_FILE = path.join(CONFIG_DEPENDENCIES_DIR, 'package-lock.json');
const EXTERNAL_YARN_LOCK_FILE = path.join(CONFIG_DEPENDENCIES_DIR, 'yarn.lock');
const PROJECT_ROOT_DIR = path.resolve(__dirname, '..');

try {
    if (fs.existsSync(PACKAGE_PATH)) {
        // Get the existing package.json and its dependencies
        const packageDotJson = require(PACKAGE_PATH);
        const dependencies = packageDotJson?.dependencies;
        if (dependencies) {
            const extractedUrl = dependencies.configModule;
            const [configModuleUrl, configModulebranch] = extractedUrl.split('#');
            const fcsBranch = execSync('git branch --show-current', {encoding: 'utf8'}).trim();
            console.log(">>> fcsBranch: ", fcsBranch);
            !configModulebranch ? configModulebranch = 'dev' : null;
            if (configModuleUrl != "./defaultModule") {
                const cloneCmd = `git clone --branch ${configModulebranch} --single-branch ${configModuleUrl} ${TEMP_CONFIG_DIR}`;
                execSync(cloneCmd, { stdio: [0, 1, 2] });
                if (fs.existsSync(CONFIG_DEPENDENCIES_DIR)) {
                    if (fs.existsSync(EXTERNAL_NPM_LOCK_FILE)) {
                        fs.copyFileSync(EXTERNAL_NPM_LOCK_FILE, PROJECT_ROOT_DIR + '/package-lock.json');
                        execSync('rm -rf ' + TEMP_CONFIG_DIR, { stdio: [0, 1, 2] });
                        console.info('Installing dependencies using npm ci');
                        execSync('npm ci', { stdio: [0, 1, 2] })
                    }
                    else if (fs.existsSync(EXTERNAL_YARN_LOCK_FILE)) {
                        fs.copyFileSync(EXTERNAL_YARN_LOCK_FILE, PROJECT_ROOT_DIR + '/yarn.lock');
                        execSync('rm -rf ' + TEMP_CONFIG_DIR, { stdio: [0, 1, 2] });
                        console.info('Installing dependencies using yarn install --frozen-lockfile');
                        execSync('yarn install --frozen-lockfile', { stdio: [0, 1, 2] })
                    }
                    else {
                        throw new Error('No lock file found in configModule dependencies. Proceeding with regular installation.');
                    }
                } else {
                    throw new Error('No configModule dependencies directory found. Proceeding with regular installation.');
                }
            } else {
                console.info('Using default configModule. Proceeding with regular installation.');
                execSync('npm ci', { stdio: [0, 1, 2] })
            }
        } else {
            throw new Error('Dependencies not found in package.json');
        }
    }
} catch (error) {
    console.warn('Error installing locked dependencies. Reverting to regular installation: ', error);
    execSync('yarn install', { stdio: [0, 1, 2] })
}