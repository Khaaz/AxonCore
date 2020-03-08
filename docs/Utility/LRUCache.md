## Classes

<dl>
<dt><a href="#Node">Node</a></dt>
<dd></dd>
<dt><a href="#Node">Node</a></dt>
<dd></dd>
<dt><a href="#LRUCache">LRUCache</a></dt>
<dd></dd>
</dl>

<a name="Node"></a>

## Node
**Kind**: global class  
**Author**: KhaaZ  
<a name="new_Node_new"></a>

### new Node(key, [value], [next], [prev])
Creates an instance of Node


| Param | Type | Default |
| --- | --- | --- |
| key | <code>String</code> |  | 
| [value] | <code>T</code> |  | 
| [next] | <code>Node.&lt;T&gt;</code> | <code></code> | 
| [prev] | <code>Node.&lt;T&gt;</code> | <code></code> | 

<a name="Node"></a>

## Node
**Kind**: global class  
<a name="new_Node_new"></a>

### new Node(key, [value], [next], [prev])
Creates an instance of Node


| Param | Type | Default |
| --- | --- | --- |
| key | <code>String</code> |  | 
| [value] | <code>T</code> |  | 
| [next] | <code>Node.&lt;T&gt;</code> | <code></code> | 
| [prev] | <code>Node.&lt;T&gt;</code> | <code></code> | 

<a name="LRUCache"></a>

## LRUCache
**Kind**: global class  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| limit | <code>Number</code> | Maximum size of the LRU |
| size | <code>Number</code> | Current size of the LRU |
| head | <code>Node.&lt;T&gt;</code> |  |
| tail | <code>Node.&lt;T&gt;</code> |  |
| _cache | <code>Collection.&lt;T&gt;</code> | The Collection holding the cache (private, handled by the LRU structure) |


* [LRUCache](#LRUCache)
    * [new LRUCache()](#new_LRUCache_new)
    * _instance_
        * [.head](#LRUCache+head) : <code>Node.&lt;T&gt;</code>
        * [.tail](#LRUCache+tail) : <code>Node.&lt;T&gt;</code>
        * [._cache](#LRUCache+_cache) : <code>Collection.&lt;T&gt;</code>
        * [.set(key, value)](#LRUCache+set)
        * [.get(key)](#LRUCache+get) ⇒ <code>T</code>
        * [.remove(key)](#LRUCache+remove)
        * [.clear()](#LRUCache+clear)
        * [.forEach(fn)](#LRUCache+forEach)
        * [.find(func)](#LRUCache+find) ⇒ <code>T</code>
        * [.map(func)](#LRUCache+map) ⇒ <code>Array.&lt;R&gt;</code>
        * [.filter(func)](#LRUCache+filter) ⇒ <code>Array.&lt;T&gt;</code>
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

<a name="LRUCache+head"></a>

### lruCache.head : <code>Node.&lt;T&gt;</code>
**Kind**: instance property of [<code>LRUCache</code>](#LRUCache)  
<a name="LRUCache+tail"></a>

### lruCache.tail : <code>Node.&lt;T&gt;</code>
**Kind**: instance property of [<code>LRUCache</code>](#LRUCache)  
<a name="LRUCache+_cache"></a>

### lruCache.\_cache : <code>Collection.&lt;T&gt;</code>
**Kind**: instance property of [<code>LRUCache</code>](#LRUCache)  
<a name="LRUCache+set"></a>

### lruCache.set(key, value)
Add a value in the LRU cache.

**Kind**: instance method of [<code>LRUCache</code>](#LRUCache)  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 
| value | <code>T</code> | 

<a name="LRUCache+get"></a>

### lruCache.get(key) ⇒ <code>T</code>
Retrieve a value from the LRU cache

**Kind**: instance method of [<code>LRUCache</code>](#LRUCache)  
**Returns**: <code>T</code> - value  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 

<a name="LRUCache+remove"></a>

### lruCache.remove(key)
Remove an element from the LRUCache

**Kind**: instance method of [<code>LRUCache</code>](#LRUCache)  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 

<a name="LRUCache+clear"></a>

### lruCache.clear()
Empty the LRUCache entirely

**Kind**: instance method of [<code>LRUCache</code>](#LRUCache)  
<a name="LRUCache+forEach"></a>

### lruCache.forEach(fn)
Execute a function against every element of the Collection

**Kind**: instance method of [<code>LRUCache</code>](#LRUCache)  

| Param |
| --- |
| fn | 

<a name="LRUCache+find"></a>

### lruCache.find(func) ⇒ <code>T</code>
Return the first object to make the function evaluate true

**Kind**: instance method of [<code>LRUCache</code>](#LRUCache)  
**Returns**: <code>T</code> - The first matching object, or null if no match  

| Param |
| --- |
| func | 

<a name="LRUCache+map"></a>

### lruCache.map(func) ⇒ <code>Array.&lt;R&gt;</code>
Return an array with the results of applying the given function to each element

**Kind**: instance method of [<code>LRUCache</code>](#LRUCache)  
**Returns**: <code>Array.&lt;R&gt;</code> - An array containing the results  

| Param |
| --- |
| func | 

<a name="LRUCache+filter"></a>

### lruCache.filter(func) ⇒ <code>Array.&lt;T&gt;</code>
Return all the objects that make the function evaluate true

**Kind**: instance method of [<code>LRUCache</code>](#LRUCache)  
**Returns**: <code>Array.&lt;T&gt;</code> - An array containing all the objects that matched  

| Param |
| --- |
| func | 

<a name="LRUCache+some"></a>

### lruCache.some(func) ⇒ <code>Boolean</code>
Test if at least one element passes the test implemented by the provided function. Returns true if yes, or false if not.

**Kind**: instance method of [<code>LRUCache</code>](#LRUCache)  
**Returns**: <code>Boolean</code> - An array containing all the objects that matched  

| Param |
| --- |
| func | 

<a name="LRUCache+every"></a>

### lruCache.every(func) ⇒ <code>Boolean</code>
Test if all elements pass the test implemented by the provided function. Returns true if yes, or false if not.

**Kind**: instance method of [<code>LRUCache</code>](#LRUCache)  
**Returns**: <code>Boolean</code> - An array containing all the objects that matched  

| Param |
| --- |
| func | 

<a name="LRUCache.LRUCache"></a>

### LRUCache.LRUCache
**Kind**: static class of [<code>LRUCache</code>](#LRUCache)  
<a name="new_LRUCache.LRUCache_new"></a>

#### new LRUCache(limit, options)
Creates an instance of LRUCache.


| Param | Type | Description |
| --- | --- | --- |
| limit | <code>Number</code> | Max number of element in the Collection |
| options | <code>Object</code> | Options used to construct the Collection |
|  |  |  |
|  |  |  |

