<a name="CommandRegistry"></a>

## CommandRegistry ⇐ <code>ARegistry</code>
**Kind**: global class  
**Extends**: <code>ARegistry</code>  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| aliases | <code>Map</code> | All commands aliases. |


* [CommandRegistry](#CommandRegistry) ⇐ <code>ARegistry</code>
    * [new CommandRegistry()](#new_CommandRegistry_new)
    * [.get(cmd)](#CommandRegistry+get) ⇒ <code>Command</code>
    * [.getFull(splitLabel)](#CommandRegistry+getFull) ⇒ <code>Command</code> \| <code>null</code>
    * [.register(label, command)](#CommandRegistry+register)
    * [.unregister(label, [command])](#CommandRegistry+unregister)
    * [.resolve(label, args, [guildConfig])](#CommandRegistry+resolve) ⇒ <code>Command</code> \| <code>null</code>

<a name="new_CommandRegistry_new"></a>

### new CommandRegistry()
Registry that holds all Commands.

<a name="CommandRegistry+get"></a>

### commandRegistry.get(cmd) ⇒ <code>Command</code>
Get a command with its label

**Kind**: instance method of [<code>CommandRegistry</code>](#CommandRegistry)  
**Returns**: <code>Command</code> - The found command  

| Param | Type | Description |
| --- | --- | --- |
| cmd | <code>String</code> | The command label |

<a name="CommandRegistry+getFull"></a>

### commandRegistry.getFull(splitLabel) ⇒ <code>Command</code> \| <code>null</code>
Get a command/subcommand with the given full label.

**Kind**: instance method of [<code>CommandRegistry</code>](#CommandRegistry)  

| Param | Type | Description |
| --- | --- | --- |
| splitLabel | <code>Array.&lt;String&gt;</code> | Full command (or subcommand) label |

<a name="CommandRegistry+register"></a>

### commandRegistry.register(label, command)
Register a Command inside the CommandRegistry

**Kind**: instance method of [<code>CommandRegistry</code>](#CommandRegistry)  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | The command label |
| command | <code>Command</code> | The command object |

<a name="CommandRegistry+unregister"></a>

### commandRegistry.unregister(label, [command])
Unregister a Command from the CommandRegistry

**Kind**: instance method of [<code>CommandRegistry</code>](#CommandRegistry)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| label | <code>String</code> |  | The command label |
| [command] | <code>Commands</code> | <code></code> | The command object |

<a name="CommandRegistry+resolve"></a>

### commandRegistry.resolve(label, args, [guildConfig]) ⇒ <code>Command</code> \| <code>null</code>
Resolves the command Object. Only resolves the command if it's not globally disabled.
Doesn't resolve the command if the command is guild disabled.

**Kind**: instance method of [<code>CommandRegistry</code>](#CommandRegistry)  
**Returns**: <code>Command</code> \| <code>null</code> - The command object or null if the command doesn't exist or is not enabled  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| label | <code>String</code> |  | The command label/ command alias |
| args | <code>Array.&lt;String&gt;</code> |  | Array of arguments |
| [guildConfig] | <code>GuildConfig</code> | <code></code> | GuildConfig |

