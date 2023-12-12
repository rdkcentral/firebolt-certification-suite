const reporter = 'mochawesome';

const reporterOptions = {
    reportTitle: 'TestSuiteReport',
    reportPageTitle: 'TestSuiteReport',
    charts: true,
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true,
    timestamp: 'mmddyyyy_HHMMss',
  };
  
  const env = {
    deviceIp: '10.0.0.70',
    deviceMac: '',
    deviceCommPort: '3474',
    default3rdPartyAppId: 'comcast.test.firecert',
    sec3rdPartyAppId: 'comcast_firebolt_reference',
    comcast_firebolt_referenceURL: 'https://firecertapp.firecert.comcast.com/prod/index.html', // Question: to be updated if mock is used. should this move under generic support rather than be here?
    mock: false, // to be used when running against mock firebolt. by default should be set to false
    mockUser: '456~A',
    firstPartyAppId: 'firstPartyAppId',
    appUrl: 'https://firecertapp.firecert.comcast.com/edge/index.html',
    certification: false,
    reportType: 'cucumber',
    deleteReport: true,
    apiObjectList: [],
    eventObjectList: [],
    skipContentValidation: false
  };

  const e2e = {
    supportFile: 'cypress/support/fireboltCertification.js',
    specPattern: '**/*.feature'
  };

  const chromeWebSecurity = false;

  module.exports = { reporter, reporterOptions, env, e2e, chromeWebSecurity };