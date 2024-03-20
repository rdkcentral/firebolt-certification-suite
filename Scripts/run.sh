#!/bin/bash

# Reading first parameter from the scripts to call function
functionName="$1"
shift
# Reading all parameters except first parameter
params=$@

# Creating UUID
generateUUID() {
  case "$OSTYPE" in
    darwin*)
      UUID=$(uuidgen | tr '[:upper:]' '[:lower:]')
      ;;
    *)
      # For Linux, use the original method
      UUID=$(date +%s%N | md5sum | sed 's/\(..\)\(..\)\(..\)\(..\)\(..\)\(..\)\(..\)\(..\).*/\1\2-\3\4-\5\6-\7\8/' | tr '[:upper:]' '[:lower:]')
      ;;
  esac
  echo "$UUID"
}

# Function to extract value of params that contain spaces
modifyParams() {
params="$@"  # Capture all arguments
env_section=$(echo "$params" | grep -oP -- '--env\s+\K(.*?)(?=\s+--|$)')
IFS=',' read -ra param_value_pairs <<< "$env_section"

# Loop through parameter-value pairs and remove pair from params if it contains spaces
for pair in "${param_value_pairs[@]}"; do
    if [[ "$pair" == *" "* ]]; then
        key=$(echo "$pair" | cut -d'=' -f1)
        value=$(echo "$pair" | cut -d'=' -f2-)
        export CYPRESS_$key="$value"
        # Remove the pair from params
        params=$(echo "$params" | sed "s/$pair,//")
    fi
done
}

isCombinedTestRun() {
  params="$@"  # Capture all arguments
  # Extract the value after --spec
  specValue=$(echo "$params" | grep -oP -- '--spec \K[^ ]*')

  if [[ "$specValue" == "*" || "$specValue" == *","* ]]; then
    echo "true"
  else
    echo "false"
  fi
}
isCombinedTest=$(isCombinedTestRun $params)

# Try to extract jobId from the parameters
jobId=''
processingEnvArgs=false
for arg in $params; do
  case $processingEnvArgs in
    true)
      for envArg in $(echo $arg | tr ',' ' '); do
        case $envArg in
          jobId=*)
            jobId="${envArg#*=}"
            break 2
            ;;
        esac
      done
      processingEnvArgs=false
      ;;
    false)
      case $arg in
        --env)
          processingEnvArgs=true
          ;;
      esac
      ;;
  esac
done

# If jobId is not found in the parameters, generate a new one
if [ -z "$jobId" ]; then
  jobId=$(generateUUID)
fi

# Exporting jobId as cypress env variable
export CYPRESS_jobId=$jobId
export CYPRESS_isCombinedTestRun=$isCombinedTest

# Function to execute cypress run with reporter-options
run() {
  command="cypress run --e2e --reporter-options reportDir=./reports/$jobId,overwrite=false"
  # modify params if they contain spaces and add it to finalCommand
  modifyParams $params
  finalCommand="$command $params"
  echo "[Running cypress command: $finalCommand]"

  #Executing the final command
  eval "$finalCommand"
}

# Open Cypress without report options
open() {
  command="cypress open --e2e"
  # Concatenating  command with params
  finalCommand="$command $params"
  echo "[Running cypress command: $finalCommand]"

  #Executing the final command
  eval "$finalCommand"
}

# Calling function based on name
"$functionName"