import { Given } from '@badeball/cypress-cucumber-preprocessor';

/**
 * @function 3rd party {string} is launched with {string} appId
 * @description Launch an application with additional classifier - firebolt certification app/ firebolt app
 * @param {String} appType - additional classifier for the app - Launch the certification app for certification validations. Launching a firebolt app for app certification
 * @param {String} appCallSign - The appId used to launch the app which is identified by the firebolt platform servicing the request
 * @example
 * Given 3rd party 'certification' app is launched
 * Given 3rd party 'firebolt' app is launched with 'foo' appId
 */
Given(/3rd party '(.+)' app is launched(?: with( '(.+)' appId))?$/, (appType, appCallSign) => {
  // Use the firebolt command Discovery.launch to launch the app. If app id given use the app id.
  // get the app id from environment variable.
  const appId =
    Cypress.env('default3rdPartyAppId') !== undefined
      ? Cypress.env('default3rdPartyAppId')
      : appCallSign; // this is for the app to know the appId used for launch, so that it can use the same for creating linchpin connection.

  // if appType is certificationApp, the appLaunch is for certification purposes. In such a case, discovery.launch should go with a basic intent that has the appId and the certification app role - badger/firebolt
  // create the request map
  // Basic intent to be sent to the app on launch
  let requestMap = { method: 'discovery.launch', param: { appId: appId } };
  if (appType.toLowerCase() === 'certification') {
    const appCategory = Cypress.env('appType') !== undefined ? Cypress.env('appType') : 'firebolt'; // appType defines whether the app should be launched in badger or firebolt mode.
    const messageIntent = {
      action: 'search',
      data: { query: '{"params":{"appId":"' + appId + '","appType":"' + appCategory + '"}}' },
      context: { source: 'device' },
    };
    requestMap = { method: 'discovery.launch', param: { appId: appId, intent: messageIntent } };
  }

  Cypress.env('currentAppId', appCallSign);

  cy.runIntentAddon('launchApp', requestMap).then((parsedIntent) => {
    cy.sendMessagetoPlatforms(parsedIntent).then((result) => {
      cy.log('Response from Firebolt platform: ' + JSON.stringify(result));
    });
  });
});
