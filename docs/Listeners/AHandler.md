<a name="AHandler"></a>

## *AHandler*
**Kind**: global abstract class  
**Author**: KhaaZ  
**Properties**

| Name | Type |
| --- | --- |
| _axon | <code>AxonClient</code> | 
| name | <code>String</code> | 
| _listeners | <code>Array.&lt;Listener&gt;</code> | 


* *[AHandler](#AHandler)*
    * *[new AHandler()](#new_AHandler_new)*
    * _instance_
        * *[.size](#AHandler+size) : <code>Number</code>*
        * *[.handle(...args)](#AHandler+handle) ⇒ <code>String</code> \| <code>null</code>*
    * _static_
        * *[.AHandler](#AHandler.AHandler)*
            * [new AHandler(axon, name, listeners)](#new_AHandler.AHandler_new)

<a name="new_AHandler_new"></a>

### *new AHandler()*
Abstract class for handlers.
Events root handlers.

<a name="AHandler+size"></a>

### *aHandler.size : <code>Number</code>*
Returns the sizeof an Handler (number of listeners)

**Kind**: instance property of [<code>AHandler</code>](#AHandler)  
**Read only**: true  
<a name="AHandler+handle"></a>

### *aHandler.handle(...args) ⇒ <code>String</code> \| <code>null</code>*
Takes the event parameters as arguments and returns the guild ID if possible or null.

**Kind**: instance method of [<code>AHandler</code>](#AHandler)  
**Returns**: <code>String</code> \| <code>null</code> - The guild ID  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Object</code> | All parameters for this event |

<a name="AHandler.AHandler"></a>

### *AHandler.AHandler*
**Kind**: static class of [<code>AHandler</code>](#AHandler)  
<a name="new_AHandler.AHandler_new"></a>

#### new AHandler(axon, name, listeners)
Creates an instance of AHandler.


| Param | Type |
| --- | --- |
| axon | <code>AxonClient</code> | 
| name | <code>String</code> | 
| listeners | <code>Array.&lt;Listener&gt;</code> | 

