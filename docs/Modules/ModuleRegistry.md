<a name="ModuleRegistry"></a>

## ModuleRegistry ⇐ <code>ARegistry</code>
**Kind**: global class  
**Extends**: <code>ARegistry</code>  
**Author**: KhaaZ  

* [ModuleRegistry](#ModuleRegistry) ⇐ <code>ARegistry</code>
    * [new ModuleRegistry()](#new_ModuleRegistry_new)
    * [.register(label, modile)](#ModuleRegistry+register)
    * [.unregister(label, [module])](#ModuleRegistry+unregister)

<a name="new_ModuleRegistry_new"></a>

### new ModuleRegistry()
Registry that holds all Modules.

<a name="ModuleRegistry+register"></a>

### moduleRegistry.register(label, modile)
Register a Module inside the ModuleRegistry

**Kind**: instance method of [<code>ModuleRegistry</code>](#ModuleRegistry)  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | The module label |
| modile | <code>Module</code> | The module object |

<a name="ModuleRegistry+unregister"></a>

### moduleRegistry.unregister(label, [module])
Unregister a Module from the ModuleRegistry

**Kind**: instance method of [<code>ModuleRegistry</code>](#ModuleRegistry)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| label | <code>String</code> |  | The module label |
| [module] | <code>Module</code> | <code></code> | The module object |

