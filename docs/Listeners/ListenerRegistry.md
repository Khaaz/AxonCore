## Classes

<dl>
<dt><a href="#ListenerRegistry">ListenerRegistry</a> ⇐ <code>ARegistry&lt;Listener&gt;</code></dt>
<dd></dd>
<dt><a href="#ListenerRegistry">ListenerRegistry</a></dt>
<dd></dd>
</dl>

<a name="ListenerRegistry"></a>

## ListenerRegistry ⇐ <code>ARegistry&lt;Listener&gt;</code>
**Kind**: global class  
**Extends**: <code>ARegistry&lt;Listener&gt;</code>  
**Author**: KhaaZ  

* [ListenerRegistry](#ListenerRegistry) ⇐ <code>ARegistry&lt;Listener&gt;</code>
    * [new ListenerRegistry()](#new_ListenerRegistry_new)
    * [new ListenerRegistry(axon)](#new_ListenerRegistry_new)
    * [.register(label, listener)](#ListenerRegistry+register)
    * [.unregister(label, [listener])](#ListenerRegistry+unregister)

<a name="new_ListenerRegistry_new"></a>

### new ListenerRegistry()
Registry that holds all Commands.

<a name="new_ListenerRegistry_new"></a>

### new ListenerRegistry(axon)
Creates an instance of ListenerRegistry


| Param | Type |
| --- | --- |
| axon | <code>AxonClient</code> | 

<a name="ListenerRegistry+register"></a>

### listenerRegistry.register(label, listener)
Register a Listener inside the ListenerRegistry

**Kind**: instance method of [<code>ListenerRegistry</code>](#ListenerRegistry)  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | The listener label |
| listener | <code>Listener</code> | The listener object |

<a name="ListenerRegistry+unregister"></a>

### listenerRegistry.unregister(label, [listener])
Unregister a Listener from the ListenerRegistry

**Kind**: instance method of [<code>ListenerRegistry</code>](#ListenerRegistry)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| label | <code>String</code> |  | The listener label |
| [listener] | <code>Listener</code> | <code></code> | The listener object |

<a name="ListenerRegistry"></a>

## ListenerRegistry
**Kind**: global class  

* [ListenerRegistry](#ListenerRegistry)
    * [new ListenerRegistry()](#new_ListenerRegistry_new)
    * [new ListenerRegistry(axon)](#new_ListenerRegistry_new)
    * [.register(label, listener)](#ListenerRegistry+register)
    * [.unregister(label, [listener])](#ListenerRegistry+unregister)

<a name="new_ListenerRegistry_new"></a>

### new ListenerRegistry()
Registry that holds all Commands.

<a name="new_ListenerRegistry_new"></a>

### new ListenerRegistry(axon)
Creates an instance of ListenerRegistry


| Param | Type |
| --- | --- |
| axon | <code>AxonClient</code> | 

<a name="ListenerRegistry+register"></a>

### listenerRegistry.register(label, listener)
Register a Listener inside the ListenerRegistry

**Kind**: instance method of [<code>ListenerRegistry</code>](#ListenerRegistry)  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | The listener label |
| listener | <code>Listener</code> | The listener object |

<a name="ListenerRegistry+unregister"></a>

### listenerRegistry.unregister(label, [listener])
Unregister a Listener from the ListenerRegistry

**Kind**: instance method of [<code>ListenerRegistry</code>](#ListenerRegistry)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| label | <code>String</code> |  | The listener label |
| [listener] | <code>Listener</code> | <code></code> | The listener object |

