<a name="CommandOptions"></a>

## CommandOptions
**Kind**: global class  
**Author**: KhaaZ  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [argsMin] | <code>Number</code> | <code>0</code> | Minimum arguments required to execute the command |
| [invalidUsageMessage] | <code>Boolean</code> | <code>true</code> | Whether to trigger the help command on invalid usage (not enough arguments) |
| [sendPermissionMessage] | <code>Boolean</code> | <code>false</code> | Whether to trigger an error message on invalid permission (bot / user / custom etc) |
| [invalidPermissionMessage] | <code>function</code> \| <code>String</code> | <code></code> | What the invalid permission message should be |
| [invalidPermissionMessageTimeout] | <code>Number</code> | <code>9000</code> | What the invalid permission message deletion timeout should be |
| [deleteCommand] | <code>Boolean</code> | <code>false</code> | Whether to delete the command input after trigger |
| [guildOnly] | <code>Boolean</code> | <code>true</code> | Whether to allow executing this command outside of guilds |
| [hidden] | <code>Boolean</code> | <code>false</code> | Whether to hide this command from help command (general / subcommands) |
| [cooldown] | <code>Number</code> | <code>3000</code> | Cooldown betweeneach usage of this command for a specific user (in ms) |


* [CommandOptions](#CommandOptions)
    * [new CommandOptions()](#new_CommandOptions_new)
    * _instance_
        * [.l](#CommandOptions+l) : <code>MessageManager</code>
        * [.isGuildOnly()](#CommandOptions+isGuildOnly) ⇒ <code>Boolean</code>
        * [.isHidden()](#CommandOptions+isHidden) ⇒ <code>Boolean</code>
        * [.shouldSendInvalidUsageMessage(args)](#CommandOptions+shouldSendInvalidUsageMessage) ⇒ <code>Boolean</code>
        * [.shouldSendInvalidPermissionMessage(guildConfig)](#CommandOptions+shouldSendInvalidPermissionMessage) ⇒ <code>Boolean</code>
        * [.shouldDeleteCommand()](#CommandOptions+shouldDeleteCommand) ⇒ <code>Boolean</code>
        * [.getInvalidPermissionMessage(channel, member)](#CommandOptions+getInvalidPermissionMessage) ⇒ <code>String</code>
    * _static_
        * [.CommandOptions](#CommandOptions.CommandOptions)
            * [new CommandOptions(command, [override], [useModuleDefault])](#new_CommandOptions.CommandOptions_new)

<a name="new_CommandOptions_new"></a>

### new CommandOptions()
CommandOptions.
Holds options for a command and all necessary checkers.

<a name="CommandOptions+l"></a>

### commandOptions.l : <code>MessageManager</code>
Returns the MessageManager instance

**Kind**: instance property of [<code>CommandOptions</code>](#CommandOptions)  
**Read only**: true  
<a name="CommandOptions+isGuildOnly"></a>

### commandOptions.isGuildOnly() ⇒ <code>Boolean</code>
Whether the command is guild only or not

**Kind**: instance method of [<code>CommandOptions</code>](#CommandOptions)  
<a name="CommandOptions+isHidden"></a>

### commandOptions.isHidden() ⇒ <code>Boolean</code>
Whether the command is hidden or not

**Kind**: instance method of [<code>CommandOptions</code>](#CommandOptions)  
<a name="CommandOptions+shouldSendInvalidUsageMessage"></a>

### commandOptions.shouldSendInvalidUsageMessage(args) ⇒ <code>Boolean</code>
Whether we should send an invalid usage message or not (help command)

**Kind**: instance method of [<code>CommandOptions</code>](#CommandOptions)  

| Param | Type |
| --- | --- |
| args | <code>Array</code> | 

<a name="CommandOptions+shouldSendInvalidPermissionMessage"></a>

### commandOptions.shouldSendInvalidPermissionMessage(guildConfig) ⇒ <code>Boolean</code>
Whether we should send the invalid permission message or not

**Kind**: instance method of [<code>CommandOptions</code>](#CommandOptions)  

| Param | Type |
| --- | --- |
| guildConfig | <code>GuildConfig</code> | 

<a name="CommandOptions+shouldDeleteCommand"></a>

### commandOptions.shouldDeleteCommand() ⇒ <code>Boolean</code>
Whether we should delete the command or not

**Kind**: instance method of [<code>CommandOptions</code>](#CommandOptions)  
<a name="CommandOptions+getInvalidPermissionMessage"></a>

### commandOptions.getInvalidPermissionMessage(channel, member) ⇒ <code>String</code>
Get the invalid permission message

**Kind**: instance method of [<code>CommandOptions</code>](#CommandOptions)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>Channel</code> | The guild channel |
| member | <code>Member</code> | The guild member |

<a name="CommandOptions.CommandOptions"></a>

### CommandOptions.CommandOptions
**Kind**: static class of [<code>CommandOptions</code>](#CommandOptions)  
<a name="new_CommandOptions.CommandOptions_new"></a>

#### new CommandOptions(command, [override], [useModuleDefault])
Creates an instance of CommandOptions.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| command | <code>Command</code> |  | The base command |
| [override] | <code>Object</code> | <code>{}</code> | - The specific options for this command (format - CommandOptions) |
| [useModuleDefault] | <code>Boolean</code> | <code>false</code> | Whether to use or not the module's base options before applying override permissions |

