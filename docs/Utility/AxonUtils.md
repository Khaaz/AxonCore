<a name="AxonUtils"></a>

## AxonUtils
**Kind**: global class  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| _axon | <code>AxonClient</code> | Axon Client |


* [AxonUtils](#AxonUtils)
    * [new AxonUtils()](#new_AxonUtils_new)
    * _instance_
        * [.axon](#AxonUtils+axon) : <code>AxonClient</code>
        * [.bot](#AxonUtils+bot) : <code>BotClient</code>
        * [.template](#AxonUtils+template) : <code>Object</code>
        * [.logger](#AxonUtils+logger) : <code>Logger</code>
        * [.utils](#AxonUtils+utils) : <code>Utils</code>
        * [.library](#AxonUtils+library) : <code>LibraryInterface</code>
        * [.triggerWebhook(type, embed, opt)](#AxonUtils+triggerWebhook)
        * [.isBotOwner(uID)](#AxonUtils+isBotOwner) ⇒ <code>Boolean</code>
        * [.isBotAdmin(uID)](#AxonUtils+isBotAdmin) ⇒ <code>Boolean</code>
        * [.isBotStaff(uID)](#AxonUtils+isBotStaff) ⇒ <code>Boolean</code>
        * [.isServerMod(member, guildConfig)](#AxonUtils+isServerMod) ⇒ <code>Boolean</code>
        * [.isServerManager(member)](#AxonUtils+isServerManager) ⇒ <code>Boolean</code>
        * [.isServerAdmin(member)](#AxonUtils+isServerAdmin) ⇒ <code>Boolean</code>
        * [.isServerOwner(member)](#AxonUtils+isServerOwner) ⇒ <code>Boolean</code>
        * [.sendDM(user, content, [options])](#AxonUtils+sendDM) ⇒ <code>Promise.&lt;?Message&gt;</code>
        * [.sendMessage(channel, content, [options])](#AxonUtils+sendMessage) ⇒ <code>Promise.&lt;?Message&gt;</code>
        * [.editMessage(message, content)](#AxonUtils+editMessage) ⇒ <code>Promise.&lt;?Message&gt;</code>
    * _static_
        * [.AxonUtils](#AxonUtils.AxonUtils)
            * [new AxonUtils(axon)](#new_AxonUtils.AxonUtils_new)

<a name="new_AxonUtils_new"></a>

### new AxonUtils()
AxonCore Utility Class.

AxonCore specific methods + internal uses

<a name="AxonUtils+axon"></a>

### axonUtils.axon : <code>AxonClient</code>
Returns the AxonClient instance

**Kind**: instance property of [<code>AxonUtils</code>](#AxonUtils)  
**Read only**: true  
<a name="AxonUtils+bot"></a>

### axonUtils.bot : <code>BotClient</code>
Returns the BotClient instance

**Kind**: instance property of [<code>AxonUtils</code>](#AxonUtils)  
**Read only**: true  
<a name="AxonUtils+template"></a>

### axonUtils.template : <code>Object</code>
Returns the template object

**Kind**: instance property of [<code>AxonUtils</code>](#AxonUtils)  
**Read only**: true  
<a name="AxonUtils+logger"></a>

### axonUtils.logger : <code>Logger</code>
Returns the Logger instance

**Kind**: instance property of [<code>AxonUtils</code>](#AxonUtils)  
**Read only**: true  
<a name="AxonUtils+utils"></a>

### axonUtils.utils : <code>Utils</code>
Returns the Utils instance

**Kind**: instance property of [<code>AxonUtils</code>](#AxonUtils)  
**Read only**: true  
<a name="AxonUtils+library"></a>

### axonUtils.library : <code>LibraryInterface</code>
Returns the LibraryInterface instance

**Kind**: instance property of [<code>AxonUtils</code>](#AxonUtils)  
**Read only**: true  
<a name="AxonUtils+triggerWebhook"></a>

### axonUtils.triggerWebhook(type, embed, opt)
Triger an Axon Webhook.
Works directly with axon._configs._tokens. [GETTER: axon.webhooks]

**Kind**: instance method of [<code>AxonUtils</code>](#AxonUtils)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | Type of the webhook [status, loader, error, misc] |
| embed | <code>Object</code> | Embed object |
| opt | <code>String</code> | Optional string to use as bot username |

<a name="AxonUtils+isBotOwner"></a>

### axonUtils.isBotOwner(uID) ⇒ <code>Boolean</code>
Check if the user is a bot owner.

**Kind**: instance method of [<code>AxonUtils</code>](#AxonUtils)  

| Param | Type | Description |
| --- | --- | --- |
| uID | <code>String</code> | the user ID |

<a name="AxonUtils+isBotAdmin"></a>

### axonUtils.isBotAdmin(uID) ⇒ <code>Boolean</code>
Check if the user is a bot admin.

**Kind**: instance method of [<code>AxonUtils</code>](#AxonUtils)  

| Param | Type | Description |
| --- | --- | --- |
| uID | <code>String</code> | the user ID |

<a name="AxonUtils+isBotStaff"></a>

### axonUtils.isBotStaff(uID) ⇒ <code>Boolean</code>
Check if the user is part of the bot staff.

**Kind**: instance method of [<code>AxonUtils</code>](#AxonUtils)  

| Param | Type | Description |
| --- | --- | --- |
| uID | <code>String</code> | the user ID |

<a name="AxonUtils+isServerMod"></a>

### axonUtils.isServerMod(member, guildConfig) ⇒ <code>Boolean</code>
Check if the user is a moderator or higher. Admins are also moderators.
Managers, Admins and Owner are automatically Mod.

**Kind**: instance method of [<code>AxonUtils</code>](#AxonUtils)  
**Returns**: <code>Boolean</code> - True if user is a mod / False if not  

| Param | Type | Description |
| --- | --- | --- |
| member | <code>Member</code> | The member object |
| guildConfig | <code>Object</code> | The guild Config from the DB |

<a name="AxonUtils+isServerManager"></a>

### axonUtils.isServerManager(member) ⇒ <code>Boolean</code>
Check is the user is a server manager (manage server permission).
Admin and Owner are automatically Manager.

**Kind**: instance method of [<code>AxonUtils</code>](#AxonUtils)  
**Returns**: <code>Boolean</code> - True if admin / False if not  

| Param | Type | Description |
| --- | --- | --- |
| member | <code>Member</code> | The member object |

<a name="AxonUtils+isServerAdmin"></a>

### axonUtils.isServerAdmin(member) ⇒ <code>Boolean</code>
Check is the user is an admin (administrator permission).
Owner is automatically Admin.

**Kind**: instance method of [<code>AxonUtils</code>](#AxonUtils)  
**Returns**: <code>Boolean</code> - True if admin / False if not  

| Param | Type | Description |
| --- | --- | --- |
| member | <code>Member</code> | The member object |

<a name="AxonUtils+isServerOwner"></a>

### axonUtils.isServerOwner(member) ⇒ <code>Boolean</code>
Check is the user is the server owner.

**Kind**: instance method of [<code>AxonUtils</code>](#AxonUtils)  
**Returns**: <code>Boolean</code> - True if admin / False if not  

| Param | Type | Description |
| --- | --- | --- |
| member | <code>Member</code> | The member object |

<a name="AxonUtils+sendDM"></a>

### axonUtils.sendDM(user, content, [options]) ⇒ <code>Promise.&lt;?Message&gt;</code>
Message the targeted user if the bot is able to retrieve their DM channel.
Reject promise if not

**Kind**: instance method of [<code>AxonUtils</code>](#AxonUtils)  
**Returns**: <code>Promise.&lt;?Message&gt;</code> - Message Object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| user | <code>User</code> |  | User object to get the DM channel |
| content | <code>Object/String</code> |  | String or object (embed) |
| [options] | <code>Object</code> | <code>{}</code> | Options { disableEveryone: Boolean, delete: Boolean, delay: Number } |
| [options.disableEveryone] | <code>Object</code> | <code>true</code> | Whether to allow mentioning everyone or not |
| [options.delete] | <code>Object</code> | <code>false</code> | Whether to deletethe message or not |
| [options.delay] | <code>Object</code> | <code></code> | Delay after which the message will be deleted |

<a name="AxonUtils+sendMessage"></a>

### axonUtils.sendMessage(channel, content, [options]) ⇒ <code>Promise.&lt;?Message&gt;</code>
Send a message.
Checks for bot permissions + message/embed length.
Doesn't support file uploads.

**Kind**: instance method of [<code>AxonUtils</code>](#AxonUtils)  
**Returns**: <code>Promise.&lt;?Message&gt;</code> - Message Object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| channel | <code>Channel</code> |  | The channel Object |
| content | <code>Object</code> \| <code>String</code> |  | Message content: String or Embed Object |
| [options] | <code>Object</code> | <code>{}</code> | Options { disableEveryone: Boolean, delete: Boolean, delay: Number } |
| [options.disableEveryone] | <code>Boolean</code> | <code>true</code> | Whether to allow mentioning everyone or not |
| [options.delete] | <code>Boolean</code> | <code>false</code> | Whether to deletethe message or not |
| [options.delay] | <code>Number</code> | <code></code> | Delay after which the message will be deleted |

<a name="AxonUtils+editMessage"></a>

### axonUtils.editMessage(message, content) ⇒ <code>Promise.&lt;?Message&gt;</code>
Edit a message.
Checks for bot permissions + message embed/length.

**Kind**: instance method of [<code>AxonUtils</code>](#AxonUtils)  
**Returns**: <code>Promise.&lt;?Message&gt;</code> - Message Object  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>Message</code> | The message object to edit |
| content | <code>Object/String</code> | Object (embed) or String |

<a name="AxonUtils.AxonUtils"></a>

### AxonUtils.AxonUtils
**Kind**: static class of [<code>AxonUtils</code>](#AxonUtils)  
<a name="new_AxonUtils.AxonUtils_new"></a>

#### new AxonUtils(axon)
Creates an AxonUtils instance.


| Param | Type |
| --- | --- |
| axon | <code>AxonClient</code> | 

