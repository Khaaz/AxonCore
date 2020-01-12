<a name="Handler"></a>

## *Handler*
**Kind**: global abstract class  
**Author**: KhaaZ  
**Properties**

| Name | Type |
| --- | --- |
| _axon | <code>Object.&lt;AxonClient&gt;</code> | 
| name | <code>String</code> | 
| _listeners | <code>Array.&lt;Listener&gt;</code> | 


* *[Handler](#Handler)*
    * *[new Handler()](#new_Handler_new)*
    * _instance_
        * *[.size](#Handler+size) : <code>Number</code>*
        * *[.handle(...args)](#Handler+handle) ⇒ <code>String</code> \| <code>null</code>*
    * _static_
        * *[.Handler](#Handler.Handler)*
            * [new Handler(axon, name, listeners)](#new_Handler.Handler_new)

<a name="new_Handler_new"></a>

### *new Handler()*
Abstract class for handlers.
Events root handlers.

<a name="Handler+size"></a>

### *handler.size : <code>Number</code>*
Returns the sizeof an Handler (number of listeners)

**Kind**: instance property of [<code>Handler</code>](#Handler)  
**Read only**: true  
<a name="Handler+handle"></a>

### *handler.handle(...args) ⇒ <code>String</code> \| <code>null</code>*
Takes the event parameters as arguments and returns the guild ID if possible or null.

**Kind**: instance method of [<code>Handler</code>](#Handler)  
**Returns**: <code>String</code> \| <code>null</code> - The guild ID  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Object</code> | All parameters for this event |

<a name="Handler.Handler"></a>

### *Handler.Handler*
**Kind**: static class of [<code>Handler</code>](#Handler)  
<a name="new_Handler.Handler_new"></a>

#### new Handler(axon, name, listeners)
Creates an instance of Handler.


| Param | Type |
| --- | --- |
| axon | <code>Object.&lt;AxonClient&gt;</code> | 
| name | <code>String</code> | 
| listeners | <code>Array.&lt;Listener&gt;</code> | 

