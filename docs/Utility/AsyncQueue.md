<a name="AsyncQueue"></a>

## AsyncQueue
**Kind**: global class  
**Author**: KhaaZ  

* [AsyncQueue](#AsyncQueue)
    * [new AsyncQueue()](#new_AsyncQueue_new)
    * [.exec()](#AsyncQueue+exec)
    * [.add(func, [toExec], ...args)](#AsyncQueue+add) ⇒ <code>Promise</code>

<a name="new_AsyncQueue_new"></a>

### new AsyncQueue()
This data structure is a queue that will run every function one by one sequentially.
It will run indifferently synchrones and asynchrones functions. Making sure the previous oneis over before starting the next one. It will essentially wait for the previous function to be finished before running the next one.
A Promise is returned on add. This promise will resolve or reject when the function is ran.

The queue can be auto executed on add or the execution can be delayed.

<a name="AsyncQueue+exec"></a>

### asyncQueue.exec()
Execute the queue.

**Kind**: instance method of [<code>AsyncQueue</code>](#AsyncQueue)  
<a name="AsyncQueue+add"></a>

### asyncQueue.add(func, [toExec], ...args) ⇒ <code>Promise</code>
Adds a function to the queue.
Automatically wil wrap the function in a closure to keep the function context.
Will also create a Promise that will be returned and will be resolved with the actual data.

**Kind**: instance method of [<code>AsyncQueue</code>](#AsyncQueue)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| func | <code>function</code> |  | The function to run |
| [toExec] | <code>Boolean</code> | <code>true</code> | Whether to auto exec the queue on add or not. |
| ...args | <code>\*</code> |  | All arguments the function needs |

