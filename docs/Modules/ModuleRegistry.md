## Classes

<dl>
<dt><a href="#ModuleRegistry">ModuleRegistry</a> ⇐ <code>ARegistry&lt;Module&gt;</code></dt>
<dd></dd>
<dt><a href="#ModuleRegistry">ModuleRegistry</a></dt>
<dd></dd>
</dl>

<a name="ModuleRegistry"></a>

## ModuleRegistry ⇐ <code>ARegistry&lt;Module&gt;</code>
**Kind**: global class  
**Extends**: <code>ARegistry&lt;Module&gt;</code>  
**Author**: KhaaZ  

* [ModuleRegistry](#ModuleRegistry) ⇐ <code>ARegistry&lt;Module&gt;</code>
    * [new ModuleRegistry()](#new_ModuleRegistry_new)
    * [new ModuleRegistry(axon)](#new_ModuleRegistry_new)
    * [.register(label, module)](#ModuleRegistry+register)
    * [.unregister(label, [module])](#ModuleRegistry+unregister)

<a name="new_ModuleRegistry_new"></a>

### new ModuleRegistry()
Registry that holds all Modules.

<a name="new_ModuleRegistry_new"></a>

### new ModuleRegistry(axon)
Creates an instance of ModuleRegistry


| Param | Type |
| --- | --- |
| axon | <code>AxonClient</code> | 

<a name="ModuleRegistry+register"></a>

### moduleRegistry.register(label, module)
Register a Module inside the ModuleRegistry

**Kind**: instance method of [<code>ModuleRegistry</code>](#ModuleRegistry)  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | The module label |
| module | <code>Module</code> | The module object |

<a name="ModuleRegistry+unregister"></a>

### moduleRegistry.unregister(label, [module])
Unregister a Module from the ModuleRegistry

**Kind**: instance method of [<code>ModuleRegistry</code>](#ModuleRegistry)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| label | <code>String</code> |  | The module label |
| [module] | <code>Module</code> | <code></code> | The module object |

<a name="ModuleRegistry"></a>

## ModuleRegistry
**Kind**: global class  

* [ModuleRegistry](#ModuleRegistry)
    * [new ModuleRegistry()](#new_ModuleRegistry_new)
    * [new ModuleRegistry(axon)](#new_ModuleRegistry_new)
    * [.register(label, module)](#ModuleRegistry+register)
    * [.unregister(label, [module])](#ModuleRegistry+unregister)

<a name="new_ModuleRegistry_new"></a>

### new ModuleRegistry()
Registry that holds all Modules.

<a name="new_ModuleRegistry_new"></a>

### new ModuleRegistry(axon)
Creates an instance of ModuleRegistry


| Param | Type |
| --- | --- |
| axon | <code>AxonClient</code> | 

<a name="ModuleRegistry+register"></a>

### moduleRegistry.register(label, module)
Register a Module inside the ModuleRegistry

**Kind**: instance method of [<code>ModuleRegistry</code>](#ModuleRegistry)  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | The module label |
| module | <code>Module</code> | The module object |

<a name="ModuleRegistry+unregister"></a>

### moduleRegistry.unregister(label, [module])
Unregister a Module from the ModuleRegistry

**Kind**: instance method of [<code>ModuleRegistry</code>](#ModuleRegistry)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| label | <code>String</code> |  | The module label |
| [module] | <code>Module</code> | <code></code> | The module object |

