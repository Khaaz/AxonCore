<a name="Queue"></a>

## Queue
**Kind**: global class  
**Author**: KhaaZ  
**Properties**

| Name | Type |
| --- | --- |
| _elements | <code>Array.&lt;T&gt;</code> | 
| max | <code>Boolean</code> | 
| replaceOnMax | <code>Boolean</code> | 


* [Queue](#Queue)
    * [new Queue()](#new_Queue_new)
    * _instance_
        * [.size](#Queue+size) : <code>Number</code>
        * [.first()](#Queue+first) ⇒ <code>T</code>
        * [.queue(elem, [replaceOnMax])](#Queue+queue) ⇒ <code>Boolean</code>
        * [.dequeue()](#Queue+dequeue) ⇒ <code>T</code>
    * _static_
        * [.Queue](#Queue.Queue)
            * [new Queue([max], [replaceOnMax])](#new_Queue.Queue_new)

<a name="new_Queue_new"></a>

### new Queue()
Queue class.

<a name="Queue+size"></a>

### queue.size : <code>Number</code>
Returns the Queue size

**Kind**: instance property of [<code>Queue</code>](#Queue)  
**Read only**: true  
<a name="Queue+first"></a>

### queue.first() ⇒ <code>T</code>
Return first element of this queue

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue+queue"></a>

### queue.queue(elem, [replaceOnMax]) ⇒ <code>Boolean</code>
Queue up an element.

**Kind**: instance method of [<code>Queue</code>](#Queue)  
**Returns**: <code>Boolean</code> - Whether element was successfully added  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>T</code> |  |
| [replaceOnMax] | <code>Boolean</code> | Whether to replace value when adding if max is reached (dequeue first element and queue new element) |

<a name="Queue+dequeue"></a>

### queue.dequeue() ⇒ <code>T</code>
Dequeue an element and returns it

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue.Queue"></a>

### Queue.Queue
**Kind**: static class of [<code>Queue</code>](#Queue)  
<a name="new_Queue.Queue_new"></a>

#### new Queue([max], [replaceOnMax])
Creates an instance of Queue.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [max] | <code>Number</code> | <code></code> | Maximum number of elements that can be added in this queue |
| [replaceOnMax] | <code>Boolean</code> | <code>true</code> | Whether to replace value when adding if max is reached (dequeue first element and queue new element) |

