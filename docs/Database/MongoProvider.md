## Classes

<dl>
<dt><a href="#MongoProvider">MongoProvider</a> ⇐ <code>ADBProvider</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#GuildConfigRaw">GuildConfigRaw</a> : <code>String</code> | <code>Boolean</code> | <code>Object.&lt;string, any&gt;</code> | <code>Array.&lt;any&gt;</code> | <code>Number</code> | <code>Date</code></dt>
<dd></dd>
</dl>

<a name="MongoProvider"></a>

## MongoProvider ⇐ <code>ADBProvider</code>
**Kind**: global class  
**Extends**: <code>ADBProvider</code>  
**Author**: KhaaZ  
**Properties**

| Name | Type |
| --- | --- |
| AxonSchema | <code>AxonSchema</code> | 
| GuildSchema | <code>GuildSchema</code> | 


* [MongoProvider](#MongoProvider) ⇐ <code>ADBProvider</code>
    * [new MongoProvider()](#new_MongoProvider_new)
    * [.init(axonOptions)](#MongoProvider+init)
    * [.initAxon()](#MongoProvider+initAxon) ⇒ <code>Promise.&lt;AxonConfig&gt;</code>
    * [.initGuild(gID)](#MongoProvider+initGuild) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>
    * [.fetchAxon()](#MongoProvider+fetchAxon) ⇒ <code>Promise.&lt;(AxonConfig\|null)&gt;</code>
    * [.fetchGuild(gID)](#MongoProvider+fetchGuild) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>
    * [.fetchGuildSchema(gID)](#MongoProvider+fetchGuildSchema) ⇒ <code>Promise.&lt;(Object\|null)&gt;</code>
    * [.updateAxon(key, value)](#MongoProvider+updateAxon) ⇒ <code>Promise.&lt;Boolean&gt;</code>
    * [.updateGuild(key, gID, value)](#MongoProvider+updateGuild) ⇒ <code>Promise.&lt;Boolean&gt;</code>
    * [.saveAxon(data)](#MongoProvider+saveAxon) ⇒ <code>Promise.&lt;(AxonConfig\|null)&gt;</code>
    * [.saveGuild(gID, data)](#MongoProvider+saveGuild) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>

<a name="new_MongoProvider_new"></a>

### new MongoProvider()
DB interface to interact with a MongoDB Database.

<a name="MongoProvider+init"></a>

### mongoProvider.init(axonOptions)
Override init method.

**Kind**: instance method of [<code>MongoProvider</code>](#MongoProvider)  

| Param | Type | Default |
| --- | --- | --- |
| axonOptions | <code>AxonOptions</code> | <code></code> | 

<a name="MongoProvider+initAxon"></a>

### mongoProvider.initAxon() ⇒ <code>Promise.&lt;AxonConfig&gt;</code>
Initialises a default Axon config.

**Kind**: instance method of [<code>MongoProvider</code>](#MongoProvider)  
**Returns**: <code>Promise.&lt;AxonConfig&gt;</code> - Newly created Axon config from the DB  
<a name="MongoProvider+initGuild"></a>

### mongoProvider.initGuild(gID) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>
Initialises a default Guild config.
Use default AxonClient prefix settings when creating the new guild config.

**Kind**: instance method of [<code>MongoProvider</code>](#MongoProvider)  
**Returns**: <code>Promise.&lt;(GuildConfig\|null)&gt;</code> - Newly created Guild config from the DB  

| Param | Type | Description |
| --- | --- | --- |
| gID | <code>String</code> | Guild ID |

<a name="MongoProvider+fetchAxon"></a>

### mongoProvider.fetchAxon() ⇒ <code>Promise.&lt;(AxonConfig\|null)&gt;</code>
Retrieves the axon config from the DB

**Kind**: instance method of [<code>MongoProvider</code>](#MongoProvider)  
**Returns**: <code>Promise.&lt;(AxonConfig\|null)&gt;</code> - AxonSchema Object or null  
<a name="MongoProvider+fetchGuild"></a>

### mongoProvider.fetchGuild(gID) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>
Retrieves the Guild config for the specified guild.

**Kind**: instance method of [<code>MongoProvider</code>](#MongoProvider)  

| Param | Type | Description |
| --- | --- | --- |
| gID | <code>String</code> | Guild ID |

<a name="MongoProvider+fetchGuildSchema"></a>

### mongoProvider.fetchGuildSchema(gID) ⇒ <code>Promise.&lt;(Object\|null)&gt;</code>
Retrieves the Guild **Schema** for the specified guild.
Does not lean and return the actual mongoose Schema.
MongoProvider specific method.

**Kind**: instance method of [<code>MongoProvider</code>](#MongoProvider)  
**Returns**: <code>Promise.&lt;(Object\|null)&gt;</code> - GuildSchema or null  

| Param | Type | Description |
| --- | --- | --- |
| gID | <code>String</code> | Guild ID |

<a name="MongoProvider+updateAxon"></a>

### mongoProvider.updateAxon(key, value) ⇒ <code>Promise.&lt;Boolean&gt;</code>
Update AxonConfig in the DB.
Update the specific key with the value given as second parameters.
Generic method to update Database.

**Kind**: instance method of [<code>MongoProvider</code>](#MongoProvider)  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - Whether the request was successful or not  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The identifier in the Database |
| value | <code>updateDBVal</code> | The value to update in the DB |

<a name="MongoProvider+updateGuild"></a>

### mongoProvider.updateGuild(key, gID, value) ⇒ <code>Promise.&lt;Boolean&gt;</code>
Update GuildConfig in the DB.
Update the specific key with the value given as third parameters.
Specify the guild with the guild ID.
Generic method to update Database.

**Kind**: instance method of [<code>MongoProvider</code>](#MongoProvider)  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - Whether the request was successful or not  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The identifier in the Database |
| gID | <code>String</code> | The guild ID to update |
| value | <code>updateDBVal</code> | The value to update in the DB |

<a name="MongoProvider+saveAxon"></a>

### mongoProvider.saveAxon(data) ⇒ <code>Promise.&lt;(AxonConfig\|null)&gt;</code>
Updates the Axon config in the DB with a new Axon config object.

**Kind**: instance method of [<code>MongoProvider</code>](#MongoProvider)  
**Returns**: <code>Promise.&lt;(AxonConfig\|null)&gt;</code> - Updated AxonConfig from the DB  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>AxonConfig</code> \| <code>AxonConfigRaw</code> | the schema object to update |

<a name="MongoProvider+saveGuild"></a>

### mongoProvider.saveGuild(gID, data) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>
Updates the given guild in the DB with a new schema object.

**Kind**: instance method of [<code>MongoProvider</code>](#MongoProvider)  
**Returns**: <code>Promise.&lt;(GuildConfig\|null)&gt;</code> - Updated GuildConfig from the DB  

| Param | Type | Description |
| --- | --- | --- |
| gID | <code>String</code> | Guid id |
| data | <code>GuildConfig</code> \| [<code>GuildConfigRaw</code>](#GuildConfigRaw) | the schema object to update |

<a name="GuildConfigRaw"></a>

## GuildConfigRaw : <code>String</code> \| <code>Boolean</code> \| <code>Object.&lt;string, any&gt;</code> \| <code>Array.&lt;any&gt;</code> \| <code>Number</code> \| <code>Date</code>
**Kind**: global typedef  
