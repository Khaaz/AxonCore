<a name="CommandPermissions"></a>

## CommandPermissions
**Kind**: global class  
**Author**: KhaaZ  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [bot] | <code>Array</code> | <code>[]</code> | Discord permissions that the bot needs to have in order to execute the command |
| [serverMod] | <code>Boolean</code> | <code>false</code> | Axoncore server moderator |
| [serverManager] | <code>Boolean</code> | <code>false</code> | Discord server manager (manageServer) |
| [serverAdmin] | <code>Boolean</code> | <code>false</code> | Discord server administrator (administrator) |
| [serverOwner] | <code>Boolean</code> | <code>false</code> | Discord server owner |
| [author.needed] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | Discord permissions that the user needs to have in order to execute the command |
| [author.bypass] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | Discord permissions that will allow the user to execute the command no matter what |
| [users.needed] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | Discord user ids that the user needs to have in order to execute the command |
| [users.bypass] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | Discord user ids that will allow the user to execute the command no matter what |
| [roles.needed] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | Discord role ids that the user needs to have in order to execute the command |
| [roles.bypass] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | Discord role ids that will allow the user to execute the command no matter what |
| [channels.needed] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | Discord channel ids that the user needs to have in order to execute the command |
| [channels.bypass] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | Discord channel ids that will allow the user to execute the command no matter what |
| [guilds.needed] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | Discord guild ids that the user needs to have in order to execute the command |
| [guilds.bypass] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | Discord guild ids that will allow the user to execute the command no matter what |
| [staff.needed] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | Axoncore staff ids that the user needs to have in order to execute the command |
| [staff.bypass] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | Axoncore staff ids that will allow the user to execute the command no matter what |
| [custom] | <code>function</code> | <code>()&#x3D;&gt;true</code> | Custom function that returns a boolean. True will let the command execute, False will prevent the command from executing |


* [CommandPermissions](#CommandPermissions)
    * [new CommandPermissions()](#new_CommandPermissions_new)
    * _instance_
        * [.bot](#CommandPermissions+bot) : <code>Array.&lt;String&gt;</code>
        * [.author](#CommandPermissions+author) : <code>Object</code>
        * [.users](#CommandPermissions+users) : <code>Object</code>
        * [.roles](#CommandPermissions+roles) : <code>Object</code>
        * [.channels](#CommandPermissions+channels) : <code>Object</code>
        * [.guilds](#CommandPermissions+guilds) : <code>Object</code>
        * [.staff](#CommandPermissions+staff) : <code>Object</code>
        * [.custom](#CommandPermissions+custom)
        * [.axon](#CommandPermissions+axon) : <code>AxonClient</code>
        * [.utils](#CommandPermissions+utils) : <code>Utils</code>
        * [.axonUtils](#CommandPermissions+axonUtils) : <code>AxonUtils</code>
        * [.library](#CommandPermissions+library) : <code>LibraryInterface</code>
        * [.setBot([array], [toAdd])](#CommandPermissions+setBot) ⇒ <code>[CommandPermissions](Commands/CommandPermissions)</code>
        * [.setServerMod([boolean])](#CommandPermissions+setServerMod) ⇒ <code>[CommandPermissions](Commands/CommandPermissions)</code>
        * [.setServerManager([boolean])](#CommandPermissions+setServerManager) ⇒ <code>[CommandPermissions](Commands/CommandPermissions)</code>
        * [.setServerAdmin([boolean])](#CommandPermissions+setServerAdmin) ⇒ <code>[CommandPermissions](Commands/CommandPermissions)</code>
        * [.setServerOwner([boolean])](#CommandPermissions+setServerOwner) ⇒ <code>[CommandPermissions](Commands/CommandPermissions)</code>
        * [.setAuthor([object], [toAdd])](#CommandPermissions+setAuthor) ⇒ <code>[CommandPermissions](Commands/CommandPermissions)</code>
        * [.setUsers([object], [toAdd])](#CommandPermissions+setUsers) ⇒ <code>[CommandPermissions](Commands/CommandPermissions)</code>
        * [.setRoles([object], [toAdd])](#CommandPermissions+setRoles) ⇒ <code>[CommandPermissions](Commands/CommandPermissions)</code>
        * [.setChannels([object], [toAdd])](#CommandPermissions+setChannels) ⇒ <code>[CommandPermissions](Commands/CommandPermissions)</code>
        * [.setGuilds([object], [toAdd])](#CommandPermissions+setGuilds) ⇒ <code>[CommandPermissions](Commands/CommandPermissions)</code>
        * [.setStaff([object], [toAdd])](#CommandPermissions+setStaff) ⇒ <code>[CommandPermissions](Commands/CommandPermissions)</code>
        * [._checkPermsBot(channel)](#CommandPermissions+_checkPermsBot) ⇒ <code>Boolean</code>
        * [._checkPermsUserBypass(member)](#CommandPermissions+_checkPermsUserBypass) ⇒ <code>Boolean</code>
        * [._checkPermsUserNeeded(member)](#CommandPermissions+_checkPermsUserNeeded) ⇒
        * [._checkUserBypass(member)](#CommandPermissions+_checkUserBypass) ⇒ <code>Boolean</code>
        * [._checkUserNeeded(member)](#CommandPermissions+_checkUserNeeded) ⇒ <code>Boolean</code>
        * [._checkRoleBypass(member)](#CommandPermissions+_checkRoleBypass) ⇒ <code>Boolean</code>
        * [._checkRoleNeeded(member)](#CommandPermissions+_checkRoleNeeded) ⇒ <code>Boolean</code>
        * [._checkChannelBypass(channel)](#CommandPermissions+_checkChannelBypass) ⇒ <code>Boolean</code>
        * [._checkChannelNeeded(channel)](#CommandPermissions+_checkChannelNeeded) ⇒ <code>Boolean</code>
        * [._checkGuildBypass(guild)](#CommandPermissions+_checkGuildBypass) ⇒ <code>Boolean</code>
        * [._checkGuildNeeded(guild)](#CommandPermissions+_checkGuildNeeded) ⇒ <code>Boolean</code>
        * [._checkStaffBypass(member)](#CommandPermissions+_checkStaffBypass) ⇒ <code>Boolean</code>
        * [._checkStaffNeeded(member)](#CommandPermissions+_checkStaffNeeded) ⇒ <code>Boolean</code>
    * _static_
        * [.CommandPermissions](#CommandPermissions.CommandPermissions)
            * [new CommandPermissions(command, [override], [useModuleDefault])](#new_CommandPermissions.CommandPermissions_new)

<a name="new_CommandPermissions_new"></a>

### new CommandPermissions()
CommandPermissions.
Holds permissions for a command and all necessary checkers.

needed => needed to have **ALL** <NEEDED> permissions to execute the command
bypass => needed to have **ONE** <BYPASS> permission to execute the command

<a name="CommandPermissions+bot"></a>

### commandPermissions.bot : <code>Array.&lt;String&gt;</code>
**Kind**: instance property of [<code>CommandPermissions</code>](#CommandPermissions)  
<a name="CommandPermissions+author"></a>

### commandPermissions.author : <code>Object</code>
**Kind**: instance property of [<code>CommandPermissions</code>](#CommandPermissions)  
<a name="CommandPermissions+users"></a>

### commandPermissions.users : <code>Object</code>
**Kind**: instance property of [<code>CommandPermissions</code>](#CommandPermissions)  
<a name="CommandPermissions+roles"></a>

### commandPermissions.roles : <code>Object</code>
**Kind**: instance property of [<code>CommandPermissions</code>](#CommandPermissions)  
<a name="CommandPermissions+channels"></a>

### commandPermissions.channels : <code>Object</code>
**Kind**: instance property of [<code>CommandPermissions</code>](#CommandPermissions)  
<a name="CommandPermissions+guilds"></a>

### commandPermissions.guilds : <code>Object</code>
**Kind**: instance property of [<code>CommandPermissions</code>](#CommandPermissions)  
<a name="CommandPermissions+staff"></a>

### commandPermissions.staff : <code>Object</code>
**Kind**: instance property of [<code>CommandPermissions</code>](#CommandPermissions)  
<a name="CommandPermissions+custom"></a>

### commandPermissions.custom
**Kind**: instance property of [<code>CommandPermissions</code>](#CommandPermissions)  
<a name="CommandPermissions+axon"></a>

### commandPermissions.axon : <code>AxonClient</code>
Returns the AxonClient instance

**Kind**: instance property of [<code>CommandPermissions</code>](#CommandPermissions)  
**Read only**: true  
<a name="CommandPermissions+utils"></a>

### commandPermissions.utils : <code>Utils</code>
Return the Utils instance

**Kind**: instance property of [<code>CommandPermissions</code>](#CommandPermissions)  
**Read only**: true  
<a name="CommandPermissions+axonUtils"></a>

### commandPermissions.axonUtils : <code>AxonUtils</code>
Returns the AxonUtils instance

**Kind**: instance property of [<code>CommandPermissions</code>](#CommandPermissions)  
**Read only**: true  
<a name="CommandPermissions+library"></a>

### commandPermissions.library : <code>LibraryInterface</code>
Returns the LibraryInterface instance

**Kind**: instance property of [<code>CommandPermissions</code>](#CommandPermissions)  
**Read only**: true  
<a name="CommandPermissions+setBot"></a>

### commandPermissions.setBot([array], [toAdd]) ⇒ <code>[CommandPermissions](Commands/CommandPermissions)</code>
Set the permissions the bot needs to have to execute this command.

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [array] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | Array of permissions |
| [toAdd] | <code>Boolean</code> | <code>false</code> | Whether to add the permissions to the existing permissions |

<a name="CommandPermissions+setServerMod"></a>

### commandPermissions.setServerMod([boolean]) ⇒ <code>[CommandPermissions](Commands/CommandPermissions)</code>
Set/unset the command to serverMod only.

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [boolean] | <code>Boolean</code> | <code>true</code> | Whether to make the command serverMod only |

<a name="CommandPermissions+setServerManager"></a>

### commandPermissions.setServerManager([boolean]) ⇒ <code>[CommandPermissions](Commands/CommandPermissions)</code>
Set/unset the command to serverManager only.

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [boolean] | <code>Boolean</code> | <code>true</code> | Whether to make the command serverManager only |

<a name="CommandPermissions+setServerAdmin"></a>

### commandPermissions.setServerAdmin([boolean]) ⇒ <code>[CommandPermissions](Commands/CommandPermissions)</code>
Set/unset the command to serverAdmin only.

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [boolean] | <code>Boolean</code> | <code>true</code> | Whether to make the command serverAdmin only |

<a name="CommandPermissions+setServerOwner"></a>

### commandPermissions.setServerOwner([boolean]) ⇒ <code>[CommandPermissions](Commands/CommandPermissions)</code>
Set/unset the command to serverOwner only.

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [boolean] | <code>Boolean</code> | <code>true</code> | Whether to make the command serverOwner only |

<a name="CommandPermissions+setAuthor"></a>

### commandPermissions.setAuthor([object], [toAdd]) ⇒ <code>[CommandPermissions](Commands/CommandPermissions)</code>
Set the permissions the user needs to have to execute this command.

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [object] | <code>Object</code> | <code>{ bypass: [], needed: [] }</code> | Object of permissions |
| [toAdd] | <code>Boolean</code> | <code>false</code> | Whether to add the permissions to the existing permissions |

<a name="CommandPermissions+setUsers"></a>

### commandPermissions.setUsers([object], [toAdd]) ⇒ <code>[CommandPermissions](Commands/CommandPermissions)</code>
Set the user IDs the user needs to have to execute this command.

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [object] | <code>Object</code> | <code>{ bypass: [], needed: [] }</code> | Object of permissions |
| [toAdd] | <code>Boolean</code> | <code>false</code> | Whether to add the permissions to the existing permissions |

<a name="CommandPermissions+setRoles"></a>

### commandPermissions.setRoles([object], [toAdd]) ⇒ <code>[CommandPermissions](Commands/CommandPermissions)</code>
Set the role IDs the user needs to have to execute this command.

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [object] | <code>Object</code> | <code>{ bypass: [], needed: [] }</code> | Object of permissions |
| [toAdd] | <code>Boolean</code> | <code>false</code> | Whether to add the permissions to the existing permissions |

<a name="CommandPermissions+setChannels"></a>

### commandPermissions.setChannels([object], [toAdd]) ⇒ <code>[CommandPermissions](Commands/CommandPermissions)</code>
Set the channel IDs needed to be in to execute this command.

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [object] | <code>Object</code> | <code>{ bypass: [], needed: [] }</code> | Object of permissions |
| [toAdd] | <code>Boolean</code> | <code>false</code> | Whether to add the permissions to the existing permissions |

<a name="CommandPermissions+setGuilds"></a>

### commandPermissions.setGuilds([object], [toAdd]) ⇒ <code>[CommandPermissions](Commands/CommandPermissions)</code>
Set the guild IDs needed to be in to execute this command.

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [object] | <code>Object</code> | <code>{ bypass: [], needed: [] }</code> | Object of permissions |
| [toAdd] | <code>Boolean</code> | <code>false</code> | Whether to add the permissions to the existing permissions |

<a name="CommandPermissions+setStaff"></a>

### commandPermissions.setStaff([object], [toAdd]) ⇒ <code>[CommandPermissions](Commands/CommandPermissions)</code>
Set the AxonCore staff members that can execute this command.

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [object] | <code>Object</code> | <code>{ bypass: [], needed: [] }</code> | Object of permissions |
| [toAdd] | <code>Boolean</code> | <code>false</code> | Whether to add the permissions to the existing permissions |

<a name="CommandPermissions+_checkPermsBot"></a>

### commandPermissions.\_checkPermsBot(channel) ⇒ <code>Boolean</code>
Check bot permission

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type |
| --- | --- |
| channel | <code>Channel</code> | 

<a name="CommandPermissions+_checkPermsUserBypass"></a>

### commandPermissions.\_checkPermsUserBypass(member) ⇒ <code>Boolean</code>
Check user permissions [bypass]

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type |
| --- | --- |
| member | <code>Member</code> | 

<a name="CommandPermissions+_checkPermsUserNeeded"></a>

### commandPermissions.\_checkPermsUserNeeded(member) ⇒
Check user permissions [needed]

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type |
| --- | --- |
| member | <code>Member</code> | 

<a name="CommandPermissions+_checkUserBypass"></a>

### commandPermissions.\_checkUserBypass(member) ⇒ <code>Boolean</code>
Check userIDs [bypass]

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type |
| --- | --- |
| member | <code>Member</code> | 

<a name="CommandPermissions+_checkUserNeeded"></a>

### commandPermissions.\_checkUserNeeded(member) ⇒ <code>Boolean</code>
Check userIDs [needed]

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type |
| --- | --- |
| member | <code>Member</code> | 

<a name="CommandPermissions+_checkRoleBypass"></a>

### commandPermissions.\_checkRoleBypass(member) ⇒ <code>Boolean</code>
Check roleIDs [bypass]

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type |
| --- | --- |
| member | <code>Member</code> | 

<a name="CommandPermissions+_checkRoleNeeded"></a>

### commandPermissions.\_checkRoleNeeded(member) ⇒ <code>Boolean</code>
Check roleIDs [needed]

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type |
| --- | --- |
| member | <code>Member</code> | 

<a name="CommandPermissions+_checkChannelBypass"></a>

### commandPermissions.\_checkChannelBypass(channel) ⇒ <code>Boolean</code>
Check channelIDs [bypass]

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type |
| --- | --- |
| channel | <code>Channel</code> | 

<a name="CommandPermissions+_checkChannelNeeded"></a>

### commandPermissions.\_checkChannelNeeded(channel) ⇒ <code>Boolean</code>
Check channelIDs [needed]

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type |
| --- | --- |
| channel | <code>Channel</code> | 

<a name="CommandPermissions+_checkGuildBypass"></a>

### commandPermissions.\_checkGuildBypass(guild) ⇒ <code>Boolean</code>
Check guildIDs [bypass]

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type |
| --- | --- |
| guild | <code>Guild</code> | 

<a name="CommandPermissions+_checkGuildNeeded"></a>

### commandPermissions.\_checkGuildNeeded(guild) ⇒ <code>Boolean</code>
Check guildIDs [needed]

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type |
| --- | --- |
| guild | <code>Guild</code> | 

<a name="CommandPermissions+_checkStaffBypass"></a>

### commandPermissions.\_checkStaffBypass(member) ⇒ <code>Boolean</code>
Check if the user is bot staff [bypass]

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  
**Returns**: <code>Boolean</code> - True if Staff / False if not  

| Param | Type |
| --- | --- |
| member | <code>Member</code> | 

<a name="CommandPermissions+_checkStaffNeeded"></a>

### commandPermissions.\_checkStaffNeeded(member) ⇒ <code>Boolean</code>
Check if the user is bot staff [needed]

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  
**Returns**: <code>Boolean</code> - True if Staff / False if not  

| Param | Type |
| --- | --- |
| member | <code>Member</code> | 

<a name="CommandPermissions.CommandPermissions"></a>

### CommandPermissions.CommandPermissions
**Kind**: static class of [<code>CommandPermissions</code>](#CommandPermissions)  
<a name="new_CommandPermissions.CommandPermissions_new"></a>

#### new CommandPermissions(command, [override], [useModuleDefault])
Creates an instance of CommandPermissions.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| command | <code>[Command](Commands/Command)</code> \| <code>[Module](Modules/Module)</code> |  | The base command/module |
| [override] | <code>CommandPerms</code> | <code>{}</code> | The specific permissions for this command/module (format - CommandPermissions) |
| [useModuleDefault] | <code>Boolean</code> | <code>false</code> | Whether to use or not the module's base permissions before applying override permissions |

