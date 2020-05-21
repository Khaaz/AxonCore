<a name="Collection"></a>

## Collection ⇐ <code>Store&lt;T&gt;</code>
**Kind**: global class  
**Extends**: <code>Store&lt;T&gt;</code>  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| baseObject | <code>T</code> | The base class for all items |


* [Collection](#Collection) ⇐ <code>Store&lt;T&gt;</code>
    * [new Collection()](#new_Collection_new)
    * _instance_
        * [.baseObject](#Collection+baseObject)
        * [.add(key, value, replace)](#Collection+add) ⇒ <code>T</code>
        * [.remove(key)](#Collection+remove) ⇒ <code>T</code>
    * _static_
        * [.Collection](#Collection.Collection)
            * [new Collection(options)](#new_Collection.Collection_new)
        * [.from(array, key)](#Collection.from) ⇒ <code>[Collection](Utility/Collection).&lt;R&gt;</code>

<a name="new_Collection_new"></a>

### new Collection()
Custom Store that uses Map as cache.
Enforces that a single object type exists in a Collection.

<a name="Collection+baseObject"></a>

### collection.baseObject
**Kind**: instance property of [<code>Collection</code>](#Collection)  
<a name="Collection+add"></a>

### collection.add(key, value, replace) ⇒ <code>T</code>
Add an object
If baseObject, add only if instance of baseObject
If no baseObject, add

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>T</code> - The existing or newly created object  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The ID of the object |
| value | <code>T</code> | The object data |
| replace | <code>Boolean</code> | Whether to replace an existing object with the same ID |

<a name="Collection+remove"></a>

### collection.remove(key) ⇒ <code>T</code>
Remove an object

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>T</code> - The removed object, or null if nothing was removed  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The ID of the object |

<a name="Collection.Collection"></a>

### Collection.Collection
**Kind**: static class of [<code>Collection</code>](#Collection)  
<a name="new_Collection.Collection_new"></a>

#### new Collection(options)
Creates an instance of Collection.


| Param | Type |
| --- | --- |
| options | <code>Object</code> | 
|  |  | 
|  |  | 

<a name="Collection.from"></a>

### Collection.from(array, key) ⇒ <code>[Collection](Utility/Collection).&lt;R&gt;</code>
Creates a collection from an array

**Kind**: static method of [<code>Collection</code>](#Collection)  
**Returns**: <code>[Collection](Utility/Collection).&lt;R&gt;</code> - A newly created Collection  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array.&lt;R&gt;</code> | The array of object |
| key | <code>String</code> | The property to use as key |

