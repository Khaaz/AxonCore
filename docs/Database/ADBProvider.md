## Classes

<dl>
<dt><a href="#ADBProvider">ADBProvider</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#GuildConfigRaw">GuildConfigRaw</a> : <code>String</code> | <code>Boolean</code> | <code>Object.&lt;string, any&gt;</code> | <code>Array.&lt;any&gt;</code> | <code>Number</code> | <code>Date</code></dt>
<dd></dd>
</dl>

<a name="ADBProvider"></a>

## *ADBProvider*
**Kind**: global abstract class  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| axon | <code>AxonClient</code> | The AxonClient |


* *[ADBProvider](#ADBProvider)*
    * *[new ADBProvider()](#new_ADBProvider_new)*
    * _instance_
        * *[.init([axonOptions])](#ADBProvider+init)*
        * *[.initAxon()](#ADBProvider+initAxon) ⇒ <code>Promise.&lt;AxonConfig&gt;</code>*
        * *[.initGuild(gID)](#ADBProvider+initGuild) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>*
        * *[.fetchAxon()](#ADBProvider+fetchAxon) ⇒ <code>Promise.&lt;(AxonConfig\|null)&gt;</code>*
        * *[.fetchGuild(gID)](#ADBProvider+fetchGuild) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>*
        * *[.updateAxon(key, value)](#ADBProvider+updateAxon) ⇒ <code>Promise.&lt;Boolean&gt;</code>*
        * *[.updateGuild(key, gID, value)](#ADBProvider+updateGuild) ⇒ <code>Promise.&lt;Boolean&gt;</code>*
        * *[.saveAxon(data)](#ADBProvider+saveAxon) ⇒ <code>Promise.&lt;(AxonConfig\|null)&gt;</code>*
        * *[.saveGuild(gID, data)](#ADBProvider+saveGuild) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>*
    * _static_
        * *[.ADBProvider](#ADBProvider.ADBProvider)*
            * [new ADBProvider(axonClient)](#new_ADBProvider.ADBProvider_new)

<a name="new_ADBProvider_new"></a>

### *new ADBProvider()*
Abstract class for all DB services.
Extend this class to create your own Database provider.
You just need to write these methods for the framework to be able to interact with the database.

The provider creates guildconfigs with DB data.

<a name="ADBProvider+init"></a>

### *adbProvider.init([axonOptions])*
Init the ADBProvider.
Method called just after instantiation. Can be overridden with anything that will be used by the provider.

**Kind**: instance method of [<code>ADBProvider</code>](#ADBProvider)  

| Param | Type | Default |
| --- | --- | --- |
| [axonOptions] | <code>AxonOptions</code> | <code></code> | 

<a name="ADBProvider+initAxon"></a>

### *adbProvider.initAxon() ⇒ <code>Promise.&lt;AxonConfig&gt;</code>*
Initialises a default Axon config.

**Kind**: instance method of [<code>ADBProvider</code>](#ADBProvider)  
**Returns**: <code>Promise.&lt;AxonConfig&gt;</code> - Newly created Axon config from the DB  
<a name="ADBProvider+initGuild"></a>

### *adbProvider.initGuild(gID) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>*
Initialises a default Guild config.
Use default AxonClient prefix settings when creating the new guild config.

**Kind**: instance method of [<code>ADBProvider</code>](#ADBProvider)  
**Returns**: <code>Promise.&lt;(GuildConfig\|null)&gt;</code> - Newly created Guild config from the DB  

| Param | Type | Description |
| --- | --- | --- |
| gID | <code>String</code> | Guild ID |

<a name="ADBProvider+fetchAxon"></a>

### *adbProvider.fetchAxon() ⇒ <code>Promise.&lt;(AxonConfig\|null)&gt;</code>*
Retrieves the axon config from the DB

**Kind**: instance method of [<code>ADBProvider</code>](#ADBProvider)  
**Returns**: <code>Promise.&lt;(AxonConfig\|null)&gt;</code> - AxonSchema Object or null  
<a name="ADBProvider+fetchGuild"></a>

### *adbProvider.fetchGuild(gID) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>*
Retrieves the Guild config for the specified guild.

**Kind**: instance method of [<code>ADBProvider</code>](#ADBProvider)  

| Param | Type | Description |
| --- | --- | --- |
| gID | <code>String</code> | Guild ID |

<a name="ADBProvider+updateAxon"></a>

### *adbProvider.updateAxon(key, value) ⇒ <code>Promise.&lt;Boolean&gt;</code>*
Update AxonConfig in the DB.
Update the specific key with the value given as second parameters.
Generic method to update Database.

**Kind**: instance method of [<code>ADBProvider</code>](#ADBProvider)  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - Whether the request was successful or not  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The identifier in the Database |
| value | <code>updateDBVal</code> | The value to update in the DB |

<a name="ADBProvider+updateGuild"></a>

### *adbProvider.updateGuild(key, gID, value) ⇒ <code>Promise.&lt;Boolean&gt;</code>*
Update GuildConfig in the DB.
Update the specific key with the value given as third parameters.
Specify the guild with the guild ID.
Generic method to update Database.

**Kind**: instance method of [<code>ADBProvider</code>](#ADBProvider)  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - Whether the request was successful or not  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The identifier in the Database |
| gID | <code>String</code> | The guild ID to update |
| value | <code>updateDBVal</code> | The value to update in the DB |

<a name="ADBProvider+saveAxon"></a>

### *adbProvider.saveAxon(data) ⇒ <code>Promise.&lt;(AxonConfig\|null)&gt;</code>*
Updates the Axon config in the DB with a new Axon config object.

**Kind**: instance method of [<code>ADBProvider</code>](#ADBProvider)  
**Returns**: <code>Promise.&lt;(AxonConfig\|null)&gt;</code> - Updated AxonConfig from the DB  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>AxonConfig</code> \| <code>AxonConfigRaw</code> | the schema object to update |

<a name="ADBProvider+saveGuild"></a>

### *adbProvider.saveGuild(gID, data) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>*
Updates the given guild in the DB with a new schema object.

**Kind**: instance method of [<code>ADBProvider</code>](#ADBProvider)  
**Returns**: <code>Promise.&lt;(GuildConfig\|null)&gt;</code> - Updated GuildConfig from the DB  

| Param | Type | Description |
| --- | --- | --- |
| gID | <code>String</code> | Guild ID |
| data | <code>GuildConfig</code> \| [<code>GuildConfigRaw</code>](#GuildConfigRaw) | The schema object to update |

<a name="ADBProvider.ADBProvider"></a>

### *ADBProvider.ADBProvider*
**Kind**: static class of [<code>ADBProvider</code>](#ADBProvider)  
<a name="new_ADBProvider.ADBProvider_new"></a>

#### new ADBProvider(axonClient)
Creates an instance of ADBProvider.


| Param | Type |
| --- | --- |
| axonClient | <code>AxonClient</code> | 

<a name="GuildConfigRaw"></a>

## GuildConfigRaw : <code>String</code> \| <code>Boolean</code> \| <code>Object.&lt;string, any&gt;</code> \| <code>Array.&lt;any&gt;</code> \| <code>Number</code> \| <code>Date</code>
**Kind**: global typedef  
