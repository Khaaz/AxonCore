## Classes

<dl>
<dt><a href="#MessageCollector">MessageCollector</a> ⇐ <code>EventEmitter</code></dt>
<dd></dd>
<dt><a href="#MessageCollector">MessageCollector</a></dt>
<dd></dd>
</dl>

<a name="MessageCollector"></a>

## MessageCollector ⇐ <code>EventEmitter</code>
**Kind**: global class  
**Extends**: <code>EventEmitter</code>  
**Author**: VoidNulll  

* [MessageCollector](#MessageCollector) ⇐ <code>EventEmitter</code>
    * [new MessageCollector()](#new_MessageCollector_new)
    * [new MessageCollector(client, [options])](#new_MessageCollector_new)
    * [.run(channel, [options])](#MessageCollector+run) ⇒ <code>Promise</code>
    * [.delete(mID)](#MessageCollector+delete) ⇒ <code>Collection</code>

<a name="new_MessageCollector_new"></a>

### new MessageCollector()
Collect bunch of message object according to choosen options

<a name="new_MessageCollector_new"></a>

### new MessageCollector(client, [options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| client | <code>Object.&lt;AxonClient&gt;</code> |  | The axon client object |
| [options] | <code>Object</code> |  | The default options for the message collector instance |
| [options.timeout] | <code>Number</code> | <code>60000</code> | The time before the collector times out in milliseconds |
| [options.count] | <code>Number</code> | <code>100</code> | The amount of messages to collect before automatically ending |
| [options.ignoreBots] | <code>Boolean</code> | <code>true</code> | Whether or not to ignore bots |
| [options.uID] | <code>String</code> |  | The user id to listen for (listens to all messages if not specified) |
| [options.caseSensitive] | <code>Boolean</code> | <code>false</code> | Whether or not to return messages with content lowercased. Default: content unchanged |

**Example**  
```js
const collector = new MessageCollector(this.axon, { count: 10, ignoreBots: false });
```
<a name="MessageCollector+run"></a>

### messageCollector.run(channel, [options]) ⇒ <code>Promise</code>
Runs the message collector

**Kind**: instance method of [<code>MessageCollector</code>](#MessageCollector)  
**Returns**: <code>Promise</code> - Map of messages collected.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| channel | <code>Object.&lt;Channel&gt;</code> |  | The channel object to listen to |
| [options] | <code>Object</code> |  | The options for the message collector |
| [options.timeout] | <code>Number</code> | <code>60000</code> | The time before the collector times out in milliseconds |
| [options.count] | <code>Number</code> | <code>100</code> | The amount of messages to collect before automatically ending |
| [options.ignoreBots] | <code>Boolean</code> | <code>true</code> | Whether or not to ignore bots |
| [options.uID] | <code>String</code> |  | The user id to listen for (listens to all messages if not specified) |
| [options.caseSensitive] | <code>Boolean</code> | <code>true</code> | Whether or not to return messages with content lowercased. Default: content not changed |

**Example**  
```js
const messages = await collector.run(msg.channel, { caseInsensitive: false });
```
<a name="MessageCollector+delete"></a>

### messageCollector.delete(mID) ⇒ <code>Collection</code>
Removes a message from the messages collected

**Kind**: instance method of [<code>MessageCollector</code>](#MessageCollector)  
**Returns**: <code>Collection</code> - Collection of messages collected, now excluding the removed message.  

| Param | Type | Description |
| --- | --- | --- |
| mID | <code>String</code> | The id of the message you want to remove |

**Example**  
```js
collector.delete('542164538347225118')
```
<a name="MessageCollector"></a>

## MessageCollector
**Kind**: global class  

* [MessageCollector](#MessageCollector)
    * [new MessageCollector()](#new_MessageCollector_new)
    * [new MessageCollector(client, [options])](#new_MessageCollector_new)
    * [.run(channel, [options])](#MessageCollector+run) ⇒ <code>Promise</code>
    * [.delete(mID)](#MessageCollector+delete) ⇒ <code>Collection</code>

<a name="new_MessageCollector_new"></a>

### new MessageCollector()
Collect bunch of message object according to choosen options

<a name="new_MessageCollector_new"></a>

### new MessageCollector(client, [options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| client | <code>Object.&lt;AxonClient&gt;</code> |  | The axon client object |
| [options] | <code>Object</code> |  | The default options for the message collector instance |
| [options.timeout] | <code>Number</code> | <code>60000</code> | The time before the collector times out in milliseconds |
| [options.count] | <code>Number</code> | <code>100</code> | The amount of messages to collect before automatically ending |
| [options.ignoreBots] | <code>Boolean</code> | <code>true</code> | Whether or not to ignore bots |
| [options.uID] | <code>String</code> |  | The user id to listen for (listens to all messages if not specified) |
| [options.caseSensitive] | <code>Boolean</code> | <code>false</code> | Whether or not to return messages with content lowercased. Default: content unchanged |

**Example**  
```js
const collector = new MessageCollector(this.axon, { count: 10, ignoreBots: false });
```
<a name="MessageCollector+run"></a>

### messageCollector.run(channel, [options]) ⇒ <code>Promise</code>
Runs the message collector

**Kind**: instance method of [<code>MessageCollector</code>](#MessageCollector)  
**Returns**: <code>Promise</code> - Map of messages collected.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| channel | <code>Object.&lt;Channel&gt;</code> |  | The channel object to listen to |
| [options] | <code>Object</code> |  | The options for the message collector |
| [options.timeout] | <code>Number</code> | <code>60000</code> | The time before the collector times out in milliseconds |
| [options.count] | <code>Number</code> | <code>100</code> | The amount of messages to collect before automatically ending |
| [options.ignoreBots] | <code>Boolean</code> | <code>true</code> | Whether or not to ignore bots |
| [options.uID] | <code>String</code> |  | The user id to listen for (listens to all messages if not specified) |
| [options.caseSensitive] | <code>Boolean</code> | <code>true</code> | Whether or not to return messages with content lowercased. Default: content not changed |

**Example**  
```js
const messages = await collector.run(msg.channel, { caseInsensitive: false });
```
<a name="MessageCollector+delete"></a>

### messageCollector.delete(mID) ⇒ <code>Collection</code>
Removes a message from the messages collected

**Kind**: instance method of [<code>MessageCollector</code>](#MessageCollector)  
**Returns**: <code>Collection</code> - Collection of messages collected, now excluding the removed message.  

| Param | Type | Description |
| --- | --- | --- |
| mID | <code>String</code> | The id of the message you want to remove |

**Example**  
```js
collector.delete('542164538347225118')
```
