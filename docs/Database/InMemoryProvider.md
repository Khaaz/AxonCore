## Classes

<dl>
<dt><a href="#InMemoryProvider">InMemoryProvider</a> ⇐ <code>ADBProvider</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#GuildConfigRaw">GuildConfigRaw</a> : <code>String</code> | <code>Boolean</code> | <code>Object.&lt;string, any&gt;</code> | <code>Array.&lt;any&gt;</code> | <code>Number</code> | <code>Date</code></dt>
<dd></dd>
</dl>

<a name="InMemoryProvider"></a>

## InMemoryProvider ⇐ <code>ADBProvider</code>
**Kind**: global class  
**Extends**: <code>ADBProvider</code>  
**Author**: VoidNull  

* [InMemoryProvider](#InMemoryProvider) ⇐ <code>ADBProvider</code>
    * [new InMemoryProvider()](#new_InMemoryProvider_new)
    * [.fetchAxon()](#InMemoryProvider+fetchAxon) ⇒ <code>Promise.&lt;[AxonConfig](Core/AxonConfig)&gt;</code>
    * [.fetchGuild(gID)](#InMemoryProvider+fetchGuild) ⇒ <code>Promise.&lt;[GuildConfig](Core/GuildConfig)&gt;</code>
    * [.initAxon()](#InMemoryProvider+initAxon) ⇒ <code>Promise.&lt;[AxonConfig](Core/AxonConfig)&gt;</code>
    * [.initGuild(gID)](#InMemoryProvider+initGuild) ⇒ <code>Promise.&lt;[GuildConfig](Core/GuildConfig)&gt;</code>
    * [.saveAxon(axonSchema)](#InMemoryProvider+saveAxon) ⇒ <code>Promise.&lt;[AxonConfig](Core/AxonConfig)&gt;</code>
    * [.saveGuild(gID, guildSchema)](#InMemoryProvider+saveGuild) ⇒ <code>Promise.&lt;[GuildConfig](Core/GuildConfig)&gt;</code>
    * [.updateGuild(key, gID, value)](#InMemoryProvider+updateGuild) ⇒ <code>Promise.&lt;Boolean&gt;</code>
    * [.updateAxon(key, value)](#InMemoryProvider+updateAxon) ⇒ <code>Promise.&lt;Boolean&gt;</code>

<a name="new_InMemoryProvider_new"></a>

### new InMemoryProvider()
A schema designed use an InMemory solution in AxonCore

<a name="InMemoryProvider+fetchAxon"></a>

### inMemoryProvider.fetchAxon() ⇒ <code>Promise.&lt;[AxonConfig](Core/AxonConfig)&gt;</code>
**Kind**: instance method of [<code>InMemoryProvider</code>](#InMemoryProvider)  
<a name="InMemoryProvider+fetchGuild"></a>

### inMemoryProvider.fetchGuild(gID) ⇒ <code>Promise.&lt;[GuildConfig](Core/GuildConfig)&gt;</code>
**Kind**: instance method of [<code>InMemoryProvider</code>](#InMemoryProvider)  

| Param | Type | Description |
| --- | --- | --- |
| gID | <code>String</code> | Guild ID |

<a name="InMemoryProvider+initAxon"></a>

### inMemoryProvider.initAxon() ⇒ <code>Promise.&lt;[AxonConfig](Core/AxonConfig)&gt;</code>
**Kind**: instance method of [<code>InMemoryProvider</code>](#InMemoryProvider)  
<a name="InMemoryProvider+initGuild"></a>

### inMemoryProvider.initGuild(gID) ⇒ <code>Promise.&lt;[GuildConfig](Core/GuildConfig)&gt;</code>
**Kind**: instance method of [<code>InMemoryProvider</code>](#InMemoryProvider)  

| Param | Type | Description |
| --- | --- | --- |
| gID | <code>String</code> | Guild ID |

<a name="InMemoryProvider+saveAxon"></a>

### inMemoryProvider.saveAxon(axonSchema) ⇒ <code>Promise.&lt;[AxonConfig](Core/AxonConfig)&gt;</code>
**Kind**: instance method of [<code>InMemoryProvider</code>](#InMemoryProvider)  

| Param | Type |
| --- | --- |
| axonSchema | <code>[AxonConfig](Core/AxonConfig)</code> \| <code>AxonConfigRaw</code> | 

<a name="InMemoryProvider+saveGuild"></a>

### inMemoryProvider.saveGuild(gID, guildSchema) ⇒ <code>Promise.&lt;[GuildConfig](Core/GuildConfig)&gt;</code>
**Kind**: instance method of [<code>InMemoryProvider</code>](#InMemoryProvider)  

| Param | Type | Description |
| --- | --- | --- |
| gID | <code>String</code> | Guild ID |
| guildSchema | <code>[GuildConfig](Core/GuildConfig)</code> \| [<code>GuildConfigRaw</code>](#GuildConfigRaw) |  |

<a name="InMemoryProvider+updateGuild"></a>

### inMemoryProvider.updateGuild(key, gID, value) ⇒ <code>Promise.&lt;Boolean&gt;</code>
Update guild config

**Kind**: instance method of [<code>InMemoryProvider</code>](#InMemoryProvider)  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - Whether the request was successful or not  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | Value to update |
| gID | <code>String</code> | Guild ID |
| value | <code>updateDBVal</code> | What the value should be updated to |

<a name="InMemoryProvider+updateAxon"></a>

### inMemoryProvider.updateAxon(key, value) ⇒ <code>Promise.&lt;Boolean&gt;</code>
Update Axon config

**Kind**: instance method of [<code>InMemoryProvider</code>](#InMemoryProvider)  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - Whether the request was successful or not  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | Value to update |
| value | <code>updateDBVal</code> | What the value should be updated to |

<a name="GuildConfigRaw"></a>

## GuildConfigRaw : <code>String</code> \| <code>Boolean</code> \| <code>Object.&lt;string, any&gt;</code> \| <code>Array.&lt;any&gt;</code> \| <code>Number</code> \| <code>Date</code>
**Kind**: global typedef  
