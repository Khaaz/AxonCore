<a name="ModuleLoader"></a>

## ModuleLoader ⇐ <code>Loader</code>
**Kind**: global class  
**Extends**: <code>Loader</code>  

* [ModuleLoader](#ModuleLoader) ⇐ <code>Loader</code>
    * [new ModuleLoader()](#new_ModuleLoader_new)
    * [.axon](#ModuleLoader+axon) : <code>Object.&lt;AxonClient&gt;</code>
    * [.logger](#ModuleLoader+logger) : <code>Object.&lt;Logger&gt;</code>
    * [.load(module)](#ModuleLoader+load) ⇒ <code>Boolean</code>
    * [.loadAll(modules)](#ModuleLoader+loadAll) ⇒ <code>Boolean</code>
    * [.registerModule(module)](#ModuleLoader+registerModule)
    * [.unregisterModule(label)](#ModuleLoader+unregisterModule)

<a name="new_ModuleLoader_new"></a>

### new ModuleLoader()
Load modules in AxonClient.
Validate the module validity entirely.

<a name="ModuleLoader+axon"></a>

### moduleLoader.axon : <code>Object.&lt;AxonClient&gt;</code>
Returns the AxonClient instance

**Kind**: instance property of [<code>ModuleLoader</code>](#ModuleLoader)  
**Read only**: true  
<a name="ModuleLoader+logger"></a>

### moduleLoader.logger : <code>Object.&lt;Logger&gt;</code>
Returns the Logger instance

**Kind**: instance property of [<code>ModuleLoader</code>](#ModuleLoader)  
**Read only**: true  
<a name="ModuleLoader+load"></a>

### moduleLoader.load(module) ⇒ <code>Boolean</code>
Load one module instance in the client.
Validate and correct the module before registering it.

**Kind**: instance method of [<code>ModuleLoader</code>](#ModuleLoader)  

| Param | Type | Description |
| --- | --- | --- |
| module | <code>Object.&lt;Module&gt;</code> | The module to load |

<a name="ModuleLoader+loadAll"></a>

### moduleLoader.loadAll(modules) ⇒ <code>Boolean</code>
Load all modules in the client.
Instantiate all modules.

**Kind**: instance method of [<code>ModuleLoader</code>](#ModuleLoader)  

| Param | Type |
| --- | --- |
| modules | <code>Object.&lt;Module&gt;</code> | 

<a name="ModuleLoader+registerModule"></a>

### moduleLoader.registerModule(module)
Register a new module.
Initialise all module's commands (command, commandAliases) and events in AxonClient, then register the module.

**Kind**: instance method of [<code>ModuleLoader</code>](#ModuleLoader)  

| Param | Type |
| --- | --- |
| module | <code>Object.&lt;Module&gt;</code> | 

<a name="ModuleLoader+unregisterModule"></a>

### moduleLoader.unregisterModule(label)
Unregister a module.
Remove the module from the client, remove all module's commands, commandAliases and events.

**Kind**: instance method of [<code>ModuleLoader</code>](#ModuleLoader)  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | Label of the module to unregister |

