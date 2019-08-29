<a id="command"></a>

## Command ⇐ <code>Base</code>
**Kind**: global class  
**Extends**: <code>Base</code>  
**Author**: KhaaZ  

[Command](#Command) ⇐ <code>Base</code>
- _static_
    - [.Command](#Command)
        - [new Command(module)](#Command_new)
- _instance_
    - [options](#options)
    - [permissions](#permissions)
    - [execute(object)](#execute) ⇒ <code>Promise</code>
    - [sendHelp({msg,)](#sendHelp) ⇒ <code>Promise.&lt;Message&gt;</code>
    - [canExecute(msg, guildConf)](#canExecute) ⇒ <code>Boolean</code>
    - [sendBotPerms(channel, [permissions])](#sendBotPerms) ⇒ <code>Promise.&lt;?Message&gt;</code>
    - [sendUserPerms(channel, member, [permission])](#sendUserPerms) ⇒ <code>Promise.&lt;?Message&gt;</code>
    - [sendTargetPerms(channel)](#sendTargetPerms) ⇒ <code>Promise.&lt;?Message&gt;</code>
    - [sendCooldown(channel)](#sendCooldown) ⇒ <code>Promise.&lt;?Message&gt;</code>
    
<a id="command"></a>

### Command.Command
**Kind**: static class of [<code>Command</code>](#Command)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| axon | <code>Object.&lt;AxonClient&gt;</code> |  | Axon Client [GETTER: _axon] |
| bot | <code>Object.&lt;Eris.Client&gt;</code> |  | Eris bot Client [GETTER: _axon.client] |
| Logger | <code>Object</code> |  | Logger Object/Methods [GETTER: axon.Logger] |
| AxonUtils | <code>Object</code> |  | AxonUtils Object/Methods [GETTER: axon.AxonUtils] |
| Utils | <code>Object</code> |  | Utils Object/Methods [GETTER: axon.Utils] |
| module | <code>Object.&lt;Module&gt;</code> |  | Module object [GETTER: _module] |
| _cooldown | <code>Object</code> |  | Map of current cooldown (global per user) [key: userID, value: Date.now()] |
| label | <code>String</code> |  | Command label (name/id) |
| aliases | <code>Array.&lt;String&gt;</code> |  | Array of commands aliases (including the command label) |
| [enabled] | <code>Boolean</code> | <code>module.enabled</code> | Is the command enabled? |
| [isSubcmd] | <code>Boolean</code> | <code>false</code> | Command is a subcommand |
| [parentCommand] | [<code>Object.&lt;Command&gt;</code>](#Command) | <code>NULL</code> | Reference to the parent command (if isSubcmd = true) |
| [hasSubcmd] | <code>Boolean</code> | <code>false</code> | Does the command have subcommands? |
| [serverBypass] | <code>Boolean</code> | <code>module.serverBypass</code> | Can the command be disabled? |
| subcmds | <code>Array</code> |  | Array of subcommand objects (deleted after init) |
| [subCommands] | [<code>Collection.&lt;Command&gt;</code>](#Command) | <code>NULL</code> | Collection of subcommands |
| [subCommandsAliases] | <code>Object.&lt;Map&gt;</code> | <code>NULL</code> | Map of subcommand aliases |
| infos | <code>Object</code> |  | Default info about the command |
| infos.owners | <code>Array</code> |  | Command authors |
| infos.cmdName | <code>String</code> |  | Full command name |
| infos.description | <code>String</code> |  | Command description |
| infos.usage | <code>String</code> |  | Command usage |
| infos.example | <code>Array</code> |  | Array of command examples |
| options | <code>Object</code> |  | Default options for the command |
| [options.argsMin] | <code>Number</code> | <code>0</code> | Minimum number of args required |
| [options.invalidUsage] | <code>Boolean</code> | <code>true</code> | Whether to trigger the help command on invalid usage (args required or no args given) |
| [options.invalidPermissionMessage] | <code>Boolean</code> | <code>false</code> | Whether to trigger an error message on invalid permission |
| [options.deleteCommand] | <code>Boolean</code> | <code>false</code> | Whether to delete the command input |
| [options.guildOnly] | <code>Boolean</code> | <code>true</code> | Whether the command can only be used in guilds |
| [options.hidden] | <code>Boolean</code> | <code>false</code> | Whether the command should be listed in the help commmand |
| [options.cooldown] | <code>Number</code> | <code>3000</code> | Cooldown for the command |
| permissions | <code>Object</code> |  | Needed permissions of the bot/users |
| [permissions.bot] | <code>Array</code> | <code>[]</code> | Array or permissions needed by the bot to execute the command |
| [permissions.serverMod] | <code>Boolean</code> | <code>false</code> | Whether to limit the command to serverMod+ |
| [permissions.severAdmin] | <code>Boolean</code> | <code>false</code> | Whether to limit the command to serverAdmin+ |
| [permissions.user.needed] | <code>Array</code> | <code>[]</code> | All permissions needed by the user |
| [permissions.user.bypass] | <code>Array</code> | <code>[]</code> | Having one of these perms allows the user to use the command |
| [permissions.usersID.needed] | <code>Array</code> | <code>[]</code> | List of user ids that have permission to use the command (they need the other permissions too) |
| [permissions.usersID.bypass] | <code>Array</code> | <code>[]</code> | List of user ids that are allowed to use the command, regardless of other permissions |
| [permissions.rolesID.needed] | <code>Array</code> | <code>[]</code> | List of role ids needed |
| [permissions.rolesID.bypass] | <code>Array</code> | <code>[]</code> | Having one of these roles allows the user to use the command, regardless of other permissions |
| [permissions.ChannelsID.needed] | <code>Array</code> | <code>[]</code> | List of channel ids where the command is allowed |
| [permissions.channelsID.bypass] | <code>Array</code> | <code>[]</code> | Being in one of these channels allow the user to use the command, regardless of other permissions |
| [permissions.staff.needed] | <code>Array</code> | <code>[]</code> | List of bot.staff permissions needed to use the command (they need the other permissions too) |
| [permissions.staff.bypass] | <code>Array</code> | <code>[]</code> | Having one of these bot.staff permission allow to use the command, regardless of other permissions |
| template | <code>Object</code> |  | Template object shortcut [GETTER: axon.configs.template] |

<a id="command_new"></a>

#### new Command(module)
Creates an Instance of Command.

| Param | Type |
| --- | --- |
| module | <code>Object.&lt;Module&gt;</code> | 

<a id="options"></a>

### options
Command options has default values.

**Kind**: Instance property of [<code>Command</code>](#Command)  

<a name="permissions"></a>

### permissions
Handles permissions of both the bot and the user

Optional posible override for:
 - Users ID
 - Roles ID
 - Channels ID

Bot Staff override

Custom function for special permission case

Needed => Need to have all <NEEDED> permissions to execute the command
Bypass => Need to have one <BYPASS> permissions to execute the command (override needed as well)

**Kind**: Instance property of [<code>Command</code>](#Command)  

<a id="execute"></a>

### execute(object) ⇒ <code>Promise</code>
Execute method to override in all commands child.  
Execute this method when the command is called.  

**Kind**: instance method of [<code>Command</code>](#Command)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | An Object with all arguments to use execute |
| [object.message] | <code>Object</code> | The message Object |
| [object.args] | <code>Array.&lt;String&gt;</code> | The Array of arguments |
| [object.guildConf] | <code>Object</code> | The guildConfig if it exists |

<a id="sendHelp"></a>

### sendHelp({msg,) ⇒ <code>Promise.&lt;Message&gt;</code>
Send Help message in the current channel.  
Call custom sendHelp (Client method if it exists instead of the default one).  

**Kind**: Instance method of [<code>Command</code>](#Command)  
**Returns**: <code>Promise.&lt;Message&gt;</code> - Message Object  

| Param | Type | Description |
| --- | --- | --- |
| {msg, | <code>Object.&lt;Message&gt;</code> | guildconf} - The message object |

<a id="canExecute"></a>

### canExecute(msg, guildConf) ⇒ <code>Boolean</code>
Permission verifier - Checks whether the user has perms to execute the command or not.  
Bypass - One of the perms (override) => doesn't go through other verifiers.  
Needed - All perms => still go through other checkers.  

**Kind**: Instance method of [<code>Command</code>](#Command)  
**Returns**: <code>Boolean</code> - True if the user can execute command / False if not  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>Object.&lt;Message&gt;</code> | The Message Object |
| guildConf | <code>Object</code> | GuildConfig |

<a id="sendBotPerms"></a>

### sendBotPerms(channel, [permissions]) ⇒ <code>Promise.&lt;?Message&gt;</code>
Sends an error message for invalid Bot permissions.  
After a delay the message auto deletes.  

**Kind**: Instance method of [<code>Command</code>](#Command)  
**Returns**: <code>Promise.&lt;?Message&gt;</code> - Message Object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| channel | <code>Object.&lt;Channel&gt;</code> |  | The channel Object |
| [permissions] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | Optional array of permissions string |

<a id="sendUserPerms"></a>

### sendUserPerms(channel, member, [permission]) ⇒ <code>Promise.&lt;?Message&gt;</code>
Sends an error message for Source user permissions.  
After a delay the message auto deletes.  

**Kind**: Instance method of [<code>Command</code>](#Command)  
**Returns**: <code>Promise.&lt;?Message&gt;</code> - Message Object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| channel | <code>Object.&lt;Channel&gt;</code> |  | The channel Object |
| member | <code>Object.&lt;Member&gt;</code> |  | The member object |
| [permission] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | Optional array of permissions string |

<a id="sendDestPerms"></a>

### sendDestPerms(channel) ⇒ <code>Promise.&lt;?Message&gt;</code>
Sends an error message for Destination user permissions.  
After a delay the message auto deletes.  

**Kind**: Instance method of [<code>Command</code>](#Command)  
**Returns**: <code>Promise.&lt;?Message&gt;</code> - Message Object  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>Object.&lt;Channel&gt;</code> | The channel Object |

<a id="sendCooldown"></a>

### sendCooldown(channel) ⇒ <code>Promise.&lt;?Message&gt;</code>
Sends an error message for invalid cooldown.  
After a delay the message auto deletes.  

**Kind**: Instance method of [<code>Command</code>](#Command)  
**Returns**: <code>Promise.&lt;?Message&gt;</code> - Message Object  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>Object.&lt;Channel&gt;</code> | The channel Object |

