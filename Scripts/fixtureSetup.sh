#! /bin/bash

echo "Running fixture setup command"

EXTERNAL_DIR="cypress/fixtures/external/"
CONFIG_DIR="./node_modules/configModule/testData/"

if [ -d "$CONFIG_DIR" ]; then
echo "Checking for testData directory in configModule"
    if [ ! -d "$EXTERNAL_DIR" ]; then
        mkdir -p $EXTERNAL_DIR
    fi
echo "Copying testData from configModule to fixtures"
cp -r ./node_modules/configModule/testData/* cypress/fixtures/external/
else
    echo "Data is not available in configModule"
fi
