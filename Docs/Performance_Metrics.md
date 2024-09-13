# Performance Metrics

### Background

The Firebolt Certification Suite includes a feature to capture device performance metrics and validate them in an automated way. The goal is to simplify the process of capturing, fetching, and validating performance data, enabling any properly configured device to easily conduct performance testing.

Here is the explanation of what data is being captured and validated:

- **Device**
  - **Memory**: This refers to the memory (RAM or other types) that is directly accessible by a particular hardware device (e.g., a GPU, network card, or storage device).
  - **Load**: This typically refers to the current usage or demand placed on a particular device (e.g., CPU, GPU, or storage).
- **Process**
  - **Memory**: This refers to the memory allocated to a specific process running on the system. It includes the process's stack, heap, and any memory-mapped files or shared libraries it uses.
  - **Load**: Similar to device load, this refers to the amount of computational demand placed on a particular process. It includes both CPU and memory usage.
  - **Set Size**: This usually refers to the "working set size" of a process, which is the amount of memory currently in use by the process that is resident in physical memory (RAM), as opposed to being swapped out to disk.
    - **RSS and PSS** are the main memory indicators for measuring memory usage:
      - **RSS**: Resident Set Size, actual physical memory usage, including shared libraries.
      - **PSS**: Proportion Set Size, the actual physical memory used, with shared libraries allocated proportionally.

**Note:** The device should support the performance metrics service.

## Implementations

- [Given Metrics collection process is '(initiated|stopped)'](/cypress/support/step_definitions/validations.md#metrics-collection-process-is-initiatedstopped)
  
  This step is responsible for starting or stopping the collectd process on the supported device.
  
  **Examples:**

  ```
  Given Metrics collection process is 'initiated'
  
  Given Metrics collection process is 'stopped'
  ```

- [Validate (device|process|all) (memory|load|set size|required) consumption is within the limit of the threshold(?: of '(.+)' (cpu|bytes) with '(.+)' percentile)?](/cypress/support/step_definitions/validations.md#validate-deviceprocessall-memoryloadset-sizerequired-consumption-is-within-the-limit-of-the-threshold-of--cpubytes-with--percentile)
  
  This step is responsible for calling the Graphite API, fetching the performance metrics, and validating the metrics based on the given parameters.

  **Examples:**

  ```
   * Then Validate device load consumption is within the limit of the threshold
  
   * Then Validate process set size consumption is within the limit of the threshold of '1073741824' bytes with '70' percentile
  
   * Then Validate all required consumption is within the limit of the threshold
  ```

- CreateMarker
  
  This can be called from the [`beforeOperation`](/README.md#before-operation) object present in the module requirement JSON to create a marker on the Grafana dashboard.
  
  **Example:**

  ```
  "scenarioNames":{
     "<Feature file name>": {
        "<Name of the scenario how it is added in feature file>": {
           "beforeOperation": [
              {
                 "createMarker": true
              }
           ]
        },
     }
  }
  ```
