<a name="Resolver"></a>

## Resolver
**Kind**: static class  
**Author**: KhaaZ  

[Resolver](#Resolver)
- _static_
    - [user(client, args)](#user) ⇒ <code>Object</code> \| <code>null</code>
    - [member(guild, args)](#member) ⇒ <code>Object</code> \| <code>null</code>
    - [role(guild, args)](#role) ⇒ <code>Object</code> \| <code>null</code>
    - [channel(guild, args)](#channel) ⇒ <code>Object</code> \| <code>null</code>
    - [guild(client, args)](#guild) ⇒ <code>Object</code> \| <code>null</code>

<a id="user"></a>

### user(client, args) ⇒ <code>Object</code> \| <code>null</code>
Resolve a user within all the users the bot has.  

**Kind**: static method of [<code>Resolver</code>](#Resolver)  
**Returns**: <code>Object</code> \| <code>null</code> - The user object / Null if not found / Error  

| Param | Type | Description |
| --- | --- | --- |
| client | <code>Object.&lt;Eris.Client&gt;</code> | The bot client |
| args | <code>Array/String</code> | Array of arguments resolved by the command. |

<a id="member"></a>

### member(guild, args) ⇒ <code>Object</code> \| <code>null</code>
Resolve a member within a guild.  

**Kind**: static method of [<code>Resolver</code>](#Resolver)  
**Returns**: <code>Object</code> \| <code>null</code> - The member object / Null if not found / Error  

| Param | Type | Description |
| --- | --- | --- |
| guild | <code>Object.&lt;Guild&gt;</code> | Object Guild resolved by the command. |
| args | <code>Array/String</code> | Array of arguments resolved by the command. |

<a id="role"></a>

### role(guild, args) ⇒ <code>Object</code> \| <code>null</code>
Resolve a role within a guild.  

**Kind**: static method of [<code>Resolver</code>](#Resolver)  
**Returns**: <code>Object</code> \| <code>null</code> - The role object / Null if not found / Error  

| Param | Type | Description |
| --- | --- | --- |
| guild | <code>Object.&lt;Guild&gt;</code> | Object Guild resolved by the command. |
| args | <code>Array/String</code> | Array of arguments resolved by the command. |

<a id="channel"></a>

### channel(guild, args) ⇒ <code>Object</code> \| <code>null</code>
Resolve a channel within a guild.  

**Kind**: static method of [<code>Resolver</code>](#Resolver)  
**Returns**: <code>Object</code> \| <code>null</code> - The channel object / Null if not found / Error  

| Param | Type | Description |
| --- | --- | --- |
| guild | <code>Object.&lt;Guild&gt;</code> | Object Guild resolved by the command. |
| args | <code>Array/String</code> | Array of arguments resolved by the command. |

<a id="guild"></a>

### guild(client, args) ⇒ <code>Object</code> \| <code>null</code>
Resolve a guild within all guilds the bot is in.  

**Kind**: static method of [<code>Resolver</code>](#Resolver)  
**Returns**: <code>Object</code> \| <code>null</code> - The guild object / Null if not found / Error  

| Param | Type | Description |
| --- | --- | --- |
| client | <code>Object.&lt;Eris.Client&gt;</code> | The bot client |
| args | <code>Array</code> | Array with guild name/ID |

