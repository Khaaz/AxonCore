<a name="AxonClient"></a>

## AxonClient ⇐ <code>EventEmitter</code>
**Kind**: global class  
**Extends**: <code>EventEmitter</code>  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| _botClient | <code>BotClient</code> | Eris or Discordjs Client |
| modules | <code>Collection.&lt;Module&gt;</code> | All modules in the client [key: label, value: module] |
| commands | <code>Collection.&lt;Command&gt;</code> | All commands in the client [key: label, value: command] |
| commandAliases | <code>Map.&lt;String&gt;</code> | All aliases in the client [key: alias, value: commandLabel] |
| EventManager | <code>EventManager</code> | The EventManager instance that handle all AxonCore events |
| guildConfigs | <code>GuildConfigCache</code> | The Manager that handles GuildConfigs (cache / DB etc) |
| axonConfig | <code>AxonConfig</code> | The AxonConfigobject that handles globally blacklisted users and guilds |
| dispatcher | <code>CommandDispatcher</code> | Dispatch commands onMessageCreate. |
| moduleLoader | <code>ModuleLoader</code> | Load, register, unregister modules. |
| messageManager | <code>MessageManager</code> | Message manager object accessible with `<AxonClient>.l` |
| logger | <code>Object</code> | The Logger instance |
| axonUtils | <code>Object</code> | Util methods (AxonCore) |
| utils | <code>Object</code> | Utils methods (general) |
| DBProvider | <code>DBProvider</code> | The DBProvider instance |
| configs | <code>Object</code> | configs (webhooks, template, custom) |
| staff | <code>Object</code> | Bot Staff (owners, admins, +...) |
| staff.owners | <code>Array.&lt;String&gt;</code> | Array of user IDs with BotOwner permissions |
| staff.admins | <code>Array.&lt;String&gt;</code> | Array of user IDs with BotAdmin permisions |
| settings | <code>Object</code> | Bot settings |
| settings.debugMode | <code>Boolean</code> | Enable to show commands latency and debug informations |
| settings.prefixes | <code>Array.&lt;String&gt;</code> | Default bot prefixes |
| settings.adminPrefix- | <code>String</code> | Admins prefix : override perms/cd except Owner |
| settings.ownerPrefix | <code>String</code> | Owner prefix : override perms/cd |
| infos | <code>Object</code> | General infos { name, description, version, library, owners } |
| axoncore | <code>Object</code> | AxonCore infos { name, version, author, github }s] |


* [AxonClient](#AxonClient) ⇐ <code>EventEmitter</code>
    * [new AxonClient()](#new_AxonClient_new)
    * _instance_
        * [.botClient](#AxonClient+botClient) : <code>BotClient</code>
        * [.handlers](#AxonClient+handlers) : <code>Collection.&lt;Object&gt;</code>
        * [.webhooks](#AxonClient+webhooks) : <code>Object</code>
        * [.template](#AxonClient+template) : <code>Object</code>
        * [.custom](#AxonClient+custom) : <code>Object</code>
        * [.l](#AxonClient+l) : <code>MessageManager</code>
        * [.getListeners(eventName)](#AxonClient+getListeners) ⇒ <code>Array</code>
        * [.getModule(module)](#AxonClient+getModule) ⇒ <code>Module</code> \| <code>null</code>
        * [.getCommand(fullLabel)](#AxonClient+getCommand) ⇒ <code>Command</code> \| <code>null</code>
        * [.start()](#AxonClient+start)
        * [.onInit()](#AxonClient+onInit) ⇒ <code>\*</code>
        * [.onStart()](#AxonClient+onStart) ⇒ <code>Promise</code>
        * [.onReady()](#AxonClient+onReady) ⇒ <code>Promise</code>
        * [.log(level, content, [ctx], [execWebhook])](#AxonClient+log)
        * [._onMessageCreate(msg)](#AxonClient+_onMessageCreate)
        * [._onReady()](#AxonClient+_onReady)
        * [.initErrorListeners()](#AxonClient+initErrorListeners)
        * [.initStatus()](#AxonClient+initStatus)
        * [.sendFullHelp(msg)](#AxonClient+sendFullHelp) ⇒ <code>Promise.&lt;Message&gt;</code>
        * [.registerGuildPrefixes(gID, prefixArr)](#AxonClient+registerGuildPrefixes) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.toString()](#AxonClient+toString) ⇒ <code>String</code>
        * [.toJSON()](#AxonClient+toJSON) ⇒ <code>Object</code>
    * _static_
        * [.AxonClient](#AxonClient.AxonClient)
            * [new AxonClient(botClient, [axonOptions], [modules])](#new_AxonClient.AxonClient_new)

<a name="new_AxonClient_new"></a>

### new AxonClient()
AxonCore - Client constructor

<a name="AxonClient+botClient"></a>

### axonClient.botClient : <code>BotClient</code>
Returns the bot client instance

**Kind**: instance property of [<code>AxonClient</code>](#AxonClient)  
**Read only**: true  
<a name="AxonClient+handlers"></a>

### axonClient.handlers : <code>Collection.&lt;Object&gt;</code>
Returns all event handlers in eventManager

**Kind**: instance property of [<code>AxonClient</code>](#AxonClient)  
**Read only**: true  
<a name="AxonClient+webhooks"></a>

### axonClient.webhooks : <code>Object</code>
Return the webhooks object

**Kind**: instance property of [<code>AxonClient</code>](#AxonClient)  
**Read only**: true  
<a name="AxonClient+template"></a>

### axonClient.template : <code>Object</code>
**Kind**: instance property of [<code>AxonClient</code>](#AxonClient)  
**Read only**: true  
<a name="AxonClient+custom"></a>

### axonClient.custom : <code>Object</code>
**Kind**: instance property of [<code>AxonClient</code>](#AxonClient)  
**Read only**: true  
<a name="AxonClient+l"></a>

### axonClient.l : <code>MessageManager</code>
Return the MessageManager instance

**Kind**: instance property of [<code>AxonClient</code>](#AxonClient)  
**Read only**: true  
<a name="AxonClient+getListeners"></a>

### axonClient.getListeners(eventName) ⇒ <code>Array</code>
Returns all registrered listeners for the discord event name

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  

| Param | Type |
| --- | --- |
| eventName | <code>String</code> | 

<a name="AxonClient+getModule"></a>

### axonClient.getModule(module) ⇒ <code>Module</code> \| <code>null</code>
Get a module from AxonClient with the given label.

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  

| Param | Type | Description |
| --- | --- | --- |
| module | <code>String</code> | Module label |

<a name="AxonClient+getCommand"></a>

### axonClient.getCommand(fullLabel) ⇒ <code>Command</code> \| <code>null</code>
Get a command/subcommand from AxonClient with the given full label.

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  

| Param | Type | Description |
| --- | --- | --- |
| fullLabel | <code>String</code> | Full command (or subcommand) label |

<a name="AxonClient+start"></a>

### axonClient.start()
Start AxonClient.
Start bot client.
Bind error listeners and event listeners.

Calls custom onStart() method atthe beginning.
Calls custom onReady() methodwhen AxonClient is ready.

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  
<a name="AxonClient+onInit"></a>

### axonClient.onInit() ⇒ <code>\*</code>
Override this method.
Method executed after the object is finished to be constructed (in the constructor)

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  
<a name="AxonClient+onStart"></a>

### axonClient.onStart() ⇒ <code>Promise</code>
Override this method.
Method executed at the beginning of the start method.

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  
<a name="AxonClient+onReady"></a>

### axonClient.onReady() ⇒ <code>Promise</code>
Override this method.
Method executed at the end of the start method (when the AxonClient is ready).

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  
<a name="AxonClient+log"></a>

### axonClient.log(level, content, [ctx], [execWebhook])
Log both to console and to the correct webhook

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| level | <code>LOG\_LEVELS</code> |  | The LOG-LEVEL |
| content | <code>String</code> \| <code>Error</code> |  | The content or the error to log |
| [ctx] | <code>Object</code> | <code></code> | Additional context to be passed to logger |
| ctx.guild | <code>Object</code> \| <code>String</code> |  |  |
| ctx.cmd | <code>String</code> |  |  |
| ctx.user | <code>Object</code> \| <code>String</code> |  |  |
| [execWebhook] | <code>Boolean</code> | <code>true</code> | Whether to execute the webhook |

<a name="AxonClient+_onMessageCreate"></a>

### axonClient.\_onMessageCreate(msg)
Function executed on the global messageCreate event and dispatch to the correct command and execution

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  

| Param | Type |
| --- | --- |
| msg | <code>Message</code> | 

<a name="AxonClient+_onReady"></a>

### axonClient.\_onReady()
Function executed when the bot client is ready.
Bind events and initialise client status/game.

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  
<a name="AxonClient+initErrorListeners"></a>

### axonClient.initErrorListeners()
Initialize error listeners and webhooks.
Override this method to setup your own error listeners.

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  
<a name="AxonClient+initStatus"></a>

### axonClient.initStatus()
Set the bot status. Override to setup your own status.
Called after the client ready event.

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  
<a name="AxonClient+sendFullHelp"></a>

### axonClient.sendFullHelp(msg) ⇒ <code>Promise.&lt;Message&gt;</code>
Send full help in DM.
Doesn't show commands that the user can't execute.
This method can be overridden in child.

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  
**Returns**: <code>Promise.&lt;Message&gt;</code> - Message Object  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>Message</code> | The message object |

<a name="AxonClient+registerGuildPrefixes"></a>

### axonClient.registerGuildPrefixes(gID, prefixArr) ⇒ <code>Promise.&lt;Object&gt;</code>
Register a guild prefix.
Shortcut to guildConfig.registerPrefix()

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The guild Schema from the DB / Error if error  

| Param | Type | Description |
| --- | --- | --- |
| gID | <code>String</code> | The guild ID |
| prefixArr | <code>Array.&lt;String&gt;</code> | The array of prefixes |

<a name="AxonClient+toString"></a>

### axonClient.toString() ⇒ <code>String</code>
Custom toString method.

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  
<a name="AxonClient+toJSON"></a>

### axonClient.toJSON() ⇒ <code>Object</code>
Custom ToJSON method.
(Based of Eris')

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  
**Returns**: <code>Object</code> - JSON-like Object  
<a name="AxonClient.AxonClient"></a>

### AxonClient.AxonClient
**Kind**: static class of [<code>AxonClient</code>](#AxonClient)  
<a name="new_AxonClient.AxonClient_new"></a>

#### new AxonClient(botClient, [axonOptions], [modules])
Creates an AxonClient instance.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| botClient | <code>BotClient</code> |  | Eris or Discordjs Client instance |
| [axonOptions] | <code>AxonOptions</code> | <code>{}</code> | Axon options |
| [modules] | <code>Object</code> | <code>{}</code> | Object with all modules to add in the bot |

