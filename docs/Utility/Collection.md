<a name="Collection"></a>

## Collection ⇐ <code>Map</code>
**Kind**: global class  
**Extends**: <code>Map</code>  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| baseObject | <code>Class</code> | The base class for all items |


* [Collection](#Collection) ⇐ <code>Map</code>
    * [new Collection()](#new_Collection_new)
    * _instance_
        * [.toArray()](#Collection+toArray) ⇒ <code>Array.&lt;Class&gt;</code>
        * [.toObject()](#Collection+toObject) ⇒ <code>Object.&lt;key:value&gt;</code>
        * [.apply(key, func, ...args)](#Collection+apply) ⇒ [<code>Collection</code>](#Collection)
        * [.add(value, key, replace)](#Collection+add) ⇒ <code>Class</code>
        * [.find(func)](#Collection+find) ⇒ <code>Class</code>
        * [.map(func)](#Collection+map) ⇒ <code>Array</code>
        * [.filter(func)](#Collection+filter) ⇒ <code>Array.&lt;Class&gt;</code>
        * [.reduce(callbackFn, [initialValue])](#Collection+reduce) ⇒
        * [.some(func)](#Collection+some) ⇒ <code>Boolean</code>
        * [.every(func)](#Collection+every) ⇒ <code>Boolean</code>
        * [.update(key, value, replace)](#Collection+update) ⇒ <code>Class</code>
        * [.remove(key)](#Collection+remove) ⇒ <code>Class</code>
        * [.random()](#Collection+random) ⇒ <code>Class</code>
    * _static_
        * [.Collection](#Collection.Collection)
            * [new Collection(options)](#new_Collection.Collection_new)
        * [.from(array, key)](#Collection.from) ⇒ <code>Collection.&lt;Class&gt;</code>

<a name="new_Collection_new"></a>

### new Collection()
Extended Map with built in methods foreaseof data manipulation.
Based on Eris.Collection

<a name="Collection+toArray"></a>

### collection.toArray() ⇒ <code>Array.&lt;Class&gt;</code>
Map to array
[ value, value, value ]

**Kind**: instance method of [<code>Collection</code>](#Collection)  
<a name="Collection+toObject"></a>

### collection.toObject() ⇒ <code>Object.&lt;key:value&gt;</code>
Map to object
{ key: value, key: value }

**Kind**: instance method of [<code>Collection</code>](#Collection)  
<a name="Collection+apply"></a>

### collection.apply(key, func, ...args) ⇒ [<code>Collection</code>](#Collection)
Apply a function to the Collection and returns a new Collection

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: [<code>Collection</code>](#Collection) - A new Collection modified by the apply call  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The property to use as key for the new Collection |
| func | <code>String</code> | The function name to apply to the Collection |
| ...args | <code>Object</code> | All the argument that need to be applied to the Collection |

<a name="Collection+add"></a>

### collection.add(value, key, replace) ⇒ <code>Class</code>
Add an object
If baseObject, add only if instance of baseObject
If no baseObject, add

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>Class</code> - The existing or newly created object  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | The ID of the object |
| key | <code>Object</code> | The object data |
| replace | <code>Boolean</code> | Whether to replace an existing object with the same ID |

<a name="Collection+find"></a>

### collection.find(func) ⇒ <code>Class</code>
Return the first object to make the function evaluate true

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>Class</code> - The first matching object, or null if no match  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | A function that takes an object and returns true if it matches |

<a name="Collection+map"></a>

### collection.map(func) ⇒ <code>Array</code>
Return an array with the results of applying the given function to each element

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>Array</code> - An array containing the results  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | A function that takes an object and returns something |

<a name="Collection+filter"></a>

### collection.filter(func) ⇒ <code>Array.&lt;Class&gt;</code>
Return all the objects that make the function evaluate true

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>Array.&lt;Class&gt;</code> - An array containing all the objects that matched  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | A function that takes an object and returns true if it matches |

<a name="Collection+reduce"></a>

### collection.reduce(callbackFn, [initialValue]) ⇒
Reduce values by function

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: accumulator  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callbackFn | <code>function</code> |  | Function to execute on each element in the array |
| [initialValue] | <code>Number</code> | <code>0</code> | Value to use as the first argument to the first call of the callback |

<a name="Collection+some"></a>

### collection.some(func) ⇒ <code>Boolean</code>
Test if at least one element passes the test implemented by the provided function. Returns true if yes, or false if not.

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>Boolean</code> - An array containing all the objects that matched  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | A function that takes an object and returns true if it matches |

<a name="Collection+every"></a>

### collection.every(func) ⇒ <code>Boolean</code>
Test if all elements passe the test implemented by the provided function. Returns true if yes, or false if not.

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>Boolean</code> - An array containing all the objects that matched  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | A function that takes an object and returns true if it matches |

<a name="Collection+update"></a>

### collection.update(key, value, replace) ⇒ <code>Class</code>
Update an object

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>Class</code> - The updated object  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The ID of the object |
| value | <code>Object</code> | The updated object data |
| replace | <code>Boolean</code> | Whether to replace an existing object with the same ID |

<a name="Collection+remove"></a>

### collection.remove(key) ⇒ <code>Class</code>
Remove an object

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>Class</code> - The removed object, or null if nothing was removed  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The ID of the object |

<a name="Collection+random"></a>

### collection.random() ⇒ <code>Class</code>
Get a random object from the Collection

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>Class</code> - The random object, or null if there is no match  
<a name="Collection.Collection"></a>

### Collection.Collection
**Kind**: static class of [<code>Collection</code>](#Collection)  
<a name="new_Collection.Collection_new"></a>

#### new Collection(options)
Creates an instance of Collection.


| Param | Type | Default |
| --- | --- | --- |
| options | <code>Object</code> |  | 
| [options.base] | <code>Class</code> | <code></code> | 
| options.iterable | <code>Array</code> \| <code>Object</code> |  | 

<a name="Collection.from"></a>

### Collection.from(array, key) ⇒ <code>Collection.&lt;Class&gt;</code>
Creates a collection from an array

**Kind**: static method of [<code>Collection</code>](#Collection)  
**Returns**: <code>Collection.&lt;Class&gt;</code> - A newly created Collection  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array.&lt;Class&gt;</code> | The array of object |
| key | <code>String</code> | The property to use as key |

