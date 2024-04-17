## Config Manager

This config manager loads in configuration modules and when sending a Firebolt request looks to the configuration module to see if there's an override function set for that module.method. If one is found, it is invoked. 
Note: Configuration modules are expected to export all request and response modules in order to be able to use them in config manager.

### Supported Commands

#### > config.getRequestOverride(fireboltObject)
 
This function will look for any request override config present for given firebolt module/method. This function would return same fireboltObject if no config exists. **Note**: It is the responsibility of the configuration module's request overrides to create an object that the tranpsort manager knows how to handle.

Order of Operations
* If "requestModules/\<module\>.js-\>\<method\>()" exists, it should always be called for the \<module\>.\<method\> FB method (Ex: requestModules/discovery.js-\>launch()).
* If "requestModules/\<module\>.js-\>defaultMethod()" exists, it should be called for all methods inside of module \<module\> unless there is a module/method override (Ex: requestModules/discovery.js-\>defaultMethod()).
* If "requestModules/defaultModule.js-\>defaultMethod()" exists, it should be called for all modules and methods unless there is a module or module/method override (Ex: requestModules/defaultModule.js-\>defaultMethod()).
* If no "reqeustModules/defaultModules.js" exists return fireboltObject.


Ex:
```
request: config.getRequestOverride({"method": "module.method", "param": paramObject})

If override
response: { "transport": "<transportMode>", "options": optionObject, "payload" : "<payload" }}
Else
response: {"method": "module.method", "param": paramObject}
```
Note: specific examples will be dependent on the configuration module.

#### > config.getResponseOverride(fireboltResponse)

This function will look for any response override config present for given firebolt module/method read in [config.getRequestOverride(fireboltObject)](#-configgetrequestoverridefireboltobject). This function would return same response if no config exists. **Note**: It is the responsibility of the configuration module's response overrides to determine what kind of response is expected from the transport manager. (Ex: If a method has a request override that returns an HTTP MTC call, the response override should know to expect the MTC response object for an HTTP call)

Order of Operations
* If "responseModules/\<module\>.js-\>\<method\>()" exists, it should always be called for the \<module\>.\<method\> FB method (Ex: responseModules/discovery.js-\>launch()).
* If "responseModules/\<module\>.js-\>defaultMethod()" exists, it should be called for all methods inside of module \<module\> unless there is a module/method override (Ex: responseModules/discovery.js-\>defaultMethod()).
* If "responseModules/defaultModule.js-\>defaultMethod()" exists, it should be called for all modules and methods unless there is a module or module/method override (Ex: responseModules/defaultModule.js-\>defaultMethod()).
* If no "responseModules/defaultModules.js" exists return fireboltResponse.

Ex:

```
request: config.getResponseOverride(<responseFromTransportManager>)

If override
response: <modifiedResponse>
Else
response: <responseFromTransportManager>
```
Note: specific examples will be dependent on the configuration module.
