*Note:* All new entires should be made in alphabetical order.

| Variable | isMandatory | Description |
|----------|-------------|-------------|
| action | false | Action to be executed during the test run. Derived from the feature file if not explicitly set. `default: core` |
| additionalContext | false | Provides extra context parameters for overriding default execution settings in a test run. |
| apiObjectList | true | Stores a global list of API objects created during test execution. Each captured API call (e.g., screenshot requests) is appended here for later validation, reporting, or debugging. |
| appAssuranceTestTypes | false | List of test types for app assurance validation. `default: ["lifecycle foreground","lifecycle unload","lifecycle background"]` |
| appConfig | false | Name of the application configuration profile. `default: "default"` |
| appLaunch | false | Boolean flag indicating whether an app has already been launched, used to differentiate cold vs hot launch handling. |
| appLifecycleHistory | true | Stores the previously recorded lifecycle history of the app (array of state transition objects) for comparison against the latest history and events. |
| appMetadata | false | Provides application-specific metadata, including app type, intents, and configuration details. Used during app launch to resolve intents and set runtime environment variables. |
| appType | false | Specifies the type of application (e.g., firebolt, certification). Determines the mode in which the app should be launched if not explicitly provided. |
| appUrl | false | URL of the certification app used in execution. `default: "https://firecertapp.firecert.comcast.com/prod/index.html"` |
| asPort | false | Port for auxiliary service communication. `default: "9005"` |
| certification | false | Flag to indicate whether certification mode is enabled. Determines whether the SDK version should be taken from `device.version.api` (certification) or `device.version.sdk` (non-certification). |
| closeAppTestTypes | false | List of test types that require lifecycle close validation. `default: ["Profile","Keyboard","Parameters","Discovery.Launch","lifecycle","AcknowledgeChallenge","userGrants","lifeCycleApi","UserInterestProvider","Firebolt Sanity","AS_ColdLaunch","AppLaunch_withContext","AppLaunch_withoutContext","AppLaunch_withContext_ColdLaunch","AppLaunch_withoutContext_ColdLaunch","app launch"]` |
| combinedFireboltCalls | true | Contains a merged set of Firebolt call definitions and related data structures. Used to resolve prefixed values dynamically by mapping them to the appropriate Firebolt call object and extracting values. |
| combinedFireboltMocks | true | Contains merged mock definitions of Firebolt calls. Used to return predefined mock responses. |
| communicationMode | false | Determines the communication channel. |
| containerAppPercentile | false | Performance percentile threshold for container apps. `default: 70` |
| containerAppThreshold | false | Memory threshold (in KB) for container apps. `default: 204800` |
| customValidationTimeout | true | Defines the maximum wait time (in ms) for custom validation to complete when `waitForCompletion` is true. If not set, the SDK uses a default timeout. |
| dashboard_id | false | Dashboard identifier for performance monitoring. `default: 2` |
| decodeValue | true | Provides field mappings for decoding API responses (e.g., Base64, JWT). Used to determine which fields in a response should undergo decoding and validation checks. |
| default3rdPartyAppId | false | Default third-party application ID. `default: "comcast.test.firecert"` |
| dereferenceOpenRpc | true | JSON structure of the dereferenced OpenRPC schema. Used for validating Firebolt API specifications. |
| dereferenceOpenrpc | true | Holds the list of dereferenced OpenRPC documents used to fetch method or event schemas for validation. |
| deviceIp | true | IP address of the target device used to establish the WebSocket connection. |
| deviceMac | true | Represents the MAC address of the device under test. Used for identifying and validating the device during test execution. |
| DeviceMemoryUsedThreshold | false | Memory usage threshold in bytes. `default: 950000000` |
| DevicePerformancePercentile | false | Performance percentile threshold for device. `default: 70` |
| DeviceSystemUsedThreshold | false | System usage threshold. `default: 2.25` |
| deviceVersionCallEnabled | true | Flag that determines whether the `device.version` API should be invoked to fetch SDK version details. |
| discoveryAppId | false | Application ID used for discovery tests. `default: "fireboltCertificationSystemUI"` |
| dynamicDeviceDetailsModules | true | List of test types for which device details should be fetched dynamically. `default: ["Device"]` |
| enableScreenshots | true | Flag to enable or disable screenshot capturing during test execution. `default: false` |
| envParam | false | Dynamic environment variable key extracted from parameters (with `CYPRESSENV` prefix). |
| envSetupStatus | false | Boolean flag that indicates whether the test environment has already been set up. Prevents redundant setup steps from running again. |
| errorContentValidationJson | false | Provides predefined error validation schemas mapped by error keys; falls back to raw error string if not found. |
| eventObjectList | true | Stores the captured event objects (e.g., accessibility.closedCaptionsSettings) along with app and context for validation. |
| eventParam | false | To inject default event registration parameters when none are provided. `default: {"listen": true}` |
| exceptionMethods | false | Provides methods exempted from validation. `default: {"NOT_SUPPORTED_METHODS":[{"method":"Authentication.session"},{"method":"Authentication.token","param":{"type":"distributor"}},{"method":"Authentication.token","param":{"type":"distributor","options":{"clientId":"CIMA"}}},{"method":"Authentication.token","param":{"type":"distributor","options":{"clientId":"OAT"}}},{"method":"Localization.latlon"},{"method":"badger.OAuthBearerToken"}],"NOT_AVAILABLE_METHODS":[],"NOT_PERMITTED_METHODS":[]}` |
| excludeValidations | false | Defines keys and values to skip during validation (JSON object with arrays of excluded values). |
| excludedMethods | false | List of methods excluded from execution. `default: ["Accessory.pair","Device.provision","Power.sleep","Wifi.connect","Wifi.disconnect","Wifi.wps","Rpc.discover","Profile.approveContentRating","Profile.approvePurchase","Discovery.launch","Discovery.contentAccess","Lifecycle.finished","Keyboard.email","Keyboard.password","Keyboard.standard","Keyboard.standardFocus","Keyboard.passwordFocus","Keyboard.emailFocus","Keyboard.standardResponse","Keyboard.standardError","Keyboard.passwordResponse","Keyboard.passwordError","Keyboard.emailResponse","Keyboard.emailError","AcknowledgeChallenge.challengeFocus","AcknowledgeChallenge.challengeResponse","AcknowledgeChallenge.challengeError","PinChallenge.challengeFocus","PinChallenge.challengeResponse","PinChallenge.challengeError","UserGrants.grant","UserGrants.deny","UserGrants.clear","Account.session","Privacy.setAllowRemoteDiagnostics"]` |
| externalModuleTestTypes | false | List of external module test types. `default: ["Dismiss","Deeplink","lifecycle foreground","lifecycle unload","lifecycle background","app launch","Playback","AppLaunch_withContext","AppLaunch_withoutContext","Continue watching"]` |
| extensionSDK | false | SDK extension configuration object. `default: {"IntegratedPlayer":{"openRPCUrl":"https://api.github.com/repos/comcast-firebolt/firebolt-players-doc/contents/requirements/1.1.1/specifications/firebolt-specification.json","tokenFetchURL":"https://srg9qu45b9.execute-api.us-east-1.amazonaws.com/default/EntOsCertification/getServiceCreds"}}` |
| failOnPubsubConnectionError | false | Determines whether the SDK should throw an error if pub/sub connection fails. `default: true` |
| fcsSetterType | false | Setter type for FCS. `default: "default"` |
| fetch_device_details_dynamically | false | Whether to fetch device details dynamically. `default: true` |
| fireboltCallsJson | true | JSON file containing v1 Firebolt calls, merged with internal and external v2 calls to create a combined call set. |
| fireboltConfig | true | Firebolt configuration JSON object containing platform-specific settings and capabilities. |
| fireboltMocksJson | true | JSON file containing v1 Firebolt mocks, merged with internal and external v2 mocks to create a combined mock set. |
| fireboltSpecificationNextUrl | true | URL endpoint pointing to the next version of the Firebolt specification JSON. |
| fireboltSpecificationProposedUrl | true | URL endpoint pointing to the proposed version of the Firebolt specification JSON. |
| fireboltSpecificationUrl | true | URL endpoint pointing to the Firebolt specification JSON. |
| firstPartyAppId | true | Used to identify the first-party app (platform). `default: "fireboltCertificationSystemUI"` |
| giveDynamicAssetsPrecedence | false | Flag to give precedence to dynamic assets. `default: false` |
| grafanaAnnotationURL | false | Grafana API endpoint for annotations. `default: "http://fireboltperformance.comcast.com:3000/api/annotations"` |
| graphiteRenderURL | false | Graphite API endpoint for performance metrics rendering. `default: "http://fireboltperformance.comcast.com:8080/render"` |
| healthCheckRetries | true | Number of retry attempts for performing a third-party app health check. |
| includeValidations | false | Defines an allow-list for validation (JSON object with arrays of values to validate; others will be skipped). |
| interactionsMetrics | false | Flag to enable interaction metrics collection. `default: false` |
| intentTemplates | false | Defines predefined intent structures per appType and appId. |
| iuiAppId | false | App ID for IUI app. `default: "com.bskyb.epgui"` |
| iuiValidation | false | Flag to enable/disable IUI validation. `default: false` |
| isPerformanceMetricsEnabled | false | Tracks whether performance metrics service is currently active. |
| isScenarioExempted | false | Flag to determine whether the current scenario is exempted from standard error null-check validation. |
| jobId | false | Identifier for the running job. |
| lifecycleCloseTestTypes | true | List of test types that require lifecycle close validation. `default: ["Profile","Keyboard","Parameters","Discovery.Launch","lifecycle","AcknowledgeChallenge","userGrants","lifeCycleApi","UserInterestProvider","Firebolt Sanity","AS_ColdLaunch","AppLaunch_withContext","AppLaunch_withoutContext","AppLaunch_withContext_ColdLaunch","AppLaunch_withoutContext_ColdLaunch","app launch"]` |
| linchpinCompression | false | Flag to enable/disable compression for Linchpin. `default: true` |
| linchpinUrl | false | WebSocket URL for Linchpin. `default: "wss://linchpin.lp.xcal.tv:18082/listen?client=fca"` |
| maxVerticalScrollRetries | false | Maximum retries for vertical scrolling. `default: 3` |
| messageQueue | true | Global queue instance used for storing and retrieving responses. |
| notSupportedCapabilitiesList | true | List of capabilities explicitly marked as not supported. `default: []` |
| NOT_AVAILABLE_METHODS | false | Methods temporarily not available. `default: []` |
| NOT_PERMITTED_METHODS | false | Methods explicitly not permitted. `default: []` |
| NOT_SUPPORTED_METHODS | false | Methods not supported in current environment. `default: [{"method":"Authentication.session"},{"method":"Authentication.token","param":{"type":"distributor"}},{"method":"Authentication.token","param":{"type":"distributor","options":{"clientId":"CIMA"}}},{"method":"Authentication.token","param":{"type":"distributor","options":{"clientId":"OAT"}}},{"method":"Localization.latlon"},{"method":"badger.OAuthBearerToken"}]` |
| partnerId | false | Partner identifier. `default: "xumo"` |
| pendingFeatures | true | List of features marked as pending. `default: []` |
| performanceMetrics | true | Enables performance metrics collection and marker validation during test setup. |
| platformCommunication | false | Defines the communication mechanism for the platform. `default: "Websocket"` |
| platformType | false | Type of platform. `default: "ripple"` |
| player | false | Player application ID. `default: "comcast.test.firecert"` |
| prepareCertWidget | false | Flag to prepare certification widget. `default: false` |
| pubSubPublishSuffix | true | Suffix appended to topic names when publishing (e.g., _fcs). |
| pubSubSubscribeSuffix | true | Suffix appended to topic names when subscribing (e.g., _fca). |
| pubSubUrl | false | Defines the Pub/Sub service endpoint URL. |
| pubsubUuid | false | PubSub UUID. |
| regexEventValidation | true | Regex pattern for event detection. `default: "/(\\.on|\\.subscribeTo)\\S*/"` |
| responseTopicList | true | List of subscribed response topics. |
| RippleProcessPerformancePercentile | false | Performance percentile threshold for ripple processes. `default: 70` |
| RippleProcessRSSPSSThreshold | false | RSS/PSS threshold for ripple processes. `default: 1073741824` |
| runtime | true | Holds dynamic runtime environment data used for pattern replacement. |
| sanityReportPollingTimeout | false | Timeout value (in ms) for polling sanity test reports. |
| satTokenUrl | false | URL for SAT token retrieval. `default: "https://sat-prod.codebig2.net/v2/oauth/token?capabilities=x1:linchpin:fca:publish:1000,x1:linchpin:fca:subscribe"` |
| scenarioRequirements | true | Defines validation requirements for the scenario. |
| sdkVersion | false | Stores the current SDK version value if already available. |
| secondaryThirdPartyAppId | true | Secondary third-party application ID. `default: "comcast.test.firecert"` |
| setResponseJson | true | Holds mock response data for Firebolt methods/events. |
| suiteCommunicationMode | false | Defines the communication mode for running the test suite. |
| supportedSdk | true | List of supported SDKs. `default: ["Firebolt","Badger"]` |
| supportsPlatformCommunication | false | Indicates whether platform communication is supported. `default: true` |
| testType | true | Identifier for the currently running test type. |
| thirdPartyAppId | true | Identifier of the third-party app under test. |
| unloadingAppAfterTestTypes | false | Test types requiring app unload after execution. `default: ["Dismiss","Deeplink","lifecycle foreground","lifecycle unload","lifecycle background"]` |
| unloadingAppTestTypes | true | List of test types that involve unloading apps. `default: ["Firebolt Sanity","AS_ColdLaunch","lifecycle","Discovery.Launch","Parameters","userGrants","lifeCycleApi","app launch","lifecycle foreground","lifecycle unload","lifecycle background","AppLaunch_withContext","AppLaunch_withoutContext","AppLaunch_withContext_ColdLaunch","AppLaunch_withoutContext_ColdLaunch"]` |
| visibilityState | false | Visibility state configuration. `default: {"foreground":"visible","background":"visible","inactive":"hidden"}` |
| webSocketClient | false | Holds the active WebSocket client instance if created. |
| wsPort | false | Port number for the WebSocket connection. `default: "3474"` |
| wsUrlPath | false | Path for the WebSocket connection appended to the URL. `default: "?appId=testApp"` |
| wsUrlProtocol | false | Protocol for the WebSocket connection. |
