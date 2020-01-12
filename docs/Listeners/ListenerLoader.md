<a name="ListenerLoader"></a>

## ListenerLoader ⇐ <code>Loader</code>
**Kind**: global class  
**Extends**: <code>Loader</code>  

* [ListenerLoader](#ListenerLoader) ⇐ <code>Loader</code>
    * [new ListenerLoader()](#new_ListenerLoader_new)
    * [.axon](#ListenerLoader+axon) : <code>Object.&lt;Module&gt;</code>
    * [.logger](#ListenerLoader+logger) : <code>Object.&lt;Logger&gt;</code>
    * [.load(listener)](#ListenerLoader+load) ⇒ <code>Boolean</code>
    * [.loadAll(listeners)](#ListenerLoader+loadAll) ⇒ <code>Boolean</code>
    * [.unload(label)](#ListenerLoader+unload) ⇒ <code>Boolean</code>

<a name="new_ListenerLoader_new"></a>

### new ListenerLoader()
Load listeners in a Module.
Validate the listener validity entirely.

<a name="ListenerLoader+axon"></a>

### listenerLoader.axon : <code>Object.&lt;Module&gt;</code>
Returns the Module instance

**Kind**: instance property of [<code>ListenerLoader</code>](#ListenerLoader)  
**Read only**: true  
<a name="ListenerLoader+logger"></a>

### listenerLoader.logger : <code>Object.&lt;Logger&gt;</code>
Returns the Logger instance

**Kind**: instance property of [<code>ListenerLoader</code>](#ListenerLoader)  
**Read only**: true  
<a name="ListenerLoader+load"></a>

### listenerLoader.load(listener) ⇒ <code>Boolean</code>
Load one event instance in the module.
Validate and correct the event before registering it.

**Kind**: instance method of [<code>ListenerLoader</code>](#ListenerLoader)  

| Param | Type | Description |
| --- | --- | --- |
| listener | <code>Object.&lt;Listener&gt;</code> | The event to load |

<a name="ListenerLoader+loadAll"></a>

### listenerLoader.loadAll(listeners) ⇒ <code>Boolean</code>
Load all events in the module.
Instantiate all events.

**Kind**: instance method of [<code>ListenerLoader</code>](#ListenerLoader)  

| Param | Type |
| --- | --- |
| listeners | <code>Object.&lt;Listener&gt;</code> | 

<a name="ListenerLoader+unload"></a>

### listenerLoader.unload(label) ⇒ <code>Boolean</code>
Unload a Listener from the client

**Kind**: instance method of [<code>ListenerLoader</code>](#ListenerLoader)  
**Returns**: <code>Boolean</code> - Whether it worked  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | The Listener label to unload |

