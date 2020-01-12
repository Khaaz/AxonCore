<a name="Utils"></a>

## Utils
**Kind**: global class  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| _axon | <code>AxonClient</code> | AxonClient |
| userMention | <code>RegExp</code> | Regular Expression to match a userMention |
| roleMention | <code>RegExp</code> | Regular Expression to match a roleMention |
| channelMention | <code>RegExp</code> | Regular Expression to match a channelMention |
| id | <code>RegExp</code> | Regular Expression to match an id |
| hexCode | <code>RegExp</code> | Regular Expression to match an hexCode |


* [Utils](#Utils)
    * [new Utils()](#new_Utils_new)
    * _instance_
        * [.axon](#Utils+axon) : <code>AxonClient</code>
        * [.bot](#Utils+bot) : <code>BotClient</code>
        * [.library](#Utils+library) : <code>LibraryInterface</code>
        * [.splitMessage(content)](#Utils+splitMessage) ⇒ <code>Array.&lt;String&gt;</code> \| <code>String</code>
        * [.getPrefix(msg)](#Utils+getPrefix) ⇒ <code>Promise.&lt;String&gt;</code>
        * [.getRoles(guild, member)](#Utils+getRoles) ⇒ <code>Array.&lt;Role&gt;</code>
        * [.getHighestRole(guild, member)](#Utils+getHighestRole) ⇒ <code>Role</code>
        * [.sortRoles(array)](#Utils+sortRoles) ⇒ <code>Array.&lt;Role&gt;</code>
        * [.isRoleHigher(role1, role2)](#Utils+isRoleHigher) ⇒ <code>Boolean</code>
        * [.isHigherRole(guild, first, second)](#Utils+isHigherRole) ⇒ <code>Boolean</code>
        * [.hasPerms(member, permissions)](#Utils+hasPerms) ⇒ <code>Boolean</code>
        * [.hasChannelPerms(channel, permissions, [user])](#Utils+hasChannelPerms) ⇒ <code>Boolean</code>
        * [.missingPerms(member, [permissions])](#Utils+missingPerms) ⇒ <code>Array.&lt;String&gt;</code>
        * [.calculatePerms(data)](#Utils+calculatePerms) ⇒ <code>Object</code>
        * [.sleep(ms)](#Utils+sleep) ⇒ <code>Promise</code>
        * [.readFileAsync(path)](#Utils+readFileAsync) ⇒ <code>Promise.&lt;String&gt;</code>
        * [.writeFileAsync(path, content)](#Utils+writeFileAsync) ⇒ <code>Promise</code>
    * _static_
        * [.Utils](#Utils.Utils)
            * [new Utils(client)](#new_Utils.Utils_new)
        * [.userMention](#Utils.userMention) : <code>RegExp</code>
        * [.roleMention](#Utils.roleMention) : <code>RegExp</code>
        * [.channelMention](#Utils.channelMention) : <code>RegExp</code>
        * [.id](#Utils.id) : <code>RegExp</code>
        * [.hexCode](#Utils.hexCode) : <code>RegExp</code>
        * [.compareObject(obj1, obj2)](#Utils.compareObject) ⇒ <code>Boolean</code>

<a name="new_Utils_new"></a>

### new Utils()
General Utility Class for AxonCore
All methods useful and usable everywhere

<a name="Utils+axon"></a>

### utils.axon : <code>AxonClient</code>
Returns the AxonClient instance

**Kind**: instance property of [<code>Utils</code>](#Utils)  
**Read only**: true  
<a name="Utils+bot"></a>

### utils.bot : <code>BotClient</code>
Returns the BotClient instance

**Kind**: instance property of [<code>Utils</code>](#Utils)  
**Read only**: true  
<a name="Utils+library"></a>

### utils.library : <code>LibraryInterface</code>
Returns the LibraryInterface instance

**Kind**: instance property of [<code>Utils</code>](#Utils)  
**Read only**: true  
<a name="Utils+splitMessage"></a>

### utils.splitMessage(content) ⇒ <code>Array.&lt;String&gt;</code> \| <code>String</code>
Split the given content (String), according to correct linebreaks.
Split at 1900 characters.

**Kind**: instance method of [<code>Utils</code>](#Utils)  
**Returns**: <code>Array.&lt;String&gt;</code> \| <code>String</code> - The array of content string splitted or the original String  

| Param | Type |
| --- | --- |
| content | <code>String</code> | 

<a name="Utils+getPrefix"></a>

### utils.getPrefix(msg) ⇒ <code>Promise.&lt;String&gt;</code>
Returns the guild prefix of the given msg.

**Kind**: instance method of [<code>Utils</code>](#Utils)  
**Returns**: <code>Promise.&lt;String&gt;</code> - The prefix as string.  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>Object</code> | Message object given at the command. |

<a name="Utils+getRoles"></a>

### utils.getRoles(guild, member) ⇒ <code>Array.&lt;Role&gt;</code>
Get an array of role objects from a member.

**Kind**: instance method of [<code>Utils</code>](#Utils)  
**Returns**: <code>Array.&lt;Role&gt;</code> - Array of roles object  

| Param | Type |
| --- | --- |
| guild | <code>Guild</code> | 
| member | <code>Member</code> | 

<a name="Utils+getHighestRole"></a>

### utils.getHighestRole(guild, member) ⇒ <code>Role</code>
Get highest role of the given member.

**Kind**: instance method of [<code>Utils</code>](#Utils)  
**Returns**: <code>Role</code> - Role Object  

| Param | Type |
| --- | --- |
| guild | <code>Guild</code> | 
| member | <code>Member</code> | 

<a name="Utils+sortRoles"></a>

### utils.sortRoles(array) ⇒ <code>Array.&lt;Role&gt;</code>
Sort a users roles from highest role to lowest role.

**Kind**: instance method of [<code>Utils</code>](#Utils)  
**Returns**: <code>Array.&lt;Role&gt;</code> - Sorted array (per position) of Role Object  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array.&lt;Role&gt;</code> | The roles to sort |

<a name="Utils+isRoleHigher"></a>

### utils.isRoleHigher(role1, role2) ⇒ <code>Boolean</code>
Check if the first role is higher than the other.

**Kind**: instance method of [<code>Utils</code>](#Utils)  

| Param | Type |
| --- | --- |
| role1 | <code>Role</code> | 
| role2 | <code>Role</code> | 

<a name="Utils+isHigherRole"></a>

### utils.isHigherRole(guild, first, second) ⇒ <code>Boolean</code>
Check if the highest role of first is higher than the highest role of second

**Kind**: instance method of [<code>Utils</code>](#Utils)  

| Param | Type |
| --- | --- |
| guild | <code>Guild</code> | 
| first | <code>Member</code> | 
| second | <code>Member</code> | 

<a name="Utils+hasPerms"></a>

### utils.hasPerms(member, permissions) ⇒ <code>Boolean</code>
Check if the member has correct permissions to execute

**Kind**: instance method of [<code>Utils</code>](#Utils)  
**Returns**: <code>Boolean</code> - hether the member has permissions or not  

| Param | Type | Description |
| --- | --- | --- |
| member | <code>Member</code> | Member object |
| permissions | <code>Array.&lt;String&gt;</code> | List of permissions to test |

<a name="Utils+hasChannelPerms"></a>

### utils.hasChannelPerms(channel, permissions, [user]) ⇒ <code>Boolean</code>
Check if the given user has correct permissions to execute in the specific channel.

**Kind**: instance method of [<code>Utils</code>](#Utils)  
**Returns**: <code>Boolean</code> - Whether the member has permissions or not  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| channel | <code>Channel</code> |  | Channel object |
| permissions | <code>Array.&lt;String&gt;</code> |  | List of permissions to test |
| [user] | <code>User</code> | <code>this.bot.user</code> | User to test |

<a name="Utils+missingPerms"></a>

### utils.missingPerms(member, [permissions]) ⇒ <code>Array.&lt;String&gt;</code>
List all missing permissions of the given user.

**Kind**: instance method of [<code>Utils</code>](#Utils)  
**Returns**: <code>Array.&lt;String&gt;</code> - An array of missing permissions  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| member | <code>Member</code> |  |  |
| [permissions] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | List of permissions to test |

<a name="Utils+calculatePerms"></a>

### utils.calculatePerms(data) ⇒ <code>Object</code>
Calculate permissions using a object of perms

**Kind**: instance method of [<code>Utils</code>](#Utils)  
**Returns**: <code>Object</code> - Object containing the perms denied & allowed  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The permissions to calculate for |

<a name="Utils+sleep"></a>

### utils.sleep(ms) ⇒ <code>Promise</code>
Wait for a specified amount of miliseconds..

**Kind**: instance method of [<code>Utils</code>](#Utils)  
**Returns**: <code>Promise</code> - resolve after the delay is passed  

| Param | Type |
| --- | --- |
| ms | <code>Number</code> | 

<a name="Utils+readFileAsync"></a>

### utils.readFileAsync(path) ⇒ <code>Promise.&lt;String&gt;</code>
Promisified readFile method

**Kind**: instance method of [<code>Utils</code>](#Utils)  
**Returns**: <code>Promise.&lt;String&gt;</code> - content  

| Param | Type |
| --- | --- |
| path | <code>String</code> | 

<a name="Utils+writeFileAsync"></a>

### utils.writeFileAsync(path, content) ⇒ <code>Promise</code>
Promisified writeFile method

**Kind**: instance method of [<code>Utils</code>](#Utils)  

| Param | Type |
| --- | --- |
| path | <code>String</code> | 
| content | <code>String</code> | 

<a name="Utils.Utils"></a>

### Utils.Utils
**Kind**: static class of [<code>Utils</code>](#Utils)  
<a name="new_Utils.Utils_new"></a>

#### new Utils(client)
Creates an instance of Utils.


| Param | Type |
| --- | --- |
| client | <code>AxonClient</code> | 

<a name="Utils.userMention"></a>

### Utils.userMention : <code>RegExp</code>
Returns the UserMention regex

**Kind**: static property of [<code>Utils</code>](#Utils)  
**Read only**: true  
<a name="Utils.roleMention"></a>

### Utils.roleMention : <code>RegExp</code>
Returns the RoleMention regex

**Kind**: static property of [<code>Utils</code>](#Utils)  
**Read only**: true  
<a name="Utils.channelMention"></a>

### Utils.channelMention : <code>RegExp</code>
Returns the ChannelMention regex

**Kind**: static property of [<code>Utils</code>](#Utils)  
**Read only**: true  
<a name="Utils.id"></a>

### Utils.id : <code>RegExp</code>
Returns the ID regex

**Kind**: static property of [<code>Utils</code>](#Utils)  
**Read only**: true  
<a name="Utils.hexCode"></a>

### Utils.hexCode : <code>RegExp</code>
Return the HexCode regex

**Kind**: static property of [<code>Utils</code>](#Utils)  
**Read only**: true  
<a name="Utils.compareObject"></a>

### Utils.compareObject(obj1, obj2) ⇒ <code>Boolean</code>
Ensures that all property names of obj1 exists in obj2.
Doesn't compare values. Exept if it is an object, then it checks for property names recursively.

**Kind**: static method of [<code>Utils</code>](#Utils)  
**Returns**: <code>Boolean</code> - True: obj2 has at least all prop of obj1  

| Param | Type | Description |
| --- | --- | --- |
| obj1 | <code>Object</code> | Default config/object |
| obj2 | <code>Object</code> | Custom config/Object (Config/Object to compare with) |

