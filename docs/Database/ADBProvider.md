<a name="DBProvider"></a>

## *DBProvider*
**Kind**: global abstract class  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| axon | <code>Object.&lt;AxonClient&gt;</code> | The AxonClient |


* *[DBProvider](#DBProvider)*
    * *[new DBProvider()](#new_DBProvider_new)*
    * _instance_
        * *[.init(axonOptions)](#DBProvider+init)*
        * *[.initAxon()](#DBProvider+initAxon) ⇒ <code>Promise.&lt;AxonConfig&gt;</code>*
        * *[.initGuild(gID)](#DBProvider+initGuild) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>*
        * *[.fetchAxon()](#DBProvider+fetchAxon) ⇒ <code>Promise.&lt;(AxonConfig\|null)&gt;</code>*
        * *[.fetchGuild(gID)](#DBProvider+fetchGuild) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>*
        * *[.updateAxon(key, value)](#DBProvider+updateAxon) ⇒ <code>Promise.&lt;Boolean&gt;</code>*
        * *[.updateGuild(key, gID, value)](#DBProvider+updateGuild) ⇒ <code>Promise.&lt;Boolean&gt;</code>*
        * *[.saveAxon(data)](#DBProvider+saveAxon) ⇒ <code>Promise.&lt;(AxonConfig\|null)&gt;</code>*
        * *[.saveGuild(gID, data)](#DBProvider+saveGuild) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>*
    * _static_
        * *[.DBProvider](#DBProvider.DBProvider)*
            * [new DBProvider(axon)](#new_DBProvider.DBProvider_new)

<a name="new_DBProvider_new"></a>

### *new DBProvider()*
Abstract class for all DB services.
Extend this class to create your own Database provider.
You just need to write these methods for the framewor to be able to interact with the database.

The provider creates guildconfigs with DB datas.

<a name="DBProvider+init"></a>

### *dbProvider.init(axonOptions)*
Init the DBProvider.
Method calledjust after instantiation.Can be overrided with anything that willbe used by the provider.

**Kind**: instance method of [<code>DBProvider</code>](#DBProvider)  

| Param | Type | Default |
| --- | --- | --- |
| axonOptions | <code>Object.&lt;AxonOptions&gt;</code> | <code></code> | 

<a name="DBProvider+initAxon"></a>

### *dbProvider.initAxon() ⇒ <code>Promise.&lt;AxonConfig&gt;</code>*
Initialises a default Axon config.

**Kind**: instance method of [<code>DBProvider</code>](#DBProvider)  
**Returns**: <code>Promise.&lt;AxonConfig&gt;</code> - Newly created Axon config from the DB  
<a name="DBProvider+initGuild"></a>

### *dbProvider.initGuild(gID) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>*
Initialises a default Guild config.
Use default AxonClient prefix settings when creating the new guild config.

**Kind**: instance method of [<code>DBProvider</code>](#DBProvider)  
**Returns**: <code>Promise.&lt;(GuildConfig\|null)&gt;</code> - Newly created Guild config from the DB  

| Param | Type | Description |
| --- | --- | --- |
| gID | <code>String</code> | Guild ID |

<a name="DBProvider+fetchAxon"></a>

### *dbProvider.fetchAxon() ⇒ <code>Promise.&lt;(AxonConfig\|null)&gt;</code>*
Retrieves the axon config from the DB

**Kind**: instance method of [<code>DBProvider</code>](#DBProvider)  
**Returns**: <code>Promise.&lt;(AxonConfig\|null)&gt;</code> - AxonSchema Object or null  
<a name="DBProvider+fetchGuild"></a>

### *dbProvider.fetchGuild(gID) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>*
Retreives the Guild config for the specified guild.

**Kind**: instance method of [<code>DBProvider</code>](#DBProvider)  

| Param | Type | Description |
| --- | --- | --- |
| gID | <code>String</code> | guild ID |

<a name="DBProvider+updateAxon"></a>

### *dbProvider.updateAxon(key, value) ⇒ <code>Promise.&lt;Boolean&gt;</code>*
Update AxonConfig in the DB.
Update the specific key with the value given as second parameters.
Generic method to update Database.

**Kind**: instance method of [<code>DBProvider</code>](#DBProvider)  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - UWhether the request was successfull or not  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The identifier in the Database |
| value | <code>Object</code> \| <code>Array</code> \| <code>String</code> \| <code>Boolean</code> | The value to update in the DB |

<a name="DBProvider+updateGuild"></a>

### *dbProvider.updateGuild(key, gID, value) ⇒ <code>Promise.&lt;Boolean&gt;</code>*
Update GuildConfig in the DB.
Update the specific key with the value given as third parameters.
Specify the guild with the guild ID.
Generic method to update Database.

**Kind**: instance method of [<code>DBProvider</code>](#DBProvider)  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - Whether the request was successfull or not  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The identifier in the Database |
| gID | <code>String</code> | The guild ID to update |
| value | <code>Object</code> \| <code>Array</code> \| <code>String</code> \| <code>Boolean</code> | The value to update in the DB |

<a name="DBProvider+saveAxon"></a>

### *dbProvider.saveAxon(data) ⇒ <code>Promise.&lt;(AxonConfig\|null)&gt;</code>*
Updates the Axon config in the DB with a new Axon config object.

**Kind**: instance method of [<code>DBProvider</code>](#DBProvider)  
**Returns**: <code>Promise.&lt;(AxonConfig\|null)&gt;</code> - Updated AxonConfig from the DB  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | the schema object to update |

<a name="DBProvider+saveGuild"></a>

### *dbProvider.saveGuild(gID, data) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>*
Updates the given guild in the DB with a new schema object.

**Kind**: instance method of [<code>DBProvider</code>](#DBProvider)  
**Returns**: <code>Promise.&lt;(GuildConfig\|null)&gt;</code> - Updated GuildConfig from the DB  

| Param | Type | Description |
| --- | --- | --- |
| gID | <code>String</code> | Guid id |
| data | <code>Object</code> | the schema object to update |

<a name="DBProvider.DBProvider"></a>

### *DBProvider.DBProvider*
**Kind**: static class of [<code>DBProvider</code>](#DBProvider)  
<a name="new_DBProvider.DBProvider_new"></a>

#### new DBProvider(axon)
Creates an instance of DBProvider.


| Param | Type |
| --- | --- |
| axon | <code>Object.&lt;AxonClient&gt;</code> | 

