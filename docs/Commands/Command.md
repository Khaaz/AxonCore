## Classes

<dl>
<dt><a href="#Command">Command</a> ⇐ <code>Base</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#AxonTemplate">AxonTemplate</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="Command"></a>

## Command ⇐ <code>Base</code>
**Kind**: global class  
**Extends**: <code>Base</code>  
**Author**: KhaaZ  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| _module | <code>Module</code> |  | Module object |
| _cooldown | <code>CommandCooldown</code> |  | Cooldown Object for the command (manage all command cooldowns) |
| label | <code>String</code> |  | Command label (name/id) |
| [aliases] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | Array of commands aliases (including the command label) |
| [enabled] | <code>Boolean</code> | <code>module.enabled</code> | Whether the command is enabled |
| [serverBypass] | <code>Boolean</code> | <code>module.serverBypass</code> | Whether the command can be disabled |
| [parentCommand] | [<code>Command</code>](#Command) | <code></code> | Reference to the parent command |
| [hasSubcmd] | <code>Boolean</code> | <code>false</code> | Whether the command HAS subcommands |
| [subCommands] | <code>CommandRegistry</code> | <code></code> | Registry of subcommands |
| info | <code>Object</code> |  | Default info about the command |
| [info.owners] | <code>Array.&lt;String&gt;</code> |  | Command authors |
| [info.name] | <code>String</code> |  | Full command name |
| [info.description] | <code>String</code> |  | Command description |
| [info.usage] | <code>String</code> |  | Command usage |
| [info.example] | <code>Array.&lt;String&gt;</code> |  | Array of command examples |
| options | <code>CommandOptions</code> |  | Options Object for the command (manage all command options) |
| permissions | <code>CommandPermissions</code> |  | Permissions Object for the command (manage all command permissions) |


* [Command](#Command) ⇐ <code>Base</code>
    * [new Command()](#new_Command_new)
    * _instance_
        * [.module](#Command+module) : <code>Module</code>
        * [.template](#Command+template) : [<code>AxonTemplate</code>](#AxonTemplate)
        * [.library](#Command+library) : <code>LibraryInterface</code>
        * [.fullLabel](#Command+fullLabel) : <code>String</code>
        * [.init()](#Command+init) ⇒
        * [._init()](#Command+_init) ⇒ <code>Boolean</code>
        * [._process(env)](#Command+_process) ⇒ <code>Promise.&lt;CommandContext&gt;</code>
        * [._execute(env)](#Command+_execute) ⇒ <code>Promise.&lt;CommandContext&gt;</code>
        * [.execute(env)](#Command+execute) ⇒ <code>Promise.&lt;CommandResponse&gt;</code>
        * [.sendHelp(env)](#Command+sendHelp) ⇒ <code>Promise.&lt;CommandContext&gt;</code>
        * [.sendBotPerms(channel, [permissions])](#Command+sendBotPerms)
        * [.sendUserPerms(channel, member, [deleteTimeout], [missingPermission])](#Command+sendUserPerms)
        * [.sendTargetPerms(channel)](#Command+sendTargetPerms)
        * [.sendCooldown(channel, time)](#Command+sendCooldown)
    * _static_
        * [.Command](#Command.Command)
            * [new Command(module, [data])](#new_Command.Command_new)

<a name="new_Command_new"></a>

### new Command()
AxonCore - Command constructor

<a name="Command+module"></a>

### command.module : <code>Module</code>
Returns the parent module instance

**Kind**: instance property of [<code>Command</code>](#Command)  
**Read only**: true  
<a name="Command+template"></a>

### command.template : [<code>AxonTemplate</code>](#AxonTemplate)
Returns the template object

**Kind**: instance property of [<code>Command</code>](#Command)  
**Read only**: true  
<a name="Command+library"></a>

### command.library : <code>LibraryInterface</code>
Returns the library Interface instance

**Kind**: instance property of [<code>Command</code>](#Command)  
**Read only**: true  
<a name="Command+fullLabel"></a>

### command.fullLabel : <code>String</code>
Returns the full label for this command (label + all parent labels)

**Kind**: instance property of [<code>Command</code>](#Command)  
**Read only**: true  
<a name="Command+init"></a>

### command.init() ⇒
Returns all the subcommands for a command

**Kind**: instance method of [<code>Command</code>](#Command)  
<a name="Command+_init"></a>

### command.\_init() ⇒ <code>Boolean</code>
**Kind**: instance method of [<code>Command</code>](#Command)  
<a name="Command+_process"></a>

### command.\_process(env) ⇒ <code>Promise.&lt;CommandContext&gt;</code>
Process the command, and executes it if it can (permissions, options etc..).

**Kind**: instance method of [<code>Command</code>](#Command)  
**Returns**: <code>Promise.&lt;CommandContext&gt;</code> - Return a CommandContext or throw an AxonCommandError.  

| Param | Type |
| --- | --- |
| env | <code>CommandEnvironment</code> | 

<a name="Command+_execute"></a>

### command.\_execute(env) ⇒ <code>Promise.&lt;CommandContext&gt;</code>
Execute the command.
Get the CommandResponse from the command execution or create it in case of errors.
Create the CommandContext and returns it.

**Kind**: instance method of [<code>Command</code>](#Command)  

| Param | Type |
| --- | --- |
| env | <code>CommandEnvironment</code> | 

<a name="Command+execute"></a>

### command.execute(env) ⇒ <code>Promise.&lt;CommandResponse&gt;</code>
Override this method in all Command child.
Main method - command logic being executed when the command is actually ran.

**Kind**: instance method of [<code>Command</code>](#Command)  
**Returns**: <code>Promise.&lt;CommandResponse&gt;</code> - Returns a CommandResponse that will be used to create the CommandContext  

| Param | Type | Description |
| --- | --- | --- |
| env | <code>CommandEnvironment</code> | The Command Environment object with all variables needed for the Commandexecution |

<a name="Command+sendHelp"></a>

### command.sendHelp(env) ⇒ <code>Promise.&lt;CommandContext&gt;</code>
Send help message in the current channel with perm checks done before.
Call a custom sendHelp method if it exists, use the default one if it doesn't.

**Kind**: instance method of [<code>Command</code>](#Command)  

| Param | Type |
| --- | --- |
| env | <code>CommandEnvironment</code> | 

<a name="Command+sendBotPerms"></a>

### command.sendBotPerms(channel, [permissions])
Send an error message in case of invalid bot permissions, delete it automatically after a delay.

**Kind**: instance method of [<code>Command</code>](#Command)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| channel | <code>Channel</code> |  | The channel Object |
| [permissions] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | Optional array of permissions string |

<a name="Command+sendUserPerms"></a>

### command.sendUserPerms(channel, member, [deleteTimeout], [missingPermission])
Send an error message in case of invalid user permissions, delete it automatically after a delay.
Uses the template message in config/template.

**Kind**: instance method of [<code>Command</code>](#Command)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| channel | <code>Channel</code> |  | The channel object |
| member | <code>Member</code> |  | The member object |
| [deleteTimeout] | <code>Number</code> | <code>9000</code> | The permission message deletion timeout, if `null` the the message will not delete |
| [missingPermission] | <code>String</code> | <code></code> | The missing permission |

<a name="Command+sendTargetPerms"></a>

### command.sendTargetPerms(channel)
Send an error message in case of invalid target permissions (serverMod/serverAdmin).
Uses the template message in config/template.

**Kind**: instance method of [<code>Command</code>](#Command)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>Channel</code> | The channel Object |

<a name="Command+sendCooldown"></a>

### command.sendCooldown(channel, time)
Send an error message in case of invalid cooldown, delete it automatically after a delay.

**Kind**: instance method of [<code>Command</code>](#Command)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>Channel</code> | The channel Object |
| time | <code>Number</code> | How long since the last command |

<a name="Command.Command"></a>

### Command.Command
**Kind**: static class of [<code>Command</code>](#Command)  
<a name="new_Command.Command_new"></a>

#### new Command(module, [data])
Creates a Command instance.
Handles execution of this command.
Overrides the execute method. Execute method will be called every time the command is called.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| module | <code>Module</code> |  |  |
| [data] | <code>Object</code> | <code>{}</code> | All command parameters |
| [data.label] | <code>String</code> |  | The command label |
| [data.aliases] | <code>Array.&lt;String&gt;</code> |  | The command aliases |
| [data.hasSubcmd] | <code>Boolean</code> |  | Whether the command HAS subcommands |
| [data.enabled] | <code>Boolean</code> |  | Whether the command is enabled |
| [data.serverBypass] | <code>Boolean</code> |  | Whether the command can be server disabled |
| [data.info] | <code>Object</code> |  |  |
| [data.info.owners] | <code>Array.&lt;String&gt;</code> |  | Who created the command |
| [data.info.description] | <code>String</code> |  | The command description |
| [data.info.examples] | <code>Array.&lt;String&gt;</code> |  | Command examples |
| [data.info.usage] | <code>String</code> |  | The command usage |
| [data.info.name] | <code>String</code> |  | The full command name |
| [data.options] | <code>CommandOptions</code> \| <code>Object</code> |  | The command options |
| [data.permissions] | <code>CommandPermissions</code> \| <code>Object</code> |  | The command permissions |

<a name="AxonTemplate"></a>

## AxonTemplate : <code>Object</code>
**Kind**: global typedef  
