<a id="messagecollector"></a>

## MessageCollector ⇐ <code>EventEmitter</code>
Collect bunch of message object according to choosen options.  

**Kind**: global class  
**Author**: VoidNulll  

[MessageCollector](#MessageCollector)
- _static_
  - [MessageCollectot](#MessageCollector)
    - [new MessageCollector(client, [options])](#MessageCollector_new)
- _instance_
  - [run(channel, [options])](#run) ⇒ <code>Promise</code>
  - [delete(mID)](#delete) ⇒ <code>Collection</code>

<a id="messageCcllector_new"></a>

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

<a ic="run"></a>

### run(channel, [options]) ⇒ <code>Promise</code>
Runs the message collector.  

**Kind**: instance method of [<code>MessageCollector</code>](#MessageCollector)  
**Returns**: <code>Promise</code> - Map of messages collected.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| channel | <code>Object</code> |  | The channel object to listen to |
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

<a id="delete"></a>

### delete(mID) ⇒ <code>Collection</code>
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
