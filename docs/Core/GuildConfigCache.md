<a name="GuildConfigsCache"></a>

## GuildConfigsCache ⇐ <code>Store&lt;GuildConfig&gt;</code>
**Kind**: global class  
**Extends**: <code>Store&lt;GuildConfig&gt;</code>  
**Author**: KhaaZ  
**Properties**

| Name | Type |
| --- | --- |
| _axon | <code>AxonClient</code> | 
| guildConfigs | <code>LRUCache.&lt;GuildConfig&gt;</code> | 


* [GuildConfigsCache](#GuildConfigsCache) ⇐ <code>Store&lt;GuildConfig&gt;</code>
    * [new GuildConfigsCache()](#new_GuildConfigsCache_new)
    * _instance_
        * [.guildConfigs](#GuildConfigsCache+guildConfigs) : <code>LRUCache.&lt;GuildConfig&gt;</code>
        * [.getOrFetch(key)](#GuildConfigsCache+getOrFetch) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>
        * [.fetchGuildConf(gID)](#GuildConfigsCache+fetchGuildConf) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>
    * _static_
        * [.GuildConfigsCache](#GuildConfigsCache.GuildConfigsCache)
            * [new GuildConfigsCache(axonClient)](#new_GuildConfigsCache.GuildConfigsCache_new)

<a name="new_GuildConfigsCache_new"></a>

### new GuildConfigsCache()
Handles GuildConfigs cache.
Can be extended to a redis or memcached cache easily for instance.

<a name="GuildConfigsCache+guildConfigs"></a>

### guildConfigsCache.guildConfigs : <code>LRUCache.&lt;GuildConfig&gt;</code>
Returns the cache

**Kind**: instance property of [<code>GuildConfigsCache</code>](#GuildConfigsCache)  
**Read only**: true  
<a name="GuildConfigsCache+getOrFetch"></a>

### guildConfigsCache.getOrFetch(key) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>
Get a GuildConfig from the cache or from the DB if not in the cache.

**Kind**: instance method of [<code>GuildConfigsCache</code>](#GuildConfigsCache)  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 

<a name="GuildConfigsCache+fetchGuildConf"></a>

### guildConfigsCache.fetchGuildConf(gID) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>
Fetches and resolves the guild config of the given ID from the DB, creates a schema if none was found or there was an error.

**Kind**: instance method of [<code>GuildConfigsCache</code>](#GuildConfigsCache)  
**Returns**: <code>Promise.&lt;(GuildConfig\|null)&gt;</code> - Guild schema from the DB / Error  

| Param | Type | Description |
| --- | --- | --- |
| gID | <code>String</code> | The guild ID to fetch the DB |

<a name="GuildConfigsCache.GuildConfigsCache"></a>

### GuildConfigsCache.GuildConfigsCache
**Kind**: static class of [<code>GuildConfigsCache</code>](#GuildConfigsCache)  
<a name="new_GuildConfigsCache.GuildConfigsCache_new"></a>

#### new GuildConfigsCache(axonClient)
Creates an instance of GuildConfigsCache.


| Param | Type |
| --- | --- |
| axonClient | <code>AxonClient</code> | 

