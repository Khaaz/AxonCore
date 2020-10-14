<a name="ReactionCollector"></a>

## ReactionCollector ⇐ <code>Collector&lt;Message&gt;</code>
**Kind**: global class  
**Extends**: <code>Collector&lt;Message&gt;</code>  
**Author**: Bsian, KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.timeout | <code>Number</code> | Number of ms before timing out |
| options.count | <code>Number</code> | Number of reactions to collect |
| options.ignoreBots | <code>Boolean</code> | Whether to ignore bots |
| options.userID | <code>String</code> | Specify a userID to only collect message from this user |


* [ReactionCollector](#ReactionCollector) ⇐ <code>Collector&lt;Message&gt;</code>
    * [new ReactionCollector()](#new_ReactionCollector_new)
    * _instance_
        * [.run(message, [options])](#ReactionCollector+run) ⇒ <code>Promise.&lt;Map.&lt;String, Message&gt;&gt;</code>
        * [.getCollectors(message)](#ReactionCollector+getCollectors) ⇒ <code>Array.&lt;CollectorContainer.&lt;Message&gt;&gt;</code>
        * [._onMessageReactionAdd(msg, emoji, userID)](#ReactionCollector+_onMessageReactionAdd)
        * [._onMessageReactionRemove(msg, emoji, userID)](#ReactionCollector+_onMessageReactionRemove)
        * [._onMessageReactionRemoveAll(msg)](#ReactionCollector+_onMessageReactionRemoveAll)
        * [._onMessageReactionRemoveEmoji(msg, emoji)](#ReactionCollector+_onMessageReactionRemoveEmoji)
    * _static_
        * [.ReactionCollector](#ReactionCollector.ReactionCollector)
            * [new ReactionCollector(client, [options])](#new_ReactionCollector.ReactionCollector_new)

<a name="new_ReactionCollector_new"></a>

### new ReactionCollector()
Collect bunch of message object according to chosen options

<a name="ReactionCollector+run"></a>

### reactionCollector.run(message, [options]) ⇒ <code>Promise.&lt;Map.&lt;String, Message&gt;&gt;</code>
Runs the message collector

**Kind**: instance method of [<code>ReactionCollector</code>](#ReactionCollector)  
**Returns**: <code>Promise.&lt;Map.&lt;String, Message&gt;&gt;</code> - Map of messages collected.  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>Message</code> | The message object to listen to |
| [options] | <code>Object</code> | The options for the reaction collector |
| [options.timeout] | <code>Number</code> | The time before the collector times out in milliseconds |
| [options.count] | <code>Number</code> | The amount of reactions to collect before automatically ending |
| [options.ignoreBots] | <code>Boolean</code> | Whether or not to ignore bots |
| [options.userID] | <code>String</code> | The user id to listen for (listens to all messages if not specified) |
| [options.emojis] | <code>Array.&lt;String&gt;</code> | The specific reactions to collect (collects all reactions if not specified) |

**Example**  
```js
const reactions = await collector.run(msg, { count: 10 });
```
<a name="ReactionCollector+getCollectors"></a>

### reactionCollector.getCollectors(message) ⇒ <code>Array.&lt;CollectorContainer.&lt;Message&gt;&gt;</code>
Get all CollectorContainers that will collect from this particular message

**Kind**: instance method of [<code>ReactionCollector</code>](#ReactionCollector)  

| Param | Type |
| --- | --- |
| message | <code>Message</code> | 

<a name="ReactionCollector+_onMessageReactionAdd"></a>

### reactionCollector.\_onMessageReactionAdd(msg, emoji, userID)
Function bound to messageReactionAdd event.
Collect the reaction for all collectors that respond to the criteria
Emits collect event.

**Kind**: instance method of [<code>ReactionCollector</code>](#ReactionCollector)  

| Param | Type |
| --- | --- |
| msg | <code>Message</code> | 
| emoji | <code>Emoji</code> | 
| userID | <code>String</code> | 

<a name="ReactionCollector+_onMessageReactionRemove"></a>

### reactionCollector.\_onMessageReactionRemove(msg, emoji, userID)
Function bound to messageReactionRemove event.
Remove the reaction from all collectors that collected this reaction

**Kind**: instance method of [<code>ReactionCollector</code>](#ReactionCollector)  

| Param | Type |
| --- | --- |
| msg | <code>Message</code> | 
| emoji | <code>Emoji</code> | 
| userID | <code>String</code> | 

<a name="ReactionCollector+_onMessageReactionRemoveAll"></a>

### reactionCollector.\_onMessageReactionRemoveAll(msg)
Function bound to messageReactionRemoveAll event.
Updates the reaction from all collectors that collected this reaction

**Kind**: instance method of [<code>ReactionCollector</code>](#ReactionCollector)  

| Param | Type |
| --- | --- |
| msg | <code>Message</code> | 

<a name="ReactionCollector+_onMessageReactionRemoveEmoji"></a>

### reactionCollector.\_onMessageReactionRemoveEmoji(msg, emoji)
Function bound to messageReactionRemoveEmoji event.
Updates the reaction from all collectors that collected this reaction

**Kind**: instance method of [<code>ReactionCollector</code>](#ReactionCollector)  

| Param | Type |
| --- | --- |
| msg | <code>Message</code> | 
| emoji | <code>Emoji</code> | 

<a name="ReactionCollector.ReactionCollector"></a>

### ReactionCollector.ReactionCollector
**Kind**: static class of [<code>ReactionCollector</code>](#ReactionCollector)  
<a name="new_ReactionCollector.ReactionCollector_new"></a>

#### new ReactionCollector(client, [options])
Creates an instance of ReactionCollector


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| client | <code>[AxonClient](AxonClient)</code> |  | The axon client object |
| [options] | <code>Object</code> |  | The default options for the reaction collector instance |
| [options.timeout] | <code>Number</code> | <code>10000</code> | The time before the collector times out in milliseconds |
| [options.count] | <code>Number</code> | <code>10</code> | The amount of reactions to collect before automatically ending |
| [options.ignoreBots] | <code>Boolean</code> | <code>true</code> | Whether or not to ignore bots |
| [options.userID] | <code>String</code> |  | The user id to listen for (listens to all reactions if not specified) |
| [options.emojis] | <code>Array.&lt;String&gt;</code> |  | The specific reactions to collect (collects all reactions if not specified) |

**Example**  
```js
const collector = new ReactionCollector(this.axon, { count: 10, ignoreBots: false });
```
