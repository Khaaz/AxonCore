<a id="base"></a>

## Base
**Kind**: global class  
**Author**: KhaaZ  

[Base](#Base)  
- _static_  
    - [Base](#Base)
        - [new Base(axonClient)](#Base_new)
- _instance_
    - [getModule(module)](#getModule) ⇒ <code>Object.&lt;Module&gt;</code> \| <code>NULL</code>
    - [getCommand(fullLabel)](#getCommand) ⇒ <code>Object.&lt;Command&gt;</code> \| <code>NULL</code>
    - [sendDM(user, content, [options])](#sendDM) ⇒ <code>Promise.&lt;?Message&gt;</code>
    - [sendMessage(channel, content, [options])](#sendMessage) ⇒ <code>Promise.&lt;?Message&gt;</code>
    - [editMessage(message, content)](#editMessage) ⇒ <code>Promise.&lt;?Message&gt;</code>
    - [sendError(channel, content, [options])](#sendError) ⇒ <code>Promise.&lt;?Message&gt;</code>
    - [sendSuccess(channel, content, [options])](#sendSuccess) ⇒ <code>Promise.&lt;?Message&gt;</code>
    - [error(msg, err, type, errMsg)](#error) ⇒ <code>Promise.&lt;?Message&gt;</code>
    - [toString()](#toString) ⇒ <code>String</code>
    - [toJSON()](#toJSON) ⇒ <code>Object</code>
    - [inspect()](#inspect) ⇒ <code>Object</code>]
    
<a id="base"></a>

### Base.Base
**Kind**: static class of [<code>Base</code>](#Base)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| axon | <code>Object.&lt;AxonClient&gt;</code> | Axon Client [GETTER: _axon] |
| bot | <code>Object.&lt;Eris.Client&gt;</code> | Eris bot Client [GETTER: _axon.client] |
| Logger | <code>Object</code> | Logger Object/Methods [GETTER: axon.Logger] |
| Resolver | <code>Object</code> | Resolver Object/Methods [GETTER: axon.Resolver] |
| AxonUtils | <code>Object</code> | AxonUtils Object/Methods [GETTER: axon.AxonUtils] |
| Utils | <code>Object</code> | Utils Object/Methods [GETTER: axon.Utils] |

<a id="base_new"></a>

#### new Base(axonClient)
Creates an instance of Base.  

| Param | Type |
| --- | --- |
| axonClient | <code>Object.&lt;AxonClient&gt;</code> | 

<a id="getmodule"></a>

### getModule(module) ⇒ <code>Object.&lt;Module&gt;</code> \| <code>NULL</code>
Get a module from AxonClient with the label.  

**Kind**: instance method of [<code>Base</code>](#Base)  

| Param | Type | Description |
| --- | --- | --- |
| module | <code>String</code> | Module label |

<a id="getcommand"></a>

### getCommand(fullLabel) ⇒ <code>Object.&lt;Command&gt;</code> \| <code>NULL</code>
Get a command/subcommand from AxonClient with the full label.  

**Kind**: instance method of [<code>Base</code>](#Base)  

| Param | Type | Description |
| --- | --- | --- |
| fullLabel | <code>String</code> | Full command (or subcommand) label |

<a id="senddm"></a>

### sendDM(user, content, [options]) ⇒ <code>Promise.&lt;?Message&gt;</code>
DM targeted user if the bot is able to retrieve DM channel.  
Reject promise if not.  

**Kind**: instance method of [<code>Base</code>](#Base)  
**Returns**: <code>Promise.&lt;?Message&gt;</code> - Message Object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| user | <code>Object.&lt;User&gt;</code> |  | User object to get the DM channel |
| content | <code>Object/String</code> |  | String or object (embed) |
| [options] | <code>Object</code> | <code>{}</code> | Options { disableEveryone: Boolean, delete: Boolean, delay: Number } |
| [options.disableEveryone] | <code>Object</code> | <code>true</code> | Whether to allow mentioning everyone or not |
| [options.delete] | <code>Object</code> | <code>false</code> | Whether to deletethe message or not |
| [options.delay] | <code>Object</code> | <code></code> | Delay after which the message will be deleted |

<a id="sendmessage"></a>

### sendMessage(channel, content, [options]) ⇒ <code>Promise.&lt;?Message&gt;</code>
Send a message.  
Check for bot permissions + message/embed length.  
Doesn't support file.  

**Kind**: instance method of [<code>Base</code>](#Base)  
**Returns**: <code>Promise.&lt;?Message&gt;</code> - Message Object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| channel | <code>Object.&lt;Channel&gt;</code> |  | The channel Object |
| content | <code>Object/String</code> |  | Message content, String or Embed Object |
| [options] | <code>Object</code> | <code>{}</code> | Options { disableEveryone: Boolean, delete: Boolean, delay: Number } |
| [options.disableEveryone] | <code>Object</code> | <code>true</code> | Whether to allow mentioning everyone or not |
| [options.delete] | <code>Object</code> | <code>false</code> | Whether to deletethe message or not |
| [options.delay] | <code>Object</code> | <code></code> | Delay after which the message will be deleted |

<a id="editmessage"></a>

### editMessage(message, content) ⇒ <code>Promise.&lt;?Message&gt;</code>
Edit a message.  
Check for bot permissions and message embed/length.  

**Kind**: instance method of [<code>Base</code>](#Base)  
**Returns**: <code>Promise.&lt;?Message&gt;</code> - Message Object  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>Object.&lt;Message&gt;</code> | The message object to edit |
| content | <code>Object/String</code> | Object (embed) or String |

<a id="senderror"></a>

### sendError(channel, content, [options]) ⇒ <code>Promise.&lt;?Message&gt;</code>
Send an error message with the error emote at the beginning.  
Check for sendMessage perms.  

**Kind**: instance method of [<code>Base</code>](#Base)  
**Returns**: <code>Promise.&lt;?Message&gt;</code> - Message Object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| channel | <code>Object.&lt;Channel&gt;</code> |  | The channel Object |
| content | <code>String</code> |  | Error message content (String only) |
| [options] | <code>Object</code> | <code>{}</code> | Options { disableEveryone: Boolean, delete: Boolean, delay: Number } |
| [options.disableEveryone] | <code>Object</code> | <code>true</code> | Whether to allow mentioning everyone or not |
| [options.delete] | <code>Object</code> | <code>false</code> | Whether to deletethe message or not |
| [options.delay] | <code>Object</code> | <code></code> | Delay after which the message will be deleted |

<a id="sendsuccess"></a>

### sendSuccess(channel, content, [options]) ⇒ <code>Promise.&lt;?Message&gt;</code>
Send a success message with the success emote at the beginning.  
Check for sendMessage perms.  

**Kind**: instance method of [<code>Base</code>](#Base)  
**Returns**: <code>Promise.&lt;?Message&gt;</code> - Message Object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| channel | <code>Object.&lt;Channel&gt;</code> |  | The channel Object |
| content | <code>String</code> |  | Error message content (String only) |
| [options] | <code>Object</code> | <code>{}</code> | Options { disableEveryone: Boolean, delete: Boolean, delay: Number } |
| [options.disableEveryone] | <code>Object</code> | <code>true</code> | Whether to allow mentioning everyone or not |
| [options.delete] | <code>Object</code> | <code>false</code> | Whether to deletethe message or not |
| [options.delay] | <code>Object</code> | <code></code> | Delay after which the message will be deleted |

<a id="error"></a>

### error(msg, err, type, errMsg) ⇒ <code>Promise.&lt;?Message&gt;</code>
Handle errors (send error message/log).  
Call sendError.  

**Kind**: instance method of [<code>Base</code>](#Base)  
**Returns**: <code>Promise.&lt;?Message&gt;</code> - Message Object  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>Object.&lt;Message&gt;</code> | The message Object |
| err | <code>Object.&lt;Error&gt;</code> | The error message |
| type | <code>String</code> | Type of error (api, db, internal) |
| errMsg | <code>String</code> | Optional error message |

<a id="tostring"></a>

### toString() ⇒ <code>String</code>
ToString method.  

**Kind**: instance method of [<code>Base</code>](#Base)  

<a id="tojson"></a>

### toJSON() ⇒ <code>Object</code>
ToJSON method.  

**Kind**: instance method of [<code>Base</code>](#Base)  
**Returns**: <code>Object</code> - JSON-like Object  

<a id="inspect"></a>

### inspect() ⇒ <code>Object</code>
Custom inspect method.  
Doesn't list prefixed property and undefined property.

**Kind**: Instance method of [<code>AxonClient</code>](#AxonClient)  
**Returns**: <code>Object</code> - JSON-like Object 
