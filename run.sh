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

# Function to execute cypress run with reporter-options
run() {
  command="cypress run --e2e --browser electron --reporter-options reportDir=./reports/$jobId,overwrite=false"
  # Concatenating  command with params
  finalCommand="$command $params"
  echo "[Running cypress command: $finalCommand]"

  #Executing the final command
  eval "$finalCommand"
}

# Calling function based on name
"$functionName"
