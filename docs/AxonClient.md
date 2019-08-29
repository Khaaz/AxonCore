<a name="AxonClient"></a>

## AxonClient ⇐ <code>EventEmitter</code>
**Kind**: global class  
**Extends**: <code>EventEmitter</code>  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| client | <code>Object.&lt;Client&gt;</code> | Eris or Discordjs Client [GETER: _client] |
| modules | <code>Collection.&lt;Module&gt;</code> | All modules in the client [key: label, value: module] |
| commands | <code>Collection.&lt;Command&gt;</code> | All commands in the client [key: label, value: command] |
| commandAliases | <code>Map.&lt;String&gt;</code> | All aliases in the client [key: alias, value: commandLabel] |
| EventManager | <code>Object.&lt;EventManager&gt;</code> | The EventManager instance that handle all AxonCore events |
| guildConfigs | <code>Object.&lt;GuildConfigCache&gt;</code> | The Manager that handles GuildConfigs (cache / DB etc) |
| axonConfig | <code>Object.&lt;AxonConfig&gt;</code> | The AxonConfigobject that handles globally blacklisted users and guilds |
| dispatcher | <code>Object.&lt;CommandDispatcher&gt;</code> | Dispatch commands onMessageCreate. |
| moduleLoader | <code>Object.&lt;ModuleLoader&gt;</code> | Load, register, unregister modules. |
| messageManager | <code>Object.&lt;MessageManager&gt;</code> | Message manager object accessible with `<AxonClient>.l` |
| logger | <code>Object</code> | Default Logger / Chalk Logger / Signale Logge |
| axonUtils | <code>Object</code> | Util methods (Axon) |
| utils | <code>Object</code> | Utils methods (general) |
| DBProvider | <code>Object.&lt;DBProvider&gt;</code> | JSON(default) / Mongoose |
| configs | <code>Object</code> | configs (axon, template, _tokens) [GETTER: _configs] |
| [configs.bot] | <code>Object</code> | configs (bot, template, _tokens) [GETTER: _configs] |
| [configs._tokens] | <code>Object</code> | configs (axon, template, _tokens) [GETTER: _configs] |
| staff | <code>Object</code> | BotStaff (owners, admins, +...) |
| [staff.owners] | <code>Array.&lt;String&gt;</code> | Array of user IDs with BotOwner permissions |
| [staff.admins] | <code>Array.&lt;String&gt;</code> | Array of user IDs with BotAdmin permisions |
| settings | <code>Object</code> | Bot settings |
| [settings.debugMode] | <code>Boolean</code> | Enable to show commands latency and debug informations |
| [settings.prefixes] | <code>Array.&lt;String&gt;</code> | Default bot prefixes |
| [settings.adminPrefix] | <code>String</code> | Admins prefix : override perms/cd except Owner |
| [settings.ownerPrefix] | <code>String</code> | Owner prefix : override perms/cd |
| infos | <code>Object</code> | General infos { name, description, version, library, owners } |
| axoncore | <code>Object</code> | AxonCore infos { name, version, author, github }s] |


* [AxonClient](#AxonClient) ⇐ <code>EventEmitter</code>
    * [new AxonClient()](#new_AxonClient_new)
    * _instance_
        * [.botClient](#AxonClient+botClient) : <code>Object.&lt;BotClient&gt;</code>
        * [.events](#AxonClient+events) : <code>Collection.&lt;Object&gt;</code>
        * [.webhooks](#AxonClient+webhooks) : <code>Object</code>
        * [.template](#AxonClient+template) : <code>Object</code>
        * [.l](#AxonClient+l) : <code>Object.&lt;MessageManager&gt;</code>
        * [.getListeners(eventName)](#AxonClient+getListeners) ⇒ <code>Array</code>
        * [.getModule(module)](#AxonClient+getModule) ⇒ <code>Object.&lt;Module&gt;</code> \| <code>null</code>
        * [.getCommand(fullLabel)](#AxonClient+getCommand) ⇒ <code>Object.&lt;Command&gt;</code> \| <code>null</code>
        * [.start()](#AxonClient+start)
        * [.onInit()](#AxonClient+onInit) ⇒ <code>\*</code>
        * [.onStart()](#AxonClient+onStart) ⇒ <code>Promise</code>
        * [.onReady()](#AxonClient+onReady) ⇒ <code>Promise</code>
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

### axonClient.botClient : <code>Object.&lt;BotClient&gt;</code>
Returns the bot client instance

**Kind**: instance property of [<code>AxonClient</code>](#AxonClient)  
**Read only**: true  
<a name="AxonClient+events"></a>

### axonClient.events : <code>Collection.&lt;Object&gt;</code>
Returns all discord events in eventManager

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
<a name="AxonClient+l"></a>

### axonClient.l : <code>Object.&lt;MessageManager&gt;</code>
Return the MessageManager instance

**Kind**: instance property of [<code>AxonClient</code>](#AxonClient)  
**Read only**: true  
<a name="AxonClient+getListeners"></a>

### axonClient.getListeners(eventName) ⇒ <code>Array</code>
Returns all listeners for the discord event name

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  

| Param | Type |
| --- | --- |
| eventName | <code>String</code> | 

<a name="AxonClient+getModule"></a>

### axonClient.getModule(module) ⇒ <code>Object.&lt;Module&gt;</code> \| <code>null</code>
Get a module from AxonClient with the given label.

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  

| Param | Type | Description |
| --- | --- | --- |
| module | <code>String</code> | Module label |

<a name="AxonClient+getCommand"></a>

### axonClient.getCommand(fullLabel) ⇒ <code>Object.&lt;Command&gt;</code> \| <code>null</code>
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
<a name="AxonClient+_onMessageCreate"></a>

### axonClient.\_onMessageCreate(msg)
Function executed on the global messageCreate event and dispatch to the correct command and execution

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  

| Param | Type |
| --- | --- |
| msg | <code>Object.&lt;Message&gt;</code> | 

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
| msg | <code>Object.&lt;Message&gt;</code> | The message object |

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
| botClient | <code>Object.&lt;Client&gt;</code> |  | Eris or Discordjs Client instance |
| [axonOptions] | <code>Object.&lt;axonOptions&gt;</code> | <code>{}</code> | Axon options |
| [axonOptions.botConfig] | <code>Object</code> | <code></code> | General Axon config |
| [axonOptions.lang] | <code>Object</code> | <code></code> | Message templates / translations |
| [axonOptions.tokenConfig] | <code>Object</code> | <code></code> | Token config |
| [axonOptions.logo] | <code>function</code> | <code></code> | Custom function that will log a logo |
| [axonOptions.utils] | <code>Object.&lt;Utils&gt;</code> |  | Utils class, needs to be an instance of AxonCore.Utils |
| [axonOptions.logger] | <code>Object</code> |  | Custom logger |
| [axonOptions.DBProvider] | <code>Object.&lt;DBProvider&gt;</code> |  | DBProvider. Needs to be an instance of DBProvider |
| [data.DBLocation] | <code>String</code> | <code></code> | Path to use as default location for usage of the JSONProvider |
| [axonOptions.axonConfig] | <code>Object.&lt;AxonConfig&gt;</code> | <code></code> | Custom AxonConfig object to use instead of default AxonConfig |
| [axonOptions.guildConfig] | <code>Object.&lt;GuildConfig&gt;</code> | <code></code> | Custom GuildConfig object to use instead of default GuildConfig |
| [modules] | <code>Object</code> | <code>{}</code> | Object with all modules to add in the bot |

