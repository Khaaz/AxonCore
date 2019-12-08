<a name="LRUCache"></a>

## LRUCache
**Kind**: global class  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| limit | <code>Number</code> | Maximum size of the LRU |
| size | <code>Number</code> | Current size of the LRU |
| head | <code>Object.&lt;Node&gt;</code> |  |
| tail | <code>Object.&lt;Node&gt;</code> |  |


* [LRUCache](#LRUCache)
    * [new LRUCache()](#new_LRUCache_new)
    * _instance_
        * [.set(key, value)](#LRUCache+set)
        * [.get(key)](#LRUCache+get) ⇒ <code>\*</code>
        * [.forEach(fn)](#LRUCache+forEach)
        * [.find(func)](#LRUCache+find) ⇒ <code>Class</code>
        * [.map(func)](#LRUCache+map) ⇒ <code>Array</code>
        * [.filter(func)](#LRUCache+filter) ⇒ <code>Array.&lt;Class&gt;</code>
        * [.some(func)](#LRUCache+some) ⇒ <code>Boolean</code>
        * [.every(func)](#LRUCache+every) ⇒ <code>Boolean</code>
    * _static_
        * [.LRUCache](#LRUCache.LRUCache)
            * [new LRUCache(limit, options)](#new_LRUCache.LRUCache_new)

<a name="new_LRUCache_new"></a>

### new LRUCache()
Least Recently Used cache implementation.
Read and Write operations are in O(1)

https://medium.com/dsinjs/implementing-lru-cache-in-javascript-94ba6755cda9

<a name="LRUCache+set"></a>

### lruCache.set(key, value)
Add a value in the LRU cache.

**Kind**: instance method of [<code>LRUCache</code>](#LRUCache)  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 
| value | <code>\*</code> | 

<a name="LRUCache+get"></a>

### lruCache.get(key) ⇒ <code>\*</code>
Retrieve a value from the LRU cache

**Kind**: instance method of [<code>LRUCache</code>](#LRUCache)  
**Returns**: <code>\*</code> - value  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 

<a name="LRUCache+forEach"></a>

### lruCache.forEach(fn)
Execute a function against every element of the Collection

**Kind**: instance method of [<code>LRUCache</code>](#LRUCache)  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="LRUCache+find"></a>

### lruCache.find(func) ⇒ <code>Class</code>
Return the first object to make the function evaluate true

**Kind**: instance method of [<code>LRUCache</code>](#LRUCache)  
**Returns**: <code>Class</code> - The first matching object, or null if no match  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | A function that takes an object and returns true if it matches |

<a name="LRUCache+map"></a>

### lruCache.map(func) ⇒ <code>Array</code>
Return an array with the results of applying the given function to each element

**Kind**: instance method of [<code>LRUCache</code>](#LRUCache)  
**Returns**: <code>Array</code> - An array containing the results  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | A function that takes an object and returns something |

<a name="LRUCache+filter"></a>

### lruCache.filter(func) ⇒ <code>Array.&lt;Class&gt;</code>
Return all the objects that make the function evaluate true

**Kind**: instance method of [<code>LRUCache</code>](#LRUCache)  
**Returns**: <code>Array.&lt;Class&gt;</code> - An array containing all the objects that matched  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | A function that takes an object and returns true if it matches |

<a name="LRUCache+some"></a>

### lruCache.some(func) ⇒ <code>Boolean</code>
Test if at least one element passes the test implemented by the provided function. Returns true if yes, or false if not.

**Kind**: instance method of [<code>LRUCache</code>](#LRUCache)  
**Returns**: <code>Boolean</code> - An array containing all the objects that matched  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | A function that takes an object and returns true if it matches |

<a name="LRUCache+every"></a>

### lruCache.every(func) ⇒ <code>Boolean</code>
Test if all elements passe the test implemented by the provided function. Returns true if yes, or false if not.

**Kind**: instance method of [<code>LRUCache</code>](#LRUCache)  
**Returns**: <code>Boolean</code> - An array containing all the objects that matched  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | A function that takes an object and returns true if it matches |

<a name="LRUCache.LRUCache"></a>

### LRUCache.LRUCache
**Kind**: static class of [<code>LRUCache</code>](#LRUCache)  
<a name="new_LRUCache.LRUCache_new"></a>

#### new LRUCache(limit, options)
Creates an instance of LRUCache.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| limit | <code>Number</code> |  | Max number of element in the Collection |
| options | <code>Object</code> |  | Options used to construct the Collection |
| [options.base] | <code>Class</code> | <code></code> |  |
| [options.iterable] | <code>Array</code> \| <code>Object</code> | <code></code> |  |

