<a id="utils"></a>

## Utils
General Utility Class for AxonCore.  
All methods useful and usable everywhere.

**Kind**: global class  
**Author**: KhaaZ  

[Utils](#Utils)
- _static_
  - [Utils](#Utils)
    - [new Utils(axon)](#Utils_new)
- _instance_
  - [splitMessage(content)](#splitMessage) ⇒ <code>Array.&lt;String&gt;</code> \| <code>String</code>
  - [getPrefix(msg)](#getPrefix) ⇒ <code>String</code>
  - [getRoles(guild, member)](#getRoles) ⇒ <code>Array.&lt;Role&gt;</code>
  - [getHighestRole(guild, member)](#getHighestRole) ⇒ <code>Object.&lt;Role&gt;</code>
  - [sortRoles(array)](#sortRoles) ⇒ <code>Array.&lt;Role&gt;</code>
  - [isRoleHigher(role1, role2)](#isRoleHigher) ⇒ <code>Boolean</code>
  - [isHigherRole(guild, first, second)](#isHigherRole) ⇒ <code>Boolean</code>
  - [readFile(path)](#readFile) ⇒ <code>Promise.&lt;String&gt;</code>
  - [writeFile(path, content)](#writeFile) ⇒ <code>Promise</code>
  - [compareObject(obj1, obj2)](#compareObject) ⇒ <code>Boolean</code>
    

<<a id="utils"></a>

### Utils
**Kind**: static class of [<code>Utils</code>](#Utils)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| axon | <code>Object.&lt;AxonClient&gt;</code> | Axon Client [GETTER: _axon] |
| bot | <code>Object.&lt;Eris.Client&gt;</code> | Eris bot Client [GETTER: _axon.client] |
| userMention | <code>RegExp</code> | Regular Expression to match a userMention |
| roleMention | <code>RegExp</code> | Regular Expression to match a roleMention |
| channelMention | <code>RegExp</code> | Regular Expression to match a channelMention |
| id | <code>RegExp</code> | Regular Expression to match an id |
| hexCode | <code>RegExp</code> | Regular Expression to match an hexCode |

<a id="utils_new"></a>

#### new Utils(axon)
Creates an Utils instance.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| axon | <code>Object.&lt;AxonClient&gt;</code> |  | AxonClient instance |

<a id="splitmessage"></a>

### splitMessage(content) ⇒ <code>Array.&lt;String&gt;</code> \| <code>String</code>
Split the given content (String), according to correct linebreaks.
Split at 1900 characters.

**Kind**: instance method of [<code>Utils</code>](#Utils)  
**Returns**: <code>Array.&lt;String&gt;</code> \| <code>String</code> - The array of content string splitted or the original String  

| Param | Type |
| --- | --- |
| content | <code>String</code> | 

<a id="getprefix"></a>

### getPrefix(msg) ⇒ <code>String</code>
Returns the guild prefix of the given message object.  

**Kind**: instance method of [<code>Utils</code>](#Utils)  
**Returns**: <code>String</code> - The prefix as string.  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>Object</code> | Message object given at the command. |

<a id="getroles"></a>

### getRoles(guild, member) ⇒ <code>Array.&lt;Role&gt;</code>
Get an array of role objects from a member.  

**Kind**: instance method of [<code>Utils</code>](#Utils)  
**Returns**: <code>Array.&lt;Role&gt;</code> - Array of roles object  

| Param | Type |
| --- | --- |
| guild | <code>Object.&lt;Guild&gt;</code> | 
| member | <code>Object.&lt;Member&gt;</code> | 

<a id="gethighestrole"></a>

### getHighestRole(guild, member) ⇒ <code>Object.&lt;Role&gt;</code>
Get highest role of the given member.  

**Kind**: instance method of [<code>Utils</code>](#Utils)  
**Returns**: <code>Object.&lt;Role&gt;</code> - Role Object  

| Param | Type |
| --- | --- |
| guild | <code>Object.&lt;Guild&gt;</code> | 
| member | <code>Object.&lt;Member&gt;</code> | 

<a id="sortroles"></a>

### sortRoles(array) ⇒ <code>Array.&lt;Role&gt;</code>
Sort a users roles from highest role to lowest role.  

**Kind**: instance method of [<code>Utils</code>](#Utils)  
**Returns**: <code>Array.&lt;Role&gt;</code> - Sorted array (per position) of Role Object  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array.&lt;Role&gt;</code> | The roles to sort |

<a id="isrolehigher"></a>

### isRoleHigher(role1, role2) ⇒ <code>Boolean</code>
Check if the first role is higher than the second role.  

**Kind**: instance method of [<code>Utils</code>](#Utils)  

| Param | Type |
| --- | --- |
| role1 | <code>Object.&lt;Role&gt;</code> | 
| role2 | <code>Object.&lt;Role&gt;</code> | 

<a id="ishigherrole"></a>

### isHigherRole(guild, first, second) ⇒ <code>Boolean</code>
Check if the highest role of the first user is higher than the highest role of the second user.  

**Kind**: instance method of [<code>Utils</code>](#Utils)  

| Param | Type |
| --- | --- |
| guild | <code>Object.&lt;Guild&gt;</code> | 
| first | <code>Object.&lt;Member&gt;</code> | 
| second | <code>Object.&lt;Member&gt;</code> | 

<a id="readfile"></a>

### readfile(path) ⇒ <code>Promise.&lt;String&gt;</code>
Promisified fs.readFile method.  

**Kind**: instance method of [<code>Utils</code>](#Utils)  
**Returns**: <code>Promise.&lt;String&gt;</code> - content  

| Param | Type |
| --- | --- |
| path | <code>String</code> | 

<a id="writefile"></a>

### writeFile(path, content) ⇒ <code>Promise</code>
Promisified fs.writeFile method.  

**Kind**: instance method of [<code>Utils</code>](#Utils)  

| Param | Type |
| --- | --- |
| path | <code>String</code> | 
| content | <code>String</code> | 

<a id="compareobject"></a>

### compareObject(obj1, obj2) ⇒ <code>Boolean</code>
Ensures that all property names of obj1 exists in obj2.  
Doesn't compare values. Exept if it is an object, then it checks for property names recursively.  

**Kind**: instance method of [<code>Utils</code>](#Utils)  
**Returns**: <code>Boolean</code> - True: obj2 has at least all prop of obj1  

| Param | Type | Description |
| --- | --- | --- |
| obj1 | <code>Object</code> | Default config/object |
| obj2 | <code>Object</code> | Custom config/Object (Config/Object to compare with) |
