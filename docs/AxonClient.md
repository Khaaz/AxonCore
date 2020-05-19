<a name="AxonClient"></a>

## AxonClient ⇐ <code>EventEmitter</code>
**Kind**: global class  
**Extends**: <code>EventEmitter</code>  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| _botClient | <code>BotClient</code> | Discord library Client |
| moduleRegistry | <code>ModuleRegistry</code> | Registry holding all modules |
| commandRegistry | <code>CommandRegistry</code> | Registry holding all commands |
| listenerRegistry | <code>ListenerRegistry</code> | Registry holding all listeners |
| eventManager | <code>EventManager</code> | The EventManager instance that handle all AxonCore listeners |
| guildConfigs | <code>GuildConfigCache</code> | The Manager that handles GuildConfigs (cache / DB etc) |
| [axonConfig] | <code>AxonConfig</code> | The AxonConfig object that handles globally blacklisted users and guilds |
| dispatcher | <code>CommandDispatcher</code> | Dispatch commands onMessageCreate. |
| executor | <code>Executor</code> | Executor class that handles executing commands and listeners |
| moduleLoader | <code>ModuleLoader</code> | Load, unload modules. |
| _messageManager | <code>MessageManager</code> | Message manager object accessible with `<AxonClient>.l` |
| library | <code>LibraryInterface</code> | LibraryInterface object depending the lib used |
| logger | <code>ALogger</code> | The Logger instance |
| axonUtils | <code>AxonUtils</code> | Util methods (AxonCore) |
| utils | <code>Utils</code> | Utils methods (general) |
| DBProvider | <code>ADBProvider</code> | The DBProvider instance |
| _configs | <code>Object</code> | configs (webhooks, template, custom) |
| _configs.webhooks | <code>Object.&lt;string, {id: String, token: String}&gt;</code> | Webhooks configs with all webhooks id and tokens |
| _configs.template | <code>Object</code> | Template config |
| _configs.custom | <code>AxonOptions</code> | Custom config object optionally passed via AxonOptions |
| staff | <code>Object</code> | Bot Staff (owners, admins, +...) |
| staff.owners | <code>Array.&lt;String&gt;</code> | Array of user IDs with BotOwner permissions |
| staff.admins | <code>Array.&lt;String&gt;</code> | Array of user IDs with BotAdmin permissions |
| settings | <code>Object</code> | Bot settings |
| settings.debugMode | <code>Boolean</code> | Enable to show commands latency and debug informations |
| settings.prefixes | <code>Array.&lt;String&gt;</code> | Default bot prefixes |
| settings.adminPrefix | <code>String</code> | Admins prefix : override perms/cd except Owner |
| settings.ownerPrefix | <code>String</code> | Owner prefix : override perms/cd |
| settings.lang | <code>String</code> | Default lang for the bot |
| settings.guildConfigCache | <code>Number</code> | Max amount of guildConfigs cached at the same time (LRUCache) |
| info | <code>Object</code> | General info about the current application |
| info.name | <code>String</code> | Bot name |
| info.description | <code>String</code> | Bot description |
| info.version | <code>String</code> | Bot version |
| info.owners | <code>Array.&lt;String&gt;</code> | Bot owners (array of names) |
| axoncore | <code>Object</code> | AxonCore info |
| axoncore.version | <code>String</code> | AxonCore version |
| axoncore.author | <code>String</code> | AxonCore author |
| axoncore.github | <code>String</code> | AxonCore github link |


* [AxonClient](#AxonClient) ⇐ <code>EventEmitter</code>
    * [new AxonClient()](#new_AxonClient_new)
    * _instance_
        * [.axoncore](#AxonClient+axoncore) : <code>Object</code>
        * [._botClient](#AxonClient+_botClient) : <code>BotClient</code>
        * [.axonConfig](#AxonClient+axonConfig) : <code>AxonConfig</code>
        * [.botClient](#AxonClient+botClient) : <code>BotClient</code>
        * [.handlers](#AxonClient+handlers) : <code>HandlerCollection</code>
        * [.Resolver](#AxonClient+Resolver) : <code>Resolver</code>
        * [.l](#AxonClient+l) : <code>MessageManager</code>
        * [.webhooks](#AxonClient+webhooks) : <code>Object</code>
        * [.template](#AxonClient+template) : <code>Object</code>
        * [.custom](#AxonClient+custom) : <code>Object.&lt;string, any&gt;</code>
        * [.getListeners(eventName)](#AxonClient+getListeners) ⇒ <code>Array.&lt;Listener&gt;</code>
        * [.getModule(module)](#AxonClient+getModule) ⇒ <code>Module</code> \| <code>null</code>
        * [.getCommand(fullLabel)](#AxonClient+getCommand) ⇒ <code>Command</code> \| <code>null</code>
        * [.start()](#AxonClient+start)
        * [.onInit()](#AxonClient+onInit) ⇒ <code>Boolean</code>
        * [.onStart()](#AxonClient+onStart) ⇒ <code>Promise.&lt;Boolean&gt;</code>
        * [.onReady()](#AxonClient+onReady) ⇒ <code>Promise.&lt;Boolean&gt;</code>
        * [.log(level, content, [ctx], [execWebhook])](#AxonClient+log)
        * [._onMessageCreate(msg)](#AxonClient+_onMessageCreate)
        * [._onReady()](#AxonClient+_onReady)
        * [.onDebug(flag, d)](#AxonClient+onDebug)
        * [.initErrorListeners()](#AxonClient+initErrorListeners)
        * [.initStatus()](#AxonClient+initStatus)
        * [.sendFullHelp(msg, guildConfig)](#AxonClient+sendFullHelp)
        * [.registerGuildPrefixes(gID, prefixArr)](#AxonClient+registerGuildPrefixes) ⇒ <code>Promise.&lt;GuildConfig&gt;</code>
        * [.toString()](#AxonClient+toString) ⇒ <code>String</code>
        * [.toJSON()](#AxonClient+toJSON) ⇒ <code>Object</code>
        * ["debug"](#AxonClient+event_debug)
        * ["commandExecution"](#AxonClient+event_commandExecution)
        * ["commandError"](#AxonClient+event_commandError)
        * ["listenerExecution"](#AxonClient+event_listenerExecution)
        * ["listenerError"](#AxonClient+event_listenerError)
    * _static_
        * [.AxonClient](#AxonClient.AxonClient)
            * [new AxonClient(botClient, [axonOptions], [modules])](#new_AxonClient.AxonClient_new)

<a name="new_AxonClient_new"></a>

### new AxonClient()
AxonCore - Client constructor

<a name="AxonClient+axoncore"></a>

### axonClient.axoncore : <code>Object</code>
**Kind**: instance property of [<code>AxonClient</code>](#AxonClient)  
<a name="AxonClient+_botClient"></a>

### axonClient.\_botClient : <code>BotClient</code>
**Kind**: instance property of [<code>AxonClient</code>](#AxonClient)  
<a name="AxonClient+axonConfig"></a>

### axonClient.axonConfig : <code>AxonConfig</code>
**Kind**: instance property of [<code>AxonClient</code>](#AxonClient)  
<a name="AxonClient+botClient"></a>

### axonClient.botClient : <code>BotClient</code>
Returns the bot client instance

**Kind**: instance property of [<code>AxonClient</code>](#AxonClient)  
**Read only**: true  
<a name="AxonClient+handlers"></a>

### axonClient.handlers : <code>HandlerCollection</code>
Returns all event handlers in eventManager

**Kind**: instance property of [<code>AxonClient</code>](#AxonClient)  
**Read only**: true  
<a name="AxonClient+Resolver"></a>

### axonClient.Resolver : <code>Resolver</code>
Returns all the resolver for the default current library used.
Can be easily overridden with a custom Resolver by overriding this getter.

**Kind**: instance property of [<code>AxonClient</code>](#AxonClient)  
**Read only**: true  
<a name="AxonClient+l"></a>

### axonClient.l : <code>MessageManager</code>
Return the MessageManager instance

**Kind**: instance property of [<code>AxonClient</code>](#AxonClient)  
**Read only**: true  
<a name="AxonClient+webhooks"></a>

### axonClient.webhooks : <code>Object</code>
Return the webhooks config

**Kind**: instance property of [<code>AxonClient</code>](#AxonClient)  
**Read only**: true  
<a name="AxonClient+template"></a>

### axonClient.template : <code>Object</code>
Returns the template config

**Kind**: instance property of [<code>AxonClient</code>](#AxonClient)  
**Read only**: true  
<a name="AxonClient+custom"></a>

### axonClient.custom : <code>Object.&lt;string, any&gt;</code>
Returns the custom config

**Kind**: instance property of [<code>AxonClient</code>](#AxonClient)  
**Read only**: true  
<a name="AxonClient+getListeners"></a>

### axonClient.getListeners(eventName) ⇒ <code>Array.&lt;Listener&gt;</code>
Returns all registered listeners for the discord event name

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

Calls custom onStart() method at the beginning.
Calls custom onReady() method when AxonClient is ready.

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  
<a name="AxonClient+onInit"></a>

### axonClient.onInit() ⇒ <code>Boolean</code>
Override this method.
Method executed after the object is finished to be constructed (in the constructor)

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  
<a name="AxonClient+onStart"></a>

### axonClient.onStart() ⇒ <code>Promise.&lt;Boolean&gt;</code>
Override this method.
Method executed at the beginning of the start method.

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  
<a name="AxonClient+onReady"></a>

### axonClient.onReady() ⇒ <code>Promise.&lt;Boolean&gt;</code>
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
| [ctx] | <code>Context</code> | <code></code> | Additional context to be passed to logger |
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
<a name="AxonClient+onDebug"></a>

### axonClient.onDebug(flag, d)
Function ran on debug event.
Logs the debug event.

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  

| Param | Type |
| --- | --- |
| flag | <code>DEBUG\_FLAGS</code> | 
| d | <code>String</code> | 

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

### axonClient.sendFullHelp(msg, guildConfig)
Send full help in DM.
Doesn't show commands that the user can't execute.
This method can be overridden in child.

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>Message</code> | The message object |
| guildConfig | <code>GuildConfig</code> |  |

<a name="AxonClient+registerGuildPrefixes"></a>

### axonClient.registerGuildPrefixes(gID, prefixArr) ⇒ <code>Promise.&lt;GuildConfig&gt;</code>
Register a guild prefix.
Shortcut to guildConfig.registerPrefix()

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  
**Returns**: <code>Promise.&lt;GuildConfig&gt;</code> - The guild Schema from the DB / Error if error  

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
<a name="AxonClient+event_debug"></a>

### "debug"
Fired when a debug message needs to be sent

**Kind**: event emitted by [<code>AxonClient</code>](#AxonClient)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| flags | <code>DEBUG\_FLAGS</code> | Debug flags used to have more information about the event |
| debugMessage | <code>String</code> | Debug message with information about the situation |

<a name="AxonClient+event_commandExecution"></a>

### "commandExecution"
Fired when a command is successfully ran

**Kind**: event emitted by [<code>AxonClient</code>](#AxonClient)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| status | <code>Boolean</code> | If the command was successfully executed or not |
| commandFullLabel | <code>String</code> | The command fullLabel |
| data | <code>Object</code> |  |
| data.msg | <code>Message</code> | The message that triggered the command |
| data.command | <code>Command</code> | The Command that was executed |
| data.guildConfig | <code>GuildConfig</code> | The GuildConfig |
| data.context | <code>CommandContext</code> | The execution context |

<a name="AxonClient+event_commandError"></a>

### "commandError"
Fired when a command fails

**Kind**: event emitted by [<code>AxonClient</code>](#AxonClient)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| commandFullLabel | <code>String</code> | The command fullLabel |
| data | <code>Object</code> |  |
| data.msg | <code>Message</code> | The message that triggered the command |
| data.command | <code>Command</code> | The Command that was executed |
| data.guildConfig | <code>GuildConfig</code> | The GuildConfig |
| data.error | <code>AxonCommandError</code> | The error |

<a name="AxonClient+event_listenerExecution"></a>

### "listenerExecution"
Fired when a listener is executed

**Kind**: event emitted by [<code>AxonClient</code>](#AxonClient)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| status | <code>Boolean</code> | Whether the listener was successfully executed or not |
| eventName | <code>String</code> | The discord event name |
| listenerName | <code>String</code> | The listener label |
| data | <code>Object</code> | Additional information |
| data.listener | <code>Listener</code> | The Listener that was executed |
| data.guildConfig | <code>GuildConfig</code> | The GuildConfig object |

<a name="AxonClient+event_listenerError"></a>

### "listenerError"
Fired when a listener errors

**Kind**: event emitted by [<code>AxonClient</code>](#AxonClient)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| eventName | <code>String</code> | The discord event name |
| listenerName | <code>String</code> | The Listener label |
| data | <code>Object</code> | Additional information |
| data.listener | <code>Listener</code> | The Listener that was executed |
| data.guildConfig | <code>GuildConfig</code> | The GuildConfig object |
| data.error | <code>Error</code> | The error |

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
| [modules] | <code>Object.&lt;string, Module&gt;</code> | <code>{}</code> | Object with all modules to add in the bot |

