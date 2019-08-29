<a id="eventmanager"></a>

## EventManager ⇐ <code>Base</code>
**Kind**: Global class  
**Extends**: <code>Base</code>  
**Author**: KhaaZ  

[EventManager](#EventManager) ⇐ <code>Base</code>
- _static_
  - [.EventManager](#EventManager)
    - [new EventManager(axon)](#EventManager_new)
- _instance_
  - [getListeners(eventName)](#getListeners) ⇒ <code>Array</code>
  - [bindListeners()](#bindListeners)
  - [bindHandlers()](#bindHandlers)
  - [registerListener(event)](#registerListener)
  - [registerHandler(event)](#registerHandler) ⇒ <code>Object</code>
  - [registerEvent(event)](#registerEvent) ⇒ <code>Object</code>
  - [createHandler(events, ...args)](#createHandler)
  - [unregisterListener(event, label)](#unregisterListener) ⇒ <code>Boolean</code>
  - [unregisterHandler(event)](#unregisterHandler) ⇒ <code>Boolean</code>
  - [unregisterEvent(event)](#unregisterEvent) ⇒ <code>Boolean</code>
    
<a id="eventmanager"></a>

### EventManager.EventManager
**Kind**: Static class of [<code>EventManager</code>](#EventManager)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| _listeners | <code>Object</code> | Object that link an event name to an Array of Event Object { eventName: [Event, Event] } |
| _handlers | <code>Collection.&lt;Object&gt;</code> | Collection of handler keyed to the event name [key: eventName, value: Handler] |
| events | <code>Object</code> | Collection of Eris events listened by the client [GETTER: _handlers] |

<a id="eventmanager_new"></a>

#### new EventManager(axon)
Creates an Instance of EventManager.  

| Param | Type |
| --- | --- |
| axon | <code>Object.&lt;AxonClient&gt;</code> | 

<a id="getlisteners"></a>

### getListeners(eventName) ⇒ <code>Array</code>
Get all functions bound to the event passed in parameters.  

**Kind**: instance method of [<code>EventManager</code>](#EventManager)  
**Returns**: <code>Array</code> - Array of the functions bound to the event  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>String</code> | The Eris event name |

<a id="bindlisteners"></a>

### bindListeners()
Binds all Listeners to an Handler  .
Creates and registers an Handler for each event.
If the bot is ready, it (EventManager) also call bindHandlers().

**Kind**: Instance method of [<code>EventManager</code>](#EventManager)  

<a id="bindhandlers"></a>

### bindHandlers()
Binds every Handler to the correct Event emission

**Kind**: Instance method of [<code>EventManager</code>](#EventManager)  

<a id="registerlistener"></a>

### registerListener(event)
Registers a listener for this event.
Adds the Event object in the array of Event objects for each events

**Kind**: Instance method of [<code>EventManager</code>](#EventManager)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Object.&lt;Event&gt;</code> | Event Object |

<a id="registerhandler"></a>

### registerHandler(event) ⇒ <code>Object</code>
Registers an Handler.
Removes the current event listener if the handler already exists
Create a new Handler from the array of listeners for this event

**Kind**: Instance method of [<code>EventManager</code>](#EventManager)  
**Returns**: <code>Object</code> - The new Handler created  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | The Event name |

<a id="registerevent"></a>

### registerEvent(event) ⇒ <code>Object</code>
Registers an event.
Recreates an handler and binds an handler to the event emitted

**Kind**: Instance method of [<code>EventManager</code>](#EventManager)  
**Returns**: <code>Object</code> - The Handler Object  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | The Event name to register |

<a id="createhandler"></a>

### createHandler(events, ...args)
Creates one Handler function from all listeners
Checks if the module / event is globally disabled

**Kind**: Instance method of [<code>EventManager</code>](#EventManager)  

| Param | Type | Description |
| --- | --- | --- |
| events | <code>Array</code> | All listeners for this event |
| ...args | <code>Array</code> | All arguments possibly passed to an event |

<a id="unregisterlistener"></a>

### unregisterListener(event, label) ⇒ <code>Boolean</code>
Unregisters a listener
Recreates the handler and re-listens to the updated handler

**Kind**: Instance method of [<code>EventManager</code>](#EventManager)  
**Returns**: <code>Boolean</code> - True if worked / False if label or event doesn't exist  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | Name of the event |
| label | <code>String</code> | Name of the listener |

<a id="unregisterhandler"></a>

### eventManager.unregisterHandler(event) ⇒ <code>Boolean</code>
Unregisters a Handler. Unregisters the event and deletes the handler

**Kind**: Instance method of [<code>EventManager</code>](#EventManager)  
**Returns**: <code>Boolean</code> - True if worked / False if event doesn't exist  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | Name of the event |

<a id="unregisterevent"></a>

### unregisterEvent(event) ⇒ <code>Boolean</code>
Unregister one event without deleting the handler
Just stop listening to the specified event emitted

**Kind**: Instance method of [<code>EventManager</code>](#EventManager)  
**Returns**: <code>Boolean</code> - True if worked / False if event doesn't exist  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | Name of the event |
