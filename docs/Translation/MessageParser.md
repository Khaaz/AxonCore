<a name="MessageParser"></a>

## MessageParser
**Kind**: global class  
**Author**: KhaaZ  

* [MessageParser](#MessageParser)
    * [new MessageParser()](#new_MessageParser_new)
    * [.matchAll(message)](#MessageParser+matchAll)
    * [.parse(message, args)](#MessageParser+parse) ⇒ <code>String</code>
    * [.parse2(message, ...args)](#MessageParser+parse2) ⇒ <code>String</code>

<a name="new_MessageParser_new"></a>

### new MessageParser()
Parse a message and replace custom variable with arguments

<a name="MessageParser+matchAll"></a>

### messageParser.matchAll(message)
Generator function that will match all occurrence of the regex and yield a Match structure

**Kind**: instance method of [<code>MessageParser</code>](#MessageParser)  

| Param | Type |
| --- | --- |
| message | <code>String</code> | 

<a name="MessageParser+parse"></a>

### messageParser.parse(message, args) ⇒ <code>String</code>
Parse the message by replacing the dynamic content.

**Kind**: instance method of [<code>MessageParser</code>](#MessageParser)  
**Returns**: <code>String</code> - - The Parsed message  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> |  |
| args | <code>AxonLanguageResponse</code> | Custom object with all arguments that needs to be inserted in the string |

<a name="MessageParser+parse2"></a>

### messageParser.parse2(message, ...args) ⇒ <code>String</code>
Same as above but arguments are unnamed and passed as parameters instead of inside one object.

**Kind**: instance method of [<code>MessageParser</code>](#MessageParser)  
**Returns**: <code>String</code> - - The Parsed message  

| Param | Type |
| --- | --- |
| message | <code>String</code> | 
| ...args | <code>String</code> | 

