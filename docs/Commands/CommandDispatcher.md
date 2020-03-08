<a name="CommandDispatcher"></a>

## CommandDispatcher
**Kind**: global class  
**Author**: KhaaZ  
**Properties**

| Name | Type |
| --- | --- |
| _axon | <code>AxonClient</code> | 
| mentionFormatter | <code>RegExp</code> | 


* [CommandDispatcher](#CommandDispatcher)
    * [new CommandDispatcher()](#new_CommandDispatcher_new)
    * _instance_
        * [.library](#CommandDispatcher+library) : <code>LibraryInterface</code>
        * [.dispatch(msg)](#CommandDispatcher+dispatch) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.getExecutionType(msg)](#CommandDispatcher+getExecutionType) ⇒ <code>COMMAND\_EXECUTION\_TYPES</code>
        * [.resolvePrefix(msg, guildConfig, [isAdmin], [isOwner])](#CommandDispatcher+resolvePrefix) ⇒ <code>String</code>
        * [.resolveGuildPrefix(msg, guildConfig)](#CommandDispatcher+resolveGuildPrefix) ⇒ <code>String</code>
    * _static_
        * [.CommandDispatcher](#CommandDispatcher.CommandDispatcher)
            * [new CommandDispatcher(axon)](#new_CommandDispatcher.CommandDispatcher_new)

<a name="new_CommandDispatcher_new"></a>

### new CommandDispatcher()
Class responsible to call the correct command and correct execution flow when needed.
Dispatch to the correct command on message create event.
Handles prefix resolving and command resolving.

<a name="CommandDispatcher+library"></a>

### commandDispatcher.library : <code>LibraryInterface</code>
Returns the LibraryInterface instance

**Kind**: instance property of [<code>CommandDispatcher</code>](#CommandDispatcher)  
**Read only**: true  
<a name="CommandDispatcher+dispatch"></a>

### commandDispatcher.dispatch(msg) ⇒ <code>Promise.&lt;void&gt;</code>
Dispatches the messageCreate event to:
- end of execution if:
     - no prefix
     - no command
     - no permissions
- command execution with different execution flow:
     - Owner execution
     - Admin execution
     - Regular execution
     - DM execution

**Kind**: instance method of [<code>CommandDispatcher</code>](#CommandDispatcher)  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>Message</code> | Message Object from Eris |

<a name="CommandDispatcher+getExecutionType"></a>

### commandDispatcher.getExecutionType(msg) ⇒ <code>COMMAND\_EXECUTION\_TYPES</code>
Give the execution type: Owner or Admin execution.
It uses the global admin and owner prefixes and checks for the BotStaff rank of the caller.

**Kind**: instance method of [<code>CommandDispatcher</code>](#CommandDispatcher)  
**Returns**: <code>COMMAND\_EXECUTION\_TYPES</code> - The execution type  

| Param | Type |
| --- | --- |
| msg | <code>Message</code> | 

<a name="CommandDispatcher+resolvePrefix"></a>

### commandDispatcher.resolvePrefix(msg, guildConfig, [isAdmin], [isOwner]) ⇒ <code>String</code>
Resolves the prefix for the guild of the message.
Will resolve the owner or admin prefix if it's an owner or admin execution.
It will otherwise regularly resolve the prefix for this particular guild.

**Kind**: instance method of [<code>CommandDispatcher</code>](#CommandDispatcher)  
**Returns**: <code>String</code> - The prefix if found / Undefined if not  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| msg | <code>Message</code> |  | The message object |
| guildConfig | <code>GuildConfig</code> |  | The guildConfig Object |
| [isAdmin] | <code>Boolean</code> | <code>false</code> | Whether admin prefix was used |
| [isOwner] | <code>Boolean</code> | <code>false</code> | Whether owner prefix was used |

<a name="CommandDispatcher+resolveGuildPrefix"></a>

### commandDispatcher.resolveGuildPrefix(msg, guildConfig) ⇒ <code>String</code>
Resolves the prefix for the guild of the message.
If the message starts with one of the guild prefixes it returns the prefix, otherwise it returns undefined.
Global prefixes will only take over if no prefix are specified in this guild.

**Kind**: instance method of [<code>CommandDispatcher</code>](#CommandDispatcher)  
**Returns**: <code>String</code> - The prefix if found / Undefined if not  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>Message</code> | The message object |
| guildConfig | <code>GuildConfig</code> | The guildConfig Object |

<a name="CommandDispatcher.CommandDispatcher"></a>

### CommandDispatcher.CommandDispatcher
**Kind**: static class of [<code>CommandDispatcher</code>](#CommandDispatcher)  
<a name="new_CommandDispatcher.CommandDispatcher_new"></a>

#### new CommandDispatcher(axon)
Creates an instance of CommandDispatcher.


| Param | Type |
| --- | --- |
| axon | <code>AxonClient</code> | 

