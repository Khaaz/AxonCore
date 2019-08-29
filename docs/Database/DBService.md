<a id="dbservice"></a>

## DBService
Abstract class for all DB Services.  

**Kind**: global class  
**Author**: KhaaZ  

[DBService](#DBService)
- _instance_
  - [fetchAxon()](#fetchAxon) ⇒ <code>Promise.&lt;(Object\|null)&gt;</code>
  - [fetchGuild(gID)](#fetchGuild) ⇒ <code>Promise.&lt;(Object\|null)&gt;</code>
  - [initAxon()](#initAxon) ⇒ <code>Promise.&lt;Object&gt;</code>
  - [initGuild(gID)](#initGuild) ⇒ <code>Promsie.&lt;Object&gt;</code>
  - [updateBlacklistUser(blacklistedUsers)](#updateBlacklistUser) ⇒ <code>Promise</code>
  - [updateBlacklistGuild(blacklistedGuilds)](#updateBlacklistGuild) ⇒ <code>Promise</code>
  - [updateGuildPrefix(gID, prefixArr)](#updateGuildPrefix) ⇒ <code>Promise</code>
  - [updateModule(modulesArr)](#updateModule) ⇒ <code>Promise</code>
  - [updateCommand(commandsArr)](#updateCommand) ⇒ <code>Promise</code>
  - [updateEvent(eventsArr)](#updateEvent) ⇒ <code>Promise</code>
  - [saveAxonSchema(schema)](#saveAxonSchema) ⇒ <code>Promise</code>
  - [saveGuildSchema(gID, schema)](#saveGuildSchema) ⇒ <code>Promise</code>

<a id="fetchaxon"></a>

### fetchAxon() ⇒ <code>Promise.&lt;(Object\|null)&gt;</code>
Retrieves the axon schema from the DB.

**Kind**: instance method of [<code>DBService</code>](#DBService)  
**Returns**: <code>Promise.&lt;(Object\|null)&gt;</code> - AxonSchema Object or null  

<a id="fetchGcild"></a>

### fetchGuild(gID) ⇒ <code>Promise.&lt;(Object\|null)&gt;</code>
Retreives the Guild Schema for the specified guild.  

**Kind**: instance method of [<code>DBService</code>](#DBService)  
**Returns**: <code>Promise.&lt;(Object\|null)&gt;</code> - GuildSchema or null  

| Param | Type | Description |
| --- | --- | --- |
| gID | <code>String</code> | guild ID |

<a id="initaxon"></a>

### initAxon() ⇒ <code>Promise.&lt;Object&gt;</code>
Initialises a default schema for Axon.  

**Kind**: instance method of [<code>DBService</code>](#DBService)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Newly created Axon Schema  
<a id="initguild"></a>

### initGuild(gID) ⇒ <code>Promsie.&lt;Object&gt;</code>
Init Guild Schema with default values

**Kind**: instance method of [<code>DBService</code>](#DBService)  
**Returns**: <code>Promsie.&lt;Object&gt;</code> - Newly created guild  

| Param | Type | Description |
| --- | --- | --- |
| gID | <code>String</code> | Guild ID |

<a id="updateblacklistuser"></a>

### updateBlacklistUser(blacklistedUsers) ⇒ <code>Promise</code>
Updates the blacklisted users.

**Kind**: instance method of [<code>DBService</code>](#DBService)  
**Returns**: <code>Promise</code> - Updated AxonSchema  

| Param | Type | Description |
| --- | --- | --- |
| blacklistedUsers | <code>Array.&lt;String&gt;</code> | Array of blacklisted users |

<a id="updateblacklistguild"></a>

### updateBlacklistGuild(blacklistedGuilds) ⇒ <code>Promise</code>
Updates the blacklisted guilds.

**Kind**: instance method of [<code>DBService</code>](#DBService)  
**Returns**: <code>Promise</code> - Updated AxonSchema  

| Param | Type | Description |
| --- | --- | --- |
| blacklistedGuilds | <code>Array.&lt;String&gt;</code> | Array of blacklistedUsers |

<a id="updateguildprefix"></a>

### updateGuildPrefix(gID, prefixArr) ⇒ <code>Promise</code>
Updates the guild prefix array for the specified guild.

**Kind**: instance method of [<code>DBService</code>](#DBService)  
**Returns**: <code>Promise</code> - Updated GuildSchema  

| Param | Type | Description |
| --- | --- | --- |
| gID | <code>String</code> | guild ID |
| prefixArr | <code>Array.&lt;String&gt;</code> | Array of prefixes |

<a id="updatemodule"></a>

### updateModule(modulesArr) ⇒ <code>Promise</code>
Updates the modules array for the specified guild.

**Kind**: instance method of [<code>DBService</code>](#DBService)  
**Returns**: <code>Promise</code> - Updated GuildSchema  

| Param | Type | Description |
| --- | --- | --- |
| modulesArr | <code>Array.&lt;String&gt;</code> | Array of modules label |

<a id="updatecommand"></a>

### updateCommand(commandsArr) ⇒ <code>Promise</code>
Updates commands array for the specified guild.

**Kind**: instance method of [<code>DBService</code>](#DBService)  
**Returns**: <code>Promise</code> - Updated GuildSchema  

| Param | Type | Description |
| --- | --- | --- |
| commandsArr | <code>Array.&lt;String&gt;</code> | Array of commands label |

<a id="updateevent"></a>

### updateEvent(eventsArr) ⇒ <code>Promise</code>
Updates the events array for the specified guild.

**Kind**: instance method of [<code>DBService</code>](#DBService)  
**Returns**: <code>Promise</code> - Updated GuildSchema  

| Param | Type | Description |
| --- | --- | --- |
| eventsArr | <code>Array.&lt;String&gt;</code> | Array of events label |

<a id="saveaxonschema"></a>

### saveAxonSchema(schema) ⇒ <code>Promise</code>
Updates the given schema in the DB with a new schema.

**Kind**: instance method of [<code>DBService</code>](#DBService)  
**Returns**: <code>Promise</code> - Updated Schema from the DB  

| Param | Type | Description |
| --- | --- | --- |
| schema | <code>Object</code> | the schema object to update |

<a id="saveguildschema"></a>

### saveGuildSchema(gID, schema) ⇒ <code>Promise</code>
Updates the given guild in the DB with a new schema object.

**Kind**: instance method of [<code>DBService</code>](#DBService)  
**Returns**: <code>Promise</code> - Updated Schema from the DB  

| Param | Type | Description |
| --- | --- | --- |
| gID | <code>String</code> | Guid id |
| schema | <code>Object</code> | the schema object to update |

