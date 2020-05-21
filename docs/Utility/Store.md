<a name="Store"></a>

## Store
**Kind**: global class  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| cache | <code>Map.&lt;string, T&gt;</code> | Key => Value Data structure |


* [Store](#Store)
    * [new Store()](#new_Store_new)
    * _instance_
        * [.size](#Store+size) : <code>Number</code>
        * [.entries()](#Store+entries) ⇒
        * [.keys()](#Store+keys) ⇒ <code>IterableIterator.&lt;String&gt;</code>
        * [.values()](#Store+values) ⇒ <code>IterableIterator.&lt;T&gt;</code>
        * [.has(key)](#Store+has) ⇒ <code>Boolean</code>
        * [.get(key)](#Store+get) ⇒ <code>T</code>
        * [.set(key, value)](#Store+set) ⇒ <code>[Store](Utility/Store)</code>
        * [.delete(key)](#Store+delete) ⇒ <code>Boolean</code>
        * [.toArray()](#Store+toArray) ⇒ <code>Array.&lt;T&gt;</code>
        * [.toObject()](#Store+toObject) ⇒ <code>Object.&lt;string, T&gt;</code>
        * [.first()](#Store+first) ⇒ <code>T</code>
        * [.apply(key, func, ...args)](#Store+apply) ⇒ <code>[Store](Utility/Store).&lt;T&gt;</code>
        * [.forEach(func)](#Store+forEach) ⇒ <code>[Store](Utility/Store)</code>
        * [.forEachAsync(func)](#Store+forEachAsync) ⇒ <code>Promise.&lt;[Store](Utility/Store)&gt;</code>
        * [.sweep(func)](#Store+sweep) ⇒ <code>[Store](Utility/Store)</code>
        * [.find(func)](#Store+find) ⇒ <code>T</code>
        * [.map(func)](#Store+map) ⇒ <code>Array.&lt;R&gt;</code>
        * [.filter(func)](#Store+filter) ⇒ <code>Array.&lt;T&gt;</code>
        * [.reduce(func, [initialValue])](#Store+reduce) ⇒ <code>U</code>
        * [.some(func)](#Store+some) ⇒ <code>Boolean</code>
        * [.every(func)](#Store+every) ⇒ <code>Boolean</code>
        * [.random()](#Store+random) ⇒ <code>T</code>
    * _static_
        * [.Store](#Store.Store)
            * [new Store(cache)](#new_Store.Store_new)

<a name="new_Store_new"></a>

### new Store()
Generic class that expose all data manipulation methods.
A Store can be constructed with any Key => Value structure (Map like object)
Map-like object can be anything as long as it implements the following:
- `size` property
- `entries`, `values`, `keys` iterators
- `has`, `get`, `set`, `delete` methods
It exposes all methods similar to array methods in one place.

<a name="Store+size"></a>

### store.size : <code>Number</code>
Current size of the cache

**Kind**: instance property of [<code>Store</code>](#Store)  
**Read only**: true  
<a name="Store+entries"></a>

### store.entries() ⇒
Iterator over `cache.entries`

**Kind**: instance method of [<code>Store</code>](#Store)  
<a name="Store+keys"></a>

### store.keys() ⇒ <code>IterableIterator.&lt;String&gt;</code>
Iterator over `cache.keys`

**Kind**: instance method of [<code>Store</code>](#Store)  
<a name="Store+values"></a>

### store.values() ⇒ <code>IterableIterator.&lt;T&gt;</code>
Iterator over `cache.values`

**Kind**: instance method of [<code>Store</code>](#Store)  
<a name="Store+has"></a>

### store.has(key) ⇒ <code>Boolean</code>
Whether an element exists in the Store

**Kind**: instance method of [<code>Store</code>](#Store)  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 

<a name="Store+get"></a>

### store.get(key) ⇒ <code>T</code>
Get an element by key in the Store

**Kind**: instance method of [<code>Store</code>](#Store)  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 

<a name="Store+set"></a>

### store.set(key, value) ⇒ <code>[Store](Utility/Store)</code>
Set an element in the Store

**Kind**: instance method of [<code>Store</code>](#Store)  
**Returns**: <code>[Store](Utility/Store)</code> - - Current Store  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 
| value | <code>T</code> | 

<a name="Store+delete"></a>

### store.delete(key) ⇒ <code>Boolean</code>
Delete an element by key in the Store

**Kind**: instance method of [<code>Store</code>](#Store)  
**Returns**: <code>Boolean</code> - - Whether the element was deleted or not  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 

<a name="Store+toArray"></a>

### store.toArray() ⇒ <code>Array.&lt;T&gt;</code>
`Store.cache` to array (simple array of value)

**Kind**: instance method of [<code>Store</code>](#Store)  
<a name="Store+toObject"></a>

### store.toObject() ⇒ <code>Object.&lt;string, T&gt;</code>
`Store.cache` to object

**Kind**: instance method of [<code>Store</code>](#Store)  
<a name="Store+first"></a>

### store.first() ⇒ <code>T</code>
The first value of the Store

**Kind**: instance method of [<code>Store</code>](#Store)  
**Returns**: <code>T</code> - - The first element  
<a name="Store+apply"></a>

### store.apply(key, func, ...args) ⇒ <code>[Store](Utility/Store).&lt;T&gt;</code>
Apply a function to the Store and returns a new Store.
Usable over: `map`, `filter`, `toArray`.
Using apply with toArray is pretty much "cloning" the Store.

**Kind**: instance method of [<code>Store</code>](#Store)  
**Returns**: <code>[Store](Utility/Store).&lt;T&gt;</code> - A new Store modified by the apply call  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The property to use as key for the new Store |
| func | <code>String</code> | The function name to apply to the Store |
| ...args | <code>any</code> | All the arguments that need to be applied to the function |

<a name="Store+forEach"></a>

### store.forEach(func) ⇒ <code>[Store](Utility/Store)</code>
Execute a function over each element of the Store in a synchronous fashion

**Kind**: instance method of [<code>Store</code>](#Store)  
**Returns**: <code>[Store](Utility/Store)</code> - The current Store  

| Param |
| --- |
| func | 

<a name="Store+forEachAsync"></a>

### store.forEachAsync(func) ⇒ <code>Promise.&lt;[Store](Utility/Store)&gt;</code>
Execute a function over each element of the Store in an asynchronous fashion

**Kind**: instance method of [<code>Store</code>](#Store)  
**Returns**: <code>Promise.&lt;[Store](Utility/Store)&gt;</code> - The current Store  

| Param |
| --- |
| func | 

<a name="Store+sweep"></a>

### store.sweep(func) ⇒ <code>[Store](Utility/Store)</code>
Removes from the Store all element that satisfy the function in parameter

**Kind**: instance method of [<code>Store</code>](#Store)  
**Returns**: <code>[Store](Utility/Store)</code> - - The current Store  

| Param |
| --- |
| func | 

<a name="Store+find"></a>

### store.find(func) ⇒ <code>T</code>
Return the first object to make the function evaluate true

**Kind**: instance method of [<code>Store</code>](#Store)  
**Returns**: <code>T</code> - The first matching object, or null if no match  

| Param |
| --- |
| func | 

<a name="Store+map"></a>

### store.map(func) ⇒ <code>Array.&lt;R&gt;</code>
Return an array with the results of applying the given function to each element

**Kind**: instance method of [<code>Store</code>](#Store)  
**Returns**: <code>Array.&lt;R&gt;</code> - An array containing the results  

| Param |
| --- |
| func | 

<a name="Store+filter"></a>

### store.filter(func) ⇒ <code>Array.&lt;T&gt;</code>
Return all the objects that make the function evaluate true

**Kind**: instance method of [<code>Store</code>](#Store)  
**Returns**: <code>Array.&lt;T&gt;</code> - An array containing all the objects that matched  

| Param |
| --- |
| func | 

<a name="Store+reduce"></a>

### store.reduce(func, [initialValue]) ⇒ <code>U</code>
Reduce values by function

**Kind**: instance method of [<code>Store</code>](#Store)  
**Returns**: <code>U</code> - Accumulator  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| func |  |  |  |
| [initialValue] | <code>Number</code> | <code>0</code> | Value to use as the first argument to the first call of the callback |

<a name="Store+some"></a>

### store.some(func) ⇒ <code>Boolean</code>
Test if at least one element passes the test implemented by the provided function. Returns true if yes, or false if not.

**Kind**: instance method of [<code>Store</code>](#Store)  
**Returns**: <code>Boolean</code> - Whether or not any of the elements returned true  

| Param |
| --- |
| func | 

<a name="Store+every"></a>

### store.every(func) ⇒ <code>Boolean</code>
Test if all elements pass the test implemented by the provided function. Returns true if yes, or false if not.

**Kind**: instance method of [<code>Store</code>](#Store)  
**Returns**: <code>Boolean</code> - Whether or not all of the elements returned true  

| Param |
| --- |
| func | 

<a name="Store+random"></a>

### store.random() ⇒ <code>T</code>
Get a random object from the Store

**Kind**: instance method of [<code>Store</code>](#Store)  
**Returns**: <code>T</code> - The random object, or null if there is no match  
<a name="Store.Store"></a>

### Store.Store
**Kind**: static class of [<code>Store</code>](#Store)  
<a name="new_Store.Store_new"></a>

#### new Store(cache)
Creates an instance of Store.


| Param | Type | Description |
| --- | --- | --- |
| cache | <code>Map.&lt;string, T&gt;</code> | Key => Value data structure |

