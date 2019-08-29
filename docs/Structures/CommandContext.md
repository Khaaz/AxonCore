<a name="CommandContext"></a>

## CommandContext
**Kind**: global class  
**Author**: KhaaZ  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| raw | <code>String</code> |  | Raw input |
| commandLabel | <code>String</code> |  | The command name |
| moduleLabel | <code>String</code> |  | The module name STATUS |
| [executed] | <code>Boolean</code> | <code>true</code> | Whether the command was actually executed or not |
| [data.helpExecution] | <code>Boolean</code> | <code>false</code> |  |
| executionState | <code>Number.&lt;COMMAND\_EXECUTION\_STATE&gt;</code> |  | The state of execution (no error, cooldown, invalid usage, invalid permission) |
| executionType | <code>Number.&lt;COMMAND\_EXECUTION\_TYPES&gt;</code> |  | The type of execution (Owner, Admin, Regular) |
| [success] | <code>Boolean</code> | <code>true</code> | Whether the command was successfully executed or not |
| [error] | <code>Object</code> \| <code>String</code> | <code></code> | Optional error object in case of bad command execution CONTEXT |
| [dm] | <code>Boolean</code> | <code>false</code> | Whether the command was executed in DM or not |
| [guildID] | <code>String</code> | <code></code> | Context: guild where the command was executed ID |
| [guildName] | <code>String</code> | <code></code> | Context: guild where the command was executed name |
| [channelID] | <code>String</code> | <code></code> | Context: channel where the command was executed ID |
| [channelName] | <code>String</code> | <code></code> | Context: channel where the command was executed name |
| [callerID] | <code>String</code> | <code></code> | Context: user that called thecommand ID |
| [callerName] | <code>String</code> | <code></code> | Context: user that called thecommand name |
| [calledAt] | <code>Date</code> | <code>Date.now()</code> | The execution time |


* [CommandContext](#CommandContext)
    * [new CommandContext()](#new_CommandContext_new)
    * _instance_
        * [.executed](#CommandContext+executed)
        * [.addResponseData(commandResponse)](#CommandContext+addResponseData) ⇒ [<code>CommandContext</code>](#CommandContext)
    * _static_
        * [.CommandContext](#CommandContext.CommandContext)
            * [new CommandContext(command, triggerMessage, [data])](#new_CommandContext.CommandContext_new)
        * [.getExecutionType(isAdmin, isOwner)](#CommandContext.getExecutionType) ⇒ <code>Number.&lt;COMMAND\_EXECUTION\_TYPES&gt;</code>

<a name="new_CommandContext_new"></a>

### new CommandContext()
CommandContext object that encapsulates entirely the command execution data.
Status, context etc...

A command is flagged as "executed" if it was ran (went through execute method).
If it was not executed, we know the reason (onCooldown, invalidUsage, invalidBotPermissions, invalidUserPermissions)

If the command was executed, it has the success flag. If it's true,it means the command worked until the end (aka normal execution).
Success being false can be the result of a regular stop ofthe execution flow (bad input for example, usage of this.sendError) or of catched error(usage of this.error).
The last possiblity is un cacthed errors.

<a name="CommandContext+executed"></a>

### commandContext.executed
Status

**Kind**: instance property of [<code>CommandContext</code>](#CommandContext)  
<a name="CommandContext+addResponseData"></a>

### commandContext.addResponseData(commandResponse) ⇒ [<code>CommandContext</code>](#CommandContext)
Add the command response data to the command context object.
Add the state of the command success and optionaly the error.

**Kind**: instance method of [<code>CommandContext</code>](#CommandContext)  

| Param | Type | Description |
| --- | --- | --- |
| commandResponse | <code>Object.&lt;CommandResponse&gt;</code> | CommandResponse object obtained or created after the command execution |

<a name="CommandContext.CommandContext"></a>

### CommandContext.CommandContext
**Kind**: static class of [<code>CommandContext</code>](#CommandContext)  
<a name="new_CommandContext.CommandContext_new"></a>

#### new CommandContext(command, triggerMessage, [data])
Creates an instance of CommandContext.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| command | <code>Object.&lt;Command&gt;</code> |  |  |
| triggerMessage | <code>Object.&lt;Message&gt;</code> |  |  |
| [data] | <code>Object</code> | <code>{}</code> |  |
| [data.executed] | <code>Boolean</code> | <code>true</code> |  |
| [data.helpExecution] | <code>Boolean</code> | <code>false</code> |  |
| [data.executionState] | <code>Number.&lt;COMMAND\_EXECUTION\_STATE&gt;</code> | <code>0</code> | no error, cooldown, invalid usage, invalid permissions... |
| [data.executionType] | <code>Number.&lt;COMMAND\_EXECUTION\_TYPES&gt;</code> | <code>{}</code> | Regular, admin,owner execution |
| [data.dm] | <code>Boolean</code> | <code>false</code> |  |

<a name="CommandContext.getExecutionType"></a>

### CommandContext.getExecutionType(isAdmin, isOwner) ⇒ <code>Number.&lt;COMMAND\_EXECUTION\_TYPES&gt;</code>
Return the type of command execution based of the execution context.
Admin, Owner or Regular execution.

**Kind**: static method of [<code>CommandContext</code>](#CommandContext)  

| Param | Type |
| --- | --- |
| isAdmin | <code>Boolean</code> | 
| isOwner | <code>Boolean</code> | 

