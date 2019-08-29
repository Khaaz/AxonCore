<a id="collection"></a>

# Collection ⇐ <code>Map</code>
Holds a bunch of something.  
Based on Eris Collection.

**Kind**: global class  
**Extends**: <code>Map</code>  
**Author**: KhaaZ  

[Collection](#Collection) ⇐ <code>Map</code>
- _static_
  - [Collection](#Collection)
    - [new Collection([baseObject], iterable)](#Collection_new)
- _instance_
  - [new Collection([baseObject], iterable)](#new_Collection_new)
  - [toArray()](#toArray) ⇒ <code>Array.&lt;Class&gt;</code>
  - [toObject()](#toObject) ⇒ <code>Object.&lt;key:value&gt;</code>
  - [add(value, key, replace)](#add) ⇒ <code>Class</code>
  - [find(func)](#find) ⇒ <code>Class</code>
  - [map(func)](#map) ⇒ <code>Array</code>
  - [filter(func)](#filter) ⇒ <code>Array.&lt;Class&gt;</code>
  - [reduce(callbackFn, [currentIndex])](#reduce)
  - [some(func)](#some) ⇒ <code>Boolean</code>
  - [every(func)](#every) ⇒ <code>Boolean</code>
  - [update(key, value, replace)](#update) ⇒ <code>Class</code>
  - [remove(key)](#remove) ⇒ <code>Class</code>
  - [random()](#random) ⇒ <code>Class</code>

<a id="collection"></a>

## Collection

**Kind**:  static class of [<code>Collection</code>](#Collection)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| baseObject | <code>Class</code> | The base class for all items |

<a id="collection_new"></a>

### new Collection([baseObject], iterable)
Construct a Collection

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [baseObject] | <code>Class</code> | <code></code> | The base class for all items |
| iterable | <code>Object</code> |  | Iterable to construct the Map from |

<a id="toarray"></a>

### toArray() ⇒ <code>Array.&lt;Class&gt;</code>
Converts a Map to an array with the values of the map, ignoring its keys
[ value, value, value ]

**Kind**: Instance method of [<code>Collection</code>](#Collection)  

<a id="toobject"></a>

### toObject() ⇒ <code>Object.&lt;key:value&gt;</code>
Converts a Map to a javascript object
{ key: value, key: value }

**Kind**: Instance method of [<code>Collection</code>](#Collection)  

<a id="add"></a>

### add(value, key, replace) ⇒ <code>Class</code>
Adds an object
The object (value) is added only if the key isn't existing already and / or the replace param is set to true. It is also added only when the baseObject exists

**Kind**: Instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>Class</code> - The existing or newly created object  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | The ID of the object |
| key | <code>Object</code> | The object data |
| replace | <code>Boolean</code> | Whether to replace an existing object with the same ID |

<a id="find"></a>

### find(func) ⇒ <code>Class</code>
Returns the first object to make the function evaluate true

**Kind**: Instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>Class</code> - The first matching object, or undefined if no match  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | A function that takes an object and returns true if it matches |

<a id="map"></a>

### map(func) ⇒ <code>Array</code>
Returns an array with the results of applying the given function to each element

**Kind**: Instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>Array</code> - An array containing the results  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | A function that takes an object and returns something |

<a id="filter"></a>

### filter(func) ⇒ <code>Array.&lt;Class&gt;</code>
Returns all the objects that make the function evaluate true

**Kind**: Instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>Array.&lt;Class&gt;</code> - An array containing all the objects that matched  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | A function that takes an object and returns true if it matches |

<a id="reduce"></a>

### reduce(callbackFn, [currentIndex])
Reduces values by  the given function

**Kind**: Instance method of [<code>Collection</code>](#Collection)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callbackFn | <code>function</code> |  | Function to execute on each element in the array |
| [currentIndex] | <code>Number</code> | <code>0</code> | Value to use as the first argument to the first call of the callback |

<a id="some"></a>

### some(func) ⇒ <code>Boolean</code>
Tests if at least one element passes the test implemented by the provided function. Returns true if yes, or false if not.

**Kind**: Instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>Boolean</code> - An array containing all the objects that matched  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | A function that takes an object and returns true if it matches |

<a id="every"></a>

### every(func) ⇒ <code>Boolean</code>
Tests if all elements pass the test implemented by the provided function. Returns true if yes, or false if not.

**Kind**: Instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>Boolean</code> - An array containing all the objects that matched  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | A function that takes an object and returns true if it matches |

<a nameid="update"></a>

### update(key, value, replace) ⇒ <code>Class</code>
Updates an object

**Kind**: Instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>Class</code> - The updated object  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The ID of the object |
| value | <code>Object</code> | The updated object data |
| replace | <code>Boolean</code> | Whether to replace an existing object with the same ID |

<a id="remove"></a>

### remove(key) ⇒ <code>Class</code>
Removes an object

**Kind**: Instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>Class</code> - The removed object, or null if nothing was removed  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The ID of the object |

<a id="random"></a>

### random() ⇒ <code>Class</code>
Gets a random object from the Collection

**Kind**: Instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>Class</code> - The random object, or undefined if there is no match  
