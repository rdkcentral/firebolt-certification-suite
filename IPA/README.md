# External IPA

## Overview

IntegratedPlayer is a module for controlling and accessing media over streaming. For detailed API documentation, refer to the [IntegratedPlayer OpenRPC](https://fictional-broccoli-oz94r83.pages.github.io/apis/next).

Test coverage under IntegratedPlayer.feature includes:

- Pre-instance API calls and custom error validation
- Invalid parameter handling
- Player instance creation and API validation
- End-to-end behavioral validation for APIs and events
- Provider registration validation

## Pre-requisites

- IPA setup should be done on the device. See [Device setup](#Device-setup).
- FCS setup should be completed. See [FCS setup](#FCS-setup).

## Setup

### Device setup

1. Flash the latest stable2 build onto the device.
2. Navigate to `/etc/ripple/openrpc` and check if `firebolt-players-open-rpc.json` is present. If it is, move it to `/opt/ripple/openrpc`.
3. If the file is not present or is outdated, download it from [here](https://github.com/comcast-firebolt/firebolt-devices/blob/main/openrpc/extns/firebolt-players-open-rpc.json) and add it to `/opt/ripple/openrpc`.
4. Add the following entry to `/opt/firebolt-extn-manifest.json`:
   ```json
   "extn_sdks": [ "/opt/ripple/openrpc/firebolt-players-open-rpc.json" ]
   ```
5. Check the `firebolt-device-manifest.json` to ensure the following capability is present in the supported list. If not, add it:
   ```json
   "xrn:firebolt:capability:integrated-player:playback"
   ```
6. If the device is XSB, add the following app to the `firebolt-device-manifest.json`:
   ```json
   "com.xumo.ipa": [
       "*"
   ]
   ```
7. Restart ripple and sky using the following commands:
   ```sh
   systemctl restart ripple
   systemctl restart sky
   ```
8. If the device is XSB, download the IPA zip and unzip it. Open `index.html` from the folder and modify `document.location.href` to `https://ripa.firecert.comcast.com/latest/index.html`, then save it. Upload the widget to the device via port 8090.
9. After completing the above steps, you will have access to all the player methods.

### FCS setup

To execute the test cases against any platform, complete the following setup:

1. Configure optional dependencies:
   - [ ] Configuration module relevant to the platform under test. Refer to the [Config Module Setup](#Config-Module-Setup) section for more information.
2. Install the dependencies:
   ```sh
   yarn install
   ```
3. Pull the configurations (if applicable):
   ```sh
   yarn run setup
   ```
4. Provide the device configuration details by updating the `cypress.config.js` with the following details:
   ```markdown
   | Field                     | Type    | Sample Value             | Description                                                                                          |
   | --------------------------| ------- | -------------------------| -----------------------------------------------------------------------------------------------------|
   | deviceIp                  | string  | 10.0.0.2                 | IP of the device under test (should be in the same network as the runner)                            |
   | deviceMac                 | string  | F0:AA:XX:XX:XX:XX        | Mac address of the device under test                                                                 |
   | certification             | string  | IPA                      | The type of certification being run.                                                                 |                                                                                       
   | interactionsMetrics       | boolean | true                     | Makes a call to platform to start/stop listening to firebolt interactions based on action passed     |
   ```

### Config Module Setup

By default, the project uses a predefined configuration module referred to as the `defaultModule`. To utilize a custom config module, update the project's dependency settings within the `package.json` file:

```json
"dependencies": {
  "configModule": "git+ssh://<URL of Config Module>"
}
```

### Steps to Execute

Run the `integratedPlayer.feature` test case using the following command:

```sh
npm run cy:run -- --spec "cypress/TestCases/Distributor/IntegratedPlayer.feature" --env satClientId=<clientId>,satClientSecret=<clientsecret>,testSuite="module"
```

## Reports

### Final Single Report

Find the complete report on IPA-related features at the following URL:

[https://integratedplayer.firecert.comcast.com/02252025/Combined/index.html](https://integratedplayer.firecert.comcast.com/02252025/Combined/index.html)

## How to Read the Report

The report combines the results of four distinct features:

- **IPANegative**: Focuses on test cases that handle negative scenarios, such as passing invalid parameters and formats for each API, and testing invalid scenarios like attempting to start playing content before creating the player. Each step includes a "Show Info" section with request, response, and other parameter details. If a test case fails, the "Show Error" section provides the reason for the failure.

- **IPAParentalControl**: Describes how the player transitions according to different parameters, including blocking the player at a specified time, clearing the block afterwards, and extending the block to a certain time. Each step contains a "Show Info" section with necessary information, such as requests sent from the app, responses received from the platform, and the player's current status during the validation step. If any step fails, the "Show Error" section provides the reason for the failure.

- **IPASettingsAndTrickPlay**: Covers test cases involving setting the audio track, caption track, etc., after creating the player, and validating that the player is playing with the specified track sent in the request. The trick play part includes actions such as fast forwarding, rewinding, and changing the media position. The "Show Info" section provides details on the request, response, and other major communications. If any test case fails, the "Show Error" section lists the reason for the failure.

- **IPATransition**: Involves test cases that transition the created player from one state to another, such as transitioning the player from idle to pending, moving from pending to playing, and transitioning from playing to pending when loading a different channel. The "Show Info" section provides details on the request, response, and other major communications. If any test case fails, the "Show Error" section lists the reason for the failure.

## Known Issues

### IPA Bugs

Here are some examples of IPA bugs:

- [IMMUI-16926](https://ccp.sys.comcast.net/browse/IMMUI-16926)
- [IMMUI-16928](https://ccp.sys.comcast.net/browse/IMMUI-16928)
- [IMMUI-16929](https://ccp.sys.comcast.net/browse/IMMUI-16929)

### Cert Bugs

Here are some examples of cert bugs:

- [FIRECERT-2880](https://ccp.sys.comcast.net/browse/FIRECERT-2880)

## Troubleshooting Tips

If you encounter issues during setup or execution, consider the following troubleshooting tips:

1. **Device Connectivity**:
    - Ensure the device is properly connected to the network and is reachable via the IP address specified in the configuration.
    - Verify that the device's MAC address is correctly entered in the configuration file.

2. **Service Restarts**:
    - If changes are made to configuration files, restart the necessary services using:
      ```sh
      systemctl restart ripple
      systemctl restart sky
      ```

3. **Dependencies**:
    - Make sure all dependencies are installed correctly by running `yarn install`.
    - If there are issues with dependencies, try removing the `node_modules` directory and reinstalling.

4. **Configuration Issues**:
    - Verify that the `cypress.config.js` file is correctly updated with the device configuration details.
    - Ensure that the `package.json` file includes the correct configuration module if using a custom one.

5. **Logs and Errors**:
    - Check the logs for any error messages that can provide more details on what might be going wrong.
    - Use the "Show Error" sections in the report to understand the reasons for test case failures.

6. **Network Issues**:
    - Ensure that the network allows communication between the test runner and the device.
    - Check for any firewall or security settings that might be blocking the connection.



