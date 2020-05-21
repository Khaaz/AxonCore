<a name="AxonConfig"></a>

## AxonConfig
**Kind**: global class  
**Author**: KhaaZ  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>String</code> |  |  |
| prefix | <code>String</code> |  |  |
| createdAt | <code>Date</code> |  |  |
| updatedAt | <code>Date</code> |  |  |
| [bannedUsers] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | Array of users that can't use bot commands |
| [bannedGuilds] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | Array of guilds where bot commands cannot be used |


* [AxonConfig](#AxonConfig)
    * [new AxonConfig()](#new_AxonConfig_new)
    * _instance_
        * [.bannedUsers](#AxonConfig+bannedUsers) : <code>Array.&lt;String&gt;</code>
        * [.bannedGuilds](#AxonConfig+bannedGuilds) : <code>Array.&lt;String&gt;</code>
        * [.isBlacklistedUser(userID)](#AxonConfig+isBlacklistedUser) ⇒ <code>Boolean</code>
        * [.isBlacklistedGuild(guildID)](#AxonConfig+isBlacklistedGuild) ⇒ <code>Boolean</code>
        * [.updateBlacklistUser(userID, [boolean])](#AxonConfig+updateBlacklistUser) ⇒ <code>Promise.&lt;([AxonConfig](Core/AxonConfig)\|null)&gt;</code>
        * [.updateBlacklistGuild(guildID, [boolean])](#AxonConfig+updateBlacklistGuild) ⇒ <code>Promise.&lt;([AxonConfig](Core/AxonConfig)\|null)&gt;</code>
    * _static_
        * [.AxonConfig](#AxonConfig.AxonConfig)
            * [new AxonConfig(axon, values)](#new_AxonConfig.AxonConfig_new)

<a name="new_AxonConfig_new"></a>

### new AxonConfig()
Default AxonConfig data structure used in AxonCore.
This class can be extended and changed as you want.
All methods flagged with "is used internally" can be overridden but need to keep the same name.

<a name="AxonConfig+bannedUsers"></a>

### axonConfig.bannedUsers : <code>Array.&lt;String&gt;</code>
**Kind**: instance property of [<code>AxonConfig</code>](#AxonConfig)  
<a name="AxonConfig+bannedGuilds"></a>

### axonConfig.bannedGuilds : <code>Array.&lt;String&gt;</code>
**Kind**: instance property of [<code>AxonConfig</code>](#AxonConfig)  
<a name="AxonConfig+isBlacklistedUser"></a>

### axonConfig.isBlacklistedUser(userID) ⇒ <code>Boolean</code>
Whether the user is blacklisted or not
*used internally*

**Kind**: instance method of [<code>AxonConfig</code>](#AxonConfig)  

| Param | Type |
| --- | --- |
| userID | <code>String</code> | 

<a name="AxonConfig+isBlacklistedGuild"></a>

### axonConfig.isBlacklistedGuild(guildID) ⇒ <code>Boolean</code>
Whether the guild is blacklisted or not
*used internally*

**Kind**: instance method of [<code>AxonConfig</code>](#AxonConfig)  

| Param | Type |
| --- | --- |
| guildID | <code>String</code> | 

<a name="AxonConfig+updateBlacklistUser"></a>

### axonConfig.updateBlacklistUser(userID, [boolean]) ⇒ <code>Promise.&lt;([AxonConfig](Core/AxonConfig)\|null)&gt;</code>
Updates the state of a blacklisted user.
true = add the user, false = remove the user.
*not used internally*

**Kind**: instance method of [<code>AxonConfig</code>](#AxonConfig)  
**Returns**: <code>Promise.&lt;([AxonConfig](Core/AxonConfig)\|null)&gt;</code> - Updated axonConfig / Error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| userID | <code>String</code> |  | The guild ID |
| [boolean] | <code>Boolean</code> | <code>true</code> | Whether to add (true) the user or remove (false) it. |

<a name="AxonConfig+updateBlacklistGuild"></a>

### axonConfig.updateBlacklistGuild(guildID, [boolean]) ⇒ <code>Promise.&lt;([AxonConfig](Core/AxonConfig)\|null)&gt;</code>
Updates the state of a blacklisted guild.
true = add the guild, false = remove the guild.
*not used internally*

**Kind**: instance method of [<code>AxonConfig</code>](#AxonConfig)  
**Returns**: <code>Promise.&lt;([AxonConfig](Core/AxonConfig)\|null)&gt;</code> - Updated axonConfig / Error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| guildID | <code>String</code> |  | The guild ID |
| [boolean] | <code>Boolean</code> | <code>true</code> | Whether to add (true) the guild or remove (false) it. |

<a name="AxonConfig.AxonConfig"></a>

### AxonConfig.AxonConfig
**Kind**: static class of [<code>AxonConfig</code>](#AxonConfig)  
<a name="new_AxonConfig.AxonConfig_new"></a>

#### new AxonConfig(axon, values)
Creates an instance of AxonConfig.


| Param | Type | Description |
| --- | --- | --- |
| axon | <code>[AxonClient](AxonClient)</code> |  |
| values | <code>AConfig</code> | DB values for the current Guild |

