<a name="CommandLoader"></a>

## CommandLoader ⇐ <code>Loader</code>
**Kind**: global class  
**Extends**: <code>Loader</code>  
**Author**: KhaaZ  

* [CommandLoader](#CommandLoader) ⇐ <code>Loader</code>
    * [new CommandLoader()](#new_CommandLoader_new)
    * [.axon](#CommandLoader+axon) : <code>Object.&lt;AxonClient&gt;</code>
    * [.module](#CommandLoader+module) : <code>Object.&lt;Module&gt;</code>
    * [.logger](#CommandLoader+logger) : <code>Object.&lt;Logger&gt;</code>
    * [.load(command, [parent])](#CommandLoader+load) ⇒ <code>Boolean</code>
    * [.loadAll(commands)](#CommandLoader+loadAll) ⇒ <code>Boolean</code>
    * [.unload(label)](#CommandLoader+unload) ⇒ <code>Boolean</code>
    * [.registerCommand(command)](#CommandLoader+registerCommand)
    * [.registerSubCommand(command, parent)](#CommandLoader+registerSubCommand)
    * [.unregisterCommand(fullLabel)](#CommandLoader+unregisterCommand) ⇒ <code>Boolean</code>
    * [.unregisterSubCommand(command, subCommand)](#CommandLoader+unregisterSubCommand)

<a name="new_CommandLoader_new"></a>

### new CommandLoader()
Load commands in a Module.
Validate the command validity entirely.

<a name="CommandLoader+axon"></a>

### commandLoader.axon : <code>Object.&lt;AxonClient&gt;</code>
Returns the AxonClient instance

**Kind**: instance property of [<code>CommandLoader</code>](#CommandLoader)  
**Read only**: true  
<a name="CommandLoader+module"></a>

### commandLoader.module : <code>Object.&lt;Module&gt;</code>
Returns the Module instance

**Kind**: instance property of [<code>CommandLoader</code>](#CommandLoader)  
**Read only**: true  
<a name="CommandLoader+logger"></a>

### commandLoader.logger : <code>Object.&lt;Logger&gt;</code>
Returns the Logger instance

**Kind**: instance property of [<code>CommandLoader</code>](#CommandLoader)  
**Read only**: true  
<a name="CommandLoader+load"></a>

### commandLoader.load(command, [parent]) ⇒ <code>Boolean</code>
Load one command instance in the module.
Validate and correct the command before registering it.

**Kind**: instance method of [<code>CommandLoader</code>](#CommandLoader)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| command | <code>Object.&lt;Command&gt;</code> |  | The command to load |
| [parent] | <code>Object.&lt;Command&gt;</code> | <code></code> | The optional parent command |

<a name="CommandLoader+loadAll"></a>

### commandLoader.loadAll(commands) ⇒ <code>Boolean</code>
Load all commands in the module.
Instantiate all commands.

**Kind**: instance method of [<code>CommandLoader</code>](#CommandLoader)  

| Param | Type |
| --- | --- |
| commands | <code>Object.&lt;Command&gt;</code> | 

<a name="CommandLoader+unload"></a>

### commandLoader.unload(label) ⇒ <code>Boolean</code>
Unload a Command from the client

**Kind**: instance method of [<code>CommandLoader</code>](#CommandLoader)  
**Returns**: <code>Boolean</code> - Whether it worked  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | The Command label to unload |

<a name="CommandLoader+registerCommand"></a>

### commandLoader.registerCommand(command)
Register a Command. Register its subcommands if it has any.

**Kind**: instance method of [<code>CommandLoader</code>](#CommandLoader)  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>Object.&lt;Command&gt;</code> | Command object |

<a name="CommandLoader+registerSubCommand"></a>

### commandLoader.registerSubCommand(command, parent)
Register a SubCommand.Register its subcommands if it has any

**Kind**: instance method of [<code>CommandLoader</code>](#CommandLoader)  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>Object.&lt;Commands&gt;</code> | The subcommand to register |
| parent | <code>Object.&lt;Commands&gt;</code> | The parent command |

<a name="CommandLoader+unregisterCommand"></a>

### commandLoader.unregisterCommand(fullLabel) ⇒ <code>Boolean</code>
Remove a command from the module and the global cache.

**Kind**: instance method of [<code>CommandLoader</code>](#CommandLoader)  
**Returns**: <code>Boolean</code> - True if successful / Error otherwise  

| Param | Type | Description |
| --- | --- | --- |
| fullLabel | <code>String</code> | Full command label |

<a name="CommandLoader+unregisterSubCommand"></a>

### commandLoader.unregisterSubCommand(command, subCommand)
Remove a subcommand from a command

**Kind**: instance method of [<code>CommandLoader</code>](#CommandLoader)  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>Object.&lt;Command&gt;</code> | The parent Command |
| subCommand | <code>Object.&lt;Command&gt;</code> | The Subcommand to unregister |

