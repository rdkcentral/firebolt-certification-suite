
const setEnabled = async (params) => {
  console.log('Inside set closed caption for FCS setter');
  const { attribute, value } = params;
  console.log('Inside setEnabled');
  if (attribute === 'Enabled') {
    const response = await cy.sendMessageToPlatform('Accessibility.setClosedCaptions', value);
    if (response?.result) {
      return setterSuccess(`Successfully ${value}d closed captions`);
    }
    return setterFailure(`Unable to set ${value} closed captions`, JSON.stringify(response));
  }
  throw new Error('Invalid attribute for setEnabled');
};

// Add additional methods if needed
const fcsSetter = {
  setEnabled,
};

export default fcsSetter;
