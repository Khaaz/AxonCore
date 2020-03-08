<a name="MessageCollector"></a>

## MessageCollector ⇐ <code>Collector</code>
**Kind**: global class  
**Extends**: <code>Collector</code>  
**Author**: VoidNull, KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.timeout | <code>Number</code> | Number of ms before timing out |
| options.count | <code>Number</code> | Number of messages to collect |
| options.ignoreBots | <code>Boolean</code> | Whether to ignore bots |
| options.userID | <code>String</code> | Specify a userID to only collect message from this user |


* [MessageCollector](#MessageCollector) ⇐ <code>Collector</code>
    * [new MessageCollector()](#new_MessageCollector_new)
    * _instance_
        * [.run(channel, [options])](#MessageCollector+run) ⇒ <code>Promise.&lt;Map.&lt;Message&gt;&gt;</code>
        * [.getCollectors(message)](#MessageCollector+getCollectors) ⇒ <code>Array.&lt;CollectorContainer&gt;</code>
        * [._onMessageCreate(msg)](#MessageCollector+_onMessageCreate)
        * [._onMessageDelete(msg)](#MessageCollector+_onMessageDelete)
        * [._onMessageUpdate(oldMsg, msg)](#MessageCollector+_onMessageUpdate)
    * _static_
        * [.MessageCollector](#MessageCollector.MessageCollector)
            * [new MessageCollector(client, [options])](#new_MessageCollector.MessageCollector_new)

<a name="new_MessageCollector_new"></a>

### new MessageCollector()
Collect bunch of message object according to chosen options

<a name="MessageCollector+run"></a>

### messageCollector.run(channel, [options]) ⇒ <code>Promise.&lt;Map.&lt;Message&gt;&gt;</code>
Runs the message collector

**Kind**: instance method of [<code>MessageCollector</code>](#MessageCollector)  
**Returns**: <code>Promise.&lt;Map.&lt;Message&gt;&gt;</code> - Map of messages collected.  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>Channel</code> | The channel object to listen to |
| [options] | <code>Object</code> | The options for the message collector |
| [options.timeout] | <code>Number</code> | The time before the collector times out in milliseconds |
| [options.count] | <code>Number</code> | The amount of messages to collect before automatically ending |
| [options.ignoreBots] | <code>Boolean</code> | Whether or not to ignore bots |
| [options.userID] | <code>String</code> | The user id to listen for (listens to all messages if not specified) |

**Example**  
```js
const messages = await collector.run(msg.channel, { caseInsensitive: false });
```
<a name="MessageCollector+getCollectors"></a>

### messageCollector.getCollectors(message) ⇒ <code>Array.&lt;CollectorContainer&gt;</code>
Get all CollectorContainers that will collect from this particular message

**Kind**: instance method of [<code>MessageCollector</code>](#MessageCollector)  

| Param | Type |
| --- | --- |
| message | <code>Message</code> | 

<a name="MessageCollector+_onMessageCreate"></a>

### messageCollector.\_onMessageCreate(msg)
Function bound to messageCreate event.
Collect the message for all collectors that respond to the criteria
Emits collect event.

**Kind**: instance method of [<code>MessageCollector</code>](#MessageCollector)  

| Param | Type |
| --- | --- |
| msg | <code>Message</code> | 

<a name="MessageCollector+_onMessageDelete"></a>

### messageCollector.\_onMessageDelete(msg)
Function bound to messageDelete event.
Remove the message from all collector that collected this message

**Kind**: instance method of [<code>MessageCollector</code>](#MessageCollector)  

| Param | Type |
| --- | --- |
| msg | <code>Message</code> | 

<a name="MessageCollector+_onMessageUpdate"></a>

### messageCollector.\_onMessageUpdate(oldMsg, msg)
Function bound to messageUpdate event.
Updates the message from all collector that collected this message

**Kind**: instance method of [<code>MessageCollector</code>](#MessageCollector)  

| Param | Type |
| --- | --- |
| oldMsg | <code>Message</code> | 
| msg | <code>Message</code> | 

<a name="MessageCollector.MessageCollector"></a>

### MessageCollector.MessageCollector
**Kind**: static class of [<code>MessageCollector</code>](#MessageCollector)  
<a name="new_MessageCollector.MessageCollector_new"></a>

#### new MessageCollector(client, [options])
Creates an instance of MessageCollector


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| client | <code>AxonClient</code> |  | The axon client object |
| [options] | <code>Object</code> |  | The default options for the message collector instance |
| [options.timeout] | <code>Number</code> | <code>10000</code> | The time before the collector times out in milliseconds |
| [options.count] | <code>Number</code> | <code>10</code> | The amount of messages to collect before automatically ending |
| [options.ignoreBots] | <code>Boolean</code> | <code>true</code> | Whether or not to ignore bots |
| [options.userID] | <code>String</code> |  | The user id to listen for (listens to all messages if not specified) |

**Example**  
```js
const collector = new MessageCollector(this.axon, { count: 10, ignoreBots: false });
```
