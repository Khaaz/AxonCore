<a name="Base"></a>

## Base
**Kind**: global class  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| _axon | <code>AxonClient</code> | AxonClient |


* [Base](#Base)
    * [new Base()](#new_Base_new)
    * _instance_
        * [.axon](#Base+axon) : <code>AxonClient</code>
        * [.bot](#Base+bot) : <code>Client</code>
        * [.logger](#Base+logger) : <code>Logger</code>
        * [.Resolver](#Base+Resolver) : <code>Resolver</code>
        * [.axonUtils](#Base+axonUtils) : <code>AxonUtils</code>
        * [.utils](#Base+utils) : <code>Utils</code>
        * [.l](#Base+l) : <code>MessageManager</code>
        * [.getModule(module)](#Base+getModule) ⇒ <code>Module</code> \| <code>NULL</code>
        * [.getCommand(fullLabel)](#Base+getCommand) ⇒ <code>Command</code> \| <code>NULL</code>
        * [.sendDM(user, content, [options])](#Base+sendDM) ⇒ <code>Promise.&lt;?Message&gt;</code>
        * [.sendMessage(channel, content, [options])](#Base+sendMessage) ⇒ <code>Promise.&lt;?Message&gt;</code>
        * [.editMessage(message, content)](#Base+editMessage) ⇒ <code>Promise.&lt;?Message&gt;</code>
        * [.sendSuccess(channel, content, [options])](#Base+sendSuccess) ⇒ <code>Promise.&lt;CommandResponse&gt;</code>
        * [.sendError(content, [options])](#Base+sendError) ⇒ <code>Promise.&lt;CommandResponse&gt;</code>
        * [.error(msg, err, type, errMsg)](#Base+error) ⇒ <code>Promise.&lt;CommandResponse&gt;</code>
        * [.toString()](#Base+toString) ⇒ <code>String</code>
        * [.toJSON()](#Base+toJSON) ⇒ <code>Object</code>
    * _static_
        * [.Base](#Base.Base)
            * [new Base(axonClient)](#new_Base.Base_new)

<a name="new_Base_new"></a>

### new Base()
Base Class with default properties and utility methods used by all Commands / Modules / Events.

<a name="Base+axon"></a>

### base.axon : <code>AxonClient</code>
Returns the AxonClient instance

**Kind**: instance property of [<code>Base</code>](#Base)  
**Read only**: true  
<a name="Base+bot"></a>

### base.bot : <code>Client</code>
Returns the bot client instance

**Kind**: instance property of [<code>Base</code>](#Base)  
**Read only**: true  
<a name="Base+logger"></a>

### base.logger : <code>Logger</code>
Returns the Logger instance

**Kind**: instance property of [<code>Base</code>](#Base)  
**Read only**: true  
<a name="Base+Resolver"></a>

### base.Resolver : <code>Resolver</code>
Returns the Resolver class (Based on AxonClient.Resolver (default: use the current library Resolver))

**Kind**: instance property of [<code>Base</code>](#Base)  
**Read only**: true  
<a name="Base+axonUtils"></a>

### base.axonUtils : <code>AxonUtils</code>
Returns the AxonUtils instance

**Kind**: instance property of [<code>Base</code>](#Base)  
**Read only**: true  
<a name="Base+utils"></a>

### base.utils : <code>Utils</code>
Returns the Utils instance

**Kind**: instance property of [<code>Base</code>](#Base)  
**Read only**: true  
<a name="Base+l"></a>

### base.l : <code>MessageManager</code>
Returns the MessageManager instance

**Kind**: instance property of [<code>Base</code>](#Base)  
**Read only**: true  
<a name="Base+getModule"></a>

### base.getModule(module) ⇒ <code>Module</code> \| <code>NULL</code>
Get a module from AxonClient with the label

**Kind**: instance method of [<code>Base</code>](#Base)  

| Param | Type | Description |
| --- | --- | --- |
| module | <code>String</code> | Module label |

<a name="Base+getCommand"></a>

### base.getCommand(fullLabel) ⇒ <code>Command</code> \| <code>NULL</code>
Get a command/subcommand from AxonClient with the full label

**Kind**: instance method of [<code>Base</code>](#Base)  

| Param | Type | Description |
| --- | --- | --- |
| fullLabel | <code>String</code> | Full command (or subcommand) label |

<a name="Base+sendDM"></a>

### base.sendDM(user, content, [options]) ⇒ <code>Promise.&lt;?Message&gt;</code>
DM targeted user if the bot is able to retrieve DM channel.
Reject promise if not

**Kind**: instance method of [<code>Base</code>](#Base)  
**Returns**: <code>Promise.&lt;?Message&gt;</code> - Message Object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| user | <code>User</code> |  | User object to get the DM channel |
| content | <code>Object/String</code> |  | String or object (embed) |
| [options] | <code>Object</code> | <code>{}</code> | Options { disableEveryone: Boolean, delete: Boolean, delay: Number } |
| [options.disableEveryone] | <code>Boolean</code> | <code>true</code> | Whether to allow mentioning everyone or not |
| [options.delete] | <code>Number</code> | <code>false</code> | Whether to deletethe message or not |
| [options.delay] | <code>Boolean</code> | <code></code> | Delay after which the message will be deleted |

<a name="Base+sendMessage"></a>

### base.sendMessage(channel, content, [options]) ⇒ <code>Promise.&lt;?Message&gt;</code>
Send a message.
Check for bot permissions + message/embed length
Doesn't support file

**Kind**: instance method of [<code>Base</code>](#Base)  
**Returns**: <code>Promise.&lt;?Message&gt;</code> - Message Object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| channel | <code>Channel</code> |  | The channel Object |
| content | <code>Object/String</code> |  | Message content, String or Embed Object |
| [options] | <code>Object</code> | <code>{}</code> | Options { disableEveryone: Boolean, delete: Boolean, delay: Number } |
| [options.disableEveryone] | <code>Boolean</code> | <code>true</code> | Whether to allow mentioning everyone or not |
| [options.delete] | <code>Number</code> | <code>false</code> | Whether to deletethe message or not |
| [options.delay] | <code>Boolean</code> | <code></code> | Delay after which the message will be deleted |

<a name="Base+editMessage"></a>

### base.editMessage(message, content) ⇒ <code>Promise.&lt;?Message&gt;</code>
Edit a message
Check for bot permissions + message embed/length

**Kind**: instance method of [<code>Base</code>](#Base)  
**Returns**: <code>Promise.&lt;?Message&gt;</code> - Message Object  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>Message</code> | The message object to edit |
| content | <code>Object/String</code> | Object (embed) or String |

<a name="Base+sendSuccess"></a>

### base.sendSuccess(channel, content, [options]) ⇒ <code>Promise.&lt;CommandResponse&gt;</code>
Send a success message. If the content is a string, suffixe the success emote to the content.
Check for sendMessage perms.
Await for sendMessage to throw correctly potential errors.

**Kind**: instance method of [<code>Base</code>](#Base)  
**Returns**: <code>Promise.&lt;CommandResponse&gt;</code> - The successful Command Response  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| channel | <code>Channel</code> |  | The channel Object |
| content | <code>Object</code> \| <code>String</code> |  | Success message content |
| [options] | <code>Object</code> | <code>{}</code> | Additional options |
| [options.disableEveryone] | <code>Boolean</code> | <code>true</code> | Whether to allow mentioning everyone or not |
| [options.delete] | <code>Boolean</code> | <code>false</code> | Whether to deletethe message or not |
| [options.delay] | <code>Number</code> | <code></code> | Delay after which the message will be deleted |
| [options.triggerCooldown] | <code>Boolean</code> | <code>true</code> | Whether the command shoudl trigger cooldown or not |

<a name="Base+sendError"></a>

### base.sendError(content, [options]) ⇒ <code>Promise.&lt;CommandResponse&gt;</code>
Send an error message. If the content is a string, suffixe the error emote to the content.
Check for sendMessage perms.
Await for sendMessage to throw correctly potential errors.

**Kind**: instance method of [<code>Base</code>](#Base)  
**Returns**: <code>Promise.&lt;CommandResponse&gt;</code> - The non successful Command Response  
**@param**: <code>Channel</code> channel - The channel Object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| content | <code>Object</code> \| <code>String</code> |  | Success message content |
| [options] | <code>Object</code> | <code>{}</code> | Additional options |
| [options.disableEveryone] | <code>Boolean</code> | <code>true</code> | Whether to allow mentioning everyone or not |
| [options.delete] | <code>Boolean</code> | <code>false</code> | Whether to deletethe message or not |
| [options.delay] | <code>Number</code> | <code></code> | Delay after which the message will be deleted |
| [options.triggerCooldown] | <code>Boolean</code> | <code>false</code> | Whether the command shoudl trigger cooldown or not |
| [options.error] | <code>Object</code> \| <code>String</code> | <code></code> | Whether the command shoudl trigger cooldown or not |

<a name="Base+error"></a>

### base.error(msg, err, type, errMsg) ⇒ <code>Promise.&lt;CommandResponse&gt;</code>
Handles errors and sends an error message/log.
Calls sendError().

**Kind**: instance method of [<code>Base</code>](#Base)  
**Returns**: <code>Promise.&lt;CommandResponse&gt;</code> - The non successful Command Response  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>Message</code> | The message Object |
| err | <code>Error</code> | The error message |
| type | <code>String</code> | Type of error (api, db, internal) |
| errMsg | <code>String</code> | Optional error message |

<a name="Base+toString"></a>

### base.toString() ⇒ <code>String</code>
Custom toString method.

**Kind**: instance method of [<code>Base</code>](#Base)  
<a name="Base+toJSON"></a>

### base.toJSON() ⇒ <code>Object</code>
Custom toJSON method.
(Based of Eris')

**Kind**: instance method of [<code>Base</code>](#Base)  
**Returns**: <code>Object</code> - JSON-like Object  
<a name="Base.Base"></a>

### Base.Base
**Kind**: static class of [<code>Base</code>](#Base)  
<a name="new_Base.Base_new"></a>

#### new Base(axonClient)
Creates an instance of Base.


| Param | Type |
| --- | --- |
| axonClient | <code>AxonClient</code> | 

