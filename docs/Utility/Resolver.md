<a name="Resolver"></a>

## .Resolver
**Kind**: static class  
**Author**: KhaaZ  

* [.Resolver](#Resolver)
    * [new Resolver()](#new_Resolver_new)
    * [.user(client, args)](#Resolver.user) ⇒ <code>User</code> \| <code>null</code>
    * [.member(guild, args)](#Resolver.member) ⇒ <code>Member</code> \| <code>null</code>
    * [.role(guild, args)](#Resolver.role) ⇒ <code>Role</code> \| <code>null</code>
    * [.channel(guild, args)](#Resolver.channel) ⇒ <code>Channel</code> \| <code>null</code>
    * [.guild(client, args)](#Resolver.guild) ⇒ <code>Guild</code> \| <code>null</code>

<a name="new_Resolver_new"></a>

### new Resolver()
Static Resolver class for AxonCore

<a name="Resolver.user"></a>

### Resolver.user(client, args) ⇒ <code>User</code> \| <code>null</code>
Resolve a user within all the users the bot has.

**Kind**: static method of [<code>Resolver</code>](#Resolver)  
**Returns**: <code>User</code> \| <code>null</code> - The user object / Null if not found / Error  

| Param | Type | Description |
| --- | --- | --- |
| client | <code>BotClient</code> | The bot client |
| args | <code>Array.&lt;String&gt;</code> \| <code>String</code> | Array of arguments resolved by the command. |

<a name="Resolver.member"></a>

### Resolver.member(guild, args) ⇒ <code>Member</code> \| <code>null</code>
Resolve a member within a guild.

**Kind**: static method of [<code>Resolver</code>](#Resolver)  
**Returns**: <code>Member</code> \| <code>null</code> - The member object / Null if not found / Error  

| Param | Type | Description |
| --- | --- | --- |
| guild | <code>Guild</code> | Object Guild resolved by the command. |
| args | <code>Array.&lt;String&gt;</code> \| <code>String</code> | Array of arguments resolved by the command. |

<a name="Resolver.role"></a>

### Resolver.role(guild, args) ⇒ <code>Role</code> \| <code>null</code>
Resolve a role within a guild.

**Kind**: static method of [<code>Resolver</code>](#Resolver)  
**Returns**: <code>Role</code> \| <code>null</code> - The role object / Null if not found / Error  

| Param | Type | Description |
| --- | --- | --- |
| guild | <code>Guild</code> | Object Guild resolved by the command. |
| args | <code>Array.&lt;String&gt;</code> \| <code>String</code> | Array of arguments resolved by the command. |

<a name="Resolver.channel"></a>

### Resolver.channel(guild, args) ⇒ <code>Channel</code> \| <code>null</code>
Resolve a channel within a guild.

**Kind**: static method of [<code>Resolver</code>](#Resolver)  
**Returns**: <code>Channel</code> \| <code>null</code> - The channel object / Null if not found / Error  

| Param | Type | Description |
| --- | --- | --- |
| guild | <code>Guild</code> | Object Guild resolved by the command. |
| args | <code>Array.&lt;String&gt;</code> \| <code>String</code> | Array of arguments resolved by the command. |

<a name="Resolver.guild"></a>

### Resolver.guild(client, args) ⇒ <code>Guild</code> \| <code>null</code>
Resolve a guild within all guilds the bot is in.

**Kind**: static method of [<code>Resolver</code>](#Resolver)  
**Returns**: <code>Guild</code> \| <code>null</code> - The guild object / Null if not found / Error  

| Param | Type | Description |
| --- | --- | --- |
| client | <code>BotClient</code> | The bot client |
| args | <code>Array.&lt;String&gt;</code> | Array with guild name/ID |

