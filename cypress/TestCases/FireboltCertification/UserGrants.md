# Firebolt Certification
Feature file for Firebolt Certification UserGrants Module.

## Purpose
A module for managing grants given by the user.

## Pre requisites :
1.**Grant Policies**
* Grant Policies specify details like how long the grant lasts and what is the scope of the grant. 
* We have to add the corresponding grantPolicy of the capability we are testing inside "grantPolicies" object within "capabilities" object of deviceManifest file.
* This object will be having the grantpolicy for manage, use and provide roles.
  For eg:, for localization.postalCode,
    "capabilities": {
                        "supported": [ 
                            ...
                        ],
                        "dependencies": {
                                ...
                        },
                        "grantPolicies": {
                            "xrn:firebolt:capability:localization:postal-code": {
                                    "use": {
                                        "options": [
                                            {
                                                "steps": [
                                                    {
                                                        "capability": "xrn:firebolt:capability:usergrant:pinchallenge",
                                                        "configuration": {
                                                            "pinSpace": "purchase"
                                                        }
                                                    },
                                                    {
                                                        "capability": "xrn:firebolt:capability:usergrant:acknowledgechallenge"
                                                    }
                                                ]
                                            }
                                        ],
                                        "scope": "app",
                                        "lifespan": "once",
                                        "overridable": false
                                    }
                        }

    }

 2.**Dependencies** 
 * Capabilities which are dependent on other grantPolicy, have to be added inside "dependencies" object of "capabilities" object.
 * For eg:, if "discovery.watched" api has to use the grantPolicy of "app-usage", then we have to add the dependency as following :
    "capabilities": {
                        "supported": [ 
                            ...
                        ],
                        "dependencies": {
                                "xrn:firebolt:capability:discovery:watched": [
                                    "xrn:firebolt:capability:data:app-usage"
                                ]
                        },
                        "grantPolicies": {
                            "xrn:firebolt:capability:data:app-usage": {
                                "use": {
                                "options": [
                                    {
                                    "steps": [
                                        {
                                        "capability": "xrn:firebolt:capability:usergrant:pinchallenge",
                                        "configuration": {
                                            "pinSpace": "purchase"
                                        }
                                        }
                                    ]
                                    }
                                ],
                                "scope": "app",
                                "lifespan": "appActive",
                                "overridable": false
                                }
                            }
                        }
    }