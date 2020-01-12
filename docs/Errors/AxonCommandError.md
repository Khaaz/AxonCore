<a name="AxonCommandError"></a>

## AxonCommandError ⇐ <code>Error</code>
**Kind**: global class  
**Extends**: <code>Error</code>  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| context | <code>CommandContext</code> | Command Context containing all informations about the command execution |


* [AxonCommandError](#AxonCommandError) ⇐ <code>Error</code>
    * [new AxonCommandError()](#new_AxonCommandError_new)
    * [.AxonCommandError](#AxonCommandError.AxonCommandError)
        * [new AxonCommandError(commandContext, err)](#new_AxonCommandError.AxonCommandError_new)

<a name="new_AxonCommandError_new"></a>

### new AxonCommandError()
Custom error with better formatting and context informations.
Used for errors thrown by AxonCore commands.

<a name="AxonCommandError.AxonCommandError"></a>

### AxonCommandError.AxonCommandError
**Kind**: static class of [<code>AxonCommandError</code>](#AxonCommandError)  
<a name="new_AxonCommandError.AxonCommandError_new"></a>

#### new AxonCommandError(commandContext, err)
Creates an instance of AxonCommandError.


| Param | Type | Description |
| --- | --- | --- |
| commandContext | <code>CommandContext</code> | The command context that contains all information about the command execution |
| err | <code>Error</code> | Discord Error (given by library/discord/other) |

