## Classes

<dl>
<dt><a href="#JsonProvider">JsonProvider</a> ⇐ <code>ADBProvider</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#GuildConfigRaw">GuildConfigRaw</a> : <code>String</code> | <code>Boolean</code> | <code>Object.&lt;string, any&gt;</code> | <code>Array.&lt;any&gt;</code> | <code>Number</code> | <code>Date</code></dt>
<dd></dd>
</dl>

<a name="JsonProvider"></a>

## JsonProvider ⇐ <code>ADBProvider</code>
**Kind**: global class  
**Extends**: <code>ADBProvider</code>  
**Author**: Olybear, KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| manager | <code>JsonManager</code> | Class responsible to read / write data to the DB as json. |


* [JsonProvider](#JsonProvider) ⇐ <code>ADBProvider</code>
    * [new JsonProvider()](#new_JsonProvider_new)
    * [.init(axonOptions)](#JsonProvider+init)
    * [.initAxon()](#JsonProvider+initAxon) ⇒ <code>Promise.&lt;AxonConfig&gt;</code>
    * [.initGuild(gID)](#JsonProvider+initGuild) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>
    * [.fetchAxon()](#JsonProvider+fetchAxon) ⇒ <code>Promise.&lt;(AxonConfig\|null)&gt;</code>
    * [.fetchGuild(gID)](#JsonProvider+fetchGuild) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>
    * [.updateAxon(key, value)](#JsonProvider+updateAxon) ⇒ <code>Promise.&lt;Boolean&gt;</code>
    * [.updateGuild(key, gID, value)](#JsonProvider+updateGuild) ⇒ <code>Promise.&lt;Boolean&gt;</code>
    * [.saveAxon(data)](#JsonProvider+saveAxon) ⇒ <code>Promise.&lt;(AxonConfig\|null)&gt;</code>
    * [.saveGuild(gID, data)](#JsonProvider+saveGuild) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>

<a name="new_JsonProvider_new"></a>

### new JsonProvider()
DB interface to interact with a Json Database.

<a name="JsonProvider+init"></a>

### jsonProvider.init(axonOptions)
Override init method.

**Kind**: instance method of [<code>JsonProvider</code>](#JsonProvider)  

| Param | Type |
| --- | --- |
| axonOptions | <code>AxonOptions</code> | 

<a name="JsonProvider+initAxon"></a>

### jsonProvider.initAxon() ⇒ <code>Promise.&lt;AxonConfig&gt;</code>
Initialises a default Axon config.

**Kind**: instance method of [<code>JsonProvider</code>](#JsonProvider)  
**Returns**: <code>Promise.&lt;AxonConfig&gt;</code> - Newly created Axon config from the DB  
<a name="JsonProvider+initGuild"></a>

### jsonProvider.initGuild(gID) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>
Initialises a default Guild config.
Use default AxonClient prefix settings when creating the new guild config.

**Kind**: instance method of [<code>JsonProvider</code>](#JsonProvider)  
**Returns**: <code>Promise.&lt;(GuildConfig\|null)&gt;</code> - Newly created Guild config from the DB  

| Param | Type | Description |
| --- | --- | --- |
| gID | <code>String</code> | Guild ID |

<a name="JsonProvider+fetchAxon"></a>

### jsonProvider.fetchAxon() ⇒ <code>Promise.&lt;(AxonConfig\|null)&gt;</code>
Retrieves the axon config from the DB

**Kind**: instance method of [<code>JsonProvider</code>](#JsonProvider)  
**Returns**: <code>Promise.&lt;(AxonConfig\|null)&gt;</code> - AxonSchema Object or null  
<a name="JsonProvider+fetchGuild"></a>

### jsonProvider.fetchGuild(gID) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>
Retrieves the Guild config for the specified guild.

**Kind**: instance method of [<code>JsonProvider</code>](#JsonProvider)  

| Param | Type | Description |
| --- | --- | --- |
| gID | <code>String</code> | guild ID |

<a name="JsonProvider+updateAxon"></a>

### jsonProvider.updateAxon(key, value) ⇒ <code>Promise.&lt;Boolean&gt;</code>
Update AxonConfig in the DB.
Update the specific key with the value given as second parameters.
Generic method to update Database.

**Kind**: instance method of [<code>JsonProvider</code>](#JsonProvider)  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - Whether the request was successful or not  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The identifier in the Database |
| value | <code>updateDBVal</code> | The value to update in the DB |

<a name="JsonProvider+updateGuild"></a>

### jsonProvider.updateGuild(key, gID, value) ⇒ <code>Promise.&lt;Boolean&gt;</code>
Update GuildConfig in the DB.
Update the specific key with the value given as third parameters.
Specify the guild with the guild ID.
Generic method to update Database.

**Kind**: instance method of [<code>JsonProvider</code>](#JsonProvider)  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - Whether the request was successful or not  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The identifier in the Database |
| gID | <code>String</code> | The guild ID to update |
| value | <code>updateDBVal</code> | The value to update in the DB |

<a name="JsonProvider+saveAxon"></a>

### jsonProvider.saveAxon(data) ⇒ <code>Promise.&lt;(AxonConfig\|null)&gt;</code>
Updates the Axon config in the DB with a new Axon config object.

**Kind**: instance method of [<code>JsonProvider</code>](#JsonProvider)  
**Returns**: <code>Promise.&lt;(AxonConfig\|null)&gt;</code> - Updated AxonConfig from the DB  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>AxonConfig</code> \| <code>AxonConfigRaw</code> | the schema object to update |

<a name="JsonProvider+saveGuild"></a>

### jsonProvider.saveGuild(gID, data) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>
Updates the given guild in the DB with a new schema object.

**Kind**: instance method of [<code>JsonProvider</code>](#JsonProvider)  
**Returns**: <code>Promise.&lt;(GuildConfig\|null)&gt;</code> - Updated GuildConfig from the DB  

| Param | Type | Description |
| --- | --- | --- |
| gID | <code>String</code> | Guild id |
| data | <code>GuildConfig</code> \| [<code>GuildConfigRaw</code>](#GuildConfigRaw) | the schema object to update |

<a name="GuildConfigRaw"></a>

## GuildConfigRaw : <code>String</code> \| <code>Boolean</code> \| <code>Object.&lt;string, any&gt;</code> \| <code>Array.&lt;any&gt;</code> \| <code>Number</code> \| <code>Date</code>
**Kind**: global typedef  
