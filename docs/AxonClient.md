<a id="axonclient"></a>

## AxonClient ⇐ <code>EventEmitter</code>
**Kind**: Global class  
**Extends**: <code>EventEmitter</code>  
**Author**: KhaaZ  

[AxonClient](#AxonClient) ⇐ <code>EventEmitter</code>
- _static_
  - [AxonClient](#AxonClient)
    - [new AxonClient(ErisClient, [axonOptions], [modules])](#AxonClient_new)
- _instance_
  - [initStaff()](#initStaff)
  - [initErrorListeners()](#initErrorListeners)
  - [initStatus()](#initStatus)
  - [init()](#init) ⇒ <code>Promise</code>
  - [start()](#start)
  - [registerModule(module)](#registerModule)
  - [unregisterModule(label)](#unregisterModule)
  - [sendFullHelp(msg)](#sendFullHelp) ⇒ <code>Promise.&lt;Message&gt;</code>
  - [fetchAxonConf()](#fetchAxonConf) ⇒ <code>Promise.&lt;Object&gt;</code>
  - [fetchGuildConf(gID)](#fetchGuildConf) ⇒ <code>Promise.&lt;Object&gt;</code>
  - [resolvePrefix(msg)](#resolvePrefix) ⇒ <code>String</code>
  - [resolveCommand(label, args, [guildConf])](#resolveCommand) ⇒ <code>Object</code>
  - [getModule(label)](#getmodulelabel) ⇒ <code>Object</code>
  - [getCommand(label)](#getcommandlabel) ⇒ <code>Object</code>
  - [getListeners(eventName)](#getListeners) ⇒ <code>Array</code>
  - [getGuildConf(gID)](#getGuildConf) ⇒ <code>Promise.&lt;Object&gt;</code>
  - [updateGuildConf(gID, guildSchema)](#updateGuildConf) ⇒ <code>Promise.&lt;Object&gt;</code>
  - [registerGuildPrefix(gID, prefixArr)](#registerGuildPrefix) ⇒ <code>Promise.&lt;Object&gt;</code>
  - [toString()](#toString) ⇒ <code>String</code>
  - [toJSON()](#toJSON) ⇒ <code>Object</code>
  - [inspect()](#inspect) ⇒ <code>Object</code>]

<a id="axonclient"></a>

### AxonClient
**Kind**: static class of [<code>AxonClient</code>](#AxonClient)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| client | <code>Object.&lt;Eris.Client&gt;</code> | Eris Client [GETER: _client] |
| modules | <code>Collection.&lt;Module&gt;</code> | All modules in the client [key: label, value: module] |
| commands | <code>Collection.&lt;Command&gt;</code> | All commands in the client [key: label, value: command] |
| commandAliases | <code>Map.&lt;String&gt;</code> | All aliases in the client [key: alias, value: commandLabel] |
| events | <code>Collection.&lt;Event&gt;</code> | All Eris events listened by the client [key: label, value: event] |
| schemas | <code>Collection.&lt;Object&gt;</code> | All schemas in client (global models) [key: schemaLabel, value: schema] |
| guildConfigs | <code>Collection.&lt;Object&gt;</code> | Guild configs [key: guildID, value: { guildConfig }] |
| eventManager | <code>Object.&lt;EventManager&gt;</code> | The EventManager instance that handle all AxonCore events |
| Logger | <code>Object</code> | Default Logger / Chalk Logger / Signale Logger |
| DBprovider | <code>Object</code> | JSON(default) / Mongoose |
| AxonUtil | <code>Object</code> | Util methods (Axon) |
| Utils | <code>Object</code> | Utils methods (general) |
| configs | <code>Object</code> | configs (axon, template, _tokens) [GETTER: _configs] |
| configs.axon | <code>Object</code> | Axon config (general) |
| configs.template | <code>Object</code> | Template config |
| configs._tokens | <code>Object</code> | Tokens config |
| blacklistedUsers | <code>Set.&lt;String&gt;</code> | Cached blacklisted users |
| blacklistedGuilds | <code>Set.&lt;String&gt;</code> | Cached blacklisted guilds |
| staff | <code>Object</code> | Object of bot staff (user IDs) (owners, admins, ..+) |
| params | <code>Object</code> | Bot parameters |
| params.debugMode | <code>Boolean</code> | Enable to show commands latency |
| params.prefix | <code>Array</code> | Default bot prefix |
| params.ownerPrefix | <code>String</code> | Owner prefix : override perms/cd |
| params.adminPrefix | <code>String</code> | Admins prefix : override perms/cd except Owner only commands |
| infos | <code>Object</code> | General infos { name, description, version, library, owners } |
| axonInfos | <code>Object</code> | AxonClient infos { name, version, author, github } |
| webhooks | <code>Object</code> | All Client webhooks [GETTER: _configs._tokens.webhooks] |
| template | <code>Object</code> | Template options [GETTER: _configs.template] |

<a id="axonclient_new"></a>

#### new AxonClient(ErisClient, [axonOptions], [modules])
Creates an AxonClient instance.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ErisClient | <code>Object.&lt;Eris.Client&gt;</code> |  | Eris Client instance |
| [axonOptions] | <code>Object</code> | <code>{}</code> | Axon options |
| [axonOptions.axonConf] | <code>Object</code> |  | General Axon config |
| [axonOptions.templateConf] | <code>Object</code> |  | Template config |
| [axonOptions.tokenConf] | <code>Object</code> |  | Token config |
| [axonOptions.utils] | <code>Object.&lt;Utils&gt;</code> |  | Utils class, needs to be an instance of AxonCore.Utils |
| [axonOptions.logger] | <code>Object</code> |  | Custom logger |
| [axonOptions.db] | <code>Object</code> |  | DB Service. Needs to be an instance of DB Service |
| [axonOptions.axonSchema] | <code>Object</code> |  | Custom AxonSchema |
| [axonOptions.guildSchema] | <code>Object</code> |  | Custom GuildSchema |
| [modules] | <code>Object</code> | <code>{}</code> | Object with all modules to add in the bot |


<a id="initstaff"></a>

### initStaff()
Initialise Custom Bot Staff.
This method can be overridden in child.

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient) 

<a id="initerrorlisteners"></a>

### initErrorListeners()
Initialize error listeners and webhooks.
This method can be overriden in child.

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  

<a id="initstatus"></a>

### initStatus()
Initalizes the bot status.  
Default method. Can be overridden by initStatus in child.

**Kind**: Instance method of [<code>AxonClient</code>](#AxonClient)  

<a id="init"></a>

### init() ⇒ <code>Promise</code>
Custom init method.
This method need to be overridden in child.

**Kind**: instance method of [<code>AxonClient</code>](#AxonClient)  

<a id="start"></a>

### start()
START METHOD  
The AxonClient instance is already created at this point.  
Connect the bot to discord, initialize all modules and events, create default error handler, listen to messageCreate event.

**Kind**: Instance method of [<code>AxonClient</code>](#AxonClient)  

<a id="registermodule"></a>

### registerModule(module)
Register a module.  
Register the module of the client entirely, also registering commands, aliases, events, schemas of that module.

**Kind**: Instance method of [<code>AxonClient</code>](#AxonClient)  

| Param | Type |
| --- | --- |
| module | <code>Object.&lt;Module&gt;</code> | 

<a id="unregistermodule"></a>

### unregisterModule(label)
Unregister a module.  
Remove the module of the client, also removing commands, aliases, events, schemas of that module.

**Kind**: Instance method of [<code>AxonClient</code>](#AxonClient)  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | Label of the module to unregister |

<a id="sendfullhelp"></a>

### sendFullHelp(msg) ⇒ <code>Promise.&lt;Message&gt;</code>
Send full help in DM.  
Doesn't show commands that the user can't execute in the guild where the command was called.

**Kind**: Instance method of [<code>AxonClient</code>](#AxonClient)  
**Returns**: <code>Promise.&lt;Message&gt;</code> - Message Object  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>Object.&lt;Message&gt;</code> | The message object |

<a id="fetchaxonconf"></a>

### fetchAxonConf() ⇒ <code>Promise.&lt;Object&gt;</code>
Fetches and resolves the Axon config from the DB, creates a schema with all default values if none was found or there was an error.

**Kind**: Instance method of [<code>AxonClient</code>](#AxonClient)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Axon schema from the DB / error  

<a id="fetchguildconf"></a>

### fetchGuildConf(gID) ⇒ <code>Promise.&lt;Object&gt;</code>
Fetches and resolves the guild config of the given ID from the DB, creates a schema with all default values if none was found or there was an error.

**Kind**: Instance method of [<code>AxonClient</code>](#AxonClient)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Guild schema from the DB / Error  

| Param | Type | Description |
| --- | --- | --- |
| gID | <code>String</code> | The guild ID to fetch the DB |

<a id="resolveprefix"></a>

### resolvePrefix(msg) ⇒ <code>String</code>
Resolves the prefix for the guild of the message.  
If the message starts with one of the guild prefixes it returns the prefix, otherwise it returns undefined.

**Kind**: Instance method of [<code>AxonClient</code>](#AxonClient)  
**Returns**: <code>String</code> - The prefix if found / Undefined if the command doesn't exist  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>Object.&lt;Message&gt;</code> | the message object |

<a id="resolvecommand"></a>

### resolveCommand(label, args, guildConf) ⇒ <code>Object</code>
Resolves the command Object.  
Only resolves the command if it's not globally disabled or guild disabled.

**Kind**: Instance method of [<code>AxonClient</code>](#AxonClient)  
**Returns**: <code>Object</code> - The command object / Undefined if the command doesn't exist  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | the command label / command alias |
| args | <code>Array.&lt;String&gt;</code> | Array of arguments |
| guildConf | <code>Object</code> | Guild config from DB |

<a id="getmodule"></a>

### getModule(label) ⇒ <code>Object</code>
Get a module from AxonClient with the given label.

**Kind**: Instance method of [<code>AxonClient</code>](#AxonClient)  
**Returns**: <code>Object</code> - Module fetched  

| Param | Type |
| --- | --- |
| label | <code>String</code> | 

<a id="getcommand"></a>

### getCommand(label) ⇒ <code>Object</code>
Get a command or subcommand from AxonClient with the given full label.

**Kind**: Instance method of [<code>AxonClient</code>](#AxonClient)  
**Returns**: <code>Object</code> - Command fetched  

| Param | Type |
| --- | --- |
| label | <code>String</code> | 

<a id="getlisteners"></a>

### getListeners(eventName) ⇒ <code>Array</code>
Get all functions bound to the event passed in parameters.

**Kind**: instance method of [<code>EventManager</code>](#EventManager)  
**Returns**: <code>Array</code> - Array of the functions bound to the event  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>String</code> | The Eris event name |

<a id="getguildconf"></a>

### getGuildConf(gID) ⇒ <code>Promise.&lt;Object&gt;</code>
Get (or create) the guildConfig of the given ID from cache or DB.  
Cache the guildConfig if it's not already cached in the guildCong Collection.

**Kind**: Instance method of [<code>AxonClient</code>](#AxonClient)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - GuildConf fetched  

| Param | Type |
| --- | --- |
| gID | <code>String</code> | 

<a id="updateguildconf"></a>

### updateGuildConf(gID, guildSchema) ⇒ <code>Promise.&lt;Object&gt;</code>
Update the guild config in the cache and DB.  
This methods uses the raw JSON object.

**Kind**: Instance method of [<code>AxonClient</code>](#AxonClient)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Updated guildSchema  

| Param | Type | Description |
| --- | --- | --- |
| gID | <code>String</code> | Guild ID |
| guildSchema | <code>Object</code> | Guild schema Object |

<a id="registerguildprefix"></a>

### registerGuildPrefix(gID, prefixArr) ⇒ <code>Promise.&lt;Object&gt;</code>
Register a prefix for a guild.  
External method that can be called to update the cached prefix with the prefix registered in the DB.

**Kind**: Instance method of [<code>AxonClient</code>](#AxonClient)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The guild Schema from the DB / Error if an error is thrown  

| Param | Type | Description |
| --- | --- | --- |
| gID | <code>String</code> | The guild ID |
| prefixArr | <code>Array.&lt;String&gt;</code> | The array of prefix |

<a id="tostring"></a>

### toString() ⇒ <code>String</code>
ToString method.  

**Kind**: Instance method of [<code>AxonClient</code>](#AxonClient)  

<a id="tojson"></a>

### toJSON() ⇒ <code>Object</code>
ToJSON method.  

**Kind**: Instance method of [<code>AxonClient</code>](#AxonClient)  
**Returns**: <code>Object</code> - JSON-like Object  

<a id="inspect"></a>

### inspect() ⇒ <code>Object</code>
Custom inspect method.  
Doesn't list prefixed property and undefined property.

**Kind**: Instance method of [<code>AxonClient</code>](#AxonClient)  
**Returns**: <code>Object</code> - JSON-like Object 
