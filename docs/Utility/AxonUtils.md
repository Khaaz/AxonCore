<a id="axonutils"></a>

## AxonUtils
Specific utility Class for AxonCore.  
All methods useful for internal uses or AxonClient related actions.

**Kind**: global class  
**Author**: KhaaZ  

[AxonUtils](#AxonUtils)
- _static_
  - [AxonUtils](#AxonUtils)
      - [new AxonUtils(axon)](#AxonUtils_new)
- _instance_
  - [triggerWebhook(type, embed, opt)](#triggerWebhook)
  - [isBotOwner(uID)](#isBotOwner) ⇒ <code>Boolean</code>
  - [isBotAdmin(uID)](#isBotAdmin) ⇒ <code>Boolean</code>
  - [isBotStaff(uID)](#isBotStaff) ⇒ <code>Boolean</code>
  - [isAdmin(member)](#isAdmin) ⇒ <code>Boolean</code>
  - [isMod(member, guildConf)](#isMod) ⇒ <code>Boolean</code>
  - [sendMessage(channel, content, [options])](#sendMessage) ⇒ <code>Promise.&lt;?Message&gt;</code>
  - [editMessage(message, content)](#editMessage) ⇒ <code>Promise.&lt;?Message&gt;</code>
  - [sendDM(user, content, [options])](#sendDM) ⇒ <code>Promise.&lt;?Message&gt;</code>
  - [sendError(channel, content, [options])](#sendError) ⇒ <code>Promise.&lt;?Message&gt;</code>
  - [sendSuccess(channel, content, [options])](#sendSuccess) ⇒ <code>Promise.&lt;?Message&gt;</code>
  - [error(msg, err, type, errMsg)](#error) ⇒ <code>Promise.&lt;?Message&gt;</code>
    

<a id="axonutils"></a>

### AxonUtils
**Kind**: static class of [<code>AxonUtils</code>](#AxonUtils)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| axon | <code>Object.&lt;AxonClient&gt;</code> | Axon Client [GETTER: _axon] |
| bot | <code>Object.&lt;Eris.Client&gt;</code> | Eris bot Client [GETTER: _axon.client] |
| Logger | <code>Object</code> | Logger Object/Methods [GETTER: axon.Logger] |
| AxonUtils | <code>Object</code> | AxonUtils Object/Methods [GETTER: axon.AxonUtils] |
| Utils | <code>Object</code> | Utils Object/Methods [GETTER: axon.Utils] |

<a id="axonutils_new"></a>

#### new AxonUtils(axon)
Creates an AxonUtils instance.


| Param | Type |
| --- | --- |
| axon | <code>Object.&lt;AxonClient&gt;</code> | 

<a id="triggerwebhook"></a>

### triggerWebhook(type, embed, opt)
Triger an Axon Webhook.  
Works directly with axon._configs._tokens. [GETTER: axon.webhooks]

**Kind**: instance method of [<code>AxonUtils</code>](#AxonUtils)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | Type of the webhook [status, loader, error, misc] |
| embed | <code>Object</code> | Embed object |
| opt | <code>String</code> | Optional string to use as bot username |

<a id="isbotowner"></a>

### isBotOwner(uID) ⇒ <code>Boolean</code>
Check if the user is a bot owner.

**Kind**: instance method of [<code>AxonUtils</code>](#AxonUtils)  

| Param | Type | Description |
| --- | --- | --- |
| uID | <code>String</code> | the user ID |

<a id="isbotadmin"></a>

### isBotAdmin(uID) ⇒ <code>Boolean</code>
Check if the user is a bot admin.

**Kind**: instance method of [<code>AxonUtils</code>](#AxonUtils)  

| Param | Type | Description |
| --- | --- | --- |
| uID | <code>String</code> | the user ID |

<a id="isBotStaff"></a>

### isBotStaff(uID) ⇒ <code>Boolean</code>
Check if the user is part of the bot staff.

**Kind**: instance method of [<code>AxonUtils</code>](#AxonUtils)  

| Param | Type | Description |
| --- | --- | --- |
| uID | <code>String</code> | the user ID |

<a id="isAdmin"></a>

### isAdmin(member) ⇒ <code>Boolean</code>
Check is the user is an admin.

**Kind**: instance method of [<code>AxonUtils</code>](#AxonUtils)  
**Returns**: <code>Boolean</code> - True if admin / False if not  

| Param | Type | Description |
| --- | --- | --- |
| member | <code>Object.&lt;Member&gt;</code> | The member object |

<a id="ismod"></a>

### isMod(member, guildConf) ⇒ <code>Boolean</code>
Check if the user is a moderator or higher. Admins are also moderators.

**Kind**: instance method of [<code>AxonUtils</code>](#AxonUtils)  
**Returns**: <code>Boolean</code> - True if user is a mod / False if not  

| Param | Type | Description |
| --- | --- | --- |
| member | <code>Object.&lt;Member&gt;</code> | The member object |
| guildConf | <code>Object</code> | The guild Config from the DB |

<a id="sendmessage"></a>

### sendMessage(channel, content, [options]) ⇒ <code>Promise.&lt;?Message&gt;</code>
Send a message in the given channel. Checks for bot permissions, message/embed length.  
Doesn't support file uploads.

**Kind**: instance method of [<code>AxonUtils</code>](#AxonUtils)  
**Returns**: <code>Promise.&lt;?Message&gt;</code> - Message Object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| channel | <code>Object.&lt;Channel&gt;</code> |  | The channel Object |
| content | <code>Object</code> \| <code>String</code> |  | Message content: String or Embed Object |
| [options] | <code>Object</code> | <code>{}</code> | Options { disableEveryone: Boolean, delete: Boolean, delay: Number } |
| [options.disableEveryone] | <code>Object</code> | <code>true</code> | Whether to allow mentioning everyone or not |
| [options.delete] | <code>Object</code> | <code>false</code> | Whether to deletethe message or not |
| [options.delay] | <code>Object</code> | <code></code> | Delay after which the message will be deleted |

<a id="editmessage"></a>

### editMessage(message, content) ⇒ <code>Promise.&lt;?Message&gt;</code>
Edit a message. Checks for bot permissions and message embed/length.

**Kind**: instance method of [<code>AxonUtils</code>](#AxonUtils)  
**Returns**: <code>Promise.&lt;?Message&gt;</code> - Message Object  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>Object.&lt;Message&gt;</code> | The message object to edit |
| content | <code>Object/String</code> | Object (embed) or String |

<a id="senddm"></a>

### sendDM(user, content, [options]) ⇒ <code>Promise.&lt;?Message&gt;</code>
Message the targeted user if the bot is able to retrieve their DM channel.  
Error if not.

**Kind**: instance method of [<code>AxonUtils</code>](#AxonUtils)  
**Returns**: <code>Promise.&lt;?Message&gt;</code> - Message Object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| user | <code>Object.&lt;User&gt;</code> |  | User object to get the DM channel |
| content | <code>Object/String</code> |  | String or object (embed) |
| [options] | <code>Object</code> | <code>{}</code> | Options { disableEveryone: Boolean, delete: Boolean, delay: Number } |
| [options.disableEveryone] | <code>Object</code> | <code>true</code> | Whether to allow mentioning everyone or not |
| [options.delete] | <code>Object</code> | <code>false</code> | Whether to deletethe message or not |
| [options.delay] | <code>Object</code> | <code></code> | Delay after which the message will be deleted |

<a id="senderror"></a>

### sendError(channel, content, [options]) ⇒ <code>Promise.&lt;?Message&gt;</code>
Send an error message. Adds an error emote to the content.  
Checks for sendMessage permissions.

**Kind**: instance method of [<code>AxonUtils</code>](#AxonUtils)  
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
Send a success message. Adds a success emote to the content.  
Checks for sendMessage permissions.

**Kind**: instance method of [<code>AxonUtils</code>](#AxonUtils)  
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
Handles errors and sends an error message/log.  
Calls sendError().

**Kind**: instance method of [<code>AxonUtils</code>](#AxonUtils)  
**Returns**: <code>Promise.&lt;?Message&gt;</code> - Message Object  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>Object.&lt;Message&gt;</code> | The message Object |
| err | <code>Object.&lt;Error&gt;</code> | The error message |
| type | <code>String</code> | Type of error (api, db, internal) |
| errMsg | <code>String</code> | Optional error message |
