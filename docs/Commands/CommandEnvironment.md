<a name="CommandEnvironment"></a>

## CommandEnvironment
**Kind**: global class  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| raw | <code>String</code> | The raw message content |
| msg | <code>Message</code> | The message object from the lib |
| args | <code>Array.&lt;String&gt;</code> | The array of arguments |
| guildConfig | <code>[GuildConfig](Core/GuildConfig)</code> | The GuildConfig data-structure with all DB saved settings |
| prefix | <code>String</code> | The prefix used for this command |
| command | <code>String</code> | The full label of the command being executed |
| usedCommandLabel | <code>String</code> | The used label of the command being executed |
| executionType | <code>COMMAND\_EXECUTION\_TYPES</code> | Execution type: admin, owner, regular |


* [CommandEnvironment](#CommandEnvironment)
    * [new CommandEnvironment()](#new_CommandEnvironment_new)
    * _instance_
        * [.isAdmin](#CommandEnvironment+isAdmin) : <code>Boolean</code>
        * [.isOwner](#CommandEnvironment+isOwner) : <code>Boolean</code>
        * [.setPrefix(prefix)](#CommandEnvironment+setPrefix) ⇒ <code>[CommandEnvironment](Commands/CommandEnvironment)</code>
        * [.setGuildConfig(guildConfig)](#CommandEnvironment+setGuildConfig) ⇒ <code>[CommandEnvironment](Commands/CommandEnvironment)</code>
        * [.setCommand(command, usedLabel)](#CommandEnvironment+setCommand) ⇒ <code>[CommandEnvironment](Commands/CommandEnvironment)</code>
        * [.resolveArgs(parser, args)](#CommandEnvironment+resolveArgs)
    * _static_
        * [.CommandEnvironment](#CommandEnvironment.CommandEnvironment)
            * [new CommandEnvironment(data)](#new_CommandEnvironment.CommandEnvironment_new)

<a name="new_CommandEnvironment_new"></a>

### new CommandEnvironment()
CommandEnvironment structure. Contains all the environment used in command execution (all variables used in Command.execute).

<a name="CommandEnvironment+isAdmin"></a>

### commandEnvironment.isAdmin : <code>Boolean</code>
Whether this is an admin execution environment (owner or admin)

**Kind**: instance property of [<code>CommandEnvironment</code>](#CommandEnvironment)  
**Read only**: true  
<a name="CommandEnvironment+isOwner"></a>

### commandEnvironment.isOwner : <code>Boolean</code>
Whether this is an owner execution environment

**Kind**: instance property of [<code>CommandEnvironment</code>](#CommandEnvironment)  
**Read only**: true  
<a name="CommandEnvironment+setPrefix"></a>

### commandEnvironment.setPrefix(prefix) ⇒ <code>[CommandEnvironment](Commands/CommandEnvironment)</code>
Set the prefix

**Kind**: instance method of [<code>CommandEnvironment</code>](#CommandEnvironment)  
**Returns**: <code>[CommandEnvironment](Commands/CommandEnvironment)</code> - This CommandEnvironment  

| Param | Type |
| --- | --- |
| prefix | <code>String</code> | 

<a name="CommandEnvironment+setGuildConfig"></a>

### commandEnvironment.setGuildConfig(guildConfig) ⇒ <code>[CommandEnvironment](Commands/CommandEnvironment)</code>
Set the guildConfig

**Kind**: instance method of [<code>CommandEnvironment</code>](#CommandEnvironment)  
**Returns**: <code>[CommandEnvironment](Commands/CommandEnvironment)</code> - This CommandEnvironment  

| Param | Type |
| --- | --- |
| guildConfig | <code>[GuildConfig](Core/GuildConfig)</code> | 

<a name="CommandEnvironment+setCommand"></a>

### commandEnvironment.setCommand(command, usedLabel) ⇒ <code>[CommandEnvironment](Commands/CommandEnvironment)</code>
Set the command label from the command object

**Kind**: instance method of [<code>CommandEnvironment</code>](#CommandEnvironment)  
**Returns**: <code>[CommandEnvironment](Commands/CommandEnvironment)</code> - This CommandEnvironment  

| Param | Type |
| --- | --- |
| command | <code>[Command](Commands/Command)</code> | 
| usedLabel | <code>String</code> | 

<a name="CommandEnvironment+resolveArgs"></a>

### commandEnvironment.resolveArgs(parser, args)
Resolve the argument from the args string.
Uses the custom parser given in params

**Kind**: instance method of [<code>CommandEnvironment</code>](#CommandEnvironment)  

| Param | Type | Description |
| --- | --- | --- |
| parser | <code>Object</code> |  |
| args | <code>String</code> | Arguments string |

<a name="CommandEnvironment.CommandEnvironment"></a>

### CommandEnvironment.CommandEnvironment
**Kind**: static class of [<code>CommandEnvironment</code>](#CommandEnvironment)  
<a name="new_CommandEnvironment.CommandEnvironment_new"></a>

#### new CommandEnvironment(data)
Creates an instance of CommandEnvironment.


| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> |  |
| data.msg | <code>Message</code> | The message object from the lib |
| data.args | <code>Array.&lt;String&gt;</code> | The array of arguments |
| data.guildConfig | <code>[GuildConfig](Core/GuildConfig)</code> | The GuildConfig data-structure with all DB saved settings |
| data.prefix | <code>String</code> | The prefix used for this command |
| data.command | <code>[Command](Commands/Command)</code> | The command object |
| data.executionType | <code>COMMAND\_EXECUTION\_TYPES</code> | Execution type: admin, owner, regular |

