*Note:* All new entires should be made in alphabetical order.

| Variable | isMandatory | Description |
|----------|-------------|-------------|
| action | false | Action to be executed during the test run. Derived from the feature file if not explicitly set. |
| additionalContext | false | Provides extra context parameters for overriding default execution settings in a test run. |
| apiObjectList | true | Stores a global list of API objects created during test execution. Each captured API call (e.g., screenshot requests) is appended here for later validation, reporting, or debugging. |
| appLaunch | false | Boolean flag indicating whether an app has already been launched, used to differentiate cold vs hot launch handling. |
| appLifecycleHistory | true | Stores the previously recorded lifecycle history of the app (array of state transition objects) for comparison against the latest history and events. |
| appMetadata | false | Provides application-specific metadata, including app type, intents, and configuration details. Used during app launch to resolve intents and set runtime environment variables. |
| appType | false | Specifies the type of application (e.g., firebolt, certification). Determines the mode in which the app should be launched if not explicitly provided. |
| certification | false | Flag to indicate whether certification mode is enabled. Determines whether the SDK version should be taken from `device.version.api` (certification) or `device.version.sdk` (non-certification). |
| combinedFireboltCalls | true | Contains a merged set of Firebolt call definitions and related data structures. Used to resolve prefixed values dynamically by mapping them to the appropriate Firebolt call object and extracting values. |
| combinedFireboltMocks | true | Contains merged mock definitions of Firebolt calls. Used to return predefined mock responses. |
| communicationMode | false | Determines the communication channel. |
| customValidationTimeout | true | Defines the maximum wait time (in ms) for custom validation to complete when `waitForCompletion` is true. If not set, the SDK uses a default timeout. |
| decodeValue | true | Provides field mappings for decoding API responses (e.g., Base64, JWT). Used to determine which fields in a response should undergo decoding and validation checks. |
| dereferenceOpenRpc | true | JSON structure of the dereferenced OpenRPC schema. Used for validating Firebolt API specifications. |
| dereferenceOpenrpc | true | Holds the list of dereferenced OpenRPC documents used to fetch method or event schemas for validation. |
| deviceIp | true | IP address of the target device used to establish the WebSocket connection. |
| deviceMac | true | Represents the MAC address of the device under test. Used for identifying and validating the device during test execution. |
| deviceVersionCallEnabled | true | Flag that determines whether the `device.version` API should be invoked to fetch SDK version details. |
| dynamicDeviceDetailsModules | true | List of test types for which device details should be fetched dynamically and updated in run info during setup. |
| enableScreenshots | true | Flag to enable or disable screenshot capturing during test execution. |
| envParam | false | Dynamic environment variable key extracted from parameters (with `CYPRESSENV` prefix). |
| envSetupStatus | false | Boolean flag that indicates whether the test environment has already been set up. Prevents redundant setup steps from running again. |
| errorContentValidationJson | false | Provides predefined error validation schemas mapped by error keys; falls back to raw error string if not found. |
| eventObjectList | true | Stores the captured **event objects** (e.g., `accessibility.closedCaptionsSettings`) along with app and context for validation. |
| eventParam | false | To inject default event registration parameters when none are provided. |
| exceptionMethods | false | Provides a list of methods and optional parameters that are exempted from standard validation checks. |
| excludeValidations | false | Defines keys and values to skip during validation (JSON object with arrays of excluded values). |
| failOnPubsubConnectionError | false | Determines whether the SDK should throw an error if pub/sub connection fails. |
| fireboltCallsJson | true | JSON file containing v1 Firebolt calls, merged with internal and external v2 calls to create a combined call set. |
| fireboltConfig | true | Firebolt configuration JSON object containing platform-specific settings and capabilities. |
| fireboltMocksJson | true | JSON file containing v1 Firebolt mocks, merged with internal and external v2 mocks to create a combined mock set. |
| fireboltSpecificationNextUrl | true | URL endpoint pointing to the **next** version of the Firebolt specification JSON. |
| fireboltSpecificationProposedUrl | true | URL endpoint pointing to the **proposed** version of the Firebolt specification JSON. |
| fireboltSpecificationUrl | true | URL endpoint pointing to the Firebolt specification JSON. |
| firstPartyAppId | true | Used to identify the first-party app (platform). |
| healthCheckRetries | true | Number of retry attempts for performing a third-party app health check. |
| includeValidations | false | Defines an allow-list for validation (JSON object with arrays of values to validate; others will be skipped). |
| intentTemplates | false | Defines predefined intent structures per appType and appId. |
| isPerformanceMetricsEnabled | false | Tracks whether performance metrics service is currently active. |
| isScenarioExempted | false | Flag to determine whether the current scenario is exempted from standard error null-check validation. |
| jobId | false | Identifier for the running job. |
| lifecycleCloseTestTypes | true | List of test types that require lifecycle close validation. |
| messageQueue | true | Global queue instance used for storing and retrieving responses. |
| notSupportedCapabilitiesList | true | List of capabilities explicitly marked as not supported. |
| NOT_AVAILABLE_METHODS | false | List of methods that are temporarily **not available** due to configuration or platform constraints. |
| NOT_PERMITTED_METHODS | false | List of methods that are explicitly **not permitted** to run due to restrictions or policies. |
| NOT_SUPPORTED_METHODS | false | List of methods that are **not supported** in the current environment. |
| pendingFeatures | true | List of features marked as pending. |
| performanceMetrics | true | Enables performance metrics collection and marker validation during test setup. |
| pubSubPublishSuffix | true | Suffix appended to topic names when publishing (e.g., `_fcs`). |
| pubSubSubscribeSuffix | true | Suffix appended to topic names when subscribing (e.g., `_fca`). |
| pubSubUrl | false | Defines the Pub/Sub service endpoint URL. |
| pubsubUuid | false | PubSub UUID. |
| regexEventValidation | true | Regex pattern used to identify whether a given methodOrEvent should be treated as an event or a getter/setter during response validation. |
| responseTopicList | true | List of subscribed response topics. |
| runtime | true | Holds dynamic runtime environment data used for pattern replacement. |
| sanityReportPollingTimeout | false | Timeout value (in ms) for polling sanity test reports. |
| scenarioRequirements | true | Defines validation requirements for the scenario. |
| sdkVersion | false | Stores the current SDK version value if already available. |
| secondaryThirdPartyAppId | true | Secondary third-party application ID. |
| setResponseJson | true | Holds mock response data for Firebolt methods/events. |
| suiteCommunicationMode | false | Defines the communication mode for running the test suite. |
| supportedSdk | true | List of supported SDKs (e.g., Firebolt). |
| testType | true | Identifier for the currently running test type. |
| thirdPartyAppId | true | Identifier of the **third-party app** under test. |
| unloadingAppTestTypes | true | List of test types that involve unloading apps. |
| webSocketClient | false | Holds the active WebSocket client instance if created. |
| wsPort | false | Port number for the WebSocket connection. |
| wsUrlPath | false | Path for the WebSocket connection appended to the URL. |
| wsUrlProtocol | false | Protocol for the WebSocket connection. |
