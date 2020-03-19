## Classes

<dl>
<dt><a href="#Collector">Collector</a> ⇐ <code>EventEmitter</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Timeout">Timeout</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="Collector"></a>

## Collector ⇐ <code>EventEmitter</code>
**Kind**: global class  
**Extends**: <code>EventEmitter</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| _axon | <code>AxonClient</code> | The AxonClient instance |
| collectors | <code>Collection.&lt;CollectorContainer.&lt;T&gt;&gt;</code> | Collection of CollectorContainer |
| timeoutQueue | [<code>SortedList.&lt;Timeout&gt;</code>](#Timeout) | The current timeout sorted with the first timeout due at the top of the queue |
| _INCREMENT | <code>Number</code> | Unique increment count used to generate ids |
| running | <code>Boolean</code> | Whether the Collector is currently running |
| _intervalID | <code>String</code> | setInterval ID used to clear setinterval |


* [Collector](#Collector) ⇐ <code>EventEmitter</code>
    * [new Collector()](#new_Collector_new)
    * _instance_
        * [.axon](#Collector+axon) : <code>AxonClient</code>
        * [.bot](#Collector+bot) : <code>BotClient</code>
        * [.lib](#Collector+lib) : <code>LibraryInterface</code>
        * [.INCREMENT](#Collector+INCREMENT) : <code>Number</code>
        * [._genID()](#Collector+_genID) ⇒ <code>String</code>
        * [.run(...args)](#Collector+run) ⇒ <code>Promise.&lt;Map.&lt;String, T&gt;&gt;</code>
        * [.setListeners()](#Collector+setListeners)
        * [.unsetListeners()](#Collector+unsetListeners)
        * [._run([options])](#Collector+_run) ⇒ <code>Promise.&lt;Map.&lt;String, T&gt;&gt;</code>
        * [.timeout()](#Collector+timeout)
        * [.onCollect(collectors, param, collected)](#Collector+onCollect)
        * [.onTimeout(id)](#Collector+onTimeout)
        * ["collect" (collectors, obj)](#Collector+event_collect)
        * ["timeout" (id)](#Collector+event_timeout)
    * _static_
        * [.Collector](#Collector.Collector)
            * [new Collector(axonClient)](#new_Collector.Collector_new)

<a name="new_Collector_new"></a>

### new Collector()
Base Collector class
Collect a specific number of an element.
Resolve with a Collection of the element collected.
Timeout if needed.
It is advised to only use one instance per Collector type.
This Collector handles using only one Collector instance with many collectors running.

<a name="Collector+axon"></a>

### collector.axon : <code>AxonClient</code>
The AxonClient instance

**Kind**: instance property of [<code>Collector</code>](#Collector)  
**Read only**: true  
<a name="Collector+bot"></a>

### collector.bot : <code>BotClient</code>
The BotClient instance

**Kind**: instance property of [<code>Collector</code>](#Collector)  
**Read only**: true  
<a name="Collector+lib"></a>

### collector.lib : <code>LibraryInterface</code>
The LibraryInterface instance

**Kind**: instance property of [<code>Collector</code>](#Collector)  
**Read only**: true  
<a name="Collector+INCREMENT"></a>

### collector.INCREMENT : <code>Number</code>
The current INCREMENT count.
Reset at 9999

**Kind**: instance property of [<code>Collector</code>](#Collector)  
**Read only**: true  
<a name="Collector+_genID"></a>

### collector.\_genID() ⇒ <code>String</code>
Generate a unique ID by using the current timestamp and appending a count (INCREMENT)

**Kind**: instance method of [<code>Collector</code>](#Collector)  
**Returns**: <code>String</code> - The unique ID generated  
<a name="Collector+run"></a>

### collector.run(...args) ⇒ <code>Promise.&lt;Map.&lt;String, T&gt;&gt;</code>
Run this Collector. Main method (called by the user).
Should be overriden in any child that extends this class.

**Kind**: instance method of [<code>Collector</code>](#Collector)  
**Returns**: <code>Promise.&lt;Map.&lt;String, T&gt;&gt;</code> - - Map of elements resolved  

| Param | Type |
| --- | --- |
| ...args | <code>any</code> | 

<a name="Collector+setListeners"></a>

### collector.setListeners()
Set all listeners to the relevant function (listen to the event)

**Kind**: instance method of [<code>Collector</code>](#Collector)  
<a name="Collector+unsetListeners"></a>

### collector.unsetListeners()
Unset all listeners (stop listening)

**Kind**: instance method of [<code>Collector</code>](#Collector)  
<a name="Collector+_run"></a>

### collector.\_run([options]) ⇒ <code>Promise.&lt;Map.&lt;String, T&gt;&gt;</code>
Run this Collector with the given options

**Kind**: instance method of [<code>Collector</code>](#Collector)  
**Returns**: <code>Promise.&lt;Map.&lt;String, T&gt;&gt;</code> - - Map of elements resolved  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> |  |
| options.timeout | <code>Number</code> |  | Number of milliseconds before timing out |
| options.count | <code>Number</code> |  | Number of elements to collect before resolving |

<a name="Collector+timeout"></a>

### collector.timeout()
Handles checking for timeout via setInterval

**Kind**: instance method of [<code>Collector</code>](#Collector)  
<a name="Collector+onCollect"></a>

### collector.onCollect(collectors, param, collected)
Handles on collect action

**Kind**: instance method of [<code>Collector</code>](#Collector)  

| Param | Type | Description |
| --- | --- | --- |
| collectors | <code>Array.&lt;CollectorContainer&gt;</code> |  |
| param | <code>Object</code> | { id, collected } |
| param.id | <code>String</code> | The collected element id |
| collected | <code>T</code> | Element collected |

<a name="Collector+onTimeout"></a>

### collector.onTimeout(id)
Handles on timeout action

**Kind**: instance method of [<code>Collector</code>](#Collector)  

| Param | Type |
| --- | --- |
| id | <code>String</code> | 

<a name="Collector+event_collect"></a>

### "collect" (collectors, obj)
Fired to collect an element

**Kind**: event emitted by [<code>Collector</code>](#Collector)  

| Param | Type | Description |
| --- | --- | --- |
| collectors | <code>Array.&lt;CollectorContainer.&lt;T&gt;&gt;</code> | The collectors that will collect the element |
| obj | <code>Object</code> |  |
| obj.id | <code>String</code> | The collected element id |
| obj.collected | <code>T</code> | The collected element |

<a name="Collector+event_timeout"></a>

### "timeout" (id)
Fired on timeout for a CollectorContainer

**Kind**: event emitted by [<code>Collector</code>](#Collector)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The id of the CollectorContainer that timed out |

<a name="Collector.Collector"></a>

### Collector.Collector
**Kind**: static class of [<code>Collector</code>](#Collector)  
<a name="new_Collector.Collector_new"></a>

#### new Collector(axonClient)
Creates an instance of Collector.


| Param | Type |
| --- | --- |
| axonClient | <code>AxonClient</code> | 

<a name="Timeout"></a>

## Timeout : <code>Object</code>
**Kind**: global typedef  
