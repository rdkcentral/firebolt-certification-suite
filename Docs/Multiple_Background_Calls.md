# Multiple Background Calls

## Multiple background calls with config module request override:

### Background:

For [static objects](../cypress/fixtures/docs/staticJSONObjects.md) and [dynamic objects](../cypress/fixtures/docs/dynamicObjects.md) formats used in FCS test execution, we can invoke multiple calls for an existing FCS action (which can be any fireboltCall configuration) by overriding the request in configModule.

For example, for the accessibility module, the following step is executed in dynamic objects format for invoking a setter method: `Given 1st party app invokes the 'Firebolt' API to set value`. So here, if we want to invoke "setFontFamily" with the value as "monospaced_sanserif", the step is mentioned in the corresponding js object as: `setMethod: resolveAtRuntime('manage_closedcaptions.set{{attribute.uppercaseFirstChar}}')`, which is mentioned [here](../cypress/fixtures/fireboltCalls/accessibility.js).

While invoking the setFontFamily method, if we have to call some more methods in the background, we can do that by overriding these requests in the configModule. For example, if we have to invoke an AS call for audioDescriptions in the background when setFontFamily of the accessibility module is called, we can override setFontFamily in the corresponding configModule.

### Implementation:

For overriding `closedcaptions.setFontFamily`, we have to create a file called closedcaptions.js within the requestModules folder of configModule. Then, if setFontFamily is to be overridden, we have to create a function named setFontFamily in the closedcaptions.js file.

### Example :
```
async function setFontFamily(fireboltCall) {
     if(fireboltCall){
      //configModule backend call
      // AS call for audioDescriptions
        let Url= "http://<deviceIp>:"+Cypress.env(CONSTANTS.AS_PORT)+"/as/players/setting/audioDescription";
      try {
        response = await axios.get(Url, {
          headers: {
            Accept: "application/json"
          }
        });
      } catch (error) {
        cy.log(`Error getting response: ${error}`);
      }
  }
  cy.log(`AudioDescriptions get call response (2nd call) : ${JSON.stringify(response)}`)
  if( response ){
    //if response of AS call is received, invoke the fireboltCall of setFontFamily
    return UTILS.createLinchpinRequestMessage(fireboltCall)
  }else{
    fireLog.info(`AudioDescription Call Failed in setFontFamily override of closedCaptions`);
  }
}

```


As per the code mentioned above, if we have to override `setFontFamily`, we have to create a function called setFontFamily within the closedcaptions.js file. In this case, we have added an AS call for getting the audioDescriptions status first. If the response of this AS call is as expected, then we invoke the setFontFamily API with the corresponding format. We can add multiple calls and validations for the inner calls used in the override function as per the requirement.
