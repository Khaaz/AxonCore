<a name="GuildConfig"></a>

## GuildConfig
**Kind**: global class  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| guildID | <code>String</code> |  |
| prefixes | <code>Array.&lt;String&gt;</code> |  |
| modules | <code>Array.&lt;String&gt;</code> | Guild disabled modules: Array of modules labels |
| commands | <code>Array.&lt;String&gt;</code> | Guild disabled commands: Array of commands labels |
| listeners | <code>Array.&lt;String&gt;</code> | Guild disabled listeners: Array of listeners labels |
| createdAt | <code>Date</code> | Creation of the guild Config |
| updatedAt | <code>date</code> | Last update of the guild Config |
| ignoredUsers | <code>Array.&lt;String&gt;</code> | Users that cannot use commands in this guild: Users ids |
| ignoredRoles | <code>Array.&lt;String&gt;</code> | Roles that cannot use commmands in this guild: Roles ids |
| ignoredChannels | <code>Array.&lt;String&gt;</code> | Channels where commands cannot be used in this guild: Channels ids |
| modOnly | <code>Boolean</code> | Whether the guild accept commands from only mods+ or everyone |
| modRoles | <code>Array.&lt;String&gt;</code> | Roles able to execute mod commands: Roles ids |
| modUsers | <code>Array.&lt;String&gt;</code> | Users able to execute mod commands: Users ids |


* [GuildConfig](#GuildConfig)
    * [new GuildConfig()](#new_GuildConfig_new)
    * _instance_
        * [.getPrefixes()](#GuildConfig+getPrefixes) ⇒ <code>Array.&lt;String&gt;</code>
        * [.isIgnored(msg)](#GuildConfig+isIgnored) ⇒ <code>Boolean</code>
        * [.isUserIgnored(userID)](#GuildConfig+isUserIgnored) ⇒ <code>Boolean</code>
        * [.isRoleIgnored(member)](#GuildConfig+isRoleIgnored) ⇒ <code>Boolean</code>
        * [.isChannelIgnored(channelID)](#GuildConfig+isChannelIgnored) ⇒ <code>Boolean</code>
        * [.isModuleDisabled(command)](#GuildConfig+isModuleDisabled) ⇒ <code>Boolean</code>
        * [.isCommandDisabled(command)](#GuildConfig+isCommandDisabled) ⇒ <code>Boolean</code>
        * [.isListenerDisabled(listener)](#GuildConfig+isListenerDisabled) ⇒ <code>Boolean</code>
        * [.isModOnly()](#GuildConfig+isModOnly) ⇒ <code>Boolean</code>
        * [.isModRole(roleID)](#GuildConfig+isModRole) ⇒ <code>Boolean</code>
        * [.isModUser(userID)](#GuildConfig+isModUser) ⇒ <code>Boolean</code>
        * [.update(guildConfig)](#GuildConfig+update) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.updatePrefixes(prefixArr)](#GuildConfig+updatePrefixes) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>
        * [.updateStateModule(label, [boolean])](#GuildConfig+updateStateModule) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>
        * [.updateStateCommand(label, [boolean])](#GuildConfig+updateStateCommand) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>
        * [.updateStateListener(label, [boolean])](#GuildConfig+updateStateListener) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>
        * [.updateStateModRole(roleID, [boolean])](#GuildConfig+updateStateModRole) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>
        * [.updateStateModUser(userID, [boolean])](#GuildConfig+updateStateModUser) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>
    * _static_
        * [.GuildConfig](#GuildConfig.GuildConfig)
            * [new GuildConfig(axon, values)](#new_GuildConfig.GuildConfig_new)

<a name="new_GuildConfig_new"></a>

### new GuildConfig()
Default GuildConfig data structure used in AxonCore.
This class can be extended and changed as you want.
All methods flagged with "is used internally" can be overriden but need to keep the same name.

<a name="GuildConfig+getPrefixes"></a>

### guildConfig.getPrefixes() ⇒ <code>Array.&lt;String&gt;</code>
Get guild prefixes for this guild.

**Kind**: instance method of [<code>GuildConfig</code>](#GuildConfig)  
<a name="GuildConfig+isIgnored"></a>

### guildConfig.isIgnored(msg) ⇒ <code>Boolean</code>
Check if the user/role/channel is ignored on the specified guild.
*used internally*

**Kind**: instance method of [<code>GuildConfig</code>](#GuildConfig)  
**Returns**: <code>Boolean</code> - True if either one of the three is ignored  

| Param | Type |
| --- | --- |
| msg | <code>Message</code> | 

<a name="GuildConfig+isUserIgnored"></a>

### guildConfig.isUserIgnored(userID) ⇒ <code>Boolean</code>
Check if the user/role/channel is ignored on the specified guild.

**Kind**: instance method of [<code>GuildConfig</code>](#GuildConfig)  
**Returns**: <code>Boolean</code> - True if the user is one ofthe ignored users  

| Param | Type |
| --- | --- |
| userID | <code>String</code> | 

<a name="GuildConfig+isRoleIgnored"></a>

### guildConfig.isRoleIgnored(member) ⇒ <code>Boolean</code>
Check if the user/role/channel is ignored on the specified guild.

**Kind**: instance method of [<code>GuildConfig</code>](#GuildConfig)  
**Returns**: <code>Boolean</code> - True if the member has one of the ignored roles  

| Param | Type |
| --- | --- |
| member | <code>Member</code> | 

<a name="GuildConfig+isChannelIgnored"></a>

### guildConfig.isChannelIgnored(channelID) ⇒ <code>Boolean</code>
Check if the user/role/channel is ignored on the specified guild.

**Kind**: instance method of [<code>GuildConfig</code>](#GuildConfig)  
**Returns**: <code>Boolean</code> - True if the channel is one of the ignored channels  

| Param | Type |
| --- | --- |
| channelID | <code>String</code> | 

<a name="GuildConfig+isModuleDisabled"></a>

### guildConfig.isModuleDisabled(command) ⇒ <code>Boolean</code>
Check if the module is disabled on the specified guild.
*used internally*

**Kind**: instance method of [<code>GuildConfig</code>](#GuildConfig)  
**Returns**: <code>Boolean</code> - Whether the module is disabled or not  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>Command</code> | The command object |

<a name="GuildConfig+isCommandDisabled"></a>

### guildConfig.isCommandDisabled(command) ⇒ <code>Boolean</code>
Check if the command is disabled on the specified guild.
*used internally*

**Kind**: instance method of [<code>GuildConfig</code>](#GuildConfig)  
**Returns**: <code>Boolean</code> - Whether the command is disabled or not  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>Command</code> | The command object |

<a name="GuildConfig+isListenerDisabled"></a>

### guildConfig.isListenerDisabled(listener) ⇒ <code>Boolean</code>
Check if the listener is disabled on the specified guild.
*used internally*

**Kind**: instance method of [<code>GuildConfig</code>](#GuildConfig)  
**Returns**: <code>Boolean</code> - Whether the listener is disabled or not  

| Param | Type | Description |
| --- | --- | --- |
| listener | <code>Listener</code> | The listener object |

<a name="GuildConfig+isModOnly"></a>

### guildConfig.isModOnly() ⇒ <code>Boolean</code>
Whether the guild is set up to mod only or not.
*used internally*

**Kind**: instance method of [<code>GuildConfig</code>](#GuildConfig)  
<a name="GuildConfig+isModRole"></a>

### guildConfig.isModRole(roleID) ⇒ <code>Boolean</code>
Whether the role ID is in the guild mod roles.
*used internally*

**Kind**: instance method of [<code>GuildConfig</code>](#GuildConfig)  

| Param | Type |
| --- | --- |
| roleID | <code>String</code> | 

<a name="GuildConfig+isModUser"></a>

### guildConfig.isModUser(userID) ⇒ <code>Boolean</code>
Whether the user ID is in the guild mod users.
*used internally*

**Kind**: instance method of [<code>GuildConfig</code>](#GuildConfig)  

| Param | Type |
| --- | --- |
| userID | <code>String</code> | 

<a name="GuildConfig+update"></a>

### guildConfig.update(guildConfig) ⇒ <code>Promise.&lt;Object&gt;</code>
Update the guild config in the cache and DB.
*not used internally*

**Kind**: instance method of [<code>GuildConfig</code>](#GuildConfig)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Updated guildSchema  

| Param | Type | Description |
| --- | --- | --- |
| guildConfig | <code>Object</code> | Guild schema Object |

<a name="GuildConfig+updatePrefixes"></a>

### guildConfig.updatePrefixes(prefixArr) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>
Register prefixes for this guild.
*not used internally*

**Kind**: instance method of [<code>GuildConfig</code>](#GuildConfig)  
**Returns**: <code>Promise.&lt;(GuildConfig\|null)&gt;</code> - Updated guildConfig / error  

| Param | Type | Description |
| --- | --- | --- |
| prefixArr | <code>Array.&lt;String&gt;</code> | The array of prefix |

<a name="GuildConfig+updateStateModule"></a>

### guildConfig.updateStateModule(label, [boolean]) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>
Updates the state of a module.
true = disable the module, false = enable the module
*not used internally*

**Kind**: instance method of [<code>GuildConfig</code>](#GuildConfig)  
**Returns**: <code>Promise.&lt;(GuildConfig\|null)&gt;</code> - Updated guildConfig / Error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| label | <code>String</code> |  | The module label |
| [boolean] | <code>Boolean</code> | <code>true</code> | Whether to enable (true) the module or disable (false) it. |

<a name="GuildConfig+updateStateCommand"></a>

### guildConfig.updateStateCommand(label, [boolean]) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>
Updates the state of a command.
true = disable the command, false = enable the command.
*not used internally*

**Kind**: instance method of [<code>GuildConfig</code>](#GuildConfig)  
**Returns**: <code>Promise.&lt;(GuildConfig\|null)&gt;</code> - Updated guildConfig / Error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| label | <code>String</code> |  | The command label |
| [boolean] | <code>Boolean</code> | <code>true</code> | Whether to enable (true) the command or disable (false) it. |

<a name="GuildConfig+updateStateListener"></a>

### guildConfig.updateStateListener(label, [boolean]) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>
Updates the state of a listener.
true = disable the listener, false = enable the listener.
*not used internally*

**Kind**: instance method of [<code>GuildConfig</code>](#GuildConfig)  
**Returns**: <code>Promise.&lt;(GuildConfig\|null)&gt;</code> - Updated guildConfig / Error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| label | <code>String</code> |  | The listener label |
| [boolean] | <code>Boolean</code> | <code>true</code> | Whether to enable (true) the listener or disable (false) it. |

<a name="GuildConfig+updateStateModRole"></a>

### guildConfig.updateStateModRole(roleID, [boolean]) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>
Updates the state of a mod role.
true = add the role, false = remove the role.
*not used internally*

**Kind**: instance method of [<code>GuildConfig</code>](#GuildConfig)  
**Returns**: <code>Promise.&lt;(GuildConfig\|null)&gt;</code> - Updated guildConfig / Error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| roleID | <code>String</code> |  | The role ID |
| [boolean] | <code>Boolean</code> | <code>true</code> | Whether to add (true) the role or remove (false) it. |

<a name="GuildConfig+updateStateModUser"></a>

### guildConfig.updateStateModUser(userID, [boolean]) ⇒ <code>Promise.&lt;(GuildConfig\|null)&gt;</code>
Updates the state of a mod user.
true = add the user, false = remove the user.
*not used internally*

**Kind**: instance method of [<code>GuildConfig</code>](#GuildConfig)  
**Returns**: <code>Promise.&lt;(GuildConfig\|null)&gt;</code> - Updated guildConfig / Error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| userID | <code>String</code> |  | The user ID |
| [boolean] | <code>Boolean</code> | <code>true</code> | Whether to add (true) the user or remove (false) it. |

<a name="GuildConfig.GuildConfig"></a>

### GuildConfig.GuildConfig
**Kind**: static class of [<code>GuildConfig</code>](#GuildConfig)  
<a name="new_GuildConfig.GuildConfig_new"></a>

#### new GuildConfig(axon, values)
Creates an instance of GuildConfig.


| Param | Type | Description |
| --- | --- | --- |
| axon | <code>AxonClient</code> |  |
| values | <code>Object</code> | DB values for the current guild |

