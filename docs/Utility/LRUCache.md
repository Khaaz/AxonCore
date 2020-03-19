## Classes

<dl>
<dt><a href="#Node">Node</a></dt>
<dd></dd>
<dt><a href="#Node">Node</a></dt>
<dd></dd>
<dt><a href="#LRUCache">LRUCache</a> ⇐ <code>Store&lt;Node&lt;T&gt;&gt;</code></dt>
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

## LRUCache ⇐ <code>Store&lt;Node&lt;T&gt;&gt;</code>
**Kind**: global class  
**Extends**: <code>Store&lt;Node&lt;T&gt;&gt;</code>  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| limit | <code>Number</code> | Maximum size of the LRU |
| head | <code>Node.&lt;T&gt;</code> |  |
| tail | <code>Node.&lt;T&gt;</code> |  |


* [LRUCache](#LRUCache) ⇐ <code>Store&lt;Node&lt;T&gt;&gt;</code>
    * [new LRUCache()](#new_LRUCache_new)
    * _instance_
        * [.head](#LRUCache+head) : <code>Node.&lt;T&gt;</code>
        * [.tail](#LRUCache+tail) : <code>Node.&lt;T&gt;</code>
        * [.get(key)](#LRUCache+get) ⇒ <code>T</code>
        * [.set(key, value)](#LRUCache+set)
        * [.delete(key)](#LRUCache+delete) ⇒ <code>Boolean</code>
        * [.clear()](#LRUCache+clear)
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
<a name="LRUCache+get"></a>

### lruCache.get(key) ⇒ <code>T</code>
Retrieve a value from the LRU cache

**Kind**: instance method of [<code>LRUCache</code>](#LRUCache)  
**Returns**: <code>T</code> - value  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 

<a name="LRUCache+set"></a>

### lruCache.set(key, value)
Add a value in the LRU cache.

**Kind**: instance method of [<code>LRUCache</code>](#LRUCache)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> |  |
| value | <code>T</code> |  |
|  | <code>LRUCache.&lt;T&gt;</code> | The current LRUCache |

<a name="LRUCache+delete"></a>

### lruCache.delete(key) ⇒ <code>Boolean</code>
Delete an element from the LRUCache

**Kind**: instance method of [<code>LRUCache</code>](#LRUCache)  
**Returns**: <code>Boolean</code> - - Wether it deleted the item or not  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 

<a name="LRUCache+clear"></a>

### lruCache.clear()
Empty the LRUCache entirely

**Kind**: instance method of [<code>LRUCache</code>](#LRUCache)  
<a name="LRUCache.LRUCache"></a>

### LRUCache.LRUCache
**Kind**: static class of [<code>LRUCache</code>](#LRUCache)  
<a name="new_LRUCache.LRUCache_new"></a>

#### new LRUCache(limit, options)
Creates an instance of LRUCache.


| Param | Type | Description |
| --- | --- | --- |
| limit | <code>Number</code> | Max number of elements in the cache |
| options | <code>Object</code> | Options used to construct the cache |
|  |  |  |

