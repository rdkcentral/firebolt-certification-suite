# FCS Setters

Hello this is a sample FCS Setters README document.

This will explain what should be going into the "fcsSetters.js" file as well as provide examples and an explanation for each setter.

1. [Return Values](#return-values)
2. [Required Functions](#required-functions)
    * [setClosedCaptions](#setClosedCaptions)
3. [Optional Funcitons](#optional-functions)

## Return Values

All fcsSetter functions must return one of 3 values. Any other value returned will throw an error. For all values, the message is optional.

**setterSuccess(message)** - Return this to indicate that the setter executed successfully.

**setterFailure(message)** - Return this to indicate that the setter did not execute successfully.

**setterNotImplemented(message)** - Return this to indicate that the setter is not yet implemented. *This will automatically be returned if FCS attempts to invoke a setter that does not exist*.

## Required Functions

<details id="setClosedCaptions">
<summary><b>fcsSetters.setClosedCaptions</b></summary>

```
function setClosedCaptions(value, attribute) {
    return setterSuccess("I did it!");
}
```

Closed Captions can operate with either 1 or 2 parameters.

When **enabling** or **disabling** closed captions, the *true* or *false* booleans will be passed as the first parameter.

Ex: ```fcs.setClosedCaptions(true)``` seeks to enable Closed Captions

When **setting an attribute** of closed captions, the *value* will be passed as the first parameter, and the *attribute* as the second.

Ex: ```fcs.setClosedCaptions("Arial", "FontFamily")``` seeks to set the Closed Captions "Font Family" to "Arial"

</details>

## Optional Functions

<details>
<summary> fcsSetters.setNotRequired </summary>
It said not required...
</details>