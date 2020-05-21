<a name="ARegistry"></a>

## *ARegistry ⇐ <code>Store&lt;T&gt;</code>*
**Kind**: global abstract class  
**Extends**: <code>Store&lt;T&gt;</code>  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| _axon | <code>[AxonClient](AxonClient)</code> | The AxonClient |
| _base | <code>T</code> | The base definition to use for the registry |


* *[ARegistry](#ARegistry) ⇐ <code>Store&lt;T&gt;</code>*
    * *[new ARegistry()](#new_ARegistry_new)*
    * _instance_
        * *[.axon](#ARegistry+axon) : <code>AxonClient</code>*
        * *[.registry](#ARegistry+registry) : <code>Map.&lt;String, T&gt;</code>*
        * *[.has(key)](#ARegistry+has) ⇒ <code>Boolean</code>*
        * *[.get(key)](#ARegistry+get) ⇒ <code>T</code>*
        * *[.add(key, value)](#ARegistry+add) ⇒ <code>[ARegistry](Core/ARegistry).&lt;T&gt;</code>*
        * *[.remove(key)](#ARegistry+remove) ⇒ <code>Boolean</code>*
        * *[.register(key, value)](#ARegistry+register)*
        * *[.unregister(key, value)](#ARegistry+unregister)*
    * _static_
        * *[.ARegistry](#ARegistry.ARegistry)*
            * [new ARegistry(axon, base)](#new_ARegistry.ARegistry_new)

<a name="new_ARegistry_new"></a>

### *new ARegistry()*
Abstract class to hold and manage a set of items.

<a name="ARegistry+axon"></a>

### *aRegistry.axon : <code>AxonClient</code>*
Get the AxonClient

**Kind**: instance property of [<code>ARegistry</code>](#ARegistry)  
**Read only**: true  
<a name="ARegistry+registry"></a>

### *aRegistry.registry : <code>Map.&lt;String, T&gt;</code>*
Returns the current registry

**Kind**: instance property of [<code>ARegistry</code>](#ARegistry)  
**Read only**: true  
<a name="ARegistry+has"></a>

### *aRegistry.has(key) ⇒ <code>Boolean</code>*
Check whether the item exists in the registry

**Kind**: instance method of [<code>ARegistry</code>](#ARegistry)  
**Returns**: <code>Boolean</code> - - Whether the item exists  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 

<a name="ARegistry+get"></a>

### *aRegistry.get(key) ⇒ <code>T</code>*
Get an item from the registry

**Kind**: instance method of [<code>ARegistry</code>](#ARegistry)  
**Returns**: <code>T</code> - - The item  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 

<a name="ARegistry+add"></a>

### *aRegistry.add(key, value) ⇒ <code>[ARegistry](Core/ARegistry).&lt;T&gt;</code>*
Add an item to the registry

**Kind**: instance method of [<code>ARegistry</code>](#ARegistry)  
**Returns**: <code>[ARegistry](Core/ARegistry).&lt;T&gt;</code> - - The registry  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 
| value | <code>T</code> | 

<a name="ARegistry+remove"></a>

### *aRegistry.remove(key) ⇒ <code>Boolean</code>*
Remove an item from the registry

**Kind**: instance method of [<code>ARegistry</code>](#ARegistry)  
**Returns**: <code>Boolean</code> - - Whether it removed the item or not  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 

<a name="ARegistry+register"></a>

### *aRegistry.register(key, value)*
Register correctly an item in the registry.

**Kind**: instance method of [<code>ARegistry</code>](#ARegistry)  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 
| value | <code>T</code> | 

<a name="ARegistry+unregister"></a>

### *aRegistry.unregister(key, value)*
Unregister correctly an item from the registry.

**Kind**: instance method of [<code>ARegistry</code>](#ARegistry)  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 
| value | <code>T</code> | 

<a name="ARegistry.ARegistry"></a>

### *ARegistry.ARegistry*
**Kind**: static class of [<code>ARegistry</code>](#ARegistry)  
<a name="new_ARegistry.ARegistry_new"></a>

#### new ARegistry(axon, base)
Creates an instance of ARegistry.


| Param | Type | Description |
| --- | --- | --- |
| axon | <code>[AxonClient](AxonClient)</code> | The AxonClient |
| base | <code>T</code> | The base definition to use for the registry |

