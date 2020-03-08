<a name="Collection"></a>

## Collection ⇐ <code>Map&lt;string\|number,T&gt;</code>
**Kind**: global class  
**Extends**: <code>Map&lt;string\|number,T&gt;</code>  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| baseObject | <code>T</code> | The base class for all items |


* [Collection](#Collection) ⇐ <code>Map&lt;string\|number,T&gt;</code>
    * [new Collection()](#new_Collection_new)
    * _instance_
        * [.baseObject](#Collection+baseObject)
        * [.toArray()](#Collection+toArray) ⇒ <code>Array.&lt;T&gt;</code>
        * [.toObject()](#Collection+toObject) ⇒
        * [.apply(key, func, ...args)](#Collection+apply) ⇒ <code>Collection.&lt;T&gt;</code>
        * [.add(key, value, replace)](#Collection+add) ⇒ <code>T</code>
        * [.find(func)](#Collection+find) ⇒ <code>T</code>
        * [.map(func)](#Collection+map) ⇒ <code>Array.&lt;R&gt;</code>
        * [.filter(func)](#Collection+filter) ⇒ <code>Array.&lt;T&gt;</code>
        * [.reduce(func, [initialValue])](#Collection+reduce) ⇒ <code>U</code>
        * [.some(func)](#Collection+some) ⇒ <code>Boolean</code>
        * [.every(func)](#Collection+every) ⇒ <code>Boolean</code>
        * [.update(key, value)](#Collection+update) ⇒ <code>T</code>
        * [.remove(key)](#Collection+remove) ⇒ <code>T</code>
        * [.random()](#Collection+random) ⇒ <code>T</code>
    * _static_
        * [.Collection](#Collection.Collection)
            * [new Collection(options)](#new_Collection.Collection_new)
        * [.from(array, key)](#Collection.from) ⇒ <code>Collection.&lt;R&gt;</code>

<a name="new_Collection_new"></a>

### new Collection()
Extended Map with built in methods for ease of data manipulation.
Based on Eris.Collection

<a name="Collection+baseObject"></a>

### collection.baseObject
**Kind**: instance property of [<code>Collection</code>](#Collection)  
<a name="Collection+toArray"></a>

### collection.toArray() ⇒ <code>Array.&lt;T&gt;</code>
Map to array
[ value, value, value ]

**Kind**: instance method of [<code>Collection</code>](#Collection)  
<a name="Collection+toObject"></a>

### collection.toObject() ⇒
Map to object
{ key: value, key: value }

**Kind**: instance method of [<code>Collection</code>](#Collection)  
<a name="Collection+apply"></a>

### collection.apply(key, func, ...args) ⇒ <code>Collection.&lt;T&gt;</code>
Apply a function to the Collection and returns a new Collection

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>Collection.&lt;T&gt;</code> - A new Collection modified by the apply call  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The property to use as key for the new Collection |
| func | <code>String</code> | The function name to apply to the Collection |
| ...args | <code>any</code> | All the argument that need to be applied to the Collection |

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

<a name="Collection+find"></a>

### collection.find(func) ⇒ <code>T</code>
Return the first object to make the function evaluate true

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>T</code> - The first matching object, or null if no match  

| Param |
| --- |
| func | 

<a name="Collection+map"></a>

### collection.map(func) ⇒ <code>Array.&lt;R&gt;</code>
Return an array with the results of applying the given function to each element

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>Array.&lt;R&gt;</code> - An array containing the results  

| Param |
| --- |
| func | 

<a name="Collection+filter"></a>

### collection.filter(func) ⇒ <code>Array.&lt;T&gt;</code>
Return all the objects that make the function evaluate true

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>Array.&lt;T&gt;</code> - An array containing all the objects that matched  

| Param |
| --- |
| func | 

<a name="Collection+reduce"></a>

### collection.reduce(func, [initialValue]) ⇒ <code>U</code>
Reduce values by function

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>U</code> - Accumulator  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| func |  |  |  |
| [initialValue] | <code>Number</code> | <code>0</code> | Value to use as the first argument to the first call of the callback |

<a name="Collection+some"></a>

### collection.some(func) ⇒ <code>Boolean</code>
Test if at least one element passes the test implemented by the provided function. Returns true if yes, or false if not.

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>Boolean</code> - An array containing all the objects that matched  

| Param |
| --- |
| func | 

<a name="Collection+every"></a>

### collection.every(func) ⇒ <code>Boolean</code>
Test if all elements pass the test implemented by the provided function. Returns true if yes, or false if not.

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>Boolean</code> - An array containing all the objects that matched  

| Param |
| --- |
| func | 

<a name="Collection+update"></a>

### collection.update(key, value) ⇒ <code>T</code>
Update an object

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>T</code> - The updated object  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The ID of the object |
| value | <code>T</code> | The updated object data |

<a name="Collection+remove"></a>

### collection.remove(key) ⇒ <code>T</code>
Remove an object

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>T</code> - The removed object, or null if nothing was removed  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The ID of the object |

<a name="Collection+random"></a>

### collection.random() ⇒ <code>T</code>
Get a random object from the Collection

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>T</code> - The random object, or null if there is no match  
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

### Collection.from(array, key) ⇒ <code>Collection.&lt;R&gt;</code>
Creates a collection from an array

**Kind**: static method of [<code>Collection</code>](#Collection)  
**Returns**: <code>Collection.&lt;R&gt;</code> - A newly created Collection  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array.&lt;R&gt;</code> | The array of object |
| key | <code>String</code> | The property to use as key |

