<a name="EventManager"></a>

## EventManager ⇐ <code>Base</code>
**Kind**: global class  
**Extends**: <code>Base</code>  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
|  |  |  |
| _handlers | <code>Collection.&lt;AHandler&gt;</code> | Collection of handler keyed to the event name [key: eventName, value: AHandler] |


* [EventManager](#EventManager) ⇐ <code>Base</code>
    * [new EventManager()](#new_EventManager_new)
    * _instance_
        * [._events](#EventManager+_events)
        * [._handlers](#EventManager+_handlers) : <code>Collection.&lt;AHandler&gt;</code>
        * [.HANDLERS](#EventManager+HANDLERS) : <code>Object</code>
        * [.handlers](#EventManager+handlers) : <code>Collection.&lt;AHandler&gt;</code>
        * [.getListeners(eventName)](#EventManager+getListeners) ⇒ <code>Array.&lt;Listener&gt;</code>
        * [.bindListeners()](#EventManager+bindListeners)
        * [.bindHandlers()](#EventManager+bindHandlers)
        * [.registerListener(listener)](#EventManager+registerListener) ⇒ <code>Array.&lt;Listener&gt;</code>
        * [.registerHandler(event)](#EventManager+registerHandler) ⇒ <code>AHandler</code>
        * [.registerEvent(event)](#EventManager+registerEvent) ⇒ <code>AHandler</code>
        * [.unregisterListener(event, label)](#EventManager+unregisterListener) ⇒ <code>Boolean</code>
        * [.unregisterHandler(event)](#EventManager+unregisterHandler) ⇒ <code>Boolean</code>
        * [.unregisterEvent(event)](#EventManager+unregisterEvent) ⇒ <code>Boolean</code>
    * _static_
        * [.EventManager](#EventManager.EventManager)
            * [new EventManager(axon)](#new_EventManager.EventManager_new)

<a name="new_EventManager_new"></a>

### new EventManager()
Event Manager class

<a name="EventManager+_events"></a>

### eventManager.\_events
**Kind**: instance property of [<code>EventManager</code>](#EventManager)  
<a name="EventManager+_handlers"></a>

### eventManager.\_handlers : <code>Collection.&lt;AHandler&gt;</code>
**Kind**: instance property of [<code>EventManager</code>](#EventManager)  
<a name="EventManager+HANDLERS"></a>

### eventManager.HANDLERS : <code>Object</code>
Returns all Handlers base

**Kind**: instance property of [<code>EventManager</code>](#EventManager)  
**Read only**: true  
<a name="EventManager+handlers"></a>

### eventManager.handlers : <code>Collection.&lt;AHandler&gt;</code>
Returns Collection of every handlers for every Discord event

**Kind**: instance property of [<code>EventManager</code>](#EventManager)  
**Read only**: true  
<a name="EventManager+getListeners"></a>

### eventManager.getListeners(eventName) ⇒ <code>Array.&lt;Listener&gt;</code>
Get all functions bound to the event passed in parameters.

**Kind**: instance method of [<code>EventManager</code>](#EventManager)  
**Returns**: <code>Array.&lt;Listener&gt;</code> - Array of the functions bound to the event  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>String</code> | The library event name |

<a name="EventManager+bindListeners"></a>

### eventManager.bindListeners()
Bind all listeners to a handler.
Create and register a handler for each event.
Called by AxonClient in start method.
If the bot is ready, also call bindHandlers()

**Kind**: instance method of [<code>EventManager</code>](#EventManager)  
<a name="EventManager+bindHandlers"></a>

### eventManager.bindHandlers()
Bind every handler to the correct Discord event and start listening to this event.

**Kind**: instance method of [<code>EventManager</code>](#EventManager)  
<a name="EventManager+registerListener"></a>

### eventManager.registerListener(listener) ⇒ <code>Array.&lt;Listener&gt;</code>
Register a listener for the given discord event.
Add the Listener in the array of Listener for each discord event.
Called by ModuleLoader when registering an event.

**Kind**: instance method of [<code>EventManager</code>](#EventManager)  
**Returns**: <code>Array.&lt;Listener&gt;</code> - Array of the functions bound to the event  

| Param | Type | Description |
| --- | --- | --- |
| listener | <code>Listener</code> | The Listener Object |

<a name="EventManager+registerHandler"></a>

### eventManager.registerHandler(event) ⇒ <code>AHandler</code>
Register a handler.
Remove the current event listener if the handler already exists.
Create a new handler from the array of listeners for the given event.

**Kind**: instance method of [<code>EventManager</code>](#EventManager)  
**Returns**: <code>AHandler</code> - The new Handler created  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | The Discord event name |

<a name="EventManager+registerEvent"></a>

### eventManager.registerEvent(event) ⇒ <code>AHandler</code>
Register an event handler and start listen to this event.
Recreate a handler and bind it to the event emitter.

**Kind**: instance method of [<code>EventManager</code>](#EventManager)  
**Returns**: <code>AHandler</code> - The Handler Object  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | The Discord event name to register |

<a name="EventManager+unregisterListener"></a>

### eventManager.unregisterListener(event, label) ⇒ <code>Boolean</code>
Unregister a listener.
Recreate the handler without the unregistered listener and listen to the updated handler

**Kind**: instance method of [<code>EventManager</code>](#EventManager)  
**Returns**: <code>Boolean</code> - True if worked / False if label or event doesn't exist  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | Name of the Discord event |
| label | <code>String</code> | Label of the listener |

<a name="EventManager+unregisterHandler"></a>

### eventManager.unregisterHandler(event) ⇒ <code>Boolean</code>
Unregister a handler. Unregister the event and delete the handler.

**Kind**: instance method of [<code>EventManager</code>](#EventManager)  
**Returns**: <code>Boolean</code> - True if worked / False if event doesn't exist  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | Name of the Discord event |

<a name="EventManager+unregisterEvent"></a>

### eventManager.unregisterEvent(event) ⇒ <code>Boolean</code>
Unregister the given event without deleting the handler.
Just stop listening to the discord event emitted.

**Kind**: instance method of [<code>EventManager</code>](#EventManager)  
**Returns**: <code>Boolean</code> - True if worked / False if event doesn't exist  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | Name of the Discord event |

<a name="EventManager.EventManager"></a>

### EventManager.EventManager
**Kind**: static class of [<code>EventManager</code>](#EventManager)  
<a name="new_EventManager.EventManager_new"></a>

#### new EventManager(axon)
Creates an EventManager instance.


| Param | Type |
| --- | --- |
| axon | <code>AxonClient</code> | 

