<a name="MessageManager"></a>

## MessageManager
**Kind**: global class  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| _axon | <code>Object.&lt;AxonClient&gt;</code> |  |
| _message | <code>Object</code> | All messages (all langs) |
| translation | <code>Object.&lt;TranslationManager&gt;</code> |  |
| parser | <code>Object.&lt;MessageParser&gt;</code> |  |


* [MessageManager](#MessageManager)
    * [new MessageManager()](#new_MessageManager_new)
    * _instance_
        * [.messages](#MessageManager+messages) : <code>Object</code>
        * [.getMessages(lang)](#MessageManager+getMessages) ⇒ <code>Object</code>
        * [.getMessage(message, lang)](#MessageManager+getMessage) ⇒ <code>String</code>
        * [.get(message, args, lang)](#MessageManager+get) ⇒ <code>String</code>
    * _static_
        * [.MessageManager](#MessageManager.MessageManager)
            * [new MessageManager(axonClient, messages)](#new_MessageManager.MessageManager_new)

<a name="new_MessageManager_new"></a>

### new MessageManager()
Holds all messages.
Used as an interface to get the message in the correct lang and parse arguments from the message.

<a name="MessageManager+messages"></a>

### messageManager.messages : <code>Object</code>
Returns all messages (all langs)

**Kind**: instance property of [<code>MessageManager</code>](#MessageManager)  
**Read only**: true  
<a name="MessageManager+getMessages"></a>

### messageManager.getMessages(lang) ⇒ <code>Object</code>
All message from the given lang (or default lang)

**Kind**: instance method of [<code>MessageManager</code>](#MessageManager)  
**Returns**: <code>Object</code> - Object with all messages  

| Param | Type |
| --- | --- |
| lang | <code>String</code> | 

<a name="MessageManager+getMessage"></a>

### messageManager.getMessage(message, lang) ⇒ <code>String</code>
The message in the given lang (or default lang)

**Kind**: instance method of [<code>MessageManager</code>](#MessageManager)  
**Returns**: <code>String</code> - The message  

| Param | Type |
| --- | --- |
| message | <code>String</code> | 
| lang | <code>String</code> | 

<a name="MessageManager+get"></a>

### messageManager.get(message, args, lang) ⇒ <code>String</code>
Get the message in the correct lang, parsed to replace {{key}} with the correct argument

**Kind**: instance method of [<code>MessageManager</code>](#MessageManager)  
**Returns**: <code>String</code> - The actual message  

| Param | Type |
| --- | --- |
| message | <code>String</code> | 
| args | <code>Object</code> | 
| lang | <code>String</code> | 

<a name="MessageManager.MessageManager"></a>

### MessageManager.MessageManager
**Kind**: static class of [<code>MessageManager</code>](#MessageManager)  
<a name="new_MessageManager.MessageManager_new"></a>

#### new MessageManager(axonClient, messages)
Creates an instance of MessageManager.
Dynamically create one method for each message so we can use <this>.MESSAGE_CONSTANT() directly. It will actually call the get method.


| Param | Type |
| --- | --- |
| axonClient | <code>Object.&lt;AxonClient&gt;</code> | 
| messages | <code>Object</code> | 

