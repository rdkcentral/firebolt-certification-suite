# appTransport commands

## Init()

### Purpose: This function creates a client and initializes connection.

### Examples:
* `init()`

## Publish()

### Purpose: This function publish the message on a topic.
### Params:
| Param | Definition| Type |
| --- | --- | --- |
| topic | Topic used to publish message | string |
| message | Basic intent message that will applicable to ALL platforms | string |
| headers | Object created for headers in payload | object |

### Examples:

* `publish(topic, {"asynchronous": "false","communicationMode": "communicationMode","isAsync": false,"action": "actionType"}, {headers:{id:12345}})`


## Subscribe()

### Purpose: This function add a listener to response topic, triggers callback.
### Params:
| Param | Definition| Type |
| --- | --- | --- |
| topic | Topic used to publish message | string |
| callback | callback to fetch the response | * |

### Examples:

* `subscribe(topic, callback())`

## Unsubscribe()

### Purpose: This function stops the listener.
### Params:
| Param | Definition| Type |
| --- | --- | --- |
| topic | Topic used to publish message | string |

### Examples:

* `unsubscribe(topic)`
