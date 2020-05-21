## Classes

<dl>
<dt><a href="#ModuleLoader">ModuleLoader</a> ⇐ <code>ALoader&lt;AxonClient&gt;</code></dt>
<dd></dd>
<dt><a href="#ModuleLoader">ModuleLoader</a></dt>
<dd></dd>
</dl>

<a name="ModuleLoader"></a>

## ModuleLoader ⇐ <code>ALoader&lt;AxonClient&gt;</code>
**Kind**: global class  
**Extends**: <code>ALoader&lt;AxonClient&gt;</code>  
**Author**: KhaaZ  

* [ModuleLoader](#ModuleLoader) ⇐ <code>ALoader&lt;AxonClient&gt;</code>
    * [new ModuleLoader()](#new_ModuleLoader_new)
    * [new ModuleLoader(axonClient)](#new_ModuleLoader_new)
    * [.axon](#ModuleLoader+axon) : <code>AxonClient</code>
    * [.logger](#ModuleLoader+logger) : <code>Logger</code>
    * [.load(module)](#ModuleLoader+load) ⇒ <code>Boolean</code>
    * [.loadAll(modules)](#ModuleLoader+loadAll) ⇒ <code>Boolean</code>
    * [.unload(label)](#ModuleLoader+unload) ⇒ <code>Boolean</code>

<a name="new_ModuleLoader_new"></a>

### new ModuleLoader()
Load modules in AxonClient.
Validate the module validity entirely.

<a name="new_ModuleLoader_new"></a>

### new ModuleLoader(axonClient)
Creates an instance of ModuleLoader


| Param | Type |
| --- | --- |
| axonClient | <code>[AxonClient](AxonClient)</code> | 

<a name="ModuleLoader+axon"></a>

### moduleLoader.axon : <code>AxonClient</code>
Returns the AxonClient instance

**Kind**: instance property of [<code>ModuleLoader</code>](#ModuleLoader)  
**Read only**: true  
<a name="ModuleLoader+logger"></a>

### moduleLoader.logger : <code>Logger</code>
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
| module | <code>[Module](Modules/Module)</code> | The module to load |

<a name="ModuleLoader+loadAll"></a>

### moduleLoader.loadAll(modules) ⇒ <code>Boolean</code>
Load all modules in the client.
Instantiate all modules.

**Kind**: instance method of [<code>ModuleLoader</code>](#ModuleLoader)  

| Param | Type |
| --- | --- |
| modules | <code>Object.&lt;string, [Module](Modules/Module)&gt;</code> | 

<a name="ModuleLoader+unload"></a>

### moduleLoader.unload(label) ⇒ <code>Boolean</code>
Unload a Module from the client

**Kind**: instance method of [<code>ModuleLoader</code>](#ModuleLoader)  
**Returns**: <code>Boolean</code> - Whether it worked  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | The Module label to unload |

<a name="ModuleLoader"></a>

## ModuleLoader
**Kind**: global class  

* [ModuleLoader](#ModuleLoader)
    * [new ModuleLoader()](#new_ModuleLoader_new)
    * [new ModuleLoader(axonClient)](#new_ModuleLoader_new)
    * [.axon](#ModuleLoader+axon) : <code>AxonClient</code>
    * [.logger](#ModuleLoader+logger) : <code>Logger</code>
    * [.load(module)](#ModuleLoader+load) ⇒ <code>Boolean</code>
    * [.loadAll(modules)](#ModuleLoader+loadAll) ⇒ <code>Boolean</code>
    * [.unload(label)](#ModuleLoader+unload) ⇒ <code>Boolean</code>

<a name="new_ModuleLoader_new"></a>

### new ModuleLoader()
Load modules in AxonClient.
Validate the module validity entirely.

<a name="new_ModuleLoader_new"></a>

### new ModuleLoader(axonClient)
Creates an instance of ModuleLoader


| Param | Type |
| --- | --- |
| axonClient | <code>[AxonClient](AxonClient)</code> | 

<a name="ModuleLoader+axon"></a>

### moduleLoader.axon : <code>AxonClient</code>
Returns the AxonClient instance

**Kind**: instance property of [<code>ModuleLoader</code>](#ModuleLoader)  
**Read only**: true  
<a name="ModuleLoader+logger"></a>

### moduleLoader.logger : <code>Logger</code>
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
| module | <code>[Module](Modules/Module)</code> | The module to load |

<a name="ModuleLoader+loadAll"></a>

### moduleLoader.loadAll(modules) ⇒ <code>Boolean</code>
Load all modules in the client.
Instantiate all modules.

**Kind**: instance method of [<code>ModuleLoader</code>](#ModuleLoader)  

| Param | Type |
| --- | --- |
| modules | <code>Object.&lt;string, [Module](Modules/Module)&gt;</code> | 

<a name="ModuleLoader+unload"></a>

### moduleLoader.unload(label) ⇒ <code>Boolean</code>
Unload a Module from the client

**Kind**: instance method of [<code>ModuleLoader</code>](#ModuleLoader)  
**Returns**: <code>Boolean</code> - Whether it worked  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | The Module label to unload |

