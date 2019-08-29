<a name="Queue"></a>

## Queue
**Kind**: global class  
**Author**: KhaaZ  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [stopOnError] | <code>Boolean</code> | <code>false</code> | Whether to stop the queue execution on error. |


* [Queue](#Queue)
    * [new Queue()](#new_Queue_new)
    * _instance_
        * [.exec()](#Queue+exec)
        * [.add(func, [toExec], ...args)](#Queue+add)
    * _static_
        * [.Queue](#Queue.Queue)
            * [new Queue([stopOnError])](#new_Queue.Queue_new)

<a name="new_Queue_new"></a>

### new Queue()
This default Queue works in a synchronous fashion.
It will execute all synchronous functions sequentially.
Any error will be catched and unless specified otherwise won't break the queue execution.
The queue can be auto executed on add or the execution can be delayed.

<a name="Queue+exec"></a>

### queue.exec()
Execute the Queue

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue+add"></a>

### queue.add(func, [toExec], ...args)
Adds a function to the queue.
Automatically wil wrap the function in a closure to keep the function context.

**Kind**: instance method of [<code>Queue</code>](#Queue)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| func | <code>function</code> |  | The function to run |
| [toExec] | <code>Boolean</code> | <code>true</code> | Whether to auto exec the queue on add or not. |
| ...args | <code>\*</code> |  | All arguments the function needs |

<a name="Queue.Queue"></a>

### Queue.Queue
**Kind**: static class of [<code>Queue</code>](#Queue)  
<a name="new_Queue.Queue_new"></a>

#### new Queue([stopOnError])
Creates an instance of Queue.


| Param | Type | Default |
| --- | --- | --- |
| [stopOnError] | <code>boolean</code> | <code>false</code> | 

