<a name="Command"></a>

## Command ⇐ <code>Base</code>
**Kind**: global class  
**Extends**: <code>Base</code>  
**Author**: KhaaZ  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| _module | <code>Object.&lt;Module&gt;</code> |  | Module object |
| _cooldown | <code>Object.&lt;CommandCooldown&gt;</code> |  | Cooldown Object for the command (manage all command cooldowns) |
| label | <code>String</code> |  | Command label (name/id) |
| [aliases] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | Array of commands aliases (including the command label) |
| [enabled] | <code>Boolean</code> | <code>module.enabled</code> | Whether the command is enabled |
| [serverBypass] | <code>Boolean</code> | <code>module.serverBypass</code> | Whether the command can be disabled |
| [isSubcmd] | <code>Boolean</code> | <code>false</code> | Whether the command IS a subcommand |
| [parentCommand] | [<code>Object.&lt;Command&gt;</code>](#Command) | <code></code> | Reference to the parent command (if isSubcmd = true) |
| [hasSubcmd] | <code>Boolean</code> | <code>false</code> | Whether the command HAS subcommands |
| subcmds | <code>Array.&lt;Object&gt;</code> |  | Array of subcommand objects (deleted after init) |
| [subCommands] | [<code>Collection.&lt;Command&gt;</code>](#Command) | <code></code> | Collection of subcommands |
| [subCommandsAliases] | <code>Object.&lt;Map&gt;</code> | <code></code> | Map of subcommand aliases |
| infos | <code>Object</code> |  | Default info about the command |
| [infos.owners] | <code>Array.&lt;String&gt;</code> |  | Command authors |
| [infos.cmdName] | <code>String</code> |  | Full command name |
| [infos.description] | <code>String</code> |  | Command description |
| [infos.usage] | <code>String</code> |  | Command usage |
| [infos.example] | <code>Array.&lt;String&gt;</code> |  | Array of command examples |
| options | <code>Object.&lt;CommandOptions&gt;</code> |  | Options Object for the command (manage all command options) |
| permissions | <code>Object.&lt;CommandPermissions&gt;</code> |  | Permissions Object for the command (manage all command permissions) |


* [Command](#Command) ⇐ <code>Base</code>
    * [new Command()](#new_Command_new)
    * _instance_
        * [.module](#Command+module) : <code>Object.&lt;Module&gt;</code>
        * [.template](#Command+template) : <code>Object</code>
        * [.library](#Command+library) : <code>Object.&lt;LibraryInterface&gt;</code>
        * [.fullLabel](#Command+fullLabel) : <code>String</code>
        * [._process(params)](#Command+_process) ⇒ <code>Promise.&lt;CommandContext&gt;</code>
        * [._execute({)](#Command+_execute) ⇒ <code>CommandContext</code>
        * [.execute(object)](#Command+execute) ⇒ <code>Promise.&lt;CommandResponse&gt;</code>
        * [.sendHelp({)](#Command+sendHelp) ⇒ <code>Promise.&lt;CommandContext&gt;</code>
        * [.sendBotPerms(channel, [permissions])](#Command+sendBotPerms) ⇒ <code>Promise.&lt;?Message&gt;</code>
        * [.sendUserPerms(channel, member, [deleteTimeout])](#Command+sendUserPerms) ⇒ <code>Promise.&lt;?Message&gt;</code>
        * [.sendTargetPerms(channel)](#Command+sendTargetPerms) ⇒ <code>Promise.&lt;?Message&gt;</code>
        * [.sendCooldown(channel)](#Command+sendCooldown) ⇒ <code>Promise.&lt;?Message&gt;</code>
    * _static_
        * [.Command](#Command.Command)
            * [new Command(module, [data])](#new_Command.Command_new)

<a name="new_Command_new"></a>

### new Command()
AxonCore - Command contructor

<a name="Command+module"></a>

### command.module : <code>Object.&lt;Module&gt;</code>
Returns the parent module instance

**Kind**: instance property of [<code>Command</code>](#Command)  
**Read only**: true  
<a name="Command+template"></a>

### command.template : <code>Object</code>
Returns the template object

**Kind**: instance property of [<code>Command</code>](#Command)  
**Read only**: true  
<a name="Command+library"></a>

### command.library : <code>Object.&lt;LibraryInterface&gt;</code>
Returns the library Interface instance

**Kind**: instance property of [<code>Command</code>](#Command)  
**Read only**: true  
<a name="Command+fullLabel"></a>

### command.fullLabel : <code>String</code>
Returns the ful label for this command (label + all parent labels)

**Kind**: instance property of [<code>Command</code>](#Command)  
**Read only**: true  
<a name="Command+_process"></a>

### command.\_process(params) ⇒ <code>Promise.&lt;CommandContext&gt;</code>
Process the command, and executes it if it can (permissions, options etc..).

**Kind**: instance method of [<code>Command</code>](#Command)  
**Returns**: <code>Promise.&lt;CommandContext&gt;</code> - Return a CommandContext or throw an AxonCommandError.  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | { msg, args, guildConfig, isAdmin, isOwner } |

<a name="Command+_execute"></a>

### command.\_execute({) ⇒ <code>CommandContext</code>
Execute the command.
Get the CommandResponse fromthe command execution or create it in case of errors.
Create the CommandContext and returns it.

**Kind**: instance method of [<code>Command</code>](#Command)  

| Param | Type | Description |
| --- | --- | --- |
| { | <code>Object</code> | msg, args, guildConfig, isAdmin, isOwner } |

<a name="Command+execute"></a>

### command.execute(object) ⇒ <code>Promise.&lt;CommandResponse&gt;</code>
Override this method in all Command child.
Main method - command logic being executed when the command is actually ran.

**Kind**: instance method of [<code>Command</code>](#Command)  
**Returns**: <code>Promise.&lt;CommandResponse&gt;</code> - Returns a CommandResponse that will be used to create the CommandContext  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | An Object with all arguments to use execute |
| [object.message] | <code>Object.&lt;Message&gt;</code> | The Eris message Object |
| [object.args] | <code>Array.&lt;String&gt;</code> | The Array of arguments |
| [object.guildConfig] | <code>Object.&lt;GuildConfig&gt;</code> | The guildConfig if it exists |

<a name="Command+sendHelp"></a>

### command.sendHelp({) ⇒ <code>Promise.&lt;CommandContext&gt;</code>
Send help message in the current channel with perm checks done before.
Call a custom sendHelp method if it exists, use the default one if it doesn't.

**Kind**: instance method of [<code>Command</code>](#Command)  
**Returns**: <code>Promise.&lt;CommandContext&gt;</code> - Message Object  

| Param | Type | Description |
| --- | --- | --- |
| { | <code>Object.&lt;Message&gt;</code> | msg, guildConfig, isAdmin, isOwner } - The message object |

<a name="Command+sendBotPerms"></a>

### command.sendBotPerms(channel, [permissions]) ⇒ <code>Promise.&lt;?Message&gt;</code>
Send an error message in case of invalid bot permissions, delete it automatically after a delay.

**Kind**: instance method of [<code>Command</code>](#Command)  
**Returns**: <code>Promise.&lt;?Message&gt;</code> - Message Object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| channel | <code>Object.&lt;Channel&gt;</code> |  | The channel Object |
| [permissions] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | Optional array of permissions string |

<a name="Command+sendUserPerms"></a>

### command.sendUserPerms(channel, member, [deleteTimeout]) ⇒ <code>Promise.&lt;?Message&gt;</code>
Send an error message in case of invalid user permissions, delete it automatically after a delay.
Uses the template message in config/template.

**Kind**: instance method of [<code>Command</code>](#Command)  
**Returns**: <code>Promise.&lt;?Message&gt;</code> - Message Object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| channel | <code>Object.&lt;Channel&gt;</code> |  | The channel object |
| member | <code>Object.&lt;Member&gt;</code> |  | The member object |
| [deleteTimeout] | <code>Number</code> | <code>9000</code> | The permission message deletion timeout, if `null` the the message will not delete |

<a name="Command+sendTargetPerms"></a>

### command.sendTargetPerms(channel) ⇒ <code>Promise.&lt;?Message&gt;</code>
Send an error message incase of invalid target permissions (serverMod/serverAdmin).
Uses the template message in config/template.

**Kind**: instance method of [<code>Command</code>](#Command)  
**Returns**: <code>Promise.&lt;?Message&gt;</code> - Message Object  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>Object.&lt;Channel&gt;</code> | The channel Object |

<a name="Command+sendCooldown"></a>

### command.sendCooldown(channel) ⇒ <code>Promise.&lt;?Message&gt;</code>
Send an error message in case of invalid cooldown, delete it automatically after a delay.

**Kind**: instance method of [<code>Command</code>](#Command)  
**Returns**: <code>Promise.&lt;?Message&gt;</code> - Message Object  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>Object.&lt;Channel&gt;</code> | The channel Object |

<a name="Command.Command"></a>

### Command.Command
**Kind**: static class of [<code>Command</code>](#Command)  
<a name="new_Command.Command_new"></a>

#### new Command(module, [data])
Creates a Command instance.
Handles execution of this command.
Overrides the execute method. Execute method will be called everytime the command is called.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| module | <code>Object.&lt;Module&gt;</code> |  |  |
| [data] | <code>Object</code> | <code>{}</code> | All command parameters |
| [data.label] | <code>String</code> |  | The command label |
| [data.aliases] | <code>Array.&lt;String&gt;</code> |  | The command aliases |
| [data.isSubcmd] | <code>Boolean</code> |  | Whether the command IS a subcommand |
| [data.hasSubcmd] | <code>Boolean</code> |  | Whether the command HAS subcommands |
| [data.enabled] | <code>Boolean</code> |  | Whether the command is enabled |
| [data.serverBypass] | <code>Boolean</code> |  | Whether the ciommand can be server disabled |
| [data.subcmds] | <code>Array.&lt;String&gt;</code> |  | List of subcommands class to be added in the Command |
| [data.infos] | <code>Object</code> |  |  |
| [data.options] | <code>Object.&lt;CommandOptions&gt;</code> \| <code>Object</code> |  | The command options |
| [data.permissions] | <code>Object.&lt;CommandPermissions&gt;</code> \| <code>Object</code> |  | The command permissions |

