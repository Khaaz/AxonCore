<a name="CommandPermissions"></a>

## CommandPermissions
**Kind**: global class  
**Author**: KhaaZ  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [bot] | <code>Array</code> | <code>[]</code> | Discord permissions that the bot needs to have in orderto execute the command |
| [serverMod] | <code>Boolean</code> | <code>false</code> | Axoncore server moderator |
| [serverManager] | <code>Boolean</code> | <code>false</code> | Discord server manager (manageServer) |
| [serverAdmin] | <code>Boolean</code> | <code>false</code> | Discord server administrator (administrator) |
| [serverOwner] | <code>Boolean</code> | <code>false</code> | Discord server owner |
| [user.needed] | <code>Array</code> | <code>[]</code> | Discord permissions that the user needs to have in order to execute the command |
| [user.bypass] | <code>Array</code> | <code>[]</code> | Discord permissions that will allow the user to execute the command no matter what |
| [userIDs.needed] | <code>Array</code> | <code>[]</code> | Discord user ids that the user needs to have in order to execute the command |
| [userIDs.bypass] | <code>Array</code> | <code>[]</code> | Discord user ids that will allow the user to execute the command no matter what |
| [roleIDs.needed] | <code>Array</code> | <code>[]</code> | Discord role ids that the user needs to have in order to execute the command |
| [roleIDs.bypass] | <code>Array</code> | <code>[]</code> | Discord role ids that will allow the user to execute the command no matter what |
| [channelIDs.needed] | <code>Array</code> | <code>[]</code> | Discord channel ids that the user needs to have in order to execute the command |
| [channelIDs.bypass] | <code>Array</code> | <code>[]</code> | Discord channel ids that will allow the user to execute the command no matter what |
| [staff.needed] | <code>Array</code> | <code>[]</code> | Axoncore staff ids that the user needs to have in order to execute the command |
| [staff.bypass] | <code>Array</code> | <code>[]</code> | Axoncore staff ids that will allow the user to execute the command no matter what |
| [custom] | <code>function</code> | <code>()&#x3D;&gt;true</code> | Custom function that returns a boolean. True will let the command execute, False will prevent the command from executing |


* [CommandPermissions](#CommandPermissions)
    * [new CommandPermissions()](#new_CommandPermissions_new)
    * _instance_
        * [.axon](#CommandPermissions+axon) : <code>Object.&lt;AxonClient&gt;</code>
        * [.utils](#CommandPermissions+utils) : <code>Object.&lt;Utils&gt;</code>
        * [.axonUtils](#CommandPermissions+axonUtils) : <code>Object.&lt;AxonUtils&gt;</code>
        * [.library](#CommandPermissions+library) : <code>Object.&lt;LibraryInterface&gt;</code>
        * [.setBot([array], [toAdd])](#CommandPermissions+setBot) ⇒ [<code>CommandPermissions</code>](#CommandPermissions)
        * [.setServerMod([boolean])](#CommandPermissions+setServerMod) ⇒ [<code>CommandPermissions</code>](#CommandPermissions)
        * [.setServerManager([boolean])](#CommandPermissions+setServerManager) ⇒ [<code>CommandPermissions</code>](#CommandPermissions)
        * [.setServerAdmin([boolean])](#CommandPermissions+setServerAdmin) ⇒ [<code>CommandPermissions</code>](#CommandPermissions)
        * [.setServerOwner([boolean])](#CommandPermissions+setServerOwner) ⇒ [<code>CommandPermissions</code>](#CommandPermissions)
        * [.setUser([object], [toAdd])](#CommandPermissions+setUser) ⇒ [<code>CommandPermissions</code>](#CommandPermissions)
        * [.setUserIDs([object], [toAdd])](#CommandPermissions+setUserIDs) ⇒ [<code>CommandPermissions</code>](#CommandPermissions)
        * [.setRoleIDs([object], [toAdd])](#CommandPermissions+setRoleIDs) ⇒ [<code>CommandPermissions</code>](#CommandPermissions)
        * [.setChannelIDs([object], [toAdd])](#CommandPermissions+setChannelIDs) ⇒ [<code>CommandPermissions</code>](#CommandPermissions)
        * [.setStaff([object], [toAdd])](#CommandPermissions+setStaff) ⇒ [<code>CommandPermissions</code>](#CommandPermissions)
        * [._checkPermsBot(channel)](#CommandPermissions+_checkPermsBot) ⇒ <code>Boolean</code>
        * [._checkPermsUserBypass(member)](#CommandPermissions+_checkPermsUserBypass) ⇒ <code>Boolean</code>
        * [._checkPermsUserNeeded(member)](#CommandPermissions+_checkPermsUserNeeded) ⇒ <code>Boolean</code>
        * [._checkUserBypass(member)](#CommandPermissions+_checkUserBypass) ⇒ <code>Boolean</code>
        * [._checkUserNeeded(member)](#CommandPermissions+_checkUserNeeded) ⇒ <code>Boolean</code>
        * [._checkRoleBypass(member)](#CommandPermissions+_checkRoleBypass) ⇒ <code>Boolean</code>
        * [._checkRoleNeeded(member)](#CommandPermissions+_checkRoleNeeded) ⇒ <code>Boolean</code>
        * [._checkChannelBypass(channel)](#CommandPermissions+_checkChannelBypass) ⇒ <code>Boolean</code>
        * [._checkChannelNeeded(channel)](#CommandPermissions+_checkChannelNeeded) ⇒ <code>Boolean</code>
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

<a name="CommandPermissions+axon"></a>

### commandPermissions.axon : <code>Object.&lt;AxonClient&gt;</code>
Returns the AxonClient instance

**Kind**: instance property of [<code>CommandPermissions</code>](#CommandPermissions)  
**Read only**: true  
<a name="CommandPermissions+utils"></a>

### commandPermissions.utils : <code>Object.&lt;Utils&gt;</code>
**Kind**: instance property of [<code>CommandPermissions</code>](#CommandPermissions)  
**Read only**: true  
<a name="CommandPermissions+axonUtils"></a>

### commandPermissions.axonUtils : <code>Object.&lt;AxonUtils&gt;</code>
Returns the AxonUtils instance

**Kind**: instance property of [<code>CommandPermissions</code>](#CommandPermissions)  
**Read only**: true  
<a name="CommandPermissions+library"></a>

### commandPermissions.library : <code>Object.&lt;LibraryInterface&gt;</code>
Returns the LibraryInterface instance

**Kind**: instance property of [<code>CommandPermissions</code>](#CommandPermissions)  
**Read only**: true  
<a name="CommandPermissions+setBot"></a>

### commandPermissions.setBot([array], [toAdd]) ⇒ [<code>CommandPermissions</code>](#CommandPermissions)
Set the permissions the bot needs to have to execute this command.

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [array] | <code>Array</code> | <code>[]</code> | Array of permissions |
| [toAdd] | <code>Boolean</code> | <code>false</code> | Whether to add the permissions to the existing permissions |

<a name="CommandPermissions+setServerMod"></a>

### commandPermissions.setServerMod([boolean]) ⇒ [<code>CommandPermissions</code>](#CommandPermissions)
Set/unset the command to serverMod only.

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [boolean] | <code>Boolean</code> | <code>true</code> | Whether to make the command serverMod only |

<a name="CommandPermissions+setServerManager"></a>

### commandPermissions.setServerManager([boolean]) ⇒ [<code>CommandPermissions</code>](#CommandPermissions)
Set/unset the command to serverManager only.

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [boolean] | <code>Boolean</code> | <code>true</code> | Whether to make the command serverManager only |

<a name="CommandPermissions+setServerAdmin"></a>

### commandPermissions.setServerAdmin([boolean]) ⇒ [<code>CommandPermissions</code>](#CommandPermissions)
Set/unset the command to serverAdmin only.

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [boolean] | <code>Boolean</code> | <code>true</code> | Whether to make the command serverAdmin only |

<a name="CommandPermissions+setServerOwner"></a>

### commandPermissions.setServerOwner([boolean]) ⇒ [<code>CommandPermissions</code>](#CommandPermissions)
Set/unset the command to serverOwner only.

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [boolean] | <code>Boolean</code> | <code>true</code> | Whether to make the command serverOwnber only |

<a name="CommandPermissions+setUser"></a>

### commandPermissions.setUser([object], [toAdd]) ⇒ [<code>CommandPermissions</code>](#CommandPermissions)
Set the permissions the user needs to have to execute this command.

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [object] | <code>Object</code> | <code>{ bypass: [], needed: [] }</code> | Object of permissions |
| [toAdd] | <code>boolean</code> | <code>false</code> | Whether to add the permissions to the existing permissions |

<a name="CommandPermissions+setUserIDs"></a>

### commandPermissions.setUserIDs([object], [toAdd]) ⇒ [<code>CommandPermissions</code>](#CommandPermissions)
Set the user IDs the user needs to have to execute this command.

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [object] | <code>Object</code> | <code>{ bypass: [], needed: [] }</code> | Object of permissions |
| [toAdd] | <code>boolean</code> | <code>false</code> | Whether to add the permissions to the existing permissions |

<a name="CommandPermissions+setRoleIDs"></a>

### commandPermissions.setRoleIDs([object], [toAdd]) ⇒ [<code>CommandPermissions</code>](#CommandPermissions)
Set the role IDs the user needs to have to execute this command.

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [object] | <code>Object</code> | <code>{ bypass: [], needed: [] }</code> | Object of permissions |
| [toAdd] | <code>boolean</code> | <code>false</code> | Whether to add the permissions to the existing permissions |

<a name="CommandPermissions+setChannelIDs"></a>

### commandPermissions.setChannelIDs([object], [toAdd]) ⇒ [<code>CommandPermissions</code>](#CommandPermissions)
Set the channel IDs needed to be in to execute this command.

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [object] | <code>Object</code> | <code>{ bypass: [], needed: [] }</code> | Object of permissions |
| [toAdd] | <code>boolean</code> | <code>false</code> | Whether to add the permissions to the existing permissions |

<a name="CommandPermissions+setStaff"></a>

### commandPermissions.setStaff([object], [toAdd]) ⇒ [<code>CommandPermissions</code>](#CommandPermissions)
Set the AxonCore staff members that can execute this command.

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [object] | <code>Object</code> | <code>{ bypass: [], needed: [] }</code> | Object of permissions |
| [toAdd] | <code>boolean</code> | <code>false</code> | Whether to add the permissions to the existing permissions |

<a name="CommandPermissions+_checkPermsBot"></a>

### commandPermissions.\_checkPermsBot(channel) ⇒ <code>Boolean</code>
Check bot permission

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type |
| --- | --- |
| channel | <code>Object.&lt;Channel&gt;</code> | 

<a name="CommandPermissions+_checkPermsUserBypass"></a>

### commandPermissions.\_checkPermsUserBypass(member) ⇒ <code>Boolean</code>
Check user permissions [bypass]

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type |
| --- | --- |
| member | <code>Object.&lt;Member&gt;</code> | 

<a name="CommandPermissions+_checkPermsUserNeeded"></a>

### commandPermissions.\_checkPermsUserNeeded(member) ⇒ <code>Boolean</code>
Check user permissions [needed]

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type |
| --- | --- |
| member | <code>Object.&lt;Member&gt;</code> | 

<a name="CommandPermissions+_checkUserBypass"></a>

### commandPermissions.\_checkUserBypass(member) ⇒ <code>Boolean</code>
Check userIDs [bypass]

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type |
| --- | --- |
| member | <code>Object.&lt;Member&gt;</code> | 

<a name="CommandPermissions+_checkUserNeeded"></a>

### commandPermissions.\_checkUserNeeded(member) ⇒ <code>Boolean</code>
Check userIDs [needed]

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type |
| --- | --- |
| member | <code>Object.&lt;Member&gt;</code> | 

<a name="CommandPermissions+_checkRoleBypass"></a>

### commandPermissions.\_checkRoleBypass(member) ⇒ <code>Boolean</code>
Check roleIDs [bypass]

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type |
| --- | --- |
| member | <code>Object.&lt;Member&gt;</code> | 

<a name="CommandPermissions+_checkRoleNeeded"></a>

### commandPermissions.\_checkRoleNeeded(member) ⇒ <code>Boolean</code>
Check roleIDs [needed]

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type |
| --- | --- |
| member | <code>Object.&lt;Member&gt;</code> | 

<a name="CommandPermissions+_checkChannelBypass"></a>

### commandPermissions.\_checkChannelBypass(channel) ⇒ <code>Boolean</code>
Check channelIDs [bypass]

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type |
| --- | --- |
| channel | <code>Object.&lt;Channel&gt;</code> | 

<a name="CommandPermissions+_checkChannelNeeded"></a>

### commandPermissions.\_checkChannelNeeded(channel) ⇒ <code>Boolean</code>
Check channelIDs [needed]

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  

| Param | Type |
| --- | --- |
| channel | <code>Object.&lt;Channel&gt;</code> | 

<a name="CommandPermissions+_checkStaffBypass"></a>

### commandPermissions.\_checkStaffBypass(member) ⇒ <code>Boolean</code>
Check if the user is bot staff [bypass]

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  
**Returns**: <code>Boolean</code> - True if Staff / False if not  

| Param | Type |
| --- | --- |
| member | <code>Object.&lt;Member&gt;</code> | 

<a name="CommandPermissions+_checkStaffNeeded"></a>

### commandPermissions.\_checkStaffNeeded(member) ⇒ <code>Boolean</code>
Check if the user is bot staff [needed]

**Kind**: instance method of [<code>CommandPermissions</code>](#CommandPermissions)  
**Returns**: <code>Boolean</code> - True if Staff / False if not  

| Param | Type |
| --- | --- |
| member | <code>Object.&lt;Member&gt;</code> | 

<a name="CommandPermissions.CommandPermissions"></a>

### CommandPermissions.CommandPermissions
**Kind**: static class of [<code>CommandPermissions</code>](#CommandPermissions)  
<a name="new_CommandPermissions.CommandPermissions_new"></a>

#### new CommandPermissions(command, [override], [useModuleDefault])
Creates an instance of CommandPermissions.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| command | <code>Object.&lt;Command&gt;</code> |  | The base command |
| [override] | <code>Object</code> | <code>{}</code> | The specific permissions for this command (format - CommandPermissions) |
| [useModuleDefault] | <code>Boolean</code> | <code>false</code> | Whether to use or not the module's base permissions before applying override permissions |

