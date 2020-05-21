<a name="CommandOptions"></a>

## CommandOptions
**Kind**: global class  
**Author**: KhaaZ  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
|  |  |  |  |
| [sendPermissionMessage] | <code>Boolean</code> | <code>false</code> | Whether to trigger an error message on invalid permission (bot / user / custom etc) |
| [invalidPermissionMessageTimeout] | <code>Number</code> | <code>9000</code> | What the invalid permission message deletion timeout should be |
| [argsMin] | <code>Number</code> | <code>0</code> | Minimum arguments required to execute the command |
| [invalidUsageMessage] | <code>String</code> | <code></code> | What the invalid usage message should be |
| [sendUsageMessage] | <code>Boolean</code> | <code>true</code> | Whether to trigger the help command on invalid usage (not enough arguments) |
| [deleteCommand] | <code>Boolean</code> | <code>false</code> | Whether to delete the command input after trigger |
| [guildOnly] | <code>Boolean</code> | <code>true</code> | Whether to allow executing this command outside of guilds |
| [hidden] | <code>Boolean</code> | <code>false</code> | Whether to hide this command from help command (general / subcommands) |
| [cooldown] | <code>Number</code> | <code>3000</code> | Cooldown between each usage of this command for a specific user (in ms) |


* [CommandOptions](#CommandOptions)
    * [new CommandOptions()](#new_CommandOptions_new)
    * _instance_
        * [.sendPermissionMessage](#CommandOptions+sendPermissionMessage) : <code>Boolean</code>
        * [.invalidPermissionMessageTimeout](#CommandOptions+invalidPermissionMessageTimeout) : <code>Number</code>
        * [.argsMin](#CommandOptions+argsMin) : <code>Number</code>
        * [.invalidUsageMessage](#CommandOptions+invalidUsageMessage) : <code>String</code>
        * [.sendUsageMessage](#CommandOptions+sendUsageMessage) : <code>Boolean</code>
        * [.deleteCommand](#CommandOptions+deleteCommand) : <code>Boolean</code>
        * [.guildOnly](#CommandOptions+guildOnly) : <code>Boolean</code>
        * [.hidden](#CommandOptions+hidden) : <code>Boolean</code>
        * [.cooldown](#CommandOptions+cooldown) : <code>Number</code>
        * [.l](#CommandOptions+l) : <code>MessageManager</code>
        * [.invalidPermissionMessage()](#CommandOptions+invalidPermissionMessage)
        * [.isGuildOnly()](#CommandOptions+isGuildOnly) ⇒ <code>Boolean</code>
        * [.isHidden()](#CommandOptions+isHidden) ⇒ <code>Boolean</code>
        * [.hasCorrectArgs(args)](#CommandOptions+hasCorrectArgs) ⇒ <code>Boolean</code>
        * [.shouldSendInvalidUsageMessage(args)](#CommandOptions+shouldSendInvalidUsageMessage) ⇒ <code>Boolean</code>
        * [.shouldSendInvalidPermissionMessage(guildConfig)](#CommandOptions+shouldSendInvalidPermissionMessage) ⇒ <code>Boolean</code>
        * [.shouldDeleteCommand()](#CommandOptions+shouldDeleteCommand) ⇒ <code>Boolean</code>
        * [.getInvalidPermissionMessage(channel, member, permission)](#CommandOptions+getInvalidPermissionMessage) ⇒ <code>String</code>
        * [.getInvalidUsageMessage()](#CommandOptions+getInvalidUsageMessage) ⇒ <code>String</code>
    * _static_
        * [.CommandOptions](#CommandOptions.CommandOptions)
            * [new CommandOptions(command, [override], useModuleDefault, [useModuleDefault])](#new_CommandOptions.CommandOptions_new)

<a name="new_CommandOptions_new"></a>

### new CommandOptions()
CommandOptions.
Holds options for a command and all necessary checkers.

<a name="CommandOptions+sendPermissionMessage"></a>

### commandOptions.sendPermissionMessage : <code>Boolean</code>
**Kind**: instance property of [<code>CommandOptions</code>](#CommandOptions)  
<a name="CommandOptions+invalidPermissionMessageTimeout"></a>

### commandOptions.invalidPermissionMessageTimeout : <code>Number</code>
**Kind**: instance property of [<code>CommandOptions</code>](#CommandOptions)  
<a name="CommandOptions+argsMin"></a>

### commandOptions.argsMin : <code>Number</code>
**Kind**: instance property of [<code>CommandOptions</code>](#CommandOptions)  
<a name="CommandOptions+invalidUsageMessage"></a>

### commandOptions.invalidUsageMessage : <code>String</code>
**Kind**: instance property of [<code>CommandOptions</code>](#CommandOptions)  
<a name="CommandOptions+sendUsageMessage"></a>

### commandOptions.sendUsageMessage : <code>Boolean</code>
**Kind**: instance property of [<code>CommandOptions</code>](#CommandOptions)  
<a name="CommandOptions+deleteCommand"></a>

### commandOptions.deleteCommand : <code>Boolean</code>
**Kind**: instance property of [<code>CommandOptions</code>](#CommandOptions)  
<a name="CommandOptions+guildOnly"></a>

### commandOptions.guildOnly : <code>Boolean</code>
**Kind**: instance property of [<code>CommandOptions</code>](#CommandOptions)  
<a name="CommandOptions+hidden"></a>

### commandOptions.hidden : <code>Boolean</code>
**Kind**: instance property of [<code>CommandOptions</code>](#CommandOptions)  
<a name="CommandOptions+cooldown"></a>

### commandOptions.cooldown : <code>Number</code>
**Kind**: instance property of [<code>CommandOptions</code>](#CommandOptions)  
<a name="CommandOptions+l"></a>

### commandOptions.l : <code>MessageManager</code>
Returns the MessageManager instance

**Kind**: instance property of [<code>CommandOptions</code>](#CommandOptions)  
**Read only**: true  
<a name="CommandOptions+invalidPermissionMessage"></a>

### commandOptions.invalidPermissionMessage()
**Kind**: instance method of [<code>CommandOptions</code>](#CommandOptions)  
<a name="CommandOptions+isGuildOnly"></a>

### commandOptions.isGuildOnly() ⇒ <code>Boolean</code>
Whether the command is guild only or not

**Kind**: instance method of [<code>CommandOptions</code>](#CommandOptions)  
<a name="CommandOptions+isHidden"></a>

### commandOptions.isHidden() ⇒ <code>Boolean</code>
Whether the command is hidden or not

**Kind**: instance method of [<code>CommandOptions</code>](#CommandOptions)  
<a name="CommandOptions+hasCorrectArgs"></a>

### commandOptions.hasCorrectArgs(args) ⇒ <code>Boolean</code>
Whether args for this command are correct or not (enough args).

**Kind**: instance method of [<code>CommandOptions</code>](#CommandOptions)  

| Param | Type |
| --- | --- |
| args | <code>Array.&lt;String&gt;</code> | 

<a name="CommandOptions+shouldSendInvalidUsageMessage"></a>

### commandOptions.shouldSendInvalidUsageMessage(args) ⇒ <code>Boolean</code>
Whether we should send an invalid usage message or not (help command)

**Kind**: instance method of [<code>CommandOptions</code>](#CommandOptions)  

| Param | Type |
| --- | --- |
| args | <code>Array.&lt;String&gt;</code> | 

<a name="CommandOptions+shouldSendInvalidPermissionMessage"></a>

### commandOptions.shouldSendInvalidPermissionMessage(guildConfig) ⇒ <code>Boolean</code>
Whether we should send the invalid permission message or not

**Kind**: instance method of [<code>CommandOptions</code>](#CommandOptions)  

| Param | Type |
| --- | --- |
| guildConfig | <code>[GuildConfig](Core/GuildConfig)</code> | 

<a name="CommandOptions+shouldDeleteCommand"></a>

### commandOptions.shouldDeleteCommand() ⇒ <code>Boolean</code>
Whether we should delete the command or not

**Kind**: instance method of [<code>CommandOptions</code>](#CommandOptions)  
<a name="CommandOptions+getInvalidPermissionMessage"></a>

### commandOptions.getInvalidPermissionMessage(channel, member, permission) ⇒ <code>String</code>
Get the invalid permission message

**Kind**: instance method of [<code>CommandOptions</code>](#CommandOptions)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>Channel</code> | The guild channel |
| member | <code>Member</code> | The guild member |
| permission | <code>String</code> | The missing permission |

<a name="CommandOptions+getInvalidUsageMessage"></a>

### commandOptions.getInvalidUsageMessage() ⇒ <code>String</code>
Get the invalid usage message

**Kind**: instance method of [<code>CommandOptions</code>](#CommandOptions)  
<a name="CommandOptions.CommandOptions"></a>

### CommandOptions.CommandOptions
**Kind**: static class of [<code>CommandOptions</code>](#CommandOptions)  
<a name="new_CommandOptions.CommandOptions_new"></a>

#### new CommandOptions(command, [override], useModuleDefault, [useModuleDefault])
Creates an instance of CommandOptions.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| command | <code>[Command](Commands/Command)</code> |  | The base command |
| [override] | <code>Object</code> | <code>{}</code> | - The specific options for this command (format - CommandOptions) |
| useModuleDefault |  | <code>false</code> |  |
| override.sendPermissionMessage | <code>Boolean</code> |  | Whether to trigger an error message on invalid permission (bot / user / custom etc) |
| override.invalidPermissionMessageTimeout | <code>Number</code> |  | What the invalid permission message deletion timeout should be |
| override.argsMin | <code>Number</code> |  | Minimum arguments required to execute the command |
| override.invalidUsageMessage | <code>String</code> |  | What the invalid usage message should be |
| override.sendUsageMessage | <code>Boolean</code> |  | Whether to trigger the help command on invalid usage (not enough arguments) |
| override.deleteCommand | <code>Boolean</code> |  | Whether to delete the command input after trigger |
| override.guildOnly | <code>Boolean</code> |  | Whether to allow executing this command outside of guilds |
| override.hidden | <code>Boolean</code> |  | Whether to hide this command from help command (general / subcommands) |
| override.cooldown | <code>Number</code> |  | Cooldown between each usage of this command for a specific user (in ms) |
| [useModuleDefault] | <code>Boolean</code> | <code>false</code> | Whether to use or not the module's base options before applying override permissions |

