<a name="ARegistry"></a>

## *ARegistry*
**Kind**: global abstract class  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| _axon | <code>AxonClient</code> | The AxonClient |
| registry | <code>Collection.&lt;\*&gt;</code> | The collection of items hold by the registry |


* *[ARegistry](#ARegistry)*
    * *[new ARegistry()](#new_ARegistry_new)*
    * _instance_
        * *[.axon](#ARegistry+axon)*
        * *[.size](#ARegistry+size)*
        * *[.has(key)](#ARegistry+has) ⇒ <code>Boolean</code>*
        * *[.get(key)](#ARegistry+get) ⇒ <code>Object</code>*
        * *[.add(key, value)](#ARegistry+add)*
        * *[.remove(key)](#ARegistry+remove)*
        * *[.register(key, value)](#ARegistry+register)*
        * *[.unregister(key, value)](#ARegistry+unregister)*
    * _static_
        * *[.ARegistry](#ARegistry.ARegistry)*
            * [new ARegistry(axon, base)](#new_ARegistry.ARegistry_new)

<a name="new_ARegistry_new"></a>

### *new ARegistry()*
Abstract class to hold and manage a set of items.

<a name="ARegistry+axon"></a>

### *aRegistry.axon*
Get the AxonClient

**Kind**: instance property of [<code>ARegistry</code>](#ARegistry)  
**Read only**: true  
<a name="ARegistry+size"></a>

### *aRegistry.size*
Get the size of the registry

**Kind**: instance property of [<code>ARegistry</code>](#ARegistry)  
**Read only**: true  
<a name="ARegistry+has"></a>

### *aRegistry.has(key) ⇒ <code>Boolean</code>*
Check whether the item exist in the registry

**Kind**: instance method of [<code>ARegistry</code>](#ARegistry)  
**Returns**: <code>Boolean</code> - - Whether the item exist  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 

<a name="ARegistry+get"></a>

### *aRegistry.get(key) ⇒ <code>Object</code>*
Get an item from the registry

**Kind**: instance method of [<code>ARegistry</code>](#ARegistry)  
**Returns**: <code>Object</code> - - The item  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 

<a name="ARegistry+add"></a>

### *aRegistry.add(key, value)*
Add an item to the registry

**Kind**: instance method of [<code>ARegistry</code>](#ARegistry)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> |  |
| value | <code>Object</code> |  |
|  | <code>Collection</code> | The registry |

<a name="ARegistry+remove"></a>

### *aRegistry.remove(key)*
Remove an item from the registry

**Kind**: instance method of [<code>ARegistry</code>](#ARegistry)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> |  |
|  | <code>Boolean</code> | Whether it could remove the item or not |

<a name="ARegistry+register"></a>

### *aRegistry.register(key, value)*
Register correctly an item in the registry.

**Kind**: instance method of [<code>ARegistry</code>](#ARegistry)  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 
| value | <code>Object</code> | 

<a name="ARegistry+unregister"></a>

### *aRegistry.unregister(key, value)*
Unregister correctly an item from the registry.

**Kind**: instance method of [<code>ARegistry</code>](#ARegistry)  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 
| value | <code>Object</code> | 

<a name="ARegistry.ARegistry"></a>

### *ARegistry.ARegistry*
**Kind**: static class of [<code>ARegistry</code>](#ARegistry)  
<a name="new_ARegistry.ARegistry_new"></a>

#### new ARegistry(axon, base)
Creates an instance of ARegistry.


| Param | Type | Description |
| --- | --- | --- |
| axon | <code>AxonClient</code> | The AxonClient |
| base | <code>Object</code> | The base definition to use for the registry |

