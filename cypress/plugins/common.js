const fs = require('fs');

// If "genericSupport" is set to a falsy value (false, null, etc), take no further action. Simply "return"
function genericSupport(config) {
  // Read additional config.
  try {
    const data = JSON.parse(fs.readFileSync('supportConfig.json'));
    config.env = {
      ...config.env,
      ...data,
    };

    return config;
  } catch (error) {
    console.log('Received following error while trying to read supportConfig json', error);
    return config;
  }
}

module.exports = {
  genericSupport,
};
