<a name="CommandLoader"></a>

## CommandLoader ⇐ <code>ALoader</code>
**Kind**: global class  
**Extends**: <code>ALoader</code>  
**Author**: KhaaZ  

* [CommandLoader](#CommandLoader) ⇐ <code>ALoader</code>
    * [new CommandLoader()](#new_CommandLoader_new)
    * [.axon](#CommandLoader+axon) : <code>AxonClient</code>
    * [.logger](#CommandLoader+logger) : <code>Logger</code>
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

### commandLoader.axon : <code>AxonClient</code>
Returns the AxonClient instance

**Kind**: instance property of [<code>CommandLoader</code>](#CommandLoader)  
**Read only**: true  
<a name="CommandLoader+logger"></a>

### commandLoader.logger : <code>Logger</code>
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
| command | <code>Command</code> |  | The command to load |
| [parent] | <code>Command</code> | <code></code> | The optional parent command |

<a name="CommandLoader+loadAll"></a>

### commandLoader.loadAll(commands) ⇒ <code>Boolean</code>
Load all commands in the module.
Instantiate all commands.

**Kind**: instance method of [<code>CommandLoader</code>](#CommandLoader)  

| Param | Type |
| --- | --- |
| commands | <code>Command</code> | 

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
| command | <code>Command</code> | Command object |

<a name="CommandLoader+registerSubCommand"></a>

### commandLoader.registerSubCommand(command, parent)
Register a SubCommand.Register its subcommands if it has any

**Kind**: instance method of [<code>CommandLoader</code>](#CommandLoader)  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>Command</code> | The subcommand to register |
| parent | <code>Command</code> | The parent command |

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
| command | <code>Command</code> | The parent Command |
| subCommand | <code>Command</code> | The Subcommand to unregister |

