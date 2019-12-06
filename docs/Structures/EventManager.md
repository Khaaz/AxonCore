<a name="EventManager"></a>

## EventManager ⇐ <code>Base</code>
**Kind**: global class  
**Extends**: <code>Base</code>  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| _listeners | <code>Object</code> | Object that links an event name to an array of event objects { eventName: [Event, Event] } |
| _handlers | <code>Collection.&lt;Object&gt;</code> | Collection of handler keyed to the event name [key: eventName, value: Handler] |


* [EventManager](#EventManager) ⇐ <code>Base</code>
    * [new EventManager()](#new_EventManager_new)
    * _instance_
        * [.HANDLERS](#EventManager+HANDLERS) : <code>Object</code>
        * [.events](#EventManager+events) : <code>Collection.&lt;Object&gt;</code>
        * [.getListeners(eventName)](#EventManager+getListeners) ⇒ <code>Array</code>
        * [.bindListeners()](#EventManager+bindListeners)
        * [.bindHandlers()](#EventManager+bindHandlers)
        * [.registerListener(listener)](#EventManager+registerListener)
        * [.registerHandler(event)](#EventManager+registerHandler) ⇒ <code>Object</code>
        * [.registerEvent(event)](#EventManager+registerEvent) ⇒ <code>Object</code>
        * [.unregisterListener(event, label)](#EventManager+unregisterListener) ⇒ <code>Boolean</code>
        * [.unregisterHandler(event)](#EventManager+unregisterHandler) ⇒ <code>Boolean</code>
        * [.unregisterEvent(event)](#EventManager+unregisterEvent) ⇒ <code>Boolean</code>
    * _static_
        * [.EventManager](#EventManager.EventManager)
            * [new EventManager(axon)](#new_EventManager.EventManager_new)

<a name="new_EventManager_new"></a>

### new EventManager()
Event Manager class

<a name="EventManager+HANDLERS"></a>

### eventManager.HANDLERS : <code>Object</code>
Returns all Handlers base

**Kind**: instance property of [<code>EventManager</code>](#EventManager)  
**Read only**: true  
<a name="EventManager+events"></a>

### eventManager.events : <code>Collection.&lt;Object&gt;</code>
Returns Collection of every handlers for every discord event

**Kind**: instance property of [<code>EventManager</code>](#EventManager)  
**Read only**: true  
<a name="EventManager+getListeners"></a>

### eventManager.getListeners(eventName) ⇒ <code>Array</code>
Get all functions bound to the event passed in parameters.

**Kind**: instance method of [<code>EventManager</code>](#EventManager)  
**Returns**: <code>Array</code> - Array of the functions bound to the event  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>String</code> | The Eris event name |

<a name="EventManager+bindListeners"></a>

### eventManager.bindListeners()
Bind all listeners to a handler.
Create and register a handler for each event.
Called by AxonClient in start method.
If the bot is ready, also call bindHandlers()

**Kind**: instance method of [<code>EventManager</code>](#EventManager)  
<a name="EventManager+bindHandlers"></a>

### eventManager.bindHandlers()
Bind every handler to the correct event emitter

**Kind**: instance method of [<code>EventManager</code>](#EventManager)  
<a name="EventManager+registerListener"></a>

### eventManager.registerListener(listener)
Register a listener for the given discord event.
Add the Listener in the array of Listener for each discord event.
Called by ModuleLoader when registering an event.

**Kind**: instance method of [<code>EventManager</code>](#EventManager)  

| Param | Type | Description |
| --- | --- | --- |
| listener | <code>Object.&lt;Listener&gt;</code> | Event Object |

<a name="EventManager+registerHandler"></a>

### eventManager.registerHandler(event) ⇒ <code>Object</code>
Register a handler.
Remove the current event listener if the handler already exists.
Create a new handler from the array of listeners for the given event.

**Kind**: instance method of [<code>EventManager</code>](#EventManager)  
**Returns**: <code>Object</code> - The new Handler created  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | The Event name |

<a name="EventManager+registerEvent"></a>

### eventManager.registerEvent(event) ⇒ <code>Object</code>
Register an event handler and start listen to this event.
Recreate a handler and bind it to the event emitter.

**Kind**: instance method of [<code>EventManager</code>](#EventManager)  
**Returns**: <code>Object</code> - The Handler Object  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | The Discord event name to register |

<a name="EventManager+unregisterListener"></a>

### eventManager.unregisterListener(event, label) ⇒ <code>Boolean</code>
Unregister a listener.
Recreate the handler and listen to the updated handler

**Kind**: instance method of [<code>EventManager</code>](#EventManager)  
**Returns**: <code>Boolean</code> - True if worked / False if label or event doesn't exist  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | Name of the event |
| label | <code>String</code> | Name of the listener |

<a name="EventManager+unregisterHandler"></a>

### eventManager.unregisterHandler(event) ⇒ <code>Boolean</code>
Unregister a handler. Unregister the event and delete the handler.

**Kind**: instance method of [<code>EventManager</code>](#EventManager)  
**Returns**: <code>Boolean</code> - True if worked / False if event doesn't exist  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | Name of the event |

<a name="EventManager+unregisterEvent"></a>

### eventManager.unregisterEvent(event) ⇒ <code>Boolean</code>
Unregister the given event without deleting the handler.
Just stop listening to the event emitter.

**Kind**: instance method of [<code>EventManager</code>](#EventManager)  
**Returns**: <code>Boolean</code> - True if worked / False if event doesn't exist  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | Name of the event |

<a name="EventManager.EventManager"></a>

### EventManager.EventManager
**Kind**: static class of [<code>EventManager</code>](#EventManager)  
<a name="new_EventManager.EventManager_new"></a>

#### new EventManager(axon)
Creates an EventManager instance.


| Param | Type |
| --- | --- |
| axon | <code>Object.&lt;AxonClient&gt;</code> | 

