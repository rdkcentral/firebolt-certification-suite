const setClosedCaptions = async (params) => {
  console.log('PARams::+JSON.stringify(params)');
  const { attribute, value } = params;
  if (attribute === 'Enabled') {
    const response = await cy.sendMessageToPlatform('Accessibility.setClosedCaptions', value);
    if (response?.result) {
      return setterSuccess(`Successfully ${value}d closed captions`);
    }
    return setterFailure(`Unable to set ${value} closed captions`, JSON.stringify(response));
  }
  throw new Error('Invalid attribute for setEnabled');
};

// Add additional methods
const fcsSetter = {
  setClosedCaptions,
};

export default fcsSetter;
